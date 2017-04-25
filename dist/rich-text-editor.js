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

module.exports = "data:image/gif;base64,R0lGODlhEAAQAPQAAP///wAAAPDw8IqKiuDg4EZGRnp6egAAAFhYWCQkJKysrL6+vhQUFJycnAQEBDY2NmhoaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAAFdyAgAgIJIeWoAkRCCMdBkKtIHIngyMKsErPBYbADpkSCwhDmQCBethRB6Vj4kFCkQPG4IlWDgrNRIwnO4UKBXDufzQvDMaoSDBgFb886MiQadgNABAokfCwzBA8LCg0Egl8jAggGAA1kBIA1BAYzlyILczULC2UhACH5BAAKAAEALAAAAAAQABAAAAV2ICACAmlAZTmOREEIyUEQjLKKxPHADhEvqxlgcGgkGI1DYSVAIAWMx+lwSKkICJ0QsHi9RgKBwnVTiRQQgwF4I4UFDQQEwi6/3YSGWRRmjhEETAJfIgMFCnAKM0KDV4EEEAQLiF18TAYNXDaSe3x6mjidN1s3IQAh+QQACgACACwAAAAAEAAQAAAFeCAgAgLZDGU5jgRECEUiCI+yioSDwDJyLKsXoHFQxBSHAoAAFBhqtMJg8DgQBgfrEsJAEAg4YhZIEiwgKtHiMBgtpg3wbUZXGO7kOb1MUKRFMysCChAoggJCIg0GC2aNe4gqQldfL4l/Ag1AXySJgn5LcoE3QXI3IQAh+QQACgADACwAAAAAEAAQAAAFdiAgAgLZNGU5joQhCEjxIssqEo8bC9BRjy9Ag7GILQ4QEoE0gBAEBcOpcBA0DoxSK/e8LRIHn+i1cK0IyKdg0VAoljYIg+GgnRrwVS/8IAkICyosBIQpBAMoKy9dImxPhS+GKkFrkX+TigtLlIyKXUF+NjagNiEAIfkEAAoABAAsAAAAABAAEAAABWwgIAICaRhlOY4EIgjH8R7LKhKHGwsMvb4AAy3WODBIBBKCsYA9TjuhDNDKEVSERezQEL0WrhXucRUQGuik7bFlngzqVW9LMl9XWvLdjFaJtDFqZ1cEZUB0dUgvL3dgP4WJZn4jkomWNpSTIyEAIfkEAAoABQAsAAAAABAAEAAABX4gIAICuSxlOY6CIgiD8RrEKgqGOwxwUrMlAoSwIzAGpJpgoSDAGifDY5kopBYDlEpAQBwevxfBtRIUGi8xwWkDNBCIwmC9Vq0aiQQDQuK+VgQPDXV9hCJjBwcFYU5pLwwHXQcMKSmNLQcIAExlbH8JBwttaX0ABAcNbWVbKyEAIfkEAAoABgAsAAAAABAAEAAABXkgIAICSRBlOY7CIghN8zbEKsKoIjdFzZaEgUBHKChMJtRwcWpAWoWnifm6ESAMhO8lQK0EEAV3rFopIBCEcGwDKAqPh4HUrY4ICHH1dSoTFgcHUiZjBhAJB2AHDykpKAwHAwdzf19KkASIPl9cDgcnDkdtNwiMJCshACH5BAAKAAcALAAAAAAQABAAAAV3ICACAkkQZTmOAiosiyAoxCq+KPxCNVsSMRgBsiClWrLTSWFoIQZHl6pleBh6suxKMIhlvzbAwkBWfFWrBQTxNLq2RG2yhSUkDs2b63AYDAoJXAcFRwADeAkJDX0AQCsEfAQMDAIPBz0rCgcxky0JRWE1AmwpKyEAIfkEAAoACAAsAAAAABAAEAAABXkgIAICKZzkqJ4nQZxLqZKv4NqNLKK2/Q4Ek4lFXChsg5ypJjs1II3gEDUSRInEGYAw6B6zM4JhrDAtEosVkLUtHA7RHaHAGJQEjsODcEg0FBAFVgkQJQ1pAwcDDw8KcFtSInwJAowCCA6RIwqZAgkPNgVpWndjdyohACH5BAAKAAkALAAAAAAQABAAAAV5ICACAimc5KieLEuUKvm2xAKLqDCfC2GaO9eL0LABWTiBYmA06W6kHgvCqEJiAIJiu3gcvgUsscHUERm+kaCxyxa+zRPk0SgJEgfIvbAdIAQLCAYlCj4DBw0IBQsMCjIqBAcPAooCBg9pKgsJLwUFOhCZKyQDA3YqIQAh+QQACgAKACwAAAAAEAAQAAAFdSAgAgIpnOSonmxbqiThCrJKEHFbo8JxDDOZYFFb+A41E4H4OhkOipXwBElYITDAckFEOBgMQ3arkMkUBdxIUGZpEb7kaQBRlASPg0FQQHAbEEMGDSVEAA1QBhAED1E0NgwFAooCDWljaQIQCE5qMHcNhCkjIQAh+QQACgALACwAAAAAEAAQAAAFeSAgAgIpnOSoLgxxvqgKLEcCC65KEAByKK8cSpA4DAiHQ/DkKhGKh4ZCtCyZGo6F6iYYPAqFgYy02xkSaLEMV34tELyRYNEsCQyHlvWkGCzsPgMCEAY7Cg04Uk48LAsDhRA8MVQPEF0GAgqYYwSRlycNcWskCkApIyEAOwAAAAAAAAAAADxiciAvPgo8Yj5XYXJuaW5nPC9iPjogIG15c3FsX3F1ZXJ5KCkgWzxhIGhyZWY9J2Z1bmN0aW9uLm15c3FsLXF1ZXJ5Jz5mdW5jdGlvbi5teXNxbC1xdWVyeTwvYT5dOiBDYW4ndCBjb25uZWN0IHRvIGxvY2FsIE15U1FMIHNlcnZlciB0aHJvdWdoIHNvY2tldCAnL3Zhci9ydW4vbXlzcWxkL215c3FsZC5zb2NrJyAoMikgaW4gPGI+L2hvbWUvYWpheGxvYWQvd3d3L2xpYnJhaXJpZXMvY2xhc3MubXlzcWwucGhwPC9iPiBvbiBsaW5lIDxiPjY4PC9iPjxiciAvPgo8YnIgLz4KPGI+V2FybmluZzwvYj46ICBteXNxbF9xdWVyeSgpIFs8YSBocmVmPSdmdW5jdGlvbi5teXNxbC1xdWVyeSc+ZnVuY3Rpb24ubXlzcWwtcXVlcnk8L2E+XTogQSBsaW5rIHRvIHRoZSBzZXJ2ZXIgY291bGQgbm90IGJlIGVzdGFibGlzaGVkIGluIDxiPi9ob21lL2FqYXhsb2FkL3d3dy9saWJyYWlyaWVzL2NsYXNzLm15c3FsLnBocDwvYj4gb24gbGluZSA8Yj42ODwvYj48YnIgLz4KPGJyIC8+CjxiPldhcm5pbmc8L2I+OiAgbXlzcWxfcXVlcnkoKSBbPGEgaHJlZj0nZnVuY3Rpb24ubXlzcWwtcXVlcnknPmZ1bmN0aW9uLm15c3FsLXF1ZXJ5PC9hPl06IENhbid0IGNvbm5lY3QgdG8gbG9jYWwgTXlTUUwgc2VydmVyIHRocm91Z2ggc29ja2V0ICcvdmFyL3J1bi9teXNxbGQvbXlzcWxkLnNvY2snICgyKSBpbiA8Yj4vaG9tZS9hamF4bG9hZC93d3cvbGlicmFpcmllcy9jbGFzcy5teXNxbC5waHA8L2I+IG9uIGxpbmUgPGI+Njg8L2I+PGJyIC8+CjxiciAvPgo8Yj5XYXJuaW5nPC9iPjogIG15c3FsX3F1ZXJ5KCkgWzxhIGhyZWY9J2Z1bmN0aW9uLm15c3FsLXF1ZXJ5Jz5mdW5jdGlvbi5teXNxbC1xdWVyeTwvYT5dOiBBIGxpbmsgdG8gdGhlIHNlcnZlciBjb3VsZCBub3QgYmUgZXN0YWJsaXNoZWQgaW4gPGI+L2hvbWUvYWpheGxvYWQvd3d3L2xpYnJhaXJpZXMvY2xhc3MubXlzcWwucGhwPC9iPiBvbiBsaW5lIDxiPjY4PC9iPjxiciAvPgo8YnIgLz4KPGI+V2FybmluZzwvYj46ICBteXNxbF9xdWVyeSgpIFs8YSBocmVmPSdmdW5jdGlvbi5teXNxbC1xdWVyeSc+ZnVuY3Rpb24ubXlzcWwtcXVlcnk8L2E+XTogQ2FuJ3QgY29ubmVjdCB0byBsb2NhbCBNeVNRTCBzZXJ2ZXIgdGhyb3VnaCBzb2NrZXQgJy92YXIvcnVuL215c3FsZC9teXNxbGQuc29jaycgKDIpIGluIDxiPi9ob21lL2FqYXhsb2FkL3d3dy9saWJyYWlyaWVzL2NsYXNzLm15c3FsLnBocDwvYj4gb24gbGluZSA8Yj42ODwvYj48YnIgLz4KPGJyIC8+CjxiPldhcm5pbmc8L2I+OiAgbXlzcWxfcXVlcnkoKSBbPGEgaHJlZj0nZnVuY3Rpb24ubXlzcWwtcXVlcnknPmZ1bmN0aW9uLm15c3FsLXF1ZXJ5PC9hPl06IEEgbGluayB0byB0aGUgc2VydmVyIGNvdWxkIG5vdCBiZSBlc3RhYmxpc2hlZCBpbiA8Yj4vaG9tZS9hamF4bG9hZC93d3cvbGlicmFpcmllcy9jbGFzcy5teXNxbC5waHA8L2I+IG9uIGxpbmUgPGI+Njg8L2I+PGJyIC8+Cg==";

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
        $mathEditorContainer.get(0).scrollIntoView(false);
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
    }).on('keydown', function (e) {
        if (u.isCtrlKey(e, keyCodes.ENTER) || u.isKey(e, keyCodes.ESC)) math.closeMathEditor(true);
    }).on('keypress', function (e) {
        if (u.isCtrlKey(e, 'l') || u.isCtrlKey(e, 'i')) math.insertNewEquation();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvRkkuanMiLCJhcHAvU1YuanMiLCJhcHAvbGF0ZXhDb21tYW5kcy5qcyIsImFwcC9sb2FkaW5nSW1nLmpzIiwiYXBwL21hdGgtZWRpdG9yLmpzIiwiYXBwL3JpY2gtdGV4dC1lZGl0b3IuanMiLCJhcHAvc2FuaXRpemVPcHRzLmpzIiwiYXBwL3NwZWNpYWxDaGFyYWN0ZXJzLmpzIiwiYXBwL3Rvb2xiYXJzLmpzIiwiYXBwL3V0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLE9BQU8sT0FBUCxHQUFpQjtBQUNiLFlBQVE7QUFDSixvQkFBWSxnQkFEUjtBQUVKLGVBQU8seUNBRkg7QUFHSixraEJBSEk7QUFXSixxREFYSTtBQVlKLDRkQVpJO0FBdUJKLG9CQUFZLFVBdkJSO0FBd0JKLDJCQUFtQixlQXhCZjtBQXlCSix3QkFBZ0IsYUF6Qlo7QUEwQkosZUFBTyxPQTFCSDtBQTJCSixjQUFNLFVBM0JGO0FBNEJKLGlCQUFTLFlBNUJMO0FBNkJKLHNCQUFjLG1CQTdCVjtBQThCSixrQkFBVSxLQTlCTjtBQStCSixtQkFBVyxZQS9CUDtBQWdDSixxQkFBYTtBQWhDVCxLQURLO0FBbUNiLGdCQUFZO0FBQ1Isc0JBQWMsbUJBRE47QUFFUixpQkFBUyxZQUZEO0FBR1Isb0JBQVksZ0JBSEo7QUFJUixlQUFPLFdBSkM7QUFLUixrQkFBVSxHQUxGO0FBTVIsdUJBQWUsc0JBTlA7QUFPUixjQUFNLG9CQVBFO0FBUVIsa0JBQVUsZUFSRjtBQVNSLG1CQUFXO0FBVEg7QUFuQ0MsQ0FBakI7Ozs7O0FDQUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsWUFBUTtBQUNKLG9CQUFZLGlCQURSO0FBRUosZUFBTywwQ0FGSDtBQUdKLDZoQkFISTtBQVFKLHdEQVJJO0FBU0osb1lBVEk7QUFrQkosb0JBQVksYUFsQlI7QUFtQkosMkJBQW1CLGVBbkJmO0FBb0JKLHdCQUFnQixrQkFw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LENBQVMsSUFBVCxDQUFjLEtBQWQsRUFBcUIsYUFBckIsQ0FBakI7QUFBQSxhQUhELEVBSVIsT0FKUSxDQUlBO0FBQUEsdUJBQU0sS0FBSyxHQUFMLENBQVMsTUFBVCxFQUFOO0FBQUEsYUFKQSxDQUFSO0FBQUEsU0FENkIsQ0FBckIsRUFNZixPQU5lLENBTVA7QUFBQSxtQkFBSyxRQUFRLE9BQVIsQ0FBZ0IsT0FBaEIsQ0FBTDtBQUFBLFNBTk8sQ0FBTjtBQUFBLEtBQVgsRUFNMEMsQ0FOMUM7QUFPSDs7QUFFRCxTQUFTLGVBQVQsQ0FBeUIsT0FBekIsRUFBa0MsbUJBQWxDLEVBQXVEO0FBQ25ELFdBQU8sd0JBQXdCLE9BQXhCLElBQW1DLHdCQUF3QixZQUFVLG1CQUFWLFlBQXhCLENBQTFDO0FBQ0giLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZWRpdG9yOiB7XG4gICAgICAgIG1hdGhFZGl0b3I6ICdNYXRpa2thZWRpdG9yaScsXG4gICAgICAgIHRpdGxlOiAnS2FhdmFlZGl0b3JpbiBlbnNpbW3DpGluZW4ga2VoaXR5c3ZlcnNpbycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBgPHVsPlxuPGxpPkVkaXRvcmkgdG9pbWlpIHBhcmhhaXRlbiBGaXJlZm94LXNlbGFpbWVsbGEuPC9saT5cbjxsaT7igJxMaXPDpMOkIGthYXZh4oCdIC1uYXBpbiBhbHRhIGzDtnlkw6R0IHlsZWlzaW1wacOkIG1hdGVtYXRpaWthc3NhLCBmeXNpaWthc3NhIGphXG5rZW1pYXNzYSBrw6R5dGV0dMOkdmnDpCBtZXJraW50w7Zqw6QuIExpc8Oka3NpIGVyaWtvaXNtZXJra2Vqw6Qgdm9pIGvDpHl0dMOkw6Qga2FhdmFuIGtpcmpvaXR0YW1pc2Vlbi48L2xpPlxuIDxsaT5LYWF2b2phIHZvaSByYWtlbnRhYVxua2xpa2thYW1hbGxhIHZhbGlrb24gbWVya2ludMO2asOkIGphL3RhaSBraXJqb2l0dGFtYWxsYSBMYVRlWGlhLjwvbGk+XG4gPGxpPkVkaXRvcmluIHZhc3RhdXNrZW50dMOkw6RuIHZvaSBraXJqb2l0dGFhIHRla3N0acOkIGphIGthYXZvamEgc2Vrw6Rcbmxpc8OkdMOkIGt1dmlhLjwvbGk+PC91bD5gLFxuICAgICAgICBzaG9ydGN1dFRpdGxlOiBgUGlrYW7DpHBww6RpbnZpbmtrZWrDpGAsXG4gICAgICAgIHNob3J0Y3V0czogYDx0YWJsZT48dGJvZHk+XG48dHI+PHRoPkxpaXTDpCBrdXZhIGxlaWtlcMO2eWTDpGx0w6Q8L3RoPjx0ZD5DdHJsLVY8L3RkPjwvdHI+XG48dHI+PHRoPktpcmpvaXRhIGthYXZhPC90aD48dGQ+Q3RybC1MIHRhaSBDdHJsLUk8L3RkPjwvdHI+XG48dHI+PHRoIGNvbHNwYW49XCIyXCI+S2FhdmFzc2E8L3RoPjwvdHI+XG48dHI+PHRoPkpha292aWl2YTwvdGg+PHRkPi88L3RkPjwvdHI+XG48dHI+PHRoPktlcnRvbWVya2tpPC90aD48dGQ+KjwvdGQ+PC90cj5cbjx0cj48dGg+RWtzcG9uZW50dGk8L3RoPjx0ZD5ePC90ZD48L3RyPlxuPHRyPjx0aD5TdWxqZSBrYWF2YTwvdGg+PHRkPkN0cmwtRW50ZXIgdGFpIEVzYzwvdGQ+PC90cj5cbjx0cj48dGg+TGlzw6TDpCBrYWF2YSBzZXVyYWF2YWxsZSByaXZpbGxlPC90aD48dGQ+RW50ZXI8L3RkPjwvdHI+XG48L3Rib2R5PlxuPC90YWJsZT5gLFxuICAgICAgICBmb3JtYXR0aW5nOiAnTXVvdG9pbHUnLFxuICAgICAgICBzcGVjaWFsQ2hhcmFjdGVyczogJ0VyaWtvaXNtZXJraXQnLFxuICAgICAgICBpbnNlcnRFcXVhdGlvbjogJ0xpc8Okw6Qga2FhdmEnLFxuICAgICAgICBjbG9zZTogJ3N1bGplJyxcbiAgICAgICAgc2F2ZTogJ1RhbGxlbm5hJyxcbiAgICAgICAgdXBkYXRlZDogJ1DDpGl2aXRldHR5JyxcbiAgICAgICAgc2VuZEZlZWRiYWNrOiAnTMOkaGV0w6QgcGFsYXV0ZXR0YScsXG4gICAgICAgIGxhbmdMaW5rOiAnL3N2JyxcbiAgICAgICAgbGFuZ0xhYmVsOiAnUMOlIHN2ZW5za2EnLFxuICAgICAgICBhbnN3ZXJUaXRsZTogJ1Zhc3RhdXMnXG4gICAgfSxcbiAgICBhbm5vdGF0aW5nOiB7XG4gICAgICAgIHNlbmRGZWVkYmFjazogJ0zDpGhldMOkIHBhbGF1dGV0dGEnLFxuICAgICAgICB1cGRhdGVkOiAnUMOkaXZpdGV0dHknLFxuICAgICAgICBtYXRoRWRpdG9yOiAnTWF0aWtrYWVkaXRvcmknLFxuICAgICAgICB0aXRsZTogJ0Fydm9zdGVsdScsXG4gICAgICAgIGJhY2tMaW5rOiAnLycsXG4gICAgICAgIGJhY2tMaW5rTGFiZWw6ICdQYWxhYSBrYWF2YWVkaXRvcmlpbicsXG4gICAgICAgIHNhdmU6ICdUYWxsZW5uYSBtZXJraW5uw6R0JyxcbiAgICAgICAgbGFuZ0xpbms6ICcvc3YvYmVkb21uaW5nJyxcbiAgICAgICAgbGFuZ0xhYmVsOiAnUMOlIHN2ZW5za2EnXG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZWRpdG9yOiB7XG4gICAgICAgIG1hdGhFZGl0b3I6ICdNYXRlbWF0aWtlZGl0b3InLFxuICAgICAgICB0aXRsZTogJ0Zvcm1lbGVkaXRvcm5zIGbDtnJzdGEgdXR2ZWNrbGluZ3N2ZXJzaW9uJyxcbiAgICAgICAgZGVzY3JpcHRpb246IGA8dWw+XG48bGk+RWRpdG9ybiBmdW5nZXJhciBiw6RzdCBtZWQgYnJvd3Nlcm4gRmlyZWZveC48L2xpPlxuIDxsaT5VbmRlciBrbmFwcGVuIOKAnEzDpGdnIHRpbGwgZm9ybWVs4oCdIGhpdHRhciBkdSBkZSB2YW5saWdhc3RlIGJldGVja25pbmdhcm5hIHNvbSBhbnbDpG5kcyBpIG1hdGVtYXRpaywgZnlzaWsgb2NoIGtlbWkuIERlc3N1dG9tIGthbiBkdSBhbnbDpG5kYSBzcGVjaWFsdGVja2VuIGbDtnIgYXR0IHNrcml2YSBmb3JtbGVyLjwvbGk+XG48bGk+RGV0IGfDpXIgYXR0IGtvbnN0cnVlcmEgZm9ybWxlciBnZW5vbSBhdHQga2xpY2thIHDDpSBiZXRlY2tuaW5nYXJuYSBpIG1lbnllcm5hIG9jaC9lbGxlciBnZW5vbSBhdHQgc2tyaXZhIExhVGVYLjwvbGk+XG48bGk+RGV0IGfDpXIgZsO2cnV0b20gYXR0IHNrcml2YSB0ZXh0IG9jaCBmb3JtbGVyLCBhdHQgb2Nrc8OlIGF0dCBsw6RnZ2EgdGlsbCBiaWxkZXIgaSBzdmFyc2bDpGx0ZXQuPC9saT48L3VsPmAsXG4gICAgICAgIHNob3J0Y3V0VGl0bGU6IGBUaXBzIHDDpSB0YW5nZW50a29tYmluYXRpb25lcmAsXG4gICAgICAgIHNob3J0Y3V0czogYDx0YWJsZT48dGJvZHk+XG48dHI+PHRoPkzDpGdnIHRpbGwgZW4gYmlsZCBmcsOlbiB1cmtsaXBwZXQ8L3RoPjx0ZD5DdHJsLVY8L3RkPjwvdHI+XG48dHI+PHRoPlNrcml2IGVuIGZvcm1lbDwvdGg+PHRkPkN0cmwtTCAvIEN0cmwtSTwvdGQ+PC90cj5cbjx0cj48dGggY29sc3Bhbj1cIjJcIj5JIGZvcm1lbG4gPC90aD48L3RyPlxuPHRyPjx0aD5CcsOla3N0cmVjazwvdGg+PHRkPi88L3RkPjwvdHI+XG48dHI+PHRoPk11bHRpcGxpa2F0aW9uc3RlY2tlbjwvdGg+PHRkPio8L3RkPjwvdHI+XG48dHI+PHRoPlN0w6RuZyBmb3JtZWxuPC90aD48dGQ+Q3RybC1FbnRlciBlbGxlciBFc2M8L3RkPjwvdHI+XG48L3Rib2R5PlxuPC90YWJsZT5gLFxuICAgICAgICBmb3JtYXR0aW5nOiAnRm9ybWF0ZXJpbmcnLFxuICAgICAgICBzcGVjaWFsQ2hhcmFjdGVyczogJ1NwZWNpYWx0ZWNrZW4nLFxuICAgICAgICBpbnNlcnRFcXVhdGlvbjogJ0zDpGdnIHRpbGwgZm9ybWVsJyxcbiAgICAgICAgY2xvc2U6ICdzdMOkbmcnLFxuICAgICAgICBzYXZlOiAnU3BhcmEnLFxuICAgICAgICB1cGRhdGVkOiAnVXBwZGF0ZXJhZCcsXG4gICAgICAgIHNlbmRGZWVkYmFjazogJ1NraWNrYSBmZWVkYmFjaycsXG4gICAgICAgIGxhbmdMaW5rOiAnLycsXG4gICAgICAgIGxhbmdMYWJlbDogJ1N1b21la3NpJyxcbiAgICAgICAgYW5zd2VyVGl0bGU6ICdTdmFyJ1xuICAgIH0sXG4gICAgYW5ub3RhdGluZzoge1xuICAgICAgICBzZW5kRmVlZGJhY2s6ICdTa2lja2EgcmVzcG9ucycsXG4gICAgICAgIHVwZGF0ZWQ6ICdVcHBkYXRlcmFkJyxcbiAgICAgICAgbWF0aEVkaXRvcjogJ01hdGVtYXRpa2VkaXRvcicsXG4gICAgICAgIHRpdGxlOiAnQmVkw7ZtbmluZycsXG4gICAgICAgIGJhY2tMaW5rOiAnL3N2JyxcbiAgICAgICAgYmFja0xpbmtMYWJlbDogJ01hdGVtYXRpa2VkaXRvcicsXG4gICAgICAgIHNhdmU6ICdTcGFyYSBhbnRlY2tuaW5nYXInLFxuICAgICAgICBsYW5nTGluazogJy90YXJraXN0dXMnLFxuICAgICAgICBsYW5nTGFiZWw6ICdTdW9tZWtzaSdcbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAgICB7YWN0aW9uOiAnXFxcXHNxcnQnLCBsYWJlbDogJ1xcXFxzcXJ0e1h9J30sXG4gICAge2FjdGlvbjogJ14nLCBsYWJlbDogJ3hee1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxmcmFjJywgbGFiZWw6ICdcXFxcZnJhY3tYfXtYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcaW50JywgbGFiZWw6ICdcXFxcaW50X3tYfV57WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGxpbV8nLCBsYWJlbDogJ1xcXFxsaW1fe1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxsaW1fe3hcXFxccmlnaHRhcnJvd1xcXFxpbmZ0eX0nLCBsYWJlbDogJ1xcXFxsaW1fe3hcXFxccmlnaHRhcnJvd1xcXFxpbmZ0eX0nLCB1c2VXcml0ZTp0cnVlfSxcbiAgICB7YWN0aW9uOiAnXFxcXG92ZXJyaWdodGFycm93JywgbGFiZWw6ICdcXFxcb3ZlcnJpZ2h0YXJyb3d7WH0nfSxcbiAgICB7YWN0aW9uOiAnXycsIGxhYmVsOiAneF9YJ30sXG4gICAge2FjdGlvbjogJ1xcXFxudGhyb290JywgbGFiZWw6ICdcXFxcc3FydFtYXXtYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcc3VtJywgbGFiZWw6ICdcXFxcc3VtX3tYfV57WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGJpbm9tJywgbGFiZWw6ICdcXFxcYmlub217WH17WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXHNpbid9LFxuICAgIHthY3Rpb246ICdcXFxcY29zJ30sXG4gICAge2FjdGlvbjogJ1xcXFx0YW4nfSxcbiAgICB7YWN0aW9uOiAnXFxcXHZlYycsIGxhYmVsOiAnXFxcXHZlY3tYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcYmFyJywgbGFiZWw6ICdcXFxcYmFye1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxvdmVybGluZXtcXFxcdGV4dHtpfX0nLCB1c2VXcml0ZTogdHJ1ZX0sXG4gICAge2FjdGlvbjogJ1xcXFxvdmVybGluZXtcXFxcdGV4dHtqfX0nLCB1c2VXcml0ZTogdHJ1ZX0sXG4gICAge2FjdGlvbjogJ1xcXFxvdmVybGluZXtcXFxcdGV4dHtrfX0nLCB1c2VXcml0ZTogdHJ1ZX0sXG4gICAge2FjdGlvbjogJ1xcXFxvdmVybGVmdGFycm93JywgbGFiZWw6ICdcXFxcb3ZlcmxlZnRhcnJvd3tYfSd9LFxuICAgIHthY3Rpb246ICd8JywgbGFiZWw6ICd8WHwnfSxcbiAgICB7YWN0aW9uOiAnKCcsIGxhYmVsOiAnKFgpJ30sXG4gICAge2FjdGlvbjogJ197IH1eeyB9ICcsIGxhYmVsOiAnX3tYfV57WH1YJywgdXNlV3JpdGU6IHRydWV9LFxuICAgIHthY3Rpb246ICdcXFxcdGV4dCcsIGxhYmVsOiAnXFxcXHRleHR7VH0nfSxcbl1cbiIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhFQUFRQVBRQUFQLy8vd0FBQVBEdzhJcUtpdURnNEVaR1JucDZlZ0FBQUZoWVdDUWtKS3lzckw2K3ZoUVVGSnljbkFRRUJEWTJObWhvYUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUNIK0drTnlaV0YwWldRZ2QybDBhQ0JoYW1GNGJHOWhaQzVwYm1adkFDSDVCQUFLQUFBQUlmOExUa1ZVVTBOQlVFVXlMakFEQVFBQUFDd0FBQUFBRUFBUUFBQUZkeUFnQWdJSkllV29Ba1JDQ01kQmtLdElISW5neU1Lc0VyUEJZYkFEcGtTQ3doRG1RQ0JldGhSQjZWajRrRkNrUVBHNElsV0Rnck5SSXduTzRVS0JYRHVmelF2RE1hb1NEQmdGYjg4Nk1pUWFkZ05BQkFva2ZDd3pCQThMQ2cwRWdsOGpBZ2dHQUExa0JJQTFCQVl6bHlJTGN6VUxDMlVoQUNINUJBQUtBQUVBTEFBQUFBQVFBQkFBQUFWMklDQUNBbWxBWlRtT1JFRUl5VUVRakxLS3hQSEFEaEV2cXhsZ2NHZ2tHSTFEWVNWQUlBV014K2x3U0trSUNKMFFzSGk5UmdLQnduVlRpUlFRZ3dGNEk0VUZEUVFFd2k2LzNZU0dXUlJtamhFRVRBSmZJZ01GQ25BS00wS0RWNEVFRUFRTGlGMThUQVlOWERhU2UzeDZtamlkTjFzM0lRQWgrUVFBQ2dBQ0FDd0FBQUFBRUFBUUFBQUZlQ0FnQWdMWkRHVTVqZ1JFQ0VVaUNJK3lpb1NEd0RKeUxLc1hvSEZReEJTSEFvQUFGQmhxdE1KZzhEZ1FCZ2ZyRXNKQUVBZzRZaFpJRWl3Z0t0SGlNQmd0cGczd2JVWlhHTzdrT2IxTVVLUkZNeXNDQ2hBb2dnSkNJZzBHQzJhTmU0Z3FRbGRmTDRsL0FnMUFYeVNKZ241TGNvRTNRWEkzSVFBaCtRUUFDZ0FEQUN3QUFBQUFFQUFRQUFBRmRpQWdBZ0xaTkdVNWpvUWhDRWp4SXNzcUVvOGJDOUJSank5QWc3R0lMUTRRRW9FMGdCQUVCY09wY0JBMERveFNLL2U4TFJJSG4raTFjSzBJeUtkZzBWQW9sallJZytHZ25ScndWUy84SUFrSUN5b3NCSVFwQkFNb0t5OWRJbXhQaFMrR0trRnJrWCtUaWd0TGxJeUtYVUYrTmphZ05pRUFJZmtFQUFvQUJBQXNBQUFBQUJBQUVBQUFCV3dnSUFJQ2FSaGxPWTRFSWdqSDhSN0xLaEtIR3dzTXZiNEFBeTNXT0RCSUJCS0NzWUE5VGp1aEROREtFVlNFUmV6UUVMMFdyaFh1Y1JVUUd1aWs3YkZsbmd6cVZXOUxNbDlYV3ZMZGpGYUp0REZxWjFjRVpVQjBkVWd2TDNkZ1A0V0pabjRqa29tV05wU1RJeUVBSWZrRUFBb0FCUUFzQUFBQUFCQUFFQUFBQlg0Z0lBSUN1U3hsT1k2Q0lnaUQ4UnJFS2dxR093eHdVck1sQW9Td0l6QUdwSnBnb1NEQUdpZkRZNWtvcEJZRGxFcEFRQndldnhmQnRSSVVHaTh4d1drRE5CQ0l3bUM5VnEwYWlRUURRdUsrVmdRUERYVjloQ0pqQndjRllVNXBMd3dIWFFjTUtTbU5MUWNJQUV4bGJIOEpCd3R0YVgwQUJBY05iV1ZiS3lFQUlma0VBQW9BQmdBc0FBQUFBQkFBRUFBQUJYa2dJQUlDU1JCbE9ZN0NJZ2hOOHpiRUtzS29JamRGelphRWdVQkhLQ2hNSnRSd2NXcEFXb1duaWZtNkVTQU1oTzhsUUswRUVBVjNyRm9wSUJDRWNHd0RLQXFQaDRIVXJZNElDSEgxZFNvVEZnY0hVaVpqQmhBSkIyQUhEeWtwS0F3SEF3ZHpmMTlLa0FTSVBsOWNEZ2NuRGtkdE53aU1KQ3NoQUNINUJBQUtBQWNBTEFBQUFBQVFBQkFBQUFWM0lDQUNBa2tRWlRtT0Fpb3NpeUFveENxK0tQeENOVnNTTVJnQnNpQ2xXckxUU1dGb0lRWkhsNnBsZUJoNnN1eEtNSWhsdnpiQXdrQldmRldyQlFUeE5McTJSRzJ5aFNVa0RzMmI2M0FZREFvSlhBY0ZSd0FEZUFrSkRYMEFRQ3NFZkFRTURBSVBCejByQ2djeGt5MEpSV0UxQW13cEt5RUFJZmtFQUFvQUNBQXNBQUFBQUJBQUVBQUFCWGtnSUFJQ0taemtxSjRuUVp4THFaS3Y0TnFOTEtLMi9RNEVrNGxGWENoc2c1eXBKanMxSUkzZ0VEVVNSSW5FR1lBdzZCNnpNNEpockRBdEVvc1ZrTFV0SEE3UkhhSEFHSlFFanNPRGNFZzBGQkFGVmdrUUpRMXBBd2NERHc4S2NGdFNJbndKQW93Q0NBNlJJd3FaQWdrUE5nVnBXbmRqZHlvaEFDSDVCQUFLQUFrQUxBQUFBQUFRQUJBQUFBVjVJQ0FDQWltYzVLaWVMRXVVS3ZtMnhBS0xxRENmQzJHYU85ZUwwTEFCV1RpQlltQTA2VzZrSGd2Q3FFSmlBSUppdTNnY3ZnVXNzY0hVRVJtK2thQ3h5eGErelJQazBTZ0pFZ2ZJdmJBZElBUUxDQVlsQ2o0REJ3MElCUXNNQ2pJcUJBY1BBb29DQmc5cEtnc0pMd1VGT2hDWkt5UURBM1lxSVFBaCtRUUFDZ0FLQUN3QUFBQUFFQUFRQUFBRmRTQWdBZ0lwbk9Tb25teGJxaVRoQ3JKS0VIRmJvOEp4RERPWllGRmIrQTQxRTRINE9oa09pcFh3QkVsWUlUREFja0ZFT0JnTVEzYXJrTWtVQmR4SVVHWnBFYjdrYVFCUmxBU1BnMEZRUUhBYkVFTUdEU1ZFQUExUUJoQUVEMUUwTmd3RkFvb0NEV2xqYVFJUUNFNXFNSGNOaENraklRQWgrUVFBQ2dBTEFDd0FBQUFBRUFBUUFBQUZlU0FnQWdJcG5PU29MZ3h4dnFnS0xFY0NDNjVLRUFCeUtLOGNTcEE0REFpSFEvRGtLaEdLaDRaQ3RDeVpHbzZGNmlZWVBBcUZnWXkwMnhrU2FMRU1WMzR0RUx5UllORXNDUXlIbHZXa0dDenNQZ01DRUFZN0NnMDRVazQ4TEFzRGhSQThNVlFQRUYwR0FncVlZd1NSbHljTmNXc2tDa0FwSXlFQU93QUFBQUFBQUFBQUFEeGljaUF2UGdvOFlqNVhZWEp1YVc1blBDOWlQam9nSUcxNWMzRnNYM0YxWlhKNUtDa2dXenhoSUdoeVpXWTlKMloxYm1OMGFXOXVMbTE1YzNGc0xYRjFaWEo1Sno1bWRXNWpkR2x2Ymk1dGVYTnhiQzF4ZFdWeWVUd3ZZVDVkT2lCRFlXNG5kQ0JqYjI1dVpXTjBJSFJ2SUd4dlkyRnNJRTE1VTFGTUlITmxjblpsY2lCMGFISnZkV2RvSUhOdlkydGxkQ0FuTDNaaGNpOXlkVzR2YlhsemNXeGtMMjE1YzNGc1pDNXpiMk5ySnlBb01pa2dhVzRnUEdJK0wyaHZiV1V2WVdwaGVHeHZZV1F2ZDNkM0wyeHBZbkpoYVhKcFpYTXZZMnhoYzNNdWJYbHpjV3d1Y0dod1BDOWlQaUJ2YmlCc2FXNWxJRHhpUGpZNFBDOWlQanhpY2lBdlBnbzhZbklnTHo0S1BHSStWMkZ5Ym1sdVp6d3ZZajQ2SUNCdGVYTnhiRjl4ZFdWeWVTZ3BJRnM4WVNCb2NtVm1QU2RtZFc1amRHbHZiaTV0ZVhOeGJDMXhkV1Z5ZVNjK1puVnVZM1JwYjI0dWJYbHpjV3d0Y1hWbGNuazhMMkUrWFRvZ1FTQnNhVzVySUhSdklIUm9aU0J6WlhKMlpYSWdZMjkxYkdRZ2JtOTBJR0psSUdWemRHRmliR2x6YUdWa0lHbHVJRHhpUGk5b2IyMWxMMkZxWVhoc2IyRmtMM2QzZHk5c2FXSnlZV2x5YVdWekwyTnNZWE56TG0xNWMzRnNMbkJvY0R3dllqNGdiMjRnYkdsdVpTQThZajQyT0R3dllqNDhZbklnTHo0S1BHSnlJQzgrQ2p4aVBsZGhjbTVwYm1jOEwySStPaUFnYlhsemNXeGZjWFZsY25rb0tTQmJQR0VnYUhKbFpqMG5ablZ1WTNScGIyNHViWGx6Y1d3dGNYVmxjbmtuUG1aMWJtTjBhVzl1TG0xNWMzRnNMWEYxWlhKNVBDOWhQbDA2SUVOaGJpZDBJR052Ym01bFkzUWdkRzhnYkc5allXd2dUWGxUVVV3Z2MyVnlkbVZ5SUhSb2NtOTFaMmdnYzI5amEyVjBJQ2N2ZG1GeUwzSjFiaTl0ZVhOeGJHUXZiWGx6Y1d4a0xuTnZZMnNuSUNneUtTQnBiaUE4WWo0dmFHOXRaUzloYW1GNGJHOWhaQzkzZDNjdmJHbGljbUZwY21sbGN5OWpiR0Z6Y3k1dGVYTnhiQzV3YUhBOEwySStJRzl1SUd4cGJtVWdQR0krTmpnOEwySStQR0p5SUM4K0NqeGljaUF2UGdvOFlqNVhZWEp1YVc1blBDOWlQam9nSUcxNWMzRnNYM0YxWlhKNUtDa2dXenhoSUdoeVpXWTlKMloxYm1OMGFXOXVMbTE1YzNGc0xYRjFaWEo1Sno1bWRXNWpkR2x2Ymk1dGVYTnhiQzF4ZFdWeWVUd3ZZVDVkT2lCQklHeHBibXNnZEc4Z2RHaGxJSE5sY25abGNpQmpiM1ZzWkNCdWIzUWdZbVVnWlhOMFlXSnNhWE5vWldRZ2FXNGdQR0krTDJodmJXVXZZV3BoZUd4dllXUXZkM2QzTDJ4cFluSmhhWEpwWlhNdlkyeGhjM011YlhsemNXd3VjR2h3UEM5aVBpQnZiaUJzYVc1bElEeGlQalk0UEM5aVBqeGljaUF2UGdvOFluSWdMejRLUEdJK1YyRnlibWx1Wnp3dllqNDZJQ0J0ZVhOeGJGOXhkV1Z5ZVNncElGczhZU0JvY21WbVBTZG1kVzVqZEdsdmJpNXRlWE54YkMxeGRXVnllU2MrWm5WdVkzUnBiMjR1YlhsemNXd3RjWFZsY25rOEwyRStYVG9nUTJGdUozUWdZMjl1Ym1WamRDQjBieUJzYjJOaGJDQk5lVk5SVENCelpYSjJaWElnZEdoeWIzVm5hQ0J6YjJOclpYUWdKeTkyWVhJdmNuVnVMMjE1YzNGc1pDOXRlWE54YkdRdWMyOWpheWNnS0RJcElHbHVJRHhpUGk5b2IyMWxMMkZxWVhoc2IyRmtMM2QzZHk5c2FXSnlZV2x5YVdWekwyTnNZWE56TG0xNWMzRnNMbkJvY0R3dllqNGdiMjRnYkdsdVpTQThZajQyT0R3dllqNDhZbklnTHo0S1BHSnlJQzgrQ2p4aVBsZGhjbTVwYm1jOEwySStPaUFnYlhsemNXeGZjWFZsY25rb0tTQmJQR0VnYUhKbFpqMG5ablZ1WTNScGIyNHViWGx6Y1d3dGNYVmxjbmtuUG1aMWJtTjBhVzl1TG0xNWMzRnNMWEYxWlhKNVBDOWhQbDA2SUVFZ2JHbHVheUIwYnlCMGFHVWdjMlZ5ZG1WeUlHTnZkV3hrSUc1dmRDQmlaU0JsYzNSaFlteHBjMmhsWkNCcGJpQThZajR2YUc5dFpTOWhhbUY0Ykc5aFpDOTNkM2N2YkdsaWNtRnBjbWxsY3k5amJHRnpjeTV0ZVhOeGJDNXdhSEE4TDJJK0lHOXVJR3hwYm1VZ1BHSStOamc4TDJJK1BHSnlJQzgrQ2c9PVwiXG4iLCJjb25zdCB1ID0gcmVxdWlyZSgnLi91dGlsJylcblxuY29uc3QgTVEgPSBNYXRoUXVpbGwuZ2V0SW50ZXJmYWNlKDIpXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fVxuXG5mdW5jdGlvbiBpbml0KCRvdXRlclBsYWNlaG9sZGVyLCBmb2N1cywgb25NYXRoRm9jdXNDaGFuZ2VkKSB7XG4gICAgY29uc3QgJG1hdGhFZGl0b3JDb250YWluZXIgPSAkKGBcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1hdGgtZWRpdG9yXCIgZGF0YS1qcz1cIm1hdGhFZGl0b3JcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYXRoLWVkaXRvci1lcXVhdGlvbi1maWVsZFwiIGRhdGEtanM9XCJlcXVhdGlvbkZpZWxkXCI+PC9kaXY+XG4gICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCJtYXRoLWVkaXRvci1sYXRleC1maWVsZFwiIGRhdGEtanM9XCJsYXRleEZpZWxkXCIgcGxhY2Vob2xkZXI9XCJMYVRleFwiPjwvdGV4dGFyZWE+XG4gICAgICAgIDwvZGl2PmApXG5cbiAgICAkb3V0ZXJQbGFjZWhvbGRlci5hcHBlbmQoJG1hdGhFZGl0b3JDb250YWluZXIpXG4gICAgY29uc3QgJGxhdGV4RmllbGQgPSAkbWF0aEVkaXRvckNvbnRhaW5lci5maW5kKCdbZGF0YS1qcz1cImxhdGV4RmllbGRcIl0nKVxuICAgIGNvbnN0ICRlcXVhdGlvbkZpZWxkID0gJG1hdGhFZGl0b3JDb250YWluZXIuZmluZCgnW2RhdGEtanM9XCJlcXVhdGlvbkZpZWxkXCJdJylcbiAgICBsZXQgbXFFZGl0VGltZW91dFxuICAgIGxldCB2aXNpYmxlID0gZmFsc2VcbiAgICBsZXQgZm9jdXNDaGFuZ2VkID0gbnVsbFxuICAgIC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9scyxKU1VudXNlZExvY2FsU3ltYm9sc1xuICAgIGNvbnN0IG1xSW5zdGFuY2UgPSBNUS5NYXRoRmllbGQoJGVxdWF0aW9uRmllbGQuZ2V0KDApLCB7XG4gICAgICAgIGhhbmRsZXJzOiB7XG4gICAgICAgICAgICBlZGl0OiBvbk1xRWRpdCxcbiAgICAgICAgICAgIGVudGVyOiBmaWVsZCA9PiB7XG4gICAgICAgICAgICAgICAgY2xvc2VNYXRoRWRpdG9yKHRydWUpXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBpbnNlcnROZXdFcXVhdGlvbignPGJyPicpLCAyKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbiAgICAkZXF1YXRpb25GaWVsZFxuICAgICAgICAub24oJ2tleWRvd24nLCAnLm1xLXRleHRhcmVhIHRleHRhcmVhJywgb25NcUVkaXQpXG4gICAgICAgIC5vbignZm9jdXMgYmx1cicsICcubXEtdGV4dGFyZWEgdGV4dGFyZWEnLCBlID0+IHtcbiAgICAgICAgICAgIGZvY3VzLmVxdWF0aW9uRmllbGQgPSBlLnR5cGUgIT09ICdibHVyJyAmJiBlLnR5cGUgIT09ICdmb2N1c291dCdcbiAgICAgICAgICAgIG9uRm9jdXNDaGFuZ2VkKClcbiAgICAgICAgfSlcblxuICAgICRsYXRleEZpZWxkXG4gICAgICAgIC5rZXl1cChvbkxhdGV4VXBkYXRlKVxuICAgICAgICAub24oJ2ZvY3VzIGJsdXInLCBlID0+IHtcbiAgICAgICAgICAgIGZvY3VzLmxhdGV4RmllbGQgPSBlLnR5cGUgIT09ICdibHVyJ1xuICAgICAgICAgICAgb25Gb2N1c0NoYW5nZWQoKVxuICAgICAgICB9KVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5zZXJ0TmV3RXF1YXRpb24sXG4gICAgICAgIGluc2VydE1hdGgsXG4gICAgICAgIGNsb3NlTWF0aEVkaXRvcixcbiAgICAgICAgb3Blbk1hdGhFZGl0b3IsXG4gICAgICAgIG9uRm9jdXNDaGFuZ2VkLFxuICAgICAgICBpc1Zpc2libGVcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1Zpc2libGUoKSB7XG4gICAgICAgIHJldHVybiB2aXNpYmxlXG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uTXFFZGl0KCkge1xuICAgICAgICBjbGVhclRpbWVvdXQobXFFZGl0VGltZW91dClcbiAgICAgICAgbXFFZGl0VGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGZvY3VzLmxhdGV4RmllbGQpXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICBjb25zdCBsYXRleCA9IG1xSW5zdGFuY2UubGF0ZXgoKVxuICAgICAgICAgICAgJGxhdGV4RmllbGQudmFsKGxhdGV4KVxuICAgICAgICAgICAgdXBkYXRlTWF0aEltZygkbWF0aEVkaXRvckNvbnRhaW5lci5wcmV2KCksIGxhdGV4KVxuICAgICAgICB9LCAxMDApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25MYXRleFVwZGF0ZSgpIHtcbiAgICAgICAgdXBkYXRlTWF0aEltZygkbWF0aEVkaXRvckNvbnRhaW5lci5wcmV2KCksICRsYXRleEZpZWxkLnZhbCgpKVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IG1xSW5zdGFuY2UubGF0ZXgoJGxhdGV4RmllbGQudmFsKCkpLCAxKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRm9jdXNDaGFuZ2VkKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoZm9jdXNDaGFuZ2VkKVxuICAgICAgICBmb2N1c0NoYW5nZWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICghZm9jdXMubGF0ZXhGaWVsZCAmJiAhZm9jdXMuZXF1YXRpb25GaWVsZCkgY2xvc2VNYXRoRWRpdG9yKClcbiAgICAgICAgICAgIG9uTWF0aEZvY3VzQ2hhbmdlZCgpXG4gICAgICAgIH0sIDApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zZXJ0TmV3RXF1YXRpb24ob3B0aW9uYWxNYXJrdXAgPSAnJykge1xuICAgICAgICB3aW5kb3cuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydEhUTUwnLCBmYWxzZSwgb3B0aW9uYWxNYXJrdXAgKyAnPGltZyBkYXRhLWpzPVwibmV3XCIgYWx0PVwiXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lXCIvPicpXG4gICAgICAgIHNob3dNYXRoRWRpdG9yKCQoJ1tkYXRhLWpzPVwibmV3XCJdJykucmVtb3ZlQXR0cignZGF0YS1qcycpKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9wZW5NYXRoRWRpdG9yKCRpbWcpIHtcbiAgICAgICAgaWYgKHZpc2libGUpIGNsb3NlTWF0aEVkaXRvcigpXG4gICAgICAgIHUuc2V0Q3Vyc29yQWZ0ZXIoJGltZylcbiAgICAgICAgc2hvd01hdGhFZGl0b3IoJGltZylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaG93TWF0aEVkaXRvcigkaW1nKSB7XG4gICAgICAgICRpbWcuaGlkZSgpXG4gICAgICAgICRpbWcuYWZ0ZXIoJG1hdGhFZGl0b3JDb250YWluZXIpXG4gICAgICAgIHZpc2libGUgPSB0cnVlXG4gICAgICAgIHRvZ2dsZU1hdGhUb29sYmFyKHRydWUpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gbXFJbnN0YW5jZS5mb2N1cygpLCAwKVxuICAgICAgICAkbGF0ZXhGaWVsZC52YWwoJGltZy5wcm9wKCdhbHQnKSlcbiAgICAgICAgb25MYXRleFVwZGF0ZSgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zZXJ0TWF0aChzeW1ib2wsIGFsdGVybmF0aXZlU3ltYm9sLCB1c2VXcml0ZSkge1xuICAgICAgICBpZiAoZm9jdXMubGF0ZXhGaWVsZCkge1xuICAgICAgICAgICAgdS5pbnNlcnRUb1RleHRBcmVhQXRDdXJzb3IoJGxhdGV4RmllbGQuZ2V0KDApLCBhbHRlcm5hdGl2ZVN5bWJvbCB8fCBzeW1ib2wpXG4gICAgICAgICAgICBvbkxhdGV4VXBkYXRlKClcbiAgICAgICAgfSBlbHNlIGlmIChmb2N1cy5lcXVhdGlvbkZpZWxkKSB7XG4gICAgICAgICAgICBpZiAodXNlV3JpdGUpIHtcbiAgICAgICAgICAgICAgICBtcUluc3RhbmNlLndyaXRlKHN5bWJvbClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbXFJbnN0YW5jZS50eXBlZFRleHQoc3ltYm9sKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN5bWJvbC5zdGFydHNXaXRoKCdcXFxcJykpIG1xSW5zdGFuY2Uua2V5c3Ryb2tlKCdUYWInKVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBtcUluc3RhbmNlLmZvY3VzKCksIDApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVNYXRoSW1nKCRpbWcsIGxhdGV4KSB7XG4gICAgICAgICRpbWcucHJvcCh7XG4gICAgICAgICAgICBzcmM6ICcvbWF0aC5zdmc/bGF0ZXg9JyArIGVuY29kZVVSSUNvbXBvbmVudChsYXRleCksXG4gICAgICAgICAgICBhbHQ6IGxhdGV4XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvc2VNYXRoRWRpdG9yKHNldEZvY3VzQWZ0ZXJDbG9zZSA9IGZhbHNlKSB7XG4gICAgICAgIC8vIFRPRE86IHJlbW92ZSBldmVudCBiaW5kaW5nc1xuICAgICAgICBjb25zdCAkY3VycmVudEVkaXRvciA9ICRtYXRoRWRpdG9yQ29udGFpbmVyLmNsb3Nlc3QoJ1tkYXRhLWpzPVwiYW5zd2VyXCJdJylcbiAgICAgICAgY29uc3QgJGltZyA9ICRtYXRoRWRpdG9yQ29udGFpbmVyLnByZXYoKVxuICAgICAgICBpZiAoJGxhdGV4RmllbGQudmFsKCkudHJpbSgpID09PSAnJykge1xuICAgICAgICAgICAgJGltZy5yZW1vdmUoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGltZy5zaG93KClcbiAgICAgICAgICAgIHVwZGF0ZU1hdGhJbWcoJGltZywgJGxhdGV4RmllbGQudmFsKCkpXG4gICAgICAgIH1cblxuICAgICAgICB0b2dnbGVNYXRoVG9vbGJhcihmYWxzZSlcbiAgICAgICAgJG91dGVyUGxhY2Vob2xkZXIuYXBwZW5kKCRtYXRoRWRpdG9yQ29udGFpbmVyKVxuICAgICAgICB2aXNpYmxlID0gZmFsc2VcbiAgICAgICAgZm9jdXMubGF0ZXhGaWVsZCA9IGZhbHNlXG4gICAgICAgIGZvY3VzLmVxdWF0aW9uRmllbGQgPSBmYWxzZVxuICAgICAgICBpZiAoc2V0Rm9jdXNBZnRlckNsb3NlKSAkY3VycmVudEVkaXRvci5mb2N1cygpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlTWF0aFRvb2xiYXIoaXNWaXNpYmxlKSB7XG4gICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnbWF0aC1lZGl0b3ItZm9jdXMnLCBpc1Zpc2libGUpXG4gICAgfVxufVxuIiwiY29uc3QgdSA9IHJlcXVpcmUoJy4vdXRpbCcpXG5jb25zdCB0b29sYmFycyA9IHJlcXVpcmUoJy4vdG9vbGJhcnMnKVxuY29uc3QgbWF0aEVkaXRvciA9IHJlcXVpcmUoJy4vbWF0aC1lZGl0b3InKVxuY29uc3QgbG9jYWxlcyA9IHtcbiAgICBGSTogcmVxdWlyZSgnLi9GSScpLFxuICAgIFNWOiByZXF1aXJlKCcuL1NWJylcbn1cbmNvbnN0IGwgPSBsb2NhbGVzW3dpbmRvdy5sb2NhbGUgfHwgJ0ZJJ10uZWRpdG9yXG5jb25zdCBrZXlDb2RlcyA9IHtcbiAgICBFTlRFUjogMTMsXG4gICAgRVNDOiAyN1xufVxuY29uc3QgJG91dGVyUGxhY2Vob2xkZXIgPSAkKGA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci1oaWRkZW5cIiBkYXRhLWpzPVwib3V0ZXJQbGFjZWhvbGRlclwiPmApXG5jb25zdCBmb2N1cyA9IHtcbiAgICByaWNoVGV4dDogZmFsc2UsXG4gICAgbGF0ZXhGaWVsZDogZmFsc2UsXG4gICAgZXF1YXRpb25GaWVsZDogZmFsc2Vcbn1cbmxldCAkY3VycmVudEVkaXRvclxuY29uc3QgbWF0aCA9IG1hdGhFZGl0b3IuaW5pdCgkb3V0ZXJQbGFjZWhvbGRlciwgZm9jdXMsIG9uTWF0aEZvY3VzQ2hhbmdlZClcblxuZnVuY3Rpb24gb25NYXRoRm9jdXNDaGFuZ2VkKCkge1xuICAgIGlmIChyaWNoVGV4dEFuZE1hdGhCbHVyKCkpIG9uUmljaFRleHRFZGl0b3JCbHVyKClcbn1cblxuY29uc3QgeyR0b29sYmFyfSA9IHRvb2xiYXJzLmluaXQobWF0aCwgKCkgPT4gZm9jdXMucmljaFRleHQsIGwpXG5cbiQoJ2JvZHknKS5hcHBlbmQoJG91dGVyUGxhY2Vob2xkZXIsICR0b29sYmFyKVxuXG5tb2R1bGUuZXhwb3J0cy5tYWtlUmljaFRleHQgPSAoZWxlbWVudCwgb3B0aW9ucywgb25WYWx1ZUNoYW5nZWQgPSAoKSA9PiB7IH0pID0+IHtcbiAgICBjb25zdCB7XG4gICAgICAgIHNjcmVlbnNob3Q6IHtcbiAgICAgICAgICAgIHNhdmVyLFxuICAgICAgICAgICAgbGltaXRcbiAgICAgICAgfVxuICAgIH0gPSBvcHRpb25zXG4gICAgY29uc3QgJGFuc3dlciA9ICQoZWxlbWVudClcbiAgICBsZXQgcGFzdGVJblByb2dyZXNzID0gZmFsc2VcblxuICAgICRhbnN3ZXJcbiAgICAgICAgLmF0dHIoe1xuICAgICAgICAgICAgJ2NvbnRlbnRlZGl0YWJsZSc6ICd0cnVlJyxcbiAgICAgICAgICAgICdzcGVsbGNoZWNrJzogJ2ZhbHNlJyxcbiAgICAgICAgICAgICdkYXRhLWpzJzogJ2Fuc3dlcidcbiAgICAgICAgfSlcbiAgICAgICAgLmFkZENsYXNzKCdyaWNoLXRleHQtZWRpdG9yJylcbiAgICAgICAgLm9uKCdtb3VzZWRvd24nLCB1LmVxdWF0aW9uSW1hZ2VTZWxlY3RvciwgZSA9PiB7XG4gICAgICAgICAgICBvblJpY2hUZXh0RWRpdG9yRm9jdXMoJChlLnRhcmdldCkuY2xvc2VzdCgnW2RhdGEtanM9XCJhbnN3ZXJcIl0nKSlcbiAgICAgICAgICAgIG1hdGgub3Blbk1hdGhFZGl0b3IoJChlLnRhcmdldCkpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbigna2V5ZG93bicsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKHUuaXNDdHJsS2V5KGUsIGtleUNvZGVzLkVOVEVSKSB8fCB1LmlzS2V5KGUsIGtleUNvZGVzLkVTQykpIG1hdGguY2xvc2VNYXRoRWRpdG9yKHRydWUpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbigna2V5cHJlc3MnLCBlID0+IHtcbiAgICAgICAgICAgIGlmICh1LmlzQ3RybEtleShlLCAnbCcpIHx8IHUuaXNDdHJsS2V5KGUsICdpJykpIG1hdGguaW5zZXJ0TmV3RXF1YXRpb24oKVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2ZvY3VzIGJsdXInLCBlID0+IHtcbiAgICAgICAgICAgIGlmIChtYXRoLmlzVmlzaWJsZSgpICYmIGUudHlwZSA9PT0gJ2ZvY3VzJykgbWF0aC5jbG9zZU1hdGhFZGl0b3IoKVxuICAgICAgICAgICAgb25SaWNoVGV4dEVkaXRvckZvY3VzQ2hhbmdlZChlKVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2tleXVwIGlucHV0JywgZSA9PiB7XG4gICAgICAgICAgICBpZighIHBhc3RlSW5Qcm9ncmVzcykgb25WYWx1ZUNoYW5nZWQodS5zYW5pdGl6ZUNvbnRlbnQoZS5jdXJyZW50VGFyZ2V0KSlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdwYXN0ZScsIGUgPT4ge1xuICAgICAgICAgICAgcGFzdGVJblByb2dyZXNzID0gdHJ1ZVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBwYXN0ZUluUHJvZ3Jlc3MgPSBmYWxzZSwgMClcblxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdURVhUQVJFQScpXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICBjb25zdCBjbGlwYm9hcmREYXRhID0gZS5vcmlnaW5hbEV2ZW50LmNsaXBib2FyZERhdGFcbiAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBjbGlwYm9hcmREYXRhLml0ZW1zICYmIGNsaXBib2FyZERhdGEuaXRlbXNbMF0uZ2V0QXNGaWxlKClcbiAgICAgICAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgICAgICAgICAgb25QYXN0ZUJsb2IoZSwgZmlsZSwgc2F2ZXIsICRhbnN3ZXIsIG9uVmFsdWVDaGFuZ2VkLCBsaW1pdClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2xpcGJvYXJkRGF0YUFzSHRtbCA9IGNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dC9odG1sJylcbiAgICAgICAgICAgICAgICBpZiAoY2xpcGJvYXJkRGF0YUFzSHRtbCkgb25QYXN0ZUh0bWwoZSwgJGFuc3dlciwgY2xpcGJvYXJkRGF0YUFzSHRtbCwgbGltaXQsIHNhdmVyLCBvblZhbHVlQ2hhbmdlZClcbiAgICAgICAgICAgICAgICBlbHNlIG9uTGVnYWN5UGFzdGVJbWFnZShzYXZlciwgbGltaXQsIG9uVmFsdWVDaGFuZ2VkKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIG9uVmFsdWVDaGFuZ2VkKHUuc2FuaXRpemVDb250ZW50KCRhbnN3ZXIuZ2V0KDApKSlcbiAgICBzZXRUaW1lb3V0KCgpID0+IGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiZW5hYmxlT2JqZWN0UmVzaXppbmdcIiwgZmFsc2UsIGZhbHNlKSwgMClcbn1cblxuZnVuY3Rpb24gb25QYXN0ZUJsb2IoZXZlbnQsIGZpbGUsIHNhdmVyLCAkYW5zd2VyLCBvblZhbHVlQ2hhbmdlZCwgbGltaXQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgaWYgKGZpbGUudHlwZSA9PT0gJ2ltYWdlL3BuZycpIHtcbiAgICAgICAgaWYgKHUuZXhpc3RpbmdTY3JlZW5zaG90Q291bnQoJGFuc3dlcikgKyAxIDw9IGxpbWl0KSB7XG4gICAgICAgICAgICBzYXZlcih7ZGF0YTogZmlsZSwgdHlwZTogZmlsZS50eXBlLCBpZDogU3RyaW5nKG5ldyBEYXRlKCkuZ2V0VGltZSgpKX0pLnRoZW4oc2NyZWVuc2hvdFVybCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW1nID0gYDxpbWcgc3JjPVwiJHtzY3JlZW5zaG90VXJsfVwiLz5gXG4gICAgICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LmV4ZWNDb21tYW5kKCdpbnNlcnRIVE1MJywgZmFsc2UsIGltZylcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvblZhbHVlQ2hhbmdlZCh1LlNDUkVFTlNIT1RfTElNSVRfRVJST1IoKSlcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gb25QYXN0ZUh0bWwoZXZlbnQsICRhbnN3ZXIsIGNsaXBib2FyZERhdGFBc0h0bWwsIGxpbWl0LCBzYXZlciwgb25WYWx1ZUNoYW5nZWQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgaWYgKHUudG90YWxJbWFnZUNvdW50KCRhbnN3ZXIsIGNsaXBib2FyZERhdGFBc0h0bWwpIDw9IGxpbWl0KSB7XG4gICAgICAgIHdpbmRvdy5kb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0SFRNTCcsIGZhbHNlLCB1LnNhbml0aXplKGNsaXBib2FyZERhdGFBc0h0bWwpKVxuICAgICAgICB1LnBlcnNpc3RJbmxpbmVJbWFnZXMoJGN1cnJlbnRFZGl0b3IsIHNhdmVyLCBsaW1pdCwgb25WYWx1ZUNoYW5nZWQpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgb25WYWx1ZUNoYW5nZWQodS5TQ1JFRU5TSE9UX0xJTUlUX0VSUk9SKCkpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBvbkxlZ2FjeVBhc3RlSW1hZ2Uoc2F2ZXIsIGxpbWl0LCBvblZhbHVlQ2hhbmdlZCkge1xuICAgIHUucGVyc2lzdElubGluZUltYWdlcygkY3VycmVudEVkaXRvciwgc2F2ZXIsIGxpbWl0LCBvblZhbHVlQ2hhbmdlZClcbn1cblxuZnVuY3Rpb24gdG9nZ2xlUmljaFRleHRUb29sYmFyKGlzVmlzaWJsZSkge1xuICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygncmljaC10ZXh0LWVkaXRvci1mb2N1cycsIGlzVmlzaWJsZSlcbn1cblxuZnVuY3Rpb24gb25SaWNoVGV4dEVkaXRvckZvY3VzKCRlbGVtZW50KSB7XG4gICAgJGN1cnJlbnRFZGl0b3IgPSAkZWxlbWVudFxuICAgIHRvZ2dsZVJpY2hUZXh0VG9vbGJhcih0cnVlKVxufVxuXG5mdW5jdGlvbiBvblJpY2hUZXh0RWRpdG9yQmx1cigpIHtcbiAgICB0b2dnbGVSaWNoVGV4dFRvb2xiYXIoZmFsc2UpXG4gICAgbWF0aC5jbG9zZU1hdGhFZGl0b3IoKVxuICAgIGZvY3VzLnJpY2hUZXh0ID0gZmFsc2Vcbn1cblxubGV0IHJpY2hUZXh0RWRpdG9yQmx1clRpbWVvdXRcblxuZnVuY3Rpb24gb25SaWNoVGV4dEVkaXRvckZvY3VzQ2hhbmdlZChlKSB7XG4gICAgZm9jdXMucmljaFRleHQgPSBlLnR5cGUgPT09ICdmb2N1cydcblxuICAgIGNsZWFyVGltZW91dChyaWNoVGV4dEVkaXRvckJsdXJUaW1lb3V0KVxuICAgIHJpY2hUZXh0RWRpdG9yQmx1clRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKHJpY2hUZXh0QW5kTWF0aEJsdXIoKSkgb25SaWNoVGV4dEVkaXRvckJsdXIoKVxuICAgICAgICBlbHNlIGlmIChmb2N1cy5yaWNoVGV4dCAmJiBtYXRoLmlzVmlzaWJsZSgpKSBtYXRoLmNsb3NlTWF0aEVkaXRvcigpXG4gICAgICAgIGVsc2Ugb25SaWNoVGV4dEVkaXRvckZvY3VzKCQoZS50YXJnZXQpKVxuICAgIH0sIDApXG59XG5cbmZ1bmN0aW9uIHJpY2hUZXh0QW5kTWF0aEJsdXIoKSB7XG4gICAgcmV0dXJuICFmb2N1cy5yaWNoVGV4dCAmJiAhbWF0aC5pc1Zpc2libGUoKSAmJiAhZm9jdXMubGF0ZXhGaWVsZCAmJiAhZm9jdXMuZXF1YXRpb25GaWVsZFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYWxsb3dlZFRhZ3M6IFtcbiAgICAgICAgJ2RpdicsXG4gICAgICAgICdpbWcnLFxuICAgICAgICAnYnInXG4gICAgXSxcbiAgICBhbGxvd2VkQXR0cmlidXRlczoge1xuICAgICAgICBpbWc6IFsnc3JjJywgJ2FsdCddXG4gICAgfSxcbiAgICBhbGxvd2VkU2NoZW1lczogWydkYXRhJ10sXG4gICAgZXhjbHVzaXZlRmlsdGVyOiBmdW5jdGlvbihmcmFtZSkgeyByZXR1cm4gZnJhbWUuYXR0cmlic1snZGF0YS1qcyddID09PSAnbWF0aEVkaXRvcicgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gICAge1xuICAgICAgICBsYWJlbDogJ1BlcnVzJyxcbiAgICAgICAgY2hhcmFjdGVyczogW1xuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiaAnLCBsYXRleENvbW1hbmQ6ICdcXFxcbmVxJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiYgnLCBsYXRleENvbW1hbmQ6ICdcXFxcYXBwcm94JywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiaQnLCBsYXRleENvbW1hbmQ6ICdcXFxcbGVxJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiaUnLCBsYXRleENvbW1hbmQ6ICdcXFxcZ2VxJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfCsicsIGxhdGV4Q29tbWFuZDogJ14yJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfCsycsIGxhdGV4Q29tbWFuZDogJ14zJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfCvScsIGxhdGV4Q29tbWFuZDogJzEvMicsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oWTJywgbGF0ZXhDb21tYW5kOiAnMS8zJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfCsScsIGxhdGV4Q29tbWFuZDogJ1xcXFxwbScgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGxhYmVsOiAnQWxnZWJyYScsXG4gICAgICAgIGNoYXJhY3RlcnM6IFtcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oi8JywgbGF0ZXhDb21tYW5kOiAnXFxcXHNpbScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4omhJywgbGF0ZXhDb21tYW5kOiAnXFxcXGVxdWl2JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiaInIH0sIC8vIFxcbmVxdWl2IG9yIFxcbm90XFxlcXVpdlxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfCtycsIGxhdGV4Q29tbWFuZDogJ1xcXFxjZG90JywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfigKYnLCBsYXRleENvbW1hbmQ6ICdcXFxcZG90cycgfSwgLy8gbWF0cmlpc2lhbGdlYnJhP1xuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiJ4nLCBsYXRleENvbW1hbmQ6ICdcXFxcaW5mdHknLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbGFiZWw6ICdLcmVpa2thbGFpc2V0IGFha2tvc2V0JyxcbiAgICAgICAgY2hhcmFjdGVyczogW1xuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOsScsIGxhdGV4Q29tbWFuZDogJ1xcXFxhbHBoYScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzrInLCBsYXRleENvbW1hbmQ6ICdcXFxcYmV0YScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzrQnLCBsYXRleENvbW1hbmQ6ICdcXFxcZGVsdGEnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ861JywgbGF0ZXhDb21tYW5kOiAnXFxcXHZhcmVwc2lsb24nIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ863JywgbGF0ZXhDb21tYW5kOiAnXFxcXGV0YScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiCJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBhcnRpYWwnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ/CdnIQnLCBsYXRleENvbW1hbmQ6ICdcXFxcaW90YScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzrsnLCBsYXRleENvbW1hbmQ6ICdcXFxcbGFtYmRhJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfCtScsIGxhdGV4Q29tbWFuZDogJ1xcXFxtdScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnz4AnLCBsYXRleENvbW1hbmQ6ICdcXFxccGknLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8+DJywgbGF0ZXhDb21tYW5kOiAnXFxcXHNpZ21hJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfPhCcsIGxhdGV4Q29tbWFuZDogJ1xcXFx0YXUnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ9CkJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBoaScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnz4knLCBsYXRleENvbW1hbmQ6ICdcXFxcb21lZ2EnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86TJywgbGF0ZXhDb21tYW5kOiAnXFxcXEdhbW1hJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOlCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxEZWx0YScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzpgnLCBsYXRleENvbW1hbmQ6ICdcXFxcVGhldGEnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIjycsIGxhdGV4Q29tbWFuZDogJ1xcXFxQaScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiRJywgbGF0ZXhDb21tYW5kOiAnXFxcXFNpZ21hJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOpicsIGxhdGV4Q29tbWFuZDogJ1xcXFxQaGknIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86pJywgbGF0ZXhDb21tYW5kOiAnXFxcXE9tZWdhJyB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbGFiZWw6ICdHZW9tZXRyaWEgamEgdmVrdG9yaW9wcGknLFxuICAgICAgICBjaGFyYWN0ZXJzOiBbXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8KwJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiKAnLCBsYXRleENvbW1hbmQ6ICdcXFxcYW5nbGUnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KKpScsIGxhdGV4Q29tbWFuZDogJ1xcXFxwZXJwJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfigJYnLCBsYXRleENvbW1hbmQ6ICdcXFxccGFyYWxsZWwnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KHhScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oaRJywgbGF0ZXhDb21tYW5kOiAnXFxcXHVwYXJyb3cnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KGkycsIGxhdGV4Q29tbWFuZDogJ1xcXFxkb3duYXJyb3cnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KGlCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxsZWZ0cmlnaHRhcnJvdycgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oeMJyB9IC8vIFxccmlnaHRsZWZ0aGFycG9vbnNcbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBsYWJlbDogJ0xvZ2lpa2thIGphIGpvdWtrby1vcHBpJyxcbiAgICAgICAgY2hhcmFjdGVyczogW1xuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfih5InLCBsYXRleENvbW1hbmQ6ICdcXFxcUmlnaHRhcnJvdycsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oeUJywgbGF0ZXhDb21tYW5kOiAnXFxcXExlZnRyaWdodGFycm93JywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiKcnLCBsYXRleENvbW1hbmQ6ICdcXFxcYW5kJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiKgnLCBsYXRleENvbW1hbmQ6ICdcXFxcb3InIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8KsJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiIMnLCBsYXRleENvbW1hbmQ6ICdcXFxcZXhpc3RzJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiIAnLCBsYXRleENvbW1hbmQ6ICdcXFxcZm9yYWxsJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiKknLCBsYXRleENvbW1hbmQ6ICdcXFxcY2FwJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiKonLCBsYXRleENvbW1hbmQ6ICdcXFxcY3VwJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiJYnLCBsYXRleENvbW1hbmQ6ICdcXFxcc2V0bWludXMnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KKgicsIGxhdGV4Q29tbWFuZDogJ1xcXFxzdWJzZXQnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KKhCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxub3RzdWJzZXQnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIiCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxpbicgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiJJywgbGF0ZXhDb21tYW5kOiAnXFxcXG5vdGluJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiIUnLCBsYXRleENvbW1hbmQ6ICdcXFxcZW1wdHknIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KGkicsIGxhdGV4Q29tbWFuZDogJ1xcXFxyaWdodGFycm93JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiJgnLCBsYXRleENvbW1hbmQ6ICdcXFxcY2lyYycgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oi8JywgbGF0ZXhDb21tYW5kOiAnXFxcXHNpbScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oSdJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihJUnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KEpCcsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oSaJyB9XG4gICAgICAgIF1cbiAgICB9XG5dXG4iLCJjb25zdCBzcGVjaWFsQ2hhcmFjdGVyR3JvdXBzID0gcmVxdWlyZSgnLi9zcGVjaWFsQ2hhcmFjdGVycycpXG5jb25zdCBsYXRleENvbW1hbmRzID0gcmVxdWlyZSgnLi9sYXRleENvbW1hbmRzJylcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaW5pdCxcbn1cblxuZnVuY3Rpb24gaW5pdChtYXRoRWRpdG9yLCBoYXNSaWNoVGV4dEZvY3VzLCBsKSB7XG4gICAgY29uc3QgJHRvb2xiYXIgPSAkKGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbHNcIiBkYXRhLWpzPVwidG9vbHNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xzLWJ1dHRvbi13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhci13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLWNoYXJhY3RlcnMtZXhwYW5kLWNvbGxhcHNlXCIgZGF0YS1qcz1cImV4cGFuZENvbGxhcHNlQ2hhcmFjdGVyc1wiIHN0eWxlPVwiei1pbmRleDogMTAwXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xzLXJvd1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xiYXItd3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29sYmFyLWNoYXJhY3RlcnMgcmljaC10ZXh0LWVkaXRvci10b29sYmFyIHJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhci1idXR0b24tbGlzdFwiIGRhdGEtanM9XCJjaGFyYWN0ZXJzTGlzdFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29scy1yb3dcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29sYmFyLXdyYXBwZXIgcmljaC10ZXh0LWVkaXRvci1lcXVhdGlvbi13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xiYXItZXF1YXRpb24gcmljaC10ZXh0LWVkaXRvci10b29sYmFyIHJpY2gtdGV4dC1lZGl0b3ItdG9vbGJhci1idXR0b24tbGlzdFwiIGRhdGEtanM9XCJtYXRoVG9vbGJhclwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29scy1idXR0b24td3JhcHBlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLXRvb2xiYXItd3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci1uZXctZXF1YXRpb24gcmljaC10ZXh0LWVkaXRvci1idXR0b24gcmljaC10ZXh0LWVkaXRvci1idXR0b24tYWN0aW9uXCIgZGF0YS1qcz1cIm5ld0VxdWF0aW9uXCIgZGF0YS1jb21tYW5kPVwiQ3RybC1MXCI+zqMgJHtsLmluc2VydEVxdWF0aW9ufTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBgKVxuICAgICAgICAub24oJ21vdXNlZG93bicsICdbZGF0YS1qcz1cImV4cGFuZENvbGxhcHNlQ2hhcmFjdGVyc1wiXScsIGUgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAkdG9vbGJhci50b2dnbGVDbGFzcygncmljaC10ZXh0LWVkaXRvci1jaGFyYWN0ZXJzLWV4cGFuZGVkJylcbiAgICAgICAgfSlcblxuICAgIGNvbnN0ICRuZXdFcXVhdGlvbiA9ICR0b29sYmFyLmZpbmQoJ1tkYXRhLWpzPVwibmV3RXF1YXRpb25cIl0nKVxuICAgIGNvbnN0ICRtYXRoVG9vbGJhciA9ICR0b29sYmFyLmZpbmQoJ1tkYXRhLWpzPVwibWF0aFRvb2xiYXJcIl0nKVxuICAgIGluaXRTcGVjaWFsQ2hhcmFjdGVyVG9vbGJhcigkdG9vbGJhciwgbWF0aEVkaXRvciwgaGFzUmljaFRleHRGb2N1cylcbiAgICBpbml0TWF0aFRvb2xiYXIoJG1hdGhUb29sYmFyLCBtYXRoRWRpdG9yKVxuICAgIGluaXROZXdFcXVhdGlvbigkbmV3RXF1YXRpb24sIG1hdGhFZGl0b3IsIGhhc1JpY2hUZXh0Rm9jdXMpXG5cbiAgICByZXR1cm4geyAkdG9vbGJhciB9XG59XG5cbmNvbnN0IHNwZWNpYWxDaGFyYWN0ZXJUb0J1dHRvbiA9IGNoYXIgPT4gYDxidXR0b24gY2xhc3M9XCJyaWNoLXRleHQtZWRpdG9yLWJ1dHRvbiByaWNoLXRleHQtZWRpdG9yLWJ1dHRvbi1ncmlkJHtjaGFyLnBvcHVsYXIgPyAnIHJpY2gtdGV4dC1lZGl0b3ItY2hhcmFjdGVycy1wb3B1bGFyJyA6Jyd9XCIgJHtjaGFyLmxhdGV4Q29tbWFuZCA/IGBkYXRhLWNvbW1hbmQ9XCIke2NoYXIubGF0ZXhDb21tYW5kfVwiYCA6ICcnfT4ke2NoYXIuY2hhcmFjdGVyfTwvYnV0dG9uPmBcblxuY29uc3QgcG9wdWxhckluR3JvdXAgPSBncm91cCA9PiBncm91cC5jaGFyYWN0ZXJzLmZpbHRlcihjaGFyYWN0ZXIgPT4gY2hhcmFjdGVyLnBvcHVsYXIpLmxlbmd0aFxuXG5mdW5jdGlvbiBpbml0U3BlY2lhbENoYXJhY3RlclRvb2xiYXIoJHRvb2xiYXIsIG1hdGhFZGl0b3IsIGhhc0Fuc3dlckZvY3VzKSB7XG4gICAgY29uc3QgZ3JpZEJ1dHRvbldpZHRoUHggPSAzNVxuXG4gICAgJHRvb2xiYXIuZmluZCgnW2RhdGEtanM9XCJjaGFyYWN0ZXJzTGlzdFwiXScpXG4gICAgICAgIC5hcHBlbmQoc3BlY2lhbENoYXJhY3Rlckdyb3Vwcy5tYXAoZ3JvdXAgPT5cbiAgICAgICAgICAgIGA8ZGl2IGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci10b29sYmFyLWNoYXJhY3RlcnMtZ3JvdXBcIiBcbiAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6ICR7cG9wdWxhckluR3JvdXAoZ3JvdXApICogZ3JpZEJ1dHRvbldpZHRoUHh9cHhcIj5cbiAgICAgICAgICAgICAgICAgICR7Z3JvdXAuY2hhcmFjdGVycy5tYXAoc3BlY2lhbENoYXJhY3RlclRvQnV0dG9uKS5qb2luKCcnKX1cbiAgICAgICAgICAgICA8L2Rpdj5gKSlcbiAgICAgICAgLm9uKCdtb3VzZWRvd24nLCAnYnV0dG9uJywgZSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICAgICAgY29uc3QgY2hhcmFjdGVyID0gZS5jdXJyZW50VGFyZ2V0LmlubmVyVGV4dFxuICAgICAgICAgICAgY29uc3QgY29tbWFuZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmNvbW1hbmRcbiAgICAgICAgICAgIGlmIChoYXNBbnN3ZXJGb2N1cygpKSB3aW5kb3cuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydFRleHQnLCBmYWxzZSwgY2hhcmFjdGVyKVxuICAgICAgICAgICAgZWxzZSBtYXRoRWRpdG9yLmluc2VydE1hdGgoY29tbWFuZCB8fCBjaGFyYWN0ZXIpXG4gICAgICAgIH0pXG59XG5cbmZ1bmN0aW9uIGluaXRNYXRoVG9vbGJhcigkbWF0aFRvb2xiYXIsIG1hdGhFZGl0b3IpIHtcbiAgICAkbWF0aFRvb2xiYXIuYXBwZW5kKGxhdGV4Q29tbWFuZHNcbiAgICAgICAgLm1hcChvID0+IGA8YnV0dG9uIGNsYXNzPVwicmljaC10ZXh0LWVkaXRvci1idXR0b24gcmljaC10ZXh0LWVkaXRvci1idXR0b24tZ3JpZFwiIGRhdGEtY29tbWFuZD1cIiR7by5hY3Rpb259XCIgZGF0YS1sYXRleGNvbW1hbmQ9XCIke28ubGFiZWwgfHwgJyd9XCIgZGF0YS11c2V3cml0ZT1cIiR7by51c2VXcml0ZSB8fCBmYWxzZX1cIj5cbjxpbWcgc3JjPVwiL21hdGguc3ZnP2xhdGV4PSR7ZW5jb2RlVVJJQ29tcG9uZW50KG8ubGFiZWwgPyBvLmxhYmVsLnJlcGxhY2UoL1gvZywgJ1xcXFxzcXVhcmUnKSA6IG8uYWN0aW9uKX1cIi8+XG48L2J1dHRvbj5gKS5qb2luKCcnKVxuICAgICkub24oJ21vdXNlZG93bicsICdidXR0b24nLCBlID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGNvbnN0IGRhdGFzZXQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcbiAgICAgICAgbWF0aEVkaXRvci5pbnNlcnRNYXRoKGRhdGFzZXQuY29tbWFuZCwgZGF0YXNldC5sYXRleGNvbW1hbmQsIGRhdGFzZXQudXNld3JpdGUgPT09ICd0cnVlJylcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBpbml0TmV3RXF1YXRpb24oJG5ld0VxdWF0aW9uLCBtYXRoRWRpdG9yLCBoYXNBbnN3ZXJGb2N1cykge1xuICAgICRuZXdFcXVhdGlvbi5tb3VzZWRvd24oKGUgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgaWYgKCFoYXNBbnN3ZXJGb2N1cygpKSByZXR1cm4gLy8gVE9ETzogcmVtb3ZlIHdoZW4gYnV0dG9uIGlzIG9ubHkgdmlzaWJsZSB3aGVuIHRleHRhcmVhIGhhcyBmb2N1c1xuICAgICAgICBtYXRoRWRpdG9yLmluc2VydE5ld0VxdWF0aW9uKClcbiAgICB9KS5iaW5kKHRoaXMpKVxufVxuIiwiY29uc3Qgc2FuaXRpemVIdG1sID0gcmVxdWlyZSgnc2FuaXRpemUtaHRtbCcpXG5jb25zdCBzYW5pdGl6ZU9wdHMgPSByZXF1aXJlKCcuL3Nhbml0aXplT3B0cycpXG5jb25zdCBsb2FkaW5nSW1nID0gcmVxdWlyZSgnLi9sb2FkaW5nSW1nJylcbmNvbnN0IGVxdWF0aW9uSW1hZ2VTZWxlY3RvciA9ICdpbWdbc3JjXj1cIi9tYXRoLnN2Z1wiXSdcblxuY29uc3QgU0NSRUVOU0hPVF9MSU1JVF9FUlJPUiA9ICgpID0+IG5ldyBCYWNvbi5FcnJvcignU2NyZWVuc2hvdCBsaW1pdCByZWFjaGVkIScpXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpc0tleSxcbiAgICBpc0N0cmxLZXksXG4gICAgaW5zZXJ0VG9UZXh0QXJlYUF0Q3Vyc29yLFxuICAgIHBlcnNpc3RJbmxpbmVJbWFnZXMsXG4gICAgc2FuaXRpemUsXG4gICAgc2FuaXRpemVDb250ZW50LFxuICAgIHNldEN1cnNvckFmdGVyLFxuICAgIGVxdWF0aW9uSW1hZ2VTZWxlY3RvcixcbiAgICB0b3RhbEltYWdlQ291bnQsXG4gICAgU0NSRUVOU0hPVF9MSU1JVF9FUlJPUixcbiAgICBleGlzdGluZ1NjcmVlbnNob3RDb3VudFxufVxuXG5mdW5jdGlvbiBjb252ZXJ0TGlua3NUb1JlbGF0aXZlKGh0bWwpIHtcbiAgICByZXR1cm4gaHRtbC5yZXBsYWNlKG5ldyBSZWdFeHAoZG9jdW1lbnQubG9jYXRpb24ub3JpZ2luLCAnZycpLCAnJylcbn1cblxuZnVuY3Rpb24gc2FuaXRpemUoaHRtbCkge1xuICAgIHJldHVybiBzYW5pdGl6ZUh0bWwoY29udmVydExpbmtzVG9SZWxhdGl2ZShodG1sKSwgc2FuaXRpemVPcHRzKVxufVxuZnVuY3Rpb24gaW5zZXJ0VG9UZXh0QXJlYUF0Q3Vyc29yKGZpZWxkLCB2YWx1ZSkge1xuICAgIGNvbnN0IHN0YXJ0UG9zID0gZmllbGQuc2VsZWN0aW9uU3RhcnRcbiAgICBjb25zdCBlbmRQb3MgPSBmaWVsZC5zZWxlY3Rpb25FbmRcbiAgICBsZXQgb2xkVmFsdWUgPSBmaWVsZC52YWx1ZVxuICAgIGZpZWxkLnZhbHVlID0gb2xkVmFsdWUuc3Vic3RyaW5nKDAsIHN0YXJ0UG9zKSArIHZhbHVlICsgb2xkVmFsdWUuc3Vic3RyaW5nKGVuZFBvcywgb2xkVmFsdWUubGVuZ3RoKVxuICAgIGZpZWxkLnNlbGVjdGlvblN0YXJ0ID0gZmllbGQuc2VsZWN0aW9uRW5kID0gc3RhcnRQb3MgKyB2YWx1ZS5sZW5ndGhcbn1cblxuZnVuY3Rpb24gZGVjb2RlQmFzZTY0SW1hZ2UoZGF0YVN0cmluZykge1xuICAgIGlmICghZGF0YVN0cmluZylcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICBjb25zdCBtYXRjaGVzID0gZGF0YVN0cmluZy5tYXRjaCgvXmRhdGE6KFtBLVphLXotK1xcL10rKTtiYXNlNjQsKC4rKSQvKVxuICAgIGlmIChtYXRjaGVzLmxlbmd0aCAhPT0gMykge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBtYXRjaGVzWzFdLFxuICAgICAgICBkYXRhOiBuZXcgQnVmZmVyKG1hdGNoZXNbMl0sICdiYXNlNjQnKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNLZXkoZSwga2V5KSB7IHJldHVybiBwcmV2ZW50SWZUcnVlKGUsICFlLmFsdEtleSAmJiAhZS5zaGlmdEtleSAmJiAhZS5jdHJsS2V5ICAmJiBrZXlPcktleUNvZGUoZSwga2V5KSl9XG5cbmZ1bmN0aW9uIGlzQ3RybEtleShlLCBrZXkpIHsgcmV0dXJuIHByZXZlbnRJZlRydWUoZSwgIWUuYWx0S2V5ICYmICFlLnNoaWZ0S2V5ICYmIGUuY3RybEtleSAmJiBrZXlPcktleUNvZGUoZSwga2V5KSl9XG5cbmZ1bmN0aW9uIGtleU9yS2V5Q29kZShlLCB2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnID8gZS5rZXkgPT09IHZhbCA6IGUua2V5Q29kZSA9PT0gdmFsIH1cbmZ1bmN0aW9uIHByZXZlbnRJZlRydWUoZSwgdmFsKSB7XG4gICAgaWYodmFsKSBlLnByZXZlbnREZWZhdWx0KClcbiAgICByZXR1cm4gdmFsXG59XG5cbmZ1bmN0aW9uIHNhbml0aXplQ29udGVudChhbnN3ZXJFbGVtZW50KSB7XG4gICAgY29uc3QgJGFuc3dlckVsZW1lbnQgPSAkKGFuc3dlckVsZW1lbnQpXG4gICAgY29uc3QgJG1hdGhFZGl0b3IgPSAkYW5zd2VyRWxlbWVudC5maW5kKCdbZGF0YS1qcz1cIm1hdGhFZGl0b3JcIl0nKVxuICAgICRtYXRoRWRpdG9yLmhpZGUoKVxuICAgIGNvbnN0IHRleHQgPSAkYW5zd2VyRWxlbWVudC5nZXQoMCkuaW5uZXJUZXh0XG4gICAgJG1hdGhFZGl0b3Iuc2hvdygpXG5cbiAgICBjb25zdCBodG1sID0gc2FuaXRpemUoJGFuc3dlckVsZW1lbnQuaHRtbCgpKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYW5zd2VySFRNTDogaHRtbCxcbiAgICAgICAgYW5zd2VyVGV4dDogdGV4dCxcbiAgICAgICAgaW1hZ2VDb3VudDogZXhpc3RpbmdTY3JlZW5zaG90Q291bnQoJChgPGRpdj4ke2h0bWx9PC9kaXY+YCkpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXRDdXJzb3JBZnRlcigkaW1nKSB7XG4gICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpXG4gICAgY29uc3QgaW1nID0gJGltZy5nZXQoMClcbiAgICBjb25zdCBuZXh0U2libGluZyA9IGltZy5uZXh0U2libGluZyAmJiBpbWcubmV4dFNpYmxpbmcudGFnTmFtZSA9PT0gJ0JSJyA/IGltZy5uZXh0U2libGluZyA6IGltZ1xuICAgIHJhbmdlLnNldFN0YXJ0KG5leHRTaWJsaW5nLCAwKVxuICAgIHJhbmdlLnNldEVuZChuZXh0U2libGluZywgMClcbiAgICBjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKClcbiAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKClcbiAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpXG59XG5cbmZ1bmN0aW9uIG1hcmtBbmRHZXRJbmxpbmVJbWFnZXMoJGVkaXRvcikge1xuICAgIGNvbnN0IGltYWdlcyA9ICRlZGl0b3IuZmluZCgnaW1nW3NyY149XCJkYXRhXCJdJykudG9BcnJheSgpXG4gICAgICAgIC5tYXAoKGVsLCBpbmRleCkgPT4gT2JqZWN0LmFzc2lnbihkZWNvZGVCYXNlNjRJbWFnZShlbC5nZXRBdHRyaWJ1dGUoJ3NyYycpKSwge1xuICAgICAgICAgICAgJGVsOiAkKGVsKVxuICAgICAgICB9KSlcbiAgICBpbWFnZXMuZmlsdGVyKCh7dHlwZX0pID0+IHR5cGUgIT09ICdpbWFnZS9wbmcnKS5mb3JFYWNoKCh7JGVsfSkgPT4gJGVsLnJlbW92ZSgpKVxuICAgIGNvbnN0IHBuZ0ltYWdlcyA9IGltYWdlcy5maWx0ZXIoKHt0eXBlfSkgPT4gdHlwZSA9PT0gJ2ltYWdlL3BuZycpXG4gICAgcG5nSW1hZ2VzLmZvckVhY2goKHskZWx9KSA9PiAkZWwuYXR0cignc3JjJywgbG9hZGluZ0ltZykpXG4gICAgcmV0dXJuIHBuZ0ltYWdlc1xufVxuXG5mdW5jdGlvbiBleGlzdGluZ1NjcmVlbnNob3RDb3VudCgkZWRpdG9yKSB7XG4gICAgY29uc3QgaW1hZ2VDb3VudCA9ICRlZGl0b3IuZmluZCgnaW1nJykubGVuZ3RoXG4gICAgY29uc3QgZXF1YXRpb25Db3VudCA9ICRlZGl0b3IuZmluZChlcXVhdGlvbkltYWdlU2VsZWN0b3IpLmxlbmd0aFxuICAgIHJldHVybiBpbWFnZUNvdW50IC0gZXF1YXRpb25Db3VudFxufVxuXG5mdW5jdGlvbiBjaGVja0ZvckltYWdlTGltaXQoJGVkaXRvciwgaW1hZ2VEYXRhLCBsaW1pdCkge1xuICAgIHJldHVybiBCYWNvbi5vbmNlKGV4aXN0aW5nU2NyZWVuc2hvdENvdW50KCRlZGl0b3IpID4gbGltaXQgPyBuZXcgQmFjb24uRXJyb3IoKSA6IGltYWdlRGF0YSlcbn1cblxuZnVuY3Rpb24gcGVyc2lzdElubGluZUltYWdlcygkZWRpdG9yLCBzY3JlZW5zaG90U2F2ZXIsIHNjcmVlbnNob3RDb3VudExpbWl0LCBvblZhbHVlQ2hhbmdlZCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4gQmFjb24uY29tYmluZUFzQXJyYXkobWFya0FuZEdldElubGluZUltYWdlcygkZWRpdG9yKVxuICAgICAgICAubWFwKGRhdGEgPT4gY2hlY2tGb3JJbWFnZUxpbWl0KCRlZGl0b3IsIGRhdGEsIHNjcmVlbnNob3RDb3VudExpbWl0KVxuICAgICAgICAgICAgLmRvRXJyb3IoKCkgPT4gb25WYWx1ZUNoYW5nZWQoU0NSRUVOU0hPVF9MSU1JVF9FUlJPUigpKSlcbiAgICAgICAgICAgIC5mbGF0TWFwTGF0ZXN0KCgpID0+IEJhY29uLmZyb21Qcm9taXNlKHNjcmVlbnNob3RTYXZlcihkYXRhKSkpXG4gICAgICAgICAgICAuZG9BY3Rpb24oc2NyZWVuU2hvdFVybCA9PiBkYXRhLiRlbC5hdHRyKCdzcmMnLCBzY3JlZW5TaG90VXJsKSlcbiAgICAgICAgICAgIC5kb0Vycm9yKCgpID0+IGRhdGEuJGVsLnJlbW92ZSgpKSlcbiAgICApLm9uVmFsdWUoayA9PiAkZWRpdG9yLnRyaWdnZXIoJ2lucHV0JykpLCAwKVxufVxuXG5mdW5jdGlvbiB0b3RhbEltYWdlQ291bnQoJGFuc3dlciwgY2xpcGJvYXJkRGF0YUFzSHRtbCkge1xuICAgIHJldHVybiBleGlzdGluZ1NjcmVlbnNob3RDb3VudCgkYW5zd2VyKSArIGV4aXN0aW5nU2NyZWVuc2hvdENvdW50KCQoYDxkaXY+JHtjbGlwYm9hcmREYXRhQXNIdG1sfTwvZGl2PmApKVxufVxuIl19
