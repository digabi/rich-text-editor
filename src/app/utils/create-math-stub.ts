import MathEditor from '../components/math-editor'
import { nbsp } from '../utility'

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
export function createMathStub(id: string | number, atSelection = false) {
  const stub = document.createElement('span')
  stub.className = MATH_EDITOR_CLASS
  stub.id = `math-editor-${id}`
  stub.style.display = 'contents'
  stub.contentEditable = 'false'

  if (atSelection) {
    document.execCommand('insertHTML', false, stub.outerHTML)
    return document.getElementById(stub.id) as HTMLSpanElement
  } else {
    return stub
  }
}
