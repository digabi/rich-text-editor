const latexCommands = require('./latexCommands')
const specialCharacters = require('./specialCharacters')
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
    pasteHtmlAtCaret('<img class="result"/><div class="equationPlaceholder"></div>')
    newEquation($('.equationPlaceholder'))
})

function newEquation($placeholder) {
    $placeholder.prev().hide()
    $mathToolbar.show()
    $placeholder.replaceWith($math)
    mathField.latex('')
    editorVisible = true
    setTimeout(() => mathField.focus(), 0)
}
$answer.on('focus blur', e => {
    if(editorVisible && e.type === 'focus') onClose()
    answerFocus = e.type === 'focus'
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

function onLatexUpdate() { setTimeout(() => mathField.latex($latexEditor.val()), 0) }

$latexEditor
    .keyup(onLatexUpdate)
    .on('focus blur', e => latexEditorFocus = e.type === 'focus')

$answer.get(0).focus()

function initMathToolbar() {
    $mathToolbar.append(latexCommands.map(o => {
        const $button = $(`<button id="${o.action}" title="${o.label}">${o.label}</button>`)
        MQ.StaticMath($button.get(0))
        return $button
    }))
    $mathToolbar.on('mousedown', 'button', e => {
        e.preventDefault()
        const symbol = e.currentTarget.id
        if(latexEditorFocus) {
            insertAtCursor(symbol)
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
            } else {
                pasteHtmlAtCaret(innerText)
            }
        })
    $('.toggle').mousedown(e => {
        $(e.target.parentNode).toggleClass('expanded')
        e.preventDefault()
        return false
    })
}

function pasteHtmlAtCaret(html) {
    let sel
    let range
    if(window.getSelection) {
        sel = window.getSelection()
        if(sel.getRangeAt && answerFocus) {
            range = sel.getRangeAt(0)
            range.deleteContents()
            const el = document.createElement("div")
            el.innerHTML = html
            let frag = document.createDocumentFragment(), node, lastNode
            while((node = el.firstChild)) {
                lastNode = frag.appendChild(node)
            }
            range.insertNode(frag)
            if(lastNode) {
                range = range.cloneRange()
                range.setStartAfter(lastNode)
                range.collapse(true)
                sel.removeAllRanges()
                sel.addRange(range)
            }
        }
    }
}

function insertAtCursor(value) {
    const myField = $latexEditor.get(0)
    if(myField.selectionStart || myField.selectionStart == '0') {
        const startPos = myField.selectionStart
        const endPos = myField.selectionEnd
        myField.value = myField.value.substring(0, startPos)
            + value
            + myField.value.substring(endPos, myField.value.length)
        myField.selectionStart = startPos + value.length; myField.selectionEnd = startPos + value.length
    } else {
        myField.value += value
    }
    onLatexUpdate()
}
