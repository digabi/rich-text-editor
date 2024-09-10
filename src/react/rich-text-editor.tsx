import MainTextArea from './components/text-area'
import { EditorStateProvider } from './state'

export default function RichTextEditor() {
  return (
    <EditorStateProvider>
      <MainTextArea />
    </EditorStateProvider>
  )
}
