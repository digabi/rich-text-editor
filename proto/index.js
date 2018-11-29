#!/usr/bin/env node
require('ts-node').register()

/* eslint-disable no-console */
const server = require('./server')
const interfaceIP = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'
const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 5000
const s = server.listen(port, interfaceIP, () =>
    console.log('Server started at :' + interfaceIP + ':' + s.address().port)
)
