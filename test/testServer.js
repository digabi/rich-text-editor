/* eslint-disable no-console */
import express from 'express'
import * as mathSvg from '../server/mathSvg'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackTestConfig from '../webpack.test.config'

const app = express()
app.use(express.static(`${__dirname}/..`))
app.use(webpackMiddleware(webpack(webpackTestConfig({}, { mode: 'development' })), { publicPath: '/' }))
app.get('/math.svg', mathSvg.mathSvgResponse)
app.use('/screenshot', express.static(`${__dirname}/screenshot`))

module.exports = app
