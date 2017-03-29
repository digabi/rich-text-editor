let markers = {}
let timestamp = null
const $answer = $('.answer')
$.when(
    $.get('/load'),
    $.get('/loadMarkers')
).done((load, loadMarkers) => {
    const answer = load[0]
    if (!answer)
        return
    timestamp = answer.timestamp
    $answer.html(answer.html)
        .find('.result')
        .each((i, elem) => $(elem).prop('id', i))
        .wrap('<div class="resultWrapper">')

    const markers = loadMarkers[0]
    if (markers.timestamp !== timestamp)
        return
    Object.keys(markers.markers).forEach(key => {
        markers.markers[key].forEach(marker => {
            addMarker($answer.find('#' + key), marker)
        })
    })
})

$answer.on('mousedown', '.result', e => {
    const left = e.offsetX
    const top = e.offsetY
    addMarker($(e.target), {left, top})
})

function addMarker($img, pos) {
    const index = $img.prop('id')
    markers[index] = (markers[index] || []).concat(pos)
    $img.after($('<div class="marker">').css(pos))
}
$('.save').click(() => {
    $.ajax({
        type:        'POST',
        url:         '/saveMarkers',
        data:        JSON.stringify({timestamp, markers}),
        dataType:    'json',
        contentType: 'application/json; charset=utf-8'
    })
})

