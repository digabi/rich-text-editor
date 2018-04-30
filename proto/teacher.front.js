const $ = require('jquery')
window.markers = {}
const $answer = $('.answer')
const sampleAnswer = require('./sampleAnswer')
const wrapper = '.resultWrapper'

updateAnswer('<div>Esimerkki:</div>' + latexToImg(sampleAnswer) + '<div>Esimerkki 2:</div>' + latexToImg(sampleAnswer)+
'<br>Ja kuvaa<br><img src="/sample_screenshot.jpg">')

function updateAnswer(html) {
    $answer.html(html)
        .find('img')
        .each((i, elem) => $(elem).prop('id', i))
        .wrap('<div class="resultWrapper">')
}
let mouseDownPos = null
let $rectangle = null
let currentResultWrapper = null
$answer.on('mousedown', wrapper, e => {
    e.preventDefault()
    mouseDownPos = point(e)
    $rectangle = $('<div class="rectangle">')
    currentResultWrapper = getResultWrapper(e)
    currentResultWrapper.append($rectangle)
}).on('mousemove', wrapper, e => {
    e.preventDefault()
    if(!areSame(getResultWrapper(e), currentResultWrapper)) {
        return
    }
    if (e.buttons === 0) {
        if ($rectangle) onEnd(e)
    } else {
        setPos($rectangle, mouseDownPos, point(e))
    }
}).on('mouseup', wrapper, e => {
    e.preventDefault()
    onEnd(e)
})

$answer.on('submit', '.description', e => {
    e.preventDefault()
    const $form = $(e.target)
    const value = $form.find('input').val()
    $form.prev().prop('title', value)
    $form.remove()
})
function onEnd(e) {
    let $imgWrapper = getResultWrapper(e)
    savePos($imgWrapper, toCss(mouseDownPos, point(e)))
    $rectangle = null
}

function getResultWrapper(e) {
    return $(e.target).closest('.resultWrapper')
}

function areSame($el1, $el2) {
    return $el1 && $el2 && $el1.get(0) === $el2.get(0)
}
function point(e) {
    return $(e.target).hasClass('rectangle') ? {
        left: e.target.offsetLeft + e.offsetX,
        top: e.target.offsetTop + e.offsetY
    } : {
        left: e.offsetX,
        top: e.offsetY
    }
}
function savePos($imgWrapper, pos) {
    const index = $imgWrapper.find('img').prop('id')
    window.markers[index] = (window.markers[index] || []).concat(pos)
}

function toCss(pos1, pos2) {
    const height = Math.abs(pos2.top - pos1.top)
    const width = Math.abs(pos2.left - pos1.left)
    if(height < 10) {
        return {
            left: Math.min(pos1.left, pos2.left),
            width: Math.abs(pos2.left - pos1.left),
            top: pos1.top - 2,
            height: 4,
        }
    } else if(width < 10) {
        return {
            left: pos1.left - 2,
            width: 5,
            top: Math.min(pos1.top, pos2.top),
            height: Math.abs(pos2.top - pos1.top)
        }
    } else {
        return {
            left: Math.min(pos1.left, pos2.left),
            width: Math.abs(pos2.left - pos1.left),
            top: Math.min(pos1.top, pos2.top),
            height: Math.abs(pos2.top - pos1.top)
        }
    }
}

function setPos($img, pos1, pos2) {
    $img.css(toCss(pos1, pos2))
}
function latexToImg(latex) {
    return '<img src="/math.svg?latex=' + encodeURIComponent(latex) + '"/>'
}
