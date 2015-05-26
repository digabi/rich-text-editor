'use strict';

$(document).ready(function() {
	var textBox = $('.mathquill-editable');
	// $(document).on('click', function () {
	// 	textBox.mathquill('write','\\frac{d}{dx}');
	// });
	$('.syntax-tab > div').on('click', function (event) {
		var syntax = ($(event.currentTarget).attr('id'));
		textBox.mathquill('write', syntax);
	});
});



// var textBox = document.querySelector('textarea');


// var outputBox = document.querySelector('#output');
// var input = textBox.value;

// textBox.addEventListener('input', function (event) {
// 	input = textBox.value;
// 	outputBox.textContent = '`' + input + '`';
// 	MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'output' ]);
// });



