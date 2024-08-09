import latexCommands from '../latexCommandsWithSvg'
import { eventHandlerWithoutFocusLoss } from '../react/utility'

interface MathToolbarProps {
  onCommandClick: (action: string) => void
  undo?: () => void
  redo?: () => void
  isUndoAvailable: boolean
  isRedoAvailable: boolean
}

export const MathToolbar = ({ onCommandClick, undo, redo, isUndoAvailable, isRedoAvailable }: MathToolbarProps) => (
  <>
    {latexCommands.map((command) =>
      typeof command !== 'string' ? ( //  TODO: One of the commands is just <br /> for legacy reasons, fix this
        <button
          key={command.action}
          className="rich-text-editor-button rich-text-editor-button-grid"
          data-command={command.action}
          data-latexcommand={command.label || ''}
          data-usewrite={command.useWrite || false}
          onMouseDown={eventHandlerWithoutFocusLoss(() => onCommandClick(command.action))}
        >
          <img src={command.svg} />
        </button>
      ) : null,
    )}
    {!!undo && !!redo && (
      <div className="rich-text-editor-undo-redo-wrapper">
        <button
          className="rich-text-editor-button rich-text-editor-undo-redo rich-text-editor-undo-button"
          data-command="Ctrl + Z"
          data-js="mathUndo"
          onMouseDown={eventHandlerWithoutFocusLoss(undo)}
          disabled={!isUndoAvailable}
        ></button>
        <button
          className="rich-text-editor-button rich-text-editor-undo-redo rich-text-editor-redo-button"
          data-command="Ctrl + Y"
          data-js="mathRedo"
          onMouseDown={eventHandlerWithoutFocusLoss(redo)}
          disabled={!isRedoAvailable}
        ></button>
      </div>
    )}
  </>
)
