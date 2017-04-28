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

module.exports = [{ action: '\\sqrt', label: '\\sqrt{X}' }, { action: '^', label: 'x^{X}' }, { action: '\\frac', label: '\\frac{X}{X}' }, { action: '\\int', label: '\\int_{X}^{X}' }, { action: '\\lim_', label: '\\lim_{X}' }, { action: '\\lim_{x\\rightarrow\\infty}', label: '\\lim_{x\\rightarrow\\infty}', useWrite: true }, { action: '\\overrightarrow', label: '\\overrightarrow{X}' }, { action: '_', label: 'x_X' }, { action: '\\nthroot', label: '\\sqrt[X]{X}' }, { action: '\\sum', label: '\\sum_{X}^{X}' }, { action: '\\binom', label: '\\binom{X}{X}' }, { action: '\\sin' }, { action: '\\cos' }, { action: '\\tan' }, { action: '\\vec', label: '\\vec{X}' }, { action: '\\bar', label: '\\bar{X}' }, { action: '\\overline{\\text{i}}', useWrite: true }, { action: '\\overline{\\text{j}}', useWrite: true }, { action: '\\overline{\\text{k}}', useWrite: true }, { action: '\\overleftarrow', label: '\\overleftarrow{X}' }, { action: '|', label: '|X|' }, { action: '(', label: '(X)' }, { action: '_{ }^{ } ', label: '_{X}^{X}X', useWrite: true }, { action: '\\mathrm', label: '\\mathrm{T}' }];

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

        window.document.execCommand('insertHTML', false, optionalMarkup + '<img data-js="new" alt="" src="" style="display: none"/>');
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
    I: 73,
    E: 69,
    Y: 89
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
        if (u.isCtrlKey(e, keyCodes.E)) math.insertNewEquation();
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
    label: 'Perusmerit ja kreikkalaiset aakkoset',
    characters: [{ character: '°', popular: true }, { character: '·', latexCommand: '\\cdot', popular: true }, { character: '±', latexCommand: '\\pm', popular: true }, { character: '∞', latexCommand: '\\infty', popular: true }, { character: '²', latexCommand: '^2', popular: true }, { character: '³', latexCommand: '^3', popular: true }, { character: '½', latexCommand: '1/2', popular: true }, { character: '⅓', latexCommand: '1/3', popular: true }, { character: 'π', latexCommand: '\\pi', popular: true }, { character: 'α', latexCommand: '\\alpha', popular: true }, { character: 'β', latexCommand: '\\beta', popular: true }, { character: 'Γ', latexCommand: '\\Gamma' }, { character: 'γ', latexCommand: '\\gamma' }, { character: 'Δ', latexCommand: '\\Delta' }, { character: 'δ', latexCommand: '\\delta' }, { character: 'ε', latexCommand: '\\varepsilon' }, { character: 'ζ', latexCommand: '\\zeta' }, { character: 'η', latexCommand: '\\eta' }, { character: 'Θ', latexCommand: '\\Theta' }, { character: 'ϑ', latexCommand: '\\vartheta' }, { character: '𝜄', latexCommand: '\\iota' }, { character: 'κ', latexCommand: '\\kappa' }, { character: 'Λ', latexCommand: '\\Lambda' }, { character: 'λ', latexCommand: '\\lambda' }, { character: 'µ', latexCommand: '\\mu' }, { character: 'Ξ', latexCommand: '\\Xi' }, { character: 'ξ', latexCommand: '\\xi' }, { character: '∏', latexCommand: '\\Pi' }, { character: 'ρ', latexCommand: '\\rho' }, { character: '∑', latexCommand: '\\Sigma' }, { character: 'σ', latexCommand: '\\sigma' }, { character: 'τ', latexCommand: '\\tau' }, { character: 'Υ', latexCommand: '\\Upsilon' }, { character: 'υ', latexCommand: '\\upsilon' }, { character: 'Φ', latexCommand: '\\Phi' }, { character: 'Ф', latexCommand: '\\phi' }, { character: 'χ', latexCommand: '\\chi' }, { character: 'Ψ', latexCommand: '\\Psi' }, { character: 'ψ', latexCommand: '\\psi' }, { character: 'Ω', latexCommand: '\\Omega' }, { character: 'ω', latexCommand: '\\omega' }, { character: '∂', latexCommand: '\\partial' }]
}, {
    label: 'Algebra',
    characters: [{ character: '≠', latexCommand: '\\neq', popular: true }, { character: '≈', latexCommand: '\\approx', popular: true }, { character: '≤', latexCommand: '\\leq', popular: true }, { character: '≥', latexCommand: '\\geq' }, { character: '∼', latexCommand: '\\sim' }, { character: '≡', latexCommand: '\\equiv' }, { character: '≢' }, // \nequiv or \not\equiv
    { character: '∘', latexCommand: '\\circ' }, { character: '…', latexCommand: '\\dots' }]
}, {
    label: 'Geometria ja vektorioppi',
    characters: [{ character: '∠', latexCommand: '\\angle', popular: true }, { character: '→', latexCommand: '\\rightarrow', popular: true }, { character: '⇅', popular: true }, { character: '↑', latexCommand: '\\uparrow' }, { character: '↓', latexCommand: '\\downarrow' }, { character: '↔', latexCommand: '\\leftrightarrow' }, { character: '⊥', latexCommand: '\\perp' }, { character: '‖', latexCommand: '\\parallel' }, { character: '⇌' } // \rightleftharpoons
    ]
}, {
    label: 'Logiikka ja joukko-oppi',
    characters: [{ character: '⇒', latexCommand: '\\Rightarrow', popular: true }, { character: '⇔', latexCommand: '\\Leftrightarrow', popular: true }, { character: '∃', latexCommand: '\\exists', popular: true }, { character: '∀', latexCommand: '\\forall', popular: true }, { character: 'ℝ', popular: true }, { character: 'ℕ' }, { character: 'ℤ' }, { character: 'ℚ' }, { character: '∩', latexCommand: '\\cap' }, { character: '∪', latexCommand: '\\cup' }, { character: '∖', latexCommand: '\\setminus' }, { character: '⊂', latexCommand: '\\subset' }, { character: '⊄', latexCommand: '\\notsubset' }, { character: '∈', latexCommand: '\\in' }, { character: '∉', latexCommand: '\\notin' }, { character: '∅', latexCommand: '\\empty' }, { character: '∧', latexCommand: '\\and' }, { character: '∨', latexCommand: '\\or' }, { character: '¬' }]
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
    var emptyImageCount = $editor.find('img[src=""]').length;
    var equationCount = $editor.find(equationImageSelector).length;
    return imageCount - equationCount - emptyImageCount;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvRkkuanMiLCJhcHAvU1YuanMiLCJhcHAvY2xpcGJvYXJkLmpzIiwiYXBwL2xhdGV4Q29tbWFuZHMuanMiLCJhcHAvbG9hZGluZ0ltZy5qcyIsImFwcC9tYXRoLWVkaXRvci5qcyIsImFwcC9yaWNoLXRleHQtZWRpdG9yLmpzIiwiYXBwL3Nhbml0aXplT3B0cy5qcyIsImFwcC9zcGVjaWFsQ2hhcmFjdGVycy5qcyIsImFwcC90b29sYmFycy5qcyIsImFwcC91dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxPQUFPLE9BQVAsR0FBaUI7QUFDYixZQUFRO0FBQ0osb0JBQVksZ0JBRFI7QUFFSixlQUFPLHlDQUZIO0FBR0osa2hCQUhJO0FBV0oscURBWEk7QUFZSixrY0FaSTtBQXVCSixvQkFBWSxVQXZCUjtBQXdCSiwyQkFBbUIsZUF4QmY7QUF5Qkosd0JBQWdCLGFBekJaO0FBMEJKLGVBQU8sT0ExQkg7QUEyQkosY0FBTSxVQTNCRjtBQTRCSixpQkFBUyxZQTVCTDtBQTZCSixzQkFBYyxtQkE3QlY7QUE4Qkosa0JBQVUsS0E5Qk47QUErQkosbUJBQVcsWUEvQlA7QUFnQ0oscUJBQWEsU0FoQ1Q7QUFpQ0osNEJBQW9CO0FBakNoQixLQURLO0FBb0NiLGdCQUFZO0FBQ1Isc0JBQWMsbUJBRE47QUFFUixpQkFBUyxZQUZEO0FBR1Isb0JBQVksZ0JBSEo7QUFJUixlQUFPLFdBSkM7QUFLUixrQkFBVSxHQUxGO0FBTVIsdUJBQWUsc0JBTlA7QUFPUixjQUFNLG9CQVBFO0FBUVIsa0JBQVUsZUFSRjtBQVNSLG1CQUFXO0FBVEg7QUFwQ0MsQ0FBakI7Ozs7O0FDQUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsWUFBUTtBQUNKLG9CQUFZLGlCQURSO0FBRUosZUFBTywwQ0FGSDtBQUdKLDZoQkFISTtBQVFKLHdEQVJJO0FBU0osMFdBVEk7QUFrQkosb0JBQVksYUFs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ZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGVkaXRvcjoge1xuICAgICAgICBtYXRoRWRpdG9yOiAnTWF0aWtrYWVkaXRvcmknLFxuICAgICAgICB0aXRsZTogJ0thYXZhZWRpdG9yaW4gZW5zaW1tw6RpbmVuIGtlaGl0eXN2ZXJzaW8nLFxuICAgICAgICBkZXNjcmlwdGlvbjogYDx1bD5cbjxsaT5FZGl0b3JpIHRvaW1paSBwYXJoYWl0ZW4gRmlyZWZveC1zZWxhaW1lbGxhLjwvbGk+XG48bGk+4oCcTGlzw6TDpCBrYWF2YeKAnSAtbmFwaW4gYWx0YSBsw7Z5ZMOkdCB5bGVpc2ltcGnDpCBtYXRlbWF0aWlrYXNzYSwgZnlzaWlrYXNzYSBqYVxua2VtaWFzc2Ega8OkeXRldHTDpHZpw6QgbWVya2ludMO2asOkLiBMaXPDpGtzaSBlcmlrb2lzbWVya2tlasOkIHZvaSBrw6R5dHTDpMOkIGthYXZhbiBraXJqb2l0dGFtaXNlZW4uPC9saT5cbiA8bGk+S2Fhdm9qYSB2b2kgcmFrZW50YWFcbmtsaWtrYWFtYWxsYSB2YWxpa29uIG1lcmtpbnTDtmrDpCBqYS90YWkga2lyam9pdHRhbWFsbGEgTGFUZVhpYS48L2xpPlxuIDxsaT5FZGl0b3JpbiB2YXN0YXVza2VudHTDpMOkbiB2b2kga2lyam9pdHRhYSB0ZWtzdGnDpCBqYSBrYWF2b2phIHNla8OkXG5saXPDpHTDpCBrdXZpYS48L2xpPjwvdWw+YCxcbiAgICAgICAgc2hvcnRjdXRUaXRsZTogYFBpa2Fuw6RwcMOkaW52aW5ra2Vqw6RgLFxuICAgICAgICBzaG9ydGN1dHM6IGA8dGFibGU+PHRib2R5PlxuPHRyPjx0aD5MaWl0w6Qga3V2YSBsZWlrZXDDtnlkw6RsdMOkPC90aD48dGQ+Q3RybC1WPC90ZD48L3RyPlxuPHRyPjx0aD5LaXJqb2l0YSBrYWF2YTwvdGg+PHRkPkN0cmwtSTwvdGQ+PC90cj5cbjx0cj48dGggY29sc3Bhbj1cIjJcIj5LYWF2YXNzYTwvdGg+PC90cj5cbjx0cj48dGg+SmFrb3ZpaXZhPC90aD48dGQ+LzwvdGQ+PC90cj5cbjx0cj48dGg+S2VydG9tZXJra2k8L3RoPjx0ZD4qPC90ZD48L3RyPlxuPHRyPjx0aD5Fa3Nwb25lbnR0aTwvdGg+PHRkPl48L3RkPjwvdHI+XG48dHI+PHRoPlN1bGplIGthYXZhPC90aD48dGQ+RXNjPC90ZD48L3RyPlxuPHRyPjx0aD5MaXPDpMOkIGthYXZhIHNldXJhYXZhbGxlIHJpdmlsbGU8L3RoPjx0ZD5FbnRlcjwvdGQ+PC90cj5cbjwvdGJvZHk+XG48L3RhYmxlPmAsXG4gICAgICAgIGZvcm1hdHRpbmc6ICdNdW90b2lsdScsXG4gICAgICAgIHNwZWNpYWxDaGFyYWN0ZXJzOiAnRXJpa29pc21lcmtpdCcsXG4gICAgICAgIGluc2VydEVxdWF0aW9uOiAnTGlzw6TDpCBrYWF2YScsXG4gICAgICAgIGNsb3NlOiAnc3VsamUnLFxuICAgICAgICBzYXZlOiAnVGFsbGVubmEnLFxuICAgICAgICB1cGRhdGVkOiAnUMOkaXZpdGV0dHknLFxuICAgICAgICBzZW5kRmVlZGJhY2s6ICdMw6RoZXTDpCBwYWxhdXRldHRhJyxcbiAgICAgICAgbGFuZ0xpbms6ICcvc3YnLFxuICAgICAgICBsYW5nTGFiZWw6ICdQw6Ugc3ZlbnNrYScsXG4gICAgICAgIGFuc3dlclRpdGxlOiAnVmFzdGF1cycsXG4gICAgICAgIHRvZ2dsZUluc3RydWN0aW9uczogJ07DpHl0w6Qgb2hqZWV0J1xuICAgIH0sXG4gICAgYW5ub3RhdGluZzoge1xuICAgICAgICBzZW5kRmVlZGJhY2s6ICdMw6RoZXTDpCBwYWxhdXRldHRhJyxcbiAgICAgICAgdXBkYXRlZDogJ1DDpGl2aXRldHR5JyxcbiAgICAgICAgbWF0aEVkaXRvcjogJ01hdGlra2FlZGl0b3JpJyxcbiAgICAgICAgdGl0bGU6ICdBcnZvc3RlbHUnLFxuICAgICAgICBiYWNrTGluazogJy8nLFxuICAgICAgICBiYWNrTGlua0xhYmVsOiAnUGFsYWEga2FhdmFlZGl0b3JpaW4nLFxuICAgICAgICBzYXZlOiAnVGFsbGVubmEgbWVya2lubsOkdCcsXG4gICAgICAgIGxhbmdMaW5rOiAnL3N2L2JlZG9tbmluZycsXG4gICAgICAgIGxhbmdMYWJlbDogJ1DDpSBzdmVuc2thJ1xuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGVkaXRvcjoge1xuICAgICAgICBtYXRoRWRpdG9yOiAnTWF0ZW1hdGlrZWRpdG9yJyxcbiAgICAgICAgdGl0bGU6ICdGb3JtZWxlZGl0b3JucyBmw7Zyc3RhIHV0dmVja2xpbmdzdmVyc2lvbicsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBgPHVsPlxuPGxpPkVkaXRvcm4gZnVuZ2VyYXIgYsOkc3QgbWVkIGJyb3dzZXJuIEZpcmVmb3guPC9saT5cbiA8bGk+VW5kZXIga25hcHBlbiDigJxMw6RnZyB0aWxsIGZvcm1lbOKAnSBoaXR0YXIgZHUgZGUgdmFubGlnYXN0ZSBiZXRlY2tuaW5nYXJuYSBzb20gYW52w6RuZHMgaSBtYXRlbWF0aWssIGZ5c2lrIG9jaCBrZW1pLiBEZXNzdXRvbSBrYW4gZHUgYW52w6RuZGEgc3BlY2lhbHRlY2tlbiBmw7ZyIGF0dCBza3JpdmEgZm9ybWxlci48L2xpPlxuPGxpPkRldCBnw6VyIGF0dCBrb25zdHJ1ZXJhIGZvcm1sZXIgZ2Vub20gYXR0IGtsaWNrYSBww6UgYmV0ZWNrbmluZ2FybmEgaSBtZW55ZXJuYSBvY2gvZWxsZXIgZ2Vub20gYXR0IHNrcml2YSBMYVRlWC48L2xpPlxuPGxpPkRldCBnw6VyIGbDtnJ1dG9tIGF0dCBza3JpdmEgdGV4dCBvY2ggZm9ybWxlciwgYXR0IG9ja3PDpSBhdHQgbMOkZ2dhIHRpbGwgYmlsZGVyIGkgc3ZhcnNmw6RsdGV0LjwvbGk+PC91bD5gLFxuICAgICAgICBzaG9ydGN1dFRpdGxlOiBgVGlwcyBww6UgdGFuZ2VudGtvbWJpbmF0aW9uZXJgLFxuICAgICAgICBzaG9ydGN1dHM6IGA8dGFibGU+PHRib2R5PlxuPHRyPjx0aD5Mw6RnZyB0aWxsIGVuIGJpbGQgZnLDpW4gdXJrbGlwcGV0PC90aD48dGQ+Q3RybC1WPC90ZD48L3RyPlxuPHRyPjx0aD5Ta3JpdiBlbiBmb3JtZWw8L3RoPjx0ZD5DdHJsLUk8L3RkPjwvdHI+XG48dHI+PHRoIGNvbHNwYW49XCIyXCI+SSBmb3JtZWxuIDwvdGg+PC90cj5cbjx0cj48dGg+QnLDpWtzdHJlY2s8L3RoPjx0ZD4vPC90ZD48L3RyPlxuPHRyPjx0aD5NdWx0aXBsaWthdGlvbnN0ZWNrZW48L3RoPjx0ZD4qPC90ZD48L3RyPlxuPHRyPjx0aD5TdMOkbmcgZm9ybWVsbjwvdGg+PHRkPkVzYzwvdGQ+PC90cj5cbjwvdGJvZHk+XG48L3RhYmxlPmAsXG4gICAgICAgIGZvcm1hdHRpbmc6ICdGb3JtYXRlcmluZycsXG4gICAgICAgIHNwZWNpYWxDaGFyYWN0ZXJzOiAnU3BlY2lhbHRlY2tlbicsXG4gICAgICAgIGluc2VydEVxdWF0aW9uOiAnTMOkZ2cgdGlsbCBmb3JtZWwnLFxuICAgICAgICBjbG9zZTogJ3N0w6RuZycsXG4gICAgICAgIHNhdmU6ICdTcGFyYScsXG4gICAgICAgIHVwZGF0ZWQ6ICdVcHBkYXRlcmFkJyxcbiAgICAgICAgc2VuZEZlZWRiYWNrOiAnU2tpY2thIGZlZWRiYWNrJyxcbiAgICAgICAgbGFuZ0xpbms6ICcvJyxcbiAgICAgICAgbGFuZ0xhYmVsOiAnU3VvbWVrc2knLFxuICAgICAgICBhbnN3ZXJUaXRsZTogJ1N2YXInLFxuICAgICAgICB0b2dnbGVJbnN0cnVjdGlvbnM6ICdWaXNhIGludHJ1a3Rpb25lcidcbiAgICB9LFxuICAgIGFubm90YXRpbmc6IHtcbiAgICAgICAgc2VuZEZlZWRiYWNrOiAnU2tpY2thIHJlc3BvbnMnLFxuICAgICAgICB1cGRhdGVkOiAnVXBwZGF0ZXJhZCcsXG4gICAgICAgIG1hdGhFZGl0b3I6ICdNYXRlbWF0aWtlZGl0b3InLFxuICAgICAgICB0aXRsZTogJ0JlZMO2bW5pbmcnLFxuICAgICAgICBiYWNrTGluazogJy9zdicsXG4gICAgICAgIGJhY2tMaW5rTGFiZWw6ICdNYXRlbWF0aWtlZGl0b3InLFxuICAgICAgICBzYXZlOiAnU3BhcmEgYW50ZWNrbmluZ2FyJyxcbiAgICAgICAgbGFuZ0xpbms6ICcvdGFya2lzdHVzJyxcbiAgICAgICAgbGFuZ0xhYmVsOiAnU3VvbWVrc2knXG4gICAgfVxufVxuIiwiY29uc3QgbG9hZGluZ0ltZyA9IHJlcXVpcmUoJy4vbG9hZGluZ0ltZycpXG5jb25zdCB1ID0gcmVxdWlyZSgnLi91dGlsJylcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgb25QYXN0ZVxufVxuXG5jb25zdCBTQ1JFRU5TSE9UX0xJTUlUX0VSUk9SID0gKCkgPT4gbmV3IEJhY29uLkVycm9yKCdTY3JlZW5zaG90IGxpbWl0IHJlYWNoZWQhJylcblxuZnVuY3Rpb24gb25QYXN0ZShlLCBzYXZlciwgb25WYWx1ZUNoYW5nZWQsIGxpbWl0KSB7XG4gICAgY29uc3QgY2xpcGJvYXJkRGF0YSA9IGUub3JpZ2luYWxFdmVudC5jbGlwYm9hcmREYXRhXG4gICAgY29uc3QgZmlsZSA9IGNsaXBib2FyZERhdGEuaXRlbXMgJiYgY2xpcGJvYXJkRGF0YS5pdGVtc1swXS5nZXRBc0ZpbGUoKVxuICAgIGlmIChmaWxlKSB7XG4gICAgICAgIG9uUGFzdGVCbG9iKGUsIGZpbGUsIHNhdmVyLCAkKGUuY3VycmVudFRhcmdldCksIG9uVmFsdWVDaGFuZ2VkLCBsaW1pdClcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBjbGlwYm9hcmREYXRhQXNIdG1sID0gY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0L2h0bWwnKVxuICAgICAgICBpZiAoY2xpcGJvYXJkRGF0YUFzSHRtbCkgb25QYXN0ZUh0bWwoZSwgJChlLmN1cnJlbnRUYXJnZXQpLCBjbGlwYm9hcmREYXRhQXNIdG1sLCBsaW1pdCwgc2F2ZXIsIG9uVmFsdWVDaGFuZ2VkKVxuICAgICAgICBlbHNlIG9uTGVnYWN5UGFzdGVJbWFnZSgkKGUuY3VycmVudFRhcmdldCksIHNhdmVyLCBsaW1pdCwgb25WYWx1ZUNoYW5nZWQpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBvblBhc3RlQmxvYihldmVudCwgZmlsZSwgc2F2ZXIsICRhbnN3ZXIsIG9uVmFsdWVDaGFuZ2VkLCBsaW1pdCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICBpZiAoZmlsZS50eXBlID09PSAnaW1hZ2UvcG5nJykge1xuICAgICAgICBpZiAodS5leGlzdGluZ1NjcmVlbnNob3RDb3VudCgkYW5zd2VyKSArIDEgPD0gbGltaXQpIHtcbiAgICAgICAgICAgIHNhdmVyKHtkYXRhOiBmaWxlLCB0eXBlOiBmaWxlLnR5cGUsIGlkOiBTdHJpbmcobmV3IERhdGUoKS5nZXRUaW1lKCkpfSkudGhlbihzY3JlZW5zaG90VXJsID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBgPGltZyBzcmM9XCIke3NjcmVlbnNob3RVcmx9XCIvPmBcbiAgICAgICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydEhUTUwnLCBmYWxzZSwgaW1nKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9uVmFsdWVDaGFuZ2VkKFNDUkVFTlNIT1RfTElNSVRfRVJST1IoKSlcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gb25QYXN0ZUh0bWwoZXZlbnQsICRhbnN3ZXIsIGNsaXBib2FyZERhdGFBc0h0bWwsIGxpbWl0LCBzYXZlciwgb25WYWx1ZUNoYW5nZWQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgaWYgKHRvdGFsSW1hZ2VDb3VudCgkYW5zd2VyLCBjbGlwYm9hcmREYXRhQXNIdG1sKSA8PSBsaW1pdCkge1xuICAgICAgICB3aW5kb3cuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydEhUTUwnLCBmYWxzZSwgdS5zYW5pdGl6ZShjbGlwYm9hcmREYXRhQXNIdG1sKSlcbiAgICAgICAgcGVyc2lzdElubGluZUltYWdlcygkYW5zd2VyLCBzYXZlciwgbGltaXQsIG9uVmFsdWVDaGFuZ2VkKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIG9uVmFsdWVDaGFuZ2VkKFNDUkVFTlNIT1RfTElNSVRfRVJST1IoKSlcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG9uTGVnYWN5UGFzdGVJbWFnZSgkZWRpdG9yLCBzYXZlciwgbGltaXQsIG9uVmFsdWVDaGFuZ2VkKSB7XG4gICAgcGVyc2lzdElubGluZUltYWdlcygkZWRpdG9yLCBzYXZlciwgbGltaXQsIG9uVmFsdWVDaGFuZ2VkKVxufVxuXG5cbmZ1bmN0aW9uIGNoZWNrRm9ySW1hZ2VMaW1pdCgkZWRpdG9yLCBpbWFnZURhdGEsIGxpbWl0KSB7XG4gICAgcmV0dXJuIEJhY29uLm9uY2UodS5leGlzdGluZ1NjcmVlbnNob3RDb3VudCgkZWRpdG9yKSA+IGxpbWl0ID8gbmV3IEJhY29uLkVycm9yKCkgOiBpbWFnZURhdGEpXG59XG5cbmZ1bmN0aW9uIHBlcnNpc3RJbmxpbmVJbWFnZXMoJGVkaXRvciwgc2NyZWVuc2hvdFNhdmVyLCBzY3JlZW5zaG90Q291bnRMaW1pdCwgb25WYWx1ZUNoYW5nZWQpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IEJhY29uLmNvbWJpbmVBc0FycmF5KG1hcmtBbmRHZXRJbmxpbmVJbWFnZXMoJGVkaXRvcilcbiAgICAgICAgLm1hcChkYXRhID0+IGNoZWNrRm9ySW1hZ2VMaW1pdCgkZWRpdG9yLCBkYXRhLCBzY3JlZW5zaG90Q291bnRMaW1pdClcbiAgICAgICAgICAgIC5kb0Vycm9yKCgpID0+IG9uVmFsdWVDaGFuZ2VkKFNDUkVFTlNIT1RfTElNSVRfRVJST1IoKSkpXG4gICAgICAgICAgICAuZmxhdE1hcExhdGVzdCgoKSA9PiBCYWNvbi5mcm9tUHJvbWlzZShzY3JlZW5zaG90U2F2ZXIoZGF0YSkpKVxuICAgICAgICAgICAgLmRvQWN0aW9uKHNjcmVlblNob3RVcmwgPT4gZGF0YS4kZWwuYXR0cignc3JjJywgc2NyZWVuU2hvdFVybCkpXG4gICAgICAgICAgICAuZG9FcnJvcigoKSA9PiBkYXRhLiRlbC5yZW1vdmUoKSkpXG4gICAgKS5vblZhbHVlKGsgPT4gJGVkaXRvci50cmlnZ2VyKCdpbnB1dCcpKSwgMClcbn1cblxuZnVuY3Rpb24gdG90YWxJbWFnZUNvdW50KCRhbnN3ZXIsIGNsaXBib2FyZERhdGFBc0h0bWwpIHtcbiAgICByZXR1cm4gdS5leGlzdGluZ1NjcmVlbnNob3RDb3VudCgkYW5zd2VyKSArIHUuZXhpc3RpbmdTY3JlZW5zaG90Q291bnQoJChgPGRpdj4ke2NsaXBib2FyZERhdGFBc0h0bWx9PC9kaXY+YCkpXG59XG5cbmZ1bmN0aW9uIG1hcmtBbmRHZXRJbmxpbmVJbWFnZXMoJGVkaXRvcikge1xuICAgIGNvbnN0IGltYWdlcyA9ICRlZGl0b3IuZmluZCgnaW1nW3NyY149XCJkYXRhXCJdJykudG9BcnJheSgpXG4gICAgICAgIC5tYXAoKGVsLCBpbmRleCkgPT4gT2JqZWN0LmFzc2lnbihkZWNvZGVCYXNlNjRJbWFnZShlbC5nZXRBdHRyaWJ1dGUoJ3NyYycpKSwge1xuICAgICAgICAgICAgJGVsOiAkKGVsKVxuICAgICAgICB9KSlcbiAgICBpbWFnZXMuZmlsdGVyKCh7dHlwZX0pID0+IHR5cGUgIT09ICdpbWFnZS9wbmcnKS5mb3JFYWNoKCh7JGVsfSkgPT4gJGVsLnJlbW92ZSgpKVxuICAgIGNvbnN0IHBuZ0ltYWdlcyA9IGltYWdlcy5maWx0ZXIoKHt0eXBlfSkgPT4gdHlwZSA9PT0gJ2ltYWdlL3BuZycpXG4gICAgcG5nSW1hZ2VzLmZvckVhY2goKHskZWx9KSA9PiAkZWwuYXR0cignc3JjJywgbG9hZGluZ0ltZykpXG4gICAgcmV0dXJuIHBuZ0ltYWdlc1xufVxuXG5mdW5jdGlvbiBkZWNvZGVCYXNlNjRJbWFnZShkYXRhU3RyaW5nKSB7XG4gICAgaWYgKCFkYXRhU3RyaW5nKVxuICAgICAgICByZXR1cm4gbnVsbFxuICAgIGNvbnN0IG1hdGNoZXMgPSBkYXRhU3RyaW5nLm1hdGNoKC9eZGF0YTooW0EtWmEtei0rXFwvXSspO2Jhc2U2NCwoLispJC8pXG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoICE9PSAzKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IG1hdGNoZXNbMV0sXG4gICAgICAgIGRhdGE6IG5ldyBCdWZmZXIobWF0Y2hlc1syXSwgJ2Jhc2U2NCcpXG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gICAge2FjdGlvbjogJ1xcXFxzcXJ0JywgbGFiZWw6ICdcXFxcc3FydHtYfSd9LFxuICAgIHthY3Rpb246ICdeJywgbGFiZWw6ICd4XntYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcZnJhYycsIGxhYmVsOiAnXFxcXGZyYWN7WH17WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGludCcsIGxhYmVsOiAnXFxcXGludF97WH1ee1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxsaW1fJywgbGFiZWw6ICdcXFxcbGltX3tYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcbGltX3t4XFxcXHJpZ2h0YXJyb3dcXFxcaW5mdHl9JywgbGFiZWw6ICdcXFxcbGltX3t4XFxcXHJpZ2h0YXJyb3dcXFxcaW5mdHl9JywgdXNlV3JpdGU6dHJ1ZX0sXG4gICAge2FjdGlvbjogJ1xcXFxvdmVycmlnaHRhcnJvdycsIGxhYmVsOiAnXFxcXG92ZXJyaWdodGFycm93e1h9J30sXG4gICAge2FjdGlvbjogJ18nLCBsYWJlbDogJ3hfWCd9LFxuICAgIHthY3Rpb246ICdcXFxcbnRocm9vdCcsIGxhYmVsOiAnXFxcXHNxcnRbWF17WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXHN1bScsIGxhYmVsOiAnXFxcXHN1bV97WH1ee1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxiaW5vbScsIGxhYmVsOiAnXFxcXGJpbm9te1h9e1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxzaW4nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGNvcyd9LFxuICAgIHthY3Rpb246ICdcXFxcdGFuJ30sXG4gICAge2FjdGlvbjogJ1xcXFx2ZWMnLCBsYWJlbDogJ1xcXFx2ZWN7WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGJhcicsIGxhYmVsOiAnXFxcXGJhcntYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcmxpbmV7XFxcXHRleHR7aX19JywgdXNlV3JpdGU6IHRydWV9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcmxpbmV7XFxcXHRleHR7an19JywgdXNlV3JpdGU6IHRydWV9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcmxpbmV7XFxcXHRleHR7a319JywgdXNlV3JpdGU6IHRydWV9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcmxlZnRhcnJvdycsIGxhYmVsOiAnXFxcXG92ZXJsZWZ0YXJyb3d7WH0nfSxcbiAgICB7YWN0aW9uOiAnfCcsIGxhYmVsOiAnfFh8J30sXG4gICAge2FjdGlvbjogJygnLCBsYWJlbDogJyhYKSd9LFxuICAgIHthY3Rpb246ICdfeyB9XnsgfSAnLCBsYWJlbDogJ197WH1ee1h9WCcsIHVzZVdyaXRlOiB0cnVlfSxcbiAgICB7YWN0aW9uOiAnXFxcXG1hdGhybScsIGxhYmVsOiAnXFxcXG1hdGhybXtUfSd9LFxuXVxuIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEVBQVFBUFFBQVAvLy93QUFBUER3OElxS2l1RGc0RVpHUm5wNmVnQUFBRmhZV0NRa0pLeXNyTDYrdmhRVUZKeWNuQVFFQkRZMk5taG9hQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQ0grR2tOeVpXRjBaV1FnZDJsMGFDQmhhbUY0Ykc5aFpDNXBibVp2QUNINUJBQUtBQUFBSWY4TFRrVlVVME5CVUVVeUxqQURBUUFBQUN3QUFBQUFFQUFRQUFBRmR5QWdBZ0lKSWVXb0FrUkNDTWRCa0t0SUhJbmd5TUtzRXJQQlliQURwa1NDd2hEbVFDQmV0aFJCNlZqNGtGQ2tRUEc0SWxXRGdyTlJJd25PNFVLQlhEdWZ6UXZETWFvU0RCZ0ZiODg2TWlRYWRnTkFCQW9rZkN3ekJBOExDZzBFZ2w4akFnZ0dBQTFrQklBMUJBWXpseUlMY3pVTEMyVWhBQ0g1QkFBS0FBRUFMQUFBQUFBUUFCQUFBQVYySUNBQ0FtbEFaVG1PUkVFSXlVRVFqTEtLeFBIQURoRXZxeGxnY0dna0dJMURZU1ZBSUFXTXgrbHdTS2tJQ0owUXNIaTlSZ0tCd25WVGlSUVFnd0Y0STRVRkRRUUV3aTYvM1lTR1dSUm1qaEVFVEFKZklnTUZDbkFLTTBLRFY0RUVFQVFMaUYxOFRBWU5YRGFTZTN4Nm1qaWROMXMzSVFBaCtRUUFDZ0FDQUN3QUFBQUFFQUFRQUFBRmVDQWdBZ0xaREdVNWpnUkVDRVVpQ0kreWlvU0R3REp5TEtzWG9IRlF4QlNIQW9BQUZCaHF0TUpnOERnUUJnZnJFc0pBRUFnNFloWklFaXdnS3RIaU1CZ3RwZzN3YlVaWEdPN2tPYjFNVUtSRk15c0NDaEFvZ2dKQ0lnMEdDMmFOZTRncVFsZGZMNGwvQWcxQVh5U0pnbjVMY29FM1FYSTNJUUFoK1FRQUNnQURBQ3dBQUFBQUVBQVFBQUFGZGlBZ0FnTFpOR1U1am9RaENFanhJc3NxRW84YkM5QlJqeTlBZzdHSUxRNFFFb0UwZ0JBRUJjT3BjQkEwRG94U0svZThMUklIbitpMWNLMEl5S2RnMFZBb2xqWUlnK0dnblJyd1ZTLzhJQWtJQ3lvc0JJUXBCQU1vS3k5ZElteFBoUytHS2tGcmtYK1RpZ3RMbEl5S1hVRitOamFnTmlFQUlma0VBQW9BQkFBc0FBQUFBQkFBRUFBQUJXd2dJQUlDYVJobE9ZNEVJZ2pIOFI3TEtoS0hHd3NNdmI0QUF5M1dPREJJQkJLQ3NZQTlUanVoRE5ES0VWU0VSZXpRRUwwV3JoWHVjUlVRR3VpazdiRmxuZ3pxVlc5TE1sOVhXdkxkakZhSnRERnFaMWNFWlVCMGRVZ3ZMM2RnUDRXSlpuNGprb21XTnBTVEl5RUFJZmtFQUFvQUJRQXNBQUFBQUJBQUVBQUFCWDRnSUFJQ3VTeGxPWTZDSWdpRDhSckVLZ3FHT3d4d1VyTWxBb1N3SXpBR3BKcGdvU0RBR2lmRFk1a29wQllEbEVwQVFCd2V2eGZCdFJJVUdpOHh3V2tETkJDSXdtQzlWcTBhaVFRRFF1SytWZ1FQRFhWOWhDSmpCd2NGWVU1cEx3d0hYUWNNS1NtTkxRY0lBRXhsYkg4SkJ3dHRhWDBBQkFjTmJXVmJLeUVBSWZrRUFBb0FCZ0FzQUFBQUFCQUFFQUFBQlhrZ0lBSUNTUkJsT1k3Q0lnaE44emJFS3NLb0lqZEZ6WmFFZ1VCSEtDaE1KdFJ3Y1dwQVdvV25pZm02RVNBTWhPOGxRSzBFRUFWM3JGb3BJQkNFY0d3REtBcVBoNEhVclk0SUNISDFkU29URmdjSFVpWmpCaEFKQjJBSER5a3BLQXdIQXdkemYxOUtrQVNJUGw5Y0RnY25Ea2R0TndpTUpDc2hBQ0g1QkFBS0FBY0FMQUFBQUFBUUFCQUFBQVYzSUNBQ0Fra1FaVG1PQWlvc2l5QW94Q3ErS1B4Q05Wc1NNUmdCc2lDbFdyTFRTV0ZvSVFaSGw2cGxlQmg2c3V4S01JaGx2emJBd2tCV2ZGV3JCUVR4TkxxMlJHMnloU1VrRHMyYjYzQVlEQW9KWEFjRlJ3QURlQWtKRFgwQVFDc0VmQVFNREFJUEJ6MHJDZ2N4a3kwSlJXRTFBbXdwS3lFQUlma0VBQW9BQ0FBc0FBQUFBQkFBRUFBQUJYa2dJQUlDS1p6a3FKNG5RWnhMcVpLdjROcU5MS0syL1E0RWs0bEZYQ2hzZzV5cEpqczFJSTNnRURVU1JJbkVHWUF3NkI2ek00SmhyREF0RW9zVmtMVXRIQTdSSGFIQUdKUUVqc09EY0VnMEZCQUZWZ2tRSlExcEF3Y0REdzhLY0Z0U0lud0pBb3dDQ0E2Ukl3cVpBZ2tQTmdWcFduZGpkeW9oQUNINUJBQUtBQWtBTEFBQUFBQVFBQkFBQUFWNUlDQUNBaW1jNUtpZUxFdVVLdm0yeEFLTHFEQ2ZDMkdhTzllTDBMQUJXVGlCWW1BMDZXNmtIZ3ZDcUVKaUFJSml1M2djdmdVc3NjSFVFUm0ra2FDeHl4YSt6UlBrMFNnSkVnZkl2YkFkSUFRTENBWWxDajREQncwSUJRc01DaklxQkFjUEFvb0NCZzlwS2dzSkx3VUZPaENaS3lRREEzWXFJUUFoK1FRQUNnQUtBQ3dBQUFBQUVBQVFBQUFGZFNBZ0FnSXBuT1Nvbm14YnFpVGhDckpLRUhGYm84SnhERE9aWUZGYitBNDFFNEg0T2hrT2lwWHdCRWxZSVREQWNrRkVPQmdNUTNhcmtNa1VCZHhJVUdacEViN2thUUJSbEFTUGcwRlFRSEFiRUVNR0RTVkVBQTFRQmhBRUQxRTBOZ3dGQW9vQ0RXbGphUUlRQ0U1cU1IY05oQ2tqSVFBaCtRUUFDZ0FMQUN3QUFBQUFFQUFRQUFBRmVTQWdBZ0lwbk9Tb0xneHh2cWdLTEVjQ0M2NUtFQUJ5S0s4Y1NwQTREQWlIUS9Ea0toR0toNFpDdEN5WkdvNkY2aVlZUEFxRmdZeTAyeGtTYUxFTVYzNHRFTHlSWU5Fc0NReUhsdldrR0N6c1BnTUNFQVk3Q2cwNFVrNDhMQXNEaFJBOE1WUVBFRjBHQWdxWVl3U1JseWNOY1dza0NrQXBJeUVBT3dBQUFBQUFBQUFBQUR4aWNpQXZQZ284WWo1WFlYSnVhVzVuUEM5aVBqb2dJRzE1YzNGc1gzRjFaWEo1S0NrZ1d6eGhJR2h5WldZOUoyWjFibU4wYVc5dUxtMTVjM0ZzTFhGMVpYSjVKejVtZFc1amRHbHZiaTV0ZVhOeGJDMXhkV1Z5ZVR3dllUNWRPaUJEWVc0bmRDQmpiMjV1WldOMElIUnZJR3h2WTJGc0lFMTVVMUZNSUhObGNuWmxjaUIwYUhKdmRXZG9JSE52WTJ0bGRDQW5MM1poY2k5eWRXNHZiWGx6Y1d4a0wyMTVjM0ZzWkM1emIyTnJKeUFvTWlrZ2FXNGdQR0krTDJodmJXVXZZV3BoZUd4dllXUXZkM2QzTDJ4cFluSmhhWEpwWlhNdlkyeGhjM011YlhsemNXd3VjR2h3UEM5aVBpQnZiaUJzYVc1bElEeGlQalk0UEM5aVBqeGljaUF2UGdvOFluSWdMejRLUEdJK1YyRnlibWx1Wnp3dllqNDZJQ0J0ZVhOeGJGOXhkV1Z5ZVNncElGczhZU0JvY21WbVBTZG1kVzVqZEdsdmJpNXRlWE54YkMxeGRXVnllU2MrWm5WdVkzUnBiMjR1YlhsemNXd3RjWFZsY25rOEwyRStYVG9nUVNCc2FXNXJJSFJ2SUhSb1pTQnpaWEoyWlhJZ1kyOTFiR1FnYm05MElHSmxJR1Z6ZEdGaWJHbHphR1ZrSUdsdUlEeGlQaTlvYjIxbEwyRnFZWGhzYjJGa0wzZDNkeTlzYVdKeVlXbHlhV1Z6TDJOc1lYTnpMbTE1YzNGc0xuQm9jRHd2WWo0Z2IyNGdiR2x1WlNBOFlqNDJPRHd2WWo0OFluSWdMejRLUEdKeUlDOCtDanhpUGxkaGNtNXBibWM4TDJJK09pQWdiWGx6Y1d4ZmNYVmxjbmtvS1NCYlBHRWdhSEpsWmowblpuVnVZM1JwYjI0dWJYbHpjV3d0Y1hWbGNua25QbVoxYm1OMGFXOXVMbTE1YzNGc0xYRjFaWEo1UEM5aFBsMDZJRU5oYmlkMElHTnZibTVsWTNRZ2RHOGdiRzlqWVd3Z1RYbFRVVXdnYzJWeWRtVnlJSFJvY205MVoyZ2djMjlqYTJWMElDY3ZkbUZ5TDNKMWJpOXRlWE54YkdRdmJYbHpjV3hrTG5Odlkyc25JQ2d5S1NCcGJpQThZajR2YUc5dFpTOWhhbUY0Ykc5aFpDOTNkM2N2YkdsaWNtRnBjbWxsY3k5amJHRnpjeTV0ZVhOeGJDNXdhSEE4TDJJK0lHOXVJR3hwYm1VZ1BHSStOamc4TDJJK1BHSnlJQzgrQ2p4aWNpQXZQZ284WWo1WFlYSnVhVzVuUEM5aVBqb2dJRzE1YzNGc1gzRjFaWEo1S0NrZ1d6eGhJR2h5WldZOUoyWjFibU4wYVc5dUxtMTVjM0ZzTFhGMVpYSjVKejVtZFc1amRHbHZiaTV0ZVhOeGJDMXhkV1Z5ZVR3dllUNWRPaUJCSUd4cGJtc2dkRzhnZEdobElITmxjblpsY2lCamIzVnNaQ0J1YjNRZ1ltVWdaWE4wWVdKc2FYTm9aV1FnYVc0Z1BHSStMMmh2YldVdllXcGhlR3h2WVdRdmQzZDNMMnhwWW5KaGFYSnBaWE12WTJ4aGMzTXViWGx6Y1d3dWNHaHdQQzlpUGlCdmJpQnNhVzVsSUR4aVBqWTRQQzlpUGp4aWNpQXZQZ284WW5JZ0x6NEtQR0krVjJGeWJtbHVaend2WWo0NklDQnRlWE54YkY5eGRXVnllU2dwSUZzOFlTQm9jbVZtUFNkbWRXNWpkR2x2Ymk1dGVYTnhiQzF4ZFdWeWVTYytablZ1WTNScGIyNHViWGx6Y1d3dGNYVmxjbms4TDJFK1hUb2dRMkZ1SjNRZ1kyOXVibVZqZENCMGJ5QnNiMk5oYkNCTmVWTlJUQ0J6WlhKMlpYSWdkR2h5YjNWbmFDQnpiMk5yWlhRZ0p5OTJZWEl2Y25WdUwyMTVjM0ZzWkM5dGVYTnhiR1F1YzI5amF5Y2dLRElwSUdsdUlEeGlQaTlvYjIxbEwyRnFZWGhzYjJGa0wzZDNkeTlzYVdKeVlXbHlhV1Z6TDJOc1lYTnpMbTE1YzNGc0xuQm9jRHd2WWo0Z2IyNGdiR2x1WlNBOFlqNDJPRHd2WWo0OFluSWdMejRLUEdKeUlDOCtDanhpUGxkaGNtNXBibWM4TDJJK09pQWdiWGx6Y1d4ZmNYVmxjbmtvS1NCYlBHRWdhSEpsWmowblpuVnVZM1JwYjI0dWJYbHpjV3d0Y1hWbGNua25QbVoxYm1OMGFXOXVMbTE1YzNGc0xYRjFaWEo1UEM5aFBsMDZJRUVnYkdsdWF5QjBieUIwYUdVZ2MyVnlkbVZ5SUdOdmRXeGtJRzV2ZENCaVpTQmxjM1JoWW14cGMyaGxaQ0JwYmlBOFlqNHZhRzl0WlM5aGFtRjRiRzloWkM5M2QzY3ZiR2xpY21GcGNtbGxjeTlqYkdGemN5NXRlWE54YkM1d2FIQThMMkkrSUc5dUlHeHBibVVnUEdJK05qZzhMMkkrUEdKeUlDOCtDZz09XCJcbiIsImNvbnN0IHUgPSByZXF1aXJlKCcuL3V0aWwnKVxuXG5sZXQgTVFcbm1vZHVsZS5leHBvcnRzID0ge2luaXR9XG5sZXQgZmlyc3RUaW1lID0gdHJ1ZVxuXG5mdW5jdGlvbiBpbml0KCRvdXRlclBsYWNlaG9sZGVyLCBmb2N1cywgb25NYXRoRm9jdXNDaGFuZ2VkKSB7XG4gICAgaWYoZmlyc3RUaW1lKSB7XG4gICAgICAgIE1RID0gTWF0aFF1aWxsLmdldEludGVyZmFjZSgyKVxuICAgIH1cbiAgICBjb25zdCAkbWF0aEVkaXRvckNvbnRhaW5lciA9ICQoYFxuICAgICAgICA8ZGl2IGNsYXNzPVwibWF0aC1lZGl0b3JcIiBkYXRhLWpzPVwibWF0aEVkaXRvclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1hdGgtZWRpdG9yLWVxdWF0aW9uLWZpZWxkXCIgZGF0YS1qcz1cImVxdWF0aW9uRmllbGRcIj48L2Rpdj5cbiAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cIm1hdGgtZWRpdG9yLWxhdGV4LWZpZWxkXCIgZGF0YS1qcz1cImxhdGV4RmllbGRcIiBwbGFjZWhvbGRlcj1cIkxhVGV4XCI+PC90ZXh0YXJlYT5cbiAgICAgICAgPC9kaXY+YClcblxuICAgICRvdXRlclBsYWNlaG9sZGVyLmFwcGVuZCgkbWF0aEVkaXRvckNvbnRhaW5lcilcbiAgICBjb25zdCAkbGF0ZXhGaWVsZCA9ICRtYXRoRWRpdG9yQ29udGFpbmVyLmZpbmQoJ1tkYXRhLWpzPVwibGF0ZXhGaWVsZFwiXScpXG4gICAgY29uc3QgJGVxdWF0aW9uRmllbGQgPSAkbWF0aEVkaXRvckNvbnRhaW5lci5maW5kKCdbZGF0YS1qcz1cImVxdWF0aW9uRmllbGRcIl0nKVxuICAgIGxldCBtcUVkaXRUaW1lb3V0XG4gICAgbGV0IHZpc2libGUgPSBmYWxzZVxuICAgIGxldCBmb2N1c0NoYW5nZWQgPSBudWxsXG4gICAgLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzLEpTVW51c2VkTG9jYWxTeW1ib2xzXG4gICAgY29uc3QgbXFJbnN0YW5jZSA9IE1RLk1hdGhGaWVsZCgkZXF1YXRpb25GaWVsZC5nZXQoMCksIHtcbiAgICAgICAgaGFuZGxlcnM6IHtcbiAgICAgICAgICAgIGVkaXQ6IG9uTXFFZGl0LFxuICAgICAgICAgICAgZW50ZXI6IGZpZWxkID0+IHtcbiAgICAgICAgICAgICAgICBjbG9zZU1hdGhFZGl0b3IodHJ1ZSlcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGluc2VydE5ld0VxdWF0aW9uKCc8YnI+JyksIDIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxuICAgICRlcXVhdGlvbkZpZWxkXG4gICAgICAgIC5vbigna2V5dXAnLCAnLm1xLXRleHRhcmVhIHRleHRhcmVhJywgb25NcUVkaXQpXG4gICAgICAgIC5vbignZm9jdXMgYmx1cicsICcubXEtdGV4dGFyZWEgdGV4dGFyZWEnLCBlID0+IHtcbiAgICAgICAgICAgIGZvY3VzLmVxdWF0aW9uRmllbGQgPSBlLnR5cGUgIT09ICdibHVyJyAmJiBlLnR5cGUgIT09ICdmb2N1c291dCdcbiAgICAgICAgICAgIG9uRm9jdXNDaGFuZ2VkKClcbiAgICAgICAgfSlcblxuICAgICRsYXRleEZpZWxkXG4gICAgICAgIC5vbignaW5wdXQgcGFzdGUnLCBvbkxhdGV4VXBkYXRlKVxuICAgICAgICAub24oJ2ZvY3VzIGJsdXInLCBlID0+IHtcbiAgICAgICAgICAgIGZvY3VzLmxhdGV4RmllbGQgPSBlLnR5cGUgIT09ICdibHVyJ1xuICAgICAgICAgICAgb25Gb2N1c0NoYW5nZWQoKVxuICAgICAgICB9KVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5zZXJ0TmV3RXF1YXRpb24sXG4gICAgICAgIGluc2VydE1hdGgsXG4gICAgICAgIGNsb3NlTWF0aEVkaXRvcixcbiAgICAgICAgb3Blbk1hdGhFZGl0b3IsXG4gICAgICAgIG9uRm9jdXNDaGFuZ2VkLFxuICAgICAgICBpc1Zpc2libGVcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1Zpc2libGUoKSB7XG4gICAgICAgIHJldHVybiB2aXNpYmxlXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25NcUVkaXQoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChtcUVkaXRUaW1lb3V0KVxuICAgICAgICBtcUVkaXRUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZm9jdXMubGF0ZXhGaWVsZClcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIGNvbnN0IGxhdGV4ID0gbXFJbnN0YW5jZS5sYXRleCgpXG4gICAgICAgICAgICAkbGF0ZXhGaWVsZC52YWwobGF0ZXgpXG4gICAgICAgICAgICB1cGRhdGVNYXRoSW1nKCRtYXRoRWRpdG9yQ29udGFpbmVyLnByZXYoKSwgbGF0ZXgpXG4gICAgICAgIH0sIDEwMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkxhdGV4VXBkYXRlKCkge1xuICAgICAgICB1cGRhdGVNYXRoSW1nKCRtYXRoRWRpdG9yQ29udGFpbmVyLnByZXYoKSwgJGxhdGV4RmllbGQudmFsKCkpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gbXFJbnN0YW5jZS5sYXRleCgkbGF0ZXhGaWVsZC52YWwoKSksIDEpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Gb2N1c0NoYW5nZWQoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChmb2N1c0NoYW5nZWQpXG4gICAgICAgIGZvY3VzQ2hhbmdlZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFmb2N1cy5sYXRleEZpZWxkICYmICFmb2N1cy5lcXVhdGlvbkZpZWxkKSBjbG9zZU1hdGhFZGl0b3IoKVxuICAgICAgICAgICAgb25NYXRoRm9jdXNDaGFuZ2VkKClcbiAgICAgICAgfSwgMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnNlcnROZXdFcXVhdGlvbihvcHRpb25hbE1hcmt1cCA9ICcnKSB7XG4gICAgICAgIHdpbmRvdy5kb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0SFRNTCcsIGZhbHNlLCBvcHRpb25hbE1hcmt1cCArICc8aW1nIGRhdGEtanM9XCJuZXdcIiBhbHQ9XCJcIiBzcmM9XCJcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIi8+JylcbiAgICAgICAgc2hvd01hdGhFZGl0b3IoJCgnW2RhdGEtanM9XCJuZXdcIl0nKS5yZW1vdmVBdHRyKCdkYXRhLWpzJykpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb3Blbk1hdGhFZGl0b3IoJGltZykge1xuICAgICAgICBpZiAodmlzaWJsZSkgY2xvc2VNYXRoRWRpdG9yKClcbiAgICAgICAgdS5zZXRDdXJzb3JBZnRlcigkaW1nKVxuICAgICAgICBzaG93TWF0aEVkaXRvcigkaW1nKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNob3dNYXRoRWRpdG9yKCRpbWcpIHtcbiAgICAgICAgJGltZy5oaWRlKClcbiAgICAgICAgJGltZy5hZnRlcigkbWF0aEVkaXRvckNvbnRhaW5lcilcbiAgICAgICAgdmlzaWJsZSA9IHRydWVcbiAgICAgICAgdG9nZ2xlTWF0aFRvb2xiYXIodHJ1ZSlcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBtcUluc3RhbmNlLmZvY3VzKCksIDApXG4gICAgICAgICRsYXRleEZpZWxkLnZhbCgkaW1nLnByb3AoJ2FsdCcpKVxuICAgICAgICBvbkxhdGV4VXBkYXRlKClcbiAgICAgICAgdS5zY3JvbGxJbnRvVmlldygkbWF0aEVkaXRvckNvbnRhaW5lcilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnNlcnRNYXRoKHN5bWJvbCwgYWx0ZXJuYXRpdmVTeW1ib2wsIHVzZVdyaXRlKSB7XG4gICAgICAgIGlmIChmb2N1cy5sYXRleEZpZWxkKSB7XG4gICAgICAgICAgICB1Lmluc2VydFRvVGV4dEFyZWFBdEN1cnNvcigkbGF0ZXhGaWVsZC5nZXQoMCksIGFsdGVybmF0aXZlU3ltYm9sIHx8IHN5bWJvbClcbiAgICAgICAgICAgIG9uTGF0ZXhVcGRhdGUoKVxuICAgICAgICB9IGVsc2UgaWYgKGZvY3VzLmVxdWF0aW9uRmllbGQpIHtcbiAgICAgICAgICAgIGlmICh1c2VXcml0ZSkge1xuICAgICAgICAgICAgICAgIG1xSW5zdGFuY2Uud3JpdGUoc3ltYm9sKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtcUluc3RhbmNlLnR5cGVkVGV4dChzeW1ib2wpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3ltYm9sLnN0YXJ0c1dpdGgoJ1xcXFwnKSkgbXFJbnN0YW5jZS5rZXlzdHJva2UoJ1RhYicpXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IG1xSW5zdGFuY2UuZm9jdXMoKSwgMClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZU1hdGhJbWcoJGltZywgbGF0ZXgpIHtcbiAgICAgICAgJGltZy5wcm9wKHtcbiAgICAgICAgICAgIHNyYzogJy9tYXRoLnN2Zz9sYXRleD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGxhdGV4KSxcbiAgICAgICAgICAgIGFsdDogbGF0ZXhcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZU1hdGhFZGl0b3Ioc2V0Rm9jdXNBZnRlckNsb3NlID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgJGN1cnJlbnRFZGl0b3IgPSAkbWF0aEVkaXRvckNvbnRhaW5lci5jbG9zZXN0KCdbZGF0YS1qcz1cImFuc3dlclwiXScpXG4gICAgICAgIGNvbnN0ICRpbWcgPSAkbWF0aEVkaXRvckNvbnRhaW5lci5wcmV2KClcbiAgICAgICAgaWYgKCRsYXRleEZpZWxkLnZhbCgpLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgICAgICAgICRpbWcucmVtb3ZlKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRpbWcuc2hvdygpXG4gICAgICAgICAgICB1cGRhdGVNYXRoSW1nKCRpbWcsICRsYXRleEZpZWxkLnZhbCgpKVxuICAgICAgICB9XG5cbiAgICAgICAgdG9nZ2xlTWF0aFRvb2xiYXIoZmFsc2UpXG4gICAgICAgICRvdXRlclBsYWNlaG9sZGVyLmFwcGVuZCgkbWF0aEVkaXRvckNvbnRhaW5lcilcbiAgICAgICAgdmlzaWJsZSA9IGZhbHNlXG4gICAgICAgIGZvY3VzLmxhdGV4RmllbGQgPSBmYWxzZVxuICAgICAgICBmb2N1cy5lcXVhdGlvbkZpZWxkID0gZmFsc2VcbiAgICAgICAgaWYgKHNldEZvY3VzQWZ0ZXJDbG9zZSkgJGN1cnJlbnRFZGl0b3IuZm9jdXMoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvZ2dsZU1hdGhUb29sYmFyKGlzVmlzaWJsZSkge1xuICAgICAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ21hdGgtZWRpdG9yLWZvY3VzJywgaXNWaXNpYmxlKVxuICAgIH1cbn1cbiIsImNvbnN0IHUgPSByZXF1aXJlKCcuL3V0aWwnKVxuY29uc3QgdG9vbGJhcnMgPSByZXF1aXJlKCcuL3Rvb2xiYXJzJylcbmNvbnN0IGNsaXBib2FyZCA9IHJlcXVpcmUoJy4vY2xpcGJvYXJkJylcbmNvbnN0IG1hdGhFZGl0b3IgPSByZXF1aXJlKCcuL21hdGgtZWRpdG9yJylcbmNvbnN0IGxvY2FsZXMgPSB7XG4gICAgRkk6IHJlcXVpcmUoJy4vRkknKSxcbiAgICBTVjogcmVxdWlyZSgnLi9TVicpXG59XG5jb25zdCBsID0gbG9jYWxlc1t3aW5kb3cubG9jYWxlIHx8ICdGSSddLmVkaXRvclxuY29uc3Qga2V5Q29kZXMgPSB7XG4gICAgRU5URVI6IDEzLFxuICAgIEVTQzogMjcsXG4gICAgSTogNzMsXG4gICAgRTogNjksXG4gICAgWTogODlcbn1cbmNvbnN0ICRvdXRlclBsYWNlaG9sZGVyID0gJChgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItaGlkZGVuXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiIGRhdGEtanM9XCJvdXRlclBsYWNlaG9sZGVyXCI+YClcbmNvbnN0IGZvY3VzID0ge1xuICAgIHJpY2hUZXh0OiBmYWxzZSxcbiAgICBsYXRleEZpZWxkOiBmYWxzZSxcbiAgICBlcXVhdGlvbkZpZWxkOiBmYWxzZVxufVxubGV0ICRjdXJyZW50RWRpdG9yXG5cbmZ1bmN0aW9uIG9uTWF0aEZvY3VzQ2hhbmdlZCgpIHtcbiAgICBpZiAocmljaFRleHRBbmRNYXRoQmx1cigpKSBvblJpY2hUZXh0RWRpdG9yQmx1cigkY3VycmVudEVkaXRvcilcbn1cblxubGV0IGZpcnN0Q2FsbCA9IHRydWVcbmxldCBtYXRoXG5sZXQgJHRvb2xiYXJcblxubW9kdWxlLmV4cG9ydHMubWFrZVJpY2hUZXh0ID0gKGVsZW1lbnQsIG9wdGlvbnMsIG9uVmFsdWVDaGFuZ2VkID0gKCkgPT4ge30pID0+IHtcbiAgICBpZiAoZmlyc3RDYWxsKSB7XG4gICAgICAgIG1hdGggPSBtYXRoRWRpdG9yLmluaXQoJG91dGVyUGxhY2Vob2xkZXIsIGZvY3VzLCBvbk1hdGhGb2N1c0NoYW5nZWQpXG4gICAgICAgICR0b29sYmFyID0gdG9vbGJhcnMuaW5pdChtYXRoLCAoKSA9PiBmb2N1cy5yaWNoVGV4dCwgbClcbiAgICAgICAgJCgnYm9keScpLmFwcGVuZCgkb3V0ZXJQbGFjZWhvbGRlciwgJHRvb2xiYXIpXG4gICAgICAgIGZpcnN0Q2FsbCA9IGZhbHNlXG4gICAgfVxuICAgIG9uVmFsdWVDaGFuZ2VkKHUuc2FuaXRpemVDb250ZW50KGVsZW1lbnQpKVxuICAgIGNvbnN0IHtcbiAgICAgICAgc2NyZWVuc2hvdDoge1xuICAgICAgICAgICAgc2F2ZXIsXG4gICAgICAgICAgICBsaW1pdFxuICAgICAgICB9XG4gICAgfSA9IG9wdGlvbnNcbiAgICBjb25zdCAkYW5zd2VyID0gJChlbGVtZW50KVxuICAgIGxldCBwYXN0ZUluUHJvZ3Jlc3MgPSBmYWxzZVxuXG4gICAgJGFuc3dlclxuICAgICAgICAuYXR0cih7XG4gICAgICAgICAgICAnY29udGVudGVkaXRhYmxlJzogJ3RydWUnLFxuICAgICAgICAgICAgJ3NwZWxsY2hlY2snOiAnZmFsc2UnLFxuICAgICAgICAgICAgJ2RhdGEtanMnOiAnYW5zd2VyJ1xuICAgICAgICB9KVxuICAgICAgICAuYWRkQ2xhc3MoJ3JpY2gtdGV4dC1lZGl0b3InKVxuICAgICAgICAub24oJ21vdXNlZG93bicsIHUuZXF1YXRpb25JbWFnZVNlbGVjdG9yLCBlID0+IHtcbiAgICAgICAgICAgIG9uUmljaFRleHRFZGl0b3JGb2N1cygkKGUudGFyZ2V0KS5jbG9zZXN0KCdbZGF0YS1qcz1cImFuc3dlclwiXScpKVxuICAgICAgICAgICAgbWF0aC5vcGVuTWF0aEVkaXRvcigkKGUudGFyZ2V0KSlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdrZXlkb3duJywgZSA9PiB7XG4gICAgICAgICAgICBpZiAodS5pc0N0cmxLZXkoZSwga2V5Q29kZXMuRU5URVIpIHx8IHUuaXNLZXkoZSwga2V5Q29kZXMuRVNDKSkgbWF0aC5jbG9zZU1hdGhFZGl0b3IodHJ1ZSlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKHUuaXNDdHJsS2V5KGUsIGtleUNvZGVzLkUpKSBtYXRoLmluc2VydE5ld0VxdWF0aW9uKClcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdmb2N1cyBibHVyJywgZSA9PiB7XG4gICAgICAgICAgICBpZiAobWF0aC5pc1Zpc2libGUoKSAmJiBlLnR5cGUgPT09ICdmb2N1cycpIG1hdGguY2xvc2VNYXRoRWRpdG9yKClcbiAgICAgICAgICAgIG9uUmljaFRleHRFZGl0b3JGb2N1c0NoYW5nZWQoZSlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdpbnB1dCcsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKCFwYXN0ZUluUHJvZ3Jlc3MpIG9uVmFsdWVDaGFuZ2VkKHUuc2FuaXRpemVDb250ZW50KGUuY3VycmVudFRhcmdldCkpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbigncGFzdGUnLCBlID0+IHtcbiAgICAgICAgICAgIHBhc3RlSW5Qcm9ncmVzcyA9IHRydWVcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcGFzdGVJblByb2dyZXNzID0gZmFsc2UsIDApXG5cbiAgICAgICAgICAgIGlmIChlLnRhcmdldC50YWdOYW1lID09PSAnVEVYVEFSRUEnKVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgY2xpcGJvYXJkLm9uUGFzdGUoZSwgc2F2ZXIsIG9uVmFsdWVDaGFuZ2VkLCBsaW1pdClcbiAgICAgICAgfSlcbiAgICBzZXRUaW1lb3V0KCgpID0+IGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiZW5hYmxlT2JqZWN0UmVzaXppbmdcIiwgZmFsc2UsIGZhbHNlKSwgMClcbn1cblxuZnVuY3Rpb24gdG9nZ2xlUmljaFRleHRUb29sYmFyKGlzVmlzaWJsZSwgJGVkaXRvcikge1xuICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygncmljaC10ZXh0LWVkaXRvci1mb2N1cycsIGlzVmlzaWJsZSlcbiAgICAkZWRpdG9yLnRvZ2dsZUNsYXNzKCdyaWNoLXRleHQtZm9jdXNlZCcsIGlzVmlzaWJsZSlcbn1cblxuZnVuY3Rpb24gb25SaWNoVGV4dEVkaXRvckZvY3VzKCRlbGVtZW50KSB7XG4gICAgJGN1cnJlbnRFZGl0b3IgPSAkZWxlbWVudFxuICAgIHRvZ2dsZVJpY2hUZXh0VG9vbGJhcih0cnVlLCAkY3VycmVudEVkaXRvcilcbn1cblxuZnVuY3Rpb24gb25SaWNoVGV4dEVkaXRvckJsdXIoJGVsZW1lbnQpIHtcbiAgICB0b2dnbGVSaWNoVGV4dFRvb2xiYXIoZmFsc2UsICRlbGVtZW50KVxuICAgIG1hdGguY2xvc2VNYXRoRWRpdG9yKClcbiAgICBmb2N1cy5yaWNoVGV4dCA9IGZhbHNlXG59XG5cbmxldCByaWNoVGV4dEVkaXRvckJsdXJUaW1lb3V0XG5cbmZ1bmN0aW9uIG9uUmljaFRleHRFZGl0b3JGb2N1c0NoYW5nZWQoZSkge1xuICAgIGZvY3VzLnJpY2hUZXh0ID0gZS50eXBlID09PSAnZm9jdXMnXG5cbiAgICAkKGUuY3VycmVudFRhcmdldCkudG9nZ2xlQ2xhc3MoJ3JpY2gtdGV4dC1mb2N1c2VkJywgZm9jdXMucmljaFRleHQgKVxuXG4gICAgY2xlYXJUaW1lb3V0KHJpY2hUZXh0RWRpdG9yQmx1clRpbWVvdXQpXG4gICAgcmljaFRleHRFZGl0b3JCbHVyVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICAgIGlmIChyaWNoVGV4dEFuZE1hdGhCbHVyKCkpIG9uUmljaFRleHRFZGl0b3JCbHVyKCQoZS50YXJnZXQpKVxuICAgICAgICBlbHNlIGlmIChmb2N1cy5yaWNoVGV4dCAmJiBtYXRoLmlzVmlzaWJsZSgpKSBtYXRoLmNsb3NlTWF0aEVkaXRvcigpXG4gICAgICAgIGVsc2Ugb25SaWNoVGV4dEVkaXRvckZvY3VzKCQoZS50YXJnZXQpKVxuICAgIH0sIDApXG59XG5cbmZ1bmN0aW9uIHJpY2hUZXh0QW5kTWF0aEJsdXIoKSB7XG4gICAgcmV0dXJuICFmb2N1cy5yaWNoVGV4dCAmJiAhbWF0aC5pc1Zpc2libGUoKSAmJiAhZm9jdXMubGF0ZXhGaWVsZCAmJiAhZm9jdXMuZXF1YXRpb25GaWVsZFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYWxsb3dlZFRhZ3M6IFtcbiAgICAgICAgJ2RpdicsXG4gICAgICAgICdpbWcnLFxuICAgICAgICAnYnInXG4gICAgXSxcbiAgICBhbGxvd2VkQXR0cmlidXRlczoge1xuICAgICAgICBpbWc6IFsnc3JjJywgJ2FsdCddXG4gICAgfSxcbiAgICBhbGxvd2VkU2NoZW1lczogWydkYXRhJ10sXG4gICAgZXhjbHVzaXZlRmlsdGVyOiBmcmFtZSA9PiBmcmFtZS5hdHRyaWJzWydkYXRhLWpzJ10gPT09ICdtYXRoRWRpdG9yJ1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gICAge1xuICAgICAgICBsYWJlbDogJ1BlcnVzbWVyaXQgamEga3JlaWtrYWxhaXNldCBhYWtrb3NldCcsXG4gICAgICAgIGNoYXJhY3RlcnM6IFtcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnwrAnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8K3JywgbGF0ZXhDb21tYW5kOiAnXFxcXGNkb3QnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8KxJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBtJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiJ4nLCBsYXRleENvbW1hbmQ6ICdcXFxcaW5mdHknLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8KyJywgbGF0ZXhDb21tYW5kOiAnXjInLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8KzJywgbGF0ZXhDb21tYW5kOiAnXjMnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8K9JywgbGF0ZXhDb21tYW5kOiAnMS8yJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihZMnLCBsYXRleENvbW1hbmQ6ICcxLzMnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8+AJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBpJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOsScsIGxhdGV4Q29tbWFuZDogJ1xcXFxhbHBoYScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzrInLCBsYXRleENvbW1hbmQ6ICdcXFxcYmV0YScsIHBvcHVsYXI6IHRydWUgIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86TJywgbGF0ZXhDb21tYW5kOiAnXFxcXEdhbW1hJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOsycsIGxhdGV4Q29tbWFuZDogJ1xcXFxnYW1tYScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzpQnLCBsYXRleENvbW1hbmQ6ICdcXFxcRGVsdGEnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ860JywgbGF0ZXhDb21tYW5kOiAnXFxcXGRlbHRhJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOtScsIGxhdGV4Q29tbWFuZDogJ1xcXFx2YXJlcHNpbG9uJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOticsIGxhdGV4Q29tbWFuZDogJ1xcXFx6ZXRhJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOtycsIGxhdGV4Q29tbWFuZDogJ1xcXFxldGEnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86YJywgbGF0ZXhDb21tYW5kOiAnXFxcXFRoZXRhJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfPkScsIGxhdGV4Q29tbWFuZDogJ1xcXFx2YXJ0aGV0YScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn8J2chCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxpb3RhJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOuicsIGxhdGV4Q29tbWFuZDogJ1xcXFxrYXBwYScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzpsnLCBsYXRleENvbW1hbmQ6ICdcXFxcTGFtYmRhJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOuycsIGxhdGV4Q29tbWFuZDogJ1xcXFxsYW1iZGEnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8K1JywgbGF0ZXhDb21tYW5kOiAnXFxcXG11JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOnicsIGxhdGV4Q29tbWFuZDogJ1xcXFxYaScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzr4nLCBsYXRleENvbW1hbmQ6ICdcXFxceGknIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIjycsIGxhdGV4Q29tbWFuZDogJ1xcXFxQaScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnz4EnLCBsYXRleENvbW1hbmQ6ICdcXFxccmhvJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiJEnLCBsYXRleENvbW1hbmQ6ICdcXFxcU2lnbWEnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8+DJywgbGF0ZXhDb21tYW5kOiAnXFxcXHNpZ21hJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfPhCcsIGxhdGV4Q29tbWFuZDogJ1xcXFx0YXUnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86lJywgbGF0ZXhDb21tYW5kOiAnXFxcXFVwc2lsb24nIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8+FJywgbGF0ZXhDb21tYW5kOiAnXFxcXHVwc2lsb24nIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86mJywgbGF0ZXhDb21tYW5kOiAnXFxcXFBoaScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn0KQnLCBsYXRleENvbW1hbmQ6ICdcXFxccGhpJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfPhycsIGxhdGV4Q29tbWFuZDogJ1xcXFxjaGknIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86oJywgbGF0ZXhDb21tYW5kOiAnXFxcXFBzaScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnz4gnLCBsYXRleENvbW1hbmQ6ICdcXFxccHNpJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOqScsIGxhdGV4Q29tbWFuZDogJ1xcXFxPbWVnYScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnz4knLCBsYXRleENvbW1hbmQ6ICdcXFxcb21lZ2EnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIgicsIGxhdGV4Q29tbWFuZDogJ1xcXFxwYXJ0aWFsJyB9XG5cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBsYWJlbDogJ0FsZ2VicmEnLFxuICAgICAgICBjaGFyYWN0ZXJzOiBbXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KJoCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxuZXEnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KJiCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxhcHByb3gnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KJpCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxsZXEnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KJpScsIGxhdGV4Q29tbWFuZDogJ1xcXFxnZXEnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIvCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxzaW0nIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KJoScsIGxhdGV4Q29tbWFuZDogJ1xcXFxlcXVpdicgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4omiJyB9LCAvLyBcXG5lcXVpdiBvciBcXG5vdFxcZXF1aXZcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiYJywgbGF0ZXhDb21tYW5kOiAnXFxcXGNpcmMnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KApicsIGxhdGV4Q29tbWFuZDogJ1xcXFxkb3RzJyB9LCAvLyBtYXRyaWlzaWFsZ2VicmE/XG5cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBsYWJlbDogJ0dlb21ldHJpYSBqYSB2ZWt0b3Jpb3BwaScsXG4gICAgICAgIGNoYXJhY3RlcnM6IFtcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oigJywgbGF0ZXhDb21tYW5kOiAnXFxcXGFuZ2xlJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihpInLCBsYXRleENvbW1hbmQ6ICdcXFxccmlnaHRhcnJvdycsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oeFJywgcG9wdWxhcjogdHJ1ZSAgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oaRJywgbGF0ZXhDb21tYW5kOiAnXFxcXHVwYXJyb3cnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KGkycsIGxhdGV4Q29tbWFuZDogJ1xcXFxkb3duYXJyb3cnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KGlCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxsZWZ0cmlnaHRhcnJvdycgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oqlJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBlcnAnfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oCWJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBhcmFsbGVsJ30sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KHjCcgfSAvLyBcXHJpZ2h0bGVmdGhhcnBvb25zXG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbGFiZWw6ICdMb2dpaWtrYSBqYSBqb3Vra28tb3BwaScsXG4gICAgICAgIGNoYXJhY3RlcnM6IFtcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oeSJywgbGF0ZXhDb21tYW5kOiAnXFxcXFJpZ2h0YXJyb3cnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KHlCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxMZWZ0cmlnaHRhcnJvdycsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiDJywgbGF0ZXhDb21tYW5kOiAnXFxcXGV4aXN0cycsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiAJywgbGF0ZXhDb21tYW5kOiAnXFxcXGZvcmFsbCcsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oSdJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihJUnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KEpCcgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oSaJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiKknLCBsYXRleENvbW1hbmQ6ICdcXFxcY2FwJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiKonLCBsYXRleENvbW1hbmQ6ICdcXFxcY3VwJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiJYnLCBsYXRleENvbW1hbmQ6ICdcXFxcc2V0bWludXMnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KKgicsIGxhdGV4Q29tbWFuZDogJ1xcXFxzdWJzZXQnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KKhCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxub3RzdWJzZXQnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIiCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxpbicgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiJJywgbGF0ZXhDb21tYW5kOiAnXFxcXG5vdGluJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiIUnLCBsYXRleENvbW1hbmQ6ICdcXFxcZW1wdHknIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIpycsIGxhdGV4Q29tbWFuZDogJ1xcXFxhbmQnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIqCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxvcicgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnwqwnIH1cblxuICAgICAgICBdXG4gICAgfVxuXVxuIiwiY29uc3Qgc3BlY2lhbENoYXJhY3Rlckdyb3VwcyA9IHJlcXVpcmUoJy4vc3BlY2lhbENoYXJhY3RlcnMnKVxuY29uc3QgbGF0ZXhDb21tYW5kcyA9IHJlcXVpcmUoJy4vbGF0ZXhDb21tYW5kcycpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGluaXQsXG59XG5cbmZ1bmN0aW9uIGluaXQobWF0aEVkaXRvciwgaGFzUmljaFRleHRGb2N1cywgbCkge1xuICAgIGNvbnN0ICR0b29sYmFyID0gJChgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xzXCIgZGF0YS1qcz1cInRvb2xzXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29scy1idXR0b24td3JhcHBlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xiYXItd3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci1jaGFyYWN0ZXJzLWV4cGFuZC1jb2xsYXBzZVwiIGRhdGEtanM9XCJleHBhbmRDb2xsYXBzZUNoYXJhY3RlcnNcIiBzdHlsZT1cInotaW5kZXg6IDEwMFwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29scy1yb3dcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29sYmFyLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhci1jaGFyYWN0ZXJzIHJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhciByaWNoLXRleHQtZWRpdG9yLXRvb2xiYXItYnV0dG9uLWxpc3RcIiBkYXRhLWpzPVwiY2hhcmFjdGVyc0xpc3RcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbHMtcm93XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhci13cmFwcGVyIHJpY2gtdGV4dC1lZGl0b3ItZXF1YXRpb24td3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29sYmFyLWVxdWF0aW9uIHJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhciByaWNoLXRleHQtZWRpdG9yLXRvb2xiYXItYnV0dG9uLWxpc3RcIiBkYXRhLWpzPVwibWF0aFRvb2xiYXJcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbHMtYnV0dG9uLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29sYmFyLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItbmV3LWVxdWF0aW9uIHJpY2gtdGV4dC1lZGl0b3ItYnV0dG9uIHJpY2gtdGV4dC1lZGl0b3ItYnV0dG9uLWFjdGlvblwiIGRhdGEtanM9XCJuZXdFcXVhdGlvblwiIGRhdGEtY29tbWFuZD1cIkN0cmwtSVwiPs6jICR7bC5pbnNlcnRFcXVhdGlvbn08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgYClcbiAgICAgICAgLm9uKCdtb3VzZWRvd24nLCAnW2RhdGEtanM9XCJleHBhbmRDb2xsYXBzZUNoYXJhY3RlcnNcIl0nLCBlID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgJHRvb2xiYXIudG9nZ2xlQ2xhc3MoJ3JpY2gtdGV4dC1lZGl0b3ItY2hhcmFjdGVycy1leHBhbmRlZCcpXG4gICAgICAgIH0pXG5cbiAgICBjb25zdCAkbmV3RXF1YXRpb24gPSAkdG9vbGJhci5maW5kKCdbZGF0YS1qcz1cIm5ld0VxdWF0aW9uXCJdJylcbiAgICBjb25zdCAkbWF0aFRvb2xiYXIgPSAkdG9vbGJhci5maW5kKCdbZGF0YS1qcz1cIm1hdGhUb29sYmFyXCJdJylcbiAgICBpbml0U3BlY2lhbENoYXJhY3RlclRvb2xiYXIoJHRvb2xiYXIsIG1hdGhFZGl0b3IsIGhhc1JpY2hUZXh0Rm9jdXMpXG4gICAgaW5pdE1hdGhUb29sYmFyKCRtYXRoVG9vbGJhciwgbWF0aEVkaXRvcilcbiAgICBpbml0TmV3RXF1YXRpb24oJG5ld0VxdWF0aW9uLCBtYXRoRWRpdG9yLCBoYXNSaWNoVGV4dEZvY3VzKVxuXG4gICAgcmV0dXJuICR0b29sYmFyXG59XG5cbmNvbnN0IHNwZWNpYWxDaGFyYWN0ZXJUb0J1dHRvbiA9IGNoYXIgPT4gYDxidXR0b24gY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLWJ1dHRvbiByaWNoLXRleHQtZWRpdG9yLWJ1dHRvbi1ncmlkJHtjaGFyLnBvcHVsYXIgPyAnIHJpY2gtdGV4dC1lZGl0b3ItY2hhcmFjdGVycy1wb3B1bGFyJyA6Jyd9XCIgJHtjaGFyLmxhdGV4Q29tbWFuZCA/IGBkYXRhLWNvbW1hbmQ9XCIke2NoYXIubGF0ZXhDb21tYW5kfVwiYCA6ICcnfT4ke2NoYXIuY2hhcmFjdGVyfTwvYnV0dG9uPmBcblxuY29uc3QgcG9wdWxhckluR3JvdXAgPSBncm91cCA9PiBncm91cC5jaGFyYWN0ZXJzLmZpbHRlcihjaGFyYWN0ZXIgPT4gY2hhcmFjdGVyLnBvcHVsYXIpLmxlbmd0aFxuXG5mdW5jdGlvbiBpbml0U3BlY2lhbENoYXJhY3RlclRvb2xiYXIoJHRvb2xiYXIsIG1hdGhFZGl0b3IsIGhhc0Fuc3dlckZvY3VzKSB7XG4gICAgY29uc3QgZ3JpZEJ1dHRvbldpZHRoUHggPSAzNVxuXG4gICAgJHRvb2xiYXIuZmluZCgnW2RhdGEtanM9XCJjaGFyYWN0ZXJzTGlzdFwiXScpXG4gICAgICAgIC5hcHBlbmQoc3BlY2lhbENoYXJhY3Rlckdyb3Vwcy5tYXAoZ3JvdXAgPT5cbiAgICAgICAgICAgIGA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29sYmFyLWNoYXJhY3RlcnMtZ3JvdXBcIiBcbiAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6ICR7cG9wdWxhckluR3JvdXAoZ3JvdXApICogZ3JpZEJ1dHRvbldpZHRoUHh9cHhcIj5cbiAgICAgICAgICAgICAgICAgICR7Z3JvdXAuY2hhcmFjdGVycy5tYXAoc3BlY2lhbENoYXJhY3RlclRvQnV0dG9uKS5qb2luKCcnKX1cbiAgICAgICAgICAgICA8L2Rpdj5gKSlcbiAgICAgICAgLm9uKCdtb3VzZWRvd24nLCAnYnV0dG9uJywgZSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICAgICAgY29uc3QgY2hhcmFjdGVyID0gZS5jdXJyZW50VGFyZ2V0LmlubmVyVGV4dFxuICAgICAgICAgICAgY29uc3QgY29tbWFuZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmNvbW1hbmRcbiAgICAgICAgICAgIGlmIChoYXNBbnN3ZXJGb2N1cygpKSB3aW5kb3cuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydFRleHQnLCBmYWxzZSwgY2hhcmFjdGVyKVxuICAgICAgICAgICAgZWxzZSBtYXRoRWRpdG9yLmluc2VydE1hdGgoY29tbWFuZCB8fCBjaGFyYWN0ZXIpXG4gICAgICAgIH0pXG59XG5cbmZ1bmN0aW9uIGluaXRNYXRoVG9vbGJhcigkbWF0aFRvb2xiYXIsIG1hdGhFZGl0b3IpIHtcbiAgICAkbWF0aFRvb2xiYXIuYXBwZW5kKGxhdGV4Q29tbWFuZHNcbiAgICAgICAgLm1hcChvID0+IGA8YnV0dG9uIGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci1idXR0b24gcmljaC10ZXh0LWVkaXRvci1idXR0b24tZ3JpZFwiIGRhdGEtY29tbWFuZD1cIiR7by5hY3Rpb259XCIgZGF0YS1sYXRleGNvbW1hbmQ9XCIke28ubGFiZWwgfHwgJyd9XCIgZGF0YS11c2V3cml0ZT1cIiR7by51c2VXcml0ZSB8fCBmYWxzZX1cIj5cbjxpbWcgc3JjPVwiL21hdGguc3ZnP2xhdGV4PSR7ZW5jb2RlVVJJQ29tcG9uZW50KG8ubGFiZWwgPyBvLmxhYmVsLnJlcGxhY2UoL1gvZywgJ1xcXFxzcXVhcmUnKSA6IG8uYWN0aW9uKX1cIi8+XG48L2J1dHRvbj5gKS5qb2luKCcnKVxuICAgICkub24oJ21vdXNlZG93bicsICdidXR0b24nLCBlID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGNvbnN0IGRhdGFzZXQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcbiAgICAgICAgbWF0aEVkaXRvci5pbnNlcnRNYXRoKGRhdGFzZXQuY29tbWFuZCwgZGF0YXNldC5sYXRleGNvbW1hbmQsIGRhdGFzZXQudXNld3JpdGUgPT09ICd0cnVlJylcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBpbml0TmV3RXF1YXRpb24oJG5ld0VxdWF0aW9uLCBtYXRoRWRpdG9yLCBoYXNBbnN3ZXJGb2N1cykge1xuICAgICRuZXdFcXVhdGlvbi5tb3VzZWRvd24oKGUgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgaWYgKCFoYXNBbnN3ZXJGb2N1cygpKSByZXR1cm4gLy8gVE9ETzogcmVtb3ZlIHdoZW4gYnV0dG9uIGlzIG9ubHkgdmlzaWJsZSB3aGVuIHRleHRhcmVhIGhhcyBmb2N1c1xuICAgICAgICBtYXRoRWRpdG9yLmluc2VydE5ld0VxdWF0aW9uKClcbiAgICB9KS5iaW5kKHRoaXMpKVxufVxuIiwiY29uc3Qgc2FuaXRpemVIdG1sID0gcmVxdWlyZSgnc2FuaXRpemUtaHRtbCcpXG5jb25zdCBzYW5pdGl6ZU9wdHMgPSByZXF1aXJlKCcuL3Nhbml0aXplT3B0cycpXG5jb25zdCBlcXVhdGlvbkltYWdlU2VsZWN0b3IgPSAnaW1nW3NyY149XCIvbWF0aC5zdmdcIl0nXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGlzS2V5LFxuICAgIGlzQ3RybEtleSxcbiAgICBpbnNlcnRUb1RleHRBcmVhQXRDdXJzb3IsXG4gICAgc2FuaXRpemUsXG4gICAgc2FuaXRpemVDb250ZW50LFxuICAgIHNldEN1cnNvckFmdGVyLFxuICAgIGVxdWF0aW9uSW1hZ2VTZWxlY3RvcixcbiAgICBleGlzdGluZ1NjcmVlbnNob3RDb3VudCxcbiAgICBzY3JvbGxJbnRvVmlld1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0TGlua3NUb1JlbGF0aXZlKGh0bWwpIHtcbiAgICByZXR1cm4gaHRtbC5yZXBsYWNlKG5ldyBSZWdFeHAoZG9jdW1lbnQubG9jYXRpb24ub3JpZ2luLCAnZycpLCAnJylcbn1cblxuZnVuY3Rpb24gc2FuaXRpemUoaHRtbCkge1xuICAgIHJldHVybiBzYW5pdGl6ZUh0bWwoY29udmVydExpbmtzVG9SZWxhdGl2ZShodG1sKSwgc2FuaXRpemVPcHRzKVxufVxuZnVuY3Rpb24gaW5zZXJ0VG9UZXh0QXJlYUF0Q3Vyc29yKGZpZWxkLCB2YWx1ZSkge1xuICAgIGNvbnN0IHN0YXJ0UG9zID0gZmllbGQuc2VsZWN0aW9uU3RhcnRcbiAgICBjb25zdCBlbmRQb3MgPSBmaWVsZC5zZWxlY3Rpb25FbmRcbiAgICBsZXQgb2xkVmFsdWUgPSBmaWVsZC52YWx1ZVxuICAgIGZpZWxkLnZhbHVlID0gb2xkVmFsdWUuc3Vic3RyaW5nKDAsIHN0YXJ0UG9zKSArIHZhbHVlICsgb2xkVmFsdWUuc3Vic3RyaW5nKGVuZFBvcywgb2xkVmFsdWUubGVuZ3RoKVxuICAgIGZpZWxkLnNlbGVjdGlvblN0YXJ0ID0gZmllbGQuc2VsZWN0aW9uRW5kID0gc3RhcnRQb3MgKyB2YWx1ZS5sZW5ndGhcbn1cblxuZnVuY3Rpb24gaXNLZXkoZSwga2V5KSB7XG4gICAgcmV0dXJuIHByZXZlbnRJZlRydWUoZSwgIWUuYWx0S2V5ICYmICFlLnNoaWZ0S2V5ICYmICFlLmN0cmxLZXkgJiYga2V5T3JLZXlDb2RlKGUsIGtleSkpXG59XG5cbmZ1bmN0aW9uIGlzQ3RybEtleShlLCBrZXkpIHtcbiAgICByZXR1cm4gcHJldmVudElmVHJ1ZShlLCAhZS5hbHRLZXkgJiYgIWUuc2hpZnRLZXkgJiYgZS5jdHJsS2V5ICYmIGtleU9yS2V5Q29kZShlLCBrZXkpKVxufVxuXG5mdW5jdGlvbiBrZXlPcktleUNvZGUoZSwgdmFsKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnID8gZS5rZXkgPT09IHZhbCA6IGUua2V5Q29kZSA9PT0gdmFsXG59XG5mdW5jdGlvbiBwcmV2ZW50SWZUcnVlKGUsIHZhbCkge1xuICAgIGlmICh2YWwpIGUucHJldmVudERlZmF1bHQoKVxuICAgIHJldHVybiB2YWxcbn1cblxuZnVuY3Rpb24gc2FuaXRpemVDb250ZW50KGFuc3dlckVsZW1lbnQpIHtcbiAgICBjb25zdCAkYW5zd2VyRWxlbWVudCA9ICQoYW5zd2VyRWxlbWVudClcbiAgICBjb25zdCAkbWF0aEVkaXRvciA9ICRhbnN3ZXJFbGVtZW50LmZpbmQoJ1tkYXRhLWpzPVwibWF0aEVkaXRvclwiXScpXG4gICAgJG1hdGhFZGl0b3IuaGlkZSgpXG4gICAgY29uc3QgdGV4dCA9ICRhbnN3ZXJFbGVtZW50LmdldCgwKS5pbm5lclRleHRcbiAgICAkbWF0aEVkaXRvci5zaG93KClcblxuICAgIGNvbnN0IGh0bWwgPSBzYW5pdGl6ZSgkYW5zd2VyRWxlbWVudC5odG1sKCkpXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhbnN3ZXJIVE1MOiBodG1sLFxuICAgICAgICBhbnN3ZXJUZXh0OiB0ZXh0LFxuICAgICAgICBpbWFnZUNvdW50OiBleGlzdGluZ1NjcmVlbnNob3RDb3VudCgkKGA8ZGl2PiR7aHRtbH08L2Rpdj5gKSlcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldEN1cnNvckFmdGVyKCRpbWcpIHtcbiAgICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKClcbiAgICBjb25zdCBpbWcgPSAkaW1nLmdldCgwKVxuICAgIGNvbnN0IG5leHRTaWJsaW5nID0gaW1nLm5leHRTaWJsaW5nICYmIGltZy5uZXh0U2libGluZy50YWdOYW1lID09PSAnQlInID8gaW1nLm5leHRTaWJsaW5nIDogaW1nXG4gICAgcmFuZ2Uuc2V0U3RhcnQobmV4dFNpYmxpbmcsIDApXG4gICAgcmFuZ2Uuc2V0RW5kKG5leHRTaWJsaW5nLCAwKVxuICAgIGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKVxuICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKVxuICAgIHNlbC5hZGRSYW5nZShyYW5nZSlcbn1cblxuZnVuY3Rpb24gZXhpc3RpbmdTY3JlZW5zaG90Q291bnQoJGVkaXRvcikge1xuICAgIGNvbnN0IGltYWdlQ291bnQgPSAkZWRpdG9yLmZpbmQoJ2ltZycpLmxlbmd0aFxuICAgIGNvbnN0IGVtcHR5SW1hZ2VDb3VudCA9ICRlZGl0b3IuZmluZCgnaW1nW3NyYz1cIlwiXScpLmxlbmd0aFxuICAgIGNvbnN0IGVxdWF0aW9uQ291bnQgPSAkZWRpdG9yLmZpbmQoZXF1YXRpb25JbWFnZVNlbGVjdG9yKS5sZW5ndGhcbiAgICByZXR1cm4gaW1hZ2VDb3VudCAtIGVxdWF0aW9uQ291bnQgLSBlbXB0eUltYWdlQ291bnRcbn1cblxuZnVuY3Rpb24gc2Nyb2xsSW50b1ZpZXcoJGVsZW1lbnQpIHtcbiAgICBjb25zdCAkd2luZG93ID0gJCh3aW5kb3cpXG4gICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gJHdpbmRvdy5oZWlnaHQoKSAtIDQwXG4gICAgY29uc3Qgc2Nyb2xsID0gd2luZG93SGVpZ2h0ICsgJHdpbmRvdy5zY3JvbGxUb3AoKVxuICAgIGNvbnN0IHBvcyA9ICRlbGVtZW50Lm9mZnNldCgpLnRvcCArICRlbGVtZW50LmhlaWdodCgpXG4gICAgaWYgKHNjcm9sbCA8IHBvcykge1xuICAgICAgICAkd2luZG93LnNjcm9sbFRvcChwb3MgLSB3aW5kb3dIZWlnaHQpXG4gICAgfVxufVxuIl19
