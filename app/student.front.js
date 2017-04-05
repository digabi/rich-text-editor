const $answer = $('.answer')
const { makeRichText } = require('./editor')

$('.save').click(() => $.post('/save', { text: $answer.html() }))

$.get('/load', data => data && $answer.html(data.html))

const save = (text, async = true) => $.post({
    url: '/save',
    data: { text },
    async
})

Bacon.fromBinder(makeRichText.bind(null, '.answer'))
    .skipDuplicates()
    .debounce(5000)
    .onValue(save)
