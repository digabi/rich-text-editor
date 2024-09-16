import MainTextArea from './components/text-area'
import { EditorStateProvider } from './state'

export type Props = {
  /** TODO: Do we need documentation for this? */
  language: 'FI' | 'SV'
  /** TODO: Documentation */
  toolbarRoot: HTMLElement
  /**
   * Callback that's called when the user pastes an image to the text area.
   * The function is given a `File` Blob and is expected to return a string
   * that can be used as the `src` attribute of an `<img />` tag.
   */
  getPasteSource?: (file: File) => Promise<string>
}

export default function RichTextEditor({ language, toolbarRoot }: Props) {
  return (
    <EditorStateProvider language={language} toolbarRoot={toolbarRoot}>
      <MainTextArea />
    </EditorStateProvider>
  )
}
