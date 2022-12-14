import { Application } from 'express'
import http from 'http'

import App from '../app'
import { dataSource } from '../dataSource'

const debug = require('debug')('www:server')
const port = normalizePort(process.env.PORT || '3000')

const expressApp = new App()
const app: Application = expressApp.app
const httpServer = http.createServer(app)

app.set('port', port)
expressApp.setup()

dataSource.initialize().then(() => {
  httpServer.listen(port, () => {
    console.log('Verse Application is ON')
    console.log(`Port: ${port}, ENV: ${process.env.NODE_ENV}`)
  })
  httpServer.on('error', onError)
  httpServer.on('listening', onListening)
})

function normalizePort(value: string): any {
  const portNumber = parseInt(value, 10)
  if (isNaN(portNumber)) {
    return value
  }
  if (portNumber >= 0) {
    return portNumber
  }
  return false
}

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error
  }
  switch (error.code) {
    case 'EACCES':
      console.error('port ' + port + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error('port ' + port + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening() {
  const address = httpServer.address()
  const bind =
    typeof address === 'string' ? 'pipe ' + address : 'port ' + address?.port
  debug('Listening on ' + bind)
}
