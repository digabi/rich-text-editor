const latexCommands = require('./latexCommands')
const specialCharacters = require('./specialCharacters')
const util = require('./util')
const sanitizeHtml = require('sanitize-html')
const sanitizeOpts = require('./sanitizeOpts')
const MQ = MathQuill.getInterface(2)

const keyCodes = {
    ENTER: 13,
    ESC:   27
}

let $toolbar
const $outerPlaceholder = $(`<div class="outerPlaceholder hidden">`)
let mathEditor

function moveElementAfter($element, $after) {
    $after.after($element)
}

function hideElementInDOM($element) {
    $outerPlaceholder.append($element)
}

let editor

window.onload = () => {
    $(window).asEventStream('scroll resize').throttle(500).onValue(e => {
        const scrollPos = document.body.scrollTop
        const $answer = $('.toolbar').next()
        if($answer.hasClass('answer')) {
            const top = $answer.position().top;
            $('body').toggleClass('sticky', scrollPos + 35 > top)
        }
    })

        // TODO: replace with data attributes?
    let answerFocus = true
    let latexEditorFocus = false
    let equationEditorFocus = false
    let mathEditorVisible = false
    let $editor

    $('body').append($outerPlaceholder)

    initToolbar()
    mathEditor = initMathEditor()

    function initMathEditor() {
        const $mathEditor = $(`
            <div class="math">
                <div class="close" title="Ctrl-Enter">Sulje</div>
                <div class="boxes">
                    <div class="equationEditor"></div>
                    <textarea class="latexEditor" placeholder="LaTex"></textarea>
                </div>
            </div>`)

        hideElementInDOM($mathEditor)

        const $latexEditor = $mathEditor.find('.latexEditor')
        const $equationEditor = $mathEditor.find('.equationEditor')
        const mathField = MQ.MathField($equationEditor.get(0), {
            handlers: {
                edit: () => !latexEditorFocus && $latexEditor.val(mathField.latex()),
                enter: field => {
                    // TODO: do not close editor / o not create a new equation if there is no text?
                    mathEditor.closeMathEditor(true)
                    setTimeout(() => insertNewEquation('<div></div>'), 2)
                }
            }
        })

        $equationEditor.on('focus mousedown', e => {
            equationEditorFocus = true
        })

        $equationEditor.find('.mq-textarea textarea ').on('focus blur', e => {
            equationEditorFocus = e.type !== 'blur'
            onFocusChanged()
        })

        function onLatexUpdate() { setTimeout(() => mathField.latex($latexEditor.val()), 1) }

        $latexEditor
            .keyup(onLatexUpdate)
            .on('focus blur', e => {
                latexEditorFocus = e.type !== 'blur'
                onFocusChanged()
            })

        $mathEditor.find('.close').mousedown(e => {
            e.preventDefault()
            closeMathEditor(true)
        })

        let focusChanged = null
        function onFocusChanged() {
            clearTimeout(focusChanged)
            focusChanged = setTimeout(() => {
                if (!latexEditorFocus && !equationEditorFocus) closeMathEditor()
                if (!answerFocus && !mathEditorVisible && !latexEditorFocus && !equationEditorFocus) closeEditor()
            }, 0)

        }

        function insertNewEquation(optionalMarkup) {
            window.document.execCommand('insertHTML', false, (optionalMarkup ? optionalMarkup : '') + '<img class="result new" style="display: none"/>');
            const $addedEquationImage = $('.result.new')
            $addedEquationImage
                .removeClass('new')

            moveElementAfter($mathEditor, $addedEquationImage)

            mathField.latex('')
            mathEditorVisible = true
            $toolbar.find('.newEquation').hide()
            $toolbar.find('.mathToolbar').show()
            setTimeout(() => mathField.focus(), 0)
        }

        function insertMath(symbol, alternativeSymbol, useWrite) {
            if(latexEditorFocus) {
                util.insertToTextAreaAtCursor($latexEditor.get(0), alternativeSymbol || symbol)
                onLatexUpdate()
            } else if(equationEditorFocus) {
                if (useWrite) {
                    mathField.write(symbol)
                } else {
                    mathField.typedText(symbol)
                }

                if(symbol.startsWith('\\')) mathField.keystroke('Tab')
                setTimeout(() => mathField.focus(), 0)
            }
        }

        function closeMathEditor(setFocusAfterClose = false) {
            // TODO: remove event bindings
            const $currentEditor = $mathEditor.closest('.answer')
            const $img = $mathEditor.prev()
            if($latexEditor.val().trim() === '') {
                $img.remove()
            } else {
                $img.show()
                    .prop('src', '/math.svg?latex=' + encodeURIComponent($latexEditor.val()))
                    .prop('alt', $latexEditor.val())
            }

            $toolbar.find('.newEquation').show()
            $toolbar.find('.mathToolbar').hide()
            $toolbar.find('.mathToolbar').hide()
            hideElementInDOM($mathEditor)
            mathEditorVisible = false
            latexEditorFocus = false
            equationEditorFocus = false
            if (setFocusAfterClose) $currentEditor.focus()
        }

        function openMathEditor($img) {
            if (mathEditorVisible) closeMathEditor()
            $img.hide()
            moveElementAfter($mathEditor, $img)
            const latex = $img.prop('alt')
            $latexEditor.val(latex)
            onLatexUpdate()
            mathEditorVisible = true
            $toolbar.find('.newEquation').hide()
            $toolbar.find('.mathToolbar').show()
            setTimeout(() => mathField.focus(), 0)
        }

        return {
            insertNewEquation,
            insertMath,
            closeMathEditor,
            openMathEditor,
            onFocusChanged
        }
    }

    function initToolbar() {
        $toolbar = $(`        
        <div class="toolbar">
            <div class="toolbarContent">
                <div class="characters">
                    <span class="special-characters">
                      <div class="list"></div>
                    </span>
                </div>
                <div class="mathToolbar list hidden"></div>
                <div>
                    <button class="newEquation actionButton" title="Ctrl-L">Lisää kaava</button>
                </div>
            </div>
        </div>
        `)

        hideElementInDOM($toolbar)

        initSpecialCharacterToolbar()
        initMathToolbar()
        initNewEquation()

        function initMathToolbar() {
            $toolbar.find('.mathToolbar.list').append(latexCommands
                .map(o => `<button title="${o.action}" data-command="${o.action}" data-latexcommand="${o.label}" data-usewrite="${o.useWrite || false}">
<img src="/math.svg?latex=${encodeURIComponent(o.label ? o.label.replace(/X/g, '\\square') : o.action)}"/>
</button>`).join('')
            ).on('mousedown', 'button', e => {
                e.preventDefault()
                const dataset = e.currentTarget.dataset;
                mathEditor.insertMath(dataset.command, dataset.latexcommand, dataset.usewrite === 'true')
            })
        }

        function initSpecialCharacterToolbar() {
            $toolbar.find('.characters .list')
                .append(specialCharacters.map(char => `<span class="button" ${char.latexCommand ? `data-command="${char.latexCommand}"` : ''}>${char.character}</span>`))
                .on('mousedown', '.button', e => {
                    e.preventDefault()
                    const character = e.currentTarget.innerText
                    const command = e.currentTarget.dataset.command
                    if(answerFocus) window.document.execCommand('insertText', false, character)
                    else mathEditor.insertMath(command || character)
                })
        }

        function initNewEquation() {
            $toolbar.find('.newEquation').mousedown((e => {
                e.preventDefault()
                if (!answerFocus) return // TODO: remove when button is only visible when textarea has focus
                mathEditor.insertNewEquation()
            }).bind(this))
        }
    }

    function openEditor($element) {
        $editor = $element
        $element.before($toolbar)
        $toolbar.show()
    }

    function closeEditor() {
        // TODO: remove event bindings
        $toolbar.find('.mathToolbar').hide()
        hideElementInDOM($toolbar)
        mathEditor.closeMathEditor()
        // $editor.off()

        answerFocus = false
        mathEditorVisible = false
        latexEditorFocus = false
    }

    let blurred
    function onFocusChanged(e) {
        answerFocus = e.type === 'focus'

        clearTimeout(blurred)
        blurred = setTimeout(() => {
            if (!answerFocus && !mathEditorVisible && !latexEditorFocus && !equationEditorFocus) closeEditor()
            else if (answerFocus && mathEditorVisible) mathEditor.closeMathEditor()
            else openEditor($(e.target))
        }, 0)
    }

    function isMathEditorVisible() {
        return mathEditorVisible
    }

    editor = {
        openEditor,
        closeEditor,
        onFocusChanged,
        isMathEditorVisible,
        openMathEditor: mathEditor.openMathEditor,
        closeMathEditor: mathEditor.closeMathEditor,
        insertNewEquation: mathEditor.insertNewEquation
    }
}

