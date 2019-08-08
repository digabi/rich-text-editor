/* global makeRichText */
import $ from 'jquery'
import { makeRichText } from '../src/rich-text-editor'
import * as updateMath from './updateMath'
updateMath.init()
const answer = document.getElementById('answer1')
makeRichText(answer, {
    screenshot: {
        saver: ({ data }) =>
            new Promise(resolve => {
                const reader = new FileReader()
                reader.onload = evt => resolve(evt.target.result)
                reader.readAsDataURL(data)
            }),
        limit: 10
    },
    baseUrl: '',
    updateMathImg: ($img, latex) => {
        updateMath.updateMath(latex, svg => {
            $img.prop({
                src: svg,
                alt: latex
            })
            $img.closest('[data-js="answer"]').trigger('input')
        })
    }
})
answer.focus()

$(answer).on('keypress', e => {
    if (e.ctrlKey && !e.altKey && !e.shiftKey && e.key === 's') {
        e.preventDefault()
        copyLatexToClipboard()
    }
})
$('.toggleInstructions').click(e => {
    e.preventDefault()
    $('.instructions').toggleClass('hide')
})

function copyLatexToClipboard() {
    const latex = $('[data-js="latexField"]').val()
    const escapedLatex = '\\\\(' + latex.replace(/\\/g, '\\\\') + '\\\\)'
    $('#clipboardContent')
        .removeAttr('disabled')
        .val(escapedLatex)
        .select()
    document.execCommand('copy')
    $('#clipboardContent').attr('disabled', true)
}

$('#copy').on('click', e => {
    e.preventDefault()
    copyLatexToClipboard()
})
