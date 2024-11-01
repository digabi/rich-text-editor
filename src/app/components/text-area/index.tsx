import { ClipboardEvent, FocusEvent, FormEvent, forwardRef, Fragment, useImperativeHandle } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import classNames from 'classnames/dedupe' // Removes duplicates in class list

import useEditorState from '../../state'

import Toolbar from '../toolbar'
import { HelpDialog } from '../help-dialog'
import { sanitize } from '../../utils/sanitization'
import { isAddMutation, isBr, isRemoveMutation, isTextNode, nbsp } from '../../utility'
import { useKeyboardEventListener } from '../../hooks/use-keyboard-events'
import useMutationObserver from '../../hooks/use-mutation-observer'
import { MATH_EDITOR_CLASS } from '../../utils/create-math-stub'
import { RichTextEditorHandle } from '../..'

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
        editor.initMathEditors()
        setTimeout(() => {
          editor.onAnswerChange()
        }, 0)
      }, 0)
    },
  }))

  useKeyboardEventListener('e', true, (e) => {
    if (editor.ref.current === document.activeElement) {
      e?.preventDefault()
      editor.spawnMathEditorAtCursor()
    }
  })

  /** We need to capture Enter presses and handle them manually. Otherwise browsers may do weird things that interfere with our
   *  React tomfoolery, leading to behaviours like equations getting deleted if the user enters
   *  a line break on the same line as an Equation
   */
  useKeyboardEventListener(
    'Enter',
    false,
    (e) => {
      if (!editor.activeMathEditor && editor.ref.current === document.activeElement) {
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
  useMutationObserver(editor.ref, (muts) => {
    const editorElement = editor.ref.current
    if (!editorElement) return

    if (!isTextNode(editorElement.firstChild)) {
      editorElement.insertBefore(document.createTextNode(nbsp), editorElement.firstChild)
    }
    if (!isTextNode(editorElement.lastChild)) {
      editorElement.appendChild(document.createTextNode(nbsp))
    }

    // Iterate through each math editor, as the space around them is the most important and fragile
    editor.ref.current?.querySelectorAll(`.${MATH_EDITOR_CLASS}`)?.forEach((wrapper) => {
      const next = wrapper.nextSibling
      const prev = wrapper.previousSibling

      /*
       * Without special handling, the browser will add line breaks on line's it considers empty.
       * This includes lines with only a math editor and no white space - this leads to weird behaviour,
       * like an extra line break being added when the user tries to remove white space before an editor.
       * We work around that by detecting such mutations, and then removing the line breaks.
       */
      const removedTextNodesBetweenBrAndWrapper = muts.filter(
        (mut) =>
          isRemoveMutation(mut) &&
          isTextNode(mut.removedNodes[0]) &&
          mut.nextSibling === wrapper &&
          isBr(mut.previousSibling),
      )

      const addedBrBeforeWrapper = muts.find(
        (mut) => isAddMutation(mut) && mut.nextSibling === wrapper && isBr(mut.previousSibling),
      )

      if (
        removedTextNodesBetweenBrAndWrapper.length > 0 &&
        removedTextNodesBetweenBrAndWrapper[0].previousSibling &&
        addedBrBeforeWrapper
      ) {
        editor.ref.current?.removeChild(removedTextNodesBetweenBrAndWrapper[0].previousSibling)
        editor.ref.current?.removeChild(addedBrBeforeWrapper.addedNodes[0])
      }

      /*
       * The user can't place their cursor in positions without editable content.
       * Since the math editors and their wrappers are not editable,
       * we make sure there's always a text node on both sides of every editor.
       */
      if (!isTextNode(prev)) {
        wrapper.parentNode?.insertBefore(document.createTextNode(nbsp), wrapper)
      }

      if (!isTextNode(next)) {
        wrapper.parentNode?.insertBefore(document.createTextNode(nbsp), wrapper.nextSibling)
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

  function onInput(e: FormEvent<HTMLDivElement>) {
    const inputType = (e.nativeEvent as InputEvent).inputType
    if (inputType === 'historyUndo' || inputType === 'historyRedo') {
      editor.initMathEditors()
    }
    editor.onAnswerChange()
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
        onInput={onInput}
        onPaste={onPaste}
        spellCheck={false}
        style={editorStyle}
        role="textbox"
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
})

const Box = styled.div`
  box-sizing: content-box;
  border: 1px solid #aaa;
  min-height: 100px;
  padding: 5px;
  font: 17px Times New Roman;
  white-space: pre;
  text-wrap: wrap;

  & > img {
    margin: 4px;
    max-width: 100%;
    max-height: 1000px;
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

  &:focus > span > img {
    background-color: #edf9ff;
  }
`

export default MainTextArea
