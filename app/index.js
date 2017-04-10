#!/usr/bin/env node
const express = require('express')
const bodyParser = require('body-parser')
const browserify = require('browserify-middleware')
const sanitizeHtml = require('sanitize-html')
const session = require('express-session')
const studentHtml = require('./student.html')
const mathImg = require('./mathImg')
const startedAt = new Date()
const FI = require('./FI')
const SV = require('./SV')
const studentHtmlFI = studentHtml((Object.assign({startedAt: formatDate(startedAt)}, FI.editor)))
const studentHtmlSV = studentHtml((Object.assign({startedAt: formatDate(startedAt)}, SV.editor)))
const teacherHtml = require('./teacher.html')
const teacherHtmlFI = teacherHtml(Object.assign({startedAt: formatDate(startedAt)}, FI.annotating))
const teacherHtmlSV = teacherHtml(Object.assign({startedAt: formatDate(startedAt)}, SV.annotating))
const interfaceIP = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'
const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 5000
const app = express()
let savedData = {}
let savedImage = {}
let savedMarkers = {}
const sanitizeOpts = require('./sanitizeOpts')

app.use(session({
    secret: 'alsdjfwernfeklbjweiugerpfiorq3jlkhewfbads',
    saveUninitialized: true,
    resave: true
}))

app.use('/student.js', browserify(__dirname + '/student.front.js'))
app.use('/teacher.js', browserify(__dirname + '/teacher.front.js'))
app.use(express.static(__dirname + '/../public'))
app.use(express.static(__dirname + '/../test'))
exposeModules([
    'bootstrap',
    'jquery',
    'baconjs',
    'bacon.jquery',
    'mathquill',
    'mathjax',
    'chai',
    'chai-jquery',
    'mocha',])
const doctype = '<!DOCTYPE html>'
app.get('/tarkistus', (req, res) => res.send(doctype + teacherHtmlFI))
app.get('/', (req, res) => res.send(doctype + studentHtmlFI))
app.get('/sv/bedomning', (req, res) => res.send(doctype + teacherHtmlSV))
app.get('/sv', (req, res) => res.send(doctype + studentHtmlSV))
app.use(bodyParser.urlencoded({extended: false, limit: '5mb'}))
app.use(bodyParser.json({limit: '5mb', strict: false}))
app.post('/save', (req, res) => {
    const sessionId = req.session.id;
    savedData[sessionId] = savedData[sessionId] || {}
    const {answerId, text} = req.body
    savedData[sessionId][answerId] = {
        timestamp: new Date().toISOString(),
        html: sanitizeHtml(text, sanitizeOpts)
    }
    res.sendStatus(200)
})
app.post('/saveImg', (req, res) => {
    const sessionId = req.session.id
    const {answerId, id, text} = req.body
    savedImage[sessionId] = savedImage[sessionId] || {}
    savedImage[sessionId][answerId] = savedImage[sessionId][answerId] || {}
    savedImage[sessionId][answerId][id] = text
    res.send(id)
})
app.post('/saveMarkers', (req, res) => {
    savedMarkers[req.session.id] = req.body
    res.sendStatus(200)
})
app.get('/load', (req, res) => {
    const sessionId = req.session.id
    const answerId = req.query.answerId
    res.send(savedData[sessionId] ? savedData[sessionId][answerId] || null : null)
})

function decodeBase64Image(dataString) {
    if (!dataString)
        return null
    const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
    if (matches.length !== 3) {
        return null
    }
    return {
        type: matches[1],
        data: new Buffer(matches[2], 'base64')
    }
}

app.get('/loadImg', (req, res) => {
    const {answerId, id} = req.query
    const data = decodeBase64Image(savedImage[req.session.id][answerId][id])
    if (data) {
        res.writeHead(200, {
            'Content-Type': data.type,
        })
        res.end(data.data)
    } else {
        res.send(404)
    }
})
app.get('/loadMarkers', (req, res) => res.send(savedMarkers[req.session.id]))

app.get('/math.svg', mathImg.handler)
app.get('/version', (req, res) => {
    res.send({
        serverStarted: startedAt.toString(),
        currentServerTime: new Date().toString()
    })
})
app.listen(port, interfaceIP, () => console.log('Server started at localhost:' + port))

function exposeModules(names) {
    names.forEach(name => app.use('/' + name, express.static(__dirname + '/../node_modules/' + name)))
}

function formatDate(date) {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function pad(num) {
    return (num > 9 ? '' : '0') + num
}
