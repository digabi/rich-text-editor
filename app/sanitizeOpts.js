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
    exclusiveFilter: frame => frame.attribs['data-js'] === 'mathEditor'
}
