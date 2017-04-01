#!/usr/bin/env node
const express = require('express')
const bodyParser = require('body-parser')
const browserify = require('browserify-middleware')
const sanitizeHtml = require('sanitize-html')
const session = require('express-session')
const indexHtml = require('./index.html')
const mathImg = require('./mathImg')
const startedAt = new Date()
const FI = require('./FI')
const SV = require('./SV')
const indexHtmlFI = indexHtml((Object.assign({startedAt: formatDate(startedAt)}, FI.editor)))
const indexHtmlSV = indexHtml((Object.assign({startedAt: formatDate(startedAt)}, SV.editor)))
const teacherHtml = require('./teacher.html')
const teacherHtmlFI = teacherHtml(Object.assign({startedAt: formatDate(startedAt)}, FI.annotating))
const teacherHtmlSV = teacherHtml(Object.assign({startedAt: formatDate(startedAt)}, SV.annotating))
const interfaceIP = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'
const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 5000
const app = express()
let savedData = {}
let savedMarkers = {}
const sanitizeOpts = require('./sanitizeOpts')

app.use(session({
    secret:            'alsdjfwernfeklbjweiugerpfiorq3jlkhewfbads',
    saveUninitialized: true,
    resave:            true
}))

app.use('/student.js', browserify(__dirname + '/student.front.js'))
app.use('/teacher.js', browserify(__dirname + '/teacher.front.js'))
app.use(express.static(__dirname + '/../public'))
exposeModules([
    'bootstrap',
    'jquery',
    'baconjs',
    'bacon.jquery',
    'mathquill',
    'mathjax'])
app.get('/tarkistus', (req, res) => res.send(teacherHtmlFI))
app.get('/', (req, res) => res.send(indexHtmlFI))
app.get('/sv/bedomning', (req, res) => res.send(teacherHtmlSV))
app.get('/sv', (req, res) => res.send(indexHtmlSV))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({limit: 20 * 1024 * 1024, strict: false}))
app.post('/save', (req, res) => {
    savedData[req.session.id] = {
        timestamp: new Date().toISOString(),
        html:      sanitizeHtml(req.body.text, sanitizeOpts)
    }
    res.sendStatus(200)
})
app.post('/saveMarkers', (req, res) => {
    savedMarkers[req.session.id] = req.body
    res.sendStatus(200)
})
app.get('/load', (req, res) => res.send(savedData[req.session.id]))
app.get('/loadMarkers', (req, res) => res.send(savedMarkers[req.session.id]))

app.get('/math.svg', mathImg.handler)
app.get('/version', (req, res) => {
    res.send({
        serverStarted:     startedAt.toString(),
        currentServerTime: new Date().toString()
    })
})
app.listen(port, interfaceIP, () => console.log('Server started at localhost:' + port))

function exposeModules(names) {
    names.forEach(name => app.use('/' + name, express.static(__dirname + '/../node_modules/' + name)))
}

function formatDate(date) {
    return `${date.getDay()}.${date.getMonth() + 1}.${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function pad(num) {
    return (num > 9 ? '' : '0') + num
}
