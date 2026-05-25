import { useEffect } from 'react'

type KeyboardEventShortcut = {
  keyMatch: (e: KeyboardEvent) => boolean
  fn: (e?: KeyboardEvent) => void
}

export const useKeyboardEventListener = (shortcuts: KeyboardEventShortcut[]) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const shortcut = shortcuts.find(({ keyMatch }) => keyMatch(event))

      if (shortcut) {
        event.preventDefault()
        event.stopPropagation() // Prevent browser's native handling of the shortcut, as it would cause strange behaviour especially when mixed with our own implementation
        shortcut.fn(event)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [shortcuts])
}
