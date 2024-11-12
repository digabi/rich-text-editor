import { sanitizeForExport } from './utils/sanitization'

export const eventHandlerWithoutFocusLoss = (fn?: () => void) => (e: React.MouseEvent) => {
  if (fn) {
    fn()
  }
  e.preventDefault()
  e.stopPropagation()
  return false
}

export type Answer = {
  answerHtml: string
  answerText: string
  imageCount: number
}

// TODO: Finishing touches, make sure this is cross compatible with the old version
export const getAnswer = (html: string) => {
  const answerHtml = sanitizeForExport(html)
  const answer = new DOMParser().parseFromString(answerHtml, 'text/html').body
  const answerText = new DOMParser().parseFromString(answerHtml.replaceAll('<br />', '\n'), 'text/html').body.innerText

  // All images that are direct children of the answer are "screenshots"
  const screenshots = answer.querySelectorAll(':scope > img:not([data-math-svg])')

  const equationCount = answer.querySelectorAll('span.math-editor-wrapper').length

  // Remove equation wrappers
  answer.querySelectorAll('span.math-editor-wrapper').forEach((wrapper) => {
    const img = wrapper.querySelector('img')
    if (img) {
      wrapper.replaceWith(img)
    }
  })

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
