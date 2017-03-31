#!/usr/bin/env node
const express = require('express')
const bodyParser = require('body-parser')
const browserify = require('browserify-middleware')
const mjAPI = require("mathjax-node")
const sanitizeHtml = require('sanitize-html')
const session = require('express-session')
const indexHtml = require('./index.html')
const indexHtmlSv = require('./index-sv.html')
const teacherHtml = require('./teacher.html')
const teacherHtmlSv = require('./teacher-sv.html')
const interfaceIP = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'
const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 5000
const app = express()
let savedData = {}
let savedMarkers = {}
const sanitizeOpts = require('./sanitizeOpts')
const startedAt = new Date()

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
app.get('/tarkistus', (req, res) => res.send(teacherHtml))
app.get('/', (req, res) => res.send(indexHtml))
app.get('/sv/bedomning', (req, res) => res.send(teacherHtmlSv))
app.get('/sv', (req, res) => res.send(indexHtmlSv))
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
app.get('/load', (req, res) => {
    res.send(savedData[req.session.id])
})
app.get('/loadMarkers', (req, res) => {
    res.send(savedMarkers[req.session.id])
})
mjAPI.config({MathJax: {}})
mjAPI.start()

app.get('/math.svg', (req, res) => {
    mjAPI.typeset({
        math:   req.query.latex,
        format: "TeX", // "inline-TeX", "MathML"
        mml:    false,
        svg:    true,
    }, function(data) {
        if(data.errors) {
            res.type('svg')
            res.send(`<svg xmlns="http://www.w3.org/2000/svg"  
     xmlns:xlink="http://www.w3.org/1999/xlink">
    <text x="10" y="15" fill="red">${data.errors.join('<br>')}</text>
</svg>`)
        } else {
            res.type('svg')
            res.send(data.svg)
        }
    })
})
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
