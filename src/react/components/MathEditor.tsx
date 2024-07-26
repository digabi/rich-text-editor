import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import ReactDOM from 'react-dom/client'
import { getMathSvg } from '../math'

interface MathEditorProps {
  mathQuill: any
  onCancelEditor: () => void
}

export interface MathEditorHandle {
  insertCharacterAtCursor: (latex: string) => void
}

export const MathEditor = forwardRef<MathEditorHandle, MathEditorProps>((props, ref) => {
  const { mathQuill, onCancelEditor } = props
  const mathFieldRef = useRef<HTMLDivElement>(null)
  const [mathField, setMathField] = useState(undefined)
  const mathEditorContainerRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(true)
  const [mathLatex, setMathLatex] = useState<string>('')
  const [hasInitialized, setHasInitialized] = useState(false)

  // ref needed to access state value in event listener
  const latexRef = useRef<string>('')
  latexRef.current = mathLatex

  const close = () => {
    setIsOpen(false)
    if (latexRef.current?.trim() === '') {
      onCancelEditor()
    }
    setHasInitialized(false)
    setMathField(undefined)
  }

  const open = () => {
    setIsOpen(true)
  }

  useEffect(() => {
    if (!mathFieldRef.current || mathField) return
    const field = mathQuill.MathField(mathFieldRef.current, {
      handlers: {
        edit: (field) => setMathLatex(field.latex()),
        enter: () => {},
      },
    })
    setMathField(field)
  }, [mathFieldRef.current])

  useEffect(() => {
    if (mathField && isOpen && !hasInitialized) {
      mathField.focus()
      mathField.latex(mathLatex)
      setHasInitialized(true)
    }
  }, [isOpen, hasInitialized, mathFieldRef.current])

  useEffect(() => {
    if (mathField) {
      mathField.el().addEventListener('focusout', (e: FocusEvent) => {
        if (!mathEditorContainerRef?.current?.contains(e.relatedTarget as Node)) {
          close()
        }
      })
    }
  }, [mathField])

  useImperativeHandle(
    ref,
    () => ({
      insertCharacterAtCursor: (latex: string) => {
        mathField.write(latex)
      },
      isOpen: isOpen,
    }),
    [],
  )

  return isOpen ? (
    <div ref={mathEditorContainerRef}>
      <div className="math-editor" data-js="mathEditor">
        <div ref={mathFieldRef} className="math-editor-equation-field" data-js="equationField"></div>
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
