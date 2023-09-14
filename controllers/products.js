import Products from '../models/products.js'

class ProductController {
  static async getProducts (req, res) {
    const productos = await Products.getAll()
    res.json(productos)
  }

  static async getOneProduct (req, res) {
    const producto = await Products.getOne(req.params)
    if (!producto) {
      return res.status(400).send('<h1>PRODUCT NOT FOUND</h1>')
    }
    res.status(200).json(producto)
  }

  static async createProduct (req, res) {
    const newProduct = await Products.createProduct(req.body)
    if (!newProduct) {
      return res.status(400).send('Validation error. Check product fields')
    }
    res.status(201).json(newProduct)
  }

  static async deleteProduct (req, res) {
    const result = await Products.deleteOne(req.body)
    if (!result) {
      return res.status(400).json({ err: 'Product not found' })
    }
    res.status(201).send('PRODUCT REMOVED')
  }

  static async modifyProduct (req, res) {
    const result = await Products.modifyOne(req.body)
    if (!result) {
      return res.status(400).json({ err: 'Error while modifying. Check fields' })
    }
    res.status(201).send('PRODUCT MODIFIED')
  }
}

export default ProductController
