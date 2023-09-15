import { Router } from 'express'
import productsRoutes from './routes/products.js'

const router = Router()

router.get('/', (req, res) => {
  res.status(200).send('<h1>OK</h1>')
})

router.use('/products', productsRoutes)

router.use((req, res) => {
  res.status(404).send('<h1>404 Not found</h1>')
})

export default router
