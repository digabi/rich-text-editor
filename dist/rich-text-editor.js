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
    $equationField.on('keyup', '.mq-textarea textarea', onMqEdit).on('focus blur', '.mq-textarea textarea', function (e) {
        focus.equationField = e.type !== 'blur' && e.type !== 'focusout';
        onFocusChanged();
    });

    $latexField.on('input paste', onLatexUpdate).on('focus blur', function (e) {
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
        u.scrollIntoView($mathEditorContainer);
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

    onValueChanged(u.sanitizeContent(element));
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
    }).on('keydown', function (e) {
        if (u.isCtrlKey(e, keyCodes.ENTER) || u.isKey(e, keyCodes.ESC)) math.closeMathEditor(true);
    }).on('keypress', function (e) {
        if (u.isCtrlKey(e, 'l') || u.isCtrlKey(e, 'i')) math.insertNewEquation();
    }).on('focus blur', function (e) {
        if (math.isVisible() && e.type === 'focus') math.closeMathEditor();
        onRichTextEditorFocusChanged(e);
    }).on('input', function (e) {
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
            onPasteBlob(e, file, saver, $(e.currentTarget), onValueChanged, limit);
        } else {
            var clipboardDataAsHtml = clipboardData.getData('text/html');
            if (clipboardDataAsHtml) onPasteHtml(e, $(e.currentTarget), clipboardDataAsHtml, limit, saver, onValueChanged);else onLegacyPasteImage($(e.currentTarget), saver, limit, onValueChanged);
        }
    });
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

