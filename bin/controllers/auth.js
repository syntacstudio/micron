'use strict'
const csurf = require('csurf')
const fs = require('fs')
const path = require('path')
const config = require('../../config')

// login pages
const login = async (req, res) =>  {
    res.render('index', {
        config: process.env,
        title: 'Login',
        csrfToken: req.csrfToken()
    })
}

// login function
const postLogin = async(req, res) => {
    const {credential, password} = req.body
    
    const withAuth = config.auth.filter(itm => (itm.credential === credential && itm.password === password))[0]
    if(withAuth) {
        res.cookie('_micron', JSON.stringify(withAuth) , {maxAge: parseFloat(process.env.COOKIE_MAX_AGE)})
        res.send({
            statsus: 200,
            message: 'ok'
        })
        return res.end()
    } 
    res.status(401)
    res.send({
        status: 401,
        message: 'Ah damm, Credential or Password invalid'
    })
    return res.end()
}

// auto login user
const guest = (req, res, next) => {
    const cookieData = req.cookies._micron ? JSON.parse(req.cookies._micron) : {}
    const withAuth = config.auth.filter(itm => (itm.credential == cookieData.credential && itm.password == cookieData.password))[0]
    if(!withAuth) {
        return next()
    }
    return res.redirect('/console')
}

module.exports = {
    login, 
    postLogin,
    guest
}