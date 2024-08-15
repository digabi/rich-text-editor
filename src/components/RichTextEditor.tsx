import React, { useState, useRef, useEffect, ClipboardEventHandler } from 'react'
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
  style?: React.CSSProperties
} & Partial<Options>

export const RichTextEditor = (props: Props) => {
  const [showToolbar, setShowToolbar] = useState(false)
  const [showMathToolbar, setShowMathToolbar] = useState(false)
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
  } = { ...defaults, ...(props ?? {}) }

  const t = locales[locale].editor

  const insertEquationAtCursor = (cmd: string = '') => {
    const editor = editorRef.current
    if (!editor) return

    // Create a range object from the current selection
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)
    range.deleteContents()

    // Create a placeholder span element
    const placeholder = document.createElement('span')
    placeholder.className = 'math-editor-wrapper'
    placeholder.style.display = 'contents'
    placeholder.contentEditable = 'false'

    // Insert the placeholder at the cursor position
    range.insertNode(placeholder)

    const parent = placeholder.parentNode as Element
    if (parent.className === 'math-editor-wrapper') {
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
          setShowMathToolbar(false)
        }}
        shouldOpen={true}
        onOpen={() => setShowMathToolbar(true)}
      />,
    )
  }

  useEffect(() => {
    const handleEquationEditorHotkey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault()
        insertEquationAtCursor('')
      }
    }

    window.addEventListener('keydown', handleEquationEditorHotkey)

    return () => {
      window.removeEventListener('keydown', handleEquationEditorHotkey)
    }
  }, [])

  const handlePaste: ClipboardEventHandler = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    const content = e.nativeEvent.clipboardData
    const plainTextData = content?.getData('text/plain')
    const htmlData = content?.getData('text/html')

    console.log(htmlData)
    console.log(sanitize(htmlData ?? ''))
    //    console.log('plain text', plainTextData)

    if (htmlData) {
      document.execCommand('insertHTML', false, sanitize(htmlData))
    } else if (plainTextData) {
      document.execCommand('insertHTML', false, plainTextData)
    } else if (content?.items.length && content.items.length > 0) {
      const imagesToAdd: HTMLImageElement[] = []

      for (const item of content?.items) {
        const file = item.getAsFile()

        if (file && fileTypes.includes(file.type)) {
          try {
            const src = await screenshotSaver(file)
            const img = document.createElement('img')
            img.src = src
            imagesToAdd.push(img)
          } catch (e) {
            console.error(e)
          }
        }
      }

      imagesToAdd.forEach((img) => {
        document.execCommand('insertHTML', false, img.outerHTML)
      })
    }

    // Hack to make this run after the content has been pasted
    setTimeout(() => {
      const mathEditors = editorRef.current?.querySelectorAll('span.math-editor-wrapper')

      mathEditors?.forEach((oldPlaceholder) => {
        const img = oldPlaceholder.querySelector('img')

        if (img instanceof HTMLImageElement) {
          const newPlaceholder = document.createElement('span')
          newPlaceholder.className = 'math-editor-wrapper'
          newPlaceholder.style.display = 'contents'
          newPlaceholder.contentEditable = 'false'

          oldPlaceholder.replaceWith(newPlaceholder)

          ReactDOM.createRoot(newPlaceholder).render(
            <MathEditor
              mathQuill={MathQuill.getInterface(2)}
              ref={mathEditorRef}
              initialLatex={img.alt}
              onCancelEditor={() => {
                oldPlaceholder.remove()
              }}
              t={t}
              setIsUndoAvailable={(state) => setIsUndoAvailable(state)}
              setIsRedoAvailable={(state) => setIsRedoAvailable(state)}
              onClose={() => {
                setShowToolbar(false)
                setShowMathToolbar(false)
              }}
              shouldOpen={false}
              onOpen={() => setShowMathToolbar(true)}
            />,
          )
        }
      })
    }, 0)
  }

  return (
    <>
      {showToolbar && (
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
          onEquationButtonClick={() => {
            insertEquationAtCursor()
          }}
          undo={() => mathEditorRef?.current?.undo()}
          redo={() => mathEditorRef?.current?.redo()}
          isUndoAvailable={isUndoAvailable}
          isRedoAvailable={isRedoAvailable}
          showMathToolbar={showMathToolbar}
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
          setShowMathToolbar(false)
        }}
        style={props.style}
        onPaste={handlePaste}
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
