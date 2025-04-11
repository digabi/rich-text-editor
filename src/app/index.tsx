import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import MainTextArea, { TextAreaProps } from './components/text-area'
import { EditorStateProvider } from './state'
import type { Answer } from './utility'

export type { Answer, TextAreaProps }

export type RichTextEditorHandle = {
  setValue: (value: string) => void
}

export type RichTextEditorProps = {
  allowedFileTypes?: string[]
  baseUrl?: string
  /**
   * Callback that's called when the user pastes an image to the text area.
   * The function is given a `File` Blob and is expected to return a string
   * that can be used as the `src` attribute of an `<img />` tag.
   */
  getPasteSource?: (file: File) => Promise<string>
  initialValue?: string
  language?: 'FI' | 'SV'
  onValueChange?: (answer: Answer) => void
  /** The toolbars will be rendered in this root via a React Portal */
  textAreaProps?: TextAreaProps
  toolbarRoot?: HTMLElement
  invalidImageSelector?: string
  /**
   * Overrides the default latex update handler.
   *
   * By default the handler sets the alt and src attributes on the <img>
   * element `img`:
   * ```
   * (img: HTMLImageElement, latex: string) => {
   *   img.setAttribute('src', `${baseUrl}/math.svg?latex=${encodeURIComponent(latex)}`)
   *   img.setAttribute('alt', latex)
   * }
   * ```
   */
  onLatexUpdate?: (img: HTMLImageElement, latex: string) => void
} & TextAreaProps

const RichTextEditor = forwardRef<RichTextEditorHandle, RichTextEditorProps>((props, ref) => {
  const {
    allowedFileTypes,
    baseUrl,
    getPasteSource,
    initialValue,
    language,
    onValueChange,
    textAreaProps,
    toolbarRoot,
    invalidImageSelector,
    onLatexUpdate,
  } = props
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
      allowedFileTypes={allowedFileTypes}
      baseUrl={baseUrl}
      getPasteSource={getPasteSource}
      initialValue={initialValue}
      language={language}
      onValueChange={onValueChange}
      invalidImageSelector={invalidImageSelector}
      onLatexUpdate={onLatexUpdate}
    >
      {toolbarRoot ? null : <div ref={toolbarRootRef} className="rich-text-editor-toolbar-root" />}
      <MainTextArea {...textAreaProps} toolbarRoot={toolbarRootElement} ref={ref} />
    </EditorStateProvider>
  )
})

export default RichTextEditor
