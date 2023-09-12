const http = require('node:http')

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

module.exports = { obtenerPuerto }
