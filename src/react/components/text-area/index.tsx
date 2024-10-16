import { ClipboardEvent, FocusEvent, Fragment } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

import useEditorState from '../../state'

import Toolbar from '../toolbar'
import { HelpDialog } from '../help-dialog'
import { sanitize } from '../../utils/sanitization'
import { useKeyboardEventListener } from '../../hooks/use-keyboard-events'
import useMutationObserver from '../../hooks/use-mutation-observer'
import { MATH_EDITOR_CLASS } from '../../../react/utils/create-math-stub'
import classNames from 'classnames/dedupe' // Removes duplicates in class list

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

export default function MainTextArea({
  ariaInvalid,
  ariaLabelledBy,
  questionId,
  editorStyle = {},
  className,
  id,
  lang,
  toolbarRoot,
}: TextAreaProps) {
  const editor = useEditorState()

  useKeyboardEventListener('e', true, editor.spawnMathEditorAtCursor)

  /** We need to capture Enter presses and handle them manually. Otherwise browsers may do weird things that interfere with our
   *  React tomfoolery, leading to behaviours like equations getting deleted if the user enters
   *  a line break on the same line as an Equation
   */
  useKeyboardEventListener(
    'Enter',
    false,
    (e) => {
      const selection = window.getSelection()
      if (
        selection?.anchorNode &&
        !editor.activeMathEditor &&
        ((selection.anchorNode as Element) === editor.ref.current || editor.ref.current?.contains(selection.anchorNode))
      ) {
        e?.preventDefault()
        document.execCommand('insertHTML', false, '<br>')
      }
    },
    false,
  )

  /**
   * This is hacky, but necessary. If a wrapper does not have text on both sides,
   * the user cannot place their cursor there
   */
  useMutationObserver(editor.ref, () => {
    const isTextNode = (node: Node | null) =>
      node && node.nodeType === Node.TEXT_NODE /*|| (node as Element).tagName === 'BR'*/
    const editorElement = editor.ref.current
    if (!editorElement) return

    if (!isTextNode(editorElement.firstChild)) {
      editorElement.insertBefore(document.createTextNode('\u00A0'), editorElement.firstChild)
    }
    if (!isTextNode(editorElement.lastChild)) {
      editorElement.appendChild(document.createTextNode('\u00A0'))
    }

    editor.ref.current?.querySelectorAll(`.${MATH_EDITOR_CLASS}`)?.forEach((wrapper) => {
      const next = wrapper.nextSibling
      const prev = wrapper.previousSibling

      if (!isTextNode(prev)) {
        wrapper.parentNode?.insertBefore(document.createTextNode('\u00A0'), wrapper)
      }

      if (!isTextNode(next)) {
        wrapper.parentNode?.insertBefore(document.createTextNode('\u00A0'), wrapper.nextSibling)
      }
    })
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
      // TODO: Are img urls handled correctly?
      document.execCommand('insertHTML', false, sanitize(html))
    } else if (text) {
      document.execCommand('insertHTML', false, text)
    }

    /** setTimeout makes the callback run in the next (or later) loop of
     * the event loop. We use this to make sure that the we run these operations after
     * the innerHtml of the text field has already been updated
     */
    setTimeout(() => {
      editor.initMathEditors()
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
        onInput={() => editor.onAnswerChange()}
        onPaste={onPaste}
        spellCheck={false}
        style={editorStyle}
      />

      {
        // NOTE: Be careful to not mess up the keys here, as that will definitively
        // result in the editor behaving in weird and confusing ways
        Array.from(editor.mathEditorPortals.raw).map(([node, portal]) => (
          <Fragment key={(node as Element).id}>{portal}</Fragment>
        ))
      }
    </>
  )
}

const Box = styled.div`
  box-sizing: content-box;
  border: 1px solid #aaa;
  min-height: 100px;
  padding: 5px;
  font: 17px Times New Roman;
  white-space: pre;

  & > img {
    margin: 4px;
    max-width: 100%;
    max-height: 1000px;
  }

  &:focus img {
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
`
