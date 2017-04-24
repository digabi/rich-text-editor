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
"use strict";

module.exports = "data:image/gif;base64,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EAY7Cg04Uk48LAsDhRA8MVQPEF0GAgqYYwSRlycNcWskCkApIyEAOwAAAAAAAAAAADxiciAvPgo8Yj5XYXJuaW5nPC9iPjogIG15c3FsX3F1ZXJ5KCkgWzxhIGhyZWY9J2Z1bmN0aW9uLm15c3FsLXF1ZXJ5Jz5mdW5jdGlvbi5teXNxbC1xdWVyeTwvYT5dOiBDYW4ndCBjb25uZWN0IHRvIGxvY2FsIE15U1FMIHNlcnZlciB0aHJvdWdoIHNvY2tldCAnL3Zhci9ydW4vbXlzcWxkL215c3FsZC5zb2NrJyAoMikgaW4gPGI+L2hvbWUvYWpheGxvYWQvd3d3L2xpYnJhaXJpZXMvY2xhc3MubXlzcWwucGhwPC9iPiBvbiBsaW5lIDxiPjY4PC9iPjxiciAvPgo8YnIgLz4KPGI+V2FybmluZzwvYj46ICBteXNxbF9xdWVyeSgpIFs8YSBocmVmPSdmdW5jdGlvbi5teXNxbC1xdWVyeSc+ZnVuY3Rpb24ubXlzcWwtcXVlcnk8L2E+XTogQSBsaW5rIHRvIHRoZSBzZXJ2ZXIgY291bGQgbm90IGJlIGVzdGFibGlzaGVkIGluIDxiPi9ob21lL2FqYXhsb2FkL3d3dy9saWJyYWlyaWVzL2NsYXNzLm15c3FsLnBocDwvYj4gb24gbGluZSA8Yj42ODwvYj48YnIgLz4KPGJyIC8+CjxiPldhcm5pbmc8L2I+OiAgbXlzcWxfcXVlcnkoKSBbPGEgaHJlZj0nZnVuY3Rpb24ubXlzcWwtcXVlcnknPmZ1bmN0aW9uLm15c3FsLXF1ZXJ5PC9hPl06IENhbid0IGNvbm5lY3QgdG8gbG9jYWwgTXlTUUwgc2VydmVyIHRocm91Z2ggc29ja2V0ICcvdmFyL3J1bi9teXNxbGQvbXlzcWxkLnNvY2snICgyKSBpbiA8Yj4vaG9tZS9hamF4bG9hZC93d3cvbGlicmFpcmllcy9jbGFzcy5teXNxbC5waHA8L2I+IG9uIGxpbmUgPGI+Njg8L2I+PGJyIC8+CjxiciAvPgo8Yj5XYXJuaW5nPC9iPjogIG15c3FsX3F1ZXJ5KCkgWzxhIGhyZWY9J2Z1bmN0aW9uLm15c3FsLXF1ZXJ5Jz5mdW5jdGlvbi5teXNxbC1xdWVyeTwvYT5dOiBBIGxpbmsgdG8gdGhlIHNlcnZlciBjb3VsZCBub3QgYmUgZXN0YWJsaXNoZWQgaW4gPGI+L2hvbWUvYWpheGxvYWQvd3d3L2xpYnJhaXJpZXMvY2xhc3MubXlzcWwucGhwPC9iPiBvbiBsaW5lIDxiPjY4PC9iPjxiciAvPgo8YnIgLz4KPGI+V2FybmluZzwvYj46ICBteXNxbF9xdWVyeSgpIFs8YSBocmVmPSdmdW5jdGlvbi5teXNxbC1xdWVyeSc+ZnVuY3Rpb24ubXlzcWwtcXVlcnk8L2E+XTogQ2FuJ3QgY29ubmVjdCB0byBsb2NhbCBNeVNRTCBzZXJ2ZXIgdGhyb3VnaCBzb2NrZXQgJy92YXIvcnVuL215c3FsZC9teXNxbGQuc29jaycgKDIpIGluIDxiPi9ob21lL2FqYXhsb2FkL3d3dy9saWJyYWlyaWVzL2NsYXNzLm15c3FsLnBocDwvYj4gb24gbGluZSA8Yj42ODwvYj48YnIgLz4KPGJyIC8+CjxiPldhcm5pbmc8L2I+OiAgbXlzcWxfcXVlcnkoKSBbPGEgaHJlZj0nZnVuY3Rpb24ubXlzcWwtcXVlcnknPmZ1bmN0aW9uLm15c3FsLXF1ZXJ5PC9hPl06IEEgbGluayB0byB0aGUgc2VydmVyIGNvdWxkIG5vdCBiZSBlc3RhYmxpc2hlZCBpbiA8Yj4vaG9tZS9hamF4bG9hZC93d3cvbGlicmFpcmllcy9jbGFzcy5teXNxbC5waHA8L2I+IG9uIGxpbmUgPGI+Njg8L2I+PGJyIC8+Cg==";

},{}],5:[function(require,module,exports){
'use strict';

var _require = require('./util'),
    insertToTextAreaAtCursor = _require.insertToTextAreaAtCursor,
    setCursorAfter = _require.setCursorAfter;

var MQ = MathQuill.getInterface(2);
module.exports = { init: init };

function init($outerPlaceholder, focus, onMathFocusChanged) {
    var $mathEditorContainer = $('\n        <div class="math-editor" data-js="mathEditor">\n            <div class="math-editor-equation-field" data-js="equationField"></div>\n            <textarea class="math-editor-latex-field" data-js="latexField" placeholder="LaTex"></textarea>\n        </div>');

    $outerPlaceholder.append($mathEditorContainer);
    var $latexField = $mathEditorContainer.find('[data-js="latexField"]');
    var $equationField = $mathEditorContainer.find('[data-js="equationField"]');
    var mqEditTimeout = void 0;
    var visible = false;
    var focusChanged = null;
    //noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols
    var mqInstance = MQ.MathField($equationField.get(0), {
        handlers: {
            edit: onMqEdit,
            enter: function enter(field) {
                closeMathEditor(true);
                setTimeout(function () {
                    return insertNewEquation('<br>');
                }, 2);
            }
        }
    });
    $equationField.on('keydown', '.mq-textarea textarea', onMqEdit).on('focus blur', '.mq-textarea textarea', function (e) {
        focus.equationField = e.type !== 'blur' && e.type !== 'focusout';
        onFocusChanged();
    });

    $latexField.keyup(onLatexUpdate).on('focus blur', function (e) {
        focus.latexField = e.type !== 'blur';
        onFocusChanged();
    });

    return {
        insertNewEquation: insertNewEquation,
        insertMath: insertMath,
        closeMathEditor: closeMathEditor,
        openMathEditor: openMathEditor,
        onFocusChanged: onFocusChanged,
        isVisible: isVisible
    };

    function isVisible() {
        return visible;
    }
    function onMqEdit() {
        clearTimeout(mqEditTimeout);
        mqEditTimeout = setTimeout(function () {
            if (focus.latexField) return;
            var latex = mqInstance.latex();
            $latexField.val(latex);
            updateMathImg($mathEditorContainer.prev(), latex);
        }, 100);
    }

    function onLatexUpdate() {
        updateMathImg($mathEditorContainer.prev(), $latexField.val());
        setTimeout(function () {
            return mqInstance.latex($latexField.val());
        }, 1);
    }

    function onFocusChanged() {
        clearTimeout(focusChanged);
        focusChanged = setTimeout(function () {
            if (!focus.latexField && !focus.equationField) closeMathEditor();
            onMathFocusChanged();
        }, 0);
    }

    function insertNewEquation() {
        var optionalMarkup = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        window.document.execCommand('insertHTML', false, optionalMarkup + '<img data-js="new" alt="" style="display: none"/>');
        showMathEditor($('[data-js="new"]').removeAttr('data-js'));
    }

    function openMathEditor($img) {
        if (visible) closeMathEditor();
        setCursorAfter($img);
        showMathEditor($img);
    }

    function showMathEditor($img) {
        $img.hide();
        $img.after($mathEditorContainer);
        visible = true;
        toggleMathToolbar(true);
        setTimeout(function () {
            return mqInstance.focus();
        }, 0);
        $latexField.val($img.prop('alt'));
        onLatexUpdate();
    }

    function insertMath(symbol, alternativeSymbol, useWrite) {
        if (focus.latexField) {
            insertToTextAreaAtCursor($latexField.get(0), alternativeSymbol || symbol);
            onLatexUpdate();
        } else if (focus.equationField) {
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
        $img.prop({
            src: '/math.svg?latex=' + encodeURIComponent(latex),
            alt: latex
        });
    }

    function closeMathEditor() {
        var setFocusAfterClose = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        // TODO: remove event bindings
        var $currentEditor = $mathEditorContainer.closest('[data-js="answer"]');
        var $img = $mathEditorContainer.prev();
        if ($latexField.val().trim() === '') {
            $img.remove();
        } else {
            $img.show();
            updateMathImg($img, $latexField.val());
        }

        toggleMathToolbar(false);
        $outerPlaceholder.append($mathEditorContainer);
        visible = false;
        focus.latexField = false;
        focus.equationField = false;
        if (setFocusAfterClose) $currentEditor.focus();
    }

    function toggleMathToolbar(isVisible) {
        $('body').toggleClass('math-editor-focus', isVisible);
    }
}

},{"./util":10}],6:[function(require,module,exports){
'use strict';

var _require = require('./util'),
    isCtrlKey = _require.isCtrlKey,
    isKey = _require.isKey,
    persistInlineImages = _require.persistInlineImages,
    sanitizeContent = _require.sanitizeContent,
    sanitize = _require.sanitize,
    equationImageSelector = _require.equationImageSelector,
    totalImageCount = _require.totalImageCount;

var toolbars = require('./toolbars');
var mathEditor = require('./math-editor');
var locales = {
    FI: require('./FI'),
    SV: require('./SV')
};
var l = locales[window.locale || 'FI'].editor;
var keyCodes = {
    ENTER: 13,
    ESC: 27
};
var $outerPlaceholder = $('<div class="rich-text-editor-hidden" data-js="outerPlaceholder">');
var focus = {
    richText: false,
    latexField: false,
    equationField: false
};
var $currentEditor = void 0;
var math = mathEditor.init($outerPlaceholder, focus, onMathFocusChanged);

function onMathFocusChanged() {
    if (richTextAndMathBlur()) onRichTextEditorBlur();
}

var _toolbars$init = toolbars.init(math, function () {
    return focus.richText;
}, l),
    $toolbar = _toolbars$init.$toolbar;

$('body').append($outerPlaceholder, $toolbar);

module.exports.makeRichText = function (element, options) {
    var onValueChanged = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
    var _options$screenshot = options.screenshot,
        saver = _options$screenshot.saver,
        limit = _options$screenshot.limit;

    var $answer = $(element);
    var pasteInProgress = false;

    $answer.attr({
        'contenteditable': 'true',
        'spellcheck': 'false',
        'data-js': 'answer'
    }).addClass('rich-text-editor').on('mousedown', equationImageSelector, function (e) {
        onRichTextEditorFocus($(e.target).closest('[data-js="answer"]'));
        math.openMathEditor($(e.target));
    }).on('keypress', function (e) {
        if (isCtrlKey(e, 'l') || isCtrlKey(e, 'i')) math.insertNewEquation();
        if (isCtrlKey(e, keyCodes.ENTER) || isKey(e, keyCodes.ESC)) math.closeMathEditor(true);
    }).on('focus blur', function (e) {
        if (math.isVisible() && e.type === 'focus') math.closeMathEditor();
        onRichTextEditorFocusChanged(e);
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
                if (totalImageCount($answer, clipboardDataAsHtml) <= limit) {
                    window.document.execCommand('insertHTML', false, sanitize(clipboardDataAsHtml));
                    setTimeout(function () {
                        return persistInlineImages($currentEditor, saver, limit, onValueChanged);
                    }, 0);
                } else {
                    onValueChanged(new Bacon.Error('Screenshot limit reached!'));
                }
            } else {
                setTimeout(function () {
                    return persistInlineImages($currentEditor, saver, limit, onValueChanged);
                }, 0);
            }
        }
    });

    setTimeout(function () {
        return document.execCommand("enableObjectResizing", false, false);
    }, 0);
};

function toggleRichTextToolbar(isVisible) {
    $('body').toggleClass('rich-text-editor-focus', isVisible);
}
function onRichTextEditorFocus($element) {
    $currentEditor = $element;
    toggleRichTextToolbar(true);
}

function onRichTextEditorBlur() {
    toggleRichTextToolbar(false);
    math.closeMathEditor();
    focus.richText = false;
}

var richTextEditorBlurTimeout = void 0;

function onRichTextEditorFocusChanged(e) {
    focus.richText = e.type === 'focus';

    clearTimeout(richTextEditorBlurTimeout);
    richTextEditorBlurTimeout = setTimeout(function () {
        if (richTextAndMathBlur()) onRichTextEditorBlur();else if (focus.richText && math.isVisible()) math.closeMathEditor();else onRichTextEditorFocus($(e.target));
    }, 0);
}

function richTextAndMathBlur() {
    return !focus.richText && !math.isVisible() && !focus.latexField && !focus.equationField;
}

},{"./FI":1,"./SV":2,"./math-editor":5,"./toolbars":9,"./util":10}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
'use strict';