const markAndGetInlineImages = $editor => $editor.find('img[src^="data"]')
    .each((i, el) => el.setAttribute('id', new Date().getTime() + '-' + i))
    .map((i, el) => ({data: el.getAttribute('src'), id: el.getAttribute('id')}))
    .toArray()

const persistInlineImages = $editor => {
    return Bacon.combineAsArray(
        markAndGetInlineImages($editor)
            .map(data =>
                Bacon.fromPromise(
                    $.post({
                        url: '/saveImg',
                        data: {
                            text: data.data,
                            id: data.id,
                            answerId: $editor.attr('id')
                        }
                    }))))
        .flatMap(results => {
            console.log(results)
            results.forEach(id => {
                $editor.find('#' + id).attr('src', `/loadImg?answerId=${$editor.attr('id')}&id=${id}`)
            })
        })
        .onValue(() => $editor.trigger('input'))
}

const makeRichText = (selector, onValueChanged = () => {}) => {
    $(selector).each((i, element) => {
        const $editor = $(element)
        $editor.attr('contenteditable', 'true')
        $editor.attr('data-js-handle', 'answer')

        $editor.on('keydown', e => {
            if(!e.altKey && !e.shiftKey &&
                ((e.ctrlKey && e.keyCode === keyCodes.ENTER) ||
                (!e.ctrlKey && e.keyCode === keyCodes.ESC ))) mathEditor.closeMathEditor(true)
        }).on('mousedown', '.result', e => {
            // TODO: open editor if clicked on equation in another editor
            editor.openMathEditor($(e.target))
        }).on('keypress', e => {
            if (e.ctrlKey && !e.altKey && !e.shiftKey &&
                (e.key === 'l' || e.key === 'i')) editor.insertNewEquation()
        }).on('focus blur', e => {
            if(editor.isMathEditorVisible() && e.type === 'focus') editor.closeMathEditor()
            //answerFocus = e.type === 'focus'
        }).on('paste', e => {
            if(e.target.tagName === 'TEXTAREA')
                return

            const reader = new FileReader()
            const clipboardData = e.originalEvent.clipboardData
            const file = clipboardData.items && clipboardData.items[0].getAsFile()
            if (file) {
                e.preventDefault()
                reader.readAsDataURL(file)
            } else {
                const clipboardDataAsHtml = clipboardData.getData('text/html')
                if (clipboardDataAsHtml) {
                    e.preventDefault()
                    window.document.execCommand('insertHTML', false, sanitizeHtml(clipboardDataAsHtml, sanitizeOpts));
                    persistInlineImages($editor)
                    // TODO: call autosave?
                }
            }

            reader.onload = evt => {
                const img = `<img src="${evt.target.result}"/>`
                window.document.execCommand('insertHTML', false, sanitizeHtml(img, sanitizeOpts))
                persistInlineImages($editor)
                // TODO: call autosave?
            }
        })

        $editor.on('blur focus', e => editor.onFocusChanged(e))
        $editor.on('input focus', e => onValueChanged($(e.currentTarget)))
    })
}

module.exports = {
    makeRichText
}
