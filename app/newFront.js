const equationEditor = document.querySelector('.equationEditor');
const latexEditor = document.querySelector('.latexEditor');
const resultNode = document.querySelector('.result')
const buttons = $('.toolbar button')
const MQ = MathQuill.getInterface(2); // for backcompat
const mathButtons = buttons.map((i, elem) => MQ.StaticMath(elem))

$(resultNode).click(e => {
	$('.math').addClass('focus')
	mathField.reflow()
	mathButtons.each((i, m) => m.reflow())
	mathField.focus()
})

let focus1 = false
let focus2 = false
function updateVisibility() {
	setTimeout(() => $('.math').toggleClass('focus', focus1 || focus2), 100)
}
$(equationEditor)
	.on('focusin focusout', e  => {
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
	updateResult()
})
mathField.latex(latexEditor.value)

buttons.click(e => {
	mathField.focus()
	const symbol = e.currentTarget.id
	mathField.typedText(symbol)
	if(symbol.startsWith('\\')) mathField.keystroke('Tab')
})
mathField.focus()

let result = null
MathJax.Hub.Queue(() => result = MathJax.Hub.getAllJax(resultNode)[0])

function updateResult() {
	MathJax.Hub.Queue(() => result.Text(latexEditor.value))
}
updateResult()

