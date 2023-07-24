/* global expect, WebConsole chai, MathJax */
import $ from 'jquery'
import { makeRichText } from '../src/rich-text-editor'
import base64png from './base64png'
import * as u from './testUtil'
import latexCommands from '../src/latexCommands'
import specialCharacters from '../src/specialCharacters'
import sanitizeHtml from 'sanitize-html'

const $answer = $('.answer')
let savedValues = [[], [], []]

const richTextOptions = () => ({
    screenshotSaver: () => Promise.resolve('/screenshot/screenshot.png'),
})

const answer = $answer.toArray()

makeRichText(answer[0], richTextOptions(answer[0].id), (data) => {
    savedValues[0].push(data)
})
makeRichText(answer[1], richTextOptions(answer[1].id), (data) => {
    savedValues[1].push(data)
})

makeRichText(answer[3], richTextOptions(answer[3].id))

makeRichText(
    answer[2],
    {
        screenshotSaver: () => Promise.resolve('/exam-api/screenshot.png'),
        screenshotImageSelector:
            'img[src*="/exam-api/"], img[src^="data:image/png"], img[src^="data:image/gif"], img[src^="data:image/jpeg"]',
        invalidImageSelector: 'img:not(img[src^="data"], img[src^="/math.svg?latex="], img[src*="/exam-api/"])',
        fileTypes: ['image/png', 'image/jpeg', 'image/gif'],
        sanitize: (markup) =>
            sanitizeHtml(markup, {
                allowedTags: ['img', 'br', 'div', 'b'],
                allowedAttributes: {
                    img: ['src', 'alt'],
                },
                allowedSchemes: ['data'],
            }),
    },
    (data) => {
        savedValues[2].push(data)
    },
)
const getSvg = function (latex) {
    const node = MathJax.tex2svg(latex)
    return `data:image/svg+xml;base64,${btoa(
        encodeURIComponent(node.firstChild.outerHTML).replace(/%([0-9A-F]{2})/g, (match, p1) =>
            String.fromCharCode(`0x${p1}`),
        ),
    )}`
}
window.locale = 'FI'
window.IS_TEST = true
const reporter = window.URL && new URL(document.location.href).searchParams.get('test')
const mochaOpts = {
    ui: 'bdd',
}
if (reporter === 'console') {
    mochaOpts.reporter = WebConsole
}
mocha.setup(mochaOpts)
window.expect = chai.expect
chai.config.truncateThreshold = 0
const $el = {}
const clearSaveData = () => {
    savedValues[0] = []
    savedValues[1] = []
    savedValues[2] = []
}
const defaults = () => {
    $el.answer1.html('<img alt="c+d" src="/math.svg?latex=c%2Bd" />')
    $el.answer2.html('<img alt="c+d" src="/math.svg?latex=e%2Bf" />')
    $el.answer3.html('<img alt="c+d" src="/math.svg?latex=e%2Bf" />')
    $el.renderError.text('')
    clearSaveData()
}
const clear = () => {
    $el.answer1.empty()
    $el.answer2.empty()
    $el.answer3.empty()
    clearSaveData()
}
const $firstAnswerMath = () => $('.answer1 img:first')

