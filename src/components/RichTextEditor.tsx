import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import * as MathQuill from '@digabi/mathquill'
import FI from '../FI'
import SV from '../SV'
import specialCharacters from '../specialCharacters'
import { Options, defaults } from '../react/utility'
import { Toolbar } from '../components/Toolbar'
import { MathEditor, MathEditorHandle } from '../components/MathEditor'
import styled from 'styled-components'

const locales = { FI, SV }

export type Props = {
  options?: Partial<Options>
  style?: React.CSSProperties
}

export const RichTextEditor = ({ options, style }: Props) => {
  const [showToolbar, setShowToolbar] = useState(false)
  const [isUndoAvailable, setIsUndoAvailable] = useState(false)
  const [isRedoAvailable, setIsRedoAvailable] = useState(false)

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
  } = { ...defaults, ...(options ?? {}) }

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
    placeholder.contentEditable = 'false'

    // Insert the placeholder at the cursor position
    range.insertNode(placeholder)

    const parent = placeholder.parentNode as Element
    if (parent.className === 'component-placeholder') {
      if (placeholder.nextSibling) {
        parent.insertAdjacentElement('beforebegin', placeholder)
      } else {
        parent.insertAdjacentElement('afterend', placeholder)
      }
    }

    placeholder.insertAdjacentText('beforebegin', '\u00A0')
    placeholder.insertAdjacentText('afterend', '\u00A0')

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
        t={t}
        setIsUndoAvailable={(state) => setIsUndoAvailable(state)}
        setIsRedoAvailable={(state) => setIsRedoAvailable(state)}
        onClose={() => {
          setShowToolbar(false)
        }}
      />,
    )
  }

  useEffect(() => {
    const handleEquationEditorHotkey = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault()
        insertEquationAtCursor('')
      }
    }

    window.addEventListener('keydown', handleEquationEditorHotkey)

    return () => {
      window.removeEventListener('keydown', handleEquationEditorHotkey)
    }
  }, [])

  return (
    <>
      {true && (
        <Toolbar
          t={t}
          specialCharacterGroups={specialCharacters}
          onMathCommand={(action) => {
            if (window.document.activeElement === editorRef.current) {
              insertEquationAtCursor(action)
            } else {
              mathEditorRef?.current?.insertCharacterAtCursor(action)
            }
          }}
          undo={() => mathEditorRef?.current?.undo()}
          redo={() => mathEditorRef?.current?.redo()}
          isUndoAvailable={isUndoAvailable}
          isRedoAvailable={isRedoAvailable}
        />
      )}
      <DefaultEditor
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
        style={style}
      />
    </>
  )
}

const DefaultEditor = styled.div`
  box-sizing: 'content-box';
  border: '1px solid #aaa';
  padding: 5;
  background-color: '#fff';
`
