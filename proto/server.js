/* eslint-disable no-console */
import express from 'express'
import bodyParser from 'body-parser'
import * as mathSvg from '../server/mathSvg'
import * as fs from 'fs'
import morgan from 'morgan'
import { ncp } from 'ncp'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config'

const app = express()

app.use(morgan('short'))

process.on('uncaughtException', function(err) {
    console.log('Uncaught exception: ', err.stack)
    process.exit(1)
})

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

let generateSite = process.env.GENERATE_SITE
const siteRoot = __dirname + '/../site'

if (generateSite) {
    if (!fs.existsSync(siteRoot)) {
        fs.mkdirSync(siteRoot)
    }
}
function createDirsIfNeeded(root, path) {
    path.split('/').forEach(folder => {
        root = root + '/' + folder
        if (!fs.existsSync(root)) fs.mkdirSync(root)
    })
}

if (generateSite) {
    ncp(__dirname + '/../public', siteRoot, () => {})
} else {
    app.use(express.static(__dirname + '/../public'))
    app.use(express.static(__dirname + '/../test'))
}

const devModules = ['chai', 'chai-jquery', 'mocha', 'web-console-reporter']

const prodModules = ['jquery', 'baconjs', 'mathjax', '@digabi/mathquill']

function sourcePath(name) {
    return __dirname + '/../node_modules/' + name
}

devModules.forEach(name => {
    if (!generateSite) {
        app.use('/' + name, express.static(sourcePath(name)))
    }
})

prodModules.forEach(name => {
    if (generateSite) {
        ncp(sourcePath(name), siteRoot + '/' + name, () => {})
    } else {
        app.use('/' + name, express.static(sourcePath(name)))
    }
})

app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }))
app.use(bodyParser.json({ limit: '5mb', strict: false }))
app.get('/math.svg', mathSvg.mathSvgResponse)

if (generateSite) {
    webpack(webpackConfig({}, { mode: 'production' })).run()
} else {
    app.use(webpackMiddleware(webpack(webpackConfig({}, { mode: 'development' })), { publicPath: '/' }))
}

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
    console.log('Request error: ', error.stack)
    res.status(500).end()
})

module.exports = app

function formatDate(date) {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${pad(date.getHours())}:${pad(
        date.getMinutes()
    )}`
}

function pad(num) {
    return (num > 9 ? '' : '0') + num
}
