const $answer = $('.answer')
const {makeRichText} = require('./math-editor')

const save = ($elem, async = true) => $.post({
    url: '/save',
    data: {text: $elem.html(), answerId: $elem.attr('id')},
    async
})

function saveScreenshot(questionId) {
    return ({data, type, id}) => {
        return $.post({
            type: 'POST',
            url: `/saveImg?answerId=${questionId}&id=${id}`,
            data: data,
            processData: false,
            contentType: type
        }).then(res => {
            console.log('heh', res)
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
