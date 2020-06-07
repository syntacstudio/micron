'use strict'
const csurf = require('csurf')
const fs = require('fs')
const path = require('path')
const config = require('../../config')

/**
 * Login page
 * @param {*} req 
 * @param {*} res 
 */
const login = async (req, res) =>  {
    res.render('index', {
        config: process.env,
        title: 'Login',
        csrfToken: req.csrfToken()
    })
}

/**
 * Login function
 * @param {*} req 
 * @param {*} res 
 */
const postLogin = async(req, res) => {
    try {
        const {credential, password} = req.body
        const withAuth = config.auth.filter(itm => (itm.credential === credential && itm.password === password))[0]
        if(withAuth) {
            res.cookie('_micron', JSON.stringify(withAuth))
            res.send({
                statsus: 200,
                message: 'ok'
            })
            return res.end()
        } 
    } catch(e) {}
    res.status(401)
    res.send({
        status: 401,
        message: 'Ah damm, Credential or Password invalid'
    })
    return res.end()
}

/**
 * Auto redirect user when user has login
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const guest = (req, res, next) => {
    try {
        const cookieData = req.cookies._micron ? JSON.parse(req.cookies._micron) : {}
        const withAuth = config.auth.filter(itm => (itm.credential == cookieData.credential && itm.password == cookieData.password))[0]
        if(!withAuth) {
            return res.redirect('/console')
        }
    } catch(e) {}
    return next()
}

module.exports = {
    login, 
    postLogin,
    guest
}