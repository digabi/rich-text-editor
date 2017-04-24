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
            onPasteBlob(e, file, saver);
        } else {
            var clipboardDataAsHtml = clipboardData.getData('text/html');
            if (clipboardDataAsHtml) onPasteHtml(e, $answer, clipboardDataAsHtml, limit, saver, onValueChanged);else onLegacyPasteImage(saver, limit, onValueChanged);
        }
    });
    setTimeout(function () {
        return document.execCommand("enableObjectResizing", false, false);
    }, 0);
};

function onPasteBlob(event, file, saver) {
    event.preventDefault();
    if (file.type === 'image/png') {
        saver({ data: file, type: file.type, id: String(new Date().getTime()) }).then(function (screenshotUrl) {
            var img = '<img src="' + screenshotUrl + '"/>';
            window.document.execCommand('insertHTML', false, img);
        });
    }
}

function onPasteHtml(event, $answer, clipboardDataAsHtml, limit, saver, onValueChanged) {
    event.preventDefault();
    if (u.totalImageCount($answer, clipboardDataAsHtml) <= limit) {
        window.document.execCommand('insertHTML', false, u.sanitize(clipboardDataAsHtml));
        u.persistInlineImages($currentEditor, saver, limit, onValueChanged);
    } else {
        onValueChanged(u.SCREENSHOT_LIMIT_ERROR);
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

var SCREENSHOT_LIMIT_ERROR = new Bacon.Error('Screenshot limit reached!');
module.exports = { isKey: isKey, isCtrlKey: isCtrlKey, insertToTextAreaAtCursor: insertToTextAreaAtCursor, persistInlineImages: persistInlineImages, sanitize: sanitize, sanitizeContent: sanitizeContent, setCursorAfter: setCursorAfter, equationImageSelector: equationImageSelector, totalImageCount: totalImageCount, SCREENSHOT_LIMIT_ERROR: SCREENSHOT_LIMIT_ERROR };

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
    setTimeout(function () {
        return Bacon.combineAsArray(markAndGetInlineImages($editor).map(function (data) {
            return checkForImageLimit($editor, data, screenshotCountLimit).doError(function () {
                return onValueChanged(SCREENSHOT_LIMIT_ERROR);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvRkkuanMiLCJhcHAvU1YuanMiLCJhcHAvbGF0ZXhDb21tYW5kcy5qcyIsImFwcC9sb2FkaW5nSW1nLmpzIiwiYXBwL21hdGgtZWRpdG9yLmpzIiwiYXBwL3JpY2gtdGV4dC1lZGl0b3IuanMiLCJhcHAvc2FuaXRpemVPcHRzLmpzIiwiYXBwL3NwZWNpYWxDaGFyYWN0ZXJzLmpzIiwiYXBwL3Rvb2xiYXJzLmpzIiwiYXBwL3V0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLE9BQU8sT0FBUCxHQUFpQjtBQUNiLFlBQVE7QUFDSixvQkFBWSxnQkFEUjtBQUVKLGVBQU8seUNBRkg7QUFHSixraEJBSEk7QUFXSixxREFYSTtBQVlKLDRkQVpJO0FBdUJKLG9CQUFZLFVBdkJSO0FBd0JKLDJCQUFtQixlQXhCZjtBQXlCSix3QkFBZ0IsYUF6Qlo7QUEwQkosZUFBTyxPQTFCSDtBQTJCSixjQUFNLFVBM0JGO0FBNEJKLGlCQUFTLFlBNUJMO0FBNkJKLHNCQUFjLG1CQTdCVjtBQThCSixrQkFBVSxLQTlCTjtBQStCSixtQkFBVyxZQS9CUDtBQWdDSixxQkFBYTtBQWhDVCxLQURLO0FBbUNiLGdCQUFZO0FBQ1Isc0JBQWMsbUJBRE47QUFFUixpQkFBUyxZQUZEO0FBR1Isb0JBQVksZ0JBSEo7QUFJUixlQUFPLFdBSkM7QUFLUixrQkFBVSxHQUxGO0FBTVIsdUJBQWUsc0JBTlA7QUFPUixjQUFNLG9CQVBFO0FBUVIsa0JBQVUsZUFSRjtBQVNSLG1CQUFXO0FBVEg7QUFuQ0MsQ0FBakI7Ozs7O0FDQUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsWUFBUTtBQUNKLG9CQUFZLGlCQURSO0FBRUosZUFBTywwQ0FGSDtBQUdKLDZoQkFISTtBQVFKLHdEQVJJO0FBU0osb1lBVEk7QUFrQkosb0JBQVksYUFsQlI7QUFtQkosMkJBQW1CLGVBbkJmO0FBb0JKLHdCQUFnQixrQkFw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ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZWRpdG9yOiB7XG4gICAgICAgIG1hdGhFZGl0b3I6ICdNYXRpa2thZWRpdG9yaScsXG4gICAgICAgIHRpdGxlOiAnS2FhdmFlZGl0b3JpbiBlbnNpbW3DpGluZW4ga2VoaXR5c3ZlcnNpbycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBgPHVsPlxuPGxpPkVkaXRvcmkgdG9pbWlpIHBhcmhhaXRlbiBGaXJlZm94LXNlbGFpbWVsbGEuPC9saT5cbjxsaT7igJxMaXPDpMOkIGthYXZh4oCdIC1uYXBpbiBhbHRhIGzDtnlkw6R0IHlsZWlzaW1wacOkIG1hdGVtYXRpaWthc3NhLCBmeXNpaWthc3NhIGphXG5rZW1pYXNzYSBrw6R5dGV0dMOkdmnDpCBtZXJraW50w7Zqw6QuIExpc8Oka3NpIGVyaWtvaXNtZXJra2Vqw6Qgdm9pIGvDpHl0dMOkw6Qga2FhdmFuIGtpcmpvaXR0YW1pc2Vlbi48L2xpPlxuIDxsaT5LYWF2b2phIHZvaSByYWtlbnRhYVxua2xpa2thYW1hbGxhIHZhbGlrb24gbWVya2ludMO2asOkIGphL3RhaSBraXJqb2l0dGFtYWxsYSBMYVRlWGlhLjwvbGk+XG4gPGxpPkVkaXRvcmluIHZhc3RhdXNrZW50dMOkw6RuIHZvaSBraXJqb2l0dGFhIHRla3N0acOkIGphIGthYXZvamEgc2Vrw6Rcbmxpc8OkdMOkIGt1dmlhLjwvbGk+PC91bD5gLFxuICAgICAgICBzaG9ydGN1dFRpdGxlOiBgUGlrYW7DpHBww6RpbnZpbmtrZWrDpGAsXG4gICAgICAgIHNob3J0Y3V0czogYDx0YWJsZT48dGJvZHk+XG48dHI+PHRoPkxpaXTDpCBrdXZhIGxlaWtlcMO2eWTDpGx0w6Q8L3RoPjx0ZD5DdHJsLVY8L3RkPjwvdHI+XG48dHI+PHRoPktpcmpvaXRhIGthYXZhPC90aD48dGQ+Q3RybC1MIHRhaSBDdHJsLUk8L3RkPjwvdHI+XG48dHI+PHRoIGNvbHNwYW49XCIyXCI+S2FhdmFzc2E8L3RoPjwvdHI+XG48dHI+PHRoPkpha292aWl2YTwvdGg+PHRkPi88L3RkPjwvdHI+XG48dHI+PHRoPktlcnRvbWVya2tpPC90aD48dGQ+KjwvdGQ+PC90cj5cbjx0cj48dGg+RWtzcG9uZW50dGk8L3RoPjx0ZD5ePC90ZD48L3RyPlxuPHRyPjx0aD5TdWxqZSBrYWF2YTwvdGg+PHRkPkN0cmwtRW50ZXIgdGFpIEVzYzwvdGQ+PC90cj5cbjx0cj48dGg+TGlzw6TDpCBrYWF2YSBzZXVyYWF2YWxsZSByaXZpbGxlPC90aD48dGQ+RW50ZXI8L3RkPjwvdHI+XG48L3Rib2R5PlxuPC90YWJsZT5gLFxuICAgICAgICBmb3JtYXR0aW5nOiAnTXVvdG9pbHUnLFxuICAgICAgICBzcGVjaWFsQ2hhcmFjdGVyczogJ0VyaWtvaXNtZXJraXQnLFxuICAgICAgICBpbnNlcnRFcXVhdGlvbjogJ0xpc8Okw6Qga2FhdmEnLFxuICAgICAgICBjbG9zZTogJ3N1bGplJyxcbiAgICAgICAgc2F2ZTogJ1RhbGxlbm5hJyxcbiAgICAgICAgdXBkYXRlZDogJ1DDpGl2aXRldHR5JyxcbiAgICAgICAgc2VuZEZlZWRiYWNrOiAnTMOkaGV0w6QgcGFsYXV0ZXR0YScsXG4gICAgICAgIGxhbmdMaW5rOiAnL3N2JyxcbiAgICAgICAgbGFuZ0xhYmVsOiAnUMOlIHN2ZW5za2EnLFxuICAgICAgICBhbnN3ZXJUaXRsZTogJ1Zhc3RhdXMnXG4gICAgfSxcbiAgICBhbm5vdGF0aW5nOiB7XG4gICAgICAgIHNlbmRGZWVkYmFjazogJ0zDpGhldMOkIHBhbGF1dGV0dGEnLFxuICAgICAgICB1cGRhdGVkOiAnUMOkaXZpdGV0dHknLFxuICAgICAgICBtYXRoRWRpdG9yOiAnTWF0aWtrYWVkaXRvcmknLFxuICAgICAgICB0aXRsZTogJ0Fydm9zdGVsdScsXG4gICAgICAgIGJhY2tMaW5rOiAnLycsXG4gICAgICAgIGJhY2tMaW5rTGFiZWw6ICdQYWxhYSBrYWF2YWVkaXRvcmlpbicsXG4gICAgICAgIHNhdmU6ICdUYWxsZW5uYSBtZXJraW5uw6R0JyxcbiAgICAgICAgbGFuZ0xpbms6ICcvc3YvYmVkb21uaW5nJyxcbiAgICAgICAgbGFuZ0xhYmVsOiAnUMOlIHN2ZW5za2EnXG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZWRpdG9yOiB7XG4gICAgICAgIG1hdGhFZGl0b3I6ICdNYXRlbWF0aWtlZGl0b3InLFxuICAgICAgICB0aXRsZTogJ0Zvcm1lbGVkaXRvcm5zIGbDtnJzdGEgdXR2ZWNrbGluZ3N2ZXJzaW9uJyxcbiAgICAgICAgZGVzY3JpcHRpb246IGA8dWw+XG48bGk+RWRpdG9ybiBmdW5nZXJhciBiw6RzdCBtZWQgYnJvd3Nlcm4gRmlyZWZveC48L2xpPlxuIDxsaT5VbmRlciBrbmFwcGVuIOKAnEzDpGdnIHRpbGwgZm9ybWVs4oCdIGhpdHRhciBkdSBkZSB2YW5saWdhc3RlIGJldGVja25pbmdhcm5hIHNvbSBhbnbDpG5kcyBpIG1hdGVtYXRpaywgZnlzaWsgb2NoIGtlbWkuIERlc3N1dG9tIGthbiBkdSBhbnbDpG5kYSBzcGVjaWFsdGVja2VuIGbDtnIgYXR0IHNrcml2YSBmb3JtbGVyLjwvbGk+XG48bGk+RGV0IGfDpXIgYXR0IGtvbnN0cnVlcmEgZm9ybWxlciBnZW5vbSBhdHQga2xpY2thIHDDpSBiZXRlY2tuaW5nYXJuYSBpIG1lbnllcm5hIG9jaC9lbGxlciBnZW5vbSBhdHQgc2tyaXZhIExhVGVYLjwvbGk+XG48bGk+RGV0IGfDpXIgZsO2cnV0b20gYXR0IHNrcml2YSB0ZXh0IG9jaCBmb3JtbGVyLCBhdHQgb2Nrc8OlIGF0dCBsw6RnZ2EgdGlsbCBiaWxkZXIgaSBzdmFyc2bDpGx0ZXQuPC9saT48L3VsPmAsXG4gICAgICAgIHNob3J0Y3V0VGl0bGU6IGBUaXBzIHDDpSB0YW5nZW50a29tYmluYXRpb25lcmAsXG4gICAgICAgIHNob3J0Y3V0czogYDx0YWJsZT48dGJvZHk+XG48dHI+PHRoPkzDpGdnIHRpbGwgZW4gYmlsZCBmcsOlbiB1cmtsaXBwZXQ8L3RoPjx0ZD5DdHJsLVY8L3RkPjwvdHI+XG48dHI+PHRoPlNrcml2IGVuIGZvcm1lbDwvdGg+PHRkPkN0cmwtTCAvIEN0cmwtSTwvdGQ+PC90cj5cbjx0cj48dGggY29sc3Bhbj1cIjJcIj5JIGZvcm1lbG4gPC90aD48L3RyPlxuPHRyPjx0aD5CcsOla3N0cmVjazwvdGg+PHRkPi88L3RkPjwvdHI+XG48dHI+PHRoPk11bHRpcGxpa2F0aW9uc3RlY2tlbjwvdGg+PHRkPio8L3RkPjwvdHI+XG48dHI+PHRoPlN0w6RuZyBmb3JtZWxuPC90aD48dGQ+Q3RybC1FbnRlciBlbGxlciBFc2M8L3RkPjwvdHI+XG48L3Rib2R5PlxuPC90YWJsZT5gLFxuICAgICAgICBmb3JtYXR0aW5nOiAnRm9ybWF0ZXJpbmcnLFxuICAgICAgICBzcGVjaWFsQ2hhcmFjdGVyczogJ1NwZWNpYWx0ZWNrZW4nLFxuICAgICAgICBpbnNlcnRFcXVhdGlvbjogJ0zDpGdnIHRpbGwgZm9ybWVsJyxcbiAgICAgICAgY2xvc2U6ICdzdMOkbmcnLFxuICAgICAgICBzYXZlOiAnU3BhcmEnLFxuICAgICAgICB1cGRhdGVkOiAnVXBwZGF0ZXJhZCcsXG4gICAgICAgIHNlbmRGZWVkYmFjazogJ1NraWNrYSBmZWVkYmFjaycsXG4gICAgICAgIGxhbmdMaW5rOiAnLycsXG4gICAgICAgIGxhbmdMYWJlbDogJ1N1b21la3NpJyxcbiAgICAgICAgYW5zd2VyVGl0bGU6ICdTdmFyJ1xuICAgIH0sXG4gICAgYW5ub3RhdGluZzoge1xuICAgICAgICBzZW5kRmVlZGJhY2s6ICdTa2lja2EgcmVzcG9ucycsXG4gICAgICAgIHVwZGF0ZWQ6ICdVcHBkYXRlcmFkJyxcbiAgICAgICAgbWF0aEVkaXRvcjogJ01hdGVtYXRpa2VkaXRvcicsXG4gICAgICAgIHRpdGxlOiAnQmVkw7ZtbmluZycsXG4gICAgICAgIGJhY2tMaW5rOiAnL3N2JyxcbiAgICAgICAgYmFja0xpbmtMYWJlbDogJ01hdGVtYXRpa2VkaXRvcicsXG4gICAgICAgIHNhdmU6ICdTcGFyYSBhbnRlY2tuaW5nYXInLFxuICAgICAgICBsYW5nTGluazogJy90YXJraXN0dXMnLFxuICAgICAgICBsYW5nTGFiZWw6ICdTdW9tZWtzaSdcbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAgICB7YWN0aW9uOiAnXFxcXHNxcnQnLCBsYWJlbDogJ1xcXFxzcXJ0e1h9J30sXG4gICAge2FjdGlvbjogJ14nLCBsYWJlbDogJ3hee1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxmcmFjJywgbGFiZWw6ICdcXFxcZnJhY3tYfXtYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcaW50JywgbGFiZWw6ICdcXFxcaW50X3tYfV57WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGxpbV8nLCBsYWJlbDogJ1xcXFxsaW1fe1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxsaW1fe3hcXFxccmlnaHRhcnJvd1xcXFxpbmZ0eX0nLCBsYWJlbDogJ1xcXFxsaW1fe3hcXFxccmlnaHRhcnJvd1xcXFxpbmZ0eX0nLCB1c2VXcml0ZTp0cnVlfSxcbiAgICB7YWN0aW9uOiAnXFxcXG92ZXJyaWdodGFycm93JywgbGFiZWw6ICdcXFxcb3ZlcnJpZ2h0YXJyb3d7WH0nfSxcbiAgICB7YWN0aW9uOiAnXycsIGxhYmVsOiAneF9YJ30sXG4gICAge2FjdGlvbjogJ1xcXFxudGhyb290JywgbGFiZWw6ICdcXFxcc3FydFtYXXtYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcc3VtJywgbGFiZWw6ICdcXFxcc3VtX3tYfV57WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGJpbm9tJywgbGFiZWw6ICdcXFxcYmlub217WH17WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXHNpbid9LFxuICAgIHthY3Rpb246ICdcXFxcY29zJ30sXG4gICAge2FjdGlvbjogJ1xcXFx0YW4nfSxcbiAgICB7YWN0aW9uOiAnXFxcXHZlYycsIGxhYmVsOiAnXFxcXHZlY3tYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcYmFyJywgbGFiZWw6ICdcXFxcYmFye1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxvdmVybGluZXtcXFxcdGV4dHtpfX0nLCB1c2VXcml0ZTogdHJ1ZX0sXG4gICAge2FjdGlvbjogJ1xcXFxvdmVybGluZXtcXFxcdGV4dHtqfX0nLCB1c2VXcml0ZTogdHJ1ZX0sXG4gICAge2FjdGlvbjogJ1xcXFxvdmVybGluZXtcXFxcdGV4dHtrfX0nLCB1c2VXcml0ZTogdHJ1ZX0sXG4gICAge2FjdGlvbjogJ1xcXFxvdmVybGVmdGFycm93JywgbGFiZWw6ICdcXFxcb3ZlcmxlZnRhcnJvd3tYfSd9LFxuICAgIHthY3Rpb246ICd8JywgbGFiZWw6ICd8WHwnfSxcbiAgICB7YWN0aW9uOiAnKCcsIGxhYmVsOiAnKFgpJ30sXG4gICAge2FjdGlvbjogJ197IH1eeyB9ICcsIGxhYmVsOiAnX3tYfV57WH1YJywgdXNlV3JpdGU6IHRydWV9LFxuICAgIHthY3Rpb246ICdcXFxcdGV4dCcsIGxhYmVsOiAnXFxcXHRleHR7VH0nfSxcbl1cbiIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhFQUFRQVBRQUFQLy8vd0FBQVBEdzhJcUtpdURnNEVaR1JucDZlZ0FBQUZoWVdDUWtKS3lzckw2K3ZoUVVGSnljbkFRRUJEWTJObWhvYUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUNIK0drTnlaV0YwWldRZ2QybDBhQ0JoYW1GNGJHOWhaQzVwYm1adkFDSDVCQUFLQUFBQUlmOExUa1ZVVTBOQlVFVXlMakFEQVFBQUFDd0FBQUFBRUFBUUFBQUZkeUFnQWdJSkllV29Ba1JDQ01kQmtLdElISW5neU1Lc0VyUEJZYkFEcGtTQ3doRG1RQ0JldGhSQjZWajRrRkNrUVBHNElsV0Rnck5SSXduTzRVS0JYRHVmelF2RE1hb1NEQmdGYjg4Nk1pUWFkZ05BQkFva2ZDd3pCQThMQ2cwRWdsOGpBZ2dHQUExa0JJQTFCQVl6bHlJTGN6VUxDMlVoQUNINUJBQUtBQUVBTEFBQUFBQVFBQkFBQUFWMklDQUNBbWxBWlRtT1JFRUl5VUVRakxLS3hQSEFEaEV2cXhsZ2NHZ2tHSTFEWVNWQUlBV014K2x3U0trSUNKMFFzSGk5UmdLQnduVlRpUlFRZ3dGNEk0VUZEUVFFd2k2LzNZU0dXUlJtamhFRVRBSmZJZ01GQ25BS00wS0RWNEVFRUFRTGlGMThUQVlOWERhU2UzeDZtamlkTjFzM0lRQWgrUVFBQ2dBQ0FDd0FBQUFBRUFBUUFBQUZlQ0FnQWdMWkRHVTVqZ1JFQ0VVaUNJK3lpb1NEd0RKeUxLc1hvSEZReEJTSEFvQUFGQmhxdE1KZzhEZ1FCZ2ZyRXNKQUVBZzRZaFpJRWl3Z0t0SGlNQmd0cGczd2JVWlhHTzdrT2IxTVVLUkZNeXNDQ2hBb2dnSkNJZzBHQzJhTmU0Z3FRbGRmTDRsL0FnMUFYeVNKZ241TGNvRTNRWEkzSVFBaCtRUUFDZ0FEQUN3QUFBQUFFQUFRQUFBRmRpQWdBZ0xaTkdVNWpvUWhDRWp4SXNzcUVvOGJDOUJSank5QWc3R0lMUTRRRW9FMGdCQUVCY09wY0JBMERveFNLL2U4TFJJSG4raTFjSzBJeUtkZzBWQW9sallJZytHZ25ScndWUy84SUFrSUN5b3NCSVFwQkFNb0t5OWRJbXhQaFMrR0trRnJrWCtUaWd0TGxJeUtYVUYrTmphZ05pRUFJZmtFQUFvQUJBQXNBQUFBQUJBQUVBQUFCV3dnSUFJQ2FSaGxPWTRFSWdqSDhSN0xLaEtIR3dzTXZiNEFBeTNXT0RCSUJCS0NzWUE5VGp1aEROREtFVlNFUmV6UUVMMFdyaFh1Y1JVUUd1aWs3YkZsbmd6cVZXOUxNbDlYV3ZMZGpGYUp0REZxWjFjRVpVQjBkVWd2TDNkZ1A0V0pabjRqa29tV05wU1RJeUVBSWZrRUFBb0FCUUFzQUFBQUFCQUFFQUFBQlg0Z0lBSUN1U3hsT1k2Q0lnaUQ4UnJFS2dxR093eHdVck1sQW9Td0l6QUdwSnBnb1NEQUdpZkRZNWtvcEJZRGxFcEFRQndldnhmQnRSSVVHaTh4d1drRE5CQ0l3bUM5VnEwYWlRUURRdUsrVmdRUERYVjloQ0pqQndjRllVNXBMd3dIWFFjTUtTbU5MUWNJQUV4bGJIOEpCd3R0YVgwQUJBY05iV1ZiS3lFQUlma0VBQW9BQmdBc0FBQUFBQkFBRUFBQUJYa2dJQUlDU1JCbE9ZN0NJZ2hOOHpiRUtzS29JamRGelphRWdVQkhLQ2hNSnRSd2NXcEFXb1duaWZtNkVTQU1oTzhsUUswRUVBVjNyRm9wSUJDRWNHd0RLQXFQaDRIVXJZNElDSEgxZFNvVEZnY0hVaVpqQmhBSkIyQUhEeWtwS0F3SEF3ZHpmMTlLa0FTSVBsOWNEZ2NuRGtkdE53aU1KQ3NoQUNINUJBQUtBQWNBTEFBQUFBQVFBQkFBQUFWM0lDQUNBa2tRWlRtT0Fpb3NpeUFveENxK0tQeENOVnNTTVJnQnNpQ2xXckxUU1dGb0lRWkhsNnBsZUJoNnN1eEtNSWhsdnpiQXdrQldmRldyQlFUeE5McTJSRzJ5aFNVa0RzMmI2M0FZREFvSlhBY0ZSd0FEZUFrSkRYMEFRQ3NFZkFRTURBSVBCejByQ2djeGt5MEpSV0UxQW13cEt5RUFJZmtFQUFvQUNBQXNBQUFBQUJBQUVBQUFCWGtnSUFJQ0taemtxSjRuUVp4THFaS3Y0TnFOTEtLMi9RNEVrNGxGWENoc2c1eXBKanMxSUkzZ0VEVVNSSW5FR1lBdzZCNnpNNEpockRBdEVvc1ZrTFV0SEE3UkhhSEFHSlFFanNPRGNFZzBGQkFGVmdrUUpRMXBBd2NERHc4S2NGdFNJbndKQW93Q0NBNlJJd3FaQWdrUE5nVnBXbmRqZHlvaEFDSDVCQUFLQUFrQUxBQUFBQUFRQUJBQUFBVjVJQ0FDQWltYzVLaWVMRXVVS3ZtMnhBS0xxRENmQzJHYU85ZUwwTEFCV1RpQlltQTA2VzZrSGd2Q3FFSmlBSUppdTNnY3ZnVXNzY0hVRVJtK2thQ3h5eGErelJQazBTZ0pFZ2ZJdmJBZElBUUxDQVlsQ2o0REJ3MElCUXNNQ2pJcUJBY1BBb29DQmc5cEtnc0pMd1VGT2hDWkt5UURBM1lxSVFBaCtRUUFDZ0FLQUN3QUFBQUFFQUFRQUFBRmRTQWdBZ0lwbk9Tb25teGJxaVRoQ3JKS0VIRmJvOEp4RERPWllGRmIrQTQxRTRINE9oa09pcFh3QkVsWUlUREFja0ZFT0JnTVEzYXJrTWtVQmR4SVVHWnBFYjdrYVFCUmxBU1BnMEZRUUhBYkVFTUdEU1ZFQUExUUJoQUVEMUUwTmd3RkFvb0NEV2xqYVFJUUNFNXFNSGNOaENraklRQWgrUVFBQ2dBTEFDd0FBQUFBRUFBUUFBQUZlU0FnQWdJcG5PU29MZ3h4dnFnS0xFY0NDNjVLRUFCeUtLOGNTcEE0REFpSFEvRGtLaEdLaDRaQ3RDeVpHbzZGNmlZWVBBcUZnWXkwMnhrU2FMRU1WMzR0RUx5UllORXNDUXlIbHZXa0dDenNQZ01DRUFZN0NnMDRVazQ4TEFzRGhSQThNVlFQRUYwR0FncVlZd1NSbHljTmNXc2tDa0FwSXlFQU93QUFBQUFBQUFBQUFEeGljaUF2UGdvOFlqNVhZWEp1YVc1blBDOWlQam9nSUcxNWMzRnNYM0YxWlhKNUtDa2dXenhoSUdoeVpXWTlKMloxYm1OMGFXOXVMbTE1YzNGc0xYRjFaWEo1Sno1bWRXNWpkR2x2Ymk1dGVYTnhiQzF4ZFdWeWVUd3ZZVDVkT2lCRFlXNG5kQ0JqYjI1dVpXTjBJSFJ2SUd4dlkyRnNJRTE1VTFGTUlITmxjblpsY2lCMGFISnZkV2RvSUhOdlkydGxkQ0FuTDNaaGNpOXlkVzR2YlhsemNXeGtMMjE1YzNGc1pDNXpiMk5ySnlBb01pa2dhVzRnUEdJK0wyaHZiV1V2WVdwaGVHeHZZV1F2ZDNkM0wyeHBZbkpoYVhKcFpYTXZZMnhoYzNNdWJYbHpjV3d1Y0dod1BDOWlQaUJ2YmlCc2FXNWxJRHhpUGpZNFBDOWlQanhpY2lBdlBnbzhZbklnTHo0S1BHSStWMkZ5Ym1sdVp6d3ZZajQ2SUNCdGVYTnhiRjl4ZFdWeWVTZ3BJRnM4WVNCb2NtVm1QU2RtZFc1amRHbHZiaTV0ZVhOeGJDMXhkV1Z5ZVNjK1puVnVZM1JwYjI0dWJYbHpjV3d0Y1hWbGNuazhMMkUrWFRvZ1FTQnNhVzVySUhSdklIUm9aU0J6WlhKMlpYSWdZMjkxYkdRZ2JtOTBJR0psSUdWemRHRmliR2x6YUdWa0lHbHVJRHhpUGk5b2IyMWxMMkZxWVhoc2IyRmtMM2QzZHk5c2FXSnlZV2x5YVdWekwyTnNZWE56TG0xNWMzRnNMbkJvY0R3dllqNGdiMjRnYkdsdVpTQThZajQyT0R3dllqNDhZbklnTHo0S1BHSnlJQzgrQ2p4aVBsZGhjbTVwYm1jOEwySStPaUFnYlhsemNXeGZjWFZsY25rb0tTQmJQR0VnYUhKbFpqMG5ablZ1WTNScGIyNHViWGx6Y1d3dGNYVmxjbmtuUG1aMWJtTjBhVzl1TG0xNWMzRnNMWEYxWlhKNVBDOWhQbDA2SUVOaGJpZDBJR052Ym01bFkzUWdkRzhnYkc5allXd2dUWGxUVVV3Z2MyVnlkbVZ5SUhSb2NtOTFaMmdnYzI5amEyVjBJQ2N2ZG1GeUwzSjFiaTl0ZVhOeGJHUXZiWGx6Y1d4a0xuTnZZMnNuSUNneUtTQnBiaUE4WWo0dmFHOXRaUzloYW1GNGJHOWhaQzkzZDNjdmJHbGljbUZwY21sbGN5OWpiR0Z6Y3k1dGVYTnhiQzV3YUhBOEwySStJRzl1SUd4cGJtVWdQR0krTmpnOEwySStQR0p5SUM4K0NqeGljaUF2UGdvOFlqNVhZWEp1YVc1blBDOWlQam9nSUcxNWMzRnNYM0YxWlhKNUtDa2dXenhoSUdoeVpXWTlKMloxYm1OMGFXOXVMbTE1YzNGc0xYRjFaWEo1Sno1bWRXNWpkR2x2Ymk1dGVYTnhiQzF4ZFdWeWVUd3ZZVDVkT2lCQklHeHBibXNnZEc4Z2RHaGxJSE5sY25abGNpQmpiM1ZzWkNCdWIzUWdZbVVnWlhOMFlXSnNhWE5vWldRZ2FXNGdQR0krTDJodmJXVXZZV3BoZUd4dllXUXZkM2QzTDJ4cFluSmhhWEpwWlhNdlkyeGhjM011YlhsemNXd3VjR2h3UEM5aVBpQnZiaUJzYVc1bElEeGlQalk0UEM5aVBqeGljaUF2UGdvOFluSWdMejRLUEdJK1YyRnlibWx1Wnp3dllqNDZJQ0J0ZVhOeGJGOXhkV1Z5ZVNncElGczhZU0JvY21WbVBTZG1kVzVqZEdsdmJpNXRlWE54YkMxeGRXVnllU2MrWm5WdVkzUnBiMjR1YlhsemNXd3RjWFZsY25rOEwyRStYVG9nUTJGdUozUWdZMjl1Ym1WamRDQjBieUJzYjJOaGJDQk5lVk5SVENCelpYSjJaWElnZEdoeWIzVm5hQ0J6YjJOclpYUWdKeTkyWVhJdmNuVnVMMjE1YzNGc1pDOXRlWE54YkdRdWMyOWpheWNnS0RJcElHbHVJRHhpUGk5b2IyMWxMMkZxWVhoc2IyRmtMM2QzZHk5c2FXSnlZV2x5YVdWekwyTnNZWE56TG0xNWMzRnNMbkJvY0R3dllqNGdiMjRnYkdsdVpTQThZajQyT0R3dllqNDhZbklnTHo0S1BHSnlJQzgrQ2p4aVBsZGhjbTVwYm1jOEwySStPaUFnYlhsemNXeGZjWFZsY25rb0tTQmJQR0VnYUhKbFpqMG5ablZ1WTNScGIyNHViWGx6Y1d3dGNYVmxjbmtuUG1aMWJtTjBhVzl1TG0xNWMzRnNMWEYxWlhKNVBDOWhQbDA2SUVFZ2JHbHVheUIwYnlCMGFHVWdjMlZ5ZG1WeUlHTnZkV3hrSUc1dmRDQmlaU0JsYzNSaFlteHBjMmhsWkNCcGJpQThZajR2YUc5dFpTOWhhbUY0Ykc5aFpDOTNkM2N2YkdsaWNtRnBjbWxsY3k5amJHRnpjeTV0ZVhOeGJDNXdhSEE4TDJJK0lHOXVJR3hwYm1VZ1BHSStOamc4TDJJK1BHSnlJQzgrQ2c9PVwiXG4iLCJjb25zdCB1ID0gcmVxdWlyZSgnLi91dGlsJylcblxuY29uc3QgTVEgPSBNYXRoUXVpbGwuZ2V0SW50ZXJmYWNlKDIpXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fVxuXG5mdW5jdGlvbiBpbml0KCRvdXRlclBsYWNlaG9sZGVyLCBmb2N1cywgb25NYXRoRm9jdXNDaGFuZ2VkKSB7XG4gICAgY29uc3QgJG1hdGhFZGl0b3JDb250YWluZXIgPSAkKGBcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1hdGgtZWRpdG9yXCIgZGF0YS1qcz1cIm1hdGhFZGl0b3JcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYXRoLWVkaXRvci1lcXVhdGlvbi1maWVsZFwiIGRhdGEtanM9XCJlcXVhdGlvbkZpZWxkXCI+PC9kaXY+XG4gICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCJtYXRoLWVkaXRvci1sYXRleC1maWVsZFwiIGRhdGEtanM9XCJsYXRleEZpZWxkXCIgcGxhY2Vob2xkZXI9XCJMYVRleFwiPjwvdGV4dGFyZWE+XG4gICAgICAgIDwvZGl2PmApXG5cbiAgICAkb3V0ZXJQbGFjZWhvbGRlci5hcHBlbmQoJG1hdGhFZGl0b3JDb250YWluZXIpXG4gICAgY29uc3QgJGxhdGV4RmllbGQgPSAkbWF0aEVkaXRvckNvbnRhaW5lci5maW5kKCdbZGF0YS1qcz1cImxhdGV4RmllbGRcIl0nKVxuICAgIGNvbnN0ICRlcXVhdGlvbkZpZWxkID0gJG1hdGhFZGl0b3JDb250YWluZXIuZmluZCgnW2RhdGEtanM9XCJlcXVhdGlvbkZpZWxkXCJdJylcbiAgICBsZXQgbXFFZGl0VGltZW91dFxuICAgIGxldCB2aXNpYmxlID0gZmFsc2VcbiAgICBsZXQgZm9jdXNDaGFuZ2VkID0gbnVsbFxuICAgIC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9scyxKU1VudXNlZExvY2FsU3ltYm9sc1xuICAgIGNvbnN0IG1xSW5zdGFuY2UgPSBNUS5NYXRoRmllbGQoJGVxdWF0aW9uRmllbGQuZ2V0KDApLCB7XG4gICAgICAgIGhhbmRsZXJzOiB7XG4gICAgICAgICAgICBlZGl0OiBvbk1xRWRpdCxcbiAgICAgICAgICAgIGVudGVyOiBmaWVsZCA9PiB7XG4gICAgICAgICAgICAgICAgY2xvc2VNYXRoRWRpdG9yKHRydWUpXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBpbnNlcnROZXdFcXVhdGlvbignPGJyPicpLCAyKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbiAgICAkZXF1YXRpb25GaWVsZFxuICAgICAgICAub24oJ2tleWRvd24nLCAnLm1xLXRleHRhcmVhIHRleHRhcmVhJywgb25NcUVkaXQpXG4gICAgICAgIC5vbignZm9jdXMgYmx1cicsICcubXEtdGV4dGFyZWEgdGV4dGFyZWEnLCBlID0+IHtcbiAgICAgICAgICAgIGZvY3VzLmVxdWF0aW9uRmllbGQgPSBlLnR5cGUgIT09ICdibHVyJyAmJiBlLnR5cGUgIT09ICdmb2N1c291dCdcbiAgICAgICAgICAgIG9uRm9jdXNDaGFuZ2VkKClcbiAgICAgICAgfSlcblxuICAgICRsYXRleEZpZWxkXG4gICAgICAgIC5rZXl1cChvbkxhdGV4VXBkYXRlKVxuICAgICAgICAub24oJ2ZvY3VzIGJsdXInLCBlID0+IHtcbiAgICAgICAgICAgIGZvY3VzLmxhdGV4RmllbGQgPSBlLnR5cGUgIT09ICdibHVyJ1xuICAgICAgICAgICAgb25Gb2N1c0NoYW5nZWQoKVxuICAgICAgICB9KVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5zZXJ0TmV3RXF1YXRpb24sXG4gICAgICAgIGluc2VydE1hdGgsXG4gICAgICAgIGNsb3NlTWF0aEVkaXRvcixcbiAgICAgICAgb3Blbk1hdGhFZGl0b3IsXG4gICAgICAgIG9uRm9jdXNDaGFuZ2VkLFxuICAgICAgICBpc1Zpc2libGVcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1Zpc2libGUoKSB7XG4gICAgICAgIHJldHVybiB2aXNpYmxlXG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uTXFFZGl0KCkge1xuICAgICAgICBjbGVhclRpbWVvdXQobXFFZGl0VGltZW91dClcbiAgICAgICAgbXFFZGl0VGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGZvY3VzLmxhdGV4RmllbGQpXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICBjb25zdCBsYXRleCA9IG1xSW5zdGFuY2UubGF0ZXgoKVxuICAgICAgICAgICAgJGxhdGV4RmllbGQudmFsKGxhdGV4KVxuICAgICAgICAgICAgdXBkYXRlTWF0aEltZygkbWF0aEVkaXRvckNvbnRhaW5lci5wcmV2KCksIGxhdGV4KVxuICAgICAgICB9LCAxMDApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25MYXRleFVwZGF0ZSgpIHtcbiAgICAgICAgdXBkYXRlTWF0aEltZygkbWF0aEVkaXRvckNvbnRhaW5lci5wcmV2KCksICRsYXRleEZpZWxkLnZhbCgpKVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IG1xSW5zdGFuY2UubGF0ZXgoJGxhdGV4RmllbGQudmFsKCkpLCAxKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRm9jdXNDaGFuZ2VkKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoZm9jdXNDaGFuZ2VkKVxuICAgICAgICBmb2N1c0NoYW5nZWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICghZm9jdXMubGF0ZXhGaWVsZCAmJiAhZm9jdXMuZXF1YXRpb25GaWVsZCkgY2xvc2VNYXRoRWRpdG9yKClcbiAgICAgICAgICAgIG9uTWF0aEZvY3VzQ2hhbmdlZCgpXG4gICAgICAgIH0sIDApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zZXJ0TmV3RXF1YXRpb24ob3B0aW9uYWxNYXJrdXAgPSAnJykge1xuICAgICAgICB3aW5kb3cuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydEhUTUwnLCBmYWxzZSwgb3B0aW9uYWxNYXJrdXAgKyAnPGltZyBkYXRhLWpzPVwibmV3XCIgYWx0PVwiXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lXCIvPicpXG4gICAgICAgIHNob3dNYXRoRWRpdG9yKCQoJ1tkYXRhLWpzPVwibmV3XCJdJykucmVtb3ZlQXR0cignZGF0YS1qcycpKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9wZW5NYXRoRWRpdG9yKCRpbWcpIHtcbiAgICAgICAgaWYgKHZpc2libGUpIGNsb3NlTWF0aEVkaXRvcigpXG4gICAgICAgIHUuc2V0Q3Vyc29yQWZ0ZXIoJGltZylcbiAgICAgICAgc2hvd01hdGhFZGl0b3IoJGltZylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaG93TWF0aEVkaXRvcigkaW1nKSB7XG4gICAgICAgICRpbWcuaGlkZSgpXG4gICAgICAgICRpbWcuYWZ0ZXIoJG1hdGhFZGl0b3JDb250YWluZXIpXG4gICAgICAgIHZpc2libGUgPSB0cnVlXG4gICAgICAgIHRvZ2dsZU1hdGhUb29sYmFyKHRydWUpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gbXFJbnN0YW5jZS5mb2N1cygpLCAwKVxuICAgICAgICAkbGF0ZXhGaWVsZC52YWwoJGltZy5wcm9wKCdhbHQnKSlcbiAgICAgICAgb25MYXRleFVwZGF0ZSgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zZXJ0TWF0aChzeW1ib2wsIGFsdGVybmF0aXZlU3ltYm9sLCB1c2VXcml0ZSkge1xuICAgICAgICBpZiAoZm9jdXMubGF0ZXhGaWVsZCkge1xuICAgICAgICAgICAgdS5pbnNlcnRUb1RleHRBcmVhQXRDdXJzb3IoJGxhdGV4RmllbGQuZ2V0KDApLCBhbHRlcm5hdGl2ZVN5bWJvbCB8fCBzeW1ib2wpXG4gICAgICAgICAgICBvbkxhdGV4VXBkYXRlKClcbiAgICAgICAgfSBlbHNlIGlmIChmb2N1cy5lcXVhdGlvbkZpZWxkKSB7XG4gICAgICAgICAgICBpZiAodXNlV3JpdGUpIHtcbiAgICAgICAgICAgICAgICBtcUluc3RhbmNlLndyaXRlKHN5bWJvbClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbXFJbnN0YW5jZS50eXBlZFRleHQoc3ltYm9sKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN5bWJvbC5zdGFydHNXaXRoKCdcXFxcJykpIG1xSW5zdGFuY2Uua2V5c3Ryb2tlKCdUYWInKVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBtcUluc3RhbmNlLmZvY3VzKCksIDApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVNYXRoSW1nKCRpbWcsIGxhdGV4KSB7XG4gICAgICAgICRpbWcucHJvcCh7XG4gICAgICAgICAgICBzcmM6ICcvbWF0aC5zdmc/bGF0ZXg9JyArIGVuY29kZVVSSUNvbXBvbmVudChsYXRleCksXG4gICAgICAgICAgICBhbHQ6IGxhdGV4XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvc2VNYXRoRWRpdG9yKHNldEZvY3VzQWZ0ZXJDbG9zZSA9IGZhbHNlKSB7XG4gICAgICAgIC8vIFRPRE86IHJlbW92ZSBldmVudCBiaW5kaW5nc1xuICAgICAgICBjb25zdCAkY3VycmVudEVkaXRvciA9ICRtYXRoRWRpdG9yQ29udGFpbmVyLmNsb3Nlc3QoJ1tkYXRhLWpzPVwiYW5zd2VyXCJdJylcbiAgICAgICAgY29uc3QgJGltZyA9ICRtYXRoRWRpdG9yQ29udGFpbmVyLnByZXYoKVxuICAgICAgICBpZiAoJGxhdGV4RmllbGQudmFsKCkudHJpbSgpID09PSAnJykge1xuICAgICAgICAgICAgJGltZy5yZW1vdmUoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGltZy5zaG93KClcbiAgICAgICAgICAgIHVwZGF0ZU1hdGhJbWcoJGltZywgJGxhdGV4RmllbGQudmFsKCkpXG4gICAgICAgIH1cblxuICAgICAgICB0b2dnbGVNYXRoVG9vbGJhcihmYWxzZSlcbiAgICAgICAgJG91dGVyUGxhY2Vob2xkZXIuYXBwZW5kKCRtYXRoRWRpdG9yQ29udGFpbmVyKVxuICAgICAgICB2aXNpYmxlID0gZmFsc2VcbiAgICAgICAgZm9jdXMubGF0ZXhGaWVsZCA9IGZhbHNlXG4gICAgICAgIGZvY3VzLmVxdWF0aW9uRmllbGQgPSBmYWxzZVxuICAgICAgICBpZiAoc2V0Rm9jdXNBZnRlckNsb3NlKSAkY3VycmVudEVkaXRvci5mb2N1cygpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlTWF0aFRvb2xiYXIoaXNWaXNpYmxlKSB7XG4gICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnbWF0aC1lZGl0b3ItZm9jdXMnLCBpc1Zpc2libGUpXG4gICAgfVxufVxuIiwiY29uc3QgdSA9IHJlcXVpcmUoJy4vdXRpbCcpXG5jb25zdCB0b29sYmFycyA9IHJlcXVpcmUoJy4vdG9vbGJhcnMnKVxuY29uc3QgbWF0aEVkaXRvciA9IHJlcXVpcmUoJy4vbWF0aC1lZGl0b3InKVxuY29uc3QgbG9jYWxlcyA9IHtcbiAgICBGSTogcmVxdWlyZSgnLi9GSScpLFxuICAgIFNWOiByZXF1aXJlKCcuL1NWJylcbn1cbmNvbnN0IGwgPSBsb2NhbGVzW3dpbmRvdy5sb2NhbGUgfHwgJ0ZJJ10uZWRpdG9yXG5jb25zdCBrZXlDb2RlcyA9IHtcbiAgICBFTlRFUjogMTMsXG4gICAgRVNDOiAyN1xufVxuY29uc3QgJG91dGVyUGxhY2Vob2xkZXIgPSAkKGA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci1oaWRkZW5cIiBkYXRhLWpzPVwib3V0ZXJQbGFjZWhvbGRlclwiPmApXG5jb25zdCBmb2N1cyA9IHtcbiAgICByaWNoVGV4dDogZmFsc2UsXG4gICAgbGF0ZXhGaWVsZDogZmFsc2UsXG4gICAgZXF1YXRpb25GaWVsZDogZmFsc2Vcbn1cbmxldCAkY3VycmVudEVkaXRvclxuY29uc3QgbWF0aCA9IG1hdGhFZGl0b3IuaW5pdCgkb3V0ZXJQbGFjZWhvbGRlciwgZm9jdXMsIG9uTWF0aEZvY3VzQ2hhbmdlZClcblxuZnVuY3Rpb24gb25NYXRoRm9jdXNDaGFuZ2VkKCkge1xuICAgIGlmIChyaWNoVGV4dEFuZE1hdGhCbHVyKCkpIG9uUmljaFRleHRFZGl0b3JCbHVyKClcbn1cblxuY29uc3QgeyR0b29sYmFyfSA9IHRvb2xiYXJzLmluaXQobWF0aCwgKCkgPT4gZm9jdXMucmljaFRleHQsIGwpXG5cbiQoJ2JvZHknKS5hcHBlbmQoJG91dGVyUGxhY2Vob2xkZXIsICR0b29sYmFyKVxuXG5tb2R1bGUuZXhwb3J0cy5tYWtlUmljaFRleHQgPSAoZWxlbWVudCwgb3B0aW9ucywgb25WYWx1ZUNoYW5nZWQgPSAoKSA9PiB7IH0pID0+IHtcbiAgICBjb25zdCB7XG4gICAgICAgIHNjcmVlbnNob3Q6IHtcbiAgICAgICAgICAgIHNhdmVyLFxuICAgICAgICAgICAgbGltaXRcbiAgICAgICAgfVxuICAgIH0gPSBvcHRpb25zXG4gICAgY29uc3QgJGFuc3dlciA9ICQoZWxlbWVudClcbiAgICBsZXQgcGFzdGVJblByb2dyZXNzID0gZmFsc2VcblxuICAgICRhbnN3ZXJcbiAgICAgICAgLmF0dHIoe1xuICAgICAgICAgICAgJ2NvbnRlbnRlZGl0YWJsZSc6ICd0cnVlJyxcbiAgICAgICAgICAgICdzcGVsbGNoZWNrJzogJ2ZhbHNlJyxcbiAgICAgICAgICAgICdkYXRhLWpzJzogJ2Fuc3dlcidcbiAgICAgICAgfSlcbiAgICAgICAgLmFkZENsYXNzKCdyaWNoLXRleHQtZWRpdG9yJylcbiAgICAgICAgLm9uKCdtb3VzZWRvd24nLCB1LmVxdWF0aW9uSW1hZ2VTZWxlY3RvciwgZSA9PiB7XG4gICAgICAgICAgICBvblJpY2hUZXh0RWRpdG9yRm9jdXMoJChlLnRhcmdldCkuY2xvc2VzdCgnW2RhdGEtanM9XCJhbnN3ZXJcIl0nKSlcbiAgICAgICAgICAgIG1hdGgub3Blbk1hdGhFZGl0b3IoJChlLnRhcmdldCkpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbigna2V5cHJlc3MnLCBlID0+IHtcbiAgICAgICAgICAgIGlmICh1LmlzQ3RybEtleShlLCAnbCcpIHx8IHUuaXNDdHJsS2V5KGUsICdpJykpIG1hdGguaW5zZXJ0TmV3RXF1YXRpb24oKVxuICAgICAgICAgICAgaWYgKHUuaXNDdHJsS2V5KGUsIGtleUNvZGVzLkVOVEVSKSB8fCB1LmlzS2V5KGUsIGtleUNvZGVzLkVTQykpIG1hdGguY2xvc2VNYXRoRWRpdG9yKHRydWUpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZm9jdXMgYmx1cicsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKG1hdGguaXNWaXNpYmxlKCkgJiYgZS50eXBlID09PSAnZm9jdXMnKSBtYXRoLmNsb3NlTWF0aEVkaXRvcigpXG4gICAgICAgICAgICBvblJpY2hUZXh0RWRpdG9yRm9jdXNDaGFuZ2VkKGUpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbigna2V5dXAgaW5wdXQnLCBlID0+IHtcbiAgICAgICAgICAgIGlmKCEgcGFzdGVJblByb2dyZXNzKSBvblZhbHVlQ2hhbmdlZCh1LnNhbml0aXplQ29udGVudChlLmN1cnJlbnRUYXJnZXQpKVxuICAgICAgICB9KVxuICAgICAgICAub24oJ3Bhc3RlJywgZSA9PiB7XG4gICAgICAgICAgICBwYXN0ZUluUHJvZ3Jlc3MgPSB0cnVlXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHBhc3RlSW5Qcm9ncmVzcyA9IGZhbHNlLCAwKVxuXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJylcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIGNvbnN0IGNsaXBib2FyZERhdGEgPSBlLm9yaWdpbmFsRXZlbnQuY2xpcGJvYXJkRGF0YVxuICAgICAgICAgICAgY29uc3QgZmlsZSA9IGNsaXBib2FyZERhdGEuaXRlbXMgJiYgY2xpcGJvYXJkRGF0YS5pdGVtc1swXS5nZXRBc0ZpbGUoKVxuICAgICAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgICAgICBvblBhc3RlQmxvYihlLCBmaWxlLCBzYXZlcilcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2xpcGJvYXJkRGF0YUFzSHRtbCA9IGNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dC9odG1sJylcbiAgICAgICAgICAgICAgICBpZiAoY2xpcGJvYXJkRGF0YUFzSHRtbCkgb25QYXN0ZUh0bWwoZSwgJGFuc3dlciwgY2xpcGJvYXJkRGF0YUFzSHRtbCwgbGltaXQsIHNhdmVyLCBvblZhbHVlQ2hhbmdlZClcbiAgICAgICAgICAgICAgICBlbHNlIG9uTGVnYWN5UGFzdGVJbWFnZShzYXZlciwgbGltaXQsIG9uVmFsdWVDaGFuZ2VkKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIHNldFRpbWVvdXQoKCkgPT4gZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJlbmFibGVPYmplY3RSZXNpemluZ1wiLCBmYWxzZSwgZmFsc2UpLCAwKVxufVxuXG5mdW5jdGlvbiBvblBhc3RlQmxvYihldmVudCwgZmlsZSwgc2F2ZXIpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgaWYgKGZpbGUudHlwZSA9PT0gJ2ltYWdlL3BuZycpIHtcbiAgICAgICAgc2F2ZXIoe2RhdGE6IGZpbGUsIHR5cGU6IGZpbGUudHlwZSwgaWQ6IFN0cmluZyhuZXcgRGF0ZSgpLmdldFRpbWUoKSl9KS50aGVuKHNjcmVlbnNob3RVcmwgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW1nID0gYDxpbWcgc3JjPVwiJHtzY3JlZW5zaG90VXJsfVwiLz5gXG4gICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydEhUTUwnLCBmYWxzZSwgaW1nKVxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZnVuY3Rpb24gb25QYXN0ZUh0bWwoZXZlbnQsICRhbnN3ZXIsIGNsaXBib2FyZERhdGFBc0h0bWwsIGxpbWl0LCBzYXZlciwgb25WYWx1ZUNoYW5nZWQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgaWYgKHUudG90YWxJbWFnZUNvdW50KCRhbnN3ZXIsIGNsaXBib2FyZERhdGFBc0h0bWwpIDw9IGxpbWl0KSB7XG4gICAgICAgIHdpbmRvdy5kb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0SFRNTCcsIGZhbHNlLCB1LnNhbml0aXplKGNsaXBib2FyZERhdGFBc0h0bWwpKVxuICAgICAgICB1LnBlcnNpc3RJbmxpbmVJbWFnZXMoJGN1cnJlbnRFZGl0b3IsIHNhdmVyLCBsaW1pdCwgb25WYWx1ZUNoYW5nZWQpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgb25WYWx1ZUNoYW5nZWQodS5TQ1JFRU5TSE9UX0xJTUlUX0VSUk9SKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gb25MZWdhY3lQYXN0ZUltYWdlKHNhdmVyLCBsaW1pdCwgb25WYWx1ZUNoYW5nZWQpIHtcbiAgICB1LnBlcnNpc3RJbmxpbmVJbWFnZXMoJGN1cnJlbnRFZGl0b3IsIHNhdmVyLCBsaW1pdCwgb25WYWx1ZUNoYW5nZWQpXG59XG5cbmZ1bmN0aW9uIHRvZ2dsZVJpY2hUZXh0VG9vbGJhcihpc1Zpc2libGUpIHtcbiAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ3JpY2gtdGV4dC1lZGl0b3ItZm9jdXMnLCBpc1Zpc2libGUpXG59XG5cbmZ1bmN0aW9uIG9uUmljaFRleHRFZGl0b3JGb2N1cygkZWxlbWVudCkge1xuICAgICRjdXJyZW50RWRpdG9yID0gJGVsZW1lbnRcbiAgICB0b2dnbGVSaWNoVGV4dFRvb2xiYXIodHJ1ZSlcbn1cblxuZnVuY3Rpb24gb25SaWNoVGV4dEVkaXRvckJsdXIoKSB7XG4gICAgdG9nZ2xlUmljaFRleHRUb29sYmFyKGZhbHNlKVxuICAgIG1hdGguY2xvc2VNYXRoRWRpdG9yKClcbiAgICBmb2N1cy5yaWNoVGV4dCA9IGZhbHNlXG59XG5cbmxldCByaWNoVGV4dEVkaXRvckJsdXJUaW1lb3V0XG5cbmZ1bmN0aW9uIG9uUmljaFRleHRFZGl0b3JGb2N1c0NoYW5nZWQoZSkge1xuICAgIGZvY3VzLnJpY2hUZXh0ID0gZS50eXBlID09PSAnZm9jdXMnXG5cbiAgICBjbGVhclRpbWVvdXQocmljaFRleHRFZGl0b3JCbHVyVGltZW91dClcbiAgICByaWNoVGV4dEVkaXRvckJsdXJUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChyaWNoVGV4dEFuZE1hdGhCbHVyKCkpIG9uUmljaFRleHRFZGl0b3JCbHVyKClcbiAgICAgICAgZWxzZSBpZiAoZm9jdXMucmljaFRleHQgJiYgbWF0aC5pc1Zpc2libGUoKSkgbWF0aC5jbG9zZU1hdGhFZGl0b3IoKVxuICAgICAgICBlbHNlIG9uUmljaFRleHRFZGl0b3JGb2N1cygkKGUudGFyZ2V0KSlcbiAgICB9LCAwKVxufVxuXG5mdW5jdGlvbiByaWNoVGV4dEFuZE1hdGhCbHVyKCkge1xuICAgIHJldHVybiAhZm9jdXMucmljaFRleHQgJiYgIW1hdGguaXNWaXNpYmxlKCkgJiYgIWZvY3VzLmxhdGV4RmllbGQgJiYgIWZvY3VzLmVxdWF0aW9uRmllbGRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGFsbG93ZWRUYWdzOiBbXG4gICAgICAgICdkaXYnLFxuICAgICAgICAnaW1nJyxcbiAgICAgICAgJ2JyJ1xuICAgIF0sXG4gICAgYWxsb3dlZEF0dHJpYnV0ZXM6IHtcbiAgICAgICAgaW1nOiBbJ3NyYycsICdhbHQnXVxuICAgIH0sXG4gICAgYWxsb3dlZFNjaGVtZXM6IFsnZGF0YSddLFxuICAgIGV4Y2x1c2l2ZUZpbHRlcjogZnVuY3Rpb24oZnJhbWUpIHsgcmV0dXJuIGZyYW1lLmF0dHJpYnNbJ2RhdGEtanMnXSA9PT0gJ21hdGhFZGl0b3InIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuICAgIHtcbiAgICAgICAgbGFiZWw6ICdQZXJ1cycsXG4gICAgICAgIGNoYXJhY3RlcnM6IFtcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4omgJywgbGF0ZXhDb21tYW5kOiAnXFxcXG5lcScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4omIJywgbGF0ZXhDb21tYW5kOiAnXFxcXGFwcHJveCcsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4omkJywgbGF0ZXhDb21tYW5kOiAnXFxcXGxlcScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4omlJywgbGF0ZXhDb21tYW5kOiAnXFxcXGdlcScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnwrInLCBsYXRleENvbW1hbmQ6ICdeMicsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnwrMnLCBsYXRleENvbW1hbmQ6ICdeMycsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnwr0nLCBsYXRleENvbW1hbmQ6ICcxLzInLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KFkycsIGxhdGV4Q29tbWFuZDogJzEvMycgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnwrEnLCBsYXRleENvbW1hbmQ6ICdcXFxccG0nIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBsYWJlbDogJ0FsZ2VicmEnLFxuICAgICAgICBjaGFyYWN0ZXJzOiBbXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIvCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxzaW0nIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KJoScsIGxhdGV4Q29tbWFuZDogJ1xcXFxlcXVpdicgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4omiJyB9LCAvLyBcXG5lcXVpdiBvciBcXG5vdFxcZXF1aXZcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnwrcnLCBsYXRleENvbW1hbmQ6ICdcXFxcY2RvdCcsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oCmJywgbGF0ZXhDb21tYW5kOiAnXFxcXGRvdHMnIH0sIC8vIG1hdHJpaXNpYWxnZWJyYT9cbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oieJywgbGF0ZXhDb21tYW5kOiAnXFxcXGluZnR5JywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGxhYmVsOiAnS3JlaWtrYWxhaXNldCBhYWtrb3NldCcsXG4gICAgICAgIGNoYXJhY3RlcnM6IFtcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzrEnLCBsYXRleENvbW1hbmQ6ICdcXFxcYWxwaGEnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86yJywgbGF0ZXhDb21tYW5kOiAnXFxcXGJldGEnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ860JywgbGF0ZXhDb21tYW5kOiAnXFxcXGRlbHRhJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOtScsIGxhdGV4Q29tbWFuZDogJ1xcXFx2YXJlcHNpbG9uJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOtycsIGxhdGV4Q29tbWFuZDogJ1xcXFxldGEnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIgicsIGxhdGV4Q29tbWFuZDogJ1xcXFxwYXJ0aWFsJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfwnZyEJywgbGF0ZXhDb21tYW5kOiAnXFxcXGlvdGEnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ867JywgbGF0ZXhDb21tYW5kOiAnXFxcXGxhbWJkYScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnwrUnLCBsYXRleENvbW1hbmQ6ICdcXFxcbXUnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8+AJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBpJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfPgycsIGxhdGV4Q29tbWFuZDogJ1xcXFxzaWdtYScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnz4QnLCBsYXRleENvbW1hbmQ6ICdcXFxcdGF1JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfQpCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxwaGknIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8+JJywgbGF0ZXhDb21tYW5kOiAnXFxcXG9tZWdhJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOkycsIGxhdGV4Q29tbWFuZDogJ1xcXFxHYW1tYScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzpQnLCBsYXRleENvbW1hbmQ6ICdcXFxcRGVsdGEnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86YJywgbGF0ZXhDb21tYW5kOiAnXFxcXFRoZXRhJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiI8nLCBsYXRleENvbW1hbmQ6ICdcXFxcUGknIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIkScsIGxhdGV4Q29tbWFuZDogJ1xcXFxTaWdtYScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzqYnLCBsYXRleENvbW1hbmQ6ICdcXFxcUGhpJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOqScsIGxhdGV4Q29tbWFuZDogJ1xcXFxPbWVnYScgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGxhYmVsOiAnR2VvbWV0cmlhIGphIHZla3RvcmlvcHBpJyxcbiAgICAgICAgY2hhcmFjdGVyczogW1xuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfCsCcsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oigJywgbGF0ZXhDb21tYW5kOiAnXFxcXGFuZ2xlJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiqUnLCBsYXRleENvbW1hbmQ6ICdcXFxccGVycCcsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oCWJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBhcmFsbGVsJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfih4UnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KGkScsIGxhdGV4Q29tbWFuZDogJ1xcXFx1cGFycm93JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihpMnLCBsYXRleENvbW1hbmQ6ICdcXFxcZG93bmFycm93JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihpQnLCBsYXRleENvbW1hbmQ6ICdcXFxcbGVmdHJpZ2h0YXJyb3cnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KHjCcgfSAvLyBcXHJpZ2h0bGVmdGhhcnBvb25zXG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbGFiZWw6ICdMb2dpaWtrYSBqYSBqb3Vra28tb3BwaScsXG4gICAgICAgIGNoYXJhY3RlcnM6IFtcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oeSJywgbGF0ZXhDb21tYW5kOiAnXFxcXFJpZ2h0YXJyb3cnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KHlCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxMZWZ0cmlnaHRhcnJvdycsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oinJywgbGF0ZXhDb21tYW5kOiAnXFxcXGFuZCcgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oioJywgbGF0ZXhDb21tYW5kOiAnXFxcXG9yJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfCrCcgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiDJywgbGF0ZXhDb21tYW5kOiAnXFxcXGV4aXN0cycsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiAJywgbGF0ZXhDb21tYW5kOiAnXFxcXGZvcmFsbCcsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oipJywgbGF0ZXhDb21tYW5kOiAnXFxcXGNhcCcgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiqJywgbGF0ZXhDb21tYW5kOiAnXFxcXGN1cCcgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiWJywgbGF0ZXhDb21tYW5kOiAnXFxcXHNldG1pbnVzJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiioInLCBsYXRleENvbW1hbmQ6ICdcXFxcc3Vic2V0JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiioQnLCBsYXRleENvbW1hbmQ6ICdcXFxcbm90c3Vic2V0JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiIgnLCBsYXRleENvbW1hbmQ6ICdcXFxcaW4nIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIiScsIGxhdGV4Q29tbWFuZDogJ1xcXFxub3RpbicgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiFJywgbGF0ZXhDb21tYW5kOiAnXFxcXGVtcHR5JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihpInLCBsYXRleENvbW1hbmQ6ICdcXFxccmlnaHRhcnJvdycgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiYJywgbGF0ZXhDb21tYW5kOiAnXFxcXGNpcmMnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIvCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxzaW0nIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KEnScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oSVJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihKQnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KEmicgfVxuICAgICAgICBdXG4gICAgfVxuXVxuIiwiY29uc3Qgc3BlY2lhbENoYXJhY3Rlckdyb3VwcyA9IHJlcXVpcmUoJy4vc3BlY2lhbENoYXJhY3RlcnMnKVxuY29uc3QgbGF0ZXhDb21tYW5kcyA9IHJlcXVpcmUoJy4vbGF0ZXhDb21tYW5kcycpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGluaXQsXG59XG5cbmZ1bmN0aW9uIGluaXQobWF0aEVkaXRvciwgaGFzUmljaFRleHRGb2N1cywgbCkge1xuICAgIGNvbnN0ICR0b29sYmFyID0gJChgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xzXCIgZGF0YS1qcz1cInRvb2xzXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29scy1idXR0b24td3JhcHBlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xiYXItd3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci1jaGFyYWN0ZXJzLWV4cGFuZC1jb2xsYXBzZVwiIGRhdGEtanM9XCJleHBhbmRDb2xsYXBzZUNoYXJhY3RlcnNcIiBzdHlsZT1cInotaW5kZXg6IDEwMFwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29scy1yb3dcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29sYmFyLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhci1jaGFyYWN0ZXJzIHJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhciByaWNoLXRleHQtZWRpdG9yLXRvb2xiYXItYnV0dG9uLWxpc3RcIiBkYXRhLWpzPVwiY2hhcmFjdGVyc0xpc3RcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbHMtcm93XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhci13cmFwcGVyIHJpY2gtdGV4dC1lZGl0b3ItZXF1YXRpb24td3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29sYmFyLWVxdWF0aW9uIHJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhciByaWNoLXRleHQtZWRpdG9yLXRvb2xiYXItYnV0dG9uLWxpc3RcIiBkYXRhLWpzPVwibWF0aFRvb2xiYXJcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbHMtYnV0dG9uLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29sYmFyLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItbmV3LWVxdWF0aW9uIHJpY2gtdGV4dC1lZGl0b3ItYnV0dG9uIHJpY2gtdGV4dC1lZGl0b3ItYnV0dG9uLWFjdGlvblwiIGRhdGEtanM9XCJuZXdFcXVhdGlvblwiIGRhdGEtY29tbWFuZD1cIkN0cmwtTFwiPs6jICR7bC5pbnNlcnRFcXVhdGlvbn08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgYClcbiAgICAgICAgLm9uKCdtb3VzZWRvd24nLCAnW2RhdGEtanM9XCJleHBhbmRDb2xsYXBzZUNoYXJhY3RlcnNcIl0nLCBlID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgJHRvb2xiYXIudG9nZ2xlQ2xhc3MoJ3JpY2gtdGV4dC1lZGl0b3ItY2hhcmFjdGVycy1leHBhbmRlZCcpXG4gICAgICAgIH0pXG5cbiAgICBjb25zdCAkbmV3RXF1YXRpb24gPSAkdG9vbGJhci5maW5kKCdbZGF0YS1qcz1cIm5ld0VxdWF0aW9uXCJdJylcbiAgICBjb25zdCAkbWF0aFRvb2xiYXIgPSAkdG9vbGJhci5maW5kKCdbZGF0YS1qcz1cIm1hdGhUb29sYmFyXCJdJylcbiAgICBpbml0U3BlY2lhbENoYXJhY3RlclRvb2xiYXIoJHRvb2xiYXIsIG1hdGhFZGl0b3IsIGhhc1JpY2hUZXh0Rm9jdXMpXG4gICAgaW5pdE1hdGhUb29sYmFyKCRtYXRoVG9vbGJhciwgbWF0aEVkaXRvcilcbiAgICBpbml0TmV3RXF1YXRpb24oJG5ld0VxdWF0aW9uLCBtYXRoRWRpdG9yLCBoYXNSaWNoVGV4dEZvY3VzKVxuXG4gICAgcmV0dXJuIHsgJHRvb2xiYXIgfVxufVxuXG5jb25zdCBzcGVjaWFsQ2hhcmFjdGVyVG9CdXR0b24gPSBjaGFyID0+IGA8YnV0dG9uIGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci1idXR0b24gcmljaC10ZXh0LWVkaXRvci1idXR0b24tZ3JpZCR7Y2hhci5wb3B1bGFyID8gJyByaWNoLXRleHQtZWRpdG9yLWNoYXJhY3RlcnMtcG9wdWxhcicgOicnfVwiICR7Y2hhci5sYXRleENvbW1hbmQgPyBgZGF0YS1jb21tYW5kPVwiJHtjaGFyLmxhdGV4Q29tbWFuZH1cImAgOiAnJ30+JHtjaGFyLmNoYXJhY3Rlcn08L2J1dHRvbj5gXG5cbmNvbnN0IHBvcHVsYXJJbkdyb3VwID0gZ3JvdXAgPT4gZ3JvdXAuY2hhcmFjdGVycy5maWx0ZXIoY2hhcmFjdGVyID0+IGNoYXJhY3Rlci5wb3B1bGFyKS5sZW5ndGhcblxuZnVuY3Rpb24gaW5pdFNwZWNpYWxDaGFyYWN0ZXJUb29sYmFyKCR0b29sYmFyLCBtYXRoRWRpdG9yLCBoYXNBbnN3ZXJGb2N1cykge1xuICAgIGNvbnN0IGdyaWRCdXR0b25XaWR0aFB4ID0gMzVcblxuICAgICR0b29sYmFyLmZpbmQoJ1tkYXRhLWpzPVwiY2hhcmFjdGVyc0xpc3RcIl0nKVxuICAgICAgICAuYXBwZW5kKHNwZWNpYWxDaGFyYWN0ZXJHcm91cHMubWFwKGdyb3VwID0+XG4gICAgICAgICAgICBgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhci1jaGFyYWN0ZXJzLWdyb3VwXCIgXG4gICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAke3BvcHVsYXJJbkdyb3VwKGdyb3VwKSAqIGdyaWRCdXR0b25XaWR0aFB4fXB4XCI+XG4gICAgICAgICAgICAgICAgICAke2dyb3VwLmNoYXJhY3RlcnMubWFwKHNwZWNpYWxDaGFyYWN0ZXJUb0J1dHRvbikuam9pbignJyl9XG4gICAgICAgICAgICAgPC9kaXY+YCkpXG4gICAgICAgIC5vbignbW91c2Vkb3duJywgJ2J1dHRvbicsIGUgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgICAgIGNvbnN0IGNoYXJhY3RlciA9IGUuY3VycmVudFRhcmdldC5pbm5lclRleHRcbiAgICAgICAgICAgIGNvbnN0IGNvbW1hbmQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jb21tYW5kXG4gICAgICAgICAgICBpZiAoaGFzQW5zd2VyRm9jdXMoKSkgd2luZG93LmRvY3VtZW50LmV4ZWNDb21tYW5kKCdpbnNlcnRUZXh0JywgZmFsc2UsIGNoYXJhY3RlcilcbiAgICAgICAgICAgIGVsc2UgbWF0aEVkaXRvci5pbnNlcnRNYXRoKGNvbW1hbmQgfHwgY2hhcmFjdGVyKVxuICAgICAgICB9KVxufVxuXG5mdW5jdGlvbiBpbml0TWF0aFRvb2xiYXIoJG1hdGhUb29sYmFyLCBtYXRoRWRpdG9yKSB7XG4gICAgJG1hdGhUb29sYmFyLmFwcGVuZChsYXRleENvbW1hbmRzXG4gICAgICAgIC5tYXAobyA9PiBgPGJ1dHRvbiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItYnV0dG9uIHJpY2gtdGV4dC1lZGl0b3ItYnV0dG9uLWdyaWRcIiBkYXRhLWNvbW1hbmQ9XCIke28uYWN0aW9ufVwiIGRhdGEtbGF0ZXhjb21tYW5kPVwiJHtvLmxhYmVsfVwiIGRhdGEtdXNld3JpdGU9XCIke28udXNlV3JpdGUgfHwgZmFsc2V9XCI+XG48aW1nIHNyYz1cIi9tYXRoLnN2Zz9sYXRleD0ke2VuY29kZVVSSUNvbXBvbmVudChvLmxhYmVsID8gby5sYWJlbC5yZXBsYWNlKC9YL2csICdcXFxcc3F1YXJlJykgOiBvLmFjdGlvbil9XCIvPlxuPC9idXR0b24+YCkuam9pbignJylcbiAgICApLm9uKCdtb3VzZWRvd24nLCAnYnV0dG9uJywgZSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBjb25zdCBkYXRhc2V0ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XG4gICAgICAgIG1hdGhFZGl0b3IuaW5zZXJ0TWF0aChkYXRhc2V0LmNvbW1hbmQsIGRhdGFzZXQubGF0ZXhjb21tYW5kLCBkYXRhc2V0LnVzZXdyaXRlID09PSAndHJ1ZScpXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gaW5pdE5ld0VxdWF0aW9uKCRuZXdFcXVhdGlvbiwgbWF0aEVkaXRvciwgaGFzQW5zd2VyRm9jdXMpIHtcbiAgICAkbmV3RXF1YXRpb24ubW91c2Vkb3duKChlID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGlmICghaGFzQW5zd2VyRm9jdXMoKSkgcmV0dXJuIC8vIFRPRE86IHJlbW92ZSB3aGVuIGJ1dHRvbiBpcyBvbmx5IHZpc2libGUgd2hlbiB0ZXh0YXJlYSBoYXMgZm9jdXNcbiAgICAgICAgbWF0aEVkaXRvci5pbnNlcnROZXdFcXVhdGlvbigpXG4gICAgfSkuYmluZCh0aGlzKSlcbn1cbiIsImNvbnN0IHNhbml0aXplSHRtbCA9IHJlcXVpcmUoJ3Nhbml0aXplLWh0bWwnKVxuY29uc3Qgc2FuaXRpemVPcHRzID0gcmVxdWlyZSgnLi9zYW5pdGl6ZU9wdHMnKVxuY29uc3QgbG9hZGluZ0ltZyA9IHJlcXVpcmUoJy4vbG9hZGluZ0ltZycpXG5jb25zdCBlcXVhdGlvbkltYWdlU2VsZWN0b3IgPSAnaW1nW3NyY149XCIvbWF0aC5zdmdcIl0nXG5cbmNvbnN0IFNDUkVFTlNIT1RfTElNSVRfRVJST1IgPSBuZXcgQmFjb24uRXJyb3IoJ1NjcmVlbnNob3QgbGltaXQgcmVhY2hlZCEnKVxubW9kdWxlLmV4cG9ydHMgPSB7aXNLZXksIGlzQ3RybEtleSwgaW5zZXJ0VG9UZXh0QXJlYUF0Q3Vyc29yLCBwZXJzaXN0SW5saW5lSW1hZ2VzLCBzYW5pdGl6ZSwgc2FuaXRpemVDb250ZW50LCBzZXRDdXJzb3JBZnRlciwgZXF1YXRpb25JbWFnZVNlbGVjdG9yLCB0b3RhbEltYWdlQ291bnQsIFNDUkVFTlNIT1RfTElNSVRfRVJST1J9XG5cblxuZnVuY3Rpb24gY29udmVydExpbmtzVG9SZWxhdGl2ZShodG1sKSB7XG4gICAgcmV0dXJuIGh0bWwucmVwbGFjZShuZXcgUmVnRXhwKGRvY3VtZW50LmxvY2F0aW9uLm9yaWdpbiwgJ2cnKSwgJycpXG59XG5cbmZ1bmN0aW9uIHNhbml0aXplKGh0bWwpIHtcbiAgICByZXR1cm4gc2FuaXRpemVIdG1sKGNvbnZlcnRMaW5rc1RvUmVsYXRpdmUoaHRtbCksIHNhbml0aXplT3B0cylcbn1cbmZ1bmN0aW9uIGluc2VydFRvVGV4dEFyZWFBdEN1cnNvcihmaWVsZCwgdmFsdWUpIHtcbiAgICBjb25zdCBzdGFydFBvcyA9IGZpZWxkLnNlbGVjdGlvblN0YXJ0XG4gICAgY29uc3QgZW5kUG9zID0gZmllbGQuc2VsZWN0aW9uRW5kXG4gICAgbGV0IG9sZFZhbHVlID0gZmllbGQudmFsdWVcbiAgICBmaWVsZC52YWx1ZSA9IG9sZFZhbHVlLnN1YnN0cmluZygwLCBzdGFydFBvcykgKyB2YWx1ZSArIG9sZFZhbHVlLnN1YnN0cmluZyhlbmRQb3MsIG9sZFZhbHVlLmxlbmd0aClcbiAgICBmaWVsZC5zZWxlY3Rpb25TdGFydCA9IGZpZWxkLnNlbGVjdGlvbkVuZCA9IHN0YXJ0UG9zICsgdmFsdWUubGVuZ3RoXG59XG5cbmZ1bmN0aW9uIGRlY29kZUJhc2U2NEltYWdlKGRhdGFTdHJpbmcpIHtcbiAgICBpZiAoIWRhdGFTdHJpbmcpXG4gICAgICAgIHJldHVybiBudWxsXG4gICAgY29uc3QgbWF0Y2hlcyA9IGRhdGFTdHJpbmcubWF0Y2goL15kYXRhOihbQS1aYS16LStcXC9dKyk7YmFzZTY0LCguKykkLylcbiAgICBpZiAobWF0Y2hlcy5sZW5ndGggIT09IDMpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogbWF0Y2hlc1sxXSxcbiAgICAgICAgZGF0YTogbmV3IEJ1ZmZlcihtYXRjaGVzWzJdLCAnYmFzZTY0JylcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzS2V5KGUsIGtleSkgeyByZXR1cm4gcHJldmVudElmVHJ1ZShlLCAhZS5hbHRLZXkgJiYgIWUuc2hpZnRLZXkgJiYgIWUuY3RybEtleSAgJiYga2V5T3JLZXlDb2RlKGUsIGtleSkpfVxuXG5mdW5jdGlvbiBpc0N0cmxLZXkoZSwga2V5KSB7IHJldHVybiBwcmV2ZW50SWZUcnVlKGUsICFlLmFsdEtleSAmJiAhZS5zaGlmdEtleSAmJiBlLmN0cmxLZXkgJiYga2V5T3JLZXlDb2RlKGUsIGtleSkpfVxuXG5mdW5jdGlvbiBrZXlPcktleUNvZGUoZSwgdmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJyA/IGUua2V5ID09PSB2YWwgOiBlLmtleUNvZGUgPT09IHZhbCB9XG5mdW5jdGlvbiBwcmV2ZW50SWZUcnVlKGUsIHZhbCkge1xuICAgIGlmKHZhbCkgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgcmV0dXJuIHZhbFxufVxuXG5mdW5jdGlvbiBzYW5pdGl6ZUNvbnRlbnQoYW5zd2VyRWxlbWVudCkge1xuICAgIGNvbnN0ICRhbnN3ZXJFbGVtZW50ID0gJChhbnN3ZXJFbGVtZW50KVxuICAgIGNvbnN0ICRtYXRoRWRpdG9yID0gJGFuc3dlckVsZW1lbnQuZmluZCgnW2RhdGEtanM9XCJtYXRoRWRpdG9yXCJdJylcbiAgICAkbWF0aEVkaXRvci5oaWRlKClcbiAgICBjb25zdCB0ZXh0ID0gJGFuc3dlckVsZW1lbnQudGV4dCgpXG4gICAgJG1hdGhFZGl0b3Iuc2hvdygpXG5cbiAgICBjb25zdCBodG1sID0gc2FuaXRpemUoJGFuc3dlckVsZW1lbnQuaHRtbCgpKVxuXG4gICAgcmV0dXJuIHsgYW5zd2VySFRNTDogaHRtbCwgYW5zd2VyVGV4dDogdGV4dCB9XG59XG5cbmZ1bmN0aW9uIHNldEN1cnNvckFmdGVyKCRpbWcpIHtcbiAgICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKClcbiAgICBjb25zdCBpbWcgPSAkaW1nLmdldCgwKVxuICAgIGNvbnN0IG5leHRTaWJsaW5nID0gaW1nLm5leHRTaWJsaW5nICYmIGltZy5uZXh0U2libGluZy50YWdOYW1lID09PSAnQlInID8gaW1nLm5leHRTaWJsaW5nIDogaW1nXG4gICAgcmFuZ2Uuc2V0U3RhcnQobmV4dFNpYmxpbmcsIDApXG4gICAgcmFuZ2Uuc2V0RW5kKG5leHRTaWJsaW5nLCAwKVxuICAgIGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKVxuICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKVxuICAgIHNlbC5hZGRSYW5nZShyYW5nZSlcbn1cblxuZnVuY3Rpb24gbWFya0FuZEdldElubGluZUltYWdlcygkZWRpdG9yKSB7XG4gICAgY29uc3QgaW1hZ2VzID0gJGVkaXRvci5maW5kKCdpbWdbc3JjXj1cImRhdGFcIl0nKS50b0FycmF5KClcbiAgICAgICAgLm1hcCgoZWwsIGluZGV4KSA9PiBPYmplY3QuYXNzaWduKGRlY29kZUJhc2U2NEltYWdlKGVsLmdldEF0dHJpYnV0ZSgnc3JjJykpLCB7XG4gICAgICAgICAgICAkZWw6ICQoZWwpXG4gICAgICAgIH0pKVxuICAgIGltYWdlcy5maWx0ZXIoKHt0eXBlfSkgPT4gdHlwZSAhPT0gJ2ltYWdlL3BuZycpLmZvckVhY2goKHskZWx9KSA9PiAkZWwucmVtb3ZlKCkpXG4gICAgY29uc3QgcG5nSW1hZ2VzID0gaW1hZ2VzLmZpbHRlcigoe3R5cGV9KSA9PiB0eXBlID09PSAnaW1hZ2UvcG5nJylcbiAgICBwbmdJbWFnZXMuZm9yRWFjaCgoeyRlbH0pID0+ICRlbC5hdHRyKCdzcmMnLCBsb2FkaW5nSW1nKSlcbiAgICByZXR1cm4gcG5nSW1hZ2VzXG59XG5cbmZ1bmN0aW9uIGV4aXN0aW5nU2NyZWVuc2hvdENvdW50KCRlZGl0b3IpIHtcbiAgICBjb25zdCBpbWFnZUNvdW50ID0gJGVkaXRvci5maW5kKCdpbWcnKS5sZW5ndGhcbiAgICBjb25zdCBlcXVhdGlvbkNvdW50ID0gJGVkaXRvci5maW5kKGVxdWF0aW9uSW1hZ2VTZWxlY3RvcikubGVuZ3RoXG4gICAgcmV0dXJuIGltYWdlQ291bnQgLSBlcXVhdGlvbkNvdW50XG59XG5cbmZ1bmN0aW9uIGNoZWNrRm9ySW1hZ2VMaW1pdCgkZWRpdG9yLCBpbWFnZURhdGEsIGxpbWl0KSB7XG4gICAgcmV0dXJuIEJhY29uLm9uY2UoZXhpc3RpbmdTY3JlZW5zaG90Q291bnQoJGVkaXRvcikgPiBsaW1pdCA/IG5ldyBCYWNvbi5FcnJvcigpIDogaW1hZ2VEYXRhKVxufVxuXG5mdW5jdGlvbiBwZXJzaXN0SW5saW5lSW1hZ2VzKCRlZGl0b3IsIHNjcmVlbnNob3RTYXZlciwgc2NyZWVuc2hvdENvdW50TGltaXQsIG9uVmFsdWVDaGFuZ2VkKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiBCYWNvbi5jb21iaW5lQXNBcnJheShtYXJrQW5kR2V0SW5saW5lSW1hZ2VzKCRlZGl0b3IpXG4gICAgICAgIC5tYXAoZGF0YSA9PiBjaGVja0ZvckltYWdlTGltaXQoJGVkaXRvciwgZGF0YSwgc2NyZWVuc2hvdENvdW50TGltaXQpXG4gICAgICAgICAgICAuZG9FcnJvcigoKSA9PiBvblZhbHVlQ2hhbmdlZChTQ1JFRU5TSE9UX0xJTUlUX0VSUk9SKSlcbiAgICAgICAgICAgIC5mbGF0TWFwTGF0ZXN0KCgpID0+IEJhY29uLmZyb21Qcm9taXNlKHNjcmVlbnNob3RTYXZlcihkYXRhKSkpXG4gICAgICAgICAgICAuZG9BY3Rpb24oc2NyZWVuU2hvdFVybCA9PiBkYXRhLiRlbC5hdHRyKCdzcmMnLCBzY3JlZW5TaG90VXJsKSlcbiAgICAgICAgICAgIC5kb0Vycm9yKCgpID0+IGRhdGEuJGVsLnJlbW92ZSgpKSlcbiAgICApLm9uVmFsdWUoayA9PiAkZWRpdG9yLnRyaWdnZXIoJ2lucHV0JykpLCAwKVxufVxuXG5mdW5jdGlvbiB0b3RhbEltYWdlQ291bnQoJGFuc3dlciwgY2xpcGJvYXJkRGF0YUFzSHRtbCkge1xuICAgIHJldHVybiBleGlzdGluZ1NjcmVlbnNob3RDb3VudCgkYW5zd2VyKSArIGV4aXN0aW5nU2NyZWVuc2hvdENvdW50KCQoYDxkaXY+JHtjbGlwYm9hcmREYXRhQXNIdG1sfTwvZGl2PmApKVxufVxuIl19
