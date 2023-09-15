import cors from 'cors'

const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:1234',
  'https://expressjs.com',
  'https://www.google.com'
]

function corsMiddleware (EXTERNAL_ORIGINS = ALLOWED_ORIGINS) {
  return cors({
    origin: (origin, callback) => {
      if (EXTERNAL_ORIGINS.includes(origin)) {
        return callback(null, true)
      }
      if (!origin) {
        return callback(null, true)
      }
      return callback(new Error('CORS NOT ALLOWED IN THIS ORIGIN'), false)
    }
  })
}

export default corsMiddleware
