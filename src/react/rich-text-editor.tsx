import MainTextArea from './components/text-area'
import { EditorStateProvider, EditorStateProviderProps } from './state'

export default function RichTextEditor({ language, toolbarRoot }: EditorStateProviderProps) {
  return (
    <EditorStateProvider language={language} toolbarRoot={toolbarRoot}>
      <MainTextArea />
    </EditorStateProvider>
  )
}
