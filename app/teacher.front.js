const $ = require('jquery')
const Bacon = require('baconjs')
let markers = {}
let timestamp = null
const $answer = $('.answer')
const sampleAnswer = require('./sampleAnswer')
const locales = {
    FI: require('./FI'),
    SV: require('./SV')
}
const l = locales[window.locale].editor

$(document).keypress(e => {
    if (e.ctrlKey && !e.altKey && !e.shiftKey && e.key === 'e') {
        e.preventDefault()
        updateAnswer('<div>Esimerkki:</div>' + latexToImg(sampleAnswer) + '<div>Esimerkki 2:</div>' + latexToImg(sampleAnswer))
    }
})

$.when(
    $.get('/load'),
    $.get('/loadMarkers')
).done(([answer], [markers]) => {
    if (!answer)
        return
    timestamp = answer.timestamp
    updateAnswer(answer.html)
    if (markers.timestamp !== timestamp)
        return
    Object.keys(markers.markers).forEach(key => {
        markers.markers[key].forEach(marker => {
            restoreRectangle($answer.find('#' + key), marker)
        })
    })
})
function updateAnswer(html) {
    $answer.html(html)
        .find('.result')
        .each((i, elem) => $(elem).prop('id', i))
        .wrap('<div class="resultWrapper">')
}
let mouseDownPos = null
let $rectangle = null
$answer.on('mousedown', '.result', e => {
    e.preventDefault()
    mouseDownPos = point(e)
    $rectangle = $('<div class="rectangle">')
    $(e.target).after($rectangle)
}).on('mousemove', '.result', e => {
    e.preventDefault()
    if (e.buttons === 0) {
        if ($rectangle) onEnd(e)
    } else {
        setPos($rectangle, mouseDownPos, point(e))
    }
}).on('mouseup', '.result', e => {
    e.preventDefault()
    onEnd(e)
})

$('.save').click(() => {
    $.ajax({
        type: 'POST',
        url: '/saveMarkers',
        data: JSON.stringify({timestamp, markers}),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8'
    })
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
function restoreRectangle($img, pos) {
    const $rectangle = $('<div class="rectangle">').css(pos)
    $img.after($rectangle)
    savePos($img, pos)
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
    return '<img class="result" src="/math.svg?latex=' + encodeURIComponent(latex) + '"/>'
}
