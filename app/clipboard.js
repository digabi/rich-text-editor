const loadingImg = require('./loadingImg')
const u = require('./util')
const Bacon = require('baconjs')

module.exports = {
    onPaste
}

const SCREENSHOT_LIMIT_ERROR = () => new Bacon.Error('Screenshot limit reached!')
const fileTypes = ['image/png', 'image/jpeg']

function onPaste(e, saver, onValueChanged, limit) {
    const clipboardData = e.originalEvent.clipboardData
    const file = clipboardData.items && clipboardData.items[0].getAsFile()
    if (file) {
        onPasteBlob(e, file, saver, $(e.currentTarget), onValueChanged, limit)
    } else {
        const clipboardDataAsHtml = clipboardData.getData('text/html')
        if (clipboardDataAsHtml) onPasteHtml(e, $(e.currentTarget), clipboardDataAsHtml, limit, saver, onValueChanged)
        else onLegacyPasteImage($(e.currentTarget), saver, limit, onValueChanged)
    }
}

function onPasteBlob(event, file, saver, $answer, onValueChanged, limit) {
    event.preventDefault()
    if (fileTypes.indexOf(file.type) >= 0) {
        if (u.existingScreenshotCount($answer) + 1 <= limit) {
            saver({data: file, type: file.type, id: String(new Date().getTime())}).then(screenshotUrl => {
                const img = `<img src="${screenshotUrl}"/>`
                window.document.execCommand('insertHTML', false, img)
            })
        } else {
            onValueChanged(SCREENSHOT_LIMIT_ERROR())
        }
    }
}

function onPasteHtml(event, $answer, clipboardDataAsHtml, limit, saver, onValueChanged) {
    event.preventDefault()
    if (totalImageCount($answer, clipboardDataAsHtml) <= limit) {
        window.document.execCommand('insertHTML', false, u.sanitize(clipboardDataAsHtml))
        persistInlineImages($answer, saver, limit, onValueChanged)
    } else {
        onValueChanged(SCREENSHOT_LIMIT_ERROR())
    }
}

function onLegacyPasteImage($editor, saver, limit, onValueChanged) {
    persistInlineImages($editor, saver, limit, onValueChanged)
}


function checkForImageLimit($editor, imageData, limit) {
    return Bacon.once(u.existingScreenshotCount($editor) > limit ? new Bacon.Error() : imageData)
}

function persistInlineImages($editor, screenshotSaver, screenshotCountLimit, onValueChanged) {
    setTimeout(() => Bacon.combineAsArray(markAndGetInlineImages($editor)
        .map(data => checkForImageLimit($editor, data, screenshotCountLimit)
            .doError(() => onValueChanged(SCREENSHOT_LIMIT_ERROR()))
            .flatMapLatest(() => Bacon.fromPromise(screenshotSaver(data)))
            .doAction(screenShotUrl => data.$el.attr('src', screenShotUrl))
            .doError(() => data.$el.remove()))
    ).onValue(() => $editor.trigger('input')), 0)
}

function totalImageCount($answer, clipboardDataAsHtml) {
    return u.existingScreenshotCount($answer) + u.existingScreenshotCount($(`<div>${clipboardDataAsHtml}</div>`))
}

function markAndGetInlineImages($editor) {
    const images = $editor.find('img[src^="data"]').toArray()
        .map(el => Object.assign(decodeBase64Image(el.getAttribute('src')), {
            $el: $(el)
        }))
    images.filter(({type}) => fileTypes.indexOf(type) === -1 && type !== 'image/svg+xml').forEach(({$el}) => $el.remove())
    const pngImages = images.filter(({type}) => fileTypes.indexOf(type) >=0 )
    pngImages.forEach(({$el}) => $el.attr('src', loadingImg))
    return pngImages
}

function decodeBase64Image(dataString) {
    if (!dataString)
        return null
    const matches = dataString.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)
    if (matches.length !== 3) {
        return null
    }
    return {
        type: matches[1],
        data: new Buffer(matches[2], 'base64')
    }
}
