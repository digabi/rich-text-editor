const pasteEventMock = {
    type: 'paste', originalEvent: {
        clipboardData: {
            getData: () => {
            }
        }
    }
}

module.exports = {
    waitUntil: condition => done => _waitUntil(condition, done),
    delay,
    delayFor,
    isOutsideViewPort,
    pasteEventMock
}
function _waitUntil(condition, done) {
    if (condition()) done()
    else setTimeout(() => _waitUntil(condition, done), 200)
}


function delay(done) {
    setTimeout(done, 0)
}

function delayFor(ms) {
    return done => setTimeout(done, ms)
}

function isOutsideViewPort($elem) {
    return $elem.length > 0 && $elem.position().top < 0
}

