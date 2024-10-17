const mjAPI = require('mathjax-node')
const MAX_NESTING_LEVEL = 20
const MAX_LENGTH = 5000
const nestedContextStartedRegexes = ['\\left', '{', '\\begin']
const nestedContextEndingRegexes = ['\\right', '}', '\\end']

const errorResponse = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="305px" height="20px" viewBox="0 0 305 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>Group 2</title>
    <defs></defs>
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-241.000000, -219.000000)">
            <g transform="translate(209.000000, 207.000000)">
                <rect x="-1.58632797e-14" y="0" width="80" height="40"></rect>
                <g transform="translate(32.000000, 12.000000)">
                    <polygon id="Combined-Shape" fill="#9B0000" fill-rule="nonzero" points="0 18 8.04006 2 16.08012 18"></polygon>
                    <polygon id="Combined-Shape-path" fill="#FFFFFF" points="7 14 9 14 9 16 7 16"></polygon>
                    <polygon id="Combined-Shape-path" fill="#FFFFFF" points="7 7 9 7 9 12 7 12"></polygon>
                </g>
            </g>
        </g>
    </g>
    <text x="25" y="16" fill="red">Virhe LaTeX-koodissa / Fel i LaTeX-koden</text>
</svg>`

module.exports = { mathSvgResponse, latexToSvg }

mjAPI.config({
  extensions: 'Safe,TeX/mhchem.js',
  MathJax: {
    SVG: {
      font: 'Latin-Modern',
    },
  },
})
mjAPI.start()

function mathSvgResponse(req, res) {
  res.type('svg')
  const latex = req.query.latex
  latexToSvg(latex, (svg) => res.send(svg))
}

function latexIsTooLong(latex) {
  return latex && latex.length > MAX_LENGTH
}

function nestingIsTooDeep(latex) {
  let nestingLevel = 0
  const matches = latex.match(/\\right|\\left|\\begin|\\end|\{|\}/g)
  if (!matches) {
    return false
  }
  for (var matchedString of matches) {
    if (nestedContextStartedRegexes.some((startingRegex) => startingRegex === matchedString)) nestingLevel++
    else if (nestedContextEndingRegexes.some((endingRegex) => endingRegex === matchedString)) nestingLevel--
    if (nestingLevel > MAX_NESTING_LEVEL) return true
  }
  return false
}

function latexToSvg(latex, cb) {
  if (latexIsTooLong(latex) || nestingIsTooDeep(latex)) {
    cb(errorResponse)
    return
  }

  mjAPI.typeset(
    {
      math: latex,
      format: 'TeX', // "inline-TeX", "MathML"
      mml: false,
      svg: true,
      linebreaks: true,
      width: 100,
    },
    (data) => {
      if (data.errors) {
        cb(errorResponse)
      } else {
        cb(data.svg)
      }
    },
  )
}
