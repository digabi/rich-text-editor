import { useEffect, useRef, useState } from 'react'
import * as MathQuill from '@digabi/mathquill'

import useMathQuill from '../../hooks/use-mathquill'
import LatexError from '../icons/latex-error'
import useEditorState from '../../state'
import { useKeyboardEventListener } from '../../hooks/use-keyboard-events'

export type MathEditorHandle = {
  mq: MathQuill.MathField
  close: () => void
  setLatex: (latex: string) => void
}

export type Props = {
  errorText: string
  onOpen?: (handle: MathEditorHandle) => void
  initialLatex?: string
  initialOpen?: boolean
  onBlur?: () => void
  onChange?: (latex: string) => void
  onEditorRemoved?: () => void
}

export default function MathEditor(props: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(props.initialOpen ?? false)
  const [latex, setLatex] = useState(props.initialLatex ?? '')

  const { baseUrl, undo, redo, spawnMathEditorInNewLine } = useEditorState()

  const historyHandler = (fn: typeof undo | typeof redo) => () => {
    const oldValue = latex
    const newValue = fn() ?? ''

    if (newValue !== latex) {
      onChange(oldValue, newValue)
    }
  }

  useKeyboardEventListener('z', true, historyHandler(undo))
  useKeyboardEventListener('y', true, historyHandler(redo))
  useKeyboardEventListener('Escape', false, close)

  const onChange = (oldValue: string | undefined, newValue: string) => {
    if (oldValue === newValue) return
    setLatex(newValue)
    props.onChange?.(newValue)
  }

  const onEnter = () => {
    spawnMathEditorInNewLine()
    close()
  }

  const { ref: latexRef, isError, mq } = useMathQuill({ latex, onChange, onEnter })

  useEffect(
    function signalOpenedMathEditor() {
      if (isOpen && mq) {
        mq.focus()
        props.onOpen?.({
          mq,
          close: () => setIsOpen(false),
          setLatex: (latex: string) => {
            onChange(undefined, latex)
          },
        })
      }
    },
    [isOpen, mq],
  )

  function close() {
    props.onBlur?.()
    setIsOpen(false)
  }

  function onBlur(e: React.FocusEvent) {
    // Only actually lose focus if neither of the two children is focused
    if (!containerRef?.current?.contains(e.relatedTarget)) {
      close()
    }
  }

  useEffect(() => {
    if (!isOpen && latex === '') {
      props.onEditorRemoved?.()
    }
  }, [isOpen, latex])

  if (isOpen) {
    return (
      <div ref={containerRef} data-testid="equation-editor" data-latex={latex}>
        <div className="math-editor">
          <div ref={latexRef} onBlur={onBlur} className="math-editor-equation-field" />
          <textarea
            className="math-editor-latex-field"
            placeholder="LaTeΧ"
            rows={1}
            value={latex}
            onChange={(e) => onChange(undefined, e.target.value)} // real oldLatex value here?
            onBlur={onBlur}
          />
          {isError && <span className="render-error">{props.errorText}</span>}
        </div>
      </div>
    )
  } else if (isError) {
    return (
      <LatexError
        title="Virhe LaTeX-koodissa / Fel i LaTeX-koden"
        latex={latex}
        onClick={() => setIsOpen(true) /* TODO Fix this */}
      />
    )
  } else if (latex !== '') {
    return (
      <img
        src={`${baseUrl}/math.svg?latex=${encodeURIComponent(latex)}`}
        data-math-svg={true}
        data-latex={latex}
        alt={latex}
        onClick={() => setIsOpen(true) /* TODO Fix this */}
      />
    )
  } else {
    return null
  }
}
