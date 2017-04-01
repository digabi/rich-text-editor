const mjAPI = require("mathjax-node")

module.exports = {handler}

mjAPI.config({MathJax: {}})
mjAPI.start()

function handler(req, res) {
    mjAPI.typeset({
        math:   req.query.latex,
        format: "TeX", // "inline-TeX", "MathML"
        mml:    false,
        svg:    true,
    }, function(data) {
        if(data.errors) {
            res.type('svg')
            res.send(`<svg xmlns="http://www.w3.org/2000/svg"  
     xmlns:xlink="http://www.w3.org/1999/xlink">
    <text x="10" y="15" fill="red">${data.errors.join('<br>')}</text>
</svg>`)
        } else {
            res.type('svg')
            res.send(data.svg)
        }
    })
}
