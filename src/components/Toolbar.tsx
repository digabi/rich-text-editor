import React, { useState } from 'react'
import { SpecialCharacter, SpecialCharacterGroup, Translation, eventHandlerWithoutFocusLoss } from '../react/utility'
import { ToolbarHelpOverlay } from './ToolbarHelpOverlay'
import latexCommands from '../latexCommandsWithSvg'
import { ExpandIcon } from './ExpandIcon'
import { HelpIcon } from './HelpIcon'
import { UndoIcon } from './UndoIcon'
import { RedoIcon } from './RedoIcon'
import styled from 'styled-components'

interface ToolbarProps {
  t: Translation['editor']
  specialCharacterGroups: SpecialCharacterGroup[]
  onMathCommand: (action: string) => void
  onEquationButtonClick: () => void
  undo?: () => void
  redo?: () => void
  isUndoAvailable: boolean
  isRedoAvailable: boolean
  showMathToolbar: boolean
}

export const Toolbar = ({
  t,
  specialCharacterGroups,
  onMathCommand,
  undo,
  redo,
  isUndoAvailable,
  isRedoAvailable,
  showMathToolbar,
  onEquationButtonClick,
}: ToolbarProps) => {
  const [showHelpOverlay, setShowHelpOverlay] = useState(false)
  const [showAllCharacters, setShowCharacters] = useState(false)

  return (
    <div
      className="rich-text-editor-tools"
      data-js="tools"
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 1000 }}
    >
      <ToolbarGrid className="toolbar">
        <EquationButtonContainer $row={1} $column={1} $justify="end" $align="start">
          {showMathToolbar ? null : (
            <EquationButton
              onMouseDown={eventHandlerWithoutFocusLoss(() => {
                onEquationButtonClick()
              })}
            >
              Σ {t.insertEquation}
            </EquationButton>
          )}
        </EquationButtonContainer>
        <GridCell $row={1} $column={2}>
          <IconCategoriesGrid $columnRatios={specialCharacterGroups.map((g) => g.characters.length)}>
            {specialCharacterGroups.map((group, i) => {
              const popularCharacters = group.characters.filter((character) => character.popular)
              const restOfCharacters = group.characters.filter((character) => !character.popular)
              const columnCount = group.characters.filter((character) => character.popular).length
              const rowCount = showAllCharacters ? Math.ceil(group.characters.length / columnCount) : 1

              return (
                <IconGrid key={group.label} $rows={rowCount} $columns={columnCount}>
                  {popularCharacters.map((character: (typeof group.characters)[number], j) => (
                    <SpecialCharacterButton {...character} key={character.character} column={j + 1} row={1} />
                  ))}
                  {showAllCharacters
                    ? restOfCharacters.map((character: (typeof group.characters)[number], j) => (
                        <SpecialCharacterButton
                          {...character}
                          key={character.character}
                          column={1 + (j % columnCount)}
                          row={2 + Math.floor(j / columnCount)}
                        />
                      ))
                    : null}
                </IconGrid>
              )
            })}
          </IconCategoriesGrid>
        </GridCell>
        <ButtonContainer $row={1} $column={3} $justify="start" $align="start">
          <Button
            onMouseDown={eventHandlerWithoutFocusLoss(() => {
              setShowCharacters(!showAllCharacters)
            })}
          >
            <ExpandIcon
              style={{
                transformOrigin: 'center center',
                transform: showAllCharacters ? 'rotate(180deg)' : 'none',
              }}
            />
          </Button>
          <Button
            onMouseDown={eventHandlerWithoutFocusLoss(() => {
              setShowHelpOverlay(!showHelpOverlay)
            })}
          >
            <HelpIcon />
          </Button>
        </ButtonContainer>
        {showMathToolbar && (
          <MathToolbar>
            <GridCell $row={2} $column={1} />
            <MathIconGrid $rows={2} $columns={Math.ceil(latexCommands.length / 2)} $row={2} $column={2}>
              {latexCommands.map((command, i) =>
                typeof command !== 'string' ? ( //  TODO: One of the commands is just <br /> for legacy reasons, fix this
                  <GridButton
                    key={command.action}
                    onMouseDown={eventHandlerWithoutFocusLoss(() => onMathCommand(command.action))}
                    $column={1 + (i % Math.ceil(latexCommands.length / 2))}
                    $row={1 + Math.floor(i / Math.ceil(latexCommands.length / 2))}
                  >
                    <MathIcon src={command.svg} />
                  </GridButton>
                ) : null,
              )}
            </MathIconGrid>
            <ButtonContainer $row={2} $column={3} $justify="start" $align="end">
              {undo && redo && (
                <>
                  <Button onMouseDown={eventHandlerWithoutFocusLoss(undo)} disabled={!isUndoAvailable}>
                    <UndoIcon />
                  </Button>
                  <Button onMouseDown={eventHandlerWithoutFocusLoss(redo)} disabled={!isRedoAvailable}>
                    <RedoIcon />
                  </Button>
                </>
              )}
            </ButtonContainer>
          </MathToolbar>
        )}
      </ToolbarGrid>
      {showHelpOverlay && (
        <ToolbarHelpOverlay
          onClose={() => {
            setShowHelpOverlay(false)
          }}
          t={t}
        />
      )}
    </div>
  )
}

