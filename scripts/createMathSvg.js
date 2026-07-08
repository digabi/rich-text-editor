#!/usr/bin/env node

const latexCommands = require('../src/latexCommands.ts').default
const mathSvg = require('../server/mathSvg.js')
const fs = require('fs')
const util = require('util')

Promise.all(
  latexCommands.map((o) => {
    if (typeof o === 'string') {
      return Promise.resolve(o)
    }
    return new Promise((resolve) => {
      const latex = o.label ? o.label.replace(/X/g, '\\square') : o.action
      mathSvg.latexToSvg(latex, (svg) =>
        resolve(Object.assign(o, { svg: `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}` })),
      )
    })
  }),
)
  .then((data) => {
    fs.writeFileSync(
      `${__dirname}/../src/latexCommandsWithSvg.ts`,
      `export default ${util.inspect(data, { depth: null })}`,
      'utf8',
    )
    return
  })
  .catch((error) => {
    console.error(error)
  })
