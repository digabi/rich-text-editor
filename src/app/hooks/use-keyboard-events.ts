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
        shortcut.fn(event)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [shortcuts])
}
