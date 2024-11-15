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

  isExpanded: boolean
}

export default function ButtonGroup({ cols, chars, isExpanded, span = 1 }: Props) {
  const editor = useEditorState()
  const charsToShow = isExpanded ? chars : chars.slice(0, cols)

  function onMouseDown(e: React.MouseEvent, char: Props['chars'][number]) {
    e.preventDefault()
    e.stopPropagation()
    if (editor.activeMathEditor?.mq.el().contains(document.activeElement)) {
      editor.activeMathEditor.mq.write(char.latex ?? char.label)
    } else {
      window.document.execCommand('insertText', false, char.label)
    }
  }

  return (
    <Container cols={cols} span={span}>
      {charsToShow.map((char) => (
        <Button key={char.label} onMouseDown={(e) => onMouseDown(e, char)} data-latex={char.latex ?? char.label}>
          {char.label}
        </Button>
      ))}
    </Container>
  )
}

const Container = styled.div<{ cols: number; span: number }>`
  width: ${(props) => props.cols * 35}px;
  grid-column: auto / span ${(props) => props.span};

  display: inline-grid;
  grid-template-columns: repeat(${(props) => props.cols}, 1fr);
`

const Button = styled.button`
  position: relative;

  width: 35px;
  height: 35px;

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
