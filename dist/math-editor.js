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
    var loadingGif = "data:image/gif;base64,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EAY7Cg04Uk48LAsDhRA8MVQPEF0GAgqYYwSRlycNcWskCkApIyEAOwAAAAAAAAAAADxiciAvPgo8Yj5XYXJuaW5nPC9iPjogIG15c3FsX3F1ZXJ5KCkgWzxhIGhyZWY9J2Z1bmN0aW9uLm15c3FsLXF1ZXJ5Jz5mdW5jdGlvbi5teXNxbC1xdWVyeTwvYT5dOiBDYW4ndCBjb25uZWN0IHRvIGxvY2FsIE15U1FMIHNlcnZlciB0aHJvdWdoIHNvY2tldCAnL3Zhci9ydW4vbXlzcWxkL215c3FsZC5zb2NrJyAoMikgaW4gPGI+L2hvbWUvYWpheGxvYWQvd3d3L2xpYnJhaXJpZXMvY2xhc3MubXlzcWwucGhwPC9iPiBvbiBsaW5lIDxiPjY4PC9iPjxiciAvPgo8YnIgLz4KPGI+V2FybmluZzwvYj46ICBteXNxbF9xdWVyeSgpIFs8YSBocmVmPSdmdW5jdGlvbi5teXNxbC1xdWVyeSc+ZnVuY3Rpb24ubXlzcWwtcXVlcnk8L2E+XTogQSBsaW5rIHRvIHRoZSBzZXJ2ZXIgY291bGQgbm90IGJlIGVzdGFibGlzaGVkIGluIDxiPi9ob21lL2FqYXhsb2FkL3d3dy9saWJyYWlyaWVzL2NsYXNzLm15c3FsLnBocDwvYj4gb24gbGluZSA8Yj42ODwvYj48YnIgLz4KPGJyIC8+CjxiPldhcm5pbmc8L2I+OiAgbXlzcWxfcXVlcnkoKSBbPGEgaHJlZj0nZnVuY3Rpb24ubXlzcWwtcXVlcnknPmZ1bmN0aW9uLm15c3FsLXF1ZXJ5PC9hPl06IENhbid0IGNvbm5lY3QgdG8gbG9jYWwgTXlTUUwgc2VydmVyIHRocm91Z2ggc29ja2V0ICcvdmFyL3J1bi9teXNxbGQvbXlzcWxkLnNvY2snICgyKSBpbiA8Yj4vaG9tZS9hamF4bG9hZC93d3cvbGlicmFpcmllcy9jbGFzcy5teXNxbC5waHA8L2I+IG9uIGxpbmUgPGI+Njg8L2I+PGJyIC8+CjxiciAvPgo8Yj5XYXJuaW5nPC9iPjogIG15c3FsX3F1ZXJ5KCkgWzxhIGhyZWY9J2Z1bmN0aW9uLm15c3FsLXF1ZXJ5Jz5mdW5jdGlvbi5teXNxbC1xdWVyeTwvYT5dOiBBIGxpbmsgdG8gdGhlIHNlcnZlciBjb3VsZCBub3QgYmUgZXN0YWJsaXNoZWQgaW4gPGI+L2hvbWUvYWpheGxvYWQvd3d3L2xpYnJhaXJpZXMvY2xhc3MubXlzcWwucGhwPC9iPiBvbiBsaW5lIDxiPjY4PC9iPjxiciAvPgo8YnIgLz4KPGI+V2FybmluZzwvYj46ICBteXNxbF9xdWVyeSgpIFs8YSBocmVmPSdmdW5jdGlvbi5teXNxbC1xdWVyeSc+ZnVuY3Rpb24ubXlzcWwtcXVlcnk8L2E+XTogQ2FuJ3QgY29ubmVjdCB0byBsb2NhbCBNeVNRTCBzZXJ2ZXIgdGhyb3VnaCBzb2NrZXQgJy92YXIvcnVuL215c3FsZC9teXNxbGQuc29jaycgKDIpIGluIDxiPi9ob21lL2FqYXhsb2FkL3d3dy9saWJyYWlyaWVzL2NsYXNzLm15c3FsLnBocDwvYj4gb24gbGluZSA8Yj42ODwvYj48YnIgLz4KPGJyIC8+CjxiPldhcm5pbmc8L2I+OiAgbXlzcWxfcXVlcnkoKSBbPGEgaHJlZj0nZnVuY3Rpb24ubXlzcWwtcXVlcnknPmZ1bmN0aW9uLm15c3FsLXF1ZXJ5PC9hPl06IEEgbGluayB0byB0aGUgc2VydmVyIGNvdWxkIG5vdCBiZSBlc3RhYmxpc2hlZCBpbiA8Yj4vaG9tZS9hamF4bG9hZC93d3cvbGlicmFpcmllcy9jbGFzcy5teXNxbC5waHA8L2I+IG9uIGxpbmUgPGI+Njg8L2I+PGJyIC8+Cg==";
    return $editor.find('img[src^="data"]').each(function (i, el) {
        return el.setAttribute('id', new Date().getTime() + '-' + i);
    }).map(function (i, el) {
        var ret = Object.assign(decodeBase64Image(el.getAttribute('src')), { id: el.getAttribute('id') });
        el.setAttribute('src', loadingGif);
        return ret;
    }).toArray().filter(function (_ref) {
        var type = _ref.type;
        return type === 'image/png';
    });
};

var persistInlineImages = function persistInlineImages($editor, screenshotSaver) {
    var saveStream = Bacon.combineAsArray(markAndGetInlineImages($editor).map(function (data) {
        return Bacon.fromPromise(screenshotSaver(data).then(function (screenshotUrl) {
            return $editor.find('#' + data.id).attr('src', screenshotUrl).removeAttr('id');
        }).fail(function (e) {
            return $editor.find('#' + data.id).remove();
        }));
    }));
    saveStream.onValue(function () {
        return $editor.trigger('input');
    });
    saveStream.onError(function (e) {}); // TODO: Call error callback here
};

