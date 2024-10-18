/* eslint-disable no-console */
import express from 'express'
import * as mathSvg from './server/mathSvg'
import * as http from 'node:http'

const app = express()
app.get('/', (_, res) => res.send())
app.get('/math.svg', mathSvg.mathSvgResponse)

const port = process.env.PORT || 5111
const server = http.createServer(app).listen(port)
console.log(`Server started at port ${port}`)
