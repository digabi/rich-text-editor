#!/usr/bin/env node
const server = require('./server')
const serverInfo = server.listen(0, () => {
    const spawn = require('child_process').spawn
    const mochaPhantomjs = spawn('mocha-phantomjs',  [`http://localhost:${serverInfo.address().port}/tests.html`])
    mochaPhantomjs.stdout.pipe(process.stdout)
    mochaPhantomjs.on('close', code => {
        process.exit(code)
    })
    mochaPhantomjs.on('error', err => {
        console.log(err)
        process.exit(1)
    })
    console.log('Server started at localhost:' + serverInfo.address().port)
})
