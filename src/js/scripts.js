'use strict';

$(document).ready(function() {
	var latexMath = $('#editable-math'),
		latexSource = $('#latex-source'),
		svgOutput = $('#svg-output');

	function latexMathToLatexSource () {
    	setTimeout(function() {
    		// latexSourceToSVG();
     		var latex = latexMath.mathquill('latex');
      		latexSource.val(latex);
		}, 0);
	}

	function latexSourceToLatexMath () {
		var oldtext = latexSource.val();
    	setTimeout(function() {
    		// latexSourceToSVG();
      		var newtext = latexSource.val();
      		if(newtext !== oldtext) {
        		latexMath.mathquill('latex', newtext);
      		}
    	}, 0);
	}

	$('.syntax-tab > div').on('click', function (event) {
		var syntax = ($(event.currentTarget).attr('id'));
		latexMath.mathquill('write', syntax);
		latexMathToLatexSource();
		render();

	});

  	latexMath.bind('keydown keypress', latexMathToLatexSource).keydown().focus();
	latexSource.bind('keydown keypress', latexSourceToLatexMath);

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

	var typingTimer = null;
	var doneTypingInterval = 500;
	function render () {
		clearTimeout(typingTimer);
		typingTimer = setTimeout(function () {
			updateMath(latexSource.val());
		}, doneTypingInterval);
	}

	$('#latex-source, #editable-math').on('keydown', render);

});
