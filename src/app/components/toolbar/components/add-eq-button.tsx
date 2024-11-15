import styled from 'styled-components'
import useEditorState from '../../../state'

export default function AddEqButton() {
  const editor = useEditorState()
  return (
    <Container>
      {!editor.activeMathEditor && (
        <Button onClick={editor.spawnMathEditorAtCursor}>Σ {editor.t.editor.insertEquation}</Button>
      )}
    </Container>
  )
}

const Container = styled.div`
  background-color: white;

  @media (min-width: 800px) {
    display: flex;
    justify-content: flex-end;

    grid-column: 1;
    grid-row: 1;
  }

  @media (max-width: 799px) {
    grid-column: 1;
    grid-row: 2;

    width: 100%;
  }
`

const Button = styled.button`
  height: 35px;

  padding: 5px 10px;
  background: none;
  border: none;

  font-family: SourceSansPro-Semibold, sans-serif;
  font-size: 16px;
  color: #359bb7;

  @media (min-width: 800px) {
  }
`
