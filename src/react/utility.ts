import sanitizeHtml from 'sanitize-html'
import fi from '../FI'
import sv from '../SV'
import sanitize from 'sanitize-html'

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
  screenshotSaver: (file: File) => Promise<string>
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
  screenshotSaver: (file: File) => Promise.resolve(''),
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

export const sanitizeOpts = {
  allowedTags: ['img', 'br', 'span'],
  allowedAttributes: {
    img: ['src', 'alt', 'data-math-svg'],
    span: ['class'],
  },
  allowedSchemes: ['data'],
  allowedClasses: {
    span: ['math-editor-wrapper'],
  },
  transformTags: {
    img: (tagName: string, attribs: sanitize.Attributes) => ({
      tagName,
      attribs: attribs.src?.includes('math.svg') ? { ...attribs, 'data-math-svg': 'true' } : attribs,
    }),
    span: (tagName: string, attribs: sanitize.Attributes) =>
      attribs.class === 'math-editor-wrapper' ? { tagName, attribs } : { tagName: '', attribs: { text: '' } },
  },
}

function defaultSanitize(html: string) {
  return sanitizeHtml(
    stripDivsFromRichTextAnswer(
      sanitizeHtml(convertLinksToRelative(html), {
        ...sanitizeOpts,
        allowedTags: [...sanitizeOpts.allowedTags, 'div', 'p'],
        allowedSchemes: ['data', 'http', 'https'],
      }),
    ),
    sanitizeOpts,
  )
}

// TODO: Clean this up, preferably replace with proper config for sanitize-html
function stripDivsFromRichTextAnswer(answerContentValue: string) {
  const parent = document.createElement('div')
  parent.innerHTML = answerContentValue

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

export function decodeBase64Image(dataString: string) {
  if (!dataString) return null
  const matches = dataString.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)
  if (!matches || matches.length !== 3) {
    return null
  }
  const byteCharacters = atob(matches[2])
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  return {
    type: matches[1],
    data: new Uint8Array(byteNumbers),
  }
}

export type Answer = {
  answerHtml: string
  answerText: string
  imageCount: number
}

// TODO: Finishing touches, make sure this is cross compatible with the old version
export const getAnswer = (html: string, sanitizeFn: (oldHtml: string) => string) => {
  console.log(html)
  const answerHtml = sanitizeFn(html)
  const answer = new DOMParser().parseFromString(answerHtml, 'text/html').body
  const answerText = new DOMParser().parseFromString(answerHtml.replaceAll('<br />', '\n'), 'text/html').body.innerText

  // All images that are direct children of the answer are "screenshots"
  const screenshots = answer.querySelectorAll(':scope > img:not([data-math-svg])')

  // Remove equation wrappers
  answer.querySelectorAll('span.math-editor-wrapper').forEach((wrapper) => {
    wrapper.replaceWith(wrapper.querySelectorAll('img'))
  })

  const isEmpty = answerText?.trim().length === 0 && screenshots.length === 0

  return {
    answerHtml: isEmpty ? '' : stripBrsAndTrimFromEnd(answerHtml),
    answerText: stripNewLinesFromStartAndWhiteSpacesFromEnd(answerText ?? ''),
    imageCount: screenshots.length,
  }
}

const stripBrsAndTrimFromEnd = (answerHtml: string) => {
  return answerHtml.replace(/^(\n|<br ?\/?>)*/g, '').replace(/(\s|<br ?\/?>)*$/g, '')
}

const stripNewLinesFromStartAndWhiteSpacesFromEnd = (answerHtml: string) => {
  return answerHtml.replace(/^(\n)*/g, '').replace(/(\s)*$/g, '')
}
