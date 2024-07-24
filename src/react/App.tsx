import React, { useState } from 'react'
import FI from './resources/fi'
import SV from './resources/sv'
import specialCharacters from './resources/specialCharacters'
import { Options, defaults, Translation, eventHandlerWithoutFocusLoss } from './utility'
import { Toolbar } from './components/Toolbar'

type FocusTarget = 'RichText' | 'LatexField' | 'EquationField'

const locales = { FI, SV }

const keyCodes = {
  E: 69,
}

export type Props = {
  options: Options
  onValueChanged: () => {}
}

export const RichTextEditor = ({ options, onValueChanged }: Props) => {
  const [focusTarget, setFocusTarget] = useState<FocusTarget>('RichText')
  const [isFirstCall, setIsFirstCall] = useState(true)

  const [showToolbar, setShowToolbar] = useState(false)

  const {
    baseUrl,
    fileTypes,
    sanitize,
    screenshotSaver,
    ignoreSaveObject,
    screenshotImageSelector,
    invalidImageSelector,
    locale,
    updateMathImg,
    forceInit,
  } = { ...defaults, ...options }

  const t = locales[locale].editor

  return (
    <div>
      {showToolbar && <Toolbar t={t} specialCharacterGroups={specialCharacters} />}
      <textarea
        contentEditable={true}
        spellCheck={false}
        className="rich-text-editor"
        onFocus={(e) => {
          setShowToolbar(true)
        }}
        onBlur={() => {
          setShowToolbar(false)
        }}
      />
    </div>
  )
}

const MathEditor = () => {}
