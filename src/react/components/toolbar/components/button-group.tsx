import styled from 'styled-components'
import useEditorState from '../../../state'

type CharData = { label: string; latex?: string }

type Props = {
  /**
   * The characters to show in this group.
   * Note that the characters will be displayed in the same order as they appear
   * in this array. The exact position where a character is rendered in the grid
   * is thus controlled by its position in this array and the `props.cols` number.
   */
  chars: CharData[]

  /** The number of columns in this button group */
  cols: number

  /** The number of columns this group should span when it itself is in a grid */
  span?: number

  isExpand: boolean
}

export default function ButtonGroup({ cols, chars, isExpand, span = 1 }: Props) {
  const editor = useEditorState()
  const charsToShow = isExpand ? chars : chars.slice(0, cols)

  function doLatexInput(char: Props['chars'][number]) {
    if (editor.activeMathBox?.mq) {
      editor.activeMathBox?.mq.cmd(char.latex ?? char.label)
    } else {
      window.document.execCommand('insertText', false, char.label)
    }
  }

  return (
    <Container cols={cols} span={span}>
      {charsToShow.map((char) => (
        <Button key={char.label} onClick={() => doLatexInput(char)}>
          {char.label}
        </Button>
      ))}
    </Container>
  )
}

const Container = styled.div<{ cols: number; span: number }>`
  width: ${(props) => props.cols * 35}px; // TODO: Move this to a constant
  grid-column: auto / span ${(props) => props.span};

  display: inline-grid;
  grid-template-columns: repeat(${(props) => props.cols}, 1fr);
`

const Button = styled.button`
  width: 35px; // TODO: Move this to a constant
  height: 35px; // TODO: Move this to a constant

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
`
