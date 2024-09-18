import styled from 'styled-components'

import mathShortcutData from '../math-shortcut-data'
import useEditorState from '../../../state'
import { eventHandlerWithoutFocusLoss } from '../../../utility'

import UndoIcon from '../../icons/undo'
import RedoIcon from '../../icons/redo'

export type Props = {
  show?: boolean
}

export default function MathEditorButtons(props: Props) {
  const { undo, redo, canUndo, canRedo, activeMathEditor } = useEditorState()

  function onMouseDown(e: React.MouseEvent, shortcut: (typeof mathShortcutData)[number]) {
    e.preventDefault()
    e.stopPropagation()
    if (activeMathEditor?.mq.el().contains(document.activeElement)) {
      activeMathEditor.mq[shortcut.useWrite ? 'write' : 'cmd'](shortcut.action)
    } else {
      window.document.execCommand('insertText', false, shortcut.label)
    }
  }

  const onHistoryEvent = (fn: typeof undo | typeof redo) =>
    eventHandlerWithoutFocusLoss(() => {
      const newValue = fn()

      activeMathEditor?.mq.latex(newValue ?? '')
    })

  if (!activeMathEditor) return null

  return (
    <Container>
      <Grid>
        {mathShortcutData.map((shortcut) => (
          <Button onMouseDown={(e) => onMouseDown(e, shortcut)} data-latex={shortcut.action}>
            <img src={shortcut.svg} />
          </Button>
        ))}
      </Grid>
      <HistoryButton onMouseDown={onHistoryEvent(undo)} disabled={!canUndo}>
        <UndoIcon />
      </HistoryButton>
      <HistoryButton onMouseDown={onHistoryEvent(redo)} disabled={!canRedo}>
        <RedoIcon />
      </HistoryButton>
    </Container>
  )
}

const buttonWidth = '35px'

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
  width: ${buttonWidth};
  height: ${buttonWidth};

  & > img {
    max-width: ${buttonWidth};
    max-height: ${buttonWidth};
  }

  background: none;
  border: none;

  cursor: pointer;
`

const LatexCommandButton = styled(Button)`
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
`

const HistoryButton = styled(Button)``
