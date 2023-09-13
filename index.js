// const express = require('express')
// const { obtenerPuerto } = require('./services')
// const routes = require('./routes')
// const app = express()
// const cors = require('cors')

import express from 'express'
import { obtenerPuerto } from './utils.js'
import routes from './routes.js'
import cors from 'cors'

const app = express()

const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:1234',
  'https://expressjs.com'
]
const PORT = process.env.PORT || 3000

app.disable('x-powered-by')

app.use(cors({
  origin: (origin, callback) => {
    if (ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }
    if (!origin) {
      return callback(null, true)
    }
    return callback(new Error('CORS NOT ALLOWED IN THIS ORIGIN'), false)
  }
}))
app.use(express.json())
app.use((req, res, next) => {
  res.locals.test = 'TEST OK'
  next()
})

app.use('/', routes)

obtenerPuerto(PORT)
  .then((puerto) => {
    app.listen(puerto, () => {
      console.log('Servidor encendido en el puerto ' + puerto)
    })
  })
