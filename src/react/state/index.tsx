import { createRoot, Root, Container } from 'react-dom/client'
import { MathField } from '@digabi/mathquill'
import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react'

import useHistory from './history'
import useMap, { MapHookHandle } from '../hooks/use-map'
import useMutationObserver from '../hooks/use-mutation-observer'

import MathBox, { Props as MathBoxProps } from '../components/math-box'
import { createMathStub, createMathStubAtSelection, MATH_EDITOR_CLASS } from '../utils/create-math-stub'

type EditorState = {
  /** Ref to the main text-area (which is a `contenteditable` `<div />`) */
  ref: React.RefObject<HTMLDivElement>

  /** Mapping of DOM `Node`s to the React `Root`s mounted in them */
  roots: MapHookHandle<Node, Root>

  /**
   * Spawns a new Math/LaTeX editing box at the given node.
   * The created React `Root` will be associated with the given node in the {@link EditorState.roots} map.
   */
  spawnMathBox(stub: Container): void
  spawnMathBoxAtCursor(): void

  isToolbarOpen: boolean
  isMathbarOpen: boolean
  showToolbar: () => void
  hideToolbar: () => void

  // TODO: Move handle to its own type
  setActiveMathBox: (handle: { mq: MathField; close: () => void } | null) => void
  activeMathBox: { mq: MathField; close: () => void } | null

  canUndo: boolean
  canRedo: boolean
}

const editorCtx = createContext<EditorState>(null!)

export default function useEditorState() {
  const ctx = useContext(editorCtx)
  if (!ctx) throw Error('Tried to use Editor State Context outside a Provider')
  return ctx
}

export function EditorStateProvider({ children }: PropsWithChildren) {
  const [isToolbarOpen, setIsToolbarOpen] = useState(false)
  const [isMathbarOpen, setIsMathbarOpen] = useState(false)
  const [activeMathBox, setActiveMathBox] = useState<{ mq: MathField; close: () => void } | null>(null)
  const roots = useMap<Node, Root>()
  const history = useHistory()
  const ref = useRef<HTMLDivElement>(null)

  useMutationObserver(ref, function unmountRemovedRoots(muts) {
    muts
      .flatMap((m) => Array.from(m.removedNodes))
      .filter((node) => roots.has(node))
      .forEach((node) => {
        roots.get(node)!.unmount()
        roots.delete(node)
      })
  })

  function spawnMathBox(stub: Container, props?: MathBoxProps) {
    const root = createRoot(stub)

    // TODO: This should probs be `onFocus` that's called by default
    function onOpen(handle: any) {
      history.clear()
      setActiveMathBox(handle)
    }

    function onBlur() {
      setActiveMathBox(null)
    }

    roots.set(stub, root)
    root.render(<MathBox onOpen={onOpen} onBlur={onBlur} {...props} />)
  }

  function spawnMathBoxAtCursor() {
    spawnMathBox(createMathStubAtSelection(), { initialOpen: true })
  }

  function initMathBoxes() {
    if (!ref.current) return

    // These are existing and copy-pasted math editors
    const mathBoxes = Array.from(ref.current.querySelectorAll(`span.${MATH_EDITOR_CLASS}`))
    // These are math images copied from cheat, 'marked' to be replaced with math editors
    const mathImages = Array.from(ref.current.querySelectorAll('[data-math-svg="true"]'))

    const allBoxes = ([] as [elementToInit: Element, initialLatex: string][])
      .concat(
        mathBoxes
          .filter((elem) => !roots.has(elem) && elem.querySelector('img')?.alt)
          .map((elem) => [elem, elem.querySelector('img')!.alt] as const),
      )
      .concat(
        mathImages
          .filter((elem) => !roots.has(elem) && elem instanceof HTMLImageElement && elem.alt)
          .map((elem) => [elem, (elem as HTMLImageElement).alt]),
      )

    for (const [box, initialLatex] of allBoxes) {
      const stub = createMathStub()
      box.replaceWith(stub)
      spawnMathBox(stub, { initialLatex })
    }
  }

  return (
    <editorCtx.Provider
      value={{
        isToolbarOpen,
        isMathbarOpen,
        showToolbar: () => setIsToolbarOpen(true),
        hideToolbar: () => setIsToolbarOpen(false),

        activeMathBox,
        setActiveMathBox,

        ref,

        roots,

        spawnMathBox,
        spawnMathBoxAtCursor,

        canUndo: false,
        canRedo: false,
      }}
    >
      {children}
    </editorCtx.Provider>
  )
}
