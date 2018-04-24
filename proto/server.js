/* eslint-disable no-console */
const express = require('express')
const bodyParser = require('body-parser')
const babelifyMiddleware = require('express-babelify-middleware')
const browserify = require('browserify')
const studentHtml = require('./student.html')
const censorHtml = require('./censor.html')
const mathSvg = require('../server/mathSvg')
const startedAt = new Date()
const FI = require('../app/FI')
const SV = require('../app/SV')
const fs = require('fs')
const studentHtmlFI = studentHtml((Object.assign({startedAt: formatDate(startedAt), locale: 'FI'}, FI.editor)))
const censorHtmlFI = censorHtml((Object.assign({startedAt: formatDate(startedAt), locale: 'FI'}, FI.editor)))
const studentHtmlSV = studentHtml((Object.assign({startedAt: formatDate(startedAt), locale: 'SV'}, SV.editor)))
const teacherHtml = require('./teacher.html')
const teacherHtmlFI = teacherHtml(Object.assign({startedAt: formatDate(startedAt), locale: 'FI'}, FI.annotating))
const teacherHtmlSV = teacherHtml(Object.assign({startedAt: formatDate(startedAt), locale: 'SV'}, SV.annotating))
const app = express()
const morgan = require('morgan')
const ncp = require('ncp').ncp

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

if(generateSite) {
    if (!fs.existsSync(siteRoot)) {
        fs.mkdirSync(siteRoot)
    }
}
function createDirsIfNeeded(root, path) {
    path.split('/').forEach(folder => {
        root = root + '/' + folder
        if(!fs.existsSync(root))
            fs.mkdirSync(root)
    })
}

function definePath(path, content) {
    if(generateSite) {
        createDirsIfNeeded(siteRoot, path)
        fs.writeFileSync(siteRoot + path + '/index.html', content, 'utf8')
    } else {
        app.get(path, (req, res) => res.send(content))
    }
}

function defineFile(url, relativePath) {
    if(generateSite) {
        browserify(__dirname + relativePath)
            .transform('babelify', {presets: ['env']})
            .bundle()
            .pipe(fs.createWriteStream(siteRoot + url))
    } else {
        app.use(url, babelifyMiddleware(__dirname + relativePath))
    }
}
defineFile('/teacher.js', '/teacher.front.js')
defineFile('/student.js', '/student.front.js')
defineFile('/censor.js', '/censor.front.js')
defineFile('/tests.js', '/../test/tests.front.js')
defineFile('/rich-text-editor-bundle.js', '/rich-text-editor-bundle.js')
if (generateSite) {
    ncp(__dirname + '/../public', siteRoot, () => {})
} else {
    app.use(express.static(__dirname + '/../public'))
    app.use(express.static(__dirname + '/../test'))
}

const devModules = [
    'chai',
    'chai-jquery',
    'mocha',
    'web-console-reporter']

const prodModules = [
    'jquery',
    'baconjs',
    'mathjax',
    'mathquill']

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
        ncp(sourcePath(name), siteRoot + '/' + name, () => {
        })
    } else {
        app.use('/' + name, express.static(sourcePath(name)))
    }
})

const doctype = '<!DOCTYPE html>'
definePath('/tarkistus', doctype + teacherHtmlFI)
definePath('/', doctype + studentHtmlFI)
definePath('/censor', doctype + censorHtmlFI)
definePath('/sv/bedomning', doctype + teacherHtmlSV)
definePath('/sv', doctype + studentHtmlSV)
app.use(bodyParser.urlencoded({extended: false, limit: '5mb'}))
app.use(bodyParser.json({limit: '5mb', strict: false}))
app.get('/math.svg', mathSvg.mathSvgResponse)

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
    console.log('Request error: ', error.stack)
    res.status(500).end()
})

module.exports = app

function formatDate(date) {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function pad(num) {
    return (num > 9 ? '' : '0') + num
}
