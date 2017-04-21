const {isCtrlKey, isKey, decodeBase64Image, insertToTextAreaAtCursor, sanitizeContent, sanitize} = require('./util')
const toolbars = require('./toolbars')
const loadingImg = require('./loadingImg')
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
const equationImageSelector = 'img[src^="/math.svg"]'

const $outerPlaceholder = $(`<div class="rich-text-editor-hidden" data-js="outerPlaceholder">`)

function moveElementAfter($element, $after) {
    $after.after($element)
}

function hideElementInDOM($element) {
    $outerPlaceholder.append($element)
}

// TODO: replace with data attributes?
let richTextFocus = true
let latexFieldFocus = false
let equationFieldFocus = false
let mathEditorVisible = false
let $currentEditor


const mathEditor = initMathEditor()
const {$toolbar} = toolbars.init(mathEditor, () => richTextFocus, l)

function toggleMathToolbar(isVisible) {
    $('body').toggleClass('math-editor-focus', isVisible)
}
$('body')
    .append($outerPlaceholder)
    .append($toolbar)

function initMathEditor() {
    const $mathEditorContainer = $(`
        <div class="math-editor" data-js="mathEditor">
            <div class="math-editor-boxes">
                <div class="math-editor-equation-field" data-js="equationField"></div>
                <textarea class="math-editor-latex-field" data-js="latexField" placeholder="LaTex"></textarea>
            </div>
        </div>`)

    hideElementInDOM($mathEditorContainer)

    const $latexField = $mathEditorContainer.find('[data-js="latexField"]')
    const $equationField = $mathEditorContainer.find('[data-js="equationField"]')
    let mqEditTimeout
    function onMqEdit() {
        clearTimeout(mqEditTimeout)
        mqEditTimeout = setTimeout(() => {
            if (latexFieldFocus)
                return
            const latex = mqInstance.latex()
            $latexField.val(latex)
            updateMathImg($mathEditorContainer.prev(), latex)
        }, 100)
    }
    const mqInstance = MQ.MathField($equationField.get(0), {
        handlers: {
            edit: onMqEdit,
            enter: field => {
                // TODO: do not close editor / o not create  a new equation if there is no text?
                mathEditor.closeMathEditor(true)
                setTimeout(() => insertNewEquation('<div></div>'), 2)
            }
        }
    })
    $equationField.on('keydown', '.mq-textarea textarea', onMqEdit)

    $equationField
        .on('focus blur', '.mq-textarea textarea', e => {
            equationFieldFocus = e.type !== 'blur' && e.type !== 'focusout'
            onFocusChanged()
        })

    function onLatexUpdate() {
        updateMathImg($mathEditorContainer.prev(), $latexField.val())
        setTimeout(() => mqInstance.latex($latexField.val()), 1)
    }

    $latexField
        .keyup(onLatexUpdate)
        .on('focus blur', e => {
            latexFieldFocus = e.type !== 'blur'
            onFocusChanged()
        })

    let focusChanged = null

    function onFocusChanged() {
        clearTimeout(focusChanged)
        focusChanged = setTimeout(() => {
            if (!latexFieldFocus && !equationFieldFocus) closeMathEditor()
            if (!richTextFocus && !mathEditorVisible && !latexFieldFocus && !equationFieldFocus) onRichTextEditorBlur()
        }, 0)
    }

    function insertNewEquation(optionalMarkup) {
        window.document.execCommand('insertHTML', false, (optionalMarkup ? optionalMarkup : '') + '<img data-js="new" style="display: none"/>')
        const $addedEquationImage = $('[data-js="new"]')
        $addedEquationImage
            .removeAttr('data-js')

        moveElementAfter($mathEditorContainer, $addedEquationImage)

        mqInstance.latex('')
        mathEditorVisible = true
        toggleMathToolbar(true)
        setTimeout(() => mqInstance.focus(), 0)
    }

    function insertMath(symbol, alternativeSymbol, useWrite) {
        if (latexFieldFocus) {
            insertToTextAreaAtCursor($latexField.get(0), alternativeSymbol || symbol)
            onLatexUpdate()
        } else if (equationFieldFocus) {
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
        $img
            .prop('src', '/math.svg?latex=' + encodeURIComponent(latex))
            .prop('alt', latex)
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
        hideElementInDOM($mathEditorContainer)
        mathEditorVisible = false
        latexFieldFocus = false
        equationFieldFocus = false
        if (setFocusAfterClose) $currentEditor.focus()
    }

    function openMathEditor($img) {
        if (mathEditorVisible) closeMathEditor()
        $img.hide()
        moveElementAfter($mathEditorContainer, $img)
        const latex = $img.prop('alt')
        $latexField.val(latex)
        onLatexUpdate()
        mathEditorVisible = true
        toggleMathToolbar(true)
        setTimeout(() => mqInstance.focus(), 0)
    }

    return {
        insertNewEquation,
        insertMath,
        closeMathEditor,
        openMathEditor,
        onFocusChanged
    }
}

function onRichTextEditorFocus($element) {
    $currentEditor = $element
    $('body').addClass('rich-text-editor-focus')
}

function onRichTextEditorBlur() {
    // TODO: remove event bindings
    $('body').removeClass('rich-text-editor-focus')
    mathEditor.closeMathEditor()
    // $editor.off()

    richTextFocus = false
    mathEditorVisible = false
    latexFieldFocus = false
}

let richTextEditorBlurTimeout

function onRichTextEditorFocusChanged(e) {
    richTextFocus = e.type === 'focus'

    clearTimeout(richTextEditorBlurTimeout)
    richTextEditorBlurTimeout = setTimeout(() => {
        if (!richTextFocus && !mathEditorVisible && !latexFieldFocus && !equationFieldFocus) onRichTextEditorBlur()
        else if (richTextFocus && mathEditorVisible) mathEditor.closeMathEditor()
        else onRichTextEditorFocus($(e.target))
    }, 0)
}

function isMathEditorVisible() {
    return mathEditorVisible
}

const markAndGetInlineImages = $editor => {
    const images = $editor.find('img[src^="data"]').toArray()
        .map((el, index) => Object.assign(decodeBase64Image(el.getAttribute('src')), {
            $el: $(el)
        }))
    images.filter(({type}) => type !== 'image/png').forEach(({$el}) => $el.remove())
    const pngImages = images.filter(({type}) => type === 'image/png')
    pngImages.forEach(({$el}) => $el.attr('src', loadingImg))
    return pngImages
}

const checkForImageLimit = ($editor, imageData, limit) => {
    const imageCount = $editor.find('img').size()
    const equationCount = $editor.find(equationImageSelector).size()
    const screenshotCount = imageCount - equationCount
    return Bacon.once(screenshotCount > limit ? new Bacon.Error() : imageData)
}

const persistInlineImages = ($editor, screenshotSaver, screenshotCountLimit) => {
    Bacon.combineAsArray(markAndGetInlineImages($editor)
        .map(data => {
                const s = checkForImageLimit($editor, data, screenshotCountLimit)
                    .flatMapLatest(() => Bacon.fromPromise(screenshotSaver(data)))
                    .doAction(screenShotUrl => data.$el.attr('src', screenShotUrl))
                s.onError(() => data.$el.remove())
                return s
            }
        )
    ).onValue(() => $editor.trigger('input'))
}

const makeRichText = (element, options, onValueChanged = () => { }) => {
    const {
        screenshot: {
            saver,
            limit
        }
    } = options
    const $answer = $(element)

    let pasteInProgress = false

    $answer
        .attr('contenteditable', 'true')
        .attr('spellcheck', 'false')
        .attr('data-js', 'answer')
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
            if (isMathEditorVisible() && e.type === 'focus') mathEditor.closeMathEditor()
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
                setTimeout(()=> persistInlineImages($currentEditor, saver, limit), 0)
            }
        })

    setTimeout(() => document.execCommand("enableObjectResizing", false, false), 0)
}

module.exports = {
    makeRichText
}
