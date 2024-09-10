import { useState } from 'react'

export default function useHistory() {
  const [undoStack, setUndoStack] = useState<string[]>([])
  const [redoStack, setRedoStack] = useState<string[]>([])

  const canUndo = undoStack.length > 0
  const canRedo = redoStack.length > 0

  function clear() {
    setRedoStack([])
    setUndoStack([])
  }

  function write(value: string) {
    if (value === '') return

    setRedoStack([])
    setUndoStack((s) => [...s, value])
  }

  function undo() {
    const value = undoStack.pop()
    if (!value) return null

    setRedoStack((s) => [...s, value])
    return value
  }

  function redo() {
    const value = redoStack.pop()
    if (!value) return null

    setUndoStack((s) => [...s, value])
    return value
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
