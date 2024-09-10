import { useEffect, useRef, useState } from 'react'
import * as MathQuill from '@digabi/mathquill'

import useMathQuill from '../../hooks/use-mathquill'
import LatexError from '../icons/latex-error'
import { getMathSvg } from '../../mathSvg'

type Handle = {
  mq: MathQuill.MathField
  close: () => void
}

export type Props = {
  onOpen?: (handle: Handle) => void
  initialLatex?: string
  initialOpen?: boolean
  onBlur?: () => void
}

export default function MathBox(props: Props) {
  const [isOpen, setIsOpen] = useState(props.initialOpen ?? false)
  const [latex, setLatex] = useState(props.initialLatex ?? '')
  const { ref: latexRef, isError, mq } = useMathQuill({ latex, onChange: setLatex })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(
    function signalOpenedMathBox() {
      if (isOpen && mq) {
        props.onOpen?.({ mq, close: () => setIsOpen(false) })
        setTimeout(() => {
          console.log(mq.el())
          mq.el().focus()
        }, 500)
      }
    },
    [isOpen, mq],
  )

  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setLatex(e.target.value)
  }

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
            onBlur={onBlur}
            onChange={onChange}
          />
          {isError && <span className="render-error">TODO</span>}
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
        data-latex={latex}
        onClick={() => setIsOpen(true) /* TODO Fix this */}
      />
    )
  } else {
    return null
  }
}
