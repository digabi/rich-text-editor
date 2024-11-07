import { sanitize } from './utils/sanitization'

export const eventHandlerWithoutFocusLoss = (fn?: () => void) => (e: React.MouseEvent) => {
  if (fn) {
    fn()
  }
  e.preventDefault()
  e.stopPropagation()
  return false
}

export function debounce<T extends (...args: any[]) => void>(func: T, timeout: number) {
  // setTimeout returns a number in a browser and an object in Node
  let timer: ReturnType<typeof setTimeout> | null = null
  return function <U>(this: U, ...args: Parameters<typeof func>) {
    if (timer && typeof timeout === 'number') {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func(...args)
    }, timeout)
  }
}

export type Answer = {
  answerHtml: string
  answerText: string
  imageCount: number
}

export const getAnswer = (html: string) => {
  const answerHtml = sanitize(html)
  const answer = new DOMParser().parseFromString(answerHtml, 'text/html').body
  const answerText = Array.from(answer.childNodes)
    .map((node) => {
      if (node.nodeName === 'BR') return '\n'
      return node.textContent
    })
    .join('')

  const screenshots = answer.querySelectorAll(':scope > img:not([src*="/math.svg?"])')

  const equationCount = answer.querySelectorAll('span.math-editor-wrapper').length

  const isEmpty = answerText?.trim().length === 0 && screenshots.length === 0 && equationCount > 0

  return {
    answerHtml: isEmpty ? '' : stripBrsAndTrimFromEnd(answerHtml),
    answerText: stripNewLinesFromStartAndWhiteSpacesFromEnd(answerText ?? ''),
    imageCount: screenshots.length,
  }
}

const stripBrsAndTrimFromEnd = (answerHtml: string) =>
  answerHtml.replace(/^(\n|<br ?\/?>)*/g, '').replace(/(\s|<br ?\/?>)*$/g, '')

const stripNewLinesFromStartAndWhiteSpacesFromEnd = (answerHtml: string) =>
  answerHtml.replace(/^(\n)*/g, '').replace(/(\s)*$/g, '')
