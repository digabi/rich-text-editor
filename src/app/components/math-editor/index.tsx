import { useEffect, useRef, useState, FocusEvent } from 'react'
import * as MathQuill from '@digabi/mathquill'

import useMathQuill from '../../hooks/use-mathquill'
import useEditorState from '../../state'
import { useKeyboardEventListener } from '../../hooks/use-keyboard-events'
import styled from 'styled-components'

export type MathEditorHandle = {
  mq: MathQuill.MathField
  setLatex: (latex: string) => void
}

export type Props = {
  errorText: string
  onOpen?: (handle: MathEditorHandle) => void
  initialLatex?: string | null
  onBlur?: (latex: string, forceCursorPosition?: 'before' | 'after') => void
  onChange?: (latex: string) => void
  onLatexUpdate?: (latex: string) => void
  onEnter: (latex: string) => void
}

const Error = styled.span`
  color: red;
  font-family: sans-serif;
  font-size: 16px;
  left: 0;
  padding: 5px 10px;
  pointer-events: none;
  position: absolute;
  top: 0;
  z-index: 2;
`

const MathEditorElement = styled.div`
  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  margin: 10px 0 0;
  position: relative;
  width: 100%;
  z-index: 1;
  border-top: 3px solid #caedff;
`

const MathEditorEquationField = styled.div`
  background: #fff;
  border: none;
  padding: 5px 10px;
  width: 50%;
`
const MathEditorLatexField = styled.textarea`
  border: none;
  box-shadow: none;
  font-size: 15px;
  height: auto;
  letter-spacing: 1px;
  padding: 5px 10px;
  resize: none;
  width: 50%;
`

export default function MathEditor(props: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [latex, setLatex] = useState(props.initialLatex ?? '')

  const { undoEquation, redoEquation } = useEditorState()

  const historyHandler = (fn: typeof undoEquation | typeof redoEquation) => () => {
    const oldValue = latex
    const newValue = fn()

    if (newValue !== undefined && newValue !== latex) {
      onChange(oldValue, newValue)
    }
  }

  useKeyboardEventListener('z', true, historyHandler(undoEquation))
  useKeyboardEventListener('y', true, historyHandler(redoEquation))

  const onChange = (oldValue: string | undefined, newValue: string) => {
    if (oldValue === newValue) return
    setLatex(newValue)
    props.onChange?.(newValue)
    props.onLatexUpdate?.(newValue)
  }

  const { ref: latexRef, isError, mq } = useMathQuill({ latex, onChange })

  useEffect(
    function signalOpenedMathEditor() {
      if (mq) {
        mq.focus()
        props.onOpen?.({
          mq,
          setLatex: (latex: string) => {
            onChange(undefined, latex)
          },
        })
      }
    },
    [mq],
  )

  const handleBlur = (e: FocusEvent<HTMLDivElement | HTMLTextAreaElement>) => {
    e.stopPropagation()
    e.preventDefault()
    // Don't trigger close event if clicked another element inside MathEditor
    if (e.target && !containerRef?.current?.contains(e.relatedTarget as Node)) {
      close()
    }
  }

  function close(forceCursorPosition?: 'before' | 'after') {
    props.onBlur?.(latex, forceCursorPosition)
  }

  return (
    <div ref={containerRef} data-testid="equation-editor" data-latex={latex}>
      <MathEditorElement className="math-editor" onBlur={handleBlur}>
        <MathEditorEquationField
          ref={latexRef}
          className="math-editor-equation-field"
          onKeyDown={(e) => {
            if (e.key === 'Tab' && e.shiftKey) {
              e.preventDefault()
              e.stopPropagation()
              close('before')
            } else if (e.key === 'Escape') {
              e.preventDefault()
              e.stopPropagation()
              close('after')
            } else if (e.key === 'Enter' && containerRef.current) {
              e.preventDefault()
              e.stopPropagation()
              props.onEnter(latex)
            }
          }}
        />
        <MathEditorLatexField
          className="math-editor-latex-field"
          placeholder="LaTeΧ"
          rows={1}
          value={latex}
          onChange={(e) => onChange(undefined, e.target.value)} // real oldLatex value here?
          onKeyDown={(e) => {
            if (e.key === 'Tab' && !e.shiftKey) {
              e?.preventDefault()
              e?.stopPropagation()
              close('after')
            } else if (e.key === 'Escape') {
              e?.preventDefault()
              e?.stopPropagation()
              close('after')
            }
          }}
        />
        {isError && <Error className="render-error">{props.errorText}</Error>}
      </MathEditorElement>
    </div>
  )
}
