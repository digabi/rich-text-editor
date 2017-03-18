
const equationEditor = document.querySelector('.equationEditor');
const latexEditor = document.querySelector('.latexEditor');

const MQ = MathQuill.getInterface(2); // for backcompat
const mathField = MQ.MathField(equationEditor, {
	spaceBehavesLikeTab: true, // configurable
	handlers: {
		edit: (e) => { // useful event handlers
			latexEditor.value = mathField.latex(); // simple API
		}
	}
});
latexEditor.addEventListener('keyup', () => {
	setTimeout(() => mathField.latex(latexEditor.value), 0)
})

const button = document.querySelector('.button')
MQ.StaticMath(button)
button.addEventListener('click', e => {
	mathField.focus()
	mathField.typedText(e.target.id)
	mathField.keystroke('Tab')
})
mathField.focus()
