export const pasteEventMock = html => ({
    type: 'paste',
    originalEvent: {
        clipboardData: {
            getData: () => html
        }
    },
    preventDefault: () => {},
    stopPropagation: () => {}
})

export const waitUntil = condition => done => _waitUntil(condition, done)

function _waitUntil(condition, done) {
    if (condition()) done()
    else setTimeout(() => _waitUntil(condition, done), 200)
}

export function delay(done) {
    setTimeout(done, 0)
}

export function delayFor(ms) {
    return done => setTimeout(done, ms)
}

export function isOutsideViewPort($elem) {
    return $elem.length > 0 && $elem.position().top < 0
}
