const express = require('express')
const bodyParser = require('body-parser')
const babelify = require('express-babelify-middleware')
const sanitizeHtml = require('sanitize-html')
const studentHtml = require('./student.html')
const censorHtml = require('./censor.html')
const mathSvg = require('../server/mathSvg')
const fs = require('fs')
const path = require('path')
const startedAt = new Date()
const FI = require('../app/FI')
const SV = require('../app/SV')
const mjAPI = require("mathjax-node")
const latexCommands = require('../app/latexCommands')
const studentHtmlFI = studentHtml((Object.assign({startedAt: formatDate(startedAt), locale: 'FI'}, FI.editor)))
const censorHtmlFI = censorHtml((Object.assign({startedAt: formatDate(startedAt), locale: 'FI'}, FI.editor)))
const studentHtmlSV = studentHtml((Object.assign({startedAt: formatDate(startedAt), locale: 'SV'}, SV.editor)))
const teacherHtml = require('./teacher.html')
const teacherHtmlFI = teacherHtml(Object.assign({startedAt: formatDate(startedAt), locale: 'FI'}, FI.annotating))
const teacherHtmlSV = teacherHtml(Object.assign({startedAt: formatDate(startedAt), locale: 'SV'}, SV.annotating))
const app = express()
let savedMarkers = {}
const latexCommandCache = {}
cacheLatexCommands()

app.use('/teacher.js', babelify(__dirname + '/teacher.front.js'))
app.use('/tests.js', babelify(__dirname + '/../test/tests.front.js'))
app.use('/rich-text-editor-bundle.js', babelify(__dirname + '/rich-text-editor-bundle.js'))
app.use(express.static(__dirname + '/../public'))
app.use(express.static(__dirname + '/../test'))
exposeModules([
    'bootstrap',
    'jquery',
    'baconjs',
    'bacon.jquery',
    'mathquill',
    'chai',
    'chai-jquery',
    'mocha',
    'web-console-reporter'])
const doctype = '<!DOCTYPE html>'
app.get('/tarkistus', (req, res) => res.send(doctype + teacherHtmlFI))
app.get('/', (req, res) => res.send(doctype + studentHtmlFI))
app.get('/censor', (req, res) => res.send(doctype + censorHtmlFI))
app.get('/sv/bedomning', (req, res) => res.send(doctype + teacherHtmlSV))
app.get('/sv', (req, res) => res.send(doctype + studentHtmlSV))
app.use(bodyParser.urlencoded({extended: false, limit: '5mb'}))
app.use(bodyParser.json({limit: '5mb', strict: false}))
app.get('/math.svg', onMathSvg)
app.get('/version', onVersion)

function onMathSvg(req, res) {
    if (req.query.latex in latexCommandCache) {
        res.type('svg')
        res.send(latexCommandCache[req.query.latex])
    } else {
        mathSvg.mathSvgResponse(req, res)
    }
}

function onVersion(req, res) {
    res.send({
        serverStarted: startedAt.toString(),
        currentServerTime: new Date().toString()
    })
}

module.exports = app

function exposeModules(names) {
    names.forEach(name => app.use('/' + name, express.static(__dirname + '/../node_modules/' + name)))
}

function formatDate(date) {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function pad(num) {
    return (num > 9 ? '' : '0') + num
}

function cacheLatexCommands() {
    latexCommands.map(o => o.label ? o.label.replace(/X/g, '\\square') : o.action)
        .forEach(latex => {
            mjAPI.typeset({
                math: latex,
                format: "TeX", // "inline-TeX", "MathML"
                mml: false,
                svg: true,
            }, function (data) {
                latexCommandCache[latex] = data.svg
            })
        })
}
