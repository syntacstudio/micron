'use strict'

const cpuStat = require('cpu-stat')
const moment = require('moment')
const config = require('../../config')


const fillData = (based, data) => {
   const length = based.length
   if(length >= config['chart-length']) {
    based = based.slice(length - config['chart-length'], length)
   }
   based.push(data)
   return based
}


setInterval(() => {
    cpuStat.usagePercent(function(err, value, seconds) {
        if (err) {
          return console.log(err);
        } else {
            const cacheStore = global.cacheStore.get('cpu-data') || {data: [], time:[]}
            const newCache = {
                data: fillData(cacheStore.data, parseFloat(value.toFixed(2))),
                time: fillData(cacheStore.time, moment().format('hh:mm:ss'))
            }
            global.cacheStore.set('cpu-data', newCache)
        }
    });
}, config['update-timeout'])