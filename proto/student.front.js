const answer = document.getElementById('answer1')
makeRichText(answer, {
    screenshot: {
        saver: ({data}) =>
            new Promise(resolve => {
                const reader = new FileReader()
                reader.onload = evt => resolve(evt.target.result)
                reader.readAsDataURL(data)
            }),
        limit: 10
    },
    baseUrl: ''
})
answer.focus()

const trackError = (e = {}) => {
    const category = 'JavaScript error'
    const action = e.message
    const label = e.filename + ':' + e.lineno
    ga('send', 'event', category, action, label)
}

if (window.addEventListener) {
    window.addEventListener('error', trackError, false)
} else if (window.attachEvent) {
    window.attachEvent('onerror', trackError)
} else {
    window.onerror = trackError
}
const $tools = $('[data-js="tools"]')
const events = {
    typeLatex: 0,
    typeMathquill: 0,
    clickChar: 0,
    clickLatex: 0
}
let hasEvents = false
$tools.on('mousedown', '[data-js="expandCollapseCharacters"]', () => {
    ga('send', 'event', 'toolbar', 'toggle', ($tools.hasClass('rich-text-editor-characters-expanded') ? 'expand' : 'collapse'))
})
$('[data-js="mathToolbar"]').on('mousedown', 'button', e => {
    events.clickLatex++
    hasEvents = true
    ga('send', 'event', 'toolbar', 'latex', e.currentTarget.dataset.latexcommand)
})
$('[data-js="charactersList"]').on('mousedown', 'button', e => {
    events.clickChar++
    hasEvents = true
    ga('send', 'event', 'toolbar', 'character', e.currentTarget.innerText)
})
$('[data-js="latexField"]').on('input paste', () => {
    events.typeLatex++
    hasEvents = true
})
$('[data-js="equationField"]').on('input', '.mq-textarea textarea', () => {
    events.typeMathquill++
    hasEvents = true
})
$(answer).on('mathfocus', e => {
    if (!e.hasFocus && hasEvents) {
        hasEvents = false
        ga('send', 'event', 'completeMath', $('[data-js="latexField"]').val(), {
            metric1: events.typeLatex,
            metric2: events.typeMathquill,
            metric3: events.clickChar,
            metric4: events.clickLatex,
        })
        events.typeLatex = 0
        events.typeMathquill = 0
        events.clickChar = 0
        events.clickLatex = 0
    }
})
