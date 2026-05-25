type Shortcut = {
  key: string
  meta?: boolean
  ctrl?: boolean
  shift?: boolean
}

export function isMatch(event: KeyboardEvent, shortcut: Shortcut): boolean {
  return (
    event.key.toLowerCase() === shortcut.key.toLowerCase() &&
    !!event.metaKey === !!shortcut.meta &&
    !!event.ctrlKey === !!shortcut.ctrl &&
    !!event.shiftKey === !!shortcut.shift
  )
}

const isMac = () => navigator?.platform.startsWith('Mac') ?? false

const ctrl = (key: string): Shortcut => ({ key, ctrl: true })
const cmd = (key: string): Shortcut => ({ key, meta: true })
const cmdShift = (key: string): Shortcut => ({ key, meta: true, shift: true })

export const undoShortcut = isMac() ? cmd('z') : ctrl('z')
export const redoShortcut = isMac() ? cmdShift('z') : ctrl('y')
