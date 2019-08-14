import $ from 'jquery'
import * as u from './util'
import * as toolbars from './toolbars'
import * as clipboard from './clipboard'
import * as mathEditor from './math-editor'
import FI from './FI'
import SV from './SV'

const locales = { FI, SV }

const keyCodes = {
    E: 69
}
const $outerPlaceholder = $('<div class="rich-text-editor-hidden" style="display: none;" data-js="outerPlaceholder">')
const focus = {
    richText: false,
    latexField: false,
    equationField: false
}
let $currentEditor

let firstCall = true
let math
let $toolbar

export const makeRichText = (answer, options, onValueChanged = () => {}) => {
    const l = locales[options.locale || 'FI'].editor

    const saver = options.screenshot.saver
    const limit = options.screenshot.limit
    const baseUrl = options.baseUrl || ''

    if (firstCall) {
        math = mathEditor.init($outerPlaceholder, focus, baseUrl, options.updateMathImg)
        const containers = toolbars.init(math, () => focus.richText, l, baseUrl)
        $toolbar = containers.toolbar
        const $helpOverlay = containers.helpOverlay
        $('body').append($outerPlaceholder, $toolbar, $helpOverlay)
        firstCall = false
    }
    onValueChanged(u.sanitizeContent(answer))
    let pasteInProgress = false

    $(answer)
        .attr({
            contenteditable: true,
            spellcheck: false,
            'data-js': 'answer'
        })
        .addClass('rich-text-editor')
        .on('click', u.equationImageSelector, e => {
            if (e.which === 1) {
                onRichTextEditorFocus($(e.target).closest('[data-js="answer"]'))
                math.openMathEditor($(e.target))
            }
        })
        .on('keydown', e => {
            if (u.isCtrlKey(e, keyCodes.E) && !focus.equationField && !focus.latexField) {
                e.preventDefault()
                math.insertNewEquation()
            }
        })
        .on('mathfocus', e => {
            $(e.currentTarget).toggleClass('rich-text-focused', e.hasFocus)
            if (richTextAndMathBlur()) onRichTextEditorBlur($currentEditor)
        })
        .on('focus blur', e => {
            if (e.type === 'focus') math.closeMathEditor()
            onRichTextEditorFocusChanged(e)
        })
        // Triggered after both drop and paste
        .on('input', e => {
            if (!pasteInProgress) onValueChanged(u.sanitizeContent(e.currentTarget))
        })
        .on('drop', e => {
            pasteInProgress = true
            setTimeout(() => {
                $(e.target).html(u.sanitize(e.target.innerHTML))
                clipboard.persistInlineImages($(e.currentTarget), saver, limit, onValueChanged)
                pasteInProgress = false
            }, 100)
        })
        .on('paste', e => {
            pasteInProgress = true
            setTimeout(() => (pasteInProgress = false), 0)
            clipboard.onPaste(e, saver, onValueChanged, limit)
        })
    setTimeout(() => document.execCommand('enableObjectResizing', false, false), 0)
}

function toggleRichTextToolbar(isVisible, $editor) {
    $('body').toggleClass('rich-text-editor-focus', isVisible)
    $editor.toggleClass('rich-text-focused', isVisible)
}

function onRichTextEditorFocus($element) {
    $currentEditor = $element
    toggleRichTextToolbar(true, $currentEditor)
}

function onRichTextEditorBlur($element) {
    toggleRichTextToolbar(false, $element)
    focus.richText = false
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
