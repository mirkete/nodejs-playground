import mysql from 'mysql2/promise'
import { validateProduct } from '../../schemas/Product.js'
import crypto from 'node:crypto'

const config = {
  host: 'localhost',
  user: 'root',
  password: 'mirkito18',
  database: 'prueba'
}

const connection = await mysql.createConnection(config)

class ResultObject {
  constructor (success, errorMessage, data) {
    this.success = success
    this.error = errorMessage || false
    this.data = data || null
  }
}

class Product {
  static async getAll () {
    try {
      const result = await connection.query('SELECT _id, name,brand,price,type FROM products')
      return new ResultObject(true, null, result[0])
    } catch (e) {
      return new ResultObject(false, e, null)
    }
  }

  static async getOne ({ id }) {
    try {
      const result = await connection.query(
        'SELECT * FROM products ' +
      'WHERE _id = ?', [id])
      return new ResultObject(true, null, result[0])
    } catch (e) {
      return new ResultObject(false, 'No se ha podido encontrar el producto', null)
    }
  }

  static async createProduct (product) {
    const validation = validateProduct({
      _id: crypto.randomUUID(),
      ...product
    })
    if (!validation.success) {
      return new ResultObject(false, validation.error.message, null)
    }
    const { _id, name, brand, price, type } = validation.data
    try {
      await connection.query(
        'INSERT INTO products(_id, name, brand, price, type) ' +
        'VALUES (?, ?, ?, ?, ?)',
        [_id, name, brand, price, type]
      )
      // Deberia agregar las categorias en la relacional tambien
      return new ResultObject(true, null, validation.data)
    } catch (e) {
      return new ResultObject(false, 'No se ha podido crear el producto', null)
    }
  }

  static deleteOne (idObj) {
  }

  static modifyOne (productFields) {
  }
}

export default Product
