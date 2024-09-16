import styled from 'styled-components'

import mathShortcutData from '../math-shortcut-data'
import useEditorState from '../../../state'

export type Props = {
  show?: boolean
}

// TODO: A Better Name
export default function MathShortcutButtons(props: Props) {
  const editor = useEditorState()

  function onMouseDown(e: React.MouseEvent, shortcut: (typeof mathShortcutData)[number]) {
    e.preventDefault()
    e.stopPropagation()
    if (editor.activeMathEditor?.mq.el().contains(document.activeElement)) {
      editor.activeMathEditor.mq[shortcut.useWrite ? 'write' : 'cmd'](shortcut.action)
    } else {
      window.document.execCommand('insertText', false, shortcut.label)
    }
  }

  if (!editor.activeMathEditor) return null

  return (
    <Container>
      <Grid>
        {mathShortcutData.map((shortcut) => (
          <Button onMouseDown={(e) => onMouseDown(e, shortcut)} data-latex={shortcut.action}>
            <img src={shortcut.svg} />
          </Button>
        ))}
      </Grid>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  background-color: #fafafa;
`

const Grid = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(17, 1fr);
`

const Button = styled.button`
  position: relative;

  width: 35px; // TODO: Move this to a constant
  height: 35px; // TODO: Move this to a constant

  & > img {
    max-width: 35px;
    max-height: 35px;
  }

  background: none;
  border: none;

  cursor: pointer;

  font-family: Symbola, monospace;
  font-size: 16px;
  color: #555;

  transition: background-color 75ms;

  &:hover {
    background-color: #f0f0f0;
  }
  &:active {
    background-color: #e0e0e0;
  }

  &:hover:after {
    position: absolute;
    background: #359bb7;
    border-radius: 5px;
    color: #fff;
    content: attr(data-latex);
    letter-spacing: 1.5px;
    font-size: 16px;
    left: 50%;
    top: 100%;
    padding: 7px 15px;
    position: absolute;
    z-index: 32;
    transform: translate(-50%, 0);
    white-space: nowrap;
    pointer-events: none;
  }
  &:hover:before {
    position: aboslute;
    display: inline-block;
    border: solid;
    border-color: #359bb7 transparent;
    border-width: 0 6px 6px 6px;
    bottom: 0;
    content: '';
    left: 50%;
    position: absolute;
    z-index: 99;
    margin-left: -6px;
  }
`
