const u = require('./util')
const toolbars = require('./toolbars')
const clipboard = require('./clipboard')
const mathEditor = require('./math-editor')
const locales = {
    FI: require('./FI'),
    SV: require('./SV')
}
const l = locales[window.locale || 'FI'].editor
const keyCodes = {
    E: 69
}
const $outerPlaceholder = $(`<div class="rich-text-editor-hidden" style="display: none;" data-js="outerPlaceholder">`)
const focus = {
    richText: false,
    latexField: false,
    equationField: false
}
let $currentEditor

function onMathFocusChanged() {
    if (richTextAndMathBlur()) onRichTextEditorBlur($currentEditor)
}

let firstCall = true
let math
let $toolbar

module.exports.makeRichText = (element, options, onValueChanged = () => {}) => {
    if (firstCall) {
        math = mathEditor.init($outerPlaceholder, focus, onMathFocusChanged)
        $toolbar = toolbars.init(math, () => focus.richText, l)
        $('body').append($outerPlaceholder, $toolbar)
        firstCall = false
    }
    onValueChanged(u.sanitizeContent(element))
    const {
        screenshot: {
            saver,
            limit
        }
    } = options
    const $answer = $(element)
    let pasteInProgress = false

    $answer
        .attr({
            'contenteditable': 'true',
            'spellcheck': 'false',
            'data-js': 'answer'
        })
        .addClass('rich-text-editor')
        .on('click', u.equationImageSelector, e => {
            if(e.which === 1) {
                onRichTextEditorFocus($(e.target).closest('[data-js="answer"]'))
                math.openMathEditor($(e.target))
            }
        })
        .on('keyup', e => {
            if (u.isCtrlKey(e, keyCodes.E)) math.insertNewEquation()
        })
        .on('focus blur', e => {
            if (math.isVisible() && e.type === 'focus') math.closeMathEditor()
            onRichTextEditorFocusChanged(e)
        })
        .on('input', e => {
            if (!pasteInProgress) onValueChanged(u.sanitizeContent(e.currentTarget))
        })
        .on('drop', e => {
            setTimeout(() => {
                $(e.target).html(u.sanitize(e.target.innerHTML))
            },0)
        })
        .on('paste', e => {
            pasteInProgress = true
            setTimeout(() => pasteInProgress = false, 0)
            clipboard.onPaste(e, saver, onValueChanged, limit)
        })
    setTimeout(() => document.execCommand("enableObjectResizing", false, false), 0)
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
    math.closeMathEditor()
    focus.richText = false
}

let richTextEditorBlurTimeout

function onRichTextEditorFocusChanged(e) {
    focus.richText = e.type === 'focus'

    $(e.currentTarget).toggleClass('rich-text-focused', focus.richText )

    clearTimeout(richTextEditorBlurTimeout)
    richTextEditorBlurTimeout = setTimeout(() => {

        if (richTextAndMathBlur()) onRichTextEditorBlur($(e.target))
        else if (focus.richText && math.isVisible()) math.closeMathEditor()
        else onRichTextEditorFocus($(e.target))
    }, 0)
}

function richTextAndMathBlur() {
    return !focus.richText && !math.isVisible() && !focus.latexField && !focus.equationField
}
