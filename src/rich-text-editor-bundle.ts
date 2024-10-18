import { makeRichText, MakeRichTextProps } from './rich-text-editor'

declare global {
  interface Window {
    makeRichText: (props: MakeRichTextProps) => void
  }
}

window.makeRichText = makeRichText
