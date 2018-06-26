(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

/* global makeRichText */
var updateMath = require('./updateMath');
updateMath.init();
var answer = document.getElementById('answer1');
makeRichText(answer, {
    screenshot: {
        saver: function saver(_ref) {
            var data = _ref.data;
            return new Promise(function (resolve) {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    return resolve(evt.target.result);
                };
                reader.readAsDataURL(data);
            });
        },
        limit: 10
    },
    baseUrl: '',
    updateMathImg: function updateMathImg($img, latex) {
        updateMath.updateMath(latex, function (svg) {
            $img.prop({
                src: svg,
                alt: latex
            });
            $img.closest('[data-js="answer"]').trigger('input');
        });
    }
});
answer.focus();

$(answer).on('keypress', function (e) {
    if (e.ctrlKey && !e.altKey && !e.shiftKey && e.key === 's') {
        e.preventDefault();
        copyLatexToClipboard();
    }
});
$('.toggleInstructions').click(function (e) {
    e.preventDefault();
    $('.instructions').toggleClass('hide');
});

function copyLatexToClipboard() {
    var latex = $('[data-js="latexField"]').val();
    var escapedLatex = '\\\\(' + latex.replace(/\\/g, '\\\\') + '\\\\)';
    $('#clipboardContent').removeAttr('disabled').val(escapedLatex).select();
    document.execCommand('copy');
    $('#clipboardContent').attr('disabled', true);
}

$('#copy').on('click', function (e) {
    e.preventDefault();
    copyLatexToClipboard();
});

},{"./updateMath":2}],2:[function(require,module,exports){
'use strict';

/* global MathJax */
var math = null;
var $result = void 0;
var init = function init() {
    $result = $('<div class="result">\\({}\\)</div>');
    $('body').append($result);
    MathJax.Hub.Config({
        jax: ['input/TeX', 'output/SVG'],
        extensions: ['toMathML.js', 'tex2jax.js', 'MathMenu.js', 'MathZoom.js', 'fast-preview.js', 'AssistiveMML.js', 'a11y/accessibility-menu.js'],
        TeX: {
            extensions: ['AMSmath.js', 'AMSsymbols.js', 'noErrors.js', 'noUndefined.js']
        },
        SVG: { useFontCache: true, useGlobalCache: false, EqnChunk: 1000000, EqnDelay: 0 }
    });
    MathJax.Hub.queue.Push(function () {
        math = MathJax.Hub.getAllJax('MathOutput')[0];
    });
    MathJax.Hub.Queue(function () {
        MathJax.Hub.getAllJax(document.querySelector('.result'));
    });
};

var asBase64Svg = function asBase64Svg(xml) {
    return 'data:image/svg+xml;base64,' + window.btoa(xml);
};

var updateMath = function updateMath(latex, cb) {
    MathJax.Hub.queue.Push(['Text', math, '\\displaystyle{' + latex + '}']);
    MathJax.Hub.Queue(function () {
        var $svg = $result.find('svg');
        if ($svg.length) {
            $svg.attr('xmlns', 'http://www.w3.org/2000/svg').find('use').each(function () {
                var $use = $(this);
                if ($use[0].outerHTML.indexOf('xmlns:xlink') === -1) {
                    $use.attr('xmlns:xlink', 'http://www.w3.org/1999/xlink'); //add these for safari
                }
            });
            var svgHtml = $svg.prop('outerHTML');
            svgHtml = svgHtml.replace(' xlink=', ' xmlns:xlink='); //firefox fix
            svgHtml = svgHtml.replace(/ ns\d+:href/gi, ' xlink:href'); // Safari xlink ns issue fix
            cb(asBase64Svg(svgHtml));
        } else {
            cb(asBase64Svg('<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<svg width="17px" height="15px" viewBox="0 0 17 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g transform="translate(-241.000000, -219.000000)">\n            <g transform="translate(209.000000, 207.000000)">\n                <rect x="-1.58632797e-14" y="0" width="80" height="40"></rect>\n                <g transform="translate(32.000000, 12.000000)">\n                    <polygon id="Combined-Shape" fill="#9B0000" fill-rule="nonzero" points="0 15 8.04006 0 16.08012 15"></polygon>\n                    <polygon id="Combined-Shape-path" fill="#FFFFFF" points="7 11 9 11 9 13 7 13"></polygon>\n                    <polygon id="Combined-Shape-path" fill="#FFFFFF" points="7 5 9 5 9 10 7 10"></polygon>\n                </g>\n            </g>\n        </g>\n    </g>\n</svg>'));
        }
    });
};

module.exports = { init: init, updateMath: updateMath };

},{}]},{},[1]);
