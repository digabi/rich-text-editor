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
var fileTypes = ['image/png', 'image/jpeg'];

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
    if (fileTypes.indexOf(file.type) >= 0) {
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
        return fileTypes.indexOf(type) === -1;
    }).forEach(function (_ref2) {
        var $el = _ref2.$el;
        return $el.remove();
    });
    var pngImages = images.filter(function (_ref3) {
        var type = _ref3.type;
        return fileTypes.indexOf(type) >= 0;
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

function init($outerPlaceholder, focus, baseUrl) {
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
            src: baseUrl + '/math.svg?latex=' + encodeURIComponent(latex),
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

    var saver = options.screenshot.saver;
    var limit = options.screenshot.limit;
    var baseUrl = options.baseUrl || '';

    if (firstCall) {
        math = mathEditor.init($outerPlaceholder, focus, baseUrl);
        $toolbar = toolbars.init(math, function () {
            return focus.richText;
        }, l, baseUrl);
        $('body').append($outerPlaceholder, $toolbar);
        firstCall = false;
    }
    onValueChanged(u.sanitizeContent(answer));
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

function init(mathEditor, hasRichTextFocus, l, baseUrl) {
    var $toolbar = $('\n        <div class="rich-text-editor-tools" data-js="tools" style="display: none">\n            <div class="rich-text-editor-tools-button-wrapper">\n                <div class="rich-text-editor-toolbar-wrapper">\n                    <button class="rich-text-editor-characters-expand-collapse" data-js="expandCollapseCharacters" style="z-index: 100"></button>\n                </div>\n            </div>\n            <div class="rich-text-editor-tools-row">\n                <div class="rich-text-editor-toolbar-wrapper">\n                    <div class="rich-text-editor-toolbar-characters rich-text-editor-toolbar rich-text-editor-toolbar-button-list" data-js="charactersList"></div>\n                </div>\n            </div>\n            <div class="rich-text-editor-tools-row">\n                <div class="rich-text-editor-toolbar-wrapper rich-text-editor-equation-wrapper">\n                    <div class="rich-text-editor-toolbar-equation rich-text-editor-toolbar rich-text-editor-toolbar-button-list" data-js="mathToolbar"></div>\n                </div>\n            </div>\n            <div class="rich-text-editor-tools-button-wrapper">\n                <div class="rich-text-editor-toolbar-wrapper">\n                    <button class="rich-text-editor-new-equation rich-text-editor-button rich-text-editor-button-action" data-js="newEquation" data-command="Ctrl-E">\u03A3 ' + l.insertEquation + '</button>\n                </div>\n            </div>\n        </div>\n        ').on('mousedown', '[data-js="expandCollapseCharacters"]', function (e) {
        e.preventDefault();
        $toolbar.toggleClass('rich-text-editor-characters-expanded');
    });

    var $newEquation = $toolbar.find('[data-js="newEquation"]');
    var $mathToolbar = $toolbar.find('[data-js="mathToolbar"]');
    initSpecialCharacterToolbar($toolbar, mathEditor, hasRichTextFocus);
    initMathToolbar($mathToolbar, mathEditor, baseUrl);
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

function initMathToolbar($mathToolbar, mathEditor, baseUrl) {
    $mathToolbar.append(latexCommands.map(function (o) {
        return '<button class="rich-text-editor-button rich-text-editor-button-grid" data-command="' + o.action + '" data-latexcommand="' + (o.label || '') + '" data-usewrite="' + (o.useWrite || false) + '">\n<img src="' + baseUrl + '/math.svg?latex=' + encodeURIComponent(o.label ? o.label.replace(/X/g, '\\square') : o.action) + '"/>\n</button>';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvRkkuanMiLCJhcHAvU1YuanMiLCJhcHAvY2xpcGJvYXJkLmpzIiwiYXBwL2xhdGV4Q29tbWFuZHMuanMiLCJhcHAvbG9hZGluZ0ltZy5qcyIsImFwcC9tYXRoLWVkaXRvci5qcyIsImFwcC9yaWNoLXRleHQtZWRpdG9yLmpzIiwiYXBwL3Nhbml0aXplT3B0cy5qcyIsImFwcC9zcGVjaWFsQ2hhcmFjdGVycy5qcyIsImFwcC90b29sYmFycy5qcyIsImFwcC91dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxPQUFPLE9BQVAsR0FBaUI7QUFDYixZQUFRO0FBQ0osb0JBQVksZ0JBRFI7QUFFSixlQUFPLDZCQUZIO0FBR0osa2hCQUhJO0FBV0oscURBWEk7QUFZSixrY0FaSTtBQXVCSixvQkFBWSxVQXZCUjtBQXdCSiwyQkFBbUIsZUF4QmY7QUF5Qkosd0JBQWdCLGFBekJaO0FBMEJKLGVBQU8sT0ExQkg7QUEyQkosY0FBTSxVQTNCRjtBQTRCSixpQkFBUyxZQTVCTDtBQTZCSixzQkFBYyxtQkE3QlY7QUE4Qkosa0JBQVUsS0E5Qk47QUErQkosbUJBQVcsWUEvQlA7QUFnQ0oscUJBQWEsU0FoQ1Q7QUFpQ0osNEJBQW9CO0FBakNoQixLQURLO0FBb0NiLGdCQUFZO0FBQ1Isc0JBQWMsbUJBRE47QUFFUixpQkFBUyxZQUZEO0FBR1Isb0JBQVksZ0JBSEo7QUFJUixlQUFPLFdBSkM7QUFLUixrQkFBVSxHQUxGO0FBTVIsdUJBQWUsc0JBTlA7QUFPUixjQUFNLG9CQVBFO0FBUVIsa0JBQVUsZUFSRjtBQVNSLG1CQUFXO0FBVEg7QUFwQ0MsQ0FBakI7Ozs7O0FDQUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsWUFBUTtBQUNKLG9CQUFZLGlCQURSO0FBRUosZUFBTyxtQ0FGSDtBQUdKLDZoQkFISTtBQVFKLHdEQVJJO0FBU0osMFdBVEk7QUFrQkosb0JBQVksYUFs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cEM7QUFDQSxRQUFJLFNBQVMsR0FBYixFQUFrQjtBQUNkLGdCQUFRLFNBQVIsQ0FBa0IsTUFBTSxZQUF4QjtBQUNIO0FBQ0oiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZWRpdG9yOiB7XG4gICAgICAgIG1hdGhFZGl0b3I6ICdNYXRpa2thZWRpdG9yaScsXG4gICAgICAgIHRpdGxlOiAnS2FhdmFlZGl0b3JpbiBrZWhpdHlzdmVyc2lvJyxcbiAgICAgICAgZGVzY3JpcHRpb246IGA8dWw+XG48bGk+RWRpdG9yaSB0b2ltaWkgcGFyaGFpdGVuIEZpcmVmb3gtc2VsYWltZWxsYS48L2xpPlxuPGxpPuKAnExpc8Okw6Qga2FhdmHigJ0gLW5hcGluIGFsdGEgbMO2eWTDpHQgeWxlaXNpbXBpw6QgbWF0ZW1hdGlpa2Fzc2EsIGZ5c2lpa2Fzc2EgamFcbmtlbWlhc3NhIGvDpHl0ZXR0w6R2acOkIG1lcmtpbnTDtmrDpC4gTGlzw6Rrc2kgZXJpa29pc21lcmtrZWrDpCB2b2kga8OkeXR0w6TDpCBrYWF2YW4ga2lyam9pdHRhbWlzZWVuLjwvbGk+XG4gPGxpPkthYXZvamEgdm9pIHJha2VudGFhXG5rbGlra2FhbWFsbGEgdmFsaWtvbiBtZXJraW50w7Zqw6QgamEvdGFpIGtpcmpvaXR0YW1hbGxhIExhVGVYaWEuPC9saT5cbiA8bGk+RWRpdG9yaW4gdmFzdGF1c2tlbnR0w6TDpG4gdm9pIGtpcmpvaXR0YWEgdGVrc3Rpw6QgamEga2Fhdm9qYSBzZWvDpFxubGlzw6R0w6Qga3V2aWEuPC9saT48L3VsPmAsXG4gICAgICAgIHNob3J0Y3V0VGl0bGU6IGBQaWthbsOkcHDDpGludmlua2tlasOkYCxcbiAgICAgICAgc2hvcnRjdXRzOiBgPHRhYmxlPjx0Ym9keT5cbjx0cj48dGg+TGlpdMOkIGt1dmEgbGVpa2Vww7Z5ZMOkbHTDpDwvdGg+PHRkPkN0cmwtVjwvdGQ+PC90cj5cbjx0cj48dGg+S2lyam9pdGEga2FhdmE8L3RoPjx0ZD5DdHJsLUU8L3RkPjwvdHI+XG48dHI+PHRoIGNvbHNwYW49XCIyXCI+S2FhdmFzc2E8L3RoPjwvdHI+XG48dHI+PHRoPkpha292aWl2YTwvdGg+PHRkPi88L3RkPjwvdHI+XG48dHI+PHRoPktlcnRvbWVya2tpPC90aD48dGQ+KjwvdGQ+PC90cj5cbjx0cj48dGg+RWtzcG9uZW50dGk8L3RoPjx0ZD5ePC90ZD48L3RyPlxuPHRyPjx0aD5TdWxqZSBrYWF2YTwvdGg+PHRkPkVzYzwvdGQ+PC90cj5cbjx0cj48dGg+TGlzw6TDpCBrYWF2YSBzZXVyYWF2YWxsZSByaXZpbGxlPC90aD48dGQ+RW50ZXI8L3RkPjwvdHI+XG48L3Rib2R5PlxuPC90YWJsZT5gLFxuICAgICAgICBmb3JtYXR0aW5nOiAnTXVvdG9pbHUnLFxuICAgICAgICBzcGVjaWFsQ2hhcmFjdGVyczogJ0VyaWtvaXNtZXJraXQnLFxuICAgICAgICBpbnNlcnRFcXVhdGlvbjogJ0xpc8Okw6Qga2FhdmEnLFxuICAgICAgICBjbG9zZTogJ3N1bGplJyxcbiAgICAgICAgc2F2ZTogJ1RhbGxlbm5hJyxcbiAgICAgICAgdXBkYXRlZDogJ1DDpGl2aXRldHR5JyxcbiAgICAgICAgc2VuZEZlZWRiYWNrOiAnTMOkaGV0w6QgcGFsYXV0ZXR0YScsXG4gICAgICAgIGxhbmdMaW5rOiAnL3N2JyxcbiAgICAgICAgbGFuZ0xhYmVsOiAnUMOlIHN2ZW5za2EnLFxuICAgICAgICBhbnN3ZXJUaXRsZTogJ1Zhc3RhdXMnLFxuICAgICAgICB0b2dnbGVJbnN0cnVjdGlvbnM6ICdOw6R5dMOkIG9oamVldCdcbiAgICB9LFxuICAgIGFubm90YXRpbmc6IHtcbiAgICAgICAgc2VuZEZlZWRiYWNrOiAnTMOkaGV0w6QgcGFsYXV0ZXR0YScsXG4gICAgICAgIHVwZGF0ZWQ6ICdQw6Rpdml0ZXR0eScsXG4gICAgICAgIG1hdGhFZGl0b3I6ICdNYXRpa2thZWRpdG9yaScsXG4gICAgICAgIHRpdGxlOiAnQXJ2b3N0ZWx1JyxcbiAgICAgICAgYmFja0xpbms6ICcvJyxcbiAgICAgICAgYmFja0xpbmtMYWJlbDogJ1BhbGFhIGthYXZhZWRpdG9yaWluJyxcbiAgICAgICAgc2F2ZTogJ1RhbGxlbm5hIG1lcmtpbm7DpHQnLFxuICAgICAgICBsYW5nTGluazogJy9zdi9iZWRvbW5pbmcnLFxuICAgICAgICBsYW5nTGFiZWw6ICdQw6Ugc3ZlbnNrYSdcbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBlZGl0b3I6IHtcbiAgICAgICAgbWF0aEVkaXRvcjogJ01hdGVtYXRpa2VkaXRvcicsXG4gICAgICAgIHRpdGxlOiAnRm9ybWVsZWRpdG9ybnMgdXR2ZWNrbGluZ3N2ZXJzaW9uJyxcbiAgICAgICAgZGVzY3JpcHRpb246IGA8dWw+XG48bGk+RWRpdG9ybiBmdW5nZXJhciBiw6RzdCBtZWQgYnJvd3Nlcm4gRmlyZWZveC48L2xpPlxuIDxsaT5VbmRlciBrbmFwcGVuIOKAnEzDpGdnIHRpbGwgZm9ybWVs4oCdIGhpdHRhciBkdSBkZSB2YW5saWdhc3RlIGJldGVja25pbmdhcm5hIHNvbSBhbnbDpG5kcyBpIG1hdGVtYXRpaywgZnlzaWsgb2NoIGtlbWkuIERlc3N1dG9tIGthbiBkdSBhbnbDpG5kYSBzcGVjaWFsdGVja2VuIGbDtnIgYXR0IHNrcml2YSBmb3JtbGVyLjwvbGk+XG48bGk+RGV0IGfDpXIgYXR0IGtvbnN0cnVlcmEgZm9ybWxlciBnZW5vbSBhdHQga2xpY2thIHDDpSBiZXRlY2tuaW5nYXJuYSBpIG1lbnllcm5hIG9jaC9lbGxlciBnZW5vbSBhdHQgc2tyaXZhIExhVGVYLjwvbGk+XG48bGk+RGV0IGfDpXIgZsO2cnV0b20gYXR0IHNrcml2YSB0ZXh0IG9jaCBmb3JtbGVyLCBhdHQgb2Nrc8OlIGF0dCBsw6RnZ2EgdGlsbCBiaWxkZXIgaSBzdmFyc2bDpGx0ZXQuPC9saT48L3VsPmAsXG4gICAgICAgIHNob3J0Y3V0VGl0bGU6IGBUaXBzIHDDpSB0YW5nZW50a29tYmluYXRpb25lcmAsXG4gICAgICAgIHNob3J0Y3V0czogYDx0YWJsZT48dGJvZHk+XG48dHI+PHRoPkzDpGdnIHRpbGwgZW4gYmlsZCBmcsOlbiB1cmtsaXBwZXQ8L3RoPjx0ZD5DdHJsLVY8L3RkPjwvdHI+XG48dHI+PHRoPlNrcml2IGVuIGZvcm1lbDwvdGg+PHRkPkN0cmwtRTwvdGQ+PC90cj5cbjx0cj48dGggY29sc3Bhbj1cIjJcIj5JIGZvcm1lbG4gPC90aD48L3RyPlxuPHRyPjx0aD5CcsOla3N0cmVjazwvdGg+PHRkPi88L3RkPjwvdHI+XG48dHI+PHRoPk11bHRpcGxpa2F0aW9uc3RlY2tlbjwvdGg+PHRkPio8L3RkPjwvdHI+XG48dHI+PHRoPlN0w6RuZyBmb3JtZWxuPC90aD48dGQ+RXNjPC90ZD48L3RyPlxuPC90Ym9keT5cbjwvdGFibGU+YCxcbiAgICAgICAgZm9ybWF0dGluZzogJ0Zvcm1hdGVyaW5nJyxcbiAgICAgICAgc3BlY2lhbENoYXJhY3RlcnM6ICdTcGVjaWFsdGVja2VuJyxcbiAgICAgICAgaW5zZXJ0RXF1YXRpb246ICdMw6RnZyB0aWxsIGZvcm1lbCcsXG4gICAgICAgIGNsb3NlOiAnc3TDpG5nJyxcbiAgICAgICAgc2F2ZTogJ1NwYXJhJyxcbiAgICAgICAgdXBkYXRlZDogJ1VwcGRhdGVyYWQnLFxuICAgICAgICBzZW5kRmVlZGJhY2s6ICdTa2lja2EgZmVlZGJhY2snLFxuICAgICAgICBsYW5nTGluazogJy8nLFxuICAgICAgICBsYW5nTGFiZWw6ICdTdW9tZWtzaScsXG4gICAgICAgIGFuc3dlclRpdGxlOiAnU3ZhcicsXG4gICAgICAgIHRvZ2dsZUluc3RydWN0aW9uczogJ1Zpc2EgaW50cnVrdGlvbmVyJ1xuICAgIH0sXG4gICAgYW5ub3RhdGluZzoge1xuICAgICAgICBzZW5kRmVlZGJhY2s6ICdTa2lja2EgcmVzcG9ucycsXG4gICAgICAgIHVwZGF0ZWQ6ICdVcHBkYXRlcmFkJyxcbiAgICAgICAgbWF0aEVkaXRvcjogJ01hdGVtYXRpa2VkaXRvcicsXG4gICAgICAgIHRpdGxlOiAnQmVkw7ZtbmluZycsXG4gICAgICAgIGJhY2tMaW5rOiAnL3N2JyxcbiAgICAgICAgYmFja0xpbmtMYWJlbDogJ01hdGVtYXRpa2VkaXRvcicsXG4gICAgICAgIHNhdmU6ICdTcGFyYSBhbnRlY2tuaW5nYXInLFxuICAgICAgICBsYW5nTGluazogJy90YXJraXN0dXMnLFxuICAgICAgICBsYW5nTGFiZWw6ICdTdW9tZWtzaSdcbiAgICB9XG59XG4iLCJjb25zdCBsb2FkaW5nSW1nID0gcmVxdWlyZSgnLi9sb2FkaW5nSW1nJylcbmNvbnN0IHUgPSByZXF1aXJlKCcuL3V0aWwnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBvblBhc3RlXG59XG5cbmNvbnN0IFNDUkVFTlNIT1RfTElNSVRfRVJST1IgPSAoKSA9PiBuZXcgQmFjb24uRXJyb3IoJ1NjcmVlbnNob3QgbGltaXQgcmVhY2hlZCEnKVxuY29uc3QgZmlsZVR5cGVzID0gWydpbWFnZS9wbmcnLCAnaW1hZ2UvanBlZyddXG5cbmZ1bmN0aW9uIG9uUGFzdGUoZSwgc2F2ZXIsIG9uVmFsdWVDaGFuZ2VkLCBsaW1pdCkge1xuICAgIGNvbnN0IGNsaXBib2FyZERhdGEgPSBlLm9yaWdpbmFsRXZlbnQuY2xpcGJvYXJkRGF0YVxuICAgIGNvbnN0IGZpbGUgPSBjbGlwYm9hcmREYXRhLml0ZW1zICYmIGNsaXBib2FyZERhdGEuaXRlbXNbMF0uZ2V0QXNGaWxlKClcbiAgICBpZiAoZmlsZSkge1xuICAgICAgICBvblBhc3RlQmxvYihlLCBmaWxlLCBzYXZlciwgJChlLmN1cnJlbnRUYXJnZXQpLCBvblZhbHVlQ2hhbmdlZCwgbGltaXQpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY2xpcGJvYXJkRGF0YUFzSHRtbCA9IGNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dC9odG1sJylcbiAgICAgICAgaWYgKGNsaXBib2FyZERhdGFBc0h0bWwpIG9uUGFzdGVIdG1sKGUsICQoZS5jdXJyZW50VGFyZ2V0KSwgY2xpcGJvYXJkRGF0YUFzSHRtbCwgbGltaXQsIHNhdmVyLCBvblZhbHVlQ2hhbmdlZClcbiAgICAgICAgZWxzZSBvbkxlZ2FjeVBhc3RlSW1hZ2UoJChlLmN1cnJlbnRUYXJnZXQpLCBzYXZlciwgbGltaXQsIG9uVmFsdWVDaGFuZ2VkKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gb25QYXN0ZUJsb2IoZXZlbnQsIGZpbGUsIHNhdmVyLCAkYW5zd2VyLCBvblZhbHVlQ2hhbmdlZCwgbGltaXQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgaWYgKGZpbGVUeXBlcy5pbmRleE9mKGZpbGUudHlwZSkgPj0gMCkge1xuICAgICAgICBpZiAodS5leGlzdGluZ1NjcmVlbnNob3RDb3VudCgkYW5zd2VyKSArIDEgPD0gbGltaXQpIHtcbiAgICAgICAgICAgIHNhdmVyKHtkYXRhOiBmaWxlLCB0eXBlOiBmaWxlLnR5cGUsIGlkOiBTdHJpbmcobmV3IERhdGUoKS5nZXRUaW1lKCkpfSkudGhlbihzY3JlZW5zaG90VXJsID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBgPGltZyBzcmM9XCIke3NjcmVlbnNob3RVcmx9XCIvPmBcbiAgICAgICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydEhUTUwnLCBmYWxzZSwgaW1nKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9uVmFsdWVDaGFuZ2VkKFNDUkVFTlNIT1RfTElNSVRfRVJST1IoKSlcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gb25QYXN0ZUh0bWwoZXZlbnQsICRhbnN3ZXIsIGNsaXBib2FyZERhdGFBc0h0bWwsIGxpbWl0LCBzYXZlciwgb25WYWx1ZUNoYW5nZWQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgaWYgKHRvdGFsSW1hZ2VDb3VudCgkYW5zd2VyLCBjbGlwYm9hcmREYXRhQXNIdG1sKSA8PSBsaW1pdCkge1xuICAgICAgICB3aW5kb3cuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydEhUTUwnLCBmYWxzZSwgdS5zYW5pdGl6ZShjbGlwYm9hcmREYXRhQXNIdG1sKSlcbiAgICAgICAgcGVyc2lzdElubGluZUltYWdlcygkYW5zd2VyLCBzYXZlciwgbGltaXQsIG9uVmFsdWVDaGFuZ2VkKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIG9uVmFsdWVDaGFuZ2VkKFNDUkVFTlNIT1RfTElNSVRfRVJST1IoKSlcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG9uTGVnYWN5UGFzdGVJbWFnZSgkZWRpdG9yLCBzYXZlciwgbGltaXQsIG9uVmFsdWVDaGFuZ2VkKSB7XG4gICAgcGVyc2lzdElubGluZUltYWdlcygkZWRpdG9yLCBzYXZlciwgbGltaXQsIG9uVmFsdWVDaGFuZ2VkKVxufVxuXG5cbmZ1bmN0aW9uIGNoZWNrRm9ySW1hZ2VMaW1pdCgkZWRpdG9yLCBpbWFnZURhdGEsIGxpbWl0KSB7XG4gICAgcmV0dXJuIEJhY29uLm9uY2UodS5leGlzdGluZ1NjcmVlbnNob3RDb3VudCgkZWRpdG9yKSA+IGxpbWl0ID8gbmV3IEJhY29uLkVycm9yKCkgOiBpbWFnZURhdGEpXG59XG5cbmZ1bmN0aW9uIHBlcnNpc3RJbmxpbmVJbWFnZXMoJGVkaXRvciwgc2NyZWVuc2hvdFNhdmVyLCBzY3JlZW5zaG90Q291bnRMaW1pdCwgb25WYWx1ZUNoYW5nZWQpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IEJhY29uLmNvbWJpbmVBc0FycmF5KG1hcmtBbmRHZXRJbmxpbmVJbWFnZXMoJGVkaXRvcilcbiAgICAgICAgLm1hcChkYXRhID0+IGNoZWNrRm9ySW1hZ2VMaW1pdCgkZWRpdG9yLCBkYXRhLCBzY3JlZW5zaG90Q291bnRMaW1pdClcbiAgICAgICAgICAgIC5kb0Vycm9yKCgpID0+IG9uVmFsdWVDaGFuZ2VkKFNDUkVFTlNIT1RfTElNSVRfRVJST1IoKSkpXG4gICAgICAgICAgICAuZmxhdE1hcExhdGVzdCgoKSA9PiBCYWNvbi5mcm9tUHJvbWlzZShzY3JlZW5zaG90U2F2ZXIoZGF0YSkpKVxuICAgICAgICAgICAgLmRvQWN0aW9uKHNjcmVlblNob3RVcmwgPT4gZGF0YS4kZWwuYXR0cignc3JjJywgc2NyZWVuU2hvdFVybCkpXG4gICAgICAgICAgICAuZG9FcnJvcigoKSA9PiBkYXRhLiRlbC5yZW1vdmUoKSkpXG4gICAgKS5vblZhbHVlKGsgPT4gJGVkaXRvci50cmlnZ2VyKCdpbnB1dCcpKSwgMClcbn1cblxuZnVuY3Rpb24gdG90YWxJbWFnZUNvdW50KCRhbnN3ZXIsIGNsaXBib2FyZERhdGFBc0h0bWwpIHtcbiAgICByZXR1cm4gdS5leGlzdGluZ1NjcmVlbnNob3RDb3VudCgkYW5zd2VyKSArIHUuZXhpc3RpbmdTY3JlZW5zaG90Q291bnQoJChgPGRpdj4ke2NsaXBib2FyZERhdGFBc0h0bWx9PC9kaXY+YCkpXG59XG5cbmZ1bmN0aW9uIG1hcmtBbmRHZXRJbmxpbmVJbWFnZXMoJGVkaXRvcikge1xuICAgIGNvbnN0IGltYWdlcyA9ICRlZGl0b3IuZmluZCgnaW1nW3NyY149XCJkYXRhXCJdJykudG9BcnJheSgpXG4gICAgICAgIC5tYXAoKGVsLCBpbmRleCkgPT4gT2JqZWN0LmFzc2lnbihkZWNvZGVCYXNlNjRJbWFnZShlbC5nZXRBdHRyaWJ1dGUoJ3NyYycpKSwge1xuICAgICAgICAgICAgJGVsOiAkKGVsKVxuICAgICAgICB9KSlcbiAgICBpbWFnZXMuZmlsdGVyKCh7dHlwZX0pID0+IGZpbGVUeXBlcy5pbmRleE9mKHR5cGUpID09PSAtMSkuZm9yRWFjaCgoeyRlbH0pID0+ICRlbC5yZW1vdmUoKSlcbiAgICBjb25zdCBwbmdJbWFnZXMgPSBpbWFnZXMuZmlsdGVyKCh7dHlwZX0pID0+IGZpbGVUeXBlcy5pbmRleE9mKHR5cGUpID49MCApXG4gICAgcG5nSW1hZ2VzLmZvckVhY2goKHskZWx9KSA9PiAkZWwuYXR0cignc3JjJywgbG9hZGluZ0ltZykpXG4gICAgcmV0dXJuIHBuZ0ltYWdlc1xufVxuXG5mdW5jdGlvbiBkZWNvZGVCYXNlNjRJbWFnZShkYXRhU3RyaW5nKSB7XG4gICAgaWYgKCFkYXRhU3RyaW5nKVxuICAgICAgICByZXR1cm4gbnVsbFxuICAgIGNvbnN0IG1hdGNoZXMgPSBkYXRhU3RyaW5nLm1hdGNoKC9eZGF0YTooW0EtWmEtei0rXFwvXSspO2Jhc2U2NCwoLispJC8pXG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoICE9PSAzKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IG1hdGNoZXNbMV0sXG4gICAgICAgIGRhdGE6IG5ldyBCdWZmZXIobWF0Y2hlc1syXSwgJ2Jhc2U2NCcpXG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gICAge2FjdGlvbjogJ1xcXFxzcXJ0JywgbGFiZWw6ICdcXFxcc3FydHtYfSd9LFxuICAgIHthY3Rpb246ICdeJywgbGFiZWw6ICd4XntYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcZnJhYycsIGxhYmVsOiAnXFxcXGZyYWN7WH17WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGludCcsIGxhYmVsOiAnXFxcXGludF97WH1ee1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxsaW1fJywgbGFiZWw6ICdcXFxcbGltX3tYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcbGltX3t4XFxcXHJpZ2h0YXJyb3dcXFxcaW5mdHl9JywgbGFiZWw6ICdcXFxcbGltX3t4XFxcXHJpZ2h0YXJyb3dcXFxcaW5mdHl9JywgdXNlV3JpdGU6dHJ1ZX0sXG4gICAge2FjdGlvbjogJ1xcXFxvdmVycmlnaHRhcnJvdycsIGxhYmVsOiAnXFxcXG92ZXJyaWdodGFycm93e1h9J30sXG4gICAge2FjdGlvbjogJ18nLCBsYWJlbDogJ3hfWCd9LFxuICAgIHthY3Rpb246ICdcXFxcbnRocm9vdCcsIGxhYmVsOiAnXFxcXHNxcnRbWF17WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXHN1bScsIGxhYmVsOiAnXFxcXHN1bV97WH1ee1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxiaW5vbScsIGxhYmVsOiAnXFxcXGJpbm9te1h9e1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxzaW4nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGNvcyd9LFxuICAgIHthY3Rpb246ICdcXFxcdGFuJ30sXG4gICAge2FjdGlvbjogJ1xcXFx2ZWMnLCBsYWJlbDogJ1xcXFx2ZWN7WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGJhcicsIGxhYmVsOiAnXFxcXGJhcntYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcmxpbmV7XFxcXHRleHR7aX19JywgdXNlV3JpdGU6IHRydWV9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcmxpbmV7XFxcXHRleHR7an19JywgdXNlV3JpdGU6IHRydWV9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcmxpbmV7XFxcXHRleHR7a319JywgdXNlV3JpdGU6IHRydWV9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcmxlZnRhcnJvdycsIGxhYmVsOiAnXFxcXG92ZXJsZWZ0YXJyb3d7WH0nfSxcbiAgICB7YWN0aW9uOiAnfCcsIGxhYmVsOiAnfFh8J30sXG4gICAge2FjdGlvbjogJygnLCBsYWJlbDogJyhYKSd9LFxuICAgIHthY3Rpb246ICdfeyB9XnsgfSAnLCBsYWJlbDogJ197WH1ee1h9WCcsIHVzZVdyaXRlOiB0cnVlfSxcbiAgICB7YWN0aW9uOiAnXFxcXG1hdGhybScsIGxhYmVsOiAnXFxcXG1hdGhybXtUfSd9LFxuXVxuIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEVBQVFBUFFBQVAvLy93QUFBUER3OElxS2l1RGc0RVpHUm5wNmVnQUFBRmhZV0NRa0pLeXNyTDYrdmhRVUZKeWNuQVFFQkRZMk5taG9hQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQ0grR2tOeVpXRjBaV1FnZDJsMGFDQmhhbUY0Ykc5aFpDNXBibVp2QUNINUJBQUtBQUFBSWY4TFRrVlVVME5CVUVVeUxqQURBUUFBQUN3QUFBQUFFQUFRQUFBRmR5QWdBZ0lKSWVXb0FrUkNDTWRCa0t0SUhJbmd5TUtzRXJQQlliQURwa1NDd2hEbVFDQmV0aFJCNlZqNGtGQ2tRUEc0SWxXRGdyTlJJd25PNFVLQlhEdWZ6UXZETWFvU0RCZ0ZiODg2TWlRYWRnTkFCQW9rZkN3ekJBOExDZzBFZ2w4akFnZ0dBQTFrQklBMUJBWXpseUlMY3pVTEMyVWhBQ0g1QkFBS0FBRUFMQUFBQUFBUUFCQUFBQVYySUNBQ0FtbEFaVG1PUkVFSXlVRVFqTEtLeFBIQURoRXZxeGxnY0dna0dJMURZU1ZBSUFXTXgrbHdTS2tJQ0owUXNIaTlSZ0tCd25WVGlSUVFnd0Y0STRVRkRRUUV3aTYvM1lTR1dSUm1qaEVFVEFKZklnTUZDbkFLTTBLRFY0RUVFQVFMaUYxOFRBWU5YRGFTZTN4Nm1qaWROMXMzSVFBaCtRUUFDZ0FDQUN3QUFBQUFFQUFRQUFBRmVDQWdBZ0xaREdVNWpnUkVDRVVpQ0kreWlvU0R3REp5TEtzWG9IRlF4QlNIQW9BQUZCaHF0TUpnOERnUUJnZnJFc0pBRUFnNFloWklFaXdnS3RIaU1CZ3RwZzN3YlVaWEdPN2tPYjFNVUtSRk15c0NDaEFvZ2dKQ0lnMEdDMmFOZTRncVFsZGZMNGwvQWcxQVh5U0pnbjVMY29FM1FYSTNJUUFoK1FRQUNnQURBQ3dBQUFBQUVBQVFBQUFGZGlBZ0FnTFpOR1U1am9RaENFanhJc3NxRW84YkM5QlJqeTlBZzdHSUxRNFFFb0UwZ0JBRUJjT3BjQkEwRG94U0svZThMUklIbitpMWNLMEl5S2RnMFZBb2xqWUlnK0dnblJyd1ZTLzhJQWtJQ3lvc0JJUXBCQU1vS3k5ZElteFBoUytHS2tGcmtYK1RpZ3RMbEl5S1hVRitOamFnTmlFQUlma0VBQW9BQkFBc0FBQUFBQkFBRUFBQUJXd2dJQUlDYVJobE9ZNEVJZ2pIOFI3TEtoS0hHd3NNdmI0QUF5M1dPREJJQkJLQ3NZQTlUanVoRE5ES0VWU0VSZXpRRUwwV3JoWHVjUlVRR3VpazdiRmxuZ3pxVlc5TE1sOVhXdkxkakZhSnRERnFaMWNFWlVCMGRVZ3ZMM2RnUDRXSlpuNGprb21XTnBTVEl5RUFJZmtFQUFvQUJRQXNBQUFBQUJBQUVBQUFCWDRnSUFJQ3VTeGxPWTZDSWdpRDhSckVLZ3FHT3d4d1VyTWxBb1N3SXpBR3BKcGdvU0RBR2lmRFk1a29wQllEbEVwQVFCd2V2eGZCdFJJVUdpOHh3V2tETkJDSXdtQzlWcTBhaVFRRFF1SytWZ1FQRFhWOWhDSmpCd2NGWVU1cEx3d0hYUWNNS1NtTkxRY0lBRXhsYkg4SkJ3dHRhWDBBQkFjTmJXVmJLeUVBSWZrRUFBb0FCZ0FzQUFBQUFCQUFFQUFBQlhrZ0lBSUNTUkJsT1k3Q0lnaE44emJFS3NLb0lqZEZ6WmFFZ1VCSEtDaE1KdFJ3Y1dwQVdvV25pZm02RVNBTWhPOGxRSzBFRUFWM3JGb3BJQkNFY0d3REtBcVBoNEhVclk0SUNISDFkU29URmdjSFVpWmpCaEFKQjJBSER5a3BLQXdIQXdkemYxOUtrQVNJUGw5Y0RnY25Ea2R0TndpTUpDc2hBQ0g1QkFBS0FBY0FMQUFBQUFBUUFCQUFBQVYzSUNBQ0Fra1FaVG1PQWlvc2l5QW94Q3ErS1B4Q05Wc1NNUmdCc2lDbFdyTFRTV0ZvSVFaSGw2cGxlQmg2c3V4S01JaGx2emJBd2tCV2ZGV3JCUVR4TkxxMlJHMnloU1VrRHMyYjYzQVlEQW9KWEFjRlJ3QURlQWtKRFgwQVFDc0VmQVFNREFJUEJ6MHJDZ2N4a3kwSlJXRTFBbXdwS3lFQUlma0VBQW9BQ0FBc0FBQUFBQkFBRUFBQUJYa2dJQUlDS1p6a3FKNG5RWnhMcVpLdjROcU5MS0syL1E0RWs0bEZYQ2hzZzV5cEpqczFJSTNnRURVU1JJbkVHWUF3NkI2ek00SmhyREF0RW9zVmtMVXRIQTdSSGFIQUdKUUVqc09EY0VnMEZCQUZWZ2tRSlExcEF3Y0REdzhLY0Z0U0lud0pBb3dDQ0E2Ukl3cVpBZ2tQTmdWcFduZGpkeW9oQUNINUJBQUtBQWtBTEFBQUFBQVFBQkFBQUFWNUlDQUNBaW1jNUtpZUxFdVVLdm0yeEFLTHFEQ2ZDMkdhTzllTDBMQUJXVGlCWW1BMDZXNmtIZ3ZDcUVKaUFJSml1M2djdmdVc3NjSFVFUm0ra2FDeHl4YSt6UlBrMFNnSkVnZkl2YkFkSUFRTENBWWxDajREQncwSUJRc01DaklxQkFjUEFvb0NCZzlwS2dzSkx3VUZPaENaS3lRREEzWXFJUUFoK1FRQUNnQUtBQ3dBQUFBQUVBQVFBQUFGZFNBZ0FnSXBuT1Nvbm14YnFpVGhDckpLRUhGYm84SnhERE9aWUZGYitBNDFFNEg0T2hrT2lwWHdCRWxZSVREQWNrRkVPQmdNUTNhcmtNa1VCZHhJVUdacEViN2thUUJSbEFTUGcwRlFRSEFiRUVNR0RTVkVBQTFRQmhBRUQxRTBOZ3dGQW9vQ0RXbGphUUlRQ0U1cU1IY05oQ2tqSVFBaCtRUUFDZ0FMQUN3QUFBQUFFQUFRQUFBRmVTQWdBZ0lwbk9Tb0xneHh2cWdLTEVjQ0M2NUtFQUJ5S0s4Y1NwQTREQWlIUS9Ea0toR0toNFpDdEN5WkdvNkY2aVlZUEFxRmdZeTAyeGtTYUxFTVYzNHRFTHlSWU5Fc0NReUhsdldrR0N6c1BnTUNFQVk3Q2cwNFVrNDhMQXNEaFJBOE1WUVBFRjBHQWdxWVl3U1JseWNOY1dza0NrQXBJeUVBT3dBQUFBQUFBQUFBQUR4aWNpQXZQZ284WWo1WFlYSnVhVzVuUEM5aVBqb2dJRzE1YzNGc1gzRjFaWEo1S0NrZ1d6eGhJR2h5WldZOUoyWjFibU4wYVc5dUxtMTVjM0ZzTFhGMVpYSjVKejVtZFc1amRHbHZiaTV0ZVhOeGJDMXhkV1Z5ZVR3dllUNWRPaUJEWVc0bmRDQmpiMjV1WldOMElIUnZJR3h2WTJGc0lFMTVVMUZNSUhObGNuWmxjaUIwYUhKdmRXZG9JSE52WTJ0bGRDQW5MM1poY2k5eWRXNHZiWGx6Y1d4a0wyMTVjM0ZzWkM1emIyTnJKeUFvTWlrZ2FXNGdQR0krTDJodmJXVXZZV3BoZUd4dllXUXZkM2QzTDJ4cFluSmhhWEpwWlhNdlkyeGhjM011YlhsemNXd3VjR2h3UEM5aVBpQnZiaUJzYVc1bElEeGlQalk0UEM5aVBqeGljaUF2UGdvOFluSWdMejRLUEdJK1YyRnlibWx1Wnp3dllqNDZJQ0J0ZVhOeGJGOXhkV1Z5ZVNncElGczhZU0JvY21WbVBTZG1kVzVqZEdsdmJpNXRlWE54YkMxeGRXVnllU2MrWm5WdVkzUnBiMjR1YlhsemNXd3RjWFZsY25rOEwyRStYVG9nUVNCc2FXNXJJSFJ2SUhSb1pTQnpaWEoyWlhJZ1kyOTFiR1FnYm05MElHSmxJR1Z6ZEdGaWJHbHphR1ZrSUdsdUlEeGlQaTlvYjIxbEwyRnFZWGhzYjJGa0wzZDNkeTlzYVdKeVlXbHlhV1Z6TDJOc1lYTnpMbTE1YzNGc0xuQm9jRHd2WWo0Z2IyNGdiR2x1WlNBOFlqNDJPRHd2WWo0OFluSWdMejRLUEdKeUlDOCtDanhpUGxkaGNtNXBibWM4TDJJK09pQWdiWGx6Y1d4ZmNYVmxjbmtvS1NCYlBHRWdhSEpsWmowblpuVnVZM1JwYjI0dWJYbHpjV3d0Y1hWbGNua25QbVoxYm1OMGFXOXVMbTE1YzNGc0xYRjFaWEo1UEM5aFBsMDZJRU5oYmlkMElHTnZibTVsWTNRZ2RHOGdiRzlqWVd3Z1RYbFRVVXdnYzJWeWRtVnlJSFJvY205MVoyZ2djMjlqYTJWMElDY3ZkbUZ5TDNKMWJpOXRlWE54YkdRdmJYbHpjV3hrTG5Odlkyc25JQ2d5S1NCcGJpQThZajR2YUc5dFpTOWhhbUY0Ykc5aFpDOTNkM2N2YkdsaWNtRnBjbWxsY3k5amJHRnpjeTV0ZVhOeGJDNXdhSEE4TDJJK0lHOXVJR3hwYm1VZ1BHSStOamc4TDJJK1BHSnlJQzgrQ2p4aWNpQXZQZ284WWo1WFlYSnVhVzVuUEM5aVBqb2dJRzE1YzNGc1gzRjFaWEo1S0NrZ1d6eGhJR2h5WldZOUoyWjFibU4wYVc5dUxtMTVjM0ZzTFhGMVpYSjVKejVtZFc1amRHbHZiaTV0ZVhOeGJDMXhkV1Z5ZVR3dllUNWRPaUJCSUd4cGJtc2dkRzhnZEdobElITmxjblpsY2lCamIzVnNaQ0J1YjNRZ1ltVWdaWE4wWVdKc2FYTm9aV1FnYVc0Z1BHSStMMmh2YldVdllXcGhlR3h2WVdRdmQzZDNMMnhwWW5KaGFYSnBaWE12WTJ4aGMzTXViWGx6Y1d3dWNHaHdQQzlpUGlCdmJpQnNhVzVsSUR4aVBqWTRQQzlpUGp4aWNpQXZQZ284WW5JZ0x6NEtQR0krVjJGeWJtbHVaend2WWo0NklDQnRlWE54YkY5eGRXVnllU2dwSUZzOFlTQm9jbVZtUFNkbWRXNWpkR2x2Ymk1dGVYTnhiQzF4ZFdWeWVTYytablZ1WTNScGIyNHViWGx6Y1d3dGNYVmxjbms4TDJFK1hUb2dRMkZ1SjNRZ1kyOXVibVZqZENCMGJ5QnNiMk5oYkNCTmVWTlJUQ0J6WlhKMlpYSWdkR2h5YjNWbmFDQnpiMk5yWlhRZ0p5OTJZWEl2Y25WdUwyMTVjM0ZzWkM5dGVYTnhiR1F1YzI5amF5Y2dLRElwSUdsdUlEeGlQaTlvYjIxbEwyRnFZWGhzYjJGa0wzZDNkeTlzYVdKeVlXbHlhV1Z6TDJOc1lYTnpMbTE1YzNGc0xuQm9jRHd2WWo0Z2IyNGdiR2x1WlNBOFlqNDJPRHd2WWo0OFluSWdMejRLUEdKeUlDOCtDanhpUGxkaGNtNXBibWM4TDJJK09pQWdiWGx6Y1d4ZmNYVmxjbmtvS1NCYlBHRWdhSEpsWmowblpuVnVZM1JwYjI0dWJYbHpjV3d0Y1hWbGNua25QbVoxYm1OMGFXOXVMbTE1YzNGc0xYRjFaWEo1UEM5aFBsMDZJRUVnYkdsdWF5QjBieUIwYUdVZ2MyVnlkbVZ5SUdOdmRXeGtJRzV2ZENCaVpTQmxjM1JoWW14cGMyaGxaQ0JwYmlBOFlqNHZhRzl0WlM5aGFtRjRiRzloWkM5M2QzY3ZiR2xpY21GcGNtbGxjeTlqYkdGemN5NXRlWE54YkM1d2FIQThMMkkrSUc5dUlHeHBibVVnUEdJK05qZzhMMkkrUEdKeUlDOCtDZz09XCJcbiIsImNvbnN0IHUgPSByZXF1aXJlKCcuL3V0aWwnKVxuY29uc3Qga2V5Q29kZXMgPSB7XG4gICAgRU5URVI6IDEzLFxuICAgIEVTQzogMjdcbn1cblxubGV0IE1RXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fVxubGV0IGZpcnN0VGltZSA9IHRydWVcblxuZnVuY3Rpb24gaW5pdCgkb3V0ZXJQbGFjZWhvbGRlciwgZm9jdXMsIGJhc2VVcmwpIHtcbiAgICBsZXQgdXBkYXRlTWF0aEltZ1RpbWVvdXRcblxuICAgIGlmKGZpcnN0VGltZSkge1xuICAgICAgICBNUSA9IE1hdGhRdWlsbC5nZXRJbnRlcmZhY2UoMilcbiAgICB9XG4gICAgY29uc3QgJG1hdGhFZGl0b3JDb250YWluZXIgPSAkKGBcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1hdGgtZWRpdG9yXCIgZGF0YS1qcz1cIm1hdGhFZGl0b3JcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYXRoLWVkaXRvci1lcXVhdGlvbi1maWVsZFwiIGRhdGEtanM9XCJlcXVhdGlvbkZpZWxkXCI+PC9kaXY+XG4gICAgICAgICAgICA8dGV4dGFyZWEgcm93cz1cIjFcIiBjbGFzcz1cIm1hdGgtZWRpdG9yLWxhdGV4LWZpZWxkXCIgZGF0YS1qcz1cImxhdGV4RmllbGRcIiBwbGFjZWhvbGRlcj1cIkxhVGV4XCI+PC90ZXh0YXJlYT5cbiAgICAgICAgPC9kaXY+YClcblxuICAgICRvdXRlclBsYWNlaG9sZGVyLmFwcGVuZCgkbWF0aEVkaXRvckNvbnRhaW5lcilcbiAgICBjb25zdCAkbGF0ZXhGaWVsZCA9ICRtYXRoRWRpdG9yQ29udGFpbmVyLmZpbmQoJ1tkYXRhLWpzPVwibGF0ZXhGaWVsZFwiXScpXG4gICAgY29uc3QgJGVxdWF0aW9uRmllbGQgPSAkbWF0aEVkaXRvckNvbnRhaW5lci5maW5kKCdbZGF0YS1qcz1cImVxdWF0aW9uRmllbGRcIl0nKVxuICAgIGxldCBtcUVkaXRUaW1lb3V0XG4gICAgbGV0IHZpc2libGUgPSBmYWxzZVxuICAgIGxldCBmb2N1c0NoYW5nZWQgPSBudWxsXG4gICAgLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzLEpTVW51c2VkTG9jYWxTeW1ib2xzXG4gICAgY29uc3QgbXFJbnN0YW5jZSA9IE1RLk1hdGhGaWVsZCgkZXF1YXRpb25GaWVsZC5nZXQoMCksIHtcbiAgICAgICAgaGFuZGxlcnM6IHtcbiAgICAgICAgICAgIGVkaXQ6IG9uTXFFZGl0LFxuICAgICAgICAgICAgZW50ZXI6IGZpZWxkID0+IHtcbiAgICAgICAgICAgICAgICBjbG9zZU1hdGhFZGl0b3IodHJ1ZSlcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGluc2VydE5ld0VxdWF0aW9uKCc8YnI+JyksIDIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxuICAgICRlcXVhdGlvbkZpZWxkXG4gICAgICAgIC5vbignaW5wdXQnLCAnLm1xLXRleHRhcmVhIHRleHRhcmVhJywgb25NcUVkaXQpXG4gICAgICAgIC5vbignZm9jdXMgYmx1cicsICcubXEtdGV4dGFyZWEgdGV4dGFyZWEnLCBlID0+IHtcbiAgICAgICAgICAgIGZvY3VzLmVxdWF0aW9uRmllbGQgPSBlLnR5cGUgIT09ICdibHVyJyAmJiBlLnR5cGUgIT09ICdmb2N1c291dCdcbiAgICAgICAgICAgIG9uRm9jdXNDaGFuZ2VkKClcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdrZXlkb3duJywgb25DbG9zZSlcbiAgICAgICAgLm9uKCdwYXN0ZScsIGUgPT4gZS5zdG9wUHJvcGFnYXRpb24oKSlcblxuXG4gICAgJGxhdGV4RmllbGRcbiAgICAgICAgLm9uKCdpbnB1dCBwYXN0ZScsIG9uTGF0ZXhVcGRhdGUpXG4gICAgICAgIC5vbignZm9jdXMgYmx1cicsIGUgPT4ge1xuICAgICAgICAgICAgZm9jdXMubGF0ZXhGaWVsZCA9IGUudHlwZSAhPT0gJ2JsdXInXG4gICAgICAgICAgICBvbkZvY3VzQ2hhbmdlZCgpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbigna2V5ZG93bicsIG9uQ2xvc2UpXG4gICAgICAgIC5vbigncGFzdGUnLCBlID0+IGUuc3RvcFByb3BhZ2F0aW9uKCkpXG5cbiAgICBmdW5jdGlvbiBvbkNsb3NlKGUpIHtcbiAgICAgICAgaWYgKHUuaXNDdHJsS2V5KGUsIGtleUNvZGVzLkVOVEVSKSB8fCB1LmlzS2V5KGUsIGtleUNvZGVzLkVTQykpIGNsb3NlTWF0aEVkaXRvcih0cnVlKVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGluc2VydE5ld0VxdWF0aW9uLFxuICAgICAgICBpbnNlcnRNYXRoLFxuICAgICAgICBvcGVuTWF0aEVkaXRvcixcbiAgICAgICAgY2xvc2VNYXRoRWRpdG9yXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25NcUVkaXQoZSkge1xuICAgICAgICBlICYmIGUub3JpZ2luYWxFdmVudCAmJiBlLm9yaWdpbmFsRXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgY2xlYXJUaW1lb3V0KG1xRWRpdFRpbWVvdXQpXG4gICAgICAgIG1xRWRpdFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmIChmb2N1cy5sYXRleEZpZWxkKVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgY29uc3QgbGF0ZXggPSBtcUluc3RhbmNlLmxhdGV4KClcbiAgICAgICAgICAgICRsYXRleEZpZWxkLnZhbChsYXRleClcbiAgICAgICAgICAgIHVwZGF0ZU1hdGhJbWdXaXRoRGVib3VuY2UoJG1hdGhFZGl0b3JDb250YWluZXIucHJldigpLCBsYXRleClcbiAgICAgICAgfSwgMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkxhdGV4VXBkYXRlKGUpIHtcbiAgICAgICAgZSAmJiBlLm9yaWdpbmFsRXZlbnQgJiYgZS5vcmlnaW5hbEV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgIHVwZGF0ZU1hdGhJbWdXaXRoRGVib3VuY2UoJG1hdGhFZGl0b3JDb250YWluZXIucHJldigpLCAkbGF0ZXhGaWVsZC52YWwoKSlcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBtcUluc3RhbmNlLmxhdGV4KCRsYXRleEZpZWxkLnZhbCgpKSwgMSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkZvY3VzQ2hhbmdlZCgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGZvY3VzQ2hhbmdlZClcbiAgICAgICAgZm9jdXNDaGFuZ2VkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAkbWF0aEVkaXRvckNvbnRhaW5lci50cmlnZ2VyKHsgdHlwZTonbWF0aGZvY3VzJywgaGFzRm9jdXM6IGZvY3VzLmxhdGV4RmllbGQgfHwgZm9jdXMuZXF1YXRpb25GaWVsZH0pXG4gICAgICAgICAgICBpZiAoIWZvY3VzLmxhdGV4RmllbGQgJiYgIWZvY3VzLmVxdWF0aW9uRmllbGQpIGNsb3NlTWF0aEVkaXRvcigpXG4gICAgICAgIH0sIDApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zZXJ0TmV3RXF1YXRpb24ob3B0aW9uYWxNYXJrdXAgPSAnJykge1xuICAgICAgICB3aW5kb3cuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydEhUTUwnLCBmYWxzZSwgb3B0aW9uYWxNYXJrdXAgKyAnPGltZyBkYXRhLWpzPVwibmV3XCIgYWx0PVwiXCIgc3JjPVwiXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lXCIvPicpXG4gICAgICAgIHNob3dNYXRoRWRpdG9yKCQoJ1tkYXRhLWpzPVwibmV3XCJdJykucmVtb3ZlQXR0cignZGF0YS1qcycpKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9wZW5NYXRoRWRpdG9yKCRpbWcpIHtcbiAgICAgICAgaWYgKHZpc2libGUpIGNsb3NlTWF0aEVkaXRvcigpXG4gICAgICAgIHUuc2V0Q3Vyc29yQWZ0ZXIoJGltZylcbiAgICAgICAgc2hvd01hdGhFZGl0b3IoJGltZylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaG93TWF0aEVkaXRvcigkaW1nKSB7XG4gICAgICAgICRpbWcuaGlkZSgpXG4gICAgICAgICRpbWcuYWZ0ZXIoJG1hdGhFZGl0b3JDb250YWluZXIpXG4gICAgICAgIHZpc2libGUgPSB0cnVlXG4gICAgICAgIHRvZ2dsZU1hdGhUb29sYmFyKHRydWUpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gbXFJbnN0YW5jZS5mb2N1cygpLCAwKVxuICAgICAgICAkbGF0ZXhGaWVsZC52YWwoJGltZy5wcm9wKCdhbHQnKSlcbiAgICAgICAgb25MYXRleFVwZGF0ZSgpXG4gICAgICAgIHUuc2Nyb2xsSW50b1ZpZXcoJG1hdGhFZGl0b3JDb250YWluZXIpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zZXJ0TWF0aChzeW1ib2wsIGFsdGVybmF0aXZlU3ltYm9sLCB1c2VXcml0ZSkge1xuICAgICAgICBpZiAoZm9jdXMubGF0ZXhGaWVsZCkge1xuICAgICAgICAgICAgdS5pbnNlcnRUb1RleHRBcmVhQXRDdXJzb3IoJGxhdGV4RmllbGQuZ2V0KDApLCBhbHRlcm5hdGl2ZVN5bWJvbCB8fCBzeW1ib2wpXG4gICAgICAgICAgICBvbkxhdGV4VXBkYXRlKClcbiAgICAgICAgfSBlbHNlIGlmIChmb2N1cy5lcXVhdGlvbkZpZWxkKSB7XG4gICAgICAgICAgICBpZiAodXNlV3JpdGUpIHtcbiAgICAgICAgICAgICAgICBtcUluc3RhbmNlLndyaXRlKHN5bWJvbClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbXFJbnN0YW5jZS50eXBlZFRleHQoc3ltYm9sKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKH5zeW1ib2wuaW5kZXhPZignXFxcXCcpKSBtcUluc3RhbmNlLmtleXN0cm9rZSgnVGFiJylcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gbXFJbnN0YW5jZS5mb2N1cygpLCAwKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTWF0aEltZygkaW1nLCBsYXRleCkge1xuICAgICAgICAkaW1nLnByb3Aoe1xuICAgICAgICAgICAgc3JjOiBiYXNlVXJsICsgJy9tYXRoLnN2Zz9sYXRleD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGxhdGV4KSxcbiAgICAgICAgICAgIGFsdDogbGF0ZXhcbiAgICAgICAgfSlcbiAgICAgICAgJGltZy5jbG9zZXN0KCdbZGF0YS1qcz1cImFuc3dlclwiXScpLnRyaWdnZXIoJ2lucHV0JylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVNYXRoSW1nV2l0aERlYm91bmNlKCRpbWcsIGxhdGV4KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh1cGRhdGVNYXRoSW1nVGltZW91dClcbiAgICAgICAgdXBkYXRlTWF0aEltZ1RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHVwZGF0ZU1hdGhJbWcoJGltZywgbGF0ZXgpXG4gICAgICAgIH0sIDUwMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZU1hdGhFZGl0b3Ioc2V0Rm9jdXNBZnRlckNsb3NlID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgJGN1cnJlbnRFZGl0b3IgPSAkbWF0aEVkaXRvckNvbnRhaW5lci5jbG9zZXN0KCdbZGF0YS1qcz1cImFuc3dlclwiXScpXG4gICAgICAgIGNvbnN0ICRpbWcgPSAkbWF0aEVkaXRvckNvbnRhaW5lci5wcmV2KClcbiAgICAgICAgaWYgKCRsYXRleEZpZWxkLnZhbCgpLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgICAgICAgICRpbWcucmVtb3ZlKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRpbWcuc2hvdygpXG4gICAgICAgICAgICB1cGRhdGVNYXRoSW1nKCRpbWcsICRsYXRleEZpZWxkLnZhbCgpKVxuICAgICAgICB9XG5cbiAgICAgICAgdG9nZ2xlTWF0aFRvb2xiYXIoZmFsc2UpXG4gICAgICAgIHZpc2libGUgPSBmYWxzZVxuICAgICAgICBmb2N1cy5sYXRleEZpZWxkID0gZmFsc2VcbiAgICAgICAgZm9jdXMuZXF1YXRpb25GaWVsZCA9IGZhbHNlXG4gICAgICAgICRtYXRoRWRpdG9yQ29udGFpbmVyLnRyaWdnZXIoeyB0eXBlOidtYXRoZm9jdXMnLCBoYXNGb2N1czogZm9jdXMubGF0ZXhGaWVsZCB8fCBmb2N1cy5lcXVhdGlvbkZpZWxkfSlcbiAgICAgICAgJG91dGVyUGxhY2Vob2xkZXIuYXBwZW5kKCRtYXRoRWRpdG9yQ29udGFpbmVyKVxuICAgICAgICBpZiAoc2V0Rm9jdXNBZnRlckNsb3NlKSAkY3VycmVudEVkaXRvci5mb2N1cygpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlTWF0aFRvb2xiYXIoaXNWaXNpYmxlKSB7XG4gICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnbWF0aC1lZGl0b3ItZm9jdXMnLCBpc1Zpc2libGUpXG4gICAgfVxufVxuIiwiY29uc3QgdSA9IHJlcXVpcmUoJy4vdXRpbCcpXG5jb25zdCB0b29sYmFycyA9IHJlcXVpcmUoJy4vdG9vbGJhcnMnKVxuY29uc3QgY2xpcGJvYXJkID0gcmVxdWlyZSgnLi9jbGlwYm9hcmQnKVxuY29uc3QgbWF0aEVkaXRvciA9IHJlcXVpcmUoJy4vbWF0aC1lZGl0b3InKVxuY29uc3QgbG9jYWxlcyA9IHtcbiAgICBGSTogcmVxdWlyZSgnLi9GSScpLFxuICAgIFNWOiByZXF1aXJlKCcuL1NWJylcbn1cbmNvbnN0IGwgPSBsb2NhbGVzW3dpbmRvdy5sb2NhbGUgfHwgJ0ZJJ10uZWRpdG9yXG5jb25zdCBrZXlDb2RlcyA9IHtcbiAgICBFOiA2OVxufVxuY29uc3QgJG91dGVyUGxhY2Vob2xkZXIgPSAkKGA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci1oaWRkZW5cIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCIgZGF0YS1qcz1cIm91dGVyUGxhY2Vob2xkZXJcIj5gKVxuY29uc3QgZm9jdXMgPSB7XG4gICAgcmljaFRleHQ6IGZhbHNlLFxuICAgIGxhdGV4RmllbGQ6IGZhbHNlLFxuICAgIGVxdWF0aW9uRmllbGQ6IGZhbHNlXG59XG5sZXQgJGN1cnJlbnRFZGl0b3JcblxubGV0IGZpcnN0Q2FsbCA9IHRydWVcbmxldCBtYXRoXG5sZXQgJHRvb2xiYXJcblxubW9kdWxlLmV4cG9ydHMubWFrZVJpY2hUZXh0ID0gKGFuc3dlciwgb3B0aW9ucywgb25WYWx1ZUNoYW5nZWQgPSAoKSA9PiB7fSkgPT4ge1xuICAgIGNvbnN0IHNhdmVyID0gb3B0aW9ucy5zY3JlZW5zaG90LnNhdmVyXG4gICAgY29uc3QgbGltaXQgPSBvcHRpb25zLnNjcmVlbnNob3QubGltaXRcbiAgICBjb25zdCBiYXNlVXJsID0gb3B0aW9ucy5iYXNlVXJsIHx8ICcnXG5cbiAgICBpZiAoZmlyc3RDYWxsKSB7XG4gICAgICAgIG1hdGggPSBtYXRoRWRpdG9yLmluaXQoJG91dGVyUGxhY2Vob2xkZXIsIGZvY3VzLCBiYXNlVXJsKVxuICAgICAgICAkdG9vbGJhciA9IHRvb2xiYXJzLmluaXQobWF0aCwgKCkgPT4gZm9jdXMucmljaFRleHQsIGwsIGJhc2VVcmwpXG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQoJG91dGVyUGxhY2Vob2xkZXIsICR0b29sYmFyKVxuICAgICAgICBmaXJzdENhbGwgPSBmYWxzZVxuICAgIH1cbiAgICBvblZhbHVlQ2hhbmdlZCh1LnNhbml0aXplQ29udGVudChhbnN3ZXIpKVxuICAgIGxldCBwYXN0ZUluUHJvZ3Jlc3MgPSBmYWxzZVxuXG4gICAgJChhbnN3ZXIpXG4gICAgICAgIC5hdHRyKHtcbiAgICAgICAgICAgIGNvbnRlbnRlZGl0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHNwZWxsY2hlY2s6IGZhbHNlLFxuICAgICAgICAgICAgJ2RhdGEtanMnOiAnYW5zd2VyJ1xuICAgICAgICB9KVxuICAgICAgICAuYWRkQ2xhc3MoJ3JpY2gtdGV4dC1lZGl0b3InKVxuICAgICAgICAub24oJ2NsaWNrJywgdS5lcXVhdGlvbkltYWdlU2VsZWN0b3IsIGUgPT4ge1xuICAgICAgICAgICAgaWYoZS53aGljaCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIG9uUmljaFRleHRFZGl0b3JGb2N1cygkKGUudGFyZ2V0KS5jbG9zZXN0KCdbZGF0YS1qcz1cImFuc3dlclwiXScpKVxuICAgICAgICAgICAgICAgIG1hdGgub3Blbk1hdGhFZGl0b3IoJChlLnRhcmdldCkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5vbigna2V5dXAnLCBlID0+IHtcbiAgICAgICAgICAgIGlmICh1LmlzQ3RybEtleShlLCBrZXlDb2Rlcy5FKSkgbWF0aC5pbnNlcnROZXdFcXVhdGlvbigpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignbWF0aGZvY3VzJywgZSA9PiB7XG4gICAgICAgICAgICAkKGUuY3VycmVudFRhcmdldCkudG9nZ2xlQ2xhc3MoJ3JpY2gtdGV4dC1mb2N1c2VkJywgZS5oYXNGb2N1cyApXG4gICAgICAgICAgICBpZiAocmljaFRleHRBbmRNYXRoQmx1cigpKSBvblJpY2hUZXh0RWRpdG9yQmx1cigkY3VycmVudEVkaXRvcilcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdmb2N1cyBibHVyJywgZSA9PiB7XG4gICAgICAgICAgICBpZihlLnR5cGUgPT09ICdmb2N1cycpIG1hdGguY2xvc2VNYXRoRWRpdG9yKClcbiAgICAgICAgICAgIG9uUmljaFRleHRFZGl0b3JGb2N1c0NoYW5nZWQoZSlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdpbnB1dCcsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKCFwYXN0ZUluUHJvZ3Jlc3MpIG9uVmFsdWVDaGFuZ2VkKHUuc2FuaXRpemVDb250ZW50KGUuY3VycmVudFRhcmdldCkpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZHJvcCcsIGUgPT4ge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgJChlLnRhcmdldCkuaHRtbCh1LnNhbml0aXplKGUudGFyZ2V0LmlubmVySFRNTCkpXG4gICAgICAgICAgICB9LDApXG4gICAgICAgIH0pXG4gICAgICAgIC5vbigncGFzdGUnLCBlID0+IHtcbiAgICAgICAgICAgIHBhc3RlSW5Qcm9ncmVzcyA9IHRydWVcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcGFzdGVJblByb2dyZXNzID0gZmFsc2UsIDApXG4gICAgICAgICAgICBjbGlwYm9hcmQub25QYXN0ZShlLCBzYXZlciwgb25WYWx1ZUNoYW5nZWQsIGxpbWl0KVxuICAgICAgICB9KVxuICAgIHNldFRpbWVvdXQoKCkgPT4gZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJlbmFibGVPYmplY3RSZXNpemluZ1wiLCBmYWxzZSwgZmFsc2UpLCAwKVxufVxuXG5mdW5jdGlvbiB0b2dnbGVSaWNoVGV4dFRvb2xiYXIoaXNWaXNpYmxlLCAkZWRpdG9yKSB7XG4gICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdyaWNoLXRleHQtZWRpdG9yLWZvY3VzJywgaXNWaXNpYmxlKVxuICAgICRlZGl0b3IudG9nZ2xlQ2xhc3MoJ3JpY2gtdGV4dC1mb2N1c2VkJywgaXNWaXNpYmxlKVxufVxuXG5mdW5jdGlvbiBvblJpY2hUZXh0RWRpdG9yRm9jdXMoJGVsZW1lbnQpIHtcbiAgICAkY3VycmVudEVkaXRvciA9ICRlbGVtZW50XG4gICAgdG9nZ2xlUmljaFRleHRUb29sYmFyKHRydWUsICRjdXJyZW50RWRpdG9yKVxufVxuXG5mdW5jdGlvbiBvblJpY2hUZXh0RWRpdG9yQmx1cigkZWxlbWVudCkge1xuICAgIHRvZ2dsZVJpY2hUZXh0VG9vbGJhcihmYWxzZSwgJGVsZW1lbnQpXG4gICAgZm9jdXMucmljaFRleHQgPSBmYWxzZVxufVxuXG5sZXQgcmljaFRleHRFZGl0b3JCbHVyVGltZW91dFxuXG5mdW5jdGlvbiBvblJpY2hUZXh0RWRpdG9yRm9jdXNDaGFuZ2VkKGUpIHtcbiAgICBmb2N1cy5yaWNoVGV4dCA9IGUudHlwZSA9PT0gJ2ZvY3VzJ1xuICAgICQoZS5jdXJyZW50VGFyZ2V0KS50b2dnbGVDbGFzcygncmljaC10ZXh0LWZvY3VzZWQnLCBmb2N1cy5yaWNoVGV4dCApXG5cbiAgICBjbGVhclRpbWVvdXQocmljaFRleHRFZGl0b3JCbHVyVGltZW91dClcbiAgICByaWNoVGV4dEVkaXRvckJsdXJUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChyaWNoVGV4dEFuZE1hdGhCbHVyKCkpIG9uUmljaFRleHRFZGl0b3JCbHVyKCQoZS50YXJnZXQpKVxuICAgICAgICBlbHNlIG9uUmljaFRleHRFZGl0b3JGb2N1cygkKGUudGFyZ2V0KSlcbiAgICB9LCAwKVxufVxuXG5mdW5jdGlvbiByaWNoVGV4dEFuZE1hdGhCbHVyKCkge1xuICAgIHJldHVybiAhZm9jdXMucmljaFRleHQgJiYgIWZvY3VzLmxhdGV4RmllbGQgJiYgIWZvY3VzLmVxdWF0aW9uRmllbGRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGFsbG93ZWRUYWdzOiBbXG4gICAgICAgICdkaXYnLFxuICAgICAgICAnaW1nJyxcbiAgICAgICAgJ2JyJ1xuICAgIF0sXG4gICAgYWxsb3dlZEF0dHJpYnV0ZXM6IHtcbiAgICAgICAgaW1nOiBbJ3NyYycsICdhbHQnXVxuICAgIH0sXG4gICAgYWxsb3dlZFNjaGVtZXM6IFsnZGF0YSddLFxuICAgIGV4Y2x1c2l2ZUZpbHRlcjogZnJhbWUgPT4gZnJhbWUuYXR0cmlic1snZGF0YS1qcyddID09PSAnbWF0aEVkaXRvcidcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuICAgIHtcbiAgICAgICAgbGFiZWw6ICdQZXJ1c21lcml0IGphIGtyZWlra2FsYWlzZXQgYWFra29zZXQnLFxuICAgICAgICBjaGFyYWN0ZXJzOiBbXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8KwJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfCtycsIGxhdGV4Q29tbWFuZDogJ1xcXFxjZG90JywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfCsScsIGxhdGV4Q29tbWFuZDogJ1xcXFxwbScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oieJywgbGF0ZXhDb21tYW5kOiAnXFxcXGluZnR5JywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfCsicsIGxhdGV4Q29tbWFuZDogJ14yJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfCsycsIGxhdGV4Q29tbWFuZDogJ14zJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfCvScsIGxhdGV4Q29tbWFuZDogJzEvMicsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oWTJywgbGF0ZXhDb21tYW5kOiAnMS8zJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfPgCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxwaScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzrEnLCBsYXRleENvbW1hbmQ6ICdcXFxcYWxwaGEnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86yJywgbGF0ZXhDb21tYW5kOiAnXFxcXGJldGEnLCBwb3B1bGFyOiB0cnVlICB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOkycsIGxhdGV4Q29tbWFuZDogJ1xcXFxHYW1tYScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzrMnLCBsYXRleENvbW1hbmQ6ICdcXFxcZ2FtbWEnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86UJywgbGF0ZXhDb21tYW5kOiAnXFxcXERlbHRhJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOtCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxkZWx0YScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzrUnLCBsYXRleENvbW1hbmQ6ICdcXFxcdmFyZXBzaWxvbicgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzrYnLCBsYXRleENvbW1hbmQ6ICdcXFxcemV0YScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzrcnLCBsYXRleENvbW1hbmQ6ICdcXFxcZXRhJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOmCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxUaGV0YScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnz5EnLCBsYXRleENvbW1hbmQ6ICdcXFxcdmFydGhldGEnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ/CdnIQnLCBsYXRleENvbW1hbmQ6ICdcXFxcaW90YScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzronLCBsYXRleENvbW1hbmQ6ICdcXFxca2FwcGEnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86bJywgbGF0ZXhDb21tYW5kOiAnXFxcXExhbWJkYScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzrsnLCBsYXRleENvbW1hbmQ6ICdcXFxcbGFtYmRhJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfCtScsIGxhdGV4Q29tbWFuZDogJ1xcXFxtdScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzp4nLCBsYXRleENvbW1hbmQ6ICdcXFxcWGknIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86+JywgbGF0ZXhDb21tYW5kOiAnXFxcXHhpJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiI8nLCBsYXRleENvbW1hbmQ6ICdcXFxcUGknIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8+BJywgbGF0ZXhDb21tYW5kOiAnXFxcXHJobycgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiRJywgbGF0ZXhDb21tYW5kOiAnXFxcXFNpZ21hJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfPgycsIGxhdGV4Q29tbWFuZDogJ1xcXFxzaWdtYScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnz4QnLCBsYXRleENvbW1hbmQ6ICdcXFxcdGF1JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOpScsIGxhdGV4Q29tbWFuZDogJ1xcXFxVcHNpbG9uJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfPhScsIGxhdGV4Q29tbWFuZDogJ1xcXFx1cHNpbG9uJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOpicsIGxhdGV4Q29tbWFuZDogJ1xcXFxQaGknIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ9CkJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBoaScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnz4cnLCBsYXRleENvbW1hbmQ6ICdcXFxcY2hpJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOqCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxQc2knIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8+IJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBzaScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzqknLCBsYXRleENvbW1hbmQ6ICdcXFxcT21lZ2EnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8+JJywgbGF0ZXhDb21tYW5kOiAnXFxcXG9tZWdhJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiIInLCBsYXRleENvbW1hbmQ6ICdcXFxccGFydGlhbCcgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGxhYmVsOiAnQWxnZWJyYScsXG4gICAgICAgIGNoYXJhY3RlcnM6IFtcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4omgJywgbGF0ZXhDb21tYW5kOiAnXFxcXG5lcScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4omIJywgbGF0ZXhDb21tYW5kOiAnXFxcXGFwcHJveCcsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4omkJywgbGF0ZXhDb21tYW5kOiAnXFxcXGxlcScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4omlJywgbGF0ZXhDb21tYW5kOiAnXFxcXGdlcScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oi8JywgbGF0ZXhDb21tYW5kOiAnXFxcXHNpbScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4omhJywgbGF0ZXhDb21tYW5kOiAnXFxcXGVxdWl2JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiaInIH0sIC8vIFxcbmVxdWl2IG9yIFxcbm90XFxlcXVpdlxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiJgnLCBsYXRleENvbW1hbmQ6ICdcXFxcY2lyYycgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oCmJywgbGF0ZXhDb21tYW5kOiAnXFxcXGxkb3RzJyB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbGFiZWw6ICdHZW9tZXRyaWEgamEgdmVrdG9yaW9wcGknLFxuICAgICAgICBjaGFyYWN0ZXJzOiBbXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIoCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxhbmdsZScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oaSJywgbGF0ZXhDb21tYW5kOiAnXFxcXHJpZ2h0YXJyb3cnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KHhScsIHBvcHVsYXI6IHRydWUgIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KGkScsIGxhdGV4Q29tbWFuZDogJ1xcXFx1cGFycm93JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihpMnLCBsYXRleENvbW1hbmQ6ICdcXFxcZG93bmFycm93JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihpQnLCBsYXRleENvbW1hbmQ6ICdcXFxcbGVmdHJpZ2h0YXJyb3cnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KKpScsIGxhdGV4Q29tbWFuZDogJ1xcXFxwZXJwJ30sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KAlicsIGxhdGV4Q29tbWFuZDogJ1xcXFxwYXJhbGxlbCd9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfih4wnIH0sIC8vIFxccmlnaHRsZWZ0aGFycG9vbnNcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnfCcgfSAvLyBcXHBpcGVcbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBsYWJlbDogJ0xvZ2lpa2thIGphIGpvdWtrby1vcHBpJyxcbiAgICAgICAgY2hhcmFjdGVyczogW1xuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfih5InLCBsYXRleENvbW1hbmQ6ICdcXFxcUmlnaHRhcnJvdycsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oeUJywgbGF0ZXhDb21tYW5kOiAnXFxcXExlZnRyaWdodGFycm93JywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiIMnLCBsYXRleENvbW1hbmQ6ICdcXFxcZXhpc3RzJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiIAnLCBsYXRleENvbW1hbmQ6ICdcXFxcZm9yYWxsJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihJ0nLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KElScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oSkJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihJonIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIqScsIGxhdGV4Q29tbWFuZDogJ1xcXFxjYXAnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIqicsIGxhdGV4Q29tbWFuZDogJ1xcXFxjdXAnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIlicsIGxhdGV4Q29tbWFuZDogJ1xcXFxzZXRtaW51cycgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oqCJywgbGF0ZXhDb21tYW5kOiAnXFxcXHN1YnNldCcgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oqEJywgbGF0ZXhDb21tYW5kOiAnXFxcXG5vdHN1YnNldCcgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiIJywgbGF0ZXhDb21tYW5kOiAnXFxcXGluJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiIknLCBsYXRleENvbW1hbmQ6ICdcXFxcbm90aW4nIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIhScsIGxhdGV4Q29tbWFuZDogJ1xcXFxlbXB0eScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oinJywgbGF0ZXhDb21tYW5kOiAnXFxcXGFuZCcgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oioJywgbGF0ZXhDb21tYW5kOiAnXFxcXG9yJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfCrCcgfVxuICAgICAgICBdXG4gICAgfVxuXVxuIiwiY29uc3Qgc3BlY2lhbENoYXJhY3Rlckdyb3VwcyA9IHJlcXVpcmUoJy4vc3BlY2lhbENoYXJhY3RlcnMnKVxuY29uc3QgbGF0ZXhDb21tYW5kcyA9IHJlcXVpcmUoJy4vbGF0ZXhDb21tYW5kcycpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGluaXQsXG59XG5cbmZ1bmN0aW9uIGluaXQobWF0aEVkaXRvciwgaGFzUmljaFRleHRGb2N1cywgbCwgYmFzZVVybCkgIHtcbiAgICBjb25zdCAkdG9vbGJhciA9ICQoYFxuICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29sc1wiIGRhdGEtanM9XCJ0b29sc1wiIHN0eWxlPVwiZGlzcGxheTogbm9uZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbHMtYnV0dG9uLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29sYmFyLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItY2hhcmFjdGVycy1leHBhbmQtY29sbGFwc2VcIiBkYXRhLWpzPVwiZXhwYW5kQ29sbGFwc2VDaGFyYWN0ZXJzXCIgc3R5bGU9XCJ6LWluZGV4OiAxMDBcIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbHMtcm93XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhci13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xiYXItY2hhcmFjdGVycyByaWNoLXRleHQtZWRpdG9yLXRvb2xiYXIgcmljaC10ZXh0LWVkaXRvci10b29sYmFyLWJ1dHRvbi1saXN0XCIgZGF0YS1qcz1cImNoYXJhY3RlcnNMaXN0XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xzLXJvd1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xiYXItd3JhcHBlciByaWNoLXRleHQtZWRpdG9yLWVxdWF0aW9uLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhci1lcXVhdGlvbiByaWNoLXRleHQtZWRpdG9yLXRvb2xiYXIgcmljaC10ZXh0LWVkaXRvci10b29sYmFyLWJ1dHRvbi1saXN0XCIgZGF0YS1qcz1cIm1hdGhUb29sYmFyXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xzLWJ1dHRvbi13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhci13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLW5ldy1lcXVhdGlvbiByaWNoLXRleHQtZWRpdG9yLWJ1dHRvbiByaWNoLXRleHQtZWRpdG9yLWJ1dHRvbi1hY3Rpb25cIiBkYXRhLWpzPVwibmV3RXF1YXRpb25cIiBkYXRhLWNvbW1hbmQ9XCJDdHJsLUVcIj7OoyAke2wuaW5zZXJ0RXF1YXRpb259PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIGApXG4gICAgICAgIC5vbignbW91c2Vkb3duJywgJ1tkYXRhLWpzPVwiZXhwYW5kQ29sbGFwc2VDaGFyYWN0ZXJzXCJdJywgZSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICR0b29sYmFyLnRvZ2dsZUNsYXNzKCdyaWNoLXRleHQtZWRpdG9yLWNoYXJhY3RlcnMtZXhwYW5kZWQnKVxuICAgICAgICB9KVxuXG4gICAgY29uc3QgJG5ld0VxdWF0aW9uID0gJHRvb2xiYXIuZmluZCgnW2RhdGEtanM9XCJuZXdFcXVhdGlvblwiXScpXG4gICAgY29uc3QgJG1hdGhUb29sYmFyID0gJHRvb2xiYXIuZmluZCgnW2RhdGEtanM9XCJtYXRoVG9vbGJhclwiXScpXG4gICAgaW5pdFNwZWNpYWxDaGFyYWN0ZXJUb29sYmFyKCR0b29sYmFyLCBtYXRoRWRpdG9yLCBoYXNSaWNoVGV4dEZvY3VzKVxuICAgIGluaXRNYXRoVG9vbGJhcigkbWF0aFRvb2xiYXIsIG1hdGhFZGl0b3IsIGJhc2VVcmwpXG4gICAgaW5pdE5ld0VxdWF0aW9uKCRuZXdFcXVhdGlvbiwgbWF0aEVkaXRvciwgaGFzUmljaFRleHRGb2N1cylcblxuICAgIHJldHVybiAkdG9vbGJhclxufVxuXG5jb25zdCBzcGVjaWFsQ2hhcmFjdGVyVG9CdXR0b24gPSBjaGFyID0+IGA8YnV0dG9uIGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci1idXR0b24gcmljaC10ZXh0LWVkaXRvci1idXR0b24tZ3JpZCR7Y2hhci5wb3B1bGFyID8gJyByaWNoLXRleHQtZWRpdG9yLWNoYXJhY3RlcnMtcG9wdWxhcicgOicnfVwiICR7Y2hhci5sYXRleENvbW1hbmQgPyBgZGF0YS1jb21tYW5kPVwiJHtjaGFyLmxhdGV4Q29tbWFuZH1cImAgOiAnJ30+JHtjaGFyLmNoYXJhY3Rlcn08L2J1dHRvbj5gXG5cbmNvbnN0IHBvcHVsYXJJbkdyb3VwID0gZ3JvdXAgPT4gZ3JvdXAuY2hhcmFjdGVycy5maWx0ZXIoY2hhcmFjdGVyID0+IGNoYXJhY3Rlci5wb3B1bGFyKS5sZW5ndGhcblxuZnVuY3Rpb24gaW5pdFNwZWNpYWxDaGFyYWN0ZXJUb29sYmFyKCR0b29sYmFyLCBtYXRoRWRpdG9yLCBoYXNBbnN3ZXJGb2N1cykge1xuICAgIGNvbnN0IGdyaWRCdXR0b25XaWR0aFB4ID0gMzVcblxuICAgICR0b29sYmFyLmZpbmQoJ1tkYXRhLWpzPVwiY2hhcmFjdGVyc0xpc3RcIl0nKVxuICAgICAgICAuYXBwZW5kKHNwZWNpYWxDaGFyYWN0ZXJHcm91cHMubWFwKGdyb3VwID0+XG4gICAgICAgICAgICBgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhci1jaGFyYWN0ZXJzLWdyb3VwXCIgXG4gICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAke3BvcHVsYXJJbkdyb3VwKGdyb3VwKSAqIGdyaWRCdXR0b25XaWR0aFB4fXB4XCI+XG4gICAgICAgICAgICAgICAgICAke2dyb3VwLmNoYXJhY3RlcnMubWFwKHNwZWNpYWxDaGFyYWN0ZXJUb0J1dHRvbikuam9pbignJyl9XG4gICAgICAgICAgICAgPC9kaXY+YCkpXG4gICAgICAgIC5vbignbW91c2Vkb3duJywgJ2J1dHRvbicsIGUgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgICAgIGNvbnN0IGNoYXJhY3RlciA9IGUuY3VycmVudFRhcmdldC5pbm5lclRleHRcbiAgICAgICAgICAgIGNvbnN0IGNvbW1hbmQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jb21tYW5kXG4gICAgICAgICAgICBpZiAoaGFzQW5zd2VyRm9jdXMoKSkgd2luZG93LmRvY3VtZW50LmV4ZWNDb21tYW5kKCdpbnNlcnRUZXh0JywgZmFsc2UsIGNoYXJhY3RlcilcbiAgICAgICAgICAgIGVsc2UgbWF0aEVkaXRvci5pbnNlcnRNYXRoKGNvbW1hbmQgfHwgY2hhcmFjdGVyKVxuICAgICAgICB9KVxufVxuXG5mdW5jdGlvbiBpbml0TWF0aFRvb2xiYXIoJG1hdGhUb29sYmFyLCBtYXRoRWRpdG9yLCBiYXNlVXJsKSB7XG4gICAgJG1hdGhUb29sYmFyLmFwcGVuZChsYXRleENvbW1hbmRzXG4gICAgICAgIC5tYXAobyA9PiBgPGJ1dHRvbiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItYnV0dG9uIHJpY2gtdGV4dC1lZGl0b3ItYnV0dG9uLWdyaWRcIiBkYXRhLWNvbW1hbmQ9XCIke28uYWN0aW9ufVwiIGRhdGEtbGF0ZXhjb21tYW5kPVwiJHtvLmxhYmVsIHx8ICcnfVwiIGRhdGEtdXNld3JpdGU9XCIke28udXNlV3JpdGUgfHwgZmFsc2V9XCI+XG48aW1nIHNyYz1cIiR7YmFzZVVybH0vbWF0aC5zdmc/bGF0ZXg9JHtlbmNvZGVVUklDb21wb25lbnQoby5sYWJlbCA/IG8ubGFiZWwucmVwbGFjZSgvWC9nLCAnXFxcXHNxdWFyZScpIDogby5hY3Rpb24pfVwiLz5cbjwvYnV0dG9uPmApLmpvaW4oJycpXG4gICAgKS5vbignbW91c2Vkb3duJywgJ2J1dHRvbicsIGUgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgY29uc3QgZGF0YXNldCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0O1xuICAgICAgICBtYXRoRWRpdG9yLmluc2VydE1hdGgoZGF0YXNldC5jb21tYW5kLCBkYXRhc2V0LmxhdGV4Y29tbWFuZCwgZGF0YXNldC51c2V3cml0ZSA9PT0gJ3RydWUnKVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGluaXROZXdFcXVhdGlvbigkbmV3RXF1YXRpb24sIG1hdGhFZGl0b3IsIGhhc0Fuc3dlckZvY3VzKSB7XG4gICAgJG5ld0VxdWF0aW9uLm1vdXNlZG93bigoZSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBpZiAoIWhhc0Fuc3dlckZvY3VzKCkpIHJldHVybiAvLyBUT0RPOiByZW1vdmUgd2hlbiBidXR0b24gaXMgb25seSB2aXNpYmxlIHdoZW4gdGV4dGFyZWEgaGFzIGZvY3VzXG4gICAgICAgIG1hdGhFZGl0b3IuaW5zZXJ0TmV3RXF1YXRpb24oKVxuICAgIH0pLmJpbmQodGhpcykpXG59XG4iLCJjb25zdCBzYW5pdGl6ZUh0bWwgPSByZXF1aXJlKCdzYW5pdGl6ZS1odG1sJylcbmNvbnN0IHNhbml0aXplT3B0cyA9IHJlcXVpcmUoJy4vc2FuaXRpemVPcHRzJylcbmNvbnN0IGVxdWF0aW9uSW1hZ2VTZWxlY3RvciA9ICdpbWdbc3JjXj1cIi9tYXRoLnN2Z1wiXSdcbmNvbnN0IHNjcmVlbnNob3RJbWFnZVNlbGVjdG9yID0gJ2ltZ1tzcmNePVwiL3NjcmVlbnNob3QvXCJdJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpc0tleSxcbiAgICBpc0N0cmxLZXksXG4gICAgaW5zZXJ0VG9UZXh0QXJlYUF0Q3Vyc29yLFxuICAgIHNhbml0aXplLFxuICAgIHNhbml0aXplQ29udGVudCxcbiAgICBzZXRDdXJzb3JBZnRlcixcbiAgICBlcXVhdGlvbkltYWdlU2VsZWN0b3IsXG4gICAgZXhpc3RpbmdTY3JlZW5zaG90Q291bnQsXG4gICAgc2Nyb2xsSW50b1ZpZXdcbn1cblxuZnVuY3Rpb24gY29udmVydExpbmtzVG9SZWxhdGl2ZShodG1sKSB7XG4gICAgcmV0dXJuIGh0bWwucmVwbGFjZShuZXcgUmVnRXhwKGRvY3VtZW50LmxvY2F0aW9uLm9yaWdpbiwgJ2cnKSwgJycpXG59XG5cbmZ1bmN0aW9uIHNhbml0aXplKGh0bWwpIHtcbiAgICByZXR1cm4gc2FuaXRpemVIdG1sKGNvbnZlcnRMaW5rc1RvUmVsYXRpdmUoaHRtbCksIHNhbml0aXplT3B0cylcbn1cbmZ1bmN0aW9uIGluc2VydFRvVGV4dEFyZWFBdEN1cnNvcihmaWVsZCwgdmFsdWUpIHtcbiAgICBjb25zdCBzdGFydFBvcyA9IGZpZWxkLnNlbGVjdGlvblN0YXJ0XG4gICAgY29uc3QgZW5kUG9zID0gZmllbGQuc2VsZWN0aW9uRW5kXG4gICAgbGV0IG9sZFZhbHVlID0gZmllbGQudmFsdWVcbiAgICBmaWVsZC52YWx1ZSA9IG9sZFZhbHVlLnN1YnN0cmluZygwLCBzdGFydFBvcykgKyB2YWx1ZSArIG9sZFZhbHVlLnN1YnN0cmluZyhlbmRQb3MsIG9sZFZhbHVlLmxlbmd0aClcbiAgICBmaWVsZC5zZWxlY3Rpb25TdGFydCA9IGZpZWxkLnNlbGVjdGlvbkVuZCA9IHN0YXJ0UG9zICsgdmFsdWUubGVuZ3RoXG59XG5cbmZ1bmN0aW9uIGlzS2V5KGUsIGtleSkge1xuICAgIHJldHVybiBwcmV2ZW50SWZUcnVlKGUsICFlLmFsdEtleSAmJiAhZS5zaGlmdEtleSAmJiAhZS5jdHJsS2V5ICYmIGtleU9yS2V5Q29kZShlLCBrZXkpKVxufVxuXG5mdW5jdGlvbiBpc0N0cmxLZXkoZSwga2V5KSB7XG4gICAgcmV0dXJuIHByZXZlbnRJZlRydWUoZSwgIWUuYWx0S2V5ICYmICFlLnNoaWZ0S2V5ICYmIGUuY3RybEtleSAmJiBrZXlPcktleUNvZGUoZSwga2V5KSlcbn1cblxuZnVuY3Rpb24ga2V5T3JLZXlDb2RlKGUsIHZhbCkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJyA/IGUua2V5ID09PSB2YWwgOiBlLmtleUNvZGUgPT09IHZhbFxufVxuZnVuY3Rpb24gcHJldmVudElmVHJ1ZShlLCB2YWwpIHtcbiAgICBpZiAodmFsKSBlLnByZXZlbnREZWZhdWx0KClcbiAgICByZXR1cm4gdmFsXG59XG5cbmZ1bmN0aW9uIHNhbml0aXplQ29udGVudChhbnN3ZXJFbGVtZW50KSB7XG4gICAgY29uc3QgJGFuc3dlckVsZW1lbnQgPSAkKGFuc3dlckVsZW1lbnQpXG4gICAgY29uc3QgJG1hdGhFZGl0b3IgPSAkYW5zd2VyRWxlbWVudC5maW5kKCdbZGF0YS1qcz1cIm1hdGhFZGl0b3JcIl0nKVxuICAgICRtYXRoRWRpdG9yLmhpZGUoKVxuICAgIGNvbnN0IHRleHQgPSAkYW5zd2VyRWxlbWVudC5nZXQoMCkuaW5uZXJUZXh0XG4gICAgJG1hdGhFZGl0b3Iuc2hvdygpXG5cbiAgICBjb25zdCBodG1sID0gc2FuaXRpemUoJGFuc3dlckVsZW1lbnQuaHRtbCgpKVxuXG4gICAgY29uc3QgYW5zd2VyQ29uc2lkZXJlZEVtcHR5ID0gKHRleHQudHJpbSgpLmxlbmd0aCArICRhbnN3ZXJFbGVtZW50LmZpbmQoZXF1YXRpb25JbWFnZVNlbGVjdG9yKS5sZW5ndGggKyAkYW5zd2VyRWxlbWVudC5maW5kKHNjcmVlbnNob3RJbWFnZVNlbGVjdG9yKS5sZW5ndGgpID09PSAwXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhbnN3ZXJIVE1MOiBhbnN3ZXJDb25zaWRlcmVkRW1wdHkgPyAnJyA6IGh0bWwsXG4gICAgICAgIGFuc3dlclRleHQ6IHRleHQsXG4gICAgICAgIGltYWdlQ291bnQ6IGV4aXN0aW5nU2NyZWVuc2hvdENvdW50KCQoYDxkaXY+JHtodG1sfTwvZGl2PmApKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gc2V0Q3Vyc29yQWZ0ZXIoJGltZykge1xuICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKVxuICAgIGNvbnN0IGltZyA9ICRpbWcuZ2V0KDApXG4gICAgcmFuZ2Uuc2V0U3RhcnRBZnRlcihpbWcpXG4gICAgY29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpXG4gICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpXG4gICAgc2VsLmFkZFJhbmdlKHJhbmdlKVxufVxuXG5mdW5jdGlvbiBleGlzdGluZ1NjcmVlbnNob3RDb3VudCgkZWRpdG9yKSB7XG4gICAgY29uc3QgaW1hZ2VDb3VudCA9ICRlZGl0b3IuZmluZCgnaW1nJykubGVuZ3RoXG4gICAgY29uc3QgZW1wdHlJbWFnZUNvdW50ID0gJGVkaXRvci5maW5kKCdpbWdbc3JjPVwiXCJdJykubGVuZ3RoXG4gICAgY29uc3QgZXF1YXRpb25Db3VudCA9ICRlZGl0b3IuZmluZChlcXVhdGlvbkltYWdlU2VsZWN0b3IpLmxlbmd0aFxuICAgIHJldHVybiBpbWFnZUNvdW50IC0gZXF1YXRpb25Db3VudCAtIGVtcHR5SW1hZ2VDb3VudFxufVxuXG5mdW5jdGlvbiBzY3JvbGxJbnRvVmlldygkZWxlbWVudCkge1xuICAgIGNvbnN0ICR3aW5kb3cgPSAkKHdpbmRvdylcbiAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSAkd2luZG93LmhlaWdodCgpIC0gNDBcbiAgICBjb25zdCBzY3JvbGwgPSB3aW5kb3dIZWlnaHQgKyAkd2luZG93LnNjcm9sbFRvcCgpXG4gICAgY29uc3QgcG9zID0gJGVsZW1lbnQub2Zmc2V0KCkudG9wICsgJGVsZW1lbnQuaGVpZ2h0KClcbiAgICBpZiAoc2Nyb2xsIDwgcG9zKSB7XG4gICAgICAgICR3aW5kb3cuc2Nyb2xsVG9wKHBvcyAtIHdpbmRvd0hlaWdodClcbiAgICB9XG59XG4iXX0=
