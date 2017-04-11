const specialCharacters = require('./specialCharacters')
const latexCommands = require('./latexCommands')

module.exports = {
    initSpecialCharacterToolbar,
    initMathToolbar,
    initNewEquation
}
function initSpecialCharacterToolbar($toolbar, mathEditor, hasAnswerFocus) {
    $toolbar.find('.characters .list')
        .append(specialCharacters.map(char => `<span class="button" ${char.latexCommand ? `data-command="${char.latexCommand}"` : ''}>${char.character}</span>`))
        .on('mousedown', '.button', e => {
            e.preventDefault()
            const character = e.currentTarget.innerText
            const command = e.currentTarget.dataset.command
            if (hasAnswerFocus()) window.document.execCommand('insertText', false, character)
            else mathEditor.insertMath(command || character)
        })
}

function initMathToolbar($toolbar, mathEditor) {
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

function initNewEquation($toolbar, mathEditor, hasAnswerFocus) {
    $toolbar.find('.newEquation').mousedown((e => {
        e.preventDefault()
        if (!hasAnswerFocus()) return // TODO: remove when button is only visible when textarea has focus
        mathEditor.insertNewEquation()
    }).bind(this))
}
