import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import ReactDOM from 'react-dom/client'
import FI from './resources/fi'
import SV from './resources/sv'
import specialCharacters from './resources/specialCharacters'
import { Options, defaults, Translation, eventHandlerWithoutFocusLoss } from './utility'
import { Toolbar } from './components/Toolbar'
import * as MathQuill from '@digabi/mathquill'
import { MathEditor, MathEditorHandle } from './components/MathEditor'

type FocusTarget = 'RichText' | 'LatexField' | 'EquationField'

const locales = { FI, SV }

const keyCodes = {
  E: 69,
}

export type Props = {
  options: Options
  onValueChanged: () => {}
}

export const RichTextEditor = ({ options, onValueChanged }: Props) => {
  const [showToolbar, setShowToolbar] = useState(false)

  const editorRef = useRef<HTMLDivElement>(null)
  const mathEditorRef = useRef<MathEditorHandle>(null)

  const {
    baseUrl,
    fileTypes,
    sanitize,
    screenshotSaver,
    ignoreSaveObject,
    screenshotImageSelector,
    invalidImageSelector,
    locale,
    updateMathImg,
    forceInit,
  } = { ...defaults, ...options }

  const t = locales[locale].editor

  const insertEquationAtCursor = (cmd: string) => {
    const editor = editorRef.current
    if (!editor) return

    // Create a range object from the current selection
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)
    range.deleteContents()

    // Create a placeholder span element
    const placeholder = document.createElement('span')
    placeholder.className = 'component-placeholder'
    placeholder.style.display = 'contents'
    //placeholder.style.width = '100%'

    // Insert the placeholder at the cursor position
    range.insertNode(placeholder)

    // Move the cursor after the placeholder
    range.setStartAfter(placeholder)
    range.setEndAfter(placeholder)
    selection.removeAllRanges()
    selection.addRange(range)

    // Replace the placeholder with the React component
    ReactDOM.createRoot(placeholder).render(
      <MathEditor
        mathQuill={MathQuill.getInterface(2)}
        ref={mathEditorRef}
        initialLatex={cmd}
        onCancelEditor={() => {
          placeholder.remove()
        }}
      />,
    )
  }

  return (
    <div style={{ position: 'relative', top: 200 }}>
      {true && (
        <Toolbar
          t={t}
          specialCharacterGroups={specialCharacters}
          onMathCommand={(cmd) => {
            if (window.document.activeElement === editorRef.current) {
              insertEquationAtCursor(cmd.action)
            } else {
              mathEditorRef.current.insertCharacterAtCursor(cmd.action)
            }
          }}
        />
      )}
      <div
        ref={editorRef}
        contentEditable={true}
        spellCheck={false}
        className="rich-text-editor answer"
        onFocus={(e) => {
          setShowToolbar(true)
        }}
        onBlur={() => {
          setShowToolbar(false)
        }}
      />
    </div>
  )
}
