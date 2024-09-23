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
  const { isMathToolbarOpen, undo, redo, canUndo, canRedo, activeMathEditor } = useEditorState()

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

  return isMathToolbarOpen ? (
    <Container>
      <Grid>
        {mathShortcutData.map((shortcut) => (
          <LatexCommandButton onMouseDown={(e) => onMouseDown(e, shortcut)} data-latex={shortcut.action}>
            <img src={shortcut.svg} />
          </LatexCommandButton>
        ))}
      </Grid>
      <ButtonContainer>
        <HistoryButton onMouseDown={onHistoryEvent(undo)} disabled={!canUndo}>
          <UndoIcon />
        </HistoryButton>
        <HistoryButton onMouseDown={onHistoryEvent(redo)} disabled={!canRedo}>
          <RedoIcon />
        </HistoryButton>
      </ButtonContainer>
    </Container>
  ) : null
}

const buttonWidth = '35px'

const Container = styled.div`
  display: contents;
  position: absolute;
  top: 100%;
  width: 100%;
  background-color: #fafafa;

  &::before {
    content: '';
    grid-row: 2 / 3;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none; /* Prevent interference with grid items */
    background: #fafafa;
    border-top: 1px solid #dfdfdf;
  }
`

const Grid = styled.div`
  grid-column: 2;
  grid-row: 2;
  display: grid;
  grid-template-columns: repeat(17, 1fr);
  grid-template-rows: 1fr 1fr;
  width: fit-content;

  @media (max-width: 799px) {
    grid-column: 1;
  }
`

const Button = styled.button`
  width: ${buttonWidth};
  height: ${buttonWidth};
  z-index: 11;

  & > img {
    max-width: ${buttonWidth};
    max-height: ${buttonWidth};
  }

  background: none;
  border: none;

  cursor: pointer;
  padding: 0;
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

const HistoryButton = styled(Button)`
  &:disabled {
    opacity: 50%;
    filter: grayscale(1);
    pointer-events: none;
    cursor: default;
  }
`

const ButtonContainer = styled.div`
  display: flex;

  z-index: 11;
  grid-column: 3;
  grid-row: 2;

  @media (max-width: 799px) {
    position: absolute;
    right: 0;
  }
`
