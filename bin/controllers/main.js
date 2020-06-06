'use strict'

const csurf = require('csurf')
const fs = require('fs')
const path = require('path')
const historyPath = path.join(__dirname, '../../histories')

const index = async (req, res) =>  {
    res.render('index', {
        config: process.env,
        title: 'Console',
        csrfToken: req.csrfToken()
    })
}

/// get hisrory app list
const history = (req, res) => {
    fs.readdir(historyPath, async (err, files) => {
        if(err) {
            res.status(403)
            res.send({
                status: 403,
                message: `Ah dam, something wrong, ${err.toString()}`
            })
        } else {
            let filteredFiles = files.map(itm => {
                const fileStat = fs.lstatSync(path.join(historyPath, itm))
                return fileStat.isDirectory() ?  {
                    name: itm,
                    createdAt: fileStat.birthtime
                } : false
            })
            filteredFiles = filteredFiles.filter(Boolean)

            res.status(200)
            res.send({
                status: 200,
                data: filteredFiles
            })
        }
        return res.end()
    })
}

// get file list
const getFileList = async (req, res) => {

    const pathDir = req.params.path
    const concatDir = path.join(historyPath, pathDir)
    fs.readdir(concatDir, async (err, files) => {
        if(err) {
            res.status(403)
            res.send({
                status: 403,
                message: `Ah dam, something wrong, ${err.toString()}`
            })
            return res.end()
        } else {
            let filteredFiles = files.map(itm => {
                const fileStat = fs.lstatSync(path.join(concatDir, itm))
                return fileStat.isDirectory() ?  {
                    name: itm,
                    createdAt: fileStat.birthtime
                } : false
            })
            filteredFiles = filteredFiles.filter(Boolean)

            res.status(200)
            res.send({
                status: 200,
                data: filteredFiles
            })   
            return res.end()  
        }
    })    
}

const getByDate = (req, res) => {
    const pathDir = req.params
    const concatDir = path.join(historyPath, pathDir.path, pathDir.date)
    fs.readdir(concatDir, async (err, files) => {
        if(err) {
            res.status(403)
            res.send({
                status: 403,
                message: `Ah dam, something wrong, ${err.toString()}`
            })
            return res.end()
        } else {
            let filteredFiles = files.map(itm => {
                const fileStat = fs.lstatSync(path.join(concatDir, itm))
                return fileStat.isFile() ?  {
                    name: itm,
                    createdAt: fileStat.birthtime
                } : false
            })
            filteredFiles = filteredFiles.filter(Boolean)

            res.status(200)
            res.send({
                status: 200,
                data: filteredFiles
            })   
            return res.end()  
        }
    })    
}



module.exports = {
    index,
    history,
    getFileList,
    getByDate
}