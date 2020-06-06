#!/usr/bin/env node

/**
 * Smart deployer with express
 */
const http = require('http')
const path = require('path')
const express = require('express')
const logger = require('morgan')
const chalk = require('chalk')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const router = require('./routers')
const csrf = require('csurf')
const compression = require('compression')
const edge = require('express-edge')
const cookieEncrypter = require('cookie-encrypter')
const helmet = require('helmet')
const gritty = require('gritty')
const io = require('socket.io')
const env = require('dotenv').config()
edge.config({ cache: process.env.NODE_ENV === 'production' })
// external middleware
const authMiddleware = require('./middlewares/auth')

const app  = express()
const csrfProtection = csrf({ cookie: true, signed: true })
app.use(edge.engine);
app.set('trust proxy',  process.env.NODE_ENV === 'production')
app.set('views', path.join(__dirname, '../resources/views'));
app.use(logger('dev'))
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser(process.env.ENV_KEY))
app.use(cookieEncrypter(process.env.ENV_KEY))
app.use(express.static(path.join(__dirname, '../public/')))
app.use(csrfProtection)
app.use(compression())
app.disable('x-powered-by')


app.use((req, res, next) => {
    res.setHeader('X-Robots-Tag', 'noindex, nofollow')
    next()
})

// router here
router(app)
// end router
const server = http.createServer(app)
const socket = io.listen(server)
gritty.listen(socket, {
    command: 'mc',     
    autoRestart: true, 
})

socket.use(authMiddleware.wsAuth)

server.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`[Deployer] listen on http://${chalk.blue(process.env.HOST)}:${chalk.blue(process.env.PORT)}`)
})

server.on('error', error => {
    console.error(error)
})