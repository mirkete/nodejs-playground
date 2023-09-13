const express = require('express')
const router = express.Router()
const products = require('./products.json')
const crypto = require('node:crypto')
const { validateProduct, validateProductUUID, validateProductModify } = require('./schemas/Product')

router.get('/', (req, res) => {
  res.status(200).send('<h1>OK</h1>')
})

router.get('/products', (req, res) => {
  res.json(products)
})

router.get('/products/:id', (req, res) => {
  const { id } = req.params
  const producto = products.find((prod) => prod._id === id)
  if (!producto) {
    res.status(400).send('<h1>PRODUCT NOT FOUND</h1>')
  }
  res.status(200).json(producto)
})

router.post('/products', (req, res) => {
  const validation = validateProduct({
    _id: crypto.randomUUID(),
    ...req.body
  })
  if (!validation.success) {
    return res.status(400).json({ err: validation.error })
  }
  const newProduct = validation.data
  products.push(newProduct)
  res.status(201).json(newProduct)
})

router.delete('/products', (req, res) => {
  const validation = validateProductUUID(req.body)

  if (!validation.success) {
    return res.status(400).json({ err: validation.error })
  }

  const index = products.findIndex((prod) => prod._id === validation.data._id)
  if (index === -1) {
    return res.status(400).send('<h1>PRODUCT NOT FOUND</h1>')
  }
  products.splice(index, 1)
  res.status(201).send('<h1>PRODUCT REMOVED</h1>')
})

router.patch('/products', (req, res) => {
  const { error, data } = validateProductModify(req.body)
  if (error) {
    res.status(400).send(error.issues)
  }
  const index = products.findIndex((prod) => prod._id === data._id)
  if (index === -1) {
    return res.status(400).send('<h1>PRODUCT NOT FOUND</h1>')
  }
  products[index] = {
    ...products[index],
    ...data
  }
  res.status(200).send(data)
})

router.use((req, res) => {
  res.status(404).send('<h1>404 Not found</h1>')
})

module.exports = router
