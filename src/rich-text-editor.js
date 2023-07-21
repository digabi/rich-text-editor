import $ from 'jquery'
import * as u from './util'
import * as toolbars from './toolbars'
import * as clipboard from './clipboard'
import * as mathEditor from './math-editor'
import FI from './FI'
import SV from './SV'

const locales = { FI, SV }

const keyCodes = {
    E: 69,
}
const $outerPlaceholder = $('<div class="rich-text-editor-hidden" style="display: none;" data-js="outerPlaceholder">')

window.richTextEditorState = window.richTextEditorState || {
    focus: {
        richText: false,
        latexField: false,
        equationField: false,
    },
    $currentEditor: undefined,
    firstCall: true,
    math: undefined,
    $toolbar: undefined,
}
const state = window.richTextEditorState
const focus = state.focus
export const makeRichText = (answer, options, onValueChanged = () => {}) => {
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
    } = { ...u.defaults, ...options }
    const l = locales[locale].editor
    if (state.firstCall) {
        state.firstCall = false
        state.math = mathEditor.init($outerPlaceholder, focus, baseUrl, updateMathImg, l)
        const containers = toolbars.init(state.math, () => focus.richText, l)
        state.$toolbar = containers.toolbar
        const $helpOverlay = containers.helpOverlay
        $('body').append($outerPlaceholder, state.$toolbar, $helpOverlay)
    }
    let pasteInProgress = false

    $(answer)
        .attr({
            contenteditable: true,
            spellcheck: false,
            'data-js': 'answer',
        })
        .addClass('rich-text-editor')
        .on('click', u.equationImageSelector, (e) => {
            if (e.which === 1) {
                onRichTextEditorFocus($(e.target).closest('[data-js="answer"]'))
                state.math.openMathEditor($(e.target))
            }
        })
        .on('keydown', (e) => {
            if (u.isCtrlKey(e, keyCodes.E) && !focus.equationField && !focus.latexField) {
                e.preventDefault()
                state.math.insertNewEquation()
            }
        })
        .on('mathfocus', (e) => {
            $(e.currentTarget).toggleClass('rich-text-focused', e.hasFocus)
            if (richTextAndMathBlur()) onRichTextEditorBlur(state.$currentEditor)
        })
        .on('focus blur', (e) => {
            if (e.type === 'focus') state.math.closeMathEditor()
            onRichTextEditorFocusChanged(e)
        })
        // Triggered after both drop and paste
        .on('input', (e) => {
            if (!pasteInProgress)
                onValueChanged(
                    ignoreSaveObject || u.sanitizeContent(e.currentTarget, screenshotImageSelector, sanitize),
                )
        })
        .on('drop', (e) => {
            pasteInProgress = true
            setTimeout(() => {
                $(e.currentTarget).html(sanitize(e.currentTarget.innerHTML))
                clipboard.persistInlineImages($(e.currentTarget), screenshotSaver, invalidImageSelector, fileTypes)
                pasteInProgress = false
            }, 100)
        })
        .on('paste', (e) => {
            pasteInProgress = true
            setTimeout(() => (pasteInProgress = false), 0)
            clipboard.onPaste(e, screenshotSaver, invalidImageSelector, fileTypes, sanitize)
        })
    setTimeout(() => document.execCommand('enableObjectResizing', false, false), 0)
}

function toggleRichTextToolbar(isVisible, $editor) {
    $('body').toggleClass('rich-text-editor-focus', isVisible)
    $editor.toggleClass('rich-text-focused', isVisible)
}

function onRichTextEditorFocus($element) {
    state.$currentEditor = $element
    toggleRichTextToolbarAnimation()
    toggleRichTextToolbar(true, state.$currentEditor)
}

function onRichTextEditorBlur($element) {
    toggleRichTextToolbar(false, $element)
    toggleRichTextToolbarAnimation()
    focus.richText = false
}

function toggleRichTextToolbarAnimation() {
    const animatingClass = 'rich-text-editor-tools--animating'
    state.$toolbar
        .addClass(animatingClass)
        .one('transitionend transitioncancel', () => state.$toolbar.removeClass(animatingClass))
}

let richTextEditorBlurTimeout

function onRichTextEditorFocusChanged(e) {
    focus.richText = e.type === 'focus'
    $(e.currentTarget).toggleClass('rich-text-focused', focus.richText)

    clearTimeout(richTextEditorBlurTimeout)
    richTextEditorBlurTimeout = setTimeout(() => {
        if (!helpOverlayOpen() && richTextAndMathBlur()) onRichTextEditorBlur($(e.target))
        else onRichTextEditorFocus($(e.target))
    }, 0)
}

function helpOverlayOpen() {
    return $('body').hasClass('rich-text-editor-overlay-open')
}

function richTextAndMathBlur() {
    return !focus.richText && !focus.latexField && !focus.equationField
}
