import $ from 'jquery'
import specialCharacterGroups from './specialCharacters'
import latexCommandsWithSvg from './latexCommandsWithSvg'

export function init(mathEditor, hasRichTextFocus, l, baseUrl) {
    const $helpOverlay = $(`<div class="rich-text-editor-overlay rich-text-editor-hidden">
    <div class="rich-text-editor-overlay-modal">
        <div data-i18n="[html]screenshot_info_text" class="rich-text-editor-modal-columns">
            <div class="rich-text-editor-modal-column rich-text-editor-modal-column-2">
                <h3>Kuvakaappaukset</h3>
                <p>Tee kuva haluamallasi ohjelmalla. Klikkaa yläpalkista kuvakaappauskuvaketta <span
                        class="screen-shot-image"></span> ja rajaa haluamasi kuva-alue näytöltä. <span class="rich-text-editor-help-key">CTRL</span>-<span class="rich-text-editor-help-key">V</span> liittää
                    kuvan vastausikkunaan kursorin kohdalle. Voit vaihtaa kuvan paikkaa raahaamalla tai leikkaamalla kuvan
                    komennolla <span class="rich-text-editor-help-key">CTRL</span>-<span class="rich-text-editor-help-key">X</span> ja liittämällä sen komennolla <span class="rich-text-editor-help-key">CTRL</span>-<span class="rich-text-editor-help-key">V</span> haluamaasi paikkaan.
                </p>
            </div>
            <div class="rich-text-editor-modal-column rich-text-editor-modal-column-1">
                <h3>Kaavat</h3>
                <p>Kaava lisätään komennolla <span class="rich-text-editor-help-key">CTRL</span>-<span class="rich-text-editor-help-key">E</span><br>Pikakomennot
                    kaavassa:</p>
                <table class="rich-text-editor-help-shortcuts">
                    <tbody>
                    <tr>
                        <th>Jakoviiva</th>
                        <td><span class="rich-text-editor-help-key">/</span></td>
                    </tr>
                    <tr>
                        <th>Kertomerkki</th>
                        <td><span class="rich-text-editor-help-key">*</span></td>
                    </tr>
                    <tr>
                        <th>Yläindeksi</th>
                        <td><span class="rich-text-editor-help-key">^</span></td>
                    </tr>
                    <tr>
                        <th>Alaindeksi</th>
                        <td><span class="rich-text-editor-help-key">_</span></td>
                    </tr>
                    <tr>
                        <th>Lisää kaava seuraavalle riville</th>
                        <td><span class="rich-text-editor-help-key">↵</span></td>
                    </tr>
                    <tr>
                        <th>Sulje kaava</th>
                        <td><span class="rich-text-editor-help-key">esc</span></td>
                    </tr>
                    </tbody>
                </table>        
            </div>
        </div>
        <button data-js="closeOverlayButton" class="rich-text-editor-close-overlay-button"></button>
    </div>
</div>
    
    `)
        .on('mousedown', '[data-js="closeOverlayButton"]', e => {
            e.preventDefault()
            $helpOverlay.addClass('rich-text-editor-hidden')
        })
        .on('mousedown', e => {
            e.preventDefault()
            if (e.target.classList.contains('rich-text-editor-overlay')) {
                e.stopPropagation()
                $helpOverlay.addClass('rich-text-editor-hidden')
            }
        })

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
                    <button class="rich-text-editor-help-button" data-js="richTextEditorHelp" style="z-index: 100"></button>
                </div>
                <div class="rich-text-editor-toolbar-wrapper">
                    <button class="rich-text-editor-new-equation rich-text-editor-button rich-text-editor-button-action" data-js="newEquation" data-command="Ctrl-E" data-i18n="rich_text_editor.insert_equation">Σ ${
                        l.insertEquation
                    }</button>
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
        .on('mousedown', '[data-js="richTextEditorHelp"]', e => {
            e.preventDefault()
            $helpOverlay.removeClass('rich-text-editor-hidden')
        })

    const $newEquation = $toolbar.find('[data-js="newEquation"]')
    const $mathToolbar = $toolbar.find('[data-js="mathToolbar"]')
    initSpecialCharacterToolbar($toolbar, mathEditor, hasRichTextFocus)
    initMathToolbar($mathToolbar, mathEditor, baseUrl)
    initNewEquation($newEquation, mathEditor, hasRichTextFocus)

    if ($.fn.i18n) {
        $toolbar.i18n()
    } else if ($.fn.localize) {
        $toolbar.localize()
    }

    return { toolbar: $toolbar, helpOverlay: $helpOverlay }
}

const specialCharacterToButton = char =>
    `<button class="rich-text-editor-button rich-text-editor-button-grid${
        char.popular ? ' rich-text-editor-characters-popular' : ''
    }" ${char.latexCommand ? `data-command="${char.latexCommand}"` : ''} data-usewrite="${!char.noWrite}">${
        char.character
    }</button>`

const popularInGroup = group => group.characters.filter(character => character.popular).length

function initSpecialCharacterToolbar($toolbar, mathEditor, hasAnswerFocus) {
    const gridButtonWidthPx = 35

    $toolbar
        .find('[data-js="charactersList"]')
        .append(
            specialCharacterGroups.map(
                group =>
                    `<div class="rich-text-editor-toolbar-characters-group"
                  style="width: ${popularInGroup(group) * gridButtonWidthPx}px">
                  ${group.characters.map(specialCharacterToButton).join('')}
             </div>`
            )
        )
        .on('mousedown', 'button', e => {
            e.preventDefault()

            const character = e.currentTarget.innerText
            const command = e.currentTarget.dataset.command
            const useWrite = e.currentTarget.dataset.usewrite === 'true'
            if (hasAnswerFocus()) window.document.execCommand('insertText', false, character)
            else mathEditor.insertMath(command || character, undefined, useWrite)
        })
}

function initMathToolbar($mathToolbar, mathEditor) {
    $mathToolbar
        .append(
            latexCommandsWithSvg
                .map(o =>
                    typeof o === 'string'
                        ? o
                        : `<button class="rich-text-editor-button rich-text-editor-button-grid" data-command="${
                              o.action
                          }" data-latexcommand="${o.label || ''}" data-usewrite="${o.useWrite || false}">
<img src="${o.svg}"/>
</button>`
                )
                .join('')
        )
        .on('mousedown', 'button', e => {
            e.preventDefault()
            const dataset = e.currentTarget.dataset
            mathEditor.insertMath(dataset.command, dataset.latexcommand, dataset.usewrite === 'true')
        })
}

function initNewEquation($newEquation, mathEditor, hasAnswerFocus) {
    $newEquation.mousedown(
        (e => {
            e.preventDefault()
            if (!hasAnswerFocus()) return // TODO: remove when button is only visible when textarea has focus
            mathEditor.insertNewEquation()
        }).bind(this)
    )
}
