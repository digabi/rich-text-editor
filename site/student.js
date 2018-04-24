(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* global ga, makeRichText */
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
    metric1: 0, //typeLatex
    metric2: 0, //typeMathquill
    metric3: 0, //clickChar
    metric4: 0 //clickLatex
};
var hasEvents = false;
$tools.on('mousedown', '[data-js="expandCollapseCharacters"]', function () {
    ga('send', 'event', 'toolbar', 'toggle', $tools.hasClass('rich-text-editor-characters-expanded') ? 'expand' : 'collapse');
});
$('[data-js="mathToolbar"]').on('mousedown', 'button', function (e) {
    events.metric4++;
    hasEvents = true;
    ga('send', 'event', 'toolbar', 'latex', e.currentTarget.dataset.latexcommand);
});
$('[data-js="charactersList"]').on('mousedown', 'button', function (e) {
    events.metric3++;
    hasEvents = true;
    ga('send', 'event', 'toolbar', 'character', e.currentTarget.innerText);
});
$('[data-js="latexField"]').on('input paste', function () {
    events.metric1++;
    hasEvents = true;
});
$('[data-js="equationField"]').on('input', '.mq-textarea textarea', function () {
    events.metric2++;
    hasEvents = true;
});
$('[data-js="newEquation"]').on('mousedown', function () {
    return ga('send', 'event', 'mathEditor', 'open', 'button');
});
$(answer).on('mathfocus', function (e) {
    if (!e.hasFocus && hasEvents) {
        events.dimension1 = $('[data-js="latexField"]').val();
        ga('send', 'event', 'mathEditor', 'close', events);
        hasEvents = false;
        events.metric1 = 0;
        events.metric2 = 0;
        events.metric3 = 0;
        events.metric4 = 0;
    }
}).on('keyup', function (e) {
    if (!e.altKey && !e.shiftKey && e.ctrlKey && e.keyCode === 69) {
        ga('send', 'event', 'mathEditor', 'open', 'shortcut');
    }
});

},{}]},{},[1]);
