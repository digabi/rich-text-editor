const MathJax = require('mathjax')

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

const mathJaxInit = MathJax.init({
  loader: {
    load: ['input/tex-base', 'output/svg', '[tex]/ams', '[tex]/mhchem', 'ui/safe'],
  },
  startup: {
    input: ['tex'],
    output: 'svg',
    typeset: false,
  },
  output: {
    font: 'mathjax-modern'
  },
  tex: {
    packages: ['base', 'ams', 'mhchem'],
    formatError(_jax, err) {
      throw err
    },
  },
  options: {
    compileError(_doc, _math, err) {
      throw err
    },
    typesetError(_doc, _math, err) {
      throw err
    },
    safeOptions: {
      allow: { URLs: 'none', classes: 'safe', cssIDs: 'safe', styles: 'safe' },
    },
  },
})

module.exports = { mathSvgResponse, latexToSvg }

function mathSvgResponse(req, res) {
  res.type('svg')
  const latex = req.query.latex
  if (latex === undefined) {
    res.sendStatus(400)
    return
  }
  // non-breaking spaces are replaced server side as well to render existing formulas correctly
  const normalizedLatex = latex.replaceAll('\u00A0', '\\ ')
  latexToSvg(normalizedLatex, (svg) => res.send(svg))
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
  const svg = latexToSvgAsync(latex)
  return cb ? void svg.then(cb) : svg
}

async function latexToSvgAsync(latex) {
  if (latexIsTooLong(latex) || nestingIsTooDeep(latex)) {
    return errorResponse
  }

  try {
    await mathJaxInit
    const adaptor = MathJax.startup.adaptor

    const node = await MathJax.tex2svgPromise(latex, { display: true, em: 16, ex: 8, containerWidth: 8 * 100 })
    return adaptor.serializeXML(adaptor.tags(node, 'svg')[0])
  } catch {
    return errorResponse
  }
}
