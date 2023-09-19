import { readJson } from '../utils.js'
import { validateProduct, validateProductUUID, validateProductModify } from '../schemas/Product.js'
import crypto from 'node:crypto'

const products = readJson('./products')

class ResultObject {
  constructor (success, errorMessage, data) {
    this.success = success
    this.error = errorMessage || false
    this.data = data || null
  }
}

class ProductsModel {
  static getAll () {
    return new ResultObject(true, null, products)
  }

  static getOne ({ id }) {
    const producto = products.find((prod) => prod._id === id)
    if (!producto) {
      return new ResultObject(false, 'No se ha encontrado el producto', null)
    }
    return new ResultObject(true, null, producto)
  }

  static createProduct (product) {
    const validation = validateProduct({
      _id: crypto.randomUUID(),
      ...product
    })
    if (!validation.success) {
      return new ResultObject(false, validation.error.message, null)
    }
    const newProduct = validation.data
    products.push(newProduct)
    return new ResultObject(true, false, newProduct)
  }

  static deleteOne (idObj) {
    const validation = validateProductUUID(idObj)
    if (!validation.success) {
      return new ResultObject(false, 'La validacion ha fallado. Verifica ssel producto ingresado.', null)
    }

    const index = products.findIndex((prod) => prod._id === validation.data._id)
    if (index === -1) {
      return new ResultObject(false, 'No se ha encontrado el producto.', null)
    }
    const productoToRemove = products[index]
    products.splice(index, 1)

    return new ResultObject(true, false, productoToRemove)
  }

  static modifyOne (productFields) {
    const { error, data } = validateProductModify(productFields)
    if (error) {
      return new ResultObject(false, 'La validacion ha fallado. Verifica los campos.', null)
    }
    const index = products.findIndex((prod) => prod._id === data._id)
    if (index === -1) {
      return new ResultObject(false, 'No se ha encontrado el producto', null)
    }
    products[index] = {
      ...products[index],
      ...data
    }
    return new ResultObject(true, false, products[index])
  }
}

export default ProductsModel
