import { createContext, PropsWithChildren, useContext, useRef, useState } from 'react'
import { createRoot, Root, Container } from 'react-dom/client'
import { MathField } from '@digabi/mathquill'

import useHistory from './history'
import useMap, { MapHookHandle } from '../hooks/use-map'
import useMutationObserver from '../hooks/use-mutation-observer'

import MathEditor, { Props as MathEditorProps } from '../components/math-editor'
import { createMathStub, MATH_EDITOR_CLASS } from '../utils/create-math-stub'

import FI from '../../FI'
import SV from '../../SV'

type EditorState = {
  /** Ref to the main text-area (which is a `contenteditable` `<div />`) */
  ref: React.RefObject<HTMLDivElement>

  /** An ES6 `Map` of DOM `Node`s to the React `Root`s mounted in them */
  mathEditorRoots: MapHookHandle<Node, Root>

  /**
   * Spawns a new Math/LaTeX editing box at the given node.
   * The created React `Root` will be associated with the given node in the
   * {@link EditorState.mathEditorRoots} Map.
   */
  spawnMathEditor(stub: Container): void
  spawnMathEditorAtCursor(): void

  isToolbarOpen: boolean
  isMathbarOpen: boolean
  showToolbar: () => void
  hideToolbar: () => void

  toolbarRoot: HTMLElement

  isHelpDialogOpen: boolean
  showHelpDialog: () => void
  hideHelpDialog: () => void

  // TODO: Move handle to its own type
  setActiveMathEditor: (handle: { mq: MathField; close: () => void } | null) => void
  activeMathEditor: { mq: MathField; close: () => void } | null

  canUndo: boolean
  canRedo: boolean

  t: typeof FI
}

const editorCtx = createContext<EditorState>(null!)

export default function useEditorState() {
  const ctx = useContext(editorCtx)
  if (!ctx) throw Error('Tried to use Editor State Context outside a Provider')
  return ctx
}

export type EditorStateProviderProps = {
  language: 'FI' | 'SV'
  toolbarRoot: HTMLElement
}

export function EditorStateProvider({ children, language, toolbarRoot }: PropsWithChildren<Props>) {
  const [isToolbarOpen, setIsToolbarOpen] = useState(false)
  const [isMathbarOpen, setIsMathbarOpen] = useState(false)
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false)
  const [activeMathEditor, setActiveMathEditor] = useState<{ mq: MathField; close: () => void } | null>(null) // TODO: Move to own type

  const mathEditorRoots = useMap<Node, Root>()
  const history = useHistory()
  const mainTextAreaRef = useRef<HTMLDivElement>(null)

  const t = { FI, SV }[language]

  useMutationObserver(mainTextAreaRef, function unmountRemovedRoots(muts) {
    muts
      .flatMap((m) => Array.from(m.removedNodes))
      .filter((node) => mathEditorRoots.has(node))
      .forEach((node) => {
        mathEditorRoots.get(node)!.unmount()
        mathEditorRoots.delete(node)
      })
  })

  function spawnMathEditor(stub: Container, props?: MathEditorProps) {
    const root = createRoot(stub)

    // TODO: This should probs be `onFocus` that's called by default
    function onOpen(handle: any) {
      history.clear()
      setActiveMathEditor(handle)
    }

    function onBlur() {
      setActiveMathEditor(null)
    }

    mathEditorRoots.set(stub, root)
    root.render(<MathEditor onOpen={onOpen} onBlur={onBlur} {...props} />)
  }

  function spawnMathEditorAtCursor() {
    spawnMathEditor(createMathStub(true), { initialOpen: true })
  }

  function initMathEditors() {
    if (!mainTextAreaRef.current) return

    // These are existing and copy-pasted math editors
    const mathEditors = Array.from(mainTextAreaRef.current.querySelectorAll(`span.${MATH_EDITOR_CLASS}`))
    // These are math images copied from cheat, 'marked' to be replaced with math editors
    const mathImages = Array.from(mainTextAreaRef.current.querySelectorAll('[data-math-svg="true"]'))

    const allBoxes = ([] as [elementToInit: Element, initialLatex: string][])
      .concat(
        mathEditors
          .filter((elem) => !mathEditorRoots.has(elem) && elem.querySelector('img')?.alt)
          .map((elem) => [elem, elem.querySelector('img')!.alt]),
      )
      .concat(
        mathImages
          .filter((elem) => !mathEditorRoots.has(elem) && elem instanceof HTMLImageElement && elem.alt)
          .map((elem) => [elem, (elem as HTMLImageElement).alt]),
      )

    for (const [box, initialLatex] of allBoxes) {
      const stub = createMathStub()
      box.replaceWith(stub)
      spawnMathEditor(stub, { initialLatex })
    }
  }

  return (
    <editorCtx.Provider
      value={{
        isToolbarOpen,
        isMathbarOpen,
        showToolbar: () => setIsToolbarOpen(true),
        hideToolbar: () => setIsToolbarOpen(false),

        toolbarRoot,

        isHelpDialogOpen,
        showHelpDialog: () => setIsHelpDialogOpen(true),
        hideHelpDialog: () => setIsHelpDialogOpen(false),

        activeMathEditor: activeMathEditor,
        setActiveMathEditor: setActiveMathEditor,

        ref: mainTextAreaRef,

        mathEditorRoots: mathEditorRoots,

        spawnMathEditor: spawnMathEditor,
        spawnMathEditorAtCursor: spawnMathEditorAtCursor,

        canUndo: false,
        canRedo: false,

        t,
      }}
    >
      {children}
    </editorCtx.Provider>
  )
}
