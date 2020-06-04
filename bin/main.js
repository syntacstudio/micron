#!/usr/bin/env node

/**
 * Smart deployer with express
 */
const http = require('http')
const path = require('path')
const express = require('express')
const logger = require('morgan')
const config = require('../config')
const chalk = require('chalk')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const router = require('./routers')
const csrf = require('csurf')
const compression = require('compression')
const edge = require('express-edge')
const cookieEncrypter = require('cookie-encrypter')
const helmet = require('helmet')
edge.config({ cache: process.env.NODE_ENV === 'production' })

const app  = express()
const csrfProtection = csrf({ cookie: true })
app.use(edge.engine);
app.set('trust proxy',  process.env.NODE_ENV === 'production')
app.set('views', path.join(__dirname, '../resources/views'));
app.use(logger('dev'))
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser(config.appKey))
app.use(cookieEncrypter(config.appKey))
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
server.listen(config.port, config.host, () => {
    console.log(`[Deployer] listen on http://${chalk.blue(config.host)}:${chalk.blue(config.port)}`)
})

server.on('error', error => {
    console.error(error)
})