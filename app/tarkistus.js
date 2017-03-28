let markers = {}
let timestamp = null
const $answer = $('.answer')
$.get('/load', data => {
    if(!data)
        return
    timestamp = data.timestamp
    $answer.html(data.html)
        .find('.result')
        .each((i, elem) => $(elem).prop('id', i))
        .wrap('<div class="resultWrapper">')
    $.get('/loadMarkers', data => {
        if(data.timestamp === timestamp) {
            Object.keys(data.markers).forEach(key => {
                data.markers[key].forEach(marker => {
                    addMarker($answer.find('#' + key), marker)
                })
            })
        }
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

