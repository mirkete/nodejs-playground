import { Router } from 'express'
import ProductController from '../controllers/products.js'

export const createProductRouter = ({ productsModel }) => {
  const ProductsRouter = Router()
  const productController = new ProductController({ productsModel })

  ProductsRouter.get('/', productController.getProducts)

  ProductsRouter.get('/:id', productController.getOneProduct)

  ProductsRouter.post('/', productController.createProduct)

  ProductsRouter.patch('/', productController.modifyProduct)

  ProductsRouter.delete('/', productController.deleteProduct)

  return ProductsRouter
}
