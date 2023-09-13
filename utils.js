import http from 'node:http'
import { createRequire } from 'node:module'

function obtenerPuerto (puertoDeseado) {
  const server = http.createServer()
  return new Promise((resolve, reject) => {
    server.listen(puertoDeseado, () => {
      const { port } = server.address()
      server.close(() => {
        resolve(port)
      })
    })
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log('El puerto deseado esta en uso.\nEn su lugar, se usara otro')
        resolve(obtenerPuerto(0))
      }
    })
  })
}

const require = createRequire(import.meta.url)

function readJson (path) {
  return require(path)
}

export { obtenerPuerto, readJson }
