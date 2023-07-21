#!/usr/bin/env node
require('ts-node').register()

const latexCommands = require('../src/latexCommands').default
const mathSvg = require('../server/mathSvg')
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
            `${__dirname}/../src/latexCommandsWithSvg.js`,
            `export default ${util.inspect(data, { depth: null })}`,
            'utf8',
        )
        return
    })
    .catch((error) => {
        console.error(error)
    })
