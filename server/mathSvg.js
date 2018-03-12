const mjAPI = require('mathjax-node')

module.exports = {mathSvgResponse, latexToSvg}

mjAPI.config({MathJax: {}})
mjAPI.start()

function mathSvgResponse(req, res) {
    res.type('svg')
    const latex = req.query.latex
    latexToSvg(latex, svg => res.send(svg))
}

function latexToSvg(latex, cb) {
    mjAPI.typeset({
        math: latex,
        format: 'TeX', // "inline-TeX", "MathML"
        mml: false,
        svg: true,
        linebreaks: true,
        width: 100
    }, function (data) {
        if (data.errors) {
            cb(`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="17px" height="15px" viewBox="0 0 17 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>Group 2</title>
    <defs></defs>
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
        } else {
            cb(data.svg)
        }
    })
}
