import ReactDOM from 'react-dom/client'
import RichTextEditor, { RichTextEditorProps } from './app'

export type MakeRichTextProps = { container: HTMLElement } & RichTextEditorProps

const defaultProps: MakeRichTextProps = {
  container: document.getElementById('rich-text-editor-root')!,
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
