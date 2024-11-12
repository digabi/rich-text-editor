import * as MathQuill from '@digabi/mathquill'
import { useCallback, useEffect, useRef, useState } from 'react'

import useRerender from './use-rerender'

const MQ = MathQuill.getInterface(2)

type Opts = {
  latex: string
  onChange?: (oldLatex: string | undefined, newLatex: string) => void
}

export default function useMathQuill(opts: Opts) {
  // We use `MathField.latex()` to check for errors below, but setting the
  // `MathField` latex value does not cause a rerender as React's not aware
  // of the update. This means that when we set the latex value inside the
  // `MathField` object, we need to request a rerender from React. The more
  // "correct" way to do this would probably be to sync React with the object
  // through `React.useSyncExternalStore` but we pinky-promise to always
  // manually call the `rerender` function every time after calling the
  // `MathField.latex(…)` setter, so React's in-sync with MathQuill.
  const rerender = useRerender()
  const [mqHandle, setMqHandle] = useState<MathQuill.MathField | null>(null)

  const [lastLatex, setLastLatex] = useState(opts.latex)

  // These refs are needed to access the current state values inside event handler
  const mqRef = useRef<MathQuill.MathField | null>(null)
  const lastLatexRef = useRef(lastLatex)

  // React `ref` objects aren't valid as `useEffect` deps; the official
  // workaround is to use a memoised callback as the `ref` prop to an element:
  const ref = useCallback(function spawnMathQuillOnElement(node: HTMLDivElement | null) {
    if (!node) return

    function edit(field: MathQuill.MathField) {
      // We don't want to signal an event edit that didn't happen from user input *on the
      // `MathField`*, i.e. we don't want to call `onChange` when it's caused by the raw latex
      // changing (we'd end up in an infinite loop). The actual focused event is a hidden
      // textbox inside `field.el()` so we need to use the `.contains()` method.
      if (field.el().contains(document.activeElement)) {
        const newValue = mqRef.current?.latex()
        if (newValue !== undefined) {
          opts.onChange?.(lastLatexRef.current, newValue)
          setLastLatex(newValue)
          lastLatexRef.current = newValue
        }
      }
    }

    const field = MQ.MathField(node, { handlers: { edit } })
    field.latex(opts.latex)
    setMqHandle(field)
    mqRef.current = field
  }, [])

  useEffect(
    function updateMathQuillField() {
      if (mqHandle && mqHandle.latex() != opts.latex) {
        mqHandle?.latex(opts.latex)
        rerender()
      }
    },
    [mqHandle, opts.latex],
  )

  return {
    /** A `ref` that must be attached to the `div` tag that should be controlled by MathQuill */
    ref,
    /** A MathQuill `MathField` that's attached to the `ref` */
    mq: mqHandle,
    /** Boolean representing if the current `latex` code is parseable by MathQuill */
    isError: mqHandle?.latex() === '' && opts.latex !== '',

    lastValue: lastLatex,
  }
}
