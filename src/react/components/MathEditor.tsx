import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import ReactDOM from 'react-dom/client'
import { getMathSvg } from '../math'

interface MathEditorProps {
  mathQuill: any
  onCancelEditor: () => void
  initialLatex?: string
}

export interface MathEditorHandle {
  insertCharacterAtCursor: (latex: string) => void
}

export const MathEditor = forwardRef<MathEditorHandle, MathEditorProps>((props, ref) => {
  const { mathQuill, onCancelEditor, initialLatex } = props
  const mathFieldElementRef = useRef<HTMLDivElement>(null)
  const [mathField, setMathField] = useState(undefined)
  const mathEditorContainerRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(true)
  const [mathLatex, setMathLatex] = useState<string>('')
  const [hasInitialized, setHasInitialized] = useState(false)
  const [isFirstOpen, setIsFirstOpen] = useState(true)

  // ref needed to access state value in event listener
  const latexRef = useRef<string>('')
  latexRef.current = mathLatex

  const mathFieldObjectRef = useRef(mathField)
  mathFieldObjectRef.current = mathField

  const updateMathField = (field: any) => {
    setMathField(field)
    mathFieldObjectRef.current = field
  }

  const close = () => {
    setIsOpen(false)
    if (latexRef.current?.trim() === '') {
      onCancelEditor()
    }
    setHasInitialized(false)
    updateMathField(null)
  }

  const open = () => {
    setIsOpen(true)
  }

  useEffect(() => {
    if (!mathFieldElementRef.current || mathField) return
    const field = mathQuill.MathField(mathFieldElementRef.current, {
      handlers: {
        edit: (field) => setMathLatex(field.latex()),
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
          close()
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
    }),
    [],
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
          readOnly
          onBlur={(e) => {
            if (!mathEditorContainerRef?.current.contains(e.relatedTarget)) {
              close()
            }
          }}
        />
        <span className="render-error"></span>
      </div>
    </div>
  ) : mathLatex !== '' ? (
    <MathImage latex={mathLatex} openEditor={open} />
  ) : null
})

const MathImage = ({ latex, openEditor }: { latex: string; openEditor: () => void }) => (
  <img onClick={openEditor} src={`data:image/svg+xml;utf8,${encodeURIComponent(getMathSvg(latex))}`} alt={latex} />
)
