import styled from 'styled-components'

export type Props = {
  show?: boolean
}

// TODO: A Better Name
export default function MathShortcutButtons(props: Props) {
  return (props.show ?? true) && <Container></Container>
}

const Container = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  height: 20px;
  //   background: red;
`
