import ReactDOM from 'react-dom/client'
import RichTextEditor, { RichTextEditorProps } from './react'

declare global {
  interface Window {
    makeRichText: (props: RichTextEditorProps) => void
  }
}

export const makeRichText = ({ initialValue, baseUrl }: RichTextEditorProps) => {
  console.debug({ baseUrl })
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <RichTextEditor
      language="FI"
      editorStyle={{ top: '300px', position: 'relative' }}
      onValueChange={() => {}}
      initialValue={initialValue}
      baseUrl={baseUrl}
    />,
  )
}

window.makeRichText = makeRichText
