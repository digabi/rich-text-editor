#!/usr/bin/env node
const express = require('express')
const port = process.env.PORT || 5000
const browserify = require('browserify-middleware')
const app = express()
app.use('/front.min.js', browserify(__dirname + '/front.js'))
app.use('/newFront.min.js', browserify(__dirname + '/newFront.js'))
app.use(express.static(__dirname + '/../public'))
app.use('/bootstrap', express.static(__dirname + '/../node_modules/bootstrap'))
app.use('/jquery', express.static(__dirname + '/../node_modules/jquery'))
app.use('/mathquill', express.static(__dirname + '/../node_modules/mathquill'))
app.use('/mathjax', express.static(__dirname + '/../node_modules/mathjax'))
app.listen(port, () => console.log('Server started at localhost:' + port))
