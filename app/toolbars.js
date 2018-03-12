const specialCharacterGroups = require('./specialCharacters')
const latexCommandsWithSvg = require('./latexCommandsWithSvg')

module.exports = {
    init,
}

function init(mathEditor, hasRichTextFocus, l, baseUrl)  {
    const $toolbar = $(`
        <div class="rich-text-editor-tools" data-js="tools" style="display: none">
            <div class="rich-text-editor-tools-button-wrapper">
                <div class="rich-text-editor-toolbar-wrapper">
                    <button class="rich-text-editor-characters-expand-collapse" data-js="expandCollapseCharacters" style="z-index: 100"></button>
                </div>
            </div>
            <div class="rich-text-editor-tools-row">
                <div class="rich-text-editor-toolbar-wrapper">
                    <div class="rich-text-editor-toolbar-characters rich-text-editor-toolbar rich-text-editor-toolbar-button-list" data-js="charactersList"></div>
                </div>
            </div>
            <div class="rich-text-editor-tools-row">
                <div class="rich-text-editor-toolbar-wrapper rich-text-editor-equation-wrapper">
                    <div class="rich-text-editor-toolbar-equation rich-text-editor-toolbar rich-text-editor-toolbar-button-list" data-js="mathToolbar"></div>
                </div>
            </div>
            <div class="rich-text-editor-tools-button-wrapper">
                <div class="rich-text-editor-toolbar-wrapper">
                    <button class="rich-text-editor-new-equation rich-text-editor-button rich-text-editor-button-action" data-js="newEquation" data-command="Ctrl-E">Σ ${l.insertEquation}</button>
                </div>
            </div>
        </div>
        `)
        .on('mousedown', e => {
            e.preventDefault()
        })
        .on('mousedown', '[data-js="expandCollapseCharacters"]', e => {
            e.preventDefault()
            $toolbar.toggleClass('rich-text-editor-characters-expanded')
        })

    const $newEquation = $toolbar.find('[data-js="newEquation"]')
    const $mathToolbar = $toolbar.find('[data-js="mathToolbar"]')
    initSpecialCharacterToolbar($toolbar, mathEditor, hasRichTextFocus)
    initMathToolbar($mathToolbar, mathEditor, baseUrl)
    initNewEquation($newEquation, mathEditor, hasRichTextFocus)

    return $toolbar
}

const specialCharacterToButton = char => `<button class="rich-text-editor-button rich-text-editor-button-grid${char.popular ? ' rich-text-editor-characters-popular' :''}" ${char.latexCommand ? `data-command="${char.latexCommand}"` : ''}>${char.character}</button>`

const popularInGroup = group => group.characters.filter(character => character.popular).length

function initSpecialCharacterToolbar($toolbar, mathEditor, hasAnswerFocus) {
    const gridButtonWidthPx = 35

    $toolbar.find('[data-js="charactersList"]')
        .append(specialCharacterGroups.map(group =>
            `<div class="rich-text-editor-toolbar-characters-group" 
                  style="width: ${popularInGroup(group) * gridButtonWidthPx}px">
                  ${group.characters.map(specialCharacterToButton).join('')}
             </div>`))
        .on('mousedown', 'button', e => {
            e.preventDefault()

            const character = e.currentTarget.innerText
            const command = e.currentTarget.dataset.command
            if (hasAnswerFocus()) window.document.execCommand('insertText', false, character)
            else mathEditor.insertMath(command || character, undefined, true)
        })
}

function initMathToolbar($mathToolbar, mathEditor) {
    $mathToolbar.append(latexCommandsWithSvg
        .map(o => o === '<br>' ? o : `<button class="rich-text-editor-button rich-text-editor-button-grid" data-command="${o.action}" data-latexcommand="${o.label || ''}" data-usewrite="${o.useWrite || false}">
<img src="${o.svg}"/>
</button>`).join('')
    ).on('mousedown', 'button', e => {
        e.preventDefault()
        const dataset = e.currentTarget.dataset
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
