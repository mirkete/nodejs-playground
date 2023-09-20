import express from 'express'
import { obtenerPuerto } from './utils.js'
import { createProductRouter } from './routes/products.js'
import corsMiddleware from './middlewares/cors.js'
import testMiddleware from './middlewares/test.js'
import router from './routes.js'

export const createApp = ({ productsModel }) => {
  const app = express()

  const PORT = process.env.PORT || 3000

  app.disable('x-powered-by')

  app.use(corsMiddleware())
  app.use(express.json())
  app.use(testMiddleware())

  app.use('/products', createProductRouter({ productsModel }))
  app.use('/', router)

  obtenerPuerto(PORT)
    .then((puerto) => {
      app.listen(puerto, () => {
        console.log('Servidor encendido en el puerto ' + puerto)
      })
    })
}
