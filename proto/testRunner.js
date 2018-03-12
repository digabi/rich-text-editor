#!/usr/bin/env node
/* eslint-disable no-console */
const server = require('./server')
const serverInfo = server.listen(0, () => {
    const spawn = require('child_process').spawn
    const mochaPhantomjs = spawn('mocha-chrome',  [`http://localhost:${serverInfo.address().port}/tests.html`])
    mochaPhantomjs.stdout.pipe(process.stdout)
    mochaPhantomjs.stderr.pipe(process.stderr)
    mochaPhantomjs.on('close', code => {
        process.exit(code)
    })
    mochaPhantomjs.on('error', err => {
        console.log(err)
        process.exit(1)
    })
    console.log('Server started at localhost:' + serverInfo.address().port)
})