describe('rich text editor', () => {
    before(
        'wait for tools to hide',
        u.waitUntil(() => u.isOutsideViewPort($('[data-js="tools"]'))),
    )
    before(
        'wait answer field to initialize',
        u.waitUntil(() => $('.answer1').attr('contenteditable')),
    )
    before(() => {
        $el.answer1 = $('.answer1')
        $el.answer2 = $('.answer2')
        $el.answer3 = $('.answer3')
        $el.latexField = $('[data-js="latexField"]')
        $el.equationField = $('[data-js="equationField"]')
        $el.equationFieldTextArea = $el.equationField.find('textarea')
        $el.mathToolbar = $('[data-js="mathToolbar"]')
        $el.tools = $('[data-js="tools"]')
        $el.mathEditor = $('[data-js="mathEditor"]')
        $el.renderError = $('.render-error')
    })
    before('focus', () => $el.answer1.focus())
    before(
        'wait for tools visible',
        u.waitUntil(() => $el.tools.is(':visible')),
    )
    after(defaults)

    it('save handler is never called', () => {
        expect(savedValues[0]).to.have.length(0)
        expect(savedValues[1]).to.have.length(0)
        expect(savedValues[2]).to.have.length(0)
    })
    it('shows character list', () => expect($('[data-js="charactersList"]')).to.be.visible)
    it('hide math tools', () => expect($el.mathToolbar).to.be.hidden)
    it('answer has focus style', () => expect($el.answer1).to.have.class('rich-text-focused'))

    describe('when pasting images', () => {
        describe('png', () => {
            before(clear)
            before('paste image', (done) => {
                $el.answer1.append(base64png)
                $el.answer1.find('img:last').get(0).onload = (e) => {
                    if (~e.target.src.indexOf('http')) done()
                }
                $el.answer1.trigger(u.pasteEventMock()).trigger('input')
            })

            it('saves pasted image', () => {
                expect($el.answer1.find('img:last'))
                    .to.have.attr('src')
                    .match(/\/screenshot/)
            })
            it('saves markup', () => {
                expect(savedValues[0]).to.eql([
                    { answerHTML: '<img src="/screenshot/screenshot.png" />', answerText: '', imageCount: 1 },
                ])
            })
        })
        describe('not png', () => {
            before(clear)
            let currentImgAmout
            before('#3', (done) => {
                currentImgAmout = $el.answer1.find('img').length
                $el.answer1.append('<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=">')
                $('.answer1 img:last').get(0).onload = () => {
                    done()
                }
                $el.answer1.trigger(u.pasteEventMock()).trigger('input')
            })

            it('ignores other than png images', () => {
                expect($el.answer1.find('img').length).to.equal(currentImgAmout)
            })
        })
    })

    describe('when pasting images and content in other environments', () => {
        before(clear)
        before('focus', () => $el.answer3.focus())

        describe('dropping markup', () => {
            before('drop banned tags', () => {
                $el.answer3.html(
                    '<div class="forbidden"><b>drop</b></div><div>bar</div><a href="/">link text</a> <img src="/exam-api/screenshot.png" alt />',
                )
                $el.answer3.trigger('drop')
            })
            before(u.delayFor(150))

            it('drops sanitized content', () => {
                expect($el.answer3).to.have.html(
                    '<div><b>drop</b></div><div>bar</div>link text <img src="/exam-api/screenshot.png">',
                )
                expect(savedValues[2]).to.eql([
                    {
                        answerHTML:
                            '<div><b>drop</b></div><div>bar</div>link text <img src="/exam-api/screenshot.png" />',
                        answerText: 'drop\nbar\nlink text',
                        imageCount: 1,
                    },
                ])
            })
        })
        describe('png', () => {
            before(clear)
            before('paste image', (done) => {
                $el.answer3.append(base64png)
                $el.answer3.find('img:last').get(0).onload = () => {
                    done()
                }
                $el.answer3.trigger(u.pasteEventMock()).trigger('input')
            })

            it('saves pasted image', () => {
                expect($el.answer3.find('img:last'))
                    .to.have.attr('src')
                    .match(/\/exam-api/)
            })
            it('saves markup', () => {
                expect(savedValues[2]).to.eql([
                    { answerHTML: '<img src="/exam-api/screenshot.png" />', answerText: '', imageCount: 1 },
                ])
            })
        })

        describe('gif is allowed with custom configuration', () => {
            before(clear)
            let currentImgAmout
            before('#3', (done) => {
                currentImgAmout = $el.answer3.find('img').length
                $el.answer3.append('<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=">')
                $('.answer3 img:last').get(0).onload = () => {
                    done()
                }
                $el.answer3.trigger(u.pasteEventMock()).trigger('input')
            })

            it('ignores other than png images', () => {
                expect($el.answer3.find('img').length).to.equal(currentImgAmout + 1)
            })
        })
    })

    describe('start math', () => {
        before(clear)
        before(() => $el.answer1.focus())
        before(
            'wait for tools visible',
            u.waitUntil(() => $el.tools.is(':visible')),
        )
        before(() => $('[data-js="newEquation"]').mousedown())
        before(() => $el.latexField.val('\\ \\'))
        before(u.delayFor(600))

        it('shows math tools', () => expect($el.mathToolbar).to.be.visible)
        it('shows math editor', () => expect($el.mathEditor).to.be.visible)
        it('answer still has focus style', () => expect($el.answer1).to.have.class('rich-text-focused'))
        it('trims empty equations', () => {
            $el.equationFieldTextArea.trigger({ type: 'keydown', keyCode: 27 })
            expect($el.answer1).to.have.html('')
            expect(savedValues[0]).to.eql([
                { answerHTML: '', answerText: '', imageCount: 0 },
                { answerHTML: '', answerText: '', imageCount: 0 },
            ])
        })

        describe('when focus in latex field', () => {
            before(defaults)
            before(() => $firstAnswerMath().trigger({ type: 'click', which: 1 }))
            before('type', () => $el.latexField.focus().val('xy').trigger('input'))
            before(u.delay)
            before(() => $('.rich-text-editor-toolbar-characters-group button:eq(3)').mousedown())
            before(u.delay)
            before('focus', () => $el.answer1.focus())

            it('answer still has focus style', () => expect($el.answer1).to.have.class('rich-text-focused'))
            it('shows math in equation field', () => expect($el.equationField).to.have.text('xy±'))
            it('shows math in latex field', () => expect($el.latexField).to.have.value('xy\\pm'))
            it('shows math in img', () => expect($firstAnswerMath()).to.have.attr('src', '/math.svg?latex=xy%5Cpm'))

            describe('and typing invalid formula for MathQuill', () => {
                before(defaults)
                before(() => $firstAnswerMath().trigger({ type: 'click', which: 3 }))
                before('type', () => $el.latexField.focus().val('1\\').trigger('paste'))
                before(u.waitUntil(() => $el.renderError.text().length > 0))

                it('shows error message', () => expect($el.renderError.text()).to.equal('Virhe LaTeX-koodissa'))
            })

            describe('and typing invalid formula for MathJax', () => {
                before(defaults)
                before(() => $firstAnswerMath().trigger({ type: 'click', which: 3 }))
                before('type', () => $el.latexField.focus().val('1}{').trigger('paste'))
                before(u.waitUntil(() => $el.renderError.text().length > 0))

                it('shows error message', () => expect($el.renderError.text()).to.equal('Virhe LaTeX-koodissa'))
            })
        })

        describe('when focus in equation field, pasting content and adding char', () => {
            before(defaults)
            before(() => $el.answer1.blur())
            before(u.delay)
            before(() => $firstAnswerMath().trigger({ type: 'click', which: 1 }))
            before(() => $el.latexField.val('').trigger('input'))
            before(() => $el.equationFieldTextArea.val('a+b').trigger('paste'))
            before(u.delay)
            before(() => $('.rich-text-editor-toolbar-characters-group button:eq(4)').mousedown())
            before(u.delay)
            before(() => $el.answer1.focus())

            it('answer still has focus style', () => expect($el.answer1).to.have.class('rich-text-focused'))
            it('shows math in equation field', () => expect($el.equationField).to.have.text('a+b∞'))
            it('shows math in latex field', () => expect($el.latexField).to.have.value('a+b\\infty'))
            it('shows math in img', () =>
                expect($firstAnswerMath()).to.have.attr('src', '/math.svg?latex=a%2Bb%5Cinfty'))
            it('stores latest data', () => {
                expect(savedValues[0]).to.eql([
                    { answerHTML: '<img alt="c+d" src="/math.svg?latex=c%2Bd" />', answerText: '', imageCount: 0 },
                    {
                        answerHTML: '<img alt="a+b\\infty" src="/math.svg?latex=a%2Bb%5Cinfty" />',
                        answerText: '',
                        imageCount: 0,
                    },
                ])
            })
        })

        describe('equation click opens and esc closes math editor', () => {
            before(() => $el.answer1.blur())
            after(defaults)
            after(u.delayFor(100))
            after(() => $el.equationFieldTextArea.blur())
            after(u.delayFor(100))

            it('editor is visible and then hidden', () => {
                expect($el.answer1).to.not.have.class('rich-text-focused')
                $('img:first').trigger({ type: 'click', which: 1 })
                expect($el.answer1).to.have.class('rich-text-focused')
                expect($el.mathEditor).to.be.visible
                $el.equationFieldTextArea.trigger({ type: 'keydown', keyCode: 27 })
                expect($el.mathEditor).to.be.hidden
            })
        })

        describe('when clicking special character from toolbar', () => {
            before(clear)
            before(() => $el.answer1.focus())

            before(() => $('.rich-text-editor-toolbar-characters-group button:first').mousedown())

            it('inserts special character to answer body', () => {
                expect($el.answer1).to.have.text('°')
            })
            it('stores latest data', () => {
                const lastData = savedValues[0].pop()
                expect(lastData.answerHTML).to.equal('°')
                expect(lastData.answerText).to.equal('°')
            })
        })

        describe('when writing equations', () => {
            before(clear)
            before(() => $el.latexField.focus())
            before(() => $el.latexField.val('test').trigger('input'))
            before(u.delayFor(100))
            before(() => $el.latexField.val('test1').trigger('input'))
            before(u.delayFor(100))

            it('CTRL + Z restores previous answer', () => {
                $el.latexField.trigger({ type: 'keydown', keyCode: 90, ctrlKey: true })
                u.delayFor(100)
                expect($el.latexField.val()).to.eql('test')
            })

            it('CTRL + Y restores next answer', () => {
                $el.latexField.trigger({ type: 'keydown', keyCode: 89, ctrlKey: true })
                u.delayFor(100)
                expect($el.latexField.val()).to.eql('test1')
            })

            it('LaTeX undo and redo change MQ', () => {
                $el.latexField.trigger({ type: 'keydown', keyCode: 90, ctrlKey: true })
                u.delayFor(100)
                expect($el.equationField).to.have.text('test')
            })
            it('MQ undo and redo change LaTeX', () => {
                $el.equationFieldTextArea.trigger({ type: 'keydown', keyCode: 89, ctrlKey: true })
                u.delayFor(100)
                expect($el.latexField.val()).to.eql('test1')
            })
        })

        describe('when writing LaTeX', () => {
            before(clear)
            before(() => $el.latexField.focus())
            before(() => $el.latexField.val('\\alph').trigger('input'))
            before(u.delayFor(100))
            before(() => $el.latexField.val('\\alpha').trigger('input'))
            before(u.delayFor(100))

            after(defaults)
            after(() => $el.answer1.focus())

            it('Undo and redo work correctly on incorrect LaTeX', () => {
                $el.equationFieldTextArea.trigger({ type: 'keydown', keyCode: 90, ctrlKey: true })
                u.delayFor(100)
                expect($el.latexField.val()).to.eql('\\alph')
                expect($el.equationField).to.have.text('')
                $el.equationFieldTextArea.trigger({ type: 'keydown', keyCode: 89, ctrlKey: true })
                u.delayFor(100)
                expect($el.latexField.val()).to.eql('\\alpha')
                expect($el.equationField).to.have.text('α')
            })
        })
    })

    describe('when leaving answer box', () => {
        before(() => $el.answer1.blur())
        before(u.delayFor(100))

        it('removes focus style from answer', () => expect($el.answer1).to.not.have.class('rich-text-focused'))
        it('hides toolbaar', () => expect($el.tools.position().top).to.be.below(-10))
    })

    describe('when moving to next answer while math is open', () => {
        before(() => $el.answer1.focus())
        before(() => $('[data-js="newEquation"]').mousedown())
        before(() => $el.answer1.blur())
        before(u.delay)
        before(() => $el.answer2.focus())
        before(u.delayFor(200))

        it('removes focus style from previous answer', () => expect($el.answer1).to.not.have.class('rich-text-focused'))
        it('adds focus tyle to current answer', () => expect($el.answer2).to.have.class('rich-text-focused'))
        it('keeps toolbar visible', () => expect($el.tools.position().top).to.equal(0))
    })

    describe('when trying to insert unsanitized content', () => {
        before(clear)
        before('pasting banned tags', () => {
            $el.answer1
                .trigger(
                    u.pasteEventMock(
                        '<div class="forbidden"><b>paste</b></div><div>bar</div><a href="/">link text</a> ',
                    ),
                )
                .trigger('input')
        })

        it('inserts sanitized content', () => {
            expect(savedValues[1]).to.eql([
                {
                    answerHTML: 'paste<br />bar<br />link text',
                    answerText: 'paste\nbar\nlink text',
                    imageCount: 0,
                },
            ])
        })
    })

    describe('when trying to drag unsanitized content', () => {
        before('dropping banned tags', () => {
            $el.answer1.html('<div class="forbidden"><b>drop</b></div><div>bar</div><a href="/">link text</a> ')
            $el.answer1.trigger('drop')
            $el.answer1.trigger('input')
        })
        before(u.delayFor(150))

        it('drops sanitized content', () => {
            expect($el.answer1).to.have.html('drop<br>bar<br>link text ')
            expect(savedValues[0]).to.eql([
                {
                    answerHTML: 'drop<br />bar<br />link text',
                    answerText: 'drop\nbar\nlink text',
                    imageCount: 0,
                },
                {
                    answerHTML: 'drop<br />bar<br />link text',
                    answerText: 'drop\nbar\nlink text',
                    imageCount: 0,
                },
            ])
        })
    })

    describe('when entering only white space', () => {
        before(clear)
        before('clear answer and open equation', () => {
            $el.answer1.focus()
        })
        before(() => $('[data-js="newEquation"]').mousedown())
        before('type', () => $el.latexField.val('\\\\'))
        before(u.delayFor(600))
        before(() => {
            $el.equationFieldTextArea.trigger({ type: 'keydown', keyCode: 27 })
        })
        it('trims equations containing only spaces', () => {
            expect(savedValues[0]).to.eql([
                { answerHTML: '', answerText: '', imageCount: 0 },
                { answerHTML: '', answerText: '', imageCount: 0 },
            ])
        })
    })

    describe('when typing white space answers', () => {
        before(clear)

        it('sanitizes different answers', () => {
            $el.answer1.html('<img alt src="/math.svg?latex=" /><br />').trigger('input')
            $el.answer1.html('<img alt src="/math.svg?latex=" /><br /><br />').trigger('input')
            $el.answer1.html('<img alt src="/math.svg?latex=" /><br /><br /><br />').trigger('input')
            $el.answer1
                .html('<img alt src="/math.svg?latex=" /><img alt src="/math.svg?latex=" /><br />')
                .trigger('input')
            $el.answer1.html('<br /><img alt src="/math.svg?latex=" /><br />').trigger('input')
            $el.answer1.html('<img alt />').trigger('input')
            expect(savedValues[0]).to.eql([
                { answerHTML: '', answerText: '', imageCount: 0 },
                { answerHTML: '', answerText: '', imageCount: 0 },
                { answerHTML: '', answerText: '', imageCount: 0 },
                { answerHTML: '', answerText: '', imageCount: 0 },
                { answerHTML: '', answerText: '', imageCount: 0 },
                { answerHTML: '', answerText: '', imageCount: 0 },
            ])
        })
    })

    describe('when typing invalid formula to latex field', () => {
        before(clear)
        before(() => $('[data-js="newEquation"]').mousedown())
        before('type', () => $el.latexField.val('x\\'))
        before(u.delayFor(600))
        before(() => {
            $el.equationFieldTextArea.trigger({ type: 'keydown', keyCode: 27 })
        })
        it('will not save error text', () => {
            expect(savedValues[0]).to.eql([
                { answerHTML: '', answerText: '', imageCount: +0 },
                { answerHTML: '', answerText: '', imageCount: +0 },
                {
                    answerHTML: '<img alt="x\\ " src="/math.svg?latex=x%5C%20" />',
                    answerText: '',
                    imageCount: +0,
                },
            ])
        })
    })

    describe('when typing math ending to backslash and space', () => {
        before(defaults)
        before('focus', () => $el.answer1.focus())
        before(() => $('[data-js="newEquation"]').mousedown())
        before('type', () => $el.latexField.val('x\\ '))
        before(u.delayFor(600))
        before(() => {
            $el.equationFieldTextArea.trigger({ type: 'keydown', keyCode: 27 })
        })
        before(() => $firstAnswerMath().trigger({ type: 'click', which: 1 }))

        it("won't trim tailing space", () => {
            expect($el.latexField.val()).to.equal('x\\ ')
            expect($el.renderError).to.have.text('')
        })
    })

    describe('when rendering all supported characters and latex commands', () => {
        before('insert symbols and commands', (done) => {
            const $customMq = $('<div class="customMq">')
            $('body').prepend($customMq)
            const mqInstance = window.MathQuill.getInterface(2).MathField($('.mathQuillTests').get(0))
            const chars = specialCharacters.map((charGroup) =>
                charGroup.characters.map((y) => y.latexCommand || y.character),
            )
            const latexes = latexCommands
                .map((latexCommand) => latexCommand.label || latexCommand.action)
                .filter((x) => x)
            const scandicChars = 'åöäÅÖÄ'
            $('.unicodeTests').html(
                specialCharacters.map((x) => x.characters.map((x) => x.character).join('')).join('<br>'),
            )
            mqInstance.latex(`${chars.map((x) => x.join(' ')).join(' ')} ${latexes.join(' ')} ${scandicChars}`)
            $('.mathJaxClientSideTests img').prop({
                src: getSvg(mqInstance.latex()),
            })
            $('.mathJaxTests').append(`<img src="/math.svg?latex=${encodeURIComponent(mqInstance.latex())}" />`)
            $('.mathJaxTests img').get(0).onload = () => {
                done()
            }
        })

        it('renders unicode characters correctly', () => {
            expect($('.unicodeTests').text()).to.equal(
                '°·×±∞²³½⅓π‰αβΓγΔδεζηθϑικΛλµνΞξ∏ρ∑στΥυΦФχΨψΩω∂φ≠≈≤≥<>∼≡≢∘…∝∢|‖⇌⇅∠↑↗↘↓↔⊥→⇒⇔∈ℤℝ∃∀ℕℚ∩∪∖⊂⊄∉∅∧∨¬∇',
            )
        })

        it('renders mathquill correctly', () => {
            expect($('.mathQuillTests').text()).to.equal(
                '°·×±∞2312​13​π‰αβΓγΔδεζηθϑικΛλμνΞξΠρΣστϒυΦϕχΨψΩω∂φ≠≈≤≥<>~≡≢∘…∝∢∣∥⇅⇌∠↑↗↘↓↔⊥→⇒⇔∈ZℤRℝ∃∀NℕQℚ∩∪∖⊂⊄∉∅∧∨¬∇' +
                    '√XxXXX​∫XX​limX​XXsincostan|X|[X]]X]{XXXXXXXX​(X(XX)X√XxX​X∑X/XX​limx→∞​XXijk(X)]X[[X[XX​XXXXXX)XX​TåöäÅÖÄ',
            )
        })

        it('renders mathjax correctly', () => {
            expect($('.mathJaxTests img').width()).to.be.greaterThan(50)
        })
        it('renders clientside mathjax correctly', () => {
            expect($('.mathJaxClientSideTests img').width()).to.be.greaterThan(50)
        })
    })
})
