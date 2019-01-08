export const allowedTags = ['img', 'br']
export const allowedAttributes = {
    img: ['src', 'alt']
}
export const allowedSchemes = ['data']
export const exclusiveFilter = frame => frame.attribs['data-js'] === 'mathEditor'
