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

var u = require('./util');

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
        u.setCursorAfter($img);
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
            u.insertToTextAreaAtCursor($latexField.get(0), alternativeSymbol || symbol);
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

var u = require('./util');
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
    }).addClass('rich-text-editor').on('mousedown', u.equationImageSelector, function (e) {
        onRichTextEditorFocus($(e.target).closest('[data-js="answer"]'));
        math.openMathEditor($(e.target));
    }).on('keypress', function (e) {
        if (u.isCtrlKey(e, 'l') || u.isCtrlKey(e, 'i')) math.insertNewEquation();
        if (u.isCtrlKey(e, keyCodes.ENTER) || u.isKey(e, keyCodes.ESC)) math.closeMathEditor(true);
    }).on('focus blur', function (e) {
        if (math.isVisible() && e.type === 'focus') math.closeMathEditor();
        onRichTextEditorFocusChanged(e);
    }).on('keyup input', function (e) {
        if (!pasteInProgress) onValueChanged(u.sanitizeContent(e.currentTarget));
    }).on('paste', function (e) {
        pasteInProgress = true;
        setTimeout(function () {
            return pasteInProgress = false;
        }, 0);

        if (e.target.tagName === 'TEXTAREA') return;
        var clipboardData = e.originalEvent.clipboardData;
        var file = clipboardData.items && clipboardData.items[0].getAsFile();
        if (file) {
            onPasteBlob(e, file, saver, $answer, onValueChanged, limit);
        } else {
            var clipboardDataAsHtml = clipboardData.getData('text/html');
            if (clipboardDataAsHtml) onPasteHtml(e, $answer, clipboardDataAsHtml, limit, saver, onValueChanged);else onLegacyPasteImage(saver, limit, onValueChanged);
        }
    });
    onValueChanged(u.sanitizeContent($answer.get(0)));
    setTimeout(function () {
        return document.execCommand("enableObjectResizing", false, false);
    }, 0);
};

function onPasteBlob(event, file, saver, $answer, onValueChanged, limit) {
    event.preventDefault();
    if (file.type === 'image/png') {
        if (u.existingScreenshotCount($answer) + 1 <= limit) {
            saver({ data: file, type: file.type, id: String(new Date().getTime()) }).then(function (screenshotUrl) {
                var img = '<img src="' + screenshotUrl + '"/>';
                window.document.execCommand('insertHTML', false, img);
            });
        } else {
            onValueChanged(u.SCREENSHOT_LIMIT_ERROR());
        }
    }
}

function onPasteHtml(event, $answer, clipboardDataAsHtml, limit, saver, onValueChanged) {
    event.preventDefault();
    if (u.totalImageCount($answer, clipboardDataAsHtml) <= limit) {
        window.document.execCommand('insertHTML', false, u.sanitize(clipboardDataAsHtml));
        u.persistInlineImages($currentEditor, saver, limit, onValueChanged);
    } else {
        onValueChanged(u.SCREENSHOT_LIMIT_ERROR());
    }
}

function onLegacyPasteImage(saver, limit, onValueChanged) {
    u.persistInlineImages($currentEditor, saver, limit, onValueChanged);
}

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
    allowedSchemes: ['data'],
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

var SCREENSHOT_LIMIT_ERROR = function SCREENSHOT_LIMIT_ERROR() {
    return new Bacon.Error('Screenshot limit reached!');
};
module.exports = {
    isKey: isKey,
    isCtrlKey: isCtrlKey,
    insertToTextAreaAtCursor: insertToTextAreaAtCursor,
    persistInlineImages: persistInlineImages,
    sanitize: sanitize,
    sanitizeContent: sanitizeContent,
    setCursorAfter: setCursorAfter,
    equationImageSelector: equationImageSelector,
    totalImageCount: totalImageCount,
    SCREENSHOT_LIMIT_ERROR: SCREENSHOT_LIMIT_ERROR,
    existingScreenshotCount: existingScreenshotCount
};

function convertLinksToRelative(html) {
    return html.replace(new RegExp(document.location.origin, 'g'), '');
}