var makeRichText = function makeRichText(element, options) {
    var onValueChanged = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
    var saver = options.screenshot.saver;

    var $answer = $(element);

    var pasteInProgress = false;

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
        if (!pasteInProgress) onValueChanged(sanitizeContent(e.currentTarget));
    }).on('paste', function (e) {
        pasteInProgress = true;
        setTimeout(function () {
            return pasteInProgress = false;
        }, 0);

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
{ character: '≈', latexCommand: '\\approx', popular: true }, { character: '∼', latexCommand: '\\sim' }, { character: '≠', latexCommand: '\\neq', popular: true }, { character: '≤', latexCommand: '\\leq', popular: true }, { character: '≥', latexCommand: '\\geq', popular: true }, { character: '…', latexCommand: '\\dots' }, { character: '²', latexCommand: '^2', popular: true }, { character: '³', latexCommand: '^3', popular: true }, { character: '½', latexCommand: '1/2', popular: true }, { character: '⅓', latexCommand: '1/3', popular: true }, { character: '·', latexCommand: '\\cdot', popular: true }, { character: '±', latexCommand: '\\pm' }, { character: '°', popular: true }, { character: '∘', latexCommand: '\\circ' }, { character: '∠', latexCommand: '\\angle' }, { character: '⊥', latexCommand: '\\perp' }, { character: '‖', latexCommand: '\\parallel' }, { character: '⇅' }, { character: 'µ', latexCommand: '\\mu' }, { character: '∂', latexCommand: '\\partial' }, { character: '∑', latexCommand: '\\Sigma' }, { character: '∏', latexCommand: '\\Pi' }, { character: 'Ω', latexCommand: '\\Omega' }, { character: 'Δ', latexCommand: '\\Delta' }, { character: '𝜄', latexCommand: '\\iota' }, { character: 'Γ', latexCommand: '\\Gamma' }, { character: 'Θ', latexCommand: '\\Theta' }, { character: 'Φ', latexCommand: '\\Phi' }, { character: 'η', latexCommand: '\\eta' }, { character: 'α', latexCommand: '\\alpha' }, { character: 'δ', latexCommand: '\\delta' }, { character: 'ε', latexCommand: '\\varepsilon' }, { character: 'σ', latexCommand: '\\sigma' }, { character: 'τ', latexCommand: '\\tau' }, { character: 'Ω', latexCommand: '\\Omega' }, { character: 'ω', latexCommand: '\\omega' }, { character: 'π', latexCommand: '\\pi', popular: true }, { character: 'Ф', latexCommand: '\\phi' }, { character: '↑', latexCommand: '\\uparrow' }, { character: '→', latexCommand: '\\rightarrow' }, { character: '↓', latexCommand: '\\downarrow' }, { character: '↔', latexCommand: '\\leftrightarrow' }, { character: '⇒', latexCommand: '\\Rightarrow', popular: true }, { character: '⇔', latexCommand: '\\Leftrightarrow', popular: true }, { character: '⇌' }, // \rightleftharpoons
{ character: '∞', latexCommand: '\\infty', popular: true }, { character: '∈', latexCommand: '\\in' }, { character: '∉', latexCommand: '\\notin' }, { character: 'ℝ' }, { character: 'ℕ' }, { character: 'ℤ' }, { character: 'ℚ' }, { character: '⊂', latexCommand: '\\subset' }, { character: '⊄', latexCommand: '\\notsubset' }, { character: '∩', latexCommand: '\\cap' }, { character: '∪', latexCommand: '\\cup' }, { character: '∅', latexCommand: '\\empty' }, { character: '∖', latexCommand: '\\setminus' }, { character: '¬' }, { character: '∧', latexCommand: '\\and' }, { character: '∨', latexCommand: '\\or' }, { character: '∀', latexCommand: '\\forall' }, { character: '∃', latexCommand: '\\exists' }];

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
        return '<button class="math-editor-button math-editor-button-grid' + (char.popular ? ' math-popular' : '') + '" ' + (char.latexCommand ? 'data-command="' + char.latexCommand + '"' : '') + '>' + char.character + '</button>';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvRkkuanMiLCJhcHAvU1YuanMiLCJhcHAvbGF0ZXhDb21tYW5kcy5qcyIsImFwcC9tYXRoLWVkaXRvci5qcyIsImFwcC9zYW5pdGl6ZU9wdHMuanMiLCJhcHAvc3BlY2lhbENoYXJhY3RlcnMuanMiLCJhcHAvdG9vbGJhcnMuanMiLCJhcHAvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsWUFBUTtBQUNKLG9CQUFZLGdCQURSO0FBRUosZUFBTyx5Q0FGSDtBQUdKLGtoQkFISTtBQVdKLHFEQVhJO0FBWUosNGRBWkk7QUF1Qkosb0JBQVksVUF2QlI7QUF3QkosMkJBQW1CLGVBeEJmO0FBeUJKLHdCQUFnQixhQXpCWjtBQTBCSixlQUFPLE9BMUJIO0FBMkJKLGNBQU0sVUEzQkY7QUE0QkosaUJBQVMsWUE1Qkw7QUE2Qkosc0JBQWMsbUJBN0JWO0FBOEJKLGtCQUFVLEtBOUJOO0FBK0JKLG1CQUFXLFlBL0JQO0FBZ0NKLHFCQUFhO0FBaENULEtBREs7QUFtQ2IsZ0JBQVk7QUFDUixzQkFBYyxtQkFETjtBQUVSLGlCQUFTLFlBRkQ7QUFHUixvQkFBWSxnQkFISjtBQUlSLGVBQU8sV0FKQztBQUtSLGtCQUFVLEdBTEY7QUFNUix1QkFBZSxzQkFOUDtBQU9SLGNBQU0sb0JBUEU7QUFRUixrQkFBVSxlQVJGO0FBU1IsbUJBQVc7QUFUSDtBQW5DQyxDQUFqQjs7Ozs7QUNBQSxPQUFPLE9BQVAsR0FBaUI7QUFDYixZQUFRO0FBQ0osb0JBQVksaUJBRFI7QUFFSixlQUFPLDBDQUZIO0FBR0osNmhCQUhJO0FBUUosd0RBUkk7QUFTSixvWUFUSTtBQWtCSixvQkFBWSxhQWxCUjtBQW1CSiwyQkFBbUIsZUFuQmY7QUFvQkosd0JBQWdCLGtCQXBCWjtBQXFCSixlQUFPLE9BckJIO0FBc0JKLGNBQU0sT0F0QkY7QUF1QkosaUJB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QUF1QjtBQUFFLFdBQU8sY0FBYyxDQUFkLEVBQWlCLENBQUMsRUFBRSxNQUFILElBQWEsQ0FBQyxFQUFFLFFBQWhCLElBQTRCLENBQUMsRUFBRSxPQUEvQixJQUEyQyxhQUFhLENBQWIsRUFBZ0IsR0FBaEIsQ0FBNUQsQ0FBUDtBQUF5Rjs7QUFFbEgsU0FBUyxTQUFULENBQW1CLENBQW5CLEVBQXNCLEdBQXRCLEVBQTJCO0FBQUUsV0FBTyxjQUFjLENBQWQsRUFBaUIsQ0FBQyxFQUFFLE1BQUgsSUFBYSxDQUFDLEVBQUUsUUFBaEIsSUFBNEIsRUFBRSxPQUE5QixJQUF5QyxhQUFhLENBQWIsRUFBZ0IsR0FBaEIsQ0FBMUQsQ0FBUDtBQUF1Rjs7QUFFcEgsU0FBUyxZQUFULENBQXNCLENBQXRCLEVBQXlCLEdBQXpCLEVBQThCO0FBQUUsV0FBTyxPQUFPLEdBQVAsS0FBZSxRQUFmLEdBQTBCLEVBQUUsR0FBRixLQUFVLEdBQXBDLEdBQTBDLEVBQUUsT0FBRixLQUFjLEdBQS9EO0FBQW9FO0FBQ3BHLFNBQVMsYUFBVCxDQUF1QixDQUF2QixFQUEwQixHQUExQixFQUErQjtBQUMzQixRQUFHLEdBQUgsRUFBUSxFQUFFLGNBQUY7QUFDUixXQUFPLEdBQVA7QUFDSDs7QUFFRCxTQUFTLGVBQVQsQ0FBeUIsYUFBekIsRUFBd0M7QUFDcEMsUUFBTSxpQkFBaUIsRUFBRSxhQUFGLENBQXZCO0FBQ0EsUUFBTSxjQUFjLGVBQWUsSUFBZixDQUFvQix3QkFBcEIsQ0FBcEI7QUFDQSxnQkFBWSxJQUFaO0FBQ0EsUUFBTSxPQUFPLGVBQWUsSUFBZixFQUFiO0FBQ0EsZ0JBQVksSUFBWjs7QUFFQSxRQUFNLE9BQU8sU0FBUyxlQUFlLElBQWYsRUFBVCxDQUFiOztBQUVBLFdBQU8sRUFBRSxZQUFZLElBQWQsRUFBb0IsWUFBWSxJQUFoQyxFQUFQO0FBQ0giLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZWRpdG9yOiB7XG4gICAgICAgIG1hdGhFZGl0b3I6ICdNYXRpa2thZWRpdG9yaScsXG4gICAgICAgIHRpdGxlOiAnS2FhdmFlZGl0b3JpbiBlbnNpbW3DpGluZW4ga2VoaXR5c3ZlcnNpbycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBgPHVsPlxuPGxpPkVkaXRvcmkgdG9pbWlpIHBhcmhhaXRlbiBGaXJlZm94LXNlbGFpbWVsbGEuPC9saT5cbjxsaT7igJxMaXPDpMOkIGthYXZh4oCdIC1uYXBpbiBhbHRhIGzDtnlkw6R0IHlsZWlzaW1wacOkIG1hdGVtYXRpaWthc3NhLCBmeXNpaWthc3NhIGphXG5rZW1pYXNzYSBrw6R5dGV0dMOkdmnDpCBtZXJraW50w7Zqw6QuIExpc8Oka3NpIGVyaWtvaXNtZXJra2Vqw6Qgdm9pIGvDpHl0dMOkw6Qga2FhdmFuIGtpcmpvaXR0YW1pc2Vlbi48L2xpPlxuIDxsaT5LYWF2b2phIHZvaSByYWtlbnRhYVxua2xpa2thYW1hbGxhIHZhbGlrb24gbWVya2ludMO2asOkIGphL3RhaSBraXJqb2l0dGFtYWxsYSBMYVRlWGlhLjwvbGk+XG4gPGxpPkVkaXRvcmluIHZhc3RhdXNrZW50dMOkw6RuIHZvaSBraXJqb2l0dGFhIHRla3N0acOkIGphIGthYXZvamEgc2Vrw6Rcbmxpc8OkdMOkIGt1dmlhLjwvbGk+PC91bD5gLFxuICAgICAgICBzaG9ydGN1dFRpdGxlOiBgUGlrYW7DpHBww6RpbnZpbmtrZWrDpGAsXG4gICAgICAgIHNob3J0Y3V0czogYDx0YWJsZT48dGJvZHk+XG48dHI+PHRoPkxpaXTDpCBrdXZhIGxlaWtlcMO2eWTDpGx0w6Q8L3RoPjx0ZD5DdHJsLVY8L3RkPjwvdHI+XG48dHI+PHRoPktpcmpvaXRhIGthYXZhPC90aD48dGQ+Q3RybC1MIHRhaSBDdHJsLUk8L3RkPjwvdHI+XG48dHI+PHRoIGNvbHNwYW49XCIyXCI+S2FhdmFzc2E8L3RoPjwvdHI+XG48dHI+PHRoPkpha292aWl2YTwvdGg+PHRkPi88L3RkPjwvdHI+XG48dHI+PHRoPktlcnRvbWVya2tpPC90aD48dGQ+KjwvdGQ+PC90cj5cbjx0cj48dGg+RWtzcG9uZW50dGk8L3RoPjx0ZD5ePC90ZD48L3RyPlxuPHRyPjx0aD5TdWxqZSBrYWF2YTwvdGg+PHRkPkN0cmwtRW50ZXIgdGFpIEVzYzwvdGQ+PC90cj5cbjx0cj48dGg+TGlzw6TDpCBrYWF2YSBzZXVyYWF2YWxsZSByaXZpbGxlPC90aD48dGQ+RW50ZXI8L3RkPjwvdHI+XG48L3Rib2R5PlxuPC90YWJsZT5gLFxuICAgICAgICBmb3JtYXR0aW5nOiAnTXVvdG9pbHUnLFxuICAgICAgICBzcGVjaWFsQ2hhcmFjdGVyczogJ0VyaWtvaXNtZXJraXQnLFxuICAgICAgICBpbnNlcnRFcXVhdGlvbjogJ0xpc8Okw6Qga2FhdmEnLFxuICAgICAgICBjbG9zZTogJ3N1bGplJyxcbiAgICAgICAgc2F2ZTogJ1RhbGxlbm5hJyxcbiAgICAgICAgdXBkYXRlZDogJ1DDpGl2aXRldHR5JyxcbiAgICAgICAgc2VuZEZlZWRiYWNrOiAnTMOkaGV0w6QgcGFsYXV0ZXR0YScsXG4gICAgICAgIGxhbmdMaW5rOiAnL3N2JyxcbiAgICAgICAgbGFuZ0xhYmVsOiAnUMOlIHN2ZW5za2EnLFxuICAgICAgICBhbnN3ZXJUaXRsZTogJ1Zhc3RhdXMnXG4gICAgfSxcbiAgICBhbm5vdGF0aW5nOiB7XG4gICAgICAgIHNlbmRGZWVkYmFjazogJ0zDpGhldMOkIHBhbGF1dGV0dGEnLFxuICAgICAgICB1cGRhdGVkOiAnUMOkaXZpdGV0dHknLFxuICAgICAgICBtYXRoRWRpdG9yOiAnTWF0aWtrYWVkaXRvcmknLFxuICAgICAgICB0aXRsZTogJ0Fydm9zdGVsdScsXG4gICAgICAgIGJhY2tMaW5rOiAnLycsXG4gICAgICAgIGJhY2tMaW5rTGFiZWw6ICdQYWxhYSBrYWF2YWVkaXRvcmlpbicsXG4gICAgICAgIHNhdmU6ICdUYWxsZW5uYSBtZXJraW5uw6R0JyxcbiAgICAgICAgbGFuZ0xpbms6ICcvc3YvYmVkb21uaW5nJyxcbiAgICAgICAgbGFuZ0xhYmVsOiAnUMOlIHN2ZW5za2EnXG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZWRpdG9yOiB7XG4gICAgICAgIG1hdGhFZGl0b3I6ICdNYXRlbWF0aWtlZGl0b3InLFxuICAgICAgICB0aXRsZTogJ0Zvcm1lbGVkaXRvcm5zIGbDtnJzdGEgdXR2ZWNrbGluZ3N2ZXJzaW9uJyxcbiAgICAgICAgZGVzY3JpcHRpb246IGA8dWw+XG48bGk+RWRpdG9ybiBmdW5nZXJhciBiw6RzdCBtZWQgYnJvd3Nlcm4gRmlyZWZveC48L2xpPlxuIDxsaT5VbmRlciBrbmFwcGVuIOKAnEzDpGdnIHRpbGwgZm9ybWVs4oCdIGhpdHRhciBkdSBkZSB2YW5saWdhc3RlIGJldGVja25pbmdhcm5hIHNvbSBhbnbDpG5kcyBpIG1hdGVtYXRpaywgZnlzaWsgb2NoIGtlbWkuIERlc3N1dG9tIGthbiBkdSBhbnbDpG5kYSBzcGVjaWFsdGVja2VuIGbDtnIgYXR0IHNrcml2YSBmb3JtbGVyLjwvbGk+XG48bGk+RGV0IGfDpXIgYXR0IGtvbnN0cnVlcmEgZm9ybWxlciBnZW5vbSBhdHQga2xpY2thIHDDpSBiZXRlY2tuaW5nYXJuYSBpIG1lbnllcm5hIG9jaC9lbGxlciBnZW5vbSBhdHQgc2tyaXZhIExhVGVYLjwvbGk+XG48bGk+RGV0IGfDpXIgZsO2cnV0b20gYXR0IHNrcml2YSB0ZXh0IG9jaCBmb3JtbGVyLCBhdHQgb2Nrc8OlIGF0dCBsw6RnZ2EgdGlsbCBiaWxkZXIgaSBzdmFyc2bDpGx0ZXQuPC9saT48L3VsPmAsXG4gICAgICAgIHNob3J0Y3V0VGl0bGU6IGBUaXBzIHDDpSB0YW5nZW50a29tYmluYXRpb25lcmAsXG4gICAgICAgIHNob3J0Y3V0czogYDx0YWJsZT48dGJvZHk+XG48dHI+PHRoPkzDpGdnIHRpbGwgZW4gYmlsZCBmcsOlbiB1cmtsaXBwZXQ8L3RoPjx0ZD5DdHJsLVY8L3RkPjwvdHI+XG48dHI+PHRoPlNrcml2IGVuIGZvcm1lbDwvdGg+PHRkPkN0cmwtTCAvIEN0cmwtSTwvdGQ+PC90cj5cbjx0cj48dGggY29sc3Bhbj1cIjJcIj5JIGZvcm1lbG4gPC90aD48L3RyPlxuPHRyPjx0aD5CcsOla3N0cmVjazwvdGg+PHRkPi88L3RkPjwvdHI+XG48dHI+PHRoPk11bHRpcGxpa2F0aW9uc3RlY2tlbjwvdGg+PHRkPio8L3RkPjwvdHI+XG48dHI+PHRoPlN0w6RuZyBmb3JtZWxuPC90aD48dGQ+Q3RybC1FbnRlciBlbGxlciBFc2M8L3RkPjwvdHI+XG48L3Rib2R5PlxuPC90YWJsZT5gLFxuICAgICAgICBmb3JtYXR0aW5nOiAnRm9ybWF0ZXJpbmcnLFxuICAgICAgICBzcGVjaWFsQ2hhcmFjdGVyczogJ1NwZWNpYWx0ZWNrZW4nLFxuICAgICAgICBpbnNlcnRFcXVhdGlvbjogJ0zDpGdnIHRpbGwgZm9ybWVsJyxcbiAgICAgICAgY2xvc2U6ICdzdMOkbmcnLFxuICAgICAgICBzYXZlOiAnU3BhcmEnLFxuICAgICAgICB1cGRhdGVkOiAnVXBwZGF0ZXJhZCcsXG4gICAgICAgIHNlbmRGZWVkYmFjazogJ1NraWNrYSBmZWVkYmFjaycsXG4gICAgICAgIGxhbmdMaW5rOiAnLycsXG4gICAgICAgIGxhbmdMYWJlbDogJ1N1b21la3NpJyxcbiAgICAgICAgYW5zd2VyVGl0bGU6ICdTdmFyJ1xuICAgIH0sXG4gICAgYW5ub3RhdGluZzoge1xuICAgICAgICBzZW5kRmVlZGJhY2s6ICdTa2lja2EgcmVzcG9ucycsXG4gICAgICAgIHVwZGF0ZWQ6ICdVcHBkYXRlcmFkJyxcbiAgICAgICAgbWF0aEVkaXRvcjogJ01hdGVtYXRpa2VkaXRvcicsXG4gICAgICAgIHRpdGxlOiAnQmVkw7ZtbmluZycsXG4gICAgICAgIGJhY2tMaW5rOiAnL3N2JyxcbiAgICAgICAgYmFja0xpbmtMYWJlbDogJ01hdGVtYXRpa2VkaXRvcicsXG4gICAgICAgIHNhdmU6ICdTcGFyYSBhbnRlY2tuaW5nYXInLFxuICAgICAgICBsYW5nTGluazogJy90YXJraXN0dXMnLFxuICAgICAgICBsYW5nTGFiZWw6ICdTdW9tZWtzaSdcbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAgICB7YWN0aW9uOiAnXFxcXHNxcnQnLCBsYWJlbDogJ1xcXFxzcXJ0e1h9J30sXG4gICAge2FjdGlvbjogJ14nLCBsYWJlbDogJ3hee1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxmcmFjJywgbGFiZWw6ICdcXFxcZnJhY3tYfXtYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcaW50JywgbGFiZWw6ICdcXFxcaW50X3tYfV57WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGxpbV8nLCBsYWJlbDogJ1xcXFxsaW1fe1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxsaW1fe3hcXFxccmlnaHRhcnJvd1xcXFxpbmZ0eX0nLCBsYWJlbDogJ1xcXFxsaW1fe3hcXFxccmlnaHRhcnJvd1xcXFxpbmZ0eX0nLCB1c2VXcml0ZTp0cnVlfSxcbiAgICB7YWN0aW9uOiAnXFxcXG92ZXJyaWdodGFycm93JywgbGFiZWw6ICdcXFxcb3ZlcnJpZ2h0YXJyb3d7WH0nfSxcbiAgICB7YWN0aW9uOiAnXycsIGxhYmVsOiAneF9YJ30sXG4gICAge2FjdGlvbjogJ1xcXFxudGhyb290JywgbGFiZWw6ICdcXFxcc3FydFtYXXtYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcc3VtJywgbGFiZWw6ICdcXFxcc3VtX3tYfV57WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGJpbm9tJywgbGFiZWw6ICdcXFxcYmlub217WH17WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXHNpbid9LFxuICAgIHthY3Rpb246ICdcXFxcY29zJ30sXG4gICAge2FjdGlvbjogJ1xcXFx0YW4nfSxcbiAgICB7YWN0aW9uOiAnXFxcXHZlYycsIGxhYmVsOiAnXFxcXHZlY3tYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcYmFyJywgbGFiZWw6ICdcXFxcYmFye1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxvdmVybGluZXtcXFxcdGV4dHtpfX0nLCB1c2VXcml0ZTogdHJ1ZX0sXG4gICAge2FjdGlvbjogJ1xcXFxvdmVybGluZXtcXFxcdGV4dHtqfX0nLCB1c2VXcml0ZTogdHJ1ZX0sXG4gICAge2FjdGlvbjogJ1xcXFxvdmVybGluZXtcXFxcdGV4dHtrfX0nLCB1c2VXcml0ZTogdHJ1ZX0sXG4gICAge2FjdGlvbjogJ1xcXFxvdmVybGVmdGFycm93JywgbGFiZWw6ICdcXFxcb3ZlcmxlZnRhcnJvd3tYfSd9LFxuICAgIHthY3Rpb246ICd8JywgbGFiZWw6ICd8WHwnfSxcbiAgICB7YWN0aW9uOiAnKCcsIGxhYmVsOiAnKFgpJ30sXG4gICAge2FjdGlvbjogJ197IH1eeyB9ICcsIGxhYmVsOiAnX3tYfV57WH1YJywgdXNlV3JpdGU6IHRydWV9LFxuICAgIHthY3Rpb246ICdcXFxcdGV4dCcsIGxhYmVsOiAnXFxcXHRleHR7VH0nfSxcbl1cbiIsImNvbnN0IHtpc0N0cmxLZXksIGlzS2V5LCBkZWNvZGVCYXNlNjRJbWFnZSwgaW5zZXJ0VG9UZXh0QXJlYUF0Q3Vyc29yLCBzYW5pdGl6ZUNvbnRlbnQsIHNhbml0aXplfSA9IHJlcXVpcmUoJy4vdXRpbCcpXG5jb25zdCB0b29sYmFycyA9IHJlcXVpcmUoJy4vdG9vbGJhcnMnKVxuY29uc3QgTVEgPSBNYXRoUXVpbGwuZ2V0SW50ZXJmYWNlKDIpXG5jb25zdCBsb2NhbGVzID0ge1xuICAgIEZJOiByZXF1aXJlKCcuL0ZJJyksXG4gICAgU1Y6IHJlcXVpcmUoJy4vU1YnKVxufVxuY29uc3QgbCA9IGxvY2FsZXNbd2luZG93LmxvY2FsZSB8fCAnRkknXS5lZGl0b3JcbmNvbnN0IGtleUNvZGVzID0ge1xuICAgIEVOVEVSOiAxMyxcbiAgICBFU0M6IDI3XG59XG5cbmNvbnN0ICRvdXRlclBsYWNlaG9sZGVyID0gJChgPGRpdiBjbGFzcz1cIm1hdGgtZWRpdG9yLWhpZGRlblwiIGRhdGEtanM9XCJvdXRlclBsYWNlaG9sZGVyXCI+YClcblxuZnVuY3Rpb24gbW92ZUVsZW1lbnRBZnRlcigkZWxlbWVudCwgJGFmdGVyKSB7XG4gICAgJGFmdGVyLmFmdGVyKCRlbGVtZW50KVxufVxuXG5mdW5jdGlvbiBoaWRlRWxlbWVudEluRE9NKCRlbGVtZW50KSB7XG4gICAgJG91dGVyUGxhY2Vob2xkZXIuYXBwZW5kKCRlbGVtZW50KVxufVxuXG4vLyBUT0RPOiByZXBsYWNlIHdpdGggZGF0YSBhdHRyaWJ1dGVzP1xubGV0IGFuc3dlckZvY3VzID0gdHJ1ZVxubGV0IGxhdGV4RWRpdG9yRm9jdXMgPSBmYWxzZVxubGV0IGVxdWF0aW9uRWRpdG9yRm9jdXMgPSBmYWxzZVxubGV0IG1hdGhFZGl0b3JWaXNpYmxlID0gZmFsc2VcbmxldCAkY3VycmVudEVkaXRvclxuXG4kKCdib2R5JykuYXBwZW5kKCRvdXRlclBsYWNlaG9sZGVyKVxuXG5jb25zdCBtYXRoRWRpdG9yID0gaW5pdE1hdGhFZGl0b3IoKVxuY29uc3QgeyR0b29sYmFyLCB0b2dnbGVNYXRoVG9vbGJhcn0gPSB0b29sYmFycy5pbml0KG1hdGhFZGl0b3IsICgpID0+IGFuc3dlckZvY3VzLCBsKVxuXG5oaWRlRWxlbWVudEluRE9NKCR0b29sYmFyKVxuXG5mdW5jdGlvbiBpbml0TWF0aEVkaXRvcigpIHtcbiAgICBjb25zdCAkbWF0aEVkaXRvckNvbnRhaW5lciA9ICQoYFxuICAgICAgICA8ZGl2IGNsYXNzPVwibWF0aC1lZGl0b3JcIiBkYXRhLWpzPVwibWF0aEVkaXRvclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1hdGgtZWRpdG9yLWJveGVzXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1hdGgtZWRpdG9yLWVxdWF0aW9uLWVkaXRvclwiIGRhdGEtanM9XCJlcXVhdGlvbkVkaXRvclwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cIm1hdGgtZWRpdG9yLWxhdGV4LWVkaXRvclwiIGRhdGEtanM9XCJsYXRleEVkaXRvclwiIHBsYWNlaG9sZGVyPVwiTGFUZXhcIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PmApXG5cbiAgICBoaWRlRWxlbWVudEluRE9NKCRtYXRoRWRpdG9yQ29udGFpbmVyKVxuXG4gICAgY29uc3QgJGxhdGV4RWRpdG9yID0gJG1hdGhFZGl0b3JDb250YWluZXIuZmluZCgnW2RhdGEtanM9XCJsYXRleEVkaXRvclwiXScpXG4gICAgY29uc3QgJGVxdWF0aW9uRWRpdG9yID0gJG1hdGhFZGl0b3JDb250YWluZXIuZmluZCgnW2RhdGEtanM9XCJlcXVhdGlvbkVkaXRvclwiXScpXG4gICAgY29uc3QgbXFJbnN0YW5jZSA9IE1RLk1hdGhGaWVsZCgkZXF1YXRpb25FZGl0b3IuZ2V0KDApLCB7XG4gICAgICAgIGhhbmRsZXJzOiB7XG4gICAgICAgICAgICBlZGl0OiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGxhdGV4RWRpdG9yRm9jdXMpXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIGNvbnN0IGxhdGV4ID0gbXFJbnN0YW5jZS5sYXRleCgpXG4gICAgICAgICAgICAgICAgJGxhdGV4RWRpdG9yLnZhbChsYXRleClcbiAgICAgICAgICAgICAgICB1cGRhdGVNYXRoSW1nKCRtYXRoRWRpdG9yQ29udGFpbmVyLnByZXYoKSwgbGF0ZXgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW50ZXI6IGZpZWxkID0+IHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBkbyBub3QgY2xvc2UgZWRpdG9yIC8gbyBub3QgY3JlYXRlIGEgbmV3IGVxdWF0aW9uIGlmIHRoZXJlIGlzIG5vIHRleHQ/XG4gICAgICAgICAgICAgICAgbWF0aEVkaXRvci5jbG9zZU1hdGhFZGl0b3IodHJ1ZSlcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGluc2VydE5ld0VxdWF0aW9uKCc8ZGl2PjwvZGl2PicpLCAyKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcblxuICAgICRlcXVhdGlvbkVkaXRvclxuICAgICAgICAub24oJ2ZvY3VzIGJsdXInLCAnLm1xLXRleHRhcmVhIHRleHRhcmVhJywgZSA9PiB7XG4gICAgICAgICAgICBlcXVhdGlvbkVkaXRvckZvY3VzID0gZS50eXBlICE9PSAnYmx1cicgJiYgZS50eXBlICE9PSAnZm9jdXNvdXQnXG4gICAgICAgICAgICBvbkZvY3VzQ2hhbmdlZCgpXG4gICAgICAgIH0pXG5cbiAgICBmdW5jdGlvbiBvbkxhdGV4VXBkYXRlKCkge1xuICAgICAgICB1cGRhdGVNYXRoSW1nKCRtYXRoRWRpdG9yQ29udGFpbmVyLnByZXYoKSwgJGxhdGV4RWRpdG9yLnZhbCgpKVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IG1xSW5zdGFuY2UubGF0ZXgoJGxhdGV4RWRpdG9yLnZhbCgpKSwgMSlcbiAgICB9XG5cbiAgICAkbGF0ZXhFZGl0b3JcbiAgICAgICAgLmtleXVwKG9uTGF0ZXhVcGRhdGUpXG4gICAgICAgIC5vbignZm9jdXMgYmx1cicsIGUgPT4ge1xuICAgICAgICAgICAgbGF0ZXhFZGl0b3JGb2N1cyA9IGUudHlwZSAhPT0gJ2JsdXInXG4gICAgICAgICAgICBvbkZvY3VzQ2hhbmdlZCgpXG4gICAgICAgIH0pXG5cbiAgICBsZXQgZm9jdXNDaGFuZ2VkID0gbnVsbFxuXG4gICAgZnVuY3Rpb24gb25Gb2N1c0NoYW5nZWQoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChmb2N1c0NoYW5nZWQpXG4gICAgICAgIGZvY3VzQ2hhbmdlZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFsYXRleEVkaXRvckZvY3VzICYmICFlcXVhdGlvbkVkaXRvckZvY3VzKSBjbG9zZU1hdGhFZGl0b3IoKVxuICAgICAgICAgICAgaWYgKCFhbnN3ZXJGb2N1cyAmJiAhbWF0aEVkaXRvclZpc2libGUgJiYgIWxhdGV4RWRpdG9yRm9jdXMgJiYgIWVxdWF0aW9uRWRpdG9yRm9jdXMpIG9uRWRpdG9yQmx1cigpXG4gICAgICAgIH0sIDApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zZXJ0TmV3RXF1YXRpb24ob3B0aW9uYWxNYXJrdXApIHtcbiAgICAgICAgd2luZG93LmRvY3VtZW50LmV4ZWNDb21tYW5kKCdpbnNlcnRIVE1MJywgZmFsc2UsIChvcHRpb25hbE1hcmt1cCA/IG9wdGlvbmFsTWFya3VwIDogJycpICsgJzxpbWcgZGF0YS1qcz1cIm5ld1wiIHN0eWxlPVwiZGlzcGxheTogbm9uZVwiLz4nKVxuICAgICAgICBjb25zdCAkYWRkZWRFcXVhdGlvbkltYWdlID0gJCgnW2RhdGEtanM9XCJuZXdcIl0nKVxuICAgICAgICAkYWRkZWRFcXVhdGlvbkltYWdlXG4gICAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS1qcycpXG5cbiAgICAgICAgbW92ZUVsZW1lbnRBZnRlcigkbWF0aEVkaXRvckNvbnRhaW5lciwgJGFkZGVkRXF1YXRpb25JbWFnZSlcblxuICAgICAgICBtcUluc3RhbmNlLmxhdGV4KCcnKVxuICAgICAgICBtYXRoRWRpdG9yVmlzaWJsZSA9IHRydWVcbiAgICAgICAgdG9nZ2xlTWF0aFRvb2xiYXIodHJ1ZSlcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBtcUluc3RhbmNlLmZvY3VzKCksIDApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zZXJ0TWF0aChzeW1ib2wsIGFsdGVybmF0aXZlU3ltYm9sLCB1c2VXcml0ZSkge1xuICAgICAgICBpZiAobGF0ZXhFZGl0b3JGb2N1cykge1xuICAgICAgICAgICAgaW5zZXJ0VG9UZXh0QXJlYUF0Q3Vyc29yKCRsYXRleEVkaXRvci5nZXQoMCksIGFsdGVybmF0aXZlU3ltYm9sIHx8IHN5bWJvbClcbiAgICAgICAgICAgIG9uTGF0ZXhVcGRhdGUoKVxuICAgICAgICB9IGVsc2UgaWYgKGVxdWF0aW9uRWRpdG9yRm9jdXMpIHtcbiAgICAgICAgICAgIGlmICh1c2VXcml0ZSkge1xuICAgICAgICAgICAgICAgIG1xSW5zdGFuY2Uud3JpdGUoc3ltYm9sKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtcUluc3RhbmNlLnR5cGVkVGV4dChzeW1ib2wpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzeW1ib2wuc3RhcnRzV2l0aCgnXFxcXCcpKSBtcUluc3RhbmNlLmtleXN0cm9rZSgnVGFiJylcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gbXFJbnN0YW5jZS5mb2N1cygpLCAwKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTWF0aEltZygkaW1nLCBsYXRleCkge1xuICAgICAgICAkaW1nXG4gICAgICAgICAgICAucHJvcCgnc3JjJywgJy9tYXRoLnN2Zz9sYXRleD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGxhdGV4KSlcbiAgICAgICAgICAgIC5wcm9wKCdhbHQnLCBsYXRleClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZU1hdGhFZGl0b3Ioc2V0Rm9jdXNBZnRlckNsb3NlID0gZmFsc2UpIHtcbiAgICAgICAgLy8gVE9ETzogcmVtb3ZlIGV2ZW50IGJpbmRpbmdzXG4gICAgICAgIGNvbnN0ICRjdXJyZW50RWRpdG9yID0gJG1hdGhFZGl0b3JDb250YWluZXIuY2xvc2VzdCgnW2RhdGEtanM9XCJhbnN3ZXJcIl0nKVxuICAgICAgICBjb25zdCAkaW1nID0gJG1hdGhFZGl0b3JDb250YWluZXIucHJldigpXG4gICAgICAgIGlmICgkbGF0ZXhFZGl0b3IudmFsKCkudHJpbSgpID09PSAnJykge1xuICAgICAgICAgICAgJGltZy5yZW1vdmUoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGltZy5zaG93KClcbiAgICAgICAgICAgIHVwZGF0ZU1hdGhJbWcoJGltZywgJGxhdGV4RWRpdG9yLnZhbCgpKVxuICAgICAgICB9XG5cbiAgICAgICAgdG9nZ2xlTWF0aFRvb2xiYXIoZmFsc2UpXG4gICAgICAgIGhpZGVFbGVtZW50SW5ET00oJG1hdGhFZGl0b3JDb250YWluZXIpXG4gICAgICAgIG1hdGhFZGl0b3JWaXNpYmxlID0gZmFsc2VcbiAgICAgICAgbGF0ZXhFZGl0b3JGb2N1cyA9IGZhbHNlXG4gICAgICAgIGVxdWF0aW9uRWRpdG9yRm9jdXMgPSBmYWxzZVxuICAgICAgICBpZiAoc2V0Rm9jdXNBZnRlckNsb3NlKSAkY3VycmVudEVkaXRvci5mb2N1cygpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb3Blbk1hdGhFZGl0b3IoJGltZykge1xuICAgICAgICBpZiAobWF0aEVkaXRvclZpc2libGUpIGNsb3NlTWF0aEVkaXRvcigpXG4gICAgICAgICRpbWcuaGlkZSgpXG4gICAgICAgIG1vdmVFbGVtZW50QWZ0ZXIoJG1hdGhFZGl0b3JDb250YWluZXIsICRpbWcpXG4gICAgICAgIGNvbnN0IGxhdGV4ID0gJGltZy5wcm9wKCdhbHQnKVxuICAgICAgICAkbGF0ZXhFZGl0b3IudmFsKGxhdGV4KVxuICAgICAgICBvbkxhdGV4VXBkYXRlKClcbiAgICAgICAgbWF0aEVkaXRvclZpc2libGUgPSB0cnVlXG4gICAgICAgIHRvZ2dsZU1hdGhUb29sYmFyKHRydWUpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gbXFJbnN0YW5jZS5mb2N1cygpLCAwKVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGluc2VydE5ld0VxdWF0aW9uLFxuICAgICAgICBpbnNlcnRNYXRoLFxuICAgICAgICBjbG9zZU1hdGhFZGl0b3IsXG4gICAgICAgIG9wZW5NYXRoRWRpdG9yLFxuICAgICAgICBvbkZvY3VzQ2hhbmdlZFxuICAgIH1cbn1cblxuZnVuY3Rpb24gb25FZGl0b3JGb2N1cygkZWxlbWVudCkge1xuICAgICRjdXJyZW50RWRpdG9yID0gJGVsZW1lbnRcbiAgICAkZWxlbWVudC5iZWZvcmUoJHRvb2xiYXIpXG4gICAgJHRvb2xiYXIuc2hvdygpXG59XG5cbmZ1bmN0aW9uIG9uRWRpdG9yQmx1cigpIHtcbiAgICAvLyBUT0RPOiByZW1vdmUgZXZlbnQgYmluZGluZ3NcbiAgICBoaWRlRWxlbWVudEluRE9NKCR0b29sYmFyKVxuICAgIG1hdGhFZGl0b3IuY2xvc2VNYXRoRWRpdG9yKClcbiAgICAvLyAkZWRpdG9yLm9mZigpXG5cbiAgICBhbnN3ZXJGb2N1cyA9IGZhbHNlXG4gICAgbWF0aEVkaXRvclZpc2libGUgPSBmYWxzZVxuICAgIGxhdGV4RWRpdG9yRm9jdXMgPSBmYWxzZVxufVxuXG5sZXQgYmx1cnJlZFxuXG5mdW5jdGlvbiBvbkVkaXRvckZvY3VzQ2hhbmdlZChlKSB7XG4gICAgYW5zd2VyRm9jdXMgPSBlLnR5cGUgPT09ICdmb2N1cydcblxuICAgIGNsZWFyVGltZW91dChibHVycmVkKVxuICAgIGJsdXJyZWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKCFhbnN3ZXJGb2N1cyAmJiAhbWF0aEVkaXRvclZpc2libGUgJiYgIWxhdGV4RWRpdG9yRm9jdXMgJiYgIWVxdWF0aW9uRWRpdG9yRm9jdXMpIG9uRWRpdG9yQmx1cigpXG4gICAgICAgIGVsc2UgaWYgKGFuc3dlckZvY3VzICYmIG1hdGhFZGl0b3JWaXNpYmxlKSBtYXRoRWRpdG9yLmNsb3NlTWF0aEVkaXRvcigpXG4gICAgICAgIGVsc2Ugb25FZGl0b3JGb2N1cygkKGUudGFyZ2V0KSlcbiAgICB9LCAwKVxufVxuXG5mdW5jdGlvbiBpc01hdGhFZGl0b3JWaXNpYmxlKCkge1xuICAgIHJldHVybiBtYXRoRWRpdG9yVmlzaWJsZVxufVxuXG5jb25zdCBtYXJrQW5kR2V0SW5saW5lSW1hZ2VzID0gJGVkaXRvciA9PiB7XG4gICAgY29uc3QgbG9hZGluZ0dpZiA9IFwiZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoRUFBUUFQUUFBUC8vL3dBQUFQRHc4SXFLaXVEZzRFWkdSbnA2ZWdBQUFGaFlXQ1FrSkt5c3JMNit2aFFVRkp5Y25BUUVCRFkyTm1ob2FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFDSCtHa055WldGMFpXUWdkMmwwYUNCaGFtRjRiRzloWkM1cGJtWnZBQ0g1QkFBS0FBQUFJZjhMVGtWVVUwTkJVRVV5TGpBREFRQUFBQ3dBQUFBQUVBQVFBQUFGZHlBZ0FnSUpJZVdvQWtSQ0NNZEJrS3RJSEluZ3lNS3NFclBCWWJBRHBrU0N3aERtUUNCZXRoUkI2Vmo0a0ZDa1FQRzRJbFdEZ3JOUkl3bk80VUtCWER1ZnpRdkRNYW9TREJnRmI4ODZNaVFhZGdOQUJBb2tmQ3d6QkE4TENnMEVnbDhqQWdnR0FBMWtCSUExQkFZemx5SUxjelVMQzJVaEFDSDVCQUFLQUFFQUxBQUFBQUFRQUJBQUFBVjJJQ0FDQW1sQVpUbU9SRUVJeVVFUWpMS0t4UEhBRGhFdnF4bGdjR2drR0kxRFlTVkFJQVdNeCtsd1NLa0lDSjBRc0hpOVJnS0J3blZUaVJRUWd3RjRJNFVGRFFRRXdpNi8zWVNHV1JSbWpoRUVUQUpmSWdNRkNuQUtNMEtEVjRFRUVBUUxpRjE4VEFZTlhEYVNlM3g2bWppZE4xczNJUUFoK1FRQUNnQUNBQ3dBQUFBQUVBQVFBQUFGZUNBZ0FnTFpER1U1amdSRUNFVWlDSSt5aW9TRHdESnlMS3NYb0hGUXhCU0hBb0FBRkJocXRNSmc4RGdRQmdmckVzSkFFQWc0WWhaSUVpd2dLdEhpTUJndHBnM3diVVpYR083a09iMU1VS1JGTXlzQ0NoQW9nZ0pDSWcwR0MyYU5lNGdxUWxkZkw0bC9BZzFBWHlTSmduNUxjb0UzUVhJM0lRQWgrUVFBQ2dBREFDd0FBQUFBRUFBUUFBQUZkaUFnQWdMWk5HVTVqb1FoQ0VqeElzc3FFbzhiQzlCUmp5OUFnN0dJTFE0UUVvRTBnQkFFQmNPcGNCQTBEb3hTSy9lOExSSUhuK2kxY0swSXlLZGcwVkFvbGpZSWcrR2duUnJ3VlMvOElBa0lDeW9zQklRcEJBTW9LeTlkSW14UGhTK0dLa0Zya1grVGlndExsSXlLWFVGK05qYWdOaUVBSWZrRUFBb0FCQUFzQUFBQUFCQUFFQUFBQld3Z0lBSUNhUmhsT1k0RUlnakg4UjdMS2hLSEd3c012YjRBQXkzV09EQklCQktDc1lBOVRqdWhETkRLRVZTRVJlelFFTDBXcmhYdWNSVVFHdWlrN2JGbG5nenFWVzlMTWw5WFd2TGRqRmFKdERGcVoxY0VaVUIwZFVndkwzZGdQNFdKWm40amtvbVdOcFNUSXlFQUlma0VBQW9BQlFBc0FBQUFBQkFBRUFBQUJYNGdJQUlDdVN4bE9ZNkNJZ2lEOFJyRUtncUdPd3h3VXJNbEFvU3dJekFHcEpwZ29TREFHaWZEWTVrb3BCWURsRXBBUUJ3ZXZ4ZkJ0UklVR2k4eHdXa0ROQkNJd21DOVZxMGFpUVFEUXVLK1ZnUVBEWFY5aENKakJ3Y0ZZVTVwTHd3SFhRY01LU21OTFFjSUFFeGxiSDhKQnd0dGFYMEFCQWNOYldWYkt5RUFJZmtFQUFvQUJnQXNBQUFBQUJBQUVBQUFCWGtnSUFJQ1NSQmxPWTdDSWdoTjh6YkVLc0tvSWpkRnpaYUVnVUJIS0NoTUp0UndjV3BBV29XbmlmbTZFU0FNaE84bFFLMEVFQVYzckZvcElCQ0VjR3dES0FxUGg0SFVyWTRJQ0hIMWRTb1RGZ2NIVWlaakJoQUpCMkFIRHlrcEtBd0hBd2R6ZjE5S2tBU0lQbDljRGdjbkRrZHROd2lNSkNzaEFDSDVCQUFLQUFjQUxBQUFBQUFRQUJBQUFBVjNJQ0FDQWtrUVpUbU9BaW9zaXlBb3hDcStLUHhDTlZzU01SZ0JzaUNsV3JMVFNXRm9JUVpIbDZwbGVCaDZzdXhLTUlobHZ6YkF3a0JXZkZXckJRVHhOTHEyUkcyeWhTVWtEczJiNjNBWURBb0pYQWNGUndBRGVBa0pEWDBBUUNzRWZBUU1EQUlQQnowckNnY3hreTBKUldFMUFtd3BLeUVBSWZrRUFBb0FDQUFzQUFBQUFCQUFFQUFBQlhrZ0lBSUNLWnprcUo0blFaeExxWkt2NE5xTkxLSzIvUTRFazRsRlhDaHNnNXlwSmpzMUlJM2dFRFVTUkluRUdZQXc2QjZ6TTRKaHJEQXRFb3NWa0xVdEhBN1JIYUhBR0pRRWpzT0RjRWcwRkJBRlZna1FKUTFwQXdjRER3OEtjRnRTSW53SkFvd0NDQTZSSXdxWkFna1BOZ1ZwV25kamR5b2hBQ0g1QkFBS0FBa0FMQUFBQUFBUUFCQUFBQVY1SUNBQ0FpbWM1S2llTEV1VUt2bTJ4QUtMcURDZkMyR2FPOWVMMExBQldUaUJZbUEwNlc2a0hndkNxRUppQUlKaXUzZ2N2Z1Vzc2NIVUVSbStrYUN4eXhhK3pSUGswU2dKRWdmSXZiQWRJQVFMQ0FZbENqNERCdzBJQlFzTUNqSXFCQWNQQW9vQ0JnOXBLZ3NKTHdVRk9oQ1pLeVFEQTNZcUlRQWgrUVFBQ2dBS0FDd0FBQUFBRUFBUUFBQUZkU0FnQWdJcG5PU29ubXhicWlUaENySktFSEZibzhKeERET1pZRkZiK0E0MUU0SDRPaGtPaXBYd0JFbFlJVERBY2tGRU9CZ01RM2Fya01rVUJkeElVR1pwRWI3a2FRQlJsQVNQZzBGUVFIQWJFRU1HRFNWRUFBMVFCaEFFRDFFME5nd0ZBb29DRFdsamFRSVFDRTVxTUhjTmhDa2pJUUFoK1FRQUNnQUxBQ3dBQUFBQUVBQVFBQUFGZVNBZ0FnSXBuT1NvTGd4eHZxZ0tMRWNDQzY1S0VBQnlLSzhjU3BBNERBaUhRL0RrS2hHS2g0WkN0Q3laR282RjZpWVlQQXFGZ1l5MDJ4a1NhTEVNVjM0dEVMeVJZTkVzQ1F5SGx2V2tHQ3pzUGdNQ0VBWTdDZzA0VWs0OExBc0RoUkE4TVZRUEVGMEdBZ3FZWXdTUmx5Y05jV3NrQ2tBcEl5RUFPd0FBQUFBQUFBQUFBRHhpY2lBdlBnbzhZajVYWVhKdWFXNW5QQzlpUGpvZ0lHMTVjM0ZzWDNGMVpYSjVLQ2tnV3p4aElHaHlaV1k5SjJaMWJtTjBhVzl1TG0xNWMzRnNMWEYxWlhKNUp6NW1kVzVqZEdsdmJpNXRlWE54YkMxeGRXVnllVHd2WVQ1ZE9pQkRZVzRuZENCamIyNXVaV04wSUhSdklHeHZZMkZzSUUxNVUxRk1JSE5sY25abGNpQjBhSEp2ZFdkb0lITnZZMnRsZENBbkwzWmhjaTl5ZFc0dmJYbHpjV3hrTDIxNWMzRnNaQzV6YjJOckp5QW9NaWtnYVc0Z1BHSStMMmh2YldVdllXcGhlR3h2WVdRdmQzZDNMMnhwWW5KaGFYSnBaWE12WTJ4aGMzTXViWGx6Y1d3dWNHaHdQQzlpUGlCdmJpQnNhVzVsSUR4aVBqWTRQQzlpUGp4aWNpQXZQZ284WW5JZ0x6NEtQR0krVjJGeWJtbHVaend2WWo0NklDQnRlWE54YkY5eGRXVnllU2dwSUZzOFlTQm9jbVZtUFNkbWRXNWpkR2x2Ymk1dGVYTnhiQzF4ZFdWeWVTYytablZ1WTNScGIyNHViWGx6Y1d3dGNYVmxjbms4TDJFK1hUb2dRU0JzYVc1cklIUnZJSFJvWlNCelpYSjJaWElnWTI5MWJHUWdibTkwSUdKbElHVnpkR0ZpYkdsemFHVmtJR2x1SUR4aVBpOW9iMjFsTDJGcVlYaHNiMkZrTDNkM2R5OXNhV0p5WVdseWFXVnpMMk5zWVhOekxtMTVjM0ZzTG5Cb2NEd3ZZajRnYjI0Z2JHbHVaU0E4WWo0Mk9Ed3ZZajQ4WW5JZ0x6NEtQR0p5SUM4K0NqeGlQbGRoY201cGJtYzhMMkkrT2lBZ2JYbHpjV3hmY1hWbGNua29LU0JiUEdFZ2FISmxaajBuWm5WdVkzUnBiMjR1YlhsemNXd3RjWFZsY25rblBtWjFibU4wYVc5dUxtMTVjM0ZzTFhGMVpYSjVQQzloUGwwNklFTmhiaWQwSUdOdmJtNWxZM1FnZEc4Z2JHOWpZV3dnVFhsVFVVd2djMlZ5ZG1WeUlIUm9jbTkxWjJnZ2MyOWphMlYwSUNjdmRtRnlMM0oxYmk5dGVYTnhiR1F2YlhsemNXeGtMbk52WTJzbklDZ3lLU0JwYmlBOFlqNHZhRzl0WlM5aGFtRjRiRzloWkM5M2QzY3ZiR2xpY21GcGNtbGxjeTlqYkdGemN5NXRlWE54YkM1d2FIQThMMkkrSUc5dUlHeHBibVVnUEdJK05qZzhMMkkrUEdKeUlDOCtDanhpY2lBdlBnbzhZajVYWVhKdWFXNW5QQzlpUGpvZ0lHMTVjM0ZzWDNGMVpYSjVLQ2tnV3p4aElHaHlaV1k5SjJaMWJtTjBhVzl1TG0xNWMzRnNMWEYxWlhKNUp6NW1kVzVqZEdsdmJpNXRlWE54YkMxeGRXVnllVHd2WVQ1ZE9pQkJJR3hwYm1zZ2RHOGdkR2hsSUhObGNuWmxjaUJqYjNWc1pDQnViM1FnWW1VZ1pYTjBZV0pzYVhOb1pXUWdhVzRnUEdJK0wyaHZiV1V2WVdwaGVHeHZZV1F2ZDNkM0wyeHBZbkpoYVhKcFpYTXZZMnhoYzNNdWJYbHpjV3d1Y0dod1BDOWlQaUJ2YmlCc2FXNWxJRHhpUGpZNFBDOWlQanhpY2lBdlBnbzhZbklnTHo0S1BHSStWMkZ5Ym1sdVp6d3ZZajQ2SUNCdGVYTnhiRjl4ZFdWeWVTZ3BJRnM4WVNCb2NtVm1QU2RtZFc1amRHbHZiaTV0ZVhOeGJDMXhkV1Z5ZVNjK1puVnVZM1JwYjI0dWJYbHpjV3d0Y1hWbGNuazhMMkUrWFRvZ1EyRnVKM1FnWTI5dWJtVmpkQ0IwYnlCc2IyTmhiQ0JOZVZOUlRDQnpaWEoyWlhJZ2RHaHliM1ZuYUNCemIyTnJaWFFnSnk5MllYSXZjblZ1TDIxNWMzRnNaQzl0ZVhOeGJHUXVjMjlqYXljZ0tESXBJR2x1SUR4aVBpOW9iMjFsTDJGcVlYaHNiMkZrTDNkM2R5OXNhV0p5WVdseWFXVnpMMk5zWVhOekxtMTVjM0ZzTG5Cb2NEd3ZZajRnYjI0Z2JHbHVaU0E4WWo0Mk9Ed3ZZajQ4WW5JZ0x6NEtQR0p5SUM4K0NqeGlQbGRoY201cGJtYzhMMkkrT2lBZ2JYbHpjV3hmY1hWbGNua29LU0JiUEdFZ2FISmxaajBuWm5WdVkzUnBiMjR1YlhsemNXd3RjWFZsY25rblBtWjFibU4wYVc5dUxtMTVjM0ZzTFhGMVpYSjVQQzloUGwwNklFRWdiR2x1YXlCMGJ5QjBhR1VnYzJWeWRtVnlJR052ZFd4a0lHNXZkQ0JpWlNCbGMzUmhZbXhwYzJobFpDQnBiaUE4WWo0dmFHOXRaUzloYW1GNGJHOWhaQzkzZDNjdmJHbGljbUZwY21sbGN5OWpiR0Z6Y3k1dGVYTnhiQzV3YUhBOEwySStJRzl1SUd4cGJtVWdQR0krTmpnOEwySStQR0p5SUM4K0NnPT1cIlxuICAgIHJldHVybiAkZWRpdG9yLmZpbmQoJ2ltZ1tzcmNePVwiZGF0YVwiXScpXG4gICAgICAgIC5lYWNoKChpLCBlbCkgPT4gZWwuc2V0QXR0cmlidXRlKCdpZCcsIG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgJy0nICsgaSkpXG4gICAgICAgIC5tYXAoKGksIGVsKSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZXQgPSBPYmplY3QuYXNzaWduKGRlY29kZUJhc2U2NEltYWdlKGVsLmdldEF0dHJpYnV0ZSgnc3JjJykpLCB7aWQ6IGVsLmdldEF0dHJpYnV0ZSgnaWQnKX0pXG4gICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxvYWRpbmdHaWYpXG4gICAgICAgICAgICByZXR1cm4gcmV0XG4gICAgICAgIH0pXG4gICAgICAgIC50b0FycmF5KClcbiAgICAgICAgLmZpbHRlcigoe3R5cGV9KSA9PiB0eXBlID09PSAnaW1hZ2UvcG5nJylcbn1cblxuY29uc3QgcGVyc2lzdElubGluZUltYWdlcyA9ICgkZWRpdG9yLCBzY3JlZW5zaG90U2F2ZXIpID0+IHtcbiAgICBjb25zdCBzYXZlU3RyZWFtID0gQmFjb24uY29tYmluZUFzQXJyYXkoXG4gICAgICAgIG1hcmtBbmRHZXRJbmxpbmVJbWFnZXMoJGVkaXRvcilcbiAgICAgICAgICAgIC5tYXAoZGF0YSA9PiBCYWNvbi5mcm9tUHJvbWlzZShcbiAgICAgICAgICAgICAgICBzY3JlZW5zaG90U2F2ZXIoZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oc2NyZWVuc2hvdFVybCA9PiAkZWRpdG9yLmZpbmQoJyMnICsgZGF0YS5pZCkuYXR0cignc3JjJywgc2NyZWVuc2hvdFVybCkucmVtb3ZlQXR0cignaWQnKSlcbiAgICAgICAgICAgICAgICAgICAgLmZhaWwoZSA9PiAkZWRpdG9yLmZpbmQoJyMnICsgZGF0YS5pZCkucmVtb3ZlKCkpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICApXG4gICAgc2F2ZVN0cmVhbS5vblZhbHVlKCgpID0+ICRlZGl0b3IudHJpZ2dlcignaW5wdXQnKSlcbiAgICBzYXZlU3RyZWFtLm9uRXJyb3IoZSA9PiB7fSkgIC8vIFRPRE86IENhbGwgZXJyb3IgY2FsbGJhY2sgaGVyZVxufVxuXG5jb25zdCBtYWtlUmljaFRleHQgPSAoZWxlbWVudCwgb3B0aW9ucywgb25WYWx1ZUNoYW5nZWQgPSAoKSA9PiB7IH0pID0+IHtcbiAgICBjb25zdCB7XG4gICAgICAgIHNjcmVlbnNob3Q6IHtcbiAgICAgICAgICAgIHNhdmVyXG4gICAgICAgIH1cbiAgICB9ID0gb3B0aW9uc1xuICAgIGNvbnN0ICRhbnN3ZXIgPSAkKGVsZW1lbnQpXG5cbiAgICBsZXQgcGFzdGVJblByb2dyZXNzID0gZmFsc2VcblxuICAgICRhbnN3ZXJcbiAgICAgICAgLmF0dHIoJ2NvbnRlbnRlZGl0YWJsZScsICd0cnVlJylcbiAgICAgICAgLmF0dHIoJ3NwZWxsY2hlY2snLCAnZmFsc2UnKVxuICAgICAgICAuYXR0cignZGF0YS1qcycsICdhbnN3ZXInKVxuICAgICAgICAuYWRkQ2xhc3MoJ21hdGgtZWRpdG9yLWFuc3dlcicpXG4gICAgICAgIC5vbigna2V5ZG93bicsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKGlzQ3RybEtleShlLCBrZXlDb2Rlcy5FTlRFUikgfHwgaXNLZXkoZSwga2V5Q29kZXMuRVNDKSkgbWF0aEVkaXRvci5jbG9zZU1hdGhFZGl0b3IodHJ1ZSlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdtb3VzZWRvd24nLCAnaW1nW3NyY149XCIvbWF0aC5zdmdcIl0nLCBlID0+IHtcbiAgICAgICAgICAgIG9uRWRpdG9yRm9jdXMoJChlLnRhcmdldCkuY2xvc2VzdCgnW2RhdGEtanM9XCJhbnN3ZXJcIl0nKSlcbiAgICAgICAgICAgIG1hdGhFZGl0b3Iub3Blbk1hdGhFZGl0b3IoJChlLnRhcmdldCkpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbigna2V5cHJlc3MnLCBlID0+IHtcbiAgICAgICAgICAgIGlmIChpc0N0cmxLZXkoZSwgJ2wnKSB8fCBpc0N0cmxLZXkoZSwgJ2knKSkgbWF0aEVkaXRvci5pbnNlcnROZXdFcXVhdGlvbigpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZm9jdXMgYmx1cicsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKGlzTWF0aEVkaXRvclZpc2libGUoKSAmJiBlLnR5cGUgPT09ICdmb2N1cycpIG1hdGhFZGl0b3IuY2xvc2VNYXRoRWRpdG9yKClcbiAgICAgICAgICAgIG9uRWRpdG9yRm9jdXNDaGFuZ2VkKGUpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbigna2V5dXAgaW5wdXQnLCBlID0+IHtcbiAgICAgICAgICAgIGlmKCEgcGFzdGVJblByb2dyZXNzKSBvblZhbHVlQ2hhbmdlZChzYW5pdGl6ZUNvbnRlbnQoZS5jdXJyZW50VGFyZ2V0KSlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdwYXN0ZScsIGUgPT4ge1xuICAgICAgICAgICAgcGFzdGVJblByb2dyZXNzID0gdHJ1ZVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBwYXN0ZUluUHJvZ3Jlc3MgPSBmYWxzZSwgMClcblxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdURVhUQVJFQScpXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICBjb25zdCBjbGlwYm9hcmREYXRhID0gZS5vcmlnaW5hbEV2ZW50LmNsaXBib2FyZERhdGFcbiAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBjbGlwYm9hcmREYXRhLml0ZW1zICYmIGNsaXBib2FyZERhdGEuaXRlbXNbMF0uZ2V0QXNGaWxlKClcbiAgICAgICAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgaWYoZmlsZS50eXBlICE9PSAnaW1hZ2UvcG5nJylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgc2F2ZXIoe2RhdGE6IGZpbGUsIHR5cGU6IGZpbGUudHlwZX0pLnRoZW4oc2NyZWVuc2hvdFVybCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGltZyA9IGA8aW1nIHNyYz1cIiR7c2NyZWVuc2hvdFVybH1cIi8+YFxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydEhUTUwnLCBmYWxzZSwgaW1nKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNsaXBib2FyZERhdGFBc0h0bWwgPSBjbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQvaHRtbCcpXG4gICAgICAgICAgICAgICAgaWYgKGNsaXBib2FyZERhdGFBc0h0bWwpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0SFRNTCcsIGZhbHNlLCBzYW5pdGl6ZShjbGlwYm9hcmREYXRhQXNIdG1sKSlcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHBlcnNpc3RJbmxpbmVJbWFnZXMoJGN1cnJlbnRFZGl0b3IsIHNhdmVyKSwgMClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4gcGVyc2lzdElubGluZUltYWdlcygkY3VycmVudEVkaXRvciwgc2F2ZXIpLCAwKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbWFrZVJpY2hUZXh0XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhbGxvd2VkVGFnczogW1xuICAgICAgICAnZGl2JyxcbiAgICAgICAgJ2ltZycsXG4gICAgICAgICdicidcbiAgICBdLFxuICAgIGFsbG93ZWRBdHRyaWJ1dGVzOiB7XG4gICAgICAgIGltZzogWydzcmMnLCAnYWx0J11cbiAgICB9LFxuICAgIGFsbG93ZWRTY2hlbWVzOiBbJ2RhdGEnLCAnaHR0cCcsICdodHRwcyddLFxuICAgIGV4Y2x1c2l2ZUZpbHRlcjogZnVuY3Rpb24oZnJhbWUpIHsgcmV0dXJuIGZyYW1lLmF0dHJpYnNbJ2RhdGEtanMnXSA9PT0gJ21hdGhFZGl0b3InIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuICAgIHtjaGFyYWN0ZXI6ICfiiaEnLCBsYXRleENvbW1hbmQ6ICdcXFxcZXF1aXYnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4omiJ30sIC8vIFxcbmVxdWl2IG9yIFxcbm90XFxlcXVpdlxuICAgIHtjaGFyYWN0ZXI6ICfiiYgnLCBsYXRleENvbW1hbmQ6ICdcXFxcYXBwcm94JywgcG9wdWxhcjogdHJ1ZX0sXG4gICAge2NoYXJhY3RlcjogJ+KIvCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxzaW0nfSxcbiAgICB7Y2hhcmFjdGVyOiAn4omgJywgbGF0ZXhDb21tYW5kOiAnXFxcXG5lcScsIHBvcHVsYXI6IHRydWV9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiaQnLCBsYXRleENvbW1hbmQ6ICdcXFxcbGVxJywgcG9wdWxhcjogdHJ1ZX0sXG4gICAge2NoYXJhY3RlcjogJ+KJpScsIGxhdGV4Q29tbWFuZDogJ1xcXFxnZXEnLCBwb3B1bGFyOiB0cnVlfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oCmJywgbGF0ZXhDb21tYW5kOiAnXFxcXGRvdHMnfSxcbiAgICB7Y2hhcmFjdGVyOiAnwrInLCBsYXRleENvbW1hbmQ6ICdeMicsIHBvcHVsYXI6IHRydWV9LFxuICAgIHtjaGFyYWN0ZXI6ICfCsycsIGxhdGV4Q29tbWFuZDogJ14zJywgcG9wdWxhcjogdHJ1ZX0sXG4gICAge2NoYXJhY3RlcjogJ8K9JywgbGF0ZXhDb21tYW5kOiAnMS8yJywgcG9wdWxhcjogdHJ1ZX0sXG4gICAge2NoYXJhY3RlcjogJ+KFkycsIGxhdGV4Q29tbWFuZDogJzEvMycsIHBvcHVsYXI6IHRydWV9LFxuICAgIHtjaGFyYWN0ZXI6ICfCtycsIGxhdGV4Q29tbWFuZDogJ1xcXFxjZG90JywgcG9wdWxhcjogdHJ1ZX0sXG4gICAge2NoYXJhY3RlcjogJ8KxJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBtJ30sXG5cbiAgICB7Y2hhcmFjdGVyOiAnwrAnLCBwb3B1bGFyOiB0cnVlfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oiYJywgbGF0ZXhDb21tYW5kOiAnXFxcXGNpcmMnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oigJywgbGF0ZXhDb21tYW5kOiAnXFxcXGFuZ2xlJ30sXG4gICAge2NoYXJhY3RlcjogJ+KKpScsIGxhdGV4Q29tbWFuZDogJ1xcXFxwZXJwJ30sXG4gICAge2NoYXJhY3RlcjogJ+KAlicsIGxhdGV4Q29tbWFuZDogJ1xcXFxwYXJhbGxlbCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfih4UnfSxcblxuICAgIHtjaGFyYWN0ZXI6ICfCtScsIGxhdGV4Q29tbWFuZDogJ1xcXFxtdSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiIInLCBsYXRleENvbW1hbmQ6ICdcXFxccGFydGlhbCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiJEnLCBsYXRleENvbW1hbmQ6ICdcXFxcU2lnbWEnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oiPJywgbGF0ZXhDb21tYW5kOiAnXFxcXFBpJ30sXG4gICAge2NoYXJhY3RlcjogJ86pJywgbGF0ZXhDb21tYW5kOiAnXFxcXE9tZWdhJ30sXG4gICAge2NoYXJhY3RlcjogJ86UJywgbGF0ZXhDb21tYW5kOiAnXFxcXERlbHRhJ30sXG4gICAge2NoYXJhY3RlcjogJ/CdnIQnLCBsYXRleENvbW1hbmQ6ICdcXFxcaW90YSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfOkycsIGxhdGV4Q29tbWFuZDogJ1xcXFxHYW1tYSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfOmCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxUaGV0YSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfOpicsIGxhdGV4Q29tbWFuZDogJ1xcXFxQaGknfSxcbiAgICB7Y2hhcmFjdGVyOiAnzrcnLCBsYXRleENvbW1hbmQ6ICdcXFxcZXRhJ30sXG4gICAge2NoYXJhY3RlcjogJ86xJywgbGF0ZXhDb21tYW5kOiAnXFxcXGFscGhhJ30sXG4gICAge2NoYXJhY3RlcjogJ860JywgbGF0ZXhDb21tYW5kOiAnXFxcXGRlbHRhJ30sXG4gICAge2NoYXJhY3RlcjogJ861JywgbGF0ZXhDb21tYW5kOiAnXFxcXHZhcmVwc2lsb24nfSxcbiAgICB7Y2hhcmFjdGVyOiAnz4MnLCBsYXRleENvbW1hbmQ6ICdcXFxcc2lnbWEnfSxcbiAgICB7Y2hhcmFjdGVyOiAnz4QnLCBsYXRleENvbW1hbmQ6ICdcXFxcdGF1J30sXG4gICAge2NoYXJhY3RlcjogJ86pJywgbGF0ZXhDb21tYW5kOiAnXFxcXE9tZWdhJ30sXG4gICAge2NoYXJhY3RlcjogJ8+JJywgbGF0ZXhDb21tYW5kOiAnXFxcXG9tZWdhJ30sXG4gICAge2NoYXJhY3RlcjogJ8+AJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBpJywgcG9wdWxhcjogdHJ1ZX0sXG4gICAge2NoYXJhY3RlcjogJ9CkJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBoaSd9LFxuXG4gICAge2NoYXJhY3RlcjogJ+KGkScsIGxhdGV4Q29tbWFuZDogJ1xcXFx1cGFycm93J30sXG4gICAge2NoYXJhY3RlcjogJ+KGkicsIGxhdGV4Q29tbWFuZDogJ1xcXFxyaWdodGFycm93J30sXG4gICAge2NoYXJhY3RlcjogJ+KGkycsIGxhdGV4Q29tbWFuZDogJ1xcXFxkb3duYXJyb3cnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oaUJywgbGF0ZXhDb21tYW5kOiAnXFxcXGxlZnRyaWdodGFycm93J30sXG4gICAge2NoYXJhY3RlcjogJ+KHkicsIGxhdGV4Q29tbWFuZDogJ1xcXFxSaWdodGFycm93JywgcG9wdWxhcjogdHJ1ZX0sXG4gICAge2NoYXJhY3RlcjogJ+KHlCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxMZWZ0cmlnaHRhcnJvdycsIHBvcHVsYXI6IHRydWV9LFxuICAgIHtjaGFyYWN0ZXI6ICfih4wnfSwgLy8gXFxyaWdodGxlZnRoYXJwb29uc1xuICAgIHtjaGFyYWN0ZXI6ICfiiJ4nLCBsYXRleENvbW1hbmQ6ICdcXFxcaW5mdHknLCBwb3B1bGFyOiB0cnVlfSxcblxuICAgIHtjaGFyYWN0ZXI6ICfiiIgnLCBsYXRleENvbW1hbmQ6ICdcXFxcaW4nfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oiJJywgbGF0ZXhDb21tYW5kOiAnXFxcXG5vdGluJ30sXG4gICAge2NoYXJhY3RlcjogJ+KEnSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfihJUnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oSkJ30sXG4gICAge2NoYXJhY3RlcjogJ+KEmid9LFxuICAgIHtjaGFyYWN0ZXI6ICfiioInLCBsYXRleENvbW1hbmQ6ICdcXFxcc3Vic2V0J30sXG4gICAge2NoYXJhY3RlcjogJ+KKhCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxub3RzdWJzZXQnfSxcbiAgICB7Y2hhcmFjdGVyOiAn4oipJywgbGF0ZXhDb21tYW5kOiAnXFxcXGNhcCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiKonLCBsYXRleENvbW1hbmQ6ICdcXFxcY3VwJ30sXG4gICAge2NoYXJhY3RlcjogJ+KIhScsIGxhdGV4Q29tbWFuZDogJ1xcXFxlbXB0eSd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiJYnLCBsYXRleENvbW1hbmQ6ICdcXFxcc2V0bWludXMnfSxcblxuICAgIHtjaGFyYWN0ZXI6ICfCrCd9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiKcnLCBsYXRleENvbW1hbmQ6ICdcXFxcYW5kJ30sXG4gICAge2NoYXJhY3RlcjogJ+KIqCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxvcid9LFxuICAgIHtjaGFyYWN0ZXI6ICfiiIAnLCBsYXRleENvbW1hbmQ6ICdcXFxcZm9yYWxsJ30sXG4gICAge2NoYXJhY3RlcjogJ+KIgycsIGxhdGV4Q29tbWFuZDogJ1xcXFxleGlzdHMnfVxuXVxuIiwiY29uc3Qgc3BlY2lhbENoYXJhY3RlcnMgPSByZXF1aXJlKCcuL3NwZWNpYWxDaGFyYWN0ZXJzJylcbmNvbnN0IGxhdGV4Q29tbWFuZHMgPSByZXF1aXJlKCcuL2xhdGV4Q29tbWFuZHMnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpbml0LFxufVxuXG5mdW5jdGlvbiBpbml0KG1hdGhFZGl0b3IsIGhhc0Fuc3dlckZvY3VzLCBsKSB7XG4gICAgY29uc3QgJHRvb2xiYXIgPSAkKGAgICAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzPVwibWF0aC1lZGl0b3ItdG9vbHNcIiBkYXRhLWpzPVwidG9vbHNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYXRoLWVkaXRvci1jaGFyYWN0ZXJzXCIgZGF0YS1qcz1cImNoYXJhY3RlcnNcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hdGgtZWRpdG9yLXNwZWNpYWwtY2hhcmFjdGVyc1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1hdGgtZWRpdG9yLXRvb2xiYXIgbWF0aC1lZGl0b3ItbGlzdFwiIGRhdGEtanM9XCJjaGFyYWN0ZXJzTGlzdFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1hdGgtZWRpdG9yLWVxdWF0aW9uIG1hdGgtZWRpdG9yLXRvb2xiYXIgbWF0aC1lZGl0b3ItbGlzdCBtYXRoLWVkaXRvci1oaWRkZW5cIiBkYXRhLWpzPVwibWF0aFRvb2xiYXJcIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm1hdGgtZWRpdG9yLW5ldy1lcXVhdGlvbiBtYXRoLWVkaXRvci1idXR0b24gbWF0aC1lZGl0b3ItYnV0dG9uLWFjdGlvblwiIGRhdGEtanM9XCJuZXdFcXVhdGlvblwiIHRpdGxlPVwiQ3RybC1MXCI+JHtsLmluc2VydEVxdWF0aW9ufTwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBgKVxuICAgIGNvbnN0ICRuZXdFcXVhdGlvbiA9ICR0b29sYmFyLmZpbmQoJ1tkYXRhLWpzPVwibmV3RXF1YXRpb25cIl0nKVxuICAgIGNvbnN0ICRtYXRoVG9vbGJhciA9ICR0b29sYmFyLmZpbmQoJ1tkYXRhLWpzPVwibWF0aFRvb2xiYXJcIl0nKVxuICAgIGluaXRTcGVjaWFsQ2hhcmFjdGVyVG9vbGJhcigkdG9vbGJhciwgbWF0aEVkaXRvciwgaGFzQW5zd2VyRm9jdXMpXG4gICAgaW5pdE1hdGhUb29sYmFyKCRtYXRoVG9vbGJhciwgbWF0aEVkaXRvcilcbiAgICBpbml0TmV3RXF1YXRpb24oJG5ld0VxdWF0aW9uLCBtYXRoRWRpdG9yLCBoYXNBbnN3ZXJGb2N1cylcblxuICAgIGZ1bmN0aW9uIHRvZ2dsZU1hdGhUb29sYmFyKGlzVmlzaWJsZSkge1xuICAgICAgICAkbmV3RXF1YXRpb24udG9nZ2xlKCFpc1Zpc2libGUpXG4gICAgICAgICRtYXRoVG9vbGJhci50b2dnbGUoaXNWaXNpYmxlKVxuICAgIH1cblxuICAgIHJldHVybiB7ICR0b29sYmFyLCB0b2dnbGVNYXRoVG9vbGJhciB9XG59XG5cbmZ1bmN0aW9uIGluaXRTcGVjaWFsQ2hhcmFjdGVyVG9vbGJhcigkdG9vbGJhciwgbWF0aEVkaXRvciwgaGFzQW5zd2VyRm9jdXMpIHtcbiAgICAkdG9vbGJhci5maW5kKCdbZGF0YS1qcz1cImNoYXJhY3RlcnNMaXN0XCJdJylcbiAgICAgICAgLmFwcGVuZChzcGVjaWFsQ2hhcmFjdGVycy5tYXAoY2hhciA9PiBgPGJ1dHRvbiBjbGFzcz1cIm1hdGgtZWRpdG9yLWJ1dHRvbiBtYXRoLWVkaXRvci1idXR0b24tZ3JpZCR7Y2hhci5wb3B1bGFyID8gJyBtYXRoLXBvcHVsYXInIDonJ31cIiAke2NoYXIubGF0ZXhDb21tYW5kID8gYGRhdGEtY29tbWFuZD1cIiR7Y2hhci5sYXRleENvbW1hbmR9XCJgIDogJyd9PiR7Y2hhci5jaGFyYWN0ZXJ9PC9idXR0b24+YCkpXG4gICAgICAgIC5vbignbW91c2Vkb3duJywgJ2J1dHRvbicsIGUgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICBjb25zdCBjaGFyYWN0ZXIgPSBlLmN1cnJlbnRUYXJnZXQuaW5uZXJUZXh0XG4gICAgICAgICAgICBjb25zdCBjb21tYW5kID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY29tbWFuZFxuICAgICAgICAgICAgaWYgKGhhc0Fuc3dlckZvY3VzKCkpIHdpbmRvdy5kb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0VGV4dCcsIGZhbHNlLCBjaGFyYWN0ZXIpXG4gICAgICAgICAgICBlbHNlIG1hdGhFZGl0b3IuaW5zZXJ0TWF0aChjb21tYW5kIHx8IGNoYXJhY3RlcilcbiAgICAgICAgfSlcbn1cblxuZnVuY3Rpb24gaW5pdE1hdGhUb29sYmFyKCRtYXRoVG9vbGJhciwgbWF0aEVkaXRvcikge1xuICAgICRtYXRoVG9vbGJhci5hcHBlbmQobGF0ZXhDb21tYW5kc1xuICAgICAgICAubWFwKG8gPT4gYDxidXR0b24gdGl0bGU9XCIke28uYWN0aW9ufVwiIGNsYXNzPVwibWF0aC1lZGl0b3ItYnV0dG9uIG1hdGgtZWRpdG9yLWJ1dHRvbi1ncmlkXCIgZGF0YS1jb21tYW5kPVwiJHtvLmFjdGlvbn1cIiBkYXRhLWxhdGV4Y29tbWFuZD1cIiR7by5sYWJlbH1cIiBkYXRhLXVzZXdyaXRlPVwiJHtvLnVzZVdyaXRlIHx8IGZhbHNlfVwiPlxuPGltZyBzcmM9XCIvbWF0aC5zdmc/bGF0ZXg9JHtlbmNvZGVVUklDb21wb25lbnQoby5sYWJlbCA/IG8ubGFiZWwucmVwbGFjZSgvWC9nLCAnXFxcXHNxdWFyZScpIDogby5hY3Rpb24pfVwiLz5cbjwvYnV0dG9uPmApLmpvaW4oJycpXG4gICAgKS5vbignbW91c2Vkb3duJywgJ2J1dHRvbicsIGUgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgY29uc3QgZGF0YXNldCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0O1xuICAgICAgICBtYXRoRWRpdG9yLmluc2VydE1hdGgoZGF0YXNldC5jb21tYW5kLCBkYXRhc2V0LmxhdGV4Y29tbWFuZCwgZGF0YXNldC51c2V3cml0ZSA9PT0gJ3RydWUnKVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGluaXROZXdFcXVhdGlvbigkbmV3RXF1YXRpb24sIG1hdGhFZGl0b3IsIGhhc0Fuc3dlckZvY3VzKSB7XG4gICAgJG5ld0VxdWF0aW9uLm1vdXNlZG93bigoZSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBpZiAoIWhhc0Fuc3dlckZvY3VzKCkpIHJldHVybiAvLyBUT0RPOiByZW1vdmUgd2hlbiBidXR0b24gaXMgb25seSB2aXNpYmxlIHdoZW4gdGV4dGFyZWEgaGFzIGZvY3VzXG4gICAgICAgIG1hdGhFZGl0b3IuaW5zZXJ0TmV3RXF1YXRpb24oKVxuICAgIH0pLmJpbmQodGhpcykpXG59XG4iLCJjb25zdCBzYW5pdGl6ZUh0bWwgPSByZXF1aXJlKCdzYW5pdGl6ZS1odG1sJylcbmNvbnN0IHNhbml0aXplT3B0cyA9IHJlcXVpcmUoJy4vc2FuaXRpemVPcHRzJylcblxubW9kdWxlLmV4cG9ydHMgPSB7aXNLZXksIGlzQ3RybEtleSwgaW5zZXJ0VG9UZXh0QXJlYUF0Q3Vyc29yLCBkZWNvZGVCYXNlNjRJbWFnZSwgc2FuaXRpemUsIHNhbml0aXplQ29udGVudH1cblxuZnVuY3Rpb24gc2FuaXRpemUoaHRtbCkge1xuICAgIHJldHVybiBzYW5pdGl6ZUh0bWwoaHRtbCwgc2FuaXRpemVPcHRzKVxufVxuZnVuY3Rpb24gaW5zZXJ0VG9UZXh0QXJlYUF0Q3Vyc29yKGZpZWxkLCB2YWx1ZSkge1xuICAgIGNvbnN0IHN0YXJ0UG9zID0gZmllbGQuc2VsZWN0aW9uU3RhcnRcbiAgICBjb25zdCBlbmRQb3MgPSBmaWVsZC5zZWxlY3Rpb25FbmRcbiAgICBsZXQgb2xkVmFsdWUgPSBmaWVsZC52YWx1ZVxuICAgIGZpZWxkLnZhbHVlID0gb2xkVmFsdWUuc3Vic3RyaW5nKDAsIHN0YXJ0UG9zKSArIHZhbHVlICsgb2xkVmFsdWUuc3Vic3RyaW5nKGVuZFBvcywgb2xkVmFsdWUubGVuZ3RoKVxuICAgIGZpZWxkLnNlbGVjdGlvblN0YXJ0ID0gZmllbGQuc2VsZWN0aW9uRW5kID0gc3RhcnRQb3MgKyB2YWx1ZS5sZW5ndGhcbn1cblxuZnVuY3Rpb24gZGVjb2RlQmFzZTY0SW1hZ2UoZGF0YVN0cmluZykge1xuICAgIGlmICghZGF0YVN0cmluZylcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICBjb25zdCBtYXRjaGVzID0gZGF0YVN0cmluZy5tYXRjaCgvXmRhdGE6KFtBLVphLXotK1xcL10rKTtiYXNlNjQsKC4rKSQvKVxuICAgIGlmIChtYXRjaGVzLmxlbmd0aCAhPT0gMykge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBtYXRjaGVzWzFdLFxuICAgICAgICBkYXRhOiBuZXcgQnVmZmVyKG1hdGNoZXNbMl0sICdiYXNlNjQnKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNLZXkoZSwga2V5KSB7IHJldHVybiBwcmV2ZW50SWZUcnVlKGUsICFlLmFsdEtleSAmJiAhZS5zaGlmdEtleSAmJiAhZS5jdHJsS2V5ICAmJiBrZXlPcktleUNvZGUoZSwga2V5KSl9XG5cbmZ1bmN0aW9uIGlzQ3RybEtleShlLCBrZXkpIHsgcmV0dXJuIHByZXZlbnRJZlRydWUoZSwgIWUuYWx0S2V5ICYmICFlLnNoaWZ0S2V5ICYmIGUuY3RybEtleSAmJiBrZXlPcktleUNvZGUoZSwga2V5KSl9XG5cbmZ1bmN0aW9uIGtleU9yS2V5Q29kZShlLCB2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnID8gZS5rZXkgPT09IHZhbCA6IGUua2V5Q29kZSA9PT0gdmFsIH1cbmZ1bmN0aW9uIHByZXZlbnRJZlRydWUoZSwgdmFsKSB7XG4gICAgaWYodmFsKSBlLnByZXZlbnREZWZhdWx0KClcbiAgICByZXR1cm4gdmFsXG59XG5cbmZ1bmN0aW9uIHNhbml0aXplQ29udGVudChhbnN3ZXJFbGVtZW50KSB7XG4gICAgY29uc3QgJGFuc3dlckVsZW1lbnQgPSAkKGFuc3dlckVsZW1lbnQpXG4gICAgY29uc3QgJG1hdGhFZGl0b3IgPSAkYW5zd2VyRWxlbWVudC5maW5kKCdbZGF0YS1qcz1cIm1hdGhFZGl0b3JcIl0nKVxuICAgICRtYXRoRWRpdG9yLmhpZGUoKVxuICAgIGNvbnN0IHRleHQgPSAkYW5zd2VyRWxlbWVudC50ZXh0KClcbiAgICAkbWF0aEVkaXRvci5zaG93KClcblxuICAgIGNvbnN0IGh0bWwgPSBzYW5pdGl6ZSgkYW5zd2VyRWxlbWVudC5odG1sKCkpXG5cbiAgICByZXR1cm4geyBhbnN3ZXJIVE1MOiBodG1sLCBhbnN3ZXJUZXh0OiB0ZXh0IH1cbn1cbiJdfQ==
