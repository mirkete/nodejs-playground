const express = require('express')
const { obtenerPuerto } = require('./services')
const routes = require('./routes')
const app = express()

const PORT = process.env.PORT || 3000

app.disable('x-powered-by')

app.use(express.json())

app.use((req, res, next) => {
  res.locals.test = 'TEST OK'
  console.log('asd')
  next()
})

app.use('/', routes)

obtenerPuerto(PORT)
  .then((puerto) => {
    app.listen(puerto, () => {
      console.log('Servidor encendido en el puerto ' + puerto)
    })
  })
