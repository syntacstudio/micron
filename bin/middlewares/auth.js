'use strict'

const config = require('../../config')
const cookieEncrypter = require('cookie-encrypter')
const cookie = require('cookie')

/**
 * Authentication web request, implemebt cookie encrypter
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const webAuth = (req, res, next) => {
    
    if(process.env.AUTH == 'false') next()

    const cookieData = req.cookies._micron ? JSON.parse(req.cookies._micron) : {}
    try {
        const withAuth = config.auth.filter(itm => (itm.credential === cookieData.credential && itm.password === cookieData.password))[0]
        if(withAuth) {
            return next()
        }
    } catch(e) {}
    res.redirect('/console/login')
} 


/**
 * Authentication websocket , implement cookie encrypter
 * @param {*} socket 
 * @param {*} next 
 */

const wsAuth = (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers.cookie)
    const micron = cookies._micron ? cookies._micron.replace('e:', '') : null
    if(micron) {
        try {
            let decrypted = cookieEncrypter.decryptCookie(micron, {
                key: process.env.ENV_KEY
            })
            const cookieData = decrypted ? JSON.parse(decrypted) : {}
            const withAuth = config.auth.filter(itm => (itm.credential === cookieData.credential && itm.password === cookieData.password))[0]
            if(withAuth) {
                return next()
            }
        } catch(e) {}
    } 
    return socket.disconnect()
}


module.exports =  {
    webAuth,
    wsAuth
}