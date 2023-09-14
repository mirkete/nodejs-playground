import { Router } from 'express'
import ProductController from '../controllers/products.js'
const ProductsRouter = Router()

ProductsRouter.get('/', ProductController.getProducts)

ProductsRouter.get('/:id', ProductController.getOneProduct)

ProductsRouter.post('/', ProductController.createProduct)

ProductsRouter.patch('/', ProductController.modifyProduct)

ProductsRouter.delete('/', ProductController.deleteProduct)

export default ProductsRouter
