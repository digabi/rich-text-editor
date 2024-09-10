export const MATH_EDITOR_CLASS = 'math-editor-wrapper'

/**
 * Creates a new `HTMLSpanElement` that can be initialised into a new `MathBox`.
 * The element will have the `MATH_EDITOR_CLASS` class name.
 */
export function createMathStub() {
  const wrapper = document.createElement('span')
  wrapper.className = MATH_EDITOR_CLASS
  wrapper.style.display = 'contents'
  wrapper.contentEditable = 'false'
  return wrapper
}

export function createMathStubAtSelection() {
  const stub = createMathStub()

  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return stub

  const range = selection.getRangeAt(0)
  range.deleteContents()
  range.insertNode(stub)

  // If the new equation would be created inside another equations wrapper, move it outside of it
  const parent = stub.parentNode as Element
  if (parent.className === MATH_EDITOR_CLASS) {
    parent.insertAdjacentElement(stub.nextSibling ? 'beforebegin' : 'afterend', stub)
  }

  // TODO: Better handling for these than just blindly adding them every time
  // Non-breaking spaces before and after the LaTeX block
  stub.insertAdjacentText('beforebegin', '\u00A0')
  stub.insertAdjacentText('afterend', '\u00A0')

  selection.removeAllRanges()
  range.setStartAfter(stub)
  range.setEndAfter(stub)
  selection.addRange(range)

  return stub
}
