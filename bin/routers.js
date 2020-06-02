'use strict'

const config = require('../config')
const throttle = require('express-throttle')
const githubMiddleware = require('github-webhook-middleware')({
    secret: config.githubSecret,
    limit: '20mb',
  })

// constrollers
const auth = require('./controllers/auth')
const webhook = require('./controllers/webhook')
const main = require('./controllers/main')

const routers = app => {
    app.post(config.path, githubMiddleware, webhook.github)


    app.get('/console/login', auth.login)
    app.post('/api/login', throttle({ burst: 5, period: '1min'}), auth.postLogin)
    
    app.get(['/console', '/console/*'], main.index)


    app.get('/api/histories', main.history)
    app.get('/api/histories/:path', main.getFileList)
    app.get('/api/histories/:path/:date', main.getByDate)
    
    app.use((req, res) => {
        res.status(404)
        res.send({
            status: 404,
            message: `Sorry this path ${req.protocol}://${req.hostname}${req.url} are not found`
        })
        return res.end()
    })
    app.use((req, res) => {
        res.status(403)
        res.send('ups')
    })
}

module.exports = routers