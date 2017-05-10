#!/usr/bin/env node
const server = require('./server')
const serverInfo = server.listen(0, () => {
    const spawn = require('child_process').spawn
    const ls = spawn('mocha-phantomjs',  [`http://localhost:${serverInfo.address().port}/tests.html`])
    let response = []
    ls.stdout.on('data', (data) => {
        response.push(data.toString())
    })
    ls.on('close', code => {
        console.log(response.join(''))
        process.exit(code)
    })
    console.log('Server started at localhost:' + serverInfo.address().port)
})
