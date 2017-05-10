const $answer = $('.answer')
const {makeRichText} = require('../app/rich-text-editor')

const save = ($elem, async = true) => $.post({
    url: '/save',
    data: {text: $elem.html(), answerId: $elem.attr('id')},
    async
})

function saveScreenshot(questionId) {
    return ({data, type}) => {
        var url = `/saveImg?answerId=${questionId}`
        return postScreenshot()
            .then(function (res) {
                return res.url
            })
        function postScreenshot() {
            if (window.navigator.userAgent.indexOf('PhantomJS') === -1) {
                return $.post({
                    type: 'POST',
                    url: url,
                    data: data,
                    processData: false,
                    contentType: type
                })
            } else {
                // For some reason the Buffer is converted to UTF8 string when using jQuery and PhantomJS -> POST using vanilla XHR with Phantom
                var promise = new $.Deferred()
                var xhr = new XMLHttpRequest
                xhr.open("POST", url, true)
                xhr.setRequestHeader('content-type', type)
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        promise.resolve(JSON.parse(xhr.response))
                    } else {
                        promise.reject({status: xhr.status})
                    }
                }
                xhr.send(data.buffer)
                return promise
            }
        }
    }
}
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
