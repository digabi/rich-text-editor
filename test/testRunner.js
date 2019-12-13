#!/usr/bin/env node
require('ts-node').register()

/* eslint-disable no-console */
const server = require('./testServer')
const serverInfo = server.listen(0, () => {
    setTimeout(() => {
        console.log('Server started at localhost:' + serverInfo.address().port)
        const spawn = require('child_process').spawn
        const mochaChrome = spawn('mocha-chrome', [`http://localhost:${serverInfo.address().port}/test/tests.html`])
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
