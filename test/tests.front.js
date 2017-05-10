const u = require('./testUtil')
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

    before('wait for tools to hide', u.waitUntil(() => isOutsideViewPort($('[data-js="tools"]'))))
    before(() => {
        $el.answer1 = $('.answer1')
        $el.latexField = $('[data-js="latexField"]')
        $el.equationField = $('[data-js="equationField"]')
        $el.mathToolbar = $('[data-js="mathToolbar"]')
        $el.tools = $('[data-js="tools"]')
        $el.mathEditor = $('[data-js="mathEditor"]')
    })
    describe('init', () => {
        it('answer field is contenteditable', () => {
            expect($el.answer1).to.have.attr('contenteditable', 'true')
        })
    })

    describe('when focusing rich text', () => {
        before('focus', () => $el.answer1.focus())
        before('wait for tools visible', u.waitUntil(() => $el.tools.is(':visible')))

        it('shows character list', () => expect($('[data-js="charactersList"]')).to.be.visible)
        it('hide math tools', () => expect($el.mathToolbar).to.be.hidden)

        describe('when pasting images', () => {
            describe('png', () => {
                before('paste image', done => {
                    $el.answer1
                        .append(u.PNG_IMAGE)
                    $el.answer1.find('img:last').get(0).onload = e => {
                        if (~e.target.src.indexOf('http')) done()
                    }
                    $el.answer1.trigger(pasteEventMock)
                })
                it('saves pasted image', () => {
                    expect($el.answer1.find('img:last')).to.have.attr('src').match(/\/screenshot/)
                })
            })
            describe('not png', () => {
                let currentImgAmout
                before('#3', done => {
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
            before('wait for tools visible', u.waitUntil(() => $el.tools.is(':visible')))
            before(() => $('[data-js="newEquation"]').mousedown())

            it('shows math tools', () => expect($el.mathToolbar).to.be.visible)
            it('shows math editor', () => expect($el.mathEditor).to.be.visible)

            describe('keeps equation field in sync', () => {
                before('type', () => $el.latexField.focus().val('xy').trigger('input'))
                before('suspend', done => setTimeout(done, 0))
                before('focus', () => $el.answer1.focus())

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

            describe('equation click opens and esc closes math editor', () => {
                before(() => $('img:first').trigger({type: 'click', which: 1}))
                it('editor is visible and then hidden', () => {
                    expect($el.mathEditor).to.be.visible
                    $el.answer1.trigger({type: 'keydown', keyCode: 27})
                    expect($el.mathEditor).to.be.hidden
                })
            })

            describe('when clicking special character from toolbar', () => {
                before(() => $('.rich-text-editor-toolbar-characters-group button:first').mousedown())

                it('inserts special character to answer body', () => {
                    expect($el.answer1).to.have.text('°')
                })
            })
        })
    })
})

function isOutsideViewPort($elem) {
    return $elem.length > 0 && $elem.position().top < 0
}

