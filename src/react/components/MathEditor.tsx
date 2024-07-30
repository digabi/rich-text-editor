import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import ReactDOM from 'react-dom/client'
import { getMathSvg } from '../math'
import { Translation } from '../utility'
import LatexError from '../resources/LatexError'

interface MathEditorProps {
  mathQuill: any
  onCancelEditor: () => void
  initialLatex?: string
  t: Translation['editor']
}

export interface MathEditorHandle {
  insertCharacterAtCursor: (latex: string) => void
  undo: () => void
  redo: () => void
}

export const MathEditor = forwardRef<MathEditorHandle, MathEditorProps>(
  ({ mathQuill, onCancelEditor, initialLatex, t }, ref) => {
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

    const validateLatex = () => mathField?.latex() !== '' || mathLatex.length === 0

    const updateMathField = (field: any) => {
      setMathField(field)
      mathFieldObjectRef.current = field
    }

    const updateUndoStack = (newStack: string[]) => {
      setUndoStack(newStack)
      undoStackRef.current = newStack
    }

    const addToUndoStack = (newLatex: string) => {
      const lastEntry = undoStackRef.current.at(-1)
      if (lastEntry !== newLatex && undoStackRef.current) {
        updateUndoStack([...undoStackRef.current, newLatex])
      }
    }

    const addToUndoStackRef = useRef(addToUndoStack)

    const onMathEdit = (newLatex: string) => {
      addToUndoStackRef.current(newLatex)
      setMathLatex(newLatex)
    }

    const onMathEditRef = useRef(onMathEdit)

    const popUndoStack = (): [string, string, string[]] => {
      const currentContent = undoStackRef.current.at(-1)
      const lastContent = undoStackRef.current.at(-2)
      const newUndoStack = undoStackRef.current.slice(0, -1)
      return [currentContent, lastContent, newUndoStack]
    }

    const undo = () => {
      const [, newContent, newStack] = popUndoStack()
      updateUndoStack(newStack)
      //setRedoStack([...redoStackRef.current, oldContent])
      mathFieldObjectRef.current.latex(newContent ?? '')
    }

    const popRedoStack = () => {
      const lastRedo = redoStackRef.current.at(-1)
      setRedoStack(redoStack.slice(0, -1))
      return lastRedo
    }

    const redo = () => {
      const lastRedo = popRedoStack()
      updateUndoStack([...undoStackRef.current, lastRedo])
      mathFieldObjectRef.current.latex(lastRedo)
    }

    const closeEditor = () => {
      setIsOpen(false)
      if (latexRef.current?.trim() === '') {
        onCancelEditor()
      }
      setHasInitialized(false)
      updateMathField(null)
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
