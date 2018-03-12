#!/usr/bin/env node
/* eslint-disable no-console */
const server = require('./server')
const interfaceIP = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'
const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 5000
server.listen(port, interfaceIP, () => console.log('Server started at localhost:' + port))
