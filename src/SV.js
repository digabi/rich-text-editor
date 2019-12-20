export default {
    editor: {
        mathEditor: 'Matematikeditor',
        title: 'Formeleditorns utvecklingsversion',
        description: `
<ul>
 <li>Under knappen “Lägg till formel” hittar du de vanligaste beteckningarna som används i matematik, fysik och kemi. Dessutom kan du använda specialtecken för att skriva formler.</li>
<li>Det går att konstruera formler genom att klicka på beteckningarna i menyerna och/eller genom att skriva LaTeX.</li>
<li>Det går förutom att skriva text och formler, att också att lägga till bilder i svarsfältet.</li></ul>`,
        shortcutTitle: 'Tips på tangentkombinationer',
        shortcuts: `<table><tbody>
<tr><th>Lägg till en bild från urklippet</th><td>Ctrl-V</td></tr>
<tr><th>Skriv en formel</th><td>Ctrl-E</td></tr>
<tr><th colspan="2">I formeln </th></tr>
<tr><th>Bråkstreck</th><td>/</td></tr>
<tr><th>Multiplikationstecken</th><td>*</td></tr>
<tr><th>Stäng formeln</th><td>Esc</td></tr>
</tbody>
</table>`,
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
        toggleInstructions: 'Visa intruktioner',
        help_overlay: {
            screenshot:
                '<h3>Skärmdumpar</h3><p>Skapa bilden med valbart program. Klicka på skärmdumpsikonen i övre balken<span class="screen-shot-image"></span> och avgränsa den delen av skärmen du vill använda.<span class="rich-text-editor-help-key">CTRL</span>-<span class="rich-text-editor-help-key">V</span>bifogar bilden i svarsfältet där kursorn ligger. Du kan ändra på bildens position genom att släpa bilden eller genom att klippa den med kommandot<span class="rich-text-editor-help-key">CTRL</span>-<span class="rich-text-editor-help-key">X</span>och klistra in den med kommandot<span class="rich-text-editor-help-key">CTRL</span>-<span class="rich-text-editor-help-key">V</span>på valbart ställe.</p>',
            equation:
                '<h3>Formler</h3><p>Formeln läggs till med kommandot<span class="rich-text-editor-help-key">CTRL</span>-<spanclass="rich-text-editor-help-key">E</span><br />Snabbkommandon med formler:</p><table class="rich-text-editor-help-shortcuts"><tbody><tr><th>Divisionsstreck</th><td><span class="rich-text-editor-help-key">/</span></td></tr><tr><th>Multiplikationstecken</th><td><span class="rich-text-editor-help-key">*</span></td></tr><tr><th>Upphöjt index</th><td><span class="rich-text-editor-help-key">^</span></td></tr><tr><th>Nedsänkt index</th><td><span class="rich-text-editor-help-key">_</span></td></tr><tr><th>Lägg till formel på nästa rad</th><td><span class="rich-text-editor-help-key">↵</span></td></tr><tr><th>Stäng formeln</th><td><span class="rich-text-editor-help-key">esc</span></td></tr></tbody></table>'
        }
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
}
