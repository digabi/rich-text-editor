import { useState } from 'react'
import RichTextEditor from '../src/app'
import { Answer } from '../src/app/utility'

/** Mimics a library user that stores the answer in state, and therefore re-renders the
 * editor on every `onValueChange`. The exam engine does this by dispatching each change
 * to a redux store, and that used to reset the answer history debounce on every keystroke.
 * */
export default function EditorInRerenderingParent() {
  const [, setAnswer] = useState<Answer | null>(null)

  return (
    <RichTextEditor
      language="FI"
      baseUrl="http://localhost:5111"
      onValueChange={setAnswer}
      allowedFileTypes={['image/png', 'image/jpeg']}
      initialValue=""
      textAreaProps={{ editorStyle: { marginTop: '300px', minHeight: '200px' } }}
    />
  )
}
