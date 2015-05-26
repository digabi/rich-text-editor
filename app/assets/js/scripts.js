'use strict';

$(document).ready(function() {
	var latexMath = $('#editable-math'),
		latexSource = $('#latex-source');

	$('.syntax-tab > div').on('click', function (event) {
		var syntax = ($(event.currentTarget).attr('id'));
		latexMath.mathquill('write', syntax);
		latexMathToLatexSource();
	});

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

  	latexMath.bind('keydown keypress', latexMathToLatexSource).keydown().focus();

	latexSource.bind('keydown keypress', latexSourceToLatexMath);

});
