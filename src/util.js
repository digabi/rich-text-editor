import $ from 'jquery'
import sanitizeHtml from 'sanitize-html'
import { sanitizeOpts } from './sanitizeOpts'

export const defaults = {
    locale: 'FI',
    screenshotSaver: () => Promise.resolve(''),
    baseUrl: '',
    ignoreSaveObject: false,
    screenshotImageSelector:
        'img[src^="/screenshot/"], img[src^="data:image/png"], img[src^="data:image/gif"], img[src^="data:image/jpeg"]',
    invalidImageSelector: 'img:not(img[src^="data"], img[src^="/math.svg?latex="], img[src^="/screenshot/"])',
    fileTypes: ['image/png', 'image/jpeg'],
    sanitize: defaultSanitize,
    updateMathImg: undefined,
    forceInit: false,
}

const emptyEquationSelector = 'img[src="/math.svg?latex="]'
export const equationImageSelector = `img[src^="/math.svg?latex="]:not(${emptyEquationSelector}), img[src^="data:image/svg+xml"]`
function convertLinksToRelative(html) {
    return html.replace(new RegExp(document.location.origin, 'g'), '')
}

function isBlockElement(node) {
    return node.nodeName === 'DIV' || node.nodeName === 'P'
}

function stripDivsFromRichTextAnswer(answerContentValue) {
    const parent = document.createElement('div')
    parent.innerHTML = answerContentValue

    do {
        let lastNode
        for (let i = 0; i < parent.childNodes.length; i++) {
            const node = parent.childNodes[i]
            if (isBlockElement(node)) {
                if (lastNode && lastNode.nodeType === Node.TEXT_NODE && /\S/.test(lastNode.textContent))
                    parent.insertBefore(document.createElement('br'), node)
                if (node.lastChild && node.lastChild.nodeName !== 'BR')
                    node.insertBefore(document.createElement('br'), null)
                while (node.childNodes.length) parent.insertBefore(node.firstChild, node)
                parent.removeChild(node)
            }
            lastNode = node
        }
    } while (Array.prototype.some.call(parent.childNodes, (node) => isBlockElement(node)))

    return parent.innerHTML
}

function defaultSanitize(html) {
    return sanitizeHtml(
        stripDivsFromRichTextAnswer(
            sanitizeHtml(convertLinksToRelative(html), { ...sanitizeOpts, allowedTags: ['div', 'p', 'img', 'br'] }),
        ),
        sanitizeOpts,
    )
}
export function insertToTextAreaAtCursor(field, value) {
    const startPos = field.selectionStart
    const endPos = field.selectionEnd
    let oldValue = field.value
    field.value = oldValue.substring(0, startPos) + value + oldValue.substring(endPos, oldValue.length)
    field.selectionStart = field.selectionEnd = startPos + value.length
}

export function isKey(e, key) {
    return preventIfTrue(e, !e.altKey && !e.shiftKey && !e.ctrlKey && keyOrKeyCode(e, key))
}

export function isCtrlKey(e, key) {
    return preventIfTrue(e, !e.altKey && !e.shiftKey && e.ctrlKey && keyOrKeyCode(e, key))
}

function keyOrKeyCode(e, val) {
    return typeof val === 'string' ? e.key === val : e.keyCode === val
}
function preventIfTrue(e, val) {
    if (val) e.preventDefault()
    return val
}

export function sanitizeContent(answerElement, screenshotImageSelector, sanitize) {
    const $answerElement = $(answerElement)
    const $mathEditor = $answerElement.find('[data-js="mathEditor"]')
    const $renderError = $answerElement.find('.render-error')
    $mathEditor.hide()
    $renderError.hide()
    const text = $answerElement.get(0).innerText
    $mathEditor.show()
    $renderError.show()

    const html = sanitize($answerElement.html())

    const answerConsideredEmpty =
        text.trim().length +
            $answerElement.find(equationImageSelector).length +
            $answerElement.find(screenshotImageSelector).length ===
        0

    return {
        answerHTML: answerConsideredEmpty ? '' : stripBrsAndTrimFromEnd(html),
        answerText: stripNewLinesFromStartAndWiteSpacesFromEnd(text),
        imageCount: $(`<div>${html}</div>`).find(screenshotImageSelector).length,
    }
}

function stripBrsAndTrimFromEnd(answerHtml) {
    return answerHtml.replace(/^(\n|<br ?\/?>)*/g, '').replace(/(\s|<br ?\/?>)*$/g, '')
}

function stripNewLinesFromStartAndWiteSpacesFromEnd(answerHtml) {
    return answerHtml.replace(/^(\n)*/g, '').replace(/(\s)*$/g, '')
}

export function setCursorAfter($img) {
    const range = document.createRange()
    const img = $img.get(0)
    range.setStartAfter(img)
    const sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
}

export function scrollIntoView($element) {
    const $window = $(window)
    const windowHeight = $window.height() - 40
    const scroll = windowHeight + $window.scrollTop()
    const pos = $element.offset().top + $element.height()
    if (scroll < pos) {
        $window.scrollTop(pos - windowHeight)
    }
}

export function last(array) {
    if (array.length === 0) return null
    return array[array.length - 1]
}

export function isUndo(e) {
    return preventIfTrue(
        e,
        (!e.altKey && !e.shiftKey && e.ctrlKey && keyOrKeyCode(e, 90)) ||
            (!e.altKey && !e.shiftKey && e.metaKey && keyOrKeyCode(e, 90)),
    )
}

export function isRedo(e) {
    return preventIfTrue(
        e,
        (!e.altKey && !e.shiftKey && e.ctrlKey && keyOrKeyCode(e, 89)) ||
            (!e.altKey && e.shiftKey && e.metaKey && keyOrKeyCode(e, 90)),
    )
}
