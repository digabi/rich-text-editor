const sanitizeHtml = require('sanitize-html')
const sanitizeOpts = require('./sanitizeOpts')

module.exports = {isKey, isCtrlKey, insertToTextAreaAtCursor, decodeBase64Image, sanitize, sanitizeContent, setCursorAfter}

function sanitize(html) {
    return sanitizeHtml(html, sanitizeOpts)
}
function insertToTextAreaAtCursor(field, value) {
    const startPos = field.selectionStart
    const endPos = field.selectionEnd
    let oldValue = field.value
    field.value = oldValue.substring(0, startPos) + value + oldValue.substring(endPos, oldValue.length)
    field.selectionStart = field.selectionEnd = startPos + value.length
}

function decodeBase64Image(dataString) {
    if (!dataString)
        return null
    const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
    if (matches.length !== 3) {
        return null
    }
    return {
        type: matches[1],
        data: new Buffer(matches[2], 'base64')
    }
}

function isKey(e, key) { return preventIfTrue(e, !e.altKey && !e.shiftKey && !e.ctrlKey  && keyOrKeyCode(e, key))}

function isCtrlKey(e, key) { return preventIfTrue(e, !e.altKey && !e.shiftKey && e.ctrlKey && keyOrKeyCode(e, key))}

function keyOrKeyCode(e, val) { return typeof val === 'string' ? e.key === val : e.keyCode === val }
function preventIfTrue(e, val) {
    if(val) e.preventDefault()
    return val
}

function sanitizeContent(answerElement) {
    const $answerElement = $(answerElement)
    const $mathEditor = $answerElement.find('[data-js="mathEditor"]')
    $mathEditor.hide()
    const text = $answerElement.text()
    $mathEditor.show()

    const html = sanitize($answerElement.html())

    return { answerHTML: html, answerText: text }
}

function setCursorAfter($img) {
    const range = document.createRange()
    const img = $img.get(0)
    const nextSibling = img.nextSibling.tagName === 'DIV' ? img : img.nextSibling
    range.setStart(nextSibling, 0)
    range.setEnd(nextSibling, 0)
    const sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
}
