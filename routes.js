const express = require('express')
const router = express.Router()
const products = require('./products.json')
const crypto = require('node:crypto')
const validateProduct = require('./schemas/Product')

router.get('/', (req, res) => {
  res.status(200).send('<h1>OK</h1>')
})

router.get('/products', (req, res) => {
  res.json(products)
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

router.use((req, res) => {
  res.status(404).send('<h1>404 Not found</h1>')
})

module.exports = router
