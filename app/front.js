'use strict';

initTabs()

const visualMath = $('#editable-math')
const latexSource = $('#latex-source');
const doneTypingInterval = 500;
const container = $('.container');
const output = $('.output');
let typingTimer = null

const children = visualMath.find('.textarea').children()
latexSource.focus(onFocus)
children.focus(onFocus)
latexSource.blur(onBlur)
children.blur(onBlur)
output.click(onFocus)

function onFocus() { container.addClass('focus') }
function onBlur() { container.removeClass('focus') }

$('.syntax-tab > div').on('click', event => {
	const syntax = ($(event.currentTarget).attr('id'));
	visualMath.mathquill('write', syntax);
	visualToLatex();
	throttledEquationUpdate();
});

$('#latex-source, #editable-math').on('keydown', throttledEquationUpdate);

visualMath.bind('keydown keypress', visualToLatex).keydown().focus();
latexSource.bind('keydown keypress', latexToVisual);


function visualToLatex() {
	setTimeout(() => {
		const latex = visualMath.mathquill('latex');
		latexSource.val(latex);
	}, 0)
}

function latexToVisual() {
	const oldtext = latexSource.val();
	setTimeout(() => {
		const newtext = latexSource.val();
		if(newtext !== oldtext) {
			visualMath.mathquill('latex', newtext);
		}
	}, 0)
}

function throttledEquationUpdate() {
	clearTimeout(typingTimer);
	typingTimer = setTimeout(() => {
		equationUpdate(latexSource.val());
	}, doneTypingInterval)
}

const equationUpdate = (() => {
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

function initTabs() {
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
}
