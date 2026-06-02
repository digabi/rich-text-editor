import sanitizeHtml from 'sanitize-html'

const sanitizeOpts = {
  allowedTags: ['img', 'br', 'span'],
  allowedAttributes: {
    img: ['src', 'alt'],
  },
  allowedSchemes: ['data'],
}

export function sanitize(html: string, opts?: sanitizeHtml.IOptions) {
  let isInsideHeadTag = false
  return (
    [
      (v) =>
        sanitizeHtml(v, {
          ...sanitizeOpts,
          allowedTags: [...sanitizeOpts.allowedTags, 'div', 'p'],
          allowedSchemes: ['data', 'http', 'https'],
          ...opts,
          // We need to track if we are inside a head tag, because we don't want to add <br>s inside head tags
          onOpenTag: (tag) => (tag === 'head' ? (isInsideHeadTag = true) : undefined),
          onCloseTag: (tag) => (tag === 'head' ? (isInsideHeadTag = false) : undefined),
          textFilter: (text, tagName) => {
            if (isInsideHeadTag) {
              return text
            }
            // If the text is preformatted, make sure the line breaks in it are kept
            const cleanedText = tagName === 'pre' ? preserveLineBreaks(text) : text
            if (cleanedText === '<br>') {
              return ''
            }
            return cleanedText
          },
          ...opts,
        }),
      (v) => convertLinksToRelative(v),
      (v) => stripBlockElements(v),
      (v) => preserveIndentation(v),
      (v) => preserveTabs(v),
    ] as Array<(html: string) => string>
  ).reduce((value, fn) => fn(value), html)
}

function convertLinksToRelative(html: string) {
  return html.replace(new RegExp(document.location.origin, 'g'), '')
}

function isBlockElement(node: Node) {
  return node.nodeName === 'DIV' || node.nodeName === 'P'
}

// This is copied pretty much as-is from the legacy jQuery version;
// it's difficult to say *what exactly* it does but it attempts to
// change block-elements (namely `div` and `p`) into `br`s.
function stripBlockElements(html: string) {
  const parent = document.createElement('div')
  parent.innerHTML = html.trim()

  do {
    for (let i = 0; i < parent.childNodes.length; i++) {
      const node = parent.childNodes[i]
      if (isBlockElement(node)) {
        // Preserve the line break that the block element represents by inserting a <br>
        // before it, unless the previous sibling already provides one (or there is no
        // content before it that needs separating).
        if (needsBrBeforeBlock(node.previousSibling)) {
          parent.insertBefore(document.createElement('br'), node)
        }
        // if this node has a last child that is not a br, add a br
        if (node.lastChild && node.lastChild.nodeName !== 'BR') {
          node.insertBefore(document.createElement('br'), null)
        }
        while (node.childNodes.length && node.firstChild !== null) {
          parent.insertBefore(node.firstChild, node)
        }
        parent.removeChild(node)
      }
    }
  } while (Array.prototype.some.call(parent.childNodes, (node: Node) => isBlockElement(node)))

  return parent.innerHTML
}

function needsBrBeforeBlock(prevSibling: Node | null) {
  if (prevSibling === null) return false
  if (prevSibling.nodeName === 'BR') return false
  // A preceding block will be unwrapped and contribute its own trailing <br>
  if (isBlockElement(prevSibling)) return false
  // Whitespace-only text nodes and spans don't represent content that needs a line break
  if (
    (prevSibling.nodeType === Node.TEXT_NODE || prevSibling.nodeName === 'SPAN') &&
    !/\S/.test(prevSibling.textContent ?? '')
  ) {
    return false
  }
  return true
}

function preserveTabs(html: string) {
  return html.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
}

export function sanitizeText(text: string) {
  return ([escapeHtml, preserveLineBreaks, preserveIndentation] as Array<(text: string) => string>).reduce(
    (value, fn) => fn(value),
    text,
  )
}

function preserveIndentation(html: string) {
  const parent = document.createElement('div')
  parent.innerHTML = html

  Array.from(parent.childNodes).forEach((node) => {
    if (node.textContent) {
      const nodeIsPrecededByBR = node.previousSibling?.nodeName === 'BR'
      if (nodeIsPrecededByBR) {
        const spaces = node.textContent?.match(/^(\s+)/)?.[0]
        if (spaces) {
          node.textContent = node.textContent?.replace(spaces, spaces.replaceAll(' ', '\u00A0'))
        }
      }
    }
  })

  return parent.innerHTML
}

// A tab is rendered as four non-breaking spaces, matching `preserveTabs`.
const NBSP = '\u00A0'
const tabWidth = 4

function leadingWhitespaceToNbsp(whitespace: string) {
  return whitespace.replaceAll('\t', NBSP.repeat(tabWidth)).replaceAll(' ', NBSP)
}

/**
 * WebKit strips the leading whitespace from each line when it serializes the clipboard HTML
 * during a copy. So indentation pasted from e.g. Collabora Writer is missing from the
 * `text/html` flavor on Safari/WebKit — even though Chrome and Firefox keep it right there in
 * the markup (`<p>    text</p>`), where the existing sanitization already picks it up. The
 * indentation still survives in the `text/plain` flavor on every browser, so we use it to
 * restore the leading indentation of each line that lost it.
 *
 * Only leading whitespace is restored, and only when the HTML has less than the plain text —
 * so this is a no-op when the HTML already kept the indentation (Chrome/Firefox), and it
 * never removes content. Pastes containing images are skipped, because inline images can
 * shift the line alignment between the HTML and the plain text.
 */
export function restoreLeadingIndentation(html: string, plainText: string) {
  if (/<img/i.test(html)) return html

  const textLines = plainText.replaceAll('\r', '').split('\n')
  const parent = document.createElement('div')
  parent.innerHTML = html

  let lineIndex = 0
  let atLineStart = true
  Array.from(parent.childNodes).forEach((node) => {
    if (node.nodeName === 'BR') {
      lineIndex++
      atLineStart = true
      return
    }
    if (!atLineStart) return
    atLineStart = false

    const targetWhitespace = textLines[lineIndex]?.match(/^[ \t]+/)?.[0]
    if (!targetWhitespace) return
    const targetNbsp = leadingWhitespaceToNbsp(targetWhitespace)

    const current = node.textContent ?? ''
    const currentLeadingLength = current.match(/^\s*/)?.[0].length ?? 0
    if (targetNbsp.length > currentLeadingLength) {
      node.textContent = targetNbsp.slice(0, targetNbsp.length - currentLeadingLength) + current
    }
  })

  return parent.innerHTML
}

function preserveLineBreaks(text: string) {
  return text.replaceAll(/\r/g, '').replaceAll(/\n/g, '<br>')
}

function escapeHtml(text: string) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}
