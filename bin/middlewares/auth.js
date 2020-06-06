'use strict'
const fs = require('fs')
const path  = require('path')
const config = require('../../config')
const cookie = require('cookie')
const cookieParser = require('cookie-parser')

const webAuth = (req, res, next) => {
    const cookieData = req.cookies._micron ? JSON.parse(req.cookies._micron) : {}
    const withAuth = config.auth.filter(itm => (itm.credential == cookieData.credential && itm.password == cookieData.password))[0]
    if(withAuth) {
        return next()
    }
    res.redirect('/console/login')
} 
const wsAuth = (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers.cookie)
    if(cookies._micron) {
        return next()
    } 
    return socket.disconnect()
    
    // need next implementation cookie encrypt share betwen express and socketio
}


module.exports =  {
    webAuth,
    wsAuth
}