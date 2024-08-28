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
  onValueChange: (newHtml: string) => void
  initialValue?: string
} & Partial<Options>

const mathEditorWrapperClassName = 'math-editor-wrapper'

const getMathEditorWrapper = () => {
  const wrapper = document.createElement('span')
  wrapper.className = mathEditorWrapperClassName
  wrapper.style.display = 'contents'
  wrapper.contentEditable = 'false'
  return wrapper
}

const useEditorMutationObserver = (
  editorRef: React.RefObject<HTMLSpanElement>,
  rootsMap: Map<HTMLElement, ReactDOM.Root>,
) => {
  useEffect(() => {
    if (!editorRef.current) return

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.removedNodes.forEach((node) => {
          // Check if the removed node is the React component's custom wrapper
          if (node instanceof HTMLElement && node.classList && node.classList.contains(mathEditorWrapperClassName)) {
            const root = rootsMap.get(node)
            if (root) {
              console.log('unmounting', root, node)
              root.unmount()
              rootsMap.delete(node)
            }
          }
        })
      })
    })

    observer.observe(editorRef.current, { childList: true })

    return () => {
      observer.disconnect()
    }
  }, [editorRef])
}

export const RichTextEditor = (props: Props) => {
  const [showToolbar, setShowToolbar] = useState(false)
  const [showMathToolbar, setShowMathToolbar] = useState(false)
  const [isUndoAvailable, setIsUndoAvailable] = useState(false)
  const [isRedoAvailable, setIsRedoAvailable] = useState(false)

  const editorRef = useRef<HTMLDivElement>(null)
  const mathEditorRef = useRef<MathEditorHandle>(null)
  const mathEditorRootMap = useRef<Map<HTMLSpanElement, ReactDOM.Root>>(new Map())

  useEditorMutationObserver(editorRef, mathEditorRootMap.current)

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
    onValueChange,
    initialValue,
  } = { ...defaults, ...(props ?? {}) }

  const renderMathEditor = (
    rootElement: Element,
    props: Pick<React.ComponentPropsWithRef<typeof MathEditor>, 'initialLatex' | 'onCancelEditor' | 'shouldOpen'>,
  ) => {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
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
        onCancelEditor={() => {
          root.unmount()
          props.onCancelEditor()
        }}
        {...props}
      />,
    )

    mathEditorRootMap.current.set(rootElement, root)
  }

  const initMathEditors = () => {
    const mathEditors = editorRef.current?.querySelectorAll(`span.${mathEditorWrapperClassName}`)
    const mathImages = editorRef.current?.querySelectorAll('[data-math-svg="true"]')

    const roots = [
      ...Array.from(mathEditors ?? []).map((el) => el.querySelector('img')),
      ...Array.from(mathImages ?? []),
    ]

    roots.forEach((root) => {
      if (root instanceof HTMLImageElement) {
        const newPlaceholder = getMathEditorWrapper()

        root.replaceWith(newPlaceholder)

        renderMathEditor(newPlaceholder, {
          initialLatex: root.alt,
          onCancelEditor: () => {
            root.remove()
          },
          shouldOpen: false,
        })
      }
    })

    /*
    mathEditors?.forEach((oldPlaceholder) => {
      const img = oldPlaceholder.querySelector('img')

      if (img instanceof HTMLImageElement) {
        const newPlaceholder = getMathEditorWrapper()

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

    mathImages?.forEach((img) => {
      if (img instanceof HTMLImageElement) {
        const newPlaceholder = getMathEditorWrapper()

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

    // Create and place a wrapper as we need an element to mount the MathEditor component in
    const wrapper = getMathEditorWrapper()
    range.insertNode(wrapper)

    // If the new equation would be created inside another equations wrapper, move it outside of it
    const parent = wrapper.parentNode as Element
    if (parent.className === mathEditorWrapperClassName) {
      if (wrapper.nextSibling) {
        parent.insertAdjacentElement('beforebegin', wrapper)
      } else {
        parent.insertAdjacentElement('afterend', wrapper)
      }
    }

    // TODO: Better handling for these than just blindly adding them every time
    wrapper.insertAdjacentText('beforebegin', '\u00A0')
    wrapper.insertAdjacentText('afterend', '\u00A0')

    // Move the cursor after the placeholder
    range.setStartAfter(wrapper)
    range.setEndAfter(wrapper)
    selection.removeAllRanges()
    selection.addRange(range)

    renderMathEditor(wrapper, {
      initialLatex: cmd,
      onCancelEditor: () => {
        wrapper.remove()
      },
      shouldOpen: true,
    })
  }

  useEffect(() => {
    const handleEquationEditorHotkey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'e') {
        event.preventDefault()
        insertEquationAtCursor('')
      }
    }

    window.addEventListener('keydown', handleEquationEditorHotkey)

    return () => {
      window.removeEventListener('keydown', handleEquationEditorHotkey)
    }
  }, [])

  // Prevent dragging items into the editor
  useEffect(() => {
    const editor = editorRef.current

    const preventDrag = (e: DragEvent) => {
      e.preventDefault()
    }

    const preventDrop = (e: DragEvent) => {
      e.preventDefault()
    }

    if (editor) {
      editor.addEventListener('dragover', preventDrag)
      editor.addEventListener('drop', preventDrop)
    }

    return () => {
      if (editor) {
        editor.removeEventListener('dragover', preventDrag)
        editor.removeEventListener('drop', preventDrop)
      }
    }
  }, [editorRef.current])

  useEffect(() => {
    if (initialValue && initialValue !== '') {
      initMathEditors()
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
    // TODO more informative comment
    setTimeout(initMathEditors, 0)
  }

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
        onInput={(e) => onValueChange(e.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{
          __html: initialValue || '',
        }}
      ></DefaultEditor>
    </>
  )
}

const DefaultEditor = styled.div`
  box-sizing: content-box;
  border: 1px solid #aaa;
  padding: 5px;
  background-color: #fff;
`
