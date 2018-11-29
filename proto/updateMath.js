/* global MathJax */
import $ from 'jquery'
let math = null
let $result
export const init = () => {
    $result = $('<div class="result">\\({}\\)</div>')
    $('body').append($result)
    MathJax.Hub.Config({
        jax: ['input/TeX', 'output/SVG'],
        extensions: [
            'toMathML.js',
            'tex2jax.js',
            'MathMenu.js',
            'MathZoom.js',
            'fast-preview.js',
            'AssistiveMML.js',
            'a11y/accessibility-menu.js'
        ],
        TeX: {
            extensions: ['AMSmath.js', 'AMSsymbols.js', 'noErrors.js', 'noUndefined.js']
        },
        SVG: { useFontCache: true, useGlobalCache: false, EqnChunk: 1000000, EqnDelay: 0 }
    })
    MathJax.Hub.queue.Push(() => {
        math = MathJax.Hub.getAllJax('MathOutput')[0]
    })
    MathJax.Hub.Queue(function() {
        MathJax.Hub.getAllJax(document.querySelector('.result'))
    })
}

const asBase64Svg = xml => 'data:image/svg+xml;base64,' + window.btoa(xml)

export const updateMath = function(latex, cb) {
    MathJax.Hub.queue.Push(['Text', math, '\\displaystyle{' + latex + '}'])
    MathJax.Hub.Queue(() => {
        const $svg = $result.find('svg')
        if ($svg.length) {
            $svg.attr('xmlns', 'http://www.w3.org/2000/svg')
                .find('use')
                .each(function() {
                    const $use = $(this)
                    if ($use[0].outerHTML.indexOf('xmlns:xlink') === -1) {
                        $use.attr('xmlns:xlink', 'http://www.w3.org/1999/xlink') //add these for safari
                    }
                })
            let svgHtml = $svg.prop('outerHTML')
            svgHtml = svgHtml.replace(' xlink=', ' xmlns:xlink=') //firefox fix
            svgHtml = svgHtml.replace(/ ns\d+:href/gi, ' xlink:href') // Safari xlink ns issue fix
            cb(asBase64Svg(svgHtml))
        } else {
            cb(
                asBase64Svg(`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="17px" height="15px" viewBox="0 0 17 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-241.000000, -219.000000)">
            <g transform="translate(209.000000, 207.000000)">
                <rect x="-1.58632797e-14" y="0" width="80" height="40"></rect>
                <g transform="translate(32.000000, 12.000000)">
                    <polygon id="Combined-Shape" fill="#9B0000" fill-rule="nonzero" points="0 15 8.04006 0 16.08012 15"></polygon>
                    <polygon id="Combined-Shape-path" fill="#FFFFFF" points="7 11 9 11 9 13 7 13"></polygon>
                    <polygon id="Combined-Shape-path" fill="#FFFFFF" points="7 5 9 5 9 10 7 10"></polygon>
                </g>
            </g>
        </g>
    </g>
</svg>`)
            )
        }
    })
}
