'use strict'
const config = require('../../config')
const csurf = require('csurf')
const fs = require('fs')
const path = require('path')

const login = async (req, res) =>  {
    res.render('index', {
        config,
        title: 'Login',
        csrfToken: req.csrfToken()
    })
}
const postLogin = async(req, res) => {
    const authList = fs.readFileSync(path.join(__dirname, '../../auth.json')) 
    const {credential, password} = req.body
    
    const withAuth = JSON.parse(authList).filter(itm => (itm.credential === credential && itm.password === password))[0]
    if(withAuth) {
        res.cookie('deployer-with-auth', JSON.stringify(withAuth) , {maxAge: config.cookieMaxAge})
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

module.exports = {
    login, 
    postLogin
}