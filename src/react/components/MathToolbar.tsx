import latexCommands from '../resources/latexCommandsWithSvg'
import { eventHandlerWithoutFocusLoss } from '../utility'

interface MathToolbarProps {
  onCommandClick: (command: (typeof latexCommands)[number]) => void
}

export const MathToolbar = ({ onCommandClick }: MathToolbarProps) => (
  <>
    {latexCommands.map((command) => (
      <button
        key={command.action}
        className="rich-text-editor-button rich-text-editor-button-grid"
        data-command={command.action}
        data-latexcommand={command.label || ''}
        data-usewrite={command.useWrite || false}
        onMouseDown={eventHandlerWithoutFocusLoss(() => onCommandClick(command))}
      >
        <img src={command.svg} />
      </button>
    ))}
    <div className="rich-text-editor-undo-redo-wrapper">
      <button
        className="rich-text-editor-button rich-text-editor-undo-redo rich-text-editor-undo-button"
        disabled={true}
        data-command="Ctrl + Z"
        data-js="mathUndo"
        onMouseDown={eventHandlerWithoutFocusLoss(() => {
          console.log('undo')
        })}
      ></button>
      <button
        className="rich-text-editor-button rich-text-editor-undo-redo rich-text-editor-redo-button"
        disabled={true}
        data-command="Ctrl + Y"
        data-js="mathRedo"
        onMouseDown={eventHandlerWithoutFocusLoss(() => {
          console.log('redo')
        })}
      ></button>
    </div>
  </>
)

const MathEditor = () => (
  <div>
    <div className="math-editor" data-js="mathEditor">
      <div className="math-editor-equation-field" data-js="equationField"></div>
      <textarea rows={1} className="math-editor-latex-field" data-js="latexField" placeholder="LaTeΧ"></textarea>
      <span className="render-error"></span>
    </div>
  </div>
)
