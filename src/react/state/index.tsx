import { createContext, PropsWithChildren, ReactPortal, useContext, useRef, useState } from 'react'
import { Container } from 'react-dom/client'
import { MathField } from '@digabi/mathquill'

import useHistory from './history'
import useMap, { MapHookHandle } from '../hooks/use-map'
import useMutationObserver from '../hooks/use-mutation-observer'

import { Props as RichTextEditorProps } from '../rich-text-editor'

import MathEditor, { MathEditorHandle, Props as MathEditorProps } from '../components/math-editor'
import { createMathStub, MATH_EDITOR_CLASS } from '../utils/create-math-stub'

import FI from '../../FI'
import SV from '../../SV'
import { createPortal } from 'react-dom'

export type Props = RichTextEditorProps

export type EditorState = {
  /** Ref to the main text-area (which is a `contenteditable` `<div />`) */
  ref: React.RefObject<HTMLDivElement>

  /** An ES6 `Map` of DOM `Node`s to the React `Root`s mounted in them */
  mathEditorPortals: MapHookHandle<Node, ReactPortal>

  /**
   * Spawns a new Math/LaTeX editing box at the given node.
   * The created React `Root` will be associated with the given node in the
   * {@link EditorState.mathEditorPortals} Map.
   */
  spawnMathEditor(stub: Container): void
  spawnMathEditorAtCursor(): void

  isToolbarOpen: boolean
  isMathbarOpen: boolean
  showToolbar: () => void
  hideToolbar: () => void

  isToolbarExpanded: boolean
  expandToolbar: () => void
  collapseToolbar: () => void

  toolbarRoot: RichTextEditorProps['toolbarRoot']
  getPasteSource: NonNullable<RichTextEditorProps['getPasteSource']>

  isHelpDialogOpen: boolean
  showHelpDialog: () => void
  hideHelpDialog: () => void

  // TODO: Move handle to its own type
  setActiveMathEditor: (handle: { mq: MathField; close: () => void } | null) => void
  activeMathEditor: { mq: MathField; close: () => void } | null

  /**
   * Finds all math-editor boxes in the text area and makes them interactive.
   * Should be called after e.g. pasting in new content.
   */
  initMathEditors: () => void

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

export function EditorStateProvider({ children, language, toolbarRoot, getPasteSource }: PropsWithChildren<Props>) {
  const [isToolbarOpen, setIsToolbarOpen] = useState(false)
  const [isMathbarOpen, setIsMathbarOpen] = useState(false)
  const [isToolbarExpanded, setIsToolbarExpanded] = useState(false)
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false)
  const [activeMathEditor, setActiveMathEditor] = useState<MathEditorHandle | null>(null) // TODO: Move to own type
  const [nextKey, setNextKey] = useState(0)

  const mathEditorPortals = useMap<Node, ReactPortal>()
  const history = useHistory()
  const mainTextAreaRef = useRef<HTMLDivElement>(null)

  const t = { FI, SV }[language]

  const getNextKey = () => {
    const key = nextKey
    setNextKey((k) => k + 1)
    return key
  }

  // When a MathEditor's container element is removed,
  // we need to also remove the ReactPortal it was rendered in.
  // This is done by removing the portal from the map, as this means it will no
  // longer be rendered.
  useMutationObserver(mainTextAreaRef, function removeDanglingPortals(muts) {
    muts
      .flatMap((m) => Array.from(m.removedNodes))
      .filter((node) => mathEditorPortals.has(node))
      .forEach((node) => {
        mathEditorPortals.delete(node)
      })
  })

  function spawnMathEditor(stub: Container, props?: MathEditorProps) {
    // TODO: This should probs be `onFocus` that's called by default
    function onOpen(handle: MathEditorHandle) {
      history.clear()
      setActiveMathEditor(handle)
    }

    function onBlur() {
      setActiveMathEditor(null)
    }

    function onChange(latex: string) {
      console.log(latex)
    }

    const portal = createPortal(<MathEditor onOpen={onOpen} onBlur={onBlur} onChange={onChange} {...props} />, stub)
    mathEditorPortals.set(stub, portal)
  }

  function spawnMathEditorAtCursor() {
    spawnMathEditor(createMathStub(getNextKey(), true), { initialOpen: true })
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
          .filter((elem) => !mathEditorPortals.has(elem) && elem.querySelector('img')?.alt)
          .map((elem) => [elem, elem.querySelector('img')!.alt]),
      )
      .concat(
        mathImages
          .filter((elem) => !mathEditorPortals.has(elem) && elem instanceof HTMLImageElement && elem.alt)
          .map((elem) => [elem, (elem as HTMLImageElement).alt]),
      )

    for (const [box, initialLatex] of allBoxes) {
      const stub = createMathStub(getNextKey())
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

        isToolbarExpanded,
        expandToolbar: () => setIsToolbarExpanded(true),
        collapseToolbar: () => setIsToolbarExpanded(false),

        isHelpDialogOpen,
        showHelpDialog: () => setIsHelpDialogOpen(true),
        hideHelpDialog: () => setIsHelpDialogOpen(false),

        activeMathEditor: activeMathEditor,
        setActiveMathEditor: setActiveMathEditor,

        ref: mainTextAreaRef,

        mathEditorPortals: mathEditorPortals,

        spawnMathEditor: spawnMathEditor,
        spawnMathEditorAtCursor: spawnMathEditorAtCursor,
        initMathEditors,

        canUndo: false,
        canRedo: false,

        t,

        toolbarRoot,

        getPasteSource:
          getPasteSource ??
          function defaultPasteSource(file) {
            return new Promise((resolve) => {
              const reader = new FileReader()
              reader.onload = (evt) => resolve(reader.result as string)
              reader.readAsDataURL(file)
            })
          },
      }}
    >
      {children}
    </editorCtx.Provider>
  )
}
