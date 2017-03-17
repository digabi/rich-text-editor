'use strict';

$(document).ready(function() {
	const tabs = $('.nav-tabs')
	const tabContent = $('.tab-content')
	tabs.find('a').click(e => {
		tabs.find('.active').removeClass('active')
		$(e.target).addClass('active')
		tabContent.find('.active').removeClass('active')
		tabContent.find(e.target.getAttribute('href')).addClass('active')
		e.preventDefault()
		return false
	})
	var latexMath = $('#editable-math'),
		latexSource = $('#latex-source'),
		svgOutput = $('#svg-output'),
		typingTimer = null,
		doneTypingInterval = 500,
		container = $('.container'),
		output = $('.output')

	latexSource.focus(onFocus)
	var children = latexMath.find('.textarea').children()
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
		setTimeout(function() {
			var latex = latexMath.mathquill('latex');
			latexSource.val(latex);
		}, 0);
	}

	function latexSourceToLatexMath() {
		var oldtext = latexSource.val();
		setTimeout(function() {
			var newtext = latexSource.val();
			if(newtext !== oldtext) {
				latexMath.mathquill('latex', newtext);
			}
		}, 0);
	}

	function render() {
		clearTimeout(typingTimer);
		typingTimer = setTimeout(function() {
			updateMath(latexSource.val());
		}, doneTypingInterval);
	}

	var updateMath = (function() {

		var queue = MathJax.Hub.queue,
			math = null,
			box = null,

			hideBox = function() {
				box.style.visibility = 'hidden';
			},
			showBox = function() {
				box.style.visibility = 'visible';
			};

		queue.Push(function() {
			math = MathJax.Hub.getAllJax('MathOutput')[0];
			box = document.getElementById('box');
			showBox();
		});

		return function(latex) {
			queue.Push(hideBox, ['Text', math, '\\displaystyle{' + latex + '}'],
				showBox);
		};

	})();

	$('.syntax-tab > div').on('click', function(event) {
		var syntax = ($(event.currentTarget).attr('id'));
		latexMath.mathquill('write', syntax);
		latexMathToLatexSource();
		render();
	});

	$('#latex-source, #editable-math').on('keydown', render);

	latexMath.bind('keydown keypress', latexMathToLatexSource).keydown().focus();
	latexSource.bind('keydown keypress', latexSourceToLatexMath);

});
