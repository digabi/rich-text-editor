import FI from './FI'

const SV: typeof FI = {
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
<tr><th>Exponent</th><td>^</td></tr>
<tr><th>Stäng formeln</th><td>Esc</td></tr>
<tr><th>Lägg till en formel på följande rad</th><td>Enter</td></tr>
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
      screenshotTitle: 'Skärmdumpar',
      screenshotInstruction: [
        [
          'text',
          'Skapa bilden med valbart program. Klicka på skärmdumpsikonen i övre balken och avgränsa den delen av skärmen du vill använda.',
        ],
        ['key', 'CTRL'],
        ['text', '-'],
        ['key', 'V'],
        [
          'text',
          ' bifogar bilden i svarsfältet där kursorn ligger. Du kan ändra på bildens position genom att släpa bilden eller genom att klippa den med kommandot',
        ],
        ['key', 'CTRL'],
        ['text', '-'],
        ['key', 'X'],
        ['text', ' och klistra in den med kommandot'],
        ['key', 'CTRL'],
        ['text', '-'],
        ['key', 'V'],
        ['text', ' på valbart ställe.'],
      ],
      equationTitle: 'Formler',
      equationInstruction: [
        ['text', 'Formeln läggs till med kommandot '],
        ['key', 'CTRL'],
        ['text', '-'],
        ['key', 'E'],
      ],
      equationHotkeys: 'Snabbkommandon med formler:',
      equationTable: [
        ['Divisionsstreck', '/'],
        ['Multiplikationstecken', '*'],
        ['Upphöjt index', '^'],
        ['Nedsänkt index', '_'],
        ['Lägg till formel på nästa rad', '↵'],
        ['Stäng formeln', 'esc'],
      ],
    },
    render_error: 'Fel i LaTeX-koden',
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
    langLabel: 'Suomeksi',
  },
}

export default SV