function sanitize(html) {
    return sanitizeHtml(convertLinksToRelative(html), sanitizeOpts);
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
    var text = $answerElement.get(0).innerText;
    $mathEditor.show();

    var html = sanitize($answerElement.html());

    return {
        answerHTML: html,
        answerText: text,
        imageCount: existingScreenshotCount($('<div>' + html + '</div>'))
    };
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
    setTimeout(function () {
        return Bacon.combineAsArray(markAndGetInlineImages($editor).map(function (data) {
            return checkForImageLimit($editor, data, screenshotCountLimit).doError(function () {
                return onValueChanged(SCREENSHOT_LIMIT_ERROR());
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
    }, 0);
}

function totalImageCount($answer, clipboardDataAsHtml) {
    return existingScreenshotCount($answer) + existingScreenshotCount($('<div>' + clipboardDataAsHtml + '</div>'));
}

}).call(this,require("buffer").Buffer)

},{"./loadingImg":4,"./sanitizeOpts":7,"buffer":undefined,"sanitize-html":undefined}]},{},[6])(6)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvRkkuanMiLCJhcHAvU1YuanMiLCJhcHAvbGF0ZXhDb21tYW5kcy5qcyIsImFwcC9sb2FkaW5nSW1nLmpzIiwiYXBwL21hdGgtZWRpdG9yLmpzIiwiYXBwL3JpY2gtdGV4dC1lZGl0b3IuanMiLCJhcHAvc2FuaXRpemVPcHRzLmpzIiwiYXBwL3NwZWNpYWxDaGFyYWN0ZXJzLmpzIiwiYXBwL3Rvb2xiYXJzLmpzIiwiYXBwL3V0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLE9BQU8sT0FBUCxHQUFpQjtBQUNiLFlBQVE7QUFDSixvQkFBWSxnQkFEUjtBQUVKLGVBQU8seUNBRkg7QUFHSixraEJBSEk7QUFXSixxREFYSTtBQVlKLDRkQVpJO0FBdUJKLG9CQUFZLFVBdkJSO0FBd0JKLDJCQUFtQixlQXhCZjtBQXlCSix3QkFBZ0IsYUF6Qlo7QUEwQkosZUFBTyxPQTFCSDtBQTJCSixjQUFNLFVBM0JGO0FBNEJKLGlCQUFTLFlBNUJMO0FBNkJKLHNCQUFjLG1CQTdCVjtBQThCSixrQkFBVSxLQTlCTjtBQStCSixtQkFBVyxZQS9CUDtBQWdDSixxQkFBYTtBQWhDVCxLQURLO0FBbUNiLGdCQUFZO0FBQ1Isc0JBQWMsbUJBRE47QUFFUixpQkFBUyxZQUZEO0FBR1Isb0JBQVksZ0JBSEo7QUFJUixlQUFPLFdBSkM7QUFLUixrQkFBVSxHQUxGO0FBTVIsdUJBQWUsc0JBTlA7QUFPUixjQUFNLG9CQVBFO0FBUVIsa0JBQVUsZUFSRjtBQVNSLG1CQUFXO0FBVEg7QUFuQ0MsQ0FBakI7Ozs7O0FDQUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsWUFBUTtBQUNKLG9CQUFZLGlCQURSO0FBRUosZUFBTywwQ0FGSDtBQUdKLDZoQkFISTtBQVFKLHdEQVJJO0FBU0osb1lBVEk7QUFrQkosb0JBQVksYUFsQlI7QUFtQkosMkJBQW1CLGVBbkJmO0FBb0JKLHdCQUFnQixrQkFw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LENBSUE7QUFBQSx1QkFBTSxLQUFLLEdBQUwsQ0FBUyxNQUFULEVBQU47QUFBQSxhQUpBLENBQVI7QUFBQSxTQUQ2QixDQUFyQixFQU1mLE9BTmUsQ0FNUDtBQUFBLG1CQUFLLFFBQVEsT0FBUixDQUFnQixPQUFoQixDQUFMO0FBQUEsU0FOTyxDQUFOO0FBQUEsS0FBWCxFQU0wQyxDQU4xQztBQU9IOztBQUVELFNBQVMsZUFBVCxDQUF5QixPQUF6QixFQUFrQyxtQkFBbEMsRUFBdUQ7QUFDbkQsV0FBTyx3QkFBd0IsT0FBeEIsSUFBbUMsd0JBQXdCLFlBQVUsbUJBQVYsWUFBeEIsQ0FBMUM7QUFDSCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBlZGl0b3I6IHtcbiAgICAgICAgbWF0aEVkaXRvcjogJ01hdGlra2FlZGl0b3JpJyxcbiAgICAgICAgdGl0bGU6ICdLYWF2YWVkaXRvcmluIGVuc2ltbcOkaW5lbiBrZWhpdHlzdmVyc2lvJyxcbiAgICAgICAgZGVzY3JpcHRpb246IGA8dWw+XG48bGk+RWRpdG9yaSB0b2ltaWkgcGFyaGFpdGVuIEZpcmVmb3gtc2VsYWltZWxsYS48L2xpPlxuPGxpPuKAnExpc8Okw6Qga2FhdmHigJ0gLW5hcGluIGFsdGEgbMO2eWTDpHQgeWxlaXNpbXBpw6QgbWF0ZW1hdGlpa2Fzc2EsIGZ5c2lpa2Fzc2EgamFcbmtlbWlhc3NhIGvDpHl0ZXR0w6R2acOkIG1lcmtpbnTDtmrDpC4gTGlzw6Rrc2kgZXJpa29pc21lcmtrZWrDpCB2b2kga8OkeXR0w6TDpCBrYWF2YW4ga2lyam9pdHRhbWlzZWVuLjwvbGk+XG4gPGxpPkthYXZvamEgdm9pIHJha2VudGFhXG5rbGlra2FhbWFsbGEgdmFsaWtvbiBtZXJraW50w7Zqw6QgamEvdGFpIGtpcmpvaXR0YW1hbGxhIExhVGVYaWEuPC9saT5cbiA8bGk+RWRpdG9yaW4gdmFzdGF1c2tlbnR0w6TDpG4gdm9pIGtpcmpvaXR0YWEgdGVrc3Rpw6QgamEga2Fhdm9qYSBzZWvDpFxubGlzw6R0w6Qga3V2aWEuPC9saT48L3VsPmAsXG4gICAgICAgIHNob3J0Y3V0VGl0bGU6IGBQaWthbsOkcHDDpGludmlua2tlasOkYCxcbiAgICAgICAgc2hvcnRjdXRzOiBgPHRhYmxlPjx0Ym9keT5cbjx0cj48dGg+TGlpdMOkIGt1dmEgbGVpa2Vww7Z5ZMOkbHTDpDwvdGg+PHRkPkN0cmwtVjwvdGQ+PC90cj5cbjx0cj48dGg+S2lyam9pdGEga2FhdmE8L3RoPjx0ZD5DdHJsLUwgdGFpIEN0cmwtSTwvdGQ+PC90cj5cbjx0cj48dGggY29sc3Bhbj1cIjJcIj5LYWF2YXNzYTwvdGg+PC90cj5cbjx0cj48dGg+SmFrb3ZpaXZhPC90aD48dGQ+LzwvdGQ+PC90cj5cbjx0cj48dGg+S2VydG9tZXJra2k8L3RoPjx0ZD4qPC90ZD48L3RyPlxuPHRyPjx0aD5Fa3Nwb25lbnR0aTwvdGg+PHRkPl48L3RkPjwvdHI+XG48dHI+PHRoPlN1bGplIGthYXZhPC90aD48dGQ+Q3RybC1FbnRlciB0YWkgRXNjPC90ZD48L3RyPlxuPHRyPjx0aD5MaXPDpMOkIGthYXZhIHNldXJhYXZhbGxlIHJpdmlsbGU8L3RoPjx0ZD5FbnRlcjwvdGQ+PC90cj5cbjwvdGJvZHk+XG48L3RhYmxlPmAsXG4gICAgICAgIGZvcm1hdHRpbmc6ICdNdW90b2lsdScsXG4gICAgICAgIHNwZWNpYWxDaGFyYWN0ZXJzOiAnRXJpa29pc21lcmtpdCcsXG4gICAgICAgIGluc2VydEVxdWF0aW9uOiAnTGlzw6TDpCBrYWF2YScsXG4gICAgICAgIGNsb3NlOiAnc3VsamUnLFxuICAgICAgICBzYXZlOiAnVGFsbGVubmEnLFxuICAgICAgICB1cGRhdGVkOiAnUMOkaXZpdGV0dHknLFxuICAgICAgICBzZW5kRmVlZGJhY2s6ICdMw6RoZXTDpCBwYWxhdXRldHRhJyxcbiAgICAgICAgbGFuZ0xpbms6ICcvc3YnLFxuICAgICAgICBsYW5nTGFiZWw6ICdQw6Ugc3ZlbnNrYScsXG4gICAgICAgIGFuc3dlclRpdGxlOiAnVmFzdGF1cydcbiAgICB9LFxuICAgIGFubm90YXRpbmc6IHtcbiAgICAgICAgc2VuZEZlZWRiYWNrOiAnTMOkaGV0w6QgcGFsYXV0ZXR0YScsXG4gICAgICAgIHVwZGF0ZWQ6ICdQw6Rpdml0ZXR0eScsXG4gICAgICAgIG1hdGhFZGl0b3I6ICdNYXRpa2thZWRpdG9yaScsXG4gICAgICAgIHRpdGxlOiAnQXJ2b3N0ZWx1JyxcbiAgICAgICAgYmFja0xpbms6ICcvJyxcbiAgICAgICAgYmFja0xpbmtMYWJlbDogJ1BhbGFhIGthYXZhZWRpdG9yaWluJyxcbiAgICAgICAgc2F2ZTogJ1RhbGxlbm5hIG1lcmtpbm7DpHQnLFxuICAgICAgICBsYW5nTGluazogJy9zdi9iZWRvbW5pbmcnLFxuICAgICAgICBsYW5nTGFiZWw6ICdQw6Ugc3ZlbnNrYSdcbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBlZGl0b3I6IHtcbiAgICAgICAgbWF0aEVkaXRvcjogJ01hdGVtYXRpa2VkaXRvcicsXG4gICAgICAgIHRpdGxlOiAnRm9ybWVsZWRpdG9ybnMgZsO2cnN0YSB1dHZlY2tsaW5nc3ZlcnNpb24nLFxuICAgICAgICBkZXNjcmlwdGlvbjogYDx1bD5cbjxsaT5FZGl0b3JuIGZ1bmdlcmFyIGLDpHN0IG1lZCBicm93c2VybiBGaXJlZm94LjwvbGk+XG4gPGxpPlVuZGVyIGtuYXBwZW4g4oCcTMOkZ2cgdGlsbCBmb3JtZWzigJ0gaGl0dGFyIGR1IGRlIHZhbmxpZ2FzdGUgYmV0ZWNrbmluZ2FybmEgc29tIGFudsOkbmRzIGkgbWF0ZW1hdGlrLCBmeXNpayBvY2gga2VtaS4gRGVzc3V0b20ga2FuIGR1IGFudsOkbmRhIHNwZWNpYWx0ZWNrZW4gZsO2ciBhdHQgc2tyaXZhIGZvcm1sZXIuPC9saT5cbjxsaT5EZXQgZ8OlciBhdHQga29uc3RydWVyYSBmb3JtbGVyIGdlbm9tIGF0dCBrbGlja2EgcMOlIGJldGVja25pbmdhcm5hIGkgbWVueWVybmEgb2NoL2VsbGVyIGdlbm9tIGF0dCBza3JpdmEgTGFUZVguPC9saT5cbjxsaT5EZXQgZ8OlciBmw7ZydXRvbSBhdHQgc2tyaXZhIHRleHQgb2NoIGZvcm1sZXIsIGF0dCBvY2tzw6UgYXR0IGzDpGdnYSB0aWxsIGJpbGRlciBpIHN2YXJzZsOkbHRldC48L2xpPjwvdWw+YCxcbiAgICAgICAgc2hvcnRjdXRUaXRsZTogYFRpcHMgcMOlIHRhbmdlbnRrb21iaW5hdGlvbmVyYCxcbiAgICAgICAgc2hvcnRjdXRzOiBgPHRhYmxlPjx0Ym9keT5cbjx0cj48dGg+TMOkZ2cgdGlsbCBlbiBiaWxkIGZyw6VuIHVya2xpcHBldDwvdGg+PHRkPkN0cmwtVjwvdGQ+PC90cj5cbjx0cj48dGg+U2tyaXYgZW4gZm9ybWVsPC90aD48dGQ+Q3RybC1MIC8gQ3RybC1JPC90ZD48L3RyPlxuPHRyPjx0aCBjb2xzcGFuPVwiMlwiPkkgZm9ybWVsbiA8L3RoPjwvdHI+XG48dHI+PHRoPkJyw6Vrc3RyZWNrPC90aD48dGQ+LzwvdGQ+PC90cj5cbjx0cj48dGg+TXVsdGlwbGlrYXRpb25zdGVja2VuPC90aD48dGQ+KjwvdGQ+PC90cj5cbjx0cj48dGg+U3TDpG5nIGZvcm1lbG48L3RoPjx0ZD5DdHJsLUVudGVyIGVsbGVyIEVzYzwvdGQ+PC90cj5cbjwvdGJvZHk+XG48L3RhYmxlPmAsXG4gICAgICAgIGZvcm1hdHRpbmc6ICdGb3JtYXRlcmluZycsXG4gICAgICAgIHNwZWNpYWxDaGFyYWN0ZXJzOiAnU3BlY2lhbHRlY2tlbicsXG4gICAgICAgIGluc2VydEVxdWF0aW9uOiAnTMOkZ2cgdGlsbCBmb3JtZWwnLFxuICAgICAgICBjbG9zZTogJ3N0w6RuZycsXG4gICAgICAgIHNhdmU6ICdTcGFyYScsXG4gICAgICAgIHVwZGF0ZWQ6ICdVcHBkYXRlcmFkJyxcbiAgICAgICAgc2VuZEZlZWRiYWNrOiAnU2tpY2thIGZlZWRiYWNrJyxcbiAgICAgICAgbGFuZ0xpbms6ICcvJyxcbiAgICAgICAgbGFuZ0xhYmVsOiAnU3VvbWVrc2knLFxuICAgICAgICBhbnN3ZXJUaXRsZTogJ1N2YXInXG4gICAgfSxcbiAgICBhbm5vdGF0aW5nOiB7XG4gICAgICAgIHNlbmRGZWVkYmFjazogJ1NraWNrYSByZXNwb25zJyxcbiAgICAgICAgdXBkYXRlZDogJ1VwcGRhdGVyYWQnLFxuICAgICAgICBtYXRoRWRpdG9yOiAnTWF0ZW1hdGlrZWRpdG9yJyxcbiAgICAgICAgdGl0bGU6ICdCZWTDtm1uaW5nJyxcbiAgICAgICAgYmFja0xpbms6ICcvc3YnLFxuICAgICAgICBiYWNrTGlua0xhYmVsOiAnTWF0ZW1hdGlrZWRpdG9yJyxcbiAgICAgICAgc2F2ZTogJ1NwYXJhIGFudGVja25pbmdhcicsXG4gICAgICAgIGxhbmdMaW5rOiAnL3Rhcmtpc3R1cycsXG4gICAgICAgIGxhbmdMYWJlbDogJ1N1b21la3NpJ1xuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuICAgIHthY3Rpb246ICdcXFxcc3FydCcsIGxhYmVsOiAnXFxcXHNxcnR7WH0nfSxcbiAgICB7YWN0aW9uOiAnXicsIGxhYmVsOiAneF57WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGZyYWMnLCBsYWJlbDogJ1xcXFxmcmFje1h9e1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxpbnQnLCBsYWJlbDogJ1xcXFxpbnRfe1h9XntYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcbGltXycsIGxhYmVsOiAnXFxcXGxpbV97WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGxpbV97eFxcXFxyaWdodGFycm93XFxcXGluZnR5fScsIGxhYmVsOiAnXFxcXGxpbV97eFxcXFxyaWdodGFycm93XFxcXGluZnR5fScsIHVzZVdyaXRlOnRydWV9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcnJpZ2h0YXJyb3cnLCBsYWJlbDogJ1xcXFxvdmVycmlnaHRhcnJvd3tYfSd9LFxuICAgIHthY3Rpb246ICdfJywgbGFiZWw6ICd4X1gnfSxcbiAgICB7YWN0aW9uOiAnXFxcXG50aHJvb3QnLCBsYWJlbDogJ1xcXFxzcXJ0W1hde1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxzdW0nLCBsYWJlbDogJ1xcXFxzdW1fe1h9XntYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcYmlub20nLCBsYWJlbDogJ1xcXFxiaW5vbXtYfXtYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcc2luJ30sXG4gICAge2FjdGlvbjogJ1xcXFxjb3MnfSxcbiAgICB7YWN0aW9uOiAnXFxcXHRhbid9LFxuICAgIHthY3Rpb246ICdcXFxcdmVjJywgbGFiZWw6ICdcXFxcdmVje1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxiYXInLCBsYWJlbDogJ1xcXFxiYXJ7WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXG92ZXJsaW5le1xcXFx0ZXh0e2l9fScsIHVzZVdyaXRlOiB0cnVlfSxcbiAgICB7YWN0aW9uOiAnXFxcXG92ZXJsaW5le1xcXFx0ZXh0e2p9fScsIHVzZVdyaXRlOiB0cnVlfSxcbiAgICB7YWN0aW9uOiAnXFxcXG92ZXJsaW5le1xcXFx0ZXh0e2t9fScsIHVzZVdyaXRlOiB0cnVlfSxcbiAgICB7YWN0aW9uOiAnXFxcXG92ZXJsZWZ0YXJyb3cnLCBsYWJlbDogJ1xcXFxvdmVybGVmdGFycm93e1h9J30sXG4gICAge2FjdGlvbjogJ3wnLCBsYWJlbDogJ3xYfCd9LFxuICAgIHthY3Rpb246ICcoJywgbGFiZWw6ICcoWCknfSxcbiAgICB7YWN0aW9uOiAnX3sgfV57IH0gJywgbGFiZWw6ICdfe1h9XntYfVgnLCB1c2VXcml0ZTogdHJ1ZX0sXG4gICAge2FjdGlvbjogJ1xcXFx0ZXh0JywgbGFiZWw6ICdcXFxcdGV4dHtUfSd9LFxuXVxuIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEVBQVFBUFFBQVAvLy93QUFBUER3OElxS2l1RGc0RVpHUm5wNmVnQUFBRmhZV0NRa0pLeXNyTDYrdmhRVUZKeWNuQVFFQkRZMk5taG9hQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQ0grR2tOeVpXRjBaV1FnZDJsMGFDQmhhbUY0Ykc5aFpDNXBibVp2QUNINUJBQUtBQUFBSWY4TFRrVlVVME5CVUVVeUxqQURBUUFBQUN3QUFBQUFFQUFRQUFBRmR5QWdBZ0lKSWVXb0FrUkNDTWRCa0t0SUhJbmd5TUtzRXJQQlliQURwa1NDd2hEbVFDQmV0aFJCNlZqNGtGQ2tRUEc0SWxXRGdyTlJJd25PNFVLQlhEdWZ6UXZETWFvU0RCZ0ZiODg2TWlRYWRnTkFCQW9rZkN3ekJBOExDZzBFZ2w4akFnZ0dBQTFrQklBMUJBWXpseUlMY3pVTEMyVWhBQ0g1QkFBS0FBRUFMQUFBQUFBUUFCQUFBQVYySUNBQ0FtbEFaVG1PUkVFSXlVRVFqTEtLeFBIQURoRXZxeGxnY0dna0dJMURZU1ZBSUFXTXgrbHdTS2tJQ0owUXNIaTlSZ0tCd25WVGlSUVFnd0Y0STRVRkRRUUV3aTYvM1lTR1dSUm1qaEVFVEFKZklnTUZDbkFLTTBLRFY0RUVFQVFMaUYxOFRBWU5YRGFTZTN4Nm1qaWROMXMzSVFBaCtRUUFDZ0FDQUN3QUFBQUFFQUFRQUFBRmVDQWdBZ0xaREdVNWpnUkVDRVVpQ0kreWlvU0R3REp5TEtzWG9IRlF4QlNIQW9BQUZCaHF0TUpnOERnUUJnZnJFc0pBRUFnNFloWklFaXdnS3RIaU1CZ3RwZzN3YlVaWEdPN2tPYjFNVUtSRk15c0NDaEFvZ2dKQ0lnMEdDMmFOZTRncVFsZGZMNGwvQWcxQVh5U0pnbjVMY29FM1FYSTNJUUFoK1FRQUNnQURBQ3dBQUFBQUVBQVFBQUFGZGlBZ0FnTFpOR1U1am9RaENFanhJc3NxRW84YkM5QlJqeTlBZzdHSUxRNFFFb0UwZ0JBRUJjT3BjQkEwRG94U0svZThMUklIbitpMWNLMEl5S2RnMFZBb2xqWUlnK0dnblJyd1ZTLzhJQWtJQ3lvc0JJUXBCQU1vS3k5ZElteFBoUytHS2tGcmtYK1RpZ3RMbEl5S1hVRitOamFnTmlFQUlma0VBQW9BQkFBc0FBQUFBQkFBRUFBQUJXd2dJQUlDYVJobE9ZNEVJZ2pIOFI3TEtoS0hHd3NNdmI0QUF5M1dPREJJQkJLQ3NZQTlUanVoRE5ES0VWU0VSZXpRRUwwV3JoWHVjUlVRR3VpazdiRmxuZ3pxVlc5TE1sOVhXdkxkakZhSnRERnFaMWNFWlVCMGRVZ3ZMM2RnUDRXSlpuNGprb21XTnBTVEl5RUFJZmtFQUFvQUJRQXNBQUFBQUJBQUVBQUFCWDRnSUFJQ3VTeGxPWTZDSWdpRDhSckVLZ3FHT3d4d1VyTWxBb1N3SXpBR3BKcGdvU0RBR2lmRFk1a29wQllEbEVwQVFCd2V2eGZCdFJJVUdpOHh3V2tETkJDSXdtQzlWcTBhaVFRRFF1SytWZ1FQRFhWOWhDSmpCd2NGWVU1cEx3d0hYUWNNS1NtTkxRY0lBRXhsYkg4SkJ3dHRhWDBBQkFjTmJXVmJLeUVBSWZrRUFBb0FCZ0FzQUFBQUFCQUFFQUFBQlhrZ0lBSUNTUkJsT1k3Q0lnaE44emJFS3NLb0lqZEZ6WmFFZ1VCSEtDaE1KdFJ3Y1dwQVdvV25pZm02RVNBTWhPOGxRSzBFRUFWM3JGb3BJQkNFY0d3REtBcVBoNEhVclk0SUNISDFkU29URmdjSFVpWmpCaEFKQjJBSER5a3BLQXdIQXdkemYxOUtrQVNJUGw5Y0RnY25Ea2R0TndpTUpDc2hBQ0g1QkFBS0FBY0FMQUFBQUFBUUFCQUFBQVYzSUNBQ0Fra1FaVG1PQWlvc2l5QW94Q3ErS1B4Q05Wc1NNUmdCc2lDbFdyTFRTV0ZvSVFaSGw2cGxlQmg2c3V4S01JaGx2emJBd2tCV2ZGV3JCUVR4TkxxMlJHMnloU1VrRHMyYjYzQVlEQW9KWEFjRlJ3QURlQWtKRFgwQVFDc0VmQVFNREFJUEJ6MHJDZ2N4a3kwSlJXRTFBbXdwS3lFQUlma0VBQW9BQ0FBc0FBQUFBQkFBRUFBQUJYa2dJQUlDS1p6a3FKNG5RWnhMcVpLdjROcU5MS0syL1E0RWs0bEZYQ2hzZzV5cEpqczFJSTNnRURVU1JJbkVHWUF3NkI2ek00SmhyREF0RW9zVmtMVXRIQTdSSGFIQUdKUUVqc09EY0VnMEZCQUZWZ2tRSlExcEF3Y0REdzhLY0Z0U0lud0pBb3dDQ0E2Ukl3cVpBZ2tQTmdWcFduZGpkeW9oQUNINUJBQUtBQWtBTEFBQUFBQVFBQkFBQUFWNUlDQUNBaW1jNUtpZUxFdVVLdm0yeEFLTHFEQ2ZDMkdhTzllTDBMQUJXVGlCWW1BMDZXNmtIZ3ZDcUVKaUFJSml1M2djdmdVc3NjSFVFUm0ra2FDeHl4YSt6UlBrMFNnSkVnZkl2YkFkSUFRTENBWWxDajREQncwSUJRc01DaklxQkFjUEFvb0NCZzlwS2dzSkx3VUZPaENaS3lRREEzWXFJUUFoK1FRQUNnQUtBQ3dBQUFBQUVBQVFBQUFGZFNBZ0FnSXBuT1Nvbm14YnFpVGhDckpLRUhGYm84SnhERE9aWUZGYitBNDFFNEg0T2hrT2lwWHdCRWxZSVREQWNrRkVPQmdNUTNhcmtNa1VCZHhJVUdacEViN2thUUJSbEFTUGcwRlFRSEFiRUVNR0RTVkVBQTFRQmhBRUQxRTBOZ3dGQW9vQ0RXbGphUUlRQ0U1cU1IY05oQ2tqSVFBaCtRUUFDZ0FMQUN3QUFBQUFFQUFRQUFBRmVTQWdBZ0lwbk9Tb0xneHh2cWdLTEVjQ0M2NUtFQUJ5S0s4Y1NwQTREQWlIUS9Ea0toR0toNFpDdEN5WkdvNkY2aVlZUEFxRmdZeTAyeGtTYUxFTVYzNHRFTHlSWU5Fc0NReUhsdldrR0N6c1BnTUNFQVk3Q2cwNFVrNDhMQXNEaFJBOE1WUVBFRjBHQWdxWVl3U1JseWNOY1dza0NrQXBJeUVBT3dBQUFBQUFBQUFBQUR4aWNpQXZQZ284WWo1WFlYSnVhVzVuUEM5aVBqb2dJRzE1YzNGc1gzRjFaWEo1S0NrZ1d6eGhJR2h5WldZOUoyWjFibU4wYVc5dUxtMTVjM0ZzTFhGMVpYSjVKejVtZFc1amRHbHZiaTV0ZVhOeGJDMXhkV1Z5ZVR3dllUNWRPaUJEWVc0bmRDQmpiMjV1WldOMElIUnZJR3h2WTJGc0lFMTVVMUZNSUhObGNuWmxjaUIwYUhKdmRXZG9JSE52WTJ0bGRDQW5MM1poY2k5eWRXNHZiWGx6Y1d4a0wyMTVjM0ZzWkM1emIyTnJKeUFvTWlrZ2FXNGdQR0krTDJodmJXVXZZV3BoZUd4dllXUXZkM2QzTDJ4cFluSmhhWEpwWlhNdlkyeGhjM011YlhsemNXd3VjR2h3UEM5aVBpQnZiaUJzYVc1bElEeGlQalk0UEM5aVBqeGljaUF2UGdvOFluSWdMejRLUEdJK1YyRnlibWx1Wnp3dllqNDZJQ0J0ZVhOeGJGOXhkV1Z5ZVNncElGczhZU0JvY21WbVBTZG1kVzVqZEdsdmJpNXRlWE54YkMxeGRXVnllU2MrWm5WdVkzUnBiMjR1YlhsemNXd3RjWFZsY25rOEwyRStYVG9nUVNCc2FXNXJJSFJ2SUhSb1pTQnpaWEoyWlhJZ1kyOTFiR1FnYm05MElHSmxJR1Z6ZEdGaWJHbHphR1ZrSUdsdUlEeGlQaTlvYjIxbEwyRnFZWGhzYjJGa0wzZDNkeTlzYVdKeVlXbHlhV1Z6TDJOc1lYTnpMbTE1YzNGc0xuQm9jRHd2WWo0Z2IyNGdiR2x1WlNBOFlqNDJPRHd2WWo0OFluSWdMejRLUEdKeUlDOCtDanhpUGxkaGNtNXBibWM4TDJJK09pQWdiWGx6Y1d4ZmNYVmxjbmtvS1NCYlBHRWdhSEpsWmowblpuVnVZM1JwYjI0dWJYbHpjV3d0Y1hWbGNua25QbVoxYm1OMGFXOXVMbTE1YzNGc0xYRjFaWEo1UEM5aFBsMDZJRU5oYmlkMElHTnZibTVsWTNRZ2RHOGdiRzlqWVd3Z1RYbFRVVXdnYzJWeWRtVnlJSFJvY205MVoyZ2djMjlqYTJWMElDY3ZkbUZ5TDNKMWJpOXRlWE54YkdRdmJYbHpjV3hrTG5Odlkyc25JQ2d5S1NCcGJpQThZajR2YUc5dFpTOWhhbUY0Ykc5aFpDOTNkM2N2YkdsaWNtRnBjbWxsY3k5amJHRnpjeTV0ZVhOeGJDNXdhSEE4TDJJK0lHOXVJR3hwYm1VZ1BHSStOamc4TDJJK1BHSnlJQzgrQ2p4aWNpQXZQZ284WWo1WFlYSnVhVzVuUEM5aVBqb2dJRzE1YzNGc1gzRjFaWEo1S0NrZ1d6eGhJR2h5WldZOUoyWjFibU4wYVc5dUxtMTVjM0ZzTFhGMVpYSjVKejVtZFc1amRHbHZiaTV0ZVhOeGJDMXhkV1Z5ZVR3dllUNWRPaUJCSUd4cGJtc2dkRzhnZEdobElITmxjblpsY2lCamIzVnNaQ0J1YjNRZ1ltVWdaWE4wWVdKc2FYTm9aV1FnYVc0Z1BHSStMMmh2YldVdllXcGhlR3h2WVdRdmQzZDNMMnhwWW5KaGFYSnBaWE12WTJ4aGMzTXViWGx6Y1d3dWNHaHdQQzlpUGlCdmJpQnNhVzVsSUR4aVBqWTRQQzlpUGp4aWNpQXZQZ284WW5JZ0x6NEtQR0krVjJGeWJtbHVaend2WWo0NklDQnRlWE54YkY5eGRXVnllU2dwSUZzOFlTQm9jbVZtUFNkbWRXNWpkR2x2Ymk1dGVYTnhiQzF4ZFdWeWVTYytablZ1WTNScGIyNHViWGx6Y1d3dGNYVmxjbms4TDJFK1hUb2dRMkZ1SjNRZ1kyOXVibVZqZENCMGJ5QnNiMk5oYkNCTmVWTlJUQ0J6WlhKMlpYSWdkR2h5YjNWbmFDQnpiMk5yWlhRZ0p5OTJZWEl2Y25WdUwyMTVjM0ZzWkM5dGVYTnhiR1F1YzI5amF5Y2dLRElwSUdsdUlEeGlQaTlvYjIxbEwyRnFZWGhzYjJGa0wzZDNkeTlzYVdKeVlXbHlhV1Z6TDJOc1lYTnpMbTE1YzNGc0xuQm9jRHd2WWo0Z2IyNGdiR2x1WlNBOFlqNDJPRHd2WWo0OFluSWdMejRLUEdKeUlDOCtDanhpUGxkaGNtNXBibWM4TDJJK09pQWdiWGx6Y1d4ZmNYVmxjbmtvS1NCYlBHRWdhSEpsWmowblpuVnVZM1JwYjI0dWJYbHpjV3d0Y1hWbGNua25QbVoxYm1OMGFXOXVMbTE1YzNGc0xYRjFaWEo1UEM5aFBsMDZJRUVnYkdsdWF5QjBieUIwYUdVZ2MyVnlkbVZ5SUdOdmRXeGtJRzV2ZENCaVpTQmxjM1JoWW14cGMyaGxaQ0JwYmlBOFlqNHZhRzl0WlM5aGFtRjRiRzloWkM5M2QzY3ZiR2xpY21GcGNtbGxjeTlqYkdGemN5NXRlWE54YkM1d2FIQThMMkkrSUc5dUlHeHBibVVnUEdJK05qZzhMMkkrUEdKeUlDOCtDZz09XCJcbiIsImNvbnN0IHUgPSByZXF1aXJlKCcuL3V0aWwnKVxuXG5jb25zdCBNUSA9IE1hdGhRdWlsbC5nZXRJbnRlcmZhY2UoMilcbm1vZHVsZS5leHBvcnRzID0ge2luaXR9XG5cbmZ1bmN0aW9uIGluaXQoJG91dGVyUGxhY2Vob2xkZXIsIGZvY3VzLCBvbk1hdGhGb2N1c0NoYW5nZWQpIHtcbiAgICBjb25zdCAkbWF0aEVkaXRvckNvbnRhaW5lciA9ICQoYFxuICAgICAgICA8ZGl2IGNsYXNzPVwibWF0aC1lZGl0b3JcIiBkYXRhLWpzPVwibWF0aEVkaXRvclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1hdGgtZWRpdG9yLWVxdWF0aW9uLWZpZWxkXCIgZGF0YS1qcz1cImVxdWF0aW9uRmllbGRcIj48L2Rpdj5cbiAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cIm1hdGgtZWRpdG9yLWxhdGV4LWZpZWxkXCIgZGF0YS1qcz1cImxhdGV4RmllbGRcIiBwbGFjZWhvbGRlcj1cIkxhVGV4XCI+PC90ZXh0YXJlYT5cbiAgICAgICAgPC9kaXY+YClcblxuICAgICRvdXRlclBsYWNlaG9sZGVyLmFwcGVuZCgkbWF0aEVkaXRvckNvbnRhaW5lcilcbiAgICBjb25zdCAkbGF0ZXhGaWVsZCA9ICRtYXRoRWRpdG9yQ29udGFpbmVyLmZpbmQoJ1tkYXRhLWpzPVwibGF0ZXhGaWVsZFwiXScpXG4gICAgY29uc3QgJGVxdWF0aW9uRmllbGQgPSAkbWF0aEVkaXRvckNvbnRhaW5lci5maW5kKCdbZGF0YS1qcz1cImVxdWF0aW9uRmllbGRcIl0nKVxuICAgIGxldCBtcUVkaXRUaW1lb3V0XG4gICAgbGV0IHZpc2libGUgPSBmYWxzZVxuICAgIGxldCBmb2N1c0NoYW5nZWQgPSBudWxsXG4gICAgLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzLEpTVW51c2VkTG9jYWxTeW1ib2xzXG4gICAgY29uc3QgbXFJbnN0YW5jZSA9IE1RLk1hdGhGaWVsZCgkZXF1YXRpb25GaWVsZC5nZXQoMCksIHtcbiAgICAgICAgaGFuZGxlcnM6IHtcbiAgICAgICAgICAgIGVkaXQ6IG9uTXFFZGl0LFxuICAgICAgICAgICAgZW50ZXI6IGZpZWxkID0+IHtcbiAgICAgICAgICAgICAgICBjbG9zZU1hdGhFZGl0b3IodHJ1ZSlcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGluc2VydE5ld0VxdWF0aW9uKCc8YnI+JyksIDIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxuICAgICRlcXVhdGlvbkZpZWxkXG4gICAgICAgIC5vbigna2V5ZG93bicsICcubXEtdGV4dGFyZWEgdGV4dGFyZWEnLCBvbk1xRWRpdClcbiAgICAgICAgLm9uKCdmb2N1cyBibHVyJywgJy5tcS10ZXh0YXJlYSB0ZXh0YXJlYScsIGUgPT4ge1xuICAgICAgICAgICAgZm9jdXMuZXF1YXRpb25GaWVsZCA9IGUudHlwZSAhPT0gJ2JsdXInICYmIGUudHlwZSAhPT0gJ2ZvY3Vzb3V0J1xuICAgICAgICAgICAgb25Gb2N1c0NoYW5nZWQoKVxuICAgICAgICB9KVxuXG4gICAgJGxhdGV4RmllbGRcbiAgICAgICAgLmtleXVwKG9uTGF0ZXhVcGRhdGUpXG4gICAgICAgIC5vbignZm9jdXMgYmx1cicsIGUgPT4ge1xuICAgICAgICAgICAgZm9jdXMubGF0ZXhGaWVsZCA9IGUudHlwZSAhPT0gJ2JsdXInXG4gICAgICAgICAgICBvbkZvY3VzQ2hhbmdlZCgpXG4gICAgICAgIH0pXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpbnNlcnROZXdFcXVhdGlvbixcbiAgICAgICAgaW5zZXJ0TWF0aCxcbiAgICAgICAgY2xvc2VNYXRoRWRpdG9yLFxuICAgICAgICBvcGVuTWF0aEVkaXRvcixcbiAgICAgICAgb25Gb2N1c0NoYW5nZWQsXG4gICAgICAgIGlzVmlzaWJsZVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzVmlzaWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIHZpc2libGVcbiAgICB9XG4gICAgZnVuY3Rpb24gb25NcUVkaXQoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChtcUVkaXRUaW1lb3V0KVxuICAgICAgICBtcUVkaXRUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZm9jdXMubGF0ZXhGaWVsZClcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIGNvbnN0IGxhdGV4ID0gbXFJbnN0YW5jZS5sYXRleCgpXG4gICAgICAgICAgICAkbGF0ZXhGaWVsZC52YWwobGF0ZXgpXG4gICAgICAgICAgICB1cGRhdGVNYXRoSW1nKCRtYXRoRWRpdG9yQ29udGFpbmVyLnByZXYoKSwgbGF0ZXgpXG4gICAgICAgIH0sIDEwMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkxhdGV4VXBkYXRlKCkge1xuICAgICAgICB1cGRhdGVNYXRoSW1nKCRtYXRoRWRpdG9yQ29udGFpbmVyLnByZXYoKSwgJGxhdGV4RmllbGQudmFsKCkpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gbXFJbnN0YW5jZS5sYXRleCgkbGF0ZXhGaWVsZC52YWwoKSksIDEpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Gb2N1c0NoYW5nZWQoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChmb2N1c0NoYW5nZWQpXG4gICAgICAgIGZvY3VzQ2hhbmdlZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFmb2N1cy5sYXRleEZpZWxkICYmICFmb2N1cy5lcXVhdGlvbkZpZWxkKSBjbG9zZU1hdGhFZGl0b3IoKVxuICAgICAgICAgICAgb25NYXRoRm9jdXNDaGFuZ2VkKClcbiAgICAgICAgfSwgMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnNlcnROZXdFcXVhdGlvbihvcHRpb25hbE1hcmt1cCA9ICcnKSB7XG4gICAgICAgIHdpbmRvdy5kb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0SFRNTCcsIGZhbHNlLCBvcHRpb25hbE1hcmt1cCArICc8aW1nIGRhdGEtanM9XCJuZXdcIiBhbHQ9XCJcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIi8+JylcbiAgICAgICAgc2hvd01hdGhFZGl0b3IoJCgnW2RhdGEtanM9XCJuZXdcIl0nKS5yZW1vdmVBdHRyKCdkYXRhLWpzJykpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb3Blbk1hdGhFZGl0b3IoJGltZykge1xuICAgICAgICBpZiAodmlzaWJsZSkgY2xvc2VNYXRoRWRpdG9yKClcbiAgICAgICAgdS5zZXRDdXJzb3JBZnRlcigkaW1nKVxuICAgICAgICBzaG93TWF0aEVkaXRvcigkaW1nKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNob3dNYXRoRWRpdG9yKCRpbWcpIHtcbiAgICAgICAgJGltZy5oaWRlKClcbiAgICAgICAgJGltZy5hZnRlcigkbWF0aEVkaXRvckNvbnRhaW5lcilcbiAgICAgICAgdmlzaWJsZSA9IHRydWVcbiAgICAgICAgdG9nZ2xlTWF0aFRvb2xiYXIodHJ1ZSlcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBtcUluc3RhbmNlLmZvY3VzKCksIDApXG4gICAgICAgICRsYXRleEZpZWxkLnZhbCgkaW1nLnByb3AoJ2FsdCcpKVxuICAgICAgICBvbkxhdGV4VXBkYXRlKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnNlcnRNYXRoKHN5bWJvbCwgYWx0ZXJuYXRpdmVTeW1ib2wsIHVzZVdyaXRlKSB7XG4gICAgICAgIGlmIChmb2N1cy5sYXRleEZpZWxkKSB7XG4gICAgICAgICAgICB1Lmluc2VydFRvVGV4dEFyZWFBdEN1cnNvcigkbGF0ZXhGaWVsZC5nZXQoMCksIGFsdGVybmF0aXZlU3ltYm9sIHx8IHN5bWJvbClcbiAgICAgICAgICAgIG9uTGF0ZXhVcGRhdGUoKVxuICAgICAgICB9IGVsc2UgaWYgKGZvY3VzLmVxdWF0aW9uRmllbGQpIHtcbiAgICAgICAgICAgIGlmICh1c2VXcml0ZSkge1xuICAgICAgICAgICAgICAgIG1xSW5zdGFuY2Uud3JpdGUoc3ltYm9sKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtcUluc3RhbmNlLnR5cGVkVGV4dChzeW1ib2wpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3ltYm9sLnN0YXJ0c1dpdGgoJ1xcXFwnKSkgbXFJbnN0YW5jZS5rZXlzdHJva2UoJ1RhYicpXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IG1xSW5zdGFuY2UuZm9jdXMoKSwgMClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZU1hdGhJbWcoJGltZywgbGF0ZXgpIHtcbiAgICAgICAgJGltZy5wcm9wKHtcbiAgICAgICAgICAgIHNyYzogJy9tYXRoLnN2Zz9sYXRleD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGxhdGV4KSxcbiAgICAgICAgICAgIGFsdDogbGF0ZXhcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZU1hdGhFZGl0b3Ioc2V0Rm9jdXNBZnRlckNsb3NlID0gZmFsc2UpIHtcbiAgICAgICAgLy8gVE9ETzogcmVtb3ZlIGV2ZW50IGJpbmRpbmdzXG4gICAgICAgIGNvbnN0ICRjdXJyZW50RWRpdG9yID0gJG1hdGhFZGl0b3JDb250YWluZXIuY2xvc2VzdCgnW2RhdGEtanM9XCJhbnN3ZXJcIl0nKVxuICAgICAgICBjb25zdCAkaW1nID0gJG1hdGhFZGl0b3JDb250YWluZXIucHJldigpXG4gICAgICAgIGlmICgkbGF0ZXhGaWVsZC52YWwoKS50cmltKCkgPT09ICcnKSB7XG4gICAgICAgICAgICAkaW1nLnJlbW92ZSgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkaW1nLnNob3coKVxuICAgICAgICAgICAgdXBkYXRlTWF0aEltZygkaW1nLCAkbGF0ZXhGaWVsZC52YWwoKSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRvZ2dsZU1hdGhUb29sYmFyKGZhbHNlKVxuICAgICAgICAkb3V0ZXJQbGFjZWhvbGRlci5hcHBlbmQoJG1hdGhFZGl0b3JDb250YWluZXIpXG4gICAgICAgIHZpc2libGUgPSBmYWxzZVxuICAgICAgICBmb2N1cy5sYXRleEZpZWxkID0gZmFsc2VcbiAgICAgICAgZm9jdXMuZXF1YXRpb25GaWVsZCA9IGZhbHNlXG4gICAgICAgIGlmIChzZXRGb2N1c0FmdGVyQ2xvc2UpICRjdXJyZW50RWRpdG9yLmZvY3VzKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b2dnbGVNYXRoVG9vbGJhcihpc1Zpc2libGUpIHtcbiAgICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdtYXRoLWVkaXRvci1mb2N1cycsIGlzVmlzaWJsZSlcbiAgICB9XG59XG4iLCJjb25zdCB1ID0gcmVxdWlyZSgnLi91dGlsJylcbmNvbnN0IHRvb2xiYXJzID0gcmVxdWlyZSgnLi90b29sYmFycycpXG5jb25zdCBtYXRoRWRpdG9yID0gcmVxdWlyZSgnLi9tYXRoLWVkaXRvcicpXG5jb25zdCBsb2NhbGVzID0ge1xuICAgIEZJOiByZXF1aXJlKCcuL0ZJJyksXG4gICAgU1Y6IHJlcXVpcmUoJy4vU1YnKVxufVxuY29uc3QgbCA9IGxvY2FsZXNbd2luZG93LmxvY2FsZSB8fCAnRkknXS5lZGl0b3JcbmNvbnN0IGtleUNvZGVzID0ge1xuICAgIEVOVEVSOiAxMyxcbiAgICBFU0M6IDI3XG59XG5jb25zdCAkb3V0ZXJQbGFjZWhvbGRlciA9ICQoYDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLWhpZGRlblwiIGRhdGEtanM9XCJvdXRlclBsYWNlaG9sZGVyXCI+YClcbmNvbnN0IGZvY3VzID0ge1xuICAgIHJpY2hUZXh0OiBmYWxzZSxcbiAgICBsYXRleEZpZWxkOiBmYWxzZSxcbiAgICBlcXVhdGlvbkZpZWxkOiBmYWxzZVxufVxubGV0ICRjdXJyZW50RWRpdG9yXG5jb25zdCBtYXRoID0gbWF0aEVkaXRvci5pbml0KCRvdXRlclBsYWNlaG9sZGVyLCBmb2N1cywgb25NYXRoRm9jdXNDaGFuZ2VkKVxuXG5mdW5jdGlvbiBvbk1hdGhGb2N1c0NoYW5nZWQoKSB7XG4gICAgaWYgKHJpY2hUZXh0QW5kTWF0aEJsdXIoKSkgb25SaWNoVGV4dEVkaXRvckJsdXIoKVxufVxuXG5jb25zdCB7JHRvb2xiYXJ9ID0gdG9vbGJhcnMuaW5pdChtYXRoLCAoKSA9PiBmb2N1cy5yaWNoVGV4dCwgbClcblxuJCgnYm9keScpLmFwcGVuZCgkb3V0ZXJQbGFjZWhvbGRlciwgJHRvb2xiYXIpXG5cbm1vZHVsZS5leHBvcnRzLm1ha2VSaWNoVGV4dCA9IChlbGVtZW50LCBvcHRpb25zLCBvblZhbHVlQ2hhbmdlZCA9ICgpID0+IHsgfSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgICAgc2NyZWVuc2hvdDoge1xuICAgICAgICAgICAgc2F2ZXIsXG4gICAgICAgICAgICBsaW1pdFxuICAgICAgICB9XG4gICAgfSA9IG9wdGlvbnNcbiAgICBjb25zdCAkYW5zd2VyID0gJChlbGVtZW50KVxuICAgIGxldCBwYXN0ZUluUHJvZ3Jlc3MgPSBmYWxzZVxuXG4gICAgJGFuc3dlclxuICAgICAgICAuYXR0cih7XG4gICAgICAgICAgICAnY29udGVudGVkaXRhYmxlJzogJ3RydWUnLFxuICAgICAgICAgICAgJ3NwZWxsY2hlY2snOiAnZmFsc2UnLFxuICAgICAgICAgICAgJ2RhdGEtanMnOiAnYW5zd2VyJ1xuICAgICAgICB9KVxuICAgICAgICAuYWRkQ2xhc3MoJ3JpY2gtdGV4dC1lZGl0b3InKVxuICAgICAgICAub24oJ21vdXNlZG93bicsIHUuZXF1YXRpb25JbWFnZVNlbGVjdG9yLCBlID0+IHtcbiAgICAgICAgICAgIG9uUmljaFRleHRFZGl0b3JGb2N1cygkKGUudGFyZ2V0KS5jbG9zZXN0KCdbZGF0YS1qcz1cImFuc3dlclwiXScpKVxuICAgICAgICAgICAgbWF0aC5vcGVuTWF0aEVkaXRvcigkKGUudGFyZ2V0KSlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdrZXlwcmVzcycsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKHUuaXNDdHJsS2V5KGUsICdsJykgfHwgdS5pc0N0cmxLZXkoZSwgJ2knKSkgbWF0aC5pbnNlcnROZXdFcXVhdGlvbigpXG4gICAgICAgICAgICBpZiAodS5pc0N0cmxLZXkoZSwga2V5Q29kZXMuRU5URVIpIHx8IHUuaXNLZXkoZSwga2V5Q29kZXMuRVNDKSkgbWF0aC5jbG9zZU1hdGhFZGl0b3IodHJ1ZSlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdmb2N1cyBibHVyJywgZSA9PiB7XG4gICAgICAgICAgICBpZiAobWF0aC5pc1Zpc2libGUoKSAmJiBlLnR5cGUgPT09ICdmb2N1cycpIG1hdGguY2xvc2VNYXRoRWRpdG9yKClcbiAgICAgICAgICAgIG9uUmljaFRleHRFZGl0b3JGb2N1c0NoYW5nZWQoZSlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdrZXl1cCBpbnB1dCcsIGUgPT4ge1xuICAgICAgICAgICAgaWYoISBwYXN0ZUluUHJvZ3Jlc3MpIG9uVmFsdWVDaGFuZ2VkKHUuc2FuaXRpemVDb250ZW50KGUuY3VycmVudFRhcmdldCkpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbigncGFzdGUnLCBlID0+IHtcbiAgICAgICAgICAgIHBhc3RlSW5Qcm9ncmVzcyA9IHRydWVcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcGFzdGVJblByb2dyZXNzID0gZmFsc2UsIDApXG5cbiAgICAgICAgICAgIGlmIChlLnRhcmdldC50YWdOYW1lID09PSAnVEVYVEFSRUEnKVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgY29uc3QgY2xpcGJvYXJkRGF0YSA9IGUub3JpZ2luYWxFdmVudC5jbGlwYm9hcmREYXRhXG4gICAgICAgICAgICBjb25zdCBmaWxlID0gY2xpcGJvYXJkRGF0YS5pdGVtcyAmJiBjbGlwYm9hcmREYXRhLml0ZW1zWzBdLmdldEFzRmlsZSgpXG4gICAgICAgICAgICBpZiAoZmlsZSkge1xuICAgICAgICAgICAgICAgIG9uUGFzdGVCbG9iKGUsIGZpbGUsIHNhdmVyLCAkYW5zd2VyLCBvblZhbHVlQ2hhbmdlZCwgbGltaXQpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNsaXBib2FyZERhdGFBc0h0bWwgPSBjbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQvaHRtbCcpXG4gICAgICAgICAgICAgICAgaWYgKGNsaXBib2FyZERhdGFBc0h0bWwpIG9uUGFzdGVIdG1sKGUsICRhbnN3ZXIsIGNsaXBib2FyZERhdGFBc0h0bWwsIGxpbWl0LCBzYXZlciwgb25WYWx1ZUNoYW5nZWQpXG4gICAgICAgICAgICAgICAgZWxzZSBvbkxlZ2FjeVBhc3RlSW1hZ2Uoc2F2ZXIsIGxpbWl0LCBvblZhbHVlQ2hhbmdlZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICBvblZhbHVlQ2hhbmdlZCh1LnNhbml0aXplQ29udGVudCgkYW5zd2VyLmdldCgwKSkpXG4gICAgc2V0VGltZW91dCgoKSA9PiBkb2N1bWVudC5leGVjQ29tbWFuZChcImVuYWJsZU9iamVjdFJlc2l6aW5nXCIsIGZhbHNlLCBmYWxzZSksIDApXG59XG5cbmZ1bmN0aW9uIG9uUGFzdGVCbG9iKGV2ZW50LCBmaWxlLCBzYXZlciwgJGFuc3dlciwgb25WYWx1ZUNoYW5nZWQsIGxpbWl0KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIGlmIChmaWxlLnR5cGUgPT09ICdpbWFnZS9wbmcnKSB7XG4gICAgICAgIGlmICh1LmV4aXN0aW5nU2NyZWVuc2hvdENvdW50KCRhbnN3ZXIpICsgMSA8PSBsaW1pdCkge1xuICAgICAgICAgICAgc2F2ZXIoe2RhdGE6IGZpbGUsIHR5cGU6IGZpbGUudHlwZSwgaWQ6IFN0cmluZyhuZXcgRGF0ZSgpLmdldFRpbWUoKSl9KS50aGVuKHNjcmVlbnNob3RVcmwgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGltZyA9IGA8aW1nIHNyYz1cIiR7c2NyZWVuc2hvdFVybH1cIi8+YFxuICAgICAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0SFRNTCcsIGZhbHNlLCBpbWcpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb25WYWx1ZUNoYW5nZWQodS5TQ1JFRU5TSE9UX0xJTUlUX0VSUk9SKCkpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIG9uUGFzdGVIdG1sKGV2ZW50LCAkYW5zd2VyLCBjbGlwYm9hcmREYXRhQXNIdG1sLCBsaW1pdCwgc2F2ZXIsIG9uVmFsdWVDaGFuZ2VkKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIGlmICh1LnRvdGFsSW1hZ2VDb3VudCgkYW5zd2VyLCBjbGlwYm9hcmREYXRhQXNIdG1sKSA8PSBsaW1pdCkge1xuICAgICAgICB3aW5kb3cuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydEhUTUwnLCBmYWxzZSwgdS5zYW5pdGl6ZShjbGlwYm9hcmREYXRhQXNIdG1sKSlcbiAgICAgICAgdS5wZXJzaXN0SW5saW5lSW1hZ2VzKCRjdXJyZW50RWRpdG9yLCBzYXZlciwgbGltaXQsIG9uVmFsdWVDaGFuZ2VkKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIG9uVmFsdWVDaGFuZ2VkKHUuU0NSRUVOU0hPVF9MSU1JVF9FUlJPUigpKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gb25MZWdhY3lQYXN0ZUltYWdlKHNhdmVyLCBsaW1pdCwgb25WYWx1ZUNoYW5nZWQpIHtcbiAgICB1LnBlcnNpc3RJbmxpbmVJbWFnZXMoJGN1cnJlbnRFZGl0b3IsIHNhdmVyLCBsaW1pdCwgb25WYWx1ZUNoYW5nZWQpXG59XG5cbmZ1bmN0aW9uIHRvZ2dsZVJpY2hUZXh0VG9vbGJhcihpc1Zpc2libGUpIHtcbiAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ3JpY2gtdGV4dC1lZGl0b3ItZm9jdXMnLCBpc1Zpc2libGUpXG59XG5cbmZ1bmN0aW9uIG9uUmljaFRleHRFZGl0b3JGb2N1cygkZWxlbWVudCkge1xuICAgICRjdXJyZW50RWRpdG9yID0gJGVsZW1lbnRcbiAgICB0b2dnbGVSaWNoVGV4dFRvb2xiYXIodHJ1ZSlcbn1cblxuZnVuY3Rpb24gb25SaWNoVGV4dEVkaXRvckJsdXIoKSB7XG4gICAgdG9nZ2xlUmljaFRleHRUb29sYmFyKGZhbHNlKVxuICAgIG1hdGguY2xvc2VNYXRoRWRpdG9yKClcbiAgICBmb2N1cy5yaWNoVGV4dCA9IGZhbHNlXG59XG5cbmxldCByaWNoVGV4dEVkaXRvckJsdXJUaW1lb3V0XG5cbmZ1bmN0aW9uIG9uUmljaFRleHRFZGl0b3JGb2N1c0NoYW5nZWQoZSkge1xuICAgIGZvY3VzLnJpY2hUZXh0ID0gZS50eXBlID09PSAnZm9jdXMnXG5cbiAgICBjbGVhclRpbWVvdXQocmljaFRleHRFZGl0b3JCbHVyVGltZW91dClcbiAgICByaWNoVGV4dEVkaXRvckJsdXJUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChyaWNoVGV4dEFuZE1hdGhCbHVyKCkpIG9uUmljaFRleHRFZGl0b3JCbHVyKClcbiAgICAgICAgZWxzZSBpZiAoZm9jdXMucmljaFRleHQgJiYgbWF0aC5pc1Zpc2libGUoKSkgbWF0aC5jbG9zZU1hdGhFZGl0b3IoKVxuICAgICAgICBlbHNlIG9uUmljaFRleHRFZGl0b3JGb2N1cygkKGUudGFyZ2V0KSlcbiAgICB9LCAwKVxufVxuXG5mdW5jdGlvbiByaWNoVGV4dEFuZE1hdGhCbHVyKCkge1xuICAgIHJldHVybiAhZm9jdXMucmljaFRleHQgJiYgIW1hdGguaXNWaXNpYmxlKCkgJiYgIWZvY3VzLmxhdGV4RmllbGQgJiYgIWZvY3VzLmVxdWF0aW9uRmllbGRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGFsbG93ZWRUYWdzOiBbXG4gICAgICAgICdkaXYnLFxuICAgICAgICAnaW1nJyxcbiAgICAgICAgJ2JyJ1xuICAgIF0sXG4gICAgYWxsb3dlZEF0dHJpYnV0ZXM6IHtcbiAgICAgICAgaW1nOiBbJ3NyYycsICdhbHQnXVxuICAgIH0sXG4gICAgYWxsb3dlZFNjaGVtZXM6IFsnZGF0YSddLFxuICAgIGV4Y2x1c2l2ZUZpbHRlcjogZnVuY3Rpb24oZnJhbWUpIHsgcmV0dXJuIGZyYW1lLmF0dHJpYnNbJ2RhdGEtanMnXSA9PT0gJ21hdGhFZGl0b3InIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuICAgIHtcbiAgICAgICAgbGFiZWw6ICdQZXJ1cycsXG4gICAgICAgIGNoYXJhY3RlcnM6IFtcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4omgJywgbGF0ZXhDb21tYW5kOiAnXFxcXG5lcScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4omIJywgbGF0ZXhDb21tYW5kOiAnXFxcXGFwcHJveCcsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4omkJywgbGF0ZXhDb21tYW5kOiAnXFxcXGxlcScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4omlJywgbGF0ZXhDb21tYW5kOiAnXFxcXGdlcScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnwrInLCBsYXRleENvbW1hbmQ6ICdeMicsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnwrMnLCBsYXRleENvbW1hbmQ6ICdeMycsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnwr0nLCBsYXRleENvbW1hbmQ6ICcxLzInLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KFkycsIGxhdGV4Q29tbWFuZDogJzEvMycgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnwrEnLCBsYXRleENvbW1hbmQ6ICdcXFxccG0nIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBsYWJlbDogJ0FsZ2VicmEnLFxuICAgICAgICBjaGFyYWN0ZXJzOiBbXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIvCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxzaW0nIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KJoScsIGxhdGV4Q29tbWFuZDogJ1xcXFxlcXVpdicgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4omiJyB9LCAvLyBcXG5lcXVpdiBvciBcXG5vdFxcZXF1aXZcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnwrcnLCBsYXRleENvbW1hbmQ6ICdcXFxcY2RvdCcsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oCmJywgbGF0ZXhDb21tYW5kOiAnXFxcXGRvdHMnIH0sIC8vIG1hdHJpaXNpYWxnZWJyYT9cbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oieJywgbGF0ZXhDb21tYW5kOiAnXFxcXGluZnR5JywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGxhYmVsOiAnS3JlaWtrYWxhaXNldCBhYWtrb3NldCcsXG4gICAgICAgIGNoYXJhY3RlcnM6IFtcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzrEnLCBsYXRleENvbW1hbmQ6ICdcXFxcYWxwaGEnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86yJywgbGF0ZXhDb21tYW5kOiAnXFxcXGJldGEnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ860JywgbGF0ZXhDb21tYW5kOiAnXFxcXGRlbHRhJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOtScsIGxhdGV4Q29tbWFuZDogJ1xcXFx2YXJlcHNpbG9uJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOtycsIGxhdGV4Q29tbWFuZDogJ1xcXFxldGEnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIgicsIGxhdGV4Q29tbWFuZDogJ1xcXFxwYXJ0aWFsJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfwnZyEJywgbGF0ZXhDb21tYW5kOiAnXFxcXGlvdGEnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ867JywgbGF0ZXhDb21tYW5kOiAnXFxcXGxhbWJkYScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnwrUnLCBsYXRleENvbW1hbmQ6ICdcXFxcbXUnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8+AJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBpJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfPgycsIGxhdGV4Q29tbWFuZDogJ1xcXFxzaWdtYScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnz4QnLCBsYXRleENvbW1hbmQ6ICdcXFxcdGF1JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfQpCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxwaGknIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8+JJywgbGF0ZXhDb21tYW5kOiAnXFxcXG9tZWdhJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOkycsIGxhdGV4Q29tbWFuZDogJ1xcXFxHYW1tYScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzpQnLCBsYXRleENvbW1hbmQ6ICdcXFxcRGVsdGEnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86YJywgbGF0ZXhDb21tYW5kOiAnXFxcXFRoZXRhJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiI8nLCBsYXRleENvbW1hbmQ6ICdcXFxcUGknIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIkScsIGxhdGV4Q29tbWFuZDogJ1xcXFxTaWdtYScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzqYnLCBsYXRleENvbW1hbmQ6ICdcXFxcUGhpJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOqScsIGxhdGV4Q29tbWFuZDogJ1xcXFxPbWVnYScgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGxhYmVsOiAnR2VvbWV0cmlhIGphIHZla3RvcmlvcHBpJyxcbiAgICAgICAgY2hhcmFjdGVyczogW1xuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfCsCcsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oigJywgbGF0ZXhDb21tYW5kOiAnXFxcXGFuZ2xlJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiqUnLCBsYXRleENvbW1hbmQ6ICdcXFxccGVycCcsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oCWJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBhcmFsbGVsJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfih4UnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KGkScsIGxhdGV4Q29tbWFuZDogJ1xcXFx1cGFycm93JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihpMnLCBsYXRleENvbW1hbmQ6ICdcXFxcZG93bmFycm93JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihpQnLCBsYXRleENvbW1hbmQ6ICdcXFxcbGVmdHJpZ2h0YXJyb3cnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KHjCcgfSAvLyBcXHJpZ2h0bGVmdGhhcnBvb25zXG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbGFiZWw6ICdMb2dpaWtrYSBqYSBqb3Vra28tb3BwaScsXG4gICAgICAgIGNoYXJhY3RlcnM6IFtcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oeSJywgbGF0ZXhDb21tYW5kOiAnXFxcXFJpZ2h0YXJyb3cnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KHlCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxMZWZ0cmlnaHRhcnJvdycsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oinJywgbGF0ZXhDb21tYW5kOiAnXFxcXGFuZCcgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oioJywgbGF0ZXhDb21tYW5kOiAnXFxcXG9yJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfCrCcgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiDJywgbGF0ZXhDb21tYW5kOiAnXFxcXGV4aXN0cycsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiAJywgbGF0ZXhDb21tYW5kOiAnXFxcXGZvcmFsbCcsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oipJywgbGF0ZXhDb21tYW5kOiAnXFxcXGNhcCcgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiqJywgbGF0ZXhDb21tYW5kOiAnXFxcXGN1cCcgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiWJywgbGF0ZXhDb21tYW5kOiAnXFxcXHNldG1pbnVzJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiioInLCBsYXRleENvbW1hbmQ6ICdcXFxcc3Vic2V0JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiioQnLCBsYXRleENvbW1hbmQ6ICdcXFxcbm90c3Vic2V0JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiIgnLCBsYXRleENvbW1hbmQ6ICdcXFxcaW4nIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIiScsIGxhdGV4Q29tbWFuZDogJ1xcXFxub3RpbicgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiFJywgbGF0ZXhDb21tYW5kOiAnXFxcXGVtcHR5JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihpInLCBsYXRleENvbW1hbmQ6ICdcXFxccmlnaHRhcnJvdycgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiYJywgbGF0ZXhDb21tYW5kOiAnXFxcXGNpcmMnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIvCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxzaW0nIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KEnScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oSVJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihKQnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KEmicgfVxuICAgICAgICBdXG4gICAgfVxuXVxuIiwiY29uc3Qgc3BlY2lhbENoYXJhY3Rlckdyb3VwcyA9IHJlcXVpcmUoJy4vc3BlY2lhbENoYXJhY3RlcnMnKVxuY29uc3QgbGF0ZXhDb21tYW5kcyA9IHJlcXVpcmUoJy4vbGF0ZXhDb21tYW5kcycpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGluaXQsXG59XG5cbmZ1bmN0aW9uIGluaXQobWF0aEVkaXRvciwgaGFzUmljaFRleHRGb2N1cywgbCkge1xuICAgIGNvbnN0ICR0b29sYmFyID0gJChgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xzXCIgZGF0YS1qcz1cInRvb2xzXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29scy1idXR0b24td3JhcHBlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xiYXItd3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci1jaGFyYWN0ZXJzLWV4cGFuZC1jb2xsYXBzZVwiIGRhdGEtanM9XCJleHBhbmRDb2xsYXBzZUNoYXJhY3RlcnNcIiBzdHlsZT1cInotaW5kZXg6IDEwMFwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29scy1yb3dcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29sYmFyLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhci1jaGFyYWN0ZXJzIHJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhciByaWNoLXRleHQtZWRpdG9yLXRvb2xiYXItYnV0dG9uLWxpc3RcIiBkYXRhLWpzPVwiY2hhcmFjdGVyc0xpc3RcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbHMtcm93XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhci13cmFwcGVyIHJpY2gtdGV4dC1lZGl0b3ItZXF1YXRpb24td3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29sYmFyLWVxdWF0aW9uIHJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhciByaWNoLXRleHQtZWRpdG9yLXRvb2xiYXItYnV0dG9uLWxpc3RcIiBkYXRhLWpzPVwibWF0aFRvb2xiYXJcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbHMtYnV0dG9uLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29sYmFyLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItbmV3LWVxdWF0aW9uIHJpY2gtdGV4dC1lZGl0b3ItYnV0dG9uIHJpY2gtdGV4dC1lZGl0b3ItYnV0dG9uLWFjdGlvblwiIGRhdGEtanM9XCJuZXdFcXVhdGlvblwiIGRhdGEtY29tbWFuZD1cIkN0cmwtTFwiPs6jICR7bC5pbnNlcnRFcXVhdGlvbn08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgYClcbiAgICAgICAgLm9uKCdtb3VzZWRvd24nLCAnW2RhdGEtanM9XCJleHBhbmRDb2xsYXBzZUNoYXJhY3RlcnNcIl0nLCBlID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgJHRvb2xiYXIudG9nZ2xlQ2xhc3MoJ3JpY2gtdGV4dC1lZGl0b3ItY2hhcmFjdGVycy1leHBhbmRlZCcpXG4gICAgICAgIH0pXG5cbiAgICBjb25zdCAkbmV3RXF1YXRpb24gPSAkdG9vbGJhci5maW5kKCdbZGF0YS1qcz1cIm5ld0VxdWF0aW9uXCJdJylcbiAgICBjb25zdCAkbWF0aFRvb2xiYXIgPSAkdG9vbGJhci5maW5kKCdbZGF0YS1qcz1cIm1hdGhUb29sYmFyXCJdJylcbiAgICBpbml0U3BlY2lhbENoYXJhY3RlclRvb2xiYXIoJHRvb2xiYXIsIG1hdGhFZGl0b3IsIGhhc1JpY2hUZXh0Rm9jdXMpXG4gICAgaW5pdE1hdGhUb29sYmFyKCRtYXRoVG9vbGJhciwgbWF0aEVkaXRvcilcbiAgICBpbml0TmV3RXF1YXRpb24oJG5ld0VxdWF0aW9uLCBtYXRoRWRpdG9yLCBoYXNSaWNoVGV4dEZvY3VzKVxuXG4gICAgcmV0dXJuIHsgJHRvb2xiYXIgfVxufVxuXG5jb25zdCBzcGVjaWFsQ2hhcmFjdGVyVG9CdXR0b24gPSBjaGFyID0+IGA8YnV0dG9uIGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci1idXR0b24gcmljaC10ZXh0LWVkaXRvci1idXR0b24tZ3JpZCR7Y2hhci5wb3B1bGFyID8gJyByaWNoLXRleHQtZWRpdG9yLWNoYXJhY3RlcnMtcG9wdWxhcicgOicnfVwiICR7Y2hhci5sYXRleENvbW1hbmQgPyBgZGF0YS1jb21tYW5kPVwiJHtjaGFyLmxhdGV4Q29tbWFuZH1cImAgOiAnJ30+JHtjaGFyLmNoYXJhY3Rlcn08L2J1dHRvbj5gXG5cbmNvbnN0IHBvcHVsYXJJbkdyb3VwID0gZ3JvdXAgPT4gZ3JvdXAuY2hhcmFjdGVycy5maWx0ZXIoY2hhcmFjdGVyID0+IGNoYXJhY3Rlci5wb3B1bGFyKS5sZW5ndGhcblxuZnVuY3Rpb24gaW5pdFNwZWNpYWxDaGFyYWN0ZXJUb29sYmFyKCR0b29sYmFyLCBtYXRoRWRpdG9yLCBoYXNBbnN3ZXJGb2N1cykge1xuICAgIGNvbnN0IGdyaWRCdXR0b25XaWR0aFB4ID0gMzVcblxuICAgICR0b29sYmFyLmZpbmQoJ1tkYXRhLWpzPVwiY2hhcmFjdGVyc0xpc3RcIl0nKVxuICAgICAgICAuYXBwZW5kKHNwZWNpYWxDaGFyYWN0ZXJHcm91cHMubWFwKGdyb3VwID0+XG4gICAgICAgICAgICBgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhci1jaGFyYWN0ZXJzLWdyb3VwXCIgXG4gICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAke3BvcHVsYXJJbkdyb3VwKGdyb3VwKSAqIGdyaWRCdXR0b25XaWR0aFB4fXB4XCI+XG4gICAgICAgICAgICAgICAgICAke2dyb3VwLmNoYXJhY3RlcnMubWFwKHNwZWNpYWxDaGFyYWN0ZXJUb0J1dHRvbikuam9pbignJyl9XG4gICAgICAgICAgICAgPC9kaXY+YCkpXG4gICAgICAgIC5vbignbW91c2Vkb3duJywgJ2J1dHRvbicsIGUgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgICAgIGNvbnN0IGNoYXJhY3RlciA9IGUuY3VycmVudFRhcmdldC5pbm5lclRleHRcbiAgICAgICAgICAgIGNvbnN0IGNvbW1hbmQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jb21tYW5kXG4gICAgICAgICAgICBpZiAoaGFzQW5zd2VyRm9jdXMoKSkgd2luZG93LmRvY3VtZW50LmV4ZWNDb21tYW5kKCdpbnNlcnRUZXh0JywgZmFsc2UsIGNoYXJhY3RlcilcbiAgICAgICAgICAgIGVsc2UgbWF0aEVkaXRvci5pbnNlcnRNYXRoKGNvbW1hbmQgfHwgY2hhcmFjdGVyKVxuICAgICAgICB9KVxufVxuXG5mdW5jdGlvbiBpbml0TWF0aFRvb2xiYXIoJG1hdGhUb29sYmFyLCBtYXRoRWRpdG9yKSB7XG4gICAgJG1hdGhUb29sYmFyLmFwcGVuZChsYXRleENvbW1hbmRzXG4gICAgICAgIC5tYXAobyA9PiBgPGJ1dHRvbiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItYnV0dG9uIHJpY2gtdGV4dC1lZGl0b3ItYnV0dG9uLWdyaWRcIiBkYXRhLWNvbW1hbmQ9XCIke28uYWN0aW9ufVwiIGRhdGEtbGF0ZXhjb21tYW5kPVwiJHtvLmxhYmVsfVwiIGRhdGEtdXNld3JpdGU9XCIke28udXNlV3JpdGUgfHwgZmFsc2V9XCI+XG48aW1nIHNyYz1cIi9tYXRoLnN2Zz9sYXRleD0ke2VuY29kZVVSSUNvbXBvbmVudChvLmxhYmVsID8gby5sYWJlbC5yZXBsYWNlKC9YL2csICdcXFxcc3F1YXJlJykgOiBvLmFjdGlvbil9XCIvPlxuPC9idXR0b24+YCkuam9pbignJylcbiAgICApLm9uKCdtb3VzZWRvd24nLCAnYnV0dG9uJywgZSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBjb25zdCBkYXRhc2V0ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XG4gICAgICAgIG1hdGhFZGl0b3IuaW5zZXJ0TWF0aChkYXRhc2V0LmNvbW1hbmQsIGRhdGFzZXQubGF0ZXhjb21tYW5kLCBkYXRhc2V0LnVzZXdyaXRlID09PSAndHJ1ZScpXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gaW5pdE5ld0VxdWF0aW9uKCRuZXdFcXVhdGlvbiwgbWF0aEVkaXRvciwgaGFzQW5zd2VyRm9jdXMpIHtcbiAgICAkbmV3RXF1YXRpb24ubW91c2Vkb3duKChlID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGlmICghaGFzQW5zd2VyRm9jdXMoKSkgcmV0dXJuIC8vIFRPRE86IHJlbW92ZSB3aGVuIGJ1dHRvbiBpcyBvbmx5IHZpc2libGUgd2hlbiB0ZXh0YXJlYSBoYXMgZm9jdXNcbiAgICAgICAgbWF0aEVkaXRvci5pbnNlcnROZXdFcXVhdGlvbigpXG4gICAgfSkuYmluZCh0aGlzKSlcbn1cbiIsImNvbnN0IHNhbml0aXplSHRtbCA9IHJlcXVpcmUoJ3Nhbml0aXplLWh0bWwnKVxuY29uc3Qgc2FuaXRpemVPcHRzID0gcmVxdWlyZSgnLi9zYW5pdGl6ZU9wdHMnKVxuY29uc3QgbG9hZGluZ0ltZyA9IHJlcXVpcmUoJy4vbG9hZGluZ0ltZycpXG5jb25zdCBlcXVhdGlvbkltYWdlU2VsZWN0b3IgPSAnaW1nW3NyY149XCIvbWF0aC5zdmdcIl0nXG5cbmNvbnN0IFNDUkVFTlNIT1RfTElNSVRfRVJST1IgPSAoKSA9PiBuZXcgQmFjb24uRXJyb3IoJ1NjcmVlbnNob3QgbGltaXQgcmVhY2hlZCEnKVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaXNLZXksXG4gICAgaXNDdHJsS2V5LFxuICAgIGluc2VydFRvVGV4dEFyZWFBdEN1cnNvcixcbiAgICBwZXJzaXN0SW5saW5lSW1hZ2VzLFxuICAgIHNhbml0aXplLFxuICAgIHNhbml0aXplQ29udGVudCxcbiAgICBzZXRDdXJzb3JBZnRlcixcbiAgICBlcXVhdGlvbkltYWdlU2VsZWN0b3IsXG4gICAgdG90YWxJbWFnZUNvdW50LFxuICAgIFNDUkVFTlNIT1RfTElNSVRfRVJST1IsXG4gICAgZXhpc3RpbmdTY3JlZW5zaG90Q291bnRcbn1cblxuZnVuY3Rpb24gY29udmVydExpbmtzVG9SZWxhdGl2ZShodG1sKSB7XG4gICAgcmV0dXJuIGh0bWwucmVwbGFjZShuZXcgUmVnRXhwKGRvY3VtZW50LmxvY2F0aW9uLm9yaWdpbiwgJ2cnKSwgJycpXG59XG5cbmZ1bmN0aW9uIHNhbml0aXplKGh0bWwpIHtcbiAgICByZXR1cm4gc2FuaXRpemVIdG1sKGNvbnZlcnRMaW5rc1RvUmVsYXRpdmUoaHRtbCksIHNhbml0aXplT3B0cylcbn1cbmZ1bmN0aW9uIGluc2VydFRvVGV4dEFyZWFBdEN1cnNvcihmaWVsZCwgdmFsdWUpIHtcbiAgICBjb25zdCBzdGFydFBvcyA9IGZpZWxkLnNlbGVjdGlvblN0YXJ0XG4gICAgY29uc3QgZW5kUG9zID0gZmllbGQuc2VsZWN0aW9uRW5kXG4gICAgbGV0IG9sZFZhbHVlID0gZmllbGQudmFsdWVcbiAgICBmaWVsZC52YWx1ZSA9IG9sZFZhbHVlLnN1YnN0cmluZygwLCBzdGFydFBvcykgKyB2YWx1ZSArIG9sZFZhbHVlLnN1YnN0cmluZyhlbmRQb3MsIG9sZFZhbHVlLmxlbmd0aClcbiAgICBmaWVsZC5zZWxlY3Rpb25TdGFydCA9IGZpZWxkLnNlbGVjdGlvbkVuZCA9IHN0YXJ0UG9zICsgdmFsdWUubGVuZ3RoXG59XG5cbmZ1bmN0aW9uIGRlY29kZUJhc2U2NEltYWdlKGRhdGFTdHJpbmcpIHtcbiAgICBpZiAoIWRhdGFTdHJpbmcpXG4gICAgICAgIHJldHVybiBudWxsXG4gICAgY29uc3QgbWF0Y2hlcyA9IGRhdGFTdHJpbmcubWF0Y2goL15kYXRhOihbQS1aYS16LStcXC9dKyk7YmFzZTY0LCguKykkLylcbiAgICBpZiAobWF0Y2hlcy5sZW5ndGggIT09IDMpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogbWF0Y2hlc1sxXSxcbiAgICAgICAgZGF0YTogbmV3IEJ1ZmZlcihtYXRjaGVzWzJdLCAnYmFzZTY0JylcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzS2V5KGUsIGtleSkgeyByZXR1cm4gcHJldmVudElmVHJ1ZShlLCAhZS5hbHRLZXkgJiYgIWUuc2hpZnRLZXkgJiYgIWUuY3RybEtleSAgJiYga2V5T3JLZXlDb2RlKGUsIGtleSkpfVxuXG5mdW5jdGlvbiBpc0N0cmxLZXkoZSwga2V5KSB7IHJldHVybiBwcmV2ZW50SWZUcnVlKGUsICFlLmFsdEtleSAmJiAhZS5zaGlmdEtleSAmJiBlLmN0cmxLZXkgJiYga2V5T3JLZXlDb2RlKGUsIGtleSkpfVxuXG5mdW5jdGlvbiBrZXlPcktleUNvZGUoZSwgdmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJyA/IGUua2V5ID09PSB2YWwgOiBlLmtleUNvZGUgPT09IHZhbCB9XG5mdW5jdGlvbiBwcmV2ZW50SWZUcnVlKGUsIHZhbCkge1xuICAgIGlmKHZhbCkgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgcmV0dXJuIHZhbFxufVxuXG5mdW5jdGlvbiBzYW5pdGl6ZUNvbnRlbnQoYW5zd2VyRWxlbWVudCkge1xuICAgIGNvbnN0ICRhbnN3ZXJFbGVtZW50ID0gJChhbnN3ZXJFbGVtZW50KVxuICAgIGNvbnN0ICRtYXRoRWRpdG9yID0gJGFuc3dlckVsZW1lbnQuZmluZCgnW2RhdGEtanM9XCJtYXRoRWRpdG9yXCJdJylcbiAgICAkbWF0aEVkaXRvci5oaWRlKClcbiAgICBjb25zdCB0ZXh0ID0gJGFuc3dlckVsZW1lbnQuZ2V0KDApLmlubmVyVGV4dFxuICAgICRtYXRoRWRpdG9yLnNob3coKVxuXG4gICAgY29uc3QgaHRtbCA9IHNhbml0aXplKCRhbnN3ZXJFbGVtZW50Lmh0bWwoKSlcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFuc3dlckhUTUw6IGh0bWwsXG4gICAgICAgIGFuc3dlclRleHQ6IHRleHQsXG4gICAgICAgIGltYWdlQ291bnQ6IGV4aXN0aW5nU2NyZWVuc2hvdENvdW50KCQoYDxkaXY+JHtodG1sfTwvZGl2PmApKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gc2V0Q3Vyc29yQWZ0ZXIoJGltZykge1xuICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKVxuICAgIGNvbnN0IGltZyA9ICRpbWcuZ2V0KDApXG4gICAgY29uc3QgbmV4dFNpYmxpbmcgPSBpbWcubmV4dFNpYmxpbmcgJiYgaW1nLm5leHRTaWJsaW5nLnRhZ05hbWUgPT09ICdCUicgPyBpbWcubmV4dFNpYmxpbmcgOiBpbWdcbiAgICByYW5nZS5zZXRTdGFydChuZXh0U2libGluZywgMClcbiAgICByYW5nZS5zZXRFbmQobmV4dFNpYmxpbmcsIDApXG4gICAgY29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpXG4gICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpXG4gICAgc2VsLmFkZFJhbmdlKHJhbmdlKVxufVxuXG5mdW5jdGlvbiBtYXJrQW5kR2V0SW5saW5lSW1hZ2VzKCRlZGl0b3IpIHtcbiAgICBjb25zdCBpbWFnZXMgPSAkZWRpdG9yLmZpbmQoJ2ltZ1tzcmNePVwiZGF0YVwiXScpLnRvQXJyYXkoKVxuICAgICAgICAubWFwKChlbCwgaW5kZXgpID0+IE9iamVjdC5hc3NpZ24oZGVjb2RlQmFzZTY0SW1hZ2UoZWwuZ2V0QXR0cmlidXRlKCdzcmMnKSksIHtcbiAgICAgICAgICAgICRlbDogJChlbClcbiAgICAgICAgfSkpXG4gICAgaW1hZ2VzLmZpbHRlcigoe3R5cGV9KSA9PiB0eXBlICE9PSAnaW1hZ2UvcG5nJykuZm9yRWFjaCgoeyRlbH0pID0+ICRlbC5yZW1vdmUoKSlcbiAgICBjb25zdCBwbmdJbWFnZXMgPSBpbWFnZXMuZmlsdGVyKCh7dHlwZX0pID0+IHR5cGUgPT09ICdpbWFnZS9wbmcnKVxuICAgIHBuZ0ltYWdlcy5mb3JFYWNoKCh7JGVsfSkgPT4gJGVsLmF0dHIoJ3NyYycsIGxvYWRpbmdJbWcpKVxuICAgIHJldHVybiBwbmdJbWFnZXNcbn1cblxuZnVuY3Rpb24gZXhpc3RpbmdTY3JlZW5zaG90Q291bnQoJGVkaXRvcikge1xuICAgIGNvbnN0IGltYWdlQ291bnQgPSAkZWRpdG9yLmZpbmQoJ2ltZycpLmxlbmd0aFxuICAgIGNvbnN0IGVxdWF0aW9uQ291bnQgPSAkZWRpdG9yLmZpbmQoZXF1YXRpb25JbWFnZVNlbGVjdG9yKS5sZW5ndGhcbiAgICByZXR1cm4gaW1hZ2VDb3VudCAtIGVxdWF0aW9uQ291bnRcbn1cblxuZnVuY3Rpb24gY2hlY2tGb3JJbWFnZUxpbWl0KCRlZGl0b3IsIGltYWdlRGF0YSwgbGltaXQpIHtcbiAgICByZXR1cm4gQmFjb24ub25jZShleGlzdGluZ1NjcmVlbnNob3RDb3VudCgkZWRpdG9yKSA+IGxpbWl0ID8gbmV3IEJhY29uLkVycm9yKCkgOiBpbWFnZURhdGEpXG59XG5cbmZ1bmN0aW9uIHBlcnNpc3RJbmxpbmVJbWFnZXMoJGVkaXRvciwgc2NyZWVuc2hvdFNhdmVyLCBzY3JlZW5zaG90Q291bnRMaW1pdCwgb25WYWx1ZUNoYW5nZWQpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IEJhY29uLmNvbWJpbmVBc0FycmF5KG1hcmtBbmRHZXRJbmxpbmVJbWFnZXMoJGVkaXRvcilcbiAgICAgICAgLm1hcChkYXRhID0+IGNoZWNrRm9ySW1hZ2VMaW1pdCgkZWRpdG9yLCBkYXRhLCBzY3JlZW5zaG90Q291bnRMaW1pdClcbiAgICAgICAgICAgIC5kb0Vycm9yKCgpID0+IG9uVmFsdWVDaGFuZ2VkKFNDUkVFTlNIT1RfTElNSVRfRVJST1IoKSkpXG4gICAgICAgICAgICAuZmxhdE1hcExhdGVzdCgoKSA9PiBCYWNvbi5mcm9tUHJvbWlzZShzY3JlZW5zaG90U2F2ZXIoZGF0YSkpKVxuICAgICAgICAgICAgLmRvQWN0aW9uKHNjcmVlblNob3RVcmwgPT4gZGF0YS4kZWwuYXR0cignc3JjJywgc2NyZWVuU2hvdFVybCkpXG4gICAgICAgICAgICAuZG9FcnJvcigoKSA9PiBkYXRhLiRlbC5yZW1vdmUoKSkpXG4gICAgKS5vblZhbHVlKGsgPT4gJGVkaXRvci50cmlnZ2VyKCdpbnB1dCcpKSwgMClcbn1cblxuZnVuY3Rpb24gdG90YWxJbWFnZUNvdW50KCRhbnN3ZXIsIGNsaXBib2FyZERhdGFBc0h0bWwpIHtcbiAgICByZXR1cm4gZXhpc3RpbmdTY3JlZW5zaG90Q291bnQoJGFuc3dlcikgKyBleGlzdGluZ1NjcmVlbnNob3RDb3VudCgkKGA8ZGl2PiR7Y2xpcGJvYXJkRGF0YUFzSHRtbH08L2Rpdj5gKSlcbn1cbiJdfQ==
