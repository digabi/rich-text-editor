const $answer = $('.answer')
const {makeRichText} = require('../app/rich-text-editor')
const {saveScreenshot} = require('./saver')

const save = ($elem, async = true) => $.post({
    url: '/save',
    data: {text: $elem.html(), answerId: $elem.attr('id')},
    async
})

const richTextOptions = id => ({
    screenshot: {
        saver: data => saveScreenshot(id)(data),
        limit: 10
    }
})

$answer.each((i, answer) => {
    $.get(`/load?answerId=${answer.id}`, data => {
        !window.IS_TEST && data && $(answer).html(data.html)
        makeRichText(answer, richTextOptions(answer.id), onValueChange)
    })
}).on('keypress', e => {
    if (e.ctrlKey && !e.altKey && !e.shiftKey && e.key === 's') {
        e.preventDefault()
        save($(e.target))
    }
})
$('#answer1').focus()

$('.toggleInstructions').click(e => {
    e.preventDefault()
    $('.instructions').toggleClass('hide')
})
function onValueChange() {

}
