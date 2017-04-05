module.exports = [
    {action: '<sub>x</sub>', label: 'X<sub>alaindeksi</sub>'},
    {action: '<sup>x</sup>', label: 'X<sup>yläindeksi</sup>'},
    {action: '<i>italic</i>', label: '<i>Kursiivi</i>'}
]

function initTagButtons() {
    $('.tags .list').append(require('./formattingStyles').map(o => $(`<button id="${o.action}">${o.label}</button>`)))

    $('.tags button').mousedown(e => {
        pasteHtmlAtCaret(e.currentTarget.id)
        e.preventDefault()
        return false
    })
}
