export const sanitizeOpts = {
    allowedTags: ['img', 'br'],
    allowedAttributes: {
        img: ['src', 'alt'],
    },
    allowedSchemes: ['data'],
    allowedSchemesAppliedToAttributes: ['src'],
    exclusiveFilter: (frame) => frame.attribs['data-js'] === 'mathEditor',
}
