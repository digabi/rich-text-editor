import sanitizeHtml from 'sanitize-html'

const sanitizeOpts = {
  allowedTags: ['img', 'br'],
  allowedAttributes: {
    img: ['src', 'alt', 'data-*'],
  },
}

export default function sanitize(html: string) {
  return (
    [
      (v) => convertLinksToRelative(v),
      (v) =>
        sanitizeHtml(v, {
          ...sanitizeOpts,
          allowedTags: [...sanitizeOpts.allowedTags, 'div', 'p'],
          allowedSchemes: ['data', 'http', 'https'],
        }),
      (v) => stripBlockElements(v),
      (v) => sanitizeHtml(v, sanitizeOpts),
    ] as Array<(html: string) => string>
  ).reduce((value, fn) => fn(value), html)
}

function convertLinksToRelative(html: string) {
  return html.replace(new RegExp(document.location.origin, 'g'), '')
}

function isBlockElement(node: Node) {
  return node.nodeName === 'DIV' || node.nodeName === 'P'
}

// TODO: Change this to e.g. a DFS-algorithm.
// This is copied pretty much as-is from the legacy jQuery version;
// it's difficult to say *what exactly* it does but it attempts t
// change block-elements (namely `div` and `p`) into `br`s.
function stripBlockElements(html: string) {
  const parent = document.createElement('div')
  parent.innerHTML = html

  do {
    let lastNode: Node | undefined = undefined
    for (let i = 0; i < parent.childNodes.length; i++) {
      const node = parent.childNodes[i]
      if (isBlockElement(node)) {
        if (lastNode !== undefined && lastNode.nodeType === Node.TEXT_NODE && /\S/.test(lastNode.textContent ?? ''))
          parent.insertBefore(document.createElement('br'), node)
        if (node.lastChild && node.lastChild.nodeName !== 'BR') node.insertBefore(document.createElement('br'), null)
        while (node.childNodes.length && node.firstChild !== null) parent.insertBefore(node.firstChild, node)
        parent.removeChild(node)
      }
      lastNode = node
    }
  } while (Array.prototype.some.call(parent.childNodes, (node: Node) => isBlockElement(node)))

  return parent.innerHTML
}
