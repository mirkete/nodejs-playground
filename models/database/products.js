import mysql from 'mysql2/promise'
import { validateProduct, validateProductUUID, validateProductModify } from '../../schemas/Product.js'
import crypto from 'node:crypto'

const config = {
  host: 'localhost',
  user: 'root',
  password: 'mirkito18',
  database: 'prueba'
}

const connection = await mysql.createConnection(config)
connection.config.namedPlaceholders = true

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
        'SELECT * FROM `products` ' +
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
      return new ResultObject(false, 'VALIDATION FAILED. CHECK PRODUCT FIELDS', null)
    }
    const { _id, name, brand, price, type, categories } = validation.data
    try {
      await connection.query(
        'INSERT INTO products(_id, name, brand, price, type) ' +
        'VALUES (?, ?, ?, ?, ?); '
        , [_id, name, brand, price, type].concat(categories)
      )
      const categoriesFields = Array(categories.length).fill('?').join(',')
      const categoriesResult = await connection.query(
        'SELECT category_id from categories ' +
        'WHERE LOWER(category_name) IN ( ' + categoriesFields + ')'
        , categories
      )

      if (categoriesResult[0].length > 0) {
        const categoriesRelations = categoriesResult[0].map((category) => {
          return `(${category.category_id}, "${_id}")`
        }).join(',')

        const categoriesAsSQL = { toSqlString: function () { return categoriesRelations } }

        await connection.query(
          'INSERT INTO product_categories (category_id, product_id) ' +
          'VALUES ?', [categoriesAsSQL]
        )
        return new ResultObject(true, null, 'PRODUCT CREATED SUCCESSFULLY')
      }

      return new ResultObject(true, null, 'PRODUCT CREATED BUT CATEGORIES NOT FOUND')
    } catch (e) {
      return new ResultObject(false, 'PRODUCT CREATION FAILED', null)
    }
  }

  static async deleteOne ({ _id }) {
    const validation = validateProductUUID({ _id })
    if (!validation.success) {
      return new ResultObject(false, 'INVALID ID', null)
    }

    try {
      await connection.query(
        'DELETE FROM product_categories ' +
        'WHERE product_id = ?; '
        , [_id]
      )

      await connection.query(
        'DELETE FROM products ' +
        'WHERE _id = ?'
        , [_id]
      )
      return new ResultObject(true, false, 'PRODUCT REMOVED SUCCESSFULLY')
    } catch (e) {
      return new ResultObject(false, 'PRODUCT REMOVE FAILED', null)
    }
  }

  static async modifyOne (productFields) {
    const validation = validateProductModify(productFields)
    const finalProduct = validation.data
    if (!validation.success || finalProduct.length < 2) {
      return new ResultObject(false, 'THE PRODUCT ID OR ANY OTHER FIELD IS INVALID')
    }

    const { _id } = finalProduct
    delete finalProduct._id

    try {
      await connection.query(
        'UPDATE products ' +
        'SET ? ' +
        'WHERE _id = ?'
        , [finalProduct, _id]
      )
      return new ResultObject(true, false, validation.data)
    } catch (e) {
      return new ResultObject(false, 'PRODUCT MODIFY FAILED', null)
    }
  }
}

export default Product
