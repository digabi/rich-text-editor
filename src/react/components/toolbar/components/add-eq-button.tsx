import styled from 'styled-components'
import useEditorState from '../../../state'

export default function AddEqButton() {
  const editor = useEditorState()
  return (
    <Container>
      {!editor.activeMathEditor && <Button onClick={editor.spawnMathEditorAtCursor}>Σ Lisää kaava</Button>}
    </Container>
  )
}

const Container = styled.div`
  @media (min-width: 800px) {
    width: 160px;

    display: flex;
    justify-content: flex-end;
  }
  @media not (min-width: 800px) {
    position: absolute;
    top: 100%;

    width: 100%;
    background-color: white;

    background-color: #fff;
    box-shadow: 0 1px 10px 1px rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid #dfdfdf;
  }
`

const Button = styled.button`
  height: 35px; // TODO: Move this to a constant

  padding: 5px 10px;
  background: none;
  border: none;

  font-family: SourceSansPro-Semibold, sans-serif;
  font-size: 16px;
  color: #359bb7;

  @media (min-width: 800px) {
  }
`
