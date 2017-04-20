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
    var mqEditTimeout = void 0;
    function onMqEdit() {
        clearTimeout(mqEditTimeout);
        mqEditTimeout = setTimeout(function () {
            if (latexEditorFocus) return;
            var latex = mqInstance.latex();
            $latexEditor.val(latex);
            updateMathImg($mathEditorContainer.prev(), latex);
        }, 100);
    }
    var mqInstance = MQ.MathField($equationEditor.get(0), {
        handlers: {
            edit: onMqEdit,
            enter: function enter(field) {
                // TODO: do not close editor / o not create  a new equation if there is no text?
                mathEditor.closeMathEditor(true);
                setTimeout(function () {
                    return insertNewEquation('<div></div>');
                }, 2);
            }
        }
    });
    $equationEditor.on('keydown', '.mq-textarea textarea', onMqEdit);

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
    Bacon.combineAsArray(markAndGetInlineImages($editor).map(function (data) {
        return Bacon.fromPromise(screenshotSaver(data).then(function (screenshotUrl) {
            return $editor.find('#' + data.id).attr('src', screenshotUrl).removeAttr('id');
        }).fail(function (e) {
            return $editor.find('#' + data.id).remove();
        }));
    })).onValue(function () {
        return $editor.trigger('input');
    });
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
            saver({ data: file, type: file.type, id: String(new Date().getTime()) }).then(function (screenshotUrl) {
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

module.exports = [{
    label: 'Perus',
    characters: [{ character: '≠', latexCommand: '\\neq', popular: true }, { character: '≈', latexCommand: '\\approx', popular: true }, { character: '≤', latexCommand: '\\leq', popular: true }, { character: '≥', latexCommand: '\\geq', popular: true }, { character: '²', latexCommand: '^2', popular: true }, { character: '³', latexCommand: '^3' }, { character: '½', latexCommand: '1/2', popular: true }, { character: '⅓', latexCommand: '1/3' }, { character: '±', latexCommand: '\\pm' }]
}, {
    label: 'Algebra',
    characters: [{ character: '∼', latexCommand: '\\sim' }, { character: '≡', latexCommand: '\\equiv', popular: true }, { character: '≢' }, // \nequiv or \not\equiv
    { character: '·', latexCommand: '\\cdot', popular: true }, { character: '…', latexCommand: '\\dots' }, // matriisialgebra?
    { character: '∞', latexCommand: '\\infty', popular: true }]
}, {
    label: 'Kreikkalaiset aakkoset',
    characters: [{ character: 'α', latexCommand: '\\alpha', popular: true }, { character: 'β', latexCommand: '\\beta', popular: true }, { character: 'δ', latexCommand: '\\delta' }, { character: 'ε', latexCommand: '\\varepsilon' }, { character: 'η', latexCommand: '\\eta' }, { character: '∂', latexCommand: '\\partial' }, { character: '𝜄', latexCommand: '\\iota' }, { character: 'λ', latexCommand: '\\lambda', popular: true }, { character: 'µ', latexCommand: '\\mu', popular: true }, { character: 'π', latexCommand: '\\pi', popular: true }, { character: 'σ', latexCommand: '\\sigma' }, { character: 'τ', latexCommand: '\\tau' }, { character: 'Ф', latexCommand: '\\phi' }, { character: 'ω', latexCommand: '\\omega' }, { character: 'Γ', latexCommand: '\\Gamma' }, { character: 'Δ', latexCommand: '\\Delta', popular: true }, { character: 'Θ', latexCommand: '\\Theta' }, { character: '∏', latexCommand: '\\Pi' }, { character: '∑', latexCommand: '\\Sigma', popular: true }, { character: 'Φ', latexCommand: '\\Phi' }, { character: 'Ω', latexCommand: '\\Omega' }]
}, {
    label: 'Geometria ja vektorioppi',
    characters: [{ character: '°', popular: true }, { character: '↑', latexCommand: '\\uparrow' }, { character: '⇅' }, { character: '∠', latexCommand: '\\angle', popular: true }, { character: '⊥', latexCommand: '\\perp', popular: true }, { character: '‖', latexCommand: '\\parallel', popular: true }, { character: '↓', latexCommand: '\\downarrow' }, { character: '↔', latexCommand: '\\leftrightarrow' }, { character: '⇌' } // \rightleftharpoons
    ]
}, {
    label: 'Logiikka ja joukko-oppi',
    characters: [{ character: '⇒', latexCommand: '\\Rightarrow', popular: true }, { character: '⇔', latexCommand: '\\Leftrightarrow', popular: true }, { character: '∧', latexCommand: '\\and' }, { character: '∨', latexCommand: '\\or' }, { character: '¬' }, { character: '∃', latexCommand: '\\exists', popular: true }, { character: '∀', latexCommand: '\\forall', popular: true }, { character: '∩', latexCommand: '\\cap' }, { character: '∪', latexCommand: '\\cup' }, { character: '∖', latexCommand: '\\setminus' }, { character: '⊂', latexCommand: '\\subset' }, { character: '⊄', latexCommand: '\\notsubset' }, { character: '∈', latexCommand: '\\in', popular: true }, { character: '∉', latexCommand: '\\notin', popular: true }, { character: '∅', latexCommand: '\\empty' }, { character: '→', latexCommand: '\\rightarrow' }, { character: '∘', latexCommand: '\\circ' }, { character: '∼', latexCommand: '\\sim' }, { character: 'ℝ' }, { character: 'ℕ', popular: true }, { character: 'ℤ', popular: true }, { character: 'ℚ' }]
}];

},{}],7:[function(require,module,exports){
'use strict';

var specialCharacterGroups = require('./specialCharacters');
var latexCommands = require('./latexCommands');

module.exports = {
    init: init
};

function init(mathEditor, hasAnswerFocus, l) {
    var $toolbar = $('        \n        <div class="math-editor-tools" data-js="tools">\n            <div class="math-editor-characters" data-js="characters">\n              <div class="math-editor-toolbar math-editor-list" data-js="charactersList"></div>\n            </div>\n            <div class="math-editor-equation math-editor-toolbar math-editor-list math-editor-hidden" data-js="mathToolbar"></div>\n            <div>\n                <button class="math-editor-new-equation math-editor-button math-editor-button-action" data-js="newEquation" data-title="Ctrl-L">\u03A3 ' + l.insertEquation + '</button>\n            </div>\n        </div>\n        ');
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

var specialCharacterToButton = function specialCharacterToButton(char) {
    return '<button class="math-editor-button math-editor-button-grid' + (char.popular ? ' math-editor-characters-popular' : '') + '" ' + (char.latexCommand ? 'data-command="' + char.latexCommand + '"' : '') + ' data-title="' + (char.latexCommand || char.character) + '">' + char.character + '</button>';
};

var popularInGroup = function popularInGroup(group) {
    return group.characters.filter(function (character) {
        return character.popular;
    }).length;
};

function initSpecialCharacterToolbar($toolbar, mathEditor, hasAnswerFocus) {
    var gridButtonWidthPx = 35;

    $toolbar.find('[data-js="charactersList"]').append(specialCharacterGroups.map(function (group) {
        return '<div class="math-editor-characters-group" \n                  style="width: ' + popularInGroup(group) * gridButtonWidthPx + 'px">\n                  ' + group.characters.map(specialCharacterToButton).join('') + '\n             </div>';
    })).append('<button class="math-editor-characters-expand-collapse"></button>').on('mousedown', 'button', function (e) {
        e.preventDefault();

        if ($(e.currentTarget).hasClass('math-editor-characters-expand-collapse')) {
            $toolbar.find('[data-js="characters"]').toggleClass('math-editor-characters-expanded');
        } else {
            var character = e.currentTarget.innerText;
            var command = e.currentTarget.dataset.command;
            if (hasAnswerFocus()) window.document.execCommand('insertText', false, character);else mathEditor.insertMath(command || character);
        }
    });
}

function initMathToolbar($mathToolbar, mathEditor) {
    $mathToolbar.append(latexCommands.map(function (o) {
        return '<button data-title="' + o.action + '" class="math-editor-button math-editor-button-grid" data-command="' + o.action + '" data-latexcommand="' + o.label + '" data-usewrite="' + (o.useWrite || false) + '">\n<img src="/math.svg?latex=' + encodeURIComponent(o.label ? o.label.replace(/X/g, '\\square') : o.action) + '"/>\n</button>';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvRkkuanMiLCJhcHAvU1YuanMiLCJhcHAvbGF0ZXhDb21tYW5kcy5qcyIsImFwcC9tYXRoLWVkaXRvci5qcyIsImFwcC9zYW5pdGl6ZU9wdHMuanMiLCJhcHAvc3BlY2lhbENoYXJhY3RlcnMuanMiLCJhcHAvdG9vbGJhcnMuanMiLCJhcHAvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsWUFBUTtBQUNKLG9CQUFZLGdCQURSO0FBRUosZUFBTyx5Q0FGSDtBQUdKLGtoQkFISTtBQVdKLHFEQVhJO0FBWUosNGRBWkk7QUF1Qkosb0JBQVksVUF2QlI7QUF3QkosMkJBQW1CLGVBeEJmO0FBeUJKLHdCQUFnQixhQXpCWjtBQTBCSixlQUFPLE9BMUJIO0FBMkJKLGNBQU0sVUEzQkY7QUE0QkosaUJBQVMsWUE1Qkw7QUE2Qkosc0JBQWMsbUJBN0JWO0FBOEJKLGtCQUFVLEtBOUJOO0FBK0JKLG1CQUFXLFlBL0JQO0FBZ0NKLHFCQUFhO0FBaENULEtBREs7QUFtQ2IsZ0JBQVk7QUFDUixzQkFBYyxtQkFETjtBQUVSLGlCQUFTLFlBRkQ7QUFHUixvQkFBWSxnQkFISjtBQUlSLGVBQU8sV0FKQztBQUtSLGtCQUFVLEdBTEY7QUFNUix1QkFBZSxzQkFOUDtBQU9SLGNBQU0sb0JBUEU7QUFRUixrQkFBVSxlQVJGO0FBU1IsbUJBQVc7QUFUSDtBQW5DQyxDQUFqQjs7Ozs7QUNBQSxPQUFPLE9BQVAsR0FBaUI7QUFDYixZQUFRO0FBQ0osb0JBQVksaUJBRFI7QUFFSixlQUFPLDBDQUZIO0FBR0osNmhCQUhJO0FBUUosd0RBUkk7QUFTSixvWUFUSTtBQWtCSixvQkFBWSxhQWxCUjtBQW1CSiwyQkFBbUIsZUFuQmY7QUFvQkosd0JBQWdCLGtCQXBCWjtBQXFCSixlQUFPLE9BckJIO0FBc0JKLGNBQU0sT0F0QkY7QUF1QkosaUJB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UUFBTSxPQUFPLFNBQVMsZUFBZSxJQUFmLEVBQVQsQ0FBYjs7QUFFQSxXQUFPLEVBQUUsWUFBWSxJQUFkLEVBQW9CLFlBQVksSUFBaEMsRUFBUDtBQUNIIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGVkaXRvcjoge1xuICAgICAgICBtYXRoRWRpdG9yOiAnTWF0aWtrYWVkaXRvcmknLFxuICAgICAgICB0aXRsZTogJ0thYXZhZWRpdG9yaW4gZW5zaW1tw6RpbmVuIGtlaGl0eXN2ZXJzaW8nLFxuICAgICAgICBkZXNjcmlwdGlvbjogYDx1bD5cbjxsaT5FZGl0b3JpIHRvaW1paSBwYXJoYWl0ZW4gRmlyZWZveC1zZWxhaW1lbGxhLjwvbGk+XG48bGk+4oCcTGlzw6TDpCBrYWF2YeKAnSAtbmFwaW4gYWx0YSBsw7Z5ZMOkdCB5bGVpc2ltcGnDpCBtYXRlbWF0aWlrYXNzYSwgZnlzaWlrYXNzYSBqYVxua2VtaWFzc2Ega8OkeXRldHTDpHZpw6QgbWVya2ludMO2asOkLiBMaXPDpGtzaSBlcmlrb2lzbWVya2tlasOkIHZvaSBrw6R5dHTDpMOkIGthYXZhbiBraXJqb2l0dGFtaXNlZW4uPC9saT5cbiA8bGk+S2Fhdm9qYSB2b2kgcmFrZW50YWFcbmtsaWtrYWFtYWxsYSB2YWxpa29uIG1lcmtpbnTDtmrDpCBqYS90YWkga2lyam9pdHRhbWFsbGEgTGFUZVhpYS48L2xpPlxuIDxsaT5FZGl0b3JpbiB2YXN0YXVza2VudHTDpMOkbiB2b2kga2lyam9pdHRhYSB0ZWtzdGnDpCBqYSBrYWF2b2phIHNla8OkXG5saXPDpHTDpCBrdXZpYS48L2xpPjwvdWw+YCxcbiAgICAgICAgc2hvcnRjdXRUaXRsZTogYFBpa2Fuw6RwcMOkaW52aW5ra2Vqw6RgLFxuICAgICAgICBzaG9ydGN1dHM6IGA8dGFibGU+PHRib2R5PlxuPHRyPjx0aD5MaWl0w6Qga3V2YSBsZWlrZXDDtnlkw6RsdMOkPC90aD48dGQ+Q3RybC1WPC90ZD48L3RyPlxuPHRyPjx0aD5LaXJqb2l0YSBrYWF2YTwvdGg+PHRkPkN0cmwtTCB0YWkgQ3RybC1JPC90ZD48L3RyPlxuPHRyPjx0aCBjb2xzcGFuPVwiMlwiPkthYXZhc3NhPC90aD48L3RyPlxuPHRyPjx0aD5KYWtvdmlpdmE8L3RoPjx0ZD4vPC90ZD48L3RyPlxuPHRyPjx0aD5LZXJ0b21lcmtraTwvdGg+PHRkPio8L3RkPjwvdHI+XG48dHI+PHRoPkVrc3BvbmVudHRpPC90aD48dGQ+XjwvdGQ+PC90cj5cbjx0cj48dGg+U3VsamUga2FhdmE8L3RoPjx0ZD5DdHJsLUVudGVyIHRhaSBFc2M8L3RkPjwvdHI+XG48dHI+PHRoPkxpc8Okw6Qga2FhdmEgc2V1cmFhdmFsbGUgcml2aWxsZTwvdGg+PHRkPkVudGVyPC90ZD48L3RyPlxuPC90Ym9keT5cbjwvdGFibGU+YCxcbiAgICAgICAgZm9ybWF0dGluZzogJ011b3RvaWx1JyxcbiAgICAgICAgc3BlY2lhbENoYXJhY3RlcnM6ICdFcmlrb2lzbWVya2l0JyxcbiAgICAgICAgaW5zZXJ0RXF1YXRpb246ICdMaXPDpMOkIGthYXZhJyxcbiAgICAgICAgY2xvc2U6ICdzdWxqZScsXG4gICAgICAgIHNhdmU6ICdUYWxsZW5uYScsXG4gICAgICAgIHVwZGF0ZWQ6ICdQw6Rpdml0ZXR0eScsXG4gICAgICAgIHNlbmRGZWVkYmFjazogJ0zDpGhldMOkIHBhbGF1dGV0dGEnLFxuICAgICAgICBsYW5nTGluazogJy9zdicsXG4gICAgICAgIGxhbmdMYWJlbDogJ1DDpSBzdmVuc2thJyxcbiAgICAgICAgYW5zd2VyVGl0bGU6ICdWYXN0YXVzJ1xuICAgIH0sXG4gICAgYW5ub3RhdGluZzoge1xuICAgICAgICBzZW5kRmVlZGJhY2s6ICdMw6RoZXTDpCBwYWxhdXRldHRhJyxcbiAgICAgICAgdXBkYXRlZDogJ1DDpGl2aXRldHR5JyxcbiAgICAgICAgbWF0aEVkaXRvcjogJ01hdGlra2FlZGl0b3JpJyxcbiAgICAgICAgdGl0bGU6ICdBcnZvc3RlbHUnLFxuICAgICAgICBiYWNrTGluazogJy8nLFxuICAgICAgICBiYWNrTGlua0xhYmVsOiAnUGFsYWEga2FhdmFlZGl0b3JpaW4nLFxuICAgICAgICBzYXZlOiAnVGFsbGVubmEgbWVya2lubsOkdCcsXG4gICAgICAgIGxhbmdMaW5rOiAnL3N2L2JlZG9tbmluZycsXG4gICAgICAgIGxhbmdMYWJlbDogJ1DDpSBzdmVuc2thJ1xuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGVkaXRvcjoge1xuICAgICAgICBtYXRoRWRpdG9yOiAnTWF0ZW1hdGlrZWRpdG9yJyxcbiAgICAgICAgdGl0bGU6ICdGb3JtZWxlZGl0b3JucyBmw7Zyc3RhIHV0dmVja2xpbmdzdmVyc2lvbicsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBgPHVsPlxuPGxpPkVkaXRvcm4gZnVuZ2VyYXIgYsOkc3QgbWVkIGJyb3dzZXJuIEZpcmVmb3guPC9saT5cbiA8bGk+VW5kZXIga25hcHBlbiDigJxMw6RnZyB0aWxsIGZvcm1lbOKAnSBoaXR0YXIgZHUgZGUgdmFubGlnYXN0ZSBiZXRlY2tuaW5nYXJuYSBzb20gYW52w6RuZHMgaSBtYXRlbWF0aWssIGZ5c2lrIG9jaCBrZW1pLiBEZXNzdXRvbSBrYW4gZHUgYW52w6RuZGEgc3BlY2lhbHRlY2tlbiBmw7ZyIGF0dCBza3JpdmEgZm9ybWxlci48L2xpPlxuPGxpPkRldCBnw6VyIGF0dCBrb25zdHJ1ZXJhIGZvcm1sZXIgZ2Vub20gYXR0IGtsaWNrYSBww6UgYmV0ZWNrbmluZ2FybmEgaSBtZW55ZXJuYSBvY2gvZWxsZXIgZ2Vub20gYXR0IHNrcml2YSBMYVRlWC48L2xpPlxuPGxpPkRldCBnw6VyIGbDtnJ1dG9tIGF0dCBza3JpdmEgdGV4dCBvY2ggZm9ybWxlciwgYXR0IG9ja3PDpSBhdHQgbMOkZ2dhIHRpbGwgYmlsZGVyIGkgc3ZhcnNmw6RsdGV0LjwvbGk+PC91bD5gLFxuICAgICAgICBzaG9ydGN1dFRpdGxlOiBgVGlwcyBww6UgdGFuZ2VudGtvbWJpbmF0aW9uZXJgLFxuICAgICAgICBzaG9ydGN1dHM6IGA8dGFibGU+PHRib2R5PlxuPHRyPjx0aD5Mw6RnZyB0aWxsIGVuIGJpbGQgZnLDpW4gdXJrbGlwcGV0PC90aD48dGQ+Q3RybC1WPC90ZD48L3RyPlxuPHRyPjx0aD5Ta3JpdiBlbiBmb3JtZWw8L3RoPjx0ZD5DdHJsLUwgLyBDdHJsLUk8L3RkPjwvdHI+XG48dHI+PHRoIGNvbHNwYW49XCIyXCI+SSBmb3JtZWxuIDwvdGg+PC90cj5cbjx0cj48dGg+QnLDpWtzdHJlY2s8L3RoPjx0ZD4vPC90ZD48L3RyPlxuPHRyPjx0aD5NdWx0aXBsaWthdGlvbnN0ZWNrZW48L3RoPjx0ZD4qPC90ZD48L3RyPlxuPHRyPjx0aD5TdMOkbmcgZm9ybWVsbjwvdGg+PHRkPkN0cmwtRW50ZXIgZWxsZXIgRXNjPC90ZD48L3RyPlxuPC90Ym9keT5cbjwvdGFibGU+YCxcbiAgICAgICAgZm9ybWF0dGluZzogJ0Zvcm1hdGVyaW5nJyxcbiAgICAgICAgc3BlY2lhbENoYXJhY3RlcnM6ICdTcGVjaWFsdGVja2VuJyxcbiAgICAgICAgaW5zZXJ0RXF1YXRpb246ICdMw6RnZyB0aWxsIGZvcm1lbCcsXG4gICAgICAgIGNsb3NlOiAnc3TDpG5nJyxcbiAgICAgICAgc2F2ZTogJ1NwYXJhJyxcbiAgICAgICAgdXBkYXRlZDogJ1VwcGRhdGVyYWQnLFxuICAgICAgICBzZW5kRmVlZGJhY2s6ICdTa2lja2EgZmVlZGJhY2snLFxuICAgICAgICBsYW5nTGluazogJy8nLFxuICAgICAgICBsYW5nTGFiZWw6ICdTdW9tZWtzaScsXG4gICAgICAgIGFuc3dlclRpdGxlOiAnU3ZhcidcbiAgICB9LFxuICAgIGFubm90YXRpbmc6IHtcbiAgICAgICAgc2VuZEZlZWRiYWNrOiAnU2tpY2thIHJlc3BvbnMnLFxuICAgICAgICB1cGRhdGVkOiAnVXBwZGF0ZXJhZCcsXG4gICAgICAgIG1hdGhFZGl0b3I6ICdNYXRlbWF0aWtlZGl0b3InLFxuICAgICAgICB0aXRsZTogJ0JlZMO2bW5pbmcnLFxuICAgICAgICBiYWNrTGluazogJy9zdicsXG4gICAgICAgIGJhY2tMaW5rTGFiZWw6ICdNYXRlbWF0aWtlZGl0b3InLFxuICAgICAgICBzYXZlOiAnU3BhcmEgYW50ZWNrbmluZ2FyJyxcbiAgICAgICAgbGFuZ0xpbms6ICcvdGFya2lzdHVzJyxcbiAgICAgICAgbGFuZ0xhYmVsOiAnU3VvbWVrc2knXG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gICAge2FjdGlvbjogJ1xcXFxzcXJ0JywgbGFiZWw6ICdcXFxcc3FydHtYfSd9LFxuICAgIHthY3Rpb246ICdeJywgbGFiZWw6ICd4XntYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcZnJhYycsIGxhYmVsOiAnXFxcXGZyYWN7WH17WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGludCcsIGxhYmVsOiAnXFxcXGludF97WH1ee1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxsaW1fJywgbGFiZWw6ICdcXFxcbGltX3tYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcbGltX3t4XFxcXHJpZ2h0YXJyb3dcXFxcaW5mdHl9JywgbGFiZWw6ICdcXFxcbGltX3t4XFxcXHJpZ2h0YXJyb3dcXFxcaW5mdHl9JywgdXNlV3JpdGU6dHJ1ZX0sXG4gICAge2FjdGlvbjogJ1xcXFxvdmVycmlnaHRhcnJvdycsIGxhYmVsOiAnXFxcXG92ZXJyaWdodGFycm93e1h9J30sXG4gICAge2FjdGlvbjogJ18nLCBsYWJlbDogJ3hfWCd9LFxuICAgIHthY3Rpb246ICdcXFxcbnRocm9vdCcsIGxhYmVsOiAnXFxcXHNxcnRbWF17WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXHN1bScsIGxhYmVsOiAnXFxcXHN1bV97WH1ee1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxiaW5vbScsIGxhYmVsOiAnXFxcXGJpbm9te1h9e1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxzaW4nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGNvcyd9LFxuICAgIHthY3Rpb246ICdcXFxcdGFuJ30sXG4gICAge2FjdGlvbjogJ1xcXFx2ZWMnLCBsYWJlbDogJ1xcXFx2ZWN7WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGJhcicsIGxhYmVsOiAnXFxcXGJhcntYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcmxpbmV7XFxcXHRleHR7aX19JywgdXNlV3JpdGU6IHRydWV9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcmxpbmV7XFxcXHRleHR7an19JywgdXNlV3JpdGU6IHRydWV9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcmxpbmV7XFxcXHRleHR7a319JywgdXNlV3JpdGU6IHRydWV9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcmxlZnRhcnJvdycsIGxhYmVsOiAnXFxcXG92ZXJsZWZ0YXJyb3d7WH0nfSxcbiAgICB7YWN0aW9uOiAnfCcsIGxhYmVsOiAnfFh8J30sXG4gICAge2FjdGlvbjogJygnLCBsYWJlbDogJyhYKSd9LFxuICAgIHthY3Rpb246ICdfeyB9XnsgfSAnLCBsYWJlbDogJ197WH1ee1h9WCcsIHVzZVdyaXRlOiB0cnVlfSxcbiAgICB7YWN0aW9uOiAnXFxcXHRleHQnLCBsYWJlbDogJ1xcXFx0ZXh0e1R9J30sXG5dXG4iLCJjb25zdCB7aXNDdHJsS2V5LCBpc0tleSwgZGVjb2RlQmFzZTY0SW1hZ2UsIGluc2VydFRvVGV4dEFyZWFBdEN1cnNvciwgc2FuaXRpemVDb250ZW50LCBzYW5pdGl6ZX0gPSByZXF1aXJlKCcuL3V0aWwnKVxuY29uc3QgdG9vbGJhcnMgPSByZXF1aXJlKCcuL3Rvb2xiYXJzJylcbmNvbnN0IE1RID0gTWF0aFF1aWxsLmdldEludGVyZmFjZSgyKVxuY29uc3QgbG9jYWxlcyA9IHtcbiAgICBGSTogcmVxdWlyZSgnLi9GSScpLFxuICAgIFNWOiByZXF1aXJlKCcuL1NWJylcbn1cbmNvbnN0IGwgPSBsb2NhbGVzW3dpbmRvdy5sb2NhbGUgfHwgJ0ZJJ10uZWRpdG9yXG5jb25zdCBrZXlDb2RlcyA9IHtcbiAgICBFTlRFUjogMTMsXG4gICAgRVNDOiAyN1xufVxuXG5jb25zdCAkb3V0ZXJQbGFjZWhvbGRlciA9ICQoYDxkaXYgY2xhc3M9XCJtYXRoLWVkaXRvci1oaWRkZW5cIiBkYXRhLWpzPVwib3V0ZXJQbGFjZWhvbGRlclwiPmApXG5cbmZ1bmN0aW9uIG1vdmVFbGVtZW50QWZ0ZXIoJGVsZW1lbnQsICRhZnRlcikge1xuICAgICRhZnRlci5hZnRlcigkZWxlbWVudClcbn1cblxuZnVuY3Rpb24gaGlkZUVsZW1lbnRJbkRPTSgkZWxlbWVudCkge1xuICAgICRvdXRlclBsYWNlaG9sZGVyLmFwcGVuZCgkZWxlbWVudClcbn1cblxuLy8gVE9ETzogcmVwbGFjZSB3aXRoIGRhdGEgYXR0cmlidXRlcz9cbmxldCBhbnN3ZXJGb2N1cyA9IHRydWVcbmxldCBsYXRleEVkaXRvckZvY3VzID0gZmFsc2VcbmxldCBlcXVhdGlvbkVkaXRvckZvY3VzID0gZmFsc2VcbmxldCBtYXRoRWRpdG9yVmlzaWJsZSA9IGZhbHNlXG5sZXQgJGN1cnJlbnRFZGl0b3JcblxuJCgnYm9keScpLmFwcGVuZCgkb3V0ZXJQbGFjZWhvbGRlcilcblxuY29uc3QgbWF0aEVkaXRvciA9IGluaXRNYXRoRWRpdG9yKClcbmNvbnN0IHskdG9vbGJhciwgdG9nZ2xlTWF0aFRvb2xiYXJ9ID0gdG9vbGJhcnMuaW5pdChtYXRoRWRpdG9yLCAoKSA9PiBhbnN3ZXJGb2N1cywgbClcblxuaGlkZUVsZW1lbnRJbkRPTSgkdG9vbGJhcilcblxuZnVuY3Rpb24gaW5pdE1hdGhFZGl0b3IoKSB7XG4gICAgY29uc3QgJG1hdGhFZGl0b3JDb250YWluZXIgPSAkKGBcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1hdGgtZWRpdG9yXCIgZGF0YS1qcz1cIm1hdGhFZGl0b3JcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYXRoLWVkaXRvci1ib3hlc1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYXRoLWVkaXRvci1lcXVhdGlvbi1lZGl0b3JcIiBkYXRhLWpzPVwiZXF1YXRpb25FZGl0b3JcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCJtYXRoLWVkaXRvci1sYXRleC1lZGl0b3JcIiBkYXRhLWpzPVwibGF0ZXhFZGl0b3JcIiBwbGFjZWhvbGRlcj1cIkxhVGV4XCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5gKVxuXG4gICAgaGlkZUVsZW1lbnRJbkRPTSgkbWF0aEVkaXRvckNvbnRhaW5lcilcblxuICAgIGNvbnN0ICRsYXRleEVkaXRvciA9ICRtYXRoRWRpdG9yQ29udGFpbmVyLmZpbmQoJ1tkYXRhLWpzPVwibGF0ZXhFZGl0b3JcIl0nKVxuICAgIGNvbnN0ICRlcXVhdGlvbkVkaXRvciA9ICRtYXRoRWRpdG9yQ29udGFpbmVyLmZpbmQoJ1tkYXRhLWpzPVwiZXF1YXRpb25FZGl0b3JcIl0nKVxuICAgIGxldCBtcUVkaXRUaW1lb3V0XG4gICAgZnVuY3Rpb24gb25NcUVkaXQoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChtcUVkaXRUaW1lb3V0KVxuICAgICAgICBtcUVkaXRUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAobGF0ZXhFZGl0b3JGb2N1cylcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIGNvbnN0IGxhdGV4ID0gbXFJbnN0YW5jZS5sYXRleCgpXG4gICAgICAgICAgICAkbGF0ZXhFZGl0b3IudmFsKGxhdGV4KVxuICAgICAgICAgICAgdXBkYXRlTWF0aEltZygkbWF0aEVkaXRvckNvbnRhaW5lci5wcmV2KCksIGxhdGV4KVxuICAgICAgICB9LCAxMDApXG4gICAgfVxuICAgIGNvbnN0IG1xSW5zdGFuY2UgPSBNUS5NYXRoRmllbGQoJGVxdWF0aW9uRWRpdG9yLmdldCgwKSwge1xuICAgICAgICBoYW5kbGVyczoge1xuICAgICAgICAgICAgZWRpdDogb25NcUVkaXQsXG4gICAgICAgICAgICBlbnRlcjogZmllbGQgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IGRvIG5vdCBjbG9zZSBlZGl0b3IgLyBvIG5vdCBjcmVhdGUgIGEgbmV3IGVxdWF0aW9uIGlmIHRoZXJlIGlzIG5vIHRleHQ/XG4gICAgICAgICAgICAgICAgbWF0aEVkaXRvci5jbG9zZU1hdGhFZGl0b3IodHJ1ZSlcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGluc2VydE5ld0VxdWF0aW9uKCc8ZGl2PjwvZGl2PicpLCAyKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbiAgICAkZXF1YXRpb25FZGl0b3Iub24oJ2tleWRvd24nLCAnLm1xLXRleHRhcmVhIHRleHRhcmVhJywgb25NcUVkaXQpXG5cbiAgICAkZXF1YXRpb25FZGl0b3JcbiAgICAgICAgLm9uKCdmb2N1cyBibHVyJywgJy5tcS10ZXh0YXJlYSB0ZXh0YXJlYScsIGUgPT4ge1xuICAgICAgICAgICAgZXF1YXRpb25FZGl0b3JGb2N1cyA9IGUudHlwZSAhPT0gJ2JsdXInICYmIGUudHlwZSAhPT0gJ2ZvY3Vzb3V0J1xuICAgICAgICAgICAgb25Gb2N1c0NoYW5nZWQoKVxuICAgICAgICB9KVxuXG4gICAgZnVuY3Rpb24gb25MYXRleFVwZGF0ZSgpIHtcbiAgICAgICAgdXBkYXRlTWF0aEltZygkbWF0aEVkaXRvckNvbnRhaW5lci5wcmV2KCksICRsYXRleEVkaXRvci52YWwoKSlcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBtcUluc3RhbmNlLmxhdGV4KCRsYXRleEVkaXRvci52YWwoKSksIDEpXG4gICAgfVxuXG4gICAgJGxhdGV4RWRpdG9yXG4gICAgICAgIC5rZXl1cChvbkxhdGV4VXBkYXRlKVxuICAgICAgICAub24oJ2ZvY3VzIGJsdXInLCBlID0+IHtcbiAgICAgICAgICAgIGxhdGV4RWRpdG9yRm9jdXMgPSBlLnR5cGUgIT09ICdibHVyJ1xuICAgICAgICAgICAgb25Gb2N1c0NoYW5nZWQoKVxuICAgICAgICB9KVxuXG4gICAgbGV0IGZvY3VzQ2hhbmdlZCA9IG51bGxcblxuICAgIGZ1bmN0aW9uIG9uRm9jdXNDaGFuZ2VkKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoZm9jdXNDaGFuZ2VkKVxuICAgICAgICBmb2N1c0NoYW5nZWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICghbGF0ZXhFZGl0b3JGb2N1cyAmJiAhZXF1YXRpb25FZGl0b3JGb2N1cykgY2xvc2VNYXRoRWRpdG9yKClcbiAgICAgICAgICAgIGlmICghYW5zd2VyRm9jdXMgJiYgIW1hdGhFZGl0b3JWaXNpYmxlICYmICFsYXRleEVkaXRvckZvY3VzICYmICFlcXVhdGlvbkVkaXRvckZvY3VzKSBvbkVkaXRvckJsdXIoKVxuICAgICAgICB9LCAwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc2VydE5ld0VxdWF0aW9uKG9wdGlvbmFsTWFya3VwKSB7XG4gICAgICAgIHdpbmRvdy5kb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0SFRNTCcsIGZhbHNlLCAob3B0aW9uYWxNYXJrdXAgPyBvcHRpb25hbE1hcmt1cCA6ICcnKSArICc8aW1nIGRhdGEtanM9XCJuZXdcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIi8+JylcbiAgICAgICAgY29uc3QgJGFkZGVkRXF1YXRpb25JbWFnZSA9ICQoJ1tkYXRhLWpzPVwibmV3XCJdJylcbiAgICAgICAgJGFkZGVkRXF1YXRpb25JbWFnZVxuICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2RhdGEtanMnKVxuXG4gICAgICAgIG1vdmVFbGVtZW50QWZ0ZXIoJG1hdGhFZGl0b3JDb250YWluZXIsICRhZGRlZEVxdWF0aW9uSW1hZ2UpXG5cbiAgICAgICAgbXFJbnN0YW5jZS5sYXRleCgnJylcbiAgICAgICAgbWF0aEVkaXRvclZpc2libGUgPSB0cnVlXG4gICAgICAgIHRvZ2dsZU1hdGhUb29sYmFyKHRydWUpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gbXFJbnN0YW5jZS5mb2N1cygpLCAwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc2VydE1hdGgoc3ltYm9sLCBhbHRlcm5hdGl2ZVN5bWJvbCwgdXNlV3JpdGUpIHtcbiAgICAgICAgaWYgKGxhdGV4RWRpdG9yRm9jdXMpIHtcbiAgICAgICAgICAgIGluc2VydFRvVGV4dEFyZWFBdEN1cnNvcigkbGF0ZXhFZGl0b3IuZ2V0KDApLCBhbHRlcm5hdGl2ZVN5bWJvbCB8fCBzeW1ib2wpXG4gICAgICAgICAgICBvbkxhdGV4VXBkYXRlKClcbiAgICAgICAgfSBlbHNlIGlmIChlcXVhdGlvbkVkaXRvckZvY3VzKSB7XG4gICAgICAgICAgICBpZiAodXNlV3JpdGUpIHtcbiAgICAgICAgICAgICAgICBtcUluc3RhbmNlLndyaXRlKHN5bWJvbClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbXFJbnN0YW5jZS50eXBlZFRleHQoc3ltYm9sKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc3ltYm9sLnN0YXJ0c1dpdGgoJ1xcXFwnKSkgbXFJbnN0YW5jZS5rZXlzdHJva2UoJ1RhYicpXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IG1xSW5zdGFuY2UuZm9jdXMoKSwgMClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZU1hdGhJbWcoJGltZywgbGF0ZXgpIHtcbiAgICAgICAgJGltZ1xuICAgICAgICAgICAgLnByb3AoJ3NyYycsICcvbWF0aC5zdmc/bGF0ZXg9JyArIGVuY29kZVVSSUNvbXBvbmVudChsYXRleCkpXG4gICAgICAgICAgICAucHJvcCgnYWx0JywgbGF0ZXgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvc2VNYXRoRWRpdG9yKHNldEZvY3VzQWZ0ZXJDbG9zZSA9IGZhbHNlKSB7XG4gICAgICAgIC8vIFRPRE86IHJlbW92ZSBldmVudCBiaW5kaW5nc1xuICAgICAgICBjb25zdCAkY3VycmVudEVkaXRvciA9ICRtYXRoRWRpdG9yQ29udGFpbmVyLmNsb3Nlc3QoJ1tkYXRhLWpzPVwiYW5zd2VyXCJdJylcbiAgICAgICAgY29uc3QgJGltZyA9ICRtYXRoRWRpdG9yQ29udGFpbmVyLnByZXYoKVxuICAgICAgICBpZiAoJGxhdGV4RWRpdG9yLnZhbCgpLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgICAgICAgICRpbWcucmVtb3ZlKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRpbWcuc2hvdygpXG4gICAgICAgICAgICB1cGRhdGVNYXRoSW1nKCRpbWcsICRsYXRleEVkaXRvci52YWwoKSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRvZ2dsZU1hdGhUb29sYmFyKGZhbHNlKVxuICAgICAgICBoaWRlRWxlbWVudEluRE9NKCRtYXRoRWRpdG9yQ29udGFpbmVyKVxuICAgICAgICBtYXRoRWRpdG9yVmlzaWJsZSA9IGZhbHNlXG4gICAgICAgIGxhdGV4RWRpdG9yRm9jdXMgPSBmYWxzZVxuICAgICAgICBlcXVhdGlvbkVkaXRvckZvY3VzID0gZmFsc2VcbiAgICAgICAgaWYgKHNldEZvY3VzQWZ0ZXJDbG9zZSkgJGN1cnJlbnRFZGl0b3IuZm9jdXMoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9wZW5NYXRoRWRpdG9yKCRpbWcpIHtcbiAgICAgICAgaWYgKG1hdGhFZGl0b3JWaXNpYmxlKSBjbG9zZU1hdGhFZGl0b3IoKVxuICAgICAgICAkaW1nLmhpZGUoKVxuICAgICAgICBtb3ZlRWxlbWVudEFmdGVyKCRtYXRoRWRpdG9yQ29udGFpbmVyLCAkaW1nKVxuICAgICAgICBjb25zdCBsYXRleCA9ICRpbWcucHJvcCgnYWx0JylcbiAgICAgICAgJGxhdGV4RWRpdG9yLnZhbChsYXRleClcbiAgICAgICAgb25MYXRleFVwZGF0ZSgpXG4gICAgICAgIG1hdGhFZGl0b3JWaXNpYmxlID0gdHJ1ZVxuICAgICAgICB0b2dnbGVNYXRoVG9vbGJhcih0cnVlKVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IG1xSW5zdGFuY2UuZm9jdXMoKSwgMClcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpbnNlcnROZXdFcXVhdGlvbixcbiAgICAgICAgaW5zZXJ0TWF0aCxcbiAgICAgICAgY2xvc2VNYXRoRWRpdG9yLFxuICAgICAgICBvcGVuTWF0aEVkaXRvcixcbiAgICAgICAgb25Gb2N1c0NoYW5nZWRcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG9uRWRpdG9yRm9jdXMoJGVsZW1lbnQpIHtcbiAgICAkY3VycmVudEVkaXRvciA9ICRlbGVtZW50XG4gICAgJGVsZW1lbnQuYmVmb3JlKCR0b29sYmFyKVxuICAgICR0b29sYmFyLnNob3coKVxufVxuXG5mdW5jdGlvbiBvbkVkaXRvckJsdXIoKSB7XG4gICAgLy8gVE9ETzogcmVtb3ZlIGV2ZW50IGJpbmRpbmdzXG4gICAgaGlkZUVsZW1lbnRJbkRPTSgkdG9vbGJhcilcbiAgICBtYXRoRWRpdG9yLmNsb3NlTWF0aEVkaXRvcigpXG4gICAgLy8gJGVkaXRvci5vZmYoKVxuXG4gICAgYW5zd2VyRm9jdXMgPSBmYWxzZVxuICAgIG1hdGhFZGl0b3JWaXNpYmxlID0gZmFsc2VcbiAgICBsYXRleEVkaXRvckZvY3VzID0gZmFsc2Vcbn1cblxubGV0IGJsdXJyZWRcblxuZnVuY3Rpb24gb25FZGl0b3JGb2N1c0NoYW5nZWQoZSkge1xuICAgIGFuc3dlckZvY3VzID0gZS50eXBlID09PSAnZm9jdXMnXG5cbiAgICBjbGVhclRpbWVvdXQoYmx1cnJlZClcbiAgICBibHVycmVkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICghYW5zd2VyRm9jdXMgJiYgIW1hdGhFZGl0b3JWaXNpYmxlICYmICFsYXRleEVkaXRvckZvY3VzICYmICFlcXVhdGlvbkVkaXRvckZvY3VzKSBvbkVkaXRvckJsdXIoKVxuICAgICAgICBlbHNlIGlmIChhbnN3ZXJGb2N1cyAmJiBtYXRoRWRpdG9yVmlzaWJsZSkgbWF0aEVkaXRvci5jbG9zZU1hdGhFZGl0b3IoKVxuICAgICAgICBlbHNlIG9uRWRpdG9yRm9jdXMoJChlLnRhcmdldCkpXG4gICAgfSwgMClcbn1cblxuZnVuY3Rpb24gaXNNYXRoRWRpdG9yVmlzaWJsZSgpIHtcbiAgICByZXR1cm4gbWF0aEVkaXRvclZpc2libGVcbn1cblxuY29uc3QgbWFya0FuZEdldElubGluZUltYWdlcyA9ICRlZGl0b3IgPT4ge1xuICAgIGNvbnN0IGxvYWRpbmdHaWYgPSBcImRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEVBQVFBUFFBQVAvLy93QUFBUER3OElxS2l1RGc0RVpHUm5wNmVnQUFBRmhZV0NRa0pLeXNyTDYrdmhRVUZKeWNuQVFFQkRZMk5taG9hQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQ0grR2tOeVpXRjBaV1FnZDJsMGFDQmhhbUY0Ykc5aFpDNXBibVp2QUNINUJBQUtBQUFBSWY4TFRrVlVVME5CVUVVeUxqQURBUUFBQUN3QUFBQUFFQUFRQUFBRmR5QWdBZ0lKSWVXb0FrUkNDTWRCa0t0SUhJbmd5TUtzRXJQQlliQURwa1NDd2hEbVFDQmV0aFJCNlZqNGtGQ2tRUEc0SWxXRGdyTlJJd25PNFVLQlhEdWZ6UXZETWFvU0RCZ0ZiODg2TWlRYWRnTkFCQW9rZkN3ekJBOExDZzBFZ2w4akFnZ0dBQTFrQklBMUJBWXpseUlMY3pVTEMyVWhBQ0g1QkFBS0FBRUFMQUFBQUFBUUFCQUFBQVYySUNBQ0FtbEFaVG1PUkVFSXlVRVFqTEtLeFBIQURoRXZxeGxnY0dna0dJMURZU1ZBSUFXTXgrbHdTS2tJQ0owUXNIaTlSZ0tCd25WVGlSUVFnd0Y0STRVRkRRUUV3aTYvM1lTR1dSUm1qaEVFVEFKZklnTUZDbkFLTTBLRFY0RUVFQVFMaUYxOFRBWU5YRGFTZTN4Nm1qaWROMXMzSVFBaCtRUUFDZ0FDQUN3QUFBQUFFQUFRQUFBRmVDQWdBZ0xaREdVNWpnUkVDRVVpQ0kreWlvU0R3REp5TEtzWG9IRlF4QlNIQW9BQUZCaHF0TUpnOERnUUJnZnJFc0pBRUFnNFloWklFaXdnS3RIaU1CZ3RwZzN3YlVaWEdPN2tPYjFNVUtSRk15c0NDaEFvZ2dKQ0lnMEdDMmFOZTRncVFsZGZMNGwvQWcxQVh5U0pnbjVMY29FM1FYSTNJUUFoK1FRQUNnQURBQ3dBQUFBQUVBQVFBQUFGZGlBZ0FnTFpOR1U1am9RaENFanhJc3NxRW84YkM5QlJqeTlBZzdHSUxRNFFFb0UwZ0JBRUJjT3BjQkEwRG94U0svZThMUklIbitpMWNLMEl5S2RnMFZBb2xqWUlnK0dnblJyd1ZTLzhJQWtJQ3lvc0JJUXBCQU1vS3k5ZElteFBoUytHS2tGcmtYK1RpZ3RMbEl5S1hVRitOamFnTmlFQUlma0VBQW9BQkFBc0FBQUFBQkFBRUFBQUJXd2dJQUlDYVJobE9ZNEVJZ2pIOFI3TEtoS0hHd3NNdmI0QUF5M1dPREJJQkJLQ3NZQTlUanVoRE5ES0VWU0VSZXpRRUwwV3JoWHVjUlVRR3VpazdiRmxuZ3pxVlc5TE1sOVhXdkxkakZhSnRERnFaMWNFWlVCMGRVZ3ZMM2RnUDRXSlpuNGprb21XTnBTVEl5RUFJZmtFQUFvQUJRQXNBQUFBQUJBQUVBQUFCWDRnSUFJQ3VTeGxPWTZDSWdpRDhSckVLZ3FHT3d4d1VyTWxBb1N3SXpBR3BKcGdvU0RBR2lmRFk1a29wQllEbEVwQVFCd2V2eGZCdFJJVUdpOHh3V2tETkJDSXdtQzlWcTBhaVFRRFF1SytWZ1FQRFhWOWhDSmpCd2NGWVU1cEx3d0hYUWNNS1NtTkxRY0lBRXhsYkg4SkJ3dHRhWDBBQkFjTmJXVmJLeUVBSWZrRUFBb0FCZ0FzQUFBQUFCQUFFQUFBQlhrZ0lBSUNTUkJsT1k3Q0lnaE44emJFS3NLb0lqZEZ6WmFFZ1VCSEtDaE1KdFJ3Y1dwQVdvV25pZm02RVNBTWhPOGxRSzBFRUFWM3JGb3BJQkNFY0d3REtBcVBoNEhVclk0SUNISDFkU29URmdjSFVpWmpCaEFKQjJBSER5a3BLQXdIQXdkemYxOUtrQVNJUGw5Y0RnY25Ea2R0TndpTUpDc2hBQ0g1QkFBS0FBY0FMQUFBQUFBUUFCQUFBQVYzSUNBQ0Fra1FaVG1PQWlvc2l5QW94Q3ErS1B4Q05Wc1NNUmdCc2lDbFdyTFRTV0ZvSVFaSGw2cGxlQmg2c3V4S01JaGx2emJBd2tCV2ZGV3JCUVR4TkxxMlJHMnloU1VrRHMyYjYzQVlEQW9KWEFjRlJ3QURlQWtKRFgwQVFDc0VmQVFNREFJUEJ6MHJDZ2N4a3kwSlJXRTFBbXdwS3lFQUlma0VBQW9BQ0FBc0FBQUFBQkFBRUFBQUJYa2dJQUlDS1p6a3FKNG5RWnhMcVpLdjROcU5MS0syL1E0RWs0bEZYQ2hzZzV5cEpqczFJSTNnRURVU1JJbkVHWUF3NkI2ek00SmhyREF0RW9zVmtMVXRIQTdSSGFIQUdKUUVqc09EY0VnMEZCQUZWZ2tRSlExcEF3Y0REdzhLY0Z0U0lud0pBb3dDQ0E2Ukl3cVpBZ2tQTmdWcFduZGpkeW9oQUNINUJBQUtBQWtBTEFBQUFBQVFBQkFBQUFWNUlDQUNBaW1jNUtpZUxFdVVLdm0yeEFLTHFEQ2ZDMkdhTzllTDBMQUJXVGlCWW1BMDZXNmtIZ3ZDcUVKaUFJSml1M2djdmdVc3NjSFVFUm0ra2FDeHl4YSt6UlBrMFNnSkVnZkl2YkFkSUFRTENBWWxDajREQncwSUJRc01DaklxQkFjUEFvb0NCZzlwS2dzSkx3VUZPaENaS3lRREEzWXFJUUFoK1FRQUNnQUtBQ3dBQUFBQUVBQVFBQUFGZFNBZ0FnSXBuT1Nvbm14YnFpVGhDckpLRUhGYm84SnhERE9aWUZGYitBNDFFNEg0T2hrT2lwWHdCRWxZSVREQWNrRkVPQmdNUTNhcmtNa1VCZHhJVUdacEViN2thUUJSbEFTUGcwRlFRSEFiRUVNR0RTVkVBQTFRQmhBRUQxRTBOZ3dGQW9vQ0RXbGphUUlRQ0U1cU1IY05oQ2tqSVFBaCtRUUFDZ0FMQUN3QUFBQUFFQUFRQUFBRmVTQWdBZ0lwbk9Tb0xneHh2cWdLTEVjQ0M2NUtFQUJ5S0s4Y1NwQTREQWlIUS9Ea0toR0toNFpDdEN5WkdvNkY2aVlZUEFxRmdZeTAyeGtTYUxFTVYzNHRFTHlSWU5Fc0NReUhsdldrR0N6c1BnTUNFQVk3Q2cwNFVrNDhMQXNEaFJBOE1WUVBFRjBHQWdxWVl3U1JseWNOY1dza0NrQXBJeUVBT3dBQUFBQUFBQUFBQUR4aWNpQXZQZ284WWo1WFlYSnVhVzVuUEM5aVBqb2dJRzE1YzNGc1gzRjFaWEo1S0NrZ1d6eGhJR2h5WldZOUoyWjFibU4wYVc5dUxtMTVjM0ZzTFhGMVpYSjVKejVtZFc1amRHbHZiaTV0ZVhOeGJDMXhkV1Z5ZVR3dllUNWRPaUJEWVc0bmRDQmpiMjV1WldOMElIUnZJR3h2WTJGc0lFMTVVMUZNSUhObGNuWmxjaUIwYUhKdmRXZG9JSE52WTJ0bGRDQW5MM1poY2k5eWRXNHZiWGx6Y1d4a0wyMTVjM0ZzWkM1emIyTnJKeUFvTWlrZ2FXNGdQR0krTDJodmJXVXZZV3BoZUd4dllXUXZkM2QzTDJ4cFluSmhhWEpwWlhNdlkyeGhjM011YlhsemNXd3VjR2h3UEM5aVBpQnZiaUJzYVc1bElEeGlQalk0UEM5aVBqeGljaUF2UGdvOFluSWdMejRLUEdJK1YyRnlibWx1Wnp3dllqNDZJQ0J0ZVhOeGJGOXhkV1Z5ZVNncElGczhZU0JvY21WbVBTZG1kVzVqZEdsdmJpNXRlWE54YkMxeGRXVnllU2MrWm5WdVkzUnBiMjR1YlhsemNXd3RjWFZsY25rOEwyRStYVG9nUVNCc2FXNXJJSFJ2SUhSb1pTQnpaWEoyWlhJZ1kyOTFiR1FnYm05MElHSmxJR1Z6ZEdGaWJHbHphR1ZrSUdsdUlEeGlQaTlvYjIxbEwyRnFZWGhzYjJGa0wzZDNkeTlzYVdKeVlXbHlhV1Z6TDJOc1lYTnpMbTE1YzNGc0xuQm9jRHd2WWo0Z2IyNGdiR2x1WlNBOFlqNDJPRHd2WWo0OFluSWdMejRLUEdKeUlDOCtDanhpUGxkaGNtNXBibWM4TDJJK09pQWdiWGx6Y1d4ZmNYVmxjbmtvS1NCYlBHRWdhSEpsWmowblpuVnVZM1JwYjI0dWJYbHpjV3d0Y1hWbGNua25QbVoxYm1OMGFXOXVMbTE1YzNGc0xYRjFaWEo1UEM5aFBsMDZJRU5oYmlkMElHTnZibTVsWTNRZ2RHOGdiRzlqWVd3Z1RYbFRVVXdnYzJWeWRtVnlJSFJvY205MVoyZ2djMjlqYTJWMElDY3ZkbUZ5TDNKMWJpOXRlWE54YkdRdmJYbHpjV3hrTG5Odlkyc25JQ2d5S1NCcGJpQThZajR2YUc5dFpTOWhhbUY0Ykc5aFpDOTNkM2N2YkdsaWNtRnBjbWxsY3k5amJHRnpjeTV0ZVhOeGJDNXdhSEE4TDJJK0lHOXVJR3hwYm1VZ1BHSStOamc4TDJJK1BHSnlJQzgrQ2p4aWNpQXZQZ284WWo1WFlYSnVhVzVuUEM5aVBqb2dJRzE1YzNGc1gzRjFaWEo1S0NrZ1d6eGhJR2h5WldZOUoyWjFibU4wYVc5dUxtMTVjM0ZzTFhGMVpYSjVKejVtZFc1amRHbHZiaTV0ZVhOeGJDMXhkV1Z5ZVR3dllUNWRPaUJCSUd4cGJtc2dkRzhnZEdobElITmxjblpsY2lCamIzVnNaQ0J1YjNRZ1ltVWdaWE4wWVdKc2FYTm9aV1FnYVc0Z1BHSStMMmh2YldVdllXcGhlR3h2WVdRdmQzZDNMMnhwWW5KaGFYSnBaWE12WTJ4aGMzTXViWGx6Y1d3dWNHaHdQQzlpUGlCdmJpQnNhVzVsSUR4aVBqWTRQQzlpUGp4aWNpQXZQZ284WW5JZ0x6NEtQR0krVjJGeWJtbHVaend2WWo0NklDQnRlWE54YkY5eGRXVnllU2dwSUZzOFlTQm9jbVZtUFNkbWRXNWpkR2x2Ymk1dGVYTnhiQzF4ZFdWeWVTYytablZ1WTNScGIyNHViWGx6Y1d3dGNYVmxjbms4TDJFK1hUb2dRMkZ1SjNRZ1kyOXVibVZqZENCMGJ5QnNiMk5oYkNCTmVWTlJUQ0J6WlhKMlpYSWdkR2h5YjNWbmFDQnpiMk5yWlhRZ0p5OTJZWEl2Y25WdUwyMTVjM0ZzWkM5dGVYTnhiR1F1YzI5amF5Y2dLRElwSUdsdUlEeGlQaTlvYjIxbEwyRnFZWGhzYjJGa0wzZDNkeTlzYVdKeVlXbHlhV1Z6TDJOc1lYTnpMbTE1YzNGc0xuQm9jRHd2WWo0Z2IyNGdiR2x1WlNBOFlqNDJPRHd2WWo0OFluSWdMejRLUEdKeUlDOCtDanhpUGxkaGNtNXBibWM4TDJJK09pQWdiWGx6Y1d4ZmNYVmxjbmtvS1NCYlBHRWdhSEpsWmowblpuVnVZM1JwYjI0dWJYbHpjV3d0Y1hWbGNua25QbVoxYm1OMGFXOXVMbTE1YzNGc0xYRjFaWEo1UEM5aFBsMDZJRUVnYkdsdWF5QjBieUIwYUdVZ2MyVnlkbVZ5SUdOdmRXeGtJRzV2ZENCaVpTQmxjM1JoWW14cGMyaGxaQ0JwYmlBOFlqNHZhRzl0WlM5aGFtRjRiRzloWkM5M2QzY3ZiR2xpY21GcGNtbGxjeTlqYkdGemN5NXRlWE54YkM1d2FIQThMMkkrSUc5dUlHeHBibVVnUEdJK05qZzhMMkkrUEdKeUlDOCtDZz09XCJcbiAgICByZXR1cm4gJGVkaXRvci5maW5kKCdpbWdbc3JjXj1cImRhdGFcIl0nKVxuICAgICAgICAuZWFjaCgoaSwgZWwpID0+IGVsLnNldEF0dHJpYnV0ZSgnaWQnLCBuZXcgRGF0ZSgpLmdldFRpbWUoKSArICctJyArIGkpKVxuICAgICAgICAubWFwKChpLCBlbCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmV0ID0gT2JqZWN0LmFzc2lnbihkZWNvZGVCYXNlNjRJbWFnZShlbC5nZXRBdHRyaWJ1dGUoJ3NyYycpKSwge2lkOiBlbC5nZXRBdHRyaWJ1dGUoJ2lkJyl9KVxuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdzcmMnLCBsb2FkaW5nR2lmKVxuICAgICAgICAgICAgcmV0dXJuIHJldFxuICAgICAgICB9KVxuICAgICAgICAudG9BcnJheSgpXG4gICAgICAgIC5maWx0ZXIoKHt0eXBlfSkgPT4gdHlwZSA9PT0gJ2ltYWdlL3BuZycpXG59XG5cbmNvbnN0IHBlcnNpc3RJbmxpbmVJbWFnZXMgPSAoJGVkaXRvciwgc2NyZWVuc2hvdFNhdmVyKSA9PiB7XG4gICAgQmFjb24uY29tYmluZUFzQXJyYXkoXG4gICAgICAgIG1hcmtBbmRHZXRJbmxpbmVJbWFnZXMoJGVkaXRvcilcbiAgICAgICAgICAgIC5tYXAoZGF0YSA9PiBCYWNvbi5mcm9tUHJvbWlzZShcbiAgICAgICAgICAgICAgICBzY3JlZW5zaG90U2F2ZXIoZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oc2NyZWVuc2hvdFVybCA9PiAkZWRpdG9yLmZpbmQoJyMnICsgZGF0YS5pZCkuYXR0cignc3JjJywgc2NyZWVuc2hvdFVybCkucmVtb3ZlQXR0cignaWQnKSlcbiAgICAgICAgICAgICAgICAgICAgLmZhaWwoZSA9PiAkZWRpdG9yLmZpbmQoJyMnICsgZGF0YS5pZCkucmVtb3ZlKCkpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICkub25WYWx1ZSgoKSA9PiAkZWRpdG9yLnRyaWdnZXIoJ2lucHV0JykpXG59XG5cbmNvbnN0IG1ha2VSaWNoVGV4dCA9IChlbGVtZW50LCBvcHRpb25zLCBvblZhbHVlQ2hhbmdlZCA9ICgpID0+IHsgfSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgICAgc2NyZWVuc2hvdDoge1xuICAgICAgICAgICAgc2F2ZXJcbiAgICAgICAgfVxuICAgIH0gPSBvcHRpb25zXG4gICAgY29uc3QgJGFuc3dlciA9ICQoZWxlbWVudClcblxuICAgIGxldCBwYXN0ZUluUHJvZ3Jlc3MgPSBmYWxzZVxuXG4gICAgJGFuc3dlclxuICAgICAgICAuYXR0cignY29udGVudGVkaXRhYmxlJywgJ3RydWUnKVxuICAgICAgICAuYXR0cignc3BlbGxjaGVjaycsICdmYWxzZScpXG4gICAgICAgIC5hdHRyKCdkYXRhLWpzJywgJ2Fuc3dlcicpXG4gICAgICAgIC5hZGRDbGFzcygnbWF0aC1lZGl0b3ItYW5zd2VyJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgZSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNDdHJsS2V5KGUsIGtleUNvZGVzLkVOVEVSKSB8fCBpc0tleShlLCBrZXlDb2Rlcy5FU0MpKSBtYXRoRWRpdG9yLmNsb3NlTWF0aEVkaXRvcih0cnVlKVxuICAgICAgICB9KVxuICAgICAgICAub24oJ21vdXNlZG93bicsICdpbWdbc3JjXj1cIi9tYXRoLnN2Z1wiXScsIGUgPT4ge1xuICAgICAgICAgICAgb25FZGl0b3JGb2N1cygkKGUudGFyZ2V0KS5jbG9zZXN0KCdbZGF0YS1qcz1cImFuc3dlclwiXScpKVxuICAgICAgICAgICAgbWF0aEVkaXRvci5vcGVuTWF0aEVkaXRvcigkKGUudGFyZ2V0KSlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdrZXlwcmVzcycsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKGlzQ3RybEtleShlLCAnbCcpIHx8IGlzQ3RybEtleShlLCAnaScpKSBtYXRoRWRpdG9yLmluc2VydE5ld0VxdWF0aW9uKClcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdmb2N1cyBibHVyJywgZSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNNYXRoRWRpdG9yVmlzaWJsZSgpICYmIGUudHlwZSA9PT0gJ2ZvY3VzJykgbWF0aEVkaXRvci5jbG9zZU1hdGhFZGl0b3IoKVxuICAgICAgICAgICAgb25FZGl0b3JGb2N1c0NoYW5nZWQoZSlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdrZXl1cCBpbnB1dCcsIGUgPT4ge1xuICAgICAgICAgICAgaWYoISBwYXN0ZUluUHJvZ3Jlc3MpIG9uVmFsdWVDaGFuZ2VkKHNhbml0aXplQ29udGVudChlLmN1cnJlbnRUYXJnZXQpKVxuICAgICAgICB9KVxuICAgICAgICAub24oJ3Bhc3RlJywgZSA9PiB7XG4gICAgICAgICAgICBwYXN0ZUluUHJvZ3Jlc3MgPSB0cnVlXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHBhc3RlSW5Qcm9ncmVzcyA9IGZhbHNlLCAwKVxuXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJylcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIGNvbnN0IGNsaXBib2FyZERhdGEgPSBlLm9yaWdpbmFsRXZlbnQuY2xpcGJvYXJkRGF0YVxuICAgICAgICAgICAgY29uc3QgZmlsZSA9IGNsaXBib2FyZERhdGEuaXRlbXMgJiYgY2xpcGJvYXJkRGF0YS5pdGVtc1swXS5nZXRBc0ZpbGUoKVxuICAgICAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICBpZihmaWxlLnR5cGUgIT09ICdpbWFnZS9wbmcnKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICBzYXZlcih7ZGF0YTogZmlsZSwgdHlwZTogZmlsZS50eXBlLCBpZDogU3RyaW5nKG5ldyBEYXRlKCkuZ2V0VGltZSgpKX0pLnRoZW4oc2NyZWVuc2hvdFVybCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGltZyA9IGA8aW1nIHNyYz1cIiR7c2NyZWVuc2hvdFVybH1cIi8+YFxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydEhUTUwnLCBmYWxzZSwgaW1nKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNsaXBib2FyZERhdGFBc0h0bWwgPSBjbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQvaHRtbCcpXG4gICAgICAgICAgICAgICAgaWYgKGNsaXBib2FyZERhdGFBc0h0bWwpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0SFRNTCcsIGZhbHNlLCBzYW5pdGl6ZShjbGlwYm9hcmREYXRhQXNIdG1sKSlcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHBlcnNpc3RJbmxpbmVJbWFnZXMoJGN1cnJlbnRFZGl0b3IsIHNhdmVyKSwgMClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4gcGVyc2lzdElubGluZUltYWdlcygkY3VycmVudEVkaXRvciwgc2F2ZXIpLCAwKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbWFrZVJpY2hUZXh0XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhbGxvd2VkVGFnczogW1xuICAgICAgICAnZGl2JyxcbiAgICAgICAgJ2ltZycsXG4gICAgICAgICdicidcbiAgICBdLFxuICAgIGFsbG93ZWRBdHRyaWJ1dGVzOiB7XG4gICAgICAgIGltZzogWydzcmMnLCAnYWx0J11cbiAgICB9LFxuICAgIGFsbG93ZWRTY2hlbWVzOiBbJ2RhdGEnLCAnaHR0cCcsICdodHRwcyddLFxuICAgIGV4Y2x1c2l2ZUZpbHRlcjogZnVuY3Rpb24oZnJhbWUpIHsgcmV0dXJuIGZyYW1lLmF0dHJpYnNbJ2RhdGEtanMnXSA9PT0gJ21hdGhFZGl0b3InIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuICAgIHtcbiAgICAgICAgbGFiZWw6ICdQZXJ1cycsXG4gICAgICAgIGNoYXJhY3RlcnM6IFtcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4omgJywgbGF0ZXhDb21tYW5kOiAnXFxcXG5lcScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4omIJywgbGF0ZXhDb21tYW5kOiAnXFxcXGFwcHJveCcsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4omkJywgbGF0ZXhDb21tYW5kOiAnXFxcXGxlcScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4omlJywgbGF0ZXhDb21tYW5kOiAnXFxcXGdlcScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnwrInLCBsYXRleENvbW1hbmQ6ICdeMicsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnwrMnLCBsYXRleENvbW1hbmQ6ICdeMycgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnwr0nLCBsYXRleENvbW1hbmQ6ICcxLzInLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KFkycsIGxhdGV4Q29tbWFuZDogJzEvMycgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnwrEnLCBsYXRleENvbW1hbmQ6ICdcXFxccG0nIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBsYWJlbDogJ0FsZ2VicmEnLFxuICAgICAgICBjaGFyYWN0ZXJzOiBbXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIvCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxzaW0nIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KJoScsIGxhdGV4Q29tbWFuZDogJ1xcXFxlcXVpdicsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4omiJyB9LCAvLyBcXG5lcXVpdiBvciBcXG5vdFxcZXF1aXZcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnwrcnLCBsYXRleENvbW1hbmQ6ICdcXFxcY2RvdCcsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oCmJywgbGF0ZXhDb21tYW5kOiAnXFxcXGRvdHMnIH0sIC8vIG1hdHJpaXNpYWxnZWJyYT9cbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oieJywgbGF0ZXhDb21tYW5kOiAnXFxcXGluZnR5JywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGxhYmVsOiAnS3JlaWtrYWxhaXNldCBhYWtrb3NldCcsXG4gICAgICAgIGNoYXJhY3RlcnM6IFtcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzrEnLCBsYXRleENvbW1hbmQ6ICdcXFxcYWxwaGEnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86yJywgbGF0ZXhDb21tYW5kOiAnXFxcXGJldGEnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ860JywgbGF0ZXhDb21tYW5kOiAnXFxcXGRlbHRhJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOtScsIGxhdGV4Q29tbWFuZDogJ1xcXFx2YXJlcHNpbG9uJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOtycsIGxhdGV4Q29tbWFuZDogJ1xcXFxldGEnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIgicsIGxhdGV4Q29tbWFuZDogJ1xcXFxwYXJ0aWFsJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfwnZyEJywgbGF0ZXhDb21tYW5kOiAnXFxcXGlvdGEnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ867JywgbGF0ZXhDb21tYW5kOiAnXFxcXGxhbWJkYScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnwrUnLCBsYXRleENvbW1hbmQ6ICdcXFxcbXUnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8+AJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBpJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfPgycsIGxhdGV4Q29tbWFuZDogJ1xcXFxzaWdtYScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnz4QnLCBsYXRleENvbW1hbmQ6ICdcXFxcdGF1JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfQpCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxwaGknIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8+JJywgbGF0ZXhDb21tYW5kOiAnXFxcXG9tZWdhJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOkycsIGxhdGV4Q29tbWFuZDogJ1xcXFxHYW1tYScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzpQnLCBsYXRleENvbW1hbmQ6ICdcXFxcRGVsdGEnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86YJywgbGF0ZXhDb21tYW5kOiAnXFxcXFRoZXRhJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiI8nLCBsYXRleENvbW1hbmQ6ICdcXFxcUGknIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIkScsIGxhdGV4Q29tbWFuZDogJ1xcXFxTaWdtYScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzqYnLCBsYXRleENvbW1hbmQ6ICdcXFxcUGhpJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOqScsIGxhdGV4Q29tbWFuZDogJ1xcXFxPbWVnYScgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGxhYmVsOiAnR2VvbWV0cmlhIGphIHZla3RvcmlvcHBpJyxcbiAgICAgICAgY2hhcmFjdGVyczogW1xuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfCsCcsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oaRJywgbGF0ZXhDb21tYW5kOiAnXFxcXHVwYXJyb3cnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KHhScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oigJywgbGF0ZXhDb21tYW5kOiAnXFxcXGFuZ2xlJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiqUnLCBsYXRleENvbW1hbmQ6ICdcXFxccGVycCcsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oCWJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBhcmFsbGVsJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihpMnLCBsYXRleENvbW1hbmQ6ICdcXFxcZG93bmFycm93JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihpQnLCBsYXRleENvbW1hbmQ6ICdcXFxcbGVmdHJpZ2h0YXJyb3cnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KHjCcgfSAvLyBcXHJpZ2h0bGVmdGhhcnBvb25zXG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbGFiZWw6ICdMb2dpaWtrYSBqYSBqb3Vra28tb3BwaScsXG4gICAgICAgIGNoYXJhY3RlcnM6IFtcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oeSJywgbGF0ZXhDb21tYW5kOiAnXFxcXFJpZ2h0YXJyb3cnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KHlCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxMZWZ0cmlnaHRhcnJvdycsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oinJywgbGF0ZXhDb21tYW5kOiAnXFxcXGFuZCcgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oioJywgbGF0ZXhDb21tYW5kOiAnXFxcXG9yJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfCrCcgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiDJywgbGF0ZXhDb21tYW5kOiAnXFxcXGV4aXN0cycsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiAJywgbGF0ZXhDb21tYW5kOiAnXFxcXGZvcmFsbCcsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oipJywgbGF0ZXhDb21tYW5kOiAnXFxcXGNhcCcgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiqJywgbGF0ZXhDb21tYW5kOiAnXFxcXGN1cCcgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiWJywgbGF0ZXhDb21tYW5kOiAnXFxcXHNldG1pbnVzJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiioInLCBsYXRleENvbW1hbmQ6ICdcXFxcc3Vic2V0JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiioQnLCBsYXRleENvbW1hbmQ6ICdcXFxcbm90c3Vic2V0JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiIgnLCBsYXRleENvbW1hbmQ6ICdcXFxcaW4nLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIiScsIGxhdGV4Q29tbWFuZDogJ1xcXFxub3RpbicsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiFJywgbGF0ZXhDb21tYW5kOiAnXFxcXGVtcHR5JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihpInLCBsYXRleENvbW1hbmQ6ICdcXFxccmlnaHRhcnJvdycgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiYJywgbGF0ZXhDb21tYW5kOiAnXFxcXGNpcmMnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIvCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxzaW0nIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KEnScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oSVJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihKQnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KEmicgfVxuICAgICAgICBdXG4gICAgfVxuXVxuIiwiY29uc3Qgc3BlY2lhbENoYXJhY3Rlckdyb3VwcyA9IHJlcXVpcmUoJy4vc3BlY2lhbENoYXJhY3RlcnMnKVxuY29uc3QgbGF0ZXhDb21tYW5kcyA9IHJlcXVpcmUoJy4vbGF0ZXhDb21tYW5kcycpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGluaXQsXG59XG5cbmZ1bmN0aW9uIGluaXQobWF0aEVkaXRvciwgaGFzQW5zd2VyRm9jdXMsIGwpIHtcbiAgICBjb25zdCAkdG9vbGJhciA9ICQoYCAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtYXRoLWVkaXRvci10b29sc1wiIGRhdGEtanM9XCJ0b29sc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1hdGgtZWRpdG9yLWNoYXJhY3RlcnNcIiBkYXRhLWpzPVwiY2hhcmFjdGVyc1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWF0aC1lZGl0b3ItdG9vbGJhciBtYXRoLWVkaXRvci1saXN0XCIgZGF0YS1qcz1cImNoYXJhY3RlcnNMaXN0XCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYXRoLWVkaXRvci1lcXVhdGlvbiBtYXRoLWVkaXRvci10b29sYmFyIG1hdGgtZWRpdG9yLWxpc3QgbWF0aC1lZGl0b3ItaGlkZGVuXCIgZGF0YS1qcz1cIm1hdGhUb29sYmFyXCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJtYXRoLWVkaXRvci1uZXctZXF1YXRpb24gbWF0aC1lZGl0b3ItYnV0dG9uIG1hdGgtZWRpdG9yLWJ1dHRvbi1hY3Rpb25cIiBkYXRhLWpzPVwibmV3RXF1YXRpb25cIiBkYXRhLXRpdGxlPVwiQ3RybC1MXCI+zqMgJHtsLmluc2VydEVxdWF0aW9ufTwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBgKVxuICAgIGNvbnN0ICRuZXdFcXVhdGlvbiA9ICR0b29sYmFyLmZpbmQoJ1tkYXRhLWpzPVwibmV3RXF1YXRpb25cIl0nKVxuICAgIGNvbnN0ICRtYXRoVG9vbGJhciA9ICR0b29sYmFyLmZpbmQoJ1tkYXRhLWpzPVwibWF0aFRvb2xiYXJcIl0nKVxuICAgIGluaXRTcGVjaWFsQ2hhcmFjdGVyVG9vbGJhcigkdG9vbGJhciwgbWF0aEVkaXRvciwgaGFzQW5zd2VyRm9jdXMpXG4gICAgaW5pdE1hdGhUb29sYmFyKCRtYXRoVG9vbGJhciwgbWF0aEVkaXRvcilcbiAgICBpbml0TmV3RXF1YXRpb24oJG5ld0VxdWF0aW9uLCBtYXRoRWRpdG9yLCBoYXNBbnN3ZXJGb2N1cylcblxuICAgIGZ1bmN0aW9uIHRvZ2dsZU1hdGhUb29sYmFyKGlzVmlzaWJsZSkge1xuICAgICAgICAkbmV3RXF1YXRpb24udG9nZ2xlKCFpc1Zpc2libGUpXG4gICAgICAgICRtYXRoVG9vbGJhci50b2dnbGUoaXNWaXNpYmxlKVxuICAgIH1cblxuICAgIHJldHVybiB7ICR0b29sYmFyLCB0b2dnbGVNYXRoVG9vbGJhciB9XG59XG5cbmNvbnN0IHNwZWNpYWxDaGFyYWN0ZXJUb0J1dHRvbiA9IGNoYXIgPT4gYDxidXR0b24gY2xhc3M9XCJtYXRoLWVkaXRvci1idXR0b24gbWF0aC1lZGl0b3ItYnV0dG9uLWdyaWQke2NoYXIucG9wdWxhciA/ICcgbWF0aC1lZGl0b3ItY2hhcmFjdGVycy1wb3B1bGFyJyA6Jyd9XCIgJHtjaGFyLmxhdGV4Q29tbWFuZCA/IGBkYXRhLWNvbW1hbmQ9XCIke2NoYXIubGF0ZXhDb21tYW5kfVwiYCA6ICcnfSBkYXRhLXRpdGxlPVwiJHtjaGFyLmxhdGV4Q29tbWFuZCB8fCBjaGFyLmNoYXJhY3Rlcn1cIj4ke2NoYXIuY2hhcmFjdGVyfTwvYnV0dG9uPmBcblxuY29uc3QgcG9wdWxhckluR3JvdXAgPSBncm91cCA9PiBncm91cC5jaGFyYWN0ZXJzLmZpbHRlcihjaGFyYWN0ZXIgPT4gY2hhcmFjdGVyLnBvcHVsYXIpLmxlbmd0aFxuXG5mdW5jdGlvbiBpbml0U3BlY2lhbENoYXJhY3RlclRvb2xiYXIoJHRvb2xiYXIsIG1hdGhFZGl0b3IsIGhhc0Fuc3dlckZvY3VzKSB7XG4gICAgY29uc3QgZ3JpZEJ1dHRvbldpZHRoUHggPSAzNVxuXG4gICAgJHRvb2xiYXIuZmluZCgnW2RhdGEtanM9XCJjaGFyYWN0ZXJzTGlzdFwiXScpXG4gICAgICAgIC5hcHBlbmQoc3BlY2lhbENoYXJhY3Rlckdyb3Vwcy5tYXAoZ3JvdXAgPT5cbiAgICAgICAgICAgIGA8ZGl2IGNsYXNzPVwibWF0aC1lZGl0b3ItY2hhcmFjdGVycy1ncm91cFwiIFxuICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogJHtwb3B1bGFySW5Hcm91cChncm91cCkgKiBncmlkQnV0dG9uV2lkdGhQeH1weFwiPlxuICAgICAgICAgICAgICAgICAgJHtncm91cC5jaGFyYWN0ZXJzLm1hcChzcGVjaWFsQ2hhcmFjdGVyVG9CdXR0b24pLmpvaW4oJycpfVxuICAgICAgICAgICAgIDwvZGl2PmApKVxuICAgICAgICAuYXBwZW5kKGA8YnV0dG9uIGNsYXNzPVwibWF0aC1lZGl0b3ItY2hhcmFjdGVycy1leHBhbmQtY29sbGFwc2VcIj48L2J1dHRvbj5gKVxuICAgICAgICAub24oJ21vdXNlZG93bicsICdidXR0b24nLCBlID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgICAgICBpZiAoJChlLmN1cnJlbnRUYXJnZXQpLmhhc0NsYXNzKCdtYXRoLWVkaXRvci1jaGFyYWN0ZXJzLWV4cGFuZC1jb2xsYXBzZScpKSB7XG4gICAgICAgICAgICAgICAgJHRvb2xiYXIuZmluZCgnW2RhdGEtanM9XCJjaGFyYWN0ZXJzXCJdJykudG9nZ2xlQ2xhc3MoJ21hdGgtZWRpdG9yLWNoYXJhY3RlcnMtZXhwYW5kZWQnKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGFyYWN0ZXIgPSBlLmN1cnJlbnRUYXJnZXQuaW5uZXJUZXh0XG4gICAgICAgICAgICAgICAgY29uc3QgY29tbWFuZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmNvbW1hbmRcbiAgICAgICAgICAgICAgICBpZiAoaGFzQW5zd2VyRm9jdXMoKSkgd2luZG93LmRvY3VtZW50LmV4ZWNDb21tYW5kKCdpbnNlcnRUZXh0JywgZmFsc2UsIGNoYXJhY3RlcilcbiAgICAgICAgICAgICAgICBlbHNlIG1hdGhFZGl0b3IuaW5zZXJ0TWF0aChjb21tYW5kIHx8IGNoYXJhY3RlcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbn1cblxuZnVuY3Rpb24gaW5pdE1hdGhUb29sYmFyKCRtYXRoVG9vbGJhciwgbWF0aEVkaXRvcikge1xuICAgICRtYXRoVG9vbGJhci5hcHBlbmQobGF0ZXhDb21tYW5kc1xuICAgICAgICAubWFwKG8gPT4gYDxidXR0b24gZGF0YS10aXRsZT1cIiR7by5hY3Rpb259XCIgY2xhc3M9XCJtYXRoLWVkaXRvci1idXR0b24gbWF0aC1lZGl0b3ItYnV0dG9uLWdyaWRcIiBkYXRhLWNvbW1hbmQ9XCIke28uYWN0aW9ufVwiIGRhdGEtbGF0ZXhjb21tYW5kPVwiJHtvLmxhYmVsfVwiIGRhdGEtdXNld3JpdGU9XCIke28udXNlV3JpdGUgfHwgZmFsc2V9XCI+XG48aW1nIHNyYz1cIi9tYXRoLnN2Zz9sYXRleD0ke2VuY29kZVVSSUNvbXBvbmVudChvLmxhYmVsID8gby5sYWJlbC5yZXBsYWNlKC9YL2csICdcXFxcc3F1YXJlJykgOiBvLmFjdGlvbil9XCIvPlxuPC9idXR0b24+YCkuam9pbignJylcbiAgICApLm9uKCdtb3VzZWRvd24nLCAnYnV0dG9uJywgZSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBjb25zdCBkYXRhc2V0ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XG4gICAgICAgIG1hdGhFZGl0b3IuaW5zZXJ0TWF0aChkYXRhc2V0LmNvbW1hbmQsIGRhdGFzZXQubGF0ZXhjb21tYW5kLCBkYXRhc2V0LnVzZXdyaXRlID09PSAndHJ1ZScpXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gaW5pdE5ld0VxdWF0aW9uKCRuZXdFcXVhdGlvbiwgbWF0aEVkaXRvciwgaGFzQW5zd2VyRm9jdXMpIHtcbiAgICAkbmV3RXF1YXRpb24ubW91c2Vkb3duKChlID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGlmICghaGFzQW5zd2VyRm9jdXMoKSkgcmV0dXJuIC8vIFRPRE86IHJlbW92ZSB3aGVuIGJ1dHRvbiBpcyBvbmx5IHZpc2libGUgd2hlbiB0ZXh0YXJlYSBoYXMgZm9jdXNcbiAgICAgICAgbWF0aEVkaXRvci5pbnNlcnROZXdFcXVhdGlvbigpXG4gICAgfSkuYmluZCh0aGlzKSlcbn1cbiIsImNvbnN0IHNhbml0aXplSHRtbCA9IHJlcXVpcmUoJ3Nhbml0aXplLWh0bWwnKVxuY29uc3Qgc2FuaXRpemVPcHRzID0gcmVxdWlyZSgnLi9zYW5pdGl6ZU9wdHMnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtpc0tleSwgaXNDdHJsS2V5LCBpbnNlcnRUb1RleHRBcmVhQXRDdXJzb3IsIGRlY29kZUJhc2U2NEltYWdlLCBzYW5pdGl6ZSwgc2FuaXRpemVDb250ZW50fVxuXG5mdW5jdGlvbiBzYW5pdGl6ZShodG1sKSB7XG4gICAgcmV0dXJuIHNhbml0aXplSHRtbChodG1sLCBzYW5pdGl6ZU9wdHMpXG59XG5mdW5jdGlvbiBpbnNlcnRUb1RleHRBcmVhQXRDdXJzb3IoZmllbGQsIHZhbHVlKSB7XG4gICAgY29uc3Qgc3RhcnRQb3MgPSBmaWVsZC5zZWxlY3Rpb25TdGFydFxuICAgIGNvbnN0IGVuZFBvcyA9IGZpZWxkLnNlbGVjdGlvbkVuZFxuICAgIGxldCBvbGRWYWx1ZSA9IGZpZWxkLnZhbHVlXG4gICAgZmllbGQudmFsdWUgPSBvbGRWYWx1ZS5zdWJzdHJpbmcoMCwgc3RhcnRQb3MpICsgdmFsdWUgKyBvbGRWYWx1ZS5zdWJzdHJpbmcoZW5kUG9zLCBvbGRWYWx1ZS5sZW5ndGgpXG4gICAgZmllbGQuc2VsZWN0aW9uU3RhcnQgPSBmaWVsZC5zZWxlY3Rpb25FbmQgPSBzdGFydFBvcyArIHZhbHVlLmxlbmd0aFxufVxuXG5mdW5jdGlvbiBkZWNvZGVCYXNlNjRJbWFnZShkYXRhU3RyaW5nKSB7XG4gICAgaWYgKCFkYXRhU3RyaW5nKVxuICAgICAgICByZXR1cm4gbnVsbFxuICAgIGNvbnN0IG1hdGNoZXMgPSBkYXRhU3RyaW5nLm1hdGNoKC9eZGF0YTooW0EtWmEtei0rXFwvXSspO2Jhc2U2NCwoLispJC8pXG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoICE9PSAzKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IG1hdGNoZXNbMV0sXG4gICAgICAgIGRhdGE6IG5ldyBCdWZmZXIobWF0Y2hlc1syXSwgJ2Jhc2U2NCcpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0tleShlLCBrZXkpIHsgcmV0dXJuIHByZXZlbnRJZlRydWUoZSwgIWUuYWx0S2V5ICYmICFlLnNoaWZ0S2V5ICYmICFlLmN0cmxLZXkgICYmIGtleU9yS2V5Q29kZShlLCBrZXkpKX1cblxuZnVuY3Rpb24gaXNDdHJsS2V5KGUsIGtleSkgeyByZXR1cm4gcHJldmVudElmVHJ1ZShlLCAhZS5hbHRLZXkgJiYgIWUuc2hpZnRLZXkgJiYgZS5jdHJsS2V5ICYmIGtleU9yS2V5Q29kZShlLCBrZXkpKX1cblxuZnVuY3Rpb24ga2V5T3JLZXlDb2RlKGUsIHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgPyBlLmtleSA9PT0gdmFsIDogZS5rZXlDb2RlID09PSB2YWwgfVxuZnVuY3Rpb24gcHJldmVudElmVHJ1ZShlLCB2YWwpIHtcbiAgICBpZih2YWwpIGUucHJldmVudERlZmF1bHQoKVxuICAgIHJldHVybiB2YWxcbn1cblxuZnVuY3Rpb24gc2FuaXRpemVDb250ZW50KGFuc3dlckVsZW1lbnQpIHtcbiAgICBjb25zdCAkYW5zd2VyRWxlbWVudCA9ICQoYW5zd2VyRWxlbWVudClcbiAgICBjb25zdCAkbWF0aEVkaXRvciA9ICRhbnN3ZXJFbGVtZW50LmZpbmQoJ1tkYXRhLWpzPVwibWF0aEVkaXRvclwiXScpXG4gICAgJG1hdGhFZGl0b3IuaGlkZSgpXG4gICAgY29uc3QgdGV4dCA9ICRhbnN3ZXJFbGVtZW50LnRleHQoKVxuICAgICRtYXRoRWRpdG9yLnNob3coKVxuXG4gICAgY29uc3QgaHRtbCA9IHNhbml0aXplKCRhbnN3ZXJFbGVtZW50Lmh0bWwoKSlcblxuICAgIHJldHVybiB7IGFuc3dlckhUTUw6IGh0bWwsIGFuc3dlclRleHQ6IHRleHQgfVxufVxuIl19
