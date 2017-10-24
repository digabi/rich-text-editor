const $ = require('jquery')
let markers = {}
let timestamp = null
const $answer = $('.answer')
const sampleAnswer = require('./sampleAnswer')
const mathSelector = 'img[src^="/math.svg"]'
const locales = {
    FI: require('../app/FI'),
    SV: require('../app/SV')
}
const l = locales[window.locale].editor

updateAnswer('<div>Esimerkki:</div>' + latexToImg(sampleAnswer) + '<div>Esimerkki 2:</div>' + latexToImg(sampleAnswer))

function updateAnswer(html) {
    $answer.html(html)
        .find(mathSelector)
        .each((i, elem) => $(elem).prop('id', i))
        .wrap('<div class="resultWrapper">')
}
let mouseDownPos = null
let $rectangle = null
$answer.on('mousedown', mathSelector, e => {
    e.preventDefault()
    mouseDownPos = point(e)
    $rectangle = $('<div class="rectangle">')
    $(e.target).after($rectangle)
}).on('mousemove', mathSelector, e => {
    e.preventDefault()
    if (e.buttons === 0) {
        if ($rectangle) onEnd(e)
    } else {
        setPos($rectangle, mouseDownPos, point(e))
    }
}).on('mouseup', mathSelector, e => {
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
    const $form = $('<form class="description"><input type="text"/><button type="submit" class="actionButton">Merkitse</button>')
        .css(point(e))
    let $imgWrapper = $(e.target).parent()
    $rectangle.after($form)
    $form.find('input').focus()
    savePos($imgWrapper, toCss(mouseDownPos, point(e)))
    $rectangle = null
}

function point(e) {
    return {
        left: e.offsetX,
        top: e.offsetY
    }
}
function savePos($imgWrapper, pos) {
    const index = $imgWrapper.prop('id')
    markers[index] = (markers[index] || []).concat(pos)
}

function toCss(pos1, pos2) {
    return {
        left: Math.min(pos1.left, pos2.left),
        top: pos1.top,
        width: Math.abs(pos2.left - pos1.left),
        height: 5
    }
}

function setPos($img, pos1, pos2) {
    $img.css(toCss(pos1, pos2))
}
function latexToImg(latex) {
    return '<img src="/math.svg?latex=' + encodeURIComponent(latex) + '"/>'
}
