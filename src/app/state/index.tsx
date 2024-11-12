import { createContext, PropsWithChildren, ReactPortal, useContext, useEffect, useRef, useState } from 'react'
import { Container } from 'react-dom/client'

import useHistory from './history'
import useMap, { MapHookHandle } from '../hooks/use-map'

import MathEditor, { MathEditorHandle, Props as MathEditorProps } from '../components/math-editor'
import { createMathStub } from '../utils/create-math-stub'

import FI from '../../FI'
import SV from '../../SV'
import { createPortal } from 'react-dom'
import { getAnswer } from '../utility'
import { RichTextEditorProps } from '../index'

export type EditorState = {
  /** Ref to the main text-area (which is a `contenteditable` `<div />`) */
  ref: React.RefObject<HTMLDivElement>

  mathEditorPortal: [portalRoot: Node, portal: ReactPortal] | null

  spawnMathEditorAtCursor(): void
  spawnMathEditorInNewLine(afterElement: Element): void

  isToolbarOpen: boolean
  isMathToolbarOpen: boolean
  showToolbar: () => void
  hideToolbar: () => void

  isToolbarExpanded: boolean
  expandToolbar: () => void
  collapseToolbar: () => void

  handlePastedImage: NonNullable<RichTextEditorProps['getPasteSource']>
  allowedFileTypes: NonNullable<RichTextEditorProps['allowedFileTypes']>

  isHelpDialogOpen: boolean
  showHelpDialog: () => void
  hideHelpDialog: () => void

  setActiveMathEditor: (handle: MathEditorHandle | null) => void
  activeMathEditor: MathEditorHandle | null

  /**
   * Finds all math-editor boxes in the text area and makes them interactive.
   * Should be called after e.g. pasting in new content.
   */
  initMathImages: () => void

  t: typeof FI

  /** Called when answer has changed. This needs to happen on this level,
   * as programmatic changes to the answer (e.g. creating and editing equations)
   * do not trigger the main text area's `onInput` event so we need a mechanism to
   * trigger this from multiple places
   */
  onAnswerChange: () => void
  initialValue?: string
  baseUrl: string
} & Pick<ReturnType<typeof useHistory>, 'undo' | 'redo' | 'canUndo' | 'canRedo'>

const editorCtx = createContext<EditorState>(null!)

export default function useEditorState() {
  const ctx = useContext(editorCtx)
  if (!ctx) throw Error('Tried to use Editor State Context outside a Provider')
  return ctx
}

let nextKey = 0

const getNextKey = () => {
  const next = nextKey
  nextKey = next + 1
  return next
}

const defaultPasteSource = (file: File): Promise<string> =>
  new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (evt) => resolve(reader.result as string)
    reader.readAsDataURL(file)
  })

const setCursorAroundElement = (element: Container, position: 'before' | 'after' = 'after') => {
  const selection = window.getSelection()
  const range = document.createRange()
  if (position === 'before') {
    range.setStartBefore(element)
  } else {
    range.setStartAfter(element)
  }
  range.collapse(true)
  selection?.removeAllRanges()
  selection?.addRange(range)
}

type EditorStateProps = PropsWithChildren<Omit<RichTextEditorProps, 'textAreaProps' | 'toolbarRoot'>>

