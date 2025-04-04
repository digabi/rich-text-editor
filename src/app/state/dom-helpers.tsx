export const deleteElement = (element: HTMLElement) => {
  if (!element) return
  const range = document.createRange()
  range.selectNode(element)
  const selection = window.getSelection()
  selection?.removeAllRanges()
  selection?.addRange(range)
  document.execCommand('delete')
}
export const replaceElement = (addToHistory: boolean, oldElement: HTMLElement, newElement: HTMLElement) => {
  const range = document.createRange()
  range.selectNode(oldElement)
  const selection = window.getSelection()
  selection?.removeAllRanges()
  selection?.addRange(range)
  if (addToHistory) {
    document.execCommand('insertHTML', false, newElement.outerHTML)
  } else {
    range.deleteContents()
    range.insertNode(newElement)
  }
}
export const refreshElement = (element: HTMLElement) => {
  if (!element) return
  replaceElement(true, element, element)
}

export const insertAfter = (element: Element, newHtml: string) => {
  console.debug('insertAfter', element, newHtml)
  const range = document.createRange()
  range.selectNode(element)
  range.collapse(false)
  const selection = window.getSelection()
  selection?.removeAllRanges()
  selection?.addRange(range)
  document.execCommand('insertHTML', false, newHtml)
}
