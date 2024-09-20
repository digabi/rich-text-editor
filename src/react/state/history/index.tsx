import { useRef, useState } from 'react'

export default function useHistory() {
  /** `stack` is an array with all the current history in order.
   *
   * `pointer` is a number that points to the current position in the history.
   * Undo lowers the pointer, redo makes it higher.
   *
   * Writing anything always clears the history stack above the pointer, adds a new value
   * and moves the pointer to the top of the stack.
   * */
  const [stack, _setStack] = useState<string[]>([])
  const [pointer, _setPointer] = useState(0)

  /** Refs are needed to make the current value always accessible
   * in the handlers these will be ultimately called from. This is a bit convoluted
   * and prone to errors if the refs are not used and updated correctly,
   * so remember to always use the `set...` wrappers to update the state instead of
   * doing it directly.
   * */
  const stackRef = useRef(stack)
  const pointerRef = useRef(pointer)

  const setStack = (newStack: string[]) => {
    stackRef.current = newStack
    _setStack(newStack)
  }

  const setPointer = (newPointer: number) => {
    pointerRef.current = newPointer
    _setPointer(newPointer)
  }

  const canUndo = pointer !== 0
  const canRedo = pointer < stack.length - 1

  const clear = () => {
    setStack([''])
    setPointer(0)
  }

  const write = (value: string) => {
    // If the pointer is at a value that's equal to the new value,
    // we don't do anything so we don't get duplicate values in the history
    if (value === stackRef.current.at(pointerRef.current)) return

    const newStack = [...stackRef.current.slice(0, pointerRef.current + 1), value]

    setStack(newStack)
    setPointer(newStack.length - 1)
  }

  const undo = () => {
    const newPointer = pointerRef.current - 1
    if (newPointer < 0) return undefined
    const newValue = stackRef.current.at(newPointer)

    setPointer(newPointer)
    return newValue
  }

  const redo = () => {
    const newPointer = pointerRef.current + 1
    if (newPointer >= stackRef.current.length) return undefined
    const newValue = stackRef.current.at(newPointer)

    setPointer(newPointer)
    return newValue
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
