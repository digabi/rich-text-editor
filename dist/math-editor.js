(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.I = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = {
    editor: {
        mathEditor: 'Matikkaeditori',
        title: 'Kaavaeditorin ensimmäinen kehitysversio',
        description: '<ul>\n<li>Editori toimii parhaiten Firefox-selaimella.</li>\n<li>\u201CLis\xE4\xE4 kaava\u201D -napin alta l\xF6yd\xE4t yleisimpi\xE4 matematiikassa, fysiikassa ja\nkemiassa k\xE4ytett\xE4vi\xE4 merkint\xF6j\xE4. Lis\xE4ksi erikoismerkkej\xE4 voi k\xE4ytt\xE4\xE4 kaavan kirjoittamiseen.</li>\n <li>Kaavoja voi rakentaa\nklikkaamalla valikon merkint\xF6j\xE4 ja/tai kirjoittamalla LaTeXia.</li>\n <li>Editorin vastauskentt\xE4\xE4n voi kirjoittaa teksti\xE4 ja kaavoja sek\xE4\nlis\xE4t\xE4 kuvia.</li></ul>',
        shortcutTitle: 'Pikan\xE4pp\xE4invinkkej\xE4',
        shortcuts: '<table><tbody>\n<tr><th>Liit\xE4 kuva leikep\xF6yd\xE4lt\xE4</th><td>Ctrl-V</td></tr>\n<tr><th>Kirjoita kaava</th><td>Ctrl-L tai Ctrl-I</td></tr>\n<tr><th colspan="2">Kaavassa</th></tr>\n<tr><th>Jakoviiva</th><td>/</td></tr>\n<tr><th>Kertomerkki</th><td>*</td></tr>\n<tr><th>Eksponentti</th><td>^</td></tr>\n<tr><th>Sulje kaava</th><td>Ctrl-Enter tai Esc</td></tr>\n<tr><th>Lis\xE4\xE4 kaava seuraavalle riville</th><td>Enter</td></tr>\n</tbody>\n</table>',
        formatting: 'Muotoilu',
        specialCharacters: 'Erikoismerkit',
        insertEquation: 'Lisää kaava',
        close: 'sulje',
        save: 'Tallenna',
        updated: 'Päivitetty',
        sendFeedback: 'Lähetä palautetta',
        langLink: '/sv',
        langLabel: 'På svenska'
    },
    annotating: {
        sendFeedback: 'Lähetä palautetta',
        updated: 'Päivitetty',
        mathEditor: 'Matikkaeditori',
        title: 'Tarkistus',
        backLink: '/',
        backLinkLabel: 'Palaa kaavaeditoriin',
        save: 'Tallenna merkinnät',
        langLink: '/sv/bedomning',
        langLabel: 'På svenska'
    }
};

},{}],2:[function(require,module,exports){
'use strict';

module.exports = {
    editor: {
        mathEditor: 'Matematikeditor',
        title: 'Formeleditorns första utvecklingsversion',
        description: '<ul>\n<li>Editorn fungerar b\xE4st med browsern Firefox.</li>\n <li>Under knappen \u201CL\xE4gg till formel\u201D hittar du de vanligaste beteckningarna som anv\xE4nds i matematik, fysik och kemi. Dessutom kan du anv\xE4nda specialtecken f\xF6r att skriva formler.</li>\n<li>Det g\xE5r att konstruera formler genom att klicka p\xE5 beteckningarna i menyerna och/eller genom att skriva LaTeX.</li>\n<li>Det g\xE5r f\xF6rutom att skriva text och formler, att ocks\xE5 att l\xE4gga till bilder i svarsf\xE4ltet.</li></ul>',
        shortcutTitle: 'Tips p\xE5 tangentkombinationer',
        shortcuts: '<table><tbody>\n<tr><th>L\xE4gg till en bild fr\xE5n klippbordet</th><td>Ctrl-V</td></tr>\n<tr><th>Skriv en formel</th><td>Ctrl-L / Ctrl-I</td></tr>\n<tr><th colspan="2"></th></tr>\n<tr><th>Br\xE5kstreck</th><td>/</td></tr>\n<tr><th>Multiplikationstecken</th><td>*</td></tr>\n<tr><th>St\xE4ng</th><td>Ctrl-Enter / Esc</td></tr>\n</tbody>\n</table>',
        formatting: 'Muotoilu',
        specialCharacters: 'Specialtecken',
        insertEquation: 'Lägg till formel',
        close: 'stäng',
        save: 'Spara',
        updated: 'Uppdaterad',
        sendFeedback: 'Skicka feedback',
        langLink: '/',
        langLabel: 'Suomeksi'
    },
    annotating: {
        sendFeedback: 'Skicka respons',
        updated: 'Uppdaterad',
        mathEditor: 'Matematikeditor',
        title: 'Kontroll',
        backLink: '/sv',
        backLinkLabel: 'Matematikeditor',
        save: 'Spara anteckningar',
        langLink: '/tarkistus',
        langLabel: 'Suomeksi'
    }
};

},{}],3:[function(require,module,exports){
'use strict';

module.exports = [{ action: '\\sqrt', label: '\\sqrt{X}' }, { action: '^', label: 'x^{X}' }, { action: '\\frac', label: '\\frac{X}{X}' }, { action: '\\int', label: '\\int_{X}^{X}' }, { action: '\\lim_', label: '\\lim_{X}' }, { action: '\\overrightarrow', label: '\\overrightarrow{X}' }, { action: '_', label: 'x_X' }, { action: '\\nthroot', label: '\\sqrt[X]{X}' }, { action: '\\sum', label: '\\sum_{X}^{X}' }, { action: '\\binom', label: '\\binom{X}{X}' }, { action: '\\sin' }, { action: '\\cos' }, { action: '\\tan' }, { action: '\\arcsin' }, { action: '\\arccos' }, { action: '\\arctan' }, { action: '\\vec', label: '\\vec{X}' }, { action: '\\bar', label: '\\bar{X}' }, { action: '\\underline', label: '\\underline{X}' }, { action: '\\overleftarrow', label: '\\overleftarrow{X}' }, { action: '|', label: '|X|' }, { action: '(', label: '(X)' }, { action: '_{ }^{ } ', label: '_{X}^{X}X', useWrite: true }];

},{}],4:[function(require,module,exports){
'use strict';

var util = require('./util');
var sanitizeHtml = require('sanitize-html');
var sanitizeOpts = require('./sanitizeOpts');
var toolbars = require('./toolbars');
var MQ = MathQuill.getInterface(2);
var locales = {
    FI: require('./FI'),
    SV: require('./SV')
};
var l = locales[window.locale || 'FI'].editor;
var keyCodes = {
    ENTER: 13,
    ESC: 27
};

var $toolbar = void 0;
var $outerPlaceholder = $('<div class="math-editor-hidden" data-js="outerPlaceholder">');
var mathEditor = void 0;

function moveElementAfter($element, $after) {
    $after.after($element);
}

function hideElementInDOM($element) {
    $outerPlaceholder.append($element);
}

var editor = void 0;

// TODO: replace with data attributes?
var answerFocus = true;
var latexEditorFocus = false;
var equationEditorFocus = false;
var mathEditorVisible = false;
var $editor = void 0;

$('body').append($outerPlaceholder);

mathEditor = initMathEditor();
$toolbar = toolbars.init(mathEditor, function () {
    return answerFocus;
}, l);
hideElementInDOM($toolbar);

function initMathEditor() {
    var $mathEditor = $('\n        <section class="math-editor" data-js="mathEditor">\n            <div class="math-editor-close" title="Ctrl-Enter">' + l.close + '</div>\n            <div class="math-editor-boxes">\n                <div class="math-editor-equation-editor" data-js="equationEditor"></div>\n                <textarea class="math-editor-latex-editor" data-js="latexEditor" placeholder="LaTex"></textarea>\n            </div>\n        </section>');

    hideElementInDOM($mathEditor);

    var $latexEditor = $mathEditor.find('[data-js="latexEditor"]');
    var $equationEditor = $mathEditor.find('[data-js="equationEditor"]');
    var mathField = MQ.MathField($equationEditor.get(0), {
        handlers: {
            edit: function edit() {
                return !latexEditorFocus && $latexEditor.val(mathField.latex());
            },
            enter: function enter(field) {
                // TODO: do not close editor / o not create a new equation if there is no text?
                mathEditor.closeMathEditor(true);
                setTimeout(function () {
                    return insertNewEquation('<div></div>');
                }, 2);
            }
        }
    });

    $equationEditor.on('focus mousedown', function (e) {
        return equationEditorFocus = true;
    }).on('focus blur', '.mq-textarea textarea', function (e) {
        equationEditorFocus = e.type !== 'blur';
        onFocusChanged();
    });

    function onLatexUpdate() {
        setTimeout(function () {
            return mathField.latex($latexEditor.val());
        }, 1);
    }

    $latexEditor.keyup(onLatexUpdate).on('focus blur', function (e) {
        latexEditorFocus = e.type !== 'blur';
        onFocusChanged();
    });

    $mathEditor.find('.close').mousedown(function (e) {
        e.preventDefault();
        closeMathEditor(true);
    });

    var focusChanged = null;

    function onFocusChanged() {
        clearTimeout(focusChanged);
        focusChanged = setTimeout(function () {
            if (!latexEditorFocus && !equationEditorFocus) closeMathEditor();
            if (!answerFocus && !mathEditorVisible && !latexEditorFocus && !equationEditorFocus) closeEditor();
        }, 0);
    }

    function insertNewEquation(optionalMarkup) {
        window.document.execCommand('insertHTML', false, (optionalMarkup ? optionalMarkup : '') + '<img data-js="new" style="display: none"/>');
        var $addedEquationImage = $('[data-js="new"]');
        $addedEquationImage.removeAttr('data-js');

        moveElementAfter($mathEditor, $addedEquationImage);

        mathField.latex('');
        mathEditorVisible = true;
        $toolbar.find('[data-js="newEquation"]').hide();
        $toolbar.find('[data-js="mathToolbar"]').show();
        setTimeout(function () {
            return mathField.focus();
        }, 0);
    }

    function insertMath(symbol, alternativeSymbol, useWrite) {
        if (latexEditorFocus) {
            util.insertToTextAreaAtCursor($latexEditor.get(0), alternativeSymbol || symbol);
            onLatexUpdate();
        } else if (equationEditorFocus) {
            if (useWrite) {
                mathField.write(symbol);
            } else {
                mathField.typedText(symbol);
            }

            if (symbol.startsWith('\\')) mathField.keystroke('Tab');
            setTimeout(function () {
                return mathField.focus();
            }, 0);
        }
    }

    function closeMathEditor() {
        var setFocusAfterClose = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        // TODO: remove event bindings
        var $currentEditor = $mathEditor.closest('[data-js="answer"]');
        var $img = $mathEditor.prev();
        if ($latexEditor.val().trim() === '') {
            $img.remove();
        } else {
            $img.show().prop('src', '/math.svg?latex=' + encodeURIComponent($latexEditor.val())).prop('alt', $latexEditor.val());
        }

        $toolbar.find('[data-js="newEquation"]').show();
        $toolbar.find('[data-js="mathToolbar"]').hide();
        hideElementInDOM($mathEditor);
        mathEditorVisible = false;
        latexEditorFocus = false;
        equationEditorFocus = false;
        if (setFocusAfterClose) $currentEditor.focus();
    }

    function openMathEditor($img) {
        if (mathEditorVisible) closeMathEditor();
        $img.hide();
        moveElementAfter($mathEditor, $img);
        var latex = $img.prop('alt');
        $latexEditor.val(latex);
        onLatexUpdate();
        mathEditorVisible = true;
        $toolbar.find('[data-js="newEquation"]').hide();
        $toolbar.find('[data-js="mathToolbar"]').show();
        setTimeout(function () {
            return mathField.focus();
        }, 0);
    }

    return {
        insertNewEquation: insertNewEquation,
        insertMath: insertMath,
        closeMathEditor: closeMathEditor,
        openMathEditor: openMathEditor,
        onFocusChanged: onFocusChanged
    };
}

function openEditor($element) {
    $editor = $element;
    $element.before($toolbar);
    $toolbar.show();
}

function closeEditor() {
    // TODO: remove event bindings
    $toolbar.find('[data-js="mathToolbar"]').hide();
    hideElementInDOM($toolbar);
    mathEditor.closeMathEditor();
    // $editor.off()

    answerFocus = false;
    mathEditorVisible = false;
    latexEditorFocus = false;
}

var blurred = void 0;

function onEditorFocusChanged(e) {
    answerFocus = e.type === 'focus';

    clearTimeout(blurred);
    blurred = setTimeout(function () {
        if (!answerFocus && !mathEditorVisible && !latexEditorFocus && !equationEditorFocus) closeEditor();else if (answerFocus && mathEditorVisible) mathEditor.closeMathEditor();else openEditor($(e.target));
    }, 0);
}

function isMathEditorVisible() {
    return mathEditorVisible;
}

editor = {
    openEditor: openEditor,
    closeEditor: closeEditor,
    onEditorFocusChanged: onEditorFocusChanged,
    isMathEditorVisible: isMathEditorVisible,
    openMathEditor: mathEditor.openMathEditor,
    closeMathEditor: mathEditor.closeMathEditor,
    insertNewEquation: mathEditor.insertNewEquation
};

var makeRichText = function makeRichText(element) {
    var onValueChanged = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

    var $answer = $(element);
    $answer.attr('contenteditable', 'true').attr('data-js', 'answer').addClass('math-editor-answer').on('keydown', function (e) {
        if (isCtrlKey(e, keyCodes.ENTER) || isKey(e, keyCodes.ESC)) mathEditor.closeMathEditor(true);
    }).on('mousedown', 'img[src^="/math.svg"]', function (e) {
        return editor.openMathEditor($(e.target));
    }) // TODO: open editor if clicked on equation in another editor
    .on('keypress', function (e) {
        if (isCtrlKey(e, 'l') || isCtrlKey(e, 'i')) editor.insertNewEquation();
    }).on('focus blur', function (e) {
        if (editor.isMathEditorVisible() && e.type === 'focus') editor.closeMathEditor();
        editor.onEditorFocusChanged(e);
    }).on('input focus', function (e) {
        return onValueChanged(sanitizeContent(e.currentTarget));
    }).on('paste', function (e) {
        if (e.target.tagName === 'TEXTAREA') return;
        var clipboardData = e.originalEvent.clipboardData;
        var file = clipboardData.items && clipboardData.items[0].getAsFile();
        if (file) {
            e.preventDefault();
            Bacon.fromPromise($.post({
                type: 'POST',
                url: '/saveImg?answerId=' + $editor.attr('id'),
                data: file,
                processData: false,
                contentType: false
            })).onValue(function (_ref) {
                var id = _ref.id;

                var src = '/loadImg?answerId=' + $editor.attr('id') + '&id=' + id;
                var img = '<img src="' + src + '"/>';
                window.document.execCommand('insertHTML', false, img);
            });
        } else {
            var clipboardDataAsHtml = clipboardData.getData('text/html');
            if (clipboardDataAsHtml) {
                e.preventDefault();
                window.document.execCommand('insertHTML', false, sanitizeHtml(clipboardDataAsHtml, sanitizeOpts));
            }
        }
    });
};

function sanitizeContent(answerElement) {
    $(answerElement).find('[data-js="mathEditor"]').hide();
    var text = $(answerElement)[0].innerText;
    $(answerElement).find('[data-js="mathEditor"]').show();
    var html = $(answerElement).html().replace(/<section[\s\S]*<\/section>/gi, '');

    return { answerHTML: sanitizeHtml(html, sanitizeOpts), answerText: text };
}

function isKey(e, key) {
    return preventIfTrue(e, !e.altKey && !e.shiftKey && !e.ctrlKey && keyOrKeyCode(e, key));
}

function isCtrlKey(e, key) {
    return preventIfTrue(e, !e.altKey && !e.shiftKey && e.ctrlKey && keyOrKeyCode(e, key));
}

function keyOrKeyCode(e, val) {
    return typeof val === 'string' ? e.key === val : e.keyCode === val;
}
function preventIfTrue(e, val) {
    if (val) e.preventDefault();
    return val;
}
module.exports = {
    makeRichText: makeRichText
};

},{"./FI":1,"./SV":2,"./sanitizeOpts":5,"./toolbars":7,"./util":8,"sanitize-html":undefined}],5:[function(require,module,exports){
'use strict';

module.exports = {
    allowedTags: ['div', 'img', 'br'],
    allowedAttributes: {
        img: ['src', 'alt']
    },
    allowedSchemes: []
};

},{}],6:[function(require,module,exports){
'use strict';

module.exports = [{ character: '°' }, { character: '≡', latexCommand: '\\equiv' }, { character: '≢' }, // \nequiv or \not\equiv
{ character: '⌐' }, // \backneg
{ character: '×', latexCommand: '\\times' }, { character: '÷', latexCommand: '\\div' }, { character: '·', latexCommand: '\\cdot' }, { character: '«' }, // \guillemotleft
{ character: '»' }, // \guillemotright
{ character: '…', latexCommand: '\\dots' }, { character: '¬', latexCommand: '\\neg' }, { character: '≅', latexCommand: '\\cong' }, { character: '≈', latexCommand: '\\approx' }, { character: '∼', latexCommand: '\\sim' }, { character: '‹' }, // \guilsinglleft
{ character: '›' }, // \guilsinglright
{ character: '‰' }, // \permil, \textpertenthousand or \textperthousand
{ character: '¹', latexCommand: '^1' }, { character: '²', latexCommand: '^2' }, { character: '³', latexCommand: '^3' }, { character: '½', latexCommand: '1/2' }, { character: '¼', latexCommand: '1/4' }, { character: '¾', latexCommand: '3/4' }, { character: '←', latexCommand: '\\leftarrow' }, { character: '↑', latexCommand: '\\uparrow' }, { character: '→', latexCommand: '\\rightarrow' }, { character: '↓', latexCommand: '\\downarrow' }, { character: '↔', latexCommand: '\\leftrightarrow' }, { character: '↕', latexCommand: '\\updownarrow' }, { character: '↨' }, // \vertical
{ character: '⇐', latexCommand: '\\Leftarrow' }, { character: '⇒', latexCommand: '\\Rightarrow' }, { character: '⇔', latexCommand: '\\Leftrightarrow' }, { character: '⇌' }, // \rightleftharpoons
{ character: '≠', latexCommand: '\\neq' }, { character: '∅', latexCommand: '\\empty' }, { character: '∞', latexCommand: '\\infty' }, { character: '±', latexCommand: '\\pm' }, { character: '∓', latexCommand: '\\mp' }, { character: '≤', latexCommand: '\\leq' }, { character: '≥', latexCommand: '\\geq' }, { character: 'µ', latexCommand: '\\mu' }, { character: '∂', latexCommand: '\\partial' }, { character: '∑', latexCommand: '\\Sigma' }, { character: '∏', latexCommand: '\\Pi' }, { character: 'Ω', latexCommand: '\\Omega' }, { character: 'Δ', latexCommand: '\\Delta' }, { character: '𝜄', latexCommand: '\\iota' }, { character: 'Ð' }, // \Eth
{ character: 'ð' }, // \eth
{ character: 'Þ' }, // \thorn
{ character: 'þ' }, // \Thorn
{ character: 'Γ', latexCommand: '\\Gamma' }, { character: 'Θ', latexCommand: '\\Theta' }, { character: 'Φ', latexCommand: '\\Phi' }, { character: 'α', latexCommand: '\\alpha' }, { character: 'δ', latexCommand: '\\delta' }, { character: 'ε', latexCommand: '\\varepsilon' }, { character: 'σ', latexCommand: '\\sigma' }, { character: 'τ', latexCommand: '\\tau' }, { character: 'Ω', latexCommand: '\\Omega' }, { character: 'ω', latexCommand: '\\omega' }, { character: 'Д' }, // \cyrd
{ character: 'π', latexCommand: '\\pi' }, { character: 'Ф', latexCommand: '\\phi' }, { character: '∈', latexCommand: '\\in' }, { character: '∉', latexCommand: '\\notin' }, { character: '∋', latexCommand: '\\ni' }, { character: '⊂', latexCommand: '\\subset' }, { character: '⊃', latexCommand: '\\supset' }, { character: '∩', latexCommand: '\\cap' }, { character: '∪', latexCommand: '\\cup' }, { character: '∖', latexCommand: '\\setminus' }, { character: '∠', latexCommand: '\\angle' }, { character: '∧', latexCommand: '\\and' }, { character: '∨', latexCommand: '\\or' }, { character: '∀', latexCommand: '\\forall' }, { character: '∃', latexCommand: '\\exists' }, { character: '∄', latexCommand: '\\nexists' }, { character: '△', latexCommand: '\\triangle' }, { character: '⊥', latexCommand: '\\perp' }, { character: '‖', latexCommand: '\\parallel' }, { character: '∘', latexCommand: '\\circ' }];

},{}],7:[function(require,module,exports){
'use strict';

var specialCharacters = require('./specialCharacters');
var latexCommands = require('./latexCommands');

module.exports = {
    init: init
};

function init(mathEditor, hasAnswerFocus, l) {
    var $toolbar = $('        \n        <div class="math-editor-tools" data-js="tools">\n            <div class="math-editor-characters" data-js="characters">\n                <span class="math-editor-special-characters">\n                  <div class="math-editor-list" data-js="charactersList"></div>\n                </span>\n            </div>\n            <div class="math-editor-toolbar math-editor-list math-editor-hidden" data-js="mathToolbar"></div>\n            <p>\n                <button class="math-editor-new-equation math-editor-action-button" data-js="newEquation" title="Ctrl-L">' + l.insertEquation + '</button>\n            </p>\n        </div>\n        ');
    initSpecialCharacterToolbar($toolbar, mathEditor, hasAnswerFocus);
    initMathToolbar($toolbar, mathEditor);
    initNewEquation($toolbar, mathEditor, hasAnswerFocus);
    return $toolbar;
}

function initSpecialCharacterToolbar($toolbar, mathEditor, hasAnswerFocus) {
    $toolbar.find('[data-js="charactersList"]').append(specialCharacters.map(function (char) {
        return '<button class="math-editor-button" ' + (char.latexCommand ? 'data-command="' + char.latexCommand + '"' : '') + '>' + char.character + '</button>';
    })).on('mousedown', 'button', function (e) {
        e.preventDefault();
        var character = e.currentTarget.innerText;
        var command = e.currentTarget.dataset.command;
        if (hasAnswerFocus()) window.document.execCommand('insertText', false, character);else mathEditor.insertMath(command || character);
    });
}

function initMathToolbar($toolbar, mathEditor) {
    $toolbar.find('[data-js="mathToolbar"]').append(latexCommands.map(function (o) {
        return '<button title="' + o.action + '" class="math-editor-button" data-command="' + o.action + '" data-latexcommand="' + o.label + '" data-usewrite="' + (o.useWrite || false) + '">\n<img src="/math.svg?latex=' + encodeURIComponent(o.label ? o.label.replace(/X/g, '\\square') : o.action) + '"/>\n</button>';
    }).join('')).on('mousedown', 'button', function (e) {
        e.preventDefault();
        var dataset = e.currentTarget.dataset;
        mathEditor.insertMath(dataset.command, dataset.latexcommand, dataset.usewrite === 'true');
    });
}

function initNewEquation($toolbar, mathEditor, hasAnswerFocus) {
    $toolbar.find('[data-js="newEquation"]').mousedown(function (e) {
        e.preventDefault();
        if (!hasAnswerFocus()) return; // TODO: remove when button is only visible when textarea has focus
        mathEditor.insertNewEquation();
    }.bind(this));
}

},{"./latexCommands":3,"./specialCharacters":6}],8:[function(require,module,exports){
"use strict";

module.exports = { insertToTextAreaAtCursor: insertToTextAreaAtCursor };

function insertToTextAreaAtCursor(field, value) {
    var startPos = field.selectionStart;
    var endPos = field.selectionEnd;
    var oldValue = field.value;
    field.value = oldValue.substring(0, startPos) + value + oldValue.substring(endPos, oldValue.length);
    field.selectionStart = field.selectionEnd = startPos + value.length;
}

},{}]},{},[4])(4)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvRkkuanMiLCJhcHAvU1YuanMiLCJhcHAvbGF0ZXhDb21tYW5kcy5qcyIsImFwcC9tYXRoLWVkaXRvci5qcyIsImFwcC9zYW5pdGl6ZU9wdHMuanMiLCJhcHAvc3BlY2lhbENoYXJhY3RlcnMuanMiLCJhcHAvdG9vbGJhcnMuanMiLCJhcHAvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsWUFBUTtBQUNKLG9CQUFZLGdCQURSO0FBRUosZUFBTyx5Q0FGSDtBQUdKLGtoQkFISTtBQVdKLHFEQVhJO0FBWUosNGRBWkk7QUF1Qkosb0JBQVksVUF2QlI7QUF3QkosMkJBQW1CLGVBeEJmO0FBeUJKLHdCQUFnQixhQXpCWjtBQTBCSixlQUFPLE9BMUJIO0FBMkJKLGNBQU0sVUEzQkY7QUE0QkosaUJBQVMsWUE1Qkw7QUE2Qkosc0JBQWMsbUJBN0JWO0FBOEJKLGtCQUFVLEtBOUJOO0FBK0JKLG1CQUFXO0FBL0JQLEtBREs7QUFrQ2IsZ0JBQVk7QUFDUixzQkFBYyxtQkFETjtBQUVSLGlCQUFTLFlBRkQ7QUFHUixvQkFBWSxnQkFISjtBQUlSLGVBQU8sV0FKQztBQUtSLGtCQUFVLEdBTEY7QUFNUix1QkFBZSxzQkFOUDtBQU9SLGNBQU0sb0JBUEU7QUFRUixrQkFBVSxlQVJGO0FBU1IsbUJBQVc7QUFUSDtBQWxDQyxDQUFqQjs7Ozs7QUNBQSxPQUFPLE9BQVAsR0FBaUI7QUFDYixZQUFRO0FBQ0osb0JBQVksaUJBRFI7QUFFSixlQUFPLDBDQUZIO0FBR0osNmhCQUhJO0FBUUosd0RBUkk7QUFTSixnWEFUSTtBQWtCSixvQkFBWSxVQWxCUjtBQW1CSiwyQkFBbUIsZUFuQmY7QUFvQkosd0JBQWdCLGtCQXBCWjtBQXFCSixlQUFPLE9BckJIO0FBc0JKLGNBQU0sT0F0QkY7QUF1QkosaUJBQVMsWUF2Qkw7QUF3Qkosc0JB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T0FBUCxHQUFpQixFQUFDLGtEQUFELEVBQWpCOztBQUVBLFNBQVMsd0JBQVQsQ0FBa0MsS0FBbEMsRUFBeUMsS0FBekMsRUFBZ0Q7QUFDNUMsUUFBTSxXQUFXLE1BQU0sY0FBdkI7QUFDQSxRQUFNLFNBQVMsTUFBTSxZQUFyQjtBQUNBLFFBQUksV0FBVyxNQUFNLEtBQXJCO0FBQ0EsVUFBTSxLQUFOLEdBQWMsU0FBUyxTQUFULENBQW1CLENBQW5CLEVBQXNCLFFBQXRCLElBQWtDLEtBQWxDLEdBQTBDLFNBQVMsU0FBVCxDQUFtQixNQUFuQixFQUEyQixTQUFTLE1BQXBDLENBQXhEO0FBQ0EsVUFBTSxjQUFOLEdBQXVCLE1BQU0sWUFBTixHQUFxQixXQUFXLE1BQU0sTUFBN0Q7QUFDSCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBlZGl0b3I6IHtcbiAgICAgICAgbWF0aEVkaXRvcjogJ01hdGlra2FlZGl0b3JpJyxcbiAgICAgICAgdGl0bGU6ICdLYWF2YWVkaXRvcmluIGVuc2ltbcOkaW5lbiBrZWhpdHlzdmVyc2lvJyxcbiAgICAgICAgZGVzY3JpcHRpb246IGA8dWw+XG48bGk+RWRpdG9yaSB0b2ltaWkgcGFyaGFpdGVuIEZpcmVmb3gtc2VsYWltZWxsYS48L2xpPlxuPGxpPuKAnExpc8Okw6Qga2FhdmHigJ0gLW5hcGluIGFsdGEgbMO2eWTDpHQgeWxlaXNpbXBpw6QgbWF0ZW1hdGlpa2Fzc2EsIGZ5c2lpa2Fzc2EgamFcbmtlbWlhc3NhIGvDpHl0ZXR0w6R2acOkIG1lcmtpbnTDtmrDpC4gTGlzw6Rrc2kgZXJpa29pc21lcmtrZWrDpCB2b2kga8OkeXR0w6TDpCBrYWF2YW4ga2lyam9pdHRhbWlzZWVuLjwvbGk+XG4gPGxpPkthYXZvamEgdm9pIHJha2VudGFhXG5rbGlra2FhbWFsbGEgdmFsaWtvbiBtZXJraW50w7Zqw6QgamEvdGFpIGtpcmpvaXR0YW1hbGxhIExhVGVYaWEuPC9saT5cbiA8bGk+RWRpdG9yaW4gdmFzdGF1c2tlbnR0w6TDpG4gdm9pIGtpcmpvaXR0YWEgdGVrc3Rpw6QgamEga2Fhdm9qYSBzZWvDpFxubGlzw6R0w6Qga3V2aWEuPC9saT48L3VsPmAsXG4gICAgICAgIHNob3J0Y3V0VGl0bGU6IGBQaWthbsOkcHDDpGludmlua2tlasOkYCxcbiAgICAgICAgc2hvcnRjdXRzOiBgPHRhYmxlPjx0Ym9keT5cbjx0cj48dGg+TGlpdMOkIGt1dmEgbGVpa2Vww7Z5ZMOkbHTDpDwvdGg+PHRkPkN0cmwtVjwvdGQ+PC90cj5cbjx0cj48dGg+S2lyam9pdGEga2FhdmE8L3RoPjx0ZD5DdHJsLUwgdGFpIEN0cmwtSTwvdGQ+PC90cj5cbjx0cj48dGggY29sc3Bhbj1cIjJcIj5LYWF2YXNzYTwvdGg+PC90cj5cbjx0cj48dGg+SmFrb3ZpaXZhPC90aD48dGQ+LzwvdGQ+PC90cj5cbjx0cj48dGg+S2VydG9tZXJra2k8L3RoPjx0ZD4qPC90ZD48L3RyPlxuPHRyPjx0aD5Fa3Nwb25lbnR0aTwvdGg+PHRkPl48L3RkPjwvdHI+XG48dHI+PHRoPlN1bGplIGthYXZhPC90aD48dGQ+Q3RybC1FbnRlciB0YWkgRXNjPC90ZD48L3RyPlxuPHRyPjx0aD5MaXPDpMOkIGthYXZhIHNldXJhYXZhbGxlIHJpdmlsbGU8L3RoPjx0ZD5FbnRlcjwvdGQ+PC90cj5cbjwvdGJvZHk+XG48L3RhYmxlPmAsXG4gICAgICAgIGZvcm1hdHRpbmc6ICdNdW90b2lsdScsXG4gICAgICAgIHNwZWNpYWxDaGFyYWN0ZXJzOiAnRXJpa29pc21lcmtpdCcsXG4gICAgICAgIGluc2VydEVxdWF0aW9uOiAnTGlzw6TDpCBrYWF2YScsXG4gICAgICAgIGNsb3NlOiAnc3VsamUnLFxuICAgICAgICBzYXZlOiAnVGFsbGVubmEnLFxuICAgICAgICB1cGRhdGVkOiAnUMOkaXZpdGV0dHknLFxuICAgICAgICBzZW5kRmVlZGJhY2s6ICdMw6RoZXTDpCBwYWxhdXRldHRhJyxcbiAgICAgICAgbGFuZ0xpbms6ICcvc3YnLFxuICAgICAgICBsYW5nTGFiZWw6ICdQw6Ugc3ZlbnNrYSdcbiAgICB9LFxuICAgIGFubm90YXRpbmc6IHtcbiAgICAgICAgc2VuZEZlZWRiYWNrOiAnTMOkaGV0w6QgcGFsYXV0ZXR0YScsXG4gICAgICAgIHVwZGF0ZWQ6ICdQw6Rpdml0ZXR0eScsXG4gICAgICAgIG1hdGhFZGl0b3I6ICdNYXRpa2thZWRpdG9yaScsXG4gICAgICAgIHRpdGxlOiAnVGFya2lzdHVzJyxcbiAgICAgICAgYmFja0xpbms6ICcvJyxcbiAgICAgICAgYmFja0xpbmtMYWJlbDogJ1BhbGFhIGthYXZhZWRpdG9yaWluJyxcbiAgICAgICAgc2F2ZTogJ1RhbGxlbm5hIG1lcmtpbm7DpHQnLFxuICAgICAgICBsYW5nTGluazogJy9zdi9iZWRvbW5pbmcnLFxuICAgICAgICBsYW5nTGFiZWw6ICdQw6Ugc3ZlbnNrYSdcbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBlZGl0b3I6IHtcbiAgICAgICAgbWF0aEVkaXRvcjogJ01hdGVtYXRpa2VkaXRvcicsXG4gICAgICAgIHRpdGxlOiAnRm9ybWVsZWRpdG9ybnMgZsO2cnN0YSB1dHZlY2tsaW5nc3ZlcnNpb24nLFxuICAgICAgICBkZXNjcmlwdGlvbjogYDx1bD5cbjxsaT5FZGl0b3JuIGZ1bmdlcmFyIGLDpHN0IG1lZCBicm93c2VybiBGaXJlZm94LjwvbGk+XG4gPGxpPlVuZGVyIGtuYXBwZW4g4oCcTMOkZ2cgdGlsbCBmb3JtZWzigJ0gaGl0dGFyIGR1IGRlIHZhbmxpZ2FzdGUgYmV0ZWNrbmluZ2FybmEgc29tIGFudsOkbmRzIGkgbWF0ZW1hdGlrLCBmeXNpayBvY2gga2VtaS4gRGVzc3V0b20ga2FuIGR1IGFudsOkbmRhIHNwZWNpYWx0ZWNrZW4gZsO2ciBhdHQgc2tyaXZhIGZvcm1sZXIuPC9saT5cbjxsaT5EZXQgZ8OlciBhdHQga29uc3RydWVyYSBmb3JtbGVyIGdlbm9tIGF0dCBrbGlja2EgcMOlIGJldGVja25pbmdhcm5hIGkgbWVueWVybmEgb2NoL2VsbGVyIGdlbm9tIGF0dCBza3JpdmEgTGFUZVguPC9saT5cbjxsaT5EZXQgZ8OlciBmw7ZydXRvbSBhdHQgc2tyaXZhIHRleHQgb2NoIGZvcm1sZXIsIGF0dCBvY2tzw6UgYXR0IGzDpGdnYSB0aWxsIGJpbGRlciBpIHN2YXJzZsOkbHRldC48L2xpPjwvdWw+YCxcbiAgICAgICAgc2hvcnRjdXRUaXRsZTogYFRpcHMgcMOlIHRhbmdlbnRrb21iaW5hdGlvbmVyYCxcbiAgICAgICAgc2hvcnRjdXRzOiBgPHRhYmxlPjx0Ym9keT5cbjx0cj48dGg+TMOkZ2cgdGlsbCBlbiBiaWxkIGZyw6VuIGtsaXBwYm9yZGV0PC90aD48dGQ+Q3RybC1WPC90ZD48L3RyPlxuPHRyPjx0aD5Ta3JpdiBlbiBmb3JtZWw8L3RoPjx0ZD5DdHJsLUwgLyBDdHJsLUk8L3RkPjwvdHI+XG48dHI+PHRoIGNvbHNwYW49XCIyXCI+PC90aD48L3RyPlxuPHRyPjx0aD5CcsOla3N0cmVjazwvdGg+PHRkPi88L3RkPjwvdHI+XG48dHI+PHRoPk11bHRpcGxpa2F0aW9uc3RlY2tlbjwvdGg+PHRkPio8L3RkPjwvdHI+XG48dHI+PHRoPlN0w6RuZzwvdGg+PHRkPkN0cmwtRW50ZXIgLyBFc2M8L3RkPjwvdHI+XG48L3Rib2R5PlxuPC90YWJsZT5gLFxuICAgICAgICBmb3JtYXR0aW5nOiAnTXVvdG9pbHUnLFxuICAgICAgICBzcGVjaWFsQ2hhcmFjdGVyczogJ1NwZWNpYWx0ZWNrZW4nLFxuICAgICAgICBpbnNlcnRFcXVhdGlvbjogJ0zDpGdnIHRpbGwgZm9ybWVsJyxcbiAgICAgICAgY2xvc2U6ICdzdMOkbmcnLFxuICAgICAgICBzYXZlOiAnU3BhcmEnLFxuICAgICAgICB1cGRhdGVkOiAnVXBwZGF0ZXJhZCcsXG4gICAgICAgIHNlbmRGZWVkYmFjazogJ1NraWNrYSBmZWVkYmFjaycsXG4gICAgICAgIGxhbmdMaW5rOiAnLycsXG4gICAgICAgIGxhbmdMYWJlbDogJ1N1b21la3NpJ1xuICAgIH0sXG4gICAgYW5ub3RhdGluZzoge1xuICAgICAgICBzZW5kRmVlZGJhY2s6ICdTa2lja2EgcmVzcG9ucycsXG4gICAgICAgIHVwZGF0ZWQ6ICdVcHBkYXRlcmFkJyxcbiAgICAgICAgbWF0aEVkaXRvcjogJ01hdGVtYXRpa2VkaXRvcicsXG4gICAgICAgIHRpdGxlOiAnS29udHJvbGwnLFxuICAgICAgICBiYWNrTGluazogJy9zdicsXG4gICAgICAgIGJhY2tMaW5rTGFiZWw6ICdNYXRlbWF0aWtlZGl0b3InLFxuICAgICAgICBzYXZlOiAnU3BhcmEgYW50ZWNrbmluZ2FyJyxcbiAgICAgICAgbGFuZ0xpbms6ICcvdGFya2lzdHVzJyxcbiAgICAgICAgbGFuZ0xhYmVsOiAnU3VvbWVrc2knXG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gICAge2FjdGlvbjogJ1xcXFxzcXJ0JywgbGFiZWw6ICdcXFxcc3FydHtYfSd9LFxuICAgIHthY3Rpb246ICdeJywgbGFiZWw6ICd4XntYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcZnJhYycsIGxhYmVsOiAnXFxcXGZyYWN7WH17WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGludCcsIGxhYmVsOiAnXFxcXGludF97WH1ee1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxsaW1fJywgbGFiZWw6ICdcXFxcbGltX3tYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcnJpZ2h0YXJyb3cnLCBsYWJlbDogJ1xcXFxvdmVycmlnaHRhcnJvd3tYfSd9LFxuICAgIHthY3Rpb246ICdfJywgbGFiZWw6ICd4X1gnfSxcbiAgICB7YWN0aW9uOiAnXFxcXG50aHJvb3QnLCBsYWJlbDogJ1xcXFxzcXJ0W1hde1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxzdW0nLCBsYWJlbDogJ1xcXFxzdW1fe1h9XntYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcYmlub20nLCBsYWJlbDogJ1xcXFxiaW5vbXtYfXtYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcc2luJ30sXG4gICAge2FjdGlvbjogJ1xcXFxjb3MnfSxcbiAgICB7YWN0aW9uOiAnXFxcXHRhbid9LFxuICAgIHthY3Rpb246ICdcXFxcYXJjc2luJ30sXG4gICAge2FjdGlvbjogJ1xcXFxhcmNjb3MnfSxcbiAgICB7YWN0aW9uOiAnXFxcXGFyY3Rhbid9LFxuICAgIHthY3Rpb246ICdcXFxcdmVjJywgbGFiZWw6ICdcXFxcdmVje1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxiYXInLCBsYWJlbDogJ1xcXFxiYXJ7WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXHVuZGVybGluZScsIGxhYmVsOiAnXFxcXHVuZGVybGluZXtYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcmxlZnRhcnJvdycsIGxhYmVsOiAnXFxcXG92ZXJsZWZ0YXJyb3d7WH0nfSxcbiAgICB7YWN0aW9uOiAnfCcsIGxhYmVsOiAnfFh8J30sXG4gICAge2FjdGlvbjogJygnLCBsYWJlbDogJyhYKSd9LFxuICAgIHthY3Rpb246ICdfeyB9XnsgfSAnLCBsYWJlbDogJ197WH1ee1h9WCcsIHVzZVdyaXRlOiB0cnVlfVxuXVxuIiwiY29uc3QgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpXG5jb25zdCBzYW5pdGl6ZUh0bWwgPSByZXF1aXJlKCdzYW5pdGl6ZS1odG1sJylcbmNvbnN0IHNhbml0aXplT3B0cyA9IHJlcXVpcmUoJy4vc2FuaXRpemVPcHRzJylcbmNvbnN0IHRvb2xiYXJzID0gcmVxdWlyZSgnLi90b29sYmFycycpXG5jb25zdCBNUSA9IE1hdGhRdWlsbC5nZXRJbnRlcmZhY2UoMilcbmNvbnN0IGxvY2FsZXMgPSB7XG4gICAgRkk6IHJlcXVpcmUoJy4vRkknKSxcbiAgICBTVjogcmVxdWlyZSgnLi9TVicpXG59XG5jb25zdCBsID0gbG9jYWxlc1t3aW5kb3cubG9jYWxlIHx8ICdGSSddLmVkaXRvclxuY29uc3Qga2V5Q29kZXMgPSB7XG4gICAgRU5URVI6IDEzLFxuICAgIEVTQzogMjdcbn1cblxubGV0ICR0b29sYmFyXG5jb25zdCAkb3V0ZXJQbGFjZWhvbGRlciA9ICQoYDxkaXYgY2xhc3M9XCJtYXRoLWVkaXRvci1oaWRkZW5cIiBkYXRhLWpzPVwib3V0ZXJQbGFjZWhvbGRlclwiPmApXG5sZXQgbWF0aEVkaXRvclxuXG5mdW5jdGlvbiBtb3ZlRWxlbWVudEFmdGVyKCRlbGVtZW50LCAkYWZ0ZXIpIHtcbiAgICAkYWZ0ZXIuYWZ0ZXIoJGVsZW1lbnQpXG59XG5cbmZ1bmN0aW9uIGhpZGVFbGVtZW50SW5ET00oJGVsZW1lbnQpIHtcbiAgICAkb3V0ZXJQbGFjZWhvbGRlci5hcHBlbmQoJGVsZW1lbnQpXG59XG5cbmxldCBlZGl0b3JcblxuLy8gVE9ETzogcmVwbGFjZSB3aXRoIGRhdGEgYXR0cmlidXRlcz9cbmxldCBhbnN3ZXJGb2N1cyA9IHRydWVcbmxldCBsYXRleEVkaXRvckZvY3VzID0gZmFsc2VcbmxldCBlcXVhdGlvbkVkaXRvckZvY3VzID0gZmFsc2VcbmxldCBtYXRoRWRpdG9yVmlzaWJsZSA9IGZhbHNlXG5sZXQgJGVkaXRvclxuXG4kKCdib2R5JykuYXBwZW5kKCRvdXRlclBsYWNlaG9sZGVyKVxuXG5tYXRoRWRpdG9yID0gaW5pdE1hdGhFZGl0b3IoKVxuJHRvb2xiYXIgPSB0b29sYmFycy5pbml0KG1hdGhFZGl0b3IsICgpID0+IGFuc3dlckZvY3VzLCBsKVxuaGlkZUVsZW1lbnRJbkRPTSgkdG9vbGJhcilcblxuZnVuY3Rpb24gaW5pdE1hdGhFZGl0b3IoKSB7XG4gICAgY29uc3QgJG1hdGhFZGl0b3IgPSAkKGBcbiAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJtYXRoLWVkaXRvclwiIGRhdGEtanM9XCJtYXRoRWRpdG9yXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWF0aC1lZGl0b3ItY2xvc2VcIiB0aXRsZT1cIkN0cmwtRW50ZXJcIj4ke2wuY2xvc2V9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWF0aC1lZGl0b3ItYm94ZXNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWF0aC1lZGl0b3ItZXF1YXRpb24tZWRpdG9yXCIgZGF0YS1qcz1cImVxdWF0aW9uRWRpdG9yXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwibWF0aC1lZGl0b3ItbGF0ZXgtZWRpdG9yXCIgZGF0YS1qcz1cImxhdGV4RWRpdG9yXCIgcGxhY2Vob2xkZXI9XCJMYVRleFwiPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9zZWN0aW9uPmApXG5cbiAgICBoaWRlRWxlbWVudEluRE9NKCRtYXRoRWRpdG9yKVxuXG4gICAgY29uc3QgJGxhdGV4RWRpdG9yID0gJG1hdGhFZGl0b3IuZmluZCgnW2RhdGEtanM9XCJsYXRleEVkaXRvclwiXScpXG4gICAgY29uc3QgJGVxdWF0aW9uRWRpdG9yID0gJG1hdGhFZGl0b3IuZmluZCgnW2RhdGEtanM9XCJlcXVhdGlvbkVkaXRvclwiXScpXG4gICAgY29uc3QgbWF0aEZpZWxkID0gTVEuTWF0aEZpZWxkKCRlcXVhdGlvbkVkaXRvci5nZXQoMCksIHtcbiAgICAgICAgaGFuZGxlcnM6IHtcbiAgICAgICAgICAgIGVkaXQ6ICgpID0+ICFsYXRleEVkaXRvckZvY3VzICYmICRsYXRleEVkaXRvci52YWwobWF0aEZpZWxkLmxhdGV4KCkpLFxuICAgICAgICAgICAgZW50ZXI6IGZpZWxkID0+IHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBkbyBub3QgY2xvc2UgZWRpdG9yIC8gbyBub3QgY3JlYXRlIGEgbmV3IGVxdWF0aW9uIGlmIHRoZXJlIGlzIG5vIHRleHQ/XG4gICAgICAgICAgICAgICAgbWF0aEVkaXRvci5jbG9zZU1hdGhFZGl0b3IodHJ1ZSlcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGluc2VydE5ld0VxdWF0aW9uKCc8ZGl2PjwvZGl2PicpLCAyKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcblxuICAgICRlcXVhdGlvbkVkaXRvclxuICAgICAgICAub24oJ2ZvY3VzIG1vdXNlZG93bicsIGUgPT4gZXF1YXRpb25FZGl0b3JGb2N1cyA9IHRydWUpXG4gICAgICAgIC5vbignZm9jdXMgYmx1cicsICcubXEtdGV4dGFyZWEgdGV4dGFyZWEnLCBlID0+IHtcbiAgICAgICAgICAgIGVxdWF0aW9uRWRpdG9yRm9jdXMgPSBlLnR5cGUgIT09ICdibHVyJ1xuICAgICAgICAgICAgb25Gb2N1c0NoYW5nZWQoKVxuICAgICAgICB9KVxuXG4gICAgZnVuY3Rpb24gb25MYXRleFVwZGF0ZSgpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBtYXRoRmllbGQubGF0ZXgoJGxhdGV4RWRpdG9yLnZhbCgpKSwgMSlcbiAgICB9XG5cbiAgICAkbGF0ZXhFZGl0b3JcbiAgICAgICAgLmtleXVwKG9uTGF0ZXhVcGRhdGUpXG4gICAgICAgIC5vbignZm9jdXMgYmx1cicsIGUgPT4ge1xuICAgICAgICAgICAgbGF0ZXhFZGl0b3JGb2N1cyA9IGUudHlwZSAhPT0gJ2JsdXInXG4gICAgICAgICAgICBvbkZvY3VzQ2hhbmdlZCgpXG4gICAgICAgIH0pXG5cbiAgICAkbWF0aEVkaXRvci5maW5kKCcuY2xvc2UnKS5tb3VzZWRvd24oZSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBjbG9zZU1hdGhFZGl0b3IodHJ1ZSlcbiAgICB9KVxuXG4gICAgbGV0IGZvY3VzQ2hhbmdlZCA9IG51bGxcblxuICAgIGZ1bmN0aW9uIG9uRm9jdXNDaGFuZ2VkKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoZm9jdXNDaGFuZ2VkKVxuICAgICAgICBmb2N1c0NoYW5nZWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICghbGF0ZXhFZGl0b3JGb2N1cyAmJiAhZXF1YXRpb25FZGl0b3JGb2N1cykgY2xvc2VNYXRoRWRpdG9yKClcbiAgICAgICAgICAgIGlmICghYW5zd2VyRm9jdXMgJiYgIW1hdGhFZGl0b3JWaXNpYmxlICYmICFsYXRleEVkaXRvckZvY3VzICYmICFlcXVhdGlvbkVkaXRvckZvY3VzKSBjbG9zZUVkaXRvcigpXG4gICAgICAgIH0sIDApXG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnNlcnROZXdFcXVhdGlvbihvcHRpb25hbE1hcmt1cCkge1xuICAgICAgICB3aW5kb3cuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydEhUTUwnLCBmYWxzZSwgKG9wdGlvbmFsTWFya3VwID8gb3B0aW9uYWxNYXJrdXAgOiAnJykgKyAnPGltZyBkYXRhLWpzPVwibmV3XCIgc3R5bGU9XCJkaXNwbGF5OiBub25lXCIvPicpO1xuICAgICAgICBjb25zdCAkYWRkZWRFcXVhdGlvbkltYWdlID0gJCgnW2RhdGEtanM9XCJuZXdcIl0nKVxuICAgICAgICAkYWRkZWRFcXVhdGlvbkltYWdlXG4gICAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS1qcycpXG5cbiAgICAgICAgbW92ZUVsZW1lbnRBZnRlcigkbWF0aEVkaXRvciwgJGFkZGVkRXF1YXRpb25JbWFnZSlcblxuICAgICAgICBtYXRoRmllbGQubGF0ZXgoJycpXG4gICAgICAgIG1hdGhFZGl0b3JWaXNpYmxlID0gdHJ1ZVxuICAgICAgICAkdG9vbGJhci5maW5kKCdbZGF0YS1qcz1cIm5ld0VxdWF0aW9uXCJdJykuaGlkZSgpXG4gICAgICAgICR0b29sYmFyLmZpbmQoJ1tkYXRhLWpzPVwibWF0aFRvb2xiYXJcIl0nKS5zaG93KClcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBtYXRoRmllbGQuZm9jdXMoKSwgMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnNlcnRNYXRoKHN5bWJvbCwgYWx0ZXJuYXRpdmVTeW1ib2wsIHVzZVdyaXRlKSB7XG4gICAgICAgIGlmIChsYXRleEVkaXRvckZvY3VzKSB7XG4gICAgICAgICAgICB1dGlsLmluc2VydFRvVGV4dEFyZWFBdEN1cnNvcigkbGF0ZXhFZGl0b3IuZ2V0KDApLCBhbHRlcm5hdGl2ZVN5bWJvbCB8fCBzeW1ib2wpXG4gICAgICAgICAgICBvbkxhdGV4VXBkYXRlKClcbiAgICAgICAgfSBlbHNlIGlmIChlcXVhdGlvbkVkaXRvckZvY3VzKSB7XG4gICAgICAgICAgICBpZiAodXNlV3JpdGUpIHtcbiAgICAgICAgICAgICAgICBtYXRoRmllbGQud3JpdGUoc3ltYm9sKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtYXRoRmllbGQudHlwZWRUZXh0KHN5bWJvbClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHN5bWJvbC5zdGFydHNXaXRoKCdcXFxcJykpIG1hdGhGaWVsZC5rZXlzdHJva2UoJ1RhYicpXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IG1hdGhGaWVsZC5mb2N1cygpLCAwKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvc2VNYXRoRWRpdG9yKHNldEZvY3VzQWZ0ZXJDbG9zZSA9IGZhbHNlKSB7XG4gICAgICAgIC8vIFRPRE86IHJlbW92ZSBldmVudCBiaW5kaW5nc1xuICAgICAgICBjb25zdCAkY3VycmVudEVkaXRvciA9ICRtYXRoRWRpdG9yLmNsb3Nlc3QoJ1tkYXRhLWpzPVwiYW5zd2VyXCJdJylcbiAgICAgICAgY29uc3QgJGltZyA9ICRtYXRoRWRpdG9yLnByZXYoKVxuICAgICAgICBpZiAoJGxhdGV4RWRpdG9yLnZhbCgpLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgICAgICAgICRpbWcucmVtb3ZlKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRpbWcuc2hvdygpXG4gICAgICAgICAgICAgICAgLnByb3AoJ3NyYycsICcvbWF0aC5zdmc/bGF0ZXg9JyArIGVuY29kZVVSSUNvbXBvbmVudCgkbGF0ZXhFZGl0b3IudmFsKCkpKVxuICAgICAgICAgICAgICAgIC5wcm9wKCdhbHQnLCAkbGF0ZXhFZGl0b3IudmFsKCkpXG4gICAgICAgIH1cblxuICAgICAgICAkdG9vbGJhci5maW5kKCdbZGF0YS1qcz1cIm5ld0VxdWF0aW9uXCJdJykuc2hvdygpXG4gICAgICAgICR0b29sYmFyLmZpbmQoJ1tkYXRhLWpzPVwibWF0aFRvb2xiYXJcIl0nKS5oaWRlKClcbiAgICAgICAgaGlkZUVsZW1lbnRJbkRPTSgkbWF0aEVkaXRvcilcbiAgICAgICAgbWF0aEVkaXRvclZpc2libGUgPSBmYWxzZVxuICAgICAgICBsYXRleEVkaXRvckZvY3VzID0gZmFsc2VcbiAgICAgICAgZXF1YXRpb25FZGl0b3JGb2N1cyA9IGZhbHNlXG4gICAgICAgIGlmIChzZXRGb2N1c0FmdGVyQ2xvc2UpICRjdXJyZW50RWRpdG9yLmZvY3VzKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvcGVuTWF0aEVkaXRvcigkaW1nKSB7XG4gICAgICAgIGlmIChtYXRoRWRpdG9yVmlzaWJsZSkgY2xvc2VNYXRoRWRpdG9yKClcbiAgICAgICAgJGltZy5oaWRlKClcbiAgICAgICAgbW92ZUVsZW1lbnRBZnRlcigkbWF0aEVkaXRvciwgJGltZylcbiAgICAgICAgY29uc3QgbGF0ZXggPSAkaW1nLnByb3AoJ2FsdCcpXG4gICAgICAgICRsYXRleEVkaXRvci52YWwobGF0ZXgpXG4gICAgICAgIG9uTGF0ZXhVcGRhdGUoKVxuICAgICAgICBtYXRoRWRpdG9yVmlzaWJsZSA9IHRydWVcbiAgICAgICAgJHRvb2xiYXIuZmluZCgnW2RhdGEtanM9XCJuZXdFcXVhdGlvblwiXScpLmhpZGUoKVxuICAgICAgICAkdG9vbGJhci5maW5kKCdbZGF0YS1qcz1cIm1hdGhUb29sYmFyXCJdJykuc2hvdygpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gbWF0aEZpZWxkLmZvY3VzKCksIDApXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5zZXJ0TmV3RXF1YXRpb24sXG4gICAgICAgIGluc2VydE1hdGgsXG4gICAgICAgIGNsb3NlTWF0aEVkaXRvcixcbiAgICAgICAgb3Blbk1hdGhFZGl0b3IsXG4gICAgICAgIG9uRm9jdXNDaGFuZ2VkXG4gICAgfVxufVxuXG5mdW5jdGlvbiBvcGVuRWRpdG9yKCRlbGVtZW50KSB7XG4gICAgJGVkaXRvciA9ICRlbGVtZW50XG4gICAgJGVsZW1lbnQuYmVmb3JlKCR0b29sYmFyKVxuICAgICR0b29sYmFyLnNob3coKVxufVxuXG5mdW5jdGlvbiBjbG9zZUVkaXRvcigpIHtcbiAgICAvLyBUT0RPOiByZW1vdmUgZXZlbnQgYmluZGluZ3NcbiAgICAkdG9vbGJhci5maW5kKCdbZGF0YS1qcz1cIm1hdGhUb29sYmFyXCJdJykuaGlkZSgpXG4gICAgaGlkZUVsZW1lbnRJbkRPTSgkdG9vbGJhcilcbiAgICBtYXRoRWRpdG9yLmNsb3NlTWF0aEVkaXRvcigpXG4gICAgLy8gJGVkaXRvci5vZmYoKVxuXG4gICAgYW5zd2VyRm9jdXMgPSBmYWxzZVxuICAgIG1hdGhFZGl0b3JWaXNpYmxlID0gZmFsc2VcbiAgICBsYXRleEVkaXRvckZvY3VzID0gZmFsc2Vcbn1cblxubGV0IGJsdXJyZWRcblxuZnVuY3Rpb24gb25FZGl0b3JGb2N1c0NoYW5nZWQoZSkge1xuICAgIGFuc3dlckZvY3VzID0gZS50eXBlID09PSAnZm9jdXMnXG5cbiAgICBjbGVhclRpbWVvdXQoYmx1cnJlZClcbiAgICBibHVycmVkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICghYW5zd2VyRm9jdXMgJiYgIW1hdGhFZGl0b3JWaXNpYmxlICYmICFsYXRleEVkaXRvckZvY3VzICYmICFlcXVhdGlvbkVkaXRvckZvY3VzKSBjbG9zZUVkaXRvcigpXG4gICAgICAgIGVsc2UgaWYgKGFuc3dlckZvY3VzICYmIG1hdGhFZGl0b3JWaXNpYmxlKSBtYXRoRWRpdG9yLmNsb3NlTWF0aEVkaXRvcigpXG4gICAgICAgIGVsc2Ugb3BlbkVkaXRvcigkKGUudGFyZ2V0KSlcbiAgICB9LCAwKVxufVxuXG5mdW5jdGlvbiBpc01hdGhFZGl0b3JWaXNpYmxlKCkge1xuICAgIHJldHVybiBtYXRoRWRpdG9yVmlzaWJsZVxufVxuXG5lZGl0b3IgPSB7XG4gICAgb3BlbkVkaXRvcixcbiAgICBjbG9zZUVkaXRvcixcbiAgICBvbkVkaXRvckZvY3VzQ2hhbmdlZCxcbiAgICBpc01hdGhFZGl0b3JWaXNpYmxlLFxuICAgIG9wZW5NYXRoRWRpdG9yOiBtYXRoRWRpdG9yLm9wZW5NYXRoRWRpdG9yLFxuICAgIGNsb3NlTWF0aEVkaXRvcjogbWF0aEVkaXRvci5jbG9zZU1hdGhFZGl0b3IsXG4gICAgaW5zZXJ0TmV3RXF1YXRpb246IG1hdGhFZGl0b3IuaW5zZXJ0TmV3RXF1YXRpb25cbn1cblxuY29uc3QgbWFrZVJpY2hUZXh0ID0gKGVsZW1lbnQsIG9uVmFsdWVDaGFuZ2VkID0gKCkgPT4geyB9KSA9PiB7XG4gICAgY29uc3QgJGFuc3dlciA9ICQoZWxlbWVudClcbiAgICAkYW5zd2VyXG4gICAgICAgIC5hdHRyKCdjb250ZW50ZWRpdGFibGUnLCAndHJ1ZScpXG4gICAgICAgIC5hdHRyKCdkYXRhLWpzJywgJ2Fuc3dlcicpXG4gICAgICAgIC5hZGRDbGFzcygnbWF0aC1lZGl0b3ItYW5zd2VyJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgZSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNDdHJsS2V5KGUsIGtleUNvZGVzLkVOVEVSKSB8fCBpc0tleShlLCBrZXlDb2Rlcy5FU0MpKSBtYXRoRWRpdG9yLmNsb3NlTWF0aEVkaXRvcih0cnVlKVxuICAgICAgICB9KVxuICAgICAgICAub24oJ21vdXNlZG93bicsICdpbWdbc3JjXj1cIi9tYXRoLnN2Z1wiXScsIGUgPT4gZWRpdG9yLm9wZW5NYXRoRWRpdG9yKCQoZS50YXJnZXQpKSkgLy8gVE9ETzogb3BlbiBlZGl0b3IgaWYgY2xpY2tlZCBvbiBlcXVhdGlvbiBpbiBhbm90aGVyIGVkaXRvclxuICAgICAgICAub24oJ2tleXByZXNzJywgZSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNDdHJsS2V5KGUsICdsJykgfHwgaXNDdHJsS2V5KGUsICdpJykpIGVkaXRvci5pbnNlcnROZXdFcXVhdGlvbigpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZm9jdXMgYmx1cicsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKGVkaXRvci5pc01hdGhFZGl0b3JWaXNpYmxlKCkgJiYgZS50eXBlID09PSAnZm9jdXMnKSBlZGl0b3IuY2xvc2VNYXRoRWRpdG9yKClcbiAgICAgICAgICAgIGVkaXRvci5vbkVkaXRvckZvY3VzQ2hhbmdlZChlKVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2lucHV0IGZvY3VzJywgZSA9PiBvblZhbHVlQ2hhbmdlZChzYW5pdGl6ZUNvbnRlbnQoZS5jdXJyZW50VGFyZ2V0KSkpXG4gICAgICAgIC5vbigncGFzdGUnLCBlID0+IHtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC50YWdOYW1lID09PSAnVEVYVEFSRUEnKVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgY29uc3QgY2xpcGJvYXJkRGF0YSA9IGUub3JpZ2luYWxFdmVudC5jbGlwYm9hcmREYXRhXG4gICAgICAgICAgICBjb25zdCBmaWxlID0gY2xpcGJvYXJkRGF0YS5pdGVtcyAmJiBjbGlwYm9hcmREYXRhLml0ZW1zWzBdLmdldEFzRmlsZSgpXG4gICAgICAgICAgICBpZiAoZmlsZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgIEJhY29uLmZyb21Qcm9taXNlKCQucG9zdCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6J1BPU1QnLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IGAvc2F2ZUltZz9hbnN3ZXJJZD0keyRlZGl0b3IuYXR0cignaWQnKX1gLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBmaWxlLFxuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOmZhbHNlXG4gICAgICAgICAgICAgICAgfSkpLm9uVmFsdWUoKHtpZH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3JjID0gYC9sb2FkSW1nP2Fuc3dlcklkPSR7JGVkaXRvci5hdHRyKCdpZCcpfSZpZD0ke2lkfWBcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1nID0gYDxpbWcgc3JjPVwiJHtzcmN9XCIvPmBcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LmV4ZWNDb21tYW5kKCdpbnNlcnRIVE1MJywgZmFsc2UsIGltZylcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjbGlwYm9hcmREYXRhQXNIdG1sID0gY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0L2h0bWwnKVxuICAgICAgICAgICAgICAgIGlmIChjbGlwYm9hcmREYXRhQXNIdG1sKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydEhUTUwnLCBmYWxzZSwgc2FuaXRpemVIdG1sKGNsaXBib2FyZERhdGFBc0h0bWwsIHNhbml0aXplT3B0cykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbn1cblxuZnVuY3Rpb24gc2FuaXRpemVDb250ZW50KGFuc3dlckVsZW1lbnQpIHtcbiAgICAkKGFuc3dlckVsZW1lbnQpLmZpbmQoJ1tkYXRhLWpzPVwibWF0aEVkaXRvclwiXScpLmhpZGUoKVxuICAgIGNvbnN0IHRleHQgPSAkKGFuc3dlckVsZW1lbnQpWzBdLmlubmVyVGV4dFxuICAgICQoYW5zd2VyRWxlbWVudCkuZmluZCgnW2RhdGEtanM9XCJtYXRoRWRpdG9yXCJdJykuc2hvdygpXG4gICAgY29uc3QgaHRtbCA9ICQoYW5zd2VyRWxlbWVudCkuaHRtbCgpLnJlcGxhY2UoLzxzZWN0aW9uW1xcc1xcU10qPFxcL3NlY3Rpb24+L2dpLCAnJylcblxuICAgIHJldHVybiB7IGFuc3dlckhUTUw6IHNhbml0aXplSHRtbChodG1sLCBzYW5pdGl6ZU9wdHMpLCBhbnN3ZXJUZXh0OiB0ZXh0IH1cbn1cblxuZnVuY3Rpb24gaXNLZXkoZSwga2V5KSB7IHJldHVybiBwcmV2ZW50SWZUcnVlKGUsICFlLmFsdEtleSAmJiAhZS5zaGlmdEtleSAmJiAhZS5jdHJsS2V5ICAmJiBrZXlPcktleUNvZGUoZSwga2V5KSl9XG5cbmZ1bmN0aW9uIGlzQ3RybEtleShlLCBrZXkpIHsgcmV0dXJuIHByZXZlbnRJZlRydWUoZSwgIWUuYWx0S2V5ICYmICFlLnNoaWZ0S2V5ICYmIGUuY3RybEtleSAmJiBrZXlPcktleUNvZGUoZSwga2V5KSl9XG5cbmZ1bmN0aW9uIGtleU9yS2V5Q29kZShlLCB2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnID8gZS5rZXkgPT09IHZhbCA6IGUua2V5Q29kZSA9PT0gdmFsIH1cbmZ1bmN0aW9uIHByZXZlbnRJZlRydWUoZSwgdmFsKSB7XG4gICAgaWYodmFsKSBlLnByZXZlbnREZWZhdWx0KClcbiAgICByZXR1cm4gdmFsXG59XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtYWtlUmljaFRleHRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGFsbG93ZWRUYWdzOiBbXG4gICAgICAgICdkaXYnLFxuICAgICAgICAnaW1nJyxcbiAgICAgICAgJ2JyJ1xuICAgIF0sXG4gICAgYWxsb3dlZEF0dHJpYnV0ZXM6IHtcbiAgICAgICAgaW1nOiBbJ3NyYycsICdhbHQnXVxuICAgIH0sXG4gICAgYWxsb3dlZFNjaGVtZXM6IFtdXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAgICB7Y2hhcmFjdGVyOiAnwrAnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4omhJywgbGF0ZXhDb21tYW5kOiAnXFxcXGVxdWl2J30sXG4gICAge2NoYXJhY3RlcjogJ+KJoid9LCAvLyBcXG5lcXVpdiBvciBcXG5vdFxcZXF1aXZcbiAgICB7Y2hhcmFjdGVyOiAn4oyQJ30sIC8vIFxcYmFja25lZ1xuICAgIHtjaGFyYWN0ZXI6ICfDlycsIGxhdGV4Q29tbWFuZDogJ1xcXFx0aW1lcyd9LFxuICAgIHtjaGFyYWN0ZXI6ICfDtycsIGxhdGV4Q29tbWFuZDogJ1xcXFxkaXYnfSxcbiAgICB7Y2hhcmFjdGVyOiAnwrcnLCBsYXRleENvbW1hbmQ6ICdcXFxcY2RvdCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfCqyd9LCAvLyBcXGd1aWxsZW1vdGxlZnRcbiAgICB7Y2hhcmFjdGVyOiAnwrsnfSwgLy8gXFxndWlsbGVtb3RyaWdodFxuICAgIHtjaGFyYWN0ZXI6ICfigKYnLCBsYXRleENvbW1hbmQ6ICdcXFxcZG90cyd9LFxuICAgIHtjaGFyYWN0ZXI6ICfCrCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxuZWcnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4omFJywgbGF0ZXhDb21tYW5kOiAnXFxcXGNvbmcnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4omIJywgbGF0ZXhDb21tYW5kOiAnXFxcXGFwcHJveCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiLwnLCBsYXRleENvbW1hbmQ6ICdcXFxcc2ltJ30sXG4gICAge2NoYXJhY3RlcjogJ+KAuSd9LCAvLyBcXGd1aWxzaW5nbGxlZnRcbiAgICB7Y2hhcmFjdGVyOiAn4oC6J30sIC8vIFxcZ3VpbHNpbmdscmlnaHRcbiAgICB7Y2hhcmFjdGVyOiAn4oCwJ30sIC8vIFxccGVybWlsLCBcXHRleHRwZXJ0ZW50aG91c2FuZCBvciBcXHRleHRwZXJ0aG91c2FuZFxuICAgIHtjaGFyYWN0ZXI6ICfCuScsIGxhdGV4Q29tbWFuZDogJ14xJ30sXG4gICAge2NoYXJhY3RlcjogJ8KyJywgbGF0ZXhDb21tYW5kOiAnXjInfSxcbiAgICB7Y2hhcmFjdGVyOiAnwrMnLCBsYXRleENvbW1hbmQ6ICdeMyd9LFxuICAgIHtjaGFyYWN0ZXI6ICfCvScsIGxhdGV4Q29tbWFuZDogJzEvMid9LFxuICAgIHtjaGFyYWN0ZXI6ICfCvCcsIGxhdGV4Q29tbWFuZDogJzEvNCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfCvicsIGxhdGV4Q29tbWFuZDogJzMvNCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfihpAnLCBsYXRleENvbW1hbmQ6ICdcXFxcbGVmdGFycm93J30sXG4gICAge2NoYXJhY3RlcjogJ+KGkScsIGxhdGV4Q29tbWFuZDogJ1xcXFx1cGFycm93J30sXG4gICAge2NoYXJhY3RlcjogJ+KGkicsIGxhdGV4Q29tbWFuZDogJ1xcXFxyaWdodGFycm93J30sXG4gICAge2NoYXJhY3RlcjogJ+KGkycsIGxhdGV4Q29tbWFuZDogJ1xcXFxkb3duYXJyb3cnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oaUJywgbGF0ZXhDb21tYW5kOiAnXFxcXGxlZnRyaWdodGFycm93J30sXG4gICAge2NoYXJhY3RlcjogJ+KGlScsIGxhdGV4Q29tbWFuZDogJ1xcXFx1cGRvd25hcnJvdyd9LFxuICAgIHtjaGFyYWN0ZXI6ICfihqgnfSwgLy8gXFx2ZXJ0aWNhbFxuICAgIHtjaGFyYWN0ZXI6ICfih5AnLCBsYXRleENvbW1hbmQ6ICdcXFxcTGVmdGFycm93J30sXG4gICAge2NoYXJhY3RlcjogJ+KHkicsIGxhdGV4Q29tbWFuZDogJ1xcXFxSaWdodGFycm93J30sXG4gICAge2NoYXJhY3RlcjogJ+KHlCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxMZWZ0cmlnaHRhcnJvdyd9LFxuICAgIHtjaGFyYWN0ZXI6ICfih4wnfSwgLy8gXFxyaWdodGxlZnRoYXJwb29uc1xuICAgIHtjaGFyYWN0ZXI6ICfiiaAnLCBsYXRleENvbW1hbmQ6ICdcXFxcbmVxJ30sXG4gICAge2NoYXJhY3RlcjogJ+KIhScsIGxhdGV4Q29tbWFuZDogJ1xcXFxlbXB0eSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiJ4nLCBsYXRleENvbW1hbmQ6ICdcXFxcaW5mdHknfSxcbiAgICB7Y2hhcmFjdGVyOiAnwrEnLCBsYXRleENvbW1hbmQ6ICdcXFxccG0nfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oiTJywgbGF0ZXhDb21tYW5kOiAnXFxcXG1wJ30sXG4gICAge2NoYXJhY3RlcjogJ+KJpCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxsZXEnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4omlJywgbGF0ZXhDb21tYW5kOiAnXFxcXGdlcSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfCtScsIGxhdGV4Q29tbWFuZDogJ1xcXFxtdSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiIInLCBsYXRleENvbW1hbmQ6ICdcXFxccGFydGlhbCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiJEnLCBsYXRleENvbW1hbmQ6ICdcXFxcU2lnbWEnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oiPJywgbGF0ZXhDb21tYW5kOiAnXFxcXFBpJ30sXG4gICAge2NoYXJhY3RlcjogJ86pJywgbGF0ZXhDb21tYW5kOiAnXFxcXE9tZWdhJ30sXG4gICAge2NoYXJhY3RlcjogJ86UJywgbGF0ZXhDb21tYW5kOiAnXFxcXERlbHRhJ30sXG4gICAge2NoYXJhY3RlcjogJ/CdnIQnLCBsYXRleENvbW1hbmQ6ICdcXFxcaW90YSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfDkCd9LCAvLyBcXEV0aFxuICAgIHtjaGFyYWN0ZXI6ICfDsCd9LCAvLyBcXGV0aFxuICAgIHtjaGFyYWN0ZXI6ICfDnid9LCAvLyBcXHRob3JuXG4gICAge2NoYXJhY3RlcjogJ8O+J30sIC8vIFxcVGhvcm5cbiAgICB7Y2hhcmFjdGVyOiAnzpMnLCBsYXRleENvbW1hbmQ6ICdcXFxcR2FtbWEnfSxcbiAgICB7Y2hhcmFjdGVyOiAnzpgnLCBsYXRleENvbW1hbmQ6ICdcXFxcVGhldGEnfSxcbiAgICB7Y2hhcmFjdGVyOiAnzqYnLCBsYXRleENvbW1hbmQ6ICdcXFxcUGhpJ30sXG4gICAge2NoYXJhY3RlcjogJ86xJywgbGF0ZXhDb21tYW5kOiAnXFxcXGFscGhhJ30sXG4gICAge2NoYXJhY3RlcjogJ860JywgbGF0ZXhDb21tYW5kOiAnXFxcXGRlbHRhJ30sXG4gICAge2NoYXJhY3RlcjogJ861JywgbGF0ZXhDb21tYW5kOiAnXFxcXHZhcmVwc2lsb24nfSxcbiAgICB7Y2hhcmFjdGVyOiAnz4MnLCBsYXRleENvbW1hbmQ6ICdcXFxcc2lnbWEnfSxcbiAgICB7Y2hhcmFjdGVyOiAnz4QnLCBsYXRleENvbW1hbmQ6ICdcXFxcdGF1J30sXG4gICAge2NoYXJhY3RlcjogJ86pJywgbGF0ZXhDb21tYW5kOiAnXFxcXE9tZWdhJ30sXG4gICAge2NoYXJhY3RlcjogJ8+JJywgbGF0ZXhDb21tYW5kOiAnXFxcXG9tZWdhJ30sXG4gICAge2NoYXJhY3RlcjogJ9CUJ30sIC8vIFxcY3lyZFxuICAgIHtjaGFyYWN0ZXI6ICfPgCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxwaSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfQpCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxwaGknfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oiIJywgbGF0ZXhDb21tYW5kOiAnXFxcXGluJ30sXG4gICAge2NoYXJhY3RlcjogJ+KIiScsIGxhdGV4Q29tbWFuZDogJ1xcXFxub3Rpbid9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiIsnLCBsYXRleENvbW1hbmQ6ICdcXFxcbmknfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oqCJywgbGF0ZXhDb21tYW5kOiAnXFxcXHN1YnNldCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiioMnLCBsYXRleENvbW1hbmQ6ICdcXFxcc3Vwc2V0J30sXG4gICAge2NoYXJhY3RlcjogJ+KIqScsIGxhdGV4Q29tbWFuZDogJ1xcXFxjYXAnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oiqJywgbGF0ZXhDb21tYW5kOiAnXFxcXGN1cCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiJYnLCBsYXRleENvbW1hbmQ6ICdcXFxcc2V0bWludXMnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oigJywgbGF0ZXhDb21tYW5kOiAnXFxcXGFuZ2xlJ30sXG4gICAge2NoYXJhY3RlcjogJ+KIpycsIGxhdGV4Q29tbWFuZDogJ1xcXFxhbmQnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oioJywgbGF0ZXhDb21tYW5kOiAnXFxcXG9yJ30sXG4gICAge2NoYXJhY3RlcjogJ+KIgCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxmb3JhbGwnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oiDJywgbGF0ZXhDb21tYW5kOiAnXFxcXGV4aXN0cyd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiIQnLCBsYXRleENvbW1hbmQ6ICdcXFxcbmV4aXN0cyd9LFxuICAgIHtjaGFyYWN0ZXI6ICfilrMnLCBsYXRleENvbW1hbmQ6ICdcXFxcdHJpYW5nbGUnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oqlJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBlcnAnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oCWJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBhcmFsbGVsJ30sXG4gICAge2NoYXJhY3RlcjogJ+KImCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxjaXJjJ31cbl1cbiIsImNvbnN0IHNwZWNpYWxDaGFyYWN0ZXJzID0gcmVxdWlyZSgnLi9zcGVjaWFsQ2hhcmFjdGVycycpXG5jb25zdCBsYXRleENvbW1hbmRzID0gcmVxdWlyZSgnLi9sYXRleENvbW1hbmRzJylcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaW5pdCxcbn1cblxuZnVuY3Rpb24gaW5pdChtYXRoRWRpdG9yLCBoYXNBbnN3ZXJGb2N1cywgbCkge1xuICAgIGNvbnN0ICR0b29sYmFyID0gJChgICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1hdGgtZWRpdG9yLXRvb2xzXCIgZGF0YS1qcz1cInRvb2xzXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWF0aC1lZGl0b3ItY2hhcmFjdGVyc1wiIGRhdGEtanM9XCJjaGFyYWN0ZXJzXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRoLWVkaXRvci1zcGVjaWFsLWNoYXJhY3RlcnNcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYXRoLWVkaXRvci1saXN0XCIgZGF0YS1qcz1cImNoYXJhY3RlcnNMaXN0XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWF0aC1lZGl0b3ItdG9vbGJhciBtYXRoLWVkaXRvci1saXN0IG1hdGgtZWRpdG9yLWhpZGRlblwiIGRhdGEtanM9XCJtYXRoVG9vbGJhclwiPjwvZGl2PlxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm1hdGgtZWRpdG9yLW5ldy1lcXVhdGlvbiBtYXRoLWVkaXRvci1hY3Rpb24tYnV0dG9uXCIgZGF0YS1qcz1cIm5ld0VxdWF0aW9uXCIgdGl0bGU9XCJDdHJsLUxcIj4ke2wuaW5zZXJ0RXF1YXRpb259PC9idXR0b24+XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBgKVxuICAgIGluaXRTcGVjaWFsQ2hhcmFjdGVyVG9vbGJhcigkdG9vbGJhciwgbWF0aEVkaXRvciwgaGFzQW5zd2VyRm9jdXMpXG4gICAgaW5pdE1hdGhUb29sYmFyKCR0b29sYmFyLCBtYXRoRWRpdG9yKVxuICAgIGluaXROZXdFcXVhdGlvbigkdG9vbGJhciwgbWF0aEVkaXRvciwgaGFzQW5zd2VyRm9jdXMpXG4gICAgcmV0dXJuICR0b29sYmFyXG59XG5cblxuZnVuY3Rpb24gaW5pdFNwZWNpYWxDaGFyYWN0ZXJUb29sYmFyKCR0b29sYmFyLCBtYXRoRWRpdG9yLCBoYXNBbnN3ZXJGb2N1cykge1xuICAgICR0b29sYmFyLmZpbmQoJ1tkYXRhLWpzPVwiY2hhcmFjdGVyc0xpc3RcIl0nKVxuICAgICAgICAuYXBwZW5kKHNwZWNpYWxDaGFyYWN0ZXJzLm1hcChjaGFyID0+IGA8YnV0dG9uIGNsYXNzPVwibWF0aC1lZGl0b3ItYnV0dG9uXCIgJHtjaGFyLmxhdGV4Q29tbWFuZCA/IGBkYXRhLWNvbW1hbmQ9XCIke2NoYXIubGF0ZXhDb21tYW5kfVwiYCA6ICcnfT4ke2NoYXIuY2hhcmFjdGVyfTwvYnV0dG9uPmApKVxuICAgICAgICAub24oJ21vdXNlZG93bicsICdidXR0b24nLCBlID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgY29uc3QgY2hhcmFjdGVyID0gZS5jdXJyZW50VGFyZ2V0LmlubmVyVGV4dFxuICAgICAgICAgICAgY29uc3QgY29tbWFuZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmNvbW1hbmRcbiAgICAgICAgICAgIGlmIChoYXNBbnN3ZXJGb2N1cygpKSB3aW5kb3cuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydFRleHQnLCBmYWxzZSwgY2hhcmFjdGVyKVxuICAgICAgICAgICAgZWxzZSBtYXRoRWRpdG9yLmluc2VydE1hdGgoY29tbWFuZCB8fCBjaGFyYWN0ZXIpXG4gICAgICAgIH0pXG59XG5cbmZ1bmN0aW9uIGluaXRNYXRoVG9vbGJhcigkdG9vbGJhciwgbWF0aEVkaXRvcikge1xuICAgICR0b29sYmFyLmZpbmQoJ1tkYXRhLWpzPVwibWF0aFRvb2xiYXJcIl0nKS5hcHBlbmQobGF0ZXhDb21tYW5kc1xuICAgICAgICAubWFwKG8gPT4gYDxidXR0b24gdGl0bGU9XCIke28uYWN0aW9ufVwiIGNsYXNzPVwibWF0aC1lZGl0b3ItYnV0dG9uXCIgZGF0YS1jb21tYW5kPVwiJHtvLmFjdGlvbn1cIiBkYXRhLWxhdGV4Y29tbWFuZD1cIiR7by5sYWJlbH1cIiBkYXRhLXVzZXdyaXRlPVwiJHtvLnVzZVdyaXRlIHx8IGZhbHNlfVwiPlxuPGltZyBzcmM9XCIvbWF0aC5zdmc/bGF0ZXg9JHtlbmNvZGVVUklDb21wb25lbnQoby5sYWJlbCA/IG8ubGFiZWwucmVwbGFjZSgvWC9nLCAnXFxcXHNxdWFyZScpIDogby5hY3Rpb24pfVwiLz5cbjwvYnV0dG9uPmApLmpvaW4oJycpXG4gICAgKS5vbignbW91c2Vkb3duJywgJ2J1dHRvbicsIGUgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgY29uc3QgZGF0YXNldCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0O1xuICAgICAgICBtYXRoRWRpdG9yLmluc2VydE1hdGgoZGF0YXNldC5jb21tYW5kLCBkYXRhc2V0LmxhdGV4Y29tbWFuZCwgZGF0YXNldC51c2V3cml0ZSA9PT0gJ3RydWUnKVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGluaXROZXdFcXVhdGlvbigkdG9vbGJhciwgbWF0aEVkaXRvciwgaGFzQW5zd2VyRm9jdXMpIHtcbiAgICAkdG9vbGJhci5maW5kKCdbZGF0YS1qcz1cIm5ld0VxdWF0aW9uXCJdJykubW91c2Vkb3duKChlID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGlmICghaGFzQW5zd2VyRm9jdXMoKSkgcmV0dXJuIC8vIFRPRE86IHJlbW92ZSB3aGVuIGJ1dHRvbiBpcyBvbmx5IHZpc2libGUgd2hlbiB0ZXh0YXJlYSBoYXMgZm9jdXNcbiAgICAgICAgbWF0aEVkaXRvci5pbnNlcnROZXdFcXVhdGlvbigpXG4gICAgfSkuYmluZCh0aGlzKSlcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge2luc2VydFRvVGV4dEFyZWFBdEN1cnNvcn1cblxuZnVuY3Rpb24gaW5zZXJ0VG9UZXh0QXJlYUF0Q3Vyc29yKGZpZWxkLCB2YWx1ZSkge1xuICAgIGNvbnN0IHN0YXJ0UG9zID0gZmllbGQuc2VsZWN0aW9uU3RhcnRcbiAgICBjb25zdCBlbmRQb3MgPSBmaWVsZC5zZWxlY3Rpb25FbmRcbiAgICBsZXQgb2xkVmFsdWUgPSBmaWVsZC52YWx1ZVxuICAgIGZpZWxkLnZhbHVlID0gb2xkVmFsdWUuc3Vic3RyaW5nKDAsIHN0YXJ0UG9zKSArIHZhbHVlICsgb2xkVmFsdWUuc3Vic3RyaW5nKGVuZFBvcywgb2xkVmFsdWUubGVuZ3RoKVxuICAgIGZpZWxkLnNlbGVjdGlvblN0YXJ0ID0gZmllbGQuc2VsZWN0aW9uRW5kID0gc3RhcnRQb3MgKyB2YWx1ZS5sZW5ndGhcbn1cbiJdfQ==
