describe('math editor', () => {

    before('wait for tools to hide', waitUntil(() => $('[data-js="tools"]').length > 0 &&  $('[data-js="tools"]').position().top < 0 ))

    describe('init', () => {
        it('answer field is contenteditable', () => {
            const $answer = $('[data-js="answer"]')
            expect($answer).to.have.attr('contenteditable', 'true')
        })
    })

    describe('focus rich text', () => {
        before(() => $('.answer1').focus())
        before('wait for tools visible', waitUntil(() => $('[data-js="tools"]').is(':visible')))

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
        before(() => $('.answer1').focus())
        before(done => setTimeout(done, 0))

        it('shows math in latex field', () => {
            expect($('[data-js="equationField"]')).to.have.text('x+y')
        })
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
