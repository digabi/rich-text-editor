#!/usr/bin/env node
const express = require('express')
const bodyParser = require('body-parser')
const browserify = require('browserify-middleware')
const mjAPI = require("mathjax-node")
const sanitizeHtml = require('sanitize-html')
const port = process.env.PORT || 5000
const app = express()
let savedData = {}
const sanitizeOpts = {
    allowedTags:       [
        'div',
        'img',
        'br'
    ],
    allowedAttributes: {
        img: ['src', 'class', 'alt']
    },
    allowedSchemes:    ['http', 'https', 'data']
}
app.use('/front.min.js', browserify(__dirname + '/front.js'))
app.use(express.static(__dirname + '/../public'))
app.use('/bootstrap', express.static(__dirname + '/../node_modules/bootstrap'))
app.use('/jquery', express.static(__dirname + '/../node_modules/jquery'))
app.use('/mathquill', express.static(__dirname + '/../node_modules/mathquill'))
app.use('/mathjax', express.static(__dirname + '/../node_modules/mathjax'))
app.use(bodyParser.urlencoded({extended: false}))
app.post('/save', (req, res) => {
    const cookie = req.headers.cookie
    const answerText = sanitizeHtml(req.body.text,  sanitizeOpts)
    console.log(answerText)
    savedData[cookie] = answerText
    res.sendStatus(200)
})
app.get('/load', (req, res) => {
    const cookie = req.headers.cookie
    res.send(savedData[cookie])
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
app.listen(port, () => console.log('Server started at localhost:' + port))
