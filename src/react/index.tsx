import ReactDOM from 'react-dom/client'
import RichTextEditor from './rich-text-editor'

export const REACT_ROOT = document.getElementById('root')!

ReactDOM.createRoot(REACT_ROOT).render(
  <RichTextEditor
    language="FI"
    editorStyle={{ top: '300px', position: 'relative' }}
    onValueChange={(answer) => console.debug(answer)}
  />,
)
