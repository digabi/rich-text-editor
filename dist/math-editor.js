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
(function (Buffer){
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

    $equationEditor.on('focus mousedown', function (e) {
        return equationEditorFocus = true;
    }).on('focus blur', '.mq-textarea textarea', function (e) {
        equationEditorFocus = e.type !== 'blur';
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
            if (!answerFocus && !mathEditorVisible && !latexEditorFocus && !equationEditorFocus) closeEditor();
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
            util.insertToTextAreaAtCursor($latexEditor.get(0), alternativeSymbol || symbol);
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

function openEditor($element) {
    $currentEditor = $element;
    $element.before($toolbar);
    $toolbar.show();
}

function closeEditor() {
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
        if (!answerFocus && !mathEditorVisible && !latexEditorFocus && !equationEditorFocus) closeEditor();else if (answerFocus && mathEditorVisible) mathEditor.closeMathEditor();else openEditor($(e.target));
    }, 0);
}

function isMathEditorVisible() {
    return mathEditorVisible;
}

var editor = {
    openEditor: openEditor,
    closeEditor: closeEditor,
    onEditorFocusChanged: onEditorFocusChanged,
    isMathEditorVisible: isMathEditorVisible,
    openMathEditor: mathEditor.openMathEditor,
    closeMathEditor: mathEditor.closeMathEditor,
    insertNewEquation: mathEditor.insertNewEquation
};

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

var makeRichText = function makeRichText(element, options) {
    var onValueChanged = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
    var saver = options.screenshot.saver;

    var $answer = $(element);
    $answer.attr('contenteditable', 'true').attr('spellcheck', 'false').attr('data-js', 'answer').addClass('math-editor-answer').on('keydown', function (e) {
        if (isCtrlKey(e, keyCodes.ENTER) || isKey(e, keyCodes.ESC)) mathEditor.closeMathEditor(true);
    }).on('mousedown', 'img[src^="/math.svg"]', function (e) {
        return editor.openMathEditor($(e.target));
    }) // TODO: open editor if clicked on equation in another editor
    .on('keypress', function (e) {
        if (isCtrlKey(e, 'l') || isCtrlKey(e, 'i')) editor.insertNewEquation();
    }).on('focus blur', function (e) {
        if (editor.isMathEditorVisible() && e.type === 'focus') editor.closeMathEditor();
        editor.onEditorFocusChanged(e);
    }).on('keyup input', function (e) {
        return onValueChanged(sanitizeContent(e.currentTarget));
    }).on('paste', function (e) {
        if (e.target.tagName === 'TEXTAREA') return;
        var clipboardData = e.originalEvent.clipboardData;
        var file = clipboardData.items && clipboardData.items[0].getAsFile();
        if (file) {
            e.preventDefault();
            if (file.type !== 'image/png') return;
            saver(file).then(function (screenshotUrl) {
                var img = '<img src="' + screenshotUrl + '"/>';
                window.document.execCommand('insertHTML', false, img);
            });
        } else {
            var clipboardDataAsHtml = clipboardData.getData('text/html');
            if (clipboardDataAsHtml) {
                e.preventDefault();
                window.document.execCommand('insertHTML', false, sanitizeHtml(clipboardDataAsHtml, sanitizeOpts));
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

function sanitizeContent(answerElement) {
    $(answerElement).find('[data-js="mathEditor"]').hide();
    var text = $(answerElement)[0].innerText;
    $(answerElement).find('[data-js="mathEditor"]').show();

    // Shouldn't interfere in user input
    var html = sanitizeHtml($(answerElement).html(), sanitizeOpts);

    return { answerHTML: html, answerText: text };
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

}).call(this,require("buffer").Buffer)

},{"./FI":1,"./SV":2,"./sanitizeOpts":5,"./toolbars":7,"./util":8,"buffer":undefined,"sanitize-html":undefined}],5:[function(require,module,exports){
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
{ character: '≈', latexCommand: '\\approx' }, { character: '∼', latexCommand: '\\sim' }, { character: '≠', latexCommand: '\\neq' }, { character: '≤', latexCommand: '\\leq' }, { character: '≥', latexCommand: '\\geq' }, { character: '…', latexCommand: '\\dots' }, { character: '²', latexCommand: '^2' }, { character: '³', latexCommand: '^3' }, { character: '½', latexCommand: '1/2' }, { character: '·', latexCommand: '\\cdot' }, { character: '±', latexCommand: '\\pm' }, { character: '°' }, { character: '∘', latexCommand: '\\circ' }, { character: '∠', latexCommand: '\\angle' }, { character: '△', latexCommand: '\\triangle' }, { character: '⊥', latexCommand: '\\perp' }, { character: '‖', latexCommand: '\\parallel' }, { character: 'µ', latexCommand: '\\mu' }, { character: '∂', latexCommand: '\\partial' }, { character: '∑', latexCommand: '\\Sigma' }, { character: '∏', latexCommand: '\\Pi' }, { character: 'Ω', latexCommand: '\\Omega' }, { character: 'Δ', latexCommand: '\\Delta' }, { character: '𝜄', latexCommand: '\\iota' }, { character: 'Γ', latexCommand: '\\Gamma' }, { character: 'Θ', latexCommand: '\\Theta' }, { character: 'Φ', latexCommand: '\\Phi' }, { character: 'η', latexCommand: '\\eta' }, { character: 'α', latexCommand: '\\alpha' }, { character: 'δ', latexCommand: '\\delta' }, { character: 'ε', latexCommand: '\\varepsilon' }, { character: 'σ', latexCommand: '\\sigma' }, { character: 'τ', latexCommand: '\\tau' }, { character: 'Ω', latexCommand: '\\Omega' }, { character: 'ω', latexCommand: '\\omega' }, { character: 'π', latexCommand: '\\pi' }, { character: 'Ф', latexCommand: '\\phi' }, { character: '↑', latexCommand: '\\uparrow' }, { character: '→', latexCommand: '\\rightarrow' }, { character: '↓', latexCommand: '\\downarrow' }, { character: '↔', latexCommand: '\\leftrightarrow' }, { character: '⇒', latexCommand: '\\Rightarrow' }, { character: '⇔', latexCommand: '\\Leftrightarrow' }, { character: '⇌' }, // \rightleftharpoons
{ character: '∞', latexCommand: '\\infty' }, { character: '∈', latexCommand: '\\in' }, { character: '∉', latexCommand: '\\notin' }, { character: 'ℝ' }, { character: 'ℕ' }, { character: 'ℤ' }, { character: 'ℚ' }, { character: '⊂', latexCommand: '\\subset' }, { character: '⊄', latexCommand: '\\notsubset' }, { character: '∩', latexCommand: '\\cap' }, { character: '∪', latexCommand: '\\cup' }, { character: '∅', latexCommand: '\\empty' }, { character: '∖', latexCommand: '\\setminus' }, { character: '⌐' }, // \backneg
{ character: '∧', latexCommand: '\\and' }, { character: '∨', latexCommand: '\\or' }, { character: '∀', latexCommand: '\\forall' }, { character: '∃', latexCommand: '\\exists' }];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvRkkuanMiLCJhcHAvU1YuanMiLCJhcHAvbGF0ZXhDb21tYW5kcy5qcyIsImFwcC9tYXRoLWVkaXRvci5qcyIsImFwcC9zYW5pdGl6ZU9wdHMuanMiLCJhcHAvc3BlY2lhbENoYXJhY3RlcnMuanMiLCJhcHAvdG9vbGJhcnMuanMiLCJhcHAvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsWUFBUTtBQUNKLG9CQUFZLGdCQURSO0FBRUosZUFBTyx5Q0FGSDtBQUdKLGtoQkFISTtBQVdKLHFEQVhJO0FBWUosNGRBWkk7QUF1Qkosb0JBQVksVUF2QlI7QUF3QkosMkJBQW1CLGVBeEJmO0FBeUJKLHdCQUFnQixhQXpCWjtBQTBCSixlQUFPLE9BMUJIO0FBMkJKLGNBQU0sVUEzQkY7QUE0QkosaUJBQVMsWUE1Qkw7QUE2Qkosc0JBQWMsbUJBN0JWO0FBOEJKLGtCQUFVLEtBOUJOO0FBK0JKLG1CQUFXLFlBL0JQO0FBZ0NKLHFCQUFhO0FBaENULEtBREs7QUFtQ2IsZ0JBQVk7QUFDUixzQkFBYyxtQkFETjtBQUVSLGlCQUFTLFlBRkQ7QUFHUixvQkFBWSxnQkFISjtBQUlSLGVBQU8sV0FKQztBQUtSLGtCQUFVLEdBTEY7QUFNUix1QkFBZSxzQkFOUDtBQU9SLGNBQU0sb0JBUEU7QUFRUixrQkFBVSxlQVJGO0FBU1IsbUJBQVc7QUFUSDtBQW5DQyxDQUFqQjs7Ozs7QUNBQSxPQUFPLE9BQVAsR0FBaUI7QUFDYixZQUFRO0FBQ0osb0JBQVksaUJBRFI7QUFFSixlQUFPLDBDQUZIO0FBR0osNmhCQUhJO0FBUUosd0RBUkk7QUFTSixvWUFUSTtBQWtCSixvQkFBWSxhQWxCUjtBQW1CSiwyQkFBbUIsZUFuQmY7QUFvQkosd0JBQWdCLGtCQXBCWjtBQXFCSixlQUFPLE9BckJIO0FBc0JKLGNBQU0sT0F0QkY7QUF1QkosaUJB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QVcsTUFBTSxjQUF2QjtBQUNBLFFBQU0sU0FBUyxNQUFNLFlBQXJCO0FBQ0EsUUFBSSxXQUFXLE1BQU0sS0FBckI7QUFDQSxVQUFNLEtBQU4sR0FBYyxTQUFTLFNBQVQsQ0FBbUIsQ0FBbkIsRUFBc0IsUUFBdEIsSUFBa0MsS0FBbEMsR0FBMEMsU0FBUyxTQUFULENBQW1CLE1BQW5CLEVBQTJCLFNBQVMsTUFBcEMsQ0FBeEQ7QUFDQSxVQUFNLGNBQU4sR0FBdUIsTUFBTSxZQUFOLEdBQXFCLFdBQVcsTUFBTSxNQUE3RDtBQUNIIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGVkaXRvcjoge1xuICAgICAgICBtYXRoRWRpdG9yOiAnTWF0aWtrYWVkaXRvcmknLFxuICAgICAgICB0aXRsZTogJ0thYXZhZWRpdG9yaW4gZW5zaW1tw6RpbmVuIGtlaGl0eXN2ZXJzaW8nLFxuICAgICAgICBkZXNjcmlwdGlvbjogYDx1bD5cbjxsaT5FZGl0b3JpIHRvaW1paSBwYXJoYWl0ZW4gRmlyZWZveC1zZWxhaW1lbGxhLjwvbGk+XG48bGk+4oCcTGlzw6TDpCBrYWF2YeKAnSAtbmFwaW4gYWx0YSBsw7Z5ZMOkdCB5bGVpc2ltcGnDpCBtYXRlbWF0aWlrYXNzYSwgZnlzaWlrYXNzYSBqYVxua2VtaWFzc2Ega8OkeXRldHTDpHZpw6QgbWVya2ludMO2asOkLiBMaXPDpGtzaSBlcmlrb2lzbWVya2tlasOkIHZvaSBrw6R5dHTDpMOkIGthYXZhbiBraXJqb2l0dGFtaXNlZW4uPC9saT5cbiA8bGk+S2Fhdm9qYSB2b2kgcmFrZW50YWFcbmtsaWtrYWFtYWxsYSB2YWxpa29uIG1lcmtpbnTDtmrDpCBqYS90YWkga2lyam9pdHRhbWFsbGEgTGFUZVhpYS48L2xpPlxuIDxsaT5FZGl0b3JpbiB2YXN0YXVza2VudHTDpMOkbiB2b2kga2lyam9pdHRhYSB0ZWtzdGnDpCBqYSBrYWF2b2phIHNla8OkXG5saXPDpHTDpCBrdXZpYS48L2xpPjwvdWw+YCxcbiAgICAgICAgc2hvcnRjdXRUaXRsZTogYFBpa2Fuw6RwcMOkaW52aW5ra2Vqw6RgLFxuICAgICAgICBzaG9ydGN1dHM6IGA8dGFibGU+PHRib2R5PlxuPHRyPjx0aD5MaWl0w6Qga3V2YSBsZWlrZXDDtnlkw6RsdMOkPC90aD48dGQ+Q3RybC1WPC90ZD48L3RyPlxuPHRyPjx0aD5LaXJqb2l0YSBrYWF2YTwvdGg+PHRkPkN0cmwtTCB0YWkgQ3RybC1JPC90ZD48L3RyPlxuPHRyPjx0aCBjb2xzcGFuPVwiMlwiPkthYXZhc3NhPC90aD48L3RyPlxuPHRyPjx0aD5KYWtvdmlpdmE8L3RoPjx0ZD4vPC90ZD48L3RyPlxuPHRyPjx0aD5LZXJ0b21lcmtraTwvdGg+PHRkPio8L3RkPjwvdHI+XG48dHI+PHRoPkVrc3BvbmVudHRpPC90aD48dGQ+XjwvdGQ+PC90cj5cbjx0cj48dGg+U3VsamUga2FhdmE8L3RoPjx0ZD5DdHJsLUVudGVyIHRhaSBFc2M8L3RkPjwvdHI+XG48dHI+PHRoPkxpc8Okw6Qga2FhdmEgc2V1cmFhdmFsbGUgcml2aWxsZTwvdGg+PHRkPkVudGVyPC90ZD48L3RyPlxuPC90Ym9keT5cbjwvdGFibGU+YCxcbiAgICAgICAgZm9ybWF0dGluZzogJ011b3RvaWx1JyxcbiAgICAgICAgc3BlY2lhbENoYXJhY3RlcnM6ICdFcmlrb2lzbWVya2l0JyxcbiAgICAgICAgaW5zZXJ0RXF1YXRpb246ICdMaXPDpMOkIGthYXZhJyxcbiAgICAgICAgY2xvc2U6ICdzdWxqZScsXG4gICAgICAgIHNhdmU6ICdUYWxsZW5uYScsXG4gICAgICAgIHVwZGF0ZWQ6ICdQw6Rpdml0ZXR0eScsXG4gICAgICAgIHNlbmRGZWVkYmFjazogJ0zDpGhldMOkIHBhbGF1dGV0dGEnLFxuICAgICAgICBsYW5nTGluazogJy9zdicsXG4gICAgICAgIGxhbmdMYWJlbDogJ1DDpSBzdmVuc2thJyxcbiAgICAgICAgYW5zd2VyVGl0bGU6ICdWYXN0YXVzJ1xuICAgIH0sXG4gICAgYW5ub3RhdGluZzoge1xuICAgICAgICBzZW5kRmVlZGJhY2s6ICdMw6RoZXTDpCBwYWxhdXRldHRhJyxcbiAgICAgICAgdXBkYXRlZDogJ1DDpGl2aXRldHR5JyxcbiAgICAgICAgbWF0aEVkaXRvcjogJ01hdGlra2FlZGl0b3JpJyxcbiAgICAgICAgdGl0bGU6ICdBcnZvc3RlbHUnLFxuICAgICAgICBiYWNrTGluazogJy8nLFxuICAgICAgICBiYWNrTGlua0xhYmVsOiAnUGFsYWEga2FhdmFlZGl0b3JpaW4nLFxuICAgICAgICBzYXZlOiAnVGFsbGVubmEgbWVya2lubsOkdCcsXG4gICAgICAgIGxhbmdMaW5rOiAnL3N2L2JlZG9tbmluZycsXG4gICAgICAgIGxhbmdMYWJlbDogJ1DDpSBzdmVuc2thJ1xuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGVkaXRvcjoge1xuICAgICAgICBtYXRoRWRpdG9yOiAnTWF0ZW1hdGlrZWRpdG9yJyxcbiAgICAgICAgdGl0bGU6ICdGb3JtZWxlZGl0b3JucyBmw7Zyc3RhIHV0dmVja2xpbmdzdmVyc2lvbicsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBgPHVsPlxuPGxpPkVkaXRvcm4gZnVuZ2VyYXIgYsOkc3QgbWVkIGJyb3dzZXJuIEZpcmVmb3guPC9saT5cbiA8bGk+VW5kZXIga25hcHBlbiDigJxMw6RnZyB0aWxsIGZvcm1lbOKAnSBoaXR0YXIgZHUgZGUgdmFubGlnYXN0ZSBiZXRlY2tuaW5nYXJuYSBzb20gYW52w6RuZHMgaSBtYXRlbWF0aWssIGZ5c2lrIG9jaCBrZW1pLiBEZXNzdXRvbSBrYW4gZHUgYW52w6RuZGEgc3BlY2lhbHRlY2tlbiBmw7ZyIGF0dCBza3JpdmEgZm9ybWxlci48L2xpPlxuPGxpPkRldCBnw6VyIGF0dCBrb25zdHJ1ZXJhIGZvcm1sZXIgZ2Vub20gYXR0IGtsaWNrYSBww6UgYmV0ZWNrbmluZ2FybmEgaSBtZW55ZXJuYSBvY2gvZWxsZXIgZ2Vub20gYXR0IHNrcml2YSBMYVRlWC48L2xpPlxuPGxpPkRldCBnw6VyIGbDtnJ1dG9tIGF0dCBza3JpdmEgdGV4dCBvY2ggZm9ybWxlciwgYXR0IG9ja3PDpSBhdHQgbMOkZ2dhIHRpbGwgYmlsZGVyIGkgc3ZhcnNmw6RsdGV0LjwvbGk+PC91bD5gLFxuICAgICAgICBzaG9ydGN1dFRpdGxlOiBgVGlwcyBww6UgdGFuZ2VudGtvbWJpbmF0aW9uZXJgLFxuICAgICAgICBzaG9ydGN1dHM6IGA8dGFibGU+PHRib2R5PlxuPHRyPjx0aD5Mw6RnZyB0aWxsIGVuIGJpbGQgZnLDpW4gdXJrbGlwcGV0PC90aD48dGQ+Q3RybC1WPC90ZD48L3RyPlxuPHRyPjx0aD5Ta3JpdiBlbiBmb3JtZWw8L3RoPjx0ZD5DdHJsLUwgLyBDdHJsLUk8L3RkPjwvdHI+XG48dHI+PHRoIGNvbHNwYW49XCIyXCI+SSBmb3JtZWxuIDwvdGg+PC90cj5cbjx0cj48dGg+QnLDpWtzdHJlY2s8L3RoPjx0ZD4vPC90ZD48L3RyPlxuPHRyPjx0aD5NdWx0aXBsaWthdGlvbnN0ZWNrZW48L3RoPjx0ZD4qPC90ZD48L3RyPlxuPHRyPjx0aD5TdMOkbmcgZm9ybWVsbjwvdGg+PHRkPkN0cmwtRW50ZXIgZWxsZXIgRXNjPC90ZD48L3RyPlxuPC90Ym9keT5cbjwvdGFibGU+YCxcbiAgICAgICAgZm9ybWF0dGluZzogJ0Zvcm1hdGVyaW5nJyxcbiAgICAgICAgc3BlY2lhbENoYXJhY3RlcnM6ICdTcGVjaWFsdGVja2VuJyxcbiAgICAgICAgaW5zZXJ0RXF1YXRpb246ICdMw6RnZyB0aWxsIGZvcm1lbCcsXG4gICAgICAgIGNsb3NlOiAnc3TDpG5nJyxcbiAgICAgICAgc2F2ZTogJ1NwYXJhJyxcbiAgICAgICAgdXBkYXRlZDogJ1VwcGRhdGVyYWQnLFxuICAgICAgICBzZW5kRmVlZGJhY2s6ICdTa2lja2EgZmVlZGJhY2snLFxuICAgICAgICBsYW5nTGluazogJy8nLFxuICAgICAgICBsYW5nTGFiZWw6ICdTdW9tZWtzaScsXG4gICAgICAgIGFuc3dlclRpdGxlOiAnU3ZhcidcbiAgICB9LFxuICAgIGFubm90YXRpbmc6IHtcbiAgICAgICAgc2VuZEZlZWRiYWNrOiAnU2tpY2thIHJlc3BvbnMnLFxuICAgICAgICB1cGRhdGVkOiAnVXBwZGF0ZXJhZCcsXG4gICAgICAgIG1hdGhFZGl0b3I6ICdNYXRlbWF0aWtlZGl0b3InLFxuICAgICAgICB0aXRsZTogJ0JlZMO2bW5pbmcnLFxuICAgICAgICBiYWNrTGluazogJy9zdicsXG4gICAgICAgIGJhY2tMaW5rTGFiZWw6ICdNYXRlbWF0aWtlZGl0b3InLFxuICAgICAgICBzYXZlOiAnU3BhcmEgYW50ZWNrbmluZ2FyJyxcbiAgICAgICAgbGFuZ0xpbms6ICcvdGFya2lzdHVzJyxcbiAgICAgICAgbGFuZ0xhYmVsOiAnU3VvbWVrc2knXG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gICAge2FjdGlvbjogJ1xcXFxzcXJ0JywgbGFiZWw6ICdcXFxcc3FydHtYfSd9LFxuICAgIHthY3Rpb246ICdeJywgbGFiZWw6ICd4XntYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcZnJhYycsIGxhYmVsOiAnXFxcXGZyYWN7WH17WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGludCcsIGxhYmVsOiAnXFxcXGludF97WH1ee1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxsaW1fJywgbGFiZWw6ICdcXFxcbGltX3tYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcbGltX3t4XFxcXHJpZ2h0YXJyb3dcXFxcaW5mdHl9JywgbGFiZWw6ICdcXFxcbGltX3t4XFxcXHJpZ2h0YXJyb3dcXFxcaW5mdHl9JywgdXNlV3JpdGU6dHJ1ZX0sXG4gICAge2FjdGlvbjogJ1xcXFxvdmVycmlnaHRhcnJvdycsIGxhYmVsOiAnXFxcXG92ZXJyaWdodGFycm93e1h9J30sXG4gICAge2FjdGlvbjogJ18nLCBsYWJlbDogJ3hfWCd9LFxuICAgIHthY3Rpb246ICdcXFxcbnRocm9vdCcsIGxhYmVsOiAnXFxcXHNxcnRbWF17WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXHN1bScsIGxhYmVsOiAnXFxcXHN1bV97WH1ee1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxiaW5vbScsIGxhYmVsOiAnXFxcXGJpbm9te1h9e1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxzaW4nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGNvcyd9LFxuICAgIHthY3Rpb246ICdcXFxcdGFuJ30sXG4gICAge2FjdGlvbjogJ1xcXFx2ZWMnLCBsYWJlbDogJ1xcXFx2ZWN7WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGJhcicsIGxhYmVsOiAnXFxcXGJhcntYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcmxpbmV7XFxcXHRleHR7aX19JywgdXNlV3JpdGU6IHRydWV9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcmxpbmV7XFxcXHRleHR7an19JywgdXNlV3JpdGU6IHRydWV9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcmxpbmV7XFxcXHRleHR7a319JywgdXNlV3JpdGU6IHRydWV9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcmxlZnRhcnJvdycsIGxhYmVsOiAnXFxcXG92ZXJsZWZ0YXJyb3d7WH0nfSxcbiAgICB7YWN0aW9uOiAnfCcsIGxhYmVsOiAnfFh8J30sXG4gICAge2FjdGlvbjogJygnLCBsYWJlbDogJyhYKSd9LFxuICAgIHthY3Rpb246ICdfeyB9XnsgfSAnLCBsYWJlbDogJ197WH1ee1h9WCcsIHVzZVdyaXRlOiB0cnVlfSxcbiAgICB7YWN0aW9uOiAnXFxcXHRleHQnLCBsYWJlbDogJ1xcXFx0ZXh0e1R9J30sXG5dXG4iLCJjb25zdCB1dGlsID0gcmVxdWlyZSgnLi91dGlsJylcbmNvbnN0IHNhbml0aXplSHRtbCA9IHJlcXVpcmUoJ3Nhbml0aXplLWh0bWwnKVxuY29uc3Qgc2FuaXRpemVPcHRzID0gcmVxdWlyZSgnLi9zYW5pdGl6ZU9wdHMnKVxuY29uc3QgdG9vbGJhcnMgPSByZXF1aXJlKCcuL3Rvb2xiYXJzJylcbmNvbnN0IE1RID0gTWF0aFF1aWxsLmdldEludGVyZmFjZSgyKVxuY29uc3QgbG9jYWxlcyA9IHtcbiAgICBGSTogcmVxdWlyZSgnLi9GSScpLFxuICAgIFNWOiByZXF1aXJlKCcuL1NWJylcbn1cbmNvbnN0IGwgPSBsb2NhbGVzW3dpbmRvdy5sb2NhbGUgfHwgJ0ZJJ10uZWRpdG9yXG5jb25zdCBrZXlDb2RlcyA9IHtcbiAgICBFTlRFUjogMTMsXG4gICAgRVNDOiAyN1xufVxuXG5jb25zdCAkb3V0ZXJQbGFjZWhvbGRlciA9ICQoYDxkaXYgY2xhc3M9XCJtYXRoLWVkaXRvci1oaWRkZW5cIiBkYXRhLWpzPVwib3V0ZXJQbGFjZWhvbGRlclwiPmApXG5cbmZ1bmN0aW9uIG1vdmVFbGVtZW50QWZ0ZXIoJGVsZW1lbnQsICRhZnRlcikge1xuICAgICRhZnRlci5hZnRlcigkZWxlbWVudClcbn1cblxuZnVuY3Rpb24gaGlkZUVsZW1lbnRJbkRPTSgkZWxlbWVudCkge1xuICAgICRvdXRlclBsYWNlaG9sZGVyLmFwcGVuZCgkZWxlbWVudClcbn1cblxuLy8gVE9ETzogcmVwbGFjZSB3aXRoIGRhdGEgYXR0cmlidXRlcz9cbmxldCBhbnN3ZXJGb2N1cyA9IHRydWVcbmxldCBsYXRleEVkaXRvckZvY3VzID0gZmFsc2VcbmxldCBlcXVhdGlvbkVkaXRvckZvY3VzID0gZmFsc2VcbmxldCBtYXRoRWRpdG9yVmlzaWJsZSA9IGZhbHNlXG5sZXQgJGN1cnJlbnRFZGl0b3JcblxuJCgnYm9keScpLmFwcGVuZCgkb3V0ZXJQbGFjZWhvbGRlcilcblxuY29uc3QgbWF0aEVkaXRvciA9IGluaXRNYXRoRWRpdG9yKClcbmNvbnN0IHskdG9vbGJhciwgdG9nZ2xlTWF0aFRvb2xiYXJ9ID0gdG9vbGJhcnMuaW5pdChtYXRoRWRpdG9yLCAoKSA9PiBhbnN3ZXJGb2N1cywgbClcblxuaGlkZUVsZW1lbnRJbkRPTSgkdG9vbGJhcilcblxuZnVuY3Rpb24gaW5pdE1hdGhFZGl0b3IoKSB7XG4gICAgY29uc3QgJG1hdGhFZGl0b3JDb250YWluZXIgPSAkKGBcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1hdGgtZWRpdG9yXCIgZGF0YS1qcz1cIm1hdGhFZGl0b3JcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYXRoLWVkaXRvci1jbG9zZVwiIHRpdGxlPVwiQ3RybC1FbnRlclwiPiR7bC5jbG9zZX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYXRoLWVkaXRvci1ib3hlc1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYXRoLWVkaXRvci1lcXVhdGlvbi1lZGl0b3JcIiBkYXRhLWpzPVwiZXF1YXRpb25FZGl0b3JcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCJtYXRoLWVkaXRvci1sYXRleC1lZGl0b3JcIiBkYXRhLWpzPVwibGF0ZXhFZGl0b3JcIiBwbGFjZWhvbGRlcj1cIkxhVGV4XCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5gKVxuXG4gICAgaGlkZUVsZW1lbnRJbkRPTSgkbWF0aEVkaXRvckNvbnRhaW5lcilcblxuICAgIGNvbnN0ICRsYXRleEVkaXRvciA9ICRtYXRoRWRpdG9yQ29udGFpbmVyLmZpbmQoJ1tkYXRhLWpzPVwibGF0ZXhFZGl0b3JcIl0nKVxuICAgIGNvbnN0ICRlcXVhdGlvbkVkaXRvciA9ICRtYXRoRWRpdG9yQ29udGFpbmVyLmZpbmQoJ1tkYXRhLWpzPVwiZXF1YXRpb25FZGl0b3JcIl0nKVxuICAgIGNvbnN0IG1xSW5zdGFuY2UgPSBNUS5NYXRoRmllbGQoJGVxdWF0aW9uRWRpdG9yLmdldCgwKSwge1xuICAgICAgICBoYW5kbGVyczoge1xuICAgICAgICAgICAgZWRpdDogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChsYXRleEVkaXRvckZvY3VzKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICBjb25zdCBsYXRleCA9IG1xSW5zdGFuY2UubGF0ZXgoKVxuICAgICAgICAgICAgICAgICRsYXRleEVkaXRvci52YWwobGF0ZXgpXG4gICAgICAgICAgICAgICAgdXBkYXRlTWF0aEltZygkbWF0aEVkaXRvckNvbnRhaW5lci5wcmV2KCksIGxhdGV4KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudGVyOiBmaWVsZCA9PiB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogZG8gbm90IGNsb3NlIGVkaXRvciAvIG8gbm90IGNyZWF0ZSBhIG5ldyBlcXVhdGlvbiBpZiB0aGVyZSBpcyBubyB0ZXh0P1xuICAgICAgICAgICAgICAgIG1hdGhFZGl0b3IuY2xvc2VNYXRoRWRpdG9yKHRydWUpXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBpbnNlcnROZXdFcXVhdGlvbignPGRpdj48L2Rpdj4nKSwgMilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAkZXF1YXRpb25FZGl0b3JcbiAgICAgICAgLm9uKCdmb2N1cyBtb3VzZWRvd24nLCBlID0+IGVxdWF0aW9uRWRpdG9yRm9jdXMgPSB0cnVlKVxuICAgICAgICAub24oJ2ZvY3VzIGJsdXInLCAnLm1xLXRleHRhcmVhIHRleHRhcmVhJywgZSA9PiB7XG4gICAgICAgICAgICBlcXVhdGlvbkVkaXRvckZvY3VzID0gZS50eXBlICE9PSAnYmx1cidcbiAgICAgICAgICAgIG9uRm9jdXNDaGFuZ2VkKClcbiAgICAgICAgfSlcblxuICAgIGZ1bmN0aW9uIG9uTGF0ZXhVcGRhdGUoKSB7XG4gICAgICAgIHVwZGF0ZU1hdGhJbWcoJG1hdGhFZGl0b3JDb250YWluZXIucHJldigpLCAkbGF0ZXhFZGl0b3IudmFsKCkpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gbXFJbnN0YW5jZS5sYXRleCgkbGF0ZXhFZGl0b3IudmFsKCkpLCAxKVxuICAgIH1cblxuICAgICRsYXRleEVkaXRvclxuICAgICAgICAua2V5dXAob25MYXRleFVwZGF0ZSlcbiAgICAgICAgLm9uKCdmb2N1cyBibHVyJywgZSA9PiB7XG4gICAgICAgICAgICBsYXRleEVkaXRvckZvY3VzID0gZS50eXBlICE9PSAnYmx1cidcbiAgICAgICAgICAgIG9uRm9jdXNDaGFuZ2VkKClcbiAgICAgICAgfSlcblxuICAgICRtYXRoRWRpdG9yQ29udGFpbmVyLmZpbmQoJy5jbG9zZScpLm1vdXNlZG93bihlID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGNsb3NlTWF0aEVkaXRvcih0cnVlKVxuICAgIH0pXG5cbiAgICBsZXQgZm9jdXNDaGFuZ2VkID0gbnVsbFxuXG4gICAgZnVuY3Rpb24gb25Gb2N1c0NoYW5nZWQoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChmb2N1c0NoYW5nZWQpXG4gICAgICAgIGZvY3VzQ2hhbmdlZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFsYXRleEVkaXRvckZvY3VzICYmICFlcXVhdGlvbkVkaXRvckZvY3VzKSBjbG9zZU1hdGhFZGl0b3IoKVxuICAgICAgICAgICAgaWYgKCFhbnN3ZXJGb2N1cyAmJiAhbWF0aEVkaXRvclZpc2libGUgJiYgIWxhdGV4RWRpdG9yRm9jdXMgJiYgIWVxdWF0aW9uRWRpdG9yRm9jdXMpIGNsb3NlRWRpdG9yKClcbiAgICAgICAgfSwgMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnNlcnROZXdFcXVhdGlvbihvcHRpb25hbE1hcmt1cCkge1xuICAgICAgICB3aW5kb3cuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydEhUTUwnLCBmYWxzZSwgKG9wdGlvbmFsTWFya3VwID8gb3B0aW9uYWxNYXJrdXAgOiAnJykgKyAnPGltZyBkYXRhLWpzPVwibmV3XCIgc3R5bGU9XCJkaXNwbGF5OiBub25lXCIvPicpO1xuICAgICAgICBjb25zdCAkYWRkZWRFcXVhdGlvbkltYWdlID0gJCgnW2RhdGEtanM9XCJuZXdcIl0nKVxuICAgICAgICAkYWRkZWRFcXVhdGlvbkltYWdlXG4gICAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS1qcycpXG5cbiAgICAgICAgbW92ZUVsZW1lbnRBZnRlcigkbWF0aEVkaXRvckNvbnRhaW5lciwgJGFkZGVkRXF1YXRpb25JbWFnZSlcblxuICAgICAgICBtcUluc3RhbmNlLmxhdGV4KCcnKVxuICAgICAgICBtYXRoRWRpdG9yVmlzaWJsZSA9IHRydWVcbiAgICAgICAgdG9nZ2xlTWF0aFRvb2xiYXIodHJ1ZSlcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBtcUluc3RhbmNlLmZvY3VzKCksIDApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zZXJ0TWF0aChzeW1ib2wsIGFsdGVybmF0aXZlU3ltYm9sLCB1c2VXcml0ZSkge1xuICAgICAgICBpZiAobGF0ZXhFZGl0b3JGb2N1cykge1xuICAgICAgICAgICAgdXRpbC5pbnNlcnRUb1RleHRBcmVhQXRDdXJzb3IoJGxhdGV4RWRpdG9yLmdldCgwKSwgYWx0ZXJuYXRpdmVTeW1ib2wgfHwgc3ltYm9sKVxuICAgICAgICAgICAgb25MYXRleFVwZGF0ZSgpXG4gICAgICAgIH0gZWxzZSBpZiAoZXF1YXRpb25FZGl0b3JGb2N1cykge1xuICAgICAgICAgICAgaWYgKHVzZVdyaXRlKSB7XG4gICAgICAgICAgICAgICAgbXFJbnN0YW5jZS53cml0ZShzeW1ib2wpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1xSW5zdGFuY2UudHlwZWRUZXh0KHN5bWJvbClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHN5bWJvbC5zdGFydHNXaXRoKCdcXFxcJykpIG1xSW5zdGFuY2Uua2V5c3Ryb2tlKCdUYWInKVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBtcUluc3RhbmNlLmZvY3VzKCksIDApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVNYXRoSW1nKCRpbWcsIGxhdGV4KSB7XG4gICAgICAgICRpbWdcbiAgICAgICAgICAgIC5wcm9wKCdzcmMnLCAnL21hdGguc3ZnP2xhdGV4PScgKyBlbmNvZGVVUklDb21wb25lbnQobGF0ZXgpKVxuICAgICAgICAgICAgLnByb3AoJ2FsdCcsIGxhdGV4KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlTWF0aEVkaXRvcihzZXRGb2N1c0FmdGVyQ2xvc2UgPSBmYWxzZSkge1xuICAgICAgICAvLyBUT0RPOiByZW1vdmUgZXZlbnQgYmluZGluZ3NcbiAgICAgICAgY29uc3QgJGN1cnJlbnRFZGl0b3IgPSAkbWF0aEVkaXRvckNvbnRhaW5lci5jbG9zZXN0KCdbZGF0YS1qcz1cImFuc3dlclwiXScpXG4gICAgICAgIGNvbnN0ICRpbWcgPSAkbWF0aEVkaXRvckNvbnRhaW5lci5wcmV2KClcbiAgICAgICAgaWYgKCRsYXRleEVkaXRvci52YWwoKS50cmltKCkgPT09ICcnKSB7XG4gICAgICAgICAgICAkaW1nLnJlbW92ZSgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkaW1nLnNob3coKVxuICAgICAgICAgICAgdXBkYXRlTWF0aEltZygkaW1nLCAkbGF0ZXhFZGl0b3IudmFsKCkpXG4gICAgICAgIH1cblxuICAgICAgICB0b2dnbGVNYXRoVG9vbGJhcihmYWxzZSlcbiAgICAgICAgaGlkZUVsZW1lbnRJbkRPTSgkbWF0aEVkaXRvckNvbnRhaW5lcilcbiAgICAgICAgbWF0aEVkaXRvclZpc2libGUgPSBmYWxzZVxuICAgICAgICBsYXRleEVkaXRvckZvY3VzID0gZmFsc2VcbiAgICAgICAgZXF1YXRpb25FZGl0b3JGb2N1cyA9IGZhbHNlXG4gICAgICAgIGlmIChzZXRGb2N1c0FmdGVyQ2xvc2UpICRjdXJyZW50RWRpdG9yLmZvY3VzKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvcGVuTWF0aEVkaXRvcigkaW1nKSB7XG4gICAgICAgIGlmIChtYXRoRWRpdG9yVmlzaWJsZSkgY2xvc2VNYXRoRWRpdG9yKClcbiAgICAgICAgJGltZy5oaWRlKClcbiAgICAgICAgbW92ZUVsZW1lbnRBZnRlcigkbWF0aEVkaXRvckNvbnRhaW5lciwgJGltZylcbiAgICAgICAgY29uc3QgbGF0ZXggPSAkaW1nLnByb3AoJ2FsdCcpXG4gICAgICAgICRsYXRleEVkaXRvci52YWwobGF0ZXgpXG4gICAgICAgIG9uTGF0ZXhVcGRhdGUoKVxuICAgICAgICBtYXRoRWRpdG9yVmlzaWJsZSA9IHRydWVcbiAgICAgICAgdG9nZ2xlTWF0aFRvb2xiYXIodHJ1ZSlcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBtcUluc3RhbmNlLmZvY3VzKCksIDApXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5zZXJ0TmV3RXF1YXRpb24sXG4gICAgICAgIGluc2VydE1hdGgsXG4gICAgICAgIGNsb3NlTWF0aEVkaXRvcixcbiAgICAgICAgb3Blbk1hdGhFZGl0b3IsXG4gICAgICAgIG9uRm9jdXNDaGFuZ2VkXG4gICAgfVxufVxuXG5mdW5jdGlvbiBvcGVuRWRpdG9yKCRlbGVtZW50KSB7XG4gICAgJGN1cnJlbnRFZGl0b3IgPSAkZWxlbWVudFxuICAgICRlbGVtZW50LmJlZm9yZSgkdG9vbGJhcilcbiAgICAkdG9vbGJhci5zaG93KClcbn1cblxuZnVuY3Rpb24gY2xvc2VFZGl0b3IoKSB7XG4gICAgLy8gVE9ETzogcmVtb3ZlIGV2ZW50IGJpbmRpbmdzXG4gICAgaGlkZUVsZW1lbnRJbkRPTSgkdG9vbGJhcilcbiAgICBtYXRoRWRpdG9yLmNsb3NlTWF0aEVkaXRvcigpXG4gICAgLy8gJGVkaXRvci5vZmYoKVxuXG4gICAgYW5zd2VyRm9jdXMgPSBmYWxzZVxuICAgIG1hdGhFZGl0b3JWaXNpYmxlID0gZmFsc2VcbiAgICBsYXRleEVkaXRvckZvY3VzID0gZmFsc2Vcbn1cblxubGV0IGJsdXJyZWRcblxuZnVuY3Rpb24gb25FZGl0b3JGb2N1c0NoYW5nZWQoZSkge1xuICAgIGFuc3dlckZvY3VzID0gZS50eXBlID09PSAnZm9jdXMnXG5cbiAgICBjbGVhclRpbWVvdXQoYmx1cnJlZClcbiAgICBibHVycmVkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICghYW5zd2VyRm9jdXMgJiYgIW1hdGhFZGl0b3JWaXNpYmxlICYmICFsYXRleEVkaXRvckZvY3VzICYmICFlcXVhdGlvbkVkaXRvckZvY3VzKSBjbG9zZUVkaXRvcigpXG4gICAgICAgIGVsc2UgaWYgKGFuc3dlckZvY3VzICYmIG1hdGhFZGl0b3JWaXNpYmxlKSBtYXRoRWRpdG9yLmNsb3NlTWF0aEVkaXRvcigpXG4gICAgICAgIGVsc2Ugb3BlbkVkaXRvcigkKGUudGFyZ2V0KSlcbiAgICB9LCAwKVxufVxuXG5mdW5jdGlvbiBpc01hdGhFZGl0b3JWaXNpYmxlKCkge1xuICAgIHJldHVybiBtYXRoRWRpdG9yVmlzaWJsZVxufVxuXG5jb25zdCBlZGl0b3IgPSB7XG4gICAgb3BlbkVkaXRvcixcbiAgICBjbG9zZUVkaXRvcixcbiAgICBvbkVkaXRvckZvY3VzQ2hhbmdlZCxcbiAgICBpc01hdGhFZGl0b3JWaXNpYmxlLFxuICAgIG9wZW5NYXRoRWRpdG9yOiBtYXRoRWRpdG9yLm9wZW5NYXRoRWRpdG9yLFxuICAgIGNsb3NlTWF0aEVkaXRvcjogbWF0aEVkaXRvci5jbG9zZU1hdGhFZGl0b3IsXG4gICAgaW5zZXJ0TmV3RXF1YXRpb246IG1hdGhFZGl0b3IuaW5zZXJ0TmV3RXF1YXRpb25cbn1cblxuY29uc3QgbWFya0FuZEdldElubGluZUltYWdlcyA9ICRlZGl0b3IgPT4gJGVkaXRvci5maW5kKCdpbWdbc3JjXj1cImRhdGFcIl0nKVxuICAgIC5lYWNoKChpLCBlbCkgPT4gZWwuc2V0QXR0cmlidXRlKCdpZCcsIG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgJy0nICsgaSkpXG4gICAgLm1hcCgoaSwgZWwpID0+IE9iamVjdC5hc3NpZ24oZGVjb2RlQmFzZTY0SW1hZ2UoZWwuZ2V0QXR0cmlidXRlKCdzcmMnKSksIHtpZDogZWwuZ2V0QXR0cmlidXRlKCdpZCcpfSkpXG4gICAgLnRvQXJyYXkoKVxuICAgIC5maWx0ZXIoKHt0eXBlfSkgPT4gdHlwZSA9PT0gJ2ltYWdlL3BuZycpXG5cbmNvbnN0IHBlcnNpc3RJbmxpbmVJbWFnZXMgPSAoJGVkaXRvciwgc2NyZWVuc2hvdFNhdmVyKSA9PiB7XG4gICAgcmV0dXJuIEJhY29uLmNvbWJpbmVBc0FycmF5KFxuICAgICAgICBtYXJrQW5kR2V0SW5saW5lSW1hZ2VzKCRlZGl0b3IpXG4gICAgICAgICAgICAubWFwKGRhdGEgPT4gQmFjb24uZnJvbVByb21pc2UoXG4gICAgICAgICAgICAgICAgc2NyZWVuc2hvdFNhdmVyKGRhdGEpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHNjcmVlbnNob3RVcmwgPT4gJGVkaXRvci5maW5kKCcjJyArIGRhdGEuaWQpLmF0dHIoJ3NyYycsIHNjcmVlbnNob3RVcmwpLnJlbW92ZUF0dHIoJ2lkJykpKVxuICAgICAgICAgICAgKVxuICAgICAgICApXG4gICAgICAgIC5vblZhbHVlKCgpID0+ICRlZGl0b3IudHJpZ2dlcignaW5wdXQnKSlcbn1cblxuZnVuY3Rpb24gZGVjb2RlQmFzZTY0SW1hZ2UoZGF0YVN0cmluZykge1xuICAgIGlmICghZGF0YVN0cmluZylcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICBjb25zdCBtYXRjaGVzID0gZGF0YVN0cmluZy5tYXRjaCgvXmRhdGE6KFtBLVphLXotK1xcL10rKTtiYXNlNjQsKC4rKSQvKVxuICAgIGlmIChtYXRjaGVzLmxlbmd0aCAhPT0gMykge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBtYXRjaGVzWzFdLFxuICAgICAgICBkYXRhOiBuZXcgQnVmZmVyKG1hdGNoZXNbMl0sICdiYXNlNjQnKVxuICAgIH1cbn1cblxuY29uc3QgbWFrZVJpY2hUZXh0ID0gKGVsZW1lbnQsIG9wdGlvbnMsIG9uVmFsdWVDaGFuZ2VkID0gKCkgPT4geyB9KSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgICBzY3JlZW5zaG90OiB7XG4gICAgICAgICAgICBzYXZlclxuICAgICAgICB9XG4gICAgfSA9IG9wdGlvbnNcbiAgICBjb25zdCAkYW5zd2VyID0gJChlbGVtZW50KVxuICAgICRhbnN3ZXJcbiAgICAgICAgLmF0dHIoJ2NvbnRlbnRlZGl0YWJsZScsICd0cnVlJylcbiAgICAgICAgLmF0dHIoJ3NwZWxsY2hlY2snLCAnZmFsc2UnKVxuICAgICAgICAuYXR0cignZGF0YS1qcycsICdhbnN3ZXInKVxuICAgICAgICAuYWRkQ2xhc3MoJ21hdGgtZWRpdG9yLWFuc3dlcicpXG4gICAgICAgIC5vbigna2V5ZG93bicsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKGlzQ3RybEtleShlLCBrZXlDb2Rlcy5FTlRFUikgfHwgaXNLZXkoZSwga2V5Q29kZXMuRVNDKSkgbWF0aEVkaXRvci5jbG9zZU1hdGhFZGl0b3IodHJ1ZSlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdtb3VzZWRvd24nLCAnaW1nW3NyY149XCIvbWF0aC5zdmdcIl0nLCBlID0+IGVkaXRvci5vcGVuTWF0aEVkaXRvcigkKGUudGFyZ2V0KSkpIC8vIFRPRE86IG9wZW4gZWRpdG9yIGlmIGNsaWNrZWQgb24gZXF1YXRpb24gaW4gYW5vdGhlciBlZGl0b3JcbiAgICAgICAgLm9uKCdrZXlwcmVzcycsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKGlzQ3RybEtleShlLCAnbCcpIHx8IGlzQ3RybEtleShlLCAnaScpKSBlZGl0b3IuaW5zZXJ0TmV3RXF1YXRpb24oKVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2ZvY3VzIGJsdXInLCBlID0+IHtcbiAgICAgICAgICAgIGlmIChlZGl0b3IuaXNNYXRoRWRpdG9yVmlzaWJsZSgpICYmIGUudHlwZSA9PT0gJ2ZvY3VzJykgZWRpdG9yLmNsb3NlTWF0aEVkaXRvcigpXG4gICAgICAgICAgICBlZGl0b3Iub25FZGl0b3JGb2N1c0NoYW5nZWQoZSlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdrZXl1cCBpbnB1dCcsIGUgPT4gb25WYWx1ZUNoYW5nZWQoc2FuaXRpemVDb250ZW50KGUuY3VycmVudFRhcmdldCkpKVxuICAgICAgICAub24oJ3Bhc3RlJywgZSA9PiB7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJylcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIGNvbnN0IGNsaXBib2FyZERhdGEgPSBlLm9yaWdpbmFsRXZlbnQuY2xpcGJvYXJkRGF0YVxuICAgICAgICAgICAgY29uc3QgZmlsZSA9IGNsaXBib2FyZERhdGEuaXRlbXMgJiYgY2xpcGJvYXJkRGF0YS5pdGVtc1swXS5nZXRBc0ZpbGUoKVxuICAgICAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICBpZihmaWxlLnR5cGUgIT09ICdpbWFnZS9wbmcnKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICBzYXZlcihmaWxlKS50aGVuKHNjcmVlbnNob3RVcmwgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBgPGltZyBzcmM9XCIke3NjcmVlbnNob3RVcmx9XCIvPmBcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LmV4ZWNDb21tYW5kKCdpbnNlcnRIVE1MJywgZmFsc2UsIGltZylcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjbGlwYm9hcmREYXRhQXNIdG1sID0gY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0L2h0bWwnKVxuICAgICAgICAgICAgICAgIGlmIChjbGlwYm9hcmREYXRhQXNIdG1sKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydEhUTUwnLCBmYWxzZSwgc2FuaXRpemVIdG1sKGNsaXBib2FyZERhdGFBc0h0bWwsIHNhbml0aXplT3B0cykpO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4gcGVyc2lzdElubGluZUltYWdlcygkY3VycmVudEVkaXRvciwgc2F2ZXIpLCAwKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiBwZXJzaXN0SW5saW5lSW1hZ2VzKCRjdXJyZW50RWRpdG9yLCBzYXZlciksIDApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxufVxuXG5mdW5jdGlvbiBzYW5pdGl6ZUNvbnRlbnQoYW5zd2VyRWxlbWVudCkge1xuICAgICQoYW5zd2VyRWxlbWVudCkuZmluZCgnW2RhdGEtanM9XCJtYXRoRWRpdG9yXCJdJykuaGlkZSgpXG4gICAgY29uc3QgdGV4dCA9ICQoYW5zd2VyRWxlbWVudClbMF0uaW5uZXJUZXh0XG4gICAgJChhbnN3ZXJFbGVtZW50KS5maW5kKCdbZGF0YS1qcz1cIm1hdGhFZGl0b3JcIl0nKS5zaG93KClcblxuICAgIC8vIFNob3VsZG4ndCBpbnRlcmZlcmUgaW4gdXNlciBpbnB1dFxuICAgIGNvbnN0IGh0bWwgPSBzYW5pdGl6ZUh0bWwoJChhbnN3ZXJFbGVtZW50KS5odG1sKCksIHNhbml0aXplT3B0cylcblxuICAgIHJldHVybiB7IGFuc3dlckhUTUw6IGh0bWwsIGFuc3dlclRleHQ6IHRleHQgfVxufVxuXG5mdW5jdGlvbiBpc0tleShlLCBrZXkpIHsgcmV0dXJuIHByZXZlbnRJZlRydWUoZSwgIWUuYWx0S2V5ICYmICFlLnNoaWZ0S2V5ICYmICFlLmN0cmxLZXkgICYmIGtleU9yS2V5Q29kZShlLCBrZXkpKX1cblxuZnVuY3Rpb24gaXNDdHJsS2V5KGUsIGtleSkgeyByZXR1cm4gcHJldmVudElmVHJ1ZShlLCAhZS5hbHRLZXkgJiYgIWUuc2hpZnRLZXkgJiYgZS5jdHJsS2V5ICYmIGtleU9yS2V5Q29kZShlLCBrZXkpKX1cblxuZnVuY3Rpb24ga2V5T3JLZXlDb2RlKGUsIHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgPyBlLmtleSA9PT0gdmFsIDogZS5rZXlDb2RlID09PSB2YWwgfVxuZnVuY3Rpb24gcHJldmVudElmVHJ1ZShlLCB2YWwpIHtcbiAgICBpZih2YWwpIGUucHJldmVudERlZmF1bHQoKVxuICAgIHJldHVybiB2YWxcbn1cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1ha2VSaWNoVGV4dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYWxsb3dlZFRhZ3M6IFtcbiAgICAgICAgJ2RpdicsXG4gICAgICAgICdpbWcnLFxuICAgICAgICAnYnInXG4gICAgXSxcbiAgICBhbGxvd2VkQXR0cmlidXRlczoge1xuICAgICAgICBpbWc6IFsnc3JjJywgJ2FsdCddXG4gICAgfSxcbiAgICBhbGxvd2VkU2NoZW1lczogWydkYXRhJywgJ2h0dHAnLCAnaHR0cHMnXSxcbiAgICBleGNsdXNpdmVGaWx0ZXI6IGZ1bmN0aW9uKGZyYW1lKSB7IHJldHVybiBmcmFtZS5hdHRyaWJzWydkYXRhLWpzJ10gPT09ICdtYXRoRWRpdG9yJyB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAgICB7Y2hhcmFjdGVyOiAn4omhJywgbGF0ZXhDb21tYW5kOiAnXFxcXGVxdWl2J30sXG4gICAge2NoYXJhY3RlcjogJ+KJoid9LCAvLyBcXG5lcXVpdiBvciBcXG5vdFxcZXF1aXZcbiAgICB7Y2hhcmFjdGVyOiAn4omIJywgbGF0ZXhDb21tYW5kOiAnXFxcXGFwcHJveCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiLwnLCBsYXRleENvbW1hbmQ6ICdcXFxcc2ltJ30sXG4gICAge2NoYXJhY3RlcjogJ+KJoCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxuZXEnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4omkJywgbGF0ZXhDb21tYW5kOiAnXFxcXGxlcSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiaUnLCBsYXRleENvbW1hbmQ6ICdcXFxcZ2VxJ30sXG4gICAge2NoYXJhY3RlcjogJ+KApicsIGxhdGV4Q29tbWFuZDogJ1xcXFxkb3RzJ30sXG4gICAge2NoYXJhY3RlcjogJ8KyJywgbGF0ZXhDb21tYW5kOiAnXjInfSxcbiAgICB7Y2hhcmFjdGVyOiAnwrMnLCBsYXRleENvbW1hbmQ6ICdeMyd9LFxuICAgIHtjaGFyYWN0ZXI6ICfCvScsIGxhdGV4Q29tbWFuZDogJzEvMid9LFxuICAgIHtjaGFyYWN0ZXI6ICfCtycsIGxhdGV4Q29tbWFuZDogJ1xcXFxjZG90J30sXG4gICAge2NoYXJhY3RlcjogJ8KxJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBtJ30sXG5cbiAgICB7Y2hhcmFjdGVyOiAnwrAnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oiYJywgbGF0ZXhDb21tYW5kOiAnXFxcXGNpcmMnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oigJywgbGF0ZXhDb21tYW5kOiAnXFxcXGFuZ2xlJ30sXG4gICAge2NoYXJhY3RlcjogJ+KWsycsIGxhdGV4Q29tbWFuZDogJ1xcXFx0cmlhbmdsZSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiqUnLCBsYXRleENvbW1hbmQ6ICdcXFxccGVycCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfigJYnLCBsYXRleENvbW1hbmQ6ICdcXFxccGFyYWxsZWwnfSxcblxuICAgIHtjaGFyYWN0ZXI6ICfCtScsIGxhdGV4Q29tbWFuZDogJ1xcXFxtdSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiIInLCBsYXRleENvbW1hbmQ6ICdcXFxccGFydGlhbCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiJEnLCBsYXRleENvbW1hbmQ6ICdcXFxcU2lnbWEnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oiPJywgbGF0ZXhDb21tYW5kOiAnXFxcXFBpJ30sXG4gICAge2NoYXJhY3RlcjogJ86pJywgbGF0ZXhDb21tYW5kOiAnXFxcXE9tZWdhJ30sXG4gICAge2NoYXJhY3RlcjogJ86UJywgbGF0ZXhDb21tYW5kOiAnXFxcXERlbHRhJ30sXG4gICAge2NoYXJhY3RlcjogJ/CdnIQnLCBsYXRleENvbW1hbmQ6ICdcXFxcaW90YSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfOkycsIGxhdGV4Q29tbWFuZDogJ1xcXFxHYW1tYSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfOmCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxUaGV0YSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfOpicsIGxhdGV4Q29tbWFuZDogJ1xcXFxQaGknfSxcbiAgICB7Y2hhcmFjdGVyOiAnzrcnLCBsYXRleENvbW1hbmQ6ICdcXFxcZXRhJ30sXG4gICAge2NoYXJhY3RlcjogJ86xJywgbGF0ZXhDb21tYW5kOiAnXFxcXGFscGhhJ30sXG4gICAge2NoYXJhY3RlcjogJ860JywgbGF0ZXhDb21tYW5kOiAnXFxcXGRlbHRhJ30sXG4gICAge2NoYXJhY3RlcjogJ861JywgbGF0ZXhDb21tYW5kOiAnXFxcXHZhcmVwc2lsb24nfSxcbiAgICB7Y2hhcmFjdGVyOiAnz4MnLCBsYXRleENvbW1hbmQ6ICdcXFxcc2lnbWEnfSxcbiAgICB7Y2hhcmFjdGVyOiAnz4QnLCBsYXRleENvbW1hbmQ6ICdcXFxcdGF1J30sXG4gICAge2NoYXJhY3RlcjogJ86pJywgbGF0ZXhDb21tYW5kOiAnXFxcXE9tZWdhJ30sXG4gICAge2NoYXJhY3RlcjogJ8+JJywgbGF0ZXhDb21tYW5kOiAnXFxcXG9tZWdhJ30sXG4gICAge2NoYXJhY3RlcjogJ8+AJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBpJ30sXG4gICAge2NoYXJhY3RlcjogJ9CkJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBoaSd9LFxuXG4gICAge2NoYXJhY3RlcjogJ+KGkScsIGxhdGV4Q29tbWFuZDogJ1xcXFx1cGFycm93J30sXG4gICAge2NoYXJhY3RlcjogJ+KGkicsIGxhdGV4Q29tbWFuZDogJ1xcXFxyaWdodGFycm93J30sXG4gICAge2NoYXJhY3RlcjogJ+KGkycsIGxhdGV4Q29tbWFuZDogJ1xcXFxkb3duYXJyb3cnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oaUJywgbGF0ZXhDb21tYW5kOiAnXFxcXGxlZnRyaWdodGFycm93J30sXG4gICAge2NoYXJhY3RlcjogJ+KHkicsIGxhdGV4Q29tbWFuZDogJ1xcXFxSaWdodGFycm93J30sXG4gICAge2NoYXJhY3RlcjogJ+KHlCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxMZWZ0cmlnaHRhcnJvdyd9LFxuICAgIHtjaGFyYWN0ZXI6ICfih4wnfSwgLy8gXFxyaWdodGxlZnRoYXJwb29uc1xuICAgIHtjaGFyYWN0ZXI6ICfiiJ4nLCBsYXRleENvbW1hbmQ6ICdcXFxcaW5mdHknfSxcblxuICAgIHtjaGFyYWN0ZXI6ICfiiIgnLCBsYXRleENvbW1hbmQ6ICdcXFxcaW4nfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oiJJywgbGF0ZXhDb21tYW5kOiAnXFxcXG5vdGluJ30sXG4gICAge2NoYXJhY3RlcjogJ+KEnSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfihJUnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oSkJ30sXG4gICAge2NoYXJhY3RlcjogJ+KEmid9LFxuICAgIHtjaGFyYWN0ZXI6ICfiioInLCBsYXRleENvbW1hbmQ6ICdcXFxcc3Vic2V0J30sXG4gICAge2NoYXJhY3RlcjogJ+KKhCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxub3RzdWJzZXQnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oipJywgbGF0ZXhDb21tYW5kOiAnXFxcXGNhcCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiKonLCBsYXRleENvbW1hbmQ6ICdcXFxcY3VwJ30sXG4gICAge2NoYXJhY3RlcjogJ+KIhScsIGxhdGV4Q29tbWFuZDogJ1xcXFxlbXB0eSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiJYnLCBsYXRleENvbW1hbmQ6ICdcXFxcc2V0bWludXMnfSxcblxuICAgIHtjaGFyYWN0ZXI6ICfijJAnfSwgLy8gXFxiYWNrbmVnXG4gICAge2NoYXJhY3RlcjogJ+KIpycsIGxhdGV4Q29tbWFuZDogJ1xcXFxhbmQnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oioJywgbGF0ZXhDb21tYW5kOiAnXFxcXG9yJ30sXG4gICAge2NoYXJhY3RlcjogJ+KIgCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxmb3JhbGwnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oiDJywgbGF0ZXhDb21tYW5kOiAnXFxcXGV4aXN0cyd9XG5dXG4iLCJjb25zdCBzcGVjaWFsQ2hhcmFjdGVycyA9IHJlcXVpcmUoJy4vc3BlY2lhbENoYXJhY3RlcnMnKVxuY29uc3QgbGF0ZXhDb21tYW5kcyA9IHJlcXVpcmUoJy4vbGF0ZXhDb21tYW5kcycpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGluaXQsXG59XG5cbmZ1bmN0aW9uIGluaXQobWF0aEVkaXRvciwgaGFzQW5zd2VyRm9jdXMsIGwpIHtcbiAgICBjb25zdCAkdG9vbGJhciA9ICQoYCAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtYXRoLWVkaXRvci10b29sc1wiIGRhdGEtanM9XCJ0b29sc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1hdGgtZWRpdG9yLWNoYXJhY3RlcnNcIiBkYXRhLWpzPVwiY2hhcmFjdGVyc1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0aC1lZGl0b3Itc3BlY2lhbC1jaGFyYWN0ZXJzXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWF0aC1lZGl0b3ItdG9vbGJhciBtYXRoLWVkaXRvci1saXN0XCIgZGF0YS1qcz1cImNoYXJhY3RlcnNMaXN0XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWF0aC1lZGl0b3ItZXF1YXRpb24gbWF0aC1lZGl0b3ItdG9vbGJhciBtYXRoLWVkaXRvci1saXN0IG1hdGgtZWRpdG9yLWhpZGRlblwiIGRhdGEtanM9XCJtYXRoVG9vbGJhclwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwibWF0aC1lZGl0b3ItbmV3LWVxdWF0aW9uIG1hdGgtZWRpdG9yLWJ1dHRvbiBtYXRoLWVkaXRvci1idXR0b24tYWN0aW9uXCIgZGF0YS1qcz1cIm5ld0VxdWF0aW9uXCIgdGl0bGU9XCJDdHJsLUxcIj4ke2wuaW5zZXJ0RXF1YXRpb259PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIGApXG4gICAgY29uc3QgJG5ld0VxdWF0aW9uID0gJHRvb2xiYXIuZmluZCgnW2RhdGEtanM9XCJuZXdFcXVhdGlvblwiXScpXG4gICAgY29uc3QgJG1hdGhUb29sYmFyID0gJHRvb2xiYXIuZmluZCgnW2RhdGEtanM9XCJtYXRoVG9vbGJhclwiXScpXG4gICAgaW5pdFNwZWNpYWxDaGFyYWN0ZXJUb29sYmFyKCR0b29sYmFyLCBtYXRoRWRpdG9yLCBoYXNBbnN3ZXJGb2N1cylcbiAgICBpbml0TWF0aFRvb2xiYXIoJG1hdGhUb29sYmFyLCBtYXRoRWRpdG9yKVxuICAgIGluaXROZXdFcXVhdGlvbigkbmV3RXF1YXRpb24sIG1hdGhFZGl0b3IsIGhhc0Fuc3dlckZvY3VzKVxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlTWF0aFRvb2xiYXIoaXNWaXNpYmxlKSB7XG4gICAgICAgICRuZXdFcXVhdGlvbi50b2dnbGUoIWlzVmlzaWJsZSlcbiAgICAgICAgJG1hdGhUb29sYmFyLnRvZ2dsZShpc1Zpc2libGUpXG4gICAgfVxuXG4gICAgcmV0dXJuIHsgJHRvb2xiYXIsIHRvZ2dsZU1hdGhUb29sYmFyIH1cbn1cblxuZnVuY3Rpb24gaW5pdFNwZWNpYWxDaGFyYWN0ZXJUb29sYmFyKCR0b29sYmFyLCBtYXRoRWRpdG9yLCBoYXNBbnN3ZXJGb2N1cykge1xuICAgICR0b29sYmFyLmZpbmQoJ1tkYXRhLWpzPVwiY2hhcmFjdGVyc0xpc3RcIl0nKVxuICAgICAgICAuYXBwZW5kKHNwZWNpYWxDaGFyYWN0ZXJzLm1hcChjaGFyID0+IGA8YnV0dG9uIGNsYXNzPVwibWF0aC1lZGl0b3ItYnV0dG9uIG1hdGgtZWRpdG9yLWJ1dHRvbi1ncmlkXCIgJHtjaGFyLmxhdGV4Q29tbWFuZCA/IGBkYXRhLWNvbW1hbmQ9XCIke2NoYXIubGF0ZXhDb21tYW5kfVwiYCA6ICcnfT4ke2NoYXIuY2hhcmFjdGVyfTwvYnV0dG9uPmApKVxuICAgICAgICAub24oJ21vdXNlZG93bicsICdidXR0b24nLCBlID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgY29uc3QgY2hhcmFjdGVyID0gZS5jdXJyZW50VGFyZ2V0LmlubmVyVGV4dFxuICAgICAgICAgICAgY29uc3QgY29tbWFuZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmNvbW1hbmRcbiAgICAgICAgICAgIGlmIChoYXNBbnN3ZXJGb2N1cygpKSB3aW5kb3cuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydFRleHQnLCBmYWxzZSwgY2hhcmFjdGVyKVxuICAgICAgICAgICAgZWxzZSBtYXRoRWRpdG9yLmluc2VydE1hdGgoY29tbWFuZCB8fCBjaGFyYWN0ZXIpXG4gICAgICAgIH0pXG59XG5cbmZ1bmN0aW9uIGluaXRNYXRoVG9vbGJhcigkbWF0aFRvb2xiYXIsIG1hdGhFZGl0b3IpIHtcbiAgICAkbWF0aFRvb2xiYXIuYXBwZW5kKGxhdGV4Q29tbWFuZHNcbiAgICAgICAgLm1hcChvID0+IGA8YnV0dG9uIHRpdGxlPVwiJHtvLmFjdGlvbn1cIiBjbGFzcz1cIm1hdGgtZWRpdG9yLWJ1dHRvbiBtYXRoLWVkaXRvci1idXR0b24tZ3JpZFwiIGRhdGEtY29tbWFuZD1cIiR7by5hY3Rpb259XCIgZGF0YS1sYXRleGNvbW1hbmQ9XCIke28ubGFiZWx9XCIgZGF0YS11c2V3cml0ZT1cIiR7by51c2VXcml0ZSB8fCBmYWxzZX1cIj5cbjxpbWcgc3JjPVwiL21hdGguc3ZnP2xhdGV4PSR7ZW5jb2RlVVJJQ29tcG9uZW50KG8ubGFiZWwgPyBvLmxhYmVsLnJlcGxhY2UoL1gvZywgJ1xcXFxzcXVhcmUnKSA6IG8uYWN0aW9uKX1cIi8+XG48L2J1dHRvbj5gKS5qb2luKCcnKVxuICAgICkub24oJ21vdXNlZG93bicsICdidXR0b24nLCBlID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGNvbnN0IGRhdGFzZXQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcbiAgICAgICAgbWF0aEVkaXRvci5pbnNlcnRNYXRoKGRhdGFzZXQuY29tbWFuZCwgZGF0YXNldC5sYXRleGNvbW1hbmQsIGRhdGFzZXQudXNld3JpdGUgPT09ICd0cnVlJylcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBpbml0TmV3RXF1YXRpb24oJG5ld0VxdWF0aW9uLCBtYXRoRWRpdG9yLCBoYXNBbnN3ZXJGb2N1cykge1xuICAgICRuZXdFcXVhdGlvbi5tb3VzZWRvd24oKGUgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgaWYgKCFoYXNBbnN3ZXJGb2N1cygpKSByZXR1cm4gLy8gVE9ETzogcmVtb3ZlIHdoZW4gYnV0dG9uIGlzIG9ubHkgdmlzaWJsZSB3aGVuIHRleHRhcmVhIGhhcyBmb2N1c1xuICAgICAgICBtYXRoRWRpdG9yLmluc2VydE5ld0VxdWF0aW9uKClcbiAgICB9KS5iaW5kKHRoaXMpKVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7aW5zZXJ0VG9UZXh0QXJlYUF0Q3Vyc29yfVxuXG5mdW5jdGlvbiBpbnNlcnRUb1RleHRBcmVhQXRDdXJzb3IoZmllbGQsIHZhbHVlKSB7XG4gICAgY29uc3Qgc3RhcnRQb3MgPSBmaWVsZC5zZWxlY3Rpb25TdGFydFxuICAgIGNvbnN0IGVuZFBvcyA9IGZpZWxkLnNlbGVjdGlvbkVuZFxuICAgIGxldCBvbGRWYWx1ZSA9IGZpZWxkLnZhbHVlXG4gICAgZmllbGQudmFsdWUgPSBvbGRWYWx1ZS5zdWJzdHJpbmcoMCwgc3RhcnRQb3MpICsgdmFsdWUgKyBvbGRWYWx1ZS5zdWJzdHJpbmcoZW5kUG9zLCBvbGRWYWx1ZS5sZW5ndGgpXG4gICAgZmllbGQuc2VsZWN0aW9uU3RhcnQgPSBmaWVsZC5zZWxlY3Rpb25FbmQgPSBzdGFydFBvcyArIHZhbHVlLmxlbmd0aFxufVxuIl19
