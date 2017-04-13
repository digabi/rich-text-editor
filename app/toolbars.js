const specialCharacters = require('./specialCharacters')
const latexCommands = require('./latexCommands')

module.exports = {
    init,
}

function init(mathEditor, hasAnswerFocus, l) {
    const $toolbar = $(`        
        <div class="math-editor-tools" data-js="tools">
            <div class="math-editor-characters" data-js="characters">
                <span class="math-editor-special-characters">
                  <div class="math-editor-toolbar math-editor-list" data-js="charactersList"></div>
                </span>
            </div>
            <div class="math-editor-equation math-editor-toolbar math-editor-list math-editor-hidden" data-js="mathToolbar"></div>
            <div>
                <button class="math-editor-new-equation math-editor-button math-editor-button-action" data-js="newEquation" title="Ctrl-L">${l.insertEquation}</button>
            </div>
        </div>
        `)
    initSpecialCharacterToolbar($toolbar, mathEditor, hasAnswerFocus)
    initMathToolbar($toolbar, mathEditor)
    initNewEquation($toolbar, mathEditor, hasAnswerFocus)
    return $toolbar
}


function initSpecialCharacterToolbar($toolbar, mathEditor, hasAnswerFocus) {
    $toolbar.find('[data-js="charactersList"]')
        .append(specialCharacters.map(char => `<button class="math-editor-button math-editor-button-grid" ${char.latexCommand ? `data-command="${char.latexCommand}"` : ''}>${char.character}</button>`))
        .on('mousedown', 'button', e => {
            e.preventDefault()
            const character = e.currentTarget.innerText
            const command = e.currentTarget.dataset.command
            if (hasAnswerFocus()) window.document.execCommand('insertText', false, character)
            else mathEditor.insertMath(command || character)
        })
}

function initMathToolbar($toolbar, mathEditor) {
    $toolbar.find('[data-js="mathToolbar"]').append(latexCommands
        .map(o => `<button title="${o.action}" class="math-editor-button math-editor-button-grid" data-command="${o.action}" data-latexcommand="${o.label}" data-usewrite="${o.useWrite || false}">
<img src="/math.svg?latex=${encodeURIComponent(o.label ? o.label.replace(/X/g, '\\square') : o.action)}"/>
</button>`).join('')
    ).on('mousedown', 'button', e => {
        e.preventDefault()
        const dataset = e.currentTarget.dataset;
        mathEditor.insertMath(dataset.command, dataset.latexcommand, dataset.usewrite === 'true')
    })
}

function initNewEquation($toolbar, mathEditor, hasAnswerFocus) {
    $toolbar.find('[data-js="newEquation"]').mousedown((e => {
        e.preventDefault()
        if (!hasAnswerFocus()) return // TODO: remove when button is only visible when textarea has focus
        mathEditor.insertNewEquation()
    }).bind(this))
}
