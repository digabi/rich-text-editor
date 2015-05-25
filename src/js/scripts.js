'use strict';

var textBox = document.querySelector('textarea');


var outputBox = document.querySelector('#output');
var input = textBox.value;

textBox.addEventListener('input', function (event) {
	input = textBox.value;
	outputBox.textContent = '`' + input + '`';
	MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'output' ]);
});

