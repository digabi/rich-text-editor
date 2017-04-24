const sanitizeHtml = require('sanitize-html')
const sanitizeOpts = require('./sanitizeOpts')
const loadingImg = require('./loadingImg')
const equationImageSelector = 'img[src^="/math.svg"]'

const SCREENSHOT_LIMIT_ERROR = new Bacon.Error('Screenshot limit reached!')
module.exports = {isKey, isCtrlKey, insertToTextAreaAtCursor, persistInlineImages, sanitize, sanitizeContent, setCursorAfter, equationImageSelector, totalImageCount, SCREENSHOT_LIMIT_ERROR}


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
    const nextSibling = img.nextSibling && img.nextSibling.tagName === 'BR' ? img.nextSibling : img
    range.setStart(nextSibling, 0)
    range.setEnd(nextSibling, 0)
    const sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
}

function markAndGetInlineImages($editor) {
    const images = $editor.find('img[src^="data"]').toArray()
        .map((el, index) => Object.assign(decodeBase64Image(el.getAttribute('src')), {
            $el: $(el)
        }))
    images.filter(({type}) => type !== 'image/png').forEach(({$el}) => $el.remove())
    const pngImages = images.filter(({type}) => type === 'image/png')
    pngImages.forEach(({$el}) => $el.attr('src', loadingImg))
    return pngImages
}

function existingScreenshotCount($editor) {
    const imageCount = $editor.find('img').length
    const equationCount = $editor.find(equationImageSelector).length
    return imageCount - equationCount
}

function checkForImageLimit($editor, imageData, limit) {
    return Bacon.once(existingScreenshotCount($editor) > limit ? new Bacon.Error() : imageData)
}

function persistInlineImages($editor, screenshotSaver, screenshotCountLimit, onValueChanged) {
    Bacon.combineAsArray(markAndGetInlineImages($editor)
        .map(data => checkForImageLimit($editor, data, screenshotCountLimit)
            .doError(() => onValueChanged(SCREENSHOT_LIMIT_ERROR))
            .flatMapLatest(() => Bacon.fromPromise(screenshotSaver(data)))
            .doAction(screenShotUrl => data.$el.attr('src', screenShotUrl))
            .doError(() => data.$el.remove()))
    ).onValue(k => $editor.trigger('input'))
}

function totalImageCount($answer, clipboardDataAsHtml) {
    return existingScreenshotCount($answer) + existingScreenshotCount($(`<div>${clipboardDataAsHtml}</div>`))
}
