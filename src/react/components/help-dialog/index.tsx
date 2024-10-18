import styled from 'styled-components'
import useEditorState from '../../state'
import { eventHandlerWithoutFocusLoss } from '../../utility'
import CloseIcon from '../icons/close'

const mapLocalizationNodeToElement = ([type, content]: ['key' | 'text', string]) =>
  type === 'key' ? <Key>{content}</Key> : content

export const HelpDialog = () => {
  const { t } = useEditorState()
  const { hideHelpDialog } = useEditorState()

  return (
    <Overlay onMouseDown={eventHandlerWithoutFocusLoss(hideHelpDialog)}>
      <Modal aria-modal="true" tabIndex={0} onMouseDown={eventHandlerWithoutFocusLoss()}>
        <Columns>
          <LeftColumn>
            <h3>{t.editor.help_overlay.screenshotTitle}</h3>
            <p>{t.editor.help_overlay.screenshotInstruction.map(mapLocalizationNodeToElement)}</p>
          </LeftColumn>
          <RightColumn>
            <h3>{t.editor.help_overlay.equationTitle}</h3>
            <p>{t.editor.help_overlay.equationInstruction.map(mapLocalizationNodeToElement)}</p>
            <Table>
              <tbody>
                {t.editor.help_overlay.equationTable.map(([name, key]) => (
                  <tr>
                    <TableDescriptor>{name}</TableDescriptor>
                    <td>
                      <Key>{key}</Key>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </RightColumn>
        </Columns>
        <CloseButton onMouseDown={eventHandlerWithoutFocusLoss(hideHelpDialog)}>
          <CloseIcon />
        </CloseButton>
      </Modal>
    </Overlay>
  )
}

const Overlay = styled.div`
  z-index: 101;
  background: #00000080;
  display: flex;
  position: fixed;
  inset: 0;
`

const Modal = styled.div`
  background: #fff;
  outline: none;
  max-width: 860px;
  min-height: 40%;
  margin: auto;
  padding: 2rem;
  line-height: 1.5rem;
  position: relative;
`

const Columns = styled.div`
  display: flex;
`

const CloseButton = styled.button`
  cursor: pointer;
  border: 0;
  width: 25px;
  height: 25px;
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  padding: 0;
`

const Column = styled.div`
  margin: 0 1rem;
`

const LeftColumn = styled(Column)`
  flex: 2;
`

const RightColumn = styled(Column)`
  flex: 1;
`

const Table = styled.table`
  border-spacing: 0 4px;
  width: 100%;
`

const TableDescriptor = styled.td`
  text-align: left;
  font-weight: normal;
`

const Key = styled.span`
  color: #000;
  text-align: center;
  text-transform: uppercase;
  vertical-align: text-top;
  background: #fff;
  border-radius: 4px;
  min-width: 15px;
  margin: 0 4px;
  padding: 0 4px;
  font-family: monospace;
  line-height: 1.3;
  display: inline-block;
  box-shadow: 0 0 0 1px #0000004d;
`
