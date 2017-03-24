const latexCommands = require('./latexCommands')
const specialCharacters = require('./specialCharacters')
const MQ = MathQuill.getInterface(2)
const $equationEditor = $('.equationEditor')
const $latexEditor = $('.latexEditor')
const $answer = $('.answer')
const $mathToolbar = $('.mathToolbar')
const $math = $('.math')
initMathToolbar()
initSpecialCharacterSelector()

$('.newEquation').mousedown(e => {
    e.preventDefault()
    if(!hasAnswerFocus())
        return
    pasteHtmlAtCaret('<img class="result"/><div class="equationPlaceholder"></div> ')
    newEquation($('.equationPlaceholder'))
})

function newEquation($placeholder) {
    const $img = $placeholder.prev()
    $img.hide()
    $mathToolbar.show()
    $placeholder.replaceWith($math)
    mathField.latex('')
    setTimeout(() => mathField.focus(), 0)
}
$answer.on('mousedown', '.result', e => {
    const $img = $(e.target)
    $img.hide()
    $mathToolbar.show()
    $img.after($math)
    const latex = $img.prop('alt')
    mathField.reflow()
    mathField.latex(latex)
    setTimeout(() => mathField.focus(), 0)
})

$('.math .close').mousedown(e => {
    e.preventDefault()
    const $img = $math.prev()
    if($latexEditor.val().trim() === '') {
        $img.remove()
    } else {
        $img.show()
        $img.prop('src', '/math.svg?latex=' + encodeURIComponent($latexEditor.val()))
        $img.prop('alt', $latexEditor.val())
    }
    $('.outerPlaceholder').html($math)
    $mathToolbar.hide()
})
const mathField = MQ.MathField($equationEditor.get(0), {
    spaceBehavesLikeTab: true,
    handlers:            {
        edit: () => $latexEditor.val(mathField.latex())
    }
});
$latexEditor.keyup(() => {
    setTimeout(() => mathField.latex($latexEditor.val()), 0)
})

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
        mathField.typedText(symbol)
        if(symbol.startsWith('\\')) mathField.keystroke('Tab')
        setTimeout(() => mathField.focus(), 0)
    })
    $mathToolbar.hide()
}

function initSpecialCharacterSelector() {
    const $characters = $('.toolbar .characters')
    $characters.find('.list').append(specialCharacters.map(char => $(`<span class="button">${char}</span>`)))
    $characters.on('mousedown', '.button', e => {
        e.preventDefault()
        const innerText = e.currentTarget.innerText
        if($equationEditor.hasClass('mq-focused')) {
            mathField.typedText(innerText)
        } else {
            pasteHtmlAtCaret(innerText)
        }
    })
    $('.toggle').mousedown(e => {
        $(e.target.parentNode).find('.list').toggle()
        e.preventDefault()
        return false
    })
}

function hasAnswerFocus(sel) {
    return (sel || window.getSelection()).anchorNode.parentElement.classList.contains('answer')
}

function pasteHtmlAtCaret(html) {
    let sel;
    let range;
    if(window.getSelection) {
        sel = window.getSelection()
        if(sel.getRangeAt && hasAnswerFocus(sel)) {
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
