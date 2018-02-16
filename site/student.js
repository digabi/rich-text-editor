(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

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
    baseUrl: ''
});
answer.focus();

var trackError = function trackError() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var category = 'JavaScript error';
    var action = e.message;
    var label = e.filename + ':' + e.lineno;
    ga('send', 'event', category, action, label);
};

if (window.addEventListener) {
    window.addEventListener('error', trackError, false);
} else if (window.attachEvent) {
    window.attachEvent('onerror', trackError);
} else {
    window.onerror = trackError;
}
var $tools = $('[data-js="tools"]');
var events = {
    typeLatex: 0,
    typeMathquill: 0,
    clickChar: 0,
    clickLatex: 0
};
var hasEvents = false;
$tools.on('mousedown', '[data-js="expandCollapseCharacters"]', function () {
    ga('send', 'event', 'toolbar', 'toggle', $tools.hasClass('rich-text-editor-characters-expanded') ? 'expand' : 'collapse');
});
$('[data-js="mathToolbar"]').on('mousedown', 'button', function (e) {
    events.clickLatex++;
    hasEvents = true;
    ga('send', 'event', 'toolbar', 'latex', e.currentTarget.dataset.latexcommand);
});
$('[data-js="charactersList"]').on('mousedown', 'button', function (e) {
    events.clickChar++;
    hasEvents = true;
    ga('send', 'event', 'toolbar', 'character', e.currentTarget.innerText);
});
$('[data-js="latexField"]').on('input paste', function () {
    events.typeLatex++;
    hasEvents = true;
});
$('[data-js="equationField"]').on('input', '.mq-textarea textarea', function () {
    events.typeMathquill++;
    hasEvents = true;
});
$(answer).on('mathfocus', function (e) {
    if (!e.hasFocus && hasEvents) {
        hasEvents = false;
        ga('send', 'event', 'completeMath', $('[data-js="latexField"]').val(), {
            metric1: events.typeLatex,
            metric2: events.typeMathquill,
            metric3: events.clickChar,
            metric4: events.clickLatex
        });
        events.typeLatex = 0;
        events.typeMathquill = 0;
        events.clickChar = 0;
        events.clickLatex = 0;
    }
});

},{}]},{},[1]);
