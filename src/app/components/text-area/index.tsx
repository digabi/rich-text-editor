import { ClipboardEvent, FocusEvent, FormEvent, forwardRef, Fragment, useImperativeHandle } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import classNames from 'classnames/dedupe' // Removes duplicates in class list
import useEditorState from '../../state'

import Toolbar from '../toolbar'
import { HelpDialog } from '../help-dialog'
import { sanitize } from '../../utils/sanitization'
import { getCursorPosition, restoreCursorPosition } from '../../utility'
import { RichTextEditorHandle } from '../..'
import { useKeyboardEventListener } from '../../hooks/use-keyboard-events'

export type TextAreaProps = {
  ariaInvalid?: boolean
  ariaLabelledBy?: string
  questionId?: number // helper for testing purposes of library users
  editorStyle?: React.CSSProperties
  className?: string
  id?: string // exam engine renders a button that is aria owned by the area div (by id)
  lang?: string
  toolbarRoot?: HTMLElement
}

const MainTextArea = forwardRef<RichTextEditorHandle, TextAreaProps>((props, ref) => {
  const { toolbarRoot, ariaInvalid, ariaLabelledBy, questionId, editorStyle, className, id, lang } = props
  const editor = useEditorState()

  useImperativeHandle(ref, () => ({
    setValue: (value: string) => {
      if (editor.ref.current) {
        editor.ref.current.innerHTML = value
      }

      setTimeout(() => {
        editor.initMathImages()
        setTimeout(() => {
          editor.onAnswerChange()
        }, 0)
      }, 0)
    },
  }))

  const historyHandler = (fn: typeof editor.undoEditor | typeof editor.redoEditor) => () => {
    if (editor.ref.current !== document.activeElement) {
      return
    }

    const oldValue = editor.ref.current?.innerHTML
    const newValue = fn()

    if (newValue === undefined) {
      return
    }

    if (editor.ref.current && newValue !== oldValue) {
      const savedCursorPosition = getCursorPosition(editor.ref.current)
      editor.ref.current.innerHTML = newValue

      // TODO: Extract this into a function instead of pasting it all over the place
      setTimeout(() => {
        editor.initMathImages()
        setTimeout(() => {
          editor.onAnswerChange(false)

          restoreCursorPosition(editor.ref.current!, savedCursorPosition)
        }, 0)
      }, 0)
    }
  }

  // Prevent browser's native undo/redo history use on MacOS,
  // as it would cause strange behaviour especially when mixed with our own implementation
  useKeyboardEventListener(
    'z',
    false,
    (e) => {
      if (e?.metaKey) {
        e.preventDefault()
        e.stopPropagation()
      }
    },
    false,
  )
  useKeyboardEventListener('z', true, historyHandler(editor.undoEditor))
  useKeyboardEventListener('y', true, historyHandler(editor.redoEditor))
  useKeyboardEventListener('e', true, (e) => {
    if (editor.ref.current === document.activeElement) {
      e?.preventDefault()
      editor.spawnMathEditorAtCursor()
    }
  })

  async function onPaste(e: ClipboardEvent) {
    e.preventDefault()
    e.stopPropagation()

    const content = e.nativeEvent.clipboardData
    if (!content) return

    // The old editor always picked the last picture so we do that too,
    // the reason's lost to history though.
    const file = Array.from(content.items).at(-1)?.getAsFile()
    const html = content.getData('text/html')
    const text = content.getData('text/plain')

    if (file && editor.allowedFileTypes.includes(file.type)) {
      try {
        const src = await editor.handlePastedImage(file)
        const img = document.createElement('img')
        img.src = src
        document.execCommand('insertHTML', false, sanitize(img.outerHTML))
      } catch (e) {
        console.error(e)
      }
    } else if (html) {
      document.execCommand('insertHTML', false, sanitize(html))
    } else if (text) {
      document.execCommand('insertHTML', false, text)
    }

    /** setTimeout makes the callback run in the next (or later) loop of
     * the event loop. We use this to make sure that the we run these operations after
     * the innerHtml of the text field has already been updated
     */
    setTimeout(() => {
      editor.initMathImages()
      setTimeout(() => {
        editor.onAnswerChange()
      }, 0)
    }, 0)
  }

  function onBlur(e: FocusEvent) {
    // We don't want to hide the toolbar when it's the toolbar itself
    // that steals focus from the editor
    if (!toolbarRoot?.contains(e.relatedTarget)) {
      editor.hideToolbar()
    }
  }

  return (
    <>
      {toolbarRoot && editor.isToolbarOpen && createPortal(<Toolbar />, toolbarRoot)}
      {editor.isHelpDialogOpen && <HelpDialog />}
      <Box
        ref={editor.ref}
        id={id}
        aria-invalid={ariaInvalid}
        aria-labelledby={ariaLabelledBy}
        aria-multiline={true}
        className={classNames('rich-text-editor answer', className)}
        contentEditable
        data-question-id={questionId}
        data-testid="rich-text-editor"
        lang={lang}
        onBlur={onBlur}
        onFocus={editor.showToolbar}
        onInput={(e) => {
          const inputType = (e.nativeEvent as InputEvent).inputType
          if (inputType === 'historyUndo') {
            historyHandler(editor.undoEditor)()
            e.preventDefault()
            e.stopPropagation()
          } else if (inputType === 'historyRedo') {
            historyHandler(editor.redoEditor)()
            e.preventDefault()
            e.stopPropagation()
          }

          editor.onAnswerChange()
        }}
        onKeyDown={(e) => {
          if (e.key.toLowerCase() === 'e' && e.ctrlKey) {
            e.preventDefault()
            e.stopPropagation()
            editor.spawnMathEditorAtCursor()
          }
        }}
        onPaste={onPaste}
        spellCheck={false}
        style={editorStyle}
        role="textbox"
      />

      {editor.mathEditorPortal !== null ? <Fragment>{editor.mathEditorPortal[1]}</Fragment> : null}
    </>
  )
})

const Box = styled.div`
  box-sizing: border-box;
  border: 1px solid #aaa;
  min-height: 100px;
  padding: 5px;
  font: 17px Times New Roman;
  white-space: pre;
  text-wrap: wrap;

  & img {
    padding: 5px;
    max-width: 100%;
    max-height: 1000px;
    vertical-align: middle;
  }

  &:focus > img {
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.2);
  }

  & .mq-math-mode .mq-root-block {
    white-space: nowrap;
  }

  &:focus,
  & .mq-editable-field.mq-focused,
  & textarea:focus {
    box-shadow: none;
    outline: 1px solid #359bb7;
    z-index: 2;
  }

  & img.equation {
    min-height: 20px;
    min-width: 20px;
    box-shadow: none;
  }

  &:focus img.equation {
    background-color: #edf9ff;
  }

  & img.equation.active {
    border: 2px solid #caedff;
    border-radius: 3px;
  }
`

export default MainTextArea
