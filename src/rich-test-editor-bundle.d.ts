import { MakeRichTextProps } from 'src/rich-text-editor-bundle'

declare global {
  interface Window {
    makeRichText: (props: MakeRichTextProps) => void
  }
}

export const makeRichText: (props: MakeRichTextProps) => void
