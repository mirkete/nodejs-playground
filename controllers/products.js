export default class ProductController {
  constructor ({ productsModel }) {
    this.productsModel = productsModel
  }

  getProducts = async (req, res) => {
    const result = await this.productsModel.getAll()
    if (!result.success) {
      res.status(500).json({ err: result.error })
    }
    res.json(result.data)
  }

  getOneProduct = async (req, res) => {
    const result = await this.productsModel.getOne(req.params)
    if (!result.success) {
      return res.status(500).json({ error: result.error })
    }
    res.status(200).json(result.data)
  }

  createProduct = async (req, res) => {
    const result = await this.productsModel.createProduct(req.body)
    if (!result.success) {
      return res.status(500).json({ error: result.error })
    }
    res.status(201).json(result.data)
  }

  deleteProduct = async (req, res) => {
    const result = await this.productsModel.deleteOne(req.body)
    if (!result.success) {
      return res.status(400).json({ err: result.error })
    }
    res.status(201).json(result.data)
  }

  modifyProduct = async (req, res) => {
    const result = await this.productsModel.modifyOne(req.body)
    if (!result.success) {
      return res.status(400).json({ err: result.error })
    }
    res.status(201).json(result.data)
  }
}
