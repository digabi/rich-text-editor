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
        langLabel: 'På svenska',
        answerTitle: 'Vastaus'
    },
    annotating: {
        sendFeedback: 'Lähetä palautetta',
        updated: 'Päivitetty',
        mathEditor: 'Matikkaeditori',
        title: 'Arvostelu',
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
        shortcuts: '<table><tbody>\n<tr><th>L\xE4gg till en bild fr\xE5n urklippet</th><td>Ctrl-V</td></tr>\n<tr><th>Skriv en formel</th><td>Ctrl-L / Ctrl-I</td></tr>\n<tr><th colspan="2">I formeln </th></tr>\n<tr><th>Br\xE5kstreck</th><td>/</td></tr>\n<tr><th>Multiplikationstecken</th><td>*</td></tr>\n<tr><th>St\xE4ng formeln</th><td>Ctrl-Enter eller Esc</td></tr>\n</tbody>\n</table>',
        formatting: 'Formatering',
        specialCharacters: 'Specialtecken',
        insertEquation: 'Lägg till formel',
        close: 'stäng',
        save: 'Spara',
        updated: 'Uppdaterad',
        sendFeedback: 'Skicka feedback',
        langLink: '/',
        langLabel: 'Suomeksi',
        answerTitle: 'Svar'
    },
    annotating: {
        sendFeedback: 'Skicka respons',
        updated: 'Uppdaterad',
        mathEditor: 'Matematikeditor',
        title: 'Bedömning',
        backLink: '/sv',
        backLinkLabel: 'Matematikeditor',
        save: 'Spara anteckningar',
        langLink: '/tarkistus',
        langLabel: 'Suomeksi'
    }
};

},{}],3:[function(require,module,exports){
'use strict';

module.exports = [{ action: '\\sqrt', label: '\\sqrt{X}' }, { action: '^', label: 'x^{X}' }, { action: '\\frac', label: '\\frac{X}{X}' }, { action: '\\int', label: '\\int_{X}^{X}' }, { action: '\\lim_', label: '\\lim_{X}' }, { action: '\\lim_{x\\rightarrow\\infty}', label: '\\lim_{x\\rightarrow\\infty}', useWrite: true }, { action: '\\overrightarrow', label: '\\overrightarrow{X}' }, { action: '_', label: 'x_X' }, { action: '\\nthroot', label: '\\sqrt[X]{X}' }, { action: '\\sum', label: '\\sum_{X}^{X}' }, { action: '\\binom', label: '\\binom{X}{X}' }, { action: '\\sin' }, { action: '\\cos' }, { action: '\\tan' }, { action: '\\vec', label: '\\vec{X}' }, { action: '\\bar', label: '\\bar{X}' }, { action: '\\overline{\\text{i}}', useWrite: true }, { action: '\\overline{\\text{j}}', useWrite: true }, { action: '\\overline{\\text{k}}', useWrite: true }, { action: '\\overleftarrow', label: '\\overleftarrow{X}' }, { action: '|', label: '|X|' }, { action: '(', label: '(X)' }, { action: '_{ }^{ } ', label: '_{X}^{X}X', useWrite: true }, { action: '\\text', label: '\\text{T}' }];

},{}],4:[function(require,module,exports){
'use strict';

var _require = require('./util'),
    isCtrlKey = _require.isCtrlKey,
    isKey = _require.isKey,
    decodeBase64Image = _require.decodeBase64Image,
    insertToTextAreaAtCursor = _require.insertToTextAreaAtCursor,
    sanitizeContent = _require.sanitizeContent,
    sanitize = _require.sanitize;

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

var $outerPlaceholder = $('<div class="math-editor-hidden" data-js="outerPlaceholder">');

function moveElementAfter($element, $after) {
    $after.after($element);
}

function hideElementInDOM($element) {
    $outerPlaceholder.append($element);
}

// TODO: replace with data attributes?
var answerFocus = true;
var latexEditorFocus = false;
var equationEditorFocus = false;
var mathEditorVisible = false;
var $currentEditor = void 0;

$('body').append($outerPlaceholder);

var mathEditor = initMathEditor();

var _toolbars$init = toolbars.init(mathEditor, function () {
    return answerFocus;
}, l),
    $toolbar = _toolbars$init.$toolbar,
    toggleMathToolbar = _toolbars$init.toggleMathToolbar;

hideElementInDOM($toolbar);

function initMathEditor() {
    var $mathEditorContainer = $('\n        <div class="math-editor" data-js="mathEditor">\n            <div class="math-editor-boxes">\n                <div class="math-editor-equation-editor" data-js="equationEditor"></div>\n                <textarea class="math-editor-latex-editor" data-js="latexEditor" placeholder="LaTex"></textarea>\n            </div>\n        </div>');

    hideElementInDOM($mathEditorContainer);

    var $latexEditor = $mathEditorContainer.find('[data-js="latexEditor"]');
    var $equationEditor = $mathEditorContainer.find('[data-js="equationEditor"]');
    var mqInstance = MQ.MathField($equationEditor.get(0), {
        handlers: {
            edit: function edit() {
                if (latexEditorFocus) return;
                var latex = mqInstance.latex();
                $latexEditor.val(latex);
                updateMathImg($mathEditorContainer.prev(), latex);
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

    $equationEditor.on('focus blur', '.mq-textarea textarea', function (e) {
        equationEditorFocus = e.type !== 'blur' && e.type !== 'focusout';
        onFocusChanged();
    });

    function onLatexUpdate() {
        updateMathImg($mathEditorContainer.prev(), $latexEditor.val());
        setTimeout(function () {
            return mqInstance.latex($latexEditor.val());
        }, 1);
    }

    $latexEditor.keyup(onLatexUpdate).on('focus blur', function (e) {
        latexEditorFocus = e.type !== 'blur';
        onFocusChanged();
    });

    var focusChanged = null;

    function onFocusChanged() {
        clearTimeout(focusChanged);
        focusChanged = setTimeout(function () {
            if (!latexEditorFocus && !equationEditorFocus) closeMathEditor();
            if (!answerFocus && !mathEditorVisible && !latexEditorFocus && !equationEditorFocus) onEditorBlur();
        }, 0);
    }

    function insertNewEquation(optionalMarkup) {
        window.document.execCommand('insertHTML', false, (optionalMarkup ? optionalMarkup : '') + '<img data-js="new" style="display: none"/>');
        var $addedEquationImage = $('[data-js="new"]');
        $addedEquationImage.removeAttr('data-js');

        moveElementAfter($mathEditorContainer, $addedEquationImage);

        mqInstance.latex('');
        mathEditorVisible = true;
        toggleMathToolbar(true);
        setTimeout(function () {
            return mqInstance.focus();
        }, 0);
    }

    function insertMath(symbol, alternativeSymbol, useWrite) {
        if (latexEditorFocus) {
            insertToTextAreaAtCursor($latexEditor.get(0), alternativeSymbol || symbol);
            onLatexUpdate();
        } else if (equationEditorFocus) {
            if (useWrite) {
                mqInstance.write(symbol);
            } else {
                mqInstance.typedText(symbol);
            }

            if (symbol.startsWith('\\')) mqInstance.keystroke('Tab');
            setTimeout(function () {
                return mqInstance.focus();
            }, 0);
        }
    }

    function updateMathImg($img, latex) {
        $img.prop('src', '/math.svg?latex=' + encodeURIComponent(latex)).prop('alt', latex);
    }

    function closeMathEditor() {
        var setFocusAfterClose = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        // TODO: remove event bindings
        var $currentEditor = $mathEditorContainer.closest('[data-js="answer"]');
        var $img = $mathEditorContainer.prev();
        if ($latexEditor.val().trim() === '') {
            $img.remove();
        } else {
            $img.show();
            updateMathImg($img, $latexEditor.val());
        }

        toggleMathToolbar(false);
        hideElementInDOM($mathEditorContainer);
        mathEditorVisible = false;
        latexEditorFocus = false;
        equationEditorFocus = false;
        if (setFocusAfterClose) $currentEditor.focus();
    }

    function openMathEditor($img) {
        if (mathEditorVisible) closeMathEditor();
        $img.hide();
        moveElementAfter($mathEditorContainer, $img);
        var latex = $img.prop('alt');
        $latexEditor.val(latex);
        onLatexUpdate();
        mathEditorVisible = true;
        toggleMathToolbar(true);
        setTimeout(function () {
            return mqInstance.focus();
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

function onEditorFocus($element) {
    $currentEditor = $element;
    $element.before($toolbar);
    $toolbar.show();
}

function onEditorBlur() {
    // TODO: remove event bindings
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
        if (!answerFocus && !mathEditorVisible && !latexEditorFocus && !equationEditorFocus) onEditorBlur();else if (answerFocus && mathEditorVisible) mathEditor.closeMathEditor();else onEditorFocus($(e.target));
    }, 0);
}

function isMathEditorVisible() {
    return mathEditorVisible;
}

var markAndGetInlineImages = function markAndGetInlineImages($editor) {
    return $editor.find('img[src^="data"]').each(function (i, el) {
        return el.setAttribute('id', new Date().getTime() + '-' + i);
    }).map(function (i, el) {
        return Object.assign(decodeBase64Image(el.getAttribute('src')), { id: el.getAttribute('id') });
    }).toArray().filter(function (_ref) {
        var type = _ref.type;
        return type === 'image/png';
    });
};

var persistInlineImages = function persistInlineImages($editor, screenshotSaver) {
    return Bacon.combineAsArray(markAndGetInlineImages($editor).map(function (data) {
        return Bacon.fromPromise(screenshotSaver(data).then(function (screenshotUrl) {
            return $editor.find('#' + data.id).attr('src', screenshotUrl).removeAttr('id');
        }));
    })).onValue(function () {
        return $editor.trigger('input');
    });
};

var makeRichText = function makeRichText(element, options) {
    var onValueChanged = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
    var saver = options.screenshot.saver;

    var $answer = $(element);
    $answer.attr('contenteditable', 'true').attr('spellcheck', 'false').attr('data-js', 'answer').addClass('math-editor-answer').on('keydown', function (e) {
        if (isCtrlKey(e, keyCodes.ENTER) || isKey(e, keyCodes.ESC)) mathEditor.closeMathEditor(true);
    }).on('mousedown', 'img[src^="/math.svg"]', function (e) {
        onEditorFocus($(e.target).closest('[data-js="answer"]'));
        mathEditor.openMathEditor($(e.target));
    }).on('keypress', function (e) {
        if (isCtrlKey(e, 'l') || isCtrlKey(e, 'i')) mathEditor.insertNewEquation();
    }).on('focus blur', function (e) {
        if (isMathEditorVisible() && e.type === 'focus') mathEditor.closeMathEditor();
        onEditorFocusChanged(e);
    }).on('keyup input', function (e) {
        return onValueChanged(sanitizeContent(e.currentTarget));
    }).on('paste', function (e) {
        if (e.target.tagName === 'TEXTAREA') return;
        var clipboardData = e.originalEvent.clipboardData;
        var file = clipboardData.items && clipboardData.items[0].getAsFile();
        if (file) {
            e.preventDefault();
            if (file.type !== 'image/png') return;
            saver({ data: file, type: file.type }).then(function (screenshotUrl) {
                var img = '<img src="' + screenshotUrl + '"/>';
                window.document.execCommand('insertHTML', false, img);
            });
        } else {
            var clipboardDataAsHtml = clipboardData.getData('text/html');
            if (clipboardDataAsHtml) {
                e.preventDefault();
                window.document.execCommand('insertHTML', false, sanitize(clipboardDataAsHtml));
                setTimeout(function () {
                    return persistInlineImages($currentEditor, saver);
                }, 0);
            } else {
                setTimeout(function () {
                    return persistInlineImages($currentEditor, saver);
                }, 0);
            }
        }
    });
};

module.exports = {
    makeRichText: makeRichText
};

},{"./FI":1,"./SV":2,"./toolbars":7,"./util":8}],5:[function(require,module,exports){
'use strict';

module.exports = {
    allowedTags: ['div', 'img', 'br'],
    allowedAttributes: {
        img: ['src', 'alt']
    },
    allowedSchemes: ['data', 'http', 'https'],
    exclusiveFilter: function exclusiveFilter(frame) {
        return frame.attribs['data-js'] === 'mathEditor';
    }
};

},{}],6:[function(require,module,exports){
'use strict';

module.exports = [{ character: '≡', latexCommand: '\\equiv' }, { character: '≢' }, // \nequiv or \not\equiv
{ character: '≈', latexCommand: '\\approx' }, { character: '∼', latexCommand: '\\sim' }, { character: '≠', latexCommand: '\\neq' }, { character: '≤', latexCommand: '\\leq' }, { character: '≥', latexCommand: '\\geq' }, { character: '…', latexCommand: '\\dots' }, { character: '²', latexCommand: '^2' }, { character: '³', latexCommand: '^3' }, { character: '½', latexCommand: '1/2' }, { character: '·', latexCommand: '\\cdot' }, { character: '±', latexCommand: '\\pm' }, { character: '°' }, { character: '∘', latexCommand: '\\circ' }, { character: '∠', latexCommand: '\\angle' }, { character: '⊥', latexCommand: '\\perp' }, { character: '‖', latexCommand: '\\parallel' }, { character: '⇅' }, { character: 'µ', latexCommand: '\\mu' }, { character: '∂', latexCommand: '\\partial' }, { character: '∑', latexCommand: '\\Sigma' }, { character: '∏', latexCommand: '\\Pi' }, { character: 'Ω', latexCommand: '\\Omega' }, { character: 'Δ', latexCommand: '\\Delta' }, { character: '𝜄', latexCommand: '\\iota' }, { character: 'Γ', latexCommand: '\\Gamma' }, { character: 'Θ', latexCommand: '\\Theta' }, { character: 'Φ', latexCommand: '\\Phi' }, { character: 'η', latexCommand: '\\eta' }, { character: 'α', latexCommand: '\\alpha' }, { character: 'δ', latexCommand: '\\delta' }, { character: 'ε', latexCommand: '\\varepsilon' }, { character: 'σ', latexCommand: '\\sigma' }, { character: 'τ', latexCommand: '\\tau' }, { character: 'Ω', latexCommand: '\\Omega' }, { character: 'ω', latexCommand: '\\omega' }, { character: 'π', latexCommand: '\\pi' }, { character: 'Ф', latexCommand: '\\phi' }, { character: '↑', latexCommand: '\\uparrow' }, { character: '→', latexCommand: '\\rightarrow' }, { character: '↓', latexCommand: '\\downarrow' }, { character: '↔', latexCommand: '\\leftrightarrow' }, { character: '⇒', latexCommand: '\\Rightarrow' }, { character: '⇔', latexCommand: '\\Leftrightarrow' }, { character: '⇌' }, // \rightleftharpoons
{ character: '∞', latexCommand: '\\infty' }, { character: '∈', latexCommand: '\\in' }, { character: '∉', latexCommand: '\\notin' }, { character: 'ℝ' }, { character: 'ℕ' }, { character: 'ℤ' }, { character: 'ℚ' }, { character: '⊂', latexCommand: '\\subset' }, { character: '⊄', latexCommand: '\\notsubset' }, { character: '∩', latexCommand: '\\cap' }, { character: '∪', latexCommand: '\\cup' }, { character: '∅', latexCommand: '\\empty' }, { character: '∖', latexCommand: '\\setminus' }, { character: '¬' }, { character: '∧', latexCommand: '\\and' }, { character: '∨', latexCommand: '\\or' }, { character: '∀', latexCommand: '\\forall' }, { character: '∃', latexCommand: '\\exists' }];

},{}],7:[function(require,module,exports){
'use strict';

var specialCharacters = require('./specialCharacters');
var latexCommands = require('./latexCommands');

module.exports = {
    init: init
};

function init(mathEditor, hasAnswerFocus, l) {
    var $toolbar = $('        \n        <div class="math-editor-tools" data-js="tools">\n            <div class="math-editor-characters" data-js="characters">\n                <span class="math-editor-special-characters">\n                  <div class="math-editor-toolbar math-editor-list" data-js="charactersList"></div>\n                </span>\n            </div>\n            <div class="math-editor-equation math-editor-toolbar math-editor-list math-editor-hidden" data-js="mathToolbar"></div>\n            <div>\n                <button class="math-editor-new-equation math-editor-button math-editor-button-action" data-js="newEquation" title="Ctrl-L">' + l.insertEquation + '</button>\n            </div>\n        </div>\n        ');
    var $newEquation = $toolbar.find('[data-js="newEquation"]');
    var $mathToolbar = $toolbar.find('[data-js="mathToolbar"]');
    initSpecialCharacterToolbar($toolbar, mathEditor, hasAnswerFocus);
    initMathToolbar($mathToolbar, mathEditor);
    initNewEquation($newEquation, mathEditor, hasAnswerFocus);

    function toggleMathToolbar(isVisible) {
        $newEquation.toggle(!isVisible);
        $mathToolbar.toggle(isVisible);
    }

    return { $toolbar: $toolbar, toggleMathToolbar: toggleMathToolbar };
}

function initSpecialCharacterToolbar($toolbar, mathEditor, hasAnswerFocus) {
    $toolbar.find('[data-js="charactersList"]').append(specialCharacters.map(function (char) {
        return '<button class="math-editor-button math-editor-button-grid" ' + (char.latexCommand ? 'data-command="' + char.latexCommand + '"' : '') + '>' + char.character + '</button>';
    })).on('mousedown', 'button', function (e) {
        e.preventDefault();
        var character = e.currentTarget.innerText;
        var command = e.currentTarget.dataset.command;
        if (hasAnswerFocus()) window.document.execCommand('insertText', false, character);else mathEditor.insertMath(command || character);
    });
}

function initMathToolbar($mathToolbar, mathEditor) {
    $mathToolbar.append(latexCommands.map(function (o) {
        return '<button title="' + o.action + '" class="math-editor-button math-editor-button-grid" data-command="' + o.action + '" data-latexcommand="' + o.label + '" data-usewrite="' + (o.useWrite || false) + '">\n<img src="/math.svg?latex=' + encodeURIComponent(o.label ? o.label.replace(/X/g, '\\square') : o.action) + '"/>\n</button>';
    }).join('')).on('mousedown', 'button', function (e) {
        e.preventDefault();
        var dataset = e.currentTarget.dataset;
        mathEditor.insertMath(dataset.command, dataset.latexcommand, dataset.usewrite === 'true');
    });
}

function initNewEquation($newEquation, mathEditor, hasAnswerFocus) {
    $newEquation.mousedown(function (e) {
        e.preventDefault();
        if (!hasAnswerFocus()) return; // TODO: remove when button is only visible when textarea has focus
        mathEditor.insertNewEquation();
    }.bind(this));
}

},{"./latexCommands":3,"./specialCharacters":6}],8:[function(require,module,exports){
(function (Buffer){
'use strict';

var sanitizeHtml = require('sanitize-html');
var sanitizeOpts = require('./sanitizeOpts');

module.exports = { isKey: isKey, isCtrlKey: isCtrlKey, insertToTextAreaAtCursor: insertToTextAreaAtCursor, decodeBase64Image: decodeBase64Image, sanitize: sanitize, sanitizeContent: sanitizeContent };

function sanitize(html) {
    return sanitizeHtml(html, sanitizeOpts);
}
function insertToTextAreaAtCursor(field, value) {
    var startPos = field.selectionStart;
    var endPos = field.selectionEnd;
    var oldValue = field.value;
    field.value = oldValue.substring(0, startPos) + value + oldValue.substring(endPos, oldValue.length);
    field.selectionStart = field.selectionEnd = startPos + value.length;
}

function decodeBase64Image(dataString) {
    if (!dataString) return null;
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (matches.length !== 3) {
        return null;
    }
    return {
        type: matches[1],
        data: new Buffer(matches[2], 'base64')
    };
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

function sanitizeContent(answerElement) {
    var $answerElement = $(answerElement);
    var $mathEditor = $answerElement.find('[data-js="mathEditor"]');
    $mathEditor.hide();
    var text = $answerElement.text();
    $mathEditor.show();

    var html = sanitize($answerElement.html());

    return { answerHTML: html, answerText: text };
}

}).call(this,require("buffer").Buffer)

},{"./sanitizeOpts":5,"buffer":undefined,"sanitize-html":undefined}]},{},[4])(4)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvRkkuanMiLCJhcHAvU1YuanMiLCJhcHAvbGF0ZXhDb21tYW5kcy5qcyIsImFwcC9tYXRoLWVkaXRvci5qcyIsImFwcC9zYW5pdGl6ZU9wdHMuanMiLCJhcHAvc3BlY2lhbENoYXJhY3RlcnMuanMiLCJhcHAvdG9vbGJhcnMuanMiLCJhcHAvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsWUFBUTtBQUNKLG9CQUFZLGdCQURSO0FBRUosZUFBTyx5Q0FGSDtBQUdKLGtoQkFISTtBQVdKLHFEQVhJO0FBWUosNGRBWkk7QUF1Qkosb0JBQVksVUF2QlI7QUF3QkosMkJBQW1CLGVBeEJmO0FBeUJKLHdCQUFnQixhQXpCWjtBQTBCSixlQUFPLE9BMUJIO0FBMkJKLGNBQU0sVUEzQkY7QUE0QkosaUJBQVMsWUE1Qkw7QUE2Qkosc0JBQWMsbUJBN0JWO0FBOEJKLGtCQUFVLEtBOUJOO0FBK0JKLG1CQUFXLFlBL0JQO0FBZ0NKLHFCQUFhO0FBaENULEtBREs7QUFtQ2IsZ0JBQVk7QUFDUixzQkFBYyxtQkFETjtBQUVSLGlCQUFTLFlBRkQ7QUFHUixvQkFBWSxnQkFISjtBQUlSLGVBQU8sV0FKQztBQUtSLGtCQUFVLEdBTEY7QUFNUix1QkFBZSxzQkFOUDtBQU9SLGNBQU0sb0JBUEU7QUFRUixrQkFBVSxlQVJGO0FBU1IsbUJBQVc7QUFUSDtBQW5DQyxDQUFqQjs7Ozs7QUNBQSxPQUFPLE9BQVAsR0FBaUI7QUFDYixZQUFRO0FBQ0osb0JBQVksaUJBRFI7QUFFSixlQUFPLDBDQUZIO0FBR0osNmhCQUhJO0FBUUosd0RBUkk7QUFTSixvWUFUSTtBQWtCSixvQkFBWSxhQWxCUjtBQW1CSiwyQkFBbUIsZUFuQmY7QUFvQkosd0JBQWdCLGtCQXBCWjtBQXFCSixlQUFPLE9BckJIO0FBc0JKLGNBQU0sT0F0QkY7QUF1QkosaUJB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QUFaO0FBQ0EsUUFBTSxPQUFPLGVBQWUsSUFBZixFQUFiO0FBQ0EsZ0JBQVksSUFBWjs7QUFFQSxRQUFNLE9BQU8sU0FBUyxlQUFlLElBQWYsRUFBVCxDQUFiOztBQUVBLFdBQU8sRUFBRSxZQUFZLElBQWQsRUFBb0IsWUFBWSxJQUFoQyxFQUFQO0FBQ0giLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZWRpdG9yOiB7XG4gICAgICAgIG1hdGhFZGl0b3I6ICdNYXRpa2thZWRpdG9yaScsXG4gICAgICAgIHRpdGxlOiAnS2FhdmFlZGl0b3JpbiBlbnNpbW3DpGluZW4ga2VoaXR5c3ZlcnNpbycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBgPHVsPlxuPGxpPkVkaXRvcmkgdG9pbWlpIHBhcmhhaXRlbiBGaXJlZm94LXNlbGFpbWVsbGEuPC9saT5cbjxsaT7igJxMaXPDpMOkIGthYXZh4oCdIC1uYXBpbiBhbHRhIGzDtnlkw6R0IHlsZWlzaW1wacOkIG1hdGVtYXRpaWthc3NhLCBmeXNpaWthc3NhIGphXG5rZW1pYXNzYSBrw6R5dGV0dMOkdmnDpCBtZXJraW50w7Zqw6QuIExpc8Oka3NpIGVyaWtvaXNtZXJra2Vqw6Qgdm9pIGvDpHl0dMOkw6Qga2FhdmFuIGtpcmpvaXR0YW1pc2Vlbi48L2xpPlxuIDxsaT5LYWF2b2phIHZvaSByYWtlbnRhYVxua2xpa2thYW1hbGxhIHZhbGlrb24gbWVya2ludMO2asOkIGphL3RhaSBraXJqb2l0dGFtYWxsYSBMYVRlWGlhLjwvbGk+XG4gPGxpPkVkaXRvcmluIHZhc3RhdXNrZW50dMOkw6RuIHZvaSBraXJqb2l0dGFhIHRla3N0acOkIGphIGthYXZvamEgc2Vrw6Rcbmxpc8OkdMOkIGt1dmlhLjwvbGk+PC91bD5gLFxuICAgICAgICBzaG9ydGN1dFRpdGxlOiBgUGlrYW7DpHBww6RpbnZpbmtrZWrDpGAsXG4gICAgICAgIHNob3J0Y3V0czogYDx0YWJsZT48dGJvZHk+XG48dHI+PHRoPkxpaXTDpCBrdXZhIGxlaWtlcMO2eWTDpGx0w6Q8L3RoPjx0ZD5DdHJsLVY8L3RkPjwvdHI+XG48dHI+PHRoPktpcmpvaXRhIGthYXZhPC90aD48dGQ+Q3RybC1MIHRhaSBDdHJsLUk8L3RkPjwvdHI+XG48dHI+PHRoIGNvbHNwYW49XCIyXCI+S2FhdmFzc2E8L3RoPjwvdHI+XG48dHI+PHRoPkpha292aWl2YTwvdGg+PHRkPi88L3RkPjwvdHI+XG48dHI+PHRoPktlcnRvbWVya2tpPC90aD48dGQ+KjwvdGQ+PC90cj5cbjx0cj48dGg+RWtzcG9uZW50dGk8L3RoPjx0ZD5ePC90ZD48L3RyPlxuPHRyPjx0aD5TdWxqZSBrYWF2YTwvdGg+PHRkPkN0cmwtRW50ZXIgdGFpIEVzYzwvdGQ+PC90cj5cbjx0cj48dGg+TGlzw6TDpCBrYWF2YSBzZXVyYWF2YWxsZSByaXZpbGxlPC90aD48dGQ+RW50ZXI8L3RkPjwvdHI+XG48L3Rib2R5PlxuPC90YWJsZT5gLFxuICAgICAgICBmb3JtYXR0aW5nOiAnTXVvdG9pbHUnLFxuICAgICAgICBzcGVjaWFsQ2hhcmFjdGVyczogJ0VyaWtvaXNtZXJraXQnLFxuICAgICAgICBpbnNlcnRFcXVhdGlvbjogJ0xpc8Okw6Qga2FhdmEnLFxuICAgICAgICBjbG9zZTogJ3N1bGplJyxcbiAgICAgICAgc2F2ZTogJ1RhbGxlbm5hJyxcbiAgICAgICAgdXBkYXRlZDogJ1DDpGl2aXRldHR5JyxcbiAgICAgICAgc2VuZEZlZWRiYWNrOiAnTMOkaGV0w6QgcGFsYXV0ZXR0YScsXG4gICAgICAgIGxhbmdMaW5rOiAnL3N2JyxcbiAgICAgICAgbGFuZ0xhYmVsOiAnUMOlIHN2ZW5za2EnLFxuICAgICAgICBhbnN3ZXJUaXRsZTogJ1Zhc3RhdXMnXG4gICAgfSxcbiAgICBhbm5vdGF0aW5nOiB7XG4gICAgICAgIHNlbmRGZWVkYmFjazogJ0zDpGhldMOkIHBhbGF1dGV0dGEnLFxuICAgICAgICB1cGRhdGVkOiAnUMOkaXZpdGV0dHknLFxuICAgICAgICBtYXRoRWRpdG9yOiAnTWF0aWtrYWVkaXRvcmknLFxuICAgICAgICB0aXRsZTogJ0Fydm9zdGVsdScsXG4gICAgICAgIGJhY2tMaW5rOiAnLycsXG4gICAgICAgIGJhY2tMaW5rTGFiZWw6ICdQYWxhYSBrYWF2YWVkaXRvcmlpbicsXG4gICAgICAgIHNhdmU6ICdUYWxsZW5uYSBtZXJraW5uw6R0JyxcbiAgICAgICAgbGFuZ0xpbms6ICcvc3YvYmVkb21uaW5nJyxcbiAgICAgICAgbGFuZ0xhYmVsOiAnUMOlIHN2ZW5za2EnXG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZWRpdG9yOiB7XG4gICAgICAgIG1hdGhFZGl0b3I6ICdNYXRlbWF0aWtlZGl0b3InLFxuICAgICAgICB0aXRsZTogJ0Zvcm1lbGVkaXRvcm5zIGbDtnJzdGEgdXR2ZWNrbGluZ3N2ZXJzaW9uJyxcbiAgICAgICAgZGVzY3JpcHRpb246IGA8dWw+XG48bGk+RWRpdG9ybiBmdW5nZXJhciBiw6RzdCBtZWQgYnJvd3Nlcm4gRmlyZWZveC48L2xpPlxuIDxsaT5VbmRlciBrbmFwcGVuIOKAnEzDpGdnIHRpbGwgZm9ybWVs4oCdIGhpdHRhciBkdSBkZSB2YW5saWdhc3RlIGJldGVja25pbmdhcm5hIHNvbSBhbnbDpG5kcyBpIG1hdGVtYXRpaywgZnlzaWsgb2NoIGtlbWkuIERlc3N1dG9tIGthbiBkdSBhbnbDpG5kYSBzcGVjaWFsdGVja2VuIGbDtnIgYXR0IHNrcml2YSBmb3JtbGVyLjwvbGk+XG48bGk+RGV0IGfDpXIgYXR0IGtvbnN0cnVlcmEgZm9ybWxlciBnZW5vbSBhdHQga2xpY2thIHDDpSBiZXRlY2tuaW5nYXJuYSBpIG1lbnllcm5hIG9jaC9lbGxlciBnZW5vbSBhdHQgc2tyaXZhIExhVGVYLjwvbGk+XG48bGk+RGV0IGfDpXIgZsO2cnV0b20gYXR0IHNrcml2YSB0ZXh0IG9jaCBmb3JtbGVyLCBhdHQgb2Nrc8OlIGF0dCBsw6RnZ2EgdGlsbCBiaWxkZXIgaSBzdmFyc2bDpGx0ZXQuPC9saT48L3VsPmAsXG4gICAgICAgIHNob3J0Y3V0VGl0bGU6IGBUaXBzIHDDpSB0YW5nZW50a29tYmluYXRpb25lcmAsXG4gICAgICAgIHNob3J0Y3V0czogYDx0YWJsZT48dGJvZHk+XG48dHI+PHRoPkzDpGdnIHRpbGwgZW4gYmlsZCBmcsOlbiB1cmtsaXBwZXQ8L3RoPjx0ZD5DdHJsLVY8L3RkPjwvdHI+XG48dHI+PHRoPlNrcml2IGVuIGZvcm1lbDwvdGg+PHRkPkN0cmwtTCAvIEN0cmwtSTwvdGQ+PC90cj5cbjx0cj48dGggY29sc3Bhbj1cIjJcIj5JIGZvcm1lbG4gPC90aD48L3RyPlxuPHRyPjx0aD5CcsOla3N0cmVjazwvdGg+PHRkPi88L3RkPjwvdHI+XG48dHI+PHRoPk11bHRpcGxpa2F0aW9uc3RlY2tlbjwvdGg+PHRkPio8L3RkPjwvdHI+XG48dHI+PHRoPlN0w6RuZyBmb3JtZWxuPC90aD48dGQ+Q3RybC1FbnRlciBlbGxlciBFc2M8L3RkPjwvdHI+XG48L3Rib2R5PlxuPC90YWJsZT5gLFxuICAgICAgICBmb3JtYXR0aW5nOiAnRm9ybWF0ZXJpbmcnLFxuICAgICAgICBzcGVjaWFsQ2hhcmFjdGVyczogJ1NwZWNpYWx0ZWNrZW4nLFxuICAgICAgICBpbnNlcnRFcXVhdGlvbjogJ0zDpGdnIHRpbGwgZm9ybWVsJyxcbiAgICAgICAgY2xvc2U6ICdzdMOkbmcnLFxuICAgICAgICBzYXZlOiAnU3BhcmEnLFxuICAgICAgICB1cGRhdGVkOiAnVXBwZGF0ZXJhZCcsXG4gICAgICAgIHNlbmRGZWVkYmFjazogJ1NraWNrYSBmZWVkYmFjaycsXG4gICAgICAgIGxhbmdMaW5rOiAnLycsXG4gICAgICAgIGxhbmdMYWJlbDogJ1N1b21la3NpJyxcbiAgICAgICAgYW5zd2VyVGl0bGU6ICdTdmFyJ1xuICAgIH0sXG4gICAgYW5ub3RhdGluZzoge1xuICAgICAgICBzZW5kRmVlZGJhY2s6ICdTa2lja2EgcmVzcG9ucycsXG4gICAgICAgIHVwZGF0ZWQ6ICdVcHBkYXRlcmFkJyxcbiAgICAgICAgbWF0aEVkaXRvcjogJ01hdGVtYXRpa2VkaXRvcicsXG4gICAgICAgIHRpdGxlOiAnQmVkw7ZtbmluZycsXG4gICAgICAgIGJhY2tMaW5rOiAnL3N2JyxcbiAgICAgICAgYmFja0xpbmtMYWJlbDogJ01hdGVtYXRpa2VkaXRvcicsXG4gICAgICAgIHNhdmU6ICdTcGFyYSBhbnRlY2tuaW5nYXInLFxuICAgICAgICBsYW5nTGluazogJy90YXJraXN0dXMnLFxuICAgICAgICBsYW5nTGFiZWw6ICdTdW9tZWtzaSdcbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAgICB7YWN0aW9uOiAnXFxcXHNxcnQnLCBsYWJlbDogJ1xcXFxzcXJ0e1h9J30sXG4gICAge2FjdGlvbjogJ14nLCBsYWJlbDogJ3hee1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxmcmFjJywgbGFiZWw6ICdcXFxcZnJhY3tYfXtYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcaW50JywgbGFiZWw6ICdcXFxcaW50X3tYfV57WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGxpbV8nLCBsYWJlbDogJ1xcXFxsaW1fe1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxsaW1fe3hcXFxccmlnaHRhcnJvd1xcXFxpbmZ0eX0nLCBsYWJlbDogJ1xcXFxsaW1fe3hcXFxccmlnaHRhcnJvd1xcXFxpbmZ0eX0nLCB1c2VXcml0ZTp0cnVlfSxcbiAgICB7YWN0aW9uOiAnXFxcXG92ZXJyaWdodGFycm93JywgbGFiZWw6ICdcXFxcb3ZlcnJpZ2h0YXJyb3d7WH0nfSxcbiAgICB7YWN0aW9uOiAnXycsIGxhYmVsOiAneF9YJ30sXG4gICAge2FjdGlvbjogJ1xcXFxudGhyb290JywgbGFiZWw6ICdcXFxcc3FydFtYXXtYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcc3VtJywgbGFiZWw6ICdcXFxcc3VtX3tYfV57WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGJpbm9tJywgbGFiZWw6ICdcXFxcYmlub217WH17WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXHNpbid9LFxuICAgIHthY3Rpb246ICdcXFxcY29zJ30sXG4gICAge2FjdGlvbjogJ1xcXFx0YW4nfSxcbiAgICB7YWN0aW9uOiAnXFxcXHZlYycsIGxhYmVsOiAnXFxcXHZlY3tYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcYmFyJywgbGFiZWw6ICdcXFxcYmFye1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxvdmVybGluZXtcXFxcdGV4dHtpfX0nLCB1c2VXcml0ZTogdHJ1ZX0sXG4gICAge2FjdGlvbjogJ1xcXFxvdmVybGluZXtcXFxcdGV4dHtqfX0nLCB1c2VXcml0ZTogdHJ1ZX0sXG4gICAge2FjdGlvbjogJ1xcXFxvdmVybGluZXtcXFxcdGV4dHtrfX0nLCB1c2VXcml0ZTogdHJ1ZX0sXG4gICAge2FjdGlvbjogJ1xcXFxvdmVybGVmdGFycm93JywgbGFiZWw6ICdcXFxcb3ZlcmxlZnRhcnJvd3tYfSd9LFxuICAgIHthY3Rpb246ICd8JywgbGFiZWw6ICd8WHwnfSxcbiAgICB7YWN0aW9uOiAnKCcsIGxhYmVsOiAnKFgpJ30sXG4gICAge2FjdGlvbjogJ197IH1eeyB9ICcsIGxhYmVsOiAnX3tYfV57WH1YJywgdXNlV3JpdGU6IHRydWV9LFxuICAgIHthY3Rpb246ICdcXFxcdGV4dCcsIGxhYmVsOiAnXFxcXHRleHR7VH0nfSxcbl1cbiIsImNvbnN0IHtpc0N0cmxLZXksIGlzS2V5LCBkZWNvZGVCYXNlNjRJbWFnZSwgaW5zZXJ0VG9UZXh0QXJlYUF0Q3Vyc29yLCBzYW5pdGl6ZUNvbnRlbnQsIHNhbml0aXplfSA9IHJlcXVpcmUoJy4vdXRpbCcpXG5jb25zdCB0b29sYmFycyA9IHJlcXVpcmUoJy4vdG9vbGJhcnMnKVxuY29uc3QgTVEgPSBNYXRoUXVpbGwuZ2V0SW50ZXJmYWNlKDIpXG5jb25zdCBsb2NhbGVzID0ge1xuICAgIEZJOiByZXF1aXJlKCcuL0ZJJyksXG4gICAgU1Y6IHJlcXVpcmUoJy4vU1YnKVxufVxuY29uc3QgbCA9IGxvY2FsZXNbd2luZG93LmxvY2FsZSB8fCAnRkknXS5lZGl0b3JcbmNvbnN0IGtleUNvZGVzID0ge1xuICAgIEVOVEVSOiAxMyxcbiAgICBFU0M6IDI3XG59XG5cbmNvbnN0ICRvdXRlclBsYWNlaG9sZGVyID0gJChgPGRpdiBjbGFzcz1cIm1hdGgtZWRpdG9yLWhpZGRlblwiIGRhdGEtanM9XCJvdXRlclBsYWNlaG9sZGVyXCI+YClcblxuZnVuY3Rpb24gbW92ZUVsZW1lbnRBZnRlcigkZWxlbWVudCwgJGFmdGVyKSB7XG4gICAgJGFmdGVyLmFmdGVyKCRlbGVtZW50KVxufVxuXG5mdW5jdGlvbiBoaWRlRWxlbWVudEluRE9NKCRlbGVtZW50KSB7XG4gICAgJG91dGVyUGxhY2Vob2xkZXIuYXBwZW5kKCRlbGVtZW50KVxufVxuXG4vLyBUT0RPOiByZXBsYWNlIHdpdGggZGF0YSBhdHRyaWJ1dGVzP1xubGV0IGFuc3dlckZvY3VzID0gdHJ1ZVxubGV0IGxhdGV4RWRpdG9yRm9jdXMgPSBmYWxzZVxubGV0IGVxdWF0aW9uRWRpdG9yRm9jdXMgPSBmYWxzZVxubGV0IG1hdGhFZGl0b3JWaXNpYmxlID0gZmFsc2VcbmxldCAkY3VycmVudEVkaXRvclxuXG4kKCdib2R5JykuYXBwZW5kKCRvdXRlclBsYWNlaG9sZGVyKVxuXG5jb25zdCBtYXRoRWRpdG9yID0gaW5pdE1hdGhFZGl0b3IoKVxuY29uc3QgeyR0b29sYmFyLCB0b2dnbGVNYXRoVG9vbGJhcn0gPSB0b29sYmFycy5pbml0KG1hdGhFZGl0b3IsICgpID0+IGFuc3dlckZvY3VzLCBsKVxuXG5oaWRlRWxlbWVudEluRE9NKCR0b29sYmFyKVxuXG5mdW5jdGlvbiBpbml0TWF0aEVkaXRvcigpIHtcbiAgICBjb25zdCAkbWF0aEVkaXRvckNvbnRhaW5lciA9ICQoYFxuICAgICAgICA8ZGl2IGNsYXNzPVwibWF0aC1lZGl0b3JcIiBkYXRhLWpzPVwibWF0aEVkaXRvclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1hdGgtZWRpdG9yLWJveGVzXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1hdGgtZWRpdG9yLWVxdWF0aW9uLWVkaXRvclwiIGRhdGEtanM9XCJlcXVhdGlvbkVkaXRvclwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cIm1hdGgtZWRpdG9yLWxhdGV4LWVkaXRvclwiIGRhdGEtanM9XCJsYXRleEVkaXRvclwiIHBsYWNlaG9sZGVyPVwiTGFUZXhcIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PmApXG5cbiAgICBoaWRlRWxlbWVudEluRE9NKCRtYXRoRWRpdG9yQ29udGFpbmVyKVxuXG4gICAgY29uc3QgJGxhdGV4RWRpdG9yID0gJG1hdGhFZGl0b3JDb250YWluZXIuZmluZCgnW2RhdGEtanM9XCJsYXRleEVkaXRvclwiXScpXG4gICAgY29uc3QgJGVxdWF0aW9uRWRpdG9yID0gJG1hdGhFZGl0b3JDb250YWluZXIuZmluZCgnW2RhdGEtanM9XCJlcXVhdGlvbkVkaXRvclwiXScpXG4gICAgY29uc3QgbXFJbnN0YW5jZSA9IE1RLk1hdGhGaWVsZCgkZXF1YXRpb25FZGl0b3IuZ2V0KDApLCB7XG4gICAgICAgIGhhbmRsZXJzOiB7XG4gICAgICAgICAgICBlZGl0OiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGxhdGV4RWRpdG9yRm9jdXMpXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIGNvbnN0IGxhdGV4ID0gbXFJbnN0YW5jZS5sYXRleCgpXG4gICAgICAgICAgICAgICAgJGxhdGV4RWRpdG9yLnZhbChsYXRleClcbiAgICAgICAgICAgICAgICB1cGRhdGVNYXRoSW1nKCRtYXRoRWRpdG9yQ29udGFpbmVyLnByZXYoKSwgbGF0ZXgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW50ZXI6IGZpZWxkID0+IHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBkbyBub3QgY2xvc2UgZWRpdG9yIC8gbyBub3QgY3JlYXRlIGEgbmV3IGVxdWF0aW9uIGlmIHRoZXJlIGlzIG5vIHRleHQ/XG4gICAgICAgICAgICAgICAgbWF0aEVkaXRvci5jbG9zZU1hdGhFZGl0b3IodHJ1ZSlcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGluc2VydE5ld0VxdWF0aW9uKCc8ZGl2PjwvZGl2PicpLCAyKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcblxuICAgICRlcXVhdGlvbkVkaXRvclxuICAgICAgICAub24oJ2ZvY3VzIGJsdXInLCAnLm1xLXRleHRhcmVhIHRleHRhcmVhJywgZSA9PiB7XG4gICAgICAgICAgICBlcXVhdGlvbkVkaXRvckZvY3VzID0gZS50eXBlICE9PSAnYmx1cicgJiYgZS50eXBlICE9PSAnZm9jdXNvdXQnXG4gICAgICAgICAgICBvbkZvY3VzQ2hhbmdlZCgpXG4gICAgICAgIH0pXG5cbiAgICBmdW5jdGlvbiBvbkxhdGV4VXBkYXRlKCkge1xuICAgICAgICB1cGRhdGVNYXRoSW1nKCRtYXRoRWRpdG9yQ29udGFpbmVyLnByZXYoKSwgJGxhdGV4RWRpdG9yLnZhbCgpKVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IG1xSW5zdGFuY2UubGF0ZXgoJGxhdGV4RWRpdG9yLnZhbCgpKSwgMSlcbiAgICB9XG5cbiAgICAkbGF0ZXhFZGl0b3JcbiAgICAgICAgLmtleXVwKG9uTGF0ZXhVcGRhdGUpXG4gICAgICAgIC5vbignZm9jdXMgYmx1cicsIGUgPT4ge1xuICAgICAgICAgICAgbGF0ZXhFZGl0b3JGb2N1cyA9IGUudHlwZSAhPT0gJ2JsdXInXG4gICAgICAgICAgICBvbkZvY3VzQ2hhbmdlZCgpXG4gICAgICAgIH0pXG5cbiAgICBsZXQgZm9jdXNDaGFuZ2VkID0gbnVsbFxuXG4gICAgZnVuY3Rpb24gb25Gb2N1c0NoYW5nZWQoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChmb2N1c0NoYW5nZWQpXG4gICAgICAgIGZvY3VzQ2hhbmdlZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFsYXRleEVkaXRvckZvY3VzICYmICFlcXVhdGlvbkVkaXRvckZvY3VzKSBjbG9zZU1hdGhFZGl0b3IoKVxuICAgICAgICAgICAgaWYgKCFhbnN3ZXJGb2N1cyAmJiAhbWF0aEVkaXRvclZpc2libGUgJiYgIWxhdGV4RWRpdG9yRm9jdXMgJiYgIWVxdWF0aW9uRWRpdG9yRm9jdXMpIG9uRWRpdG9yQmx1cigpXG4gICAgICAgIH0sIDApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zZXJ0TmV3RXF1YXRpb24ob3B0aW9uYWxNYXJrdXApIHtcbiAgICAgICAgd2luZG93LmRvY3VtZW50LmV4ZWNDb21tYW5kKCdpbnNlcnRIVE1MJywgZmFsc2UsIChvcHRpb25hbE1hcmt1cCA/IG9wdGlvbmFsTWFya3VwIDogJycpICsgJzxpbWcgZGF0YS1qcz1cIm5ld1wiIHN0eWxlPVwiZGlzcGxheTogbm9uZVwiLz4nKVxuICAgICAgICBjb25zdCAkYWRkZWRFcXVhdGlvbkltYWdlID0gJCgnW2RhdGEtanM9XCJuZXdcIl0nKVxuICAgICAgICAkYWRkZWRFcXVhdGlvbkltYWdlXG4gICAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS1qcycpXG5cbiAgICAgICAgbW92ZUVsZW1lbnRBZnRlcigkbWF0aEVkaXRvckNvbnRhaW5lciwgJGFkZGVkRXF1YXRpb25JbWFnZSlcblxuICAgICAgICBtcUluc3RhbmNlLmxhdGV4KCcnKVxuICAgICAgICBtYXRoRWRpdG9yVmlzaWJsZSA9IHRydWVcbiAgICAgICAgdG9nZ2xlTWF0aFRvb2xiYXIodHJ1ZSlcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBtcUluc3RhbmNlLmZvY3VzKCksIDApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zZXJ0TWF0aChzeW1ib2wsIGFsdGVybmF0aXZlU3ltYm9sLCB1c2VXcml0ZSkge1xuICAgICAgICBpZiAobGF0ZXhFZGl0b3JGb2N1cykge1xuICAgICAgICAgICAgaW5zZXJ0VG9UZXh0QXJlYUF0Q3Vyc29yKCRsYXRleEVkaXRvci5nZXQoMCksIGFsdGVybmF0aXZlU3ltYm9sIHx8IHN5bWJvbClcbiAgICAgICAgICAgIG9uTGF0ZXhVcGRhdGUoKVxuICAgICAgICB9IGVsc2UgaWYgKGVxdWF0aW9uRWRpdG9yRm9jdXMpIHtcbiAgICAgICAgICAgIGlmICh1c2VXcml0ZSkge1xuICAgICAgICAgICAgICAgIG1xSW5zdGFuY2Uud3JpdGUoc3ltYm9sKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtcUluc3RhbmNlLnR5cGVkVGV4dChzeW1ib2wpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzeW1ib2wuc3RhcnRzV2l0aCgnXFxcXCcpKSBtcUluc3RhbmNlLmtleXN0cm9rZSgnVGFiJylcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gbXFJbnN0YW5jZS5mb2N1cygpLCAwKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTWF0aEltZygkaW1nLCBsYXRleCkge1xuICAgICAgICAkaW1nXG4gICAgICAgICAgICAucHJvcCgnc3JjJywgJy9tYXRoLnN2Zz9sYXRleD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGxhdGV4KSlcbiAgICAgICAgICAgIC5wcm9wKCdhbHQnLCBsYXRleClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZU1hdGhFZGl0b3Ioc2V0Rm9jdXNBZnRlckNsb3NlID0gZmFsc2UpIHtcbiAgICAgICAgLy8gVE9ETzogcmVtb3ZlIGV2ZW50IGJpbmRpbmdzXG4gICAgICAgIGNvbnN0ICRjdXJyZW50RWRpdG9yID0gJG1hdGhFZGl0b3JDb250YWluZXIuY2xvc2VzdCgnW2RhdGEtanM9XCJhbnN3ZXJcIl0nKVxuICAgICAgICBjb25zdCAkaW1nID0gJG1hdGhFZGl0b3JDb250YWluZXIucHJldigpXG4gICAgICAgIGlmICgkbGF0ZXhFZGl0b3IudmFsKCkudHJpbSgpID09PSAnJykge1xuICAgICAgICAgICAgJGltZy5yZW1vdmUoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGltZy5zaG93KClcbiAgICAgICAgICAgIHVwZGF0ZU1hdGhJbWcoJGltZywgJGxhdGV4RWRpdG9yLnZhbCgpKVxuICAgICAgICB9XG5cbiAgICAgICAgdG9nZ2xlTWF0aFRvb2xiYXIoZmFsc2UpXG4gICAgICAgIGhpZGVFbGVtZW50SW5ET00oJG1hdGhFZGl0b3JDb250YWluZXIpXG4gICAgICAgIG1hdGhFZGl0b3JWaXNpYmxlID0gZmFsc2VcbiAgICAgICAgbGF0ZXhFZGl0b3JGb2N1cyA9IGZhbHNlXG4gICAgICAgIGVxdWF0aW9uRWRpdG9yRm9jdXMgPSBmYWxzZVxuICAgICAgICBpZiAoc2V0Rm9jdXNBZnRlckNsb3NlKSAkY3VycmVudEVkaXRvci5mb2N1cygpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb3Blbk1hdGhFZGl0b3IoJGltZykge1xuICAgICAgICBpZiAobWF0aEVkaXRvclZpc2libGUpIGNsb3NlTWF0aEVkaXRvcigpXG4gICAgICAgICRpbWcuaGlkZSgpXG4gICAgICAgIG1vdmVFbGVtZW50QWZ0ZXIoJG1hdGhFZGl0b3JDb250YWluZXIsICRpbWcpXG4gICAgICAgIGNvbnN0IGxhdGV4ID0gJGltZy5wcm9wKCdhbHQnKVxuICAgICAgICAkbGF0ZXhFZGl0b3IudmFsKGxhdGV4KVxuICAgICAgICBvbkxhdGV4VXBkYXRlKClcbiAgICAgICAgbWF0aEVkaXRvclZpc2libGUgPSB0cnVlXG4gICAgICAgIHRvZ2dsZU1hdGhUb29sYmFyKHRydWUpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gbXFJbnN0YW5jZS5mb2N1cygpLCAwKVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGluc2VydE5ld0VxdWF0aW9uLFxuICAgICAgICBpbnNlcnRNYXRoLFxuICAgICAgICBjbG9zZU1hdGhFZGl0b3IsXG4gICAgICAgIG9wZW5NYXRoRWRpdG9yLFxuICAgICAgICBvbkZvY3VzQ2hhbmdlZFxuICAgIH1cbn1cblxuZnVuY3Rpb24gb25FZGl0b3JGb2N1cygkZWxlbWVudCkge1xuICAgICRjdXJyZW50RWRpdG9yID0gJGVsZW1lbnRcbiAgICAkZWxlbWVudC5iZWZvcmUoJHRvb2xiYXIpXG4gICAgJHRvb2xiYXIuc2hvdygpXG59XG5cbmZ1bmN0aW9uIG9uRWRpdG9yQmx1cigpIHtcbiAgICAvLyBUT0RPOiByZW1vdmUgZXZlbnQgYmluZGluZ3NcbiAgICBoaWRlRWxlbWVudEluRE9NKCR0b29sYmFyKVxuICAgIG1hdGhFZGl0b3IuY2xvc2VNYXRoRWRpdG9yKClcbiAgICAvLyAkZWRpdG9yLm9mZigpXG5cbiAgICBhbnN3ZXJGb2N1cyA9IGZhbHNlXG4gICAgbWF0aEVkaXRvclZpc2libGUgPSBmYWxzZVxuICAgIGxhdGV4RWRpdG9yRm9jdXMgPSBmYWxzZVxufVxuXG5sZXQgYmx1cnJlZFxuXG5mdW5jdGlvbiBvbkVkaXRvckZvY3VzQ2hhbmdlZChlKSB7XG4gICAgYW5zd2VyRm9jdXMgPSBlLnR5cGUgPT09ICdmb2N1cydcblxuICAgIGNsZWFyVGltZW91dChibHVycmVkKVxuICAgIGJsdXJyZWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKCFhbnN3ZXJGb2N1cyAmJiAhbWF0aEVkaXRvclZpc2libGUgJiYgIWxhdGV4RWRpdG9yRm9jdXMgJiYgIWVxdWF0aW9uRWRpdG9yRm9jdXMpIG9uRWRpdG9yQmx1cigpXG4gICAgICAgIGVsc2UgaWYgKGFuc3dlckZvY3VzICYmIG1hdGhFZGl0b3JWaXNpYmxlKSBtYXRoRWRpdG9yLmNsb3NlTWF0aEVkaXRvcigpXG4gICAgICAgIGVsc2Ugb25FZGl0b3JGb2N1cygkKGUudGFyZ2V0KSlcbiAgICB9LCAwKVxufVxuXG5mdW5jdGlvbiBpc01hdGhFZGl0b3JWaXNpYmxlKCkge1xuICAgIHJldHVybiBtYXRoRWRpdG9yVmlzaWJsZVxufVxuXG5jb25zdCBtYXJrQW5kR2V0SW5saW5lSW1hZ2VzID0gJGVkaXRvciA9PiAkZWRpdG9yLmZpbmQoJ2ltZ1tzcmNePVwiZGF0YVwiXScpXG4gICAgLmVhY2goKGksIGVsKSA9PiBlbC5zZXRBdHRyaWJ1dGUoJ2lkJywgbmV3IERhdGUoKS5nZXRUaW1lKCkgKyAnLScgKyBpKSlcbiAgICAubWFwKChpLCBlbCkgPT4gT2JqZWN0LmFzc2lnbihkZWNvZGVCYXNlNjRJbWFnZShlbC5nZXRBdHRyaWJ1dGUoJ3NyYycpKSwge2lkOiBlbC5nZXRBdHRyaWJ1dGUoJ2lkJyl9KSlcbiAgICAudG9BcnJheSgpXG4gICAgLmZpbHRlcigoe3R5cGV9KSA9PiB0eXBlID09PSAnaW1hZ2UvcG5nJylcblxuY29uc3QgcGVyc2lzdElubGluZUltYWdlcyA9ICgkZWRpdG9yLCBzY3JlZW5zaG90U2F2ZXIpID0+IHtcbiAgICByZXR1cm4gQmFjb24uY29tYmluZUFzQXJyYXkoXG4gICAgICAgIG1hcmtBbmRHZXRJbmxpbmVJbWFnZXMoJGVkaXRvcilcbiAgICAgICAgICAgIC5tYXAoZGF0YSA9PiBCYWNvbi5mcm9tUHJvbWlzZShcbiAgICAgICAgICAgICAgICBzY3JlZW5zaG90U2F2ZXIoZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oc2NyZWVuc2hvdFVybCA9PiAkZWRpdG9yLmZpbmQoJyMnICsgZGF0YS5pZCkuYXR0cignc3JjJywgc2NyZWVuc2hvdFVybCkucmVtb3ZlQXR0cignaWQnKSkpXG4gICAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICAgLm9uVmFsdWUoKCkgPT4gJGVkaXRvci50cmlnZ2VyKCdpbnB1dCcpKVxufVxuXG5jb25zdCBtYWtlUmljaFRleHQgPSAoZWxlbWVudCwgb3B0aW9ucywgb25WYWx1ZUNoYW5nZWQgPSAoKSA9PiB7IH0pID0+IHtcbiAgICBjb25zdCB7XG4gICAgICAgIHNjcmVlbnNob3Q6IHtcbiAgICAgICAgICAgIHNhdmVyXG4gICAgICAgIH1cbiAgICB9ID0gb3B0aW9uc1xuICAgIGNvbnN0ICRhbnN3ZXIgPSAkKGVsZW1lbnQpXG4gICAgJGFuc3dlclxuICAgICAgICAuYXR0cignY29udGVudGVkaXRhYmxlJywgJ3RydWUnKVxuICAgICAgICAuYXR0cignc3BlbGxjaGVjaycsICdmYWxzZScpXG4gICAgICAgIC5hdHRyKCdkYXRhLWpzJywgJ2Fuc3dlcicpXG4gICAgICAgIC5hZGRDbGFzcygnbWF0aC1lZGl0b3ItYW5zd2VyJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgZSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNDdHJsS2V5KGUsIGtleUNvZGVzLkVOVEVSKSB8fCBpc0tleShlLCBrZXlDb2Rlcy5FU0MpKSBtYXRoRWRpdG9yLmNsb3NlTWF0aEVkaXRvcih0cnVlKVxuICAgICAgICB9KVxuICAgICAgICAub24oJ21vdXNlZG93bicsICdpbWdbc3JjXj1cIi9tYXRoLnN2Z1wiXScsIGUgPT4ge1xuICAgICAgICAgICAgb25FZGl0b3JGb2N1cygkKGUudGFyZ2V0KS5jbG9zZXN0KCdbZGF0YS1qcz1cImFuc3dlclwiXScpKVxuICAgICAgICAgICAgbWF0aEVkaXRvci5vcGVuTWF0aEVkaXRvcigkKGUudGFyZ2V0KSlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdrZXlwcmVzcycsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKGlzQ3RybEtleShlLCAnbCcpIHx8IGlzQ3RybEtleShlLCAnaScpKSBtYXRoRWRpdG9yLmluc2VydE5ld0VxdWF0aW9uKClcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdmb2N1cyBibHVyJywgZSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNNYXRoRWRpdG9yVmlzaWJsZSgpICYmIGUudHlwZSA9PT0gJ2ZvY3VzJykgbWF0aEVkaXRvci5jbG9zZU1hdGhFZGl0b3IoKVxuICAgICAgICAgICAgb25FZGl0b3JGb2N1c0NoYW5nZWQoZSlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdrZXl1cCBpbnB1dCcsIGUgPT4gb25WYWx1ZUNoYW5nZWQoc2FuaXRpemVDb250ZW50KGUuY3VycmVudFRhcmdldCkpKVxuICAgICAgICAub24oJ3Bhc3RlJywgZSA9PiB7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJylcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIGNvbnN0IGNsaXBib2FyZERhdGEgPSBlLm9yaWdpbmFsRXZlbnQuY2xpcGJvYXJkRGF0YVxuICAgICAgICAgICAgY29uc3QgZmlsZSA9IGNsaXBib2FyZERhdGEuaXRlbXMgJiYgY2xpcGJvYXJkRGF0YS5pdGVtc1swXS5nZXRBc0ZpbGUoKVxuICAgICAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICBpZihmaWxlLnR5cGUgIT09ICdpbWFnZS9wbmcnKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICBzYXZlcih7ZGF0YTogZmlsZSwgdHlwZTogZmlsZS50eXBlfSkudGhlbihzY3JlZW5zaG90VXJsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1nID0gYDxpbWcgc3JjPVwiJHtzY3JlZW5zaG90VXJsfVwiLz5gXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0SFRNTCcsIGZhbHNlLCBpbWcpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2xpcGJvYXJkRGF0YUFzSHRtbCA9IGNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dC9odG1sJylcbiAgICAgICAgICAgICAgICBpZiAoY2xpcGJvYXJkRGF0YUFzSHRtbCkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LmV4ZWNDb21tYW5kKCdpbnNlcnRIVE1MJywgZmFsc2UsIHNhbml0aXplKGNsaXBib2FyZERhdGFBc0h0bWwpKVxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4gcGVyc2lzdElubGluZUltYWdlcygkY3VycmVudEVkaXRvciwgc2F2ZXIpLCAwKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiBwZXJzaXN0SW5saW5lSW1hZ2VzKCRjdXJyZW50RWRpdG9yLCBzYXZlciksIDApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtYWtlUmljaFRleHRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGFsbG93ZWRUYWdzOiBbXG4gICAgICAgICdkaXYnLFxuICAgICAgICAnaW1nJyxcbiAgICAgICAgJ2JyJ1xuICAgIF0sXG4gICAgYWxsb3dlZEF0dHJpYnV0ZXM6IHtcbiAgICAgICAgaW1nOiBbJ3NyYycsICdhbHQnXVxuICAgIH0sXG4gICAgYWxsb3dlZFNjaGVtZXM6IFsnZGF0YScsICdodHRwJywgJ2h0dHBzJ10sXG4gICAgZXhjbHVzaXZlRmlsdGVyOiBmdW5jdGlvbihmcmFtZSkgeyByZXR1cm4gZnJhbWUuYXR0cmlic1snZGF0YS1qcyddID09PSAnbWF0aEVkaXRvcicgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gICAge2NoYXJhY3RlcjogJ+KJoScsIGxhdGV4Q29tbWFuZDogJ1xcXFxlcXVpdid9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiaInfSwgLy8gXFxuZXF1aXYgb3IgXFxub3RcXGVxdWl2XG4gICAge2NoYXJhY3RlcjogJ+KJiCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxhcHByb3gnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oi8JywgbGF0ZXhDb21tYW5kOiAnXFxcXHNpbSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiaAnLCBsYXRleENvbW1hbmQ6ICdcXFxcbmVxJ30sXG4gICAge2NoYXJhY3RlcjogJ+KJpCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxsZXEnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4omlJywgbGF0ZXhDb21tYW5kOiAnXFxcXGdlcSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfigKYnLCBsYXRleENvbW1hbmQ6ICdcXFxcZG90cyd9LFxuICAgIHtjaGFyYWN0ZXI6ICfCsicsIGxhdGV4Q29tbWFuZDogJ14yJ30sXG4gICAge2NoYXJhY3RlcjogJ8KzJywgbGF0ZXhDb21tYW5kOiAnXjMnfSxcbiAgICB7Y2hhcmFjdGVyOiAnwr0nLCBsYXRleENvbW1hbmQ6ICcxLzInfSxcbiAgICB7Y2hhcmFjdGVyOiAnwrcnLCBsYXRleENvbW1hbmQ6ICdcXFxcY2RvdCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfCsScsIGxhdGV4Q29tbWFuZDogJ1xcXFxwbSd9LFxuXG4gICAge2NoYXJhY3RlcjogJ8KwJ30sXG4gICAge2NoYXJhY3RlcjogJ+KImCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxjaXJjJ30sXG4gICAge2NoYXJhY3RlcjogJ+KIoCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxhbmdsZSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiqUnLCBsYXRleENvbW1hbmQ6ICdcXFxccGVycCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfigJYnLCBsYXRleENvbW1hbmQ6ICdcXFxccGFyYWxsZWwnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oeFJ30sXG5cbiAgICB7Y2hhcmFjdGVyOiAnwrUnLCBsYXRleENvbW1hbmQ6ICdcXFxcbXUnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oiCJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBhcnRpYWwnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oiRJywgbGF0ZXhDb21tYW5kOiAnXFxcXFNpZ21hJ30sXG4gICAge2NoYXJhY3RlcjogJ+KIjycsIGxhdGV4Q29tbWFuZDogJ1xcXFxQaSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfOqScsIGxhdGV4Q29tbWFuZDogJ1xcXFxPbWVnYSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfOlCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxEZWx0YSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfwnZyEJywgbGF0ZXhDb21tYW5kOiAnXFxcXGlvdGEnfSxcbiAgICB7Y2hhcmFjdGVyOiAnzpMnLCBsYXRleENvbW1hbmQ6ICdcXFxcR2FtbWEnfSxcbiAgICB7Y2hhcmFjdGVyOiAnzpgnLCBsYXRleENvbW1hbmQ6ICdcXFxcVGhldGEnfSxcbiAgICB7Y2hhcmFjdGVyOiAnzqYnLCBsYXRleENvbW1hbmQ6ICdcXFxcUGhpJ30sXG4gICAge2NoYXJhY3RlcjogJ863JywgbGF0ZXhDb21tYW5kOiAnXFxcXGV0YSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfOsScsIGxhdGV4Q29tbWFuZDogJ1xcXFxhbHBoYSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfOtCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxkZWx0YSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfOtScsIGxhdGV4Q29tbWFuZDogJ1xcXFx2YXJlcHNpbG9uJ30sXG4gICAge2NoYXJhY3RlcjogJ8+DJywgbGF0ZXhDb21tYW5kOiAnXFxcXHNpZ21hJ30sXG4gICAge2NoYXJhY3RlcjogJ8+EJywgbGF0ZXhDb21tYW5kOiAnXFxcXHRhdSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfOqScsIGxhdGV4Q29tbWFuZDogJ1xcXFxPbWVnYSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfPiScsIGxhdGV4Q29tbWFuZDogJ1xcXFxvbWVnYSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfPgCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxwaSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfQpCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxwaGknfSxcblxuICAgIHtjaGFyYWN0ZXI6ICfihpEnLCBsYXRleENvbW1hbmQ6ICdcXFxcdXBhcnJvdyd9LFxuICAgIHtjaGFyYWN0ZXI6ICfihpInLCBsYXRleENvbW1hbmQ6ICdcXFxccmlnaHRhcnJvdyd9LFxuICAgIHtjaGFyYWN0ZXI6ICfihpMnLCBsYXRleENvbW1hbmQ6ICdcXFxcZG93bmFycm93J30sXG4gICAge2NoYXJhY3RlcjogJ+KGlCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxsZWZ0cmlnaHRhcnJvdyd9LFxuICAgIHtjaGFyYWN0ZXI6ICfih5InLCBsYXRleENvbW1hbmQ6ICdcXFxcUmlnaHRhcnJvdyd9LFxuICAgIHtjaGFyYWN0ZXI6ICfih5QnLCBsYXRleENvbW1hbmQ6ICdcXFxcTGVmdHJpZ2h0YXJyb3cnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oeMJ30sIC8vIFxccmlnaHRsZWZ0aGFycG9vbnNcbiAgICB7Y2hhcmFjdGVyOiAn4oieJywgbGF0ZXhDb21tYW5kOiAnXFxcXGluZnR5J30sXG5cbiAgICB7Y2hhcmFjdGVyOiAn4oiIJywgbGF0ZXhDb21tYW5kOiAnXFxcXGluJ30sXG4gICAge2NoYXJhY3RlcjogJ+KIiScsIGxhdGV4Q29tbWFuZDogJ1xcXFxub3Rpbid9LFxuICAgIHtjaGFyYWN0ZXI6ICfihJ0nfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oSVJ30sXG4gICAge2NoYXJhY3RlcjogJ+KEpCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfihJonfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oqCJywgbGF0ZXhDb21tYW5kOiAnXFxcXHN1YnNldCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiioQnLCBsYXRleENvbW1hbmQ6ICdcXFxcbm90c3Vic2V0J30sXG4gICAge2NoYXJhY3RlcjogJ+KIqScsIGxhdGV4Q29tbWFuZDogJ1xcXFxjYXAnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oiqJywgbGF0ZXhDb21tYW5kOiAnXFxcXGN1cCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiIUnLCBsYXRleENvbW1hbmQ6ICdcXFxcZW1wdHknfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oiWJywgbGF0ZXhDb21tYW5kOiAnXFxcXHNldG1pbnVzJ30sXG5cbiAgICB7Y2hhcmFjdGVyOiAnwqwnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oinJywgbGF0ZXhDb21tYW5kOiAnXFxcXGFuZCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiKgnLCBsYXRleENvbW1hbmQ6ICdcXFxcb3InfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oiAJywgbGF0ZXhDb21tYW5kOiAnXFxcXGZvcmFsbCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiIMnLCBsYXRleENvbW1hbmQ6ICdcXFxcZXhpc3RzJ31cbl1cbiIsImNvbnN0IHNwZWNpYWxDaGFyYWN0ZXJzID0gcmVxdWlyZSgnLi9zcGVjaWFsQ2hhcmFjdGVycycpXG5jb25zdCBsYXRleENvbW1hbmRzID0gcmVxdWlyZSgnLi9sYXRleENvbW1hbmRzJylcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaW5pdCxcbn1cblxuZnVuY3Rpb24gaW5pdChtYXRoRWRpdG9yLCBoYXNBbnN3ZXJGb2N1cywgbCkge1xuICAgIGNvbnN0ICR0b29sYmFyID0gJChgICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1hdGgtZWRpdG9yLXRvb2xzXCIgZGF0YS1qcz1cInRvb2xzXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWF0aC1lZGl0b3ItY2hhcmFjdGVyc1wiIGRhdGEtanM9XCJjaGFyYWN0ZXJzXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRoLWVkaXRvci1zcGVjaWFsLWNoYXJhY3RlcnNcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYXRoLWVkaXRvci10b29sYmFyIG1hdGgtZWRpdG9yLWxpc3RcIiBkYXRhLWpzPVwiY2hhcmFjdGVyc0xpc3RcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYXRoLWVkaXRvci1lcXVhdGlvbiBtYXRoLWVkaXRvci10b29sYmFyIG1hdGgtZWRpdG9yLWxpc3QgbWF0aC1lZGl0b3ItaGlkZGVuXCIgZGF0YS1qcz1cIm1hdGhUb29sYmFyXCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJtYXRoLWVkaXRvci1uZXctZXF1YXRpb24gbWF0aC1lZGl0b3ItYnV0dG9uIG1hdGgtZWRpdG9yLWJ1dHRvbi1hY3Rpb25cIiBkYXRhLWpzPVwibmV3RXF1YXRpb25cIiB0aXRsZT1cIkN0cmwtTFwiPiR7bC5pbnNlcnRFcXVhdGlvbn08L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgYClcbiAgICBjb25zdCAkbmV3RXF1YXRpb24gPSAkdG9vbGJhci5maW5kKCdbZGF0YS1qcz1cIm5ld0VxdWF0aW9uXCJdJylcbiAgICBjb25zdCAkbWF0aFRvb2xiYXIgPSAkdG9vbGJhci5maW5kKCdbZGF0YS1qcz1cIm1hdGhUb29sYmFyXCJdJylcbiAgICBpbml0U3BlY2lhbENoYXJhY3RlclRvb2xiYXIoJHRvb2xiYXIsIG1hdGhFZGl0b3IsIGhhc0Fuc3dlckZvY3VzKVxuICAgIGluaXRNYXRoVG9vbGJhcigkbWF0aFRvb2xiYXIsIG1hdGhFZGl0b3IpXG4gICAgaW5pdE5ld0VxdWF0aW9uKCRuZXdFcXVhdGlvbiwgbWF0aEVkaXRvciwgaGFzQW5zd2VyRm9jdXMpXG5cbiAgICBmdW5jdGlvbiB0b2dnbGVNYXRoVG9vbGJhcihpc1Zpc2libGUpIHtcbiAgICAgICAgJG5ld0VxdWF0aW9uLnRvZ2dsZSghaXNWaXNpYmxlKVxuICAgICAgICAkbWF0aFRvb2xiYXIudG9nZ2xlKGlzVmlzaWJsZSlcbiAgICB9XG5cbiAgICByZXR1cm4geyAkdG9vbGJhciwgdG9nZ2xlTWF0aFRvb2xiYXIgfVxufVxuXG5mdW5jdGlvbiBpbml0U3BlY2lhbENoYXJhY3RlclRvb2xiYXIoJHRvb2xiYXIsIG1hdGhFZGl0b3IsIGhhc0Fuc3dlckZvY3VzKSB7XG4gICAgJHRvb2xiYXIuZmluZCgnW2RhdGEtanM9XCJjaGFyYWN0ZXJzTGlzdFwiXScpXG4gICAgICAgIC5hcHBlbmQoc3BlY2lhbENoYXJhY3RlcnMubWFwKGNoYXIgPT4gYDxidXR0b24gY2xhc3M9XCJtYXRoLWVkaXRvci1idXR0b24gbWF0aC1lZGl0b3ItYnV0dG9uLWdyaWRcIiAke2NoYXIubGF0ZXhDb21tYW5kID8gYGRhdGEtY29tbWFuZD1cIiR7Y2hhci5sYXRleENvbW1hbmR9XCJgIDogJyd9PiR7Y2hhci5jaGFyYWN0ZXJ9PC9idXR0b24+YCkpXG4gICAgICAgIC5vbignbW91c2Vkb3duJywgJ2J1dHRvbicsIGUgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICBjb25zdCBjaGFyYWN0ZXIgPSBlLmN1cnJlbnRUYXJnZXQuaW5uZXJUZXh0XG4gICAgICAgICAgICBjb25zdCBjb21tYW5kID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY29tbWFuZFxuICAgICAgICAgICAgaWYgKGhhc0Fuc3dlckZvY3VzKCkpIHdpbmRvdy5kb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0VGV4dCcsIGZhbHNlLCBjaGFyYWN0ZXIpXG4gICAgICAgICAgICBlbHNlIG1hdGhFZGl0b3IuaW5zZXJ0TWF0aChjb21tYW5kIHx8IGNoYXJhY3RlcilcbiAgICAgICAgfSlcbn1cblxuZnVuY3Rpb24gaW5pdE1hdGhUb29sYmFyKCRtYXRoVG9vbGJhciwgbWF0aEVkaXRvcikge1xuICAgICRtYXRoVG9vbGJhci5hcHBlbmQobGF0ZXhDb21tYW5kc1xuICAgICAgICAubWFwKG8gPT4gYDxidXR0b24gdGl0bGU9XCIke28uYWN0aW9ufVwiIGNsYXNzPVwibWF0aC1lZGl0b3ItYnV0dG9uIG1hdGgtZWRpdG9yLWJ1dHRvbi1ncmlkXCIgZGF0YS1jb21tYW5kPVwiJHtvLmFjdGlvbn1cIiBkYXRhLWxhdGV4Y29tbWFuZD1cIiR7by5sYWJlbH1cIiBkYXRhLXVzZXdyaXRlPVwiJHtvLnVzZVdyaXRlIHx8IGZhbHNlfVwiPlxuPGltZyBzcmM9XCIvbWF0aC5zdmc/bGF0ZXg9JHtlbmNvZGVVUklDb21wb25lbnQoby5sYWJlbCA/IG8ubGFiZWwucmVwbGFjZSgvWC9nLCAnXFxcXHNxdWFyZScpIDogby5hY3Rpb24pfVwiLz5cbjwvYnV0dG9uPmApLmpvaW4oJycpXG4gICAgKS5vbignbW91c2Vkb3duJywgJ2J1dHRvbicsIGUgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgY29uc3QgZGF0YXNldCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0O1xuICAgICAgICBtYXRoRWRpdG9yLmluc2VydE1hdGgoZGF0YXNldC5jb21tYW5kLCBkYXRhc2V0LmxhdGV4Y29tbWFuZCwgZGF0YXNldC51c2V3cml0ZSA9PT0gJ3RydWUnKVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGluaXROZXdFcXVhdGlvbigkbmV3RXF1YXRpb24sIG1hdGhFZGl0b3IsIGhhc0Fuc3dlckZvY3VzKSB7XG4gICAgJG5ld0VxdWF0aW9uLm1vdXNlZG93bigoZSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBpZiAoIWhhc0Fuc3dlckZvY3VzKCkpIHJldHVybiAvLyBUT0RPOiByZW1vdmUgd2hlbiBidXR0b24gaXMgb25seSB2aXNpYmxlIHdoZW4gdGV4dGFyZWEgaGFzIGZvY3VzXG4gICAgICAgIG1hdGhFZGl0b3IuaW5zZXJ0TmV3RXF1YXRpb24oKVxuICAgIH0pLmJpbmQodGhpcykpXG59XG4iLCJjb25zdCBzYW5pdGl6ZUh0bWwgPSByZXF1aXJlKCdzYW5pdGl6ZS1odG1sJylcbmNvbnN0IHNhbml0aXplT3B0cyA9IHJlcXVpcmUoJy4vc2FuaXRpemVPcHRzJylcblxubW9kdWxlLmV4cG9ydHMgPSB7aXNLZXksIGlzQ3RybEtleSwgaW5zZXJ0VG9UZXh0QXJlYUF0Q3Vyc29yLCBkZWNvZGVCYXNlNjRJbWFnZSwgc2FuaXRpemUsIHNhbml0aXplQ29udGVudH1cblxuZnVuY3Rpb24gc2FuaXRpemUoaHRtbCkge1xuICAgIHJldHVybiBzYW5pdGl6ZUh0bWwoaHRtbCwgc2FuaXRpemVPcHRzKVxufVxuZnVuY3Rpb24gaW5zZXJ0VG9UZXh0QXJlYUF0Q3Vyc29yKGZpZWxkLCB2YWx1ZSkge1xuICAgIGNvbnN0IHN0YXJ0UG9zID0gZmllbGQuc2VsZWN0aW9uU3RhcnRcbiAgICBjb25zdCBlbmRQb3MgPSBmaWVsZC5zZWxlY3Rpb25FbmRcbiAgICBsZXQgb2xkVmFsdWUgPSBmaWVsZC52YWx1ZVxuICAgIGZpZWxkLnZhbHVlID0gb2xkVmFsdWUuc3Vic3RyaW5nKDAsIHN0YXJ0UG9zKSArIHZhbHVlICsgb2xkVmFsdWUuc3Vic3RyaW5nKGVuZFBvcywgb2xkVmFsdWUubGVuZ3RoKVxuICAgIGZpZWxkLnNlbGVjdGlvblN0YXJ0ID0gZmllbGQuc2VsZWN0aW9uRW5kID0gc3RhcnRQb3MgKyB2YWx1ZS5sZW5ndGhcbn1cblxuZnVuY3Rpb24gZGVjb2RlQmFzZTY0SW1hZ2UoZGF0YVN0cmluZykge1xuICAgIGlmICghZGF0YVN0cmluZylcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICBjb25zdCBtYXRjaGVzID0gZGF0YVN0cmluZy5tYXRjaCgvXmRhdGE6KFtBLVphLXotK1xcL10rKTtiYXNlNjQsKC4rKSQvKVxuICAgIGlmIChtYXRjaGVzLmxlbmd0aCAhPT0gMykge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBtYXRjaGVzWzFdLFxuICAgICAgICBkYXRhOiBuZXcgQnVmZmVyKG1hdGNoZXNbMl0sICdiYXNlNjQnKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNLZXkoZSwga2V5KSB7IHJldHVybiBwcmV2ZW50SWZUcnVlKGUsICFlLmFsdEtleSAmJiAhZS5zaGlmdEtleSAmJiAhZS5jdHJsS2V5ICAmJiBrZXlPcktleUNvZGUoZSwga2V5KSl9XG5cbmZ1bmN0aW9uIGlzQ3RybEtleShlLCBrZXkpIHsgcmV0dXJuIHByZXZlbnRJZlRydWUoZSwgIWUuYWx0S2V5ICYmICFlLnNoaWZ0S2V5ICYmIGUuY3RybEtleSAmJiBrZXlPcktleUNvZGUoZSwga2V5KSl9XG5cbmZ1bmN0aW9uIGtleU9yS2V5Q29kZShlLCB2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnID8gZS5rZXkgPT09IHZhbCA6IGUua2V5Q29kZSA9PT0gdmFsIH1cbmZ1bmN0aW9uIHByZXZlbnRJZlRydWUoZSwgdmFsKSB7XG4gICAgaWYodmFsKSBlLnByZXZlbnREZWZhdWx0KClcbiAgICByZXR1cm4gdmFsXG59XG5cbmZ1bmN0aW9uIHNhbml0aXplQ29udGVudChhbnN3ZXJFbGVtZW50KSB7XG4gICAgY29uc3QgJGFuc3dlckVsZW1lbnQgPSAkKGFuc3dlckVsZW1lbnQpXG4gICAgY29uc3QgJG1hdGhFZGl0b3IgPSAkYW5zd2VyRWxlbWVudC5maW5kKCdbZGF0YS1qcz1cIm1hdGhFZGl0b3JcIl0nKVxuICAgICRtYXRoRWRpdG9yLmhpZGUoKVxuICAgIGNvbnN0IHRleHQgPSAkYW5zd2VyRWxlbWVudC50ZXh0KClcbiAgICAkbWF0aEVkaXRvci5zaG93KClcblxuICAgIGNvbnN0IGh0bWwgPSBzYW5pdGl6ZSgkYW5zd2VyRWxlbWVudC5odG1sKCkpXG5cbiAgICByZXR1cm4geyBhbnN3ZXJIVE1MOiBodG1sLCBhbnN3ZXJUZXh0OiB0ZXh0IH1cbn1cbiJdfQ==
