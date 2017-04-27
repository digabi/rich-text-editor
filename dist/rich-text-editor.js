(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.I = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = {
    editor: {
        mathEditor: 'Matikkaeditori',
        title: 'Kaavaeditorin ensimmäinen kehitysversio',
        description: '<ul>\n<li>Editori toimii parhaiten Firefox-selaimella.</li>\n<li>\u201CLis\xE4\xE4 kaava\u201D -napin alta l\xF6yd\xE4t yleisimpi\xE4 matematiikassa, fysiikassa ja\nkemiassa k\xE4ytett\xE4vi\xE4 merkint\xF6j\xE4. Lis\xE4ksi erikoismerkkej\xE4 voi k\xE4ytt\xE4\xE4 kaavan kirjoittamiseen.</li>\n <li>Kaavoja voi rakentaa\nklikkaamalla valikon merkint\xF6j\xE4 ja/tai kirjoittamalla LaTeXia.</li>\n <li>Editorin vastauskentt\xE4\xE4n voi kirjoittaa teksti\xE4 ja kaavoja sek\xE4\nlis\xE4t\xE4 kuvia.</li></ul>',
        shortcutTitle: 'Pikan\xE4pp\xE4invinkkej\xE4',
        shortcuts: '<table><tbody>\n<tr><th>Liit\xE4 kuva leikep\xF6yd\xE4lt\xE4</th><td>Ctrl-V</td></tr>\n<tr><th>Kirjoita kaava</th><td>Ctrl-I</td></tr>\n<tr><th colspan="2">Kaavassa</th></tr>\n<tr><th>Jakoviiva</th><td>/</td></tr>\n<tr><th>Kertomerkki</th><td>*</td></tr>\n<tr><th>Eksponentti</th><td>^</td></tr>\n<tr><th>Sulje kaava</th><td>Esc</td></tr>\n<tr><th>Lis\xE4\xE4 kaava seuraavalle riville</th><td>Enter</td></tr>\n</tbody>\n</table>',
        formatting: 'Muotoilu',
        specialCharacters: 'Erikoismerkit',
        insertEquation: 'Lisää kaava',
        close: 'sulje',
        save: 'Tallenna',
        updated: 'Päivitetty',
        sendFeedback: 'Lähetä palautetta',
        langLink: '/sv',
        langLabel: 'På svenska',
        answerTitle: 'Vastaus',
        toggleInstructions: 'Näytä ohjeet'
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
        shortcuts: '<table><tbody>\n<tr><th>L\xE4gg till en bild fr\xE5n urklippet</th><td>Ctrl-V</td></tr>\n<tr><th>Skriv en formel</th><td>Ctrl-I</td></tr>\n<tr><th colspan="2">I formeln </th></tr>\n<tr><th>Br\xE5kstreck</th><td>/</td></tr>\n<tr><th>Multiplikationstecken</th><td>*</td></tr>\n<tr><th>St\xE4ng formeln</th><td>Esc</td></tr>\n</tbody>\n</table>',
        formatting: 'Formatering',
        specialCharacters: 'Specialtecken',
        insertEquation: 'Lägg till formel',
        close: 'stäng',
        save: 'Spara',
        updated: 'Uppdaterad',
        sendFeedback: 'Skicka feedback',
        langLink: '/',
        langLabel: 'Suomeksi',
        answerTitle: 'Svar',
        toggleInstructions: 'Visa intruktioner'
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
(function (Buffer){
'use strict';

var loadingImg = require('./loadingImg');
var u = require('./util');

module.exports = {
    onPaste: onPaste
};

var SCREENSHOT_LIMIT_ERROR = function SCREENSHOT_LIMIT_ERROR() {
    return new Bacon.Error('Screenshot limit reached!');
};

function onPaste(e, saver, onValueChanged, limit) {
    var clipboardData = e.originalEvent.clipboardData;
    var file = clipboardData.items && clipboardData.items[0].getAsFile();
    if (file) {
        onPasteBlob(e, file, saver, $(e.currentTarget), onValueChanged, limit);
    } else {
        var clipboardDataAsHtml = clipboardData.getData('text/html');
        if (clipboardDataAsHtml) onPasteHtml(e, $(e.currentTarget), clipboardDataAsHtml, limit, saver, onValueChanged);else onLegacyPasteImage($(e.currentTarget), saver, limit, onValueChanged);
    }
}

function onPasteBlob(event, file, saver, $answer, onValueChanged, limit) {
    event.preventDefault();
    if (file.type === 'image/png') {
        if (u.existingScreenshotCount($answer) + 1 <= limit) {
            saver({ data: file, type: file.type, id: String(new Date().getTime()) }).then(function (screenshotUrl) {
                var img = '<img src="' + screenshotUrl + '"/>';
                window.document.execCommand('insertHTML', false, img);
            });
        } else {
            onValueChanged(SCREENSHOT_LIMIT_ERROR());
        }
    }
}

function onPasteHtml(event, $answer, clipboardDataAsHtml, limit, saver, onValueChanged) {
    event.preventDefault();
    if (totalImageCount($answer, clipboardDataAsHtml) <= limit) {
        window.document.execCommand('insertHTML', false, u.sanitize(clipboardDataAsHtml));
        persistInlineImages($answer, saver, limit, onValueChanged);
    } else {
        onValueChanged(SCREENSHOT_LIMIT_ERROR());
    }
}

function onLegacyPasteImage($editor, saver, limit, onValueChanged) {
    persistInlineImages($editor, saver, limit, onValueChanged);
}

function checkForImageLimit($editor, imageData, limit) {
    return Bacon.once(u.existingScreenshotCount($editor) > limit ? new Bacon.Error() : imageData);
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
    return u.existingScreenshotCount($answer) + u.existingScreenshotCount($('<div>' + clipboardDataAsHtml + '</div>'));
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

}).call(this,require("buffer").Buffer)

},{"./loadingImg":5,"./util":11,"buffer":undefined}],4:[function(require,module,exports){
'use strict';

module.exports = [{ action: '\\sqrt', label: '\\sqrt{X}' }, { action: '^', label: 'x^{X}' }, { action: '\\frac', label: '\\frac{X}{X}' }, { action: '\\int', label: '\\int_{X}^{X}' }, { action: '\\lim_', label: '\\lim_{X}' }, { action: '\\lim_{x\\rightarrow\\infty}', label: '\\lim_{x\\rightarrow\\infty}', useWrite: true }, { action: '\\overrightarrow', label: '\\overrightarrow{X}' }, { action: '_', label: 'x_X' }, { action: '\\nthroot', label: '\\sqrt[X]{X}' }, { action: '\\sum', label: '\\sum_{X}^{X}' }, { action: '\\binom', label: '\\binom{X}{X}' }, { action: '\\sin' }, { action: '\\cos' }, { action: '\\tan' }, { action: '\\vec', label: '\\vec{X}' }, { action: '\\bar', label: '\\bar{X}' }, { action: '\\overline{\\text{i}}', useWrite: true }, { action: '\\overline{\\text{j}}', useWrite: true }, { action: '\\overline{\\text{k}}', useWrite: true }, { action: '\\overleftarrow', label: '\\overleftarrow{X}' }, { action: '|', label: '|X|' }, { action: '(', label: '(X)' }, { action: '_{ }^{ } ', label: '_{X}^{X}X', useWrite: true }, { action: '\\text', label: '\\text{T}' }];

},{}],5:[function(require,module,exports){
"use strict";

module.exports = "data:image/gif;base64,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EAY7Cg04Uk48LAsDhRA8MVQPEF0GAgqYYwSRlycNcWskCkApIyEAOwAAAAAAAAAAADxiciAvPgo8Yj5XYXJuaW5nPC9iPjogIG15c3FsX3F1ZXJ5KCkgWzxhIGhyZWY9J2Z1bmN0aW9uLm15c3FsLXF1ZXJ5Jz5mdW5jdGlvbi5teXNxbC1xdWVyeTwvYT5dOiBDYW4ndCBjb25uZWN0IHRvIGxvY2FsIE15U1FMIHNlcnZlciB0aHJvdWdoIHNvY2tldCAnL3Zhci9ydW4vbXlzcWxkL215c3FsZC5zb2NrJyAoMikgaW4gPGI+L2hvbWUvYWpheGxvYWQvd3d3L2xpYnJhaXJpZXMvY2xhc3MubXlzcWwucGhwPC9iPiBvbiBsaW5lIDxiPjY4PC9iPjxiciAvPgo8YnIgLz4KPGI+V2FybmluZzwvYj46ICBteXNxbF9xdWVyeSgpIFs8YSBocmVmPSdmdW5jdGlvbi5teXNxbC1xdWVyeSc+ZnVuY3Rpb24ubXlzcWwtcXVlcnk8L2E+XTogQSBsaW5rIHRvIHRoZSBzZXJ2ZXIgY291bGQgbm90IGJlIGVzdGFibGlzaGVkIGluIDxiPi9ob21lL2FqYXhsb2FkL3d3dy9saWJyYWlyaWVzL2NsYXNzLm15c3FsLnBocDwvYj4gb24gbGluZSA8Yj42ODwvYj48YnIgLz4KPGJyIC8+CjxiPldhcm5pbmc8L2I+OiAgbXlzcWxfcXVlcnkoKSBbPGEgaHJlZj0nZnVuY3Rpb24ubXlzcWwtcXVlcnknPmZ1bmN0aW9uLm15c3FsLXF1ZXJ5PC9hPl06IENhbid0IGNvbm5lY3QgdG8gbG9jYWwgTXlTUUwgc2VydmVyIHRocm91Z2ggc29ja2V0ICcvdmFyL3J1bi9teXNxbGQvbXlzcWxkLnNvY2snICgyKSBpbiA8Yj4vaG9tZS9hamF4bG9hZC93d3cvbGlicmFpcmllcy9jbGFzcy5teXNxbC5waHA8L2I+IG9uIGxpbmUgPGI+Njg8L2I+PGJyIC8+CjxiciAvPgo8Yj5XYXJuaW5nPC9iPjogIG15c3FsX3F1ZXJ5KCkgWzxhIGhyZWY9J2Z1bmN0aW9uLm15c3FsLXF1ZXJ5Jz5mdW5jdGlvbi5teXNxbC1xdWVyeTwvYT5dOiBBIGxpbmsgdG8gdGhlIHNlcnZlciBjb3VsZCBub3QgYmUgZXN0YWJsaXNoZWQgaW4gPGI+L2hvbWUvYWpheGxvYWQvd3d3L2xpYnJhaXJpZXMvY2xhc3MubXlzcWwucGhwPC9iPiBvbiBsaW5lIDxiPjY4PC9iPjxiciAvPgo8YnIgLz4KPGI+V2FybmluZzwvYj46ICBteXNxbF9xdWVyeSgpIFs8YSBocmVmPSdmdW5jdGlvbi5teXNxbC1xdWVyeSc+ZnVuY3Rpb24ubXlzcWwtcXVlcnk8L2E+XTogQ2FuJ3QgY29ubmVjdCB0byBsb2NhbCBNeVNRTCBzZXJ2ZXIgdGhyb3VnaCBzb2NrZXQgJy92YXIvcnVuL215c3FsZC9teXNxbGQuc29jaycgKDIpIGluIDxiPi9ob21lL2FqYXhsb2FkL3d3dy9saWJyYWlyaWVzL2NsYXNzLm15c3FsLnBocDwvYj4gb24gbGluZSA8Yj42ODwvYj48YnIgLz4KPGJyIC8+CjxiPldhcm5pbmc8L2I+OiAgbXlzcWxfcXVlcnkoKSBbPGEgaHJlZj0nZnVuY3Rpb24ubXlzcWwtcXVlcnknPmZ1bmN0aW9uLm15c3FsLXF1ZXJ5PC9hPl06IEEgbGluayB0byB0aGUgc2VydmVyIGNvdWxkIG5vdCBiZSBlc3RhYmxpc2hlZCBpbiA8Yj4vaG9tZS9hamF4bG9hZC93d3cvbGlicmFpcmllcy9jbGFzcy5teXNxbC5waHA8L2I+IG9uIGxpbmUgPGI+Njg8L2I+PGJyIC8+Cg==";

},{}],6:[function(require,module,exports){
'use strict';

var u = require('./util');

var MQ = void 0;
module.exports = { init: init };
var firstTime = true;

function init($outerPlaceholder, focus, onMathFocusChanged) {
    if (firstTime) {
        MQ = MathQuill.getInterface(2);
    }
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

},{"./util":11}],7:[function(require,module,exports){
'use strict';

var u = require('./util');
var toolbars = require('./toolbars');
var clipboard = require('./clipboard');
var mathEditor = require('./math-editor');
var locales = {
    FI: require('./FI'),
    SV: require('./SV')
};
var l = locales[window.locale || 'FI'].editor;
var keyCodes = {
    ENTER: 13,
    ESC: 27,
    I: 73
};
var $outerPlaceholder = $('<div class="rich-text-editor-hidden" style="display: none;" data-js="outerPlaceholder">');
var focus = {
    richText: false,
    latexField: false,
    equationField: false
};
var $currentEditor = void 0;

function onMathFocusChanged() {
    if (richTextAndMathBlur()) onRichTextEditorBlur($currentEditor);
}

var firstCall = true;
var math = void 0;
var $toolbar = void 0;

module.exports.makeRichText = function (element, options) {
    var onValueChanged = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    if (firstCall) {
        math = mathEditor.init($outerPlaceholder, focus, onMathFocusChanged);
        $toolbar = toolbars.init(math, function () {
            return focus.richText;
        }, l);
        $('body').append($outerPlaceholder, $toolbar);
        firstCall = false;
    }
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
    }).on('keyup', function (e) {
        if (u.isCtrlKey(e, keyCodes.I)) math.insertNewEquation();
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
        clipboard.onPaste(e, saver, onValueChanged, limit);
    });
    setTimeout(function () {
        return document.execCommand("enableObjectResizing", false, false);
    }, 0);
};

function toggleRichTextToolbar(isVisible, $editor) {
    $('body').toggleClass('rich-text-editor-focus', isVisible);
    $editor.toggleClass('rich-text-focused', isVisible);
}

function onRichTextEditorFocus($element) {
    $currentEditor = $element;
    toggleRichTextToolbar(true, $currentEditor);
}

function onRichTextEditorBlur($element) {
    toggleRichTextToolbar(false, $element);
    math.closeMathEditor();
    focus.richText = false;
}

var richTextEditorBlurTimeout = void 0;

function onRichTextEditorFocusChanged(e) {
    focus.richText = e.type === 'focus';

    $(e.currentTarget).toggleClass('rich-text-focused', focus.richText);

    clearTimeout(richTextEditorBlurTimeout);
    richTextEditorBlurTimeout = setTimeout(function () {

        if (richTextAndMathBlur()) onRichTextEditorBlur($(e.target));else if (focus.richText && math.isVisible()) math.closeMathEditor();else onRichTextEditorFocus($(e.target));
    }, 0);
}

function richTextAndMathBlur() {
    return !focus.richText && !math.isVisible() && !focus.latexField && !focus.equationField;
}

},{"./FI":1,"./SV":2,"./clipboard":3,"./math-editor":6,"./toolbars":10,"./util":11}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
'use strict';

var specialCharacterGroups = require('./specialCharacters');
var latexCommands = require('./latexCommands');

module.exports = {
    init: init
};

function init(mathEditor, hasRichTextFocus, l) {
    var $toolbar = $('\n        <div class="rich-text-editor-tools" data-js="tools" style="display: none">\n            <div class="rich-text-editor-tools-button-wrapper">\n                <div class="rich-text-editor-toolbar-wrapper">\n                    <button class="rich-text-editor-characters-expand-collapse" data-js="expandCollapseCharacters" style="z-index: 100"></button>\n                </div>\n            </div>\n            <div class="rich-text-editor-tools-row">\n                <div class="rich-text-editor-toolbar-wrapper">\n                    <div class="rich-text-editor-toolbar-characters rich-text-editor-toolbar rich-text-editor-toolbar-button-list" data-js="charactersList"></div>\n                </div>\n            </div>\n            <div class="rich-text-editor-tools-row">\n                <div class="rich-text-editor-toolbar-wrapper rich-text-editor-equation-wrapper">\n                    <div class="rich-text-editor-toolbar-equation rich-text-editor-toolbar rich-text-editor-toolbar-button-list" data-js="mathToolbar"></div>\n                </div>\n            </div>\n            <div class="rich-text-editor-tools-button-wrapper">\n                <div class="rich-text-editor-toolbar-wrapper">\n                    <button class="rich-text-editor-new-equation rich-text-editor-button rich-text-editor-button-action" data-js="newEquation" data-command="Ctrl-I">\u03A3 ' + l.insertEquation + '</button>\n                </div>\n            </div>\n        </div>\n        ').on('mousedown', '[data-js="expandCollapseCharacters"]', function (e) {
        e.preventDefault();
        $toolbar.toggleClass('rich-text-editor-characters-expanded');
    });

    var $newEquation = $toolbar.find('[data-js="newEquation"]');
    var $mathToolbar = $toolbar.find('[data-js="mathToolbar"]');
    initSpecialCharacterToolbar($toolbar, mathEditor, hasRichTextFocus);
    initMathToolbar($mathToolbar, mathEditor);
    initNewEquation($newEquation, mathEditor, hasRichTextFocus);

    return $toolbar;
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

},{"./latexCommands":4,"./specialCharacters":9}],11:[function(require,module,exports){
'use strict';

var sanitizeHtml = require('sanitize-html');
var sanitizeOpts = require('./sanitizeOpts');
var equationImageSelector = 'img[src^="/math.svg"]';

module.exports = {
    isKey: isKey,
    isCtrlKey: isCtrlKey,
    insertToTextAreaAtCursor: insertToTextAreaAtCursor,
    sanitize: sanitize,
    sanitizeContent: sanitizeContent,
    setCursorAfter: setCursorAfter,
    equationImageSelector: equationImageSelector,
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

function existingScreenshotCount($editor) {
    var imageCount = $editor.find('img').length;
    var equationCount = $editor.find(equationImageSelector).length;
    return imageCount - equationCount;
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

},{"./sanitizeOpts":8,"sanitize-html":undefined}]},{},[7])(7)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvRkkuanMiLCJhcHAvU1YuanMiLCJhcHAvY2xpcGJvYXJkLmpzIiwiYXBwL2xhdGV4Q29tbWFuZHMuanMiLCJhcHAvbG9hZGluZ0ltZy5qcyIsImFwcC9tYXRoLWVkaXRvci5qcyIsImFwcC9yaWNoLXRleHQtZWRpdG9yLmpzIiwiYXBwL3Nhbml0aXplT3B0cy5qcyIsImFwcC9zcGVjaWFsQ2hhcmFjdGVycy5qcyIsImFwcC90b29sYmFycy5qcyIsImFwcC91dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxPQUFPLE9BQVAsR0FBaUI7QUFDYixZQUFRO0FBQ0osb0JBQVksZ0JBRFI7QUFFSixlQUFPLHlDQUZIO0FBR0osa2hCQUhJO0FBV0oscURBWEk7QUFZSixrY0FaSTtBQXVCSixvQkFBWSxVQXZCUjtBQXdCSiwyQkFBbUIsZUF4QmY7QUF5Qkosd0JBQWdCLGFBekJaO0FBMEJKLGVBQU8sT0ExQkg7QUEyQkosY0FBTSxVQTNCRjtBQTRCSixpQkFBUyxZQTVCTDtBQTZCSixzQkFBYyxtQkE3QlY7QUE4Qkosa0JBQVUsS0E5Qk47QUErQkosbUJBQVcsWUEvQlA7QUFnQ0oscUJBQWEsU0FoQ1Q7QUFpQ0osNEJBQW9CO0FBakNoQixLQURLO0FBb0NiLGdCQUFZO0FBQ1Isc0JBQWMsbUJBRE47QUFFUixpQkFBUyxZQUZEO0FBR1Isb0JBQVksZ0JBSEo7QUFJUixlQUFPLFdBSkM7QUFLUixrQkFBVSxHQUxGO0FBTVIsdUJBQWUsc0JBTlA7QUFPUixjQUFNLG9CQVBFO0FBUVIsa0JBQVUsZUFSRjtBQVNSLG1CQUFXO0FBVEg7QUFwQ0MsQ0FBakI7Ozs7O0FDQUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsWUFBUTtBQUNKLG9CQUFZLGlCQURSO0FBRUosZUFBTywwQ0FGSDtBQUdKLDZoQkFISTtBQVFKLHdEQVJJO0FBU0osMFdBVEk7QUFrQkosb0JBQVksYUFs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LGdCQUFnQixRQUFRLElBQVIsQ0FBYSxxQkFBYixFQUFvQyxNQUExRDtBQUNBLFdBQU8sYUFBYSxhQUFwQjtBQUNIOztBQUVELFNBQVMsY0FBVCxDQUF3QixRQUF4QixFQUFrQztBQUM5QixRQUFNLFVBQVUsRUFBRSxNQUFGLENBQWhCO0FBQ0EsUUFBTSxlQUFlLFFBQVEsTUFBUixLQUFtQixFQUF4QztBQUNBLFFBQU0sU0FBUyxlQUFlLFFBQVEsU0FBUixFQUE5QjtBQUNBLFFBQU0sTUFBTSxTQUFTLE1BQVQsR0FBa0IsR0FBbEIsR0FBd0IsU0FBUyxNQUFULEVBQXBDO0FBQ0EsUUFBSSxTQUFTLEdBQWIsRUFBa0I7QUFDZCxnQkFBUSxTQUFSLENBQWtCLE1BQU0sWUFBeEI7QUFDSDtBQUNKIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGVkaXRvcjoge1xuICAgICAgICBtYXRoRWRpdG9yOiAnTWF0aWtrYWVkaXRvcmknLFxuICAgICAgICB0aXRsZTogJ0thYXZhZWRpdG9yaW4gZW5zaW1tw6RpbmVuIGtlaGl0eXN2ZXJzaW8nLFxuICAgICAgICBkZXNjcmlwdGlvbjogYDx1bD5cbjxsaT5FZGl0b3JpIHRvaW1paSBwYXJoYWl0ZW4gRmlyZWZveC1zZWxhaW1lbGxhLjwvbGk+XG48bGk+4oCcTGlzw6TDpCBrYWF2YeKAnSAtbmFwaW4gYWx0YSBsw7Z5ZMOkdCB5bGVpc2ltcGnDpCBtYXRlbWF0aWlrYXNzYSwgZnlzaWlrYXNzYSBqYVxua2VtaWFzc2Ega8OkeXRldHTDpHZpw6QgbWVya2ludMO2asOkLiBMaXPDpGtzaSBlcmlrb2lzbWVya2tlasOkIHZvaSBrw6R5dHTDpMOkIGthYXZhbiBraXJqb2l0dGFtaXNlZW4uPC9saT5cbiA8bGk+S2Fhdm9qYSB2b2kgcmFrZW50YWFcbmtsaWtrYWFtYWxsYSB2YWxpa29uIG1lcmtpbnTDtmrDpCBqYS90YWkga2lyam9pdHRhbWFsbGEgTGFUZVhpYS48L2xpPlxuIDxsaT5FZGl0b3JpbiB2YXN0YXVza2VudHTDpMOkbiB2b2kga2lyam9pdHRhYSB0ZWtzdGnDpCBqYSBrYWF2b2phIHNla8OkXG5saXPDpHTDpCBrdXZpYS48L2xpPjwvdWw+YCxcbiAgICAgICAgc2hvcnRjdXRUaXRsZTogYFBpa2Fuw6RwcMOkaW52aW5ra2Vqw6RgLFxuICAgICAgICBzaG9ydGN1dHM6IGA8dGFibGU+PHRib2R5PlxuPHRyPjx0aD5MaWl0w6Qga3V2YSBsZWlrZXDDtnlkw6RsdMOkPC90aD48dGQ+Q3RybC1WPC90ZD48L3RyPlxuPHRyPjx0aD5LaXJqb2l0YSBrYWF2YTwvdGg+PHRkPkN0cmwtSTwvdGQ+PC90cj5cbjx0cj48dGggY29sc3Bhbj1cIjJcIj5LYWF2YXNzYTwvdGg+PC90cj5cbjx0cj48dGg+SmFrb3ZpaXZhPC90aD48dGQ+LzwvdGQ+PC90cj5cbjx0cj48dGg+S2VydG9tZXJra2k8L3RoPjx0ZD4qPC90ZD48L3RyPlxuPHRyPjx0aD5Fa3Nwb25lbnR0aTwvdGg+PHRkPl48L3RkPjwvdHI+XG48dHI+PHRoPlN1bGplIGthYXZhPC90aD48dGQ+RXNjPC90ZD48L3RyPlxuPHRyPjx0aD5MaXPDpMOkIGthYXZhIHNldXJhYXZhbGxlIHJpdmlsbGU8L3RoPjx0ZD5FbnRlcjwvdGQ+PC90cj5cbjwvdGJvZHk+XG48L3RhYmxlPmAsXG4gICAgICAgIGZvcm1hdHRpbmc6ICdNdW90b2lsdScsXG4gICAgICAgIHNwZWNpYWxDaGFyYWN0ZXJzOiAnRXJpa29pc21lcmtpdCcsXG4gICAgICAgIGluc2VydEVxdWF0aW9uOiAnTGlzw6TDpCBrYWF2YScsXG4gICAgICAgIGNsb3NlOiAnc3VsamUnLFxuICAgICAgICBzYXZlOiAnVGFsbGVubmEnLFxuICAgICAgICB1cGRhdGVkOiAnUMOkaXZpdGV0dHknLFxuICAgICAgICBzZW5kRmVlZGJhY2s6ICdMw6RoZXTDpCBwYWxhdXRldHRhJyxcbiAgICAgICAgbGFuZ0xpbms6ICcvc3YnLFxuICAgICAgICBsYW5nTGFiZWw6ICdQw6Ugc3ZlbnNrYScsXG4gICAgICAgIGFuc3dlclRpdGxlOiAnVmFzdGF1cycsXG4gICAgICAgIHRvZ2dsZUluc3RydWN0aW9uczogJ07DpHl0w6Qgb2hqZWV0J1xuICAgIH0sXG4gICAgYW5ub3RhdGluZzoge1xuICAgICAgICBzZW5kRmVlZGJhY2s6ICdMw6RoZXTDpCBwYWxhdXRldHRhJyxcbiAgICAgICAgdXBkYXRlZDogJ1DDpGl2aXRldHR5JyxcbiAgICAgICAgbWF0aEVkaXRvcjogJ01hdGlra2FlZGl0b3JpJyxcbiAgICAgICAgdGl0bGU6ICdBcnZvc3RlbHUnLFxuICAgICAgICBiYWNrTGluazogJy8nLFxuICAgICAgICBiYWNrTGlua0xhYmVsOiAnUGFsYWEga2FhdmFlZGl0b3JpaW4nLFxuICAgICAgICBzYXZlOiAnVGFsbGVubmEgbWVya2lubsOkdCcsXG4gICAgICAgIGxhbmdMaW5rOiAnL3N2L2JlZG9tbmluZycsXG4gICAgICAgIGxhbmdMYWJlbDogJ1DDpSBzdmVuc2thJ1xuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGVkaXRvcjoge1xuICAgICAgICBtYXRoRWRpdG9yOiAnTWF0ZW1hdGlrZWRpdG9yJyxcbiAgICAgICAgdGl0bGU6ICdGb3JtZWxlZGl0b3JucyBmw7Zyc3RhIHV0dmVja2xpbmdzdmVyc2lvbicsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBgPHVsPlxuPGxpPkVkaXRvcm4gZnVuZ2VyYXIgYsOkc3QgbWVkIGJyb3dzZXJuIEZpcmVmb3guPC9saT5cbiA8bGk+VW5kZXIga25hcHBlbiDigJxMw6RnZyB0aWxsIGZvcm1lbOKAnSBoaXR0YXIgZHUgZGUgdmFubGlnYXN0ZSBiZXRlY2tuaW5nYXJuYSBzb20gYW52w6RuZHMgaSBtYXRlbWF0aWssIGZ5c2lrIG9jaCBrZW1pLiBEZXNzdXRvbSBrYW4gZHUgYW52w6RuZGEgc3BlY2lhbHRlY2tlbiBmw7ZyIGF0dCBza3JpdmEgZm9ybWxlci48L2xpPlxuPGxpPkRldCBnw6VyIGF0dCBrb25zdHJ1ZXJhIGZvcm1sZXIgZ2Vub20gYXR0IGtsaWNrYSBww6UgYmV0ZWNrbmluZ2FybmEgaSBtZW55ZXJuYSBvY2gvZWxsZXIgZ2Vub20gYXR0IHNrcml2YSBMYVRlWC48L2xpPlxuPGxpPkRldCBnw6VyIGbDtnJ1dG9tIGF0dCBza3JpdmEgdGV4dCBvY2ggZm9ybWxlciwgYXR0IG9ja3PDpSBhdHQgbMOkZ2dhIHRpbGwgYmlsZGVyIGkgc3ZhcnNmw6RsdGV0LjwvbGk+PC91bD5gLFxuICAgICAgICBzaG9ydGN1dFRpdGxlOiBgVGlwcyBww6UgdGFuZ2VudGtvbWJpbmF0aW9uZXJgLFxuICAgICAgICBzaG9ydGN1dHM6IGA8dGFibGU+PHRib2R5PlxuPHRyPjx0aD5Mw6RnZyB0aWxsIGVuIGJpbGQgZnLDpW4gdXJrbGlwcGV0PC90aD48dGQ+Q3RybC1WPC90ZD48L3RyPlxuPHRyPjx0aD5Ta3JpdiBlbiBmb3JtZWw8L3RoPjx0ZD5DdHJsLUk8L3RkPjwvdHI+XG48dHI+PHRoIGNvbHNwYW49XCIyXCI+SSBmb3JtZWxuIDwvdGg+PC90cj5cbjx0cj48dGg+QnLDpWtzdHJlY2s8L3RoPjx0ZD4vPC90ZD48L3RyPlxuPHRyPjx0aD5NdWx0aXBsaWthdGlvbnN0ZWNrZW48L3RoPjx0ZD4qPC90ZD48L3RyPlxuPHRyPjx0aD5TdMOkbmcgZm9ybWVsbjwvdGg+PHRkPkVzYzwvdGQ+PC90cj5cbjwvdGJvZHk+XG48L3RhYmxlPmAsXG4gICAgICAgIGZvcm1hdHRpbmc6ICdGb3JtYXRlcmluZycsXG4gICAgICAgIHNwZWNpYWxDaGFyYWN0ZXJzOiAnU3BlY2lhbHRlY2tlbicsXG4gICAgICAgIGluc2VydEVxdWF0aW9uOiAnTMOkZ2cgdGlsbCBmb3JtZWwnLFxuICAgICAgICBjbG9zZTogJ3N0w6RuZycsXG4gICAgICAgIHNhdmU6ICdTcGFyYScsXG4gICAgICAgIHVwZGF0ZWQ6ICdVcHBkYXRlcmFkJyxcbiAgICAgICAgc2VuZEZlZWRiYWNrOiAnU2tpY2thIGZlZWRiYWNrJyxcbiAgICAgICAgbGFuZ0xpbms6ICcvJyxcbiAgICAgICAgbGFuZ0xhYmVsOiAnU3VvbWVrc2knLFxuICAgICAgICBhbnN3ZXJUaXRsZTogJ1N2YXInLFxuICAgICAgICB0b2dnbGVJbnN0cnVjdGlvbnM6ICdWaXNhIGludHJ1a3Rpb25lcidcbiAgICB9LFxuICAgIGFubm90YXRpbmc6IHtcbiAgICAgICAgc2VuZEZlZWRiYWNrOiAnU2tpY2thIHJlc3BvbnMnLFxuICAgICAgICB1cGRhdGVkOiAnVXBwZGF0ZXJhZCcsXG4gICAgICAgIG1hdGhFZGl0b3I6ICdNYXRlbWF0aWtlZGl0b3InLFxuICAgICAgICB0aXRsZTogJ0JlZMO2bW5pbmcnLFxuICAgICAgICBiYWNrTGluazogJy9zdicsXG4gICAgICAgIGJhY2tMaW5rTGFiZWw6ICdNYXRlbWF0aWtlZGl0b3InLFxuICAgICAgICBzYXZlOiAnU3BhcmEgYW50ZWNrbmluZ2FyJyxcbiAgICAgICAgbGFuZ0xpbms6ICcvdGFya2lzdHVzJyxcbiAgICAgICAgbGFuZ0xhYmVsOiAnU3VvbWVrc2knXG4gICAgfVxufVxuIiwiY29uc3QgbG9hZGluZ0ltZyA9IHJlcXVpcmUoJy4vbG9hZGluZ0ltZycpXG5jb25zdCB1ID0gcmVxdWlyZSgnLi91dGlsJylcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgb25QYXN0ZVxufVxuXG5jb25zdCBTQ1JFRU5TSE9UX0xJTUlUX0VSUk9SID0gKCkgPT4gbmV3IEJhY29uLkVycm9yKCdTY3JlZW5zaG90IGxpbWl0IHJlYWNoZWQhJylcblxuZnVuY3Rpb24gb25QYXN0ZShlLCBzYXZlciwgb25WYWx1ZUNoYW5nZWQsIGxpbWl0KSB7XG4gICAgY29uc3QgY2xpcGJvYXJkRGF0YSA9IGUub3JpZ2luYWxFdmVudC5jbGlwYm9hcmREYXRhXG4gICAgY29uc3QgZmlsZSA9IGNsaXBib2FyZERhdGEuaXRlbXMgJiYgY2xpcGJvYXJkRGF0YS5pdGVtc1swXS5nZXRBc0ZpbGUoKVxuICAgIGlmIChmaWxlKSB7XG4gICAgICAgIG9uUGFzdGVCbG9iKGUsIGZpbGUsIHNhdmVyLCAkKGUuY3VycmVudFRhcmdldCksIG9uVmFsdWVDaGFuZ2VkLCBsaW1pdClcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBjbGlwYm9hcmREYXRhQXNIdG1sID0gY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0L2h0bWwnKVxuICAgICAgICBpZiAoY2xpcGJvYXJkRGF0YUFzSHRtbCkgb25QYXN0ZUh0bWwoZSwgJChlLmN1cnJlbnRUYXJnZXQpLCBjbGlwYm9hcmREYXRhQXNIdG1sLCBsaW1pdCwgc2F2ZXIsIG9uVmFsdWVDaGFuZ2VkKVxuICAgICAgICBlbHNlIG9uTGVnYWN5UGFzdGVJbWFnZSgkKGUuY3VycmVudFRhcmdldCksIHNhdmVyLCBsaW1pdCwgb25WYWx1ZUNoYW5nZWQpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBvblBhc3RlQmxvYihldmVudCwgZmlsZSwgc2F2ZXIsICRhbnN3ZXIsIG9uVmFsdWVDaGFuZ2VkLCBsaW1pdCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICBpZiAoZmlsZS50eXBlID09PSAnaW1hZ2UvcG5nJykge1xuICAgICAgICBpZiAodS5leGlzdGluZ1NjcmVlbnNob3RDb3VudCgkYW5zd2VyKSArIDEgPD0gbGltaXQpIHtcbiAgICAgICAgICAgIHNhdmVyKHtkYXRhOiBmaWxlLCB0eXBlOiBmaWxlLnR5cGUsIGlkOiBTdHJpbmcobmV3IERhdGUoKS5nZXRUaW1lKCkpfSkudGhlbihzY3JlZW5zaG90VXJsID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBgPGltZyBzcmM9XCIke3NjcmVlbnNob3RVcmx9XCIvPmBcbiAgICAgICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydEhUTUwnLCBmYWxzZSwgaW1nKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9uVmFsdWVDaGFuZ2VkKFNDUkVFTlNIT1RfTElNSVRfRVJST1IoKSlcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gb25QYXN0ZUh0bWwoZXZlbnQsICRhbnN3ZXIsIGNsaXBib2FyZERhdGFBc0h0bWwsIGxpbWl0LCBzYXZlciwgb25WYWx1ZUNoYW5nZWQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgaWYgKHRvdGFsSW1hZ2VDb3VudCgkYW5zd2VyLCBjbGlwYm9hcmREYXRhQXNIdG1sKSA8PSBsaW1pdCkge1xuICAgICAgICB3aW5kb3cuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydEhUTUwnLCBmYWxzZSwgdS5zYW5pdGl6ZShjbGlwYm9hcmREYXRhQXNIdG1sKSlcbiAgICAgICAgcGVyc2lzdElubGluZUltYWdlcygkYW5zd2VyLCBzYXZlciwgbGltaXQsIG9uVmFsdWVDaGFuZ2VkKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIG9uVmFsdWVDaGFuZ2VkKFNDUkVFTlNIT1RfTElNSVRfRVJST1IoKSlcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG9uTGVnYWN5UGFzdGVJbWFnZSgkZWRpdG9yLCBzYXZlciwgbGltaXQsIG9uVmFsdWVDaGFuZ2VkKSB7XG4gICAgcGVyc2lzdElubGluZUltYWdlcygkZWRpdG9yLCBzYXZlciwgbGltaXQsIG9uVmFsdWVDaGFuZ2VkKVxufVxuXG5cbmZ1bmN0aW9uIGNoZWNrRm9ySW1hZ2VMaW1pdCgkZWRpdG9yLCBpbWFnZURhdGEsIGxpbWl0KSB7XG4gICAgcmV0dXJuIEJhY29uLm9uY2UodS5leGlzdGluZ1NjcmVlbnNob3RDb3VudCgkZWRpdG9yKSA+IGxpbWl0ID8gbmV3IEJhY29uLkVycm9yKCkgOiBpbWFnZURhdGEpXG59XG5cbmZ1bmN0aW9uIHBlcnNpc3RJbmxpbmVJbWFnZXMoJGVkaXRvciwgc2NyZWVuc2hvdFNhdmVyLCBzY3JlZW5zaG90Q291bnRMaW1pdCwgb25WYWx1ZUNoYW5nZWQpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IEJhY29uLmNvbWJpbmVBc0FycmF5KG1hcmtBbmRHZXRJbmxpbmVJbWFnZXMoJGVkaXRvcilcbiAgICAgICAgLm1hcChkYXRhID0+IGNoZWNrRm9ySW1hZ2VMaW1pdCgkZWRpdG9yLCBkYXRhLCBzY3JlZW5zaG90Q291bnRMaW1pdClcbiAgICAgICAgICAgIC5kb0Vycm9yKCgpID0+IG9uVmFsdWVDaGFuZ2VkKFNDUkVFTlNIT1RfTElNSVRfRVJST1IoKSkpXG4gICAgICAgICAgICAuZmxhdE1hcExhdGVzdCgoKSA9PiBCYWNvbi5mcm9tUHJvbWlzZShzY3JlZW5zaG90U2F2ZXIoZGF0YSkpKVxuICAgICAgICAgICAgLmRvQWN0aW9uKHNjcmVlblNob3RVcmwgPT4gZGF0YS4kZWwuYXR0cignc3JjJywgc2NyZWVuU2hvdFVybCkpXG4gICAgICAgICAgICAuZG9FcnJvcigoKSA9PiBkYXRhLiRlbC5yZW1vdmUoKSkpXG4gICAgKS5vblZhbHVlKGsgPT4gJGVkaXRvci50cmlnZ2VyKCdpbnB1dCcpKSwgMClcbn1cblxuZnVuY3Rpb24gdG90YWxJbWFnZUNvdW50KCRhbnN3ZXIsIGNsaXBib2FyZERhdGFBc0h0bWwpIHtcbiAgICByZXR1cm4gdS5leGlzdGluZ1NjcmVlbnNob3RDb3VudCgkYW5zd2VyKSArIHUuZXhpc3RpbmdTY3JlZW5zaG90Q291bnQoJChgPGRpdj4ke2NsaXBib2FyZERhdGFBc0h0bWx9PC9kaXY+YCkpXG59XG5cbmZ1bmN0aW9uIG1hcmtBbmRHZXRJbmxpbmVJbWFnZXMoJGVkaXRvcikge1xuICAgIGNvbnN0IGltYWdlcyA9ICRlZGl0b3IuZmluZCgnaW1nW3NyY149XCJkYXRhXCJdJykudG9BcnJheSgpXG4gICAgICAgIC5tYXAoKGVsLCBpbmRleCkgPT4gT2JqZWN0LmFzc2lnbihkZWNvZGVCYXNlNjRJbWFnZShlbC5nZXRBdHRyaWJ1dGUoJ3NyYycpKSwge1xuICAgICAgICAgICAgJGVsOiAkKGVsKVxuICAgICAgICB9KSlcbiAgICBpbWFnZXMuZmlsdGVyKCh7dHlwZX0pID0+IHR5cGUgIT09ICdpbWFnZS9wbmcnKS5mb3JFYWNoKCh7JGVsfSkgPT4gJGVsLnJlbW92ZSgpKVxuICAgIGNvbnN0IHBuZ0ltYWdlcyA9IGltYWdlcy5maWx0ZXIoKHt0eXBlfSkgPT4gdHlwZSA9PT0gJ2ltYWdlL3BuZycpXG4gICAgcG5nSW1hZ2VzLmZvckVhY2goKHskZWx9KSA9PiAkZWwuYXR0cignc3JjJywgbG9hZGluZ0ltZykpXG4gICAgcmV0dXJuIHBuZ0ltYWdlc1xufVxuXG5mdW5jdGlvbiBkZWNvZGVCYXNlNjRJbWFnZShkYXRhU3RyaW5nKSB7XG4gICAgaWYgKCFkYXRhU3RyaW5nKVxuICAgICAgICByZXR1cm4gbnVsbFxuICAgIGNvbnN0IG1hdGNoZXMgPSBkYXRhU3RyaW5nLm1hdGNoKC9eZGF0YTooW0EtWmEtei0rXFwvXSspO2Jhc2U2NCwoLispJC8pXG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoICE9PSAzKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IG1hdGNoZXNbMV0sXG4gICAgICAgIGRhdGE6IG5ldyBCdWZmZXIobWF0Y2hlc1syXSwgJ2Jhc2U2NCcpXG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gICAge2FjdGlvbjogJ1xcXFxzcXJ0JywgbGFiZWw6ICdcXFxcc3FydHtYfSd9LFxuICAgIHthY3Rpb246ICdeJywgbGFiZWw6ICd4XntYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcZnJhYycsIGxhYmVsOiAnXFxcXGZyYWN7WH17WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGludCcsIGxhYmVsOiAnXFxcXGludF97WH1ee1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxsaW1fJywgbGFiZWw6ICdcXFxcbGltX3tYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcbGltX3t4XFxcXHJpZ2h0YXJyb3dcXFxcaW5mdHl9JywgbGFiZWw6ICdcXFxcbGltX3t4XFxcXHJpZ2h0YXJyb3dcXFxcaW5mdHl9JywgdXNlV3JpdGU6dHJ1ZX0sXG4gICAge2FjdGlvbjogJ1xcXFxvdmVycmlnaHRhcnJvdycsIGxhYmVsOiAnXFxcXG92ZXJyaWdodGFycm93e1h9J30sXG4gICAge2FjdGlvbjogJ18nLCBsYWJlbDogJ3hfWCd9LFxuICAgIHthY3Rpb246ICdcXFxcbnRocm9vdCcsIGxhYmVsOiAnXFxcXHNxcnRbWF17WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXHN1bScsIGxhYmVsOiAnXFxcXHN1bV97WH1ee1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxiaW5vbScsIGxhYmVsOiAnXFxcXGJpbm9te1h9e1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxzaW4nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGNvcyd9LFxuICAgIHthY3Rpb246ICdcXFxcdGFuJ30sXG4gICAge2FjdGlvbjogJ1xcXFx2ZWMnLCBsYWJlbDogJ1xcXFx2ZWN7WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGJhcicsIGxhYmVsOiAnXFxcXGJhcntYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcmxpbmV7XFxcXHRleHR7aX19JywgdXNlV3JpdGU6IHRydWV9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcmxpbmV7XFxcXHRleHR7an19JywgdXNlV3JpdGU6IHRydWV9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcmxpbmV7XFxcXHRleHR7a319JywgdXNlV3JpdGU6IHRydWV9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcmxlZnRhcnJvdycsIGxhYmVsOiAnXFxcXG92ZXJsZWZ0YXJyb3d7WH0nfSxcbiAgICB7YWN0aW9uOiAnfCcsIGxhYmVsOiAnfFh8J30sXG4gICAge2FjdGlvbjogJygnLCBsYWJlbDogJyhYKSd9LFxuICAgIHthY3Rpb246ICdfeyB9XnsgfSAnLCBsYWJlbDogJ197WH1ee1h9WCcsIHVzZVdyaXRlOiB0cnVlfSxcbiAgICB7YWN0aW9uOiAnXFxcXHRleHQnLCBsYWJlbDogJ1xcXFx0ZXh0e1R9J30sXG5dXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoRUFBUUFQUUFBUC8vL3dBQUFQRHc4SXFLaXVEZzRFWkdSbnA2ZWdBQUFGaFlXQ1FrSkt5c3JMNit2aFFVRkp5Y25BUUVCRFkyTm1ob2FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFDSCtHa055WldGMFpXUWdkMmwwYUNCaGFtRjRiRzloWkM1cGJtWnZBQ0g1QkFBS0FBQUFJZjhMVGtWVVUwTkJVRVV5TGpBREFRQUFBQ3dBQUFBQUVBQVFBQUFGZHlBZ0FnSUpJZVdvQWtSQ0NNZEJrS3RJSEluZ3lNS3NFclBCWWJBRHBrU0N3aERtUUNCZXRoUkI2Vmo0a0ZDa1FQRzRJbFdEZ3JOUkl3bk80VUtCWER1ZnpRdkRNYW9TREJnRmI4ODZNaVFhZGdOQUJBb2tmQ3d6QkE4TENnMEVnbDhqQWdnR0FBMWtCSUExQkFZemx5SUxjelVMQzJVaEFDSDVCQUFLQUFFQUxBQUFBQUFRQUJBQUFBVjJJQ0FDQW1sQVpUbU9SRUVJeVVFUWpMS0t4UEhBRGhFdnF4bGdjR2drR0kxRFlTVkFJQVdNeCtsd1NLa0lDSjBRc0hpOVJnS0J3blZUaVJRUWd3RjRJNFVGRFFRRXdpNi8zWVNHV1JSbWpoRUVUQUpmSWdNRkNuQUtNMEtEVjRFRUVBUUxpRjE4VEFZTlhEYVNlM3g2bWppZE4xczNJUUFoK1FRQUNnQUNBQ3dBQUFBQUVBQVFBQUFGZUNBZ0FnTFpER1U1amdSRUNFVWlDSSt5aW9TRHdESnlMS3NYb0hGUXhCU0hBb0FBRkJocXRNSmc4RGdRQmdmckVzSkFFQWc0WWhaSUVpd2dLdEhpTUJndHBnM3diVVpYR083a09iMU1VS1JGTXlzQ0NoQW9nZ0pDSWcwR0MyYU5lNGdxUWxkZkw0bC9BZzFBWHlTSmduNUxjb0UzUVhJM0lRQWgrUVFBQ2dBREFDd0FBQUFBRUFBUUFBQUZkaUFnQWdMWk5HVTVqb1FoQ0VqeElzc3FFbzhiQzlCUmp5OUFnN0dJTFE0UUVvRTBnQkFFQmNPcGNCQTBEb3hTSy9lOExSSUhuK2kxY0swSXlLZGcwVkFvbGpZSWcrR2duUnJ3VlMvOElBa0lDeW9zQklRcEJBTW9LeTlkSW14UGhTK0dLa0Zya1grVGlndExsSXlLWFVGK05qYWdOaUVBSWZrRUFBb0FCQUFzQUFBQUFCQUFFQUFBQld3Z0lBSUNhUmhsT1k0RUlnakg4UjdMS2hLSEd3c012YjRBQXkzV09EQklCQktDc1lBOVRqdWhETkRLRVZTRVJlelFFTDBXcmhYdWNSVVFHdWlrN2JGbG5nenFWVzlMTWw5WFd2TGRqRmFKdERGcVoxY0VaVUIwZFVndkwzZGdQNFdKWm40amtvbVdOcFNUSXlFQUlma0VBQW9BQlFBc0FBQUFBQkFBRUFBQUJYNGdJQUlDdVN4bE9ZNkNJZ2lEOFJyRUtncUdPd3h3VXJNbEFvU3dJekFHcEpwZ29TREFHaWZEWTVrb3BCWURsRXBBUUJ3ZXZ4ZkJ0UklVR2k4eHdXa0ROQkNJd21DOVZxMGFpUVFEUXVLK1ZnUVBEWFY5aENKakJ3Y0ZZVTVwTHd3SFhRY01LU21OTFFjSUFFeGxiSDhKQnd0dGFYMEFCQWNOYldWYkt5RUFJZmtFQUFvQUJnQXNBQUFBQUJBQUVBQUFCWGtnSUFJQ1NSQmxPWTdDSWdoTjh6YkVLc0tvSWpkRnpaYUVnVUJIS0NoTUp0UndjV3BBV29XbmlmbTZFU0FNaE84bFFLMEVFQVYzckZvcElCQ0VjR3dES0FxUGg0SFVyWTRJQ0hIMWRTb1RGZ2NIVWlaakJoQUpCMkFIRHlrcEtBd0hBd2R6ZjE5S2tBU0lQbDljRGdjbkRrZHROd2lNSkNzaEFDSDVCQUFLQUFjQUxBQUFBQUFRQUJBQUFBVjNJQ0FDQWtrUVpUbU9BaW9zaXlBb3hDcStLUHhDTlZzU01SZ0JzaUNsV3JMVFNXRm9JUVpIbDZwbGVCaDZzdXhLTUlobHZ6YkF3a0JXZkZXckJRVHhOTHEyUkcyeWhTVWtEczJiNjNBWURBb0pYQWNGUndBRGVBa0pEWDBBUUNzRWZBUU1EQUlQQnowckNnY3hreTBKUldFMUFtd3BLeUVBSWZrRUFBb0FDQUFzQUFBQUFCQUFFQUFBQlhrZ0lBSUNLWnprcUo0blFaeExxWkt2NE5xTkxLSzIvUTRFazRsRlhDaHNnNXlwSmpzMUlJM2dFRFVTUkluRUdZQXc2QjZ6TTRKaHJEQXRFb3NWa0xVdEhBN1JIYUhBR0pRRWpzT0RjRWcwRkJBRlZna1FKUTFwQXdjRER3OEtjRnRTSW53SkFvd0NDQTZSSXdxWkFna1BOZ1ZwV25kamR5b2hBQ0g1QkFBS0FBa0FMQUFBQUFBUUFCQUFBQVY1SUNBQ0FpbWM1S2llTEV1VUt2bTJ4QUtMcURDZkMyR2FPOWVMMExBQldUaUJZbUEwNlc2a0hndkNxRUppQUlKaXUzZ2N2Z1Vzc2NIVUVSbStrYUN4eXhhK3pSUGswU2dKRWdmSXZiQWRJQVFMQ0FZbENqNERCdzBJQlFzTUNqSXFCQWNQQW9vQ0JnOXBLZ3NKTHdVRk9oQ1pLeVFEQTNZcUlRQWgrUVFBQ2dBS0FDd0FBQUFBRUFBUUFBQUZkU0FnQWdJcG5PU29ubXhicWlUaENySktFSEZibzhKeERET1pZRkZiK0E0MUU0SDRPaGtPaXBYd0JFbFlJVERBY2tGRU9CZ01RM2Fya01rVUJkeElVR1pwRWI3a2FRQlJsQVNQZzBGUVFIQWJFRU1HRFNWRUFBMVFCaEFFRDFFME5nd0ZBb29DRFdsamFRSVFDRTVxTUhjTmhDa2pJUUFoK1FRQUNnQUxBQ3dBQUFBQUVBQVFBQUFGZVNBZ0FnSXBuT1NvTGd4eHZxZ0tMRWNDQzY1S0VBQnlLSzhjU3BBNERBaUhRL0RrS2hHS2g0WkN0Q3laR282RjZpWVlQQXFGZ1l5MDJ4a1NhTEVNVjM0dEVMeVJZTkVzQ1F5SGx2V2tHQ3pzUGdNQ0VBWTdDZzA0VWs0OExBc0RoUkE4TVZRUEVGMEdBZ3FZWXdTUmx5Y05jV3NrQ2tBcEl5RUFPd0FBQUFBQUFBQUFBRHhpY2lBdlBnbzhZajVYWVhKdWFXNW5QQzlpUGpvZ0lHMTVjM0ZzWDNGMVpYSjVLQ2tnV3p4aElHaHlaV1k5SjJaMWJtTjBhVzl1TG0xNWMzRnNMWEYxWlhKNUp6NW1kVzVqZEdsdmJpNXRlWE54YkMxeGRXVnllVHd2WVQ1ZE9pQkRZVzRuZENCamIyNXVaV04wSUhSdklHeHZZMkZzSUUxNVUxRk1JSE5sY25abGNpQjBhSEp2ZFdkb0lITnZZMnRsZENBbkwzWmhjaTl5ZFc0dmJYbHpjV3hrTDIxNWMzRnNaQzV6YjJOckp5QW9NaWtnYVc0Z1BHSStMMmh2YldVdllXcGhlR3h2WVdRdmQzZDNMMnhwWW5KaGFYSnBaWE12WTJ4aGMzTXViWGx6Y1d3dWNHaHdQQzlpUGlCdmJpQnNhVzVsSUR4aVBqWTRQQzlpUGp4aWNpQXZQZ284WW5JZ0x6NEtQR0krVjJGeWJtbHVaend2WWo0NklDQnRlWE54YkY5eGRXVnllU2dwSUZzOFlTQm9jbVZtUFNkbWRXNWpkR2x2Ymk1dGVYTnhiQzF4ZFdWeWVTYytablZ1WTNScGIyNHViWGx6Y1d3dGNYVmxjbms4TDJFK1hUb2dRU0JzYVc1cklIUnZJSFJvWlNCelpYSjJaWElnWTI5MWJHUWdibTkwSUdKbElHVnpkR0ZpYkdsemFHVmtJR2x1SUR4aVBpOW9iMjFsTDJGcVlYaHNiMkZrTDNkM2R5OXNhV0p5WVdseWFXVnpMMk5zWVhOekxtMTVjM0ZzTG5Cb2NEd3ZZajRnYjI0Z2JHbHVaU0E4WWo0Mk9Ed3ZZajQ4WW5JZ0x6NEtQR0p5SUM4K0NqeGlQbGRoY201cGJtYzhMMkkrT2lBZ2JYbHpjV3hmY1hWbGNua29LU0JiUEdFZ2FISmxaajBuWm5WdVkzUnBiMjR1YlhsemNXd3RjWFZsY25rblBtWjFibU4wYVc5dUxtMTVjM0ZzTFhGMVpYSjVQQzloUGwwNklFTmhiaWQwSUdOdmJtNWxZM1FnZEc4Z2JHOWpZV3dnVFhsVFVVd2djMlZ5ZG1WeUlIUm9jbTkxWjJnZ2MyOWphMlYwSUNjdmRtRnlMM0oxYmk5dGVYTnhiR1F2YlhsemNXeGtMbk52WTJzbklDZ3lLU0JwYmlBOFlqNHZhRzl0WlM5aGFtRjRiRzloWkM5M2QzY3ZiR2xpY21GcGNtbGxjeTlqYkdGemN5NXRlWE54YkM1d2FIQThMMkkrSUc5dUlHeHBibVVnUEdJK05qZzhMMkkrUEdKeUlDOCtDanhpY2lBdlBnbzhZajVYWVhKdWFXNW5QQzlpUGpvZ0lHMTVjM0ZzWDNGMVpYSjVLQ2tnV3p4aElHaHlaV1k5SjJaMWJtTjBhVzl1TG0xNWMzRnNMWEYxWlhKNUp6NW1kVzVqZEdsdmJpNXRlWE54YkMxeGRXVnllVHd2WVQ1ZE9pQkJJR3hwYm1zZ2RHOGdkR2hsSUhObGNuWmxjaUJqYjNWc1pDQnViM1FnWW1VZ1pYTjBZV0pzYVhOb1pXUWdhVzRnUEdJK0wyaHZiV1V2WVdwaGVHeHZZV1F2ZDNkM0wyeHBZbkpoYVhKcFpYTXZZMnhoYzNNdWJYbHpjV3d1Y0dod1BDOWlQaUJ2YmlCc2FXNWxJRHhpUGpZNFBDOWlQanhpY2lBdlBnbzhZbklnTHo0S1BHSStWMkZ5Ym1sdVp6d3ZZajQ2SUNCdGVYTnhiRjl4ZFdWeWVTZ3BJRnM4WVNCb2NtVm1QU2RtZFc1amRHbHZiaTV0ZVhOeGJDMXhkV1Z5ZVNjK1puVnVZM1JwYjI0dWJYbHpjV3d0Y1hWbGNuazhMMkUrWFRvZ1EyRnVKM1FnWTI5dWJtVmpkQ0IwYnlCc2IyTmhiQ0JOZVZOUlRDQnpaWEoyWlhJZ2RHaHliM1ZuYUNCemIyTnJaWFFnSnk5MllYSXZjblZ1TDIxNWMzRnNaQzl0ZVhOeGJHUXVjMjlqYXljZ0tESXBJR2x1SUR4aVBpOW9iMjFsTDJGcVlYaHNiMkZrTDNkM2R5OXNhV0p5WVdseWFXVnpMMk5zWVhOekxtMTVjM0ZzTG5Cb2NEd3ZZajRnYjI0Z2JHbHVaU0E4WWo0Mk9Ed3ZZajQ4WW5JZ0x6NEtQR0p5SUM4K0NqeGlQbGRoY201cGJtYzhMMkkrT2lBZ2JYbHpjV3hmY1hWbGNua29LU0JiUEdFZ2FISmxaajBuWm5WdVkzUnBiMjR1YlhsemNXd3RjWFZsY25rblBtWjFibU4wYVc5dUxtMTVjM0ZzTFhGMVpYSjVQQzloUGwwNklFRWdiR2x1YXlCMGJ5QjBhR1VnYzJWeWRtVnlJR052ZFd4a0lHNXZkQ0JpWlNCbGMzUmhZbXhwYzJobFpDQnBiaUE4WWo0dmFHOXRaUzloYW1GNGJHOWhaQzkzZDNjdmJHbGljbUZwY21sbGN5OWpiR0Z6Y3k1dGVYTnhiQzV3YUhBOEwySStJRzl1SUd4cGJtVWdQR0krTmpnOEwySStQR0p5SUM4K0NnPT1cIlxuIiwiY29uc3QgdSA9IHJlcXVpcmUoJy4vdXRpbCcpXG5cbmxldCBNUVxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdH1cbmxldCBmaXJzdFRpbWUgPSB0cnVlXG5cbmZ1bmN0aW9uIGluaXQoJG91dGVyUGxhY2Vob2xkZXIsIGZvY3VzLCBvbk1hdGhGb2N1c0NoYW5nZWQpIHtcbiAgICBpZihmaXJzdFRpbWUpIHtcbiAgICAgICAgTVEgPSBNYXRoUXVpbGwuZ2V0SW50ZXJmYWNlKDIpXG4gICAgfVxuICAgIGNvbnN0ICRtYXRoRWRpdG9yQ29udGFpbmVyID0gJChgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtYXRoLWVkaXRvclwiIGRhdGEtanM9XCJtYXRoRWRpdG9yXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWF0aC1lZGl0b3ItZXF1YXRpb24tZmllbGRcIiBkYXRhLWpzPVwiZXF1YXRpb25GaWVsZFwiPjwvZGl2PlxuICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwibWF0aC1lZGl0b3ItbGF0ZXgtZmllbGRcIiBkYXRhLWpzPVwibGF0ZXhGaWVsZFwiIHBsYWNlaG9sZGVyPVwiTGFUZXhcIj48L3RleHRhcmVhPlxuICAgICAgICA8L2Rpdj5gKVxuXG4gICAgJG91dGVyUGxhY2Vob2xkZXIuYXBwZW5kKCRtYXRoRWRpdG9yQ29udGFpbmVyKVxuICAgIGNvbnN0ICRsYXRleEZpZWxkID0gJG1hdGhFZGl0b3JDb250YWluZXIuZmluZCgnW2RhdGEtanM9XCJsYXRleEZpZWxkXCJdJylcbiAgICBjb25zdCAkZXF1YXRpb25GaWVsZCA9ICRtYXRoRWRpdG9yQ29udGFpbmVyLmZpbmQoJ1tkYXRhLWpzPVwiZXF1YXRpb25GaWVsZFwiXScpXG4gICAgbGV0IG1xRWRpdFRpbWVvdXRcbiAgICBsZXQgdmlzaWJsZSA9IGZhbHNlXG4gICAgbGV0IGZvY3VzQ2hhbmdlZCA9IG51bGxcbiAgICAvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHMsSlNVbnVzZWRMb2NhbFN5bWJvbHNcbiAgICBjb25zdCBtcUluc3RhbmNlID0gTVEuTWF0aEZpZWxkKCRlcXVhdGlvbkZpZWxkLmdldCgwKSwge1xuICAgICAgICBoYW5kbGVyczoge1xuICAgICAgICAgICAgZWRpdDogb25NcUVkaXQsXG4gICAgICAgICAgICBlbnRlcjogZmllbGQgPT4ge1xuICAgICAgICAgICAgICAgIGNsb3NlTWF0aEVkaXRvcih0cnVlKVxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gaW5zZXJ0TmV3RXF1YXRpb24oJzxicj4nKSwgMilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG4gICAgJGVxdWF0aW9uRmllbGRcbiAgICAgICAgLm9uKCdrZXl1cCcsICcubXEtdGV4dGFyZWEgdGV4dGFyZWEnLCBvbk1xRWRpdClcbiAgICAgICAgLm9uKCdmb2N1cyBibHVyJywgJy5tcS10ZXh0YXJlYSB0ZXh0YXJlYScsIGUgPT4ge1xuICAgICAgICAgICAgZm9jdXMuZXF1YXRpb25GaWVsZCA9IGUudHlwZSAhPT0gJ2JsdXInICYmIGUudHlwZSAhPT0gJ2ZvY3Vzb3V0J1xuICAgICAgICAgICAgb25Gb2N1c0NoYW5nZWQoKVxuICAgICAgICB9KVxuXG4gICAgJGxhdGV4RmllbGRcbiAgICAgICAgLm9uKCdpbnB1dCBwYXN0ZScsIG9uTGF0ZXhVcGRhdGUpXG4gICAgICAgIC5vbignZm9jdXMgYmx1cicsIGUgPT4ge1xuICAgICAgICAgICAgZm9jdXMubGF0ZXhGaWVsZCA9IGUudHlwZSAhPT0gJ2JsdXInXG4gICAgICAgICAgICBvbkZvY3VzQ2hhbmdlZCgpXG4gICAgICAgIH0pXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpbnNlcnROZXdFcXVhdGlvbixcbiAgICAgICAgaW5zZXJ0TWF0aCxcbiAgICAgICAgY2xvc2VNYXRoRWRpdG9yLFxuICAgICAgICBvcGVuTWF0aEVkaXRvcixcbiAgICAgICAgb25Gb2N1c0NoYW5nZWQsXG4gICAgICAgIGlzVmlzaWJsZVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzVmlzaWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIHZpc2libGVcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1xRWRpdCgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KG1xRWRpdFRpbWVvdXQpXG4gICAgICAgIG1xRWRpdFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmIChmb2N1cy5sYXRleEZpZWxkKVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgY29uc3QgbGF0ZXggPSBtcUluc3RhbmNlLmxhdGV4KClcbiAgICAgICAgICAgICRsYXRleEZpZWxkLnZhbChsYXRleClcbiAgICAgICAgICAgIHVwZGF0ZU1hdGhJbWcoJG1hdGhFZGl0b3JDb250YWluZXIucHJldigpLCBsYXRleClcbiAgICAgICAgfSwgMTAwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTGF0ZXhVcGRhdGUoKSB7XG4gICAgICAgIHVwZGF0ZU1hdGhJbWcoJG1hdGhFZGl0b3JDb250YWluZXIucHJldigpLCAkbGF0ZXhGaWVsZC52YWwoKSlcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBtcUluc3RhbmNlLmxhdGV4KCRsYXRleEZpZWxkLnZhbCgpKSwgMSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkZvY3VzQ2hhbmdlZCgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGZvY3VzQ2hhbmdlZClcbiAgICAgICAgZm9jdXNDaGFuZ2VkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWZvY3VzLmxhdGV4RmllbGQgJiYgIWZvY3VzLmVxdWF0aW9uRmllbGQpIGNsb3NlTWF0aEVkaXRvcigpXG4gICAgICAgICAgICBvbk1hdGhGb2N1c0NoYW5nZWQoKVxuICAgICAgICB9LCAwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc2VydE5ld0VxdWF0aW9uKG9wdGlvbmFsTWFya3VwID0gJycpIHtcbiAgICAgICAgd2luZG93LmRvY3VtZW50LmV4ZWNDb21tYW5kKCdpbnNlcnRIVE1MJywgZmFsc2UsIG9wdGlvbmFsTWFya3VwICsgJzxpbWcgZGF0YS1qcz1cIm5ld1wiIGFsdD1cIlwiIHN0eWxlPVwiZGlzcGxheTogbm9uZVwiLz4nKVxuICAgICAgICBzaG93TWF0aEVkaXRvcigkKCdbZGF0YS1qcz1cIm5ld1wiXScpLnJlbW92ZUF0dHIoJ2RhdGEtanMnKSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvcGVuTWF0aEVkaXRvcigkaW1nKSB7XG4gICAgICAgIGlmICh2aXNpYmxlKSBjbG9zZU1hdGhFZGl0b3IoKVxuICAgICAgICB1LnNldEN1cnNvckFmdGVyKCRpbWcpXG4gICAgICAgIHNob3dNYXRoRWRpdG9yKCRpbWcpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2hvd01hdGhFZGl0b3IoJGltZykge1xuICAgICAgICAkaW1nLmhpZGUoKVxuICAgICAgICAkaW1nLmFmdGVyKCRtYXRoRWRpdG9yQ29udGFpbmVyKVxuICAgICAgICB2aXNpYmxlID0gdHJ1ZVxuICAgICAgICB0b2dnbGVNYXRoVG9vbGJhcih0cnVlKVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IG1xSW5zdGFuY2UuZm9jdXMoKSwgMClcbiAgICAgICAgJGxhdGV4RmllbGQudmFsKCRpbWcucHJvcCgnYWx0JykpXG4gICAgICAgIG9uTGF0ZXhVcGRhdGUoKVxuICAgICAgICB1LnNjcm9sbEludG9WaWV3KCRtYXRoRWRpdG9yQ29udGFpbmVyKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc2VydE1hdGgoc3ltYm9sLCBhbHRlcm5hdGl2ZVN5bWJvbCwgdXNlV3JpdGUpIHtcbiAgICAgICAgaWYgKGZvY3VzLmxhdGV4RmllbGQpIHtcbiAgICAgICAgICAgIHUuaW5zZXJ0VG9UZXh0QXJlYUF0Q3Vyc29yKCRsYXRleEZpZWxkLmdldCgwKSwgYWx0ZXJuYXRpdmVTeW1ib2wgfHwgc3ltYm9sKVxuICAgICAgICAgICAgb25MYXRleFVwZGF0ZSgpXG4gICAgICAgIH0gZWxzZSBpZiAoZm9jdXMuZXF1YXRpb25GaWVsZCkge1xuICAgICAgICAgICAgaWYgKHVzZVdyaXRlKSB7XG4gICAgICAgICAgICAgICAgbXFJbnN0YW5jZS53cml0ZShzeW1ib2wpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1xSW5zdGFuY2UudHlwZWRUZXh0KHN5bWJvbClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzeW1ib2wuc3RhcnRzV2l0aCgnXFxcXCcpKSBtcUluc3RhbmNlLmtleXN0cm9rZSgnVGFiJylcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gbXFJbnN0YW5jZS5mb2N1cygpLCAwKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTWF0aEltZygkaW1nLCBsYXRleCkge1xuICAgICAgICAkaW1nLnByb3Aoe1xuICAgICAgICAgICAgc3JjOiAnL21hdGguc3ZnP2xhdGV4PScgKyBlbmNvZGVVUklDb21wb25lbnQobGF0ZXgpLFxuICAgICAgICAgICAgYWx0OiBsYXRleFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlTWF0aEVkaXRvcihzZXRGb2N1c0FmdGVyQ2xvc2UgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCAkY3VycmVudEVkaXRvciA9ICRtYXRoRWRpdG9yQ29udGFpbmVyLmNsb3Nlc3QoJ1tkYXRhLWpzPVwiYW5zd2VyXCJdJylcbiAgICAgICAgY29uc3QgJGltZyA9ICRtYXRoRWRpdG9yQ29udGFpbmVyLnByZXYoKVxuICAgICAgICBpZiAoJGxhdGV4RmllbGQudmFsKCkudHJpbSgpID09PSAnJykge1xuICAgICAgICAgICAgJGltZy5yZW1vdmUoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGltZy5zaG93KClcbiAgICAgICAgICAgIHVwZGF0ZU1hdGhJbWcoJGltZywgJGxhdGV4RmllbGQudmFsKCkpXG4gICAgICAgIH1cblxuICAgICAgICB0b2dnbGVNYXRoVG9vbGJhcihmYWxzZSlcbiAgICAgICAgJG91dGVyUGxhY2Vob2xkZXIuYXBwZW5kKCRtYXRoRWRpdG9yQ29udGFpbmVyKVxuICAgICAgICB2aXNpYmxlID0gZmFsc2VcbiAgICAgICAgZm9jdXMubGF0ZXhGaWVsZCA9IGZhbHNlXG4gICAgICAgIGZvY3VzLmVxdWF0aW9uRmllbGQgPSBmYWxzZVxuICAgICAgICBpZiAoc2V0Rm9jdXNBZnRlckNsb3NlKSAkY3VycmVudEVkaXRvci5mb2N1cygpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlTWF0aFRvb2xiYXIoaXNWaXNpYmxlKSB7XG4gICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnbWF0aC1lZGl0b3ItZm9jdXMnLCBpc1Zpc2libGUpXG4gICAgfVxufVxuIiwiY29uc3QgdSA9IHJlcXVpcmUoJy4vdXRpbCcpXG5jb25zdCB0b29sYmFycyA9IHJlcXVpcmUoJy4vdG9vbGJhcnMnKVxuY29uc3QgY2xpcGJvYXJkID0gcmVxdWlyZSgnLi9jbGlwYm9hcmQnKVxuY29uc3QgbWF0aEVkaXRvciA9IHJlcXVpcmUoJy4vbWF0aC1lZGl0b3InKVxuY29uc3QgbG9jYWxlcyA9IHtcbiAgICBGSTogcmVxdWlyZSgnLi9GSScpLFxuICAgIFNWOiByZXF1aXJlKCcuL1NWJylcbn1cbmNvbnN0IGwgPSBsb2NhbGVzW3dpbmRvdy5sb2NhbGUgfHwgJ0ZJJ10uZWRpdG9yXG5jb25zdCBrZXlDb2RlcyA9IHtcbiAgICBFTlRFUjogMTMsXG4gICAgRVNDOiAyNyxcbiAgICBJOiA3M1xufVxuY29uc3QgJG91dGVyUGxhY2Vob2xkZXIgPSAkKGA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci1oaWRkZW5cIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCIgZGF0YS1qcz1cIm91dGVyUGxhY2Vob2xkZXJcIj5gKVxuY29uc3QgZm9jdXMgPSB7XG4gICAgcmljaFRleHQ6IGZhbHNlLFxuICAgIGxhdGV4RmllbGQ6IGZhbHNlLFxuICAgIGVxdWF0aW9uRmllbGQ6IGZhbHNlXG59XG5sZXQgJGN1cnJlbnRFZGl0b3JcblxuZnVuY3Rpb24gb25NYXRoRm9jdXNDaGFuZ2VkKCkge1xuICAgIGlmIChyaWNoVGV4dEFuZE1hdGhCbHVyKCkpIG9uUmljaFRleHRFZGl0b3JCbHVyKCRjdXJyZW50RWRpdG9yKVxufVxuXG5sZXQgZmlyc3RDYWxsID0gdHJ1ZVxubGV0IG1hdGhcbmxldCAkdG9vbGJhclxuXG5tb2R1bGUuZXhwb3J0cy5tYWtlUmljaFRleHQgPSAoZWxlbWVudCwgb3B0aW9ucywgb25WYWx1ZUNoYW5nZWQgPSAoKSA9PiB7fSkgPT4ge1xuICAgIGlmIChmaXJzdENhbGwpIHtcbiAgICAgICAgbWF0aCA9IG1hdGhFZGl0b3IuaW5pdCgkb3V0ZXJQbGFjZWhvbGRlciwgZm9jdXMsIG9uTWF0aEZvY3VzQ2hhbmdlZClcbiAgICAgICAgJHRvb2xiYXIgPSB0b29sYmFycy5pbml0KG1hdGgsICgpID0+IGZvY3VzLnJpY2hUZXh0LCBsKVxuICAgICAgICAkKCdib2R5JykuYXBwZW5kKCRvdXRlclBsYWNlaG9sZGVyLCAkdG9vbGJhcilcbiAgICAgICAgZmlyc3RDYWxsID0gZmFsc2VcbiAgICB9XG4gICAgb25WYWx1ZUNoYW5nZWQodS5zYW5pdGl6ZUNvbnRlbnQoZWxlbWVudCkpXG4gICAgY29uc3Qge1xuICAgICAgICBzY3JlZW5zaG90OiB7XG4gICAgICAgICAgICBzYXZlcixcbiAgICAgICAgICAgIGxpbWl0XG4gICAgICAgIH1cbiAgICB9ID0gb3B0aW9uc1xuICAgIGNvbnN0ICRhbnN3ZXIgPSAkKGVsZW1lbnQpXG4gICAgbGV0IHBhc3RlSW5Qcm9ncmVzcyA9IGZhbHNlXG5cbiAgICAkYW5zd2VyXG4gICAgICAgIC5hdHRyKHtcbiAgICAgICAgICAgICdjb250ZW50ZWRpdGFibGUnOiAndHJ1ZScsXG4gICAgICAgICAgICAnc3BlbGxjaGVjayc6ICdmYWxzZScsXG4gICAgICAgICAgICAnZGF0YS1qcyc6ICdhbnN3ZXInXG4gICAgICAgIH0pXG4gICAgICAgIC5hZGRDbGFzcygncmljaC10ZXh0LWVkaXRvcicpXG4gICAgICAgIC5vbignbW91c2Vkb3duJywgdS5lcXVhdGlvbkltYWdlU2VsZWN0b3IsIGUgPT4ge1xuICAgICAgICAgICAgb25SaWNoVGV4dEVkaXRvckZvY3VzKCQoZS50YXJnZXQpLmNsb3Nlc3QoJ1tkYXRhLWpzPVwiYW5zd2VyXCJdJykpXG4gICAgICAgICAgICBtYXRoLm9wZW5NYXRoRWRpdG9yKCQoZS50YXJnZXQpKVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2tleWRvd24nLCBlID0+IHtcbiAgICAgICAgICAgIGlmICh1LmlzQ3RybEtleShlLCBrZXlDb2Rlcy5FTlRFUikgfHwgdS5pc0tleShlLCBrZXlDb2Rlcy5FU0MpKSBtYXRoLmNsb3NlTWF0aEVkaXRvcih0cnVlKVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2tleXVwJywgZSA9PiB7XG4gICAgICAgICAgICBpZiAodS5pc0N0cmxLZXkoZSwga2V5Q29kZXMuSSkpIG1hdGguaW5zZXJ0TmV3RXF1YXRpb24oKVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2ZvY3VzIGJsdXInLCBlID0+IHtcbiAgICAgICAgICAgIGlmIChtYXRoLmlzVmlzaWJsZSgpICYmIGUudHlwZSA9PT0gJ2ZvY3VzJykgbWF0aC5jbG9zZU1hdGhFZGl0b3IoKVxuICAgICAgICAgICAgb25SaWNoVGV4dEVkaXRvckZvY3VzQ2hhbmdlZChlKVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2lucHV0JywgZSA9PiB7XG4gICAgICAgICAgICBpZiAoIXBhc3RlSW5Qcm9ncmVzcykgb25WYWx1ZUNoYW5nZWQodS5zYW5pdGl6ZUNvbnRlbnQoZS5jdXJyZW50VGFyZ2V0KSlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdwYXN0ZScsIGUgPT4ge1xuICAgICAgICAgICAgcGFzdGVJblByb2dyZXNzID0gdHJ1ZVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBwYXN0ZUluUHJvZ3Jlc3MgPSBmYWxzZSwgMClcblxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdURVhUQVJFQScpXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICBjbGlwYm9hcmQub25QYXN0ZShlLCBzYXZlciwgb25WYWx1ZUNoYW5nZWQsIGxpbWl0KVxuICAgICAgICB9KVxuICAgIHNldFRpbWVvdXQoKCkgPT4gZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJlbmFibGVPYmplY3RSZXNpemluZ1wiLCBmYWxzZSwgZmFsc2UpLCAwKVxufVxuXG5mdW5jdGlvbiB0b2dnbGVSaWNoVGV4dFRvb2xiYXIoaXNWaXNpYmxlLCAkZWRpdG9yKSB7XG4gICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdyaWNoLXRleHQtZWRpdG9yLWZvY3VzJywgaXNWaXNpYmxlKVxuICAgICRlZGl0b3IudG9nZ2xlQ2xhc3MoJ3JpY2gtdGV4dC1mb2N1c2VkJywgaXNWaXNpYmxlKVxufVxuXG5mdW5jdGlvbiBvblJpY2hUZXh0RWRpdG9yRm9jdXMoJGVsZW1lbnQpIHtcbiAgICAkY3VycmVudEVkaXRvciA9ICRlbGVtZW50XG4gICAgdG9nZ2xlUmljaFRleHRUb29sYmFyKHRydWUsICRjdXJyZW50RWRpdG9yKVxufVxuXG5mdW5jdGlvbiBvblJpY2hUZXh0RWRpdG9yQmx1cigkZWxlbWVudCkge1xuICAgIHRvZ2dsZVJpY2hUZXh0VG9vbGJhcihmYWxzZSwgJGVsZW1lbnQpXG4gICAgbWF0aC5jbG9zZU1hdGhFZGl0b3IoKVxuICAgIGZvY3VzLnJpY2hUZXh0ID0gZmFsc2Vcbn1cblxubGV0IHJpY2hUZXh0RWRpdG9yQmx1clRpbWVvdXRcblxuZnVuY3Rpb24gb25SaWNoVGV4dEVkaXRvckZvY3VzQ2hhbmdlZChlKSB7XG4gICAgZm9jdXMucmljaFRleHQgPSBlLnR5cGUgPT09ICdmb2N1cydcblxuICAgICQoZS5jdXJyZW50VGFyZ2V0KS50b2dnbGVDbGFzcygncmljaC10ZXh0LWZvY3VzZWQnLCBmb2N1cy5yaWNoVGV4dCApXG5cbiAgICBjbGVhclRpbWVvdXQocmljaFRleHRFZGl0b3JCbHVyVGltZW91dClcbiAgICByaWNoVGV4dEVkaXRvckJsdXJUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgICAgaWYgKHJpY2hUZXh0QW5kTWF0aEJsdXIoKSkgb25SaWNoVGV4dEVkaXRvckJsdXIoJChlLnRhcmdldCkpXG4gICAgICAgIGVsc2UgaWYgKGZvY3VzLnJpY2hUZXh0ICYmIG1hdGguaXNWaXNpYmxlKCkpIG1hdGguY2xvc2VNYXRoRWRpdG9yKClcbiAgICAgICAgZWxzZSBvblJpY2hUZXh0RWRpdG9yRm9jdXMoJChlLnRhcmdldCkpXG4gICAgfSwgMClcbn1cblxuZnVuY3Rpb24gcmljaFRleHRBbmRNYXRoQmx1cigpIHtcbiAgICByZXR1cm4gIWZvY3VzLnJpY2hUZXh0ICYmICFtYXRoLmlzVmlzaWJsZSgpICYmICFmb2N1cy5sYXRleEZpZWxkICYmICFmb2N1cy5lcXVhdGlvbkZpZWxkXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhbGxvd2VkVGFnczogW1xuICAgICAgICAnZGl2JyxcbiAgICAgICAgJ2ltZycsXG4gICAgICAgICdicidcbiAgICBdLFxuICAgIGFsbG93ZWRBdHRyaWJ1dGVzOiB7XG4gICAgICAgIGltZzogWydzcmMnLCAnYWx0J11cbiAgICB9LFxuICAgIGFsbG93ZWRTY2hlbWVzOiBbJ2RhdGEnXSxcbiAgICBleGNsdXNpdmVGaWx0ZXI6IGZyYW1lID0+IGZyYW1lLmF0dHJpYnNbJ2RhdGEtanMnXSA9PT0gJ21hdGhFZGl0b3InXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAgICB7XG4gICAgICAgIGxhYmVsOiAnUGVydXMnLFxuICAgICAgICBjaGFyYWN0ZXJzOiBbXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KJoCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxuZXEnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KJiCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxhcHByb3gnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KJpCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxsZXEnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KJpScsIGxhdGV4Q29tbWFuZDogJ1xcXFxnZXEnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8KyJywgbGF0ZXhDb21tYW5kOiAnXjInLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8KzJywgbGF0ZXhDb21tYW5kOiAnXjMnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8K9JywgbGF0ZXhDb21tYW5kOiAnMS8yJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihZMnLCBsYXRleENvbW1hbmQ6ICcxLzMnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8KxJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBtJyB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbGFiZWw6ICdBbGdlYnJhJyxcbiAgICAgICAgY2hhcmFjdGVyczogW1xuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiLwnLCBsYXRleENvbW1hbmQ6ICdcXFxcc2ltJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiaEnLCBsYXRleENvbW1hbmQ6ICdcXFxcZXF1aXYnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KJoicgfSwgLy8gXFxuZXF1aXYgb3IgXFxub3RcXGVxdWl2XG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8K3JywgbGF0ZXhDb21tYW5kOiAnXFxcXGNkb3QnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KApicsIGxhdGV4Q29tbWFuZDogJ1xcXFxkb3RzJyB9LCAvLyBtYXRyaWlzaWFsZ2VicmE/XG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KInicsIGxhdGV4Q29tbWFuZDogJ1xcXFxpbmZ0eScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBsYWJlbDogJ0tyZWlra2FsYWlzZXQgYWFra29zZXQnLFxuICAgICAgICBjaGFyYWN0ZXJzOiBbXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86xJywgbGF0ZXhDb21tYW5kOiAnXFxcXGFscGhhJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOsicsIGxhdGV4Q29tbWFuZDogJ1xcXFxiZXRhJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOtCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxkZWx0YScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzrUnLCBsYXRleENvbW1hbmQ6ICdcXFxcdmFyZXBzaWxvbicgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzrcnLCBsYXRleENvbW1hbmQ6ICdcXFxcZXRhJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiIInLCBsYXRleENvbW1hbmQ6ICdcXFxccGFydGlhbCcgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn8J2chCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxpb3RhJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOuycsIGxhdGV4Q29tbWFuZDogJ1xcXFxsYW1iZGEnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8K1JywgbGF0ZXhDb21tYW5kOiAnXFxcXG11JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfPgCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxwaScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnz4MnLCBsYXRleENvbW1hbmQ6ICdcXFxcc2lnbWEnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8+EJywgbGF0ZXhDb21tYW5kOiAnXFxcXHRhdScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn0KQnLCBsYXRleENvbW1hbmQ6ICdcXFxccGhpJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfPiScsIGxhdGV4Q29tbWFuZDogJ1xcXFxvbWVnYScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzpMnLCBsYXRleENvbW1hbmQ6ICdcXFxcR2FtbWEnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86UJywgbGF0ZXhDb21tYW5kOiAnXFxcXERlbHRhJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOmCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxUaGV0YScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiPJywgbGF0ZXhDb21tYW5kOiAnXFxcXFBpJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiJEnLCBsYXRleENvbW1hbmQ6ICdcXFxcU2lnbWEnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86mJywgbGF0ZXhDb21tYW5kOiAnXFxcXFBoaScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzqknLCBsYXRleENvbW1hbmQ6ICdcXFxcT21lZ2EnIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBsYWJlbDogJ0dlb21ldHJpYSBqYSB2ZWt0b3Jpb3BwaScsXG4gICAgICAgIGNoYXJhY3RlcnM6IFtcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnwrAnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIoCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxhbmdsZScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oqlJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBlcnAnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KAlicsIGxhdGV4Q29tbWFuZDogJ1xcXFxwYXJhbGxlbCcsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oeFJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihpEnLCBsYXRleENvbW1hbmQ6ICdcXFxcdXBhcnJvdycgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oaTJywgbGF0ZXhDb21tYW5kOiAnXFxcXGRvd25hcnJvdycgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oaUJywgbGF0ZXhDb21tYW5kOiAnXFxcXGxlZnRyaWdodGFycm93JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfih4wnIH0gLy8gXFxyaWdodGxlZnRoYXJwb29uc1xuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGxhYmVsOiAnTG9naWlra2EgamEgam91a2tvLW9wcGknLFxuICAgICAgICBjaGFyYWN0ZXJzOiBbXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KHkicsIGxhdGV4Q29tbWFuZDogJ1xcXFxSaWdodGFycm93JywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfih5QnLCBsYXRleENvbW1hbmQ6ICdcXFxcTGVmdHJpZ2h0YXJyb3cnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIpycsIGxhdGV4Q29tbWFuZDogJ1xcXFxhbmQnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIqCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxvcicgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnwqwnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIgycsIGxhdGV4Q29tbWFuZDogJ1xcXFxleGlzdHMnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIgCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxmb3JhbGwnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIqScsIGxhdGV4Q29tbWFuZDogJ1xcXFxjYXAnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIqicsIGxhdGV4Q29tbWFuZDogJ1xcXFxjdXAnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIlicsIGxhdGV4Q29tbWFuZDogJ1xcXFxzZXRtaW51cycgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oqCJywgbGF0ZXhDb21tYW5kOiAnXFxcXHN1YnNldCcgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oqEJywgbGF0ZXhDb21tYW5kOiAnXFxcXG5vdHN1YnNldCcgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiIJywgbGF0ZXhDb21tYW5kOiAnXFxcXGluJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiIknLCBsYXRleENvbW1hbmQ6ICdcXFxcbm90aW4nIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIhScsIGxhdGV4Q29tbWFuZDogJ1xcXFxlbXB0eScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oaSJywgbGF0ZXhDb21tYW5kOiAnXFxcXHJpZ2h0YXJyb3cnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KImCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxjaXJjJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiLwnLCBsYXRleENvbW1hbmQ6ICdcXFxcc2ltJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihJ0nIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KElScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oSkJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihJonIH1cbiAgICAgICAgXVxuICAgIH1cbl1cbiIsImNvbnN0IHNwZWNpYWxDaGFyYWN0ZXJHcm91cHMgPSByZXF1aXJlKCcuL3NwZWNpYWxDaGFyYWN0ZXJzJylcbmNvbnN0IGxhdGV4Q29tbWFuZHMgPSByZXF1aXJlKCcuL2xhdGV4Q29tbWFuZHMnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpbml0LFxufVxuXG5mdW5jdGlvbiBpbml0KG1hdGhFZGl0b3IsIGhhc1JpY2hUZXh0Rm9jdXMsIGwpIHtcbiAgICBjb25zdCAkdG9vbGJhciA9ICQoYFxuICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29sc1wiIGRhdGEtanM9XCJ0b29sc1wiIHN0eWxlPVwiZGlzcGxheTogbm9uZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbHMtYnV0dG9uLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29sYmFyLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItY2hhcmFjdGVycy1leHBhbmQtY29sbGFwc2VcIiBkYXRhLWpzPVwiZXhwYW5kQ29sbGFwc2VDaGFyYWN0ZXJzXCIgc3R5bGU9XCJ6LWluZGV4OiAxMDBcIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbHMtcm93XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhci13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xiYXItY2hhcmFjdGVycyByaWNoLXRleHQtZWRpdG9yLXRvb2xiYXIgcmljaC10ZXh0LWVkaXRvci10b29sYmFyLWJ1dHRvbi1saXN0XCIgZGF0YS1qcz1cImNoYXJhY3RlcnNMaXN0XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xzLXJvd1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xiYXItd3JhcHBlciByaWNoLXRleHQtZWRpdG9yLWVxdWF0aW9uLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhci1lcXVhdGlvbiByaWNoLXRleHQtZWRpdG9yLXRvb2xiYXIgcmljaC10ZXh0LWVkaXRvci10b29sYmFyLWJ1dHRvbi1saXN0XCIgZGF0YS1qcz1cIm1hdGhUb29sYmFyXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xzLWJ1dHRvbi13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhci13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLW5ldy1lcXVhdGlvbiByaWNoLXRleHQtZWRpdG9yLWJ1dHRvbiByaWNoLXRleHQtZWRpdG9yLWJ1dHRvbi1hY3Rpb25cIiBkYXRhLWpzPVwibmV3RXF1YXRpb25cIiBkYXRhLWNvbW1hbmQ9XCJDdHJsLUlcIj7OoyAke2wuaW5zZXJ0RXF1YXRpb259PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIGApXG4gICAgICAgIC5vbignbW91c2Vkb3duJywgJ1tkYXRhLWpzPVwiZXhwYW5kQ29sbGFwc2VDaGFyYWN0ZXJzXCJdJywgZSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICR0b29sYmFyLnRvZ2dsZUNsYXNzKCdyaWNoLXRleHQtZWRpdG9yLWNoYXJhY3RlcnMtZXhwYW5kZWQnKVxuICAgICAgICB9KVxuXG4gICAgY29uc3QgJG5ld0VxdWF0aW9uID0gJHRvb2xiYXIuZmluZCgnW2RhdGEtanM9XCJuZXdFcXVhdGlvblwiXScpXG4gICAgY29uc3QgJG1hdGhUb29sYmFyID0gJHRvb2xiYXIuZmluZCgnW2RhdGEtanM9XCJtYXRoVG9vbGJhclwiXScpXG4gICAgaW5pdFNwZWNpYWxDaGFyYWN0ZXJUb29sYmFyKCR0b29sYmFyLCBtYXRoRWRpdG9yLCBoYXNSaWNoVGV4dEZvY3VzKVxuICAgIGluaXRNYXRoVG9vbGJhcigkbWF0aFRvb2xiYXIsIG1hdGhFZGl0b3IpXG4gICAgaW5pdE5ld0VxdWF0aW9uKCRuZXdFcXVhdGlvbiwgbWF0aEVkaXRvciwgaGFzUmljaFRleHRGb2N1cylcblxuICAgIHJldHVybiAkdG9vbGJhclxufVxuXG5jb25zdCBzcGVjaWFsQ2hhcmFjdGVyVG9CdXR0b24gPSBjaGFyID0+IGA8YnV0dG9uIGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci1idXR0b24gcmljaC10ZXh0LWVkaXRvci1idXR0b24tZ3JpZCR7Y2hhci5wb3B1bGFyID8gJyByaWNoLXRleHQtZWRpdG9yLWNoYXJhY3RlcnMtcG9wdWxhcicgOicnfVwiICR7Y2hhci5sYXRleENvbW1hbmQgPyBgZGF0YS1jb21tYW5kPVwiJHtjaGFyLmxhdGV4Q29tbWFuZH1cImAgOiAnJ30+JHtjaGFyLmNoYXJhY3Rlcn08L2J1dHRvbj5gXG5cbmNvbnN0IHBvcHVsYXJJbkdyb3VwID0gZ3JvdXAgPT4gZ3JvdXAuY2hhcmFjdGVycy5maWx0ZXIoY2hhcmFjdGVyID0+IGNoYXJhY3Rlci5wb3B1bGFyKS5sZW5ndGhcblxuZnVuY3Rpb24gaW5pdFNwZWNpYWxDaGFyYWN0ZXJUb29sYmFyKCR0b29sYmFyLCBtYXRoRWRpdG9yLCBoYXNBbnN3ZXJGb2N1cykge1xuICAgIGNvbnN0IGdyaWRCdXR0b25XaWR0aFB4ID0gMzVcblxuICAgICR0b29sYmFyLmZpbmQoJ1tkYXRhLWpzPVwiY2hhcmFjdGVyc0xpc3RcIl0nKVxuICAgICAgICAuYXBwZW5kKHNwZWNpYWxDaGFyYWN0ZXJHcm91cHMubWFwKGdyb3VwID0+XG4gICAgICAgICAgICBgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhci1jaGFyYWN0ZXJzLWdyb3VwXCIgXG4gICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAke3BvcHVsYXJJbkdyb3VwKGdyb3VwKSAqIGdyaWRCdXR0b25XaWR0aFB4fXB4XCI+XG4gICAgICAgICAgICAgICAgICAke2dyb3VwLmNoYXJhY3RlcnMubWFwKHNwZWNpYWxDaGFyYWN0ZXJUb0J1dHRvbikuam9pbignJyl9XG4gICAgICAgICAgICAgPC9kaXY+YCkpXG4gICAgICAgIC5vbignbW91c2Vkb3duJywgJ2J1dHRvbicsIGUgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgICAgIGNvbnN0IGNoYXJhY3RlciA9IGUuY3VycmVudFRhcmdldC5pbm5lclRleHRcbiAgICAgICAgICAgIGNvbnN0IGNvbW1hbmQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jb21tYW5kXG4gICAgICAgICAgICBpZiAoaGFzQW5zd2VyRm9jdXMoKSkgd2luZG93LmRvY3VtZW50LmV4ZWNDb21tYW5kKCdpbnNlcnRUZXh0JywgZmFsc2UsIGNoYXJhY3RlcilcbiAgICAgICAgICAgIGVsc2UgbWF0aEVkaXRvci5pbnNlcnRNYXRoKGNvbW1hbmQgfHwgY2hhcmFjdGVyKVxuICAgICAgICB9KVxufVxuXG5mdW5jdGlvbiBpbml0TWF0aFRvb2xiYXIoJG1hdGhUb29sYmFyLCBtYXRoRWRpdG9yKSB7XG4gICAgJG1hdGhUb29sYmFyLmFwcGVuZChsYXRleENvbW1hbmRzXG4gICAgICAgIC5tYXAobyA9PiBgPGJ1dHRvbiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItYnV0dG9uIHJpY2gtdGV4dC1lZGl0b3ItYnV0dG9uLWdyaWRcIiBkYXRhLWNvbW1hbmQ9XCIke28uYWN0aW9ufVwiIGRhdGEtbGF0ZXhjb21tYW5kPVwiJHtvLmxhYmVsIHx8ICcnfVwiIGRhdGEtdXNld3JpdGU9XCIke28udXNlV3JpdGUgfHwgZmFsc2V9XCI+XG48aW1nIHNyYz1cIi9tYXRoLnN2Zz9sYXRleD0ke2VuY29kZVVSSUNvbXBvbmVudChvLmxhYmVsID8gby5sYWJlbC5yZXBsYWNlKC9YL2csICdcXFxcc3F1YXJlJykgOiBvLmFjdGlvbil9XCIvPlxuPC9idXR0b24+YCkuam9pbignJylcbiAgICApLm9uKCdtb3VzZWRvd24nLCAnYnV0dG9uJywgZSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBjb25zdCBkYXRhc2V0ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XG4gICAgICAgIG1hdGhFZGl0b3IuaW5zZXJ0TWF0aChkYXRhc2V0LmNvbW1hbmQsIGRhdGFzZXQubGF0ZXhjb21tYW5kLCBkYXRhc2V0LnVzZXdyaXRlID09PSAndHJ1ZScpXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gaW5pdE5ld0VxdWF0aW9uKCRuZXdFcXVhdGlvbiwgbWF0aEVkaXRvciwgaGFzQW5zd2VyRm9jdXMpIHtcbiAgICAkbmV3RXF1YXRpb24ubW91c2Vkb3duKChlID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGlmICghaGFzQW5zd2VyRm9jdXMoKSkgcmV0dXJuIC8vIFRPRE86IHJlbW92ZSB3aGVuIGJ1dHRvbiBpcyBvbmx5IHZpc2libGUgd2hlbiB0ZXh0YXJlYSBoYXMgZm9jdXNcbiAgICAgICAgbWF0aEVkaXRvci5pbnNlcnROZXdFcXVhdGlvbigpXG4gICAgfSkuYmluZCh0aGlzKSlcbn1cbiIsImNvbnN0IHNhbml0aXplSHRtbCA9IHJlcXVpcmUoJ3Nhbml0aXplLWh0bWwnKVxuY29uc3Qgc2FuaXRpemVPcHRzID0gcmVxdWlyZSgnLi9zYW5pdGl6ZU9wdHMnKVxuY29uc3QgZXF1YXRpb25JbWFnZVNlbGVjdG9yID0gJ2ltZ1tzcmNePVwiL21hdGguc3ZnXCJdJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpc0tleSxcbiAgICBpc0N0cmxLZXksXG4gICAgaW5zZXJ0VG9UZXh0QXJlYUF0Q3Vyc29yLFxuICAgIHNhbml0aXplLFxuICAgIHNhbml0aXplQ29udGVudCxcbiAgICBzZXRDdXJzb3JBZnRlcixcbiAgICBlcXVhdGlvbkltYWdlU2VsZWN0b3IsXG4gICAgZXhpc3RpbmdTY3JlZW5zaG90Q291bnQsXG4gICAgc2Nyb2xsSW50b1ZpZXdcbn1cblxuZnVuY3Rpb24gY29udmVydExpbmtzVG9SZWxhdGl2ZShodG1sKSB7XG4gICAgcmV0dXJuIGh0bWwucmVwbGFjZShuZXcgUmVnRXhwKGRvY3VtZW50LmxvY2F0aW9uLm9yaWdpbiwgJ2cnKSwgJycpXG59XG5cbmZ1bmN0aW9uIHNhbml0aXplKGh0bWwpIHtcbiAgICByZXR1cm4gc2FuaXRpemVIdG1sKGNvbnZlcnRMaW5rc1RvUmVsYXRpdmUoaHRtbCksIHNhbml0aXplT3B0cylcbn1cbmZ1bmN0aW9uIGluc2VydFRvVGV4dEFyZWFBdEN1cnNvcihmaWVsZCwgdmFsdWUpIHtcbiAgICBjb25zdCBzdGFydFBvcyA9IGZpZWxkLnNlbGVjdGlvblN0YXJ0XG4gICAgY29uc3QgZW5kUG9zID0gZmllbGQuc2VsZWN0aW9uRW5kXG4gICAgbGV0IG9sZFZhbHVlID0gZmllbGQudmFsdWVcbiAgICBmaWVsZC52YWx1ZSA9IG9sZFZhbHVlLnN1YnN0cmluZygwLCBzdGFydFBvcykgKyB2YWx1ZSArIG9sZFZhbHVlLnN1YnN0cmluZyhlbmRQb3MsIG9sZFZhbHVlLmxlbmd0aClcbiAgICBmaWVsZC5zZWxlY3Rpb25TdGFydCA9IGZpZWxkLnNlbGVjdGlvbkVuZCA9IHN0YXJ0UG9zICsgdmFsdWUubGVuZ3RoXG59XG5cbmZ1bmN0aW9uIGlzS2V5KGUsIGtleSkge1xuICAgIHJldHVybiBwcmV2ZW50SWZUcnVlKGUsICFlLmFsdEtleSAmJiAhZS5zaGlmdEtleSAmJiAhZS5jdHJsS2V5ICYmIGtleU9yS2V5Q29kZShlLCBrZXkpKVxufVxuXG5mdW5jdGlvbiBpc0N0cmxLZXkoZSwga2V5KSB7XG4gICAgcmV0dXJuIHByZXZlbnRJZlRydWUoZSwgIWUuYWx0S2V5ICYmICFlLnNoaWZ0S2V5ICYmIGUuY3RybEtleSAmJiBrZXlPcktleUNvZGUoZSwga2V5KSlcbn1cblxuZnVuY3Rpb24ga2V5T3JLZXlDb2RlKGUsIHZhbCkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJyA/IGUua2V5ID09PSB2YWwgOiBlLmtleUNvZGUgPT09IHZhbFxufVxuZnVuY3Rpb24gcHJldmVudElmVHJ1ZShlLCB2YWwpIHtcbiAgICBpZiAodmFsKSBlLnByZXZlbnREZWZhdWx0KClcbiAgICByZXR1cm4gdmFsXG59XG5cbmZ1bmN0aW9uIHNhbml0aXplQ29udGVudChhbnN3ZXJFbGVtZW50KSB7XG4gICAgY29uc3QgJGFuc3dlckVsZW1lbnQgPSAkKGFuc3dlckVsZW1lbnQpXG4gICAgY29uc3QgJG1hdGhFZGl0b3IgPSAkYW5zd2VyRWxlbWVudC5maW5kKCdbZGF0YS1qcz1cIm1hdGhFZGl0b3JcIl0nKVxuICAgICRtYXRoRWRpdG9yLmhpZGUoKVxuICAgIGNvbnN0IHRleHQgPSAkYW5zd2VyRWxlbWVudC5nZXQoMCkuaW5uZXJUZXh0XG4gICAgJG1hdGhFZGl0b3Iuc2hvdygpXG5cbiAgICBjb25zdCBodG1sID0gc2FuaXRpemUoJGFuc3dlckVsZW1lbnQuaHRtbCgpKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYW5zd2VySFRNTDogaHRtbCxcbiAgICAgICAgYW5zd2VyVGV4dDogdGV4dCxcbiAgICAgICAgaW1hZ2VDb3VudDogZXhpc3RpbmdTY3JlZW5zaG90Q291bnQoJChgPGRpdj4ke2h0bWx9PC9kaXY+YCkpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXRDdXJzb3JBZnRlcigkaW1nKSB7XG4gICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpXG4gICAgY29uc3QgaW1nID0gJGltZy5nZXQoMClcbiAgICBjb25zdCBuZXh0U2libGluZyA9IGltZy5uZXh0U2libGluZyAmJiBpbWcubmV4dFNpYmxpbmcudGFnTmFtZSA9PT0gJ0JSJyA/IGltZy5uZXh0U2libGluZyA6IGltZ1xuICAgIHJhbmdlLnNldFN0YXJ0KG5leHRTaWJsaW5nLCAwKVxuICAgIHJhbmdlLnNldEVuZChuZXh0U2libGluZywgMClcbiAgICBjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKClcbiAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKClcbiAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpXG59XG5cbmZ1bmN0aW9uIGV4aXN0aW5nU2NyZWVuc2hvdENvdW50KCRlZGl0b3IpIHtcbiAgICBjb25zdCBpbWFnZUNvdW50ID0gJGVkaXRvci5maW5kKCdpbWcnKS5sZW5ndGhcbiAgICBjb25zdCBlcXVhdGlvbkNvdW50ID0gJGVkaXRvci5maW5kKGVxdWF0aW9uSW1hZ2VTZWxlY3RvcikubGVuZ3RoXG4gICAgcmV0dXJuIGltYWdlQ291bnQgLSBlcXVhdGlvbkNvdW50XG59XG5cbmZ1bmN0aW9uIHNjcm9sbEludG9WaWV3KCRlbGVtZW50KSB7XG4gICAgY29uc3QgJHdpbmRvdyA9ICQod2luZG93KVxuICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9ICR3aW5kb3cuaGVpZ2h0KCkgLSA0MFxuICAgIGNvbnN0IHNjcm9sbCA9IHdpbmRvd0hlaWdodCArICR3aW5kb3cuc2Nyb2xsVG9wKClcbiAgICBjb25zdCBwb3MgPSAkZWxlbWVudC5vZmZzZXQoKS50b3AgKyAkZWxlbWVudC5oZWlnaHQoKVxuICAgIGlmIChzY3JvbGwgPCBwb3MpIHtcbiAgICAgICAgJHdpbmRvdy5zY3JvbGxUb3AocG9zIC0gd2luZG93SGVpZ2h0KVxuICAgIH1cbn1cbiJdfQ==
