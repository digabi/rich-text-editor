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
    metric1: 0, //typeLatex
    metric2: 0, //typeMathquill
    metric3: 0, //clickChar
    metric4: 0 //clickLatex
}
let hasEvents = false
$tools.on('mousedown', '[data-js="expandCollapseCharacters"]', () => {
    ga('send', 'event', 'toolbar', 'toggle', ($tools.hasClass('rich-text-editor-characters-expanded') ? 'expand' : 'collapse'))
})
$('[data-js="mathToolbar"]').on('mousedown', 'button', e => {
    events.metric4++
    hasEvents = true
    ga('send', 'event', 'toolbar', 'latex', e.currentTarget.dataset.latexcommand)
})
$('[data-js="charactersList"]').on('mousedown', 'button', e => {
    events.metric3++
    hasEvents = true
    ga('send', 'event', 'toolbar', 'character', e.currentTarget.innerText)
})
$('[data-js="latexField"]').on('input paste', () => {
    events.metric1++
    hasEvents = true
})
$('[data-js="equationField"]').on('input', '.mq-textarea textarea', () => {
    events.metric2++
    hasEvents = true
})
$('[data-js="newEquation"]').on('mousedown', () => ga('send', 'event', 'mathEditor', 'open', 'button'))
$(answer).on('mathfocus', e => {
    if (!e.hasFocus && hasEvents) {
        events.dimension1 = $('[data-js="latexField"]').val()
        ga('send', 'event', 'mathEditor', 'close', events)
        hasEvents = false
        events.metric1 = 0
        events.metric2 = 0
        events.metric3 = 0
        events.metric4 = 0
    }
}).on('keyup', e => {
    if(!e.altKey && !e.shiftKey && e.ctrlKey && e.keyCode === 69) {
        ga('send', 'event', 'mathEditor', 'open', 'shortcut')
    }
})
