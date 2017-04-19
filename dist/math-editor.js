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
    var $mathEditorContainer = $('\n        <div class="math-editor" data-js="mathEditor">\n            <div class="math-editor-close" title="Ctrl-Enter">' + l.close + '</div>\n            <div class="math-editor-boxes">\n                <div class="math-editor-equation-editor" data-js="equationEditor"></div>\n                <textarea class="math-editor-latex-editor" data-js="latexEditor" placeholder="LaTex"></textarea>\n            </div>\n        </div>');

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

    $mathEditorContainer.find('.close').mousedown(function (e) {
        e.preventDefault();
        closeMathEditor(true);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvRkkuanMiLCJhcHAvU1YuanMiLCJhcHAvbGF0ZXhDb21tYW5kcy5qcyIsImFwcC9tYXRoLWVkaXRvci5qcyIsImFwcC9zYW5pdGl6ZU9wdHMuanMiLCJhcHAvc3BlY2lhbENoYXJhY3RlcnMuanMiLCJhcHAvdG9vbGJhcnMuanMiLCJhcHAvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsWUFBUTtBQUNKLG9CQUFZLGdCQURSO0FBRUosZUFBTyx5Q0FGSDtBQUdKLGtoQkFISTtBQVdKLHFEQVhJO0FBWUosNGRBWkk7QUF1Qkosb0JBQVksVUF2QlI7QUF3QkosMkJBQW1CLGVBeEJmO0FBeUJKLHdCQUFnQixhQXpCWjtBQTBCSixlQUFPLE9BMUJIO0FBMkJKLGNBQU0sVUEzQkY7QUE0QkosaUJBQVMsWUE1Qkw7QUE2Qkosc0JBQWMsbUJBN0JWO0FBOEJKLGtCQUFVLEtBOUJOO0FBK0JKLG1CQUFXLFlBL0JQO0FBZ0NKLHFCQUFhO0FBaENULEtBREs7QUFtQ2IsZ0JBQVk7QUFDUixzQkFBYyxtQkFETjtBQUVSLGlCQUFTLFlBRkQ7QUFHUixvQkFBWSxnQkFISjtBQUlSLGVBQU8sV0FKQztBQUtSLGtCQUFVLEdBTEY7QUFNUix1QkFBZSxzQkFOUDtBQU9SLGNBQU0sb0JBUEU7QUFRUixrQkFBVSxlQVJGO0FBU1IsbUJBQVc7QUFUSDtBQW5DQyxDQUFqQjs7Ozs7QUNBQSxPQUFPLE9BQVAsR0FBaUI7QUFDYixZQUFRO0FBQ0osb0JBQVksaUJBRFI7QUFFSixlQUFPLDBDQUZIO0FBR0osNmhCQUhJO0FBUUosd0RBUkk7QUFTSixvWUFUSTtBQWtCSixvQkFBWSxhQWxCUjtBQW1CSiwyQkFBbUIsZUFuQmY7QUFvQkosd0JBQWdCLGtCQXBCWjtBQXFCSixlQUFPLE9BckJIO0FBc0JKLGNBQU0sT0F0QkY7QUF1QkosaUJB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QVMsZUFBVCxDQUF5QixhQUF6QixFQUF3QztBQUNwQyxRQUFNLGlCQUFpQixFQUFFLGFBQUYsQ0FBdkI7QUFDQSxRQUFNLGNBQWMsZUFBZSxJQUFmLENBQW9CLHdCQUFwQixDQUFwQjtBQUNBLGdCQUFZLElBQVo7QUFDQSxRQUFNLE9BQU8sZUFBZSxJQUFmLEVBQWI7QUFDQSxnQkFBWSxJQUFaOztBQUVBLFFBQU0sT0FBTyxTQUFTLGVBQWUsSUFBZixFQUFULENBQWI7O0FBRUEsV0FBTyxFQUFFLFlBQVksSUFBZCxFQUFvQixZQUFZLElBQWhDLEVBQVA7QUFDSCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBlZGl0b3I6IHtcbiAgICAgICAgbWF0aEVkaXRvcjogJ01hdGlra2FlZGl0b3JpJyxcbiAgICAgICAgdGl0bGU6ICdLYWF2YWVkaXRvcmluIGVuc2ltbcOkaW5lbiBrZWhpdHlzdmVyc2lvJyxcbiAgICAgICAgZGVzY3JpcHRpb246IGA8dWw+XG48bGk+RWRpdG9yaSB0b2ltaWkgcGFyaGFpdGVuIEZpcmVmb3gtc2VsYWltZWxsYS48L2xpPlxuPGxpPuKAnExpc8Okw6Qga2FhdmHigJ0gLW5hcGluIGFsdGEgbMO2eWTDpHQgeWxlaXNpbXBpw6QgbWF0ZW1hdGlpa2Fzc2EsIGZ5c2lpa2Fzc2EgamFcbmtlbWlhc3NhIGvDpHl0ZXR0w6R2acOkIG1lcmtpbnTDtmrDpC4gTGlzw6Rrc2kgZXJpa29pc21lcmtrZWrDpCB2b2kga8OkeXR0w6TDpCBrYWF2YW4ga2lyam9pdHRhbWlzZWVuLjwvbGk+XG4gPGxpPkthYXZvamEgdm9pIHJha2VudGFhXG5rbGlra2FhbWFsbGEgdmFsaWtvbiBtZXJraW50w7Zqw6QgamEvdGFpIGtpcmpvaXR0YW1hbGxhIExhVGVYaWEuPC9saT5cbiA8bGk+RWRpdG9yaW4gdmFzdGF1c2tlbnR0w6TDpG4gdm9pIGtpcmpvaXR0YWEgdGVrc3Rpw6QgamEga2Fhdm9qYSBzZWvDpFxubGlzw6R0w6Qga3V2aWEuPC9saT48L3VsPmAsXG4gICAgICAgIHNob3J0Y3V0VGl0bGU6IGBQaWthbsOkcHDDpGludmlua2tlasOkYCxcbiAgICAgICAgc2hvcnRjdXRzOiBgPHRhYmxlPjx0Ym9keT5cbjx0cj48dGg+TGlpdMOkIGt1dmEgbGVpa2Vww7Z5ZMOkbHTDpDwvdGg+PHRkPkN0cmwtVjwvdGQ+PC90cj5cbjx0cj48dGg+S2lyam9pdGEga2FhdmE8L3RoPjx0ZD5DdHJsLUwgdGFpIEN0cmwtSTwvdGQ+PC90cj5cbjx0cj48dGggY29sc3Bhbj1cIjJcIj5LYWF2YXNzYTwvdGg+PC90cj5cbjx0cj48dGg+SmFrb3ZpaXZhPC90aD48dGQ+LzwvdGQ+PC90cj5cbjx0cj48dGg+S2VydG9tZXJra2k8L3RoPjx0ZD4qPC90ZD48L3RyPlxuPHRyPjx0aD5Fa3Nwb25lbnR0aTwvdGg+PHRkPl48L3RkPjwvdHI+XG48dHI+PHRoPlN1bGplIGthYXZhPC90aD48dGQ+Q3RybC1FbnRlciB0YWkgRXNjPC90ZD48L3RyPlxuPHRyPjx0aD5MaXPDpMOkIGthYXZhIHNldXJhYXZhbGxlIHJpdmlsbGU8L3RoPjx0ZD5FbnRlcjwvdGQ+PC90cj5cbjwvdGJvZHk+XG48L3RhYmxlPmAsXG4gICAgICAgIGZvcm1hdHRpbmc6ICdNdW90b2lsdScsXG4gICAgICAgIHNwZWNpYWxDaGFyYWN0ZXJzOiAnRXJpa29pc21lcmtpdCcsXG4gICAgICAgIGluc2VydEVxdWF0aW9uOiAnTGlzw6TDpCBrYWF2YScsXG4gICAgICAgIGNsb3NlOiAnc3VsamUnLFxuICAgICAgICBzYXZlOiAnVGFsbGVubmEnLFxuICAgICAgICB1cGRhdGVkOiAnUMOkaXZpdGV0dHknLFxuICAgICAgICBzZW5kRmVlZGJhY2s6ICdMw6RoZXTDpCBwYWxhdXRldHRhJyxcbiAgICAgICAgbGFuZ0xpbms6ICcvc3YnLFxuICAgICAgICBsYW5nTGFiZWw6ICdQw6Ugc3ZlbnNrYScsXG4gICAgICAgIGFuc3dlclRpdGxlOiAnVmFzdGF1cydcbiAgICB9LFxuICAgIGFubm90YXRpbmc6IHtcbiAgICAgICAgc2VuZEZlZWRiYWNrOiAnTMOkaGV0w6QgcGFsYXV0ZXR0YScsXG4gICAgICAgIHVwZGF0ZWQ6ICdQw6Rpdml0ZXR0eScsXG4gICAgICAgIG1hdGhFZGl0b3I6ICdNYXRpa2thZWRpdG9yaScsXG4gICAgICAgIHRpdGxlOiAnQXJ2b3N0ZWx1JyxcbiAgICAgICAgYmFja0xpbms6ICcvJyxcbiAgICAgICAgYmFja0xpbmtMYWJlbDogJ1BhbGFhIGthYXZhZWRpdG9yaWluJyxcbiAgICAgICAgc2F2ZTogJ1RhbGxlbm5hIG1lcmtpbm7DpHQnLFxuICAgICAgICBsYW5nTGluazogJy9zdi9iZWRvbW5pbmcnLFxuICAgICAgICBsYW5nTGFiZWw6ICdQw6Ugc3ZlbnNrYSdcbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBlZGl0b3I6IHtcbiAgICAgICAgbWF0aEVkaXRvcjogJ01hdGVtYXRpa2VkaXRvcicsXG4gICAgICAgIHRpdGxlOiAnRm9ybWVsZWRpdG9ybnMgZsO2cnN0YSB1dHZlY2tsaW5nc3ZlcnNpb24nLFxuICAgICAgICBkZXNjcmlwdGlvbjogYDx1bD5cbjxsaT5FZGl0b3JuIGZ1bmdlcmFyIGLDpHN0IG1lZCBicm93c2VybiBGaXJlZm94LjwvbGk+XG4gPGxpPlVuZGVyIGtuYXBwZW4g4oCcTMOkZ2cgdGlsbCBmb3JtZWzigJ0gaGl0dGFyIGR1IGRlIHZhbmxpZ2FzdGUgYmV0ZWNrbmluZ2FybmEgc29tIGFudsOkbmRzIGkgbWF0ZW1hdGlrLCBmeXNpayBvY2gga2VtaS4gRGVzc3V0b20ga2FuIGR1IGFudsOkbmRhIHNwZWNpYWx0ZWNrZW4gZsO2ciBhdHQgc2tyaXZhIGZvcm1sZXIuPC9saT5cbjxsaT5EZXQgZ8OlciBhdHQga29uc3RydWVyYSBmb3JtbGVyIGdlbm9tIGF0dCBrbGlja2EgcMOlIGJldGVja25pbmdhcm5hIGkgbWVueWVybmEgb2NoL2VsbGVyIGdlbm9tIGF0dCBza3JpdmEgTGFUZVguPC9saT5cbjxsaT5EZXQgZ8OlciBmw7ZydXRvbSBhdHQgc2tyaXZhIHRleHQgb2NoIGZvcm1sZXIsIGF0dCBvY2tzw6UgYXR0IGzDpGdnYSB0aWxsIGJpbGRlciBpIHN2YXJzZsOkbHRldC48L2xpPjwvdWw+YCxcbiAgICAgICAgc2hvcnRjdXRUaXRsZTogYFRpcHMgcMOlIHRhbmdlbnRrb21iaW5hdGlvbmVyYCxcbiAgICAgICAgc2hvcnRjdXRzOiBgPHRhYmxlPjx0Ym9keT5cbjx0cj48dGg+TMOkZ2cgdGlsbCBlbiBiaWxkIGZyw6VuIHVya2xpcHBldDwvdGg+PHRkPkN0cmwtVjwvdGQ+PC90cj5cbjx0cj48dGg+U2tyaXYgZW4gZm9ybWVsPC90aD48dGQ+Q3RybC1MIC8gQ3RybC1JPC90ZD48L3RyPlxuPHRyPjx0aCBjb2xzcGFuPVwiMlwiPkkgZm9ybWVsbiA8L3RoPjwvdHI+XG48dHI+PHRoPkJyw6Vrc3RyZWNrPC90aD48dGQ+LzwvdGQ+PC90cj5cbjx0cj48dGg+TXVsdGlwbGlrYXRpb25zdGVja2VuPC90aD48dGQ+KjwvdGQ+PC90cj5cbjx0cj48dGg+U3TDpG5nIGZvcm1lbG48L3RoPjx0ZD5DdHJsLUVudGVyIGVsbGVyIEVzYzwvdGQ+PC90cj5cbjwvdGJvZHk+XG48L3RhYmxlPmAsXG4gICAgICAgIGZvcm1hdHRpbmc6ICdGb3JtYXRlcmluZycsXG4gICAgICAgIHNwZWNpYWxDaGFyYWN0ZXJzOiAnU3BlY2lhbHRlY2tlbicsXG4gICAgICAgIGluc2VydEVxdWF0aW9uOiAnTMOkZ2cgdGlsbCBmb3JtZWwnLFxuICAgICAgICBjbG9zZTogJ3N0w6RuZycsXG4gICAgICAgIHNhdmU6ICdTcGFyYScsXG4gICAgICAgIHVwZGF0ZWQ6ICdVcHBkYXRlcmFkJyxcbiAgICAgICAgc2VuZEZlZWRiYWNrOiAnU2tpY2thIGZlZWRiYWNrJyxcbiAgICAgICAgbGFuZ0xpbms6ICcvJyxcbiAgICAgICAgbGFuZ0xhYmVsOiAnU3VvbWVrc2knLFxuICAgICAgICBhbnN3ZXJUaXRsZTogJ1N2YXInXG4gICAgfSxcbiAgICBhbm5vdGF0aW5nOiB7XG4gICAgICAgIHNlbmRGZWVkYmFjazogJ1NraWNrYSByZXNwb25zJyxcbiAgICAgICAgdXBkYXRlZDogJ1VwcGRhdGVyYWQnLFxuICAgICAgICBtYXRoRWRpdG9yOiAnTWF0ZW1hdGlrZWRpdG9yJyxcbiAgICAgICAgdGl0bGU6ICdCZWTDtm1uaW5nJyxcbiAgICAgICAgYmFja0xpbms6ICcvc3YnLFxuICAgICAgICBiYWNrTGlua0xhYmVsOiAnTWF0ZW1hdGlrZWRpdG9yJyxcbiAgICAgICAgc2F2ZTogJ1NwYXJhIGFudGVja25pbmdhcicsXG4gICAgICAgIGxhbmdMaW5rOiAnL3Rhcmtpc3R1cycsXG4gICAgICAgIGxhbmdMYWJlbDogJ1N1b21la3NpJ1xuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuICAgIHthY3Rpb246ICdcXFxcc3FydCcsIGxhYmVsOiAnXFxcXHNxcnR7WH0nfSxcbiAgICB7YWN0aW9uOiAnXicsIGxhYmVsOiAneF57WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGZyYWMnLCBsYWJlbDogJ1xcXFxmcmFje1h9e1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxpbnQnLCBsYWJlbDogJ1xcXFxpbnRfe1h9XntYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcbGltXycsIGxhYmVsOiAnXFxcXGxpbV97WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGxpbV97eFxcXFxyaWdodGFycm93XFxcXGluZnR5fScsIGxhYmVsOiAnXFxcXGxpbV97eFxcXFxyaWdodGFycm93XFxcXGluZnR5fScsIHVzZVdyaXRlOnRydWV9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcnJpZ2h0YXJyb3cnLCBsYWJlbDogJ1xcXFxvdmVycmlnaHRhcnJvd3tYfSd9LFxuICAgIHthY3Rpb246ICdfJywgbGFiZWw6ICd4X1gnfSxcbiAgICB7YWN0aW9uOiAnXFxcXG50aHJvb3QnLCBsYWJlbDogJ1xcXFxzcXJ0W1hde1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxzdW0nLCBsYWJlbDogJ1xcXFxzdW1fe1h9XntYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcYmlub20nLCBsYWJlbDogJ1xcXFxiaW5vbXtYfXtYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcc2luJ30sXG4gICAge2FjdGlvbjogJ1xcXFxjb3MnfSxcbiAgICB7YWN0aW9uOiAnXFxcXHRhbid9LFxuICAgIHthY3Rpb246ICdcXFxcdmVjJywgbGFiZWw6ICdcXFxcdmVje1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxiYXInLCBsYWJlbDogJ1xcXFxiYXJ7WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXG92ZXJsaW5le1xcXFx0ZXh0e2l9fScsIHVzZVdyaXRlOiB0cnVlfSxcbiAgICB7YWN0aW9uOiAnXFxcXG92ZXJsaW5le1xcXFx0ZXh0e2p9fScsIHVzZVdyaXRlOiB0cnVlfSxcbiAgICB7YWN0aW9uOiAnXFxcXG92ZXJsaW5le1xcXFx0ZXh0e2t9fScsIHVzZVdyaXRlOiB0cnVlfSxcbiAgICB7YWN0aW9uOiAnXFxcXG92ZXJsZWZ0YXJyb3cnLCBsYWJlbDogJ1xcXFxvdmVybGVmdGFycm93e1h9J30sXG4gICAge2FjdGlvbjogJ3wnLCBsYWJlbDogJ3xYfCd9LFxuICAgIHthY3Rpb246ICcoJywgbGFiZWw6ICcoWCknfSxcbiAgICB7YWN0aW9uOiAnX3sgfV57IH0gJywgbGFiZWw6ICdfe1h9XntYfVgnLCB1c2VXcml0ZTogdHJ1ZX0sXG4gICAge2FjdGlvbjogJ1xcXFx0ZXh0JywgbGFiZWw6ICdcXFxcdGV4dHtUfSd9LFxuXVxuIiwiY29uc3Qge2lzQ3RybEtleSwgaXNLZXksIGRlY29kZUJhc2U2NEltYWdlLCBpbnNlcnRUb1RleHRBcmVhQXRDdXJzb3IsIHNhbml0aXplQ29udGVudCwgc2FuaXRpemV9ID0gcmVxdWlyZSgnLi91dGlsJylcbmNvbnN0IHRvb2xiYXJzID0gcmVxdWlyZSgnLi90b29sYmFycycpXG5jb25zdCBNUSA9IE1hdGhRdWlsbC5nZXRJbnRlcmZhY2UoMilcbmNvbnN0IGxvY2FsZXMgPSB7XG4gICAgRkk6IHJlcXVpcmUoJy4vRkknKSxcbiAgICBTVjogcmVxdWlyZSgnLi9TVicpXG59XG5jb25zdCBsID0gbG9jYWxlc1t3aW5kb3cubG9jYWxlIHx8ICdGSSddLmVkaXRvclxuY29uc3Qga2V5Q29kZXMgPSB7XG4gICAgRU5URVI6IDEzLFxuICAgIEVTQzogMjdcbn1cblxuY29uc3QgJG91dGVyUGxhY2Vob2xkZXIgPSAkKGA8ZGl2IGNsYXNzPVwibWF0aC1lZGl0b3ItaGlkZGVuXCIgZGF0YS1qcz1cIm91dGVyUGxhY2Vob2xkZXJcIj5gKVxuXG5mdW5jdGlvbiBtb3ZlRWxlbWVudEFmdGVyKCRlbGVtZW50LCAkYWZ0ZXIpIHtcbiAgICAkYWZ0ZXIuYWZ0ZXIoJGVsZW1lbnQpXG59XG5cbmZ1bmN0aW9uIGhpZGVFbGVtZW50SW5ET00oJGVsZW1lbnQpIHtcbiAgICAkb3V0ZXJQbGFjZWhvbGRlci5hcHBlbmQoJGVsZW1lbnQpXG59XG5cbi8vIFRPRE86IHJlcGxhY2Ugd2l0aCBkYXRhIGF0dHJpYnV0ZXM/XG5sZXQgYW5zd2VyRm9jdXMgPSB0cnVlXG5sZXQgbGF0ZXhFZGl0b3JGb2N1cyA9IGZhbHNlXG5sZXQgZXF1YXRpb25FZGl0b3JGb2N1cyA9IGZhbHNlXG5sZXQgbWF0aEVkaXRvclZpc2libGUgPSBmYWxzZVxubGV0ICRjdXJyZW50RWRpdG9yXG5cbiQoJ2JvZHknKS5hcHBlbmQoJG91dGVyUGxhY2Vob2xkZXIpXG5cbmNvbnN0IG1hdGhFZGl0b3IgPSBpbml0TWF0aEVkaXRvcigpXG5jb25zdCB7JHRvb2xiYXIsIHRvZ2dsZU1hdGhUb29sYmFyfSA9IHRvb2xiYXJzLmluaXQobWF0aEVkaXRvciwgKCkgPT4gYW5zd2VyRm9jdXMsIGwpXG5cbmhpZGVFbGVtZW50SW5ET00oJHRvb2xiYXIpXG5cbmZ1bmN0aW9uIGluaXRNYXRoRWRpdG9yKCkge1xuICAgIGNvbnN0ICRtYXRoRWRpdG9yQ29udGFpbmVyID0gJChgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtYXRoLWVkaXRvclwiIGRhdGEtanM9XCJtYXRoRWRpdG9yXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWF0aC1lZGl0b3ItY2xvc2VcIiB0aXRsZT1cIkN0cmwtRW50ZXJcIj4ke2wuY2xvc2V9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWF0aC1lZGl0b3ItYm94ZXNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWF0aC1lZGl0b3ItZXF1YXRpb24tZWRpdG9yXCIgZGF0YS1qcz1cImVxdWF0aW9uRWRpdG9yXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwibWF0aC1lZGl0b3ItbGF0ZXgtZWRpdG9yXCIgZGF0YS1qcz1cImxhdGV4RWRpdG9yXCIgcGxhY2Vob2xkZXI9XCJMYVRleFwiPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+YClcblxuICAgIGhpZGVFbGVtZW50SW5ET00oJG1hdGhFZGl0b3JDb250YWluZXIpXG5cbiAgICBjb25zdCAkbGF0ZXhFZGl0b3IgPSAkbWF0aEVkaXRvckNvbnRhaW5lci5maW5kKCdbZGF0YS1qcz1cImxhdGV4RWRpdG9yXCJdJylcbiAgICBjb25zdCAkZXF1YXRpb25FZGl0b3IgPSAkbWF0aEVkaXRvckNvbnRhaW5lci5maW5kKCdbZGF0YS1qcz1cImVxdWF0aW9uRWRpdG9yXCJdJylcbiAgICBjb25zdCBtcUluc3RhbmNlID0gTVEuTWF0aEZpZWxkKCRlcXVhdGlvbkVkaXRvci5nZXQoMCksIHtcbiAgICAgICAgaGFuZGxlcnM6IHtcbiAgICAgICAgICAgIGVkaXQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobGF0ZXhFZGl0b3JGb2N1cylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgY29uc3QgbGF0ZXggPSBtcUluc3RhbmNlLmxhdGV4KClcbiAgICAgICAgICAgICAgICAkbGF0ZXhFZGl0b3IudmFsKGxhdGV4KVxuICAgICAgICAgICAgICAgIHVwZGF0ZU1hdGhJbWcoJG1hdGhFZGl0b3JDb250YWluZXIucHJldigpLCBsYXRleClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnRlcjogZmllbGQgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IGRvIG5vdCBjbG9zZSBlZGl0b3IgLyBvIG5vdCBjcmVhdGUgYSBuZXcgZXF1YXRpb24gaWYgdGhlcmUgaXMgbm8gdGV4dD9cbiAgICAgICAgICAgICAgICBtYXRoRWRpdG9yLmNsb3NlTWF0aEVkaXRvcih0cnVlKVxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gaW5zZXJ0TmV3RXF1YXRpb24oJzxkaXY+PC9kaXY+JyksIDIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgJGVxdWF0aW9uRWRpdG9yXG4gICAgICAgIC5vbignZm9jdXMgYmx1cicsICcubXEtdGV4dGFyZWEgdGV4dGFyZWEnLCBlID0+IHtcbiAgICAgICAgICAgIGVxdWF0aW9uRWRpdG9yRm9jdXMgPSBlLnR5cGUgIT09ICdibHVyJyAmJiBlLnR5cGUgIT09ICdmb2N1c291dCdcbiAgICAgICAgICAgIG9uRm9jdXNDaGFuZ2VkKClcbiAgICAgICAgfSlcblxuICAgIGZ1bmN0aW9uIG9uTGF0ZXhVcGRhdGUoKSB7XG4gICAgICAgIHVwZGF0ZU1hdGhJbWcoJG1hdGhFZGl0b3JDb250YWluZXIucHJldigpLCAkbGF0ZXhFZGl0b3IudmFsKCkpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gbXFJbnN0YW5jZS5sYXRleCgkbGF0ZXhFZGl0b3IudmFsKCkpLCAxKVxuICAgIH1cblxuICAgICRsYXRleEVkaXRvclxuICAgICAgICAua2V5dXAob25MYXRleFVwZGF0ZSlcbiAgICAgICAgLm9uKCdmb2N1cyBibHVyJywgZSA9PiB7XG4gICAgICAgICAgICBsYXRleEVkaXRvckZvY3VzID0gZS50eXBlICE9PSAnYmx1cidcbiAgICAgICAgICAgIG9uRm9jdXNDaGFuZ2VkKClcbiAgICAgICAgfSlcblxuICAgICRtYXRoRWRpdG9yQ29udGFpbmVyLmZpbmQoJy5jbG9zZScpLm1vdXNlZG93bihlID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGNsb3NlTWF0aEVkaXRvcih0cnVlKVxuICAgIH0pXG5cbiAgICBsZXQgZm9jdXNDaGFuZ2VkID0gbnVsbFxuXG4gICAgZnVuY3Rpb24gb25Gb2N1c0NoYW5nZWQoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChmb2N1c0NoYW5nZWQpXG4gICAgICAgIGZvY3VzQ2hhbmdlZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFsYXRleEVkaXRvckZvY3VzICYmICFlcXVhdGlvbkVkaXRvckZvY3VzKSBjbG9zZU1hdGhFZGl0b3IoKVxuICAgICAgICAgICAgaWYgKCFhbnN3ZXJGb2N1cyAmJiAhbWF0aEVkaXRvclZpc2libGUgJiYgIWxhdGV4RWRpdG9yRm9jdXMgJiYgIWVxdWF0aW9uRWRpdG9yRm9jdXMpIG9uRWRpdG9yQmx1cigpXG4gICAgICAgIH0sIDApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zZXJ0TmV3RXF1YXRpb24ob3B0aW9uYWxNYXJrdXApIHtcbiAgICAgICAgd2luZG93LmRvY3VtZW50LmV4ZWNDb21tYW5kKCdpbnNlcnRIVE1MJywgZmFsc2UsIChvcHRpb25hbE1hcmt1cCA/IG9wdGlvbmFsTWFya3VwIDogJycpICsgJzxpbWcgZGF0YS1qcz1cIm5ld1wiIHN0eWxlPVwiZGlzcGxheTogbm9uZVwiLz4nKVxuICAgICAgICBjb25zdCAkYWRkZWRFcXVhdGlvbkltYWdlID0gJCgnW2RhdGEtanM9XCJuZXdcIl0nKVxuICAgICAgICAkYWRkZWRFcXVhdGlvbkltYWdlXG4gICAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS1qcycpXG5cbiAgICAgICAgbW92ZUVsZW1lbnRBZnRlcigkbWF0aEVkaXRvckNvbnRhaW5lciwgJGFkZGVkRXF1YXRpb25JbWFnZSlcblxuICAgICAgICBtcUluc3RhbmNlLmxhdGV4KCcnKVxuICAgICAgICBtYXRoRWRpdG9yVmlzaWJsZSA9IHRydWVcbiAgICAgICAgdG9nZ2xlTWF0aFRvb2xiYXIodHJ1ZSlcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBtcUluc3RhbmNlLmZvY3VzKCksIDApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zZXJ0TWF0aChzeW1ib2wsIGFsdGVybmF0aXZlU3ltYm9sLCB1c2VXcml0ZSkge1xuICAgICAgICBpZiAobGF0ZXhFZGl0b3JGb2N1cykge1xuICAgICAgICAgICAgaW5zZXJ0VG9UZXh0QXJlYUF0Q3Vyc29yKCRsYXRleEVkaXRvci5nZXQoMCksIGFsdGVybmF0aXZlU3ltYm9sIHx8IHN5bWJvbClcbiAgICAgICAgICAgIG9uTGF0ZXhVcGRhdGUoKVxuICAgICAgICB9IGVsc2UgaWYgKGVxdWF0aW9uRWRpdG9yRm9jdXMpIHtcbiAgICAgICAgICAgIGlmICh1c2VXcml0ZSkge1xuICAgICAgICAgICAgICAgIG1xSW5zdGFuY2Uud3JpdGUoc3ltYm9sKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtcUluc3RhbmNlLnR5cGVkVGV4dChzeW1ib2wpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzeW1ib2wuc3RhcnRzV2l0aCgnXFxcXCcpKSBtcUluc3RhbmNlLmtleXN0cm9rZSgnVGFiJylcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gbXFJbnN0YW5jZS5mb2N1cygpLCAwKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTWF0aEltZygkaW1nLCBsYXRleCkge1xuICAgICAgICAkaW1nXG4gICAgICAgICAgICAucHJvcCgnc3JjJywgJy9tYXRoLnN2Zz9sYXRleD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGxhdGV4KSlcbiAgICAgICAgICAgIC5wcm9wKCdhbHQnLCBsYXRleClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZU1hdGhFZGl0b3Ioc2V0Rm9jdXNBZnRlckNsb3NlID0gZmFsc2UpIHtcbiAgICAgICAgLy8gVE9ETzogcmVtb3ZlIGV2ZW50IGJpbmRpbmdzXG4gICAgICAgIGNvbnN0ICRjdXJyZW50RWRpdG9yID0gJG1hdGhFZGl0b3JDb250YWluZXIuY2xvc2VzdCgnW2RhdGEtanM9XCJhbnN3ZXJcIl0nKVxuICAgICAgICBjb25zdCAkaW1nID0gJG1hdGhFZGl0b3JDb250YWluZXIucHJldigpXG4gICAgICAgIGlmICgkbGF0ZXhFZGl0b3IudmFsKCkudHJpbSgpID09PSAnJykge1xuICAgICAgICAgICAgJGltZy5yZW1vdmUoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGltZy5zaG93KClcbiAgICAgICAgICAgIHVwZGF0ZU1hdGhJbWcoJGltZywgJGxhdGV4RWRpdG9yLnZhbCgpKVxuICAgICAgICB9XG5cbiAgICAgICAgdG9nZ2xlTWF0aFRvb2xiYXIoZmFsc2UpXG4gICAgICAgIGhpZGVFbGVtZW50SW5ET00oJG1hdGhFZGl0b3JDb250YWluZXIpXG4gICAgICAgIG1hdGhFZGl0b3JWaXNpYmxlID0gZmFsc2VcbiAgICAgICAgbGF0ZXhFZGl0b3JGb2N1cyA9IGZhbHNlXG4gICAgICAgIGVxdWF0aW9uRWRpdG9yRm9jdXMgPSBmYWxzZVxuICAgICAgICBpZiAoc2V0Rm9jdXNBZnRlckNsb3NlKSAkY3VycmVudEVkaXRvci5mb2N1cygpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb3Blbk1hdGhFZGl0b3IoJGltZykge1xuICAgICAgICBpZiAobWF0aEVkaXRvclZpc2libGUpIGNsb3NlTWF0aEVkaXRvcigpXG4gICAgICAgICRpbWcuaGlkZSgpXG4gICAgICAgIG1vdmVFbGVtZW50QWZ0ZXIoJG1hdGhFZGl0b3JDb250YWluZXIsICRpbWcpXG4gICAgICAgIGNvbnN0IGxhdGV4ID0gJGltZy5wcm9wKCdhbHQnKVxuICAgICAgICAkbGF0ZXhFZGl0b3IudmFsKGxhdGV4KVxuICAgICAgICBvbkxhdGV4VXBkYXRlKClcbiAgICAgICAgbWF0aEVkaXRvclZpc2libGUgPSB0cnVlXG4gICAgICAgIHRvZ2dsZU1hdGhUb29sYmFyKHRydWUpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gbXFJbnN0YW5jZS5mb2N1cygpLCAwKVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGluc2VydE5ld0VxdWF0aW9uLFxuICAgICAgICBpbnNlcnRNYXRoLFxuICAgICAgICBjbG9zZU1hdGhFZGl0b3IsXG4gICAgICAgIG9wZW5NYXRoRWRpdG9yLFxuICAgICAgICBvbkZvY3VzQ2hhbmdlZFxuICAgIH1cbn1cblxuZnVuY3Rpb24gb25FZGl0b3JGb2N1cygkZWxlbWVudCkge1xuICAgICRjdXJyZW50RWRpdG9yID0gJGVsZW1lbnRcbiAgICAkZWxlbWVudC5iZWZvcmUoJHRvb2xiYXIpXG4gICAgJHRvb2xiYXIuc2hvdygpXG59XG5cbmZ1bmN0aW9uIG9uRWRpdG9yQmx1cigpIHtcbiAgICAvLyBUT0RPOiByZW1vdmUgZXZlbnQgYmluZGluZ3NcbiAgICBoaWRlRWxlbWVudEluRE9NKCR0b29sYmFyKVxuICAgIG1hdGhFZGl0b3IuY2xvc2VNYXRoRWRpdG9yKClcbiAgICAvLyAkZWRpdG9yLm9mZigpXG5cbiAgICBhbnN3ZXJGb2N1cyA9IGZhbHNlXG4gICAgbWF0aEVkaXRvclZpc2libGUgPSBmYWxzZVxuICAgIGxhdGV4RWRpdG9yRm9jdXMgPSBmYWxzZVxufVxuXG5sZXQgYmx1cnJlZFxuXG5mdW5jdGlvbiBvbkVkaXRvckZvY3VzQ2hhbmdlZChlKSB7XG4gICAgYW5zd2VyRm9jdXMgPSBlLnR5cGUgPT09ICdmb2N1cydcblxuICAgIGNsZWFyVGltZW91dChibHVycmVkKVxuICAgIGJsdXJyZWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKCFhbnN3ZXJGb2N1cyAmJiAhbWF0aEVkaXRvclZpc2libGUgJiYgIWxhdGV4RWRpdG9yRm9jdXMgJiYgIWVxdWF0aW9uRWRpdG9yRm9jdXMpIG9uRWRpdG9yQmx1cigpXG4gICAgICAgIGVsc2UgaWYgKGFuc3dlckZvY3VzICYmIG1hdGhFZGl0b3JWaXNpYmxlKSBtYXRoRWRpdG9yLmNsb3NlTWF0aEVkaXRvcigpXG4gICAgICAgIGVsc2Ugb25FZGl0b3JGb2N1cygkKGUudGFyZ2V0KSlcbiAgICB9LCAwKVxufVxuXG5mdW5jdGlvbiBpc01hdGhFZGl0b3JWaXNpYmxlKCkge1xuICAgIHJldHVybiBtYXRoRWRpdG9yVmlzaWJsZVxufVxuXG5jb25zdCBtYXJrQW5kR2V0SW5saW5lSW1hZ2VzID0gJGVkaXRvciA9PiAkZWRpdG9yLmZpbmQoJ2ltZ1tzcmNePVwiZGF0YVwiXScpXG4gICAgLmVhY2goKGksIGVsKSA9PiBlbC5zZXRBdHRyaWJ1dGUoJ2lkJywgbmV3IERhdGUoKS5nZXRUaW1lKCkgKyAnLScgKyBpKSlcbiAgICAubWFwKChpLCBlbCkgPT4gT2JqZWN0LmFzc2lnbihkZWNvZGVCYXNlNjRJbWFnZShlbC5nZXRBdHRyaWJ1dGUoJ3NyYycpKSwge2lkOiBlbC5nZXRBdHRyaWJ1dGUoJ2lkJyl9KSlcbiAgICAudG9BcnJheSgpXG4gICAgLmZpbHRlcigoe3R5cGV9KSA9PiB0eXBlID09PSAnaW1hZ2UvcG5nJylcblxuY29uc3QgcGVyc2lzdElubGluZUltYWdlcyA9ICgkZWRpdG9yLCBzY3JlZW5zaG90U2F2ZXIpID0+IHtcbiAgICByZXR1cm4gQmFjb24uY29tYmluZUFzQXJyYXkoXG4gICAgICAgIG1hcmtBbmRHZXRJbmxpbmVJbWFnZXMoJGVkaXRvcilcbiAgICAgICAgICAgIC5tYXAoZGF0YSA9PiBCYWNvbi5mcm9tUHJvbWlzZShcbiAgICAgICAgICAgICAgICBzY3JlZW5zaG90U2F2ZXIoZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oc2NyZWVuc2hvdFVybCA9PiAkZWRpdG9yLmZpbmQoJyMnICsgZGF0YS5pZCkuYXR0cignc3JjJywgc2NyZWVuc2hvdFVybCkucmVtb3ZlQXR0cignaWQnKSkpXG4gICAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICAgLm9uVmFsdWUoKCkgPT4gJGVkaXRvci50cmlnZ2VyKCdpbnB1dCcpKVxufVxuXG5jb25zdCBtYWtlUmljaFRleHQgPSAoZWxlbWVudCwgb3B0aW9ucywgb25WYWx1ZUNoYW5nZWQgPSAoKSA9PiB7IH0pID0+IHtcbiAgICBjb25zdCB7XG4gICAgICAgIHNjcmVlbnNob3Q6IHtcbiAgICAgICAgICAgIHNhdmVyXG4gICAgICAgIH1cbiAgICB9ID0gb3B0aW9uc1xuICAgIGNvbnN0ICRhbnN3ZXIgPSAkKGVsZW1lbnQpXG4gICAgJGFuc3dlclxuICAgICAgICAuYXR0cignY29udGVudGVkaXRhYmxlJywgJ3RydWUnKVxuICAgICAgICAuYXR0cignc3BlbGxjaGVjaycsICdmYWxzZScpXG4gICAgICAgIC5hdHRyKCdkYXRhLWpzJywgJ2Fuc3dlcicpXG4gICAgICAgIC5hZGRDbGFzcygnbWF0aC1lZGl0b3ItYW5zd2VyJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgZSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNDdHJsS2V5KGUsIGtleUNvZGVzLkVOVEVSKSB8fCBpc0tleShlLCBrZXlDb2Rlcy5FU0MpKSBtYXRoRWRpdG9yLmNsb3NlTWF0aEVkaXRvcih0cnVlKVxuICAgICAgICB9KVxuICAgICAgICAub24oJ21vdXNlZG93bicsICdpbWdbc3JjXj1cIi9tYXRoLnN2Z1wiXScsIGUgPT4ge1xuICAgICAgICAgICAgb25FZGl0b3JGb2N1cygkKGUudGFyZ2V0KS5jbG9zZXN0KCdbZGF0YS1qcz1cImFuc3dlclwiXScpKVxuICAgICAgICAgICAgbWF0aEVkaXRvci5vcGVuTWF0aEVkaXRvcigkKGUudGFyZ2V0KSlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdrZXlwcmVzcycsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKGlzQ3RybEtleShlLCAnbCcpIHx8IGlzQ3RybEtleShlLCAnaScpKSBtYXRoRWRpdG9yLmluc2VydE5ld0VxdWF0aW9uKClcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdmb2N1cyBibHVyJywgZSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNNYXRoRWRpdG9yVmlzaWJsZSgpICYmIGUudHlwZSA9PT0gJ2ZvY3VzJykgbWF0aEVkaXRvci5jbG9zZU1hdGhFZGl0b3IoKVxuICAgICAgICAgICAgb25FZGl0b3JGb2N1c0NoYW5nZWQoZSlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdrZXl1cCBpbnB1dCcsIGUgPT4gb25WYWx1ZUNoYW5nZWQoc2FuaXRpemVDb250ZW50KGUuY3VycmVudFRhcmdldCkpKVxuICAgICAgICAub24oJ3Bhc3RlJywgZSA9PiB7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJylcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIGNvbnN0IGNsaXBib2FyZERhdGEgPSBlLm9yaWdpbmFsRXZlbnQuY2xpcGJvYXJkRGF0YVxuICAgICAgICAgICAgY29uc3QgZmlsZSA9IGNsaXBib2FyZERhdGEuaXRlbXMgJiYgY2xpcGJvYXJkRGF0YS5pdGVtc1swXS5nZXRBc0ZpbGUoKVxuICAgICAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICBpZihmaWxlLnR5cGUgIT09ICdpbWFnZS9wbmcnKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICBzYXZlcih7ZGF0YTogZmlsZSwgdHlwZTogZmlsZS50eXBlfSkudGhlbihzY3JlZW5zaG90VXJsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1nID0gYDxpbWcgc3JjPVwiJHtzY3JlZW5zaG90VXJsfVwiLz5gXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0SFRNTCcsIGZhbHNlLCBpbWcpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2xpcGJvYXJkRGF0YUFzSHRtbCA9IGNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dC9odG1sJylcbiAgICAgICAgICAgICAgICBpZiAoY2xpcGJvYXJkRGF0YUFzSHRtbCkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LmV4ZWNDb21tYW5kKCdpbnNlcnRIVE1MJywgZmFsc2UsIHNhbml0aXplKGNsaXBib2FyZERhdGFBc0h0bWwpKVxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4gcGVyc2lzdElubGluZUltYWdlcygkY3VycmVudEVkaXRvciwgc2F2ZXIpLCAwKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiBwZXJzaXN0SW5saW5lSW1hZ2VzKCRjdXJyZW50RWRpdG9yLCBzYXZlciksIDApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtYWtlUmljaFRleHRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGFsbG93ZWRUYWdzOiBbXG4gICAgICAgICdkaXYnLFxuICAgICAgICAnaW1nJyxcbiAgICAgICAgJ2JyJ1xuICAgIF0sXG4gICAgYWxsb3dlZEF0dHJpYnV0ZXM6IHtcbiAgICAgICAgaW1nOiBbJ3NyYycsICdhbHQnXVxuICAgIH0sXG4gICAgYWxsb3dlZFNjaGVtZXM6IFsnZGF0YScsICdodHRwJywgJ2h0dHBzJ10sXG4gICAgZXhjbHVzaXZlRmlsdGVyOiBmdW5jdGlvbihmcmFtZSkgeyByZXR1cm4gZnJhbWUuYXR0cmlic1snZGF0YS1qcyddID09PSAnbWF0aEVkaXRvcicgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gICAge2NoYXJhY3RlcjogJ+KJoScsIGxhdGV4Q29tbWFuZDogJ1xcXFxlcXVpdid9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiaInfSwgLy8gXFxuZXF1aXYgb3IgXFxub3RcXGVxdWl2XG4gICAge2NoYXJhY3RlcjogJ+KJiCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxhcHByb3gnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oi8JywgbGF0ZXhDb21tYW5kOiAnXFxcXHNpbSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiaAnLCBsYXRleENvbW1hbmQ6ICdcXFxcbmVxJ30sXG4gICAge2NoYXJhY3RlcjogJ+KJpCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxsZXEnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4omlJywgbGF0ZXhDb21tYW5kOiAnXFxcXGdlcSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfigKYnLCBsYXRleENvbW1hbmQ6ICdcXFxcZG90cyd9LFxuICAgIHtjaGFyYWN0ZXI6ICfCsicsIGxhdGV4Q29tbWFuZDogJ14yJ30sXG4gICAge2NoYXJhY3RlcjogJ8KzJywgbGF0ZXhDb21tYW5kOiAnXjMnfSxcbiAgICB7Y2hhcmFjdGVyOiAnwr0nLCBsYXRleENvbW1hbmQ6ICcxLzInfSxcbiAgICB7Y2hhcmFjdGVyOiAnwrcnLCBsYXRleENvbW1hbmQ6ICdcXFxcY2RvdCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfCsScsIGxhdGV4Q29tbWFuZDogJ1xcXFxwbSd9LFxuXG4gICAge2NoYXJhY3RlcjogJ8KwJ30sXG4gICAge2NoYXJhY3RlcjogJ+KImCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxjaXJjJ30sXG4gICAge2NoYXJhY3RlcjogJ+KIoCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxhbmdsZSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiqUnLCBsYXRleENvbW1hbmQ6ICdcXFxccGVycCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfigJYnLCBsYXRleENvbW1hbmQ6ICdcXFxccGFyYWxsZWwnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oeFJ30sXG5cbiAgICB7Y2hhcmFjdGVyOiAnwrUnLCBsYXRleENvbW1hbmQ6ICdcXFxcbXUnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oiCJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBhcnRpYWwnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oiRJywgbGF0ZXhDb21tYW5kOiAnXFxcXFNpZ21hJ30sXG4gICAge2NoYXJhY3RlcjogJ+KIjycsIGxhdGV4Q29tbWFuZDogJ1xcXFxQaSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfOqScsIGxhdGV4Q29tbWFuZDogJ1xcXFxPbWVnYSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfOlCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxEZWx0YSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfwnZyEJywgbGF0ZXhDb21tYW5kOiAnXFxcXGlvdGEnfSxcbiAgICB7Y2hhcmFjdGVyOiAnzpMnLCBsYXRleENvbW1hbmQ6ICdcXFxcR2FtbWEnfSxcbiAgICB7Y2hhcmFjdGVyOiAnzpgnLCBsYXRleENvbW1hbmQ6ICdcXFxcVGhldGEnfSxcbiAgICB7Y2hhcmFjdGVyOiAnzqYnLCBsYXRleENvbW1hbmQ6ICdcXFxcUGhpJ30sXG4gICAge2NoYXJhY3RlcjogJ863JywgbGF0ZXhDb21tYW5kOiAnXFxcXGV0YSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfOsScsIGxhdGV4Q29tbWFuZDogJ1xcXFxhbHBoYSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfOtCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxkZWx0YSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfOtScsIGxhdGV4Q29tbWFuZDogJ1xcXFx2YXJlcHNpbG9uJ30sXG4gICAge2NoYXJhY3RlcjogJ8+DJywgbGF0ZXhDb21tYW5kOiAnXFxcXHNpZ21hJ30sXG4gICAge2NoYXJhY3RlcjogJ8+EJywgbGF0ZXhDb21tYW5kOiAnXFxcXHRhdSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfOqScsIGxhdGV4Q29tbWFuZDogJ1xcXFxPbWVnYSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfPiScsIGxhdGV4Q29tbWFuZDogJ1xcXFxvbWVnYSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfPgCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxwaSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfQpCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxwaGknfSxcblxuICAgIHtjaGFyYWN0ZXI6ICfihpEnLCBsYXRleENvbW1hbmQ6ICdcXFxcdXBhcnJvdyd9LFxuICAgIHtjaGFyYWN0ZXI6ICfihpInLCBsYXRleENvbW1hbmQ6ICdcXFxccmlnaHRhcnJvdyd9LFxuICAgIHtjaGFyYWN0ZXI6ICfihpMnLCBsYXRleENvbW1hbmQ6ICdcXFxcZG93bmFycm93J30sXG4gICAge2NoYXJhY3RlcjogJ+KGlCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxsZWZ0cmlnaHRhcnJvdyd9LFxuICAgIHtjaGFyYWN0ZXI6ICfih5InLCBsYXRleENvbW1hbmQ6ICdcXFxcUmlnaHRhcnJvdyd9LFxuICAgIHtjaGFyYWN0ZXI6ICfih5QnLCBsYXRleENvbW1hbmQ6ICdcXFxcTGVmdHJpZ2h0YXJyb3cnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oeMJ30sIC8vIFxccmlnaHRsZWZ0aGFycG9vbnNcbiAgICB7Y2hhcmFjdGVyOiAn4oieJywgbGF0ZXhDb21tYW5kOiAnXFxcXGluZnR5J30sXG5cbiAgICB7Y2hhcmFjdGVyOiAn4oiIJywgbGF0ZXhDb21tYW5kOiAnXFxcXGluJ30sXG4gICAge2NoYXJhY3RlcjogJ+KIiScsIGxhdGV4Q29tbWFuZDogJ1xcXFxub3Rpbid9LFxuICAgIHtjaGFyYWN0ZXI6ICfihJ0nfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oSVJ30sXG4gICAge2NoYXJhY3RlcjogJ+KEpCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfihJonfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oqCJywgbGF0ZXhDb21tYW5kOiAnXFxcXHN1YnNldCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiioQnLCBsYXRleENvbW1hbmQ6ICdcXFxcbm90c3Vic2V0J30sXG4gICAge2NoYXJhY3RlcjogJ+KIqScsIGxhdGV4Q29tbWFuZDogJ1xcXFxjYXAnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oiqJywgbGF0ZXhDb21tYW5kOiAnXFxcXGN1cCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiIUnLCBsYXRleENvbW1hbmQ6ICdcXFxcZW1wdHknfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oiWJywgbGF0ZXhDb21tYW5kOiAnXFxcXHNldG1pbnVzJ30sXG5cbiAgICB7Y2hhcmFjdGVyOiAnwqwnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oinJywgbGF0ZXhDb21tYW5kOiAnXFxcXGFuZCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiKgnLCBsYXRleENvbW1hbmQ6ICdcXFxcb3InfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oiAJywgbGF0ZXhDb21tYW5kOiAnXFxcXGZvcmFsbCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiIMnLCBsYXRleENvbW1hbmQ6ICdcXFxcZXhpc3RzJ31cbl1cbiIsImNvbnN0IHNwZWNpYWxDaGFyYWN0ZXJzID0gcmVxdWlyZSgnLi9zcGVjaWFsQ2hhcmFjdGVycycpXG5jb25zdCBsYXRleENvbW1hbmRzID0gcmVxdWlyZSgnLi9sYXRleENvbW1hbmRzJylcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaW5pdCxcbn1cblxuZnVuY3Rpb24gaW5pdChtYXRoRWRpdG9yLCBoYXNBbnN3ZXJGb2N1cywgbCkge1xuICAgIGNvbnN0ICR0b29sYmFyID0gJChgICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1hdGgtZWRpdG9yLXRvb2xzXCIgZGF0YS1qcz1cInRvb2xzXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWF0aC1lZGl0b3ItY2hhcmFjdGVyc1wiIGRhdGEtanM9XCJjaGFyYWN0ZXJzXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRoLWVkaXRvci1zcGVjaWFsLWNoYXJhY3RlcnNcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYXRoLWVkaXRvci10b29sYmFyIG1hdGgtZWRpdG9yLWxpc3RcIiBkYXRhLWpzPVwiY2hhcmFjdGVyc0xpc3RcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYXRoLWVkaXRvci1lcXVhdGlvbiBtYXRoLWVkaXRvci10b29sYmFyIG1hdGgtZWRpdG9yLWxpc3QgbWF0aC1lZGl0b3ItaGlkZGVuXCIgZGF0YS1qcz1cIm1hdGhUb29sYmFyXCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJtYXRoLWVkaXRvci1uZXctZXF1YXRpb24gbWF0aC1lZGl0b3ItYnV0dG9uIG1hdGgtZWRpdG9yLWJ1dHRvbi1hY3Rpb25cIiBkYXRhLWpzPVwibmV3RXF1YXRpb25cIiB0aXRsZT1cIkN0cmwtTFwiPiR7bC5pbnNlcnRFcXVhdGlvbn08L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgYClcbiAgICBjb25zdCAkbmV3RXF1YXRpb24gPSAkdG9vbGJhci5maW5kKCdbZGF0YS1qcz1cIm5ld0VxdWF0aW9uXCJdJylcbiAgICBjb25zdCAkbWF0aFRvb2xiYXIgPSAkdG9vbGJhci5maW5kKCdbZGF0YS1qcz1cIm1hdGhUb29sYmFyXCJdJylcbiAgICBpbml0U3BlY2lhbENoYXJhY3RlclRvb2xiYXIoJHRvb2xiYXIsIG1hdGhFZGl0b3IsIGhhc0Fuc3dlckZvY3VzKVxuICAgIGluaXRNYXRoVG9vbGJhcigkbWF0aFRvb2xiYXIsIG1hdGhFZGl0b3IpXG4gICAgaW5pdE5ld0VxdWF0aW9uKCRuZXdFcXVhdGlvbiwgbWF0aEVkaXRvciwgaGFzQW5zd2VyRm9jdXMpXG5cbiAgICBmdW5jdGlvbiB0b2dnbGVNYXRoVG9vbGJhcihpc1Zpc2libGUpIHtcbiAgICAgICAgJG5ld0VxdWF0aW9uLnRvZ2dsZSghaXNWaXNpYmxlKVxuICAgICAgICAkbWF0aFRvb2xiYXIudG9nZ2xlKGlzVmlzaWJsZSlcbiAgICB9XG5cbiAgICByZXR1cm4geyAkdG9vbGJhciwgdG9nZ2xlTWF0aFRvb2xiYXIgfVxufVxuXG5mdW5jdGlvbiBpbml0U3BlY2lhbENoYXJhY3RlclRvb2xiYXIoJHRvb2xiYXIsIG1hdGhFZGl0b3IsIGhhc0Fuc3dlckZvY3VzKSB7XG4gICAgJHRvb2xiYXIuZmluZCgnW2RhdGEtanM9XCJjaGFyYWN0ZXJzTGlzdFwiXScpXG4gICAgICAgIC5hcHBlbmQoc3BlY2lhbENoYXJhY3RlcnMubWFwKGNoYXIgPT4gYDxidXR0b24gY2xhc3M9XCJtYXRoLWVkaXRvci1idXR0b24gbWF0aC1lZGl0b3ItYnV0dG9uLWdyaWRcIiAke2NoYXIubGF0ZXhDb21tYW5kID8gYGRhdGEtY29tbWFuZD1cIiR7Y2hhci5sYXRleENvbW1hbmR9XCJgIDogJyd9PiR7Y2hhci5jaGFyYWN0ZXJ9PC9idXR0b24+YCkpXG4gICAgICAgIC5vbignbW91c2Vkb3duJywgJ2J1dHRvbicsIGUgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICBjb25zdCBjaGFyYWN0ZXIgPSBlLmN1cnJlbnRUYXJnZXQuaW5uZXJUZXh0XG4gICAgICAgICAgICBjb25zdCBjb21tYW5kID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY29tbWFuZFxuICAgICAgICAgICAgaWYgKGhhc0Fuc3dlckZvY3VzKCkpIHdpbmRvdy5kb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0VGV4dCcsIGZhbHNlLCBjaGFyYWN0ZXIpXG4gICAgICAgICAgICBlbHNlIG1hdGhFZGl0b3IuaW5zZXJ0TWF0aChjb21tYW5kIHx8IGNoYXJhY3RlcilcbiAgICAgICAgfSlcbn1cblxuZnVuY3Rpb24gaW5pdE1hdGhUb29sYmFyKCRtYXRoVG9vbGJhciwgbWF0aEVkaXRvcikge1xuICAgICRtYXRoVG9vbGJhci5hcHBlbmQobGF0ZXhDb21tYW5kc1xuICAgICAgICAubWFwKG8gPT4gYDxidXR0b24gdGl0bGU9XCIke28uYWN0aW9ufVwiIGNsYXNzPVwibWF0aC1lZGl0b3ItYnV0dG9uIG1hdGgtZWRpdG9yLWJ1dHRvbi1ncmlkXCIgZGF0YS1jb21tYW5kPVwiJHtvLmFjdGlvbn1cIiBkYXRhLWxhdGV4Y29tbWFuZD1cIiR7by5sYWJlbH1cIiBkYXRhLXVzZXdyaXRlPVwiJHtvLnVzZVdyaXRlIHx8IGZhbHNlfVwiPlxuPGltZyBzcmM9XCIvbWF0aC5zdmc/bGF0ZXg9JHtlbmNvZGVVUklDb21wb25lbnQoby5sYWJlbCA/IG8ubGFiZWwucmVwbGFjZSgvWC9nLCAnXFxcXHNxdWFyZScpIDogby5hY3Rpb24pfVwiLz5cbjwvYnV0dG9uPmApLmpvaW4oJycpXG4gICAgKS5vbignbW91c2Vkb3duJywgJ2J1dHRvbicsIGUgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgY29uc3QgZGF0YXNldCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0O1xuICAgICAgICBtYXRoRWRpdG9yLmluc2VydE1hdGgoZGF0YXNldC5jb21tYW5kLCBkYXRhc2V0LmxhdGV4Y29tbWFuZCwgZGF0YXNldC51c2V3cml0ZSA9PT0gJ3RydWUnKVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGluaXROZXdFcXVhdGlvbigkbmV3RXF1YXRpb24sIG1hdGhFZGl0b3IsIGhhc0Fuc3dlckZvY3VzKSB7XG4gICAgJG5ld0VxdWF0aW9uLm1vdXNlZG93bigoZSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBpZiAoIWhhc0Fuc3dlckZvY3VzKCkpIHJldHVybiAvLyBUT0RPOiByZW1vdmUgd2hlbiBidXR0b24gaXMgb25seSB2aXNpYmxlIHdoZW4gdGV4dGFyZWEgaGFzIGZvY3VzXG4gICAgICAgIG1hdGhFZGl0b3IuaW5zZXJ0TmV3RXF1YXRpb24oKVxuICAgIH0pLmJpbmQodGhpcykpXG59XG4iLCJjb25zdCBzYW5pdGl6ZUh0bWwgPSByZXF1aXJlKCdzYW5pdGl6ZS1odG1sJylcbmNvbnN0IHNhbml0aXplT3B0cyA9IHJlcXVpcmUoJy4vc2FuaXRpemVPcHRzJylcblxubW9kdWxlLmV4cG9ydHMgPSB7aXNLZXksIGlzQ3RybEtleSwgaW5zZXJ0VG9UZXh0QXJlYUF0Q3Vyc29yLCBkZWNvZGVCYXNlNjRJbWFnZSwgc2FuaXRpemUsIHNhbml0aXplQ29udGVudH1cblxuZnVuY3Rpb24gc2FuaXRpemUoaHRtbCkge1xuICAgIHJldHVybiBzYW5pdGl6ZUh0bWwoaHRtbCwgc2FuaXRpemVPcHRzKVxufVxuZnVuY3Rpb24gaW5zZXJ0VG9UZXh0QXJlYUF0Q3Vyc29yKGZpZWxkLCB2YWx1ZSkge1xuICAgIGNvbnN0IHN0YXJ0UG9zID0gZmllbGQuc2VsZWN0aW9uU3RhcnRcbiAgICBjb25zdCBlbmRQb3MgPSBmaWVsZC5zZWxlY3Rpb25FbmRcbiAgICBsZXQgb2xkVmFsdWUgPSBmaWVsZC52YWx1ZVxuICAgIGZpZWxkLnZhbHVlID0gb2xkVmFsdWUuc3Vic3RyaW5nKDAsIHN0YXJ0UG9zKSArIHZhbHVlICsgb2xkVmFsdWUuc3Vic3RyaW5nKGVuZFBvcywgb2xkVmFsdWUubGVuZ3RoKVxuICAgIGZpZWxkLnNlbGVjdGlvblN0YXJ0ID0gZmllbGQuc2VsZWN0aW9uRW5kID0gc3RhcnRQb3MgKyB2YWx1ZS5sZW5ndGhcbn1cblxuZnVuY3Rpb24gZGVjb2RlQmFzZTY0SW1hZ2UoZGF0YVN0cmluZykge1xuICAgIGlmICghZGF0YVN0cmluZylcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICBjb25zdCBtYXRjaGVzID0gZGF0YVN0cmluZy5tYXRjaCgvXmRhdGE6KFtBLVphLXotK1xcL10rKTtiYXNlNjQsKC4rKSQvKVxuICAgIGlmIChtYXRjaGVzLmxlbmd0aCAhPT0gMykge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBtYXRjaGVzWzFdLFxuICAgICAgICBkYXRhOiBuZXcgQnVmZmVyKG1hdGNoZXNbMl0sICdiYXNlNjQnKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNLZXkoZSwga2V5KSB7IHJldHVybiBwcmV2ZW50SWZUcnVlKGUsICFlLmFsdEtleSAmJiAhZS5zaGlmdEtleSAmJiAhZS5jdHJsS2V5ICAmJiBrZXlPcktleUNvZGUoZSwga2V5KSl9XG5cbmZ1bmN0aW9uIGlzQ3RybEtleShlLCBrZXkpIHsgcmV0dXJuIHByZXZlbnRJZlRydWUoZSwgIWUuYWx0S2V5ICYmICFlLnNoaWZ0S2V5ICYmIGUuY3RybEtleSAmJiBrZXlPcktleUNvZGUoZSwga2V5KSl9XG5cbmZ1bmN0aW9uIGtleU9yS2V5Q29kZShlLCB2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnID8gZS5rZXkgPT09IHZhbCA6IGUua2V5Q29kZSA9PT0gdmFsIH1cbmZ1bmN0aW9uIHByZXZlbnRJZlRydWUoZSwgdmFsKSB7XG4gICAgaWYodmFsKSBlLnByZXZlbnREZWZhdWx0KClcbiAgICByZXR1cm4gdmFsXG59XG5cbmZ1bmN0aW9uIHNhbml0aXplQ29udGVudChhbnN3ZXJFbGVtZW50KSB7XG4gICAgY29uc3QgJGFuc3dlckVsZW1lbnQgPSAkKGFuc3dlckVsZW1lbnQpXG4gICAgY29uc3QgJG1hdGhFZGl0b3IgPSAkYW5zd2VyRWxlbWVudC5maW5kKCdbZGF0YS1qcz1cIm1hdGhFZGl0b3JcIl0nKVxuICAgICRtYXRoRWRpdG9yLmhpZGUoKVxuICAgIGNvbnN0IHRleHQgPSAkYW5zd2VyRWxlbWVudC50ZXh0KClcbiAgICAkbWF0aEVkaXRvci5zaG93KClcblxuICAgIGNvbnN0IGh0bWwgPSBzYW5pdGl6ZSgkYW5zd2VyRWxlbWVudC5odG1sKCkpXG5cbiAgICByZXR1cm4geyBhbnN3ZXJIVE1MOiBodG1sLCBhbnN3ZXJUZXh0OiB0ZXh0IH1cbn1cbiJdfQ==
