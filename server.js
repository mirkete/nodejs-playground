import SqlProductsModel from './models/database/products.js'
import localProductsModel from './models/products.js'
import { createApp } from './index.js'

const databases = {
  local: localProductsModel,
  sql: SqlProductsModel
}

function getModel ({ model }) {
  return databases[model]
}

const productsModel = getModel({ model: process.argv[2] ?? 'sql' })

createApp({ productsModel })
