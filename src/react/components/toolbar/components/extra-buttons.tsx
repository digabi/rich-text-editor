import styled from 'styled-components'

import ExpandIcon from '../../icons/expand'
import HelpIcon from '../../icons/help'
import useEditorState from '../../../state'
import { eventHandlerWithoutFocusLoss } from '../../../utility'

export default function ExtraButtons() {
  const editor = useEditorState()

  const onClick = editor.isToolbarExpanded ? editor.collapseToolbar : editor.expandToolbar

  return (
    <Container>
      <Button onClick={onClick}>
        <ExpandIcon
          style={{
            transformOrigin: 'center center',
            transition: 'transform 200ms',
            transform: editor.isToolbarExpanded ? 'rotate(0deg)' : 'rotate(180deg)',
          }}
        />
      </Button>
      <Button onMouseDown={eventHandlerWithoutFocusLoss(editor.showHelpDialog)}>
        <HelpIcon />
      </Button>
    </Container>
  )
}

const Container = styled.div`
  @media (min-width: 800px) {
    width: 160px;

    display: flex;
    justify-content: flex-start;
  }
  @media (max-width: 801px) {
    position: absolute;
    right: 0;
  }
`

const Button = styled.button`
  width: 35px; // TODO: Move this to a constant
  height: 35px; // TODO: Move this to a constant

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  background: none;
  border: none;
`