const SpecialCharacterButton = ({ character, column, row }: SpecialCharacter & { column: number; row: number }) => (
  <GridButton
    onMouseDown={eventHandlerWithoutFocusLoss(() => {
      window.document.execCommand('insertText', false, character)
    })}
    $column={column}
    $row={row}
  >
    {character}
  </GridButton>
)

const iconSize = '35px'

interface GridItemProps {
  $column: number
  $row: number
}

interface GridProps {
  $columns: number
  $rows: number
}

const ToolbarGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: auto;
  gap: 10px;
  justify-items: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 11;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 1px 10px 1px rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid #dfdfdf;
  position: fixed;
`

const IconCategoriesGrid = styled.div<{ $columnRatios: number[] }>`
  display: grid;
  grid-template-columns: ${(props) => props.$columnRatios.map((ratio) => `${ratio}fr`).join(' ')};
  grid-template-rows: auto;
  gap: 15px;
  justify-items: center;
  align-items: center;

  @media (max-width: 1000px) {
    grid-template-columns: ${(props) =>
      `${props.$columnRatios[1]}fr ${props.$columnRatios[2]}fr ${props.$columnRatios[3]}fr`};
    grid-template-rows: auto auto;
    gap: 5px;

    & > *:first-child {
      grid-column: 1 / -1;
      grid-row: 1;
    }

    & > *:not:first-child {
      grid-row: 2;
    }
  }
`

const IconGrid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$columns}, 1fr);
  grid-template-rows: repeat(${(props) => props.$rows}, 1fr);
`

const MathIconGrid = styled.div<GridProps & GridItemProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$columns}, 1fr);
  grid-template-rows: repeat(${(props) => props.$rows}, 1fr);
  grid-column: ${(props) => props.$column};
  grid-row: ${(props) => props.$row};
  justify-self: start;
`

const MathIcon = styled.img`
  max-width: 25px;
  max-height: 25px;
`

const GridCell = styled.div<GridItemProps>`
  grid-column: ${(props) => props.$column};
  grid-row: ${(props) => props.$row};
  justify-content: start;
`

const GridButton = styled.button<GridItemProps>`
  grid-column: ${(props) => props.$column};
  grid-row: ${(props) => props.$row};
  font-family: Symbola, monospace;
  color: #555;
  width: ${iconSize};
  height: ${iconSize};
  text-align: center;
  display: inline-block;
  position: relative;
  cursor: pointer;
  border: none;
  padding: 0;
  background: none;
  font-size: 16px;
  z-index: 10;

  &:hover {
    background-color: #f0f0f0;
  }
`

const ButtonContainer = styled(GridCell)<{
  $justify: 'start' | 'end'
  $align: 'start' | 'end'
}>`
  display: flex;
  flex-direction: row;
  justify-self: ${(props) => props.$justify};
  align-self: ${(props) => props.$align};

  @media (max-width: 1000px) {
    &:nth-child(3) {
      justify-self: end;
    }
  }
`

const EquationButtonContainer = styled(ButtonContainer)`
  @media (max-width: 1300px) {
    grid-row: 2;
    grid-column: 2;
    justify-self: start;
  }
`

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: block;
  height: ${iconSize};
  width: ${iconSize};
  z-index: 10;

  &:disabled {
    filter: grayscale(100%);
    pointer-events: none;
  }
`

const EquationButton = styled(Button)`
  color: #359bb7;
  letter-spacing: 0;
  padding: 5px 10px;
  font-family: SourceSansPro-Semibold, sans-serif;
  font-size: 16px;
  font-weight: normal;
  line-height: 22px;
  justify-content: center;
  width: unset;
`

const MathToolbar = styled.div`
  display: contents;
  background-color: #fafafa;

  // This serves as the background for the math toolbar
  &::before {
    content: '';
    grid-column: 1 / -1;
    grid-row: 2 / 3;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none; /* Prevent interference with grid items */
    background: #fafafa;
    border-top: 1px solid #dfdfdf;
  }
`
