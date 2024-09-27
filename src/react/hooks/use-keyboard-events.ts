import { useEffect } from 'react'

export const useKeyboardEventListener = (key: string, ctrl: boolean, fn: () => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!ctrl || (ctrl && event.ctrlKey)) {
        if (event.key === key) {
          event.preventDefault() // Prevent the default browser undo behavior
          fn()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [key, fn])
}
