#!/usr/bin/env node
require('ts-node').register()

/* eslint-disable no-console */
const server = require('./testServer')
const port = process.env.PORT || 5000
const s = server.listen(port, '0.0.0.0', () => console.log('Server started at :' + '0.0.0.0' + ':' + s.address().port))
