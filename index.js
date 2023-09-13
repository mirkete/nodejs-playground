const express = require('express')
const { obtenerPuerto } = require('./services')
const routes = require('./routes')
const app = express()

const ALLOWED_ORIGINS = [
  'http://localhost:1234',
  'https://expressjs.com'
]
const PORT = process.env.PORT || 3000

app.use((req, res, next) => {
  const origin = req.header('origin')
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': origin
    })
  }
})

app.options('/products/:id', (req, res) => {
  const origin = req.header('origin')
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allowed-Methods': 'POST, PATCH, DELETE'
    })
  }
  res.send()
})

app.disable('x-powered-by')

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
