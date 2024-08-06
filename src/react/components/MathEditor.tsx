import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { getMathSvg } from '../mathSvg'
import { Translation } from '../utility'
import LatexError from '../resources/LatexError'

interface MathEditorProps {
  mathQuill: any
  onCancelEditor: () => void
  initialLatex?: string
  t: Translation['editor']
  setIsUndoAvailable: (state: boolean) => void
  setIsRedoAvailable: (state: boolean) => void
  onClose: () => void
}

export interface MathEditorHandle {
  insertCharacterAtCursor: (latex: string) => void
  undo: () => void
  redo: () => void
}

export const MathEditor = forwardRef<MathEditorHandle, MathEditorProps>(
  ({ mathQuill, onCancelEditor, initialLatex, t, setIsUndoAvailable, setIsRedoAvailable, onClose }, ref) => {
    const mathFieldElementRef = useRef<HTMLDivElement>(null)
    const [mathField, setMathField] = useState(undefined)
    const mathEditorContainerRef = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState(true)
    const [mathLatex, setMathLatex] = useState<string>('')
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

    const updateMathField = (field: any) => {
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
      mathFieldObjectRef.current.latex(latex)
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

    const popUndoStack = (stack: string[]): [string, string, string[]] => {
      const currentContent = stack.at(-1)
      const lastContent = stack.at(-2)
      const newUndoStack = stack.slice(0, -1)
      return [currentContent, lastContent, newUndoStack]
    }

    const popRedoStack = (stack: string[]): [string, string[]] => {
      const lastContent = stack.at(-1)
      const newRedoStack = stack.slice(0, -1)
      return [lastContent, newRedoStack]
    }

    const undo = () => {
      const [oldContent, newContent, newStack] = popUndoStack(undoStackRef.current)
      updateUndoStack(newStack)
      updateRedoStack([...redoStackRef.current, oldContent])
      setIsEditingManually(false)
      //mathFieldObjectRef.current.latex(newContent ?? '')
      setMathLatexWithoutClearingRedoQueue(newContent ?? '')
      setIsEditingManually(true)
    }

    const redo = () => {
      const [newContent, newStack] = popRedoStack(redoStackRef.current)
      if (newContent !== undefined) {
        updateRedoStack(newStack)
        updateUndoStack([...undoStackRef.current, latexRef.current])
        setIsEditingManually(false)
        //mathFieldObjectRef.current.latex(newContent)
        setMathLatexWithoutClearingRedoQueue(newContent)
        setIsEditingManually(true)
      }
    }

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

    useEffect(() => {
      if (!mathFieldElementRef.current || mathField) return
      const field = mathQuill.MathField(mathFieldElementRef.current, {
        handlers: {
          edit: (field) => onMathEditRef.current(field.latex()),
          enter: () => {},
        },
      })
      updateMathField(field)
    }, [mathFieldElementRef.current])

    useEffect(() => {
      if (mathField && isOpen && !hasInitialized) {
        mathField.focus()

        if (isFirstOpen) {
          mathField.cmd(initialLatex ?? '')
        } else {
          mathField.latex(mathLatex)
        }

        setHasInitialized(true)
        setIsFirstOpen(false)
      }
    }, [isFirstOpen, isOpen, hasInitialized, mathFieldElementRef.current])

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
      mathFieldObjectRef.current.cmd(latex)
    }

    useImperativeHandle(
      ref,
      () => ({
        insertCharacterAtCursor: insertCharacterAtCursor,
        isOpen: isOpen,
        undo: undo,
        redo: redo,
        //isUndoAvailable: canUndo,
        //isRedoAvailable: canRedo,
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
              if (!mathEditorContainerRef?.current.contains(e.relatedTarget)) {
                closeEditor()
              }
            }}
            onChange={(e) => {
              onMathEdit(e.target.value)
              mathField.latex(e.target.value)
              setIsValidLatex(validateLatex())
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
