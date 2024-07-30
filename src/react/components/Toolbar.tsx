import { useState } from 'react'
import { SpecialCharacter, SpecialCharacterGroup, Translation, eventHandlerWithoutFocusLoss } from '../utility'
import { ToolbarHelpOverlay } from './ToolbarHelpOverlay'
import { MathToolbar } from './MathToolbar'
import latexCommands from '../resources/latexCommandsWithSvg'

const popularInGroup = (group: SpecialCharacterGroup) =>
  group.characters.filter((character) => character.popular).length

interface ToolbarProps {
  t: Translation['editor']
  specialCharacterGroups: SpecialCharacterGroup[]
  onMathCommand: (command: (typeof latexCommands)[number]) => void
  undo?: () => void
  redo?: () => void
}

export const Toolbar = ({ t, specialCharacterGroups, onMathCommand, undo, redo }: ToolbarProps) => {
  const [showHelpOverlay, setShowHelpOverlay] = useState(false)
  const [showAllCharacters, setShowCharacters] = useState(false)
  const [showMathToolbar, setShowMathToolbar] = useState(false)

  return (
    <div className="rich-text-editor-tools" data-js="tools">
      {showHelpOverlay && (
        <ToolbarHelpOverlay
          onClose={() => {
            setShowHelpOverlay(false)
          }}
          t={t}
        />
      )}
      <div className="rich-text-editor-tools-button-wrapper">
        <div className="rich-text-editor-toolbar-wrapper">
          <button
            className="rich-text-editor-characters-expand-collapse"
            data-js="expandCollapseCharacters"
            style={{ zIndex: 100 }}
            onMouseDown={eventHandlerWithoutFocusLoss(() => {
              setShowCharacters(!showAllCharacters)
            })}
          ></button>
        </div>
        <div className="rich-text-editor-toolbar-wrapper">
          <button
            className="rich-text-editor-help-button"
            data-js="richTextEditorHelp"
            style={{ zIndex: 100 }}
            onMouseDown={eventHandlerWithoutFocusLoss(() => {
              setShowHelpOverlay(!showHelpOverlay)
            })}
          />
        </div>
      </div>
      <div className="rich-text-editor-tools-row">
        <div className="rich-text-editor-toolbar-wrapper">
          <div
            className="rich-text-editor-toolbar-characters rich-text-editor-toolbar rich-text-editor-toolbar-button-list"
            data-js="charactersList"
          >
            {specialCharacterGroups.map((group) => (
              <div className="rich-text-editor-toolbar-characters-group" style={{ width: popularInGroup(group) * 35 }}>
                {group.characters.map((character: (typeof group.characters)[number]) =>
                  character.popular || showAllCharacters ? <SpecialCharacterButton {...character} /> : null,
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {showMathToolbar ? (
        <div className="rich-text-editor-tools-row">
          <div className="rich-text-editor-toolbar-wrapper rich-text-editor-equation-wrapper">
            <div
              className="rich-text-editor-toolbar-equation rich-text-editor-toolbar rich-text-editor-toolbar-button-list"
              data-js="mathToolbar"
            >
              {showMathToolbar && <MathToolbar onCommandClick={onMathCommand} undo={undo} redo={redo} />}
            </div>
          </div>
        </div>
      ) : (
        <div className="rich-text-editor-tools-button-wrapper">
          <div className="rich-text-editor-toolbar-wrapper">
            <button
              className="rich-text-editor-new-equation rich-text-editor-button rich-text-editor-button-action"
              data-js="newEquation"
              data-command="Ctrl + E"
              data-i18n="rich_text_editor.insert_equation"
              onMouseDown={eventHandlerWithoutFocusLoss(() => {
                setShowMathToolbar(true)
              })}
            >
              Σ {t.insertEquation}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const SpecialCharacterButton = ({ latexCommand, noWrite, character }: SpecialCharacter) => (
  <button
    className={'rich-text-editor-button rich-text-editor-button-grid'}
    data-command={latexCommand}
    data-usewrite={!noWrite}
    onMouseDown={eventHandlerWithoutFocusLoss(() => {
      window.document.execCommand('insertText', false, character)
    })}
  >
    {character}
  </button>
)
