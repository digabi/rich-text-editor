import styled from 'styled-components'

import { ExpandIcon } from '../../ExpandIcon'
import { HelpIcon } from '../../HelpIcon'

export type Props = {
  show?: boolean
}

export default function LatexButtons(props: Props) {
  return (props.show ?? true) && <Container></Container>
}

const Container = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  height: 20px;
  background: red;
`
