import ReactDOM from 'react-dom/client'
import RichTextEditor from './rich-text-editor'

// TODO: Document the portaling
// TODO: Move to a prop
export const TOOLBAR_ROOT = document.getElementById('toolbar')!
export const REACT_ROOT = document.getElementById('root')!

ReactDOM.createRoot(REACT_ROOT).render(<RichTextEditor language="FI" />)
