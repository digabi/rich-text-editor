import $ from 'jquery'
import * as u from './util'
import * as MathQuill from '@digabi/mathquill'

if (!MathQuill) throw new Error('MathQuill is required but has not been loaded')

const keyCodes = {
    ENTER: 13,
    ESC: 27,
    Z: 90,
    Y: 89,
}

const undoRedoCodes = {
    UNDO: -1,
    REDO: 1,
    NOCHANGE: 0,
}

window.mathEditorState = window.mathEditorState || { firstTime: true, MQ: undefined }
const state = window.mathEditorState

const trimLatex = function (latex) {
    const trimmedFromSides = latex.trim()
    const trimmed = trimmedFromSides.replace(/(\\|\s)*/g, '') === '' ? '' : trimmedFromSides
    return trimmed + (trimmed.endsWith('\\') ? ' ' : '')
}
export function init(
    $outerPlaceholder,
    focus,
    baseUrl,
    updateMathImg = ($img, latex) => {
        const trimmed = trimLatex(latex)
        const trimmedAlt = trimmed.replace(/</g, '\\lt ').replace(/>/g, '\\gt ')
        $img.prop({
            src: `${baseUrl}/math.svg?latex=${encodeURIComponent(trimmed)}`,
            alt: trimmedAlt,
        })
        $img.closest('[data-js="answer"]').trigger('input')
    },
    l,
) {
    let updateMathImgTimeout

    if (state.firstTime) {
        state.MQ = MathQuill.getInterface(2)
        state.firstTime = false
    }
    const $mathEditorContainer = $(`
        <div>
            <div class="math-editor" data-js="mathEditor">
                <div class="math-editor-equation-field" data-js="equationField"></div>
                <textarea rows="1" class="math-editor-latex-field" data-js="latexField" placeholder="LaTeΧ"></textarea>
                <span class="render-error"></span>
            </div>
        </div>`)

    $outerPlaceholder.append($mathEditorContainer)
    const $latexField = $mathEditorContainer.find('[data-js="latexField"]')
    const $equationField = $mathEditorContainer.find('[data-js="equationField"]')
    let mqEditTimeout
    let visible = false
    let focusChanged = null
    let undoStack = []
    let redoStack = []

    // undo=-1, redo=1, noChange=0
    let undoRedo = 0
    //noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols
    const mqInstance = state.MQ.MathField($equationField.get(0), {
        handlers: {
            edit: onMqEdit,
            enter: () => {
                closeMathEditor(true)
                setTimeout(() => insertNewEquation('<br>'), 2)
            },
        },
    })
    $equationField
        .on('input', '.mq-textarea textarea', onMqEdit)
        .on('focus blur', '.mq-textarea textarea', (e) => {
            focus.equationField = e.type !== 'blur' && e.type !== 'focusout'
            onFocusChanged()
        })
        .on('keydown', onKeyDown)
        .on('paste', (e) => e.stopPropagation())

    $latexField
        .on('keypress', transformLatexKeydown)
        .on('input paste', onLatexUpdate)
        .on('focus blur', (e) => {
            focus.latexField = e.type !== 'blur'
            onFocusChanged()
        })
        .on('keydown', onKeyDown)
        .on('paste', (e) => e.stopPropagation())

    function onKeyDown(e) {
        if ($('.rich-text-editor-overlay').is(':visible')) return
        else if (u.isUndo(e)) undoMath()
        else if (u.isRedo(e)) redoMath()
        else if (u.isCtrlKey(e, keyCodes.ENTER) || u.isKey(e, keyCodes.ESC)) closeMathEditor(true)
    }

    return {
        insertNewEquation,
        insertMath,
        openMathEditor,
        closeMathEditor,
        undoMath,
        redoMath,
    }

    function updateUndoRedoStacks() {
        const latex = $latexField.val().trim()
        if (undoRedo >= undoRedoCodes.NOCHANGE && u.last(undoStack) !== latex) {
            if (undoRedo === undoRedoCodes.NOCHANGE) redoStack = []
            undoStack.push(latex)
        }
        $('[data-js="mathUndo"]').prop('disabled', undoStack.length <= 1)
        $('[data-js="mathRedo"]').prop('disabled', redoStack.length === 0)
        if (undoRedo !== 0 && mqInstance.latex().length === 0 && latex.length > 0) {
            $latexField.focus()
        }
        setTimeout(() => (undoRedo = undoRedoCodes.NOCHANGE), 2)
    }

    function onMqEdit(e) {
        e && e.originalEvent && e.originalEvent.stopPropagation()
        clearTimeout(mqEditTimeout)
        mqEditTimeout = setTimeout(() => {
            if (focus.latexField || undoRedo !== undoRedoCodes.NOCHANGE) return
            const latex = mqInstance.latex()
            $latexField.val(latex)
            renderPossibleError()
            updateMathImgWithDebounce($mathEditorContainer.prev(), latex)
            updateLatexFieldHeight()
            updateUndoRedoStacks()
        }, 0)
    }

    function transformLatexKeydown(e) {
        if (e.originalEvent.key === ',') {
            e.preventDefault()
            u.insertToTextAreaAtCursor($latexField.get(0), '{,}')
            onLatexUpdate(e)
        }
    }

    function renderPossibleError() {
        const $renderError = $('.render-error')
        $renderError.empty()
        if (isLatexInvalid()) {
            $renderError.text(l.render_error)
        }
    }

    function onLatexUpdate(e) {
        e && e.originalEvent && e.originalEvent.stopPropagation()
        const latex = $latexField.val()
        updateMathImgWithDebounce($mathEditorContainer.prev(), latex)
        setTimeout(() => {
            mqInstance.latex(latex)
            updateUndoRedoStacks()
            renderPossibleError()
        }, 1)
        updateLatexFieldHeight()
    }

    function updateLatexFieldHeight() {
        $latexField.get(0).style.height = 'auto'
        $latexField.get(0).style.height = `${$latexField.get(0).scrollHeight}px`
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
            `${optionalMarkup}<img data-js="new" alt="" src="" style="display: none"/>`,
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
        redoStack = []
        undoStack = []
        toggleMathToolbar(true)
        setTimeout(() => mqInstance.focus(), 0)
        $latexField.val($img.prop('alt'))
        setTimeout(() => {
            if (isLatexInvalid()) $latexField.focus()
        }, 2)
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

    function undoMath() {
        if (undoStack.length === 1) return
        undoRedo = undoRedoCodes.UNDO
        redoStack.push(undoStack.pop())
        mqInstance.latex(u.last(undoStack))
        updateMathImgWithDebounce($mathEditorContainer.prev(), mqInstance.latex())
        $latexField.val(u.last(undoStack))
        updateUndoRedoStacks()
        updateLatexFieldHeight()
        renderPossibleError()
    }

    function redoMath() {
        if (redoStack.length === 0) return
        undoRedo = undoRedoCodes.REDO
        mqInstance.latex(u.last(redoStack))
        $latexField.val(redoStack.pop())
        updateMathImgWithDebounce($mathEditorContainer.prev(), mqInstance.latex())
        updateUndoRedoStacks()
        updateLatexFieldHeight()
        renderPossibleError()
    }

    function isLatexInvalid() {
        return mqInstance.latex().length === 0 && $latexField.val().length > 0
    }
}
