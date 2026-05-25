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

export const isMac = (): boolean => navigator?.platform.startsWith('Mac') ?? false

export const getPasteShortcutLabel = (): string => (isMac() ? 'Cmd-V' : 'Ctrl-V')
export const getCutShortcutLabel = (): string => (isMac() ? 'Cmd-X' : 'Ctrl-X')

const ctrl = (key: string): Shortcut => ({ key, ctrl: true })
const cmd = (key: string): Shortcut => ({ key, meta: true })
const cmdShift = (key: string): Shortcut => ({ key, meta: true, shift: true })

export const undoShortcut = isMac() ? cmd('z') : ctrl('z')
export const redoShortcut = isMac() ? cmdShift('z') : ctrl('y')