function onLegacyPasteImage($editor, saver, limit, onValueChanged) {
    u.persistInlineImages($editor, saver, limit, onValueChanged);
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
        return '<button class="rich-text-editor-button rich-text-editor-button-grid" data-command="' + o.action + '" data-latexcommand="' + (o.label || '') + '" data-usewrite="' + (o.useWrite || false) + '">\n<img src="/math.svg?latex=' + encodeURIComponent(o.label ? o.label.replace(/X/g, '\\square') : o.action) + '"/>\n</button>';
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
    existingScreenshotCount: existingScreenshotCount,
    scrollIntoView: scrollIntoView
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

function scrollIntoView($element) {
    var $window = $(window);
    var windowHeight = $window.height() - 40;
    var scroll = windowHeight + $window.scrollTop();
    var pos = $element.offset().top + $element.height();
    if (scroll < pos) {
        $window.scrollTop(pos - windowHeight);
    }
}

}).call(this,require("buffer").Buffer)

},{"./loadingImg":4,"./sanitizeOpts":7,"buffer":undefined,"sanitize-html":undefined}]},{},[6])(6)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvRkkuanMiLCJhcHAvU1YuanMiLCJhcHAvbGF0ZXhDb21tYW5kcy5qcyIsImFwcC9sb2FkaW5nSW1nLmpzIiwiYXBwL21hdGgtZWRpdG9yLmpzIiwiYXBwL3JpY2gtdGV4dC1lZGl0b3IuanMiLCJhcHAvc2FuaXRpemVPcHRzLmpzIiwiYXBwL3NwZWNpYWxDaGFyYWN0ZXJzLmpzIiwiYXBwL3Rvb2xiYXJzLmpzIiwiYXBwL3V0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLE9BQU8sT0FBUCxHQUFpQjtBQUNiLFlBQVE7QUFDSixvQkFBWSxnQkFEUjtBQUVKLGVBQU8seUNBRkg7QUFHSixraEJBSEk7QUFXSixxREFYSTtBQVlKLDRkQVpJO0FBdUJKLG9CQUFZLFVBdkJSO0FBd0JKLDJCQUFtQixlQXhCZjtBQXlCSix3QkFBZ0IsYUF6Qlo7QUEwQkosZUFBTyxPQTFCSDtBQTJCSixjQUFNLFVBM0JGO0FBNEJKLGlCQUFTLFlBNUJMO0FBNkJKLHNCQUFjLG1CQTdCVjtBQThCSixrQkFBVSxLQTlCTjtBQStCSixtQkFBVyxZQS9CUDtBQWdDSixxQkFBYTtBQWhDVCxLQURLO0FBbUNiLGdCQUFZO0FBQ1Isc0JBQWMsbUJBRE47QUFFUixpQkFBUyxZQUZEO0FBR1Isb0JBQVksZ0JBSEo7QUFJUixlQUFPLFdBSkM7QUFLUixrQkFBVSxHQUxGO0FBTVIsdUJBQWUsc0JBTlA7QUFPUixjQUFNLG9CQVBFO0FBUVIsa0JBQVUsZUFSRjtBQVNSLG1CQUFXO0FBVEg7QUFuQ0MsQ0FBakI7Ozs7O0FDQUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsWUFBUTtBQUNKLG9CQUFZLGlCQURSO0FBRUosZUFBTywwQ0FGSDtBQUdKLDZoQkFISTtBQVFKLHdEQVJJO0FBU0osb1lBVEk7QUFrQkosb0JBQVksYUFsQlI7QUFtQkosMkJBQW1CLGVBbkJmO0FBb0JKLHdCQUFnQixrQkFw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Q0FBa0IsZ0JBQWdCLElBQWhCLENBQWxCLENBQU47QUFBQSxhQUZOLEVBR1IsUUFIUSxDQUdDO0FBQUEsdUJBQWlCLEtBQUssR0FBTCxDQUFTLElBQVQsQ0FBYyxLQUFkLEVBQXFCLGFBQXJCLENBQWpCO0FBQUEsYUFIRCxFQUlSLE9BSlEsQ0FJQTtBQUFBLHVCQUFNLEtBQUssR0FBTCxDQUFTLE1BQVQsRUFBTjtBQUFBLGFBSkEsQ0FBUjtBQUFBLFNBRDZCLENBQXJCLEVBTWYsT0FOZSxDQU1QO0FBQUEsbUJBQUssUUFBUSxPQUFSLENBQWdCLE9BQWhCLENBQUw7QUFBQSxTQU5PLENBQU47QUFBQSxLQUFYLEVBTTBDLENBTjFDO0FBT0g7O0FBRUQsU0FBUyxlQUFULENBQXlCLE9BQXpCLEVBQWtDLG1CQUFsQyxFQUF1RDtBQUNuRCxXQUFPLHdCQUF3QixPQUF4QixJQUFtQyx3QkFBd0IsWUFBVSxtQkFBVixZQUF4QixDQUExQztBQUNIOztBQUVELFNBQVMsY0FBVCxDQUF3QixRQUF4QixFQUFrQztBQUM5QixRQUFNLFVBQVUsRUFBRSxNQUFGLENBQWhCO0FBQ0EsUUFBTSxlQUFlLFFBQVEsTUFBUixLQUFtQixFQUF4QztBQUNBLFFBQU0sU0FBUyxlQUFlLFFBQVEsU0FBUixFQUE5QjtBQUNBLFFBQU0sTUFBTSxTQUFTLE1BQVQsR0FBa0IsR0FBbEIsR0FBd0IsU0FBUyxNQUFULEVBQXBDO0FBQ0EsUUFBSSxTQUFTLEdBQWIsRUFBa0I7QUFDZCxnQkFBUSxTQUFSLENBQWtCLE1BQU0sWUFBeEI7QUFDSDtBQUNKIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGVkaXRvcjoge1xuICAgICAgICBtYXRoRWRpdG9yOiAnTWF0aWtrYWVkaXRvcmknLFxuICAgICAgICB0aXRsZTogJ0thYXZhZWRpdG9yaW4gZW5zaW1tw6RpbmVuIGtlaGl0eXN2ZXJzaW8nLFxuICAgICAgICBkZXNjcmlwdGlvbjogYDx1bD5cbjxsaT5FZGl0b3JpIHRvaW1paSBwYXJoYWl0ZW4gRmlyZWZveC1zZWxhaW1lbGxhLjwvbGk+XG48bGk+4oCcTGlzw6TDpCBrYWF2YeKAnSAtbmFwaW4gYWx0YSBsw7Z5ZMOkdCB5bGVpc2ltcGnDpCBtYXRlbWF0aWlrYXNzYSwgZnlzaWlrYXNzYSBqYVxua2VtaWFzc2Ega8OkeXRldHTDpHZpw6QgbWVya2ludMO2asOkLiBMaXPDpGtzaSBlcmlrb2lzbWVya2tlasOkIHZvaSBrw6R5dHTDpMOkIGthYXZhbiBraXJqb2l0dGFtaXNlZW4uPC9saT5cbiA8bGk+S2Fhdm9qYSB2b2kgcmFrZW50YWFcbmtsaWtrYWFtYWxsYSB2YWxpa29uIG1lcmtpbnTDtmrDpCBqYS90YWkga2lyam9pdHRhbWFsbGEgTGFUZVhpYS48L2xpPlxuIDxsaT5FZGl0b3JpbiB2YXN0YXVza2VudHTDpMOkbiB2b2kga2lyam9pdHRhYSB0ZWtzdGnDpCBqYSBrYWF2b2phIHNla8OkXG5saXPDpHTDpCBrdXZpYS48L2xpPjwvdWw+YCxcbiAgICAgICAgc2hvcnRjdXRUaXRsZTogYFBpa2Fuw6RwcMOkaW52aW5ra2Vqw6RgLFxuICAgICAgICBzaG9ydGN1dHM6IGA8dGFibGU+PHRib2R5PlxuPHRyPjx0aD5MaWl0w6Qga3V2YSBsZWlrZXDDtnlkw6RsdMOkPC90aD48dGQ+Q3RybC1WPC90ZD48L3RyPlxuPHRyPjx0aD5LaXJqb2l0YSBrYWF2YTwvdGg+PHRkPkN0cmwtTCB0YWkgQ3RybC1JPC90ZD48L3RyPlxuPHRyPjx0aCBjb2xzcGFuPVwiMlwiPkthYXZhc3NhPC90aD48L3RyPlxuPHRyPjx0aD5KYWtvdmlpdmE8L3RoPjx0ZD4vPC90ZD48L3RyPlxuPHRyPjx0aD5LZXJ0b21lcmtraTwvdGg+PHRkPio8L3RkPjwvdHI+XG48dHI+PHRoPkVrc3BvbmVudHRpPC90aD48dGQ+XjwvdGQ+PC90cj5cbjx0cj48dGg+U3VsamUga2FhdmE8L3RoPjx0ZD5DdHJsLUVudGVyIHRhaSBFc2M8L3RkPjwvdHI+XG48dHI+PHRoPkxpc8Okw6Qga2FhdmEgc2V1cmFhdmFsbGUgcml2aWxsZTwvdGg+PHRkPkVudGVyPC90ZD48L3RyPlxuPC90Ym9keT5cbjwvdGFibGU+YCxcbiAgICAgICAgZm9ybWF0dGluZzogJ011b3RvaWx1JyxcbiAgICAgICAgc3BlY2lhbENoYXJhY3RlcnM6ICdFcmlrb2lzbWVya2l0JyxcbiAgICAgICAgaW5zZXJ0RXF1YXRpb246ICdMaXPDpMOkIGthYXZhJyxcbiAgICAgICAgY2xvc2U6ICdzdWxqZScsXG4gICAgICAgIHNhdmU6ICdUYWxsZW5uYScsXG4gICAgICAgIHVwZGF0ZWQ6ICdQw6Rpdml0ZXR0eScsXG4gICAgICAgIHNlbmRGZWVkYmFjazogJ0zDpGhldMOkIHBhbGF1dGV0dGEnLFxuICAgICAgICBsYW5nTGluazogJy9zdicsXG4gICAgICAgIGxhbmdMYWJlbDogJ1DDpSBzdmVuc2thJyxcbiAgICAgICAgYW5zd2VyVGl0bGU6ICdWYXN0YXVzJ1xuICAgIH0sXG4gICAgYW5ub3RhdGluZzoge1xuICAgICAgICBzZW5kRmVlZGJhY2s6ICdMw6RoZXTDpCBwYWxhdXRldHRhJyxcbiAgICAgICAgdXBkYXRlZDogJ1DDpGl2aXRldHR5JyxcbiAgICAgICAgbWF0aEVkaXRvcjogJ01hdGlra2FlZGl0b3JpJyxcbiAgICAgICAgdGl0bGU6ICdBcnZvc3RlbHUnLFxuICAgICAgICBiYWNrTGluazogJy8nLFxuICAgICAgICBiYWNrTGlua0xhYmVsOiAnUGFsYWEga2FhdmFlZGl0b3JpaW4nLFxuICAgICAgICBzYXZlOiAnVGFsbGVubmEgbWVya2lubsOkdCcsXG4gICAgICAgIGxhbmdMaW5rOiAnL3N2L2JlZG9tbmluZycsXG4gICAgICAgIGxhbmdMYWJlbDogJ1DDpSBzdmVuc2thJ1xuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGVkaXRvcjoge1xuICAgICAgICBtYXRoRWRpdG9yOiAnTWF0ZW1hdGlrZWRpdG9yJyxcbiAgICAgICAgdGl0bGU6ICdGb3JtZWxlZGl0b3JucyBmw7Zyc3RhIHV0dmVja2xpbmdzdmVyc2lvbicsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBgPHVsPlxuPGxpPkVkaXRvcm4gZnVuZ2VyYXIgYsOkc3QgbWVkIGJyb3dzZXJuIEZpcmVmb3guPC9saT5cbiA8bGk+VW5kZXIga25hcHBlbiDigJxMw6RnZyB0aWxsIGZvcm1lbOKAnSBoaXR0YXIgZHUgZGUgdmFubGlnYXN0ZSBiZXRlY2tuaW5nYXJuYSBzb20gYW52w6RuZHMgaSBtYXRlbWF0aWssIGZ5c2lrIG9jaCBrZW1pLiBEZXNzdXRvbSBrYW4gZHUgYW52w6RuZGEgc3BlY2lhbHRlY2tlbiBmw7ZyIGF0dCBza3JpdmEgZm9ybWxlci48L2xpPlxuPGxpPkRldCBnw6VyIGF0dCBrb25zdHJ1ZXJhIGZvcm1sZXIgZ2Vub20gYXR0IGtsaWNrYSBww6UgYmV0ZWNrbmluZ2FybmEgaSBtZW55ZXJuYSBvY2gvZWxsZXIgZ2Vub20gYXR0IHNrcml2YSBMYVRlWC48L2xpPlxuPGxpPkRldCBnw6VyIGbDtnJ1dG9tIGF0dCBza3JpdmEgdGV4dCBvY2ggZm9ybWxlciwgYXR0IG9ja3PDpSBhdHQgbMOkZ2dhIHRpbGwgYmlsZGVyIGkgc3ZhcnNmw6RsdGV0LjwvbGk+PC91bD5gLFxuICAgICAgICBzaG9ydGN1dFRpdGxlOiBgVGlwcyBww6UgdGFuZ2VudGtvbWJpbmF0aW9uZXJgLFxuICAgICAgICBzaG9ydGN1dHM6IGA8dGFibGU+PHRib2R5PlxuPHRyPjx0aD5Mw6RnZyB0aWxsIGVuIGJpbGQgZnLDpW4gdXJrbGlwcGV0PC90aD48dGQ+Q3RybC1WPC90ZD48L3RyPlxuPHRyPjx0aD5Ta3JpdiBlbiBmb3JtZWw8L3RoPjx0ZD5DdHJsLUwgLyBDdHJsLUk8L3RkPjwvdHI+XG48dHI+PHRoIGNvbHNwYW49XCIyXCI+SSBmb3JtZWxuIDwvdGg+PC90cj5cbjx0cj48dGg+QnLDpWtzdHJlY2s8L3RoPjx0ZD4vPC90ZD48L3RyPlxuPHRyPjx0aD5NdWx0aXBsaWthdGlvbnN0ZWNrZW48L3RoPjx0ZD4qPC90ZD48L3RyPlxuPHRyPjx0aD5TdMOkbmcgZm9ybWVsbjwvdGg+PHRkPkN0cmwtRW50ZXIgZWxsZXIgRXNjPC90ZD48L3RyPlxuPC90Ym9keT5cbjwvdGFibGU+YCxcbiAgICAgICAgZm9ybWF0dGluZzogJ0Zvcm1hdGVyaW5nJyxcbiAgICAgICAgc3BlY2lhbENoYXJhY3RlcnM6ICdTcGVjaWFsdGVja2VuJyxcbiAgICAgICAgaW5zZXJ0RXF1YXRpb246ICdMw6RnZyB0aWxsIGZvcm1lbCcsXG4gICAgICAgIGNsb3NlOiAnc3TDpG5nJyxcbiAgICAgICAgc2F2ZTogJ1NwYXJhJyxcbiAgICAgICAgdXBkYXRlZDogJ1VwcGRhdGVyYWQnLFxuICAgICAgICBzZW5kRmVlZGJhY2s6ICdTa2lja2EgZmVlZGJhY2snLFxuICAgICAgICBsYW5nTGluazogJy8nLFxuICAgICAgICBsYW5nTGFiZWw6ICdTdW9tZWtzaScsXG4gICAgICAgIGFuc3dlclRpdGxlOiAnU3ZhcidcbiAgICB9LFxuICAgIGFubm90YXRpbmc6IHtcbiAgICAgICAgc2VuZEZlZWRiYWNrOiAnU2tpY2thIHJlc3BvbnMnLFxuICAgICAgICB1cGRhdGVkOiAnVXBwZGF0ZXJhZCcsXG4gICAgICAgIG1hdGhFZGl0b3I6ICdNYXRlbWF0aWtlZGl0b3InLFxuICAgICAgICB0aXRsZTogJ0JlZMO2bW5pbmcnLFxuICAgICAgICBiYWNrTGluazogJy9zdicsXG4gICAgICAgIGJhY2tMaW5rTGFiZWw6ICdNYXRlbWF0aWtlZGl0b3InLFxuICAgICAgICBzYXZlOiAnU3BhcmEgYW50ZWNrbmluZ2FyJyxcbiAgICAgICAgbGFuZ0xpbms6ICcvdGFya2lzdHVzJyxcbiAgICAgICAgbGFuZ0xhYmVsOiAnU3VvbWVrc2knXG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gICAge2FjdGlvbjogJ1xcXFxzcXJ0JywgbGFiZWw6ICdcXFxcc3FydHtYfSd9LFxuICAgIHthY3Rpb246ICdeJywgbGFiZWw6ICd4XntYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcZnJhYycsIGxhYmVsOiAnXFxcXGZyYWN7WH17WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGludCcsIGxhYmVsOiAnXFxcXGludF97WH1ee1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxsaW1fJywgbGFiZWw6ICdcXFxcbGltX3tYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcbGltX3t4XFxcXHJpZ2h0YXJyb3dcXFxcaW5mdHl9JywgbGFiZWw6ICdcXFxcbGltX3t4XFxcXHJpZ2h0YXJyb3dcXFxcaW5mdHl9JywgdXNlV3JpdGU6dHJ1ZX0sXG4gICAge2FjdGlvbjogJ1xcXFxvdmVycmlnaHRhcnJvdycsIGxhYmVsOiAnXFxcXG92ZXJyaWdodGFycm93e1h9J30sXG4gICAge2FjdGlvbjogJ18nLCBsYWJlbDogJ3hfWCd9LFxuICAgIHthY3Rpb246ICdcXFxcbnRocm9vdCcsIGxhYmVsOiAnXFxcXHNxcnRbWF17WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXHN1bScsIGxhYmVsOiAnXFxcXHN1bV97WH1ee1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxiaW5vbScsIGxhYmVsOiAnXFxcXGJpbm9te1h9e1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxzaW4nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGNvcyd9LFxuICAgIHthY3Rpb246ICdcXFxcdGFuJ30sXG4gICAge2FjdGlvbjogJ1xcXFx2ZWMnLCBsYWJlbDogJ1xcXFx2ZWN7WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGJhcicsIGxhYmVsOiAnXFxcXGJhcntYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcmxpbmV7XFxcXHRleHR7aX19JywgdXNlV3JpdGU6IHRydWV9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcmxpbmV7XFxcXHRleHR7an19JywgdXNlV3JpdGU6IHRydWV9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcmxpbmV7XFxcXHRleHR7a319JywgdXNlV3JpdGU6IHRydWV9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcmxlZnRhcnJvdycsIGxhYmVsOiAnXFxcXG92ZXJsZWZ0YXJyb3d7WH0nfSxcbiAgICB7YWN0aW9uOiAnfCcsIGxhYmVsOiAnfFh8J30sXG4gICAge2FjdGlvbjogJygnLCBsYWJlbDogJyhYKSd9LFxuICAgIHthY3Rpb246ICdfeyB9XnsgfSAnLCBsYWJlbDogJ197WH1ee1h9WCcsIHVzZVdyaXRlOiB0cnVlfSxcbiAgICB7YWN0aW9uOiAnXFxcXHRleHQnLCBsYWJlbDogJ1xcXFx0ZXh0e1R9J30sXG5dXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoRUFBUUFQUUFBUC8vL3dBQUFQRHc4SXFLaXVEZzRFWkdSbnA2ZWdBQUFGaFlXQ1FrSkt5c3JMNit2aFFVRkp5Y25BUUVCRFkyTm1ob2FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFDSCtHa055WldGMFpXUWdkMmwwYUNCaGFtRjRiRzloWkM1cGJtWnZBQ0g1QkFBS0FBQUFJZjhMVGtWVVUwTkJVRVV5TGpBREFRQUFBQ3dBQUFBQUVBQVFBQUFGZHlBZ0FnSUpJZVdvQWtSQ0NNZEJrS3RJSEluZ3lNS3NFclBCWWJBRHBrU0N3aERtUUNCZXRoUkI2Vmo0a0ZDa1FQRzRJbFdEZ3JOUkl3bk80VUtCWER1ZnpRdkRNYW9TREJnRmI4ODZNaVFhZGdOQUJBb2tmQ3d6QkE4TENnMEVnbDhqQWdnR0FBMWtCSUExQkFZemx5SUxjelVMQzJVaEFDSDVCQUFLQUFFQUxBQUFBQUFRQUJBQUFBVjJJQ0FDQW1sQVpUbU9SRUVJeVVFUWpMS0t4UEhBRGhFdnF4bGdjR2drR0kxRFlTVkFJQVdNeCtsd1NLa0lDSjBRc0hpOVJnS0J3blZUaVJRUWd3RjRJNFVGRFFRRXdpNi8zWVNHV1JSbWpoRUVUQUpmSWdNRkNuQUtNMEtEVjRFRUVBUUxpRjE4VEFZTlhEYVNlM3g2bWppZE4xczNJUUFoK1FRQUNnQUNBQ3dBQUFBQUVBQVFBQUFGZUNBZ0FnTFpER1U1amdSRUNFVWlDSSt5aW9TRHdESnlMS3NYb0hGUXhCU0hBb0FBRkJocXRNSmc4RGdRQmdmckVzSkFFQWc0WWhaSUVpd2dLdEhpTUJndHBnM3diVVpYR083a09iMU1VS1JGTXlzQ0NoQW9nZ0pDSWcwR0MyYU5lNGdxUWxkZkw0bC9BZzFBWHlTSmduNUxjb0UzUVhJM0lRQWgrUVFBQ2dBREFDd0FBQUFBRUFBUUFBQUZkaUFnQWdMWk5HVTVqb1FoQ0VqeElzc3FFbzhiQzlCUmp5OUFnN0dJTFE0UUVvRTBnQkFFQmNPcGNCQTBEb3hTSy9lOExSSUhuK2kxY0swSXlLZGcwVkFvbGpZSWcrR2duUnJ3VlMvOElBa0lDeW9zQklRcEJBTW9LeTlkSW14UGhTK0dLa0Zya1grVGlndExsSXlLWFVGK05qYWdOaUVBSWZrRUFBb0FCQUFzQUFBQUFCQUFFQUFBQld3Z0lBSUNhUmhsT1k0RUlnakg4UjdMS2hLSEd3c012YjRBQXkzV09EQklCQktDc1lBOVRqdWhETkRLRVZTRVJlelFFTDBXcmhYdWNSVVFHdWlrN2JGbG5nenFWVzlMTWw5WFd2TGRqRmFKdERGcVoxY0VaVUIwZFVndkwzZGdQNFdKWm40amtvbVdOcFNUSXlFQUlma0VBQW9BQlFBc0FBQUFBQkFBRUFBQUJYNGdJQUlDdVN4bE9ZNkNJZ2lEOFJyRUtncUdPd3h3VXJNbEFvU3dJekFHcEpwZ29TREFHaWZEWTVrb3BCWURsRXBBUUJ3ZXZ4ZkJ0UklVR2k4eHdXa0ROQkNJd21DOVZxMGFpUVFEUXVLK1ZnUVBEWFY5aENKakJ3Y0ZZVTVwTHd3SFhRY01LU21OTFFjSUFFeGxiSDhKQnd0dGFYMEFCQWNOYldWYkt5RUFJZmtFQUFvQUJnQXNBQUFBQUJBQUVBQUFCWGtnSUFJQ1NSQmxPWTdDSWdoTjh6YkVLc0tvSWpkRnpaYUVnVUJIS0NoTUp0UndjV3BBV29XbmlmbTZFU0FNaE84bFFLMEVFQVYzckZvcElCQ0VjR3dES0FxUGg0SFVyWTRJQ0hIMWRTb1RGZ2NIVWlaakJoQUpCMkFIRHlrcEtBd0hBd2R6ZjE5S2tBU0lQbDljRGdjbkRrZHROd2lNSkNzaEFDSDVCQUFLQUFjQUxBQUFBQUFRQUJBQUFBVjNJQ0FDQWtrUVpUbU9BaW9zaXlBb3hDcStLUHhDTlZzU01SZ0JzaUNsV3JMVFNXRm9JUVpIbDZwbGVCaDZzdXhLTUlobHZ6YkF3a0JXZkZXckJRVHhOTHEyUkcyeWhTVWtEczJiNjNBWURBb0pYQWNGUndBRGVBa0pEWDBBUUNzRWZBUU1EQUlQQnowckNnY3hreTBKUldFMUFtd3BLeUVBSWZrRUFBb0FDQUFzQUFBQUFCQUFFQUFBQlhrZ0lBSUNLWnprcUo0blFaeExxWkt2NE5xTkxLSzIvUTRFazRsRlhDaHNnNXlwSmpzMUlJM2dFRFVTUkluRUdZQXc2QjZ6TTRKaHJEQXRFb3NWa0xVdEhBN1JIYUhBR0pRRWpzT0RjRWcwRkJBRlZna1FKUTFwQXdjRER3OEtjRnRTSW53SkFvd0NDQTZSSXdxWkFna1BOZ1ZwV25kamR5b2hBQ0g1QkFBS0FBa0FMQUFBQUFBUUFCQUFBQVY1SUNBQ0FpbWM1S2llTEV1VUt2bTJ4QUtMcURDZkMyR2FPOWVMMExBQldUaUJZbUEwNlc2a0hndkNxRUppQUlKaXUzZ2N2Z1Vzc2NIVUVSbStrYUN4eXhhK3pSUGswU2dKRWdmSXZiQWRJQVFMQ0FZbENqNERCdzBJQlFzTUNqSXFCQWNQQW9vQ0JnOXBLZ3NKTHdVRk9oQ1pLeVFEQTNZcUlRQWgrUVFBQ2dBS0FDd0FBQUFBRUFBUUFBQUZkU0FnQWdJcG5PU29ubXhicWlUaENySktFSEZibzhKeERET1pZRkZiK0E0MUU0SDRPaGtPaXBYd0JFbFlJVERBY2tGRU9CZ01RM2Fya01rVUJkeElVR1pwRWI3a2FRQlJsQVNQZzBGUVFIQWJFRU1HRFNWRUFBMVFCaEFFRDFFME5nd0ZBb29DRFdsamFRSVFDRTVxTUhjTmhDa2pJUUFoK1FRQUNnQUxBQ3dBQUFBQUVBQVFBQUFGZVNBZ0FnSXBuT1NvTGd4eHZxZ0tMRWNDQzY1S0VBQnlLSzhjU3BBNERBaUhRL0RrS2hHS2g0WkN0Q3laR282RjZpWVlQQXFGZ1l5MDJ4a1NhTEVNVjM0dEVMeVJZTkVzQ1F5SGx2V2tHQ3pzUGdNQ0VBWTdDZzA0VWs0OExBc0RoUkE4TVZRUEVGMEdBZ3FZWXdTUmx5Y05jV3NrQ2tBcEl5RUFPd0FBQUFBQUFBQUFBRHhpY2lBdlBnbzhZajVYWVhKdWFXNW5QQzlpUGpvZ0lHMTVjM0ZzWDNGMVpYSjVLQ2tnV3p4aElHaHlaV1k5SjJaMWJtTjBhVzl1TG0xNWMzRnNMWEYxWlhKNUp6NW1kVzVqZEdsdmJpNXRlWE54YkMxeGRXVnllVHd2WVQ1ZE9pQkRZVzRuZENCamIyNXVaV04wSUhSdklHeHZZMkZzSUUxNVUxRk1JSE5sY25abGNpQjBhSEp2ZFdkb0lITnZZMnRsZENBbkwzWmhjaTl5ZFc0dmJYbHpjV3hrTDIxNWMzRnNaQzV6YjJOckp5QW9NaWtnYVc0Z1BHSStMMmh2YldVdllXcGhlR3h2WVdRdmQzZDNMMnhwWW5KaGFYSnBaWE12WTJ4aGMzTXViWGx6Y1d3dWNHaHdQQzlpUGlCdmJpQnNhVzVsSUR4aVBqWTRQQzlpUGp4aWNpQXZQZ284WW5JZ0x6NEtQR0krVjJGeWJtbHVaend2WWo0NklDQnRlWE54YkY5eGRXVnllU2dwSUZzOFlTQm9jbVZtUFNkbWRXNWpkR2x2Ymk1dGVYTnhiQzF4ZFdWeWVTYytablZ1WTNScGIyNHViWGx6Y1d3dGNYVmxjbms4TDJFK1hUb2dRU0JzYVc1cklIUnZJSFJvWlNCelpYSjJaWElnWTI5MWJHUWdibTkwSUdKbElHVnpkR0ZpYkdsemFHVmtJR2x1SUR4aVBpOW9iMjFsTDJGcVlYaHNiMkZrTDNkM2R5OXNhV0p5WVdseWFXVnpMMk5zWVhOekxtMTVjM0ZzTG5Cb2NEd3ZZajRnYjI0Z2JHbHVaU0E4WWo0Mk9Ed3ZZajQ4WW5JZ0x6NEtQR0p5SUM4K0NqeGlQbGRoY201cGJtYzhMMkkrT2lBZ2JYbHpjV3hmY1hWbGNua29LU0JiUEdFZ2FISmxaajBuWm5WdVkzUnBiMjR1YlhsemNXd3RjWFZsY25rblBtWjFibU4wYVc5dUxtMTVjM0ZzTFhGMVpYSjVQQzloUGwwNklFTmhiaWQwSUdOdmJtNWxZM1FnZEc4Z2JHOWpZV3dnVFhsVFVVd2djMlZ5ZG1WeUlIUm9jbTkxWjJnZ2MyOWphMlYwSUNjdmRtRnlMM0oxYmk5dGVYTnhiR1F2YlhsemNXeGtMbk52WTJzbklDZ3lLU0JwYmlBOFlqNHZhRzl0WlM5aGFtRjRiRzloWkM5M2QzY3ZiR2xpY21GcGNtbGxjeTlqYkdGemN5NXRlWE54YkM1d2FIQThMMkkrSUc5dUlHeHBibVVnUEdJK05qZzhMMkkrUEdKeUlDOCtDanhpY2lBdlBnbzhZajVYWVhKdWFXNW5QQzlpUGpvZ0lHMTVjM0ZzWDNGMVpYSjVLQ2tnV3p4aElHaHlaV1k5SjJaMWJtTjBhVzl1TG0xNWMzRnNMWEYxWlhKNUp6NW1kVzVqZEdsdmJpNXRlWE54YkMxeGRXVnllVHd2WVQ1ZE9pQkJJR3hwYm1zZ2RHOGdkR2hsSUhObGNuWmxjaUJqYjNWc1pDQnViM1FnWW1VZ1pYTjBZV0pzYVhOb1pXUWdhVzRnUEdJK0wyaHZiV1V2WVdwaGVHeHZZV1F2ZDNkM0wyeHBZbkpoYVhKcFpYTXZZMnhoYzNNdWJYbHpjV3d1Y0dod1BDOWlQaUJ2YmlCc2FXNWxJRHhpUGpZNFBDOWlQanhpY2lBdlBnbzhZbklnTHo0S1BHSStWMkZ5Ym1sdVp6d3ZZajQ2SUNCdGVYTnhiRjl4ZFdWeWVTZ3BJRnM4WVNCb2NtVm1QU2RtZFc1amRHbHZiaTV0ZVhOeGJDMXhkV1Z5ZVNjK1puVnVZM1JwYjI0dWJYbHpjV3d0Y1hWbGNuazhMMkUrWFRvZ1EyRnVKM1FnWTI5dWJtVmpkQ0IwYnlCc2IyTmhiQ0JOZVZOUlRDQnpaWEoyWlhJZ2RHaHliM1ZuYUNCemIyTnJaWFFnSnk5MllYSXZjblZ1TDIxNWMzRnNaQzl0ZVhOeGJHUXVjMjlqYXljZ0tESXBJR2x1SUR4aVBpOW9iMjFsTDJGcVlYaHNiMkZrTDNkM2R5OXNhV0p5WVdseWFXVnpMMk5zWVhOekxtMTVjM0ZzTG5Cb2NEd3ZZajRnYjI0Z2JHbHVaU0E4WWo0Mk9Ed3ZZajQ4WW5JZ0x6NEtQR0p5SUM4K0NqeGlQbGRoY201cGJtYzhMMkkrT2lBZ2JYbHpjV3hmY1hWbGNua29LU0JiUEdFZ2FISmxaajBuWm5WdVkzUnBiMjR1YlhsemNXd3RjWFZsY25rblBtWjFibU4wYVc5dUxtMTVjM0ZzTFhGMVpYSjVQQzloUGwwNklFRWdiR2x1YXlCMGJ5QjBhR1VnYzJWeWRtVnlJR052ZFd4a0lHNXZkQ0JpWlNCbGMzUmhZbXhwYzJobFpDQnBiaUE4WWo0dmFHOXRaUzloYW1GNGJHOWhaQzkzZDNjdmJHbGljbUZwY21sbGN5OWpiR0Z6Y3k1dGVYTnhiQzV3YUhBOEwySStJRzl1SUd4cGJtVWdQR0krTmpnOEwySStQR0p5SUM4K0NnPT1cIlxuIiwiY29uc3QgdSA9IHJlcXVpcmUoJy4vdXRpbCcpXG5cbmNvbnN0IE1RID0gTWF0aFF1aWxsLmdldEludGVyZmFjZSgyKVxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdH1cblxuZnVuY3Rpb24gaW5pdCgkb3V0ZXJQbGFjZWhvbGRlciwgZm9jdXMsIG9uTWF0aEZvY3VzQ2hhbmdlZCkge1xuICAgIGNvbnN0ICRtYXRoRWRpdG9yQ29udGFpbmVyID0gJChgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtYXRoLWVkaXRvclwiIGRhdGEtanM9XCJtYXRoRWRpdG9yXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWF0aC1lZGl0b3ItZXF1YXRpb24tZmllbGRcIiBkYXRhLWpzPVwiZXF1YXRpb25GaWVsZFwiPjwvZGl2PlxuICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwibWF0aC1lZGl0b3ItbGF0ZXgtZmllbGRcIiBkYXRhLWpzPVwibGF0ZXhGaWVsZFwiIHBsYWNlaG9sZGVyPVwiTGFUZXhcIj48L3RleHRhcmVhPlxuICAgICAgICA8L2Rpdj5gKVxuXG4gICAgJG91dGVyUGxhY2Vob2xkZXIuYXBwZW5kKCRtYXRoRWRpdG9yQ29udGFpbmVyKVxuICAgIGNvbnN0ICRsYXRleEZpZWxkID0gJG1hdGhFZGl0b3JDb250YWluZXIuZmluZCgnW2RhdGEtanM9XCJsYXRleEZpZWxkXCJdJylcbiAgICBjb25zdCAkZXF1YXRpb25GaWVsZCA9ICRtYXRoRWRpdG9yQ29udGFpbmVyLmZpbmQoJ1tkYXRhLWpzPVwiZXF1YXRpb25GaWVsZFwiXScpXG4gICAgbGV0IG1xRWRpdFRpbWVvdXRcbiAgICBsZXQgdmlzaWJsZSA9IGZhbHNlXG4gICAgbGV0IGZvY3VzQ2hhbmdlZCA9IG51bGxcbiAgICAvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHMsSlNVbnVzZWRMb2NhbFN5bWJvbHNcbiAgICBjb25zdCBtcUluc3RhbmNlID0gTVEuTWF0aEZpZWxkKCRlcXVhdGlvbkZpZWxkLmdldCgwKSwge1xuICAgICAgICBoYW5kbGVyczoge1xuICAgICAgICAgICAgZWRpdDogb25NcUVkaXQsXG4gICAgICAgICAgICBlbnRlcjogZmllbGQgPT4ge1xuICAgICAgICAgICAgICAgIGNsb3NlTWF0aEVkaXRvcih0cnVlKVxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gaW5zZXJ0TmV3RXF1YXRpb24oJzxicj4nKSwgMilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG4gICAgJGVxdWF0aW9uRmllbGRcbiAgICAgICAgLm9uKCdrZXl1cCcsICcubXEtdGV4dGFyZWEgdGV4dGFyZWEnLCBvbk1xRWRpdClcbiAgICAgICAgLm9uKCdmb2N1cyBibHVyJywgJy5tcS10ZXh0YXJlYSB0ZXh0YXJlYScsIGUgPT4ge1xuICAgICAgICAgICAgZm9jdXMuZXF1YXRpb25GaWVsZCA9IGUudHlwZSAhPT0gJ2JsdXInICYmIGUudHlwZSAhPT0gJ2ZvY3Vzb3V0J1xuICAgICAgICAgICAgb25Gb2N1c0NoYW5nZWQoKVxuICAgICAgICB9KVxuXG4gICAgJGxhdGV4RmllbGRcbiAgICAgICAgLm9uKCdpbnB1dCBwYXN0ZScsIG9uTGF0ZXhVcGRhdGUpXG4gICAgICAgIC5vbignZm9jdXMgYmx1cicsIGUgPT4ge1xuICAgICAgICAgICAgZm9jdXMubGF0ZXhGaWVsZCA9IGUudHlwZSAhPT0gJ2JsdXInXG4gICAgICAgICAgICBvbkZvY3VzQ2hhbmdlZCgpXG4gICAgICAgIH0pXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpbnNlcnROZXdFcXVhdGlvbixcbiAgICAgICAgaW5zZXJ0TWF0aCxcbiAgICAgICAgY2xvc2VNYXRoRWRpdG9yLFxuICAgICAgICBvcGVuTWF0aEVkaXRvcixcbiAgICAgICAgb25Gb2N1c0NoYW5nZWQsXG4gICAgICAgIGlzVmlzaWJsZVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzVmlzaWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIHZpc2libGVcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1xRWRpdCgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KG1xRWRpdFRpbWVvdXQpXG4gICAgICAgIG1xRWRpdFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmIChmb2N1cy5sYXRleEZpZWxkKVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgY29uc3QgbGF0ZXggPSBtcUluc3RhbmNlLmxhdGV4KClcbiAgICAgICAgICAgICRsYXRleEZpZWxkLnZhbChsYXRleClcbiAgICAgICAgICAgIHVwZGF0ZU1hdGhJbWcoJG1hdGhFZGl0b3JDb250YWluZXIucHJldigpLCBsYXRleClcbiAgICAgICAgfSwgMTAwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTGF0ZXhVcGRhdGUoKSB7XG4gICAgICAgIHVwZGF0ZU1hdGhJbWcoJG1hdGhFZGl0b3JDb250YWluZXIucHJldigpLCAkbGF0ZXhGaWVsZC52YWwoKSlcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBtcUluc3RhbmNlLmxhdGV4KCRsYXRleEZpZWxkLnZhbCgpKSwgMSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkZvY3VzQ2hhbmdlZCgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGZvY3VzQ2hhbmdlZClcbiAgICAgICAgZm9jdXNDaGFuZ2VkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWZvY3VzLmxhdGV4RmllbGQgJiYgIWZvY3VzLmVxdWF0aW9uRmllbGQpIGNsb3NlTWF0aEVkaXRvcigpXG4gICAgICAgICAgICBvbk1hdGhGb2N1c0NoYW5nZWQoKVxuICAgICAgICB9LCAwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc2VydE5ld0VxdWF0aW9uKG9wdGlvbmFsTWFya3VwID0gJycpIHtcbiAgICAgICAgd2luZG93LmRvY3VtZW50LmV4ZWNDb21tYW5kKCdpbnNlcnRIVE1MJywgZmFsc2UsIG9wdGlvbmFsTWFya3VwICsgJzxpbWcgZGF0YS1qcz1cIm5ld1wiIGFsdD1cIlwiIHN0eWxlPVwiZGlzcGxheTogbm9uZVwiLz4nKVxuICAgICAgICBzaG93TWF0aEVkaXRvcigkKCdbZGF0YS1qcz1cIm5ld1wiXScpLnJlbW92ZUF0dHIoJ2RhdGEtanMnKSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvcGVuTWF0aEVkaXRvcigkaW1nKSB7XG4gICAgICAgIGlmICh2aXNpYmxlKSBjbG9zZU1hdGhFZGl0b3IoKVxuICAgICAgICB1LnNldEN1cnNvckFmdGVyKCRpbWcpXG4gICAgICAgIHNob3dNYXRoRWRpdG9yKCRpbWcpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2hvd01hdGhFZGl0b3IoJGltZykge1xuICAgICAgICAkaW1nLmhpZGUoKVxuICAgICAgICAkaW1nLmFmdGVyKCRtYXRoRWRpdG9yQ29udGFpbmVyKVxuICAgICAgICB2aXNpYmxlID0gdHJ1ZVxuICAgICAgICB0b2dnbGVNYXRoVG9vbGJhcih0cnVlKVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IG1xSW5zdGFuY2UuZm9jdXMoKSwgMClcbiAgICAgICAgJGxhdGV4RmllbGQudmFsKCRpbWcucHJvcCgnYWx0JykpXG4gICAgICAgIG9uTGF0ZXhVcGRhdGUoKVxuICAgICAgICB1LnNjcm9sbEludG9WaWV3KCRtYXRoRWRpdG9yQ29udGFpbmVyKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc2VydE1hdGgoc3ltYm9sLCBhbHRlcm5hdGl2ZVN5bWJvbCwgdXNlV3JpdGUpIHtcbiAgICAgICAgaWYgKGZvY3VzLmxhdGV4RmllbGQpIHtcbiAgICAgICAgICAgIHUuaW5zZXJ0VG9UZXh0QXJlYUF0Q3Vyc29yKCRsYXRleEZpZWxkLmdldCgwKSwgYWx0ZXJuYXRpdmVTeW1ib2wgfHwgc3ltYm9sKVxuICAgICAgICAgICAgb25MYXRleFVwZGF0ZSgpXG4gICAgICAgIH0gZWxzZSBpZiAoZm9jdXMuZXF1YXRpb25GaWVsZCkge1xuICAgICAgICAgICAgaWYgKHVzZVdyaXRlKSB7XG4gICAgICAgICAgICAgICAgbXFJbnN0YW5jZS53cml0ZShzeW1ib2wpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1xSW5zdGFuY2UudHlwZWRUZXh0KHN5bWJvbClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzeW1ib2wuc3RhcnRzV2l0aCgnXFxcXCcpKSBtcUluc3RhbmNlLmtleXN0cm9rZSgnVGFiJylcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gbXFJbnN0YW5jZS5mb2N1cygpLCAwKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTWF0aEltZygkaW1nLCBsYXRleCkge1xuICAgICAgICAkaW1nLnByb3Aoe1xuICAgICAgICAgICAgc3JjOiAnL21hdGguc3ZnP2xhdGV4PScgKyBlbmNvZGVVUklDb21wb25lbnQobGF0ZXgpLFxuICAgICAgICAgICAgYWx0OiBsYXRleFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlTWF0aEVkaXRvcihzZXRGb2N1c0FmdGVyQ2xvc2UgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCAkY3VycmVudEVkaXRvciA9ICRtYXRoRWRpdG9yQ29udGFpbmVyLmNsb3Nlc3QoJ1tkYXRhLWpzPVwiYW5zd2VyXCJdJylcbiAgICAgICAgY29uc3QgJGltZyA9ICRtYXRoRWRpdG9yQ29udGFpbmVyLnByZXYoKVxuICAgICAgICBpZiAoJGxhdGV4RmllbGQudmFsKCkudHJpbSgpID09PSAnJykge1xuICAgICAgICAgICAgJGltZy5yZW1vdmUoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGltZy5zaG93KClcbiAgICAgICAgICAgIHVwZGF0ZU1hdGhJbWcoJGltZywgJGxhdGV4RmllbGQudmFsKCkpXG4gICAgICAgIH1cblxuICAgICAgICB0b2dnbGVNYXRoVG9vbGJhcihmYWxzZSlcbiAgICAgICAgJG91dGVyUGxhY2Vob2xkZXIuYXBwZW5kKCRtYXRoRWRpdG9yQ29udGFpbmVyKVxuICAgICAgICB2aXNpYmxlID0gZmFsc2VcbiAgICAgICAgZm9jdXMubGF0ZXhGaWVsZCA9IGZhbHNlXG4gICAgICAgIGZvY3VzLmVxdWF0aW9uRmllbGQgPSBmYWxzZVxuICAgICAgICBpZiAoc2V0Rm9jdXNBZnRlckNsb3NlKSAkY3VycmVudEVkaXRvci5mb2N1cygpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlTWF0aFRvb2xiYXIoaXNWaXNpYmxlKSB7XG4gICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnbWF0aC1lZGl0b3ItZm9jdXMnLCBpc1Zpc2libGUpXG4gICAgfVxufVxuIiwiY29uc3QgdSA9IHJlcXVpcmUoJy4vdXRpbCcpXG5jb25zdCB0b29sYmFycyA9IHJlcXVpcmUoJy4vdG9vbGJhcnMnKVxuY29uc3QgbWF0aEVkaXRvciA9IHJlcXVpcmUoJy4vbWF0aC1lZGl0b3InKVxuY29uc3QgbG9jYWxlcyA9IHtcbiAgICBGSTogcmVxdWlyZSgnLi9GSScpLFxuICAgIFNWOiByZXF1aXJlKCcuL1NWJylcbn1cbmNvbnN0IGwgPSBsb2NhbGVzW3dpbmRvdy5sb2NhbGUgfHwgJ0ZJJ10uZWRpdG9yXG5jb25zdCBrZXlDb2RlcyA9IHtcbiAgICBFTlRFUjogMTMsXG4gICAgRVNDOiAyN1xufVxuY29uc3QgJG91dGVyUGxhY2Vob2xkZXIgPSAkKGA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci1oaWRkZW5cIiBkYXRhLWpzPVwib3V0ZXJQbGFjZWhvbGRlclwiPmApXG5jb25zdCBmb2N1cyA9IHtcbiAgICByaWNoVGV4dDogZmFsc2UsXG4gICAgbGF0ZXhGaWVsZDogZmFsc2UsXG4gICAgZXF1YXRpb25GaWVsZDogZmFsc2Vcbn1cbmxldCAkY3VycmVudEVkaXRvclxuY29uc3QgbWF0aCA9IG1hdGhFZGl0b3IuaW5pdCgkb3V0ZXJQbGFjZWhvbGRlciwgZm9jdXMsIG9uTWF0aEZvY3VzQ2hhbmdlZClcblxuZnVuY3Rpb24gb25NYXRoRm9jdXNDaGFuZ2VkKCkge1xuICAgIGlmIChyaWNoVGV4dEFuZE1hdGhCbHVyKCkpIG9uUmljaFRleHRFZGl0b3JCbHVyKClcbn1cblxuY29uc3QgeyR0b29sYmFyfSA9IHRvb2xiYXJzLmluaXQobWF0aCwgKCkgPT4gZm9jdXMucmljaFRleHQsIGwpXG5cbiQoJ2JvZHknKS5hcHBlbmQoJG91dGVyUGxhY2Vob2xkZXIsICR0b29sYmFyKVxuXG5tb2R1bGUuZXhwb3J0cy5tYWtlUmljaFRleHQgPSAoZWxlbWVudCwgb3B0aW9ucywgb25WYWx1ZUNoYW5nZWQgPSAoKSA9PiB7fSkgPT4ge1xuICAgIG9uVmFsdWVDaGFuZ2VkKHUuc2FuaXRpemVDb250ZW50KGVsZW1lbnQpKVxuICAgIGNvbnN0IHtcbiAgICAgICAgc2NyZWVuc2hvdDoge1xuICAgICAgICAgICAgc2F2ZXIsXG4gICAgICAgICAgICBsaW1pdFxuICAgICAgICB9XG4gICAgfSA9IG9wdGlvbnNcbiAgICBjb25zdCAkYW5zd2VyID0gJChlbGVtZW50KVxuICAgIGxldCBwYXN0ZUluUHJvZ3Jlc3MgPSBmYWxzZVxuXG4gICAgJGFuc3dlclxuICAgICAgICAuYXR0cih7XG4gICAgICAgICAgICAnY29udGVudGVkaXRhYmxlJzogJ3RydWUnLFxuICAgICAgICAgICAgJ3NwZWxsY2hlY2snOiAnZmFsc2UnLFxuICAgICAgICAgICAgJ2RhdGEtanMnOiAnYW5zd2VyJ1xuICAgICAgICB9KVxuICAgICAgICAuYWRkQ2xhc3MoJ3JpY2gtdGV4dC1lZGl0b3InKVxuICAgICAgICAub24oJ21vdXNlZG93bicsIHUuZXF1YXRpb25JbWFnZVNlbGVjdG9yLCBlID0+IHtcbiAgICAgICAgICAgIG9uUmljaFRleHRFZGl0b3JGb2N1cygkKGUudGFyZ2V0KS5jbG9zZXN0KCdbZGF0YS1qcz1cImFuc3dlclwiXScpKVxuICAgICAgICAgICAgbWF0aC5vcGVuTWF0aEVkaXRvcigkKGUudGFyZ2V0KSlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdrZXlkb3duJywgZSA9PiB7XG4gICAgICAgICAgICBpZiAodS5pc0N0cmxLZXkoZSwga2V5Q29kZXMuRU5URVIpIHx8IHUuaXNLZXkoZSwga2V5Q29kZXMuRVNDKSkgbWF0aC5jbG9zZU1hdGhFZGl0b3IodHJ1ZSlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdrZXlwcmVzcycsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKHUuaXNDdHJsS2V5KGUsICdsJykgfHwgdS5pc0N0cmxLZXkoZSwgJ2knKSkgbWF0aC5pbnNlcnROZXdFcXVhdGlvbigpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZm9jdXMgYmx1cicsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKG1hdGguaXNWaXNpYmxlKCkgJiYgZS50eXBlID09PSAnZm9jdXMnKSBtYXRoLmNsb3NlTWF0aEVkaXRvcigpXG4gICAgICAgICAgICBvblJpY2hUZXh0RWRpdG9yRm9jdXNDaGFuZ2VkKGUpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignaW5wdXQnLCBlID0+IHtcbiAgICAgICAgICAgIGlmICghcGFzdGVJblByb2dyZXNzKSBvblZhbHVlQ2hhbmdlZCh1LnNhbml0aXplQ29udGVudChlLmN1cnJlbnRUYXJnZXQpKVxuICAgICAgICB9KVxuICAgICAgICAub24oJ3Bhc3RlJywgZSA9PiB7XG4gICAgICAgICAgICBwYXN0ZUluUHJvZ3Jlc3MgPSB0cnVlXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHBhc3RlSW5Qcm9ncmVzcyA9IGZhbHNlLCAwKVxuXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJylcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIGNvbnN0IGNsaXBib2FyZERhdGEgPSBlLm9yaWdpbmFsRXZlbnQuY2xpcGJvYXJkRGF0YVxuICAgICAgICAgICAgY29uc3QgZmlsZSA9IGNsaXBib2FyZERhdGEuaXRlbXMgJiYgY2xpcGJvYXJkRGF0YS5pdGVtc1swXS5nZXRBc0ZpbGUoKVxuICAgICAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgICAgICBvblBhc3RlQmxvYihlLCBmaWxlLCBzYXZlciwgJChlLmN1cnJlbnRUYXJnZXQpLCBvblZhbHVlQ2hhbmdlZCwgbGltaXQpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNsaXBib2FyZERhdGFBc0h0bWwgPSBjbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQvaHRtbCcpXG4gICAgICAgICAgICAgICAgaWYgKGNsaXBib2FyZERhdGFBc0h0bWwpIG9uUGFzdGVIdG1sKGUsICQoZS5jdXJyZW50VGFyZ2V0KSwgY2xpcGJvYXJkRGF0YUFzSHRtbCwgbGltaXQsIHNhdmVyLCBvblZhbHVlQ2hhbmdlZClcbiAgICAgICAgICAgICAgICBlbHNlIG9uTGVnYWN5UGFzdGVJbWFnZSgkKGUuY3VycmVudFRhcmdldCksIHNhdmVyLCBsaW1pdCwgb25WYWx1ZUNoYW5nZWQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgc2V0VGltZW91dCgoKSA9PiBkb2N1bWVudC5leGVjQ29tbWFuZChcImVuYWJsZU9iamVjdFJlc2l6aW5nXCIsIGZhbHNlLCBmYWxzZSksIDApXG59XG5cbmZ1bmN0aW9uIG9uUGFzdGVCbG9iKGV2ZW50LCBmaWxlLCBzYXZlciwgJGFuc3dlciwgb25WYWx1ZUNoYW5nZWQsIGxpbWl0KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIGlmIChmaWxlLnR5cGUgPT09ICdpbWFnZS9wbmcnKSB7XG4gICAgICAgIGlmICh1LmV4aXN0aW5nU2NyZWVuc2hvdENvdW50KCRhbnN3ZXIpICsgMSA8PSBsaW1pdCkge1xuICAgICAgICAgICAgc2F2ZXIoe2RhdGE6IGZpbGUsIHR5cGU6IGZpbGUudHlwZSwgaWQ6IFN0cmluZyhuZXcgRGF0ZSgpLmdldFRpbWUoKSl9KS50aGVuKHNjcmVlbnNob3RVcmwgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGltZyA9IGA8aW1nIHNyYz1cIiR7c2NyZWVuc2hvdFVybH1cIi8+YFxuICAgICAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0SFRNTCcsIGZhbHNlLCBpbWcpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb25WYWx1ZUNoYW5nZWQodS5TQ1JFRU5TSE9UX0xJTUlUX0VSUk9SKCkpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIG9uUGFzdGVIdG1sKGV2ZW50LCAkYW5zd2VyLCBjbGlwYm9hcmREYXRhQXNIdG1sLCBsaW1pdCwgc2F2ZXIsIG9uVmFsdWVDaGFuZ2VkKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIGlmICh1LnRvdGFsSW1hZ2VDb3VudCgkYW5zd2VyLCBjbGlwYm9hcmREYXRhQXNIdG1sKSA8PSBsaW1pdCkge1xuICAgICAgICB3aW5kb3cuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydEhUTUwnLCBmYWxzZSwgdS5zYW5pdGl6ZShjbGlwYm9hcmREYXRhQXNIdG1sKSlcbiAgICAgICAgdS5wZXJzaXN0SW5saW5lSW1hZ2VzKCRjdXJyZW50RWRpdG9yLCBzYXZlciwgbGltaXQsIG9uVmFsdWVDaGFuZ2VkKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIG9uVmFsdWVDaGFuZ2VkKHUuU0NSRUVOU0hPVF9MSU1JVF9FUlJPUigpKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gb25MZWdhY3lQYXN0ZUltYWdlKCRlZGl0b3IsIHNhdmVyLCBsaW1pdCwgb25WYWx1ZUNoYW5nZWQpIHtcbiAgICB1LnBlcnNpc3RJbmxpbmVJbWFnZXMoJGVkaXRvciwgc2F2ZXIsIGxpbWl0LCBvblZhbHVlQ2hhbmdlZClcbn1cblxuZnVuY3Rpb24gdG9nZ2xlUmljaFRleHRUb29sYmFyKGlzVmlzaWJsZSkge1xuICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygncmljaC10ZXh0LWVkaXRvci1mb2N1cycsIGlzVmlzaWJsZSlcbn1cblxuZnVuY3Rpb24gb25SaWNoVGV4dEVkaXRvckZvY3VzKCRlbGVtZW50KSB7XG4gICAgJGN1cnJlbnRFZGl0b3IgPSAkZWxlbWVudFxuICAgIHRvZ2dsZVJpY2hUZXh0VG9vbGJhcih0cnVlKVxufVxuXG5mdW5jdGlvbiBvblJpY2hUZXh0RWRpdG9yQmx1cigpIHtcbiAgICB0b2dnbGVSaWNoVGV4dFRvb2xiYXIoZmFsc2UpXG4gICAgbWF0aC5jbG9zZU1hdGhFZGl0b3IoKVxuICAgIGZvY3VzLnJpY2hUZXh0ID0gZmFsc2Vcbn1cblxubGV0IHJpY2hUZXh0RWRpdG9yQmx1clRpbWVvdXRcblxuZnVuY3Rpb24gb25SaWNoVGV4dEVkaXRvckZvY3VzQ2hhbmdlZChlKSB7XG4gICAgZm9jdXMucmljaFRleHQgPSBlLnR5cGUgPT09ICdmb2N1cydcblxuICAgIGNsZWFyVGltZW91dChyaWNoVGV4dEVkaXRvckJsdXJUaW1lb3V0KVxuICAgIHJpY2hUZXh0RWRpdG9yQmx1clRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKHJpY2hUZXh0QW5kTWF0aEJsdXIoKSkgb25SaWNoVGV4dEVkaXRvckJsdXIoKVxuICAgICAgICBlbHNlIGlmIChmb2N1cy5yaWNoVGV4dCAmJiBtYXRoLmlzVmlzaWJsZSgpKSBtYXRoLmNsb3NlTWF0aEVkaXRvcigpXG4gICAgICAgIGVsc2Ugb25SaWNoVGV4dEVkaXRvckZvY3VzKCQoZS50YXJnZXQpKVxuICAgIH0sIDApXG59XG5cbmZ1bmN0aW9uIHJpY2hUZXh0QW5kTWF0aEJsdXIoKSB7XG4gICAgcmV0dXJuICFmb2N1cy5yaWNoVGV4dCAmJiAhbWF0aC5pc1Zpc2libGUoKSAmJiAhZm9jdXMubGF0ZXhGaWVsZCAmJiAhZm9jdXMuZXF1YXRpb25GaWVsZFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYWxsb3dlZFRhZ3M6IFtcbiAgICAgICAgJ2RpdicsXG4gICAgICAgICdpbWcnLFxuICAgICAgICAnYnInXG4gICAgXSxcbiAgICBhbGxvd2VkQXR0cmlidXRlczoge1xuICAgICAgICBpbWc6IFsnc3JjJywgJ2FsdCddXG4gICAgfSxcbiAgICBhbGxvd2VkU2NoZW1lczogWydkYXRhJ10sXG4gICAgZXhjbHVzaXZlRmlsdGVyOiBmcmFtZSA9PiBmcmFtZS5hdHRyaWJzWydkYXRhLWpzJ10gPT09ICdtYXRoRWRpdG9yJ1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gICAge1xuICAgICAgICBsYWJlbDogJ1BlcnVzJyxcbiAgICAgICAgY2hhcmFjdGVyczogW1xuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiaAnLCBsYXRleENvbW1hbmQ6ICdcXFxcbmVxJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiYgnLCBsYXRleENvbW1hbmQ6ICdcXFxcYXBwcm94JywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiaQnLCBsYXRleENvbW1hbmQ6ICdcXFxcbGVxJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiaUnLCBsYXRleENvbW1hbmQ6ICdcXFxcZ2VxJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfCsicsIGxhdGV4Q29tbWFuZDogJ14yJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfCsycsIGxhdGV4Q29tbWFuZDogJ14zJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfCvScsIGxhdGV4Q29tbWFuZDogJzEvMicsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oWTJywgbGF0ZXhDb21tYW5kOiAnMS8zJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfCsScsIGxhdGV4Q29tbWFuZDogJ1xcXFxwbScgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGxhYmVsOiAnQWxnZWJyYScsXG4gICAgICAgIGNoYXJhY3RlcnM6IFtcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oi8JywgbGF0ZXhDb21tYW5kOiAnXFxcXHNpbScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4omhJywgbGF0ZXhDb21tYW5kOiAnXFxcXGVxdWl2JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiaInIH0sIC8vIFxcbmVxdWl2IG9yIFxcbm90XFxlcXVpdlxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfCtycsIGxhdGV4Q29tbWFuZDogJ1xcXFxjZG90JywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfigKYnLCBsYXRleENvbW1hbmQ6ICdcXFxcZG90cycgfSwgLy8gbWF0cmlpc2lhbGdlYnJhP1xuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiJ4nLCBsYXRleENvbW1hbmQ6ICdcXFxcaW5mdHknLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbGFiZWw6ICdLcmVpa2thbGFpc2V0IGFha2tvc2V0JyxcbiAgICAgICAgY2hhcmFjdGVyczogW1xuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOsScsIGxhdGV4Q29tbWFuZDogJ1xcXFxhbHBoYScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzrInLCBsYXRleENvbW1hbmQ6ICdcXFxcYmV0YScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzrQnLCBsYXRleENvbW1hbmQ6ICdcXFxcZGVsdGEnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ861JywgbGF0ZXhDb21tYW5kOiAnXFxcXHZhcmVwc2lsb24nIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ863JywgbGF0ZXhDb21tYW5kOiAnXFxcXGV0YScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiCJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBhcnRpYWwnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ/CdnIQnLCBsYXRleENvbW1hbmQ6ICdcXFxcaW90YScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzrsnLCBsYXRleENvbW1hbmQ6ICdcXFxcbGFtYmRhJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfCtScsIGxhdGV4Q29tbWFuZDogJ1xcXFxtdScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnz4AnLCBsYXRleENvbW1hbmQ6ICdcXFxccGknLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8+DJywgbGF0ZXhDb21tYW5kOiAnXFxcXHNpZ21hJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfPhCcsIGxhdGV4Q29tbWFuZDogJ1xcXFx0YXUnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ9CkJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBoaScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnz4knLCBsYXRleENvbW1hbmQ6ICdcXFxcb21lZ2EnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86TJywgbGF0ZXhDb21tYW5kOiAnXFxcXEdhbW1hJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOlCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxEZWx0YScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzpgnLCBsYXRleENvbW1hbmQ6ICdcXFxcVGhldGEnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIjycsIGxhdGV4Q29tbWFuZDogJ1xcXFxQaScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiRJywgbGF0ZXhDb21tYW5kOiAnXFxcXFNpZ21hJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOpicsIGxhdGV4Q29tbWFuZDogJ1xcXFxQaGknIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86pJywgbGF0ZXhDb21tYW5kOiAnXFxcXE9tZWdhJyB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbGFiZWw6ICdHZW9tZXRyaWEgamEgdmVrdG9yaW9wcGknLFxuICAgICAgICBjaGFyYWN0ZXJzOiBbXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8KwJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiKAnLCBsYXRleENvbW1hbmQ6ICdcXFxcYW5nbGUnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KKpScsIGxhdGV4Q29tbWFuZDogJ1xcXFxwZXJwJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfigJYnLCBsYXRleENvbW1hbmQ6ICdcXFxccGFyYWxsZWwnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KHhScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oaRJywgbGF0ZXhDb21tYW5kOiAnXFxcXHVwYXJyb3cnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KGkycsIGxhdGV4Q29tbWFuZDogJ1xcXFxkb3duYXJyb3cnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KGlCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxsZWZ0cmlnaHRhcnJvdycgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oeMJyB9IC8vIFxccmlnaHRsZWZ0aGFycG9vbnNcbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBsYWJlbDogJ0xvZ2lpa2thIGphIGpvdWtrby1vcHBpJyxcbiAgICAgICAgY2hhcmFjdGVyczogW1xuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfih5InLCBsYXRleENvbW1hbmQ6ICdcXFxcUmlnaHRhcnJvdycsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oeUJywgbGF0ZXhDb21tYW5kOiAnXFxcXExlZnRyaWdodGFycm93JywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiKcnLCBsYXRleENvbW1hbmQ6ICdcXFxcYW5kJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiKgnLCBsYXRleENvbW1hbmQ6ICdcXFxcb3InIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8KsJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiIMnLCBsYXRleENvbW1hbmQ6ICdcXFxcZXhpc3RzJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiIAnLCBsYXRleENvbW1hbmQ6ICdcXFxcZm9yYWxsJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiKknLCBsYXRleENvbW1hbmQ6ICdcXFxcY2FwJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiKonLCBsYXRleENvbW1hbmQ6ICdcXFxcY3VwJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiJYnLCBsYXRleENvbW1hbmQ6ICdcXFxcc2V0bWludXMnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KKgicsIGxhdGV4Q29tbWFuZDogJ1xcXFxzdWJzZXQnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KKhCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxub3RzdWJzZXQnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIiCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxpbicgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiJJywgbGF0ZXhDb21tYW5kOiAnXFxcXG5vdGluJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiIUnLCBsYXRleENvbW1hbmQ6ICdcXFxcZW1wdHknIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KGkicsIGxhdGV4Q29tbWFuZDogJ1xcXFxyaWdodGFycm93JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiJgnLCBsYXRleENvbW1hbmQ6ICdcXFxcY2lyYycgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oi8JywgbGF0ZXhDb21tYW5kOiAnXFxcXHNpbScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oSdJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihJUnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KEpCcsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oSaJyB9XG4gICAgICAgIF1cbiAgICB9XG5dXG4iLCJjb25zdCBzcGVjaWFsQ2hhcmFjdGVyR3JvdXBzID0gcmVxdWlyZSgnLi9zcGVjaWFsQ2hhcmFjdGVycycpXG5jb25zdCBsYXRleENvbW1hbmRzID0gcmVxdWlyZSgnLi9sYXRleENvbW1hbmRzJylcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaW5pdCxcbn1cblxuZnVuY3Rpb24gaW5pdChtYXRoRWRpdG9yLCBoYXNSaWNoVGV4dEZvY3VzLCBsKSB7XG4gICAgY29uc3QgJHRvb2xiYXIgPSAkKGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbHNcIiBkYXRhLWpzPVwidG9vbHNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xzLWJ1dHRvbi13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhci13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLWNoYXJhY3RlcnMtZXhwYW5kLWNvbGxhcHNlXCIgZGF0YS1qcz1cImV4cGFuZENvbGxhcHNlQ2hhcmFjdGVyc1wiIHN0eWxlPVwiei1pbmRleDogMTAwXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xzLXJvd1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xiYXItd3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29sYmFyLWNoYXJhY3RlcnMgcmljaC10ZXh0LWVkaXRvci10b29sYmFyIHJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhci1idXR0b24tbGlzdFwiIGRhdGEtanM9XCJjaGFyYWN0ZXJzTGlzdFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29scy1yb3dcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29sYmFyLXdyYXBwZXIgcmljaC10ZXh0LWVkaXRvci1lcXVhdGlvbi13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xiYXItZXF1YXRpb24gcmljaC10ZXh0LWVkaXRvci10b29sYmFyIHJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhci1idXR0b24tbGlzdFwiIGRhdGEtanM9XCJtYXRoVG9vbGJhclwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29scy1idXR0b24td3JhcHBlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xiYXItd3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci1uZXctZXF1YXRpb24gcmljaC10ZXh0LWVkaXRvci1idXR0b24gcmljaC10ZXh0LWVkaXRvci1idXR0b24tYWN0aW9uXCIgZGF0YS1qcz1cIm5ld0VxdWF0aW9uXCIgZGF0YS1jb21tYW5kPVwiQ3RybC1MXCI+zqMgJHtsLmluc2VydEVxdWF0aW9ufTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBgKVxuICAgICAgICAub24oJ21vdXNlZG93bicsICdbZGF0YS1qcz1cImV4cGFuZENvbGxhcHNlQ2hhcmFjdGVyc1wiXScsIGUgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAkdG9vbGJhci50b2dnbGVDbGFzcygncmljaC10ZXh0LWVkaXRvci1jaGFyYWN0ZXJzLWV4cGFuZGVkJylcbiAgICAgICAgfSlcblxuICAgIGNvbnN0ICRuZXdFcXVhdGlvbiA9ICR0b29sYmFyLmZpbmQoJ1tkYXRhLWpzPVwibmV3RXF1YXRpb25cIl0nKVxuICAgIGNvbnN0ICRtYXRoVG9vbGJhciA9ICR0b29sYmFyLmZpbmQoJ1tkYXRhLWpzPVwibWF0aFRvb2xiYXJcIl0nKVxuICAgIGluaXRTcGVjaWFsQ2hhcmFjdGVyVG9vbGJhcigkdG9vbGJhciwgbWF0aEVkaXRvciwgaGFzUmljaFRleHRGb2N1cylcbiAgICBpbml0TWF0aFRvb2xiYXIoJG1hdGhUb29sYmFyLCBtYXRoRWRpdG9yKVxuICAgIGluaXROZXdFcXVhdGlvbigkbmV3RXF1YXRpb24sIG1hdGhFZGl0b3IsIGhhc1JpY2hUZXh0Rm9jdXMpXG5cbiAgICByZXR1cm4geyAkdG9vbGJhciB9XG59XG5cbmNvbnN0IHNwZWNpYWxDaGFyYWN0ZXJUb0J1dHRvbiA9IGNoYXIgPT4gYDxidXR0b24gY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLWJ1dHRvbiByaWNoLXRleHQtZWRpdG9yLWJ1dHRvbi1ncmlkJHtjaGFyLnBvcHVsYXIgPyAnIHJpY2gtdGV4dC1lZGl0b3ItY2hhcmFjdGVycy1wb3B1bGFyJyA6Jyd9XCIgJHtjaGFyLmxhdGV4Q29tbWFuZCA/IGBkYXRhLWNvbW1hbmQ9XCIke2NoYXIubGF0ZXhDb21tYW5kfVwiYCA6ICcnfT4ke2NoYXIuY2hhcmFjdGVyfTwvYnV0dG9uPmBcblxuY29uc3QgcG9wdWxhckluR3JvdXAgPSBncm91cCA9PiBncm91cC5jaGFyYWN0ZXJzLmZpbHRlcihjaGFyYWN0ZXIgPT4gY2hhcmFjdGVyLnBvcHVsYXIpLmxlbmd0aFxuXG5mdW5jdGlvbiBpbml0U3BlY2lhbENoYXJhY3RlclRvb2xiYXIoJHRvb2xiYXIsIG1hdGhFZGl0b3IsIGhhc0Fuc3dlckZvY3VzKSB7XG4gICAgY29uc3QgZ3JpZEJ1dHRvbldpZHRoUHggPSAzNVxuXG4gICAgJHRvb2xiYXIuZmluZCgnW2RhdGEtanM9XCJjaGFyYWN0ZXJzTGlzdFwiXScpXG4gICAgICAgIC5hcHBlbmQoc3BlY2lhbENoYXJhY3Rlckdyb3Vwcy5tYXAoZ3JvdXAgPT5cbiAgICAgICAgICAgIGA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29sYmFyLWNoYXJhY3RlcnMtZ3JvdXBcIiBcbiAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6ICR7cG9wdWxhckluR3JvdXAoZ3JvdXApICogZ3JpZEJ1dHRvbldpZHRoUHh9cHhcIj5cbiAgICAgICAgICAgICAgICAgICR7Z3JvdXAuY2hhcmFjdGVycy5tYXAoc3BlY2lhbENoYXJhY3RlclRvQnV0dG9uKS5qb2luKCcnKX1cbiAgICAgICAgICAgICA8L2Rpdj5gKSlcbiAgICAgICAgLm9uKCdtb3VzZWRvd24nLCAnYnV0dG9uJywgZSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICAgICAgY29uc3QgY2hhcmFjdGVyID0gZS5jdXJyZW50VGFyZ2V0LmlubmVyVGV4dFxuICAgICAgICAgICAgY29uc3QgY29tbWFuZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmNvbW1hbmRcbiAgICAgICAgICAgIGlmIChoYXNBbnN3ZXJGb2N1cygpKSB3aW5kb3cuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydFRleHQnLCBmYWxzZSwgY2hhcmFjdGVyKVxuICAgICAgICAgICAgZWxzZSBtYXRoRWRpdG9yLmluc2VydE1hdGgoY29tbWFuZCB8fCBjaGFyYWN0ZXIpXG4gICAgICAgIH0pXG59XG5cbmZ1bmN0aW9uIGluaXRNYXRoVG9vbGJhcigkbWF0aFRvb2xiYXIsIG1hdGhFZGl0b3IpIHtcbiAgICAkbWF0aFRvb2xiYXIuYXBwZW5kKGxhdGV4Q29tbWFuZHNcbiAgICAgICAgLm1hcChvID0+IGA8YnV0dG9uIGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci1idXR0b24gcmljaC10ZXh0LWVkaXRvci1idXR0b24tZ3JpZFwiIGRhdGEtY29tbWFuZD1cIiR7by5hY3Rpb259XCIgZGF0YS1sYXRleGNvbW1hbmQ9XCIke28ubGFiZWwgfHwgJyd9XCIgZGF0YS11c2V3cml0ZT1cIiR7by51c2VXcml0ZSB8fCBmYWxzZX1cIj5cbjxpbWcgc3JjPVwiL21hdGguc3ZnP2xhdGV4PSR7ZW5jb2RlVVJJQ29tcG9uZW50KG8ubGFiZWwgPyBvLmxhYmVsLnJlcGxhY2UoL1gvZywgJ1xcXFxzcXVhcmUnKSA6IG8uYWN0aW9uKX1cIi8+XG48L2J1dHRvbj5gKS5qb2luKCcnKVxuICAgICkub24oJ21vdXNlZG93bicsICdidXR0b24nLCBlID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGNvbnN0IGRhdGFzZXQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcbiAgICAgICAgbWF0aEVkaXRvci5pbnNlcnRNYXRoKGRhdGFzZXQuY29tbWFuZCwgZGF0YXNldC5sYXRleGNvbW1hbmQsIGRhdGFzZXQudXNld3JpdGUgPT09ICd0cnVlJylcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBpbml0TmV3RXF1YXRpb24oJG5ld0VxdWF0aW9uLCBtYXRoRWRpdG9yLCBoYXNBbnN3ZXJGb2N1cykge1xuICAgICRuZXdFcXVhdGlvbi5tb3VzZWRvd24oKGUgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgaWYgKCFoYXNBbnN3ZXJGb2N1cygpKSByZXR1cm4gLy8gVE9ETzogcmVtb3ZlIHdoZW4gYnV0dG9uIGlzIG9ubHkgdmlzaWJsZSB3aGVuIHRleHRhcmVhIGhhcyBmb2N1c1xuICAgICAgICBtYXRoRWRpdG9yLmluc2VydE5ld0VxdWF0aW9uKClcbiAgICB9KS5iaW5kKHRoaXMpKVxufVxuIiwiY29uc3Qgc2FuaXRpemVIdG1sID0gcmVxdWlyZSgnc2FuaXRpemUtaHRtbCcpXG5jb25zdCBzYW5pdGl6ZU9wdHMgPSByZXF1aXJlKCcuL3Nhbml0aXplT3B0cycpXG5jb25zdCBsb2FkaW5nSW1nID0gcmVxdWlyZSgnLi9sb2FkaW5nSW1nJylcbmNvbnN0IGVxdWF0aW9uSW1hZ2VTZWxlY3RvciA9ICdpbWdbc3JjXj1cIi9tYXRoLnN2Z1wiXSdcblxuY29uc3QgU0NSRUVOU0hPVF9MSU1JVF9FUlJPUiA9ICgpID0+IG5ldyBCYWNvbi5FcnJvcignU2NyZWVuc2hvdCBsaW1pdCByZWFjaGVkIScpXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpc0tleSxcbiAgICBpc0N0cmxLZXksXG4gICAgaW5zZXJ0VG9UZXh0QXJlYUF0Q3Vyc29yLFxuICAgIHBlcnNpc3RJbmxpbmVJbWFnZXMsXG4gICAgc2FuaXRpemUsXG4gICAgc2FuaXRpemVDb250ZW50LFxuICAgIHNldEN1cnNvckFmdGVyLFxuICAgIGVxdWF0aW9uSW1hZ2VTZWxlY3RvcixcbiAgICB0b3RhbEltYWdlQ291bnQsXG4gICAgU0NSRUVOU0hPVF9MSU1JVF9FUlJPUixcbiAgICBleGlzdGluZ1NjcmVlbnNob3RDb3VudCxcbiAgICBzY3JvbGxJbnRvVmlld1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0TGlua3NUb1JlbGF0aXZlKGh0bWwpIHtcbiAgICByZXR1cm4gaHRtbC5yZXBsYWNlKG5ldyBSZWdFeHAoZG9jdW1lbnQubG9jYXRpb24ub3JpZ2luLCAnZycpLCAnJylcbn1cblxuZnVuY3Rpb24gc2FuaXRpemUoaHRtbCkge1xuICAgIHJldHVybiBzYW5pdGl6ZUh0bWwoY29udmVydExpbmtzVG9SZWxhdGl2ZShodG1sKSwgc2FuaXRpemVPcHRzKVxufVxuZnVuY3Rpb24gaW5zZXJ0VG9UZXh0QXJlYUF0Q3Vyc29yKGZpZWxkLCB2YWx1ZSkge1xuICAgIGNvbnN0IHN0YXJ0UG9zID0gZmllbGQuc2VsZWN0aW9uU3RhcnRcbiAgICBjb25zdCBlbmRQb3MgPSBmaWVsZC5zZWxlY3Rpb25FbmRcbiAgICBsZXQgb2xkVmFsdWUgPSBmaWVsZC52YWx1ZVxuICAgIGZpZWxkLnZhbHVlID0gb2xkVmFsdWUuc3Vic3RyaW5nKDAsIHN0YXJ0UG9zKSArIHZhbHVlICsgb2xkVmFsdWUuc3Vic3RyaW5nKGVuZFBvcywgb2xkVmFsdWUubGVuZ3RoKVxuICAgIGZpZWxkLnNlbGVjdGlvblN0YXJ0ID0gZmllbGQuc2VsZWN0aW9uRW5kID0gc3RhcnRQb3MgKyB2YWx1ZS5sZW5ndGhcbn1cblxuZnVuY3Rpb24gZGVjb2RlQmFzZTY0SW1hZ2UoZGF0YVN0cmluZykge1xuICAgIGlmICghZGF0YVN0cmluZylcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICBjb25zdCBtYXRjaGVzID0gZGF0YVN0cmluZy5tYXRjaCgvXmRhdGE6KFtBLVphLXotK1xcL10rKTtiYXNlNjQsKC4rKSQvKVxuICAgIGlmIChtYXRjaGVzLmxlbmd0aCAhPT0gMykge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBtYXRjaGVzWzFdLFxuICAgICAgICBkYXRhOiBuZXcgQnVmZmVyKG1hdGNoZXNbMl0sICdiYXNlNjQnKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNLZXkoZSwga2V5KSB7XG4gICAgcmV0dXJuIHByZXZlbnRJZlRydWUoZSwgIWUuYWx0S2V5ICYmICFlLnNoaWZ0S2V5ICYmICFlLmN0cmxLZXkgJiYga2V5T3JLZXlDb2RlKGUsIGtleSkpXG59XG5cbmZ1bmN0aW9uIGlzQ3RybEtleShlLCBrZXkpIHtcbiAgICByZXR1cm4gcHJldmVudElmVHJ1ZShlLCAhZS5hbHRLZXkgJiYgIWUuc2hpZnRLZXkgJiYgZS5jdHJsS2V5ICYmIGtleU9yS2V5Q29kZShlLCBrZXkpKVxufVxuXG5mdW5jdGlvbiBrZXlPcktleUNvZGUoZSwgdmFsKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnID8gZS5rZXkgPT09IHZhbCA6IGUua2V5Q29kZSA9PT0gdmFsXG59XG5mdW5jdGlvbiBwcmV2ZW50SWZUcnVlKGUsIHZhbCkge1xuICAgIGlmICh2YWwpIGUucHJldmVudERlZmF1bHQoKVxuICAgIHJldHVybiB2YWxcbn1cblxuZnVuY3Rpb24gc2FuaXRpemVDb250ZW50KGFuc3dlckVsZW1lbnQpIHtcbiAgICBjb25zdCAkYW5zd2VyRWxlbWVudCA9ICQoYW5zd2VyRWxlbWVudClcbiAgICBjb25zdCAkbWF0aEVkaXRvciA9ICRhbnN3ZXJFbGVtZW50LmZpbmQoJ1tkYXRhLWpzPVwibWF0aEVkaXRvclwiXScpXG4gICAgJG1hdGhFZGl0b3IuaGlkZSgpXG4gICAgY29uc3QgdGV4dCA9ICRhbnN3ZXJFbGVtZW50LmdldCgwKS5pbm5lclRleHRcbiAgICAkbWF0aEVkaXRvci5zaG93KClcblxuICAgIGNvbnN0IGh0bWwgPSBzYW5pdGl6ZSgkYW5zd2VyRWxlbWVudC5odG1sKCkpXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhbnN3ZXJIVE1MOiBodG1sLFxuICAgICAgICBhbnN3ZXJUZXh0OiB0ZXh0LFxuICAgICAgICBpbWFnZUNvdW50OiBleGlzdGluZ1NjcmVlbnNob3RDb3VudCgkKGA8ZGl2PiR7aHRtbH08L2Rpdj5gKSlcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldEN1cnNvckFmdGVyKCRpbWcpIHtcbiAgICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKClcbiAgICBjb25zdCBpbWcgPSAkaW1nLmdldCgwKVxuICAgIGNvbnN0IG5leHRTaWJsaW5nID0gaW1nLm5leHRTaWJsaW5nICYmIGltZy5uZXh0U2libGluZy50YWdOYW1lID09PSAnQlInID8gaW1nLm5leHRTaWJsaW5nIDogaW1nXG4gICAgcmFuZ2Uuc2V0U3RhcnQobmV4dFNpYmxpbmcsIDApXG4gICAgcmFuZ2Uuc2V0RW5kKG5leHRTaWJsaW5nLCAwKVxuICAgIGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKVxuICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKVxuICAgIHNlbC5hZGRSYW5nZShyYW5nZSlcbn1cblxuZnVuY3Rpb24gbWFya0FuZEdldElubGluZUltYWdlcygkZWRpdG9yKSB7XG4gICAgY29uc3QgaW1hZ2VzID0gJGVkaXRvci5maW5kKCdpbWdbc3JjXj1cImRhdGFcIl0nKS50b0FycmF5KClcbiAgICAgICAgLm1hcCgoZWwsIGluZGV4KSA9PiBPYmplY3QuYXNzaWduKGRlY29kZUJhc2U2NEltYWdlKGVsLmdldEF0dHJpYnV0ZSgnc3JjJykpLCB7XG4gICAgICAgICAgICAkZWw6ICQoZWwpXG4gICAgICAgIH0pKVxuICAgIGltYWdlcy5maWx0ZXIoKHt0eXBlfSkgPT4gdHlwZSAhPT0gJ2ltYWdlL3BuZycpLmZvckVhY2goKHskZWx9KSA9PiAkZWwucmVtb3ZlKCkpXG4gICAgY29uc3QgcG5nSW1hZ2VzID0gaW1hZ2VzLmZpbHRlcigoe3R5cGV9KSA9PiB0eXBlID09PSAnaW1hZ2UvcG5nJylcbiAgICBwbmdJbWFnZXMuZm9yRWFjaCgoeyRlbH0pID0+ICRlbC5hdHRyKCdzcmMnLCBsb2FkaW5nSW1nKSlcbiAgICByZXR1cm4gcG5nSW1hZ2VzXG59XG5cbmZ1bmN0aW9uIGV4aXN0aW5nU2NyZWVuc2hvdENvdW50KCRlZGl0b3IpIHtcbiAgICBjb25zdCBpbWFnZUNvdW50ID0gJGVkaXRvci5maW5kKCdpbWcnKS5sZW5ndGhcbiAgICBjb25zdCBlcXVhdGlvbkNvdW50ID0gJGVkaXRvci5maW5kKGVxdWF0aW9uSW1hZ2VTZWxlY3RvcikubGVuZ3RoXG4gICAgcmV0dXJuIGltYWdlQ291bnQgLSBlcXVhdGlvbkNvdW50XG59XG5cbmZ1bmN0aW9uIGNoZWNrRm9ySW1hZ2VMaW1pdCgkZWRpdG9yLCBpbWFnZURhdGEsIGxpbWl0KSB7XG4gICAgcmV0dXJuIEJhY29uLm9uY2UoZXhpc3RpbmdTY3JlZW5zaG90Q291bnQoJGVkaXRvcikgPiBsaW1pdCA/IG5ldyBCYWNvbi5FcnJvcigpIDogaW1hZ2VEYXRhKVxufVxuXG5mdW5jdGlvbiBwZXJzaXN0SW5saW5lSW1hZ2VzKCRlZGl0b3IsIHNjcmVlbnNob3RTYXZlciwgc2NyZWVuc2hvdENvdW50TGltaXQsIG9uVmFsdWVDaGFuZ2VkKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiBCYWNvbi5jb21iaW5lQXNBcnJheShtYXJrQW5kR2V0SW5saW5lSW1hZ2VzKCRlZGl0b3IpXG4gICAgICAgIC5tYXAoZGF0YSA9PiBjaGVja0ZvckltYWdlTGltaXQoJGVkaXRvciwgZGF0YSwgc2NyZWVuc2hvdENvdW50TGltaXQpXG4gICAgICAgICAgICAuZG9FcnJvcigoKSA9PiBvblZhbHVlQ2hhbmdlZChTQ1JFRU5TSE9UX0xJTUlUX0VSUk9SKCkpKVxuICAgICAgICAgICAgLmZsYXRNYXBMYXRlc3QoKCkgPT4gQmFjb24uZnJvbVByb21pc2Uoc2NyZWVuc2hvdFNhdmVyKGRhdGEpKSlcbiAgICAgICAgICAgIC5kb0FjdGlvbihzY3JlZW5TaG90VXJsID0+IGRhdGEuJGVsLmF0dHIoJ3NyYycsIHNjcmVlblNob3RVcmwpKVxuICAgICAgICAgICAgLmRvRXJyb3IoKCkgPT4gZGF0YS4kZWwucmVtb3ZlKCkpKVxuICAgICkub25WYWx1ZShrID0+ICRlZGl0b3IudHJpZ2dlcignaW5wdXQnKSksIDApXG59XG5cbmZ1bmN0aW9uIHRvdGFsSW1hZ2VDb3VudCgkYW5zd2VyLCBjbGlwYm9hcmREYXRhQXNIdG1sKSB7XG4gICAgcmV0dXJuIGV4aXN0aW5nU2NyZWVuc2hvdENvdW50KCRhbnN3ZXIpICsgZXhpc3RpbmdTY3JlZW5zaG90Q291bnQoJChgPGRpdj4ke2NsaXBib2FyZERhdGFBc0h0bWx9PC9kaXY+YCkpXG59XG5cbmZ1bmN0aW9uIHNjcm9sbEludG9WaWV3KCRlbGVtZW50KSB7XG4gICAgY29uc3QgJHdpbmRvdyA9ICQod2luZG93KVxuICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9ICR3aW5kb3cuaGVpZ2h0KCkgLSA0MFxuICAgIGNvbnN0IHNjcm9sbCA9IHdpbmRvd0hlaWdodCArICR3aW5kb3cuc2Nyb2xsVG9wKClcbiAgICBjb25zdCBwb3MgPSAkZWxlbWVudC5vZmZzZXQoKS50b3AgKyAkZWxlbWVudC5oZWlnaHQoKVxuICAgIGlmIChzY3JvbGwgPCBwb3MpIHtcbiAgICAgICAgJHdpbmRvdy5zY3JvbGxUb3AocG9zIC0gd2luZG93SGVpZ2h0KVxuICAgIH1cbn1cbiJdfQ==
