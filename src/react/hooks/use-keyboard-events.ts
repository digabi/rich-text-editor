import { useEffect } from 'react'

export const useKeyboardEventListener = (key: string, fn: () => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey) {
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
