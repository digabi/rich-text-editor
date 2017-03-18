'use strict';

const tabs = $('.nav-tabs')
const tabContent = $('.tab-content')
tabs.find('a').click(e => {
	tabs.find('.active').removeClass('active')
	e.target.parentNode.classList.add('active')
	tabContent.find('.active').removeClass('active')
	tabContent.find(e.target.getAttribute('href')).addClass('active')
	e.preventDefault()
	return false
})
const latexMath = $('#editable-math')
const latexSource = $('#latex-source');
const doneTypingInterval = 500;
const container = $('.container');
const output = $('.output');
let typingTimer = null

latexSource.focus(onFocus)
const children = latexMath.find('.textarea').children()
children.focus(onFocus)
latexSource.blur(onBlur)
children.blur(onBlur)

output.click(onFocus)
function onFocus() {
	container.addClass('focus')
}

function onBlur() {
	container.removeClass('focus')
}

function latexMathToLatexSource() {
	setTimeout(() => {
		const latex = latexMath.mathquill('latex');
		latexSource.val(latex);
	}, 0)
}

function latexSourceToLatexMath() {
	const oldtext = latexSource.val();
	setTimeout(() => {
		const newtext = latexSource.val();
		if(newtext !== oldtext) {
			latexMath.mathquill('latex', newtext);
		}
	}, 0)
}

function render() {
	clearTimeout(typingTimer);
	typingTimer = setTimeout(() => {
		updateMath(latexSource.val());
	}, doneTypingInterval)
}

const updateMath = (() =>{

	const queue = MathJax.Hub.queue
	let math = null
	let box = null

	const hideBox = () => {
		box.style.visibility = 'hidden';
	}
	const showBox = () => {
		box.style.visibility = 'visible';
	};

	queue.Push(() => {
		math = MathJax.Hub.getAllJax('MathOutput')[0];
		box = document.getElementById('box');
		showBox();
	});

	return latex => {
		queue.Push(hideBox, ['Text', math, '\\displaystyle{' + latex + '}'], showBox);
	};
})();

$('.syntax-tab > div').on('click', event => {
	const syntax = ($(event.currentTarget).attr('id'));
	latexMath.mathquill('write', syntax);
	latexMathToLatexSource();
	render();
});

$('#latex-source, #editable-math').on('keydown', render);

latexMath.bind('keydown keypress', latexMathToLatexSource).keydown().focus();
latexSource.bind('keydown keypress', latexSourceToLatexMath);

