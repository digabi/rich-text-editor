import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react'
import { getMathSvg } from '../react/mathSvg'
import { Translation } from '../react/utility'
import LatexError from './LatexError'
import { MathField, MathQuill } from '@digabi/mathquill'

interface MathEditorProps {
  mathQuill: MathQuill
  onCancelEditor: () => void
  initialLatex?: string
  t: Translation['editor']
  setIsUndoAvailable: (state: boolean) => void
  setIsRedoAvailable: (state: boolean) => void
  onClose: () => void
  shouldOpen: boolean
  onOpen: () => void
}

export interface MathEditorHandle {
  insertCharacterAtCursor: (latex: string) => void
  undo: () => void
  redo: () => void
}

export const MathEditor = forwardRef<MathEditorHandle, MathEditorProps>(
  (
    { mathQuill, onCancelEditor, initialLatex, t, setIsUndoAvailable, setIsRedoAvailable, onClose, shouldOpen, onOpen },
    ref,
  ) => {
    //const mathFieldElementRef = useRef<HTMLDivElement>(null)
    const [mathField, setMathField] = useState<MathField | null>(null)
    const mathEditorContainerRef = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState(shouldOpen)
    const [mathLatex, setMathLatex] = useState<string>(initialLatex ?? '')
    const [hasInitialized, setHasInitialized] = useState(false)
    const [isFirstOpen, setIsFirstOpen] = useState(true)
    const [isValidLatex, setIsValidLatex] = useState(true)
    const [undoStack, setUndoStack] = useState<string[]>([])
    const [redoStack, setRedoStack] = useState<string[]>([])
    const [isEditingManually, setIsEditingManually] = useState(true)

    useEffect(() => {
      setIsUndoAvailable(undoStack.length > 0)
      setIsRedoAvailable(redoStack.length > 0)
    }, [mathLatex])

    // These refs are used to access current state values inside event listeners,
    // as without them the values would stay as they were when the event listeners were created
    const latexRef = useRef<string>(mathLatex)
    latexRef.current = mathLatex

    const mathFieldObjectRef = useRef(mathField)
    mathFieldObjectRef.current = mathField

    const undoStackRef = useRef(undoStack)
    undoStackRef.current = undoStack

    const redoStackRef = useRef(redoStack)
    redoStackRef.current = redoStack

    const isEditingManuallyRef = useRef(isEditingManually)
    isEditingManuallyRef.current = isEditingManually

    const validateLatex = () => mathField?.latex() !== '' || mathLatex.length === 0

    const updateMathField = (field: MathField | null) => {
      setMathField(field)
      mathFieldObjectRef.current = field
    }

    const updateUndoStack = (newStack: string[]) => {
      setUndoStack(newStack)
      undoStackRef.current = newStack
    }

    const updateRedoStack = (newStack: string[]) => {
      setRedoStack(newStack)
      redoStackRef.current = newStack
    }

    const addToUndoStack = (newLatex: string) => {
      const lastEntry = undoStackRef.current.at(-1)
      if (lastEntry !== newLatex && undoStackRef.current) {
        updateUndoStack([...undoStackRef.current, newLatex])
      }
    }
    const addToUndoStackRef = useRef(addToUndoStack)

    const setMathLatexWithoutClearingRedoQueue = (latex: string) => {
      setIsEditingManually(false)
      isEditingManuallyRef.current = false
      mathFieldObjectRef?.current?.latex(latex)
      setIsEditingManually(true)
      isEditingManuallyRef.current = true
    }

    const onMathEdit = (newLatex: string) => {
      if (latexRef.current !== newLatex) {
        addToUndoStackRef.current(newLatex)
        setMathLatex(newLatex)
        if (isEditingManuallyRef.current) {
          setRedoStack([])
        }
      }
    }

    const onMathEditRef = useRef(onMathEdit)

    const popUndoStack = (stack: string[]): [string | undefined, string | undefined, string[]] => {
      const currentContent = stack.at(-1)
      const lastContent = stack.at(-2)
      const newUndoStack = stack.slice(0, -1)
      return [currentContent, lastContent, newUndoStack]
    }

    const popRedoStack = (stack: string[]): [string | undefined, string[]] => {
      const lastContent = stack.at(-1)
      const newRedoStack = stack.slice(0, -1)
      return [lastContent, newRedoStack]
    }

    const undo = () => {
      const [oldContent, newContent, newStack] = popUndoStack(undoStackRef.current)
      if (oldContent && newContent) {
        updateUndoStack(newStack)
        updateRedoStack([...redoStackRef.current, oldContent])
        setIsEditingManually(false)
        setMathLatexWithoutClearingRedoQueue(newContent ?? '')
        setIsEditingManually(true)
      }
    }

    const redo = () => {
      const [newContent, newStack] = popRedoStack(redoStackRef.current)
      if (newContent !== undefined) {
        updateRedoStack(newStack)
        updateUndoStack([...undoStackRef.current, latexRef.current])
        setIsEditingManually(false)
        setMathLatexWithoutClearingRedoQueue(newContent)
        setIsEditingManually(true)
      }
    }

    useEffect(() => {
      const handleUndoRedoKeys = (event: KeyboardEvent) => {
        if (isOpen && mathEditorContainerRef.current?.contains(document.activeElement)) {
          if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
            event.preventDefault()
            event.stopPropagation()
            undo()
          } else if ((event.ctrlKey || event.metaKey) && event.key === 'y') {
            event.preventDefault()
            event.stopPropagation()
            redo()
          }
        }
      }

      window.addEventListener('keydown', handleUndoRedoKeys)

      return () => {
        window.removeEventListener('keydown', handleUndoRedoKeys)
      }
    }, [])

    const closeEditor = () => {
      setIsOpen(false)
      if (latexRef.current?.trim() === '') {
        onCancelEditor()
      }
      setHasInitialized(false)
      updateMathField(null)
      onClose()
    }

    const openEditor = () => {
      setIsOpen(true)
    }

    const mathFieldElementRef = useCallback((node: HTMLDivElement | null) => {
      if (node !== null) {
        const field = mathQuill.MathField(node, {
          handlers: {
            edit: (field) => onMathEdit(field.latex()),
            enter: () => {},
          },
        })
        updateMathField(field)
      }
    }, [])

    useEffect(() => {
      if (mathField && isOpen && !hasInitialized) {
        mathField.focus()

        mathField.latex(mathLatex)

        setHasInitialized(true)
        setIsFirstOpen(false)
        onOpen()
      }
    }, [isFirstOpen, isOpen, hasInitialized, mathField])

    useEffect(() => {
      if (mathField) {
        mathField.el().addEventListener('focusout', (e: FocusEvent) => {
          if (!mathEditorContainerRef?.current?.contains(e.relatedTarget as Node)) {
            closeEditor()
          }
        })
      }
    }, [mathField])

    const insertCharacterAtCursor = (latex: string) => {
      mathFieldObjectRef?.current?.cmd(latex)
    }

    useImperativeHandle(
      ref,
      () => ({
        insertCharacterAtCursor: insertCharacterAtCursor,
        isOpen: isOpen,
        undo: undo,
        redo: redo,
      }),
      [insertCharacterAtCursor, isOpen, undo, redo, undoStack, redoStack, mathLatex],
    )

    return isOpen ? (
      <div ref={mathEditorContainerRef}>
        <div className="math-editor" data-js="mathEditor">
          <div ref={mathFieldElementRef} className="math-editor-equation-field" data-js="equationField"></div>
          <textarea
            rows={1}
            className="math-editor-latex-field"
            data-js="latexField"
            placeholder="LaTeΧ"
            value={mathLatex}
            onBlur={(e) => {
              if (mathEditorContainerRef?.current && !mathEditorContainerRef.current.contains(e.relatedTarget)) {
                closeEditor()
              }
            }}
            onChange={(e) => {
              if (mathField) {
                onMathEdit(e.target.value)
                mathField.latex(e.target.value)
                setIsValidLatex(validateLatex())
              }
            }}
          />
          {!isValidLatex ? <span className="render-error">{t.render_error}</span> : null}
        </div>
      </div>
    ) : mathLatex !== '' ? (
      isValidLatex ? (
        <MathImage latex={mathLatex} openEditor={openEditor} />
      ) : (
        <LatexError onClick={openEditor} title="Virhe LaTeX-koodissa / Fel i LaTeX-koden" />
      )
    ) : null
  },
)

const MathImage = ({ latex, openEditor }: { latex: string; openEditor: () => void }) => (
  <img onClick={openEditor} src={`data:image/svg+xml;utf8,${encodeURIComponent(getMathSvg(latex))}`} alt={latex} />
)
