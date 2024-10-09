import ReactDOM from 'react-dom/client'
import RichTextEditor, { RichTextEditorProps } from './react'

declare global {
  interface Window {
    makeRichText: (props: RichTextEditorProps) => void
  }
}

export const makeRichText = ({ initialValue }: RichTextEditorProps) => {
  console.log(initialValue)
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <RichTextEditor
      language="FI"
      editorStyle={{ top: '300px', position: 'relative' }}
      onValueChange={() => {}}
      initialValue={initialValue}
    />,
  )
}

window.makeRichText = makeRichText
