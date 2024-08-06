import sanitizeHtml from 'sanitize-html'
import { sanitizeOpts } from '../sanitizeOpts'
import fi from './resources/fi'
import sv from './resources/sv'

export type Translation = typeof fi | typeof sv
export interface SpecialCharacter {
  character: string
  latexCommand?: string
  popular?: boolean
  noWrite?: boolean
}
export interface SpecialCharacterGroup {
  label: string
  characters: SpecialCharacter[]
}
export interface Options {
  locale: 'FI' | 'SV'
  screenshotSaver: () => Promise<string>
  baseUrl: string
  ignoreSaveObject: boolean
  screenshotImageSelector: string
  invalidImageSelector: string
  fileTypes: string[]
  sanitize: (html: string) => string
  updateMathImg?: (latex: string) => void
  forceInit: boolean
}

export const defaults: Options = {
  locale: 'FI',
  screenshotSaver: () => Promise.resolve(''),
  baseUrl: '',
  ignoreSaveObject: false,
  screenshotImageSelector:
    'img[src^="/screenshot/"], img[src^="data:image/png"], img[src^="data:image/gif"], img[src^="data:image/jpeg"]',
  invalidImageSelector: 'img:not(img[src^="data"], img[src^="/math.svg?latex="], img[src^="/screenshot/"])',
  fileTypes: ['image/png', 'image/jpeg'],
  sanitize: defaultSanitize,
  updateMathImg: undefined,
  forceInit: false,
}

function defaultSanitize(html: string) {
  return sanitizeHtml(
    stripDivsFromRichTextAnswer(
      sanitizeHtml(convertLinksToRelative(html), { ...sanitizeOpts, allowedTags: ['div', 'p', 'img', 'br'] }),
    ),
    sanitizeOpts,
  )
}

function stripDivsFromRichTextAnswer(answerContentValue: string) {
  const parent = document.createElement('div')
  parent.innerHTML = answerContentValue

  do {
    let lastNode: Node
    for (let i = 0; i < parent.childNodes.length; i++) {
      const node = parent.childNodes[i]
      if (isBlockElement(node)) {
        if (lastNode && lastNode.nodeType === Node.TEXT_NODE && /\S/.test(lastNode.textContent))
          parent.insertBefore(document.createElement('br'), node)
        if (node.lastChild && node.lastChild.nodeName !== 'BR') node.insertBefore(document.createElement('br'), null)
        while (node.childNodes.length) parent.insertBefore(node.firstChild, node)
        parent.removeChild(node)
      }
      lastNode = node
    }
  } while (Array.prototype.some.call(parent.childNodes, (node) => isBlockElement(node)))

  return parent.innerHTML
}

function convertLinksToRelative(html: string) {
  return html.replace(new RegExp(document.location.origin, 'g'), '')
}

function isBlockElement(node: Node) {
  return node.nodeName === 'DIV' || node.nodeName === 'P'
}

export const eventHandlerWithoutFocusLoss = (fn?: () => void) => (e: React.MouseEvent) => {
  if (fn) {
    fn()
  }
  e.preventDefault()
  e.stopPropagation()
  return false
}
