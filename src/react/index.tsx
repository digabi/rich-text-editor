import { useEffect, useRef, useState } from 'react'
import MainTextArea from './components/text-area'
import { EditorStateProvider } from './state'
import type { Answer } from './utility'

export type { Answer }
export type RichTextEditorProps = {
  allowedFileTypes?: string[]
  ariaInvalid?: boolean
  ariaLabelledBy?: string
  baseUrl: string
  editorStyle?: React.CSSProperties
  /**
   * Callback that's called when the user pastes an image to the text area.
   * The function is given a `File` Blob and is expected to return a string
   * that can be used as the `src` attribute of an `<img />` tag.
   */
  getPasteSource?: (file: File) => Promise<string>
  initialValue?: string
  lang?: string
  language: 'FI' | 'SV'
  onValueChange: (answer: Answer) => void
  questionId?: number
  textAreaClassNames?: string
  textAreaId?: string
  textAreaLang?: string
  /** The toolbars will be rendered in this root via a React Portal */
  toolbarRoot?: HTMLElement
}

export default function RichTextEditor({
  toolbarRoot,
  language,
  onValueChange,
  initialValue,
  baseUrl,
  ...textAreaProps
}: RichTextEditorProps) {
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
    <EditorStateProvider
      language={language}
      toolbarRoot={toolbarRoot}
      onValueChange={onValueChange}
      initialValue={initialValue}
      baseUrl={baseUrl}
    >
      {toolbarRoot ? null : <div ref={toolbarRootRef} className="rich-text-editor-toolbar-root" />}
      <MainTextArea {...textAreaProps} toolbarRoot={toolbarRootElement} />
    </EditorStateProvider>
  )
}
