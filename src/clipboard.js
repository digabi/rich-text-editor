import $ from 'jquery'
import loadingImg from './loadingImg'

export function onPaste(onInput, e, saver, invalidImageSelector, fileTypes, sanitize) {
    const clipboardData = e.originalEvent.clipboardData
    const file =
        clipboardData.items &&
        clipboardData.items.length > 0 &&
        clipboardData.items[clipboardData.items.length - 1].getAsFile()
    if (file) {
        onPasteBlob(e, file, saver, fileTypes)
    } else {
        const clipboardDataAsHtml = clipboardData.getData('text/html')
        if (clipboardDataAsHtml)
            onPasteHtml(
                onInput,
                e,
                $(e.currentTarget),
                clipboardDataAsHtml,
                saver,
                invalidImageSelector,
                fileTypes,
                sanitize,
            )
        else onLegacyPasteImage(onInput, $(e.currentTarget), saver, invalidImageSelector, fileTypes)
    }
}

function onPasteBlob(event, file, saver, fileTypes) {
    event.preventDefault()
    if (fileTypes.indexOf(file.type) >= 0) {
        saver({ data: file, type: file.type })
            .then((screenshotUrl) => {
                const img = `<img src="${screenshotUrl}"/>`
                window.document.execCommand('insertHTML', false, img)
                return
            })
            .catch((error) => {
                console.error(error)
            })
    }
}

function onPasteHtml(onInput, event, $answer, clipboardDataAsHtml, saver, invalidImageSelector, fileTypes, sanitize) {
    event.preventDefault()
    window.document.execCommand('insertHTML', false, sanitize(clipboardDataAsHtml))
    persistInlineImages(onInput, $answer, saver, invalidImageSelector, fileTypes)
}

function onLegacyPasteImage(onInput, $editor, saver, invalidImageSelector, fileTypes) {
    persistInlineImages(onInput, $editor, saver, invalidImageSelector, fileTypes)
}

export function persistInlineImages(onInput, $editor, screenshotSaver, invalidImageSelector, fileTypes) {
    setTimeout(
        () =>
            Promise.all(
                markAndGetInlineImagesAndRemoveForbiddenOnes($editor, invalidImageSelector, fileTypes).map((data) =>
                    screenshotSaver(data)
                        .then((screenShotUrl) => data.el.setAttribute('src', screenShotUrl))
                        .catch((err) => {
                            data.el.remove()
                            throw err
                        }),
                ),
            ).then(() => onInput($editor.get(0))),
        0,
    )
}

function markAndGetInlineImagesAndRemoveForbiddenOnes($editor, invalidImageSelector, fileTypes) {
    $editor.find(invalidImageSelector).remove()
    const images = $editor
        .find('img[src^="data:image/"]')
        .toArray()
        .map((el) => ({ ...decodeBase64Image(el.getAttribute('src')), el }))
    images.filter(isForbiddenInlineImage).forEach(({ el }) => el.remove())
    const pngImages = images.filter(({ type }) => fileTypes.includes(type))
    pngImages.forEach(({ el }) => el.setAttribute('src', loadingImg))
    return pngImages

    function isForbiddenInlineImage({ type, el }) {
        const isInlineMathSvg = type === 'image/svg+xml' && el.alt
        if (isInlineMathSvg) {
            return false
        }
        return !fileTypes.includes(type)
    }
}

function decodeBase64Image(dataString) {
    if (!dataString) return null
    const matches = dataString.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)
    if (matches.length !== 3) {
        return null
    }
    const byteCharacters = atob(matches[2])
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    return {
        type: matches[1],
        data: new Uint8Array(byteNumbers),
    }
}
