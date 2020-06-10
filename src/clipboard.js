import $ from 'jquery'
import loadingImg from './loadingImg'
import * as u from './util'
import { invalidImageSelector } from './util'

const fileTypes = ['image/png', 'image/jpeg']

export function onPaste(e, saver) {
    const clipboardData = e.originalEvent.clipboardData
    const file =
        clipboardData.items &&
        clipboardData.items.length > 0 &&
        clipboardData.items[clipboardData.items.length - 1].getAsFile()
    if (file) {
        onPasteBlob(e, file, saver)
    } else {
        const clipboardDataAsHtml = clipboardData.getData('text/html')
        if (clipboardDataAsHtml) onPasteHtml(e, $(e.currentTarget), clipboardDataAsHtml, saver)
        else onLegacyPasteImage($(e.currentTarget), saver)
    }
}

function onPasteBlob(event, file, saver) {
    event.preventDefault()
    if (fileTypes.indexOf(file.type) >= 0) {
        saver({ data: file, type: file.type, id: String(new Date().getTime()) }).then(screenshotUrl => {
            const img = `<img src="${screenshotUrl}"/>`
            window.document.execCommand('insertHTML', false, img)
        })
    }
}

function onPasteHtml(event, $answer, clipboardDataAsHtml, saver) {
    event.preventDefault()
    window.document.execCommand('insertHTML', false, u.sanitize(clipboardDataAsHtml))
    persistInlineImages($answer, saver)
}

function onLegacyPasteImage($editor, saver) {
    persistInlineImages($editor, saver)
}

export function persistInlineImages($editor, screenshotSaver) {
    setTimeout(
        () =>
            Promise.all(
                markAndGetInlineImagesAndRemoveForbiddenOnes($editor).map(data =>
                    screenshotSaver(data)
                        .then(screenShotUrl => data.$el.attr('src', screenShotUrl))
                        .catch(err => {
                            data.$el.remove()
                            throw err
                        })
                )
            ).then(() => $editor.trigger('input')),
        0
    )
}

function markAndGetInlineImagesAndRemoveForbiddenOnes($editor) {
    $editor.find(invalidImageSelector).remove()
    const images = $editor
        .find('img[src^="data:image/"]')
        .toArray()
        .map(el =>
            Object.assign(decodeBase64Image(el.getAttribute('src')), {
                $el: $(el)
            })
        )
    images
        .filter(({ type }) => fileTypes.indexOf(type) === -1 && type !== 'image/svg+xml')
        .forEach(({ $el }) => $el.remove())
    const pngImages = images.filter(({ type }) => fileTypes.indexOf(type) >= 0)
    pngImages.forEach(({ $el }) => $el.attr('src', loadingImg))
    return pngImages
}

function decodeBase64Image(dataString) {
    if (!dataString) return null
    const matches = dataString.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)
    if (matches.length !== 3) {
        return null
    }
    return {
        type: matches[1],
        data: new Buffer(matches[2], 'base64')
    }
}
