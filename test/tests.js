describe('math editor', () => {
    const $el = {}
    const pasteEventMock = {
        type: 'paste', originalEvent: {
            clipboardData: {
                getData: () => {
                }
            }
        }
    }

    before('wait for tools to hide', window.waitUntil(() => isOutsideViewPort($('[data-js="tools"]'))))
    before(() => {
        $el.answer1 = $('.answer1')
        $el.latexField = $('[data-js="latexField"]')
        $el.equationField = $('[data-js="equationField"]')
        $el.mathToolbar = $('[data-js="mathToolbar"]')
        $el.tools = $('[data-js="tools"]')
    })
    describe('init', () => {
        it('answer field is contenteditable', () => {
            expect($el.answer1).to.have.attr('contenteditable', 'true')
        })
    })

    describe('focus rich text', () => {
        before(() => $el.answer1.focus())
        before('wait for tools visible', window.waitUntil(() => $el.tools.is(':visible')))

        it('shows character list', () => expect($('[data-js="charactersList"]')).to.be.visible)
        it('hide math tools', () => expect($el.mathToolbar).to.be.hidden)

        describe('pasting images', () => {
            describe('png', () => {
                before(done => {
                    $el.answer1
                        .append(window.PNG_IMAGE)
                    $el.answer1.find('img:last').get(0).onload = e => {
                        if (e.target.src.startsWith('http')) done()
                    }
                    $el.answer1.trigger(pasteEventMock)
                })
                it('saves pasted image', () => {
                    expect($el.answer1.find('img:last')).to.have.attr('src').match(/\/screenshot/)
                })
            })
            describe('not png', () => {
                let currentImgAmout
                before(done => {
                    currentImgAmout = $el.answer1.find('img').length
                    $el.answer1
                        .append('<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=">')
                    $('.answer1 img:last').get(0).onload = e => {
                        done()
                    }
                    $el.answer1.trigger(pasteEventMock)
                })
                it('ignores other than png images', () => {
                    expect($el.answer1.find('img').length).to.equal(currentImgAmout)
                })
            })
        })

        describe('start math', () => {
            before(() => $el.answer1.focus())
            before('wait for tools visible', window.waitUntil(() => $el.tools.is(':visible')))
            before(() => $('[data-js="newEquation"]').mousedown())

            it('shows math tools', () => expect($el.mathToolbar).to.be.visible)
            it('shows math editor', () => expect($('[data-js="mathEditor"]')).to.be.visible)

            describe('keeps equation field in sync', () => {
                before(() => $el.latexField.focus().val('xy').trigger('input'))
                before(done => setTimeout(done, 0))
                before(() => $el.answer1.focus())

                it('shows math in equation field', () => {
                    expect($el.equationField).to.have.text('xy')
                })
                it('shows math in img', () => expect($('img:first')).to.have.attr('src', '/math.svg?latex=xy'))
            })

            describe('keeps latex field in sync', () => {
                before(() => $('img:first').trigger({type: 'click', which: 1}))
                before(() => $el.latexField.val('').trigger('input'))
                before(() => $el.equationField.find('textarea').val('a+b').trigger('paste'))
                before(done => setTimeout(done, 100))
                before(() => $el.answer1.focus())

                it('shows math in latex field', () => {
                    expect($el.latexField).to.have.value('a+b')
                })
                it('shows math in img', () => expect($('img:first')).to.have.attr('src', '/math.svg?latex=a%2Bb'))
            })
        })
    })
})

function isOutsideViewPort($elem) {
    return $elem.length > 0 && $elem.position().top < 0
}

