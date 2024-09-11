import React from 'react'
import { Translation, eventHandlerWithoutFocusLoss } from '../react/utility'

export const ToolbarHelpOverlay = ({ t, onClose }: { t: Translation['editor']; onClose: () => void }) => (
  <div className="rich-text-editor-overlay" onMouseDown={eventHandlerWithoutFocusLoss(onClose)}>
    <div
      className="rich-text-editor-overlay-modal"
      aria-modal="true"
      tabIndex={0}
      data-js="overlayModal"
      onMouseDown={eventHandlerWithoutFocusLoss()}
    >
      <div className="rich-text-editor-modal-columns">
        <div
          className="rich-text-editor-modal-column rich-text-editor-modal-column-2"
          data-i18n="[html]rich_text_editor.help_overlay.screenshot"
          dangerouslySetInnerHTML={{ __html: t.help_overlay.screenshotInstruction }}
        ></div>
        <div
          className="rich-text-editor-modal-column rich-text-editor-modal-column-1"
          data-i18n="[html]rich_text_editor.help_overlay.equation"
          dangerouslySetInnerHTML={{ __html: t.help_overlay.equationTable }}
        ></div>
      </div>
      <button
        data-js="closeOverlayButton"
        onMouseDown={eventHandlerWithoutFocusLoss(onClose)}
        className="rich-text-editor-close-overlay-button"
      ></button>
    </div>
  </div>
)
