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

  const renderMathEditor = (
    rootElement: Element,
    props: Pick<React.ComponentPropsWithRef<typeof MathEditor>, 'initialLatex' | 'onCancelEditor' | 'shouldOpen'>,
  ) => {
    ReactDOM.createRoot(rootElement).render(
      <MathEditor
        mathQuill={MathQuill.getInterface(2)}
        ref={mathEditorRef}
        t={t}
        setIsUndoAvailable={(state) => setIsUndoAvailable(state)}
        setIsRedoAvailable={(state) => setIsRedoAvailable(state)}
        onClose={() => {
          setShowToolbar(false)
          setShowMathToolbar(false)
        }}
        onOpen={() => setShowMathToolbar(true)}
        {...props}
      />,
    )
  }

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
    renderMathEditor(placeholder, {
      initialLatex: cmd,
      onCancelEditor: () => {
        placeholder.remove()
      },
      shouldOpen: true,
    })
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
    const file = content?.items?.[content.items.length - 1]?.getAsFile()

    if (file) {
      if (fileTypes.includes(file.type)) {
        try {
          const src = await screenshotSaver(file)
          const img = document.createElement('img')
          img.src = src
          document.execCommand('insertHTML', false, img.outerHTML)
        } catch (e) {
          console.error(e)
        }
      }
    } else if (htmlData) {
      document.execCommand('insertHTML', false, sanitize(htmlData))
    } else if (plainTextData) {
      document.execCommand('insertHTML', false, plainTextData)
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

          renderMathEditor(newPlaceholder, {
            initialLatex: img.alt,
            onCancelEditor: () => {
              oldPlaceholder.remove()
            },
            shouldOpen: false,
          })
        }
      })

      const mathImages = editorRef.current?.querySelectorAll('[data-math-svg="true"]')

      mathImages?.forEach((img) => {
        if (img instanceof HTMLImageElement) {
          const newPlaceholder = document.createElement('span')

          newPlaceholder.className = 'math-editor-wrapper'
          newPlaceholder.style.display = 'contents'
          newPlaceholder.contentEditable = 'false'

          img.replaceWith(newPlaceholder)

          renderMathEditor(newPlaceholder, {
            initialLatex: img.alt,
            onCancelEditor: () => {
              img.remove()
            },
            shouldOpen: false,
          })
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
  box-sizing: content-box;
  border: 1px solid #aaa;
  padding: 5px;
  background-color: #fff;
`
