const equationEditor = document.querySelector('.equationEditor')
const latexEditor = document.querySelector('.latexEditor')
const MQ = MathQuill.getInterface(2)

$('.newEquation').mousedown(e => {
    e.preventDefault()
    if(!hasAnswerFocus())
        return
    pasteHtmlAtCaret('<img class="result"/><div class="equationPlaceholder">lol</div> ')
    newEquation($('.equationPlaceholder'))
})

function newEquation(placeholder) {
    const img = placeholder.prev()
    img.hide()
    $('.mathToolbar').show()
    placeholder.replaceWith($('.math'))
    mathField.latex('')
    setTimeout(() => mathField.focus(), 0)
}
initToolbar()
$('.mathToolbar').hide()
$('.answer').on('mousedown', '.result', e => {
    const img = $(e.target)
    img.hide()
	$('.mathToolbar').show()
    img.after($('.math'))
    const latex = img.prop('alt')
	mathField.reflow()
    mathField.latex(latex)
	setTimeout(() => mathField.focus(), 0)
})

$('.math .close').mousedown(e => {
	e.preventDefault()
    let math = $(e.target).parents('.math')
    const img = math.prev()
    if(latexEditor.value.trim() === '') {
	    img.remove()
    } else {
        img.show()
        img.prop('src', '/math.svg?latex=' +  encodeURIComponent(latexEditor.value))
        img.prop('alt', latexEditor.value)
    }
    $('.outerPlaceholder').html(math)
    $('.mathToolbar').hide()
})
const mathField = MQ.MathField(equationEditor, {
	spaceBehavesLikeTab: true,
	handlers:            {
		edit: () => latexEditor.value = mathField.latex()
	}
});
latexEditor.addEventListener('keyup', () => {
	setTimeout(() => mathField.latex(latexEditor.value), 0)
})

$('.answer').get(0).focus()

function initToolbar() {
	const actions = [
		{action: '\\sqrt', label: '\\sqrt{\\square}'},
		{action: '^', label: '\\square^{\\square}'},
		{action: '\\frac', label: '\\frac{\\square}{\\square}'},
		{action: '\\int', label: '\\int_{\\square}^{\\square}'},
		{action: '\\neq', label: '\\neq'},
		{action: '\\lim_', label: '\\lim_{\\square}'},
		{action: '\\to', label: '\\to'},
		{action: '\\overrightarrow', label: '\\overrightarrow{\\square}'}
	]

	const tags = [
		{action: '<sub>x</sub>', label: 'X<sub>alaindeksi</sub>'},
		{action: '<sup>x</sup>', label: 'X<sup>yläindeksi</sup>'},
		{action: '<i>italic</i>', label: '<i>Kursiivi</i>'}
	]
	$('.tags .list').append(tags.map(o => $(`<button id="${o.action}">${o.label}</button>`)))
	$('.mathToolbar').append(actions.map(o => $(`<button id="${o.action}" title="${o.label}">${o.label}</button>`)))
	const buttons = $('.mathToolbar button')
	buttons.mousedown(e => {
		e.preventDefault()
		const symbol = e.currentTarget.id
		mathField.typedText(symbol)
		if(symbol.startsWith('\\')) mathField.keystroke('Tab')
		setTimeout(() => mathField.focus(), 0)
	})
	buttons.map((i, elem) => MQ.StaticMath(elem))
}
const chars = [
	'°', '≡',
	'⌐', '×', '«', '»', '…', '∫', '¬', '√', 'ƒ', '≈', '‹', '›', '∙', '‰', '¹', '²', '³', '½', '¼', '¾', '←', '↑', '→', '↓', '↔', '↕', '↨', '≠', 'Ø', '∞', '±', '≤', '≥', 'µ', '∂', '∑', '∏', 'Ω', 'Δ', 'ı', 'Ð',
	'ð', 'Þ', 'þ', 'Γ', 'Θ', 'Φ', 'α', 'δ', 'ε', 'σ', 'τ', 'φ', '∩', 'Ω', 'ω', 'Д', 'Ф'
]

const $characters = $('.toolbar .characters')

$characters.find('.list').append(chars.map(char => $(`<span class="button">${char}</span>`)))
$('.toolbar .button').mousedown(e => {
	const innerText = e.currentTarget.innerText
	if($('.equationEditor').hasClass('mq-focused')) {
		mathField.typedText(innerText)
	} else {
		pasteHtmlAtCaret(innerText)
	}
	e.preventDefault()
	return false
})

$('.tags button').mousedown(e => {
	pasteHtmlAtCaret(e.currentTarget.id)
	e.preventDefault()
	return false
})
$('.toggle').mousedown(e => {
	$(e.target.parentNode).find('.list').toggle()
	e.preventDefault()
	return false
})

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
