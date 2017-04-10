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

var latexCommands = require('./latexCommands');
var specialCharacters = require('./specialCharacters');
var util = require('./util');
var sanitizeHtml = require('sanitize-html');
var sanitizeOpts = require('./sanitizeOpts');
var MQ = MathQuill.getInterface(2);
var FI = require('./FI');
var SV = require('./SV');

var keyCodes = {
    ENTER: 13,
    ESC: 27
};

var $toolbar = void 0;
var $outerPlaceholder = $('<div class="outerPlaceholder hidden">');
var mathEditor = void 0;

function moveElementAfter($element, $after) {
    $after.after($element);
}

function hideElementInDOM($element) {
    $outerPlaceholder.append($element);
}

var editor = void 0;

window.onload = function () {
    // TODO: replace with data attributes?
    var answerFocus = true;
    var latexEditorFocus = false;
    var equationEditorFocus = false;
    var mathEditorVisible = false;
    var $editor = void 0;

    $('body').append($('<link rel="stylesheet" type="text/css" href="/math-editor.css"/>')).append($outerPlaceholder);

    initToolbar();
    mathEditor = initMathEditor();

    function initMathEditor() {
        var $mathEditor = $('\n            <div class="math">\n                <div class="close" title="Ctrl-Enter">Sulje</div>\n                <div class="boxes">\n                    <div class="equationEditor"></div>\n                    <textarea class="latexEditor" placeholder="LaTex"></textarea>\n                </div>\n            </div>');

        hideElementInDOM($mathEditor);

        var $latexEditor = $mathEditor.find('.latexEditor');
        var $equationEditor = $mathEditor.find('.equationEditor');
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
            equationEditorFocus = true;
        });

        $equationEditor.find('.mq-textarea textarea ').on('focus blur', function (e) {
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
            window.document.execCommand('insertHTML', false, (optionalMarkup ? optionalMarkup : '') + '<img class="result new" style="display: none"/>');
            var $addedEquationImage = $('.result.new');
            $addedEquationImage.removeClass('new');

            moveElementAfter($mathEditor, $addedEquationImage);

            mathField.latex('');
            mathEditorVisible = true;
            $toolbar.find('.newEquation').hide();
            $toolbar.find('.mathToolbar').show();
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
            var $currentEditor = $mathEditor.closest('.answer');
            var $img = $mathEditor.prev();
            if ($latexEditor.val().trim() === '') {
                $img.remove();
            } else {
                $img.show().prop('src', '/math.svg?latex=' + encodeURIComponent($latexEditor.val())).prop('alt', $latexEditor.val());
            }

            $toolbar.find('.newEquation').show();
            $toolbar.find('.mathToolbar').hide();
            $toolbar.find('.mathToolbar').hide();
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
            $toolbar.find('.newEquation').hide();
            $toolbar.find('.mathToolbar').show();
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

    function initToolbar() {
        $toolbar = $('        \n        <div class="toolbar">\n            <div class="characters">\n                <span class="special-characters">\n                  <div class="list"></div>\n                </span>\n            </div>\n            <div class="mathToolbar list hidden"></div>\n            <p>\n                <button class="newEquation actionButton" title="Ctrl-L">Lis\xE4\xE4 kaava</button>\n            </p>\n        </div>\n        ');

        hideElementInDOM($toolbar);

        initSpecialCharacterToolbar();
        initMathToolbar();
        initNewEquation();

        function initMathToolbar() {
            $toolbar.find('.mathToolbar.list').append(latexCommands.map(function (o) {
                return '<button title="' + o.action + '" data-command="' + o.action + '" data-latexcommand="' + o.label + '" data-usewrite="' + (o.useWrite || false) + '">\n<img src="/math.svg?latex=' + encodeURIComponent(o.label ? o.label.replace(/X/g, '\\square') : o.action) + '"/>\n</button>';
            }).join('')).on('mousedown', 'button', function (e) {
                e.preventDefault();
                var dataset = e.currentTarget.dataset;
                mathEditor.insertMath(dataset.command, dataset.latexcommand, dataset.usewrite === 'true');
            });
        }

        function initSpecialCharacterToolbar() {
            $toolbar.find('.characters .list').append(specialCharacters.map(function (char) {
                return '<span class="button" ' + (char.latexCommand ? 'data-command="' + char.latexCommand + '"' : '') + '>' + char.character + '</span>';
            })).on('mousedown', '.button', function (e) {
                e.preventDefault();
                var character = e.currentTarget.innerText;
                var command = e.currentTarget.dataset.command;
                if (answerFocus) window.document.execCommand('insertText', false, character);else mathEditor.insertMath(command || character);
            });
        }

        function initNewEquation() {
            $toolbar.find('.newEquation').mousedown(function (e) {
                e.preventDefault();
                if (!answerFocus) return; // TODO: remove when button is only visible when textarea has focus
                mathEditor.insertNewEquation();
            }.bind(this));
        }
    }

    function openEditor($element) {
        $editor = $element;
        $element.before($toolbar);
        $toolbar.show();
    }

    function closeEditor() {
        // TODO: remove event bindings
        $toolbar.find('.mathToolbar').hide();
        hideElementInDOM($toolbar);
        mathEditor.closeMathEditor();
        // $editor.off()

        answerFocus = false;
        mathEditorVisible = false;
        latexEditorFocus = false;
    }

    var blurred = void 0;
    function onFocusChanged(e) {
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
        onFocusChanged: onFocusChanged,
        isMathEditorVisible: isMathEditorVisible,
        openMathEditor: mathEditor.openMathEditor,
        closeMathEditor: mathEditor.closeMathEditor,
        insertNewEquation: mathEditor.insertNewEquation
    };
};

var markAndGetInlineImages = function markAndGetInlineImages($editor) {
    return $editor.find('img[src^="data"]').each(function (i, el) {
        return el.setAttribute('id', new Date().getTime() + '-' + i);
    }).map(function (i, el) {
        return { data: el.getAttribute('src'), id: el.getAttribute('id') };
    }).toArray();
};

var persistInlineImages = function persistInlineImages($editor) {
    return Bacon.combineAsArray(markAndGetInlineImages($editor).map(function (data) {
        return Bacon.fromPromise($.post({
            url: '/saveImg',
            data: {
                text: data.data,
                id: data.id,
                answerId: $editor.attr('id')
            }
        }));
    })).flatMap(function (results) {
        console.log(results);
        results.forEach(function (id) {
            $editor.find('#' + id).attr('src', '/loadImg?id=' + id);
        });
    }).onValue(function () {
        return $editor.trigger('input');
    });
};

var makeRichText = function makeRichText(selector) {
    var onValueChanged = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

    $(selector).each(function (i, element) {
        var $editor = $(element);
        $editor.attr('contenteditable', 'true');
        $editor.attr('data-js-handle', 'answer');

        $editor.on('keydown', function (e) {
            if (!e.altKey && !e.shiftKey && (e.ctrlKey && e.keyCode === keyCodes.ENTER || !e.ctrlKey && e.keyCode === keyCodes.ESC)) mathEditor.closeMathEditor(true);
        }).on('mousedown', '.result', function (e) {
            // TODO: open editor if clicked on equation in another editor
            editor.openMathEditor($(e.target));
        }).on('keypress', function (e) {
            if (e.ctrlKey && !e.altKey && !e.shiftKey) {
                if (e.key === 'l' || e.key === 'i') editor.insertNewEquation();else if (e.key === 's') onValueChanged($editor);
            }
        }).on('focus blur', function (e) {
            if (editor.isMathEditorVisible() && e.type === 'focus') editor.closeMathEditor();
            //answerFocus = e.type === 'focus'
        }).on('paste', function (e) {
            if (e.target.tagName === 'TEXTAREA') return;

            var reader = new FileReader();
            var clipboardData = e.originalEvent.clipboardData;
            var file = clipboardData.items && clipboardData.items[0].getAsFile();
            if (file) {
                e.preventDefault();
                reader.readAsDataURL(file);
            } else {
                var clipboardDataAsHtml = clipboardData.getData('text/html');
                if (clipboardDataAsHtml) {
                    e.preventDefault();
                    window.document.execCommand('insertHTML', false, sanitizeHtml(clipboardDataAsHtml, sanitizeOpts));
                    persistInlineImages($editor);
                    // TODO: call autosave?
                }
            }

            reader.onload = function (evt) {
                var img = '<img src="' + evt.target.result + '"/>';
                window.document.execCommand('insertHTML', false, sanitizeHtml(img, sanitizeOpts));
                persistInlineImages($editor);
                // TODO: call autosave?
            };
        });

        $editor.on('blur focus', function (e) {
            return editor.onFocusChanged(e);
        });
        $editor.on('input focus', function (e) {
            return onValueChanged($(e.currentTarget));
        });
    });
};

module.exports = {
    makeRichText: makeRichText
};

},{"./FI":1,"./SV":2,"./latexCommands":3,"./sanitizeOpts":5,"./specialCharacters":6,"./util":7,"sanitize-html":undefined}],5:[function(require,module,exports){
'use strict';

module.exports = {
    allowedTags: ['div', 'img', 'br'],
    allowedAttributes: {
        img: ['src', 'class', 'alt']
    },
    allowedSchemes: ['http', 'https', 'data']
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvRkkuanMiLCJhcHAvU1YuanMiLCJhcHAvbGF0ZXhDb21tYW5kcy5qcyIsImFwcC9tYXRoLWVkaXRvci5qcyIsImFwcC9zYW5pdGl6ZU9wdHMuanMiLCJhcHAvc3BlY2lhbENoYXJhY3RlcnMuanMiLCJhcHAvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsWUFBUTtBQUNKLG9CQUFZLGdCQURSO0FBRUosZUFBTyx5Q0FGSDtBQUdKLGtoQkFISTtBQVdKLHFEQVhJO0FBWUosNGRBWkk7QUF1Qkosb0JBQVksVUF2QlI7QUF3QkosMkJBQW1CLGVBeEJmO0FBeUJKLHdCQUFnQixhQXpCWjtBQTBCSixlQUFPLE9BMUJIO0FBMkJKLGNBQU0sVUEzQkY7QUE0QkosaUJBQVMsWUE1Qkw7QUE2Qkosc0JBQWMsbUJBN0JWO0FBOEJKLGtCQUFVLEtBOUJOO0FBK0JKLG1CQUFXO0FBL0JQLEtBREs7QUFrQ2IsZ0JBQVk7QUFDUixzQkFBYyxtQkFETjtBQUVSLGlCQUFTLFlBRkQ7QUFHUixvQkFBWSxnQkFISjtBQUlSLGVBQU8sV0FKQztBQUtSLGtCQUFVLEdBTEY7QUFNUix1QkFBZSxzQkFOUDtBQU9SLGNBQU0sb0JBUEU7QUFRUixrQkFBVSxlQVJGO0FBU1IsbUJBQVc7QUFUSDtBQWxDQyxDQUFqQjs7Ozs7QUNBQSxPQUFPLE9BQVAsR0FBaUI7QUFDYixZQUFRO0FBQ0osb0JBQVksaUJBRFI7QUFFSixlQUFPLDBDQUZIO0FBR0osNmhCQUhJO0FBUUosd0RBUkk7QUFTSixnWEFUSTtBQWtCSixvQkFBWSxVQWxCUjtBQW1CSiwyQkFBbUIsZUFuQmY7QUFvQkosd0JBQWdCLGtCQXBCWjtBQXFCSixlQUFPLE9BckJIO0FBc0JKLGNBQU0sT0F0QkY7QUF1QkosaUJBQVMsWUF2Qkw7QUF3Qkosc0JBQWMsaUJBeEJWO0FBeUJKLGtC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TSxTQUFTLE1BQU0sWUFBckI7QUFDQSxRQUFJLFdBQVcsTUFBTSxLQUFyQjtBQUNBLFVBQU0sS0FBTixHQUFjLFNBQVMsU0FBVCxDQUFtQixDQUFuQixFQUFzQixRQUF0QixJQUFrQyxLQUFsQyxHQUEwQyxTQUFTLFNBQVQsQ0FBbUIsTUFBbkIsRUFBMkIsU0FBUyxNQUFwQyxDQUF4RDtBQUNBLFVBQU0sY0FBTixHQUF1QixNQUFNLFlBQU4sR0FBcUIsV0FBVyxNQUFNLE1BQTdEO0FBQ0giLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZWRpdG9yOiB7XG4gICAgICAgIG1hdGhFZGl0b3I6ICdNYXRpa2thZWRpdG9yaScsXG4gICAgICAgIHRpdGxlOiAnS2FhdmFlZGl0b3JpbiBlbnNpbW3DpGluZW4ga2VoaXR5c3ZlcnNpbycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBgPHVsPlxuPGxpPkVkaXRvcmkgdG9pbWlpIHBhcmhhaXRlbiBGaXJlZm94LXNlbGFpbWVsbGEuPC9saT5cbjxsaT7igJxMaXPDpMOkIGthYXZh4oCdIC1uYXBpbiBhbHRhIGzDtnlkw6R0IHlsZWlzaW1wacOkIG1hdGVtYXRpaWthc3NhLCBmeXNpaWthc3NhIGphXG5rZW1pYXNzYSBrw6R5dGV0dMOkdmnDpCBtZXJraW50w7Zqw6QuIExpc8Oka3NpIGVyaWtvaXNtZXJra2Vqw6Qgdm9pIGvDpHl0dMOkw6Qga2FhdmFuIGtpcmpvaXR0YW1pc2Vlbi48L2xpPlxuIDxsaT5LYWF2b2phIHZvaSByYWtlbnRhYVxua2xpa2thYW1hbGxhIHZhbGlrb24gbWVya2ludMO2asOkIGphL3RhaSBraXJqb2l0dGFtYWxsYSBMYVRlWGlhLjwvbGk+XG4gPGxpPkVkaXRvcmluIHZhc3RhdXNrZW50dMOkw6RuIHZvaSBraXJqb2l0dGFhIHRla3N0acOkIGphIGthYXZvamEgc2Vrw6Rcbmxpc8OkdMOkIGt1dmlhLjwvbGk+PC91bD5gLFxuICAgICAgICBzaG9ydGN1dFRpdGxlOiBgUGlrYW7DpHBww6RpbnZpbmtrZWrDpGAsXG4gICAgICAgIHNob3J0Y3V0czogYDx0YWJsZT48dGJvZHk+XG48dHI+PHRoPkxpaXTDpCBrdXZhIGxlaWtlcMO2eWTDpGx0w6Q8L3RoPjx0ZD5DdHJsLVY8L3RkPjwvdHI+XG48dHI+PHRoPktpcmpvaXRhIGthYXZhPC90aD48dGQ+Q3RybC1MIHRhaSBDdHJsLUk8L3RkPjwvdHI+XG48dHI+PHRoIGNvbHNwYW49XCIyXCI+S2FhdmFzc2E8L3RoPjwvdHI+XG48dHI+PHRoPkpha292aWl2YTwvdGg+PHRkPi88L3RkPjwvdHI+XG48dHI+PHRoPktlcnRvbWVya2tpPC90aD48dGQ+KjwvdGQ+PC90cj5cbjx0cj48dGg+RWtzcG9uZW50dGk8L3RoPjx0ZD5ePC90ZD48L3RyPlxuPHRyPjx0aD5TdWxqZSBrYWF2YTwvdGg+PHRkPkN0cmwtRW50ZXIgdGFpIEVzYzwvdGQ+PC90cj5cbjx0cj48dGg+TGlzw6TDpCBrYWF2YSBzZXVyYWF2YWxsZSByaXZpbGxlPC90aD48dGQ+RW50ZXI8L3RkPjwvdHI+XG48L3Rib2R5PlxuPC90YWJsZT5gLFxuICAgICAgICBmb3JtYXR0aW5nOiAnTXVvdG9pbHUnLFxuICAgICAgICBzcGVjaWFsQ2hhcmFjdGVyczogJ0VyaWtvaXNtZXJraXQnLFxuICAgICAgICBpbnNlcnRFcXVhdGlvbjogJ0xpc8Okw6Qga2FhdmEnLFxuICAgICAgICBjbG9zZTogJ3N1bGplJyxcbiAgICAgICAgc2F2ZTogJ1RhbGxlbm5hJyxcbiAgICAgICAgdXBkYXRlZDogJ1DDpGl2aXRldHR5JyxcbiAgICAgICAgc2VuZEZlZWRiYWNrOiAnTMOkaGV0w6QgcGFsYXV0ZXR0YScsXG4gICAgICAgIGxhbmdMaW5rOiAnL3N2JyxcbiAgICAgICAgbGFuZ0xhYmVsOiAnUMOlIHN2ZW5za2EnXG4gICAgfSxcbiAgICBhbm5vdGF0aW5nOiB7XG4gICAgICAgIHNlbmRGZWVkYmFjazogJ0zDpGhldMOkIHBhbGF1dGV0dGEnLFxuICAgICAgICB1cGRhdGVkOiAnUMOkaXZpdGV0dHknLFxuICAgICAgICBtYXRoRWRpdG9yOiAnTWF0aWtrYWVkaXRvcmknLFxuICAgICAgICB0aXRsZTogJ1Rhcmtpc3R1cycsXG4gICAgICAgIGJhY2tMaW5rOiAnLycsXG4gICAgICAgIGJhY2tMaW5rTGFiZWw6ICdQYWxhYSBrYWF2YWVkaXRvcmlpbicsXG4gICAgICAgIHNhdmU6ICdUYWxsZW5uYSBtZXJraW5uw6R0JyxcbiAgICAgICAgbGFuZ0xpbms6ICcvc3YvYmVkb21uaW5nJyxcbiAgICAgICAgbGFuZ0xhYmVsOiAnUMOlIHN2ZW5za2EnXG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZWRpdG9yOiB7XG4gICAgICAgIG1hdGhFZGl0b3I6ICdNYXRlbWF0aWtlZGl0b3InLFxuICAgICAgICB0aXRsZTogJ0Zvcm1lbGVkaXRvcm5zIGbDtnJzdGEgdXR2ZWNrbGluZ3N2ZXJzaW9uJyxcbiAgICAgICAgZGVzY3JpcHRpb246IGA8dWw+XG48bGk+RWRpdG9ybiBmdW5nZXJhciBiw6RzdCBtZWQgYnJvd3Nlcm4gRmlyZWZveC48L2xpPlxuIDxsaT5VbmRlciBrbmFwcGVuIOKAnEzDpGdnIHRpbGwgZm9ybWVs4oCdIGhpdHRhciBkdSBkZSB2YW5saWdhc3RlIGJldGVja25pbmdhcm5hIHNvbSBhbnbDpG5kcyBpIG1hdGVtYXRpaywgZnlzaWsgb2NoIGtlbWkuIERlc3N1dG9tIGthbiBkdSBhbnbDpG5kYSBzcGVjaWFsdGVja2VuIGbDtnIgYXR0IHNrcml2YSBmb3JtbGVyLjwvbGk+XG48bGk+RGV0IGfDpXIgYXR0IGtvbnN0cnVlcmEgZm9ybWxlciBnZW5vbSBhdHQga2xpY2thIHDDpSBiZXRlY2tuaW5nYXJuYSBpIG1lbnllcm5hIG9jaC9lbGxlciBnZW5vbSBhdHQgc2tyaXZhIExhVGVYLjwvbGk+XG48bGk+RGV0IGfDpXIgZsO2cnV0b20gYXR0IHNrcml2YSB0ZXh0IG9jaCBmb3JtbGVyLCBhdHQgb2Nrc8OlIGF0dCBsw6RnZ2EgdGlsbCBiaWxkZXIgaSBzdmFyc2bDpGx0ZXQuPC9saT48L3VsPmAsXG4gICAgICAgIHNob3J0Y3V0VGl0bGU6IGBUaXBzIHDDpSB0YW5nZW50a29tYmluYXRpb25lcmAsXG4gICAgICAgIHNob3J0Y3V0czogYDx0YWJsZT48dGJvZHk+XG48dHI+PHRoPkzDpGdnIHRpbGwgZW4gYmlsZCBmcsOlbiBrbGlwcGJvcmRldDwvdGg+PHRkPkN0cmwtVjwvdGQ+PC90cj5cbjx0cj48dGg+U2tyaXYgZW4gZm9ybWVsPC90aD48dGQ+Q3RybC1MIC8gQ3RybC1JPC90ZD48L3RyPlxuPHRyPjx0aCBjb2xzcGFuPVwiMlwiPjwvdGg+PC90cj5cbjx0cj48dGg+QnLDpWtzdHJlY2s8L3RoPjx0ZD4vPC90ZD48L3RyPlxuPHRyPjx0aD5NdWx0aXBsaWthdGlvbnN0ZWNrZW48L3RoPjx0ZD4qPC90ZD48L3RyPlxuPHRyPjx0aD5TdMOkbmc8L3RoPjx0ZD5DdHJsLUVudGVyIC8gRXNjPC90ZD48L3RyPlxuPC90Ym9keT5cbjwvdGFibGU+YCxcbiAgICAgICAgZm9ybWF0dGluZzogJ011b3RvaWx1JyxcbiAgICAgICAgc3BlY2lhbENoYXJhY3RlcnM6ICdTcGVjaWFsdGVja2VuJyxcbiAgICAgICAgaW5zZXJ0RXF1YXRpb246ICdMw6RnZyB0aWxsIGZvcm1lbCcsXG4gICAgICAgIGNsb3NlOiAnc3TDpG5nJyxcbiAgICAgICAgc2F2ZTogJ1NwYXJhJyxcbiAgICAgICAgdXBkYXRlZDogJ1VwcGRhdGVyYWQnLFxuICAgICAgICBzZW5kRmVlZGJhY2s6ICdTa2lja2EgZmVlZGJhY2snLFxuICAgICAgICBsYW5nTGluazogJy8nLFxuICAgICAgICBsYW5nTGFiZWw6ICdTdW9tZWtzaSdcbiAgICB9LFxuICAgIGFubm90YXRpbmc6IHtcbiAgICAgICAgc2VuZEZlZWRiYWNrOiAnU2tpY2thIHJlc3BvbnMnLFxuICAgICAgICB1cGRhdGVkOiAnVXBwZGF0ZXJhZCcsXG4gICAgICAgIG1hdGhFZGl0b3I6ICdNYXRlbWF0aWtlZGl0b3InLFxuICAgICAgICB0aXRsZTogJ0tvbnRyb2xsJyxcbiAgICAgICAgYmFja0xpbms6ICcvc3YnLFxuICAgICAgICBiYWNrTGlua0xhYmVsOiAnTWF0ZW1hdGlrZWRpdG9yJyxcbiAgICAgICAgc2F2ZTogJ1NwYXJhIGFudGVja25pbmdhcicsXG4gICAgICAgIGxhbmdMaW5rOiAnL3Rhcmtpc3R1cycsXG4gICAgICAgIGxhbmdMYWJlbDogJ1N1b21la3NpJ1xuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuICAgIHthY3Rpb246ICdcXFxcc3FydCcsIGxhYmVsOiAnXFxcXHNxcnR7WH0nfSxcbiAgICB7YWN0aW9uOiAnXicsIGxhYmVsOiAneF57WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGZyYWMnLCBsYWJlbDogJ1xcXFxmcmFje1h9e1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxpbnQnLCBsYWJlbDogJ1xcXFxpbnRfe1h9XntYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcbGltXycsIGxhYmVsOiAnXFxcXGxpbV97WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXG92ZXJyaWdodGFycm93JywgbGFiZWw6ICdcXFxcb3ZlcnJpZ2h0YXJyb3d7WH0nfSxcbiAgICB7YWN0aW9uOiAnXycsIGxhYmVsOiAneF9YJ30sXG4gICAge2FjdGlvbjogJ1xcXFxudGhyb290JywgbGFiZWw6ICdcXFxcc3FydFtYXXtYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcc3VtJywgbGFiZWw6ICdcXFxcc3VtX3tYfV57WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGJpbm9tJywgbGFiZWw6ICdcXFxcYmlub217WH17WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXHNpbid9LFxuICAgIHthY3Rpb246ICdcXFxcY29zJ30sXG4gICAge2FjdGlvbjogJ1xcXFx0YW4nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGFyY3Npbid9LFxuICAgIHthY3Rpb246ICdcXFxcYXJjY29zJ30sXG4gICAge2FjdGlvbjogJ1xcXFxhcmN0YW4nfSxcbiAgICB7YWN0aW9uOiAnXFxcXHZlYycsIGxhYmVsOiAnXFxcXHZlY3tYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcYmFyJywgbGFiZWw6ICdcXFxcYmFye1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFx1bmRlcmxpbmUnLCBsYWJlbDogJ1xcXFx1bmRlcmxpbmV7WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXG92ZXJsZWZ0YXJyb3cnLCBsYWJlbDogJ1xcXFxvdmVybGVmdGFycm93e1h9J30sXG4gICAge2FjdGlvbjogJ3wnLCBsYWJlbDogJ3xYfCd9LFxuICAgIHthY3Rpb246ICcoJywgbGFiZWw6ICcoWCknfSxcbiAgICB7YWN0aW9uOiAnX3sgfV57IH0gJywgbGFiZWw6ICdfe1h9XntYfVgnLCB1c2VXcml0ZTogdHJ1ZX1cbl1cbiIsImNvbnN0IGxhdGV4Q29tbWFuZHMgPSByZXF1aXJlKCcuL2xhdGV4Q29tbWFuZHMnKVxuY29uc3Qgc3BlY2lhbENoYXJhY3RlcnMgPSByZXF1aXJlKCcuL3NwZWNpYWxDaGFyYWN0ZXJzJylcbmNvbnN0IHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKVxuY29uc3Qgc2FuaXRpemVIdG1sID0gcmVxdWlyZSgnc2FuaXRpemUtaHRtbCcpXG5jb25zdCBzYW5pdGl6ZU9wdHMgPSByZXF1aXJlKCcuL3Nhbml0aXplT3B0cycpXG5jb25zdCBNUSA9IE1hdGhRdWlsbC5nZXRJbnRlcmZhY2UoMilcbmNvbnN0IEZJID0gcmVxdWlyZSgnLi9GSScpXG5jb25zdCBTViA9IHJlcXVpcmUoJy4vU1YnKVxuXG5jb25zdCBrZXlDb2RlcyA9IHtcbiAgICBFTlRFUjogMTMsXG4gICAgRVNDOiAgIDI3XG59XG5cbmxldCAkdG9vbGJhclxuY29uc3QgJG91dGVyUGxhY2Vob2xkZXIgPSAkKGA8ZGl2IGNsYXNzPVwib3V0ZXJQbGFjZWhvbGRlciBoaWRkZW5cIj5gKVxubGV0IG1hdGhFZGl0b3JcblxuZnVuY3Rpb24gbW92ZUVsZW1lbnRBZnRlcigkZWxlbWVudCwgJGFmdGVyKSB7XG4gICAgJGFmdGVyLmFmdGVyKCRlbGVtZW50KVxufVxuXG5mdW5jdGlvbiBoaWRlRWxlbWVudEluRE9NKCRlbGVtZW50KSB7XG4gICAgJG91dGVyUGxhY2Vob2xkZXIuYXBwZW5kKCRlbGVtZW50KVxufVxuXG5sZXQgZWRpdG9yXG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgLy8gVE9ETzogcmVwbGFjZSB3aXRoIGRhdGEgYXR0cmlidXRlcz9cbiAgICBsZXQgYW5zd2VyRm9jdXMgPSB0cnVlXG4gICAgbGV0IGxhdGV4RWRpdG9yRm9jdXMgPSBmYWxzZVxuICAgIGxldCBlcXVhdGlvbkVkaXRvckZvY3VzID0gZmFsc2VcbiAgICBsZXQgbWF0aEVkaXRvclZpc2libGUgPSBmYWxzZVxuICAgIGxldCAkZWRpdG9yXG5cbiAgICAkKCdib2R5JylcbiAgICAgICAgLmFwcGVuZCgkKCc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIi9tYXRoLWVkaXRvci5jc3NcIi8+JykpXG4gICAgICAgIC5hcHBlbmQoJG91dGVyUGxhY2Vob2xkZXIpXG5cbiAgICBpbml0VG9vbGJhcigpXG4gICAgbWF0aEVkaXRvciA9IGluaXRNYXRoRWRpdG9yKClcblxuICAgIGZ1bmN0aW9uIGluaXRNYXRoRWRpdG9yKCkge1xuICAgICAgICBjb25zdCAkbWF0aEVkaXRvciA9ICQoYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1hdGhcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2xvc2VcIiB0aXRsZT1cIkN0cmwtRW50ZXJcIj5TdWxqZTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib3hlc1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXF1YXRpb25FZGl0b3JcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwibGF0ZXhFZGl0b3JcIiBwbGFjZWhvbGRlcj1cIkxhVGV4XCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PmApXG5cbiAgICAgICAgaGlkZUVsZW1lbnRJbkRPTSgkbWF0aEVkaXRvcilcblxuICAgICAgICBjb25zdCAkbGF0ZXhFZGl0b3IgPSAkbWF0aEVkaXRvci5maW5kKCcubGF0ZXhFZGl0b3InKVxuICAgICAgICBjb25zdCAkZXF1YXRpb25FZGl0b3IgPSAkbWF0aEVkaXRvci5maW5kKCcuZXF1YXRpb25FZGl0b3InKVxuICAgICAgICBjb25zdCBtYXRoRmllbGQgPSBNUS5NYXRoRmllbGQoJGVxdWF0aW9uRWRpdG9yLmdldCgwKSwge1xuICAgICAgICAgICAgaGFuZGxlcnM6IHtcbiAgICAgICAgICAgICAgICBlZGl0OiAoKSA9PiAhbGF0ZXhFZGl0b3JGb2N1cyAmJiAkbGF0ZXhFZGl0b3IudmFsKG1hdGhGaWVsZC5sYXRleCgpKSxcbiAgICAgICAgICAgICAgICBlbnRlcjogZmllbGQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkbyBub3QgY2xvc2UgZWRpdG9yIC8gbyBub3QgY3JlYXRlIGEgbmV3IGVxdWF0aW9uIGlmIHRoZXJlIGlzIG5vIHRleHQ/XG4gICAgICAgICAgICAgICAgICAgIG1hdGhFZGl0b3IuY2xvc2VNYXRoRWRpdG9yKHRydWUpXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gaW5zZXJ0TmV3RXF1YXRpb24oJzxkaXY+PC9kaXY+JyksIDIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgICRlcXVhdGlvbkVkaXRvci5vbignZm9jdXMgbW91c2Vkb3duJywgZSA9PiB7XG4gICAgICAgICAgICBlcXVhdGlvbkVkaXRvckZvY3VzID0gdHJ1ZVxuICAgICAgICB9KVxuXG4gICAgICAgICRlcXVhdGlvbkVkaXRvci5maW5kKCcubXEtdGV4dGFyZWEgdGV4dGFyZWEgJykub24oJ2ZvY3VzIGJsdXInLCBlID0+IHtcbiAgICAgICAgICAgIGVxdWF0aW9uRWRpdG9yRm9jdXMgPSBlLnR5cGUgIT09ICdibHVyJ1xuICAgICAgICAgICAgb25Gb2N1c0NoYW5nZWQoKVxuICAgICAgICB9KVxuXG4gICAgICAgIGZ1bmN0aW9uIG9uTGF0ZXhVcGRhdGUoKSB7IHNldFRpbWVvdXQoKCkgPT4gbWF0aEZpZWxkLmxhdGV4KCRsYXRleEVkaXRvci52YWwoKSksIDEpIH1cblxuICAgICAgICAkbGF0ZXhFZGl0b3JcbiAgICAgICAgICAgIC5rZXl1cChvbkxhdGV4VXBkYXRlKVxuICAgICAgICAgICAgLm9uKCdmb2N1cyBibHVyJywgZSA9PiB7XG4gICAgICAgICAgICAgICAgbGF0ZXhFZGl0b3JGb2N1cyA9IGUudHlwZSAhPT0gJ2JsdXInXG4gICAgICAgICAgICAgICAgb25Gb2N1c0NoYW5nZWQoKVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAkbWF0aEVkaXRvci5maW5kKCcuY2xvc2UnKS5tb3VzZWRvd24oZSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgIGNsb3NlTWF0aEVkaXRvcih0cnVlKVxuICAgICAgICB9KVxuXG4gICAgICAgIGxldCBmb2N1c0NoYW5nZWQgPSBudWxsXG4gICAgICAgIGZ1bmN0aW9uIG9uRm9jdXNDaGFuZ2VkKCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGZvY3VzQ2hhbmdlZClcbiAgICAgICAgICAgIGZvY3VzQ2hhbmdlZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghbGF0ZXhFZGl0b3JGb2N1cyAmJiAhZXF1YXRpb25FZGl0b3JGb2N1cykgY2xvc2VNYXRoRWRpdG9yKClcbiAgICAgICAgICAgICAgICBpZiAoIWFuc3dlckZvY3VzICYmICFtYXRoRWRpdG9yVmlzaWJsZSAmJiAhbGF0ZXhFZGl0b3JGb2N1cyAmJiAhZXF1YXRpb25FZGl0b3JGb2N1cykgY2xvc2VFZGl0b3IoKVxuICAgICAgICAgICAgfSwgMClcblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaW5zZXJ0TmV3RXF1YXRpb24ob3B0aW9uYWxNYXJrdXApIHtcbiAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0SFRNTCcsIGZhbHNlLCAob3B0aW9uYWxNYXJrdXAgPyBvcHRpb25hbE1hcmt1cCA6ICcnKSArICc8aW1nIGNsYXNzPVwicmVzdWx0IG5ld1wiIHN0eWxlPVwiZGlzcGxheTogbm9uZVwiLz4nKTtcbiAgICAgICAgICAgIGNvbnN0ICRhZGRlZEVxdWF0aW9uSW1hZ2UgPSAkKCcucmVzdWx0Lm5ldycpXG4gICAgICAgICAgICAkYWRkZWRFcXVhdGlvbkltYWdlXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCduZXcnKVxuXG4gICAgICAgICAgICBtb3ZlRWxlbWVudEFmdGVyKCRtYXRoRWRpdG9yLCAkYWRkZWRFcXVhdGlvbkltYWdlKVxuXG4gICAgICAgICAgICBtYXRoRmllbGQubGF0ZXgoJycpXG4gICAgICAgICAgICBtYXRoRWRpdG9yVmlzaWJsZSA9IHRydWVcbiAgICAgICAgICAgICR0b29sYmFyLmZpbmQoJy5uZXdFcXVhdGlvbicpLmhpZGUoKVxuICAgICAgICAgICAgJHRvb2xiYXIuZmluZCgnLm1hdGhUb29sYmFyJykuc2hvdygpXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IG1hdGhGaWVsZC5mb2N1cygpLCAwKVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaW5zZXJ0TWF0aChzeW1ib2wsIGFsdGVybmF0aXZlU3ltYm9sLCB1c2VXcml0ZSkge1xuICAgICAgICAgICAgaWYobGF0ZXhFZGl0b3JGb2N1cykge1xuICAgICAgICAgICAgICAgIHV0aWwuaW5zZXJ0VG9UZXh0QXJlYUF0Q3Vyc29yKCRsYXRleEVkaXRvci5nZXQoMCksIGFsdGVybmF0aXZlU3ltYm9sIHx8IHN5bWJvbClcbiAgICAgICAgICAgICAgICBvbkxhdGV4VXBkYXRlKClcbiAgICAgICAgICAgIH0gZWxzZSBpZihlcXVhdGlvbkVkaXRvckZvY3VzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZVdyaXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hdGhGaWVsZC53cml0ZShzeW1ib2wpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbWF0aEZpZWxkLnR5cGVkVGV4dChzeW1ib2wpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoc3ltYm9sLnN0YXJ0c1dpdGgoJ1xcXFwnKSkgbWF0aEZpZWxkLmtleXN0cm9rZSgnVGFiJylcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IG1hdGhGaWVsZC5mb2N1cygpLCAwKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2xvc2VNYXRoRWRpdG9yKHNldEZvY3VzQWZ0ZXJDbG9zZSA9IGZhbHNlKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiByZW1vdmUgZXZlbnQgYmluZGluZ3NcbiAgICAgICAgICAgIGNvbnN0ICRjdXJyZW50RWRpdG9yID0gJG1hdGhFZGl0b3IuY2xvc2VzdCgnLmFuc3dlcicpXG4gICAgICAgICAgICBjb25zdCAkaW1nID0gJG1hdGhFZGl0b3IucHJldigpXG4gICAgICAgICAgICBpZigkbGF0ZXhFZGl0b3IudmFsKCkudHJpbSgpID09PSAnJykge1xuICAgICAgICAgICAgICAgICRpbWcucmVtb3ZlKClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGltZy5zaG93KClcbiAgICAgICAgICAgICAgICAgICAgLnByb3AoJ3NyYycsICcvbWF0aC5zdmc/bGF0ZXg9JyArIGVuY29kZVVSSUNvbXBvbmVudCgkbGF0ZXhFZGl0b3IudmFsKCkpKVxuICAgICAgICAgICAgICAgICAgICAucHJvcCgnYWx0JywgJGxhdGV4RWRpdG9yLnZhbCgpKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkdG9vbGJhci5maW5kKCcubmV3RXF1YXRpb24nKS5zaG93KClcbiAgICAgICAgICAgICR0b29sYmFyLmZpbmQoJy5tYXRoVG9vbGJhcicpLmhpZGUoKVxuICAgICAgICAgICAgJHRvb2xiYXIuZmluZCgnLm1hdGhUb29sYmFyJykuaGlkZSgpXG4gICAgICAgICAgICBoaWRlRWxlbWVudEluRE9NKCRtYXRoRWRpdG9yKVxuICAgICAgICAgICAgbWF0aEVkaXRvclZpc2libGUgPSBmYWxzZVxuICAgICAgICAgICAgbGF0ZXhFZGl0b3JGb2N1cyA9IGZhbHNlXG4gICAgICAgICAgICBlcXVhdGlvbkVkaXRvckZvY3VzID0gZmFsc2VcbiAgICAgICAgICAgIGlmIChzZXRGb2N1c0FmdGVyQ2xvc2UpICRjdXJyZW50RWRpdG9yLmZvY3VzKClcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG9wZW5NYXRoRWRpdG9yKCRpbWcpIHtcbiAgICAgICAgICAgIGlmIChtYXRoRWRpdG9yVmlzaWJsZSkgY2xvc2VNYXRoRWRpdG9yKClcbiAgICAgICAgICAgICRpbWcuaGlkZSgpXG4gICAgICAgICAgICBtb3ZlRWxlbWVudEFmdGVyKCRtYXRoRWRpdG9yLCAkaW1nKVxuICAgICAgICAgICAgY29uc3QgbGF0ZXggPSAkaW1nLnByb3AoJ2FsdCcpXG4gICAgICAgICAgICAkbGF0ZXhFZGl0b3IudmFsKGxhdGV4KVxuICAgICAgICAgICAgb25MYXRleFVwZGF0ZSgpXG4gICAgICAgICAgICBtYXRoRWRpdG9yVmlzaWJsZSA9IHRydWVcbiAgICAgICAgICAgICR0b29sYmFyLmZpbmQoJy5uZXdFcXVhdGlvbicpLmhpZGUoKVxuICAgICAgICAgICAgJHRvb2xiYXIuZmluZCgnLm1hdGhUb29sYmFyJykuc2hvdygpXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IG1hdGhGaWVsZC5mb2N1cygpLCAwKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGluc2VydE5ld0VxdWF0aW9uLFxuICAgICAgICAgICAgaW5zZXJ0TWF0aCxcbiAgICAgICAgICAgIGNsb3NlTWF0aEVkaXRvcixcbiAgICAgICAgICAgIG9wZW5NYXRoRWRpdG9yLFxuICAgICAgICAgICAgb25Gb2N1c0NoYW5nZWRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXRUb29sYmFyKCkge1xuICAgICAgICAkdG9vbGJhciA9ICQoYCAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0b29sYmFyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyc1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3BlY2lhbC1jaGFyYWN0ZXJzXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1hdGhUb29sYmFyIGxpc3QgaGlkZGVuXCI+PC9kaXY+XG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwibmV3RXF1YXRpb24gYWN0aW9uQnV0dG9uXCIgdGl0bGU9XCJDdHJsLUxcIj5MaXPDpMOkIGthYXZhPC9idXR0b24+XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBgKVxuXG4gICAgICAgIGhpZGVFbGVtZW50SW5ET00oJHRvb2xiYXIpXG5cbiAgICAgICAgaW5pdFNwZWNpYWxDaGFyYWN0ZXJUb29sYmFyKClcbiAgICAgICAgaW5pdE1hdGhUb29sYmFyKClcbiAgICAgICAgaW5pdE5ld0VxdWF0aW9uKClcblxuICAgICAgICBmdW5jdGlvbiBpbml0TWF0aFRvb2xiYXIoKSB7XG4gICAgICAgICAgICAkdG9vbGJhci5maW5kKCcubWF0aFRvb2xiYXIubGlzdCcpLmFwcGVuZChsYXRleENvbW1hbmRzXG4gICAgICAgICAgICAgICAgLm1hcChvID0+IGA8YnV0dG9uIHRpdGxlPVwiJHtvLmFjdGlvbn1cIiBkYXRhLWNvbW1hbmQ9XCIke28uYWN0aW9ufVwiIGRhdGEtbGF0ZXhjb21tYW5kPVwiJHtvLmxhYmVsfVwiIGRhdGEtdXNld3JpdGU9XCIke28udXNlV3JpdGUgfHwgZmFsc2V9XCI+XG48aW1nIHNyYz1cIi9tYXRoLnN2Zz9sYXRleD0ke2VuY29kZVVSSUNvbXBvbmVudChvLmxhYmVsID8gby5sYWJlbC5yZXBsYWNlKC9YL2csICdcXFxcc3F1YXJlJykgOiBvLmFjdGlvbil9XCIvPlxuPC9idXR0b24+YCkuam9pbignJylcbiAgICAgICAgICAgICkub24oJ21vdXNlZG93bicsICdidXR0b24nLCBlID0+IHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhc2V0ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XG4gICAgICAgICAgICAgICAgbWF0aEVkaXRvci5pbnNlcnRNYXRoKGRhdGFzZXQuY29tbWFuZCwgZGF0YXNldC5sYXRleGNvbW1hbmQsIGRhdGFzZXQudXNld3JpdGUgPT09ICd0cnVlJylcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBpbml0U3BlY2lhbENoYXJhY3RlclRvb2xiYXIoKSB7XG4gICAgICAgICAgICAkdG9vbGJhci5maW5kKCcuY2hhcmFjdGVycyAubGlzdCcpXG4gICAgICAgICAgICAgICAgLmFwcGVuZChzcGVjaWFsQ2hhcmFjdGVycy5tYXAoY2hhciA9PiBgPHNwYW4gY2xhc3M9XCJidXR0b25cIiAke2NoYXIubGF0ZXhDb21tYW5kID8gYGRhdGEtY29tbWFuZD1cIiR7Y2hhci5sYXRleENvbW1hbmR9XCJgIDogJyd9PiR7Y2hhci5jaGFyYWN0ZXJ9PC9zcGFuPmApKVxuICAgICAgICAgICAgICAgIC5vbignbW91c2Vkb3duJywgJy5idXR0b24nLCBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoYXJhY3RlciA9IGUuY3VycmVudFRhcmdldC5pbm5lclRleHRcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tbWFuZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmNvbW1hbmRcbiAgICAgICAgICAgICAgICAgICAgaWYoYW5zd2VyRm9jdXMpIHdpbmRvdy5kb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0VGV4dCcsIGZhbHNlLCBjaGFyYWN0ZXIpXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgbWF0aEVkaXRvci5pbnNlcnRNYXRoKGNvbW1hbmQgfHwgY2hhcmFjdGVyKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBpbml0TmV3RXF1YXRpb24oKSB7XG4gICAgICAgICAgICAkdG9vbGJhci5maW5kKCcubmV3RXF1YXRpb24nKS5tb3VzZWRvd24oKGUgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgIGlmICghYW5zd2VyRm9jdXMpIHJldHVybiAvLyBUT0RPOiByZW1vdmUgd2hlbiBidXR0b24gaXMgb25seSB2aXNpYmxlIHdoZW4gdGV4dGFyZWEgaGFzIGZvY3VzXG4gICAgICAgICAgICAgICAgbWF0aEVkaXRvci5pbnNlcnROZXdFcXVhdGlvbigpXG4gICAgICAgICAgICB9KS5iaW5kKHRoaXMpKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb3BlbkVkaXRvcigkZWxlbWVudCkge1xuICAgICAgICAkZWRpdG9yID0gJGVsZW1lbnRcbiAgICAgICAgJGVsZW1lbnQuYmVmb3JlKCR0b29sYmFyKVxuICAgICAgICAkdG9vbGJhci5zaG93KClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZUVkaXRvcigpIHtcbiAgICAgICAgLy8gVE9ETzogcmVtb3ZlIGV2ZW50IGJpbmRpbmdzXG4gICAgICAgICR0b29sYmFyLmZpbmQoJy5tYXRoVG9vbGJhcicpLmhpZGUoKVxuICAgICAgICBoaWRlRWxlbWVudEluRE9NKCR0b29sYmFyKVxuICAgICAgICBtYXRoRWRpdG9yLmNsb3NlTWF0aEVkaXRvcigpXG4gICAgICAgIC8vICRlZGl0b3Iub2ZmKClcblxuICAgICAgICBhbnN3ZXJGb2N1cyA9IGZhbHNlXG4gICAgICAgIG1hdGhFZGl0b3JWaXNpYmxlID0gZmFsc2VcbiAgICAgICAgbGF0ZXhFZGl0b3JGb2N1cyA9IGZhbHNlXG4gICAgfVxuXG4gICAgbGV0IGJsdXJyZWRcbiAgICBmdW5jdGlvbiBvbkZvY3VzQ2hhbmdlZChlKSB7XG4gICAgICAgIGFuc3dlckZvY3VzID0gZS50eXBlID09PSAnZm9jdXMnXG5cbiAgICAgICAgY2xlYXJUaW1lb3V0KGJsdXJyZWQpXG4gICAgICAgIGJsdXJyZWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICghYW5zd2VyRm9jdXMgJiYgIW1hdGhFZGl0b3JWaXNpYmxlICYmICFsYXRleEVkaXRvckZvY3VzICYmICFlcXVhdGlvbkVkaXRvckZvY3VzKSBjbG9zZUVkaXRvcigpXG4gICAgICAgICAgICBlbHNlIGlmIChhbnN3ZXJGb2N1cyAmJiBtYXRoRWRpdG9yVmlzaWJsZSkgbWF0aEVkaXRvci5jbG9zZU1hdGhFZGl0b3IoKVxuICAgICAgICAgICAgZWxzZSBvcGVuRWRpdG9yKCQoZS50YXJnZXQpKVxuICAgICAgICB9LCAwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzTWF0aEVkaXRvclZpc2libGUoKSB7XG4gICAgICAgIHJldHVybiBtYXRoRWRpdG9yVmlzaWJsZVxuICAgIH1cblxuICAgIGVkaXRvciA9IHtcbiAgICAgICAgb3BlbkVkaXRvcixcbiAgICAgICAgY2xvc2VFZGl0b3IsXG4gICAgICAgIG9uRm9jdXNDaGFuZ2VkLFxuICAgICAgICBpc01hdGhFZGl0b3JWaXNpYmxlLFxuICAgICAgICBvcGVuTWF0aEVkaXRvcjogbWF0aEVkaXRvci5vcGVuTWF0aEVkaXRvcixcbiAgICAgICAgY2xvc2VNYXRoRWRpdG9yOiBtYXRoRWRpdG9yLmNsb3NlTWF0aEVkaXRvcixcbiAgICAgICAgaW5zZXJ0TmV3RXF1YXRpb246IG1hdGhFZGl0b3IuaW5zZXJ0TmV3RXF1YXRpb25cbiAgICB9XG59XG5cbmNvbnN0IG1hcmtBbmRHZXRJbmxpbmVJbWFnZXMgPSAkZWRpdG9yID0+ICRlZGl0b3IuZmluZCgnaW1nW3NyY149XCJkYXRhXCJdJylcbiAgICAuZWFjaCgoaSwgZWwpID0+IGVsLnNldEF0dHJpYnV0ZSgnaWQnLCBuZXcgRGF0ZSgpLmdldFRpbWUoKSArICctJyArIGkpKVxuICAgIC5tYXAoKGksIGVsKSA9PiAoe2RhdGE6IGVsLmdldEF0dHJpYnV0ZSgnc3JjJyksIGlkOiBlbC5nZXRBdHRyaWJ1dGUoJ2lkJyl9KSlcbiAgICAudG9BcnJheSgpXG5cbmNvbnN0IHBlcnNpc3RJbmxpbmVJbWFnZXMgPSAkZWRpdG9yID0+IHtcbiAgICByZXR1cm4gQmFjb24uY29tYmluZUFzQXJyYXkoXG4gICAgICAgIG1hcmtBbmRHZXRJbmxpbmVJbWFnZXMoJGVkaXRvcilcbiAgICAgICAgICAgIC5tYXAoZGF0YSA9PlxuICAgICAgICAgICAgICAgIEJhY29uLmZyb21Qcm9taXNlKFxuICAgICAgICAgICAgICAgICAgICAkLnBvc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3NhdmVJbWcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogZGF0YS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbnN3ZXJJZDogJGVkaXRvci5hdHRyKCdpZCcpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pKSkpXG4gICAgICAgIC5mbGF0TWFwKHJlc3VsdHMgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0cylcbiAgICAgICAgICAgIHJlc3VsdHMuZm9yRWFjaChpZCA9PiB7XG4gICAgICAgICAgICAgICAgJGVkaXRvci5maW5kKCcjJyArIGlkKS5hdHRyKCdzcmMnLCAnL2xvYWRJbWc/aWQ9JyArIGlkKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uVmFsdWUoKCkgPT4gJGVkaXRvci50cmlnZ2VyKCdpbnB1dCcpKVxufVxuXG5jb25zdCBtYWtlUmljaFRleHQgPSAoc2VsZWN0b3IsIG9uVmFsdWVDaGFuZ2VkID0gKCkgPT4ge30pID0+IHtcbiAgICAkKHNlbGVjdG9yKS5lYWNoKChpLCBlbGVtZW50KSA9PiB7XG4gICAgICAgIGNvbnN0ICRlZGl0b3IgPSAkKGVsZW1lbnQpXG4gICAgICAgICRlZGl0b3IuYXR0cignY29udGVudGVkaXRhYmxlJywgJ3RydWUnKVxuICAgICAgICAkZWRpdG9yLmF0dHIoJ2RhdGEtanMtaGFuZGxlJywgJ2Fuc3dlcicpXG5cbiAgICAgICAgJGVkaXRvci5vbigna2V5ZG93bicsIGUgPT4ge1xuICAgICAgICAgICAgaWYoIWUuYWx0S2V5ICYmICFlLnNoaWZ0S2V5ICYmXG4gICAgICAgICAgICAgICAgKChlLmN0cmxLZXkgJiYgZS5rZXlDb2RlID09PSBrZXlDb2Rlcy5FTlRFUikgfHxcbiAgICAgICAgICAgICAgICAoIWUuY3RybEtleSAmJiBlLmtleUNvZGUgPT09IGtleUNvZGVzLkVTQyApKSkgbWF0aEVkaXRvci5jbG9zZU1hdGhFZGl0b3IodHJ1ZSlcbiAgICAgICAgfSkub24oJ21vdXNlZG93bicsICcucmVzdWx0JywgZSA9PiB7XG4gICAgICAgICAgICAvLyBUT0RPOiBvcGVuIGVkaXRvciBpZiBjbGlja2VkIG9uIGVxdWF0aW9uIGluIGFub3RoZXIgZWRpdG9yXG4gICAgICAgICAgICBlZGl0b3Iub3Blbk1hdGhFZGl0b3IoJChlLnRhcmdldCkpXG4gICAgICAgIH0pLm9uKCdrZXlwcmVzcycsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKGUuY3RybEtleSAmJiAhZS5hbHRLZXkgJiYgIWUuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICBpZihlLmtleSA9PT0gJ2wnIHx8IGUua2V5ID09PSAnaScpIGVkaXRvci5pbnNlcnROZXdFcXVhdGlvbigpXG4gICAgICAgICAgICAgICAgZWxzZSBpZihlLmtleSA9PT0gJ3MnKSBvblZhbHVlQ2hhbmdlZCgkZWRpdG9yKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KS5vbignZm9jdXMgYmx1cicsIGUgPT4ge1xuICAgICAgICAgICAgaWYoZWRpdG9yLmlzTWF0aEVkaXRvclZpc2libGUoKSAmJiBlLnR5cGUgPT09ICdmb2N1cycpIGVkaXRvci5jbG9zZU1hdGhFZGl0b3IoKVxuICAgICAgICAgICAgLy9hbnN3ZXJGb2N1cyA9IGUudHlwZSA9PT0gJ2ZvY3VzJ1xuICAgICAgICB9KS5vbigncGFzdGUnLCBlID0+IHtcbiAgICAgICAgICAgIGlmKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdURVhUQVJFQScpXG4gICAgICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcbiAgICAgICAgICAgIGNvbnN0IGNsaXBib2FyZERhdGEgPSBlLm9yaWdpbmFsRXZlbnQuY2xpcGJvYXJkRGF0YVxuICAgICAgICAgICAgY29uc3QgZmlsZSA9IGNsaXBib2FyZERhdGEuaXRlbXMgJiYgY2xpcGJvYXJkRGF0YS5pdGVtc1swXS5nZXRBc0ZpbGUoKVxuICAgICAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjbGlwYm9hcmREYXRhQXNIdG1sID0gY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0L2h0bWwnKVxuICAgICAgICAgICAgICAgIGlmIChjbGlwYm9hcmREYXRhQXNIdG1sKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydEhUTUwnLCBmYWxzZSwgc2FuaXRpemVIdG1sKGNsaXBib2FyZERhdGFBc0h0bWwsIHNhbml0aXplT3B0cykpO1xuICAgICAgICAgICAgICAgICAgICBwZXJzaXN0SW5saW5lSW1hZ2VzKCRlZGl0b3IpXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGNhbGwgYXV0b3NhdmU/XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZWFkZXIub25sb2FkID0gZXZ0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBgPGltZyBzcmM9XCIke2V2dC50YXJnZXQucmVzdWx0fVwiLz5gXG4gICAgICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LmV4ZWNDb21tYW5kKCdpbnNlcnRIVE1MJywgZmFsc2UsIHNhbml0aXplSHRtbChpbWcsIHNhbml0aXplT3B0cykpXG4gICAgICAgICAgICAgICAgcGVyc2lzdElubGluZUltYWdlcygkZWRpdG9yKVxuICAgICAgICAgICAgICAgIC8vIFRPRE86IGNhbGwgYXV0b3NhdmU/XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgJGVkaXRvci5vbignYmx1ciBmb2N1cycsIGUgPT4gZWRpdG9yLm9uRm9jdXNDaGFuZ2VkKGUpKVxuICAgICAgICAkZWRpdG9yLm9uKCdpbnB1dCBmb2N1cycsIGUgPT4gb25WYWx1ZUNoYW5nZWQoJChlLmN1cnJlbnRUYXJnZXQpKSlcbiAgICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtYWtlUmljaFRleHRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGFsbG93ZWRUYWdzOiBbXG4gICAgICAgICdkaXYnLFxuICAgICAgICAnaW1nJyxcbiAgICAgICAgJ2JyJ1xuICAgIF0sXG4gICAgYWxsb3dlZEF0dHJpYnV0ZXM6IHtcbiAgICAgICAgaW1nOiBbJ3NyYycsICdjbGFzcycsICdhbHQnXVxuICAgIH0sXG4gICAgYWxsb3dlZFNjaGVtZXM6IFsnaHR0cCcsICdodHRwcycsICdkYXRhJ11cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuICAgIHtjaGFyYWN0ZXI6ICfCsCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiaEnLCBsYXRleENvbW1hbmQ6ICdcXFxcZXF1aXYnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4omiJ30sIC8vIFxcbmVxdWl2IG9yIFxcbm90XFxlcXVpdlxuICAgIHtjaGFyYWN0ZXI6ICfijJAnfSwgLy8gXFxiYWNrbmVnXG4gICAge2NoYXJhY3RlcjogJ8OXJywgbGF0ZXhDb21tYW5kOiAnXFxcXHRpbWVzJ30sXG4gICAge2NoYXJhY3RlcjogJ8O3JywgbGF0ZXhDb21tYW5kOiAnXFxcXGRpdid9LFxuICAgIHtjaGFyYWN0ZXI6ICfCtycsIGxhdGV4Q29tbWFuZDogJ1xcXFxjZG90J30sXG4gICAge2NoYXJhY3RlcjogJ8KrJ30sIC8vIFxcZ3VpbGxlbW90bGVmdFxuICAgIHtjaGFyYWN0ZXI6ICfCuyd9LCAvLyBcXGd1aWxsZW1vdHJpZ2h0XG4gICAge2NoYXJhY3RlcjogJ+KApicsIGxhdGV4Q29tbWFuZDogJ1xcXFxkb3RzJ30sXG4gICAge2NoYXJhY3RlcjogJ8KsJywgbGF0ZXhDb21tYW5kOiAnXFxcXG5lZyd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiYUnLCBsYXRleENvbW1hbmQ6ICdcXFxcY29uZyd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiYgnLCBsYXRleENvbW1hbmQ6ICdcXFxcYXBwcm94J30sXG4gICAge2NoYXJhY3RlcjogJ+KIvCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxzaW0nfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oC5J30sIC8vIFxcZ3VpbHNpbmdsbGVmdFxuICAgIHtjaGFyYWN0ZXI6ICfigLonfSwgLy8gXFxndWlsc2luZ2xyaWdodFxuICAgIHtjaGFyYWN0ZXI6ICfigLAnfSwgLy8gXFxwZXJtaWwsIFxcdGV4dHBlcnRlbnRob3VzYW5kIG9yIFxcdGV4dHBlcnRob3VzYW5kXG4gICAge2NoYXJhY3RlcjogJ8K5JywgbGF0ZXhDb21tYW5kOiAnXjEnfSxcbiAgICB7Y2hhcmFjdGVyOiAnwrInLCBsYXRleENvbW1hbmQ6ICdeMid9LFxuICAgIHtjaGFyYWN0ZXI6ICfCsycsIGxhdGV4Q29tbWFuZDogJ14zJ30sXG4gICAge2NoYXJhY3RlcjogJ8K9JywgbGF0ZXhDb21tYW5kOiAnMS8yJ30sXG4gICAge2NoYXJhY3RlcjogJ8K8JywgbGF0ZXhDb21tYW5kOiAnMS80J30sXG4gICAge2NoYXJhY3RlcjogJ8K+JywgbGF0ZXhDb21tYW5kOiAnMy80J30sXG4gICAge2NoYXJhY3RlcjogJ+KGkCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxsZWZ0YXJyb3cnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oaRJywgbGF0ZXhDb21tYW5kOiAnXFxcXHVwYXJyb3cnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oaSJywgbGF0ZXhDb21tYW5kOiAnXFxcXHJpZ2h0YXJyb3cnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oaTJywgbGF0ZXhDb21tYW5kOiAnXFxcXGRvd25hcnJvdyd9LFxuICAgIHtjaGFyYWN0ZXI6ICfihpQnLCBsYXRleENvbW1hbmQ6ICdcXFxcbGVmdHJpZ2h0YXJyb3cnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oaVJywgbGF0ZXhDb21tYW5kOiAnXFxcXHVwZG93bmFycm93J30sXG4gICAge2NoYXJhY3RlcjogJ+KGqCd9LCAvLyBcXHZlcnRpY2FsXG4gICAge2NoYXJhY3RlcjogJ+KHkCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxMZWZ0YXJyb3cnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oeSJywgbGF0ZXhDb21tYW5kOiAnXFxcXFJpZ2h0YXJyb3cnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oeUJywgbGF0ZXhDb21tYW5kOiAnXFxcXExlZnRyaWdodGFycm93J30sXG4gICAge2NoYXJhY3RlcjogJ+KHjCd9LCAvLyBcXHJpZ2h0bGVmdGhhcnBvb25zXG4gICAge2NoYXJhY3RlcjogJ+KJoCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxuZXEnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oiFJywgbGF0ZXhDb21tYW5kOiAnXFxcXGVtcHR5J30sXG4gICAge2NoYXJhY3RlcjogJ+KInicsIGxhdGV4Q29tbWFuZDogJ1xcXFxpbmZ0eSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfCsScsIGxhdGV4Q29tbWFuZDogJ1xcXFxwbSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiJMnLCBsYXRleENvbW1hbmQ6ICdcXFxcbXAnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4omkJywgbGF0ZXhDb21tYW5kOiAnXFxcXGxlcSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiaUnLCBsYXRleENvbW1hbmQ6ICdcXFxcZ2VxJ30sXG4gICAge2NoYXJhY3RlcjogJ8K1JywgbGF0ZXhDb21tYW5kOiAnXFxcXG11J30sXG4gICAge2NoYXJhY3RlcjogJ+KIgicsIGxhdGV4Q29tbWFuZDogJ1xcXFxwYXJ0aWFsJ30sXG4gICAge2NoYXJhY3RlcjogJ+KIkScsIGxhdGV4Q29tbWFuZDogJ1xcXFxTaWdtYSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiI8nLCBsYXRleENvbW1hbmQ6ICdcXFxcUGknfSxcbiAgICB7Y2hhcmFjdGVyOiAnzqknLCBsYXRleENvbW1hbmQ6ICdcXFxcT21lZ2EnfSxcbiAgICB7Y2hhcmFjdGVyOiAnzpQnLCBsYXRleENvbW1hbmQ6ICdcXFxcRGVsdGEnfSxcbiAgICB7Y2hhcmFjdGVyOiAn8J2chCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxpb3RhJ30sXG4gICAge2NoYXJhY3RlcjogJ8OQJ30sIC8vIFxcRXRoXG4gICAge2NoYXJhY3RlcjogJ8OwJ30sIC8vIFxcZXRoXG4gICAge2NoYXJhY3RlcjogJ8OeJ30sIC8vIFxcdGhvcm5cbiAgICB7Y2hhcmFjdGVyOiAnw74nfSwgLy8gXFxUaG9yblxuICAgIHtjaGFyYWN0ZXI6ICfOkycsIGxhdGV4Q29tbWFuZDogJ1xcXFxHYW1tYSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfOmCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxUaGV0YSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfOpicsIGxhdGV4Q29tbWFuZDogJ1xcXFxQaGknfSxcbiAgICB7Y2hhcmFjdGVyOiAnzrEnLCBsYXRleENvbW1hbmQ6ICdcXFxcYWxwaGEnfSxcbiAgICB7Y2hhcmFjdGVyOiAnzrQnLCBsYXRleENvbW1hbmQ6ICdcXFxcZGVsdGEnfSxcbiAgICB7Y2hhcmFjdGVyOiAnzrUnLCBsYXRleENvbW1hbmQ6ICdcXFxcdmFyZXBzaWxvbid9LFxuICAgIHtjaGFyYWN0ZXI6ICfPgycsIGxhdGV4Q29tbWFuZDogJ1xcXFxzaWdtYSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfPhCcsIGxhdGV4Q29tbWFuZDogJ1xcXFx0YXUnfSxcbiAgICB7Y2hhcmFjdGVyOiAnzqknLCBsYXRleENvbW1hbmQ6ICdcXFxcT21lZ2EnfSxcbiAgICB7Y2hhcmFjdGVyOiAnz4knLCBsYXRleENvbW1hbmQ6ICdcXFxcb21lZ2EnfSxcbiAgICB7Y2hhcmFjdGVyOiAn0JQnfSwgLy8gXFxjeXJkXG4gICAge2NoYXJhY3RlcjogJ8+AJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBpJ30sXG4gICAge2NoYXJhY3RlcjogJ9CkJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBoaSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiIgnLCBsYXRleENvbW1hbmQ6ICdcXFxcaW4nfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oiJJywgbGF0ZXhDb21tYW5kOiAnXFxcXG5vdGluJ30sXG4gICAge2NoYXJhY3RlcjogJ+KIiycsIGxhdGV4Q29tbWFuZDogJ1xcXFxuaSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiioInLCBsYXRleENvbW1hbmQ6ICdcXFxcc3Vic2V0J30sXG4gICAge2NoYXJhY3RlcjogJ+KKgycsIGxhdGV4Q29tbWFuZDogJ1xcXFxzdXBzZXQnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oipJywgbGF0ZXhDb21tYW5kOiAnXFxcXGNhcCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiKonLCBsYXRleENvbW1hbmQ6ICdcXFxcY3VwJ30sXG4gICAge2NoYXJhY3RlcjogJ+KIlicsIGxhdGV4Q29tbWFuZDogJ1xcXFxzZXRtaW51cyd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiKAnLCBsYXRleENvbW1hbmQ6ICdcXFxcYW5nbGUnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oinJywgbGF0ZXhDb21tYW5kOiAnXFxcXGFuZCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiKgnLCBsYXRleENvbW1hbmQ6ICdcXFxcb3InfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oiAJywgbGF0ZXhDb21tYW5kOiAnXFxcXGZvcmFsbCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiIMnLCBsYXRleENvbW1hbmQ6ICdcXFxcZXhpc3RzJ30sXG4gICAge2NoYXJhY3RlcjogJ+KIhCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxuZXhpc3RzJ30sXG4gICAge2NoYXJhY3RlcjogJ+KWsycsIGxhdGV4Q29tbWFuZDogJ1xcXFx0cmlhbmdsZSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiqUnLCBsYXRleENvbW1hbmQ6ICdcXFxccGVycCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfigJYnLCBsYXRleENvbW1hbmQ6ICdcXFxccGFyYWxsZWwnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oiYJywgbGF0ZXhDb21tYW5kOiAnXFxcXGNpcmMnfVxuXVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7aW5zZXJ0VG9UZXh0QXJlYUF0Q3Vyc29yfVxuXG5mdW5jdGlvbiBpbnNlcnRUb1RleHRBcmVhQXRDdXJzb3IoZmllbGQsIHZhbHVlKSB7XG4gICAgY29uc3Qgc3RhcnRQb3MgPSBmaWVsZC5zZWxlY3Rpb25TdGFydFxuICAgIGNvbnN0IGVuZFBvcyA9IGZpZWxkLnNlbGVjdGlvbkVuZFxuICAgIGxldCBvbGRWYWx1ZSA9IGZpZWxkLnZhbHVlXG4gICAgZmllbGQudmFsdWUgPSBvbGRWYWx1ZS5zdWJzdHJpbmcoMCwgc3RhcnRQb3MpICsgdmFsdWUgKyBvbGRWYWx1ZS5zdWJzdHJpbmcoZW5kUG9zLCBvbGRWYWx1ZS5sZW5ndGgpXG4gICAgZmllbGQuc2VsZWN0aW9uU3RhcnQgPSBmaWVsZC5zZWxlY3Rpb25FbmQgPSBzdGFydFBvcyArIHZhbHVlLmxlbmd0aFxufVxuIl19
