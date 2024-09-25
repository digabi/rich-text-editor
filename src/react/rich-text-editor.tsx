import { useEffect, useRef, useState } from 'react'
import MainTextArea from './components/text-area'
import { EditorStateProvider } from './state'
import { Answer } from './utility'

export type Props = {
  language: 'FI' | 'SV'
  /** The toolbars will be rendered in this root via a React Portal */
  toolbarRoot?: HTMLElement
  /**
   * Callback that's called when the user pastes an image to the text area.
   * The function is given a `File` Blob and is expected to return a string
   * that can be used as the `src` attribute of an `<img />` tag.
   */
  getPasteSource?: (file: File) => Promise<string>

  editorStyle?: React.CSSProperties

  onValueChange: (answer: Answer) => void
}

export default function RichTextEditor({ language, toolbarRoot, editorStyle, onValueChange }: Props) {
  const [toolbarRootElement, setToolbarRootElement] = useState<HTMLElement | undefined>(toolbarRoot)
  const toolbarRootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (toolbarRoot) {
      setToolbarRootElement(toolbarRoot)
    } else if (toolbarRootRef.current) {
      setToolbarRootElement(toolbarRootRef.current)
    }
  }, [toolbarRoot, toolbarRootRef])

  return (
    <EditorStateProvider language={language} toolbarRoot={toolbarRoot} onValueChange={onValueChange}>
      {toolbarRoot ? null : <div ref={toolbarRootRef} className="rich-text-editor-toolbar-root" />}
      <MainTextArea style={editorStyle ?? {}} toolbarRoot={toolbarRootElement} />
    </EditorStateProvider>
  )
}
