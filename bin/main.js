#!/usr/bin/env node
'use strict'

/**
 * Smart deployer with express
 * Author Tofik Hidayat <tofik@syntac.co.id>
 */
const NodeCache = require('node-cache')
global.cacheStore = new NodeCache()
const http = require('http')
const path = require('path')
const express = require('express')
const logger = require('morgan')
const chalk = require('chalk')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const compression = require('compression')
const edge = require('express-edge')
const cookieEncrypter = require('cookie-encrypter')
const helmet = require('helmet')
const gritty = require('gritty')
const io = require('socket.io')
const env = require('dotenv').config()
edge.config({ cache: process.env.NODE_ENV === 'production' })
const router = require('./routers')
const socketRouter = require('./socketRouter')
require('./services/processLoger')
// initial cache
// internal middleware
const authMiddleware = require('./middlewares/auth')

// Express configuration
const app  = express()
const csrfProtection = csrf({ cookie: true, signed: true })
app.use(edge.engine);
app.set('trust proxy', process.env.NODE_ENV === 'production')
app.set('views', path.join(__dirname, '../resources/views'));
app.use(logger('common'))
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser(process.env.ENV_KEY))
app.use(cookieEncrypter(process.env.ENV_KEY, {
    signed: true,
    maxAge: parseFloat(process.env.COOKIE_MAX_AGE)
}))
app.use(express.static(path.join(__dirname, '../public/')))
app.use(csrfProtection)
app.use(compression())
// remove header powered by express
app.disable('x-powered-by')
//add robot tag, block search engine indexing
app.use((req, res, next) => {
    res.setHeader('X-Robots-Tag', 'noindex, nofollow')
    next()
})
// main router
router(app)

// implement express with nodejs http
const server = http.createServer(app)
// implement socket.io
const socket = io.listen(server)
// impement socket auth based cookie
socket.use(authMiddleware.wsAuth)
// implement grity
gritty.listen(socket, {
    command: 'mc',     
    autoRestart: true, 
})
socket.on('connection', socketRouter)

// Listen server
server.listen(parseInt(process.env.PORT), process.env.HOST, () => {
    console.log(`[Micron] listen on http://${chalk.blue(process.env.HOST)}:${chalk.blue(process.env.PORT)}`)
})
// log on server error
server.on('error', error => {
    console.error(error)
})


// setInterval(() => {
//     console.log(cacheStore.get('cpu'))
// }, 2000)

global.cacheStore.on('set', (key, val) => {
    // console.log(val)
    // console.log(global.cacheStore.get('cpu'))
})