module.exports = {saveScreenshot}
window.saveScreenshot = saveScreenshot

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
