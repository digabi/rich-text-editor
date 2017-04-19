const specialCharacterGroups = require('./specialCharacters')
const latexCommands = require('./latexCommands')

module.exports = {
    init,
}

function init(mathEditor, hasAnswerFocus, l) {
    const $toolbar = $(`        
        <div class="math-editor-tools" data-js="tools">
            <div class="math-editor-characters" data-js="characters">
              <div class="math-editor-toolbar math-editor-list" data-js="charactersList"></div>
            </div>
            <div class="math-editor-equation math-editor-toolbar math-editor-list math-editor-hidden" data-js="mathToolbar"></div>
            <div>
                <button class="math-editor-new-equation math-editor-button math-editor-button-action" data-js="newEquation" title="Ctrl-L">${l.insertEquation}</button>
            </div>
        </div>
        `)
    const $newEquation = $toolbar.find('[data-js="newEquation"]')
    const $mathToolbar = $toolbar.find('[data-js="mathToolbar"]')
    initSpecialCharacterToolbar($toolbar, mathEditor, hasAnswerFocus)
    initMathToolbar($mathToolbar, mathEditor)
    initNewEquation($newEquation, mathEditor, hasAnswerFocus)

    function toggleMathToolbar(isVisible) {
        $newEquation.toggle(!isVisible)
        $mathToolbar.toggle(isVisible)
    }

    return { $toolbar, toggleMathToolbar }
}

const specialCharacterToButton = char => `<button class="math-editor-button math-editor-button-grid${char.popular ? ' math-editor-characters-popular' :''}" ${char.latexCommand ? `data-command="${char.latexCommand}"` : ''}>${char.character}</button>`

const popularInGroup = group => group.characters.filter(character => character.popular).length

function initSpecialCharacterToolbar($toolbar, mathEditor, hasAnswerFocus) {
    const gridButtonWidthPx = 35
    
    $toolbar.find('[data-js="charactersList"]')
        .append(specialCharacterGroups.map(group =>
            `<div class="math-editor-characters-group" 
                  style="width: ${popularInGroup(group) * gridButtonWidthPx}px">
                  ${group.characters.map(specialCharacterToButton).join('')}
             </div>`))
        .append(`<button class="math-editor-characters-expand-collapse math-editor-button math-editor-button-grid"></button>`)
        .on('mousedown', 'button', e => {
            e.preventDefault()

            if ($(e.currentTarget).hasClass('math-editor-characters-expand-collapse')) {
                $toolbar.find('[data-js="characters"]').toggleClass('math-editor-characters-expanded')
            } else {
                const character = e.currentTarget.innerText
                const command = e.currentTarget.dataset.command
                if (hasAnswerFocus()) window.document.execCommand('insertText', false, character)
                else mathEditor.insertMath(command || character)
            }
        })
}

function initMathToolbar($mathToolbar, mathEditor) {
    $mathToolbar.append(latexCommands
        .map(o => `<button title="${o.action}" class="math-editor-button math-editor-button-grid" data-command="${o.action}" data-latexcommand="${o.label}" data-usewrite="${o.useWrite || false}">
<img src="/math.svg?latex=${encodeURIComponent(o.label ? o.label.replace(/X/g, '\\square') : o.action)}"/>
</button>`).join('')
    ).on('mousedown', 'button', e => {
        e.preventDefault()
        const dataset = e.currentTarget.dataset;
        mathEditor.insertMath(dataset.command, dataset.latexcommand, dataset.usewrite === 'true')
    })
}

function initNewEquation($newEquation, mathEditor, hasAnswerFocus) {
    $newEquation.mousedown((e => {
        e.preventDefault()
        if (!hasAnswerFocus()) return // TODO: remove when button is only visible when textarea has focus
        mathEditor.insertNewEquation()
    }).bind(this))
}
