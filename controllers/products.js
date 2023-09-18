import Products from '../models/database/products.js'

class ProductController {
  static async getProducts (req, res) {
    const result = await Products.getAll()
    if (!result.success) {
      res.status(500).json({ err: result.error })
    }
    res.json(result.data)
  }

  static async getOneProduct (req, res) {
    const result = await Products.getOne(req.params)
    if (!result.success) {
      return res.status(500).json({ error: result.error })
    }
    res.status(200).json(result.data)
  }

  static async createProduct (req, res) {
    const result = await Products.createProduct(req.body)
    if (!result.success) {
      return res.status(500).json({ error: result.error })
    }
    res.status(201).json(result.data)
  }

  static async deleteProduct (req, res) {
    const result = await Products.deleteOne(req.body)
    if (!result.success) {
      return res.status(400).json({ err: result.error })
    }
    res.status(201).json(result.data)
  }

  static async modifyProduct (req, res) {
    const result = await Products.modifyOne(req.body)
    if (!result.success) {
      return res.status(400).json({ err: result.error })
    }
    res.status(201).json(result.data)
  }
}

export default ProductController
