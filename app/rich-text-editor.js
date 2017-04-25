const u = require('./util')
const toolbars = require('./toolbars')
const mathEditor = require('./math-editor')
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
const math = mathEditor.init($outerPlaceholder, focus, onMathFocusChanged)

function onMathFocusChanged() {
    if (richTextAndMathBlur()) onRichTextEditorBlur()
}

const {$toolbar} = toolbars.init(math, () => focus.richText, l)

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
        .on('mousedown', u.equationImageSelector, e => {
            onRichTextEditorFocus($(e.target).closest('[data-js="answer"]'))
            math.openMathEditor($(e.target))
        })
        .on('keydown', e => {
            if (u.isCtrlKey(e, keyCodes.ENTER) || u.isKey(e, keyCodes.ESC)) math.closeMathEditor(true)
        })
        .on('keypress', e => {
            if (u.isCtrlKey(e, 'l') || u.isCtrlKey(e, 'i')) math.insertNewEquation()
        })
        .on('focus blur', e => {
            if (math.isVisible() && e.type === 'focus') math.closeMathEditor()
            onRichTextEditorFocusChanged(e)
        })
        .on('keyup input', e => {
            if(! pasteInProgress) onValueChanged(u.sanitizeContent(e.currentTarget))
        })
        .on('paste', e => {
            pasteInProgress = true
            setTimeout(() => pasteInProgress = false, 0)

            if (e.target.tagName === 'TEXTAREA')
                return
            const clipboardData = e.originalEvent.clipboardData
            const file = clipboardData.items && clipboardData.items[0].getAsFile()
            if (file) {
                onPasteBlob(e, file, saver, $answer, onValueChanged, limit)
            } else {
                const clipboardDataAsHtml = clipboardData.getData('text/html')
                if (clipboardDataAsHtml) onPasteHtml(e, $answer, clipboardDataAsHtml, limit, saver, onValueChanged)
                else onLegacyPasteImage(saver, limit, onValueChanged)
            }
        })
    onValueChanged(u.sanitizeContent($answer.get(0)))
    setTimeout(() => document.execCommand("enableObjectResizing", false, false), 0)
}

function onPasteBlob(event, file, saver, $answer, onValueChanged, limit) {
    event.preventDefault()
    if (file.type === 'image/png') {
        if (u.existingScreenshotCount($answer) + 1 <= limit) {
            saver({data: file, type: file.type, id: String(new Date().getTime())}).then(screenshotUrl => {
                const img = `<img src="${screenshotUrl}"/>`
                window.document.execCommand('insertHTML', false, img)
            })
        } else {
            onValueChanged(u.SCREENSHOT_LIMIT_ERROR())
        }
    }
}

function onPasteHtml(event, $answer, clipboardDataAsHtml, limit, saver, onValueChanged) {
    event.preventDefault()
    if (u.totalImageCount($answer, clipboardDataAsHtml) <= limit) {
        window.document.execCommand('insertHTML', false, u.sanitize(clipboardDataAsHtml))
        u.persistInlineImages($currentEditor, saver, limit, onValueChanged)
    } else {
        onValueChanged(u.SCREENSHOT_LIMIT_ERROR())
    }
}

function onLegacyPasteImage(saver, limit, onValueChanged) {
    u.persistInlineImages($currentEditor, saver, limit, onValueChanged)
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
    math.closeMathEditor()
    focus.richText = false
}

let richTextEditorBlurTimeout

function onRichTextEditorFocusChanged(e) {
    focus.richText = e.type === 'focus'

    clearTimeout(richTextEditorBlurTimeout)
    richTextEditorBlurTimeout = setTimeout(() => {
        if (richTextAndMathBlur()) onRichTextEditorBlur()
        else if (focus.richText && math.isVisible()) math.closeMathEditor()
        else onRichTextEditorFocus($(e.target))
    }, 0)
}

function richTextAndMathBlur() {
    return !focus.richText && !math.isVisible() && !focus.latexField && !focus.equationField
}
