import styled from 'styled-components'

import AddEqButton from './components/add-eq-button'
import ButtonGroup from './components/button-group'
import ExtraButtons from './components/extra-buttons'
import MathEditorButtons from './components/math-editor-buttons'

import * as chars from './math-char-data'
import useEditorState from '../../state'

/**
 * When the page is resized to a small enough width, the button groups
 * are aligned in a grid (instead of the default flex row). This variable
 * controls the number of columns in that grid.
 */
const GRID_COLS = 3

export default function Toolbar() {
  const editor = useEditorState()

  const isExpand = editor.isToolbarExpanded

  return (
    <Container
      // We want to hide the toolbar when the text area loses focus *except*
      // when the element that causes the focus loss is the *toolabr itself*.
      // To check for that, we use the `FocusEvent.relatedTarget` prop in the
      // text area `onBlur`. But the toolbar container won't show up in that
      // property unless it has a tab index (to make it "focusable"):
      tabIndex={0}
    >
      <AddEqButton />
      <Grid cols={GRID_COLS}>
        <ButtonGroup isExpand={isExpand} cols={13} chars={chars.BASIC} span={GRID_COLS} />
        <ButtonGroup isExpand={isExpand} cols={3} chars={chars.ALGEBRA} />
        <ButtonGroup isExpand={isExpand} cols={3} chars={chars.GEOMETRY} />
        <ButtonGroup isExpand={isExpand} cols={6} chars={chars.SET_THEORY} />
      </Grid>
      <MathEditorButtons />
      <ExtraButtons />
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  display: flex;
  justify-content: center;

  background-color: #fff;
  box-shadow: 0 1px 10px 1px rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid #dfdfdf;

  z-index: 1000;
`

const Grid = styled.div<{ cols: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.cols}, auto);
  justify-items: center;

  @media (min-width: 1200px) {
    display: flex;
    justify-content: center;
    align-items: flex-start;

    gap: 1em;
  }
`
