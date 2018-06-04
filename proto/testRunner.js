#!/usr/bin/env node
/* eslint-disable no-console */
const server = require('./server')
const serverInfo = server.listen(0, () => {
    setTimeout(() => {
        console.log('Server started at localhost:' + serverInfo.address().port)
        const spawn = require('child_process').spawn
        const mochaChrome = spawn('mocha-chrome', [`http://localhost:${serverInfo.address().port}/tests.html`])
        mochaChrome.stdout.pipe(process.stdout)
        mochaChrome.stderr.pipe(process.stderr)
        mochaChrome.on('close', code => {
            process.exit(code)
        })
        mochaChrome.on('error', err => {
            console.log(err)
            process.exit(1)
        })
    }, 5000)
})
