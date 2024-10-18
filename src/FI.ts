type NodeList = ['key' | 'text', string][]
type Table = [string, string][]

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
      screenshotTitle: 'Kuvakaappaukset',
      screenshotInstruction: [
        [
          'text',
          'Tee kuva haluamallasi ohjelmalla. Napsauta yläpalkista kuvakaappauskuvaketta ja rajaa haluamasi kuva-alue näytöltä.',
        ],
        ['key', 'CTRL'],
        ['text', '-'],
        ['key', 'V'],
        [
          'text',
          ' liittää kuvan vastauskenttään kursorin kohdalle. Voit vaihtaa kuvan paikkaa raahaamalla tai leikkaamalla kuvan komennolla ',
        ],
        ['key', 'CTRL'],
        ['text', '-'],
        ['key', 'X'],
        ['text', ' ja liittämällä sen komennolla '],
        ['key', 'CTRL'],
        ['text', '-'],
        ['key', 'V'],
        ['text', ' haluamaasi paikkaan.'],
      ] as NodeList,
      equationTitle: 'Kaavat',
      equationInstruction: [
        ['text', 'Kaava lisätään komennolla '],
        ['key', 'CTRL'],
        ['text', '-'],
        ['key', 'E'],
      ] as NodeList,
      equationHotkeys: 'Pikakomennot kaavassa:',
      equationTable: [
        ['Jakoviiva', '/'],
        ['Kertomerkki', '*'],
        ['Yläindeksi', '^'],
        ['Alaindeksi', '_'],
        ['Lisää kaava seuraavalle riville', '↵'],
        ['Sulje kaava', 'esc'],
      ] as Table,
    },
    render_error: 'Virhe LaTeX-koodissa',
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
    langLabel: 'På svenska',
  },
}
