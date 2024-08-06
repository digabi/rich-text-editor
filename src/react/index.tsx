import React from 'react'
import ReactDOM from 'react-dom/client'
import { RichTextEditor } from '../components/RichTextEditor'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<RichTextEditor style={{ top: 200, position: 'relative' }} />)
