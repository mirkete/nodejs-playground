import { readJson } from '../utils.js'
import { validateProduct, validateProductUUID, validateProductModify } from '../schemas/Product.js'
import crypto from 'node:crypto'

const products = readJson('./products')

class ResultObject {
  constructor (success, errorMessage, data) {
    this.success = success
    if (errorMessage) this.error = { error: errorMessage }
    if (data) this.data = data
  }
}
// faltaria implementarlo aca y en el controller

class Product {
  static getAll () {
    return products
  }

  static getOne ({ id }) {
    const producto = products.find((prod) => prod._id === id)
    if (!producto) {
      return false
    }
    return producto
  }

  static createProduct (product) {
    const validation = validateProduct({
      _id: crypto.randomUUID(),
      ...product
    })
    if (!validation.success) {
      return false
    }
    const newProduct = validation.data
    products.push(newProduct)
    return true
  }

  static deleteOne (idObj) {
    const validation = validateProductUUID(idObj)
    if (!validation.success) {
      return false
    }

    const index = products.findIndex((prod) => prod._id === validation.data._id)
    if (index === -1) {
      return false
    }
    products.splice(index, 1)

    return true
  }

  static modifyOne (productFields) {
    const { error, data } = validateProductModify(productFields)
    if (error) {
      return false
    }
    const index = products.findIndex((prod) => prod._id === data._id)
    if (index === -1) {
      return false
    }
    products[index] = {
      ...products[index],
      ...data
    }
    return true
  }
}

export default Product
