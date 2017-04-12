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
                res.send(`<svg xmlns="http://www.w3.org/2000/svg"  
     xmlns:xlink="http://www.w3.org/1999/xlink">
    <text x="10" y="15" fill="red">${data.errors.join('<br>')}</text>
</svg>`)
            } else {
                res.send(data.svg)
            }
        })
    }
}
