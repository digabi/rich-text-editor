const {isCtrlKey, isKey, persistInlineImages, insertToTextAreaAtCursor, sanitizeContent, sanitize, setCursorAfter, equationImageSelector} = require('./util')
const toolbars = require('./toolbars')
const MQ = MathQuill.getInterface(2)
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
let mathEditorVisible = false
let $currentEditor
const mathEditor = initMathEditor()
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
        .on('keydown', e => {
            if (isCtrlKey(e, keyCodes.ENTER) || isKey(e, keyCodes.ESC)) mathEditor.closeMathEditor(true)
        })
        .on('mousedown', equationImageSelector, e => {
            onRichTextEditorFocus($(e.target).closest('[data-js="answer"]'))
            mathEditor.openMathEditor($(e.target))
        })
        .on('keypress', e => {
            if (isCtrlKey(e, 'l') || isCtrlKey(e, 'i')) mathEditor.insertNewEquation()
        })
        .on('focus blur', e => {
            if (mathEditorVisible && e.type === 'focus') mathEditor.closeMathEditor()
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

function initMathEditor() {
    const $mathEditorContainer = $(`
        <div class="math-editor" data-js="mathEditor">
            <div class="math-editor-equation-field" data-js="equationField"></div>
            <textarea class="math-editor-latex-field" data-js="latexField" placeholder="LaTex"></textarea>
        </div>`)

    $outerPlaceholder.append($mathEditorContainer)
    const $latexField = $mathEditorContainer.find('[data-js="latexField"]')
    const $equationField = $mathEditorContainer.find('[data-js="equationField"]')
    let mqEditTimeout
    let focusChanged = null
    //noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols
    const mqInstance = MQ.MathField($equationField.get(0), {
        handlers: {
            edit: onMqEdit,
            enter: field => {
                mathEditor.closeMathEditor(true)
                setTimeout(() => insertNewEquation('<br>'), 2)
            }
        }
    })
    $equationField
        .on('keydown', '.mq-textarea textarea', onMqEdit)
        .on('focus blur', '.mq-textarea textarea', e => {
            focus.equationField = e.type !== 'blur' && e.type !== 'focusout'
            onFocusChanged()
        })

    $latexField
        .keyup(onLatexUpdate)
        .on('focus blur', e => {
            focus.latexField = e.type !== 'blur'
            onFocusChanged()
        })

    return {
        insertNewEquation,
        insertMath,
        closeMathEditor,
        openMathEditor,
        onFocusChanged
    }

    function onMqEdit() {
        clearTimeout(mqEditTimeout)
        mqEditTimeout = setTimeout(() => {
            if (focus.latexField)
                return
            const latex = mqInstance.latex()
            $latexField.val(latex)
            updateMathImg($mathEditorContainer.prev(), latex)
        }, 100)
    }

    function onLatexUpdate() {
        updateMathImg($mathEditorContainer.prev(), $latexField.val())
        setTimeout(() => mqInstance.latex($latexField.val()), 1)
    }

    function onFocusChanged() {
        clearTimeout(focusChanged)
        focusChanged = setTimeout(() => {
            if (!focus.latexField && !focus.equationField) closeMathEditor()
            if (richTextAndMathBlur()) onRichTextEditorBlur()
        }, 0)
    }

    function insertNewEquation(optionalMarkup = '') {
        window.document.execCommand('insertHTML', false, optionalMarkup + '<img data-js="new" alt="" style="display: none"/>')
        showMathEditor($('[data-js="new"]').removeAttr('data-js'))
    }

    function openMathEditor($img) {
        if (mathEditorVisible) closeMathEditor()
        setCursorAfter($img)
        showMathEditor($img)
    }

    function showMathEditor($img) {
        $img.hide()
        $img.after($mathEditorContainer)
        mathEditorVisible = true
        toggleMathToolbar(true)
        setTimeout(() => mqInstance.focus(), 0)
        $latexField.val($img.prop('alt'))
        onLatexUpdate()
    }

    function insertMath(symbol, alternativeSymbol, useWrite) {
        if (focus.latexField) {
            insertToTextAreaAtCursor($latexField.get(0), alternativeSymbol || symbol)
            onLatexUpdate()
        } else if (focus.equationField) {
            if (useWrite) {
                mqInstance.write(symbol)
            } else {
                mqInstance.typedText(symbol)
            }
            if (symbol.startsWith('\\')) mqInstance.keystroke('Tab')
            setTimeout(() => mqInstance.focus(), 0)
        }
    }

    function updateMathImg($img, latex) {
        $img.prop({
            src: '/math.svg?latex=' + encodeURIComponent(latex),
            alt: latex
        })
    }

    function closeMathEditor(setFocusAfterClose = false) {
        // TODO: remove event bindings
        const $currentEditor = $mathEditorContainer.closest('[data-js="answer"]')
        const $img = $mathEditorContainer.prev()
        if ($latexField.val().trim() === '') {
            $img.remove()
        } else {
            $img.show()
            updateMathImg($img, $latexField.val())
        }

        toggleMathToolbar(false)
        $outerPlaceholder.append($mathEditorContainer)
        mathEditorVisible = false
        focus.latexField = false
        focus.equationField = false
        if (setFocusAfterClose) $currentEditor.focus()
    }
}

function toggleMathToolbar(isVisible) {
    $('body').toggleClass('math-editor-focus', isVisible)
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
        else if (focus.richText && mathEditorVisible) mathEditor.closeMathEditor()
        else onRichTextEditorFocus($(e.target))
    }, 0)
}

function richTextAndMathBlur() {
    return !focus.richText && !mathEditorVisible && !focus.latexField && !focus.equationField
}
