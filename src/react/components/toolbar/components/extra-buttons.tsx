import styled from 'styled-components'

import ExpandIcon from '../../icons/expand'
import HelpIcon from '../../icons/help'
import useEditorState from '../../../state'
import { eventHandlerWithoutFocusLoss } from '../../../utility'

export type Props = {
  isExpand: boolean
  expandFlip: (e: any) => void
}

export default function ExtraButtons(props: Props) {
  const { showHelpDialog } = useEditorState()

  return (
    <Container>
      <Button onClick={props.expandFlip}>
        <ExpandIcon
          style={{
            transformOrigin: 'center center',
            transition: 'transform 200ms',
            transform: props.isExpand ? 'rotate(0deg)' : 'rotate(180deg)',
          }}
        />
      </Button>
      <Button onMouseDown={eventHandlerWithoutFocusLoss(showHelpDialog)}>
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
