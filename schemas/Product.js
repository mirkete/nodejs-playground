const { z } = require('zod')

const UUID = z.object({
  _id: z.string().uuid()
})

const Product = z.object({
  _id: z.string().uuid(),
  nombre: z.string({
    required_error: 'Product name is required.',
    invalid_type_error: 'Name must be a string.'
  }),
  categorias: z.string().array().max(5, {
    message: 'Categorias must be an array with 5 arguments as max.'
  }),
  marca: z.string(),
  precio: z.number({
    invalid_type_error: 'Price param must be type number.'
  }).int().positive().max(10000000, {
    message: 'Max price is 10000000 (10 million)'
  }),
  tipo: z.string()
})

function validateProduct (product) {
  return Product.safeParse(product)
}

function validateProductUUID (id) {
  return UUID.safeParse(id)
}

function validateProductModify (product) {
  return Product.partial().required({
    _id: true
  }).safeParse(product)
}

module.exports = { validateProduct, validateProductUUID, validateProductModify }
