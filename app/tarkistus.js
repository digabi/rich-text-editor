console.log('tarkistus')
$.get('/load', data => {
    if (!data)
        return
    $('.answer').html(data)
        .find('.result').wrap('<div class="resultWrapper">')
})

$('.answer').on('mousedown', '.result', e => {
    const x = e.offsetX
    const y = e.offsetY
    addMarker(e.target, {x, y})
})

function addMarker(img, pos) {
    const $marker = $('<div class="marker">')
    $marker.css({left: pos.x, top: pos.y})
    $(img).after($marker)
}
