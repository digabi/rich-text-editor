export default {
    editor: {
        mathEditor: 'Matikkaeditori',
        title: 'Kaavaeditorin kehitysversio',
        description: `
<ul>
<li>“Lisää kaava” -napin alta löydät yleisimpiä matematiikassa, fysiikassa ja
kemiassa käytettäviä merkintöjä. Lisäksi erikoismerkkejä voi käyttää kaavan kirjoittamiseen.</li>
 <li>Kaavoja voi rakentaa
napsauttamalla valikon merkintöjä ja/tai kirjoittamalla LaTeXia.</li>
 <li>Editorin vastauskenttään voi kirjoittaa tekstiä ja kaavoja sekä
lisätä kuvia.</li></ul>`,
        shortcutTitle: 'Pikanäppäinvinkkejä',
        shortcuts: `<table><tbody>
<tr><th>Liitä kuva leikepöydältä</th><td>Ctrl-V</td></tr>
<tr><th>Kirjoita kaava</th><td>Ctrl-E</td></tr>
<tr><th colspan="2">Kaavassa</th></tr>
<tr><th>Jakoviiva</th><td>/</td></tr>
<tr><th>Kertomerkki</th><td>*</td></tr>
<tr><th>Eksponentti</th><td>^</td></tr>
<tr><th>Sulje kaava</th><td>Esc</td></tr>
<tr><th>Lisää kaava seuraavalle riville</th><td>Enter</td></tr>
</tbody>
</table>`,
        formatting: 'Muotoilu',
        specialCharacters: 'Erikoismerkit',
        insertEquation: 'Lisää kaava',
        close: 'sulje',
        save: 'Tallenna',
        updated: 'Päivitetty',
        sendFeedback: 'Lähetä palautetta',
        langLink: '/sv',
        langLabel: 'På svenska',
        answerTitle: 'Vastaus',
        toggleInstructions: 'Näytä ohjeet',
        help_overlay: {
            screenshot:
                '<h3>Kuvakaappaukset</h3><p>Tee kuva haluamallasi ohjelmalla. Napsauta yläpalkista kuvakaappauskuvaketta <span class="screen-shot-image"></span> ja rajaa haluamasi kuva-alue näytöltä. <span class="rich-text-editor-help-key">CTRL</span>-<span class="rich-text-editor-help-key">V</span> liittää kuvan vastauskenttään kursorin kohdalle. Voit vaihtaa kuvan paikkaa raahaamalla tai leikkaamalla kuvan komennolla <span class="rich-text-editor-help-key">CTRL</span>-<span class="rich-text-editor-help-key">X</span> ja liittämällä sen komennolla <span class="rich-text-editor-help-key">CTRL</span>-<span class="rich-text-editor-help-key">V</span> haluamaasi paikkaan.</p>',
            equation:
                '<h3>Kaavat</h3><p>Kaava lisätään komennolla <span class="rich-text-editor-help-key">CTRL</span>-<span class="rich-text-editor-help-key">E</span><br>Pikakomennot kaavassa:</p><table class="rich-text-editor-help-shortcuts"><tbody><tr><th>Jakoviiva</th><td><span class="rich-text-editor-help-key">/</span></td></tr><tr><th>Kertomerkki</th><td><span class="rich-text-editor-help-key">*</span></td></tr><tr><th>Yläindeksi</th><td><span class="rich-text-editor-help-key">^</span></td></tr><tr><th>Alaindeksi</th><td><span class="rich-text-editor-help-key">_</span></td></tr><tr><th>Lisää kaava seuraavalle riville</th><td><span class="rich-text-editor-help-key">↵</span></td></tr><tr><th>Sulje kaava</th><td><span class="rich-text-editor-help-key">esc</span></td></tr></tbody></table>'
        }
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
}
