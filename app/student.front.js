const $answer = $('.answer')
const {makeRichText} = require('./math-editor')

makeRichText('.answer')

const save = ($elem, async = true) => $.post({
    url: '/save',
    data: {text: $elem.html(), answerId: $elem.attr('id')},
    async
})

$answer.each((i, answer) => {
    $.get(`/load?answerId=${answer.id}`, data => data && $(answer).html(data.html))
}).on('keypress', e => {
    if (e.ctrlKey && !e.altKey && !e.shiftKey && e.key === 's')
        save($(e.target))
})
