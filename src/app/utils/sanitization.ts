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
    let lastNode: Node | undefined = undefined
    for (let i = 0; i < parent.childNodes.length; i++) {
      const node = parent.childNodes[i]
      if (isBlockElement(node)) {
        // if the last node is a text node or a span, which is not empty, add a br before this node
        if (
          lastNode !== undefined &&
          (lastNode.nodeType === Node.TEXT_NODE || lastNode.nodeName === 'SPAN') &&
          /\S/.test(lastNode.textContent ?? '')
        ) {
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
      lastNode = node
    }
  } while (Array.prototype.some.call(parent.childNodes, (node: Node) => isBlockElement(node)))

  return parent.innerHTML
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
