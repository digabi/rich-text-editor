import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import ReactDOM from 'react-dom/client'
import { getMathSvg } from '../math'

interface MathEditorProps {
  mathQuill: any
  onClose: () => void
}

export interface MathEditorHandle {
  insertCharacterAtCursor: (latex: string) => void
}

export const MathEditor = forwardRef<MathEditorHandle, MathEditorProps>((props, ref) => {
  const { mathQuill, onClose } = props
  const mathFieldRef = useRef<HTMLDivElement>(null)
  const [mathField, setMathField] = useState(undefined)
  const mathEditorContainerRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(true)
  const [mathLatex, setMathLatex] = useState<string>(undefined)

  const close = () => {
    setIsOpen(false)
    onClose()
  }

  useEffect(() => {
    setMathField(
      mathQuill.MathField(mathFieldRef.current, {
        handlers: {
          edit: (field) => setMathLatex(field.latex()),
          enter: () => {},
        },
      }),
    )
  }, [mathQuill, mathFieldRef])

  useEffect(() => {
    if (mathField) {
      mathField.el().addEventListener('focusout', (e: FocusEvent) => {
        if (!mathEditorContainerRef?.current.contains(e.relatedTarget as Node)) {
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
    <div
      ref={mathEditorContainerRef}
      onBlur={(e) => {
        if (!mathEditorContainerRef?.current.contains(e.relatedTarget)) {
          close()
        }
      }}
    >
      <div className="math-editor" data-js="mathEditor">
        <div ref={mathFieldRef} className="math-editor-equation-field" data-js="equationField"></div>
        <textarea
          rows={1}
          className="math-editor-latex-field"
          data-js="latexField"
          placeholder="LaTeΧ"
          value={mathLatex}
        />
        <span className="render-error"></span>
      </div>
    </div>
  ) : mathLatex !== '' ? (
    <MathImage latex={mathLatex} openEditor={() => setIsOpen(true)} />
  ) : null
})

const MathImage = ({ latex, openEditor }: { latex: string; openEditor: () => void }) => (
  <img onClick={openEditor} src={`data:image/svg+xml;utf8,${encodeURIComponent(getMathSvg(latex))}`} alt={latex} />
)
