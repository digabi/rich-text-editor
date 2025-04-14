import { Attributes } from 'sanitize-html'
import { sanitize } from './utils/sanitization'
import { MATH_EDITOR_CLASS } from './utils/create-math-stub'

export const eventHandlerWithoutFocusLoss = (fn?: () => void) => (e: React.MouseEvent) => {
  if (fn) {
    fn()
  }
  e.preventDefault()
  e.stopPropagation()
  return false
}

export function debounceAnswerSave(func: (content: string, caretPosition: CaretPosition) => void, timeout: number) {
  let timer: ReturnType<typeof setTimeout> | null = null
  let initialCaretPosition: CaretPosition | null = null

  return function <U>(this: U, ...args: Parameters<typeof func>) {
    const [content, caretPosition] = args as [string, CaretPosition]

    if (initialCaretPosition === null) {
      initialCaretPosition = caretPosition
    }

    if (timer && typeof timeout === 'number') {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      func(content, initialCaretPosition ?? caretPosition)
      initialCaretPosition = null
    }, timeout)
  }
}

export type CaretPosition = number

export const getCaretPosition = (textField: HTMLElement) => {
  let caretOffset = 0
  const selection = window.getSelection()
  if (!selection) return caretOffset
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0)
    const preCaretRange = range.cloneRange()
    preCaretRange.selectNodeContents(textField)
    preCaretRange.setEnd(range.endContainer, range.endOffset)
    caretOffset = preCaretRange.toString().length
  }
  return caretOffset
}

export const setCaretPosition = (textField: HTMLElement, targetOffset: number) => {
  const range = document.createRange()
  let currentOffset = 0
  let found = false

  function traverseNodes(node: Node) {
    if (found) return
    if (node.nodeType === Node.TEXT_NODE) {
      const nextOffset = currentOffset + node.textContent!.length
      if (nextOffset >= targetOffset) {
        range.setStart(node, targetOffset - currentOffset)
        range.collapse(true)
        found = true
      }
      currentOffset = nextOffset
    } else {
      // for non-text (divs and images in our case), traverse their children
      for (const child of node.childNodes) {
        traverseNodes(child)
        if (found) break
      }
    }
  }

  traverseNodes(textField)

  // If the old caret position is not found, default to the end of the field
  if (!found) {
    range.selectNodeContents(textField)
    range.collapse(false)
  }

  const selection = window.getSelection()
  if (selection) {
    selection.removeAllRanges()
    selection.addRange(range)
  }
}

export type Answer = {
  answerHtml: string
  answerText: string
  imageCount: number
}

export const getAnswer = (html: string) => {
  const answerHtml = sanitize(html, {
    transformTags: {
      img: (tagName: string, attribs: Attributes) =>
        attribs.src ? { tagName, attribs } : { tagName: '', attribs: {} },
    },
    exclusiveFilter: (frame) => frame.tag === 'span' && frame.attribs?.class === MATH_EDITOR_CLASS,
  })
  const answer = new DOMParser().parseFromString(answerHtml, 'text/html').body
  const answerText = Array.from(answer.childNodes)
    .map((node) => {
      if (node.nodeName === 'BR') return '\n'
      return node.textContent
    })
    .join('')

  const screenshotCount = answer.querySelectorAll(':scope > img:not([src*="/math.svg?"])').length
  const equationCount = answer.querySelectorAll(':scope > img[src*="/math.svg?"]').length

  const isEmpty = answerText?.trim().length === 0 && screenshotCount === 0 && equationCount === 0

  return {
    answerHtml: isEmpty ? '' : stripBrsAndTrimFromEnd(answerHtml),
    answerText: stripNewLinesFromStartAndWhiteSpacesFromEnd(answerText ?? ''),
    imageCount: screenshotCount,
  }
}

const stripBrsAndTrimFromEnd = (answerHtml: string) =>
  answerHtml.replace(/^(\n|<br ?\/?>)*/g, '').replace(/(\s|<br ?\/?>)*$/g, '')

const stripNewLinesFromStartAndWhiteSpacesFromEnd = (answerHtml: string) =>
  answerHtml.replace(/^(\n)*/g, '').replace(/(\s)*$/g, '')

