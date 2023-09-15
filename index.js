// const express = require('express')
// const { obtenerPuerto } = require('./services')
// const routes = require('./routes')
// const app = express()
// const cors = require('cors')

import express from 'express'
import { obtenerPuerto } from './utils.js'
import routes from './routes.js'
import corsMiddleware from './middlewares/cors.js'
import testMiddleware from './middlewares/test.js'

const app = express()

const PORT = process.env.PORT || 3000

app.disable('x-powered-by')

app.use(corsMiddleware())
app.use(express.json())
app.use(testMiddleware())

app.use('/', routes)

obtenerPuerto(PORT)
  .then((puerto) => {
    app.listen(puerto, () => {
      console.log('Servidor encendido en el puerto ' + puerto)
    })
  })
