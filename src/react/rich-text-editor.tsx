import MainTextArea from './components/text-area'
import { EditorStateProvider } from './state'
import { Language } from './utility'

export default function RichTextEditor({ language }: { language: Language }) {
  return (
    <EditorStateProvider language={language}>
      <MainTextArea />
    </EditorStateProvider>
  )
}
