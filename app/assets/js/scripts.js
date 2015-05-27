'use strict';

$(document).ready(function() {
	var latexMath = $('#editable-math'),
		latexSource = $('#latex-source'),
		svgOutput = $('#svg-output'),
		typingTimer = null,
		doneTypingInterval = 500;

	function latexMathToLatexSource () {
    	setTimeout(function() {
     		var latex = latexMath.mathquill('latex');
      		latexSource.val(latex);
		}, 0);
	}

	function latexSourceToLatexMath () {
		var oldtext = latexSource.val();
    	setTimeout(function() {
      		var newtext = latexSource.val();
      		if(newtext !== oldtext) {
        		latexMath.mathquill('latex', newtext);
      		}
    	}, 0);
	}

	function render () {
		clearTimeout(typingTimer);
		typingTimer = setTimeout(function () {
			updateMath(latexSource.val());
		}, doneTypingInterval);
	}

	var updateMath = (function () {

		var queue = MathJax.Hub.queue,
		math = null,
		box = null,

		hideBox = function () {
			box.style.visibility = 'hidden';
		},
		showBox = function () {
			box.style.visibility = 'visible';
		};

		queue.Push(function () {
			math = MathJax.Hub.getAllJax('MathOutput')[0];
			box = document.getElementById('box');
			showBox();
		});

		return  function (latex) {
			queue.Push(hideBox, ['Text', math, '\\displaystyle{'+latex+'}'],
				showBox);
		};

	})();

	$('.syntax-tab > div').on('click', function (event) {
		var syntax = ($(event.currentTarget).attr('id'));
		latexMath.mathquill('write', syntax);
		latexMathToLatexSource();
		render();
	});

	$('#latex-source, #editable-math').on('keydown', render);

	latexMath.bind('keydown keypress', latexMathToLatexSource).keydown().focus();
	latexSource.bind('keydown keypress', latexSourceToLatexMath);

});
