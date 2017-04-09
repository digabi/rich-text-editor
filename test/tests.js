describe('math editor', () => {
    before(waitUntil(() => $('.toolbar').length > 0 &&  $('.toolbar').is(':hidden')))

    describe('initial state', () => {
        it('answer field is contenteditable', () => {
            const $answer = $('.answer')
            expect($answer).to.have.attr('contenteditable', 'true')
            expect($answer).to.have.attr('data-js-handle', 'answer')
        })
    })

    describe('focus state', () => {
        before(() => {
            $('.answer:first').focus()
            $('.answer:first').focus() // TODO why two calls is necessary?
        })
        before(waitUntil(() => $('.toolbar').is(':visible')))

        it('shows tools', () => {
            expect($('.toolbar')).to.be.visible
            expect($('.answer:first').prev()).to.have.class('toolbar')
        })
    })
})

function waitUntil(condition) {
    return done => _waitUntil(condition, done)
}

function _waitUntil(condition, done) {
    if (condition()) done()
    else setTimeout(() => _waitUntil(condition, done), 200)
}
