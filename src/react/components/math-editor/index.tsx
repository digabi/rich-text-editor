import { useEffect, useRef, useState } from 'react'
import * as MathQuill from '@digabi/mathquill'

import useMathQuill from '../../hooks/use-mathquill'
import LatexError from '../icons/latex-error'
import { getMathSvg } from '../../mathSvg'
import useHistory from '../../state/history'
import useEditorState from '../../state'
import { useKeyboardEventListener } from '../../hooks/use-keyboard-events'

export type MathEditorHandle = {
  mq: MathQuill.MathField
  close: () => void
}

export type Props = {
  errorText: string
  onOpen?: (handle: MathEditorHandle) => void
  initialLatex?: string
  initialOpen?: boolean
  onBlur?: () => void
  onChange?: (latex: string) => void
}

export default function MathEditor(props: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(props.initialOpen ?? false)
  const [latex, setLatex] = useState(props.initialLatex ?? '')

  const { undo, redo } = useEditorState()

  const historyHandler = (fn: typeof undo | typeof redo) => () => {
    const oldValue = latex
    const newValue = fn() ?? ''

    if (newValue !== latex) {
      onChange(oldValue, newValue)
    }
  }

  useKeyboardEventListener('z', historyHandler(undo))
  useKeyboardEventListener('y', historyHandler(redo))

  const onChange = (oldValue: string | undefined, newValue: string) => {
    if (oldValue === newValue) return
    setLatex(newValue)
    props.onChange?.(newValue)
  }

  const { ref: latexRef, isError, mq } = useMathQuill({ latex, onChange })

  useEffect(
    function signalOpenedMathEditor() {
      if (isOpen && mq) {
        mq.focus()
        props.onOpen?.({ mq, close: () => setIsOpen(false) })
      }
    },
    [isOpen, mq],
  )

  function onBlur(e: React.FocusEvent) {
    // Only actually lose focus if neither of the two children is focused
    if (!containerRef?.current?.contains(e.relatedTarget)) {
      props.onBlur?.()
      setIsOpen(false)
    }
  }

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
        src={`data:image/svg+xml;utf8,${encodeURIComponent(getMathSvg(latex))}`}
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
