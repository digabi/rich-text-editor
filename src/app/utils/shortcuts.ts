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

export const getCmdOrCtrlLabel = (): 'Cmd' | 'Ctrl' => (isMac() ? 'Cmd' : 'Ctrl')

export const undoShortcut = isMac() ? { meta: true, key: 'z' } : { ctrl: true, key: 'z' }
export const redoShortcut: Shortcut = isMac() ? { meta: true, shift: true, key: 'z' } : { ctrl: true, key: 'y' }
