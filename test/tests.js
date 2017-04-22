describe('math editor', () => {

    before(waitUntil(() => $('[data-js="tools"]').length > 0 &&  $('[data-js="tools"]').is(':hidden')))

    describe('initial state', () => {
        it('answer field is contenteditable', () => {
            const $answer = $('[data-js="answer"]')
            expect($answer).to.have.attr('contenteditable', 'true')
        })
    })

    describe('focus state', () => {
        before(() => {
            $('.answer1').focus()
            $('.answer1').focus() // TODO why two calls is necessary?
        })
        before(waitUntil(() => $('[data-js="tools"]').is(':visible')))

        it('shows tools', () => {
            expect($('[data-js="charactersList"]')).to.be.visible
            expect($('.rich-text-editor-tools')).to.be.visible
        })
    })

    describe('start math', () => {
        before(() => {
            $('[data-js="newEquation"]').mousedown()
        })

        it('shows tools', () => {
            expect($('[data-js="mathToolbar"]')).to.be.visible
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
