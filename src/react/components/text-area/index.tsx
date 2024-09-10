import { Container, Root, createRoot } from 'react-dom/client'
import { ClipboardEvent, FocusEvent, forwardRef, useEffect, useRef } from 'react'
import styled from 'styled-components'

import useMap from '../../hooks/use-map'
import useMutationObserver from '../../hooks/use-mutation-observer'

import MathBox from '../math-box'

import { defaults } from '../../../util'
import useEditorState from '../../state'
import Toolbar from '../toolbar'
import { createPortal } from 'react-dom'
import { TOOLBAR_ROOT } from '../..'
import { createMathStub } from '../../utils/create-math-stub'

export const ALLOWED_IMG_TYPES = ['image/png', 'image/jpeg']
export const MATH_EDITOR_CLASS = 'math-editor-wrapper'

type Props = {
  onFocus?: () => void
  onBlur?: () => void
}

export default forwardRef(MainTextArea)

function MainTextArea(props: {}, ref: any) {
  const editor = useEditorState()

  useEffect(
    () =>
      function clearMathBoxRootsOnUnmount() {
        for (const root of editor.roots.values()) {
          root.unmount()
        }
      },
    [],
  )

  function onPaste(e: ClipboardEvent) {
    e.preventDefault()
    e.stopPropagation()

    const content = e.nativeEvent.clipboardData

    if (!content) return

    const text = content.getData('text/plain')
    const html = content.getData('text/html')
    const file = Array.from(content.items).at(-1)?.getAsFile() // TODO: Why do we pick the last one?

    if (file && ALLOWED_IMG_TYPES.includes(file.type)) {
      try {
        // TODO:
        // const src = /* await */ screenshotSaver(file)
        // const img = document.createElement('img')
        // img.src = src
        // document.execCommand('insertHTML', false, img.outerHTML)
      } catch (e) {
        console.error(e)
      }
    } else if (html) {
      document.execCommand('insertHTML', false, defaults.sanitize(html))
    } else if (text) {
      document.execCommand('insertHTML', false, text)
    }

    // Hack to make this run after the content has been pasted
    // TODO would react flush sync be better?
    // TODO more informative comment
    // setTimeout(initMathEditors, 0)
  }

  function onBlur(e: FocusEvent) {
    if (!TOOLBAR_ROOT.contains(e.relatedTarget)) {
      editor.hideToolbar()
    }
  }

  return (
    <>
      {editor.isToolbarOpen && createPortal(<Toolbar />, document.getElementById('toolbar')!)}
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
    </>
  )
}

const Box = styled.div`
  // TODO: Remove
  transform: translateY(100px);
  position: default;
`
