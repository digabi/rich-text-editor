#!/usr/bin/env node
const latexCommands = require('../app/latexCommands')
const mathSvg = require('../server/mathSvg')
const fs = require('fs')
const util = require('util')

Promise.all(latexCommands.map(o => {
    return new Promise((resolve, reject) => {
        const latex = o.label ? o.label.replace(/X/g, '\\square') : o.action
        mathSvg.latexToSvg(latex, svg => resolve(Object.assign(o, {svg: 'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64')})))
    })
})).then(data => {
    fs.writeFileSync('../app/latexCommandsWithSvg.js', 'module.exports = ' + util.inspect(data, {depth:null}), 'utf8')
})

