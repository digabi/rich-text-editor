import { useEffect } from 'react'

export const useKeyboardEventListener = (
  key: string,
  ctrl: boolean,
  fn: (e?: KeyboardEvent) => void,
  preventDefault: boolean = true,
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!ctrl || (ctrl && event.ctrlKey)) {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          if (preventDefault) {
            event.preventDefault()
          }
          fn(event)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [key, fn])
}
