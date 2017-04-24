const {isCtrlKey, isKey, persistInlineImages, sanitizeContent, sanitize, equationImageSelector} = require('./util')
const toolbars = require('./toolbars')
const locales = {
    FI: require('./FI'),
    SV: require('./SV')
}
const l = locales[window.locale || 'FI'].editor
const keyCodes = {
    ENTER: 13,
    ESC: 27
}
const $outerPlaceholder = $(`<div class="rich-text-editor-hidden" data-js="outerPlaceholder">`)
const focus = {
    richText: false,
    latexField: false,
    equationField: false
}
let $currentEditor
const mathEditor = require('./math-editor').init($outerPlaceholder, focus, onMathFocusChanged)

function onMathFocusChanged() {
    if (richTextAndMathBlur()) onRichTextEditorBlur()
}

const {$toolbar} = toolbars.init(mathEditor, () => focus.richText, l)

$('body').append($outerPlaceholder, $toolbar)

module.exports.makeRichText = (element, options, onValueChanged = () => { }) => {
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
        .on('mousedown', equationImageSelector, e => {
            onRichTextEditorFocus($(e.target).closest('[data-js="answer"]'))
            mathEditor.openMathEditor($(e.target))
        })
        .on('keypress', e => {
            if (isCtrlKey(e, 'l') || isCtrlKey(e, 'i')) mathEditor.insertNewEquation()
            if (isCtrlKey(e, keyCodes.ENTER) || isKey(e, keyCodes.ESC)) mathEditor.closeMathEditor(true)
        })
        .on('focus blur', e => {
            if (mathEditor.isVisible() && e.type === 'focus') mathEditor.closeMathEditor()
            onRichTextEditorFocusChanged(e)
        })
        .on('keyup input', e => {
            if(! pasteInProgress) onValueChanged(sanitizeContent(e.currentTarget))
        })
        .on('paste', e => {
            pasteInProgress = true
            setTimeout(() => pasteInProgress = false, 0)

            if (e.target.tagName === 'TEXTAREA')
                return
            const clipboardData = e.originalEvent.clipboardData
            const file = clipboardData.items && clipboardData.items[0].getAsFile()
            if (file) {
                e.preventDefault()
                if(file.type !== 'image/png')
                    return
                saver({data: file, type: file.type, id: String(new Date().getTime())}).then(screenshotUrl => {
                    const img = `<img src="${screenshotUrl}"/>`
                    window.document.execCommand('insertHTML', false, img)
                })
            } else {
                const clipboardDataAsHtml = clipboardData.getData('text/html')
                if (clipboardDataAsHtml) {
                    e.preventDefault()
                    window.document.execCommand('insertHTML', false, sanitize(clipboardDataAsHtml))
                }
                setTimeout(()=> persistInlineImages($currentEditor, saver, limit, onValueChanged), 0)
            }
        })

    setTimeout(() => document.execCommand("enableObjectResizing", false, false), 0)
}

function toggleRichTextToolbar(isVisible) {
    $('body').toggleClass('rich-text-editor-focus', isVisible)
}
function onRichTextEditorFocus($element) {
    $currentEditor = $element
    toggleRichTextToolbar(true)
}

function onRichTextEditorBlur() {
    toggleRichTextToolbar(false)
    mathEditor.closeMathEditor()
    focus.richText = false
}

let richTextEditorBlurTimeout

function onRichTextEditorFocusChanged(e) {
    focus.richText = e.type === 'focus'

    clearTimeout(richTextEditorBlurTimeout)
    richTextEditorBlurTimeout = setTimeout(() => {
        if (richTextAndMathBlur()) onRichTextEditorBlur()
        else if (focus.richText && mathEditor.isVisible()) mathEditor.closeMathEditor()
        else onRichTextEditorFocus($(e.target))
    }, 0)
}

function richTextAndMathBlur() {
    return !focus.richText && !mathEditor.isVisible() && !focus.latexField && !focus.equationField
}
