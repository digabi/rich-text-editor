const equationEditor = document.querySelector('.equationEditor');
const latexEditor = document.querySelector('.latexEditor');

const MQ = MathQuill.getInterface(2); // for backcompat
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

const buttons = $('.toolbar button')
buttons.each((i, elem) => MQ.StaticMath(elem))
buttons.click(e => {
	mathField.focus()
	const symbol = e.currentTarget.id
	mathField.typedText(symbol)
	if(symbol.startsWith('\\')) mathField.keystroke('Tab')
})
mathField.focus()
