(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.I = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = {
    editor: {
        mathEditor: 'Matikkaeditori',
        title: 'Kaavaeditorin kehitysversio',
        description: '<ul>\n<li>Editori toimii parhaiten Firefox-selaimella.</li>\n<li>\u201CLis\xE4\xE4 kaava\u201D -napin alta l\xF6yd\xE4t yleisimpi\xE4 matematiikassa, fysiikassa ja\nkemiassa k\xE4ytett\xE4vi\xE4 merkint\xF6j\xE4. Lis\xE4ksi erikoismerkkej\xE4 voi k\xE4ytt\xE4\xE4 kaavan kirjoittamiseen.</li>\n <li>Kaavoja voi rakentaa\nklikkaamalla valikon merkint\xF6j\xE4 ja/tai kirjoittamalla LaTeXia.</li>\n <li>Editorin vastauskentt\xE4\xE4n voi kirjoittaa teksti\xE4 ja kaavoja sek\xE4\nlis\xE4t\xE4 kuvia.</li></ul>',
        shortcutTitle: 'Pikan\xE4pp\xE4invinkkej\xE4',
        shortcuts: '<table><tbody>\n<tr><th>Liit\xE4 kuva leikep\xF6yd\xE4lt\xE4</th><td>Ctrl-V</td></tr>\n<tr><th>Kirjoita kaava</th><td>Ctrl-E</td></tr>\n<tr><th colspan="2">Kaavassa</th></tr>\n<tr><th>Jakoviiva</th><td>/</td></tr>\n<tr><th>Kertomerkki</th><td>*</td></tr>\n<tr><th>Eksponentti</th><td>^</td></tr>\n<tr><th>Sulje kaava</th><td>Esc</td></tr>\n<tr><th>Lis\xE4\xE4 kaava seuraavalle riville</th><td>Enter</td></tr>\n</tbody>\n</table>',
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
        title: 'Formeleditorns utvecklingsversion',
        description: '<ul>\n<li>Editorn fungerar b\xE4st med browsern Firefox.</li>\n <li>Under knappen \u201CL\xE4gg till formel\u201D hittar du de vanligaste beteckningarna som anv\xE4nds i matematik, fysik och kemi. Dessutom kan du anv\xE4nda specialtecken f\xF6r att skriva formler.</li>\n<li>Det g\xE5r att konstruera formler genom att klicka p\xE5 beteckningarna i menyerna och/eller genom att skriva LaTeX.</li>\n<li>Det g\xE5r f\xF6rutom att skriva text och formler, att ocks\xE5 att l\xE4gga till bilder i svarsf\xE4ltet.</li></ul>',
        shortcutTitle: 'Tips p\xE5 tangentkombinationer',
        shortcuts: '<table><tbody>\n<tr><th>L\xE4gg till en bild fr\xE5n urklippet</th><td>Ctrl-V</td></tr>\n<tr><th>Skriv en formel</th><td>Ctrl-E</td></tr>\n<tr><th colspan="2">I formeln </th></tr>\n<tr><th>Br\xE5kstreck</th><td>/</td></tr>\n<tr><th>Multiplikationstecken</th><td>*</td></tr>\n<tr><th>St\xE4ng formeln</th><td>Esc</td></tr>\n</tbody>\n</table>',
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
var keyCodes = {
    ENTER: 13,
    ESC: 27
};

var MQ = void 0;
module.exports = { init: init };
var firstTime = true;

function init($outerPlaceholder, focus) {
    var updateMathImgTimeout = void 0;

    if (firstTime) {
        MQ = MathQuill.getInterface(2);
    }
    var $mathEditorContainer = $('\n        <div class="math-editor" data-js="mathEditor">\n            <div class="math-editor-equation-field" data-js="equationField"></div>\n            <textarea rows="1" class="math-editor-latex-field" data-js="latexField" placeholder="LaTex"></textarea>\n        </div>');

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
    $equationField.on('input', '.mq-textarea textarea', onMqEdit).on('focus blur', '.mq-textarea textarea', function (e) {
        focus.equationField = e.type !== 'blur' && e.type !== 'focusout';
        onFocusChanged();
    }).on('keydown', onClose).on('paste', function (e) {
        return e.stopPropagation();
    });

    $latexField.on('input paste', onLatexUpdate).on('focus blur', function (e) {
        focus.latexField = e.type !== 'blur';
        onFocusChanged();
    }).on('keydown', onClose).on('paste', function (e) {
        return e.stopPropagation();
    });

    function onClose(e) {
        if (u.isCtrlKey(e, keyCodes.ENTER) || u.isKey(e, keyCodes.ESC)) closeMathEditor(true);
    }

    return {
        insertNewEquation: insertNewEquation,
        insertMath: insertMath,
        openMathEditor: openMathEditor,
        closeMathEditor: closeMathEditor
    };

    function onMqEdit(e) {
        e && e.originalEvent && e.originalEvent.stopPropagation();
        clearTimeout(mqEditTimeout);
        mqEditTimeout = setTimeout(function () {
            if (focus.latexField) return;
            var latex = mqInstance.latex();
            $latexField.val(latex);
            updateMathImgWithDebounce($mathEditorContainer.prev(), latex);
        }, 0);
    }

    function onLatexUpdate(e) {
        e && e.originalEvent && e.originalEvent.stopPropagation();
        updateMathImgWithDebounce($mathEditorContainer.prev(), $latexField.val());
        setTimeout(function () {
            return mqInstance.latex($latexField.val());
        }, 1);
    }

    function onFocusChanged() {
        clearTimeout(focusChanged);
        focusChanged = setTimeout(function () {
            $mathEditorContainer.trigger({ type: 'mathfocus', hasFocus: focus.latexField || focus.equationField });
            if (!focus.latexField && !focus.equationField) closeMathEditor();
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
            if (~symbol.indexOf('\\')) mqInstance.keystroke('Tab');
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
        $img.closest('[data-js="answer"]').trigger('input');
    }

    function updateMathImgWithDebounce($img, latex) {
        clearTimeout(updateMathImgTimeout);
        updateMathImgTimeout = setTimeout(function () {
            updateMathImg($img, latex);
        }, 500);
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
        visible = false;
        focus.latexField = false;
        focus.equationField = false;
        $mathEditorContainer.trigger({ type: 'mathfocus', hasFocus: focus.latexField || focus.equationField });
        $outerPlaceholder.append($mathEditorContainer);
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
    E: 69
};
var $outerPlaceholder = $('<div class="rich-text-editor-hidden" style="display: none;" data-js="outerPlaceholder">');
var focus = {
    richText: false,
    latexField: false,
    equationField: false
};
var $currentEditor = void 0;

var firstCall = true;
var math = void 0;
var $toolbar = void 0;

module.exports.makeRichText = function (answer, options) {
    var onValueChanged = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    if (firstCall) {
        math = mathEditor.init($outerPlaceholder, focus);
        $toolbar = toolbars.init(math, function () {
            return focus.richText;
        }, l);
        $('body').append($outerPlaceholder, $toolbar);
        firstCall = false;
    }
    onValueChanged(u.sanitizeContent(answer));
    var _options$screenshot = options.screenshot,
        saver = _options$screenshot.saver,
        limit = _options$screenshot.limit;

    var pasteInProgress = false;

    $(answer).attr({
        contenteditable: true,
        spellcheck: false,
        'data-js': 'answer'
    }).addClass('rich-text-editor').on('click', u.equationImageSelector, function (e) {
        if (e.which === 1) {
            onRichTextEditorFocus($(e.target).closest('[data-js="answer"]'));
            math.openMathEditor($(e.target));
        }
    }).on('keyup', function (e) {
        if (u.isCtrlKey(e, keyCodes.E)) math.insertNewEquation();
    }).on('mathfocus', function (e) {
        $(e.currentTarget).toggleClass('rich-text-focused', e.hasFocus);
        if (richTextAndMathBlur()) onRichTextEditorBlur($currentEditor);
    }).on('focus blur', function (e) {
        if (e.type === 'focus') math.closeMathEditor();
        onRichTextEditorFocusChanged(e);
    }).on('input', function (e) {
        if (!pasteInProgress) onValueChanged(u.sanitizeContent(e.currentTarget));
    }).on('drop', function (e) {
        setTimeout(function () {
            $(e.target).html(u.sanitize(e.target.innerHTML));
        }, 0);
    }).on('paste', function (e) {
        pasteInProgress = true;
        setTimeout(function () {
            return pasteInProgress = false;
        }, 0);
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
    focus.richText = false;
}

var richTextEditorBlurTimeout = void 0;

function onRichTextEditorFocusChanged(e) {
    focus.richText = e.type === 'focus';
    $(e.currentTarget).toggleClass('rich-text-focused', focus.richText);

    clearTimeout(richTextEditorBlurTimeout);
    richTextEditorBlurTimeout = setTimeout(function () {
        if (richTextAndMathBlur()) onRichTextEditorBlur($(e.target));else onRichTextEditorFocus($(e.target));
    }, 0);
}

function richTextAndMathBlur() {
    return !focus.richText && !focus.latexField && !focus.equationField;
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
    { character: '∘', latexCommand: '\\circ' }, { character: '…', latexCommand: '\\ldots' }]
}, {
    label: 'Geometria ja vektorioppi',
    characters: [{ character: '∠', latexCommand: '\\angle', popular: true }, { character: '→', latexCommand: '\\rightarrow', popular: true }, { character: '⇅', popular: true }, { character: '↑', latexCommand: '\\uparrow' }, { character: '↓', latexCommand: '\\downarrow' }, { character: '↔', latexCommand: '\\leftrightarrow' }, { character: '⊥', latexCommand: '\\perp' }, { character: '‖', latexCommand: '\\parallel' }, { character: '⇌' }, // \rightleftharpoons
    { character: '|' // \pipe
    }]
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
    var $toolbar = $('\n        <div class="rich-text-editor-tools" data-js="tools" style="display: none">\n            <div class="rich-text-editor-tools-button-wrapper">\n                <div class="rich-text-editor-toolbar-wrapper">\n                    <button class="rich-text-editor-characters-expand-collapse" data-js="expandCollapseCharacters" style="z-index: 100"></button>\n                </div>\n            </div>\n            <div class="rich-text-editor-tools-row">\n                <div class="rich-text-editor-toolbar-wrapper">\n                    <div class="rich-text-editor-toolbar-characters rich-text-editor-toolbar rich-text-editor-toolbar-button-list" data-js="charactersList"></div>\n                </div>\n            </div>\n            <div class="rich-text-editor-tools-row">\n                <div class="rich-text-editor-toolbar-wrapper rich-text-editor-equation-wrapper">\n                    <div class="rich-text-editor-toolbar-equation rich-text-editor-toolbar rich-text-editor-toolbar-button-list" data-js="mathToolbar"></div>\n                </div>\n            </div>\n            <div class="rich-text-editor-tools-button-wrapper">\n                <div class="rich-text-editor-toolbar-wrapper">\n                    <button class="rich-text-editor-new-equation rich-text-editor-button rich-text-editor-button-action" data-js="newEquation" data-command="Ctrl-E">\u03A3 ' + l.insertEquation + '</button>\n                </div>\n            </div>\n        </div>\n        ').on('mousedown', '[data-js="expandCollapseCharacters"]', function (e) {
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
var screenshotImageSelector = 'img[src^="/screenshot/"]';

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

    var answerConsideredEmpty = text.trim().length + $answerElement.find(equationImageSelector).length + $answerElement.find(screenshotImageSelector).length === 0;

    return {
        answerHTML: answerConsideredEmpty ? '' : html,
        answerText: text,
        imageCount: existingScreenshotCount($('<div>' + html + '</div>'))
    };
}

function setCursorAfter($img) {
    var range = document.createRange();
    var img = $img.get(0);
    range.setStartAfter(img);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvRkkuanMiLCJhcHAvU1YuanMiLCJhcHAvY2xpcGJvYXJkLmpzIiwiYXBwL2xhdGV4Q29tbWFuZHMuanMiLCJhcHAvbG9hZGluZ0ltZy5qcyIsImFwcC9tYXRoLWVkaXRvci5qcyIsImFwcC9yaWNoLXRleHQtZWRpdG9yLmpzIiwiYXBwL3Nhbml0aXplT3B0cy5qcyIsImFwcC9zcGVjaWFsQ2hhcmFjdGVycy5qcyIsImFwcC90b29sYmFycy5qcyIsImFwcC91dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxPQUFPLE9BQVAsR0FBaUI7QUFDYixZQUFRO0FBQ0osb0JBQVksZ0JBRFI7QUFFSixlQUFPLDZCQUZIO0FBR0osa2hCQUhJO0FBV0oscURBWEk7QUFZSixrY0FaSTtBQXVCSixvQkFBWSxVQXZCUjtBQXdCSiwyQkFBbUIsZUF4QmY7QUF5Qkosd0JBQWdCLGFBekJaO0FBMEJKLGVBQU8sT0ExQkg7QUEyQkosY0FBTSxVQTNCRjtBQTRCSixpQkFBUyxZQTVCTDtBQTZCSixzQkFBYyxtQkE3QlY7QUE4Qkosa0JBQVUsS0E5Qk47QUErQkosbUJBQVcsWUEvQlA7QUFnQ0oscUJBQWEsU0FoQ1Q7QUFpQ0osNEJBQW9CO0FBakNoQixLQURLO0FBb0NiLGdCQUFZO0FBQ1Isc0JBQWMsbUJBRE47QUFFUixpQkFBUyxZQUZEO0FBR1Isb0JBQVksZ0JBSEo7QUFJUixlQUFPLFdBSkM7QUFLUixrQkFBVSxHQUxGO0FBTVIsdUJBQWUsc0JBTlA7QUFPUixjQUFNLG9CQVBFO0FBUVIsa0JBQVUsZUFSRjtBQVNSLG1CQUFXO0FBVEg7QUFwQ0MsQ0FBakI7Ozs7O0FDQUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsWUFBUTtBQUNKLG9CQUFZLGlCQURSO0FBRUosZUFBTyxtQ0FGSDtBQUdKLDZoQkFISTtBQVFKLHdEQVJJO0FBU0osMFdBVEk7QUFrQkosb0JBQVksYUFs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LElBRlQ7QUFHSCxvQkFBWSx3QkFBd0IsWUFBVSxJQUFWLFlBQXhCO0FBSFQsS0FBUDtBQUtIOztBQUVELFNBQVMsY0FBVCxDQUF3QixJQUF4QixFQUE4QjtBQUMxQixRQUFNLFFBQVEsU0FBUyxXQUFULEVBQWQ7QUFDQSxRQUFNLE1BQU0sS0FBSyxHQUFMLENBQVMsQ0FBVCxDQUFaO0FBQ0EsVUFBTSxhQUFOLENBQW9CLEdBQXBCO0FBQ0EsUUFBTSxNQUFNLE9BQU8sWUFBUCxFQUFaO0FBQ0EsUUFBSSxlQUFKO0FBQ0EsUUFBSSxRQUFKLENBQWEsS0FBYjtBQUNIOztBQUVELFNBQVMsdUJBQVQsQ0FBaUMsT0FBakMsRUFBMEM7QUFDdEMsUUFBTSxhQUFhLFFBQVEsSUFBUixDQUFhLEtBQWIsRUFBb0IsTUFBdkM7QUFDQSxRQUFNLGtCQUFrQixRQUFRLElBQVIsQ0FBYSxhQUFiLEVBQTRCLE1BQXBEO0FBQ0EsUUFBTSxnQkFBZ0IsUUFBUSxJQUFSLENBQWEscUJBQWIsRUFBb0MsTUFBMUQ7QUFDQSxXQUFPLGFBQWEsYUFBYixHQUE2QixlQUFwQztBQUNIOztBQUVELFNBQVMsY0FBVCxDQUF3QixRQUF4QixFQUFrQztBQUM5QixRQUFNLFVBQVUsRUFBRSxNQUFGLENBQWhCO0FBQ0EsUUFBTSxlQUFlLFFBQVEsTUFBUixLQUFtQixFQUF4QztBQUNBLFFBQU0sU0FBUyxlQUFlLFFBQVEsU0FBUixFQUE5QjtBQUNBLFFBQU0sTUFBTSxTQUFTLE1BQVQsR0FBa0IsR0FBbEIsR0FBd0IsU0FBUyxNQUFULEVBQXBDO0FBQ0EsUUFBSSxTQUFTLEdBQWIsRUFBa0I7QUFDZCxnQkFBUSxTQUFSLENBQWtCLE1BQU0sWUFBeEI7QUFDSDtBQUNKIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGVkaXRvcjoge1xuICAgICAgICBtYXRoRWRpdG9yOiAnTWF0aWtrYWVkaXRvcmknLFxuICAgICAgICB0aXRsZTogJ0thYXZhZWRpdG9yaW4ga2VoaXR5c3ZlcnNpbycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBgPHVsPlxuPGxpPkVkaXRvcmkgdG9pbWlpIHBhcmhhaXRlbiBGaXJlZm94LXNlbGFpbWVsbGEuPC9saT5cbjxsaT7igJxMaXPDpMOkIGthYXZh4oCdIC1uYXBpbiBhbHRhIGzDtnlkw6R0IHlsZWlzaW1wacOkIG1hdGVtYXRpaWthc3NhLCBmeXNpaWthc3NhIGphXG5rZW1pYXNzYSBrw6R5dGV0dMOkdmnDpCBtZXJraW50w7Zqw6QuIExpc8Oka3NpIGVyaWtvaXNtZXJra2Vqw6Qgdm9pIGvDpHl0dMOkw6Qga2FhdmFuIGtpcmpvaXR0YW1pc2Vlbi48L2xpPlxuIDxsaT5LYWF2b2phIHZvaSByYWtlbnRhYVxua2xpa2thYW1hbGxhIHZhbGlrb24gbWVya2ludMO2asOkIGphL3RhaSBraXJqb2l0dGFtYWxsYSBMYVRlWGlhLjwvbGk+XG4gPGxpPkVkaXRvcmluIHZhc3RhdXNrZW50dMOkw6RuIHZvaSBraXJqb2l0dGFhIHRla3N0acOkIGphIGthYXZvamEgc2Vrw6Rcbmxpc8OkdMOkIGt1dmlhLjwvbGk+PC91bD5gLFxuICAgICAgICBzaG9ydGN1dFRpdGxlOiBgUGlrYW7DpHBww6RpbnZpbmtrZWrDpGAsXG4gICAgICAgIHNob3J0Y3V0czogYDx0YWJsZT48dGJvZHk+XG48dHI+PHRoPkxpaXTDpCBrdXZhIGxlaWtlcMO2eWTDpGx0w6Q8L3RoPjx0ZD5DdHJsLVY8L3RkPjwvdHI+XG48dHI+PHRoPktpcmpvaXRhIGthYXZhPC90aD48dGQ+Q3RybC1FPC90ZD48L3RyPlxuPHRyPjx0aCBjb2xzcGFuPVwiMlwiPkthYXZhc3NhPC90aD48L3RyPlxuPHRyPjx0aD5KYWtvdmlpdmE8L3RoPjx0ZD4vPC90ZD48L3RyPlxuPHRyPjx0aD5LZXJ0b21lcmtraTwvdGg+PHRkPio8L3RkPjwvdHI+XG48dHI+PHRoPkVrc3BvbmVudHRpPC90aD48dGQ+XjwvdGQ+PC90cj5cbjx0cj48dGg+U3VsamUga2FhdmE8L3RoPjx0ZD5Fc2M8L3RkPjwvdHI+XG48dHI+PHRoPkxpc8Okw6Qga2FhdmEgc2V1cmFhdmFsbGUgcml2aWxsZTwvdGg+PHRkPkVudGVyPC90ZD48L3RyPlxuPC90Ym9keT5cbjwvdGFibGU+YCxcbiAgICAgICAgZm9ybWF0dGluZzogJ011b3RvaWx1JyxcbiAgICAgICAgc3BlY2lhbENoYXJhY3RlcnM6ICdFcmlrb2lzbWVya2l0JyxcbiAgICAgICAgaW5zZXJ0RXF1YXRpb246ICdMaXPDpMOkIGthYXZhJyxcbiAgICAgICAgY2xvc2U6ICdzdWxqZScsXG4gICAgICAgIHNhdmU6ICdUYWxsZW5uYScsXG4gICAgICAgIHVwZGF0ZWQ6ICdQw6Rpdml0ZXR0eScsXG4gICAgICAgIHNlbmRGZWVkYmFjazogJ0zDpGhldMOkIHBhbGF1dGV0dGEnLFxuICAgICAgICBsYW5nTGluazogJy9zdicsXG4gICAgICAgIGxhbmdMYWJlbDogJ1DDpSBzdmVuc2thJyxcbiAgICAgICAgYW5zd2VyVGl0bGU6ICdWYXN0YXVzJyxcbiAgICAgICAgdG9nZ2xlSW5zdHJ1Y3Rpb25zOiAnTsOkeXTDpCBvaGplZXQnXG4gICAgfSxcbiAgICBhbm5vdGF0aW5nOiB7XG4gICAgICAgIHNlbmRGZWVkYmFjazogJ0zDpGhldMOkIHBhbGF1dGV0dGEnLFxuICAgICAgICB1cGRhdGVkOiAnUMOkaXZpdGV0dHknLFxuICAgICAgICBtYXRoRWRpdG9yOiAnTWF0aWtrYWVkaXRvcmknLFxuICAgICAgICB0aXRsZTogJ0Fydm9zdGVsdScsXG4gICAgICAgIGJhY2tMaW5rOiAnLycsXG4gICAgICAgIGJhY2tMaW5rTGFiZWw6ICdQYWxhYSBrYWF2YWVkaXRvcmlpbicsXG4gICAgICAgIHNhdmU6ICdUYWxsZW5uYSBtZXJraW5uw6R0JyxcbiAgICAgICAgbGFuZ0xpbms6ICcvc3YvYmVkb21uaW5nJyxcbiAgICAgICAgbGFuZ0xhYmVsOiAnUMOlIHN2ZW5za2EnXG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZWRpdG9yOiB7XG4gICAgICAgIG1hdGhFZGl0b3I6ICdNYXRlbWF0aWtlZGl0b3InLFxuICAgICAgICB0aXRsZTogJ0Zvcm1lbGVkaXRvcm5zIHV0dmVja2xpbmdzdmVyc2lvbicsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBgPHVsPlxuPGxpPkVkaXRvcm4gZnVuZ2VyYXIgYsOkc3QgbWVkIGJyb3dzZXJuIEZpcmVmb3guPC9saT5cbiA8bGk+VW5kZXIga25hcHBlbiDigJxMw6RnZyB0aWxsIGZvcm1lbOKAnSBoaXR0YXIgZHUgZGUgdmFubGlnYXN0ZSBiZXRlY2tuaW5nYXJuYSBzb20gYW52w6RuZHMgaSBtYXRlbWF0aWssIGZ5c2lrIG9jaCBrZW1pLiBEZXNzdXRvbSBrYW4gZHUgYW52w6RuZGEgc3BlY2lhbHRlY2tlbiBmw7ZyIGF0dCBza3JpdmEgZm9ybWxlci48L2xpPlxuPGxpPkRldCBnw6VyIGF0dCBrb25zdHJ1ZXJhIGZvcm1sZXIgZ2Vub20gYXR0IGtsaWNrYSBww6UgYmV0ZWNrbmluZ2FybmEgaSBtZW55ZXJuYSBvY2gvZWxsZXIgZ2Vub20gYXR0IHNrcml2YSBMYVRlWC48L2xpPlxuPGxpPkRldCBnw6VyIGbDtnJ1dG9tIGF0dCBza3JpdmEgdGV4dCBvY2ggZm9ybWxlciwgYXR0IG9ja3PDpSBhdHQgbMOkZ2dhIHRpbGwgYmlsZGVyIGkgc3ZhcnNmw6RsdGV0LjwvbGk+PC91bD5gLFxuICAgICAgICBzaG9ydGN1dFRpdGxlOiBgVGlwcyBww6UgdGFuZ2VudGtvbWJpbmF0aW9uZXJgLFxuICAgICAgICBzaG9ydGN1dHM6IGA8dGFibGU+PHRib2R5PlxuPHRyPjx0aD5Mw6RnZyB0aWxsIGVuIGJpbGQgZnLDpW4gdXJrbGlwcGV0PC90aD48dGQ+Q3RybC1WPC90ZD48L3RyPlxuPHRyPjx0aD5Ta3JpdiBlbiBmb3JtZWw8L3RoPjx0ZD5DdHJsLUU8L3RkPjwvdHI+XG48dHI+PHRoIGNvbHNwYW49XCIyXCI+SSBmb3JtZWxuIDwvdGg+PC90cj5cbjx0cj48dGg+QnLDpWtzdHJlY2s8L3RoPjx0ZD4vPC90ZD48L3RyPlxuPHRyPjx0aD5NdWx0aXBsaWthdGlvbnN0ZWNrZW48L3RoPjx0ZD4qPC90ZD48L3RyPlxuPHRyPjx0aD5TdMOkbmcgZm9ybWVsbjwvdGg+PHRkPkVzYzwvdGQ+PC90cj5cbjwvdGJvZHk+XG48L3RhYmxlPmAsXG4gICAgICAgIGZvcm1hdHRpbmc6ICdGb3JtYXRlcmluZycsXG4gICAgICAgIHNwZWNpYWxDaGFyYWN0ZXJzOiAnU3BlY2lhbHRlY2tlbicsXG4gICAgICAgIGluc2VydEVxdWF0aW9uOiAnTMOkZ2cgdGlsbCBmb3JtZWwnLFxuICAgICAgICBjbG9zZTogJ3N0w6RuZycsXG4gICAgICAgIHNhdmU6ICdTcGFyYScsXG4gICAgICAgIHVwZGF0ZWQ6ICdVcHBkYXRlcmFkJyxcbiAgICAgICAgc2VuZEZlZWRiYWNrOiAnU2tpY2thIGZlZWRiYWNrJyxcbiAgICAgICAgbGFuZ0xpbms6ICcvJyxcbiAgICAgICAgbGFuZ0xhYmVsOiAnU3VvbWVrc2knLFxuICAgICAgICBhbnN3ZXJUaXRsZTogJ1N2YXInLFxuICAgICAgICB0b2dnbGVJbnN0cnVjdGlvbnM6ICdWaXNhIGludHJ1a3Rpb25lcidcbiAgICB9LFxuICAgIGFubm90YXRpbmc6IHtcbiAgICAgICAgc2VuZEZlZWRiYWNrOiAnU2tpY2thIHJlc3BvbnMnLFxuICAgICAgICB1cGRhdGVkOiAnVXBwZGF0ZXJhZCcsXG4gICAgICAgIG1hdGhFZGl0b3I6ICdNYXRlbWF0aWtlZGl0b3InLFxuICAgICAgICB0aXRsZTogJ0JlZMO2bW5pbmcnLFxuICAgICAgICBiYWNrTGluazogJy9zdicsXG4gICAgICAgIGJhY2tMaW5rTGFiZWw6ICdNYXRlbWF0aWtlZGl0b3InLFxuICAgICAgICBzYXZlOiAnU3BhcmEgYW50ZWNrbmluZ2FyJyxcbiAgICAgICAgbGFuZ0xpbms6ICcvdGFya2lzdHVzJyxcbiAgICAgICAgbGFuZ0xhYmVsOiAnU3VvbWVrc2knXG4gICAgfVxufVxuIiwiY29uc3QgbG9hZGluZ0ltZyA9IHJlcXVpcmUoJy4vbG9hZGluZ0ltZycpXG5jb25zdCB1ID0gcmVxdWlyZSgnLi91dGlsJylcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgb25QYXN0ZVxufVxuXG5jb25zdCBTQ1JFRU5TSE9UX0xJTUlUX0VSUk9SID0gKCkgPT4gbmV3IEJhY29uLkVycm9yKCdTY3JlZW5zaG90IGxpbWl0IHJlYWNoZWQhJylcblxuZnVuY3Rpb24gb25QYXN0ZShlLCBzYXZlciwgb25WYWx1ZUNoYW5nZWQsIGxpbWl0KSB7XG4gICAgY29uc3QgY2xpcGJvYXJkRGF0YSA9IGUub3JpZ2luYWxFdmVudC5jbGlwYm9hcmREYXRhXG4gICAgY29uc3QgZmlsZSA9IGNsaXBib2FyZERhdGEuaXRlbXMgJiYgY2xpcGJvYXJkRGF0YS5pdGVtc1swXS5nZXRBc0ZpbGUoKVxuICAgIGlmIChmaWxlKSB7XG4gICAgICAgIG9uUGFzdGVCbG9iKGUsIGZpbGUsIHNhdmVyLCAkKGUuY3VycmVudFRhcmdldCksIG9uVmFsdWVDaGFuZ2VkLCBsaW1pdClcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBjbGlwYm9hcmREYXRhQXNIdG1sID0gY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0L2h0bWwnKVxuICAgICAgICBpZiAoY2xpcGJvYXJkRGF0YUFzSHRtbCkgb25QYXN0ZUh0bWwoZSwgJChlLmN1cnJlbnRUYXJnZXQpLCBjbGlwYm9hcmREYXRhQXNIdG1sLCBsaW1pdCwgc2F2ZXIsIG9uVmFsdWVDaGFuZ2VkKVxuICAgICAgICBlbHNlIG9uTGVnYWN5UGFzdGVJbWFnZSgkKGUuY3VycmVudFRhcmdldCksIHNhdmVyLCBsaW1pdCwgb25WYWx1ZUNoYW5nZWQpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBvblBhc3RlQmxvYihldmVudCwgZmlsZSwgc2F2ZXIsICRhbnN3ZXIsIG9uVmFsdWVDaGFuZ2VkLCBsaW1pdCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICBpZiAoZmlsZS50eXBlID09PSAnaW1hZ2UvcG5nJykge1xuICAgICAgICBpZiAodS5leGlzdGluZ1NjcmVlbnNob3RDb3VudCgkYW5zd2VyKSArIDEgPD0gbGltaXQpIHtcbiAgICAgICAgICAgIHNhdmVyKHtkYXRhOiBmaWxlLCB0eXBlOiBmaWxlLnR5cGUsIGlkOiBTdHJpbmcobmV3IERhdGUoKS5nZXRUaW1lKCkpfSkudGhlbihzY3JlZW5zaG90VXJsID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBgPGltZyBzcmM9XCIke3NjcmVlbnNob3RVcmx9XCIvPmBcbiAgICAgICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydEhUTUwnLCBmYWxzZSwgaW1nKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9uVmFsdWVDaGFuZ2VkKFNDUkVFTlNIT1RfTElNSVRfRVJST1IoKSlcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gb25QYXN0ZUh0bWwoZXZlbnQsICRhbnN3ZXIsIGNsaXBib2FyZERhdGFBc0h0bWwsIGxpbWl0LCBzYXZlciwgb25WYWx1ZUNoYW5nZWQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgaWYgKHRvdGFsSW1hZ2VDb3VudCgkYW5zd2VyLCBjbGlwYm9hcmREYXRhQXNIdG1sKSA8PSBsaW1pdCkge1xuICAgICAgICB3aW5kb3cuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydEhUTUwnLCBmYWxzZSwgdS5zYW5pdGl6ZShjbGlwYm9hcmREYXRhQXNIdG1sKSlcbiAgICAgICAgcGVyc2lzdElubGluZUltYWdlcygkYW5zd2VyLCBzYXZlciwgbGltaXQsIG9uVmFsdWVDaGFuZ2VkKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIG9uVmFsdWVDaGFuZ2VkKFNDUkVFTlNIT1RfTElNSVRfRVJST1IoKSlcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG9uTGVnYWN5UGFzdGVJbWFnZSgkZWRpdG9yLCBzYXZlciwgbGltaXQsIG9uVmFsdWVDaGFuZ2VkKSB7XG4gICAgcGVyc2lzdElubGluZUltYWdlcygkZWRpdG9yLCBzYXZlciwgbGltaXQsIG9uVmFsdWVDaGFuZ2VkKVxufVxuXG5cbmZ1bmN0aW9uIGNoZWNrRm9ySW1hZ2VMaW1pdCgkZWRpdG9yLCBpbWFnZURhdGEsIGxpbWl0KSB7XG4gICAgcmV0dXJuIEJhY29uLm9uY2UodS5leGlzdGluZ1NjcmVlbnNob3RDb3VudCgkZWRpdG9yKSA+IGxpbWl0ID8gbmV3IEJhY29uLkVycm9yKCkgOiBpbWFnZURhdGEpXG59XG5cbmZ1bmN0aW9uIHBlcnNpc3RJbmxpbmVJbWFnZXMoJGVkaXRvciwgc2NyZWVuc2hvdFNhdmVyLCBzY3JlZW5zaG90Q291bnRMaW1pdCwgb25WYWx1ZUNoYW5nZWQpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IEJhY29uLmNvbWJpbmVBc0FycmF5KG1hcmtBbmRHZXRJbmxpbmVJbWFnZXMoJGVkaXRvcilcbiAgICAgICAgLm1hcChkYXRhID0+IGNoZWNrRm9ySW1hZ2VMaW1pdCgkZWRpdG9yLCBkYXRhLCBzY3JlZW5zaG90Q291bnRMaW1pdClcbiAgICAgICAgICAgIC5kb0Vycm9yKCgpID0+IG9uVmFsdWVDaGFuZ2VkKFNDUkVFTlNIT1RfTElNSVRfRVJST1IoKSkpXG4gICAgICAgICAgICAuZmxhdE1hcExhdGVzdCgoKSA9PiBCYWNvbi5mcm9tUHJvbWlzZShzY3JlZW5zaG90U2F2ZXIoZGF0YSkpKVxuICAgICAgICAgICAgLmRvQWN0aW9uKHNjcmVlblNob3RVcmwgPT4gZGF0YS4kZWwuYXR0cignc3JjJywgc2NyZWVuU2hvdFVybCkpXG4gICAgICAgICAgICAuZG9FcnJvcigoKSA9PiBkYXRhLiRlbC5yZW1vdmUoKSkpXG4gICAgKS5vblZhbHVlKGsgPT4gJGVkaXRvci50cmlnZ2VyKCdpbnB1dCcpKSwgMClcbn1cblxuZnVuY3Rpb24gdG90YWxJbWFnZUNvdW50KCRhbnN3ZXIsIGNsaXBib2FyZERhdGFBc0h0bWwpIHtcbiAgICByZXR1cm4gdS5leGlzdGluZ1NjcmVlbnNob3RDb3VudCgkYW5zd2VyKSArIHUuZXhpc3RpbmdTY3JlZW5zaG90Q291bnQoJChgPGRpdj4ke2NsaXBib2FyZERhdGFBc0h0bWx9PC9kaXY+YCkpXG59XG5cbmZ1bmN0aW9uIG1hcmtBbmRHZXRJbmxpbmVJbWFnZXMoJGVkaXRvcikge1xuICAgIGNvbnN0IGltYWdlcyA9ICRlZGl0b3IuZmluZCgnaW1nW3NyY149XCJkYXRhXCJdJykudG9BcnJheSgpXG4gICAgICAgIC5tYXAoKGVsLCBpbmRleCkgPT4gT2JqZWN0LmFzc2lnbihkZWNvZGVCYXNlNjRJbWFnZShlbC5nZXRBdHRyaWJ1dGUoJ3NyYycpKSwge1xuICAgICAgICAgICAgJGVsOiAkKGVsKVxuICAgICAgICB9KSlcbiAgICBpbWFnZXMuZmlsdGVyKCh7dHlwZX0pID0+IHR5cGUgIT09ICdpbWFnZS9wbmcnKS5mb3JFYWNoKCh7JGVsfSkgPT4gJGVsLnJlbW92ZSgpKVxuICAgIGNvbnN0IHBuZ0ltYWdlcyA9IGltYWdlcy5maWx0ZXIoKHt0eXBlfSkgPT4gdHlwZSA9PT0gJ2ltYWdlL3BuZycpXG4gICAgcG5nSW1hZ2VzLmZvckVhY2goKHskZWx9KSA9PiAkZWwuYXR0cignc3JjJywgbG9hZGluZ0ltZykpXG4gICAgcmV0dXJuIHBuZ0ltYWdlc1xufVxuXG5mdW5jdGlvbiBkZWNvZGVCYXNlNjRJbWFnZShkYXRhU3RyaW5nKSB7XG4gICAgaWYgKCFkYXRhU3RyaW5nKVxuICAgICAgICByZXR1cm4gbnVsbFxuICAgIGNvbnN0IG1hdGNoZXMgPSBkYXRhU3RyaW5nLm1hdGNoKC9eZGF0YTooW0EtWmEtei0rXFwvXSspO2Jhc2U2NCwoLispJC8pXG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoICE9PSAzKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IG1hdGNoZXNbMV0sXG4gICAgICAgIGRhdGE6IG5ldyBCdWZmZXIobWF0Y2hlc1syXSwgJ2Jhc2U2NCcpXG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gICAge2FjdGlvbjogJ1xcXFxzcXJ0JywgbGFiZWw6ICdcXFxcc3FydHtYfSd9LFxuICAgIHthY3Rpb246ICdeJywgbGFiZWw6ICd4XntYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcZnJhYycsIGxhYmVsOiAnXFxcXGZyYWN7WH17WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGludCcsIGxhYmVsOiAnXFxcXGludF97WH1ee1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxsaW1fJywgbGFiZWw6ICdcXFxcbGltX3tYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcbGltX3t4XFxcXHJpZ2h0YXJyb3dcXFxcaW5mdHl9JywgbGFiZWw6ICdcXFxcbGltX3t4XFxcXHJpZ2h0YXJyb3dcXFxcaW5mdHl9JywgdXNlV3JpdGU6dHJ1ZX0sXG4gICAge2FjdGlvbjogJ1xcXFxvdmVycmlnaHRhcnJvdycsIGxhYmVsOiAnXFxcXG92ZXJyaWdodGFycm93e1h9J30sXG4gICAge2FjdGlvbjogJ18nLCBsYWJlbDogJ3hfWCd9LFxuICAgIHthY3Rpb246ICdcXFxcbnRocm9vdCcsIGxhYmVsOiAnXFxcXHNxcnRbWF17WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXHN1bScsIGxhYmVsOiAnXFxcXHN1bV97WH1ee1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxiaW5vbScsIGxhYmVsOiAnXFxcXGJpbm9te1h9e1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxzaW4nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGNvcyd9LFxuICAgIHthY3Rpb246ICdcXFxcdGFuJ30sXG4gICAge2FjdGlvbjogJ1xcXFx2ZWMnLCBsYWJlbDogJ1xcXFx2ZWN7WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGJhcicsIGxhYmVsOiAnXFxcXGJhcntYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcmxpbmV7XFxcXHRleHR7aX19JywgdXNlV3JpdGU6IHRydWV9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcmxpbmV7XFxcXHRleHR7an19JywgdXNlV3JpdGU6IHRydWV9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcmxpbmV7XFxcXHRleHR7a319JywgdXNlV3JpdGU6IHRydWV9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcmxlZnRhcnJvdycsIGxhYmVsOiAnXFxcXG92ZXJsZWZ0YXJyb3d7WH0nfSxcbiAgICB7YWN0aW9uOiAnfCcsIGxhYmVsOiAnfFh8J30sXG4gICAge2FjdGlvbjogJygnLCBsYWJlbDogJyhYKSd9LFxuICAgIHthY3Rpb246ICdfeyB9XnsgfSAnLCBsYWJlbDogJ197WH1ee1h9WCcsIHVzZVdyaXRlOiB0cnVlfSxcbiAgICB7YWN0aW9uOiAnXFxcXG1hdGhybScsIGxhYmVsOiAnXFxcXG1hdGhybXtUfSd9LFxuXVxuIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEVBQVFBUFFBQVAvLy93QUFBUER3OElxS2l1RGc0RVpHUm5wNmVnQUFBRmhZV0NRa0pLeXNyTDYrdmhRVUZKeWNuQVFFQkRZMk5taG9hQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQ0grR2tOeVpXRjBaV1FnZDJsMGFDQmhhbUY0Ykc5aFpDNXBibVp2QUNINUJBQUtBQUFBSWY4TFRrVlVVME5CVUVVeUxqQURBUUFBQUN3QUFBQUFFQUFRQUFBRmR5QWdBZ0lKSWVXb0FrUkNDTWRCa0t0SUhJbmd5TUtzRXJQQlliQURwa1NDd2hEbVFDQmV0aFJCNlZqNGtGQ2tRUEc0SWxXRGdyTlJJd25PNFVLQlhEdWZ6UXZETWFvU0RCZ0ZiODg2TWlRYWRnTkFCQW9rZkN3ekJBOExDZzBFZ2w4akFnZ0dBQTFrQklBMUJBWXpseUlMY3pVTEMyVWhBQ0g1QkFBS0FBRUFMQUFBQUFBUUFCQUFBQVYySUNBQ0FtbEFaVG1PUkVFSXlVRVFqTEtLeFBIQURoRXZxeGxnY0dna0dJMURZU1ZBSUFXTXgrbHdTS2tJQ0owUXNIaTlSZ0tCd25WVGlSUVFnd0Y0STRVRkRRUUV3aTYvM1lTR1dSUm1qaEVFVEFKZklnTUZDbkFLTTBLRFY0RUVFQVFMaUYxOFRBWU5YRGFTZTN4Nm1qaWROMXMzSVFBaCtRUUFDZ0FDQUN3QUFBQUFFQUFRQUFBRmVDQWdBZ0xaREdVNWpnUkVDRVVpQ0kreWlvU0R3REp5TEtzWG9IRlF4QlNIQW9BQUZCaHF0TUpnOERnUUJnZnJFc0pBRUFnNFloWklFaXdnS3RIaU1CZ3RwZzN3YlVaWEdPN2tPYjFNVUtSRk15c0NDaEFvZ2dKQ0lnMEdDMmFOZTRncVFsZGZMNGwvQWcxQVh5U0pnbjVMY29FM1FYSTNJUUFoK1FRQUNnQURBQ3dBQUFBQUVBQVFBQUFGZGlBZ0FnTFpOR1U1am9RaENFanhJc3NxRW84YkM5QlJqeTlBZzdHSUxRNFFFb0UwZ0JBRUJjT3BjQkEwRG94U0svZThMUklIbitpMWNLMEl5S2RnMFZBb2xqWUlnK0dnblJyd1ZTLzhJQWtJQ3lvc0JJUXBCQU1vS3k5ZElteFBoUytHS2tGcmtYK1RpZ3RMbEl5S1hVRitOamFnTmlFQUlma0VBQW9BQkFBc0FBQUFBQkFBRUFBQUJXd2dJQUlDYVJobE9ZNEVJZ2pIOFI3TEtoS0hHd3NNdmI0QUF5M1dPREJJQkJLQ3NZQTlUanVoRE5ES0VWU0VSZXpRRUwwV3JoWHVjUlVRR3VpazdiRmxuZ3pxVlc5TE1sOVhXdkxkakZhSnRERnFaMWNFWlVCMGRVZ3ZMM2RnUDRXSlpuNGprb21XTnBTVEl5RUFJZmtFQUFvQUJRQXNBQUFBQUJBQUVBQUFCWDRnSUFJQ3VTeGxPWTZDSWdpRDhSckVLZ3FHT3d4d1VyTWxBb1N3SXpBR3BKcGdvU0RBR2lmRFk1a29wQllEbEVwQVFCd2V2eGZCdFJJVUdpOHh3V2tETkJDSXdtQzlWcTBhaVFRRFF1SytWZ1FQRFhWOWhDSmpCd2NGWVU1cEx3d0hYUWNNS1NtTkxRY0lBRXhsYkg4SkJ3dHRhWDBBQkFjTmJXVmJLeUVBSWZrRUFBb0FCZ0FzQUFBQUFCQUFFQUFBQlhrZ0lBSUNTUkJsT1k3Q0lnaE44emJFS3NLb0lqZEZ6WmFFZ1VCSEtDaE1KdFJ3Y1dwQVdvV25pZm02RVNBTWhPOGxRSzBFRUFWM3JGb3BJQkNFY0d3REtBcVBoNEhVclk0SUNISDFkU29URmdjSFVpWmpCaEFKQjJBSER5a3BLQXdIQXdkemYxOUtrQVNJUGw5Y0RnY25Ea2R0TndpTUpDc2hBQ0g1QkFBS0FBY0FMQUFBQUFBUUFCQUFBQVYzSUNBQ0Fra1FaVG1PQWlvc2l5QW94Q3ErS1B4Q05Wc1NNUmdCc2lDbFdyTFRTV0ZvSVFaSGw2cGxlQmg2c3V4S01JaGx2emJBd2tCV2ZGV3JCUVR4TkxxMlJHMnloU1VrRHMyYjYzQVlEQW9KWEFjRlJ3QURlQWtKRFgwQVFDc0VmQVFNREFJUEJ6MHJDZ2N4a3kwSlJXRTFBbXdwS3lFQUlma0VBQW9BQ0FBc0FBQUFBQkFBRUFBQUJYa2dJQUlDS1p6a3FKNG5RWnhMcVpLdjROcU5MS0syL1E0RWs0bEZYQ2hzZzV5cEpqczFJSTNnRURVU1JJbkVHWUF3NkI2ek00SmhyREF0RW9zVmtMVXRIQTdSSGFIQUdKUUVqc09EY0VnMEZCQUZWZ2tRSlExcEF3Y0REdzhLY0Z0U0lud0pBb3dDQ0E2Ukl3cVpBZ2tQTmdWcFduZGpkeW9oQUNINUJBQUtBQWtBTEFBQUFBQVFBQkFBQUFWNUlDQUNBaW1jNUtpZUxFdVVLdm0yeEFLTHFEQ2ZDMkdhTzllTDBMQUJXVGlCWW1BMDZXNmtIZ3ZDcUVKaUFJSml1M2djdmdVc3NjSFVFUm0ra2FDeHl4YSt6UlBrMFNnSkVnZkl2YkFkSUFRTENBWWxDajREQncwSUJRc01DaklxQkFjUEFvb0NCZzlwS2dzSkx3VUZPaENaS3lRREEzWXFJUUFoK1FRQUNnQUtBQ3dBQUFBQUVBQVFBQUFGZFNBZ0FnSXBuT1Nvbm14YnFpVGhDckpLRUhGYm84SnhERE9aWUZGYitBNDFFNEg0T2hrT2lwWHdCRWxZSVREQWNrRkVPQmdNUTNhcmtNa1VCZHhJVUdacEViN2thUUJSbEFTUGcwRlFRSEFiRUVNR0RTVkVBQTFRQmhBRUQxRTBOZ3dGQW9vQ0RXbGphUUlRQ0U1cU1IY05oQ2tqSVFBaCtRUUFDZ0FMQUN3QUFBQUFFQUFRQUFBRmVTQWdBZ0lwbk9Tb0xneHh2cWdLTEVjQ0M2NUtFQUJ5S0s4Y1NwQTREQWlIUS9Ea0toR0toNFpDdEN5WkdvNkY2aVlZUEFxRmdZeTAyeGtTYUxFTVYzNHRFTHlSWU5Fc0NReUhsdldrR0N6c1BnTUNFQVk3Q2cwNFVrNDhMQXNEaFJBOE1WUVBFRjBHQWdxWVl3U1JseWNOY1dza0NrQXBJeUVBT3dBQUFBQUFBQUFBQUR4aWNpQXZQZ284WWo1WFlYSnVhVzVuUEM5aVBqb2dJRzE1YzNGc1gzRjFaWEo1S0NrZ1d6eGhJR2h5WldZOUoyWjFibU4wYVc5dUxtMTVjM0ZzTFhGMVpYSjVKejVtZFc1amRHbHZiaTV0ZVhOeGJDMXhkV1Z5ZVR3dllUNWRPaUJEWVc0bmRDQmpiMjV1WldOMElIUnZJR3h2WTJGc0lFMTVVMUZNSUhObGNuWmxjaUIwYUhKdmRXZG9JSE52WTJ0bGRDQW5MM1poY2k5eWRXNHZiWGx6Y1d4a0wyMTVjM0ZzWkM1emIyTnJKeUFvTWlrZ2FXNGdQR0krTDJodmJXVXZZV3BoZUd4dllXUXZkM2QzTDJ4cFluSmhhWEpwWlhNdlkyeGhjM011YlhsemNXd3VjR2h3UEM5aVBpQnZiaUJzYVc1bElEeGlQalk0UEM5aVBqeGljaUF2UGdvOFluSWdMejRLUEdJK1YyRnlibWx1Wnp3dllqNDZJQ0J0ZVhOeGJGOXhkV1Z5ZVNncElGczhZU0JvY21WbVBTZG1kVzVqZEdsdmJpNXRlWE54YkMxeGRXVnllU2MrWm5WdVkzUnBiMjR1YlhsemNXd3RjWFZsY25rOEwyRStYVG9nUVNCc2FXNXJJSFJ2SUhSb1pTQnpaWEoyWlhJZ1kyOTFiR1FnYm05MElHSmxJR1Z6ZEdGaWJHbHphR1ZrSUdsdUlEeGlQaTlvYjIxbEwyRnFZWGhzYjJGa0wzZDNkeTlzYVdKeVlXbHlhV1Z6TDJOc1lYTnpMbTE1YzNGc0xuQm9jRHd2WWo0Z2IyNGdiR2x1WlNBOFlqNDJPRHd2WWo0OFluSWdMejRLUEdKeUlDOCtDanhpUGxkaGNtNXBibWM4TDJJK09pQWdiWGx6Y1d4ZmNYVmxjbmtvS1NCYlBHRWdhSEpsWmowblpuVnVZM1JwYjI0dWJYbHpjV3d0Y1hWbGNua25QbVoxYm1OMGFXOXVMbTE1YzNGc0xYRjFaWEo1UEM5aFBsMDZJRU5oYmlkMElHTnZibTVsWTNRZ2RHOGdiRzlqWVd3Z1RYbFRVVXdnYzJWeWRtVnlJSFJvY205MVoyZ2djMjlqYTJWMElDY3ZkbUZ5TDNKMWJpOXRlWE54YkdRdmJYbHpjV3hrTG5Odlkyc25JQ2d5S1NCcGJpQThZajR2YUc5dFpTOWhhbUY0Ykc5aFpDOTNkM2N2YkdsaWNtRnBjbWxsY3k5amJHRnpjeTV0ZVhOeGJDNXdhSEE4TDJJK0lHOXVJR3hwYm1VZ1BHSStOamc4TDJJK1BHSnlJQzgrQ2p4aWNpQXZQZ284WWo1WFlYSnVhVzVuUEM5aVBqb2dJRzE1YzNGc1gzRjFaWEo1S0NrZ1d6eGhJR2h5WldZOUoyWjFibU4wYVc5dUxtMTVjM0ZzTFhGMVpYSjVKejVtZFc1amRHbHZiaTV0ZVhOeGJDMXhkV1Z5ZVR3dllUNWRPaUJCSUd4cGJtc2dkRzhnZEdobElITmxjblpsY2lCamIzVnNaQ0J1YjNRZ1ltVWdaWE4wWVdKc2FYTm9aV1FnYVc0Z1BHSStMMmh2YldVdllXcGhlR3h2WVdRdmQzZDNMMnhwWW5KaGFYSnBaWE12WTJ4aGMzTXViWGx6Y1d3dWNHaHdQQzlpUGlCdmJpQnNhVzVsSUR4aVBqWTRQQzlpUGp4aWNpQXZQZ284WW5JZ0x6NEtQR0krVjJGeWJtbHVaend2WWo0NklDQnRlWE54YkY5eGRXVnllU2dwSUZzOFlTQm9jbVZtUFNkbWRXNWpkR2x2Ymk1dGVYTnhiQzF4ZFdWeWVTYytablZ1WTNScGIyNHViWGx6Y1d3dGNYVmxjbms4TDJFK1hUb2dRMkZ1SjNRZ1kyOXVibVZqZENCMGJ5QnNiMk5oYkNCTmVWTlJUQ0J6WlhKMlpYSWdkR2h5YjNWbmFDQnpiMk5yWlhRZ0p5OTJZWEl2Y25WdUwyMTVjM0ZzWkM5dGVYTnhiR1F1YzI5amF5Y2dLRElwSUdsdUlEeGlQaTlvYjIxbEwyRnFZWGhzYjJGa0wzZDNkeTlzYVdKeVlXbHlhV1Z6TDJOc1lYTnpMbTE1YzNGc0xuQm9jRHd2WWo0Z2IyNGdiR2x1WlNBOFlqNDJPRHd2WWo0OFluSWdMejRLUEdKeUlDOCtDanhpUGxkaGNtNXBibWM4TDJJK09pQWdiWGx6Y1d4ZmNYVmxjbmtvS1NCYlBHRWdhSEpsWmowblpuVnVZM1JwYjI0dWJYbHpjV3d0Y1hWbGNua25QbVoxYm1OMGFXOXVMbTE1YzNGc0xYRjFaWEo1UEM5aFBsMDZJRUVnYkdsdWF5QjBieUIwYUdVZ2MyVnlkbVZ5SUdOdmRXeGtJRzV2ZENCaVpTQmxjM1JoWW14cGMyaGxaQ0JwYmlBOFlqNHZhRzl0WlM5aGFtRjRiRzloWkM5M2QzY3ZiR2xpY21GcGNtbGxjeTlqYkdGemN5NXRlWE54YkM1d2FIQThMMkkrSUc5dUlHeHBibVVnUEdJK05qZzhMMkkrUEdKeUlDOCtDZz09XCJcbiIsImNvbnN0IHUgPSByZXF1aXJlKCcuL3V0aWwnKVxuY29uc3Qga2V5Q29kZXMgPSB7XG4gICAgRU5URVI6IDEzLFxuICAgIEVTQzogMjdcbn1cblxubGV0IE1RXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fVxubGV0IGZpcnN0VGltZSA9IHRydWVcblxuZnVuY3Rpb24gaW5pdCgkb3V0ZXJQbGFjZWhvbGRlciwgZm9jdXMpIHtcbiAgICBsZXQgdXBkYXRlTWF0aEltZ1RpbWVvdXRcblxuICAgIGlmKGZpcnN0VGltZSkge1xuICAgICAgICBNUSA9IE1hdGhRdWlsbC5nZXRJbnRlcmZhY2UoMilcbiAgICB9XG4gICAgY29uc3QgJG1hdGhFZGl0b3JDb250YWluZXIgPSAkKGBcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1hdGgtZWRpdG9yXCIgZGF0YS1qcz1cIm1hdGhFZGl0b3JcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYXRoLWVkaXRvci1lcXVhdGlvbi1maWVsZFwiIGRhdGEtanM9XCJlcXVhdGlvbkZpZWxkXCI+PC9kaXY+XG4gICAgICAgICAgICA8dGV4dGFyZWEgcm93cz1cIjFcIiBjbGFzcz1cIm1hdGgtZWRpdG9yLWxhdGV4LWZpZWxkXCIgZGF0YS1qcz1cImxhdGV4RmllbGRcIiBwbGFjZWhvbGRlcj1cIkxhVGV4XCI+PC90ZXh0YXJlYT5cbiAgICAgICAgPC9kaXY+YClcblxuICAgICRvdXRlclBsYWNlaG9sZGVyLmFwcGVuZCgkbWF0aEVkaXRvckNvbnRhaW5lcilcbiAgICBjb25zdCAkbGF0ZXhGaWVsZCA9ICRtYXRoRWRpdG9yQ29udGFpbmVyLmZpbmQoJ1tkYXRhLWpzPVwibGF0ZXhGaWVsZFwiXScpXG4gICAgY29uc3QgJGVxdWF0aW9uRmllbGQgPSAkbWF0aEVkaXRvckNvbnRhaW5lci5maW5kKCdbZGF0YS1qcz1cImVxdWF0aW9uRmllbGRcIl0nKVxuICAgIGxldCBtcUVkaXRUaW1lb3V0XG4gICAgbGV0IHZpc2libGUgPSBmYWxzZVxuICAgIGxldCBmb2N1c0NoYW5nZWQgPSBudWxsXG4gICAgLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzLEpTVW51c2VkTG9jYWxTeW1ib2xzXG4gICAgY29uc3QgbXFJbnN0YW5jZSA9IE1RLk1hdGhGaWVsZCgkZXF1YXRpb25GaWVsZC5nZXQoMCksIHtcbiAgICAgICAgaGFuZGxlcnM6IHtcbiAgICAgICAgICAgIGVkaXQ6IG9uTXFFZGl0LFxuICAgICAgICAgICAgZW50ZXI6IGZpZWxkID0+IHtcbiAgICAgICAgICAgICAgICBjbG9zZU1hdGhFZGl0b3IodHJ1ZSlcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGluc2VydE5ld0VxdWF0aW9uKCc8YnI+JyksIDIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxuICAgICRlcXVhdGlvbkZpZWxkXG4gICAgICAgIC5vbignaW5wdXQnLCAnLm1xLXRleHRhcmVhIHRleHRhcmVhJywgb25NcUVkaXQpXG4gICAgICAgIC5vbignZm9jdXMgYmx1cicsICcubXEtdGV4dGFyZWEgdGV4dGFyZWEnLCBlID0+IHtcbiAgICAgICAgICAgIGZvY3VzLmVxdWF0aW9uRmllbGQgPSBlLnR5cGUgIT09ICdibHVyJyAmJiBlLnR5cGUgIT09ICdmb2N1c291dCdcbiAgICAgICAgICAgIG9uRm9jdXNDaGFuZ2VkKClcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdrZXlkb3duJywgb25DbG9zZSlcbiAgICAgICAgLm9uKCdwYXN0ZScsIGUgPT4gZS5zdG9wUHJvcGFnYXRpb24oKSlcblxuXG4gICAgJGxhdGV4RmllbGRcbiAgICAgICAgLm9uKCdpbnB1dCBwYXN0ZScsIG9uTGF0ZXhVcGRhdGUpXG4gICAgICAgIC5vbignZm9jdXMgYmx1cicsIGUgPT4ge1xuICAgICAgICAgICAgZm9jdXMubGF0ZXhGaWVsZCA9IGUudHlwZSAhPT0gJ2JsdXInXG4gICAgICAgICAgICBvbkZvY3VzQ2hhbmdlZCgpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbigna2V5ZG93bicsIG9uQ2xvc2UpXG4gICAgICAgIC5vbigncGFzdGUnLCBlID0+IGUuc3RvcFByb3BhZ2F0aW9uKCkpXG5cbiAgICBmdW5jdGlvbiBvbkNsb3NlKGUpIHtcbiAgICAgICAgaWYgKHUuaXNDdHJsS2V5KGUsIGtleUNvZGVzLkVOVEVSKSB8fCB1LmlzS2V5KGUsIGtleUNvZGVzLkVTQykpIGNsb3NlTWF0aEVkaXRvcih0cnVlKVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGluc2VydE5ld0VxdWF0aW9uLFxuICAgICAgICBpbnNlcnRNYXRoLFxuICAgICAgICBvcGVuTWF0aEVkaXRvcixcbiAgICAgICAgY2xvc2VNYXRoRWRpdG9yXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25NcUVkaXQoZSkge1xuICAgICAgICBlICYmIGUub3JpZ2luYWxFdmVudCAmJiBlLm9yaWdpbmFsRXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgY2xlYXJUaW1lb3V0KG1xRWRpdFRpbWVvdXQpXG4gICAgICAgIG1xRWRpdFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmIChmb2N1cy5sYXRleEZpZWxkKVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgY29uc3QgbGF0ZXggPSBtcUluc3RhbmNlLmxhdGV4KClcbiAgICAgICAgICAgICRsYXRleEZpZWxkLnZhbChsYXRleClcbiAgICAgICAgICAgIHVwZGF0ZU1hdGhJbWdXaXRoRGVib3VuY2UoJG1hdGhFZGl0b3JDb250YWluZXIucHJldigpLCBsYXRleClcbiAgICAgICAgfSwgMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkxhdGV4VXBkYXRlKGUpIHtcbiAgICAgICAgZSAmJiBlLm9yaWdpbmFsRXZlbnQgJiYgZS5vcmlnaW5hbEV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgIHVwZGF0ZU1hdGhJbWdXaXRoRGVib3VuY2UoJG1hdGhFZGl0b3JDb250YWluZXIucHJldigpLCAkbGF0ZXhGaWVsZC52YWwoKSlcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBtcUluc3RhbmNlLmxhdGV4KCRsYXRleEZpZWxkLnZhbCgpKSwgMSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkZvY3VzQ2hhbmdlZCgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGZvY3VzQ2hhbmdlZClcbiAgICAgICAgZm9jdXNDaGFuZ2VkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAkbWF0aEVkaXRvckNvbnRhaW5lci50cmlnZ2VyKHsgdHlwZTonbWF0aGZvY3VzJywgaGFzRm9jdXM6IGZvY3VzLmxhdGV4RmllbGQgfHwgZm9jdXMuZXF1YXRpb25GaWVsZH0pXG4gICAgICAgICAgICBpZiAoIWZvY3VzLmxhdGV4RmllbGQgJiYgIWZvY3VzLmVxdWF0aW9uRmllbGQpIGNsb3NlTWF0aEVkaXRvcigpXG4gICAgICAgIH0sIDApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zZXJ0TmV3RXF1YXRpb24ob3B0aW9uYWxNYXJrdXAgPSAnJykge1xuICAgICAgICB3aW5kb3cuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydEhUTUwnLCBmYWxzZSwgb3B0aW9uYWxNYXJrdXAgKyAnPGltZyBkYXRhLWpzPVwibmV3XCIgYWx0PVwiXCIgc3JjPVwiXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lXCIvPicpXG4gICAgICAgIHNob3dNYXRoRWRpdG9yKCQoJ1tkYXRhLWpzPVwibmV3XCJdJykucmVtb3ZlQXR0cignZGF0YS1qcycpKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9wZW5NYXRoRWRpdG9yKCRpbWcpIHtcbiAgICAgICAgaWYgKHZpc2libGUpIGNsb3NlTWF0aEVkaXRvcigpXG4gICAgICAgIHUuc2V0Q3Vyc29yQWZ0ZXIoJGltZylcbiAgICAgICAgc2hvd01hdGhFZGl0b3IoJGltZylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaG93TWF0aEVkaXRvcigkaW1nKSB7XG4gICAgICAgICRpbWcuaGlkZSgpXG4gICAgICAgICRpbWcuYWZ0ZXIoJG1hdGhFZGl0b3JDb250YWluZXIpXG4gICAgICAgIHZpc2libGUgPSB0cnVlXG4gICAgICAgIHRvZ2dsZU1hdGhUb29sYmFyKHRydWUpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gbXFJbnN0YW5jZS5mb2N1cygpLCAwKVxuICAgICAgICAkbGF0ZXhGaWVsZC52YWwoJGltZy5wcm9wKCdhbHQnKSlcbiAgICAgICAgb25MYXRleFVwZGF0ZSgpXG4gICAgICAgIHUuc2Nyb2xsSW50b1ZpZXcoJG1hdGhFZGl0b3JDb250YWluZXIpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zZXJ0TWF0aChzeW1ib2wsIGFsdGVybmF0aXZlU3ltYm9sLCB1c2VXcml0ZSkge1xuICAgICAgICBpZiAoZm9jdXMubGF0ZXhGaWVsZCkge1xuICAgICAgICAgICAgdS5pbnNlcnRUb1RleHRBcmVhQXRDdXJzb3IoJGxhdGV4RmllbGQuZ2V0KDApLCBhbHRlcm5hdGl2ZVN5bWJvbCB8fCBzeW1ib2wpXG4gICAgICAgICAgICBvbkxhdGV4VXBkYXRlKClcbiAgICAgICAgfSBlbHNlIGlmIChmb2N1cy5lcXVhdGlvbkZpZWxkKSB7XG4gICAgICAgICAgICBpZiAodXNlV3JpdGUpIHtcbiAgICAgICAgICAgICAgICBtcUluc3RhbmNlLndyaXRlKHN5bWJvbClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbXFJbnN0YW5jZS50eXBlZFRleHQoc3ltYm9sKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKH5zeW1ib2wuaW5kZXhPZignXFxcXCcpKSBtcUluc3RhbmNlLmtleXN0cm9rZSgnVGFiJylcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gbXFJbnN0YW5jZS5mb2N1cygpLCAwKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTWF0aEltZygkaW1nLCBsYXRleCkge1xuICAgICAgICAkaW1nLnByb3Aoe1xuICAgICAgICAgICAgc3JjOiAnL21hdGguc3ZnP2xhdGV4PScgKyBlbmNvZGVVUklDb21wb25lbnQobGF0ZXgpLFxuICAgICAgICAgICAgYWx0OiBsYXRleFxuICAgICAgICB9KVxuICAgICAgICAkaW1nLmNsb3Nlc3QoJ1tkYXRhLWpzPVwiYW5zd2VyXCJdJykudHJpZ2dlcignaW5wdXQnKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZU1hdGhJbWdXaXRoRGVib3VuY2UoJGltZywgbGF0ZXgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHVwZGF0ZU1hdGhJbWdUaW1lb3V0KVxuICAgICAgICB1cGRhdGVNYXRoSW1nVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdXBkYXRlTWF0aEltZygkaW1nLCBsYXRleClcbiAgICAgICAgfSwgNTAwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlTWF0aEVkaXRvcihzZXRGb2N1c0FmdGVyQ2xvc2UgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCAkY3VycmVudEVkaXRvciA9ICRtYXRoRWRpdG9yQ29udGFpbmVyLmNsb3Nlc3QoJ1tkYXRhLWpzPVwiYW5zd2VyXCJdJylcbiAgICAgICAgY29uc3QgJGltZyA9ICRtYXRoRWRpdG9yQ29udGFpbmVyLnByZXYoKVxuICAgICAgICBpZiAoJGxhdGV4RmllbGQudmFsKCkudHJpbSgpID09PSAnJykge1xuICAgICAgICAgICAgJGltZy5yZW1vdmUoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGltZy5zaG93KClcbiAgICAgICAgICAgIHVwZGF0ZU1hdGhJbWcoJGltZywgJGxhdGV4RmllbGQudmFsKCkpXG4gICAgICAgIH1cblxuICAgICAgICB0b2dnbGVNYXRoVG9vbGJhcihmYWxzZSlcbiAgICAgICAgdmlzaWJsZSA9IGZhbHNlXG4gICAgICAgIGZvY3VzLmxhdGV4RmllbGQgPSBmYWxzZVxuICAgICAgICBmb2N1cy5lcXVhdGlvbkZpZWxkID0gZmFsc2VcbiAgICAgICAgJG1hdGhFZGl0b3JDb250YWluZXIudHJpZ2dlcih7IHR5cGU6J21hdGhmb2N1cycsIGhhc0ZvY3VzOiBmb2N1cy5sYXRleEZpZWxkIHx8IGZvY3VzLmVxdWF0aW9uRmllbGR9KVxuICAgICAgICAkb3V0ZXJQbGFjZWhvbGRlci5hcHBlbmQoJG1hdGhFZGl0b3JDb250YWluZXIpXG4gICAgICAgIGlmIChzZXRGb2N1c0FmdGVyQ2xvc2UpICRjdXJyZW50RWRpdG9yLmZvY3VzKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b2dnbGVNYXRoVG9vbGJhcihpc1Zpc2libGUpIHtcbiAgICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdtYXRoLWVkaXRvci1mb2N1cycsIGlzVmlzaWJsZSlcbiAgICB9XG59XG4iLCJjb25zdCB1ID0gcmVxdWlyZSgnLi91dGlsJylcbmNvbnN0IHRvb2xiYXJzID0gcmVxdWlyZSgnLi90b29sYmFycycpXG5jb25zdCBjbGlwYm9hcmQgPSByZXF1aXJlKCcuL2NsaXBib2FyZCcpXG5jb25zdCBtYXRoRWRpdG9yID0gcmVxdWlyZSgnLi9tYXRoLWVkaXRvcicpXG5jb25zdCBsb2NhbGVzID0ge1xuICAgIEZJOiByZXF1aXJlKCcuL0ZJJyksXG4gICAgU1Y6IHJlcXVpcmUoJy4vU1YnKVxufVxuY29uc3QgbCA9IGxvY2FsZXNbd2luZG93LmxvY2FsZSB8fCAnRkknXS5lZGl0b3JcbmNvbnN0IGtleUNvZGVzID0ge1xuICAgIEU6IDY5XG59XG5jb25zdCAkb3V0ZXJQbGFjZWhvbGRlciA9ICQoYDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLWhpZGRlblwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIiBkYXRhLWpzPVwib3V0ZXJQbGFjZWhvbGRlclwiPmApXG5jb25zdCBmb2N1cyA9IHtcbiAgICByaWNoVGV4dDogZmFsc2UsXG4gICAgbGF0ZXhGaWVsZDogZmFsc2UsXG4gICAgZXF1YXRpb25GaWVsZDogZmFsc2Vcbn1cbmxldCAkY3VycmVudEVkaXRvclxuXG5sZXQgZmlyc3RDYWxsID0gdHJ1ZVxubGV0IG1hdGhcbmxldCAkdG9vbGJhclxuXG5tb2R1bGUuZXhwb3J0cy5tYWtlUmljaFRleHQgPSAoYW5zd2VyLCBvcHRpb25zLCBvblZhbHVlQ2hhbmdlZCA9ICgpID0+IHt9KSA9PiB7XG4gICAgaWYgKGZpcnN0Q2FsbCkge1xuICAgICAgICBtYXRoID0gbWF0aEVkaXRvci5pbml0KCRvdXRlclBsYWNlaG9sZGVyLCBmb2N1cylcbiAgICAgICAgJHRvb2xiYXIgPSB0b29sYmFycy5pbml0KG1hdGgsICgpID0+IGZvY3VzLnJpY2hUZXh0LCBsKVxuICAgICAgICAkKCdib2R5JykuYXBwZW5kKCRvdXRlclBsYWNlaG9sZGVyLCAkdG9vbGJhcilcbiAgICAgICAgZmlyc3RDYWxsID0gZmFsc2VcbiAgICB9XG4gICAgb25WYWx1ZUNoYW5nZWQodS5zYW5pdGl6ZUNvbnRlbnQoYW5zd2VyKSlcbiAgICBjb25zdCB7XG4gICAgICAgIHNjcmVlbnNob3Q6IHtcbiAgICAgICAgICAgIHNhdmVyLFxuICAgICAgICAgICAgbGltaXRcbiAgICAgICAgfVxuICAgIH0gPSBvcHRpb25zXG4gICAgbGV0IHBhc3RlSW5Qcm9ncmVzcyA9IGZhbHNlXG5cbiAgICAkKGFuc3dlcilcbiAgICAgICAgLmF0dHIoe1xuICAgICAgICAgICAgY29udGVudGVkaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgc3BlbGxjaGVjazogZmFsc2UsXG4gICAgICAgICAgICAnZGF0YS1qcyc6ICdhbnN3ZXInXG4gICAgICAgIH0pXG4gICAgICAgIC5hZGRDbGFzcygncmljaC10ZXh0LWVkaXRvcicpXG4gICAgICAgIC5vbignY2xpY2snLCB1LmVxdWF0aW9uSW1hZ2VTZWxlY3RvciwgZSA9PiB7XG4gICAgICAgICAgICBpZihlLndoaWNoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgb25SaWNoVGV4dEVkaXRvckZvY3VzKCQoZS50YXJnZXQpLmNsb3Nlc3QoJ1tkYXRhLWpzPVwiYW5zd2VyXCJdJykpXG4gICAgICAgICAgICAgICAgbWF0aC5vcGVuTWF0aEVkaXRvcigkKGUudGFyZ2V0KSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKHUuaXNDdHJsS2V5KGUsIGtleUNvZGVzLkUpKSBtYXRoLmluc2VydE5ld0VxdWF0aW9uKClcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdtYXRoZm9jdXMnLCBlID0+IHtcbiAgICAgICAgICAgICQoZS5jdXJyZW50VGFyZ2V0KS50b2dnbGVDbGFzcygncmljaC10ZXh0LWZvY3VzZWQnLCBlLmhhc0ZvY3VzIClcbiAgICAgICAgICAgIGlmIChyaWNoVGV4dEFuZE1hdGhCbHVyKCkpIG9uUmljaFRleHRFZGl0b3JCbHVyKCRjdXJyZW50RWRpdG9yKVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2ZvY3VzIGJsdXInLCBlID0+IHtcbiAgICAgICAgICAgIGlmKGUudHlwZSA9PT0gJ2ZvY3VzJykgbWF0aC5jbG9zZU1hdGhFZGl0b3IoKVxuICAgICAgICAgICAgb25SaWNoVGV4dEVkaXRvckZvY3VzQ2hhbmdlZChlKVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2lucHV0JywgZSA9PiB7XG4gICAgICAgICAgICBpZiAoIXBhc3RlSW5Qcm9ncmVzcykgb25WYWx1ZUNoYW5nZWQodS5zYW5pdGl6ZUNvbnRlbnQoZS5jdXJyZW50VGFyZ2V0KSlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdkcm9wJywgZSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAkKGUudGFyZ2V0KS5odG1sKHUuc2FuaXRpemUoZS50YXJnZXQuaW5uZXJIVE1MKSlcbiAgICAgICAgICAgIH0sMClcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdwYXN0ZScsIGUgPT4ge1xuICAgICAgICAgICAgcGFzdGVJblByb2dyZXNzID0gdHJ1ZVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBwYXN0ZUluUHJvZ3Jlc3MgPSBmYWxzZSwgMClcbiAgICAgICAgICAgIGNsaXBib2FyZC5vblBhc3RlKGUsIHNhdmVyLCBvblZhbHVlQ2hhbmdlZCwgbGltaXQpXG4gICAgICAgIH0pXG4gICAgc2V0VGltZW91dCgoKSA9PiBkb2N1bWVudC5leGVjQ29tbWFuZChcImVuYWJsZU9iamVjdFJlc2l6aW5nXCIsIGZhbHNlLCBmYWxzZSksIDApXG59XG5cbmZ1bmN0aW9uIHRvZ2dsZVJpY2hUZXh0VG9vbGJhcihpc1Zpc2libGUsICRlZGl0b3IpIHtcbiAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ3JpY2gtdGV4dC1lZGl0b3ItZm9jdXMnLCBpc1Zpc2libGUpXG4gICAgJGVkaXRvci50b2dnbGVDbGFzcygncmljaC10ZXh0LWZvY3VzZWQnLCBpc1Zpc2libGUpXG59XG5cbmZ1bmN0aW9uIG9uUmljaFRleHRFZGl0b3JGb2N1cygkZWxlbWVudCkge1xuICAgICRjdXJyZW50RWRpdG9yID0gJGVsZW1lbnRcbiAgICB0b2dnbGVSaWNoVGV4dFRvb2xiYXIodHJ1ZSwgJGN1cnJlbnRFZGl0b3IpXG59XG5cbmZ1bmN0aW9uIG9uUmljaFRleHRFZGl0b3JCbHVyKCRlbGVtZW50KSB7XG4gICAgdG9nZ2xlUmljaFRleHRUb29sYmFyKGZhbHNlLCAkZWxlbWVudClcbiAgICBmb2N1cy5yaWNoVGV4dCA9IGZhbHNlXG59XG5cbmxldCByaWNoVGV4dEVkaXRvckJsdXJUaW1lb3V0XG5cbmZ1bmN0aW9uIG9uUmljaFRleHRFZGl0b3JGb2N1c0NoYW5nZWQoZSkge1xuICAgIGZvY3VzLnJpY2hUZXh0ID0gZS50eXBlID09PSAnZm9jdXMnXG4gICAgJChlLmN1cnJlbnRUYXJnZXQpLnRvZ2dsZUNsYXNzKCdyaWNoLXRleHQtZm9jdXNlZCcsIGZvY3VzLnJpY2hUZXh0IClcblxuICAgIGNsZWFyVGltZW91dChyaWNoVGV4dEVkaXRvckJsdXJUaW1lb3V0KVxuICAgIHJpY2hUZXh0RWRpdG9yQmx1clRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKHJpY2hUZXh0QW5kTWF0aEJsdXIoKSkgb25SaWNoVGV4dEVkaXRvckJsdXIoJChlLnRhcmdldCkpXG4gICAgICAgIGVsc2Ugb25SaWNoVGV4dEVkaXRvckZvY3VzKCQoZS50YXJnZXQpKVxuICAgIH0sIDApXG59XG5cbmZ1bmN0aW9uIHJpY2hUZXh0QW5kTWF0aEJsdXIoKSB7XG4gICAgcmV0dXJuICFmb2N1cy5yaWNoVGV4dCAmJiAhZm9jdXMubGF0ZXhGaWVsZCAmJiAhZm9jdXMuZXF1YXRpb25GaWVsZFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYWxsb3dlZFRhZ3M6IFtcbiAgICAgICAgJ2RpdicsXG4gICAgICAgICdpbWcnLFxuICAgICAgICAnYnInXG4gICAgXSxcbiAgICBhbGxvd2VkQXR0cmlidXRlczoge1xuICAgICAgICBpbWc6IFsnc3JjJywgJ2FsdCddXG4gICAgfSxcbiAgICBhbGxvd2VkU2NoZW1lczogWydkYXRhJ10sXG4gICAgZXhjbHVzaXZlRmlsdGVyOiBmcmFtZSA9PiBmcmFtZS5hdHRyaWJzWydkYXRhLWpzJ10gPT09ICdtYXRoRWRpdG9yJ1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gICAge1xuICAgICAgICBsYWJlbDogJ1BlcnVzbWVyaXQgamEga3JlaWtrYWxhaXNldCBhYWtrb3NldCcsXG4gICAgICAgIGNoYXJhY3RlcnM6IFtcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnwrAnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8K3JywgbGF0ZXhDb21tYW5kOiAnXFxcXGNkb3QnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8KxJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBtJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiJ4nLCBsYXRleENvbW1hbmQ6ICdcXFxcaW5mdHknLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8KyJywgbGF0ZXhDb21tYW5kOiAnXjInLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8KzJywgbGF0ZXhDb21tYW5kOiAnXjMnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8K9JywgbGF0ZXhDb21tYW5kOiAnMS8yJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihZMnLCBsYXRleENvbW1hbmQ6ICcxLzMnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8+AJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBpJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOsScsIGxhdGV4Q29tbWFuZDogJ1xcXFxhbHBoYScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzrInLCBsYXRleENvbW1hbmQ6ICdcXFxcYmV0YScsIHBvcHVsYXI6IHRydWUgIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86TJywgbGF0ZXhDb21tYW5kOiAnXFxcXEdhbW1hJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOsycsIGxhdGV4Q29tbWFuZDogJ1xcXFxnYW1tYScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzpQnLCBsYXRleENvbW1hbmQ6ICdcXFxcRGVsdGEnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ860JywgbGF0ZXhDb21tYW5kOiAnXFxcXGRlbHRhJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOtScsIGxhdGV4Q29tbWFuZDogJ1xcXFx2YXJlcHNpbG9uJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOticsIGxhdGV4Q29tbWFuZDogJ1xcXFx6ZXRhJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOtycsIGxhdGV4Q29tbWFuZDogJ1xcXFxldGEnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86YJywgbGF0ZXhDb21tYW5kOiAnXFxcXFRoZXRhJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfPkScsIGxhdGV4Q29tbWFuZDogJ1xcXFx2YXJ0aGV0YScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn8J2chCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxpb3RhJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOuicsIGxhdGV4Q29tbWFuZDogJ1xcXFxrYXBwYScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzpsnLCBsYXRleENvbW1hbmQ6ICdcXFxcTGFtYmRhJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOuycsIGxhdGV4Q29tbWFuZDogJ1xcXFxsYW1iZGEnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8K1JywgbGF0ZXhDb21tYW5kOiAnXFxcXG11JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOnicsIGxhdGV4Q29tbWFuZDogJ1xcXFxYaScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzr4nLCBsYXRleENvbW1hbmQ6ICdcXFxceGknIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIjycsIGxhdGV4Q29tbWFuZDogJ1xcXFxQaScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnz4EnLCBsYXRleENvbW1hbmQ6ICdcXFxccmhvJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiJEnLCBsYXRleENvbW1hbmQ6ICdcXFxcU2lnbWEnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8+DJywgbGF0ZXhDb21tYW5kOiAnXFxcXHNpZ21hJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfPhCcsIGxhdGV4Q29tbWFuZDogJ1xcXFx0YXUnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86lJywgbGF0ZXhDb21tYW5kOiAnXFxcXFVwc2lsb24nIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8+FJywgbGF0ZXhDb21tYW5kOiAnXFxcXHVwc2lsb24nIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86mJywgbGF0ZXhDb21tYW5kOiAnXFxcXFBoaScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn0KQnLCBsYXRleENvbW1hbmQ6ICdcXFxccGhpJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfPhycsIGxhdGV4Q29tbWFuZDogJ1xcXFxjaGknIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86oJywgbGF0ZXhDb21tYW5kOiAnXFxcXFBzaScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnz4gnLCBsYXRleENvbW1hbmQ6ICdcXFxccHNpJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOqScsIGxhdGV4Q29tbWFuZDogJ1xcXFxPbWVnYScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnz4knLCBsYXRleENvbW1hbmQ6ICdcXFxcb21lZ2EnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIgicsIGxhdGV4Q29tbWFuZDogJ1xcXFxwYXJ0aWFsJyB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbGFiZWw6ICdBbGdlYnJhJyxcbiAgICAgICAgY2hhcmFjdGVyczogW1xuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiaAnLCBsYXRleENvbW1hbmQ6ICdcXFxcbmVxJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiYgnLCBsYXRleENvbW1hbmQ6ICdcXFxcYXBwcm94JywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiaQnLCBsYXRleENvbW1hbmQ6ICdcXFxcbGVxJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiaUnLCBsYXRleENvbW1hbmQ6ICdcXFxcZ2VxJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiLwnLCBsYXRleENvbW1hbmQ6ICdcXFxcc2ltJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiaEnLCBsYXRleENvbW1hbmQ6ICdcXFxcZXF1aXYnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KJoicgfSwgLy8gXFxuZXF1aXYgb3IgXFxub3RcXGVxdWl2XG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KImCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxjaXJjJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfigKYnLCBsYXRleENvbW1hbmQ6ICdcXFxcbGRvdHMnIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBsYWJlbDogJ0dlb21ldHJpYSBqYSB2ZWt0b3Jpb3BwaScsXG4gICAgICAgIGNoYXJhY3RlcnM6IFtcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oigJywgbGF0ZXhDb21tYW5kOiAnXFxcXGFuZ2xlJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihpInLCBsYXRleENvbW1hbmQ6ICdcXFxccmlnaHRhcnJvdycsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oeFJywgcG9wdWxhcjogdHJ1ZSAgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oaRJywgbGF0ZXhDb21tYW5kOiAnXFxcXHVwYXJyb3cnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KGkycsIGxhdGV4Q29tbWFuZDogJ1xcXFxkb3duYXJyb3cnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KGlCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxsZWZ0cmlnaHRhcnJvdycgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oqlJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBlcnAnfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oCWJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBhcmFsbGVsJ30sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KHjCcgfSwgLy8gXFxyaWdodGxlZnRoYXJwb29uc1xuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICd8JyB9IC8vIFxccGlwZVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGxhYmVsOiAnTG9naWlra2EgamEgam91a2tvLW9wcGknLFxuICAgICAgICBjaGFyYWN0ZXJzOiBbXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KHkicsIGxhdGV4Q29tbWFuZDogJ1xcXFxSaWdodGFycm93JywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfih5QnLCBsYXRleENvbW1hbmQ6ICdcXFxcTGVmdHJpZ2h0YXJyb3cnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIgycsIGxhdGV4Q29tbWFuZDogJ1xcXFxleGlzdHMnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIgCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxmb3JhbGwnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KEnScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oSVJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihKQnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KEmicgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oipJywgbGF0ZXhDb21tYW5kOiAnXFxcXGNhcCcgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiqJywgbGF0ZXhDb21tYW5kOiAnXFxcXGN1cCcgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiWJywgbGF0ZXhDb21tYW5kOiAnXFxcXHNldG1pbnVzJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiioInLCBsYXRleENvbW1hbmQ6ICdcXFxcc3Vic2V0JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiioQnLCBsYXRleENvbW1hbmQ6ICdcXFxcbm90c3Vic2V0JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiIgnLCBsYXRleENvbW1hbmQ6ICdcXFxcaW4nIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIiScsIGxhdGV4Q29tbWFuZDogJ1xcXFxub3RpbicgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiFJywgbGF0ZXhDb21tYW5kOiAnXFxcXGVtcHR5JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiKcnLCBsYXRleENvbW1hbmQ6ICdcXFxcYW5kJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiKgnLCBsYXRleENvbW1hbmQ6ICdcXFxcb3InIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8KsJyB9XG4gICAgICAgIF1cbiAgICB9XG5dXG4iLCJjb25zdCBzcGVjaWFsQ2hhcmFjdGVyR3JvdXBzID0gcmVxdWlyZSgnLi9zcGVjaWFsQ2hhcmFjdGVycycpXG5jb25zdCBsYXRleENvbW1hbmRzID0gcmVxdWlyZSgnLi9sYXRleENvbW1hbmRzJylcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaW5pdCxcbn1cblxuZnVuY3Rpb24gaW5pdChtYXRoRWRpdG9yLCBoYXNSaWNoVGV4dEZvY3VzLCBsKSB7XG4gICAgY29uc3QgJHRvb2xiYXIgPSAkKGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbHNcIiBkYXRhLWpzPVwidG9vbHNcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xzLWJ1dHRvbi13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhci13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLWNoYXJhY3RlcnMtZXhwYW5kLWNvbGxhcHNlXCIgZGF0YS1qcz1cImV4cGFuZENvbGxhcHNlQ2hhcmFjdGVyc1wiIHN0eWxlPVwiei1pbmRleDogMTAwXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xzLXJvd1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xiYXItd3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29sYmFyLWNoYXJhY3RlcnMgcmljaC10ZXh0LWVkaXRvci10b29sYmFyIHJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhci1idXR0b24tbGlzdFwiIGRhdGEtanM9XCJjaGFyYWN0ZXJzTGlzdFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29scy1yb3dcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29sYmFyLXdyYXBwZXIgcmljaC10ZXh0LWVkaXRvci1lcXVhdGlvbi13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xiYXItZXF1YXRpb24gcmljaC10ZXh0LWVkaXRvci10b29sYmFyIHJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhci1idXR0b24tbGlzdFwiIGRhdGEtanM9XCJtYXRoVG9vbGJhclwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29scy1idXR0b24td3JhcHBlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xiYXItd3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci1uZXctZXF1YXRpb24gcmljaC10ZXh0LWVkaXRvci1idXR0b24gcmljaC10ZXh0LWVkaXRvci1idXR0b24tYWN0aW9uXCIgZGF0YS1qcz1cIm5ld0VxdWF0aW9uXCIgZGF0YS1jb21tYW5kPVwiQ3RybC1FXCI+zqMgJHtsLmluc2VydEVxdWF0aW9ufTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBgKVxuICAgICAgICAub24oJ21vdXNlZG93bicsICdbZGF0YS1qcz1cImV4cGFuZENvbGxhcHNlQ2hhcmFjdGVyc1wiXScsIGUgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAkdG9vbGJhci50b2dnbGVDbGFzcygncmljaC10ZXh0LWVkaXRvci1jaGFyYWN0ZXJzLWV4cGFuZGVkJylcbiAgICAgICAgfSlcblxuICAgIGNvbnN0ICRuZXdFcXVhdGlvbiA9ICR0b29sYmFyLmZpbmQoJ1tkYXRhLWpzPVwibmV3RXF1YXRpb25cIl0nKVxuICAgIGNvbnN0ICRtYXRoVG9vbGJhciA9ICR0b29sYmFyLmZpbmQoJ1tkYXRhLWpzPVwibWF0aFRvb2xiYXJcIl0nKVxuICAgIGluaXRTcGVjaWFsQ2hhcmFjdGVyVG9vbGJhcigkdG9vbGJhciwgbWF0aEVkaXRvciwgaGFzUmljaFRleHRGb2N1cylcbiAgICBpbml0TWF0aFRvb2xiYXIoJG1hdGhUb29sYmFyLCBtYXRoRWRpdG9yKVxuICAgIGluaXROZXdFcXVhdGlvbigkbmV3RXF1YXRpb24sIG1hdGhFZGl0b3IsIGhhc1JpY2hUZXh0Rm9jdXMpXG5cbiAgICByZXR1cm4gJHRvb2xiYXJcbn1cblxuY29uc3Qgc3BlY2lhbENoYXJhY3RlclRvQnV0dG9uID0gY2hhciA9PiBgPGJ1dHRvbiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItYnV0dG9uIHJpY2gtdGV4dC1lZGl0b3ItYnV0dG9uLWdyaWQke2NoYXIucG9wdWxhciA/ICcgcmljaC10ZXh0LWVkaXRvci1jaGFyYWN0ZXJzLXBvcHVsYXInIDonJ31cIiAke2NoYXIubGF0ZXhDb21tYW5kID8gYGRhdGEtY29tbWFuZD1cIiR7Y2hhci5sYXRleENvbW1hbmR9XCJgIDogJyd9PiR7Y2hhci5jaGFyYWN0ZXJ9PC9idXR0b24+YFxuXG5jb25zdCBwb3B1bGFySW5Hcm91cCA9IGdyb3VwID0+IGdyb3VwLmNoYXJhY3RlcnMuZmlsdGVyKGNoYXJhY3RlciA9PiBjaGFyYWN0ZXIucG9wdWxhcikubGVuZ3RoXG5cbmZ1bmN0aW9uIGluaXRTcGVjaWFsQ2hhcmFjdGVyVG9vbGJhcigkdG9vbGJhciwgbWF0aEVkaXRvciwgaGFzQW5zd2VyRm9jdXMpIHtcbiAgICBjb25zdCBncmlkQnV0dG9uV2lkdGhQeCA9IDM1XG5cbiAgICAkdG9vbGJhci5maW5kKCdbZGF0YS1qcz1cImNoYXJhY3RlcnNMaXN0XCJdJylcbiAgICAgICAgLmFwcGVuZChzcGVjaWFsQ2hhcmFjdGVyR3JvdXBzLm1hcChncm91cCA9PlxuICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xiYXItY2hhcmFjdGVycy1ncm91cFwiIFxuICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogJHtwb3B1bGFySW5Hcm91cChncm91cCkgKiBncmlkQnV0dG9uV2lkdGhQeH1weFwiPlxuICAgICAgICAgICAgICAgICAgJHtncm91cC5jaGFyYWN0ZXJzLm1hcChzcGVjaWFsQ2hhcmFjdGVyVG9CdXR0b24pLmpvaW4oJycpfVxuICAgICAgICAgICAgIDwvZGl2PmApKVxuICAgICAgICAub24oJ21vdXNlZG93bicsICdidXR0b24nLCBlID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgICAgICBjb25zdCBjaGFyYWN0ZXIgPSBlLmN1cnJlbnRUYXJnZXQuaW5uZXJUZXh0XG4gICAgICAgICAgICBjb25zdCBjb21tYW5kID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY29tbWFuZFxuICAgICAgICAgICAgaWYgKGhhc0Fuc3dlckZvY3VzKCkpIHdpbmRvdy5kb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0VGV4dCcsIGZhbHNlLCBjaGFyYWN0ZXIpXG4gICAgICAgICAgICBlbHNlIG1hdGhFZGl0b3IuaW5zZXJ0TWF0aChjb21tYW5kIHx8IGNoYXJhY3RlcilcbiAgICAgICAgfSlcbn1cblxuZnVuY3Rpb24gaW5pdE1hdGhUb29sYmFyKCRtYXRoVG9vbGJhciwgbWF0aEVkaXRvcikge1xuICAgICRtYXRoVG9vbGJhci5hcHBlbmQobGF0ZXhDb21tYW5kc1xuICAgICAgICAubWFwKG8gPT4gYDxidXR0b24gY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLWJ1dHRvbiByaWNoLXRleHQtZWRpdG9yLWJ1dHRvbi1ncmlkXCIgZGF0YS1jb21tYW5kPVwiJHtvLmFjdGlvbn1cIiBkYXRhLWxhdGV4Y29tbWFuZD1cIiR7by5sYWJlbCB8fCAnJ31cIiBkYXRhLXVzZXdyaXRlPVwiJHtvLnVzZVdyaXRlIHx8IGZhbHNlfVwiPlxuPGltZyBzcmM9XCIvbWF0aC5zdmc/bGF0ZXg9JHtlbmNvZGVVUklDb21wb25lbnQoby5sYWJlbCA/IG8ubGFiZWwucmVwbGFjZSgvWC9nLCAnXFxcXHNxdWFyZScpIDogby5hY3Rpb24pfVwiLz5cbjwvYnV0dG9uPmApLmpvaW4oJycpXG4gICAgKS5vbignbW91c2Vkb3duJywgJ2J1dHRvbicsIGUgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgY29uc3QgZGF0YXNldCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0O1xuICAgICAgICBtYXRoRWRpdG9yLmluc2VydE1hdGgoZGF0YXNldC5jb21tYW5kLCBkYXRhc2V0LmxhdGV4Y29tbWFuZCwgZGF0YXNldC51c2V3cml0ZSA9PT0gJ3RydWUnKVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGluaXROZXdFcXVhdGlvbigkbmV3RXF1YXRpb24sIG1hdGhFZGl0b3IsIGhhc0Fuc3dlckZvY3VzKSB7XG4gICAgJG5ld0VxdWF0aW9uLm1vdXNlZG93bigoZSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBpZiAoIWhhc0Fuc3dlckZvY3VzKCkpIHJldHVybiAvLyBUT0RPOiByZW1vdmUgd2hlbiBidXR0b24gaXMgb25seSB2aXNpYmxlIHdoZW4gdGV4dGFyZWEgaGFzIGZvY3VzXG4gICAgICAgIG1hdGhFZGl0b3IuaW5zZXJ0TmV3RXF1YXRpb24oKVxuICAgIH0pLmJpbmQodGhpcykpXG59XG4iLCJjb25zdCBzYW5pdGl6ZUh0bWwgPSByZXF1aXJlKCdzYW5pdGl6ZS1odG1sJylcbmNvbnN0IHNhbml0aXplT3B0cyA9IHJlcXVpcmUoJy4vc2FuaXRpemVPcHRzJylcbmNvbnN0IGVxdWF0aW9uSW1hZ2VTZWxlY3RvciA9ICdpbWdbc3JjXj1cIi9tYXRoLnN2Z1wiXSdcbmNvbnN0IHNjcmVlbnNob3RJbWFnZVNlbGVjdG9yID0gJ2ltZ1tzcmNePVwiL3NjcmVlbnNob3QvXCJdJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpc0tleSxcbiAgICBpc0N0cmxLZXksXG4gICAgaW5zZXJ0VG9UZXh0QXJlYUF0Q3Vyc29yLFxuICAgIHNhbml0aXplLFxuICAgIHNhbml0aXplQ29udGVudCxcbiAgICBzZXRDdXJzb3JBZnRlcixcbiAgICBlcXVhdGlvbkltYWdlU2VsZWN0b3IsXG4gICAgZXhpc3RpbmdTY3JlZW5zaG90Q291bnQsXG4gICAgc2Nyb2xsSW50b1ZpZXdcbn1cblxuZnVuY3Rpb24gY29udmVydExpbmtzVG9SZWxhdGl2ZShodG1sKSB7XG4gICAgcmV0dXJuIGh0bWwucmVwbGFjZShuZXcgUmVnRXhwKGRvY3VtZW50LmxvY2F0aW9uLm9yaWdpbiwgJ2cnKSwgJycpXG59XG5cbmZ1bmN0aW9uIHNhbml0aXplKGh0bWwpIHtcbiAgICByZXR1cm4gc2FuaXRpemVIdG1sKGNvbnZlcnRMaW5rc1RvUmVsYXRpdmUoaHRtbCksIHNhbml0aXplT3B0cylcbn1cbmZ1bmN0aW9uIGluc2VydFRvVGV4dEFyZWFBdEN1cnNvcihmaWVsZCwgdmFsdWUpIHtcbiAgICBjb25zdCBzdGFydFBvcyA9IGZpZWxkLnNlbGVjdGlvblN0YXJ0XG4gICAgY29uc3QgZW5kUG9zID0gZmllbGQuc2VsZWN0aW9uRW5kXG4gICAgbGV0IG9sZFZhbHVlID0gZmllbGQudmFsdWVcbiAgICBmaWVsZC52YWx1ZSA9IG9sZFZhbHVlLnN1YnN0cmluZygwLCBzdGFydFBvcykgKyB2YWx1ZSArIG9sZFZhbHVlLnN1YnN0cmluZyhlbmRQb3MsIG9sZFZhbHVlLmxlbmd0aClcbiAgICBmaWVsZC5zZWxlY3Rpb25TdGFydCA9IGZpZWxkLnNlbGVjdGlvbkVuZCA9IHN0YXJ0UG9zICsgdmFsdWUubGVuZ3RoXG59XG5cbmZ1bmN0aW9uIGlzS2V5KGUsIGtleSkge1xuICAgIHJldHVybiBwcmV2ZW50SWZUcnVlKGUsICFlLmFsdEtleSAmJiAhZS5zaGlmdEtleSAmJiAhZS5jdHJsS2V5ICYmIGtleU9yS2V5Q29kZShlLCBrZXkpKVxufVxuXG5mdW5jdGlvbiBpc0N0cmxLZXkoZSwga2V5KSB7XG4gICAgcmV0dXJuIHByZXZlbnRJZlRydWUoZSwgIWUuYWx0S2V5ICYmICFlLnNoaWZ0S2V5ICYmIGUuY3RybEtleSAmJiBrZXlPcktleUNvZGUoZSwga2V5KSlcbn1cblxuZnVuY3Rpb24ga2V5T3JLZXlDb2RlKGUsIHZhbCkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJyA/IGUua2V5ID09PSB2YWwgOiBlLmtleUNvZGUgPT09IHZhbFxufVxuZnVuY3Rpb24gcHJldmVudElmVHJ1ZShlLCB2YWwpIHtcbiAgICBpZiAodmFsKSBlLnByZXZlbnREZWZhdWx0KClcbiAgICByZXR1cm4gdmFsXG59XG5cbmZ1bmN0aW9uIHNhbml0aXplQ29udGVudChhbnN3ZXJFbGVtZW50KSB7XG4gICAgY29uc3QgJGFuc3dlckVsZW1lbnQgPSAkKGFuc3dlckVsZW1lbnQpXG4gICAgY29uc3QgJG1hdGhFZGl0b3IgPSAkYW5zd2VyRWxlbWVudC5maW5kKCdbZGF0YS1qcz1cIm1hdGhFZGl0b3JcIl0nKVxuICAgICRtYXRoRWRpdG9yLmhpZGUoKVxuICAgIGNvbnN0IHRleHQgPSAkYW5zd2VyRWxlbWVudC5nZXQoMCkuaW5uZXJUZXh0XG4gICAgJG1hdGhFZGl0b3Iuc2hvdygpXG5cbiAgICBjb25zdCBodG1sID0gc2FuaXRpemUoJGFuc3dlckVsZW1lbnQuaHRtbCgpKVxuXG4gICAgY29uc3QgYW5zd2VyQ29uc2lkZXJlZEVtcHR5ID0gKHRleHQudHJpbSgpLmxlbmd0aCArICRhbnN3ZXJFbGVtZW50LmZpbmQoZXF1YXRpb25JbWFnZVNlbGVjdG9yKS5sZW5ndGggKyAkYW5zd2VyRWxlbWVudC5maW5kKHNjcmVlbnNob3RJbWFnZVNlbGVjdG9yKS5sZW5ndGgpID09PSAwXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhbnN3ZXJIVE1MOiBhbnN3ZXJDb25zaWRlcmVkRW1wdHkgPyAnJyA6IGh0bWwsXG4gICAgICAgIGFuc3dlclRleHQ6IHRleHQsXG4gICAgICAgIGltYWdlQ291bnQ6IGV4aXN0aW5nU2NyZWVuc2hvdENvdW50KCQoYDxkaXY+JHtodG1sfTwvZGl2PmApKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gc2V0Q3Vyc29yQWZ0ZXIoJGltZykge1xuICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKVxuICAgIGNvbnN0IGltZyA9ICRpbWcuZ2V0KDApXG4gICAgcmFuZ2Uuc2V0U3RhcnRBZnRlcihpbWcpXG4gICAgY29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpXG4gICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpXG4gICAgc2VsLmFkZFJhbmdlKHJhbmdlKVxufVxuXG5mdW5jdGlvbiBleGlzdGluZ1NjcmVlbnNob3RDb3VudCgkZWRpdG9yKSB7XG4gICAgY29uc3QgaW1hZ2VDb3VudCA9ICRlZGl0b3IuZmluZCgnaW1nJykubGVuZ3RoXG4gICAgY29uc3QgZW1wdHlJbWFnZUNvdW50ID0gJGVkaXRvci5maW5kKCdpbWdbc3JjPVwiXCJdJykubGVuZ3RoXG4gICAgY29uc3QgZXF1YXRpb25Db3VudCA9ICRlZGl0b3IuZmluZChlcXVhdGlvbkltYWdlU2VsZWN0b3IpLmxlbmd0aFxuICAgIHJldHVybiBpbWFnZUNvdW50IC0gZXF1YXRpb25Db3VudCAtIGVtcHR5SW1hZ2VDb3VudFxufVxuXG5mdW5jdGlvbiBzY3JvbGxJbnRvVmlldygkZWxlbWVudCkge1xuICAgIGNvbnN0ICR3aW5kb3cgPSAkKHdpbmRvdylcbiAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSAkd2luZG93LmhlaWdodCgpIC0gNDBcbiAgICBjb25zdCBzY3JvbGwgPSB3aW5kb3dIZWlnaHQgKyAkd2luZG93LnNjcm9sbFRvcCgpXG4gICAgY29uc3QgcG9zID0gJGVsZW1lbnQub2Zmc2V0KCkudG9wICsgJGVsZW1lbnQuaGVpZ2h0KClcbiAgICBpZiAoc2Nyb2xsIDwgcG9zKSB7XG4gICAgICAgICR3aW5kb3cuc2Nyb2xsVG9wKHBvcyAtIHdpbmRvd0hlaWdodClcbiAgICB9XG59XG4iXX0=
