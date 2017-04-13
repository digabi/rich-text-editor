module.exports = {
    allowedTags: [
        'div',
        'img',
        'br'
    ],
    allowedAttributes: {
        img: ['src', 'alt']
    },
    allowedSchemes: ['data', 'http', 'https'],
    exclusiveFilter: function(frame) { return frame.attribs['data-js'] === 'mathEditor' }
}
