import $ from 'jquery'
import * as u from './util'

const MathQuill = window.MathQuill
if (!MathQuill) throw new Error('MathQuill is required but has not been loaded')

const keyCodes = {
    ENTER: 13,
    ESC: 27
}

let MQ
let firstTime = true

const trimLatex = function(latex) {
    return latex.replace(/(\\|\s)*/g, '') === '' ? '' : latex
}
export function init(
    $outerPlaceholder,
    focus,
    baseUrl,
    updateMathImg = ($img, latex) => {
        const trimmed = trimLatex(latex)
        $img.prop({
            src: baseUrl + '/math.svg?latex=' + encodeURIComponent(trimmed),
            alt: trimmed
        })
        $img.closest('[data-js="answer"]').trigger('input')
    }
) {
    let updateMathImgTimeout

    if (firstTime) {
        MQ = MathQuill.getInterface(2)
    }
    const $mathEditorContainer = $(`
        <div class="math-editor" data-js="mathEditor">
            <div class="math-editor-equation-field" data-js="equationField"></div>
            <textarea rows="1" class="math-editor-latex-field" data-js="latexField" placeholder="LaTeΧ"></textarea>
        </div>`)

    $outerPlaceholder.append($mathEditorContainer)
    const $latexField = $mathEditorContainer.find('[data-js="latexField"]')
    const $equationField = $mathEditorContainer.find('[data-js="equationField"]')
    let mqEditTimeout
    let visible = false
    let focusChanged = null
    //noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols
    const mqInstance = MQ.MathField($equationField.get(0), {
        handlers: {
            edit: onMqEdit,
            enter: () => {
                closeMathEditor(true)
                setTimeout(() => insertNewEquation('<br>'), 2)
            }
        }
    })
    $equationField
        .on('input', '.mq-textarea textarea', onMqEdit)
        .on('focus blur', '.mq-textarea textarea', e => {
            focus.equationField = e.type !== 'blur' && e.type !== 'focusout'
            onFocusChanged()
        })
        .on('keydown', onClose)
        .on('paste', e => e.stopPropagation())

    $latexField
        .on('keypress', transformLatexKeydown)
        .on('input paste', onLatexUpdate)
        .on('focus blur', e => {
            focus.latexField = e.type !== 'blur'
            onFocusChanged()
        })
        .on('keydown', onClose)
        .on('paste', e => e.stopPropagation())

    function onClose(e) {
        if (u.isCtrlKey(e, keyCodes.ENTER) || u.isKey(e, keyCodes.ESC)) closeMathEditor(true)
    }

    return {
        insertNewEquation,
        insertMath,
        openMathEditor,
        closeMathEditor
    }

    function onMqEdit(e) {
        e && e.originalEvent && e.originalEvent.stopPropagation()
        clearTimeout(mqEditTimeout)
        mqEditTimeout = setTimeout(() => {
            if (focus.latexField) return
            const latex = mqInstance.latex()
            $latexField.val(latex)
            updateMathImgWithDebounce($mathEditorContainer.prev(), latex)
            updateLatexFieldHeight()
        }, 0)
    }

    function transformLatexKeydown(e) {
        if (e.originalEvent.key === ',') {
            e.preventDefault()
            u.insertToTextAreaAtCursor($latexField.get(0), '{,}')
        }
        onLatexUpdate(e)
    }

    function onLatexUpdate(e) {
        e && e.originalEvent && e.originalEvent.stopPropagation()
        updateMathImgWithDebounce($mathEditorContainer.prev(), $latexField.val())
        setTimeout(() => mqInstance.latex($latexField.val()), 1)
        updateLatexFieldHeight()
    }

    function updateLatexFieldHeight() {
        $latexField.get(0).style.height = 'auto'
        $latexField.get(0).style.height = $latexField.get(0).scrollHeight + 'px'
    }

    function onFocusChanged() {
        clearTimeout(focusChanged)
        focusChanged = setTimeout(() => {
            $mathEditorContainer.trigger({ type: 'mathfocus', hasFocus: focus.latexField || focus.equationField })
            if (!focus.latexField && !focus.equationField) closeMathEditor()
        }, 0)
    }

    function insertNewEquation(optionalMarkup = '') {
        window.document.execCommand(
            'insertHTML',
            false,
            optionalMarkup + '<img data-js="new" alt="" src="" style="display: none"/>'
        )
        showMathEditor($('[data-js="new"]').removeAttr('data-js'))
    }

    function openMathEditor($img) {
        if (visible) closeMathEditor()
        u.setCursorAfter($img)
        showMathEditor($img)
    }

    function showMathEditor($img) {
        $img.hide()
        $img.after($mathEditorContainer)
        visible = true
        focus.equationField = true
        toggleMathToolbar(true)
        setTimeout(() => mqInstance.focus(), 0)
        $latexField.val($img.prop('alt'))
        onLatexUpdate()
        u.scrollIntoView($mathEditorContainer)
    }

    function insertMath(symbol, alternativeSymbol, useWrite) {
        if (focus.latexField) {
            u.insertToTextAreaAtCursor($latexField.get(0), alternativeSymbol || symbol)
            onLatexUpdate()
        } else if (focus.equationField) {
            if (useWrite) {
                mqInstance.write(symbol)
            } else {
                mqInstance.typedText(symbol)
            }
            if (~symbol.indexOf('\\')) mqInstance.keystroke('Spacebar')
            setTimeout(() => mqInstance.focus(), 0)
        }
    }

    function updateMathImgWithDebounce($img, latex) {
        clearTimeout(updateMathImgTimeout)
        updateMathImgTimeout = setTimeout(() => {
            updateMathImg($img, latex)
        }, 500)
    }

    function closeMathEditor(setFocusAfterClose = false) {
        const $currentEditor = $mathEditorContainer.closest('[data-js="answer"]')
        const $img = $mathEditorContainer.prev()
        if (trimLatex($latexField.val()) === '') {
            $img.remove()
        } else {
            $img.show()
            updateMathImg($img, $latexField.val())
        }

        toggleMathToolbar(false)
        visible = false
        focus.latexField = false
        focus.equationField = false
        $mathEditorContainer.trigger({ type: 'mathfocus', hasFocus: focus.latexField || focus.equationField })
        $outerPlaceholder.append($mathEditorContainer)
        if (setFocusAfterClose) $currentEditor.focus()
    }

    function toggleMathToolbar(isVisible) {
        $('body').toggleClass('math-editor-focus', isVisible)
    }
}
