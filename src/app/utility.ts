import { Attributes } from 'sanitize-html'
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

interface CursorPosition {
  path: number[]
  offset: number
}

export function getCursorPosition(container: HTMLElement): CursorPosition | null {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return null

  const range = selection.getRangeAt(0)
  const path: number[] = []
  let currentNode: Node | null = range.startContainer

  while (currentNode && currentNode !== container) {
    const parent: Node | null = currentNode.parentNode
    if (!parent) break

    // Cast currentNode to ChildNode before indexing
    path.push(Array.from(parent.childNodes).indexOf(currentNode as ChildNode))
    currentNode = parent
  }

  return { path, offset: range.startOffset }
}

export function restoreCursorPosition(container: HTMLElement, savedPosition: CursorPosition | null): void {
  const range = document.createRange()
  try {
    if (!savedPosition) return

    let currentNode: Node | null = container

    for (const index of savedPosition.path) {
      if (!currentNode || !(currentNode.childNodes[index] instanceof Node)) return
      currentNode = currentNode.childNodes[index]
    }

    const maxOffset = currentNode?.textContent?.length ?? 0
    const safeOffset = Math.min(savedPosition.offset, maxOffset)

    range.setStart(currentNode, safeOffset)
    range.collapse(true)
  } catch (e) {
    range.selectNodeContents(container)
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
      span: (tagName: string, attribs: Attributes) =>
        attribs.class !== 'math-editor-wrapper' ? { tagName, attribs } : { tagName: '', attribs: {} },
    },
  })
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
