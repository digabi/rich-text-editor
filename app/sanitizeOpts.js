module.exports = {
    allowedTags: [
        'div',
        'img',
        'br'
    ],
    allowedAttributes: {
        img: ['src', 'alt']
    },
    allowedSchemes: ['data'],
    exclusiveFilter: function(frame) { return frame.attribs['data-js'] === 'mathEditor' }
}
