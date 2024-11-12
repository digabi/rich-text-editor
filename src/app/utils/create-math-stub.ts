export const MATH_EDITOR_CLASS = 'math-editor-wrapper'

/**
 * Creates a new `HTMLSpanElement` that can be initialised into a new {@link MathEditor}.
 * The element will have the `MATH_EDITOR_CLASS` class name.
 *
 * By default the created `HTMLSpanElement` is *not* attached to the DOM. It is the
 * caller's responsibility to actually mount the element to the document. *However*,
 * if the `atSelection` argument is set to `true`, the box **will** be placed at the
 * current selection (or cursor position, which is a selection of length zero)
 * in the document. It is the caller's responsibility to check if the current
 * cursor position/selection is legal.
 */
export function createMathStub(id: string | number, atSelection = false, img?: Element) {
  const stub = document.createElement('span')
  // attribute order matters for playwright test. Chrome and Firefox give html content in different (alphabetic) orders
  stub.className = MATH_EDITOR_CLASS
  stub.id = `math-editor-${id}`
  stub.contentEditable = 'false'
  stub.style.display = 'contents'

  if (atSelection) {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return stub

    const range = selection.getRangeAt(0)
    range.deleteContents()
    range.insertNode(stub)
    if (img) range.insertNode(img)

    // If the new equation would be created inside another equations wrapper, move it outside of it
    const parent = stub.parentNode as Element
    if (parent.className === MATH_EDITOR_CLASS) {
      parent.insertAdjacentElement(stub.nextSibling ? 'beforebegin' : 'afterend', stub)
    }

    selection.removeAllRanges()
    range.setStartAfter(stub)
    range.setEndAfter(stub)
    selection.addRange(range)
  }

  return stub
}