export function EditorStateProvider({
  children,
  language = 'FI',
  getPasteSource = defaultPasteSource,
  allowedFileTypes = ['image/png', 'image/jpeg'],
  onValueChange = () => {},
  initialValue = '',
  baseUrl = '',
}: EditorStateProps) {
  const [isToolbarOpen, setIsToolbarOpen] = useState(false)
  const [isMathToolbarOpen, setIsMathToolbarOpen] = useState(false)
  const [isToolbarExpanded, setIsToolbarExpanded] = useState(false)
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false)
  const [activeMathEditor, setActiveMathEditor] = useState<MathEditorHandle | null>(null)
  const [hasBeenInitialized, setHasBeenInitialized] = useState(false)

  /** url search parameter for dev use
   * `?forceToolbars=1` to force basic toolbar to stay open
   * `?forceToolbars=2` to force basic and math toolbars to stay open
   * NOTE: Using this will likely cause things to break, as this is for debug/dev reasons
   * */
  const forceToolbarsOpen = new URL(window.location.href).searchParams.get('forceToolbars') ?? '0'

  const [mathEditorPortal, setMathEditorPortal] = useState<[portalRoot: Node, portal: ReactPortal] | null>(null)
  const history = useHistory()
  const mainTextAreaRef = useRef<HTMLDivElement>(null)

  const t = { FI, SV }[language]

  function spawnMathEditor(stub: Container, image: Element, props?: Partial<MathEditorProps>) {
    // This is called both on the creation of the component and each time the equation is opened after that
    function onOpen(handle: MathEditorHandle) {
      history.clear()
      setActiveMathEditor(handle)
      setIsToolbarOpen(true)
      setIsMathToolbarOpen(true)
    }

    function onBlur(forceCursorPosition?: 'before' | 'after') {
      setActiveMathEditor(null)
      setIsMathToolbarOpen(false)

      history.clear()
      onAnswerChange()

      if (forceCursorPosition) {
        setCursorAroundElement(stub, forceCursorPosition)
      }
    }

    function onChange(latex: string) {
      history.write(latex)
    }

    function onEditorRemoved(latex: string) {
      setMathEditorPortal(null)
      const stubElement = stub as HTMLElement
      stubElement.remove()
      if (!latex) {
        image.remove()
      }
      history.clear()
    }

    function onEnter() {
      if (image) spawnMathEditorInNewLine(image)
    }

    const portal = createPortal(
      <MathEditor
        onOpen={onOpen}
        onBlur={onBlur}
        onChange={onChange}
        onEditorRemoved={onEditorRemoved}
        onEnter={onEnter}
        errorText={t.editor.render_error}
        {...props}
      />,
      stub,
    )
    setMathEditorPortal([stub, portal])
  }

  const onLatexUpdate = (img: Element) => (latex: string) => {
    img.setAttribute('src', `${baseUrl}/math.svg?latex=${encodeURIComponent(latex)}`)
    img.setAttribute('alt', latex)
  }

  function onMathImageClick(img: Element, e: Event) {
    e.stopPropagation()
    e.preventDefault()
    const stub = createMathStub(getNextKey())
    mainTextAreaRef.current?.insertBefore(stub, img.nextSibling)

    spawnMathEditor(stub, img, { initialLatex: img.getAttribute('alt'), onLatexUpdate: onLatexUpdate(img) })
  }

  function createMathImage() {
    const mathImage = document.createElement('img')
    mathImage.addEventListener('click', (e) => onMathImageClick(mathImage, e))
    mathImage.setAttribute('initialized', '')
    return mathImage
  }

  function spawnMathEditorAtCursor() {
    const mathImage = createMathImage()
    spawnMathEditor(createMathStub(getNextKey(), true, mathImage), mathImage, {
      onLatexUpdate: onLatexUpdate(mathImage),
    })
  }

  function spawnMathEditorInNewLine(afterElement: Element) {
    const mathImage = createMathImage()

    const newStub = createMathStub(getNextKey(), false, mathImage)
    const nextSibling = afterElement.nextSibling

    mainTextAreaRef.current?.insertBefore(document.createElement('br'), nextSibling)
    mainTextAreaRef.current?.insertBefore(mathImage, nextSibling)
    mainTextAreaRef.current?.insertBefore(newStub, nextSibling)
    spawnMathEditor(newStub, mathImage, { onLatexUpdate: onLatexUpdate(mathImage) })
  }

  function initMathImages() {
    if (mainTextAreaRef.current) {
      Array.from(mainTextAreaRef.current.querySelectorAll('img[src*="/math.svg?"][alt]:not([initialized])')).forEach(
        (oldImage) => {
          const mathImage = createMathImage()
          const src = oldImage.getAttribute('src')
          if (src) {
            const { origin, pathname, search } = new URL(src)
            if (origin !== baseUrl) {
              mathImage.setAttribute('src', `${baseUrl}${pathname}${search}`)
            } else {
              mathImage.setAttribute('src', src)
            }
          }
          mathImage.setAttribute('alt', oldImage.getAttribute('alt') ?? '')
          oldImage.replaceWith(mathImage)
        },
      )
    }
  }

  function onAnswerChange() {
    /** This 0ms timeout is crucial - it essentially moves the callback into the next event loop,
     * after pending DOM changes have been made in the current loop (in practice,
     * this is needed because closing a math editor changes the HTML of the answer,
     * but doesn't trigger the text area's onInput event. With this hack we can get the answer HTML with
     * the changes already included.)
     */
    const fn = () => {
      const content = mainTextAreaRef.current?.innerHTML
      if (content) {
        onValueChange(getAnswer(content))
      }
    }
    setTimeout(fn, 0)
  }

  /** This will initialize any equations present in the initial content */
  useEffect(() => {
    if (!hasBeenInitialized && mainTextAreaRef.current) {
      if (initialValue) {
        mainTextAreaRef.current.innerHTML = initialValue
      }
      setTimeout(() => {
        initMathImages()
        setHasBeenInitialized(true)
      }, 0)
    }
  }, [hasBeenInitialized, initialValue, mainTextAreaRef.current])

  return (
    <editorCtx.Provider
      value={{
        isToolbarOpen: forceToolbarsOpen !== '0' || isToolbarOpen,
        isMathToolbarOpen: forceToolbarsOpen === '2' || isMathToolbarOpen,
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

        mathEditorPortal: mathEditorPortal,

        spawnMathEditorAtCursor: spawnMathEditorAtCursor,
        spawnMathEditorInNewLine: spawnMathEditorInNewLine,
        initMathImages,

        canUndo: history.canUndo,
        canRedo: history.canRedo,
        undo: history.undo,
        redo: history.redo,

        t,
        handlePastedImage: getPasteSource,
        allowedFileTypes,
        onAnswerChange,
        initialValue,
        baseUrl,
      }}
    >
      {children}
    </editorCtx.Provider>
  )
}
