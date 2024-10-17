import ReactDOM from 'react-dom/client'
import RichTextEditor, { RichTextEditorProps } from './react'

export type MakeRichTextProps = { container: HTMLElement } & RichTextEditorProps

const defaultProps: MakeRichTextProps = {
  container: document.getElementById('rich-text-editor-root')!,
  language: 'FI',
  baseUrl: '',
  allowedFileTypes: ['image/png', 'image/jpeg'],
  onValueChange: () => {},
  textAreaProps: {},
}

export const makeRichText = (props: MakeRichTextProps) => {
  const { container, initialValue, baseUrl, language, editorStyle, allowedFileTypes, textAreaProps } = {
    ...defaultProps,
    ...props,
  }
  ReactDOM.createRoot(container).render(
    <RichTextEditor
      language={language}
      editorStyle={editorStyle}
      onValueChange={() => {}}
      initialValue={initialValue}
      baseUrl={baseUrl}
      allowedFileTypes={allowedFileTypes}
      textAreaProps={textAreaProps}
    />,
  )
}
