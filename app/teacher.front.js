let markers = {}
let timestamp = null
const $answer = $('.answer')
$.when(
    $.get('/load'),
    $.get('/loadMarkers')
).done(([answer], [markers]) => {
    if (!answer)
        return
    timestamp = answer.timestamp
    $answer.html(answer.html)
        .find('.result')
        .each((i, elem) => $(elem).prop('id', i))
        .wrap('<div class="resultWrapper">')

    if (markers.timestamp !== timestamp)
        return
    Object.keys(markers.markers).forEach(key => {
        markers.markers[key].forEach(marker => {
            restoreRectangle($answer.find('#' + key), marker)
        })
    })
})

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
        type:        'POST',
        url:         '/saveMarkers',
        data:        JSON.stringify({timestamp, markers}),
        dataType:    'json',
        contentType: 'application/json; charset=utf-8'
    })
})

function onEnd(e) {
    savePos($(e.target), toCss(mouseDownPos, point(e)))
    $rectangle = null
}

function point(e) {
    return {
        left: e.offsetX,
        top:  e.offsetY
    }
}
function restoreRectangle($img, pos) {
    const $rectangle = $('<div class="rectangle">').css(pos)
    $img.after($rectangle)
    savePos($img, pos)
}
function savePos($img, pos) {
    const index = $img.prop('id')
    markers[index] = (markers[index] || []).concat(pos)
}

function toCss(pos1, pos2) {
    return {
        left:   Math.min(pos1.left, pos2.left),
        top:    pos1.top,
        width:  Math.abs(pos2.left - pos1.left),
        height: 3
    }
}

function setPos($img, pos1, pos2) {
    $img.css(toCss(pos1, pos2))
}
