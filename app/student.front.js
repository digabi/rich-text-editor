const $answer = $('.answer')
const {makeRichText} = require('./rich-text-editor')

const save = ($elem, async = true) => $.post({
    url: '/save',
    data: {text: $elem.html(), answerId: $elem.attr('id')},
    async
})

function saveScreenshot(questionId) {
    return ({data, type}) => {
        return $.post({
            type: 'POST',
            url: `/saveImg?answerId=${questionId}`,
            data: data,
            processData: false,
            contentType: type
        }).then(res => {
            return res.url
        })
}
}
const richTextOptions = id => ({
    screenshot: {
        saver: data => saveScreenshot(id)(data)
    }
})

$answer.each((i, answer) => {
    makeRichText(answer, richTextOptions(answer.id))
    $.get(`/load?answerId=${answer.id}`, data => data && $(answer).html(data.html))
}).on('keypress', e => {
    if (e.ctrlKey && !e.altKey && !e.shiftKey && e.key === 's') {
        e.preventDefault()
        save($(e.target))
    }
})
$('#answer1').focus()
