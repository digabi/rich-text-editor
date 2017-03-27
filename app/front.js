const latexCommands = require('./latexCommands')
const specialCharacters = require('./specialCharacters')
const sanitizeHtml = require('sanitize-html')
const sanitizeOpts = require('./sanitizeOpts')
const MQ = MathQuill.getInterface(2)
const $equationEditor = $('.equationEditor')
const $latexEditor = $('.latexEditor')
const $answer = $('.answer')
const $mathToolbar = $('.mathToolbar')
const $math = $('.math')
let answerFocus = true
let latexEditorFocus = false
let editorVisible = false
initMathToolbar()
initSpecialCharacterSelector()

$('.newEquation').mousedown(e => {
    e.preventDefault()
    if(!answerFocus)
        return
    newEquation()
})

$('.save').click(() => {
    $.post('/save', {text: $answer.html()})
})

$('.load').click(() => {
    $.get('/load', data => $answer.html(data))
})

$answer.on('paste', e => {
    const clipboardDataAsHtml = e.originalEvent.clipboardData.getData('text/html')
    if(clipboardDataAsHtml) {
        e.preventDefault()
        window.document.execCommand('insertHTML', false, sanitizeHtml(clipboardDataAsHtml));
    }
})
function newEquation() {
    window.document.execCommand('insertHTML', false, '<img class="result new" style="display: none"/>');
    $('.result.new').removeClass('new').after($math)
    mathField.latex('')
    editorVisible = true
    $mathToolbar.show()
    setTimeout(() => mathField.focus(), 0)
}
$answer.on('focus blur', e => {
    if(editorVisible && e.type === 'focus') onClose()
    answerFocus = e.type === 'focus'
})
    .keypress(e => {
        if(e.ctrlKey && !e.altKey && !e.shiftKey && e.key === 'l') {
            newEquation()
        }
    })
let onShowEditor = function($img) {
    $mathToolbar.show()
    $img.hide()
        .after($math)
    const latex = $img.prop('alt')
    $latexEditor.val(latex)
    onLatexUpdate()
    editorVisible = true
    setTimeout(() => mathField.focus(), 0)
}
$answer.on('mousedown', '.result', e => {
    if(editorVisible) onClose()
    onShowEditor($(e.target))
})

let onClose = function() {
    const $img = $math.prev()
    if($latexEditor.val().trim() === '') {
        $img.remove()
    } else {
        $img.show()
            .prop('src', '/math.svg?latex=' + encodeURIComponent($latexEditor.val()))
            .prop('alt', $latexEditor.val())
    }
    $('.outerPlaceholder').html($math)
    $mathToolbar.hide()
    editorVisible = false
    mathField.blur()
    latexEditorFocus = false
    $answer.get(0).focus()
}
$('.math .close').mousedown(e => {
    e.preventDefault()
    onClose()
})
const mathField = MQ.MathField($equationEditor.get(0), {
    spaceBehavesLikeTab: true,
    handlers:            {
        edit: () => !latexEditorFocus && $latexEditor.val(mathField.latex())
    }
})
$math.find('textarea').keypress(e => {
    if(e.ctrlKey && !e.altKey && !e.shiftKey && e.keyCode === 13) {
        onClose()
    }
})
function onLatexUpdate() { setTimeout(() => mathField.latex($latexEditor.val()), 1) }

$latexEditor
    .keyup(onLatexUpdate)
    .on('focus blur', e => latexEditorFocus = e.type === 'focus')

$answer.get(0).focus()

function initMathToolbar() {
    $mathToolbar.append(latexCommands.map(o => {
        const $button = $(`<button id="${o.action}" title="${o.action}">${o.label ? o.label.replace(/X/g, '\\square') : o.action}</button>`)
        MQ.StaticMath($button.get(0))
        return $button
    }))
    $mathToolbar.on('mousedown', 'button', e => {
        e.preventDefault()
        const symbol = e.currentTarget.id
        if(latexEditorFocus) {
            insertToTextAreaAtCursor(symbol)
        } else {
            mathField.typedText(symbol)
            if(symbol.startsWith('\\')) mathField.keystroke('Tab')
            setTimeout(() => mathField.focus(), 0)
        }
    })
    $mathToolbar.hide()
}

function initSpecialCharacterSelector() {
    $('.toolbar .characters').find('.list')
        .append(specialCharacters.map(char => $(`<span class="button">${char}</span>`)))
        .on('mousedown', '.button', e => {
            e.preventDefault()
            const innerText = e.currentTarget.innerText
            if($equationEditor.hasClass('mq-focused')) {
                mathField.typedText(innerText)
            } else if(latexEditorFocus) {
                insertToTextAreaAtCursor(innerText)
            } else {
                window.document.execCommand('insertText', false, innerText);
            }
        })
    $('.toggle').mousedown(e => {
        $(e.target.parentNode).toggleClass('expanded')
        e.preventDefault()
        return false
    })
}

function insertToTextAreaAtCursor(value) {
    const field = $latexEditor.get(0)
    const startPos = field.selectionStart
    const endPos = field.selectionEnd
    let oldValue = field.value
    field.value = oldValue.substring(0, startPos) + value + oldValue.substring(endPos, oldValue.length)
    field.selectionStart = field.selectionEnd = startPos + value.length
    onLatexUpdate()
}
