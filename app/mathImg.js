const mjAPI = require("mathjax-node")
const latexCommands = require('./latexCommands')

module.exports = {handler}

mjAPI.config({MathJax: {}})
mjAPI.start()

const cache = {}
latexCommands.map(o => o.label ? o.label.replace(/X/g, '\\square') : o.action)
    .forEach(latex => {
        mjAPI.typeset({
            math: latex,
            format: "TeX", // "inline-TeX", "MathML"
            mml: false,
            svg: true,
        }, function (data) {
            cache[latex] = data.svg
        })
    })

function handler(req, res) {
    res.type('svg')

    if(req.query.latex in cache) {
        res.send(cache[req.query.latex])
    } else {
        mjAPI.typeset({
            math: req.query.latex,
            format: "TeX", // "inline-TeX", "MathML"
            mml: false,
            svg: true,
        }, function (data) {
            if (data.errors) {
                res.send(`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="17px" height="15px" viewBox="0 0 17 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 43.2 (39069) - http://www.bohemiancoding.com/sketch -->
    <title>Group 2</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Kuuntelu-kokelas-painaa-nappia-Copy-16" transform="translate(-241.000000, -219.000000)">
            <g id="Group-2" transform="translate(209.000000, 207.000000)">
                <rect id="Rectangle-21-Copy-4" x="-1.58632797e-14" y="0" width="80" height="40"></rect>
                <g id="virhe-icon" transform="translate(32.000000, 12.000000)">
                    <polygon id="Combined-Shape" fill="#9B0000" fill-rule="nonzero" points="0 15 8.04006 0 16.08012 15"></polygon>
                    <polygon id="Combined-Shape-path" fill="#FFFFFF" points="7 11 9 11 9 13 7 13"></polygon>
                    <polygon id="Combined-Shape-path" fill="#FFFFFF" points="7 5 9 5 9 10 7 10"></polygon>
                </g>
            </g>
        </g>
    </g>
</svg>`)
            } else {
                res.send(data.svg)
            }
        })
    }
}
