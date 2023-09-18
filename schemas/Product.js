import { z } from 'zod'

const UUID = z.object({
  _id: z.string().uuid()
})

const Product = z.object({
  _id: z.string().uuid(),
  name: z.string({
    required_error: 'Product name is required.',
    invalid_type_error: 'Name must be a string.'
  }),
  categories: z.string().array().max(5, {
    message: 'Categories must be an array with 5 arguments as max.'
  }),
  brand: z.string(),
  price: z.number({
    invalid_type_error: 'Price param must be type number.'
  }).int().positive().max(10000000, {
    message: 'Max price is 10000000 (10 million)'
  }),
  type: z.string()
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

export { validateProduct, validateProductUUID, validateProductModify }
