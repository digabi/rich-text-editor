import { useRef, useState } from 'react'
import { CaretPosition } from '../../utility'

interface HistoryEntry {
  content: string
  caretPositionBeforeChange?: CaretPosition
  caretPositionAfterChange?: CaretPosition
}

export interface HistoryActionResult {
  content?: string
  newCaretPosition?: CaretPosition
}

export default function useHistory() {
  /** `stack` is an array with all the current history in order.
   *
   * `pointer` is a number that points to the current position in the history.
   * Undo lowers the pointer, redo makes it higher.
   *
   * Writing anything always clears the history stack above the pointer, adds a new value
   * and moves the pointer to the top of the stack.
   * */
  const [stack, _setStack] = useState<HistoryEntry[]>([])
  const [pointer, _setPointer] = useState(0)

  /** Refs are needed to make the current value always accessible
   * in the handlers these will be ultimately called from. This is a bit convoluted
   * and prone to errors if the refs are not used and updated correctly,
   * so remember to always use the `set...` wrappers to update the state instead of
   * doing it directly.
   * */
  const stackRef = useRef(stack)
  const pointerRef = useRef(pointer)

  const setStack = (newStack: HistoryEntry[]) => {
    stackRef.current = newStack
    _setStack(newStack)
    console.debug({ newStack })
  }

  const setPointer = (newPointer: number) => {
    pointerRef.current = newPointer
    _setPointer(newPointer)
  }

  const canUndo = pointer !== 0
  const canRedo = pointer < stack.length - 1

  const clear = () => {
    setStack([{ content: '' }])
    setPointer(0)
  }

  const write = (
    value: string,
    caretPositionBeforeChange?: CaretPosition,
    caretPositionAfterChange?: CaretPosition,
  ) => {
    const currentValue = stackRef.current.at(pointerRef.current)
    // If the pointer is at a value that's equal to the new value,
    // we don't do anything so we don't get duplicate values in the history
    if (value === currentValue?.content) return

    const newEntry: HistoryEntry = {
      content: value,
      caretPositionBeforeChange: caretPositionBeforeChange,
      caretPositionAfterChange: caretPositionAfterChange,
    }
    const newStack = [...stackRef.current.slice(0, pointerRef.current + 1), newEntry]

    setStack(newStack)
    setPointer(newStack.length - 1)
  }

  const undo = (): HistoryActionResult | undefined => {
    const newPointer = pointerRef.current - 1
    if (newPointer < 0) return undefined
    const caretPosition = stackRef.current.at(pointerRef.current)?.caretPositionBeforeChange ?? 0
    const newValue = stackRef.current.at(newPointer)

    setPointer(newPointer)
    return { content: newValue?.content ?? '', newCaretPosition: caretPosition } //: newValue?.caretPositionBeforeChange }
  }

  const redo = (): HistoryActionResult | undefined => {
    const newPointer = pointerRef.current + 1
    if (newPointer >= stackRef.current.length) return undefined

    const newValue = stackRef.current.at(newPointer)

    setPointer(newPointer)
    return { content: newValue?.content, newCaretPosition: newValue?.caretPositionAfterChange }
  }

  return {
    canUndo,
    canRedo,

    write,
    clear,

    undo,
    redo,
  }
}
