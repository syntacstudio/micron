'use strict'

const { parse, stringify } = require('envfile')
const fs = require('fs')
const path  = require('path')
const envLocation = path.join(__dirname, '../../.env')
const aes256 = require('aes256');
const crypto = require('crypto')
const envTemplate = require('./env.template')

const flag = process.argv[process.argv.length -1].replace('--parse=', '')


const generateKey = (length) => {
    const secretKey = crypto.randomBytes(length).toString('base64')
    const messageKey = crypto.randomBytes(length).toString('base64')
    const encrypted = aes256.encrypt(secretKey, messageKey).substr(0, length)
    return encrypted
} 

fs.readFile(envLocation, 'utf8', (err, data) => {
    let envData = err ? envTemplate  : parse(data)

    if(flag == 'env_key') {
        envData.ENV_KEY = generateKey(32)
    } else if(flag == 'git_key') {
        envData.GIT_SECRET_KEY = generateKey(256)
    } else {
        throw(new Error('Option must be choose'))
    }

    const envStrigify = stringify(envData)
    fs.writeFile(envLocation, envStrigify, err => {
        if(err) throw err
        console.log('Env Updated, Please restart micron service')
    })
})