module.exports = [{
    label: 'Perus',
    characters: [{ character: '≠', latexCommand: '\\neq', popular: true }, { character: '≈', latexCommand: '\\approx', popular: true }, { character: '≤', latexCommand: '\\leq', popular: true }, { character: '≥', latexCommand: '\\geq', popular: true }, { character: '²', latexCommand: '^2', popular: true }, { character: '³', latexCommand: '^3', popular: true }, { character: '½', latexCommand: '1/2', popular: true }, { character: '⅓', latexCommand: '1/3' }, { character: '±', latexCommand: '\\pm' }]
}, {
    label: 'Algebra',
    characters: [{ character: '∼', latexCommand: '\\sim' }, { character: '≡', latexCommand: '\\equiv' }, { character: '≢' }, // \nequiv or \not\equiv
    { character: '·', latexCommand: '\\cdot', popular: true }, { character: '…', latexCommand: '\\dots' }, // matriisialgebra?
    { character: '∞', latexCommand: '\\infty', popular: true }]
}, {
    label: 'Kreikkalaiset aakkoset',
    characters: [{ character: 'α', latexCommand: '\\alpha', popular: true }, { character: 'β', latexCommand: '\\beta', popular: true }, { character: 'δ', latexCommand: '\\delta' }, { character: 'ε', latexCommand: '\\varepsilon' }, { character: 'η', latexCommand: '\\eta' }, { character: '∂', latexCommand: '\\partial' }, { character: '𝜄', latexCommand: '\\iota' }, { character: 'λ', latexCommand: '\\lambda' }, { character: 'µ', latexCommand: '\\mu' }, { character: 'π', latexCommand: '\\pi', popular: true }, { character: 'σ', latexCommand: '\\sigma' }, { character: 'τ', latexCommand: '\\tau' }, { character: 'Ф', latexCommand: '\\phi' }, { character: 'ω', latexCommand: '\\omega' }, { character: 'Γ', latexCommand: '\\Gamma' }, { character: 'Δ', latexCommand: '\\Delta', popular: true }, { character: 'Θ', latexCommand: '\\Theta' }, { character: '∏', latexCommand: '\\Pi' }, { character: '∑', latexCommand: '\\Sigma', popular: true }, { character: 'Φ', latexCommand: '\\Phi' }, { character: 'Ω', latexCommand: '\\Omega' }]
}, {
    label: 'Geometria ja vektorioppi',
    characters: [{ character: '°', popular: true }, { character: '∠', latexCommand: '\\angle' }, { character: '⊥', latexCommand: '\\perp', popular: true }, { character: '‖', latexCommand: '\\parallel', popular: true }, { character: '⇅' }, { character: '↑', latexCommand: '\\uparrow' }, { character: '↓', latexCommand: '\\downarrow' }, { character: '↔', latexCommand: '\\leftrightarrow' }, { character: '⇌' } // \rightleftharpoons
    ]
}, {
    label: 'Logiikka ja joukko-oppi',
    characters: [{ character: '⇒', latexCommand: '\\Rightarrow', popular: true }, { character: '⇔', latexCommand: '\\Leftrightarrow', popular: true }, { character: '∧', latexCommand: '\\and' }, { character: '∨', latexCommand: '\\or' }, { character: '¬' }, { character: '∃', latexCommand: '\\exists', popular: true }, { character: '∀', latexCommand: '\\forall', popular: true }, { character: '∩', latexCommand: '\\cap' }, { character: '∪', latexCommand: '\\cup' }, { character: '∖', latexCommand: '\\setminus' }, { character: '⊂', latexCommand: '\\subset' }, { character: '⊄', latexCommand: '\\notsubset' }, { character: '∈', latexCommand: '\\in' }, { character: '∉', latexCommand: '\\notin' }, { character: '∅', latexCommand: '\\empty' }, { character: '→', latexCommand: '\\rightarrow' }, { character: '∘', latexCommand: '\\circ' }, { character: '∼', latexCommand: '\\sim' }, { character: 'ℝ' }, { character: 'ℕ', popular: true }, { character: 'ℤ', popular: true }, { character: 'ℚ' }]
}];

},{}],9:[function(require,module,exports){
'use strict';

var specialCharacterGroups = require('./specialCharacters');
var latexCommands = require('./latexCommands');

module.exports = {
    init: init
};

function init(mathEditor, hasRichTextFocus, l) {
    var $toolbar = $('\n        <div class="rich-text-editor-tools" data-js="tools">\n            <div class="rich-text-editor-tools-button-wrapper">\n                <div class="rich-text-editor-toolbar-wrapper">\n                    <button class="rich-text-editor-characters-expand-collapse" data-js="expandCollapseCharacters" style="z-index: 100"></button>\n                </div>\n            </div>\n            <div class="rich-text-editor-tools-row">\n                <div class="rich-text-editor-toolbar-wrapper">\n                    <div class="rich-text-editor-toolbar-characters rich-text-editor-toolbar rich-text-editor-toolbar-button-list" data-js="charactersList"></div>\n                </div>\n            </div>\n            <div class="rich-text-editor-tools-row">\n                <div class="rich-text-editor-toolbar-wrapper rich-text-editor-equation-wrapper">\n                    <div class="rich-text-editor-toolbar-equation rich-text-editor-toolbar rich-text-editor-toolbar-button-list" data-js="mathToolbar"></div>\n                </div>\n            </div>\n            <div class="rich-text-editor-tools-button-wrapper">\n                <div class="rich-text-editor-toolbar-wrapper">\n                    <button class="rich-text-editor-new-equation rich-text-editor-button rich-text-editor-button-action" data-js="newEquation" data-command="Ctrl-L">\u03A3 ' + l.insertEquation + '</button>\n                </div>\n            </div>\n        </div>\n        ').on('mousedown', '[data-js="expandCollapseCharacters"]', function (e) {
        e.preventDefault();
        $toolbar.toggleClass('rich-text-editor-characters-expanded');
    });

    var $newEquation = $toolbar.find('[data-js="newEquation"]');
    var $mathToolbar = $toolbar.find('[data-js="mathToolbar"]');
    initSpecialCharacterToolbar($toolbar, mathEditor, hasRichTextFocus);
    initMathToolbar($mathToolbar, mathEditor);
    initNewEquation($newEquation, mathEditor, hasRichTextFocus);

    return { $toolbar: $toolbar };
}

var specialCharacterToButton = function specialCharacterToButton(char) {
    return '<button class="rich-text-editor-button rich-text-editor-button-grid' + (char.popular ? ' rich-text-editor-characters-popular' : '') + '" ' + (char.latexCommand ? 'data-command="' + char.latexCommand + '"' : '') + '>' + char.character + '</button>';
};

var popularInGroup = function popularInGroup(group) {
    return group.characters.filter(function (character) {
        return character.popular;
    }).length;
};

function initSpecialCharacterToolbar($toolbar, mathEditor, hasAnswerFocus) {
    var gridButtonWidthPx = 35;

    $toolbar.find('[data-js="charactersList"]').append(specialCharacterGroups.map(function (group) {
        return '<div class="rich-text-editor-toolbar-characters-group" \n                  style="width: ' + popularInGroup(group) * gridButtonWidthPx + 'px">\n                  ' + group.characters.map(specialCharacterToButton).join('') + '\n             </div>';
    })).on('mousedown', 'button', function (e) {
        e.preventDefault();

        var character = e.currentTarget.innerText;
        var command = e.currentTarget.dataset.command;
        if (hasAnswerFocus()) window.document.execCommand('insertText', false, character);else mathEditor.insertMath(command || character);
    });
}

function initMathToolbar($mathToolbar, mathEditor) {
    $mathToolbar.append(latexCommands.map(function (o) {
        return '<button class="rich-text-editor-button rich-text-editor-button-grid" data-command="' + o.action + '" data-latexcommand="' + o.label + '" data-usewrite="' + (o.useWrite || false) + '">\n<img src="/math.svg?latex=' + encodeURIComponent(o.label ? o.label.replace(/X/g, '\\square') : o.action) + '"/>\n</button>';
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

},{"./latexCommands":3,"./specialCharacters":8}],10:[function(require,module,exports){
(function (Buffer){
'use strict';

var sanitizeHtml = require('sanitize-html');
var sanitizeOpts = require('./sanitizeOpts');
var loadingImg = require('./loadingImg');
var equationImageSelector = 'img[src^="/math.svg"]';

module.exports = { isKey: isKey, isCtrlKey: isCtrlKey, insertToTextAreaAtCursor: insertToTextAreaAtCursor, persistInlineImages: persistInlineImages, sanitize: sanitize, sanitizeContent: sanitizeContent, setCursorAfter: setCursorAfter, equationImageSelector: equationImageSelector, totalImageCount: totalImageCount };

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

function setCursorAfter($img) {
    var range = document.createRange();
    var img = $img.get(0);
    var nextSibling = img.nextSibling && img.nextSibling.tagName === 'BR' ? img.nextSibling : img;
    range.setStart(nextSibling, 0);
    range.setEnd(nextSibling, 0);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

function markAndGetInlineImages($editor) {
    var images = $editor.find('img[src^="data"]').toArray().map(function (el, index) {
        return Object.assign(decodeBase64Image(el.getAttribute('src')), {
            $el: $(el)
        });
    });
    images.filter(function (_ref) {
        var type = _ref.type;
        return type !== 'image/png';
    }).forEach(function (_ref2) {
        var $el = _ref2.$el;
        return $el.remove();
    });
    var pngImages = images.filter(function (_ref3) {
        var type = _ref3.type;
        return type === 'image/png';
    });
    pngImages.forEach(function (_ref4) {
        var $el = _ref4.$el;
        return $el.attr('src', loadingImg);
    });
    return pngImages;
}

function existingScreenshotCount($editor) {
    var imageCount = $editor.find('img').length;
    var equationCount = $editor.find(equationImageSelector).length;
    return imageCount - equationCount;
}

function checkForImageLimit($editor, imageData, limit) {
    return Bacon.once(existingScreenshotCount($editor) > limit ? new Bacon.Error() : imageData);
}

function persistInlineImages($editor, screenshotSaver, screenshotCountLimit, onValueChanged) {
    Bacon.combineAsArray(markAndGetInlineImages($editor).map(function (data) {
        return checkForImageLimit($editor, data, screenshotCountLimit).doError(function () {
            return onValueChanged(new Bacon.Error('Screenshot limit reached!'));
        }).flatMapLatest(function () {
            return Bacon.fromPromise(screenshotSaver(data));
        }).doAction(function (screenShotUrl) {
            return data.$el.attr('src', screenShotUrl);
        }).doError(function () {
            return data.$el.remove();
        });
    })).onValue(function (k) {
        return $editor.trigger('input');
    });
}

function totalImageCount($answer, clipboardDataAsHtml) {
    return existingScreenshotCount($answer) + existingScreenshotCount($('<div>' + clipboardDataAsHtml + '</div>'));
}

}).call(this,require("buffer").Buffer)

},{"./loadingImg":4,"./sanitizeOpts":7,"buffer":undefined,"sanitize-html":undefined}]},{},[6])(6)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvRkkuanMiLCJhcHAvU1YuanMiLCJhcHAvbGF0ZXhDb21tYW5kcy5qcyIsImFwcC9sb2FkaW5nSW1nLmpzIiwiYXBwL21hdGgtZWRpdG9yLmpzIiwiYXBwL3JpY2gtdGV4dC1lZGl0b3IuanMiLCJhcHAvc2FuaXRpemVPcHRzLmpzIiwiYXBwL3NwZWNpYWxDaGFyYWN0ZXJzLmpzIiwiYXBwL3Rvb2xiYXJzLmpzIiwiYXBwL3V0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLE9BQU8sT0FBUCxHQUFpQjtBQUNiLFlBQVE7QUFDSixvQkFBWSxnQkFEUjtBQUVKLGVBQU8seUNBRkg7QUFHSixraEJBSEk7QUFXSixxREFYSTtBQVlKLDRkQVpJO0FBdUJKLG9CQUFZLFVBdkJSO0FBd0JKLDJCQUFtQixlQXhCZjtBQXlCSix3QkFBZ0IsYUF6Qlo7QUEwQkosZUFBTyxPQTFCSDtBQTJCSixjQUFNLFVBM0JGO0FBNEJKLGlCQUFTLFlBNUJMO0FBNkJKLHNCQUFjLG1CQTdCVjtBQThCSixrQkFBVSxLQTlCTjtBQStCSixtQkFBVyxZQS9CUDtBQWdDSixxQkFBYTtBQWhDVCxLQURLO0FBbUNiLGdCQUFZO0FBQ1Isc0JBQWMsbUJBRE47QUFFUixpQkFBUyxZQUZEO0FBR1Isb0JBQVksZ0JBSEo7QUFJUixlQUFPLFdBSkM7QUFLUixrQkFBVSxHQUxGO0FBTVIsdUJBQWUsc0JBTlA7QUFPUixjQUFNLG9CQVBFO0FBUVIsa0JBQVUsZUFSRjtBQVNSLG1CQUFXO0FBVEg7QUFuQ0MsQ0FBakI7Ozs7O0FDQUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsWUFBUTtBQUNKLG9CQUFZLGlCQURSO0FBRUosZUFBTywwQ0FGSDtBQUdKLDZoQkFISTtBQVFKLHdEQVJJO0FBU0osb1lBVEk7QUFrQkosb0JBQVksYUFsQlI7QUFtQkosMkJBQW1CLGVBbkJmO0FBb0JKLHdCQUFnQixrQkFwQlo7QUFxQkosZUFBTyxPQXJCSDtBQXNCSixjQUFNLE9BdEJGO0FBdUJKLGlCQUFTLFlBdkJMO0FBd0JKLHNCQUFjLGlCQXhCVjtBQXlCSixrQkFBVSxHQXpCTjtBQTBCSixtQkFBVyxVQTFCUDtBQTJCSixxQkFBYTtBQTNCVCxLQURLO0FBOEJiLGdCQUFZO0FBQ1Isc0JBQWMsZ0JBRE47QUFFUixpQkFBUyxZQUZEO0FBR1Isb0JBQVksaUJBSEo7QUFJUixlQUFPLFdBSkM7QUFLUixrQkFBVSxLQUxGO0FBTVIsdUJBQWUsaUJBTlA7QUFPUixjQUFNLG9CQVBFO0FBUVIsa0JBQVUsWUFSRjtBQVNSLG1CQUFXO0FBVEg7QUE5QkMsQ0FBakI7Ozs7O0FDQUEsT0FBTyxPQUFQLEdBQWlCLENBQ2IsRUFBQyxRQUFRLFFBQVQsRUFBbUIsT0FBTyxXQUExQixFQURhLEVBRWIsRUFBQyxRQUFRLEdBQVQsRUFBYyxPQUFPLE9BQXJCLEVBRmEsRUFHYixFQUFDLFFBQVEsUUFBVCxFQUFtQixPQUFPLGNBQTFCLEVBSGEsRUFJYixFQUFDLFFBQVEsT0FBVCxFQUFrQixPQUFPLGVBQXpCLEVBSmEsRUFLYixFQUFDLFFBQVEsUUFBVCxFQUFtQixPQUFPLFdBQTFCLEVBTGEsRUFNYixFQUFDLFFBQVEsOEJBQVQsRUFBeUMsT0FBTyw4QkFBaEQsRUFBZ0YsVUFBUyxJQUF6RixFQU5hLEVBT2IsRUFBQyxRQUFRLGtCQUFULEVBQTZCLE9BQU8scUJBQXBDLEVBUGEsRUFRYixFQUFDLFFBQVEsR0FBVCxFQUFjLE9BQU8sS0FBckIsRUFSYSxFQVNiLEVBQUMsUUFBUSxXQUFULEVBQXNCLE9BQU8sY0FBN0IsRUFUYSxFQVViLEVBQUMsUUFBUSxPQUFULEVBQWtCLE9BQU8sZUFBekIsRUFWYSxFQVdiLEVBQUMsUUFBUSxTQUFULEVBQW9CLE9BQU8sZUFBM0IsRUFYYSxFQVliLEVBQUMsUUFBUSxPQUFULEVBWmEsRUFhYixFQUFDLFFBQVEsT0FBVCxFQWJhLEVBY2IsRUFBQyxRQUFRLE9BQVQsRUFkYSxFQWViLEVBQUMsUUFBUSxPQUFULEVBQWtCLE9BQU8sVUFBekIsRUFmYSxFQWdCYixFQUFDLFFBQVEsT0FBVCxFQUFrQixPQUFPLFVBQXpCLEVBaEJhLEVBaUJiLEVBQUMsUUFBUSx1QkFBVCxFQUFrQyxVQUFVLElBQTVDLEVBakJhLEVBa0JiLEVBQUMsUUFBUSx1QkFBVCxFQUFrQyxVQUFVLElBQTVDLEVBbEJhLEVBbUJiLEVBQUMsUUFBUSx1QkFBVCxFQUFrQyxVQUFVLElBQTVDLEVBbkJhLEVBb0JiLEVBQUMsUUFBUSxpQkFBVCxFQUE0QixPQUFPLG9CQUFuQyxFQXBCYSxFQXFCYixFQUFDLFFBQVEsR0FBVCxFQUFjLE9BQU8sS0FBckIsRUFyQmEsRUFzQmIsRUFBQyxRQUFRLEdBQVQsRUFBYyxPQUFPLEtBQXJCLEVBdEJhLEVBdUJiLEVBQUMsUUFBUSxXQUFULEVBQXNCLE9BQU8sV0FBN0IsRUFBMEMsVUFBVSxJQUFwRCxFQXZCYSxFQXdCYixFQUFDLFFBQVEsUUFBVCxFQUFtQixPQUFPLFdBQTFCLEVBeEJhLENBQWpCOzs7OztBQ0FBLE9BQU8sT0FBUCxHQUFpQixnMUlBQWpCOzs7OztlQ0FtRCxRQUFRLFFBQVIsQztJQUE1Qyx3QixZQUFBLHdCO0lBQTBCLGMsWUFBQSxjOztBQUVqQyxJQUFNLEtBQUssVUFBVSxZQUFWLENBQXVCLENBQXZCLENBQVg7QUFDQSxPQUFPLE9BQVAsR0FBaUIsRUFBQyxVQUFELEVBQWpCOztBQUVBLFNBQVMsSUFBVCxDQUFjLGlCQUFkLEVBQWlDLEtBQWpDLEVBQXdDLGtCQUF4QyxFQUE0RDtBQUN4RCxRQUFNLHVCQUF1Qiw2UUFBN0I7O0FBTUEsc0JBQWtCLE1BQWxCLENBQXlCLG9CQUF6QjtBQUNBLFFBQU0sY0FBYyxxQkFBcUIsSUFBckIsQ0FBMEIsd0JBQTFCLENBQXBCO0FBQ0EsUUFBTSxpQkFBaUIscUJBQXFCLElBQXJCLENBQTBCLDJCQUExQixDQUF2QjtBQUNBLFFBQUksc0JBQUo7QUFDQSxRQUFJLFVBQVUsS0FBZDtBQUNBLFFBQUksZUFBZSxJQUFuQjtBQUNBO0FBQ0EsUUFBTSxhQUFhLEdBQUcsU0FBSCxDQUFhLGVBQWUsR0FBZixDQUFtQixDQUFuQixDQUFiLEVBQW9DO0FBQ25ELGtCQUFVO0FBQ04sa0JBQU0sUUFEQTtBQUVOLG1CQUFPLHNCQUFTO0FBQ1osZ0NBQWdCLElBQWhCO0FBQ0EsMkJBQVc7QUFBQSwyQkFBTSxrQkFBa0IsTUFBbEIsQ0FBTjtBQUFBLGlCQUFYLEVBQTRDLENBQTVDO0FBQ0g7QUFMSztBQUR5QyxLQUFwQyxDQUFuQjtBQVNBLG1CQUNLLEVBREwsQ0FDUSxTQURSLEVBQ21CLHVCQURuQixFQUM0QyxRQUQ1QyxFQUVLLEVBRkwsQ0FFUSxZQUZSLEVBRXNCLHVCQUZ0QixFQUUrQyxhQUFLO0FBQzVDLGNBQU0sYUFBTixHQUFzQixFQUFFLElBQUYsS0FBVyxNQUFYLElBQXFCLEVBQUUsSUFBRixLQUFXLFVBQXREO0FBQ0E7QUFDSCxLQUxMOztBQU9BLGdCQUNLLEtBREwsQ0FDVyxhQURYLEVBRUssRUFGTCxDQUVRLFlBRlIsRUFFc0IsYUFBSztBQUNuQixjQUFNLFVBQU4sR0FBbUIsRUFBRSxJQUFGLEtBQVcsTUFBOUI7QUFDQTtBQUNILEtBTEw7O0FBT0EsV0FBTztBQUNILDRDQURHO0FBRUgsOEJBRkc7QUFHSCx3Q0FIRztBQUlILHNDQUpHO0FBS0gsc0NBTEc7QUFNSDtBQU5HLEtBQVA7O0FBU0EsYUFBUyxTQUFULEdBQXFCO0FBQ2pCLGVBQU8sT0FBUDtBQUNIO0FBQ0QsYUFBUyxRQUFULEdBQW9CO0FBQ2hCLHFCQUFhLGFBQWI7QUFDQSx3QkFBZ0IsV0FBVyxZQUFNO0FBQzdCLGdCQUFJLE1BQU0sVUFBVixFQUNJO0FBQ0osZ0JBQU0sUUFBUSxXQUFXLEtBQVgsRUFBZDtBQUNBLHdCQUFZLEdBQVosQ0FBZ0IsS0FBaEI7QUFDQSwwQkFBYyxxQkFBcUIsSUFBckIsRUFBZCxFQUEyQyxLQUEzQztBQUNILFNBTmUsRUFNYixHQU5hLENBQWhCO0FBT0g7O0FBRUQsYUFBUyxhQUFULEdBQXlCO0FBQ3JCLHNCQUFjLHFCQUFxQixJQUFyQixFQUFkLEVBQTJDLFlBQVksR0FBWixFQUEzQztBQUNBLG1CQUFXO0FBQUEsbUJBQU0sV0FBVyxLQUFYLENBQWlCLFlBQVksR0FBWixFQUFqQixDQUFOO0FBQUEsU0FBWCxFQUFzRCxDQUF0RDtBQUNIOztBQUVELGFBQVMsY0FBVCxHQUEwQjtBQUN0QixxQkFBYSxZQUFiO0FBQ0EsdUJBQWUsV0FBVyxZQUFNO0FBQzVCLGdCQUFJLENBQUMsTUFBTSxVQUFQLElBQXFCLENBQUMsTUFBTSxhQUFoQyxFQUErQztBQUMvQztBQUNILFNBSGMsRUFHWixDQUhZLENBQWY7QUFJSDs7QUFFRCxhQUFTLGlCQUFULEdBQWdEO0FBQUEsWUFBckIsY0FBcUIsdUVBQUosRUFBSTs7QUFDNUMsZUFBTyxRQUFQLENBQWdCLFdBQWhCLENBQTRCLFlBQTVCLEVBQTBDLEtBQTFDLEVBQWlELGlCQUFpQixtREFBbEU7QUFDQSx1QkFBZSxFQUFFLGlCQUFGLEVBQXFCLFVBQXJCLENBQWdDLFNBQWhDLENBQWY7QUFDSDs7QUFFRCxhQUFTLGNBQVQsQ0FBd0IsSUFBeEIsRUFBOEI7QUFDMUIsWUFBSSxPQUFKLEVBQWE7QUFDYix1QkFBZSxJQUFmO0FBQ0EsdUJBQWUsSUFBZjtBQUNIOztBQUVELGFBQVMsY0FBVCxDQUF3QixJQUF4QixFQUE4QjtBQUMxQixhQUFLLElBQUw7QUFDQSxhQUFLLEtBQUwsQ0FBVyxvQkFBWDtBQUNBLGtCQUFVLElBQVY7QUFDQSwwQkFBa0IsSUFBbEI7QUFDQSxtQkFBVztBQUFBLG1CQUFNLFdBQVcsS0FBWCxFQUFOO0FBQUEsU0FBWCxFQUFxQyxDQUFyQztBQUNBLG9CQUFZLEdBQVosQ0FBZ0IsS0FBSyxJQUFMLENBQVUsS0FBVixDQUFoQjtBQUNBO0FBQ0g7O0FBRUQsYUFBUyxVQUFULENBQW9CLE1BQXBCLEVBQTRCLGlCQUE1QixFQUErQyxRQUEvQyxFQUF5RDtBQUNyRCxZQUFJLE1BQU0sVUFBVixFQUFzQjtBQUNsQixxQ0FBeUIsWUFBWSxHQUFaLENBQWdCLENBQWhCLENBQXpCLEVBQTZDLHFCQUFxQixNQUFsRTtBQUNBO0FBQ0gsU0FIRCxNQUdPLElBQUksTUFBTSxhQUFWLEVBQXlCO0FBQzVCLGdCQUFJLFFBQUosRUFBYztBQUNWLDJCQUFXLEtBQVgsQ0FBaUIsTUFBakI7QUFDSCxhQUZELE1BRU87QUFDSCwyQkFBVyxTQUFYLENBQXFCLE1BQXJCO0FBQ0g7QUFDRCxnQkFBSSxPQUFPLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBSixFQUE2QixXQUFXLFNBQVgsQ0FBcUIsS0FBckI7QUFDN0IsdUJBQVc7QUFBQSx1QkFBTSxXQUFXLEtBQVgsRUFBTjtBQUFBLGFBQVgsRUFBcUMsQ0FBckM7QUFDSDtBQUNKOztBQUVELGFBQVMsYUFBVCxDQUF1QixJQUF2QixFQUE2QixLQUE3QixFQUFvQztBQUNoQyxhQUFLLElBQUwsQ0FBVTtBQUNOLGlCQUFLLHFCQUFxQixtQkFBbUIsS0FBbkIsQ0FEcEI7QUFFTixpQkFBSztBQUZDLFNBQVY7QUFJSDs7QUFFRCxhQUFTLGVBQVQsR0FBcUQ7QUFBQSxZQUE1QixrQkFBNEIsdUVBQVAsS0FBTzs7QUFDakQ7QUFDQSxZQUFNLGlCQUFpQixxQkFBcUIsT0FBckIsQ0FBNkIsb0JBQTdCLENBQXZCO0FBQ0EsWUFBTSxPQUFPLHFCQUFxQixJQUFyQixFQUFiO0FBQ0EsWUFBSSxZQUFZLEdBQVosR0FBa0IsSUFBbEIsT0FBNkIsRUFBakMsRUFBcUM7QUFDakMsaUJBQUssTUFBTDtBQUNILFNBRkQsTUFFTztBQUNILGlCQUFLLElBQUw7QUFDQSwwQkFBYyxJQUFkLEVBQW9CLFlBQVksR0FBWixFQUFwQjtBQUNIOztBQUVELDBCQUFrQixLQUFsQjtBQUNBLDBCQUFrQixNQUFsQixDQUF5QixvQkFBekI7QUFDQSxrQkFBVSxLQUFWO0FBQ0EsY0FBTSxVQUFOLEdBQW1CLEtBQW5CO0FBQ0EsY0FBTSxhQUFOLEdBQXNCLEtBQXRCO0FBQ0EsWUFBSSxrQkFBSixFQUF3QixlQUFlLEtBQWY7QUFDM0I7O0FBRUQsYUFBUyxpQkFBVCxDQUEyQixTQUEzQixFQUFzQztBQUNsQyxVQUFFLE1BQUYsRUFBVSxXQUFWLENBQXNCLG1CQUF0QixFQUEyQyxTQUEzQztBQUNIO0FBQ0o7Ozs7O2VDL0lrSCxRQUFRLFFBQVIsQztJQUE1RyxTLFlBQUEsUztJQUFXLEssWUFBQSxLO0lBQU8sbUIsWUFBQSxtQjtJQUFxQixlLFlBQUEsZTtJQUFpQixRLFlBQUEsUTtJQUFVLHFCLFlBQUEscUI7SUFBdUIsZSxZQUFBLGU7O0FBQ2hHLElBQU0sV0FBVyxRQUFRLFlBQVIsQ0FBakI7QUFDQSxJQUFNLGFBQWEsUUFBUSxlQUFSLENBQW5CO0FBQ0EsSUFBTSxVQUFVO0FBQ1osUUFBSSxRQUFRLE1BQVIsQ0FEUTtBQUVaLFFBQUksUUFBUSxNQUFSO0FBRlEsQ0FBaEI7QUFJQSxJQUFNLElBQUksUUFBUSxPQUFPLE1BQVAsSUFBaUIsSUFBekIsRUFBK0IsTUFBekM7QUFDQSxJQUFNLFdBQVc7QUFDYixXQUFPLEVBRE07QUFFYixTQUFLO0FBRlEsQ0FBakI7QUFJQSxJQUFNLG9CQUFvQixxRUFBMUI7QUFDQSxJQUFNLFFBQVE7QUFDVixjQUFVLEtBREE7QUFFVixnQkFBWSxLQUZGO0FBR1YsbUJBQWU7QUFITCxDQUFkO0FBS0EsSUFBSSx1QkFBSjtBQUNBLElBQU0sT0FBTyxXQUFXLElBQVgsQ0FBZ0IsaUJBQWhCLEVBQW1DLEtBQW5DLEVBQTBDLGtCQUExQyxDQUFiOztBQUVBLFNBQVMsa0JBQVQsR0FBOEI7QUFDMUIsUUFBSSxxQkFBSixFQUEyQjtBQUM5Qjs7cUJBRWtCLFNBQVMsSUFBVCxDQUFjLElBQWQsRUFBb0I7QUFBQSxXQUFNLE1BQU0sUUFBWjtBQUFBLENBQXBCLEVBQTBDLENBQTFDLEM7SUFBWixRLGtCQUFBLFE7O0FBRVAsRUFBRSxNQUFGLEVBQVUsTUFBVixDQUFpQixpQkFBakIsRUFBb0MsUUFBcEM7O0FBRUEsT0FBTyxPQUFQLENBQWUsWUFBZixHQUE4QixVQUFDLE9BQUQsRUFBVSxPQUFWLEVBQWtEO0FBQUEsUUFBL0IsY0FBK0IsdUVBQWQsWUFBTSxDQUFHLENBQUs7QUFBQSw4QkFNeEUsT0FOd0UsQ0FFeEUsVUFGd0U7QUFBQSxRQUdwRSxLQUhvRSx1QkFHcEUsS0FIb0U7QUFBQSxRQUlwRSxLQUpvRSx1QkFJcEUsS0FKb0U7O0FBTzVFLFFBQU0sVUFBVSxFQUFFLE9BQUYsQ0FBaEI7QUFDQSxRQUFJLGtCQUFrQixLQUF0Qjs7QUFFQSxZQUNLLElBREwsQ0FDVTtBQUNGLDJCQUFtQixNQURqQjtBQUVGLHNCQUFjLE9BRlo7QUFHRixtQkFBVztBQUhULEtBRFYsRUFNSyxRQU5MLENBTWMsa0JBTmQsRUFPSyxFQVBMLENBT1EsV0FQUixFQU9xQixxQkFQckIsRUFPNEMsYUFBSztBQUN6Qyw4QkFBc0IsRUFBRSxFQUFFLE1BQUosRUFBWSxPQUFaLENBQW9CLG9CQUFwQixDQUF0QjtBQUNBLGFBQUssY0FBTCxDQUFvQixFQUFFLEVBQUUsTUFBSixDQUFwQjtBQUNILEtBVkwsRUFXSyxFQVhMLENBV1EsVUFYUixFQVdvQixhQUFLO0FBQ2pCLFlBQUksVUFBVSxDQUFWLEVBQWEsR0FBYixLQUFxQixVQUFVLENBQVYsRUFBYSxHQUFiLENBQXpCLEVBQTRDLEtBQUssaUJBQUw7QUFDNUMsWUFBSSxVQUFVLENBQVYsRUFBYSxTQUFTLEtBQXRCLEtBQWdDLE1BQU0sQ0FBTixFQUFTLFNBQVMsR0FBbEIsQ0FBcEMsRUFBNEQsS0FBSyxlQUFMLENBQXFCLElBQXJCO0FBQy9ELEtBZEwsRUFlSyxFQWZMLENBZVEsWUFmUixFQWVzQixhQUFLO0FBQ25CLFlBQUksS0FBSyxTQUFMLE1BQW9CLEVBQUUsSUFBRixLQUFXLE9BQW5DLEVBQTRDLEtBQUssZUFBTDtBQUM1QyxxQ0FBNkIsQ0FBN0I7QUFDSCxLQWxCTCxFQW1CSyxFQW5CTCxDQW1CUSxhQW5CUixFQW1CdUIsYUFBSztBQUNwQixZQUFHLENBQUUsZUFBTCxFQUFzQixlQUFlLGdCQUFnQixFQUFFLGFBQWxCLENBQWY7QUFDekIsS0FyQkwsRUFzQkssRUF0QkwsQ0FzQlEsT0F0QlIsRUFzQmlCLGFBQUs7QUFDZCwwQkFBa0IsSUFBbEI7QUFDQSxtQkFBVztBQUFBLG1CQUFNLGtCQUFrQixLQUF4QjtBQUFBLFNBQVgsRUFBMEMsQ0FBMUM7O0FBRUEsWUFBSSxFQUFFLE1BQUYsQ0FBUyxPQUFULEtBQXFCLFVBQXpCLEVBQ0k7QUFDSixZQUFNLGdCQUFnQixFQUFFLGFBQUYsQ0FBZ0IsYUFBdEM7QUFDQSxZQUFNLE9BQU8sY0FBYyxLQUFkLElBQXVCLGNBQWMsS0FBZCxDQUFvQixDQUFwQixFQUF1QixTQUF2QixFQUFwQztBQUNBLFlBQUksSUFBSixFQUFVO0FBQ04sY0FBRSxjQUFGO0FBQ0EsZ0JBQUcsS0FBSyxJQUFMLEtBQWMsV0FBakIsRUFDSTtBQUNKLGtCQUFNLEVBQUMsTUFBTSxJQUFQLEVBQWEsTUFBTSxLQUFLLElBQXhCLEVBQThCLElBQUksT0FBTyxJQUFJLElBQUosR0FBVyxPQUFYLEVBQVAsQ0FBbEMsRUFBTixFQUF1RSxJQUF2RSxDQUE0RSx5QkFBaUI7QUFDekYsb0JBQU0scUJBQW1CLGFBQW5CLFFBQU47QUFDQSx1QkFBTyxRQUFQLENBQWdCLFdBQWhCLENBQTRCLFlBQTVCLEVBQTBDLEtBQTFDLEVBQWlELEdBQWpEO0FBQ0gsYUFIRDtBQUlILFNBUkQsTUFRTztBQUNILGdCQUFNLHNCQUFzQixjQUFjLE9BQWQsQ0FBc0IsV0FBdEIsQ0FBNUI7QUFDQSxnQkFBSSxtQkFBSixFQUF5QjtBQUNyQixrQkFBRSxjQUFGO0FBQ0Esb0JBQUcsZ0JBQWdCLE9BQWhCLEVBQXlCLG1CQUF6QixLQUFpRCxLQUFwRCxFQUEyRDtBQUN2RCwyQkFBTyxRQUFQLENBQWdCLFdBQWhCLENBQTRCLFlBQTVCLEVBQTBDLEtBQTFDLEVBQWlELFNBQVMsbUJBQVQsQ0FBakQ7QUFDQSwrQkFBVztBQUFBLCtCQUFNLG9CQUFvQixjQUFwQixFQUFvQyxLQUFwQyxFQUEyQyxLQUEzQyxFQUFrRCxjQUFsRCxDQUFOO0FBQUEscUJBQVgsRUFBb0YsQ0FBcEY7QUFDSCxpQkFIRCxNQUdPO0FBQ0gsbUNBQWUsSUFBSSxNQUFNLEtBQVYsQ0FBZ0IsMkJBQWhCLENBQWY7QUFDSDtBQUNKLGFBUkQsTUFRTztBQUNILDJCQUFXO0FBQUEsMkJBQUssb0JBQW9CLGNBQXBCLEVBQW9DLEtBQXBDLEVBQTJDLEtBQTNDLEVBQWtELGNBQWxELENBQUw7QUFBQSxpQkFBWCxFQUFtRixDQUFuRjtBQUNIO0FBRUo7QUFDSixLQXJETDs7QUF1REEsZUFBVztBQUFBLGVBQU0sU0FBUyxXQUFULENBQXFCLHNCQUFyQixFQUE2QyxLQUE3QyxFQUFvRCxLQUFwRCxDQUFOO0FBQUEsS0FBWCxFQUE2RSxDQUE3RTtBQUNILENBbEVEOztBQW9FQSxTQUFTLHFCQUFULENBQStCLFNBQS9CLEVBQTBDO0FBQ3RDLE1BQUUsTUFBRixFQUFVLFdBQVYsQ0FBc0Isd0JBQXRCLEVBQWdELFNBQWhEO0FBQ0g7QUFDRCxTQUFTLHFCQUFULENBQStCLFFBQS9CLEVBQXlDO0FBQ3JDLHFCQUFpQixRQUFqQjtBQUNBLDBCQUFzQixJQUF0QjtBQUNIOztBQUVELFNBQVMsb0JBQVQsR0FBZ0M7QUFDNUIsMEJBQXNCLEtBQXRCO0FBQ0EsU0FBSyxlQUFMO0FBQ0EsVUFBTSxRQUFOLEdBQWlCLEtBQWpCO0FBQ0g7O0FBRUQsSUFBSSxrQ0FBSjs7QUFFQSxTQUFTLDRCQUFULENBQXNDLENBQXRDLEVBQXlDO0FBQ3JDLFVBQU0sUUFBTixHQUFpQixFQUFFLElBQUYsS0FBVyxPQUE1Qjs7QUFFQSxpQkFBYSx5QkFBYjtBQUNBLGdDQUE0QixXQUFXLFlBQU07QUFDekMsWUFBSSxxQkFBSixFQUEyQix1QkFBM0IsS0FDSyxJQUFJLE1BQU0sUUFBTixJQUFrQixLQUFLLFNBQUwsRUFBdEIsRUFBd0MsS0FBSyxlQUFMLEdBQXhDLEtBQ0Esc0JBQXNCLEVBQUUsRUFBRSxNQUFKLENBQXRCO0FBQ1IsS0FKMkIsRUFJekIsQ0FKeUIsQ0FBNUI7QUFLSDs7QUFFRCxTQUFTLG1CQUFULEdBQStCO0FBQzNCLFdBQU8sQ0FBQyxNQUFNLFFBQVAsSUFBbUIsQ0FBQyxLQUFLLFNBQUwsRUFBcEIsSUFBd0MsQ0FBQyxNQUFNLFVBQS9DLElBQTZELENBQUMsTUFBTSxhQUEzRTtBQUNIOzs7OztBQzlIRCxPQUFPLE9BQVAsR0FBaUI7QUFDYixpQkFBYSxDQUNULEtBRFMsRUFFVCxLQUZTLEVBR1QsSUFIUyxDQURBO0FBTWIsdUJBQW1CO0FBQ2YsYUFBSyxDQUFDLEtBQUQsRUFBUSxLQUFSO0FBRFUsS0FOTjtBQVNiLG9CQUFnQixDQUFDLE1BQUQsRUFBUyxNQUFULEVBQWlCLE9BQWpCLENBVEg7QUFVYixxQkFBaUIseUJBQVMsS0FBVCxFQUFnQjtBQUFFLGVBQU8sTUFBTSxPQUFOLENBQWMsU0FBZCxNQUE2QixZQUFwQztBQUFrRDtBQVZ4RSxDQUFqQjs7Ozs7QUNBQSxPQUFPLE9BQVAsR0FBaUIsQ0FDYjtBQUNJLFdBQU8sT0FEWDtBQUVJLGdCQUFZLENBQ1IsRUFBRSxXQUFXLEdBQWIsRUFBa0IsY0FBYyxPQUFoQyxFQUF5QyxTQUFTLElBQWxELEVBRFEsRUFFUixFQUFFLFdBQVcsR0FBYixFQUFrQixjQUFjLFVBQWhDLEVBQTRDLFNBQVMsSUFBckQsRUFGUSxFQUdSLEVBQUUsV0FBVyxHQUFiLEVBQWtCLGNBQWMsT0FBaEMsRUFBeUMsU0FBUyxJQUFsRCxFQUhRLEVBSVIsRUFBRSxXQUFXLEdBQWIsRUFBa0IsY0FBYyxPQUFoQyxFQUF5QyxTQUFTLElBQWxELEVBSlEsRUFLUixFQUFFLFdBQVcsR0FBYixFQUFrQixjQUFjLElBQWhDLEVBQXNDLFNBQVMsSUFBL0MsRUFMUSxFQU1SLEVBQUUsV0FBVyxHQUFiLEVBQWtCLGNBQWMsSUFBaEMsRUFBc0MsU0FBUyxJQUEvQyxFQU5RLEVBT1IsRUFBRSxXQUFXLEdBQWIsRUFBa0IsY0FBYyxLQUFoQyxFQUF1QyxTQUFTLElBQWhELEVBUFEsRUFRUixFQUFFLFdBQVcsR0FBYixFQUFrQixjQUFjLEtBQWhDLEVBUlEsRUFTUixFQUFFLFdBQVcsR0FBYixFQUFrQixjQUFjLE1BQWhDLEVBVFE7QUFGaEIsQ0FEYSxFQWViO0FBQ0ksV0FBTyxTQURYO0FBRUksZ0JBQVksQ0FDUixFQUFFLFdBQVcsR0FBYixFQUFrQixjQUFjLE9BQWhDLEVBRFEsRUFFUixFQUFFLFdBQVcsR0FBYixFQUFrQixjQUFjLFNBQWhDLEVBRlEsRUFHUixFQUFFLFdBQVcsR0FBYixFQUhRLEVBR1k7QUFDcEIsTUFBRSxXQUFXLEdBQWIsRUFBa0IsY0FBYyxRQUFoQyxFQUEwQyxTQUFTLElBQW5ELEVBSlEsRUFLUixFQUFFLFdBQVcsR0FBYixFQUFrQixjQUFjLFFBQWhDLEVBTFEsRUFLb0M7QUFDNUMsTUFBRSxXQUFXLEdBQWIsRUFBa0IsY0FBYyxTQUFoQyxFQUEyQyxTQUFTLElBQXBELEVBTlE7QUFGaEIsQ0FmYSxFQTBCYjtBQUNJLFdBQU8sd0JBRFg7QUFFSSxnQkFBWSxDQUNSLEVBQUUsV0FBVyxHQUFiLEVBQWtCLGNBQWMsU0FBaEMsRUFBMkMsU0FBUyxJQUFwRCxFQURRLEVBRVIsRUFBRSxXQUFXLEdBQWIsRUFBa0IsY0FBYyxRQUFoQyxFQUEwQyxTQUFTLElBQW5ELEVBRlEsRUFHUixFQUFFLFdBQVcsR0FBYixFQUFrQixjQUFjLFNBQWhDLEVBSFEsRUFJUixFQUFFLFdBQVcsR0FBYixFQUFrQixjQUFjLGNBQWhDLEVBSlEsRUFLUixFQUFFLFdBQVcsR0FBYixFQUFrQixjQUFjLE9BQWhDLEVBTFEsRUFNUixFQUFFLFdBQVcsR0FBYixFQUFrQixjQUFjLFdBQWhDLEVBTlEsRUFPUixFQUFFLFdBQVcsSUFBYixFQUFtQixjQUFjLFFBQWpDLEVBUFEsRUFRUixFQUFFLFdBQVcsR0FBYixFQUFrQixjQUFjLFVBQWhDLEVBUlEsRUFTUixFQUFFLFdBQVcsR0FBYixFQUFrQixjQUFjLE1BQWhDLEVBVFEsRUFVUixFQUFFLFdBQVcsR0FBYixFQUFrQixjQUFjLE1BQWhDLEVBQXdDLFNBQVMsSUFBakQsRUFWUSxFQVdSLEVBQUUsV0FBVyxHQUFiLEVBQWtCLGNBQWMsU0FBaEMsRUFYUSxFQVlSLEVBQUUsV0FBVyxHQUFiLEVBQWtCLGNBQWMsT0FBaEMsRUFaUSxFQWFSLEVBQUUsV0FBVyxHQUFiLEVBQWtCLGNBQWMsT0FBaEMsRUFiUSxFQWNSLEVBQUUsV0FBVyxHQUFiLEVBQWtCLGNBQWMsU0FBaEMsRUFkUSxFQWVSLEVBQUUsV0FBVyxHQUFiLEVBQWtCLGNBQWMsU0FBaEMsRUFmUSxFQWdCUixFQUFFLFdBQVcsR0FBYixFQUFrQixjQUFjLFNBQWhDLEVBQTJDLFNBQVMsSUFBcEQsRUFoQlEsRUFpQlIsRUFBRSxXQUFXLEdBQWIsRUFBa0IsY0FBYyxTQUFoQyxFQWpCUSxFQWtCUixFQUFFLFdBQVcsR0FBYixFQUFrQixjQUFjLE1BQWhDLEVBbEJRLEVBbUJSLEVBQUUsV0FBVyxHQUFiLEVBQWtCLGNBQWMsU0FBaEMsRUFBMkMsU0FBUyxJQUFwRCxFQW5CUSxFQW9CUixFQUFFLFdBQVcsR0FBYixFQUFrQixjQUFjLE9BQWhDLEVBcEJRLEVBcUJSLEVBQUUsV0FBVyxHQUFiLEVBQWtCLGNBQWMsU0FBaEMsRUFyQlE7QUFGaEIsQ0ExQmEsRUFvRGI7QUFDSSxXQUFPLDBCQURYO0FBRUksZ0JBQVksQ0FDUixFQUFFLFdBQVcsR0FBYixFQUFrQixTQUFTLElBQTNCLEVBRFEsRUFFUixFQUFFLFdBQVcsR0FBYixFQUFrQixjQUFjLFNBQWhDLEVBRlEsRUFHUixFQUFFLFdBQVcsR0FBYixFQUFrQixjQUFjLFFBQWhDLEVBQTBDLFNBQVMsSUFBbkQsRUFIUSxFQUlSLEVBQUUsV0FBVyxHQUFiLEVBQWtCLGNBQWMsWUFBaEMsRUFBOEMsU0FBUyxJQUF2RCxFQUpRLEVBS1IsRUFBRSxXQUFXLEdBQWIsRUFMUSxFQU1SLEVBQUUsV0FBVyxHQUFiLEVBQWtCLGNBQWMsV0FBaEMsRUFOUSxFQU9SLEVBQUUsV0FBVyxHQUFiLEVBQWtCLGNBQWMsYUFBaEMsRUFQUSxFQVFSLEVBQUUsV0FBVyxHQUFiLEVBQWtCLGNBQWMsa0JBQWhDLEVBUlEsRUFTUixFQUFFLFdBQVcsR0FBYixFQVRRLENBU1c7QUFUWDtBQUZoQixDQXBEYSxFQWtFYjtBQUNJLFdBQU8seUJBRFg7QUFFSSxnQkFBWSxDQUNSLEVBQUUsV0FBVyxHQUFiLEVBQWtCLGNBQWMsY0FBaEMsRUFBZ0QsU0FBUyxJQUF6RCxFQURRLEVBRVIsRUFBRSxXQUFXLEdBQWIsRUFBa0IsY0FBYyxrQkFBaEMsRUFBb0QsU0FBUyxJQUE3RCxFQUZRLEVBR1IsRUFBRSxXQUFXLEdBQWIsRUFBa0IsY0FBYyxPQUFoQyxFQUhRLEVBSVIsRUFBRSxXQUFXLEdBQWIsRUFBa0IsY0FBYyxNQUFoQyxFQUpRLEVBS1IsRUFBRSxXQUFXLEdBQWIsRUFMUSxFQU1SLEVBQUUsV0FBVyxHQUFiLEVBQWtCLGNBQWMsVUFBaEMsRUFBNEMsU0FBUyxJQUFyRCxFQU5RLEVBT1IsRUFBRSxXQUFXLEdBQWIsRUFBa0IsY0FBYyxVQUFoQyxFQUE0QyxTQUFTLElBQXJELEVBUFEsRUFRUixFQUFFLFdBQVcsR0FBYixFQUFrQixjQUFjLE9BQWhDLEVBUlEsRUFTUixFQUFFLFdBQVcsR0FBYixFQUFrQixjQUFjLE9BQWhDLEVBVFEsRUFVUixFQUFFLFdBQVcsR0FBYixFQUFrQixjQUFjLFlBQWhDLEVBVlEsRUFXUixFQUFFLFdBQVcsR0FBYixFQUFrQixjQUFjLFVBQWhDLEVBWFEsRUFZUixFQUFFLFdBQVcsR0FBYixFQUFrQixjQUFjLGFBQWhDLEVBWlEsRUFhUixFQUFFLFdBQVcsR0FBYixFQUFrQixjQUFjLE1BQWhDLEVBYlEsRUFjUixFQUFFLFdBQVcsR0FBYixFQUFrQixjQUFjLFNBQWhDLEVBZFEsRUFlUixFQUFFLFdBQVcsR0FBYixFQUFrQixjQUFjLFNBQWhDLEVBZlEsRUFnQlIsRUFBRSxXQUFXLEdBQWIsRUFBa0IsY0FBYyxjQUFoQyxFQWhCUSxFQWlCUixFQUFFLFdBQVcsR0FBYixFQUFrQixjQUFjLFFBQWhDLEVBakJRLEVBa0JSLEVBQUUsV0FBVyxHQUFiLEVBQWtCLGNBQWMsT0FBaEMsRUFsQlEsRUFtQlIsRUFBRSxXQUFXLEdBQWIsRUFuQlEsRUFvQlIsRUFBRSxXQUFXLEdBQWIsRUFBa0IsU0FBUyxJQUEzQixFQXBCUSxFQXFCUixFQUFFLFdBQVcsR0FBYixFQUFrQixTQUFTLElBQTNCLEVBckJRLEVBc0JSLEVBQUUsV0FBVyxHQUFiLEVBdEJRO0FBRmhCLENBbEVhLENBQWpCOzs7OztBQ0FBLElBQU0seUJBQXlCLFFBQVEscUJBQVIsQ0FBL0I7QUFDQSxJQUFNLGdCQUFnQixRQUFRLGlCQUFSLENBQXRCOztBQUVBLE9BQU8sT0FBUCxHQUFpQjtBQUNiO0FBRGEsQ0FBakI7O0FBSUEsU0FBUyxJQUFULENBQWMsVUFBZCxFQUEwQixnQkFBMUIsRUFBNEMsQ0FBNUMsRUFBK0M7QUFDM0MsUUFBTSxXQUFXLDYxQ0FtQm9KLEVBQUUsY0FuQnRKLHNGQXdCWixFQXhCWSxDQXdCVCxXQXhCUyxFQXdCSSxzQ0F4QkosRUF3QjRDLGFBQUs7QUFDMUQsVUFBRSxjQUFGO0FBQ0EsaUJBQVMsV0FBVCxDQUFxQixzQ0FBckI7QUFDSCxLQTNCWSxDQUFqQjs7QUE2QkEsUUFBTSxlQUFlLFNBQVMsSUFBVCxDQUFjLHlCQUFkLENBQXJCO0FBQ0EsUUFBTSxlQUFlLFNBQVMsSUFBVCxDQUFjLHlCQUFkLENBQXJCO0FBQ0EsZ0NBQTRCLFFBQTVCLEVBQXNDLFVBQXRDLEVBQWtELGdCQUFsRDtBQUNBLG9CQUFnQixZQUFoQixFQUE4QixVQUE5QjtBQUNBLG9CQUFnQixZQUFoQixFQUE4QixVQUE5QixFQUEwQyxnQkFBMUM7O0FBRUEsV0FBTyxFQUFFLGtCQUFGLEVBQVA7QUFDSDs7QUFFRCxJQUFNLDJCQUEyQixTQUEzQix3QkFBMkI7QUFBQSxvRkFBOEUsS0FBSyxPQUFMLEdBQWUsc0NBQWYsR0FBdUQsRUFBckksWUFBNEksS0FBSyxZQUFMLHNCQUFxQyxLQUFLLFlBQTFDLFNBQTRELEVBQXhNLFVBQThNLEtBQUssU0FBbk47QUFBQSxDQUFqQzs7QUFFQSxJQUFNLGlCQUFpQixTQUFqQixjQUFpQjtBQUFBLFdBQVMsTUFBTSxVQUFOLENBQWlCLE1BQWpCLENBQXdCO0FBQUEsZUFBYSxVQUFVLE9BQXZCO0FBQUEsS0FBeEIsRUFBd0QsTUFBakU7QUFBQSxDQUF2Qjs7QUFFQSxTQUFTLDJCQUFULENBQXFDLFFBQXJDLEVBQStDLFVBQS9DLEVBQTJELGNBQTNELEVBQTJFO0FBQ3ZFLFFBQU0sb0JBQW9CLEVBQTFCOztBQUVBLGFBQVMsSUFBVCxDQUFjLDRCQUFkLEVBQ0ssTUFETCxDQUNZLHVCQUF1QixHQUF2QixDQUEyQjtBQUFBLDZHQUVULGVBQWUsS0FBZixJQUF3QixpQkFGZixnQ0FHdkIsTUFBTSxVQUFOLENBQWlCLEdBQWpCLENBQXFCLHdCQUFyQixFQUErQyxJQUEvQyxDQUFvRCxFQUFwRCxDQUh1QjtBQUFBLEtBQTNCLENBRFosRUFNSyxFQU5MLENBTVEsV0FOUixFQU1xQixRQU5yQixFQU0rQixhQUFLO0FBQzVCLFVBQUUsY0FBRjs7QUFFQSxZQUFNLFlBQVksRUFBRSxhQUFGLENBQWdCLFNBQWxDO0FBQ0EsWUFBTSxVQUFVLEVBQUUsYUFBRixDQUFnQixPQUFoQixDQUF3QixPQUF4QztBQUNBLFlBQUksZ0JBQUosRUFBc0IsT0FBTyxRQUFQLENBQWdCLFdBQWhCLENBQTRCLFlBQTVCLEVBQTBDLEtBQTFDLEVBQWlELFNBQWpELEVBQXRCLEtBQ0ssV0FBVyxVQUFYLENBQXNCLFdBQVcsU0FBakM7QUFDUixLQWJMO0FBY0g7O0FBRUQsU0FBUyxlQUFULENBQXlCLFlBQXpCLEVBQXVDLFVBQXZDLEVBQW1EO0FBQy9DLGlCQUFhLE1BQWIsQ0FBb0IsY0FDZixHQURlLENBQ1g7QUFBQSx1R0FBMkYsRUFBRSxNQUE3Riw2QkFBMkgsRUFBRSxLQUE3SCwwQkFBc0osRUFBRSxRQUFGLElBQWMsS0FBcEssdUNBQ2UsbUJBQW1CLEVBQUUsS0FBRixHQUFVLEVBQUUsS0FBRixDQUFRLE9BQVIsQ0FBZ0IsSUFBaEIsRUFBc0IsVUFBdEIsQ0FBVixHQUE4QyxFQUFFLE1BQW5FLENBRGY7QUFBQSxLQURXLEVBR1osSUFIWSxDQUdQLEVBSE8sQ0FBcEIsRUFJRSxFQUpGLENBSUssV0FKTCxFQUlrQixRQUpsQixFQUk0QixhQUFLO0FBQzdCLFVBQUUsY0FBRjtBQUNBLFlBQU0sVUFBVSxFQUFFLGFBQUYsQ0FBZ0IsT0FBaEM7QUFDQSxtQkFBVyxVQUFYLENBQXNCLFFBQVEsT0FBOUIsRUFBdUMsUUFBUSxZQUEvQyxFQUE2RCxRQUFRLFFBQVIsS0FBcUIsTUFBbEY7QUFDSCxLQVJEO0FBU0g7O0FBRUQsU0FBUyxlQUFULENBQXlCLFlBQXpCLEVBQXVDLFVBQXZDLEVBQW1ELGNBQW5ELEVBQW1FO0FBQy9ELGlCQUFhLFNBQWIsQ0FBd0IsYUFBSztBQUN6QixVQUFFLGNBQUY7QUFDQSxZQUFJLENBQUMsZ0JBQUwsRUFBdUIsT0FGRSxDQUVLO0FBQzlCLG1CQUFXLGlCQUFYO0FBQ0gsS0FKc0IsQ0FJcEIsSUFKb0IsQ0FJZixJQUplLENBQXZCO0FBS0g7Ozs7OztBQ3ZGRCxJQUFNLGVBQWUsUUFBUSxlQUFSLENBQXJCO0FBQ0EsSUFBTSxlQUFlLFFBQVEsZ0JBQVIsQ0FBckI7QUFDQSxJQUFNLGFBQWEsUUFBUSxjQUFSLENBQW5CO0FBQ0EsSUFBTSx3QkFBd0IsdUJBQTlCOztBQUVBLE9BQU8sT0FBUCxHQUFpQixFQUFDLFlBQUQsRUFBUSxvQkFBUixFQUFtQixrREFBbkIsRUFBNkMsd0NBQTdDLEVBQWtFLGtCQUFsRSxFQUE0RSxnQ0FBNUUsRUFBNkYsOEJBQTdGLEVBQTZHLDRDQUE3RyxFQUFvSSxnQ0FBcEksRUFBakI7O0FBR0EsU0FBUyxRQUFULENBQWtCLElBQWxCLEVBQXdCO0FBQ3BCLFdBQU8sYUFBYSxJQUFiLEVBQW1CLFlBQW5CLENBQVA7QUFDSDtBQUNELFNBQVMsd0JBQVQsQ0FBa0MsS0FBbEMsRUFBeUMsS0FBekMsRUFBZ0Q7QUFDNUMsUUFBTSxXQUFXLE1BQU0sY0FBdkI7QUFDQSxRQUFNLFNBQVMsTUFBTSxZQUFyQjtBQUNBLFFBQUksV0FBVyxNQUFNLEtBQXJCO0FBQ0EsVUFBTSxLQUFOLEdBQWMsU0FBUyxTQUFULENBQW1CLENBQW5CLEVBQXNCLFFBQXRCLElBQWtDLEtBQWxDLEdBQTBDLFNBQVMsU0FBVCxDQUFtQixNQUFuQixFQUEyQixTQUFTLE1BQXBDLENBQXhEO0FBQ0EsVUFBTSxjQUFOLEdBQXVCLE1BQU0sWUFBTixHQUFxQixXQUFXLE1BQU0sTUFBN0Q7QUFDSDs7QUFFRCxTQUFTLGlCQUFULENBQTJCLFVBQTNCLEVBQXVDO0FBQ25DLFFBQUksQ0FBQyxVQUFMLEVBQ0ksT0FBTyxJQUFQO0FBQ0osUUFBTSxVQUFVLFdBQVcsS0FBWCxDQUFpQixvQ0FBakIsQ0FBaEI7QUFDQSxRQUFJLFFBQVEsTUFBUixLQUFtQixDQUF2QixFQUEwQjtBQUN0QixlQUFPLElBQVA7QUFDSDtBQUNELFdBQU87QUFDSCxjQUFNLFFBQVEsQ0FBUixDQURIO0FBRUgsY0FBTSxJQUFJLE1BQUosQ0FBVyxRQUFRLENBQVIsQ0FBWCxFQUF1QixRQUF2QjtBQUZILEtBQVA7QUFJSDs7QUFFRCxTQUFTLEtBQVQsQ0FBZSxDQUFmLEVBQWtCLEdBQWxCLEVBQXVCO0FBQUUsV0FBTyxjQUFjLENBQWQsRUFBaUIsQ0FBQyxFQUFFLE1BQUgsSUFBYSxDQUFDLEVBQUUsUUFBaEIsSUFBNEIsQ0FBQyxFQUFFLE9BQS9CLElBQTJDLGFBQWEsQ0FBYixFQUFnQixHQUFoQixDQUE1RCxDQUFQO0FBQXlGOztBQUVsSCxTQUFTLFNBQVQsQ0FBbUIsQ0FBbkIsRUFBc0IsR0FBdEIsRUFBMkI7QUFBRSxXQUFPLGNBQWMsQ0FBZCxFQUFpQixDQUFDLEVBQUUsTUFBSCxJQUFhLENBQUMsRUFBRSxRQUFoQixJQUE0QixFQUFFLE9BQTlCLElBQXlDLGFBQWEsQ0FBYixFQUFnQixHQUFoQixDQUExRCxDQUFQO0FBQXVGOztBQUVwSCxTQUFTLFlBQVQsQ0FBc0IsQ0FBdEIsRUFBeUIsR0FBekIsRUFBOEI7QUFBRSxXQUFPLE9BQU8sR0FBUCxLQUFlLFFBQWYsR0FBMEIsRUFBRSxHQUFGLEtBQVUsR0FBcEMsR0FBMEMsRUFBRSxPQUFGLEtBQWMsR0FBL0Q7QUFBb0U7QUFDcEcsU0FBUyxhQUFULENBQXVCLENBQXZCLEVBQTBCLEdBQTFCLEVBQStCO0FBQzNCLFFBQUcsR0FBSCxFQUFRLEVBQUUsY0FBRjtBQUNSLFdBQU8sR0FBUDtBQUNIOztBQUVELFNBQVMsZUFBVCxDQUF5QixhQUF6QixFQUF3QztBQUNwQyxRQUFNLGlCQUFpQixFQUFFLGFBQUYsQ0FBdkI7QUFDQSxRQUFNLGNBQWMsZUFBZSxJQUFmLENBQW9CLHdCQUFwQixDQUFwQjtBQUNBLGdCQUFZLElBQVo7QUFDQSxRQUFNLE9BQU8sZUFBZSxJQUFmLEVBQWI7QUFDQSxnQkFBWSxJQUFaOztBQUVBLFFBQU0sT0FBTyxTQUFTLGVBQWUsSUFBZixFQUFULENBQWI7O0FBRUEsV0FBTyxFQUFFLFlBQVksSUFBZCxFQUFvQixZQUFZLElBQWhDLEVBQVA7QUFDSDs7QUFFRCxTQUFTLGNBQVQsQ0FBd0IsSUFBeEIsRUFBOEI7QUFDMUIsUUFBTSxRQUFRLFNBQVMsV0FBVCxFQUFkO0FBQ0EsUUFBTSxNQUFNLEtBQUssR0FBTCxDQUFTLENBQVQsQ0FBWjtBQUNBLFFBQU0sY0FBYyxJQUFJLFdBQUosSUFBbUIsSUFBSSxXQUFKLENBQWdCLE9BQWhCLEtBQTRCLElBQS9DLEdBQXNELElBQUksV0FBMUQsR0FBd0UsR0FBNUY7QUFDQSxVQUFNLFFBQU4sQ0FBZSxXQUFmLEVBQTRCLENBQTVCO0FBQ0EsVUFBTSxNQUFOLENBQWEsV0FBYixFQUEwQixDQUExQjtBQUNBLFFBQU0sTUFBTSxPQUFPLFlBQVAsRUFBWjtBQUNBLFFBQUksZUFBSjtBQUNBLFFBQUksUUFBSixDQUFhLEtBQWI7QUFDSDs7QUFFRCxTQUFTLHNCQUFULENBQWdDLE9BQWhDLEVBQXlDO0FBQ3JDLFFBQU0sU0FBUyxRQUFRLElBQVIsQ0FBYSxrQkFBYixFQUFpQyxPQUFqQyxHQUNWLEdBRFUsQ0FDTixVQUFDLEVBQUQsRUFBSyxLQUFMO0FBQUEsZUFBZSxPQUFPLE1BQVAsQ0FBYyxrQkFBa0IsR0FBRyxZQUFILENBQWdCLEtBQWhCLENBQWxCLENBQWQsRUFBeUQ7QUFDekUsaUJBQUssRUFBRSxFQUFGO0FBRG9FLFNBQXpELENBQWY7QUFBQSxLQURNLENBQWY7QUFJQSxXQUFPLE1BQVAsQ0FBYztBQUFBLFlBQUUsSUFBRixRQUFFLElBQUY7QUFBQSxlQUFZLFNBQVMsV0FBckI7QUFBQSxLQUFkLEVBQWdELE9BQWhELENBQXdEO0FBQUEsWUFBRSxHQUFGLFNBQUUsR0FBRjtBQUFBLGVBQVcsSUFBSSxNQUFKLEVBQVg7QUFBQSxLQUF4RDtBQUNBLFFBQU0sWUFBWSxPQUFPLE1BQVAsQ0FBYztBQUFBLFlBQUUsSUFBRixTQUFFLElBQUY7QUFBQSxlQUFZLFNBQVMsV0FBckI7QUFBQSxLQUFkLENBQWxCO0FBQ0EsY0FBVSxPQUFWLENBQWtCO0FBQUEsWUFBRSxHQUFGLFNBQUUsR0FBRjtBQUFBLGVBQVcsSUFBSSxJQUFKLENBQVMsS0FBVCxFQUFnQixVQUFoQixDQUFYO0FBQUEsS0FBbEI7QUFDQSxXQUFPLFNBQVA7QUFDSDs7QUFFRCxTQUFTLHVCQUFULENBQWlDLE9BQWpDLEVBQTBDO0FBQ3RDLFFBQU0sYUFBYSxRQUFRLElBQVIsQ0FBYSxLQUFiLEVBQW9CLE1BQXZDO0FBQ0EsUUFBTSxnQkFBZ0IsUUFBUSxJQUFSLENBQWEscUJBQWIsRUFBb0MsTUFBMUQ7QUFDQSxXQUFPLGFBQWEsYUFBcEI7QUFDSDs7QUFFRCxTQUFTLGtCQUFULENBQTRCLE9BQTVCLEVBQXFDLFNBQXJDLEVBQWdELEtBQWhELEVBQXVEO0FBQ25ELFdBQU8sTUFBTSxJQUFOLENBQVcsd0JBQXdCLE9BQXhCLElBQW1DLEtBQW5DLEdBQTJDLElBQUksTUFBTSxLQUFWLEVBQTNDLEdBQStELFNBQTFFLENBQVA7QUFDSDs7QUFFRCxTQUFTLG1CQUFULENBQTZCLE9BQTdCLEVBQXNDLGVBQXRDLEVBQXVELG9CQUF2RCxFQUE2RSxjQUE3RSxFQUE2RjtBQUN6RixVQUFNLGNBQU4sQ0FBcUIsdUJBQXVCLE9BQXZCLEVBQ2hCLEdBRGdCLENBQ1o7QUFBQSxlQUFRLG1CQUFtQixPQUFuQixFQUE0QixJQUE1QixFQUFrQyxvQkFBbEMsRUFDUixPQURRLENBQ0E7QUFBQSxtQkFBTSxlQUFlLElBQUksTUFBTSxLQUFWLENBQWdCLDJCQUFoQixDQUFmLENBQU47QUFBQSxTQURBLEVBRVIsYUFGUSxDQUVNO0FBQUEsbUJBQU0sTUFBTSxXQUFOLENBQWtCLGdCQUFnQixJQUFoQixDQUFsQixDQUFOO0FBQUEsU0FGTixFQUdSLFFBSFEsQ0FHQztBQUFBLG1CQUFpQixLQUFLLEdBQUwsQ0FBUyxJQUFULENBQWMsS0FBZCxFQUFxQixhQUFyQixDQUFqQjtBQUFBLFNBSEQsRUFJUixPQUpRLENBSUE7QUFBQSxtQkFBTSxLQUFLLEdBQUwsQ0FBUyxNQUFULEVBQU47QUFBQSxTQUpBLENBQVI7QUFBQSxLQURZLENBQXJCLEVBTUUsT0FORixDQU1VO0FBQUEsZUFBSyxRQUFRLE9BQVIsQ0FBZ0IsT0FBaEIsQ0FBTDtBQUFBLEtBTlY7QUFPSDs7QUFFRCxTQUFTLGVBQVQsQ0FBeUIsT0FBekIsRUFBa0MsbUJBQWxDLEVBQXVEO0FBQ25ELFdBQU8sd0JBQXdCLE9BQXhCLElBQW1DLHdCQUF3QixZQUFVLG1CQUFWLFlBQXhCLENBQTFDO0FBQ0giLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZWRpdG9yOiB7XG4gICAgICAgIG1hdGhFZGl0b3I6ICdNYXRpa2thZWRpdG9yaScsXG4gICAgICAgIHRpdGxlOiAnS2FhdmFlZGl0b3JpbiBlbnNpbW3DpGluZW4ga2VoaXR5c3ZlcnNpbycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBgPHVsPlxuPGxpPkVkaXRvcmkgdG9pbWlpIHBhcmhhaXRlbiBGaXJlZm94LXNlbGFpbWVsbGEuPC9saT5cbjxsaT7igJxMaXPDpMOkIGthYXZh4oCdIC1uYXBpbiBhbHRhIGzDtnlkw6R0IHlsZWlzaW1wacOkIG1hdGVtYXRpaWthc3NhLCBmeXNpaWthc3NhIGphXG5rZW1pYXNzYSBrw6R5dGV0dMOkdmnDpCBtZXJraW50w7Zqw6QuIExpc8Oka3NpIGVyaWtvaXNtZXJra2Vqw6Qgdm9pIGvDpHl0dMOkw6Qga2FhdmFuIGtpcmpvaXR0YW1pc2Vlbi48L2xpPlxuIDxsaT5LYWF2b2phIHZvaSByYWtlbnRhYVxua2xpa2thYW1hbGxhIHZhbGlrb24gbWVya2ludMO2asOkIGphL3RhaSBraXJqb2l0dGFtYWxsYSBMYVRlWGlhLjwvbGk+XG4gPGxpPkVkaXRvcmluIHZhc3RhdXNrZW50dMOkw6RuIHZvaSBraXJqb2l0dGFhIHRla3N0acOkIGphIGthYXZvamEgc2Vrw6Rcbmxpc8OkdMOkIGt1dmlhLjwvbGk+PC91bD5gLFxuICAgICAgICBzaG9ydGN1dFRpdGxlOiBgUGlrYW7DpHBww6RpbnZpbmtrZWrDpGAsXG4gICAgICAgIHNob3J0Y3V0czogYDx0YWJsZT48dGJvZHk+XG48dHI+PHRoPkxpaXTDpCBrdXZhIGxlaWtlcMO2eWTDpGx0w6Q8L3RoPjx0ZD5DdHJsLVY8L3RkPjwvdHI+XG48dHI+PHRoPktpcmpvaXRhIGthYXZhPC90aD48dGQ+Q3RybC1MIHRhaSBDdHJsLUk8L3RkPjwvdHI+XG48dHI+PHRoIGNvbHNwYW49XCIyXCI+S2FhdmFzc2E8L3RoPjwvdHI+XG48dHI+PHRoPkpha292aWl2YTwvdGg+PHRkPi88L3RkPjwvdHI+XG48dHI+PHRoPktlcnRvbWVya2tpPC90aD48dGQ+KjwvdGQ+PC90cj5cbjx0cj48dGg+RWtzcG9uZW50dGk8L3RoPjx0ZD5ePC90ZD48L3RyPlxuPHRyPjx0aD5TdWxqZSBrYWF2YTwvdGg+PHRkPkN0cmwtRW50ZXIgdGFpIEVzYzwvdGQ+PC90cj5cbjx0cj48dGg+TGlzw6TDpCBrYWF2YSBzZXVyYWF2YWxsZSByaXZpbGxlPC90aD48dGQ+RW50ZXI8L3RkPjwvdHI+XG48L3Rib2R5PlxuPC90YWJsZT5gLFxuICAgICAgICBmb3JtYXR0aW5nOiAnTXVvdG9pbHUnLFxuICAgICAgICBzcGVjaWFsQ2hhcmFjdGVyczogJ0VyaWtvaXNtZXJraXQnLFxuICAgICAgICBpbnNlcnRFcXVhdGlvbjogJ0xpc8Okw6Qga2FhdmEnLFxuICAgICAgICBjbG9zZTogJ3N1bGplJyxcbiAgICAgICAgc2F2ZTogJ1RhbGxlbm5hJyxcbiAgICAgICAgdXBkYXRlZDogJ1DDpGl2aXRldHR5JyxcbiAgICAgICAgc2VuZEZlZWRiYWNrOiAnTMOkaGV0w6QgcGFsYXV0ZXR0YScsXG4gICAgICAgIGxhbmdMaW5rOiAnL3N2JyxcbiAgICAgICAgbGFuZ0xhYmVsOiAnUMOlIHN2ZW5za2EnLFxuICAgICAgICBhbnN3ZXJUaXRsZTogJ1Zhc3RhdXMnXG4gICAgfSxcbiAgICBhbm5vdGF0aW5nOiB7XG4gICAgICAgIHNlbmRGZWVkYmFjazogJ0zDpGhldMOkIHBhbGF1dGV0dGEnLFxuICAgICAgICB1cGRhdGVkOiAnUMOkaXZpdGV0dHknLFxuICAgICAgICBtYXRoRWRpdG9yOiAnTWF0aWtrYWVkaXRvcmknLFxuICAgICAgICB0aXRsZTogJ0Fydm9zdGVsdScsXG4gICAgICAgIGJhY2tMaW5rOiAnLycsXG4gICAgICAgIGJhY2tMaW5rTGFiZWw6ICdQYWxhYSBrYWF2YWVkaXRvcmlpbicsXG4gICAgICAgIHNhdmU6ICdUYWxsZW5uYSBtZXJraW5uw6R0JyxcbiAgICAgICAgbGFuZ0xpbms6ICcvc3YvYmVkb21uaW5nJyxcbiAgICAgICAgbGFuZ0xhYmVsOiAnUMOlIHN2ZW5za2EnXG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZWRpdG9yOiB7XG4gICAgICAgIG1hdGhFZGl0b3I6ICdNYXRlbWF0aWtlZGl0b3InLFxuICAgICAgICB0aXRsZTogJ0Zvcm1lbGVkaXRvcm5zIGbDtnJzdGEgdXR2ZWNrbGluZ3N2ZXJzaW9uJyxcbiAgICAgICAgZGVzY3JpcHRpb246IGA8dWw+XG48bGk+RWRpdG9ybiBmdW5nZXJhciBiw6RzdCBtZWQgYnJvd3Nlcm4gRmlyZWZveC48L2xpPlxuIDxsaT5VbmRlciBrbmFwcGVuIOKAnEzDpGdnIHRpbGwgZm9ybWVs4oCdIGhpdHRhciBkdSBkZSB2YW5saWdhc3RlIGJldGVja25pbmdhcm5hIHNvbSBhbnbDpG5kcyBpIG1hdGVtYXRpaywgZnlzaWsgb2NoIGtlbWkuIERlc3N1dG9tIGthbiBkdSBhbnbDpG5kYSBzcGVjaWFsdGVja2VuIGbDtnIgYXR0IHNrcml2YSBmb3JtbGVyLjwvbGk+XG48bGk+RGV0IGfDpXIgYXR0IGtvbnN0cnVlcmEgZm9ybWxlciBnZW5vbSBhdHQga2xpY2thIHDDpSBiZXRlY2tuaW5nYXJuYSBpIG1lbnllcm5hIG9jaC9lbGxlciBnZW5vbSBhdHQgc2tyaXZhIExhVGVYLjwvbGk+XG48bGk+RGV0IGfDpXIgZsO2cnV0b20gYXR0IHNrcml2YSB0ZXh0IG9jaCBmb3JtbGVyLCBhdHQgb2Nrc8OlIGF0dCBsw6RnZ2EgdGlsbCBiaWxkZXIgaSBzdmFyc2bDpGx0ZXQuPC9saT48L3VsPmAsXG4gICAgICAgIHNob3J0Y3V0VGl0bGU6IGBUaXBzIHDDpSB0YW5nZW50a29tYmluYXRpb25lcmAsXG4gICAgICAgIHNob3J0Y3V0czogYDx0YWJsZT48dGJvZHk+XG48dHI+PHRoPkzDpGdnIHRpbGwgZW4gYmlsZCBmcsOlbiB1cmtsaXBwZXQ8L3RoPjx0ZD5DdHJsLVY8L3RkPjwvdHI+XG48dHI+PHRoPlNrcml2IGVuIGZvcm1lbDwvdGg+PHRkPkN0cmwtTCAvIEN0cmwtSTwvdGQ+PC90cj5cbjx0cj48dGggY29sc3Bhbj1cIjJcIj5JIGZvcm1lbG4gPC90aD48L3RyPlxuPHRyPjx0aD5CcsOla3N0cmVjazwvdGg+PHRkPi88L3RkPjwvdHI+XG48dHI+PHRoPk11bHRpcGxpa2F0aW9uc3RlY2tlbjwvdGg+PHRkPio8L3RkPjwvdHI+XG48dHI+PHRoPlN0w6RuZyBmb3JtZWxuPC90aD48dGQ+Q3RybC1FbnRlciBlbGxlciBFc2M8L3RkPjwvdHI+XG48L3Rib2R5PlxuPC90YWJsZT5gLFxuICAgICAgICBmb3JtYXR0aW5nOiAnRm9ybWF0ZXJpbmcnLFxuICAgICAgICBzcGVjaWFsQ2hhcmFjdGVyczogJ1NwZWNpYWx0ZWNrZW4nLFxuICAgICAgICBpbnNlcnRFcXVhdGlvbjogJ0zDpGdnIHRpbGwgZm9ybWVsJyxcbiAgICAgICAgY2xvc2U6ICdzdMOkbmcnLFxuICAgICAgICBzYXZlOiAnU3BhcmEnLFxuICAgICAgICB1cGRhdGVkOiAnVXBwZGF0ZXJhZCcsXG4gICAgICAgIHNlbmRGZWVkYmFjazogJ1NraWNrYSBmZWVkYmFjaycsXG4gICAgICAgIGxhbmdMaW5rOiAnLycsXG4gICAgICAgIGxhbmdMYWJlbDogJ1N1b21la3NpJyxcbiAgICAgICAgYW5zd2VyVGl0bGU6ICdTdmFyJ1xuICAgIH0sXG4gICAgYW5ub3RhdGluZzoge1xuICAgICAgICBzZW5kRmVlZGJhY2s6ICdTa2lja2EgcmVzcG9ucycsXG4gICAgICAgIHVwZGF0ZWQ6ICdVcHBkYXRlcmFkJyxcbiAgICAgICAgbWF0aEVkaXRvcjogJ01hdGVtYXRpa2VkaXRvcicsXG4gICAgICAgIHRpdGxlOiAnQmVkw7ZtbmluZycsXG4gICAgICAgIGJhY2tMaW5rOiAnL3N2JyxcbiAgICAgICAgYmFja0xpbmtMYWJlbDogJ01hdGVtYXRpa2VkaXRvcicsXG4gICAgICAgIHNhdmU6ICdTcGFyYSBhbnRlY2tuaW5nYXInLFxuICAgICAgICBsYW5nTGluazogJy90YXJraXN0dXMnLFxuICAgICAgICBsYW5nTGFiZWw6ICdTdW9tZWtzaSdcbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAgICB7YWN0aW9uOiAnXFxcXHNxcnQnLCBsYWJlbDogJ1xcXFxzcXJ0e1h9J30sXG4gICAge2FjdGlvbjogJ14nLCBsYWJlbDogJ3hee1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxmcmFjJywgbGFiZWw6ICdcXFxcZnJhY3tYfXtYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcaW50JywgbGFiZWw6ICdcXFxcaW50X3tYfV57WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGxpbV8nLCBsYWJlbDogJ1xcXFxsaW1fe1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxsaW1fe3hcXFxccmlnaHRhcnJvd1xcXFxpbmZ0eX0nLCBsYWJlbDogJ1xcXFxsaW1fe3hcXFxccmlnaHRhcnJvd1xcXFxpbmZ0eX0nLCB1c2VXcml0ZTp0cnVlfSxcbiAgICB7YWN0aW9uOiAnXFxcXG92ZXJyaWdodGFycm93JywgbGFiZWw6ICdcXFxcb3ZlcnJpZ2h0YXJyb3d7WH0nfSxcbiAgICB7YWN0aW9uOiAnXycsIGxhYmVsOiAneF9YJ30sXG4gICAge2FjdGlvbjogJ1xcXFxudGhyb290JywgbGFiZWw6ICdcXFxcc3FydFtYXXtYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcc3VtJywgbGFiZWw6ICdcXFxcc3VtX3tYfV57WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGJpbm9tJywgbGFiZWw6ICdcXFxcYmlub217WH17WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXHNpbid9LFxuICAgIHthY3Rpb246ICdcXFxcY29zJ30sXG4gICAge2FjdGlvbjogJ1xcXFx0YW4nfSxcbiAgICB7YWN0aW9uOiAnXFxcXHZlYycsIGxhYmVsOiAnXFxcXHZlY3tYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcYmFyJywgbGFiZWw6ICdcXFxcYmFye1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxvdmVybGluZXtcXFxcdGV4dHtpfX0nLCB1c2VXcml0ZTogdHJ1ZX0sXG4gICAge2FjdGlvbjogJ1xcXFxvdmVybGluZXtcXFxcdGV4dHtqfX0nLCB1c2VXcml0ZTogdHJ1ZX0sXG4gICAge2FjdGlvbjogJ1xcXFxvdmVybGluZXtcXFxcdGV4dHtrfX0nLCB1c2VXcml0ZTogdHJ1ZX0sXG4gICAge2FjdGlvbjogJ1xcXFxvdmVybGVmdGFycm93JywgbGFiZWw6ICdcXFxcb3ZlcmxlZnRhcnJvd3tYfSd9LFxuICAgIHthY3Rpb246ICd8JywgbGFiZWw6ICd8WHwnfSxcbiAgICB7YWN0aW9uOiAnKCcsIGxhYmVsOiAnKFgpJ30sXG4gICAge2FjdGlvbjogJ197IH1eeyB9ICcsIGxhYmVsOiAnX3tYfV57WH1YJywgdXNlV3JpdGU6IHRydWV9LFxuICAgIHthY3Rpb246ICdcXFxcdGV4dCcsIGxhYmVsOiAnXFxcXHRleHR7VH0nfSxcbl1cbiIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhFQUFRQVBRQUFQLy8vd0FBQVBEdzhJcUtpdURnNEVaR1JucDZlZ0FBQUZoWVdDUWtKS3lzckw2K3ZoUVVGSnljbkFRRUJEWTJObWhvYUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUNIK0drTnlaV0YwWldRZ2QybDBhQ0JoYW1GNGJHOWhaQzVwYm1adkFDSDVCQUFLQUFBQUlmOExUa1ZVVTBOQlVFVXlMakFEQVFBQUFDd0FBQUFBRUFBUUFBQUZkeUFnQWdJSkllV29Ba1JDQ01kQmtLdElISW5neU1Lc0VyUEJZYkFEcGtTQ3doRG1RQ0JldGhSQjZWajRrRkNrUVBHNElsV0Rnck5SSXduTzRVS0JYRHVmelF2RE1hb1NEQmdGYjg4Nk1pUWFkZ05BQkFva2ZDd3pCQThMQ2cwRWdsOGpBZ2dHQUExa0JJQTFCQVl6bHlJTGN6VUxDMlVoQUNINUJBQUtBQUVBTEFBQUFBQVFBQkFBQUFWMklDQUNBbWxBWlRtT1JFRUl5VUVRakxLS3hQSEFEaEV2cXhsZ2NHZ2tHSTFEWVNWQUlBV014K2x3U0trSUNKMFFzSGk5UmdLQnduVlRpUlFRZ3dGNEk0VUZEUVFFd2k2LzNZU0dXUlJtamhFRVRBSmZJZ01GQ25BS00wS0RWNEVFRUFRTGlGMThUQVlOWERhU2UzeDZtamlkTjFzM0lRQWgrUVFBQ2dBQ0FDd0FBQUFBRUFBUUFBQUZlQ0FnQWdMWkRHVTVqZ1JFQ0VVaUNJK3lpb1NEd0RKeUxLc1hvSEZReEJTSEFvQUFGQmhxdE1KZzhEZ1FCZ2ZyRXNKQUVBZzRZaFpJRWl3Z0t0SGlNQmd0cGczd2JVWlhHTzdrT2IxTVVLUkZNeXNDQ2hBb2dnSkNJZzBHQzJhTmU0Z3FRbGRmTDRsL0FnMUFYeVNKZ241TGNvRTNRWEkzSVFBaCtRUUFDZ0FEQUN3QUFBQUFFQUFRQUFBRmRpQWdBZ0xaTkdVNWpvUWhDRWp4SXNzcUVvOGJDOUJSank5QWc3R0lMUTRRRW9FMGdCQUVCY09wY0JBMERveFNLL2U4TFJJSG4raTFjSzBJeUtkZzBWQW9sallJZytHZ25ScndWUy84SUFrSUN5b3NCSVFwQkFNb0t5OWRJbXhQaFMrR0trRnJrWCtUaWd0TGxJeUtYVUYrTmphZ05pRUFJZmtFQUFvQUJBQXNBQUFBQUJBQUVBQUFCV3dnSUFJQ2FSaGxPWTRFSWdqSDhSN0xLaEtIR3dzTXZiNEFBeTNXT0RCSUJCS0NzWUE5VGp1aEROREtFVlNFUmV6UUVMMFdyaFh1Y1JVUUd1aWs3YkZsbmd6cVZXOUxNbDlYV3ZMZGpGYUp0REZxWjFjRVpVQjBkVWd2TDNkZ1A0V0pabjRqa29tV05wU1RJeUVBSWZrRUFBb0FCUUFzQUFBQUFCQUFFQUFBQlg0Z0lBSUN1U3hsT1k2Q0lnaUQ4UnJFS2dxR093eHdVck1sQW9Td0l6QUdwSnBnb1NEQUdpZkRZNWtvcEJZRGxFcEFRQndldnhmQnRSSVVHaTh4d1drRE5CQ0l3bUM5VnEwYWlRUURRdUsrVmdRUERYVjloQ0pqQndjRllVNXBMd3dIWFFjTUtTbU5MUWNJQUV4bGJIOEpCd3R0YVgwQUJBY05iV1ZiS3lFQUlma0VBQW9BQmdBc0FBQUFBQkFBRUFBQUJYa2dJQUlDU1JCbE9ZN0NJZ2hOOHpiRUtzS29JamRGelphRWdVQkhLQ2hNSnRSd2NXcEFXb1duaWZtNkVTQU1oTzhsUUswRUVBVjNyRm9wSUJDRWNHd0RLQXFQaDRIVXJZNElDSEgxZFNvVEZnY0hVaVpqQmhBSkIyQUhEeWtwS0F3SEF3ZHpmMTlLa0FTSVBsOWNEZ2NuRGtkdE53aU1KQ3NoQUNINUJBQUtBQWNBTEFBQUFBQVFBQkFBQUFWM0lDQUNBa2tRWlRtT0Fpb3NpeUFveENxK0tQeENOVnNTTVJnQnNpQ2xXckxUU1dGb0lRWkhsNnBsZUJoNnN1eEtNSWhsdnpiQXdrQldmRldyQlFUeE5McTJSRzJ5aFNVa0RzMmI2M0FZREFvSlhBY0ZSd0FEZUFrSkRYMEFRQ3NFZkFRTURBSVBCejByQ2djeGt5MEpSV0UxQW13cEt5RUFJZmtFQUFvQUNBQXNBQUFBQUJBQUVBQUFCWGtnSUFJQ0taemtxSjRuUVp4THFaS3Y0TnFOTEtLMi9RNEVrNGxGWENoc2c1eXBKanMxSUkzZ0VEVVNSSW5FR1lBdzZCNnpNNEpockRBdEVvc1ZrTFV0SEE3UkhhSEFHSlFFanNPRGNFZzBGQkFGVmdrUUpRMXBBd2NERHc4S2NGdFNJbndKQW93Q0NBNlJJd3FaQWdrUE5nVnBXbmRqZHlvaEFDSDVCQUFLQUFrQUxBQUFBQUFRQUJBQUFBVjVJQ0FDQWltYzVLaWVMRXVVS3ZtMnhBS0xxRENmQzJHYU85ZUwwTEFCV1RpQlltQTA2VzZrSGd2Q3FFSmlBSUppdTNnY3ZnVXNzY0hVRVJtK2thQ3h5eGErelJQazBTZ0pFZ2ZJdmJBZElBUUxDQVlsQ2o0REJ3MElCUXNNQ2pJcUJBY1BBb29DQmc5cEtnc0pMd1VGT2hDWkt5UURBM1lxSVFBaCtRUUFDZ0FLQUN3QUFBQUFFQUFRQUFBRmRTQWdBZ0lwbk9Tb25teGJxaVRoQ3JKS0VIRmJvOEp4RERPWllGRmIrQTQxRTRINE9oa09pcFh3QkVsWUlUREFja0ZFT0JnTVEzYXJrTWtVQmR4SVVHWnBFYjdrYVFCUmxBU1BnMEZRUUhBYkVFTUdEU1ZFQUExUUJoQUVEMUUwTmd3RkFvb0NEV2xqYVFJUUNFNXFNSGNOaENraklRQWgrUVFBQ2dBTEFDd0FBQUFBRUFBUUFBQUZlU0FnQWdJcG5PU29MZ3h4dnFnS0xFY0NDNjVLRUFCeUtLOGNTcEE0REFpSFEvRGtLaEdLaDRaQ3RDeVpHbzZGNmlZWVBBcUZnWXkwMnhrU2FMRU1WMzR0RUx5UllORXNDUXlIbHZXa0dDenNQZ01DRUFZN0NnMDRVazQ4TEFzRGhSQThNVlFQRUYwR0FncVlZd1NSbHljTmNXc2tDa0FwSXlFQU93QUFBQUFBQUFBQUFEeGljaUF2UGdvOFlqNVhZWEp1YVc1blBDOWlQam9nSUcxNWMzRnNYM0YxWlhKNUtDa2dXenhoSUdoeVpXWTlKMloxYm1OMGFXOXVMbTE1YzNGc0xYRjFaWEo1Sno1bWRXNWpkR2x2Ymk1dGVYTnhiQzF4ZFdWeWVUd3ZZVDVkT2lCRFlXNG5kQ0JqYjI1dVpXTjBJSFJ2SUd4dlkyRnNJRTE1VTFGTUlITmxjblpsY2lCMGFISnZkV2RvSUhOdlkydGxkQ0FuTDNaaGNpOXlkVzR2YlhsemNXeGtMMjE1YzNGc1pDNXpiMk5ySnlBb01pa2dhVzRnUEdJK0wyaHZiV1V2WVdwaGVHeHZZV1F2ZDNkM0wyeHBZbkpoYVhKcFpYTXZZMnhoYzNNdWJYbHpjV3d1Y0dod1BDOWlQaUJ2YmlCc2FXNWxJRHhpUGpZNFBDOWlQanhpY2lBdlBnbzhZbklnTHo0S1BHSStWMkZ5Ym1sdVp6d3ZZajQ2SUNCdGVYTnhiRjl4ZFdWeWVTZ3BJRnM4WVNCb2NtVm1QU2RtZFc1amRHbHZiaTV0ZVhOeGJDMXhkV1Z5ZVNjK1puVnVZM1JwYjI0dWJYbHpjV3d0Y1hWbGNuazhMMkUrWFRvZ1FTQnNhVzVySUhSdklIUm9aU0J6WlhKMlpYSWdZMjkxYkdRZ2JtOTBJR0psSUdWemRHRmliR2x6YUdWa0lHbHVJRHhpUGk5b2IyMWxMMkZxWVhoc2IyRmtMM2QzZHk5c2FXSnlZV2x5YVdWekwyTnNZWE56TG0xNWMzRnNMbkJvY0R3dllqNGdiMjRnYkdsdVpTQThZajQyT0R3dllqNDhZbklnTHo0S1BHSnlJQzgrQ2p4aVBsZGhjbTVwYm1jOEwySStPaUFnYlhsemNXeGZjWFZsY25rb0tTQmJQR0VnYUhKbFpqMG5ablZ1WTNScGIyNHViWGx6Y1d3dGNYVmxjbmtuUG1aMWJtTjBhVzl1TG0xNWMzRnNMWEYxWlhKNVBDOWhQbDA2SUVOaGJpZDBJR052Ym01bFkzUWdkRzhnYkc5allXd2dUWGxUVVV3Z2MyVnlkbVZ5SUhSb2NtOTFaMmdnYzI5amEyVjBJQ2N2ZG1GeUwzSjFiaTl0ZVhOeGJHUXZiWGx6Y1d4a0xuTnZZMnNuSUNneUtTQnBiaUE4WWo0dmFHOXRaUzloYW1GNGJHOWhaQzkzZDNjdmJHbGljbUZwY21sbGN5OWpiR0Z6Y3k1dGVYTnhiQzV3YUhBOEwySStJRzl1SUd4cGJtVWdQR0krTmpnOEwySStQR0p5SUM4K0NqeGljaUF2UGdvOFlqNVhZWEp1YVc1blBDOWlQam9nSUcxNWMzRnNYM0YxWlhKNUtDa2dXenhoSUdoeVpXWTlKMloxYm1OMGFXOXVMbTE1YzNGc0xYRjFaWEo1Sno1bWRXNWpkR2x2Ymk1dGVYTnhiQzF4ZFdWeWVUd3ZZVDVkT2lCQklHeHBibXNnZEc4Z2RHaGxJSE5sY25abGNpQmpiM1ZzWkNCdWIzUWdZbVVnWlhOMFlXSnNhWE5vWldRZ2FXNGdQR0krTDJodmJXVXZZV3BoZUd4dllXUXZkM2QzTDJ4cFluSmhhWEpwWlhNdlkyeGhjM011YlhsemNXd3VjR2h3UEM5aVBpQnZiaUJzYVc1bElEeGlQalk0UEM5aVBqeGljaUF2UGdvOFluSWdMejRLUEdJK1YyRnlibWx1Wnp3dllqNDZJQ0J0ZVhOeGJGOXhkV1Z5ZVNncElGczhZU0JvY21WbVBTZG1kVzVqZEdsdmJpNXRlWE54YkMxeGRXVnllU2MrWm5WdVkzUnBiMjR1YlhsemNXd3RjWFZsY25rOEwyRStYVG9nUTJGdUozUWdZMjl1Ym1WamRDQjBieUJzYjJOaGJDQk5lVk5SVENCelpYSjJaWElnZEdoeWIzVm5hQ0J6YjJOclpYUWdKeTkyWVhJdmNuVnVMMjE1YzNGc1pDOXRlWE54YkdRdWMyOWpheWNnS0RJcElHbHVJRHhpUGk5b2IyMWxMMkZxWVhoc2IyRmtMM2QzZHk5c2FXSnlZV2x5YVdWekwyTnNZWE56TG0xNWMzRnNMbkJvY0R3dllqNGdiMjRnYkdsdVpTQThZajQyT0R3dllqNDhZbklnTHo0S1BHSnlJQzgrQ2p4aVBsZGhjbTVwYm1jOEwySStPaUFnYlhsemNXeGZjWFZsY25rb0tTQmJQR0VnYUhKbFpqMG5ablZ1WTNScGIyNHViWGx6Y1d3dGNYVmxjbmtuUG1aMWJtTjBhVzl1TG0xNWMzRnNMWEYxWlhKNVBDOWhQbDA2SUVFZ2JHbHVheUIwYnlCMGFHVWdjMlZ5ZG1WeUlHTnZkV3hrSUc1dmRDQmlaU0JsYzNSaFlteHBjMmhsWkNCcGJpQThZajR2YUc5dFpTOWhhbUY0Ykc5aFpDOTNkM2N2YkdsaWNtRnBjbWxsY3k5amJHRnpjeTV0ZVhOeGJDNXdhSEE4TDJJK0lHOXVJR3hwYm1VZ1BHSStOamc4TDJJK1BHSnlJQzgrQ2c9PVwiXG4iLCJjb25zdCB7aW5zZXJ0VG9UZXh0QXJlYUF0Q3Vyc29yLCBzZXRDdXJzb3JBZnRlcn0gPSByZXF1aXJlKCcuL3V0aWwnKVxuXG5jb25zdCBNUSA9IE1hdGhRdWlsbC5nZXRJbnRlcmZhY2UoMilcbm1vZHVsZS5leHBvcnRzID0ge2luaXR9XG5cbmZ1bmN0aW9uIGluaXQoJG91dGVyUGxhY2Vob2xkZXIsIGZvY3VzLCBvbk1hdGhGb2N1c0NoYW5nZWQpIHtcbiAgICBjb25zdCAkbWF0aEVkaXRvckNvbnRhaW5lciA9ICQoYFxuICAgICAgICA8ZGl2IGNsYXNzPVwibWF0aC1lZGl0b3JcIiBkYXRhLWpzPVwibWF0aEVkaXRvclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1hdGgtZWRpdG9yLWVxdWF0aW9uLWZpZWxkXCIgZGF0YS1qcz1cImVxdWF0aW9uRmllbGRcIj48L2Rpdj5cbiAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cIm1hdGgtZWRpdG9yLWxhdGV4LWZpZWxkXCIgZGF0YS1qcz1cImxhdGV4RmllbGRcIiBwbGFjZWhvbGRlcj1cIkxhVGV4XCI+PC90ZXh0YXJlYT5cbiAgICAgICAgPC9kaXY+YClcblxuICAgICRvdXRlclBsYWNlaG9sZGVyLmFwcGVuZCgkbWF0aEVkaXRvckNvbnRhaW5lcilcbiAgICBjb25zdCAkbGF0ZXhGaWVsZCA9ICRtYXRoRWRpdG9yQ29udGFpbmVyLmZpbmQoJ1tkYXRhLWpzPVwibGF0ZXhGaWVsZFwiXScpXG4gICAgY29uc3QgJGVxdWF0aW9uRmllbGQgPSAkbWF0aEVkaXRvckNvbnRhaW5lci5maW5kKCdbZGF0YS1qcz1cImVxdWF0aW9uRmllbGRcIl0nKVxuICAgIGxldCBtcUVkaXRUaW1lb3V0XG4gICAgbGV0IHZpc2libGUgPSBmYWxzZVxuICAgIGxldCBmb2N1c0NoYW5nZWQgPSBudWxsXG4gICAgLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzLEpTVW51c2VkTG9jYWxTeW1ib2xzXG4gICAgY29uc3QgbXFJbnN0YW5jZSA9IE1RLk1hdGhGaWVsZCgkZXF1YXRpb25GaWVsZC5nZXQoMCksIHtcbiAgICAgICAgaGFuZGxlcnM6IHtcbiAgICAgICAgICAgIGVkaXQ6IG9uTXFFZGl0LFxuICAgICAgICAgICAgZW50ZXI6IGZpZWxkID0+IHtcbiAgICAgICAgICAgICAgICBjbG9zZU1hdGhFZGl0b3IodHJ1ZSlcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGluc2VydE5ld0VxdWF0aW9uKCc8YnI+JyksIDIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxuICAgICRlcXVhdGlvbkZpZWxkXG4gICAgICAgIC5vbigna2V5ZG93bicsICcubXEtdGV4dGFyZWEgdGV4dGFyZWEnLCBvbk1xRWRpdClcbiAgICAgICAgLm9uKCdmb2N1cyBibHVyJywgJy5tcS10ZXh0YXJlYSB0ZXh0YXJlYScsIGUgPT4ge1xuICAgICAgICAgICAgZm9jdXMuZXF1YXRpb25GaWVsZCA9IGUudHlwZSAhPT0gJ2JsdXInICYmIGUudHlwZSAhPT0gJ2ZvY3Vzb3V0J1xuICAgICAgICAgICAgb25Gb2N1c0NoYW5nZWQoKVxuICAgICAgICB9KVxuXG4gICAgJGxhdGV4RmllbGRcbiAgICAgICAgLmtleXVwKG9uTGF0ZXhVcGRhdGUpXG4gICAgICAgIC5vbignZm9jdXMgYmx1cicsIGUgPT4ge1xuICAgICAgICAgICAgZm9jdXMubGF0ZXhGaWVsZCA9IGUudHlwZSAhPT0gJ2JsdXInXG4gICAgICAgICAgICBvbkZvY3VzQ2hhbmdlZCgpXG4gICAgICAgIH0pXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpbnNlcnROZXdFcXVhdGlvbixcbiAgICAgICAgaW5zZXJ0TWF0aCxcbiAgICAgICAgY2xvc2VNYXRoRWRpdG9yLFxuICAgICAgICBvcGVuTWF0aEVkaXRvcixcbiAgICAgICAgb25Gb2N1c0NoYW5nZWQsXG4gICAgICAgIGlzVmlzaWJsZVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzVmlzaWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIHZpc2libGVcbiAgICB9XG4gICAgZnVuY3Rpb24gb25NcUVkaXQoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChtcUVkaXRUaW1lb3V0KVxuICAgICAgICBtcUVkaXRUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZm9jdXMubGF0ZXhGaWVsZClcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIGNvbnN0IGxhdGV4ID0gbXFJbnN0YW5jZS5sYXRleCgpXG4gICAgICAgICAgICAkbGF0ZXhGaWVsZC52YWwobGF0ZXgpXG4gICAgICAgICAgICB1cGRhdGVNYXRoSW1nKCRtYXRoRWRpdG9yQ29udGFpbmVyLnByZXYoKSwgbGF0ZXgpXG4gICAgICAgIH0sIDEwMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkxhdGV4VXBkYXRlKCkge1xuICAgICAgICB1cGRhdGVNYXRoSW1nKCRtYXRoRWRpdG9yQ29udGFpbmVyLnByZXYoKSwgJGxhdGV4RmllbGQudmFsKCkpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gbXFJbnN0YW5jZS5sYXRleCgkbGF0ZXhGaWVsZC52YWwoKSksIDEpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Gb2N1c0NoYW5nZWQoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChmb2N1c0NoYW5nZWQpXG4gICAgICAgIGZvY3VzQ2hhbmdlZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFmb2N1cy5sYXRleEZpZWxkICYmICFmb2N1cy5lcXVhdGlvbkZpZWxkKSBjbG9zZU1hdGhFZGl0b3IoKVxuICAgICAgICAgICAgb25NYXRoRm9jdXNDaGFuZ2VkKClcbiAgICAgICAgfSwgMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnNlcnROZXdFcXVhdGlvbihvcHRpb25hbE1hcmt1cCA9ICcnKSB7XG4gICAgICAgIHdpbmRvdy5kb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0SFRNTCcsIGZhbHNlLCBvcHRpb25hbE1hcmt1cCArICc8aW1nIGRhdGEtanM9XCJuZXdcIiBhbHQ9XCJcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIi8+JylcbiAgICAgICAgc2hvd01hdGhFZGl0b3IoJCgnW2RhdGEtanM9XCJuZXdcIl0nKS5yZW1vdmVBdHRyKCdkYXRhLWpzJykpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb3Blbk1hdGhFZGl0b3IoJGltZykge1xuICAgICAgICBpZiAodmlzaWJsZSkgY2xvc2VNYXRoRWRpdG9yKClcbiAgICAgICAgc2V0Q3Vyc29yQWZ0ZXIoJGltZylcbiAgICAgICAgc2hvd01hdGhFZGl0b3IoJGltZylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaG93TWF0aEVkaXRvcigkaW1nKSB7XG4gICAgICAgICRpbWcuaGlkZSgpXG4gICAgICAgICRpbWcuYWZ0ZXIoJG1hdGhFZGl0b3JDb250YWluZXIpXG4gICAgICAgIHZpc2libGUgPSB0cnVlXG4gICAgICAgIHRvZ2dsZU1hdGhUb29sYmFyKHRydWUpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gbXFJbnN0YW5jZS5mb2N1cygpLCAwKVxuICAgICAgICAkbGF0ZXhGaWVsZC52YWwoJGltZy5wcm9wKCdhbHQnKSlcbiAgICAgICAgb25MYXRleFVwZGF0ZSgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zZXJ0TWF0aChzeW1ib2wsIGFsdGVybmF0aXZlU3ltYm9sLCB1c2VXcml0ZSkge1xuICAgICAgICBpZiAoZm9jdXMubGF0ZXhGaWVsZCkge1xuICAgICAgICAgICAgaW5zZXJ0VG9UZXh0QXJlYUF0Q3Vyc29yKCRsYXRleEZpZWxkLmdldCgwKSwgYWx0ZXJuYXRpdmVTeW1ib2wgfHwgc3ltYm9sKVxuICAgICAgICAgICAgb25MYXRleFVwZGF0ZSgpXG4gICAgICAgIH0gZWxzZSBpZiAoZm9jdXMuZXF1YXRpb25GaWVsZCkge1xuICAgICAgICAgICAgaWYgKHVzZVdyaXRlKSB7XG4gICAgICAgICAgICAgICAgbXFJbnN0YW5jZS53cml0ZShzeW1ib2wpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1xSW5zdGFuY2UudHlwZWRUZXh0KHN5bWJvbClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzeW1ib2wuc3RhcnRzV2l0aCgnXFxcXCcpKSBtcUluc3RhbmNlLmtleXN0cm9rZSgnVGFiJylcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gbXFJbnN0YW5jZS5mb2N1cygpLCAwKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTWF0aEltZygkaW1nLCBsYXRleCkge1xuICAgICAgICAkaW1nLnByb3Aoe1xuICAgICAgICAgICAgc3JjOiAnL21hdGguc3ZnP2xhdGV4PScgKyBlbmNvZGVVUklDb21wb25lbnQobGF0ZXgpLFxuICAgICAgICAgICAgYWx0OiBsYXRleFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlTWF0aEVkaXRvcihzZXRGb2N1c0FmdGVyQ2xvc2UgPSBmYWxzZSkge1xuICAgICAgICAvLyBUT0RPOiByZW1vdmUgZXZlbnQgYmluZGluZ3NcbiAgICAgICAgY29uc3QgJGN1cnJlbnRFZGl0b3IgPSAkbWF0aEVkaXRvckNvbnRhaW5lci5jbG9zZXN0KCdbZGF0YS1qcz1cImFuc3dlclwiXScpXG4gICAgICAgIGNvbnN0ICRpbWcgPSAkbWF0aEVkaXRvckNvbnRhaW5lci5wcmV2KClcbiAgICAgICAgaWYgKCRsYXRleEZpZWxkLnZhbCgpLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgICAgICAgICRpbWcucmVtb3ZlKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRpbWcuc2hvdygpXG4gICAgICAgICAgICB1cGRhdGVNYXRoSW1nKCRpbWcsICRsYXRleEZpZWxkLnZhbCgpKVxuICAgICAgICB9XG5cbiAgICAgICAgdG9nZ2xlTWF0aFRvb2xiYXIoZmFsc2UpXG4gICAgICAgICRvdXRlclBsYWNlaG9sZGVyLmFwcGVuZCgkbWF0aEVkaXRvckNvbnRhaW5lcilcbiAgICAgICAgdmlzaWJsZSA9IGZhbHNlXG4gICAgICAgIGZvY3VzLmxhdGV4RmllbGQgPSBmYWxzZVxuICAgICAgICBmb2N1cy5lcXVhdGlvbkZpZWxkID0gZmFsc2VcbiAgICAgICAgaWYgKHNldEZvY3VzQWZ0ZXJDbG9zZSkgJGN1cnJlbnRFZGl0b3IuZm9jdXMoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvZ2dsZU1hdGhUb29sYmFyKGlzVmlzaWJsZSkge1xuICAgICAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ21hdGgtZWRpdG9yLWZvY3VzJywgaXNWaXNpYmxlKVxuICAgIH1cbn1cbiIsImNvbnN0IHtpc0N0cmxLZXksIGlzS2V5LCBwZXJzaXN0SW5saW5lSW1hZ2VzLCBzYW5pdGl6ZUNvbnRlbnQsIHNhbml0aXplLCBlcXVhdGlvbkltYWdlU2VsZWN0b3IsIHRvdGFsSW1hZ2VDb3VudH0gPSByZXF1aXJlKCcuL3V0aWwnKVxuY29uc3QgdG9vbGJhcnMgPSByZXF1aXJlKCcuL3Rvb2xiYXJzJylcbmNvbnN0IG1hdGhFZGl0b3IgPSByZXF1aXJlKCcuL21hdGgtZWRpdG9yJylcbmNvbnN0IGxvY2FsZXMgPSB7XG4gICAgRkk6IHJlcXVpcmUoJy4vRkknKSxcbiAgICBTVjogcmVxdWlyZSgnLi9TVicpXG59XG5jb25zdCBsID0gbG9jYWxlc1t3aW5kb3cubG9jYWxlIHx8ICdGSSddLmVkaXRvclxuY29uc3Qga2V5Q29kZXMgPSB7XG4gICAgRU5URVI6IDEzLFxuICAgIEVTQzogMjdcbn1cbmNvbnN0ICRvdXRlclBsYWNlaG9sZGVyID0gJChgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItaGlkZGVuXCIgZGF0YS1qcz1cIm91dGVyUGxhY2Vob2xkZXJcIj5gKVxuY29uc3QgZm9jdXMgPSB7XG4gICAgcmljaFRleHQ6IGZhbHNlLFxuICAgIGxhdGV4RmllbGQ6IGZhbHNlLFxuICAgIGVxdWF0aW9uRmllbGQ6IGZhbHNlXG59XG5sZXQgJGN1cnJlbnRFZGl0b3JcbmNvbnN0IG1hdGggPSBtYXRoRWRpdG9yLmluaXQoJG91dGVyUGxhY2Vob2xkZXIsIGZvY3VzLCBvbk1hdGhGb2N1c0NoYW5nZWQpXG5cbmZ1bmN0aW9uIG9uTWF0aEZvY3VzQ2hhbmdlZCgpIHtcbiAgICBpZiAocmljaFRleHRBbmRNYXRoQmx1cigpKSBvblJpY2hUZXh0RWRpdG9yQmx1cigpXG59XG5cbmNvbnN0IHskdG9vbGJhcn0gPSB0b29sYmFycy5pbml0KG1hdGgsICgpID0+IGZvY3VzLnJpY2hUZXh0LCBsKVxuXG4kKCdib2R5JykuYXBwZW5kKCRvdXRlclBsYWNlaG9sZGVyLCAkdG9vbGJhcilcblxubW9kdWxlLmV4cG9ydHMubWFrZVJpY2hUZXh0ID0gKGVsZW1lbnQsIG9wdGlvbnMsIG9uVmFsdWVDaGFuZ2VkID0gKCkgPT4geyB9KSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgICBzY3JlZW5zaG90OiB7XG4gICAgICAgICAgICBzYXZlcixcbiAgICAgICAgICAgIGxpbWl0XG4gICAgICAgIH1cbiAgICB9ID0gb3B0aW9uc1xuICAgIGNvbnN0ICRhbnN3ZXIgPSAkKGVsZW1lbnQpXG4gICAgbGV0IHBhc3RlSW5Qcm9ncmVzcyA9IGZhbHNlXG5cbiAgICAkYW5zd2VyXG4gICAgICAgIC5hdHRyKHtcbiAgICAgICAgICAgICdjb250ZW50ZWRpdGFibGUnOiAndHJ1ZScsXG4gICAgICAgICAgICAnc3BlbGxjaGVjayc6ICdmYWxzZScsXG4gICAgICAgICAgICAnZGF0YS1qcyc6ICdhbnN3ZXInXG4gICAgICAgIH0pXG4gICAgICAgIC5hZGRDbGFzcygncmljaC10ZXh0LWVkaXRvcicpXG4gICAgICAgIC5vbignbW91c2Vkb3duJywgZXF1YXRpb25JbWFnZVNlbGVjdG9yLCBlID0+IHtcbiAgICAgICAgICAgIG9uUmljaFRleHRFZGl0b3JGb2N1cygkKGUudGFyZ2V0KS5jbG9zZXN0KCdbZGF0YS1qcz1cImFuc3dlclwiXScpKVxuICAgICAgICAgICAgbWF0aC5vcGVuTWF0aEVkaXRvcigkKGUudGFyZ2V0KSlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdrZXlwcmVzcycsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKGlzQ3RybEtleShlLCAnbCcpIHx8IGlzQ3RybEtleShlLCAnaScpKSBtYXRoLmluc2VydE5ld0VxdWF0aW9uKClcbiAgICAgICAgICAgIGlmIChpc0N0cmxLZXkoZSwga2V5Q29kZXMuRU5URVIpIHx8IGlzS2V5KGUsIGtleUNvZGVzLkVTQykpIG1hdGguY2xvc2VNYXRoRWRpdG9yKHRydWUpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZm9jdXMgYmx1cicsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKG1hdGguaXNWaXNpYmxlKCkgJiYgZS50eXBlID09PSAnZm9jdXMnKSBtYXRoLmNsb3NlTWF0aEVkaXRvcigpXG4gICAgICAgICAgICBvblJpY2hUZXh0RWRpdG9yRm9jdXNDaGFuZ2VkKGUpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbigna2V5dXAgaW5wdXQnLCBlID0+IHtcbiAgICAgICAgICAgIGlmKCEgcGFzdGVJblByb2dyZXNzKSBvblZhbHVlQ2hhbmdlZChzYW5pdGl6ZUNvbnRlbnQoZS5jdXJyZW50VGFyZ2V0KSlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdwYXN0ZScsIGUgPT4ge1xuICAgICAgICAgICAgcGFzdGVJblByb2dyZXNzID0gdHJ1ZVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBwYXN0ZUluUHJvZ3Jlc3MgPSBmYWxzZSwgMClcblxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdURVhUQVJFQScpXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICBjb25zdCBjbGlwYm9hcmREYXRhID0gZS5vcmlnaW5hbEV2ZW50LmNsaXBib2FyZERhdGFcbiAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBjbGlwYm9hcmREYXRhLml0ZW1zICYmIGNsaXBib2FyZERhdGEuaXRlbXNbMF0uZ2V0QXNGaWxlKClcbiAgICAgICAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgaWYoZmlsZS50eXBlICE9PSAnaW1hZ2UvcG5nJylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgc2F2ZXIoe2RhdGE6IGZpbGUsIHR5cGU6IGZpbGUudHlwZSwgaWQ6IFN0cmluZyhuZXcgRGF0ZSgpLmdldFRpbWUoKSl9KS50aGVuKHNjcmVlbnNob3RVcmwgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBgPGltZyBzcmM9XCIke3NjcmVlbnNob3RVcmx9XCIvPmBcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LmV4ZWNDb21tYW5kKCdpbnNlcnRIVE1MJywgZmFsc2UsIGltZylcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjbGlwYm9hcmREYXRhQXNIdG1sID0gY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0L2h0bWwnKVxuICAgICAgICAgICAgICAgIGlmIChjbGlwYm9hcmREYXRhQXNIdG1sKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICBpZih0b3RhbEltYWdlQ291bnQoJGFuc3dlciwgY2xpcGJvYXJkRGF0YUFzSHRtbCkgPD0gbGltaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0SFRNTCcsIGZhbHNlLCBzYW5pdGl6ZShjbGlwYm9hcmREYXRhQXNIdG1sKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcGVyc2lzdElubGluZUltYWdlcygkY3VycmVudEVkaXRvciwgc2F2ZXIsIGxpbWl0LCBvblZhbHVlQ2hhbmdlZCksIDApXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvblZhbHVlQ2hhbmdlZChuZXcgQmFjb24uRXJyb3IoJ1NjcmVlbnNob3QgbGltaXQgcmVhY2hlZCEnKSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiBwZXJzaXN0SW5saW5lSW1hZ2VzKCRjdXJyZW50RWRpdG9yLCBzYXZlciwgbGltaXQsIG9uVmFsdWVDaGFuZ2VkKSwgMClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgIHNldFRpbWVvdXQoKCkgPT4gZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJlbmFibGVPYmplY3RSZXNpemluZ1wiLCBmYWxzZSwgZmFsc2UpLCAwKVxufVxuXG5mdW5jdGlvbiB0b2dnbGVSaWNoVGV4dFRvb2xiYXIoaXNWaXNpYmxlKSB7XG4gICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdyaWNoLXRleHQtZWRpdG9yLWZvY3VzJywgaXNWaXNpYmxlKVxufVxuZnVuY3Rpb24gb25SaWNoVGV4dEVkaXRvckZvY3VzKCRlbGVtZW50KSB7XG4gICAgJGN1cnJlbnRFZGl0b3IgPSAkZWxlbWVudFxuICAgIHRvZ2dsZVJpY2hUZXh0VG9vbGJhcih0cnVlKVxufVxuXG5mdW5jdGlvbiBvblJpY2hUZXh0RWRpdG9yQmx1cigpIHtcbiAgICB0b2dnbGVSaWNoVGV4dFRvb2xiYXIoZmFsc2UpXG4gICAgbWF0aC5jbG9zZU1hdGhFZGl0b3IoKVxuICAgIGZvY3VzLnJpY2hUZXh0ID0gZmFsc2Vcbn1cblxubGV0IHJpY2hUZXh0RWRpdG9yQmx1clRpbWVvdXRcblxuZnVuY3Rpb24gb25SaWNoVGV4dEVkaXRvckZvY3VzQ2hhbmdlZChlKSB7XG4gICAgZm9jdXMucmljaFRleHQgPSBlLnR5cGUgPT09ICdmb2N1cydcblxuICAgIGNsZWFyVGltZW91dChyaWNoVGV4dEVkaXRvckJsdXJUaW1lb3V0KVxuICAgIHJpY2hUZXh0RWRpdG9yQmx1clRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKHJpY2hUZXh0QW5kTWF0aEJsdXIoKSkgb25SaWNoVGV4dEVkaXRvckJsdXIoKVxuICAgICAgICBlbHNlIGlmIChmb2N1cy5yaWNoVGV4dCAmJiBtYXRoLmlzVmlzaWJsZSgpKSBtYXRoLmNsb3NlTWF0aEVkaXRvcigpXG4gICAgICAgIGVsc2Ugb25SaWNoVGV4dEVkaXRvckZvY3VzKCQoZS50YXJnZXQpKVxuICAgIH0sIDApXG59XG5cbmZ1bmN0aW9uIHJpY2hUZXh0QW5kTWF0aEJsdXIoKSB7XG4gICAgcmV0dXJuICFmb2N1cy5yaWNoVGV4dCAmJiAhbWF0aC5pc1Zpc2libGUoKSAmJiAhZm9jdXMubGF0ZXhGaWVsZCAmJiAhZm9jdXMuZXF1YXRpb25GaWVsZFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYWxsb3dlZFRhZ3M6IFtcbiAgICAgICAgJ2RpdicsXG4gICAgICAgICdpbWcnLFxuICAgICAgICAnYnInXG4gICAgXSxcbiAgICBhbGxvd2VkQXR0cmlidXRlczoge1xuICAgICAgICBpbWc6IFsnc3JjJywgJ2FsdCddXG4gICAgfSxcbiAgICBhbGxvd2VkU2NoZW1lczogWydkYXRhJywgJ2h0dHAnLCAnaHR0cHMnXSxcbiAgICBleGNsdXNpdmVGaWx0ZXI6IGZ1bmN0aW9uKGZyYW1lKSB7IHJldHVybiBmcmFtZS5hdHRyaWJzWydkYXRhLWpzJ10gPT09ICdtYXRoRWRpdG9yJyB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAgICB7XG4gICAgICAgIGxhYmVsOiAnUGVydXMnLFxuICAgICAgICBjaGFyYWN0ZXJzOiBbXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KJoCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxuZXEnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KJiCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxhcHByb3gnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KJpCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxsZXEnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KJpScsIGxhdGV4Q29tbWFuZDogJ1xcXFxnZXEnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8KyJywgbGF0ZXhDb21tYW5kOiAnXjInLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8KzJywgbGF0ZXhDb21tYW5kOiAnXjMnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8K9JywgbGF0ZXhDb21tYW5kOiAnMS8yJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihZMnLCBsYXRleENvbW1hbmQ6ICcxLzMnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8KxJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBtJyB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbGFiZWw6ICdBbGdlYnJhJyxcbiAgICAgICAgY2hhcmFjdGVyczogW1xuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiLwnLCBsYXRleENvbW1hbmQ6ICdcXFxcc2ltJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiaEnLCBsYXRleENvbW1hbmQ6ICdcXFxcZXF1aXYnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KJoicgfSwgLy8gXFxuZXF1aXYgb3IgXFxub3RcXGVxdWl2XG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8K3JywgbGF0ZXhDb21tYW5kOiAnXFxcXGNkb3QnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KApicsIGxhdGV4Q29tbWFuZDogJ1xcXFxkb3RzJyB9LCAvLyBtYXRyaWlzaWFsZ2VicmE/XG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KInicsIGxhdGV4Q29tbWFuZDogJ1xcXFxpbmZ0eScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBsYWJlbDogJ0tyZWlra2FsYWlzZXQgYWFra29zZXQnLFxuICAgICAgICBjaGFyYWN0ZXJzOiBbXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86xJywgbGF0ZXhDb21tYW5kOiAnXFxcXGFscGhhJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOsicsIGxhdGV4Q29tbWFuZDogJ1xcXFxiZXRhJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOtCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxkZWx0YScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzrUnLCBsYXRleENvbW1hbmQ6ICdcXFxcdmFyZXBzaWxvbicgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzrcnLCBsYXRleENvbW1hbmQ6ICdcXFxcZXRhJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiIInLCBsYXRleENvbW1hbmQ6ICdcXFxccGFydGlhbCcgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn8J2chCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxpb3RhJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOuycsIGxhdGV4Q29tbWFuZDogJ1xcXFxsYW1iZGEnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8K1JywgbGF0ZXhDb21tYW5kOiAnXFxcXG11JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfPgCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxwaScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnz4MnLCBsYXRleENvbW1hbmQ6ICdcXFxcc2lnbWEnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8+EJywgbGF0ZXhDb21tYW5kOiAnXFxcXHRhdScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn0KQnLCBsYXRleENvbW1hbmQ6ICdcXFxccGhpJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfPiScsIGxhdGV4Q29tbWFuZDogJ1xcXFxvbWVnYScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzpMnLCBsYXRleENvbW1hbmQ6ICdcXFxcR2FtbWEnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86UJywgbGF0ZXhDb21tYW5kOiAnXFxcXERlbHRhJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOmCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxUaGV0YScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiPJywgbGF0ZXhDb21tYW5kOiAnXFxcXFBpJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiJEnLCBsYXRleENvbW1hbmQ6ICdcXFxcU2lnbWEnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86mJywgbGF0ZXhDb21tYW5kOiAnXFxcXFBoaScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzqknLCBsYXRleENvbW1hbmQ6ICdcXFxcT21lZ2EnIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBsYWJlbDogJ0dlb21ldHJpYSBqYSB2ZWt0b3Jpb3BwaScsXG4gICAgICAgIGNoYXJhY3RlcnM6IFtcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnwrAnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIoCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxhbmdsZScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oqlJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBlcnAnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KAlicsIGxhdGV4Q29tbWFuZDogJ1xcXFxwYXJhbGxlbCcsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oeFJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihpEnLCBsYXRleENvbW1hbmQ6ICdcXFxcdXBhcnJvdycgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oaTJywgbGF0ZXhDb21tYW5kOiAnXFxcXGRvd25hcnJvdycgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oaUJywgbGF0ZXhDb21tYW5kOiAnXFxcXGxlZnRyaWdodGFycm93JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfih4wnIH0gLy8gXFxyaWdodGxlZnRoYXJwb29uc1xuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGxhYmVsOiAnTG9naWlra2EgamEgam91a2tvLW9wcGknLFxuICAgICAgICBjaGFyYWN0ZXJzOiBbXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KHkicsIGxhdGV4Q29tbWFuZDogJ1xcXFxSaWdodGFycm93JywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfih5QnLCBsYXRleENvbW1hbmQ6ICdcXFxcTGVmdHJpZ2h0YXJyb3cnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIpycsIGxhdGV4Q29tbWFuZDogJ1xcXFxhbmQnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIqCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxvcicgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnwqwnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIgycsIGxhdGV4Q29tbWFuZDogJ1xcXFxleGlzdHMnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIgCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxmb3JhbGwnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIqScsIGxhdGV4Q29tbWFuZDogJ1xcXFxjYXAnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIqicsIGxhdGV4Q29tbWFuZDogJ1xcXFxjdXAnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIlicsIGxhdGV4Q29tbWFuZDogJ1xcXFxzZXRtaW51cycgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oqCJywgbGF0ZXhDb21tYW5kOiAnXFxcXHN1YnNldCcgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oqEJywgbGF0ZXhDb21tYW5kOiAnXFxcXG5vdHN1YnNldCcgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiIJywgbGF0ZXhDb21tYW5kOiAnXFxcXGluJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiIknLCBsYXRleENvbW1hbmQ6ICdcXFxcbm90aW4nIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIhScsIGxhdGV4Q29tbWFuZDogJ1xcXFxlbXB0eScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oaSJywgbGF0ZXhDb21tYW5kOiAnXFxcXHJpZ2h0YXJyb3cnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KImCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxjaXJjJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiLwnLCBsYXRleENvbW1hbmQ6ICdcXFxcc2ltJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihJ0nIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KElScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oSkJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihJonIH1cbiAgICAgICAgXVxuICAgIH1cbl1cbiIsImNvbnN0IHNwZWNpYWxDaGFyYWN0ZXJHcm91cHMgPSByZXF1aXJlKCcuL3NwZWNpYWxDaGFyYWN0ZXJzJylcbmNvbnN0IGxhdGV4Q29tbWFuZHMgPSByZXF1aXJlKCcuL2xhdGV4Q29tbWFuZHMnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpbml0LFxufVxuXG5mdW5jdGlvbiBpbml0KG1hdGhFZGl0b3IsIGhhc1JpY2hUZXh0Rm9jdXMsIGwpIHtcbiAgICBjb25zdCAkdG9vbGJhciA9ICQoYFxuICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29sc1wiIGRhdGEtanM9XCJ0b29sc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbHMtYnV0dG9uLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29sYmFyLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItY2hhcmFjdGVycy1leHBhbmQtY29sbGFwc2VcIiBkYXRhLWpzPVwiZXhwYW5kQ29sbGFwc2VDaGFyYWN0ZXJzXCIgc3R5bGU9XCJ6LWluZGV4OiAxMDBcIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbHMtcm93XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhci13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xiYXItY2hhcmFjdGVycyByaWNoLXRleHQtZWRpdG9yLXRvb2xiYXIgcmljaC10ZXh0LWVkaXRvci10b29sYmFyLWJ1dHRvbi1saXN0XCIgZGF0YS1qcz1cImNoYXJhY3RlcnNMaXN0XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xzLXJvd1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xiYXItd3JhcHBlciByaWNoLXRleHQtZWRpdG9yLWVxdWF0aW9uLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhci1lcXVhdGlvbiByaWNoLXRleHQtZWRpdG9yLXRvb2xiYXIgcmljaC10ZXh0LWVkaXRvci10b29sYmFyLWJ1dHRvbi1saXN0XCIgZGF0YS1qcz1cIm1hdGhUb29sYmFyXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xzLWJ1dHRvbi13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhci13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLW5ldy1lcXVhdGlvbiByaWNoLXRleHQtZWRpdG9yLWJ1dHRvbiByaWNoLXRleHQtZWRpdG9yLWJ1dHRvbi1hY3Rpb25cIiBkYXRhLWpzPVwibmV3RXF1YXRpb25cIiBkYXRhLWNvbW1hbmQ9XCJDdHJsLUxcIj7OoyAke2wuaW5zZXJ0RXF1YXRpb259PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIGApXG4gICAgICAgIC5vbignbW91c2Vkb3duJywgJ1tkYXRhLWpzPVwiZXhwYW5kQ29sbGFwc2VDaGFyYWN0ZXJzXCJdJywgZSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICR0b29sYmFyLnRvZ2dsZUNsYXNzKCdyaWNoLXRleHQtZWRpdG9yLWNoYXJhY3RlcnMtZXhwYW5kZWQnKVxuICAgICAgICB9KVxuXG4gICAgY29uc3QgJG5ld0VxdWF0aW9uID0gJHRvb2xiYXIuZmluZCgnW2RhdGEtanM9XCJuZXdFcXVhdGlvblwiXScpXG4gICAgY29uc3QgJG1hdGhUb29sYmFyID0gJHRvb2xiYXIuZmluZCgnW2RhdGEtanM9XCJtYXRoVG9vbGJhclwiXScpXG4gICAgaW5pdFNwZWNpYWxDaGFyYWN0ZXJUb29sYmFyKCR0b29sYmFyLCBtYXRoRWRpdG9yLCBoYXNSaWNoVGV4dEZvY3VzKVxuICAgIGluaXRNYXRoVG9vbGJhcigkbWF0aFRvb2xiYXIsIG1hdGhFZGl0b3IpXG4gICAgaW5pdE5ld0VxdWF0aW9uKCRuZXdFcXVhdGlvbiwgbWF0aEVkaXRvciwgaGFzUmljaFRleHRGb2N1cylcblxuICAgIHJldHVybiB7ICR0b29sYmFyIH1cbn1cblxuY29uc3Qgc3BlY2lhbENoYXJhY3RlclRvQnV0dG9uID0gY2hhciA9PiBgPGJ1dHRvbiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItYnV0dG9uIHJpY2gtdGV4dC1lZGl0b3ItYnV0dG9uLWdyaWQke2NoYXIucG9wdWxhciA/ICcgcmljaC10ZXh0LWVkaXRvci1jaGFyYWN0ZXJzLXBvcHVsYXInIDonJ31cIiAke2NoYXIubGF0ZXhDb21tYW5kID8gYGRhdGEtY29tbWFuZD1cIiR7Y2hhci5sYXRleENvbW1hbmR9XCJgIDogJyd9PiR7Y2hhci5jaGFyYWN0ZXJ9PC9idXR0b24+YFxuXG5jb25zdCBwb3B1bGFySW5Hcm91cCA9IGdyb3VwID0+IGdyb3VwLmNoYXJhY3RlcnMuZmlsdGVyKGNoYXJhY3RlciA9PiBjaGFyYWN0ZXIucG9wdWxhcikubGVuZ3RoXG5cbmZ1bmN0aW9uIGluaXRTcGVjaWFsQ2hhcmFjdGVyVG9vbGJhcigkdG9vbGJhciwgbWF0aEVkaXRvciwgaGFzQW5zd2VyRm9jdXMpIHtcbiAgICBjb25zdCBncmlkQnV0dG9uV2lkdGhQeCA9IDM1XG5cbiAgICAkdG9vbGJhci5maW5kKCdbZGF0YS1qcz1cImNoYXJhY3RlcnNMaXN0XCJdJylcbiAgICAgICAgLmFwcGVuZChzcGVjaWFsQ2hhcmFjdGVyR3JvdXBzLm1hcChncm91cCA9PlxuICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xiYXItY2hhcmFjdGVycy1ncm91cFwiIFxuICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogJHtwb3B1bGFySW5Hcm91cChncm91cCkgKiBncmlkQnV0dG9uV2lkdGhQeH1weFwiPlxuICAgICAgICAgICAgICAgICAgJHtncm91cC5jaGFyYWN0ZXJzLm1hcChzcGVjaWFsQ2hhcmFjdGVyVG9CdXR0b24pLmpvaW4oJycpfVxuICAgICAgICAgICAgIDwvZGl2PmApKVxuICAgICAgICAub24oJ21vdXNlZG93bicsICdidXR0b24nLCBlID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgICAgICBjb25zdCBjaGFyYWN0ZXIgPSBlLmN1cnJlbnRUYXJnZXQuaW5uZXJUZXh0XG4gICAgICAgICAgICBjb25zdCBjb21tYW5kID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY29tbWFuZFxuICAgICAgICAgICAgaWYgKGhhc0Fuc3dlckZvY3VzKCkpIHdpbmRvdy5kb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0VGV4dCcsIGZhbHNlLCBjaGFyYWN0ZXIpXG4gICAgICAgICAgICBlbHNlIG1hdGhFZGl0b3IuaW5zZXJ0TWF0aChjb21tYW5kIHx8IGNoYXJhY3RlcilcbiAgICAgICAgfSlcbn1cblxuZnVuY3Rpb24gaW5pdE1hdGhUb29sYmFyKCRtYXRoVG9vbGJhciwgbWF0aEVkaXRvcikge1xuICAgICRtYXRoVG9vbGJhci5hcHBlbmQobGF0ZXhDb21tYW5kc1xuICAgICAgICAubWFwKG8gPT4gYDxidXR0b24gY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLWJ1dHRvbiByaWNoLXRleHQtZWRpdG9yLWJ1dHRvbi1ncmlkXCIgZGF0YS1jb21tYW5kPVwiJHtvLmFjdGlvbn1cIiBkYXRhLWxhdGV4Y29tbWFuZD1cIiR7by5sYWJlbH1cIiBkYXRhLXVzZXdyaXRlPVwiJHtvLnVzZVdyaXRlIHx8IGZhbHNlfVwiPlxuPGltZyBzcmM9XCIvbWF0aC5zdmc/bGF0ZXg9JHtlbmNvZGVVUklDb21wb25lbnQoby5sYWJlbCA/IG8ubGFiZWwucmVwbGFjZSgvWC9nLCAnXFxcXHNxdWFyZScpIDogby5hY3Rpb24pfVwiLz5cbjwvYnV0dG9uPmApLmpvaW4oJycpXG4gICAgKS5vbignbW91c2Vkb3duJywgJ2J1dHRvbicsIGUgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgY29uc3QgZGF0YXNldCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0O1xuICAgICAgICBtYXRoRWRpdG9yLmluc2VydE1hdGgoZGF0YXNldC5jb21tYW5kLCBkYXRhc2V0LmxhdGV4Y29tbWFuZCwgZGF0YXNldC51c2V3cml0ZSA9PT0gJ3RydWUnKVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGluaXROZXdFcXVhdGlvbigkbmV3RXF1YXRpb24sIG1hdGhFZGl0b3IsIGhhc0Fuc3dlckZvY3VzKSB7XG4gICAgJG5ld0VxdWF0aW9uLm1vdXNlZG93bigoZSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBpZiAoIWhhc0Fuc3dlckZvY3VzKCkpIHJldHVybiAvLyBUT0RPOiByZW1vdmUgd2hlbiBidXR0b24gaXMgb25seSB2aXNpYmxlIHdoZW4gdGV4dGFyZWEgaGFzIGZvY3VzXG4gICAgICAgIG1hdGhFZGl0b3IuaW5zZXJ0TmV3RXF1YXRpb24oKVxuICAgIH0pLmJpbmQodGhpcykpXG59XG4iLCJjb25zdCBzYW5pdGl6ZUh0bWwgPSByZXF1aXJlKCdzYW5pdGl6ZS1odG1sJylcbmNvbnN0IHNhbml0aXplT3B0cyA9IHJlcXVpcmUoJy4vc2FuaXRpemVPcHRzJylcbmNvbnN0IGxvYWRpbmdJbWcgPSByZXF1aXJlKCcuL2xvYWRpbmdJbWcnKVxuY29uc3QgZXF1YXRpb25JbWFnZVNlbGVjdG9yID0gJ2ltZ1tzcmNePVwiL21hdGguc3ZnXCJdJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtpc0tleSwgaXNDdHJsS2V5LCBpbnNlcnRUb1RleHRBcmVhQXRDdXJzb3IsIHBlcnNpc3RJbmxpbmVJbWFnZXMsIHNhbml0aXplLCBzYW5pdGl6ZUNvbnRlbnQsIHNldEN1cnNvckFmdGVyLCBlcXVhdGlvbkltYWdlU2VsZWN0b3IsIHRvdGFsSW1hZ2VDb3VudH1cblxuXG5mdW5jdGlvbiBzYW5pdGl6ZShodG1sKSB7XG4gICAgcmV0dXJuIHNhbml0aXplSHRtbChodG1sLCBzYW5pdGl6ZU9wdHMpXG59XG5mdW5jdGlvbiBpbnNlcnRUb1RleHRBcmVhQXRDdXJzb3IoZmllbGQsIHZhbHVlKSB7XG4gICAgY29uc3Qgc3RhcnRQb3MgPSBmaWVsZC5zZWxlY3Rpb25TdGFydFxuICAgIGNvbnN0IGVuZFBvcyA9IGZpZWxkLnNlbGVjdGlvbkVuZFxuICAgIGxldCBvbGRWYWx1ZSA9IGZpZWxkLnZhbHVlXG4gICAgZmllbGQudmFsdWUgPSBvbGRWYWx1ZS5zdWJzdHJpbmcoMCwgc3RhcnRQb3MpICsgdmFsdWUgKyBvbGRWYWx1ZS5zdWJzdHJpbmcoZW5kUG9zLCBvbGRWYWx1ZS5sZW5ndGgpXG4gICAgZmllbGQuc2VsZWN0aW9uU3RhcnQgPSBmaWVsZC5zZWxlY3Rpb25FbmQgPSBzdGFydFBvcyArIHZhbHVlLmxlbmd0aFxufVxuXG5mdW5jdGlvbiBkZWNvZGVCYXNlNjRJbWFnZShkYXRhU3RyaW5nKSB7XG4gICAgaWYgKCFkYXRhU3RyaW5nKVxuICAgICAgICByZXR1cm4gbnVsbFxuICAgIGNvbnN0IG1hdGNoZXMgPSBkYXRhU3RyaW5nLm1hdGNoKC9eZGF0YTooW0EtWmEtei0rXFwvXSspO2Jhc2U2NCwoLispJC8pXG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoICE9PSAzKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IG1hdGNoZXNbMV0sXG4gICAgICAgIGRhdGE6IG5ldyBCdWZmZXIobWF0Y2hlc1syXSwgJ2Jhc2U2NCcpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0tleShlLCBrZXkpIHsgcmV0dXJuIHByZXZlbnRJZlRydWUoZSwgIWUuYWx0S2V5ICYmICFlLnNoaWZ0S2V5ICYmICFlLmN0cmxLZXkgICYmIGtleU9yS2V5Q29kZShlLCBrZXkpKX1cblxuZnVuY3Rpb24gaXNDdHJsS2V5KGUsIGtleSkgeyByZXR1cm4gcHJldmVudElmVHJ1ZShlLCAhZS5hbHRLZXkgJiYgIWUuc2hpZnRLZXkgJiYgZS5jdHJsS2V5ICYmIGtleU9yS2V5Q29kZShlLCBrZXkpKX1cblxuZnVuY3Rpb24ga2V5T3JLZXlDb2RlKGUsIHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgPyBlLmtleSA9PT0gdmFsIDogZS5rZXlDb2RlID09PSB2YWwgfVxuZnVuY3Rpb24gcHJldmVudElmVHJ1ZShlLCB2YWwpIHtcbiAgICBpZih2YWwpIGUucHJldmVudERlZmF1bHQoKVxuICAgIHJldHVybiB2YWxcbn1cblxuZnVuY3Rpb24gc2FuaXRpemVDb250ZW50KGFuc3dlckVsZW1lbnQpIHtcbiAgICBjb25zdCAkYW5zd2VyRWxlbWVudCA9ICQoYW5zd2VyRWxlbWVudClcbiAgICBjb25zdCAkbWF0aEVkaXRvciA9ICRhbnN3ZXJFbGVtZW50LmZpbmQoJ1tkYXRhLWpzPVwibWF0aEVkaXRvclwiXScpXG4gICAgJG1hdGhFZGl0b3IuaGlkZSgpXG4gICAgY29uc3QgdGV4dCA9ICRhbnN3ZXJFbGVtZW50LnRleHQoKVxuICAgICRtYXRoRWRpdG9yLnNob3coKVxuXG4gICAgY29uc3QgaHRtbCA9IHNhbml0aXplKCRhbnN3ZXJFbGVtZW50Lmh0bWwoKSlcblxuICAgIHJldHVybiB7IGFuc3dlckhUTUw6IGh0bWwsIGFuc3dlclRleHQ6IHRleHQgfVxufVxuXG5mdW5jdGlvbiBzZXRDdXJzb3JBZnRlcigkaW1nKSB7XG4gICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpXG4gICAgY29uc3QgaW1nID0gJGltZy5nZXQoMClcbiAgICBjb25zdCBuZXh0U2libGluZyA9IGltZy5uZXh0U2libGluZyAmJiBpbWcubmV4dFNpYmxpbmcudGFnTmFtZSA9PT0gJ0JSJyA/IGltZy5uZXh0U2libGluZyA6IGltZ1xuICAgIHJhbmdlLnNldFN0YXJ0KG5leHRTaWJsaW5nLCAwKVxuICAgIHJhbmdlLnNldEVuZChuZXh0U2libGluZywgMClcbiAgICBjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKClcbiAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKClcbiAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpXG59XG5cbmZ1bmN0aW9uIG1hcmtBbmRHZXRJbmxpbmVJbWFnZXMoJGVkaXRvcikge1xuICAgIGNvbnN0IGltYWdlcyA9ICRlZGl0b3IuZmluZCgnaW1nW3NyY149XCJkYXRhXCJdJykudG9BcnJheSgpXG4gICAgICAgIC5tYXAoKGVsLCBpbmRleCkgPT4gT2JqZWN0LmFzc2lnbihkZWNvZGVCYXNlNjRJbWFnZShlbC5nZXRBdHRyaWJ1dGUoJ3NyYycpKSwge1xuICAgICAgICAgICAgJGVsOiAkKGVsKVxuICAgICAgICB9KSlcbiAgICBpbWFnZXMuZmlsdGVyKCh7dHlwZX0pID0+IHR5cGUgIT09ICdpbWFnZS9wbmcnKS5mb3JFYWNoKCh7JGVsfSkgPT4gJGVsLnJlbW92ZSgpKVxuICAgIGNvbnN0IHBuZ0ltYWdlcyA9IGltYWdlcy5maWx0ZXIoKHt0eXBlfSkgPT4gdHlwZSA9PT0gJ2ltYWdlL3BuZycpXG4gICAgcG5nSW1hZ2VzLmZvckVhY2goKHskZWx9KSA9PiAkZWwuYXR0cignc3JjJywgbG9hZGluZ0ltZykpXG4gICAgcmV0dXJuIHBuZ0ltYWdlc1xufVxuXG5mdW5jdGlvbiBleGlzdGluZ1NjcmVlbnNob3RDb3VudCgkZWRpdG9yKSB7XG4gICAgY29uc3QgaW1hZ2VDb3VudCA9ICRlZGl0b3IuZmluZCgnaW1nJykubGVuZ3RoXG4gICAgY29uc3QgZXF1YXRpb25Db3VudCA9ICRlZGl0b3IuZmluZChlcXVhdGlvbkltYWdlU2VsZWN0b3IpLmxlbmd0aFxuICAgIHJldHVybiBpbWFnZUNvdW50IC0gZXF1YXRpb25Db3VudFxufVxuXG5mdW5jdGlvbiBjaGVja0ZvckltYWdlTGltaXQoJGVkaXRvciwgaW1hZ2VEYXRhLCBsaW1pdCkge1xuICAgIHJldHVybiBCYWNvbi5vbmNlKGV4aXN0aW5nU2NyZWVuc2hvdENvdW50KCRlZGl0b3IpID4gbGltaXQgPyBuZXcgQmFjb24uRXJyb3IoKSA6IGltYWdlRGF0YSlcbn1cblxuZnVuY3Rpb24gcGVyc2lzdElubGluZUltYWdlcygkZWRpdG9yLCBzY3JlZW5zaG90U2F2ZXIsIHNjcmVlbnNob3RDb3VudExpbWl0LCBvblZhbHVlQ2hhbmdlZCkge1xuICAgIEJhY29uLmNvbWJpbmVBc0FycmF5KG1hcmtBbmRHZXRJbmxpbmVJbWFnZXMoJGVkaXRvcilcbiAgICAgICAgLm1hcChkYXRhID0+IGNoZWNrRm9ySW1hZ2VMaW1pdCgkZWRpdG9yLCBkYXRhLCBzY3JlZW5zaG90Q291bnRMaW1pdClcbiAgICAgICAgICAgIC5kb0Vycm9yKCgpID0+IG9uVmFsdWVDaGFuZ2VkKG5ldyBCYWNvbi5FcnJvcignU2NyZWVuc2hvdCBsaW1pdCByZWFjaGVkIScpKSlcbiAgICAgICAgICAgIC5mbGF0TWFwTGF0ZXN0KCgpID0+IEJhY29uLmZyb21Qcm9taXNlKHNjcmVlbnNob3RTYXZlcihkYXRhKSkpXG4gICAgICAgICAgICAuZG9BY3Rpb24oc2NyZWVuU2hvdFVybCA9PiBkYXRhLiRlbC5hdHRyKCdzcmMnLCBzY3JlZW5TaG90VXJsKSlcbiAgICAgICAgICAgIC5kb0Vycm9yKCgpID0+IGRhdGEuJGVsLnJlbW92ZSgpKSlcbiAgICApLm9uVmFsdWUoayA9PiAkZWRpdG9yLnRyaWdnZXIoJ2lucHV0JykpXG59XG5cbmZ1bmN0aW9uIHRvdGFsSW1hZ2VDb3VudCgkYW5zd2VyLCBjbGlwYm9hcmREYXRhQXNIdG1sKSB7XG4gICAgcmV0dXJuIGV4aXN0aW5nU2NyZWVuc2hvdENvdW50KCRhbnN3ZXIpICsgZXhpc3RpbmdTY3JlZW5zaG90Q291bnQoJChgPGRpdj4ke2NsaXBib2FyZERhdGFBc0h0bWx9PC9kaXY+YCkpXG59XG4iXX0=
