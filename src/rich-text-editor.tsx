import ReactDOM from 'react-dom/client'
import RichTextEditor, { RichTextEditorHandle, RichTextEditorProps } from './app'
import { createRef } from 'react'

export type MakeRichTextProps = { container: HTMLElement } & RichTextEditorProps

const defaultProps: MakeRichTextProps = {
  container: document.getElementById('rich-text-editor-root')!,
}

export const makeRichText = (props: MakeRichTextProps) => {
  const ref = createRef<RichTextEditorHandle>()

  const { container, initialValue, baseUrl, language, editorStyle, allowedFileTypes, textAreaProps, onValueChange } = {
    ...defaultProps,
    ...props,
  }
  ReactDOM.createRoot(container).render(
    <RichTextEditor
      ref={ref}
      language={language}
      editorStyle={editorStyle}
      onValueChange={onValueChange}
      initialValue={initialValue}
      baseUrl={baseUrl}
      allowedFileTypes={allowedFileTypes}
      textAreaProps={textAreaProps}
    />,
  )

  return ref
}
