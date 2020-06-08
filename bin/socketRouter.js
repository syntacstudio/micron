'use strict'
const socketRouter = ws => {
  global.cacheStore.on('set', (key, value) => {
    const cpuData = global.cacheStore.get('cpu-data')
    ws.emit('update-cpu', cpuData || {})
  })
}

module.exports = socketRouter