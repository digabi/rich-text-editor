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
    var loadingGif = "data:image/gif;base64,R0lGODlhEAAQAPQAAP///wAAAPDw8IqKiuDg4EZGRnp6egAAAFhYWCQkJKysrL6+vhQUFJycnAQEBDY2NmhoaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAAFdyAgAgIJIeWoAkRCCMdBkKtIHIngyMKsErPBYbADpkSCwhDmQCBethRB6Vj4kFCkQPG4IlWDgrNRIwnO4UKBXDufzQvDMaoSDBgFb886MiQadgNABAokfCwzBA8LCg0Egl8jAggGAA1kBIA1BAYzlyILczULC2UhACH5BAAKAAEALAAAAAAQABAAAAV2ICACAmlAZTmOREEIyUEQjLKKxPHADhEvqxlgcGgkGI1DYSVAIAWMx+lwSKkICJ0QsHi9RgKBwnVTiRQQgwF4I4UFDQQEwi6/3YSGWRRmjhEETAJfIgMFCnAKM0KDV4EEEAQLiF18TAYNXDaSe3x6mjidN1s3IQAh+QQACgACACwAAAAAEAAQAAAFeCAgAgLZDGU5jgRECEUiCI+yioSDwDJyLKsXoHFQxBSHAoAAFBhqtMJg8DgQBgfrEsJAEAg4YhZIEiwgKtHiMBgtpg3wbUZXGO7kOb1MUKRFMysCChAoggJCIg0GC2aNe4gqQldfL4l/Ag1AXySJgn5LcoE3QXI3IQAh+QQACgADACwAAAAAEAAQAAAFdiAgAgLZNGU5joQhCEjxIssqEo8bC9BRjy9Ag7GILQ4QEoE0gBAEBcOpcBA0DoxSK/e8LRIHn+i1cK0IyKdg0VAoljYIg+GgnRrwVS/8IAkICyosBIQpBAMoKy9dImxPhS+GKkFrkX+TigtLlIyKXUF+NjagNiEAIfkEAAoABAAsAAAAABAAEAAABWwgIAICaRhlOY4EIgjH8R7LKhKHGwsMvb4AAy3WODBIBBKCsYA9TjuhDNDKEVSERezQEL0WrhXucRUQGuik7bFlngzqVW9LMl9XWvLdjFaJtDFqZ1cEZUB0dUgvL3dgP4WJZn4jkomWNpSTIyEAIfkEAAoABQAsAAAAABAAEAAABX4gIAICuSxlOY6CIgiD8RrEKgqGOwxwUrMlAoSwIzAGpJpgoSDAGifDY5kopBYDlEpAQBwevxfBtRIUGi8xwWkDNBCIwmC9Vq0aiQQDQuK+VgQPDXV9hCJjBwcFYU5pLwwHXQcMKSmNLQcIAExlbH8JBwttaX0ABAcNbWVbKyEAIfkEAAoABgAsAAAAABAAEAAABXkgIAICSRBlOY7CIghN8zbEKsKoIjdFzZaEgUBHKChMJtRwcWpAWoWnifm6ESAMhO8lQK0EEAV3rFopIBCEcGwDKAqPh4HUrY4ICHH1dSoTFgcHUiZjBhAJB2AHDykpKAwHAwdzf19KkASIPl9cDgcnDkdtNwiMJCshACH5BAAKAAcALAAAAAAQABAAAAV3ICACAkkQZTmOAiosiyAoxCq+KPxCNVsSMRgBsiClWrLTSWFoIQZHl6pleBh6suxKMIhlvzbAwkBWfFWrBQTxNLq2RG2yhSUkDs2b63AYDAoJXAcFRwADeAkJDX0AQCsEfAQMDAIPBz0rCgcxky0JRWE1AmwpKyEAIfkEAAoACAAsAAAAABAAEAAABXkgIAICKZzkqJ4nQZxLqZKv4NqNLKK2/Q4Ek4lFXChsg5ypJjs1II3gEDUSRInEGYAw6B6zM4JhrDAtEosVkLUtHA7RHaHAGJQEjsODcEg0FBAFVgkQJQ1pAwcDDw8KcFtSInwJAowCCA6RIwqZAgkPNgVpWndjdyohACH5BAAKAAkALAAAAAAQABAAAAV5ICACAimc5KieLEuUKvm2xAKLqDCfC2GaO9eL0LABWTiBYmA06W6kHgvCqEJiAIJiu3gcvgUsscHUERm+kaCxyxa+zRPk0SgJEgfIvbAdIAQLCAYlCj4DBw0IBQsMCjIqBAcPAooCBg9pKgsJLwUFOhCZKyQDA3YqIQAh+QQACgAKACwAAAAAEAAQAAAFdSAgAgIpnOSonmxbqiThCrJKEHFbo8JxDDOZYFFb+A41E4H4OhkOipXwBElYITDAckFEOBgMQ3arkMkUBdxIUGZpEb7kaQBRlASPg0FQQHAbEEMGDSVEAA1QBhAED1E0NgwFAooCDWljaQIQCE5qMHcNhCkjIQAh+QQACgALACwAAAAAEAAQAAAFeSAgAgIpnOSoLgxxvqgKLEcCC65KEAByKK8cSpA4DAiHQ/DkKhGKh4ZCtCyZGo6F6iYYPAqFgYy02xkSaLEMV34tELyRYNEsCQyHlvWkGCzsPgMCEAY7Cg04Uk48LAsDhRA8MVQPEF0GAgqYYwSRlycNcWskCkApIyEAOwAAAAAAAAAAADxiciAvPgo8Yj5XYXJuaW5nPC9iPjogIG15c3FsX3F1ZXJ5KCkgWzxhIGhyZWY9J2Z1bmN0aW9uLm15c3FsLXF1ZXJ5Jz5mdW5jdGlvbi5teXNxbC1xdWVyeTwvYT5dOiBDYW4ndCBjb25uZWN0IHRvIGxvY2FsIE15U1FMIHNlcnZlciB0aHJvdWdoIHNvY2tldCAnL3Zhci9ydW4vbXlzcWxkL215c3FsZC5zb2NrJyAoMikgaW4gPGI+L2hvbWUvYWpheGxvYWQvd3d3L2xpYnJhaXJpZXMvY2xhc3MubXlzcWwucGhwPC9iPiBvbiBsaW5lIDxiPjY4PC9iPjxiciAvPgo8YnIgLz4KPGI+V2FybmluZzwvYj46ICBteXNxbF9xdWVyeSgpIFs8YSBocmVmPSdmdW5jdGlvbi5teXNxbC1xdWVyeSc+ZnVuY3Rpb24ubXlzcWwtcXVlcnk8L2E+XTogQSBsaW5rIHRvIHRoZSBzZXJ2ZXIgY291bGQgbm90IGJlIGVzdGFibGlzaGVkIGluIDxiPi9ob21lL2FqYXhsb2FkL3d3dy9saWJyYWlyaWVzL2NsYXNzLm15c3FsLnBocDwvYj4gb24gbGluZSA8Yj42ODwvYj48YnIgLz4KPGJyIC8+CjxiPldhcm5pbmc8L2I+OiAgbXlzcWxfcXVlcnkoKSBbPGEgaHJlZj0nZnVuY3Rpb24ubXlzcWwtcXVlcnknPmZ1bmN0aW9uLm15c3FsLXF1ZXJ5PC9hPl06IENhbid0IGNvbm5lY3QgdG8gbG9jYWwgTXlTUUwgc2VydmVyIHRocm91Z2ggc29ja2V0ICcvdmFyL3J1bi9teXNxbGQvbXlzcWxkLnNvY2snICgyKSBpbiA8Yj4vaG9tZS9hamF4bG9hZC93d3cvbGlicmFpcmllcy9jbGFzcy5teXNxbC5waHA8L2I+IG9uIGxpbmUgPGI+Njg8L2I+PGJyIC8+CjxiciAvPgo8Yj5XYXJuaW5nPC9iPjogIG15c3FsX3F1ZXJ5KCkgWzxhIGhyZWY9J2Z1bmN0aW9uLm15c3FsLXF1ZXJ5Jz5mdW5jdGlvbi5teXNxbC1xdWVyeTwvYT5dOiBBIGxpbmsgdG8gdGhlIHNlcnZlciBjb3VsZCBub3QgYmUgZXN0YWJsaXNoZWQgaW4gPGI+L2hvbWUvYWpheGxvYWQvd3d3L2xpYnJhaXJpZXMvY2xhc3MubXlzcWwucGhwPC9iPiBvbiBsaW5lIDxiPjY4PC9iPjxiciAvPgo8YnIgLz4KPGI+V2FybmluZzwvYj46ICBteXNxbF9xdWVyeSgpIFs8YSBocmVmPSdmdW5jdGlvbi5teXNxbC1xdWVyeSc+ZnVuY3Rpb24ubXlzcWwtcXVlcnk8L2E+XTogQ2FuJ3QgY29ubmVjdCB0byBsb2NhbCBNeVNRTCBzZXJ2ZXIgdGhyb3VnaCBzb2NrZXQgJy92YXIvcnVuL215c3FsZC9teXNxbGQuc29jaycgKDIpIGluIDxiPi9ob21lL2FqYXhsb2FkL3d3dy9saWJyYWlyaWVzL2NsYXNzLm15c3FsLnBocDwvYj4gb24gbGluZSA8Yj42ODwvYj48YnIgLz4KPGJyIC8+CjxiPldhcm5pbmc8L2I+OiAgbXlzcWxfcXVlcnkoKSBbPGEgaHJlZj0nZnVuY3Rpb24ubXlzcWwtcXVlcnknPmZ1bmN0aW9uLm15c3FsLXF1ZXJ5PC9hPl06IEEgbGluayB0byB0aGUgc2VydmVyIGNvdWxkIG5vdCBiZSBlc3RhYmxpc2hlZCBpbiA8Yj4vaG9tZS9hamF4bG9hZC93d3cvbGlicmFpcmllcy9jbGFzcy5teXNxbC5waHA8L2I+IG9uIGxpbmUgPGI+Njg8L2I+PGJyIC8+Cg==";
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
    characters: [{ character: '≠', latexCommand: '\\neq', popular: true }, { character: '≈', latexCommand: '\\approx', popular: true }, { character: '≤', latexCommand: '\\leq', popular: true }, { character: '≥', latexCommand: '\\geq', popular: true }, { character: '²', latexCommand: '^2', popular: true }, { character: '³', latexCommand: '^3', popular: true }, { character: '½', latexCommand: '1/2', popular: true }, { character: '⅓', latexCommand: '1/3' }, { character: '±', latexCommand: '\\pm' }]
}, {
    label: 'Algebra',
    characters: [{ character: '∼', latexCommand: '\\sim' }, { character: '≡', latexCommand: '\\equiv', popular: true }, { character: '≢' }, // \nequiv or \not\equiv
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

},{}],7:[function(require,module,exports){
'use strict';

var specialCharacterGroups = require('./specialCharacters');
var latexCommands = require('./latexCommands');

module.exports = {
    init: init
};

function init(mathEditor, hasAnswerFocus, l) {
    var $toolbar = $('\n        <div class="math-editor-tools" data-js="tools">\n            <div class="math-editor-tools-row">\n                <div class="math-editor-toolbar-wrapper">\n                    <button class="math-editor-new-equation math-editor-button math-editor-button-action" data-js="newEquation" data-title="Ctrl-L">\u03A3 ' + l.insertEquation + '</button>\n                    <div class="math-editor-toolbar-characters math-editor-toolbar math-editor-toolbar-button-list" data-js="charactersList"></div>\n                </div>\n            </div>\n            <div class="math-editor-tools-row">\n                <div class="math-editor-toolbar-wrapper math-editor-equation-wrapper">\n                    <div class="math-editor-toolbar-equation math-editor-toolbar math-editor-toolbar-button-list" style="display: none" data-js="mathToolbar"></div>\n                </div>\n            </div>\n        </div>\n        ');
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
        return '<div class="math-editor-toolbar-characters-group" \n                  style="width: ' + popularInGroup(group) * gridButtonWidthPx + 'px">\n                  ' + group.characters.map(specialCharacterToButton).join('') + '\n             </div>';
    })).append('<button class="math-editor-characters-expand-collapse"></button>').on('mousedown', 'button', function (e) {
        e.preventDefault();

        if ($(e.currentTarget).hasClass('math-editor-characters-expand-collapse')) {
            $toolbar.find('[data-js="charactersList"]').toggleClass('math-editor-characters-expanded');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvRkkuanMiLCJhcHAvU1YuanMiLCJhcHAvbGF0ZXhDb21tYW5kcy5qcyIsImFwcC9tYXRoLWVkaXRvci5qcyIsImFwcC9zYW5pdGl6ZU9wdHMuanMiLCJhcHAvc3BlY2lhbENoYXJhY3RlcnMuanMiLCJhcHAvdG9vbGJhcnMuanMiLCJhcHAvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsWUFBUTtBQUNKLG9CQUFZLGdCQURSO0FBRUosZUFBTyx5Q0FGSDtBQUdKLGtoQkFISTtBQVdKLHFEQVhJO0FBWUosNGRBWkk7QUF1Qkosb0JBQVksVUF2QlI7QUF3QkosMkJBQW1CLGVBeEJmO0FBeUJKLHdCQUFnQixhQXpCWjtBQTBCSixlQUFPLE9BMUJIO0FBMkJKLGNBQU0sVUEzQkY7QUE0QkosaUJBQVMsWUE1Qkw7QUE2Qkosc0JBQWMsbUJBN0JWO0FBOEJKLGtCQUFVLEtBOUJOO0FBK0JKLG1CQUFXLFlBL0JQO0FBZ0NKLHFCQUFhO0FBaENULEtBREs7QUFtQ2IsZ0JBQVk7QUFDUixzQkFBYyxtQkFETjtBQUVSLGlCQUFTLFlBRkQ7QUFHUixvQkFBWSxnQkFISjtBQUlSLGVBQU8sV0FKQztBQUtSLGtCQUFVLEdBTEY7QUFNUix1QkFBZSxzQkFOUDtBQU9SLGNBQU0sb0JBUEU7QUFRUixrQkFBVSxlQVJGO0FBU1IsbUJBQVc7QUFUSDtBQW5DQyxDQUFqQjs7Ozs7QUNBQSxPQUFPLE9BQVAsR0FBaUI7QUFDYixZQUFRO0FBQ0osb0JBQVksaUJBRFI7QUFFSixlQUFPLDBDQUZIO0FBR0osNmhCQUhJO0FBUUosd0RBUkk7QUFTSixvWUFUSTtBQWtCSixvQkFBWSxhQWxCUjtBQW1CSiwyQkFBbUIsZUFuQmY7QUFvQkosd0JBQWdCLGtCQXBCWjtBQXFCSixlQUFPLE9BckJIO0FBc0JKLGNBQU0sT0F0QkY7QUF1QkosaUJB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QUFZLElBQWhDLEVBQVA7QUFDSCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBlZGl0b3I6IHtcbiAgICAgICAgbWF0aEVkaXRvcjogJ01hdGlra2FlZGl0b3JpJyxcbiAgICAgICAgdGl0bGU6ICdLYWF2YWVkaXRvcmluIGVuc2ltbcOkaW5lbiBrZWhpdHlzdmVyc2lvJyxcbiAgICAgICAgZGVzY3JpcHRpb246IGA8dWw+XG48bGk+RWRpdG9yaSB0b2ltaWkgcGFyaGFpdGVuIEZpcmVmb3gtc2VsYWltZWxsYS48L2xpPlxuPGxpPuKAnExpc8Okw6Qga2FhdmHigJ0gLW5hcGluIGFsdGEgbMO2eWTDpHQgeWxlaXNpbXBpw6QgbWF0ZW1hdGlpa2Fzc2EsIGZ5c2lpa2Fzc2EgamFcbmtlbWlhc3NhIGvDpHl0ZXR0w6R2acOkIG1lcmtpbnTDtmrDpC4gTGlzw6Rrc2kgZXJpa29pc21lcmtrZWrDpCB2b2kga8OkeXR0w6TDpCBrYWF2YW4ga2lyam9pdHRhbWlzZWVuLjwvbGk+XG4gPGxpPkthYXZvamEgdm9pIHJha2VudGFhXG5rbGlra2FhbWFsbGEgdmFsaWtvbiBtZXJraW50w7Zqw6QgamEvdGFpIGtpcmpvaXR0YW1hbGxhIExhVGVYaWEuPC9saT5cbiA8bGk+RWRpdG9yaW4gdmFzdGF1c2tlbnR0w6TDpG4gdm9pIGtpcmpvaXR0YWEgdGVrc3Rpw6QgamEga2Fhdm9qYSBzZWvDpFxubGlzw6R0w6Qga3V2aWEuPC9saT48L3VsPmAsXG4gICAgICAgIHNob3J0Y3V0VGl0bGU6IGBQaWthbsOkcHDDpGludmlua2tlasOkYCxcbiAgICAgICAgc2hvcnRjdXRzOiBgPHRhYmxlPjx0Ym9keT5cbjx0cj48dGg+TGlpdMOkIGt1dmEgbGVpa2Vww7Z5ZMOkbHTDpDwvdGg+PHRkPkN0cmwtVjwvdGQ+PC90cj5cbjx0cj48dGg+S2lyam9pdGEga2FhdmE8L3RoPjx0ZD5DdHJsLUwgdGFpIEN0cmwtSTwvdGQ+PC90cj5cbjx0cj48dGggY29sc3Bhbj1cIjJcIj5LYWF2YXNzYTwvdGg+PC90cj5cbjx0cj48dGg+SmFrb3ZpaXZhPC90aD48dGQ+LzwvdGQ+PC90cj5cbjx0cj48dGg+S2VydG9tZXJra2k8L3RoPjx0ZD4qPC90ZD48L3RyPlxuPHRyPjx0aD5Fa3Nwb25lbnR0aTwvdGg+PHRkPl48L3RkPjwvdHI+XG48dHI+PHRoPlN1bGplIGthYXZhPC90aD48dGQ+Q3RybC1FbnRlciB0YWkgRXNjPC90ZD48L3RyPlxuPHRyPjx0aD5MaXPDpMOkIGthYXZhIHNldXJhYXZhbGxlIHJpdmlsbGU8L3RoPjx0ZD5FbnRlcjwvdGQ+PC90cj5cbjwvdGJvZHk+XG48L3RhYmxlPmAsXG4gICAgICAgIGZvcm1hdHRpbmc6ICdNdW90b2lsdScsXG4gICAgICAgIHNwZWNpYWxDaGFyYWN0ZXJzOiAnRXJpa29pc21lcmtpdCcsXG4gICAgICAgIGluc2VydEVxdWF0aW9uOiAnTGlzw6TDpCBrYWF2YScsXG4gICAgICAgIGNsb3NlOiAnc3VsamUnLFxuICAgICAgICBzYXZlOiAnVGFsbGVubmEnLFxuICAgICAgICB1cGRhdGVkOiAnUMOkaXZpdGV0dHknLFxuICAgICAgICBzZW5kRmVlZGJhY2s6ICdMw6RoZXTDpCBwYWxhdXRldHRhJyxcbiAgICAgICAgbGFuZ0xpbms6ICcvc3YnLFxuICAgICAgICBsYW5nTGFiZWw6ICdQw6Ugc3ZlbnNrYScsXG4gICAgICAgIGFuc3dlclRpdGxlOiAnVmFzdGF1cydcbiAgICB9LFxuICAgIGFubm90YXRpbmc6IHtcbiAgICAgICAgc2VuZEZlZWRiYWNrOiAnTMOkaGV0w6QgcGFsYXV0ZXR0YScsXG4gICAgICAgIHVwZGF0ZWQ6ICdQw6Rpdml0ZXR0eScsXG4gICAgICAgIG1hdGhFZGl0b3I6ICdNYXRpa2thZWRpdG9yaScsXG4gICAgICAgIHRpdGxlOiAnQXJ2b3N0ZWx1JyxcbiAgICAgICAgYmFja0xpbms6ICcvJyxcbiAgICAgICAgYmFja0xpbmtMYWJlbDogJ1BhbGFhIGthYXZhZWRpdG9yaWluJyxcbiAgICAgICAgc2F2ZTogJ1RhbGxlbm5hIG1lcmtpbm7DpHQnLFxuICAgICAgICBsYW5nTGluazogJy9zdi9iZWRvbW5pbmcnLFxuICAgICAgICBsYW5nTGFiZWw6ICdQw6Ugc3ZlbnNrYSdcbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBlZGl0b3I6IHtcbiAgICAgICAgbWF0aEVkaXRvcjogJ01hdGVtYXRpa2VkaXRvcicsXG4gICAgICAgIHRpdGxlOiAnRm9ybWVsZWRpdG9ybnMgZsO2cnN0YSB1dHZlY2tsaW5nc3ZlcnNpb24nLFxuICAgICAgICBkZXNjcmlwdGlvbjogYDx1bD5cbjxsaT5FZGl0b3JuIGZ1bmdlcmFyIGLDpHN0IG1lZCBicm93c2VybiBGaXJlZm94LjwvbGk+XG4gPGxpPlVuZGVyIGtuYXBwZW4g4oCcTMOkZ2cgdGlsbCBmb3JtZWzigJ0gaGl0dGFyIGR1IGRlIHZhbmxpZ2FzdGUgYmV0ZWNrbmluZ2FybmEgc29tIGFudsOkbmRzIGkgbWF0ZW1hdGlrLCBmeXNpayBvY2gga2VtaS4gRGVzc3V0b20ga2FuIGR1IGFudsOkbmRhIHNwZWNpYWx0ZWNrZW4gZsO2ciBhdHQgc2tyaXZhIGZvcm1sZXIuPC9saT5cbjxsaT5EZXQgZ8OlciBhdHQga29uc3RydWVyYSBmb3JtbGVyIGdlbm9tIGF0dCBrbGlja2EgcMOlIGJldGVja25pbmdhcm5hIGkgbWVueWVybmEgb2NoL2VsbGVyIGdlbm9tIGF0dCBza3JpdmEgTGFUZVguPC9saT5cbjxsaT5EZXQgZ8OlciBmw7ZydXRvbSBhdHQgc2tyaXZhIHRleHQgb2NoIGZvcm1sZXIsIGF0dCBvY2tzw6UgYXR0IGzDpGdnYSB0aWxsIGJpbGRlciBpIHN2YXJzZsOkbHRldC48L2xpPjwvdWw+YCxcbiAgICAgICAgc2hvcnRjdXRUaXRsZTogYFRpcHMgcMOlIHRhbmdlbnRrb21iaW5hdGlvbmVyYCxcbiAgICAgICAgc2hvcnRjdXRzOiBgPHRhYmxlPjx0Ym9keT5cbjx0cj48dGg+TMOkZ2cgdGlsbCBlbiBiaWxkIGZyw6VuIHVya2xpcHBldDwvdGg+PHRkPkN0cmwtVjwvdGQ+PC90cj5cbjx0cj48dGg+U2tyaXYgZW4gZm9ybWVsPC90aD48dGQ+Q3RybC1MIC8gQ3RybC1JPC90ZD48L3RyPlxuPHRyPjx0aCBjb2xzcGFuPVwiMlwiPkkgZm9ybWVsbiA8L3RoPjwvdHI+XG48dHI+PHRoPkJyw6Vrc3RyZWNrPC90aD48dGQ+LzwvdGQ+PC90cj5cbjx0cj48dGg+TXVsdGlwbGlrYXRpb25zdGVja2VuPC90aD48dGQ+KjwvdGQ+PC90cj5cbjx0cj48dGg+U3TDpG5nIGZvcm1lbG48L3RoPjx0ZD5DdHJsLUVudGVyIGVsbGVyIEVzYzwvdGQ+PC90cj5cbjwvdGJvZHk+XG48L3RhYmxlPmAsXG4gICAgICAgIGZvcm1hdHRpbmc6ICdGb3JtYXRlcmluZycsXG4gICAgICAgIHNwZWNpYWxDaGFyYWN0ZXJzOiAnU3BlY2lhbHRlY2tlbicsXG4gICAgICAgIGluc2VydEVxdWF0aW9uOiAnTMOkZ2cgdGlsbCBmb3JtZWwnLFxuICAgICAgICBjbG9zZTogJ3N0w6RuZycsXG4gICAgICAgIHNhdmU6ICdTcGFyYScsXG4gICAgICAgIHVwZGF0ZWQ6ICdVcHBkYXRlcmFkJyxcbiAgICAgICAgc2VuZEZlZWRiYWNrOiAnU2tpY2thIGZlZWRiYWNrJyxcbiAgICAgICAgbGFuZ0xpbms6ICcvJyxcbiAgICAgICAgbGFuZ0xhYmVsOiAnU3VvbWVrc2knLFxuICAgICAgICBhbnN3ZXJUaXRsZTogJ1N2YXInXG4gICAgfSxcbiAgICBhbm5vdGF0aW5nOiB7XG4gICAgICAgIHNlbmRGZWVkYmFjazogJ1NraWNrYSByZXNwb25zJyxcbiAgICAgICAgdXBkYXRlZDogJ1VwcGRhdGVyYWQnLFxuICAgICAgICBtYXRoRWRpdG9yOiAnTWF0ZW1hdGlrZWRpdG9yJyxcbiAgICAgICAgdGl0bGU6ICdCZWTDtm1uaW5nJyxcbiAgICAgICAgYmFja0xpbms6ICcvc3YnLFxuICAgICAgICBiYWNrTGlua0xhYmVsOiAnTWF0ZW1hdGlrZWRpdG9yJyxcbiAgICAgICAgc2F2ZTogJ1NwYXJhIGFudGVja25pbmdhcicsXG4gICAgICAgIGxhbmdMaW5rOiAnL3Rhcmtpc3R1cycsXG4gICAgICAgIGxhbmdMYWJlbDogJ1N1b21la3NpJ1xuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuICAgIHthY3Rpb246ICdcXFxcc3FydCcsIGxhYmVsOiAnXFxcXHNxcnR7WH0nfSxcbiAgICB7YWN0aW9uOiAnXicsIGxhYmVsOiAneF57WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGZyYWMnLCBsYWJlbDogJ1xcXFxmcmFje1h9e1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxpbnQnLCBsYWJlbDogJ1xcXFxpbnRfe1h9XntYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcbGltXycsIGxhYmVsOiAnXFxcXGxpbV97WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXGxpbV97eFxcXFxyaWdodGFycm93XFxcXGluZnR5fScsIGxhYmVsOiAnXFxcXGxpbV97eFxcXFxyaWdodGFycm93XFxcXGluZnR5fScsIHVzZVdyaXRlOnRydWV9LFxuICAgIHthY3Rpb246ICdcXFxcb3ZlcnJpZ2h0YXJyb3cnLCBsYWJlbDogJ1xcXFxvdmVycmlnaHRhcnJvd3tYfSd9LFxuICAgIHthY3Rpb246ICdfJywgbGFiZWw6ICd4X1gnfSxcbiAgICB7YWN0aW9uOiAnXFxcXG50aHJvb3QnLCBsYWJlbDogJ1xcXFxzcXJ0W1hde1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxzdW0nLCBsYWJlbDogJ1xcXFxzdW1fe1h9XntYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcYmlub20nLCBsYWJlbDogJ1xcXFxiaW5vbXtYfXtYfSd9LFxuICAgIHthY3Rpb246ICdcXFxcc2luJ30sXG4gICAge2FjdGlvbjogJ1xcXFxjb3MnfSxcbiAgICB7YWN0aW9uOiAnXFxcXHRhbid9LFxuICAgIHthY3Rpb246ICdcXFxcdmVjJywgbGFiZWw6ICdcXFxcdmVje1h9J30sXG4gICAge2FjdGlvbjogJ1xcXFxiYXInLCBsYWJlbDogJ1xcXFxiYXJ7WH0nfSxcbiAgICB7YWN0aW9uOiAnXFxcXG92ZXJsaW5le1xcXFx0ZXh0e2l9fScsIHVzZVdyaXRlOiB0cnVlfSxcbiAgICB7YWN0aW9uOiAnXFxcXG92ZXJsaW5le1xcXFx0ZXh0e2p9fScsIHVzZVdyaXRlOiB0cnVlfSxcbiAgICB7YWN0aW9uOiAnXFxcXG92ZXJsaW5le1xcXFx0ZXh0e2t9fScsIHVzZVdyaXRlOiB0cnVlfSxcbiAgICB7YWN0aW9uOiAnXFxcXG92ZXJsZWZ0YXJyb3cnLCBsYWJlbDogJ1xcXFxvdmVybGVmdGFycm93e1h9J30sXG4gICAge2FjdGlvbjogJ3wnLCBsYWJlbDogJ3xYfCd9LFxuICAgIHthY3Rpb246ICcoJywgbGFiZWw6ICcoWCknfSxcbiAgICB7YWN0aW9uOiAnX3sgfV57IH0gJywgbGFiZWw6ICdfe1h9XntYfVgnLCB1c2VXcml0ZTogdHJ1ZX0sXG4gICAge2FjdGlvbjogJ1xcXFx0ZXh0JywgbGFiZWw6ICdcXFxcdGV4dHtUfSd9LFxuXVxuIiwiY29uc3Qge2lzQ3RybEtleSwgaXNLZXksIGRlY29kZUJhc2U2NEltYWdlLCBpbnNlcnRUb1RleHRBcmVhQXRDdXJzb3IsIHNhbml0aXplQ29udGVudCwgc2FuaXRpemV9ID0gcmVxdWlyZSgnLi91dGlsJylcbmNvbnN0IHRvb2xiYXJzID0gcmVxdWlyZSgnLi90b29sYmFycycpXG5jb25zdCBNUSA9IE1hdGhRdWlsbC5nZXRJbnRlcmZhY2UoMilcbmNvbnN0IGxvY2FsZXMgPSB7XG4gICAgRkk6IHJlcXVpcmUoJy4vRkknKSxcbiAgICBTVjogcmVxdWlyZSgnLi9TVicpXG59XG5jb25zdCBsID0gbG9jYWxlc1t3aW5kb3cubG9jYWxlIHx8ICdGSSddLmVkaXRvclxuY29uc3Qga2V5Q29kZXMgPSB7XG4gICAgRU5URVI6IDEzLFxuICAgIEVTQzogMjdcbn1cblxuY29uc3QgJG91dGVyUGxhY2Vob2xkZXIgPSAkKGA8ZGl2IGNsYXNzPVwibWF0aC1lZGl0b3ItaGlkZGVuXCIgZGF0YS1qcz1cIm91dGVyUGxhY2Vob2xkZXJcIj5gKVxuXG5mdW5jdGlvbiBtb3ZlRWxlbWVudEFmdGVyKCRlbGVtZW50LCAkYWZ0ZXIpIHtcbiAgICAkYWZ0ZXIuYWZ0ZXIoJGVsZW1lbnQpXG59XG5cbmZ1bmN0aW9uIGhpZGVFbGVtZW50SW5ET00oJGVsZW1lbnQpIHtcbiAgICAkb3V0ZXJQbGFjZWhvbGRlci5hcHBlbmQoJGVsZW1lbnQpXG59XG5cbi8vIFRPRE86IHJlcGxhY2Ugd2l0aCBkYXRhIGF0dHJpYnV0ZXM/XG5sZXQgYW5zd2VyRm9jdXMgPSB0cnVlXG5sZXQgbGF0ZXhFZGl0b3JGb2N1cyA9IGZhbHNlXG5sZXQgZXF1YXRpb25FZGl0b3JGb2N1cyA9IGZhbHNlXG5sZXQgbWF0aEVkaXRvclZpc2libGUgPSBmYWxzZVxubGV0ICRjdXJyZW50RWRpdG9yXG5cbiQoJ2JvZHknKS5hcHBlbmQoJG91dGVyUGxhY2Vob2xkZXIpXG5cbmNvbnN0IG1hdGhFZGl0b3IgPSBpbml0TWF0aEVkaXRvcigpXG5jb25zdCB7JHRvb2xiYXIsIHRvZ2dsZU1hdGhUb29sYmFyfSA9IHRvb2xiYXJzLmluaXQobWF0aEVkaXRvciwgKCkgPT4gYW5zd2VyRm9jdXMsIGwpXG5cbmhpZGVFbGVtZW50SW5ET00oJHRvb2xiYXIpXG5cbmZ1bmN0aW9uIGluaXRNYXRoRWRpdG9yKCkge1xuICAgIGNvbnN0ICRtYXRoRWRpdG9yQ29udGFpbmVyID0gJChgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtYXRoLWVkaXRvclwiIGRhdGEtanM9XCJtYXRoRWRpdG9yXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWF0aC1lZGl0b3ItYm94ZXNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWF0aC1lZGl0b3ItZXF1YXRpb24tZWRpdG9yXCIgZGF0YS1qcz1cImVxdWF0aW9uRWRpdG9yXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwibWF0aC1lZGl0b3ItbGF0ZXgtZWRpdG9yXCIgZGF0YS1qcz1cImxhdGV4RWRpdG9yXCIgcGxhY2Vob2xkZXI9XCJMYVRleFwiPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+YClcblxuICAgIGhpZGVFbGVtZW50SW5ET00oJG1hdGhFZGl0b3JDb250YWluZXIpXG5cbiAgICBjb25zdCAkbGF0ZXhFZGl0b3IgPSAkbWF0aEVkaXRvckNvbnRhaW5lci5maW5kKCdbZGF0YS1qcz1cImxhdGV4RWRpdG9yXCJdJylcbiAgICBjb25zdCAkZXF1YXRpb25FZGl0b3IgPSAkbWF0aEVkaXRvckNvbnRhaW5lci5maW5kKCdbZGF0YS1qcz1cImVxdWF0aW9uRWRpdG9yXCJdJylcbiAgICBsZXQgbXFFZGl0VGltZW91dFxuICAgIGZ1bmN0aW9uIG9uTXFFZGl0KCkge1xuICAgICAgICBjbGVhclRpbWVvdXQobXFFZGl0VGltZW91dClcbiAgICAgICAgbXFFZGl0VGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGxhdGV4RWRpdG9yRm9jdXMpXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICBjb25zdCBsYXRleCA9IG1xSW5zdGFuY2UubGF0ZXgoKVxuICAgICAgICAgICAgJGxhdGV4RWRpdG9yLnZhbChsYXRleClcbiAgICAgICAgICAgIHVwZGF0ZU1hdGhJbWcoJG1hdGhFZGl0b3JDb250YWluZXIucHJldigpLCBsYXRleClcbiAgICAgICAgfSwgMTAwKVxuICAgIH1cbiAgICBjb25zdCBtcUluc3RhbmNlID0gTVEuTWF0aEZpZWxkKCRlcXVhdGlvbkVkaXRvci5nZXQoMCksIHtcbiAgICAgICAgaGFuZGxlcnM6IHtcbiAgICAgICAgICAgIGVkaXQ6IG9uTXFFZGl0LFxuICAgICAgICAgICAgZW50ZXI6IGZpZWxkID0+IHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBkbyBub3QgY2xvc2UgZWRpdG9yIC8gbyBub3QgY3JlYXRlICBhIG5ldyBlcXVhdGlvbiBpZiB0aGVyZSBpcyBubyB0ZXh0P1xuICAgICAgICAgICAgICAgIG1hdGhFZGl0b3IuY2xvc2VNYXRoRWRpdG9yKHRydWUpXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBpbnNlcnROZXdFcXVhdGlvbignPGRpdj48L2Rpdj4nKSwgMilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG4gICAgJGVxdWF0aW9uRWRpdG9yLm9uKCdrZXlkb3duJywgJy5tcS10ZXh0YXJlYSB0ZXh0YXJlYScsIG9uTXFFZGl0KVxuXG4gICAgJGVxdWF0aW9uRWRpdG9yXG4gICAgICAgIC5vbignZm9jdXMgYmx1cicsICcubXEtdGV4dGFyZWEgdGV4dGFyZWEnLCBlID0+IHtcbiAgICAgICAgICAgIGVxdWF0aW9uRWRpdG9yRm9jdXMgPSBlLnR5cGUgIT09ICdibHVyJyAmJiBlLnR5cGUgIT09ICdmb2N1c291dCdcbiAgICAgICAgICAgIG9uRm9jdXNDaGFuZ2VkKClcbiAgICAgICAgfSlcblxuICAgIGZ1bmN0aW9uIG9uTGF0ZXhVcGRhdGUoKSB7XG4gICAgICAgIHVwZGF0ZU1hdGhJbWcoJG1hdGhFZGl0b3JDb250YWluZXIucHJldigpLCAkbGF0ZXhFZGl0b3IudmFsKCkpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gbXFJbnN0YW5jZS5sYXRleCgkbGF0ZXhFZGl0b3IudmFsKCkpLCAxKVxuICAgIH1cblxuICAgICRsYXRleEVkaXRvclxuICAgICAgICAua2V5dXAob25MYXRleFVwZGF0ZSlcbiAgICAgICAgLm9uKCdmb2N1cyBibHVyJywgZSA9PiB7XG4gICAgICAgICAgICBsYXRleEVkaXRvckZvY3VzID0gZS50eXBlICE9PSAnYmx1cidcbiAgICAgICAgICAgIG9uRm9jdXNDaGFuZ2VkKClcbiAgICAgICAgfSlcblxuICAgIGxldCBmb2N1c0NoYW5nZWQgPSBudWxsXG5cbiAgICBmdW5jdGlvbiBvbkZvY3VzQ2hhbmdlZCgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGZvY3VzQ2hhbmdlZClcbiAgICAgICAgZm9jdXNDaGFuZ2VkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWxhdGV4RWRpdG9yRm9jdXMgJiYgIWVxdWF0aW9uRWRpdG9yRm9jdXMpIGNsb3NlTWF0aEVkaXRvcigpXG4gICAgICAgICAgICBpZiAoIWFuc3dlckZvY3VzICYmICFtYXRoRWRpdG9yVmlzaWJsZSAmJiAhbGF0ZXhFZGl0b3JGb2N1cyAmJiAhZXF1YXRpb25FZGl0b3JGb2N1cykgb25FZGl0b3JCbHVyKClcbiAgICAgICAgfSwgMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnNlcnROZXdFcXVhdGlvbihvcHRpb25hbE1hcmt1cCkge1xuICAgICAgICB3aW5kb3cuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydEhUTUwnLCBmYWxzZSwgKG9wdGlvbmFsTWFya3VwID8gb3B0aW9uYWxNYXJrdXAgOiAnJykgKyAnPGltZyBkYXRhLWpzPVwibmV3XCIgc3R5bGU9XCJkaXNwbGF5OiBub25lXCIvPicpXG4gICAgICAgIGNvbnN0ICRhZGRlZEVxdWF0aW9uSW1hZ2UgPSAkKCdbZGF0YS1qcz1cIm5ld1wiXScpXG4gICAgICAgICRhZGRlZEVxdWF0aW9uSW1hZ2VcbiAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdkYXRhLWpzJylcblxuICAgICAgICBtb3ZlRWxlbWVudEFmdGVyKCRtYXRoRWRpdG9yQ29udGFpbmVyLCAkYWRkZWRFcXVhdGlvbkltYWdlKVxuXG4gICAgICAgIG1xSW5zdGFuY2UubGF0ZXgoJycpXG4gICAgICAgIG1hdGhFZGl0b3JWaXNpYmxlID0gdHJ1ZVxuICAgICAgICB0b2dnbGVNYXRoVG9vbGJhcih0cnVlKVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IG1xSW5zdGFuY2UuZm9jdXMoKSwgMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnNlcnRNYXRoKHN5bWJvbCwgYWx0ZXJuYXRpdmVTeW1ib2wsIHVzZVdyaXRlKSB7XG4gICAgICAgIGlmIChsYXRleEVkaXRvckZvY3VzKSB7XG4gICAgICAgICAgICBpbnNlcnRUb1RleHRBcmVhQXRDdXJzb3IoJGxhdGV4RWRpdG9yLmdldCgwKSwgYWx0ZXJuYXRpdmVTeW1ib2wgfHwgc3ltYm9sKVxuICAgICAgICAgICAgb25MYXRleFVwZGF0ZSgpXG4gICAgICAgIH0gZWxzZSBpZiAoZXF1YXRpb25FZGl0b3JGb2N1cykge1xuICAgICAgICAgICAgaWYgKHVzZVdyaXRlKSB7XG4gICAgICAgICAgICAgICAgbXFJbnN0YW5jZS53cml0ZShzeW1ib2wpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1xSW5zdGFuY2UudHlwZWRUZXh0KHN5bWJvbClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHN5bWJvbC5zdGFydHNXaXRoKCdcXFxcJykpIG1xSW5zdGFuY2Uua2V5c3Ryb2tlKCdUYWInKVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBtcUluc3RhbmNlLmZvY3VzKCksIDApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVNYXRoSW1nKCRpbWcsIGxhdGV4KSB7XG4gICAgICAgICRpbWdcbiAgICAgICAgICAgIC5wcm9wKCdzcmMnLCAnL21hdGguc3ZnP2xhdGV4PScgKyBlbmNvZGVVUklDb21wb25lbnQobGF0ZXgpKVxuICAgICAgICAgICAgLnByb3AoJ2FsdCcsIGxhdGV4KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlTWF0aEVkaXRvcihzZXRGb2N1c0FmdGVyQ2xvc2UgPSBmYWxzZSkge1xuICAgICAgICAvLyBUT0RPOiByZW1vdmUgZXZlbnQgYmluZGluZ3NcbiAgICAgICAgY29uc3QgJGN1cnJlbnRFZGl0b3IgPSAkbWF0aEVkaXRvckNvbnRhaW5lci5jbG9zZXN0KCdbZGF0YS1qcz1cImFuc3dlclwiXScpXG4gICAgICAgIGNvbnN0ICRpbWcgPSAkbWF0aEVkaXRvckNvbnRhaW5lci5wcmV2KClcbiAgICAgICAgaWYgKCRsYXRleEVkaXRvci52YWwoKS50cmltKCkgPT09ICcnKSB7XG4gICAgICAgICAgICAkaW1nLnJlbW92ZSgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkaW1nLnNob3coKVxuICAgICAgICAgICAgdXBkYXRlTWF0aEltZygkaW1nLCAkbGF0ZXhFZGl0b3IudmFsKCkpXG4gICAgICAgIH1cblxuICAgICAgICB0b2dnbGVNYXRoVG9vbGJhcihmYWxzZSlcbiAgICAgICAgaGlkZUVsZW1lbnRJbkRPTSgkbWF0aEVkaXRvckNvbnRhaW5lcilcbiAgICAgICAgbWF0aEVkaXRvclZpc2libGUgPSBmYWxzZVxuICAgICAgICBsYXRleEVkaXRvckZvY3VzID0gZmFsc2VcbiAgICAgICAgZXF1YXRpb25FZGl0b3JGb2N1cyA9IGZhbHNlXG4gICAgICAgIGlmIChzZXRGb2N1c0FmdGVyQ2xvc2UpICRjdXJyZW50RWRpdG9yLmZvY3VzKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvcGVuTWF0aEVkaXRvcigkaW1nKSB7XG4gICAgICAgIGlmIChtYXRoRWRpdG9yVmlzaWJsZSkgY2xvc2VNYXRoRWRpdG9yKClcbiAgICAgICAgJGltZy5oaWRlKClcbiAgICAgICAgbW92ZUVsZW1lbnRBZnRlcigkbWF0aEVkaXRvckNvbnRhaW5lciwgJGltZylcbiAgICAgICAgY29uc3QgbGF0ZXggPSAkaW1nLnByb3AoJ2FsdCcpXG4gICAgICAgICRsYXRleEVkaXRvci52YWwobGF0ZXgpXG4gICAgICAgIG9uTGF0ZXhVcGRhdGUoKVxuICAgICAgICBtYXRoRWRpdG9yVmlzaWJsZSA9IHRydWVcbiAgICAgICAgdG9nZ2xlTWF0aFRvb2xiYXIodHJ1ZSlcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBtcUluc3RhbmNlLmZvY3VzKCksIDApXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5zZXJ0TmV3RXF1YXRpb24sXG4gICAgICAgIGluc2VydE1hdGgsXG4gICAgICAgIGNsb3NlTWF0aEVkaXRvcixcbiAgICAgICAgb3Blbk1hdGhFZGl0b3IsXG4gICAgICAgIG9uRm9jdXNDaGFuZ2VkXG4gICAgfVxufVxuXG5mdW5jdGlvbiBvbkVkaXRvckZvY3VzKCRlbGVtZW50KSB7XG4gICAgJGN1cnJlbnRFZGl0b3IgPSAkZWxlbWVudFxuICAgICRlbGVtZW50LmJlZm9yZSgkdG9vbGJhcilcbiAgICAkdG9vbGJhci5zaG93KClcbn1cblxuZnVuY3Rpb24gb25FZGl0b3JCbHVyKCkge1xuICAgIC8vIFRPRE86IHJlbW92ZSBldmVudCBiaW5kaW5nc1xuICAgIGhpZGVFbGVtZW50SW5ET00oJHRvb2xiYXIpXG4gICAgbWF0aEVkaXRvci5jbG9zZU1hdGhFZGl0b3IoKVxuICAgIC8vICRlZGl0b3Iub2ZmKClcblxuICAgIGFuc3dlckZvY3VzID0gZmFsc2VcbiAgICBtYXRoRWRpdG9yVmlzaWJsZSA9IGZhbHNlXG4gICAgbGF0ZXhFZGl0b3JGb2N1cyA9IGZhbHNlXG59XG5cbmxldCBibHVycmVkXG5cbmZ1bmN0aW9uIG9uRWRpdG9yRm9jdXNDaGFuZ2VkKGUpIHtcbiAgICBhbnN3ZXJGb2N1cyA9IGUudHlwZSA9PT0gJ2ZvY3VzJ1xuXG4gICAgY2xlYXJUaW1lb3V0KGJsdXJyZWQpXG4gICAgYmx1cnJlZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAoIWFuc3dlckZvY3VzICYmICFtYXRoRWRpdG9yVmlzaWJsZSAmJiAhbGF0ZXhFZGl0b3JGb2N1cyAmJiAhZXF1YXRpb25FZGl0b3JGb2N1cykgb25FZGl0b3JCbHVyKClcbiAgICAgICAgZWxzZSBpZiAoYW5zd2VyRm9jdXMgJiYgbWF0aEVkaXRvclZpc2libGUpIG1hdGhFZGl0b3IuY2xvc2VNYXRoRWRpdG9yKClcbiAgICAgICAgZWxzZSBvbkVkaXRvckZvY3VzKCQoZS50YXJnZXQpKVxuICAgIH0sIDApXG59XG5cbmZ1bmN0aW9uIGlzTWF0aEVkaXRvclZpc2libGUoKSB7XG4gICAgcmV0dXJuIG1hdGhFZGl0b3JWaXNpYmxlXG59XG5cbmNvbnN0IG1hcmtBbmRHZXRJbmxpbmVJbWFnZXMgPSAkZWRpdG9yID0+IHtcbiAgICBjb25zdCBsb2FkaW5nR2lmID0gXCJkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhFQUFRQVBRQUFQLy8vd0FBQVBEdzhJcUtpdURnNEVaR1JucDZlZ0FBQUZoWVdDUWtKS3lzckw2K3ZoUVVGSnljbkFRRUJEWTJObWhvYUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUNIK0drTnlaV0YwWldRZ2QybDBhQ0JoYW1GNGJHOWhaQzVwYm1adkFDSDVCQUFLQUFBQUlmOExUa1ZVVTBOQlVFVXlMakFEQVFBQUFDd0FBQUFBRUFBUUFBQUZkeUFnQWdJSkllV29Ba1JDQ01kQmtLdElISW5neU1Lc0VyUEJZYkFEcGtTQ3doRG1RQ0JldGhSQjZWajRrRkNrUVBHNElsV0Rnck5SSXduTzRVS0JYRHVmelF2RE1hb1NEQmdGYjg4Nk1pUWFkZ05BQkFva2ZDd3pCQThMQ2cwRWdsOGpBZ2dHQUExa0JJQTFCQVl6bHlJTGN6VUxDMlVoQUNINUJBQUtBQUVBTEFBQUFBQVFBQkFBQUFWMklDQUNBbWxBWlRtT1JFRUl5VUVRakxLS3hQSEFEaEV2cXhsZ2NHZ2tHSTFEWVNWQUlBV014K2x3U0trSUNKMFFzSGk5UmdLQnduVlRpUlFRZ3dGNEk0VUZEUVFFd2k2LzNZU0dXUlJtamhFRVRBSmZJZ01GQ25BS00wS0RWNEVFRUFRTGlGMThUQVlOWERhU2UzeDZtamlkTjFzM0lRQWgrUVFBQ2dBQ0FDd0FBQUFBRUFBUUFBQUZlQ0FnQWdMWkRHVTVqZ1JFQ0VVaUNJK3lpb1NEd0RKeUxLc1hvSEZReEJTSEFvQUFGQmhxdE1KZzhEZ1FCZ2ZyRXNKQUVBZzRZaFpJRWl3Z0t0SGlNQmd0cGczd2JVWlhHTzdrT2IxTVVLUkZNeXNDQ2hBb2dnSkNJZzBHQzJhTmU0Z3FRbGRmTDRsL0FnMUFYeVNKZ241TGNvRTNRWEkzSVFBaCtRUUFDZ0FEQUN3QUFBQUFFQUFRQUFBRmRpQWdBZ0xaTkdVNWpvUWhDRWp4SXNzcUVvOGJDOUJSank5QWc3R0lMUTRRRW9FMGdCQUVCY09wY0JBMERveFNLL2U4TFJJSG4raTFjSzBJeUtkZzBWQW9sallJZytHZ25ScndWUy84SUFrSUN5b3NCSVFwQkFNb0t5OWRJbXhQaFMrR0trRnJrWCtUaWd0TGxJeUtYVUYrTmphZ05pRUFJZmtFQUFvQUJBQXNBQUFBQUJBQUVBQUFCV3dnSUFJQ2FSaGxPWTRFSWdqSDhSN0xLaEtIR3dzTXZiNEFBeTNXT0RCSUJCS0NzWUE5VGp1aEROREtFVlNFUmV6UUVMMFdyaFh1Y1JVUUd1aWs3YkZsbmd6cVZXOUxNbDlYV3ZMZGpGYUp0REZxWjFjRVpVQjBkVWd2TDNkZ1A0V0pabjRqa29tV05wU1RJeUVBSWZrRUFBb0FCUUFzQUFBQUFCQUFFQUFBQlg0Z0lBSUN1U3hsT1k2Q0lnaUQ4UnJFS2dxR093eHdVck1sQW9Td0l6QUdwSnBnb1NEQUdpZkRZNWtvcEJZRGxFcEFRQndldnhmQnRSSVVHaTh4d1drRE5CQ0l3bUM5VnEwYWlRUURRdUsrVmdRUERYVjloQ0pqQndjRllVNXBMd3dIWFFjTUtTbU5MUWNJQUV4bGJIOEpCd3R0YVgwQUJBY05iV1ZiS3lFQUlma0VBQW9BQmdBc0FBQUFBQkFBRUFBQUJYa2dJQUlDU1JCbE9ZN0NJZ2hOOHpiRUtzS29JamRGelphRWdVQkhLQ2hNSnRSd2NXcEFXb1duaWZtNkVTQU1oTzhsUUswRUVBVjNyRm9wSUJDRWNHd0RLQXFQaDRIVXJZNElDSEgxZFNvVEZnY0hVaVpqQmhBSkIyQUhEeWtwS0F3SEF3ZHpmMTlLa0FTSVBsOWNEZ2NuRGtkdE53aU1KQ3NoQUNINUJBQUtBQWNBTEFBQUFBQVFBQkFBQUFWM0lDQUNBa2tRWlRtT0Fpb3NpeUFveENxK0tQeENOVnNTTVJnQnNpQ2xXckxUU1dGb0lRWkhsNnBsZUJoNnN1eEtNSWhsdnpiQXdrQldmRldyQlFUeE5McTJSRzJ5aFNVa0RzMmI2M0FZREFvSlhBY0ZSd0FEZUFrSkRYMEFRQ3NFZkFRTURBSVBCejByQ2djeGt5MEpSV0UxQW13cEt5RUFJZmtFQUFvQUNBQXNBQUFBQUJBQUVBQUFCWGtnSUFJQ0taemtxSjRuUVp4THFaS3Y0TnFOTEtLMi9RNEVrNGxGWENoc2c1eXBKanMxSUkzZ0VEVVNSSW5FR1lBdzZCNnpNNEpockRBdEVvc1ZrTFV0SEE3UkhhSEFHSlFFanNPRGNFZzBGQkFGVmdrUUpRMXBBd2NERHc4S2NGdFNJbndKQW93Q0NBNlJJd3FaQWdrUE5nVnBXbmRqZHlvaEFDSDVCQUFLQUFrQUxBQUFBQUFRQUJBQUFBVjVJQ0FDQWltYzVLaWVMRXVVS3ZtMnhBS0xxRENmQzJHYU85ZUwwTEFCV1RpQlltQTA2VzZrSGd2Q3FFSmlBSUppdTNnY3ZnVXNzY0hVRVJtK2thQ3h5eGErelJQazBTZ0pFZ2ZJdmJBZElBUUxDQVlsQ2o0REJ3MElCUXNNQ2pJcUJBY1BBb29DQmc5cEtnc0pMd1VGT2hDWkt5UURBM1lxSVFBaCtRUUFDZ0FLQUN3QUFBQUFFQUFRQUFBRmRTQWdBZ0lwbk9Tb25teGJxaVRoQ3JKS0VIRmJvOEp4RERPWllGRmIrQTQxRTRINE9oa09pcFh3QkVsWUlUREFja0ZFT0JnTVEzYXJrTWtVQmR4SVVHWnBFYjdrYVFCUmxBU1BnMEZRUUhBYkVFTUdEU1ZFQUExUUJoQUVEMUUwTmd3RkFvb0NEV2xqYVFJUUNFNXFNSGNOaENraklRQWgrUVFBQ2dBTEFDd0FBQUFBRUFBUUFBQUZlU0FnQWdJcG5PU29MZ3h4dnFnS0xFY0NDNjVLRUFCeUtLOGNTcEE0REFpSFEvRGtLaEdLaDRaQ3RDeVpHbzZGNmlZWVBBcUZnWXkwMnhrU2FMRU1WMzR0RUx5UllORXNDUXlIbHZXa0dDenNQZ01DRUFZN0NnMDRVazQ4TEFzRGhSQThNVlFQRUYwR0FncVlZd1NSbHljTmNXc2tDa0FwSXlFQU93QUFBQUFBQUFBQUFEeGljaUF2UGdvOFlqNVhZWEp1YVc1blBDOWlQam9nSUcxNWMzRnNYM0YxWlhKNUtDa2dXenhoSUdoeVpXWTlKMloxYm1OMGFXOXVMbTE1YzNGc0xYRjFaWEo1Sno1bWRXNWpkR2x2Ymk1dGVYTnhiQzF4ZFdWeWVUd3ZZVDVkT2lCRFlXNG5kQ0JqYjI1dVpXTjBJSFJ2SUd4dlkyRnNJRTE1VTFGTUlITmxjblpsY2lCMGFISnZkV2RvSUhOdlkydGxkQ0FuTDNaaGNpOXlkVzR2YlhsemNXeGtMMjE1YzNGc1pDNXpiMk5ySnlBb01pa2dhVzRnUEdJK0wyaHZiV1V2WVdwaGVHeHZZV1F2ZDNkM0wyeHBZbkpoYVhKcFpYTXZZMnhoYzNNdWJYbHpjV3d1Y0dod1BDOWlQaUJ2YmlCc2FXNWxJRHhpUGpZNFBDOWlQanhpY2lBdlBnbzhZbklnTHo0S1BHSStWMkZ5Ym1sdVp6d3ZZajQ2SUNCdGVYTnhiRjl4ZFdWeWVTZ3BJRnM4WVNCb2NtVm1QU2RtZFc1amRHbHZiaTV0ZVhOeGJDMXhkV1Z5ZVNjK1puVnVZM1JwYjI0dWJYbHpjV3d0Y1hWbGNuazhMMkUrWFRvZ1FTQnNhVzVySUhSdklIUm9aU0J6WlhKMlpYSWdZMjkxYkdRZ2JtOTBJR0psSUdWemRHRmliR2x6YUdWa0lHbHVJRHhpUGk5b2IyMWxMMkZxWVhoc2IyRmtMM2QzZHk5c2FXSnlZV2x5YVdWekwyTnNZWE56TG0xNWMzRnNMbkJvY0R3dllqNGdiMjRnYkdsdVpTQThZajQyT0R3dllqNDhZbklnTHo0S1BHSnlJQzgrQ2p4aVBsZGhjbTVwYm1jOEwySStPaUFnYlhsemNXeGZjWFZsY25rb0tTQmJQR0VnYUhKbFpqMG5ablZ1WTNScGIyNHViWGx6Y1d3dGNYVmxjbmtuUG1aMWJtTjBhVzl1TG0xNWMzRnNMWEYxWlhKNVBDOWhQbDA2SUVOaGJpZDBJR052Ym01bFkzUWdkRzhnYkc5allXd2dUWGxUVVV3Z2MyVnlkbVZ5SUhSb2NtOTFaMmdnYzI5amEyVjBJQ2N2ZG1GeUwzSjFiaTl0ZVhOeGJHUXZiWGx6Y1d4a0xuTnZZMnNuSUNneUtTQnBiaUE4WWo0dmFHOXRaUzloYW1GNGJHOWhaQzkzZDNjdmJHbGljbUZwY21sbGN5OWpiR0Z6Y3k1dGVYTnhiQzV3YUhBOEwySStJRzl1SUd4cGJtVWdQR0krTmpnOEwySStQR0p5SUM4K0NqeGljaUF2UGdvOFlqNVhZWEp1YVc1blBDOWlQam9nSUcxNWMzRnNYM0YxWlhKNUtDa2dXenhoSUdoeVpXWTlKMloxYm1OMGFXOXVMbTE1YzNGc0xYRjFaWEo1Sno1bWRXNWpkR2x2Ymk1dGVYTnhiQzF4ZFdWeWVUd3ZZVDVkT2lCQklHeHBibXNnZEc4Z2RHaGxJSE5sY25abGNpQmpiM1ZzWkNCdWIzUWdZbVVnWlhOMFlXSnNhWE5vWldRZ2FXNGdQR0krTDJodmJXVXZZV3BoZUd4dllXUXZkM2QzTDJ4cFluSmhhWEpwWlhNdlkyeGhjM011YlhsemNXd3VjR2h3UEM5aVBpQnZiaUJzYVc1bElEeGlQalk0UEM5aVBqeGljaUF2UGdvOFluSWdMejRLUEdJK1YyRnlibWx1Wnp3dllqNDZJQ0J0ZVhOeGJGOXhkV1Z5ZVNncElGczhZU0JvY21WbVBTZG1kVzVqZEdsdmJpNXRlWE54YkMxeGRXVnllU2MrWm5WdVkzUnBiMjR1YlhsemNXd3RjWFZsY25rOEwyRStYVG9nUTJGdUozUWdZMjl1Ym1WamRDQjBieUJzYjJOaGJDQk5lVk5SVENCelpYSjJaWElnZEdoeWIzVm5hQ0J6YjJOclpYUWdKeTkyWVhJdmNuVnVMMjE1YzNGc1pDOXRlWE54YkdRdWMyOWpheWNnS0RJcElHbHVJRHhpUGk5b2IyMWxMMkZxWVhoc2IyRmtMM2QzZHk5c2FXSnlZV2x5YVdWekwyTnNZWE56TG0xNWMzRnNMbkJvY0R3dllqNGdiMjRnYkdsdVpTQThZajQyT0R3dllqNDhZbklnTHo0S1BHSnlJQzgrQ2p4aVBsZGhjbTVwYm1jOEwySStPaUFnYlhsemNXeGZjWFZsY25rb0tTQmJQR0VnYUhKbFpqMG5ablZ1WTNScGIyNHViWGx6Y1d3dGNYVmxjbmtuUG1aMWJtTjBhVzl1TG0xNWMzRnNMWEYxWlhKNVBDOWhQbDA2SUVFZ2JHbHVheUIwYnlCMGFHVWdjMlZ5ZG1WeUlHTnZkV3hrSUc1dmRDQmlaU0JsYzNSaFlteHBjMmhsWkNCcGJpQThZajR2YUc5dFpTOWhhbUY0Ykc5aFpDOTNkM2N2YkdsaWNtRnBjbWxsY3k5amJHRnpjeTV0ZVhOeGJDNXdhSEE4TDJJK0lHOXVJR3hwYm1VZ1BHSStOamc4TDJJK1BHSnlJQzgrQ2c9PVwiXG4gICAgcmV0dXJuICRlZGl0b3IuZmluZCgnaW1nW3NyY149XCJkYXRhXCJdJylcbiAgICAgICAgLmVhY2goKGksIGVsKSA9PiBlbC5zZXRBdHRyaWJ1dGUoJ2lkJywgbmV3IERhdGUoKS5nZXRUaW1lKCkgKyAnLScgKyBpKSlcbiAgICAgICAgLm1hcCgoaSwgZWwpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJldCA9IE9iamVjdC5hc3NpZ24oZGVjb2RlQmFzZTY0SW1hZ2UoZWwuZ2V0QXR0cmlidXRlKCdzcmMnKSksIHtpZDogZWwuZ2V0QXR0cmlidXRlKCdpZCcpfSlcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnc3JjJywgbG9hZGluZ0dpZilcbiAgICAgICAgICAgIHJldHVybiByZXRcbiAgICAgICAgfSlcbiAgICAgICAgLnRvQXJyYXkoKVxuICAgICAgICAuZmlsdGVyKCh7dHlwZX0pID0+IHR5cGUgPT09ICdpbWFnZS9wbmcnKVxufVxuXG5jb25zdCBwZXJzaXN0SW5saW5lSW1hZ2VzID0gKCRlZGl0b3IsIHNjcmVlbnNob3RTYXZlcikgPT4ge1xuICAgIEJhY29uLmNvbWJpbmVBc0FycmF5KFxuICAgICAgICBtYXJrQW5kR2V0SW5saW5lSW1hZ2VzKCRlZGl0b3IpXG4gICAgICAgICAgICAubWFwKGRhdGEgPT4gQmFjb24uZnJvbVByb21pc2UoXG4gICAgICAgICAgICAgICAgc2NyZWVuc2hvdFNhdmVyKGRhdGEpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHNjcmVlbnNob3RVcmwgPT4gJGVkaXRvci5maW5kKCcjJyArIGRhdGEuaWQpLmF0dHIoJ3NyYycsIHNjcmVlbnNob3RVcmwpLnJlbW92ZUF0dHIoJ2lkJykpXG4gICAgICAgICAgICAgICAgICAgIC5mYWlsKGUgPT4gJGVkaXRvci5maW5kKCcjJyArIGRhdGEuaWQpLnJlbW92ZSgpKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICApLm9uVmFsdWUoKCkgPT4gJGVkaXRvci50cmlnZ2VyKCdpbnB1dCcpKVxufVxuXG5jb25zdCBtYWtlUmljaFRleHQgPSAoZWxlbWVudCwgb3B0aW9ucywgb25WYWx1ZUNoYW5nZWQgPSAoKSA9PiB7IH0pID0+IHtcbiAgICBjb25zdCB7XG4gICAgICAgIHNjcmVlbnNob3Q6IHtcbiAgICAgICAgICAgIHNhdmVyXG4gICAgICAgIH1cbiAgICB9ID0gb3B0aW9uc1xuICAgIGNvbnN0ICRhbnN3ZXIgPSAkKGVsZW1lbnQpXG5cbiAgICBsZXQgcGFzdGVJblByb2dyZXNzID0gZmFsc2VcblxuICAgICRhbnN3ZXJcbiAgICAgICAgLmF0dHIoJ2NvbnRlbnRlZGl0YWJsZScsICd0cnVlJylcbiAgICAgICAgLmF0dHIoJ3NwZWxsY2hlY2snLCAnZmFsc2UnKVxuICAgICAgICAuYXR0cignZGF0YS1qcycsICdhbnN3ZXInKVxuICAgICAgICAuYWRkQ2xhc3MoJ21hdGgtZWRpdG9yLWFuc3dlcicpXG4gICAgICAgIC5vbigna2V5ZG93bicsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKGlzQ3RybEtleShlLCBrZXlDb2Rlcy5FTlRFUikgfHwgaXNLZXkoZSwga2V5Q29kZXMuRVNDKSkgbWF0aEVkaXRvci5jbG9zZU1hdGhFZGl0b3IodHJ1ZSlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdtb3VzZWRvd24nLCAnaW1nW3NyY149XCIvbWF0aC5zdmdcIl0nLCBlID0+IHtcbiAgICAgICAgICAgIG9uRWRpdG9yRm9jdXMoJChlLnRhcmdldCkuY2xvc2VzdCgnW2RhdGEtanM9XCJhbnN3ZXJcIl0nKSlcbiAgICAgICAgICAgIG1hdGhFZGl0b3Iub3Blbk1hdGhFZGl0b3IoJChlLnRhcmdldCkpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbigna2V5cHJlc3MnLCBlID0+IHtcbiAgICAgICAgICAgIGlmIChpc0N0cmxLZXkoZSwgJ2wnKSB8fCBpc0N0cmxLZXkoZSwgJ2knKSkgbWF0aEVkaXRvci5pbnNlcnROZXdFcXVhdGlvbigpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZm9jdXMgYmx1cicsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKGlzTWF0aEVkaXRvclZpc2libGUoKSAmJiBlLnR5cGUgPT09ICdmb2N1cycpIG1hdGhFZGl0b3IuY2xvc2VNYXRoRWRpdG9yKClcbiAgICAgICAgICAgIG9uRWRpdG9yRm9jdXNDaGFuZ2VkKGUpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbigna2V5dXAgaW5wdXQnLCBlID0+IHtcbiAgICAgICAgICAgIGlmKCEgcGFzdGVJblByb2dyZXNzKSBvblZhbHVlQ2hhbmdlZChzYW5pdGl6ZUNvbnRlbnQoZS5jdXJyZW50VGFyZ2V0KSlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdwYXN0ZScsIGUgPT4ge1xuICAgICAgICAgICAgcGFzdGVJblByb2dyZXNzID0gdHJ1ZVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBwYXN0ZUluUHJvZ3Jlc3MgPSBmYWxzZSwgMClcblxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdURVhUQVJFQScpXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICBjb25zdCBjbGlwYm9hcmREYXRhID0gZS5vcmlnaW5hbEV2ZW50LmNsaXBib2FyZERhdGFcbiAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBjbGlwYm9hcmREYXRhLml0ZW1zICYmIGNsaXBib2FyZERhdGEuaXRlbXNbMF0uZ2V0QXNGaWxlKClcbiAgICAgICAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgaWYoZmlsZS50eXBlICE9PSAnaW1hZ2UvcG5nJylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgc2F2ZXIoe2RhdGE6IGZpbGUsIHR5cGU6IGZpbGUudHlwZSwgaWQ6IFN0cmluZyhuZXcgRGF0ZSgpLmdldFRpbWUoKSl9KS50aGVuKHNjcmVlbnNob3RVcmwgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBgPGltZyBzcmM9XCIke3NjcmVlbnNob3RVcmx9XCIvPmBcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LmV4ZWNDb21tYW5kKCdpbnNlcnRIVE1MJywgZmFsc2UsIGltZylcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjbGlwYm9hcmREYXRhQXNIdG1sID0gY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0L2h0bWwnKVxuICAgICAgICAgICAgICAgIGlmIChjbGlwYm9hcmREYXRhQXNIdG1sKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydEhUTUwnLCBmYWxzZSwgc2FuaXRpemUoY2xpcGJvYXJkRGF0YUFzSHRtbCkpXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiBwZXJzaXN0SW5saW5lSW1hZ2VzKCRjdXJyZW50RWRpdG9yLCBzYXZlciksIDApXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHBlcnNpc3RJbmxpbmVJbWFnZXMoJGN1cnJlbnRFZGl0b3IsIHNhdmVyKSwgMClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1ha2VSaWNoVGV4dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYWxsb3dlZFRhZ3M6IFtcbiAgICAgICAgJ2RpdicsXG4gICAgICAgICdpbWcnLFxuICAgICAgICAnYnInXG4gICAgXSxcbiAgICBhbGxvd2VkQXR0cmlidXRlczoge1xuICAgICAgICBpbWc6IFsnc3JjJywgJ2FsdCddXG4gICAgfSxcbiAgICBhbGxvd2VkU2NoZW1lczogWydkYXRhJywgJ2h0dHAnLCAnaHR0cHMnXSxcbiAgICBleGNsdXNpdmVGaWx0ZXI6IGZ1bmN0aW9uKGZyYW1lKSB7IHJldHVybiBmcmFtZS5hdHRyaWJzWydkYXRhLWpzJ10gPT09ICdtYXRoRWRpdG9yJyB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAgICB7XG4gICAgICAgIGxhYmVsOiAnUGVydXMnLFxuICAgICAgICBjaGFyYWN0ZXJzOiBbXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KJoCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxuZXEnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KJiCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxhcHByb3gnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KJpCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxsZXEnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KJpScsIGxhdGV4Q29tbWFuZDogJ1xcXFxnZXEnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8KyJywgbGF0ZXhDb21tYW5kOiAnXjInLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8KzJywgbGF0ZXhDb21tYW5kOiAnXjMnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8K9JywgbGF0ZXhDb21tYW5kOiAnMS8yJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihZMnLCBsYXRleENvbW1hbmQ6ICcxLzMnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8KxJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBtJyB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbGFiZWw6ICdBbGdlYnJhJyxcbiAgICAgICAgY2hhcmFjdGVyczogW1xuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiLwnLCBsYXRleENvbW1hbmQ6ICdcXFxcc2ltJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiaEnLCBsYXRleENvbW1hbmQ6ICdcXFxcZXF1aXYnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KJoicgfSwgLy8gXFxuZXF1aXYgb3IgXFxub3RcXGVxdWl2XG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8K3JywgbGF0ZXhDb21tYW5kOiAnXFxcXGNkb3QnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KApicsIGxhdGV4Q29tbWFuZDogJ1xcXFxkb3RzJyB9LCAvLyBtYXRyaWlzaWFsZ2VicmE/XG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KInicsIGxhdGV4Q29tbWFuZDogJ1xcXFxpbmZ0eScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBsYWJlbDogJ0tyZWlra2FsYWlzZXQgYWFra29zZXQnLFxuICAgICAgICBjaGFyYWN0ZXJzOiBbXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86xJywgbGF0ZXhDb21tYW5kOiAnXFxcXGFscGhhJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOsicsIGxhdGV4Q29tbWFuZDogJ1xcXFxiZXRhJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOtCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxkZWx0YScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzrUnLCBsYXRleENvbW1hbmQ6ICdcXFxcdmFyZXBzaWxvbicgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzrcnLCBsYXRleENvbW1hbmQ6ICdcXFxcZXRhJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiIInLCBsYXRleENvbW1hbmQ6ICdcXFxccGFydGlhbCcgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn8J2chCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxpb3RhJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOuycsIGxhdGV4Q29tbWFuZDogJ1xcXFxsYW1iZGEnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8K1JywgbGF0ZXhDb21tYW5kOiAnXFxcXG11JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfPgCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxwaScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnz4MnLCBsYXRleENvbW1hbmQ6ICdcXFxcc2lnbWEnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ8+EJywgbGF0ZXhDb21tYW5kOiAnXFxcXHRhdScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn0KQnLCBsYXRleENvbW1hbmQ6ICdcXFxccGhpJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfPiScsIGxhdGV4Q29tbWFuZDogJ1xcXFxvbWVnYScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzpMnLCBsYXRleENvbW1hbmQ6ICdcXFxcR2FtbWEnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86UJywgbGF0ZXhDb21tYW5kOiAnXFxcXERlbHRhJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfOmCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxUaGV0YScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiPJywgbGF0ZXhDb21tYW5kOiAnXFxcXFBpJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiJEnLCBsYXRleENvbW1hbmQ6ICdcXFxcU2lnbWEnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ86mJywgbGF0ZXhDb21tYW5kOiAnXFxcXFBoaScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnzqknLCBsYXRleENvbW1hbmQ6ICdcXFxcT21lZ2EnIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBsYWJlbDogJ0dlb21ldHJpYSBqYSB2ZWt0b3Jpb3BwaScsXG4gICAgICAgIGNoYXJhY3RlcnM6IFtcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnwrAnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIoCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxhbmdsZScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oqlJywgbGF0ZXhDb21tYW5kOiAnXFxcXHBlcnAnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KAlicsIGxhdGV4Q29tbWFuZDogJ1xcXFxwYXJhbGxlbCcsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oeFJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihpEnLCBsYXRleENvbW1hbmQ6ICdcXFxcdXBhcnJvdycgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oaTJywgbGF0ZXhDb21tYW5kOiAnXFxcXGRvd25hcnJvdycgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oaUJywgbGF0ZXhDb21tYW5kOiAnXFxcXGxlZnRyaWdodGFycm93JyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfih4wnIH0gLy8gXFxyaWdodGxlZnRoYXJwb29uc1xuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGxhYmVsOiAnTG9naWlra2EgamEgam91a2tvLW9wcGknLFxuICAgICAgICBjaGFyYWN0ZXJzOiBbXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KHkicsIGxhdGV4Q29tbWFuZDogJ1xcXFxSaWdodGFycm93JywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfih5QnLCBsYXRleENvbW1hbmQ6ICdcXFxcTGVmdHJpZ2h0YXJyb3cnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIpycsIGxhdGV4Q29tbWFuZDogJ1xcXFxhbmQnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIqCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxvcicgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAnwqwnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIgycsIGxhdGV4Q29tbWFuZDogJ1xcXFxleGlzdHMnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIgCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxmb3JhbGwnLCBwb3B1bGFyOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIqScsIGxhdGV4Q29tbWFuZDogJ1xcXFxjYXAnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIqicsIGxhdGV4Q29tbWFuZDogJ1xcXFxjdXAnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIlicsIGxhdGV4Q29tbWFuZDogJ1xcXFxzZXRtaW51cycgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oqCJywgbGF0ZXhDb21tYW5kOiAnXFxcXHN1YnNldCcgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oqEJywgbGF0ZXhDb21tYW5kOiAnXFxcXG5vdHN1YnNldCcgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oiIJywgbGF0ZXhDb21tYW5kOiAnXFxcXGluJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiIknLCBsYXRleENvbW1hbmQ6ICdcXFxcbm90aW4nIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KIhScsIGxhdGV4Q29tbWFuZDogJ1xcXFxlbXB0eScgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oaSJywgbGF0ZXhDb21tYW5kOiAnXFxcXHJpZ2h0YXJyb3cnIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KImCcsIGxhdGV4Q29tbWFuZDogJ1xcXFxjaXJjJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfiiLwnLCBsYXRleENvbW1hbmQ6ICdcXFxcc2ltJyB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihJ0nIH0sXG4gICAgICAgICAgICB7IGNoYXJhY3RlcjogJ+KElScsIHBvcHVsYXI6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY2hhcmFjdGVyOiAn4oSkJywgcG9wdWxhcjogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjaGFyYWN0ZXI6ICfihJonIH1cbiAgICAgICAgXVxuICAgIH1cbl1cbiIsImNvbnN0IHNwZWNpYWxDaGFyYWN0ZXJHcm91cHMgPSByZXF1aXJlKCcuL3NwZWNpYWxDaGFyYWN0ZXJzJylcbmNvbnN0IGxhdGV4Q29tbWFuZHMgPSByZXF1aXJlKCcuL2xhdGV4Q29tbWFuZHMnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpbml0LFxufVxuXG5mdW5jdGlvbiBpbml0KG1hdGhFZGl0b3IsIGhhc0Fuc3dlckZvY3VzLCBsKSB7XG4gICAgY29uc3QgJHRvb2xiYXIgPSAkKGBcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1hdGgtZWRpdG9yLXRvb2xzXCIgZGF0YS1qcz1cInRvb2xzXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWF0aC1lZGl0b3ItdG9vbHMtcm93XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1hdGgtZWRpdG9yLXRvb2xiYXItd3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwibWF0aC1lZGl0b3ItbmV3LWVxdWF0aW9uIG1hdGgtZWRpdG9yLWJ1dHRvbiBtYXRoLWVkaXRvci1idXR0b24tYWN0aW9uXCIgZGF0YS1qcz1cIm5ld0VxdWF0aW9uXCIgZGF0YS10aXRsZT1cIkN0cmwtTFwiPs6jICR7bC5pbnNlcnRFcXVhdGlvbn08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1hdGgtZWRpdG9yLXRvb2xiYXItY2hhcmFjdGVycyBtYXRoLWVkaXRvci10b29sYmFyIG1hdGgtZWRpdG9yLXRvb2xiYXItYnV0dG9uLWxpc3RcIiBkYXRhLWpzPVwiY2hhcmFjdGVyc0xpc3RcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1hdGgtZWRpdG9yLXRvb2xzLXJvd1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYXRoLWVkaXRvci10b29sYmFyLXdyYXBwZXIgbWF0aC1lZGl0b3ItZXF1YXRpb24td3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWF0aC1lZGl0b3ItdG9vbGJhci1lcXVhdGlvbiBtYXRoLWVkaXRvci10b29sYmFyIG1hdGgtZWRpdG9yLXRvb2xiYXItYnV0dG9uLWxpc3RcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIiBkYXRhLWpzPVwibWF0aFRvb2xiYXJcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgYClcbiAgICBjb25zdCAkbmV3RXF1YXRpb24gPSAkdG9vbGJhci5maW5kKCdbZGF0YS1qcz1cIm5ld0VxdWF0aW9uXCJdJylcbiAgICBjb25zdCAkbWF0aFRvb2xiYXIgPSAkdG9vbGJhci5maW5kKCdbZGF0YS1qcz1cIm1hdGhUb29sYmFyXCJdJylcbiAgICBpbml0U3BlY2lhbENoYXJhY3RlclRvb2xiYXIoJHRvb2xiYXIsIG1hdGhFZGl0b3IsIGhhc0Fuc3dlckZvY3VzKVxuICAgIGluaXRNYXRoVG9vbGJhcigkbWF0aFRvb2xiYXIsIG1hdGhFZGl0b3IpXG4gICAgaW5pdE5ld0VxdWF0aW9uKCRuZXdFcXVhdGlvbiwgbWF0aEVkaXRvciwgaGFzQW5zd2VyRm9jdXMpXG5cbiAgICBmdW5jdGlvbiB0b2dnbGVNYXRoVG9vbGJhcihpc1Zpc2libGUpIHtcbiAgICAgICAgJG5ld0VxdWF0aW9uLnRvZ2dsZSghaXNWaXNpYmxlKVxuICAgICAgICAkbWF0aFRvb2xiYXIudG9nZ2xlKGlzVmlzaWJsZSlcbiAgICB9XG5cbiAgICByZXR1cm4geyAkdG9vbGJhciwgdG9nZ2xlTWF0aFRvb2xiYXIgfVxufVxuXG5jb25zdCBzcGVjaWFsQ2hhcmFjdGVyVG9CdXR0b24gPSBjaGFyID0+IGA8YnV0dG9uIGNsYXNzPVwibWF0aC1lZGl0b3ItYnV0dG9uIG1hdGgtZWRpdG9yLWJ1dHRvbi1ncmlkJHtjaGFyLnBvcHVsYXIgPyAnIG1hdGgtZWRpdG9yLWNoYXJhY3RlcnMtcG9wdWxhcicgOicnfVwiICR7Y2hhci5sYXRleENvbW1hbmQgPyBgZGF0YS1jb21tYW5kPVwiJHtjaGFyLmxhdGV4Q29tbWFuZH1cImAgOiAnJ30gZGF0YS10aXRsZT1cIiR7Y2hhci5sYXRleENvbW1hbmQgfHwgY2hhci5jaGFyYWN0ZXJ9XCI+JHtjaGFyLmNoYXJhY3Rlcn08L2J1dHRvbj5gXG5cbmNvbnN0IHBvcHVsYXJJbkdyb3VwID0gZ3JvdXAgPT4gZ3JvdXAuY2hhcmFjdGVycy5maWx0ZXIoY2hhcmFjdGVyID0+IGNoYXJhY3Rlci5wb3B1bGFyKS5sZW5ndGhcblxuZnVuY3Rpb24gaW5pdFNwZWNpYWxDaGFyYWN0ZXJUb29sYmFyKCR0b29sYmFyLCBtYXRoRWRpdG9yLCBoYXNBbnN3ZXJGb2N1cykge1xuICAgIGNvbnN0IGdyaWRCdXR0b25XaWR0aFB4ID0gMzVcblxuICAgICR0b29sYmFyLmZpbmQoJ1tkYXRhLWpzPVwiY2hhcmFjdGVyc0xpc3RcIl0nKVxuICAgICAgICAuYXBwZW5kKHNwZWNpYWxDaGFyYWN0ZXJHcm91cHMubWFwKGdyb3VwID0+XG4gICAgICAgICAgICBgPGRpdiBjbGFzcz1cIm1hdGgtZWRpdG9yLXRvb2xiYXItY2hhcmFjdGVycy1ncm91cFwiIFxuICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogJHtwb3B1bGFySW5Hcm91cChncm91cCkgKiBncmlkQnV0dG9uV2lkdGhQeH1weFwiPlxuICAgICAgICAgICAgICAgICAgJHtncm91cC5jaGFyYWN0ZXJzLm1hcChzcGVjaWFsQ2hhcmFjdGVyVG9CdXR0b24pLmpvaW4oJycpfVxuICAgICAgICAgICAgIDwvZGl2PmApKVxuICAgICAgICAuYXBwZW5kKGA8YnV0dG9uIGNsYXNzPVwibWF0aC1lZGl0b3ItY2hhcmFjdGVycy1leHBhbmQtY29sbGFwc2VcIj48L2J1dHRvbj5gKVxuICAgICAgICAub24oJ21vdXNlZG93bicsICdidXR0b24nLCBlID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgICAgICBpZiAoJChlLmN1cnJlbnRUYXJnZXQpLmhhc0NsYXNzKCdtYXRoLWVkaXRvci1jaGFyYWN0ZXJzLWV4cGFuZC1jb2xsYXBzZScpKSB7XG4gICAgICAgICAgICAgICAgJHRvb2xiYXIuZmluZCgnW2RhdGEtanM9XCJjaGFyYWN0ZXJzTGlzdFwiXScpLnRvZ2dsZUNsYXNzKCdtYXRoLWVkaXRvci1jaGFyYWN0ZXJzLWV4cGFuZGVkJylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hhcmFjdGVyID0gZS5jdXJyZW50VGFyZ2V0LmlubmVyVGV4dFxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbW1hbmQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jb21tYW5kXG4gICAgICAgICAgICAgICAgaWYgKGhhc0Fuc3dlckZvY3VzKCkpIHdpbmRvdy5kb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0VGV4dCcsIGZhbHNlLCBjaGFyYWN0ZXIpXG4gICAgICAgICAgICAgICAgZWxzZSBtYXRoRWRpdG9yLmluc2VydE1hdGgoY29tbWFuZCB8fCBjaGFyYWN0ZXIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG59XG5cbmZ1bmN0aW9uIGluaXRNYXRoVG9vbGJhcigkbWF0aFRvb2xiYXIsIG1hdGhFZGl0b3IpIHtcbiAgICAkbWF0aFRvb2xiYXIuYXBwZW5kKGxhdGV4Q29tbWFuZHNcbiAgICAgICAgLm1hcChvID0+IGA8YnV0dG9uIGRhdGEtdGl0bGU9XCIke28uYWN0aW9ufVwiIGNsYXNzPVwibWF0aC1lZGl0b3ItYnV0dG9uIG1hdGgtZWRpdG9yLWJ1dHRvbi1ncmlkXCIgZGF0YS1jb21tYW5kPVwiJHtvLmFjdGlvbn1cIiBkYXRhLWxhdGV4Y29tbWFuZD1cIiR7by5sYWJlbH1cIiBkYXRhLXVzZXdyaXRlPVwiJHtvLnVzZVdyaXRlIHx8IGZhbHNlfVwiPlxuPGltZyBzcmM9XCIvbWF0aC5zdmc/bGF0ZXg9JHtlbmNvZGVVUklDb21wb25lbnQoby5sYWJlbCA/IG8ubGFiZWwucmVwbGFjZSgvWC9nLCAnXFxcXHNxdWFyZScpIDogby5hY3Rpb24pfVwiLz5cbjwvYnV0dG9uPmApLmpvaW4oJycpXG4gICAgKS5vbignbW91c2Vkb3duJywgJ2J1dHRvbicsIGUgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgY29uc3QgZGF0YXNldCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0O1xuICAgICAgICBtYXRoRWRpdG9yLmluc2VydE1hdGgoZGF0YXNldC5jb21tYW5kLCBkYXRhc2V0LmxhdGV4Y29tbWFuZCwgZGF0YXNldC51c2V3cml0ZSA9PT0gJ3RydWUnKVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGluaXROZXdFcXVhdGlvbigkbmV3RXF1YXRpb24sIG1hdGhFZGl0b3IsIGhhc0Fuc3dlckZvY3VzKSB7XG4gICAgJG5ld0VxdWF0aW9uLm1vdXNlZG93bigoZSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBpZiAoIWhhc0Fuc3dlckZvY3VzKCkpIHJldHVybiAvLyBUT0RPOiByZW1vdmUgd2hlbiBidXR0b24gaXMgb25seSB2aXNpYmxlIHdoZW4gdGV4dGFyZWEgaGFzIGZvY3VzXG4gICAgICAgIG1hdGhFZGl0b3IuaW5zZXJ0TmV3RXF1YXRpb24oKVxuICAgIH0pLmJpbmQodGhpcykpXG59XG4iLCJjb25zdCBzYW5pdGl6ZUh0bWwgPSByZXF1aXJlKCdzYW5pdGl6ZS1odG1sJylcbmNvbnN0IHNhbml0aXplT3B0cyA9IHJlcXVpcmUoJy4vc2FuaXRpemVPcHRzJylcblxubW9kdWxlLmV4cG9ydHMgPSB7aXNLZXksIGlzQ3RybEtleSwgaW5zZXJ0VG9UZXh0QXJlYUF0Q3Vyc29yLCBkZWNvZGVCYXNlNjRJbWFnZSwgc2FuaXRpemUsIHNhbml0aXplQ29udGVudH1cblxuZnVuY3Rpb24gc2FuaXRpemUoaHRtbCkge1xuICAgIHJldHVybiBzYW5pdGl6ZUh0bWwoaHRtbCwgc2FuaXRpemVPcHRzKVxufVxuZnVuY3Rpb24gaW5zZXJ0VG9UZXh0QXJlYUF0Q3Vyc29yKGZpZWxkLCB2YWx1ZSkge1xuICAgIGNvbnN0IHN0YXJ0UG9zID0gZmllbGQuc2VsZWN0aW9uU3RhcnRcbiAgICBjb25zdCBlbmRQb3MgPSBmaWVsZC5zZWxlY3Rpb25FbmRcbiAgICBsZXQgb2xkVmFsdWUgPSBmaWVsZC52YWx1ZVxuICAgIGZpZWxkLnZhbHVlID0gb2xkVmFsdWUuc3Vic3RyaW5nKDAsIHN0YXJ0UG9zKSArIHZhbHVlICsgb2xkVmFsdWUuc3Vic3RyaW5nKGVuZFBvcywgb2xkVmFsdWUubGVuZ3RoKVxuICAgIGZpZWxkLnNlbGVjdGlvblN0YXJ0ID0gZmllbGQuc2VsZWN0aW9uRW5kID0gc3RhcnRQb3MgKyB2YWx1ZS5sZW5ndGhcbn1cblxuZnVuY3Rpb24gZGVjb2RlQmFzZTY0SW1hZ2UoZGF0YVN0cmluZykge1xuICAgIGlmICghZGF0YVN0cmluZylcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICBjb25zdCBtYXRjaGVzID0gZGF0YVN0cmluZy5tYXRjaCgvXmRhdGE6KFtBLVphLXotK1xcL10rKTtiYXNlNjQsKC4rKSQvKVxuICAgIGlmIChtYXRjaGVzLmxlbmd0aCAhPT0gMykge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBtYXRjaGVzWzFdLFxuICAgICAgICBkYXRhOiBuZXcgQnVmZmVyKG1hdGNoZXNbMl0sICdiYXNlNjQnKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNLZXkoZSwga2V5KSB7IHJldHVybiBwcmV2ZW50SWZUcnVlKGUsICFlLmFsdEtleSAmJiAhZS5zaGlmdEtleSAmJiAhZS5jdHJsS2V5ICAmJiBrZXlPcktleUNvZGUoZSwga2V5KSl9XG5cbmZ1bmN0aW9uIGlzQ3RybEtleShlLCBrZXkpIHsgcmV0dXJuIHByZXZlbnRJZlRydWUoZSwgIWUuYWx0S2V5ICYmICFlLnNoaWZ0S2V5ICYmIGUuY3RybEtleSAmJiBrZXlPcktleUNvZGUoZSwga2V5KSl9XG5cbmZ1bmN0aW9uIGtleU9yS2V5Q29kZShlLCB2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnID8gZS5rZXkgPT09IHZhbCA6IGUua2V5Q29kZSA9PT0gdmFsIH1cbmZ1bmN0aW9uIHByZXZlbnRJZlRydWUoZSwgdmFsKSB7XG4gICAgaWYodmFsKSBlLnByZXZlbnREZWZhdWx0KClcbiAgICByZXR1cm4gdmFsXG59XG5cbmZ1bmN0aW9uIHNhbml0aXplQ29udGVudChhbnN3ZXJFbGVtZW50KSB7XG4gICAgY29uc3QgJGFuc3dlckVsZW1lbnQgPSAkKGFuc3dlckVsZW1lbnQpXG4gICAgY29uc3QgJG1hdGhFZGl0b3IgPSAkYW5zd2VyRWxlbWVudC5maW5kKCdbZGF0YS1qcz1cIm1hdGhFZGl0b3JcIl0nKVxuICAgICRtYXRoRWRpdG9yLmhpZGUoKVxuICAgIGNvbnN0IHRleHQgPSAkYW5zd2VyRWxlbWVudC50ZXh0KClcbiAgICAkbWF0aEVkaXRvci5zaG93KClcblxuICAgIGNvbnN0IGh0bWwgPSBzYW5pdGl6ZSgkYW5zd2VyRWxlbWVudC5odG1sKCkpXG5cbiAgICByZXR1cm4geyBhbnN3ZXJIVE1MOiBodG1sLCBhbnN3ZXJUZXh0OiB0ZXh0IH1cbn1cbiJdfQ==
