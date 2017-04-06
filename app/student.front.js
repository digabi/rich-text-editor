const latexCommands = require('./latexCommands')
const specialCharacters = require('./specialCharacters')
const sanitizeHtml = require('sanitize-html')
const sanitizeOpts = require('./sanitizeOpts')
const util = require('./util')
const MQ = MathQuill.getInterface(2)
const $equationEditor = $('.equationEditor')
const $latexEditor = $('.latexEditor')
const $answer = $('.answer')
const $mathToolbar = $('.mathToolbar')
const $math = $('.math')
let answerFocus = true
let latexEditorFocus = false
let editorVisible = false
const keyCodes = {
    ENTER: 13,
    ESC: 27
}
initMathToolbar()
initSpecialCharacterSelector()

$('.newEquation').mousedown(e => {
    e.preventDefault()
    if (!answerFocus) return
    newEquation()
})

$('.save').click(() => $.post('/save', {text: $answer.html()}))

$.get('/load', data => data && $answer.html(data.html))

$answer.on('paste', e => {
    if(e.target.tagName === 'TEXTAREA')
        return
    const reader = new FileReader()
    const clipboardData = e.originalEvent.clipboardData
    const file = clipboardData.items && clipboardData.items[0].getAsFile()
    if (file) {
        e.preventDefault()
        reader.readAsDataURL(file)
    } else {
        const clipboardDataAsHtml = clipboardData.getData('text/html')
        if (clipboardDataAsHtml) {
            e.preventDefault()
            window.document.execCommand('insertHTML', false, sanitizeHtml(clipboardDataAsHtml, sanitizeOpts));
        }
    }

    reader.onload = evt => {
        const img = `<img src="${evt.target.result}"/>`
        console.log('img', img)
        window.document.execCommand('insertHTML', false, sanitizeHtml(img, sanitizeOpts))
    }
})
function newEquation(optionalMarkup) {
    window.document.execCommand('insertHTML', false, (optionalMarkup ? optionalMarkup : '') + '<img class="result new" style="display: none"/>');
    $('.result.new').removeClass('new').after($math)
    mathField.latex('')
    editorVisible = true
    $mathToolbar.show()
    setTimeout(() => mathField.focus(), 0)
}
$answer.on('focus blur', e => {
    if (editorVisible && e.type === 'focus') onClose()
    answerFocus = e.type === 'focus'
})
    .keypress(e => {
        if (e.ctrlKey && !e.altKey && !e.shiftKey) {
            if(e.key === 'l' || e.key === 'i') newEquation()
            else if(e.key === 's') save($answer)
        }
    })
function onShowEditor($img) {
    $mathToolbar.show()
    $img.hide().after($math)
    const latex = $img.prop('alt')
    $latexEditor.val(latex)
    onLatexUpdate()
    editorVisible = true
    setTimeout(() => mathField.focus(), 0)
}
$answer.on('mousedown', '.result', e => {
    if (editorVisible) onClose()
    onShowEditor($(e.target))
})

function onClose() {
    const $img = $math.prev()
    if ($latexEditor.val().trim() === '') {
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
$math.find('.close').mousedown(e => {
    e.preventDefault()
    onClose()
})
const mathField = MQ.MathField($equationEditor.get(0), {
    handlers: {
        edit: () => !latexEditorFocus && $latexEditor.val(mathField.latex()),
        enter: field => {
            onClose()
            setTimeout(() => newEquation('<div></div>'), 2)
        }
    }
})
$math.find('textarea').keydown(e => {
    if (!e.altKey && !e.shiftKey &&
        ((e.ctrlKey && e.keyCode === keyCodes.ENTER) ||
        (!e.ctrlKey && e.keyCode === keyCodes.ESC ))) onClose()
})
function onLatexUpdate() {
    setTimeout(() => mathField.latex($latexEditor.val()), 1)
}

$latexEditor
    .keyup(onLatexUpdate)
    .on('focus blur', e => latexEditorFocus = e.type === 'focus')

$answer.get(0).focus()

function initMathToolbar() {
    $mathToolbar.append(latexCommands
        .map(o => `<button title="${o.action}" data-command="${o.action}" data-latexcommand="${o.label}" data-usewrite="${o.useWrite || false}">
<img src="/math.svg?latex=${encodeURIComponent(o.label ? o.label.replace(/X/g, '\\square') : o.action)}"/>
</button>`)
        .join('')
    ).on('mousedown', 'button', e => {
        e.preventDefault()
        const dataset = e.currentTarget.dataset;
        insertMath(dataset.command, dataset.latexcommand, dataset.usewrite === 'true')
    })
    $mathToolbar.hide()
}

function initSpecialCharacterSelector() {
    $('.toolbar .characters').find('.list')
        .append(specialCharacters.map(char => $(`<span class="button" ${char.latexCommand ? `data-command="${char.latexCommand}"` : ''}>${char.character}</span>`)))
        .on('mousedown', '.button', e => {
            e.preventDefault()
            const character = e.currentTarget.innerText
            const command = e.currentTarget.dataset.command
            if (answerFocus) window.document.execCommand('insertText', false, character)
            else insertMath(command || character)
        })
}

function insertMath(symbol, alternativeSymbol, useWrite) {
    if (latexEditorFocus) {
        util.insertToTextAreaAtCursor($latexEditor.get(0), alternativeSymbol || symbol)
        onLatexUpdate()
    } else if ($equationEditor.hasClass('mq-focused')) {
        if (useWrite) {
            mathField.write(symbol)
        } else {
            mathField.typedText(symbol)
        }
        if (symbol.startsWith('\\')) mathField.keystroke('Tab')
        setTimeout(() => mathField.focus(), 0)
    }
}

const save = ($answer, async = true) => {
    $.post({
        url: '/save',
        data: {text: $answer.html()},
        async
    })
}
