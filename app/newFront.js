const equationEditor = document.querySelector('.equationEditor');
const latexEditor = document.querySelector('.latexEditor');
const resultNode = document.querySelector('.result')
const MQ = MathQuill.getInterface(2); // for backcompat

const mathButtons = initToolbar()

$(resultNode).click(e => {
	$('.math').addClass('focus')
	mathField.reflow()
	mathButtons.each((i, m) => m.reflow())
	mathField.focus()
})

let focus1 = false
let focus2 = false
function updateVisibility() {
	setTimeout(() => {
		$('.math').toggleClass('focus', focus1 || focus2)
		updateResult()
	}, 100)

}
$(equationEditor)
	.on('focusin focusout', e => {
		focus1 = e.type === 'focusin'
		updateVisibility()
	})
$(latexEditor).on('focus blur', e => {
	focus2 = e.type === 'focus'
	updateVisibility()
})

const mathField = MQ.MathField(equationEditor, {
	spaceBehavesLikeTab: true, // configurable
	handlers:            {
		edit: (e) => { // useful event handlers
			latexEditor.value = mathField.latex(); // simple API
		}
	}
});
latexEditor.addEventListener('keyup', () => {
	setTimeout(() => mathField.latex(latexEditor.value), 0)
})
mathField.latex(latexEditor.value)

mathField.focus()

let result = null
MathJax.Hub.Queue(() => result = MathJax.Hub.getAllJax(resultNode)[0])

function updateResult() {
	MathJax.Hub.Queue(() => result.Text(latexEditor.value))
}
updateResult()

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

	const toolbar = $('.toolbar').append(actions.map(o => $(`<button id="${o.action}">${o.label}</button>`)))
	const buttons = $('.toolbar button')
	buttons.click(e => {
		mathField.focus()
		const symbol = e.currentTarget.id
		mathField.typedText(symbol)
		if(symbol.startsWith('\\')) mathField.keystroke('Tab')
	})
	return buttons.map((i, elem) => MQ.StaticMath(elem))
}
