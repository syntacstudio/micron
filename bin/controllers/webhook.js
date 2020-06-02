'use strict'

const config = require('../../config')
const repositories = require('../../repositories.json')
const process = require('../services/process')

function github(req, res) {
    if (req.headers['x-github-event'] != 'push') return res.status(200).end()
    
    const payload = JSON.parse(req.body.payload)
    const repo    = payload.repository.full_name
    const branch  = payload.ref.split('/').pop()
    repositories.forEach(itm => {
        if(itm.repo.toLowerCase() == repo.toLowerCase() && (itm.branch.toLowerCase() == branch.toLowerCase() || itm.branch == '*')) {
            process.start(itm, {
                 repo,
                branch
            })
        }
    })
    
    res.status(200)
    res.send('ok')
    res.end()
}

module.exports = {
    github
}