export function decodeBase64Image(dataString: string) {
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

export function isForbiddenInlineImage(type: string, element: HTMLImageElement, allowedFileTypes: string[]) {
  const isInlineMathSvg = type === 'image/svg+xml' && element.alt
  if (isInlineMathSvg) {
    return false
  }
  return !allowedFileTypes.includes(type)
}

export const loadingImage =
  'data:image/gif;base64,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EAY7Cg04Uk48LAsDhRA8MVQPEF0GAgqYYwSRlycNcWskCkApIyEAOwAAAAAAAAAAADxiciAvPgo8Yj5XYXJuaW5nPC9iPjogIG15c3FsX3F1ZXJ5KCkgWzxhIGhyZWY9J2Z1bmN0aW9uLm15c3FsLXF1ZXJ5Jz5mdW5jdGlvbi5teXNxbC1xdWVyeTwvYT5dOiBDYW4ndCBjb25uZWN0IHRvIGxvY2FsIE15U1FMIHNlcnZlciB0aHJvdWdoIHNvY2tldCAnL3Zhci9ydW4vbXlzcWxkL215c3FsZC5zb2NrJyAoMikgaW4gPGI+L2hvbWUvYWpheGxvYWQvd3d3L2xpYnJhaXJpZXMvY2xhc3MubXlzcWwucGhwPC9iPiBvbiBsaW5lIDxiPjY4PC9iPjxiciAvPgo8YnIgLz4KPGI+V2FybmluZzwvYj46ICBteXNxbF9xdWVyeSgpIFs8YSBocmVmPSdmdW5jdGlvbi5teXNxbC1xdWVyeSc+ZnVuY3Rpb24ubXlzcWwtcXVlcnk8L2E+XTogQSBsaW5rIHRvIHRoZSBzZXJ2ZXIgY291bGQgbm90IGJlIGVzdGFibGlzaGVkIGluIDxiPi9ob21lL2FqYXhsb2FkL3d3dy9saWJyYWlyaWVzL2NsYXNzLm15c3FsLnBocDwvYj4gb24gbGluZSA8Yj42ODwvYj48YnIgLz4KPGJyIC8+CjxiPldhcm5pbmc8L2I+OiAgbXlzcWxfcXVlcnkoKSBbPGEgaHJlZj0nZnVuY3Rpb24ubXlzcWwtcXVlcnknPmZ1bmN0aW9uLm15c3FsLXF1ZXJ5PC9hPl06IENhbid0IGNvbm5lY3QgdG8gbG9jYWwgTXlTUUwgc2VydmVyIHRocm91Z2ggc29ja2V0ICcvdmFyL3J1bi9teXNxbGQvbXlzcWxkLnNvY2snICgyKSBpbiA8Yj4vaG9tZS9hamF4bG9hZC93d3cvbGlicmFpcmllcy9jbGFzcy5teXNxbC5waHA8L2I+IG9uIGxpbmUgPGI+Njg8L2I+PGJyIC8+CjxiciAvPgo8Yj5XYXJuaW5nPC9iPjogIG15c3FsX3F1ZXJ5KCkgWzxhIGhyZWY9J2Z1bmN0aW9uLm15c3FsLXF1ZXJ5Jz5mdW5jdGlvbi5teXNxbC1xdWVyeTwvYT5dOiBBIGxpbmsgdG8gdGhlIHNlcnZlciBjb3VsZCBub3QgYmUgZXN0YWJsaXNoZWQgaW4gPGI+L2hvbWUvYWpheGxvYWQvd3d3L2xpYnJhaXJpZXMvY2xhc3MubXlzcWwucGhwPC9iPiBvbiBsaW5lIDxiPjY4PC9iPjxiciAvPgo8YnIgLz4KPGI+V2FybmluZzwvYj46ICBteXNxbF9xdWVyeSgpIFs8YSBocmVmPSdmdW5jdGlvbi5teXNxbC1xdWVyeSc+ZnVuY3Rpb24ubXlzcWwtcXVlcnk8L2E+XTogQ2FuJ3QgY29ubmVjdCB0byBsb2NhbCBNeVNRTCBzZXJ2ZXIgdGhyb3VnaCBzb2NrZXQgJy92YXIvcnVuL215c3FsZC9teXNxbGQuc29jaycgKDIpIGluIDxiPi9ob21lL2FqYXhsb2FkL3d3dy9saWJyYWlyaWVzL2NsYXNzLm15c3FsLnBocDwvYj4gb24gbGluZSA8Yj42ODwvYj48YnIgLz4KPGJyIC8+CjxiPldhcm5pbmc8L2I+OiAgbXlzcWxfcXVlcnkoKSBbPGEgaHJlZj0nZnVuY3Rpb24ubXlzcWwtcXVlcnknPmZ1bmN0aW9uLm15c3FsLXF1ZXJ5PC9hPl06IEEgbGluayB0byB0aGUgc2VydmVyIGNvdWxkIG5vdCBiZSBlc3RhYmxpc2hlZCBpbiA8Yj4vaG9tZS9hamF4bG9hZC93d3cvbGlicmFpcmllcy9jbGFzcy5teXNxbC5waHA8L2I+IG9uIGxpbmUgPGI+Njg8L2I+PGJyIC8+Cg=='
