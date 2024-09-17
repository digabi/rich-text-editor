import { useRef, useState } from 'react'

const popUndoStack = (stack: string[]): [rest: string[], last?: string] => {
  const last = stack.at(-2)
  const rest = stack.slice(0, -1)
  return [rest, last]
}

const popRedoStack = (stack: string[]): [rest: string[], last?: string] => {
  const last = stack.at(-1)
  const rest = stack.slice(0, -1)
  return [rest, last]
}

export default function useHistory() {
  const [undoStack, _setUndoStack] = useState<string[]>([])
  const [redoStack, _setRedoStack] = useState<string[]>([])

  // Refs are needed to make the current, up to date state accessible in
  // the event handlers these are passed to and called from in the end.
  // Because of these, the state should be only updated using the helpers here,
  // so that the refs always keep in sync
  const undoStackRef = useRef(undoStack)
  const redoStackRef = useRef(redoStack)

  const updateUndoStack = (stack: string[]) => {
    _setUndoStack(stack)
    undoStackRef.current = stack
  }

  const updateRedoStack = (stack: string[]) => {
    _setRedoStack(stack)
    redoStackRef.current = stack
  }

  const canUndo = undoStack.length > 0
  const canRedo = redoStack.length > 0

  function clear() {
    updateUndoStack([])
    updateRedoStack([])
  }

  function write(value: string) {
    //console.log(value, undoStack.at(-1))
    if (value === undoStackRef.current.at(-1)) return

    updateUndoStack([...undoStackRef.current, value])
    updateRedoStack([])
  }

  function undo() {
    const [rest, newValue] = popUndoStack(undoStack)
    if (!newValue) return null

    updateRedoStack([...redoStackRef.current, undoStackRef.current.at(-1) ?? ''])
    updateUndoStack(rest)
    return newValue
  }

  function redo() {
    const [rest, newValue] = popRedoStack(redoStack)
    if (!newValue) return null

    updateRedoStack(rest)
    updateUndoStack([...undoStackRef.current, newValue])
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
