describe('math editor', () => {

    before(waitUntil(() => $('[data-js="tools"]').length > 0 &&  $('[data-js="tools"]').is(':hidden')))

    describe('init', () => {
        it('answer field is contenteditable', () => {
            const $answer = $('[data-js="answer"]')
            expect($answer).to.have.attr('contenteditable', 'true')
        })
        it('tools are hidden', () => expect($('.rich-text-editor-tools')).to.be.hidden)
    })

    describe('focus rich text', () => {
        before(() => $('.answer1').focus())
        before(waitUntil(() => $('[data-js="tools"]').is(':visible')))

        it('shows tools', () => expect($('[data-js="charactersList"]')).to.be.visible)
        it('hide math tools', () => expect($('[data-js="mathToolbar"]')).to.be.hidden)
    })

    describe('start math', () => {
        before(() => $('[data-js="newEquation"]').mousedown())

        it('shows math tools', () => expect($('[data-js="mathToolbar"]')).to.be.visible)
        it('shows math editor', () => expect($('[data-js="mathEditor"]')).to.be.visible)
    })

    describe('keeps both fiels in sync', () => {
        before(() => $('[data-js="latexField"]').focus().val('x+y').keyup())
        before(done => setTimeout(done, 200))

        it('shows math in latex field', () => expect($('[data-js="equationField"]')).to.have.text('x+y​'))
        it('shows math in img', () => expect($('img:first')).to.have.attr('src','/math.svg?latex=x%2By'))
    })
})

function waitUntil(condition) {
    return done => _waitUntil(condition, done)
}

function _waitUntil(condition, done) {
    if (condition()) done()
    else setTimeout(() => _waitUntil(condition, done), 200)
}
