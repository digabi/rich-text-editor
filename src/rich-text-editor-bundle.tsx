import ReactDOM from 'react-dom/client'
import RichTextEditor, { RichTextEditorProps } from './react'

declare global {
  interface Window {
    makeRichText: (props: RichTextEditorProps) => void
  }
}

const defaultProps: { container: HTMLElement } & RichTextEditorProps = {
  container: document.getElementById('root')!,
  language: 'FI',
  baseUrl: '',
  allowedFileTypes: ['image/png', 'image/jpeg'],
  onValueChange: () => {},
}

export const makeRichText = (props: RichTextEditorProps) => {
  const { container, initialValue, baseUrl, language, editorStyle, allowedFileTypes } = { ...defaultProps, ...props }
  ReactDOM.createRoot(container).render(
    <RichTextEditor
      language={language}
      editorStyle={editorStyle}
      onValueChange={() => {}}
      initialValue={initialValue}
      baseUrl={baseUrl}
      allowedFileTypes={allowedFileTypes}
    />,
  )
}

window.makeRichText = makeRichText
