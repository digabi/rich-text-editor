const $answer = $('.answer')
const { makeRichText } = require('./math-editor')

$('.save').click(() => $.post('/save', { text: $answer.html() }))

$.get('/load', data => data && $answer.html(data.html))

const save = ($elem, async = true) => $.post({
    url: '/save',
    data: { text: $elem.html(), answerId: $elem.attr('id') },
    async
})

Bacon.fromBinder(makeRichText.bind(null, '.answer'))
    .skipDuplicates()
    .debounce(5000)
    .onValue(save)
