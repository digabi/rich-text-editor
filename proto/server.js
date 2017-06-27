const express = require('express')
const bodyParser = require('body-parser')
const babelify = require('express-babelify-middleware')
const sanitizeHtml = require('sanitize-html')
const session = require('express-session')
const studentHtml = require('./student.html')
const mathSvg = require('../server/mathSvg')
const fs = require('fs')
const path = require('path')
const startedAt = new Date()
const FI = require('../app/FI')
const SV = require('../app/SV')
const mjAPI = require("mathjax-node")
const latexCommands = require('../app/latexCommands')
const studentHtmlFI = studentHtml((Object.assign({startedAt: formatDate(startedAt), locale: 'FI'}, FI.editor)))
const studentHtmlSV = studentHtml((Object.assign({startedAt: formatDate(startedAt), locale: 'SV'}, SV.editor)))
const teacherHtml = require('./teacher.html')
const teacherHtmlFI = teacherHtml(Object.assign({startedAt: formatDate(startedAt), locale: 'FI'}, FI.annotating))
const teacherHtmlSV = teacherHtml(Object.assign({startedAt: formatDate(startedAt), locale: 'SV'}, SV.annotating))
const app = express()
let savedMarkers = {}
const latexCommandCache = {}
cacheLatexCommands()

const sanitizeOpts = require('../app/sanitizeOpts')

app.use(session({
    secret: 'alsdjfwernfeklbjweiugerpfiorq3jlkhewfbads',
    saveUninitialized: true,
    resave: true
}))

app.use('/student.js', babelify(__dirname + '/student.front.js'))
app.use('/teacher.js', babelify(__dirname + '/teacher.front.js'))
app.use('/tests.js', babelify(__dirname + '/../test/tests.front.js'))
app.use('/rich-text-editor-bundle.js', babelify(__dirname + '/rich-text-editor-bundle.js'))
app.use('/saver.js', babelify(__dirname + '/../proto/saver.js'))
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
app.get('/sv/bedomning', (req, res) => res.send(doctype + teacherHtmlSV))
app.get('/sv', (req, res) => res.send(doctype + studentHtmlSV))
app.use(bodyParser.urlencoded({extended: false, limit: '5mb'}))
app.use(bodyParser.json({limit: '5mb', strict: false}))
app.post('/save', (req, res) => {
    const sessionId = req.session.id;
    const {answerId, text} = req.body

    const fileWriteStream = createFileWriteStream(sessionId, answerId);
    fileWriteStream.write(JSON.stringify({
            timestamp: new Date().toISOString(),
            html: sanitizeHtml(text, sanitizeOpts)
        })
    )
    fileWriteStream.end()
    res.sendStatus(200)
})
app.post('/saveImg', (req, res) => {
    const sessionId = req.session.id
    const {answerId} = req.query
    const id = String(new Date().getTime())
    const url = `/screenshot/?answerId=${req.query.answerId}&id=${id}`
    const fileWriteStream = createFileWriteStream(sessionId, answerId, id + '.png')
    req.pipe(fileWriteStream).on('finish', () => res.json({url}))
})
app.post('/saveMarkers', (req, res) => {
    savedMarkers[req.session.id] = req.body
    res.sendStatus(200)
})
app.get('/load', (req, res) => {
    const sessionId = req.session.id
    const answerId = req.query.answerId
    const pathToFile = getPathToFile(sessionId, answerId, 'answer.json');

    if (fs.existsSync(pathToFile)) {
        res.json(JSON.parse(fs.readFileSync(pathToFile, 'utf-8')))
    } else {
        res.json(null)
    }
})
app.get('/screenshot/', (req, res) => {
    const {answerId, id} = req.query
    if (isUnsafe(answerId) || isUnsafe(id)) {
        res.send(404)
        return
    }

    const sessionId = req.session.id;
    const filePath = getPathToFile(sessionId, answerId, id + '.png')
    if (fs.existsSync(filePath)) {
        res.writeHead(200, {'Content-Type': 'image/jpeg'})
        fs.createReadStream(filePath).pipe(res)
    }
    else res.sendStatus(404)
})
app.get('/loadMarkers', (req, res) => res.send(savedMarkers[req.session.id]))
app.get('/math.svg', (req, res) => {
    if (req.query.latex in latexCommandCache) {
        res.type('svg')
        res.send(latexCommandCache[req.query.latex])
    } else {
        mathSvg.mathSvgResponse(req, res)
    }
})
app.get('/version', (req, res) => {
    res.send({
        serverStarted: startedAt.toString(),
        currentServerTime: new Date().toString()
    })
})
module.exports = app

function isUnsafe(param) {
    return param.indexOf('/') >= 0 || param.indexOf('..') >= 0
}

function mkdir(dir) {
    const sep = '/'
    const segments = dir.split(sep)
    let current = ''
    let i = 0

    while (i < segments.length) {
        current = current + sep + segments[i]
        try {
            fs.statSync(current)
        } catch (e) {
            fs.mkdirSync(current)
        }
        i++
    }
}

function getFullPath(sessionId, answerId) {
    return path.normalize(`${__dirname}/../target/${sessionId}/${answerId}`);
}

function getPathToFile(sessionId, answerId, filename) {
    return path.join(getFullPath(sessionId, answerId), filename);
}

function createFileWriteStream(sessionId, answerId, filename = 'answer.json') {
    mkdir(getFullPath(sessionId, answerId))
    return fs.createWriteStream(getPathToFile(sessionId, answerId, filename))
}

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
