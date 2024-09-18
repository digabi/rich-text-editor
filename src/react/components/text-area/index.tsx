import { ClipboardEvent, FocusEvent, forwardRef, Fragment, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

import useEditorState from '../../state'

import Toolbar from '../toolbar'
import { HelpDialog } from '../help-dialog'
import sanitize from '../../utils/sanitization'

export const ALLOWED_IMG_TYPES = ['image/png', 'image/jpeg']
export const MATH_EDITOR_CLASS = 'math-editor-wrapper'

export default function MainTextArea() {
  const editor = useEditorState()

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

    if (file && ALLOWED_IMG_TYPES.includes(file.type)) {
      try {
        const src = await editor.getPasteSource(file)
        const img = document.createElement('img')
        img.src = src
        document.execCommand('insertHTML', false, img.outerHTML)
      } catch (e) {
        console.error(e)
      }
    } else if (html) {
      document.execCommand('insertHTML', false, sanitize(html))
    } else if (text) {
      document.execCommand('insertHTML', false, text)
    }

    // Hack to make this run after the content has been pasted
    // TODO would react flush sync be better?
    // TODO more informative comment
    setTimeout(editor.initMathEditors, 0)
  }

  function onBlur(e: FocusEvent) {
    // We don't want to hide the toolbar when it's the toolbar itself
    // that steals focus from the editor
    if (!editor.toolbarRoot.contains(e.relatedTarget)) {
      editor.hideToolbar()
    }
  }

  return (
    <>
      {editor.isToolbarOpen && createPortal(<Toolbar />, editor.toolbarRoot)}
      {editor.isHelpDialogOpen && <HelpDialog />}
      <Box
        ref={editor.ref}
        className="rich-text-editor answer"
        data-testid="rich-text-editor"
        contentEditable
        spellCheck={false}
        onFocus={editor.showToolbar}
        onBlur={onBlur}
        onPaste={onPaste}
        //   style={props.style}
        //   onInput={(e) => onValueChange(e.currentTarget.innerHTML)}
        //   dangerouslySetInnerHTML={{ __html: initialValue ?? '' }}
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
  // TODO: Remove
  transform: translateY(100px);
  position: default;
`
