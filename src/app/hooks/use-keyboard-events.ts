import { useEffect } from 'react'

export const useKeyboardEventListener = (keyMatch: (e: KeyboardEvent) => boolean, fn: (e?: KeyboardEvent) => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (keyMatch(event)) {
        event.preventDefault()
        fn(event)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [keyMatch, fn])
}
