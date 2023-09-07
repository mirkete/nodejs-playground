const http = require("node:http")
const {obtenerPuerto} = require("./services")
const routes = require("./routes")

const server = http.createServer(routes)

obtenerPuerto(3000)
.then((puerto) => {
    server.listen(puerto, () => {
        console.log("Servidor encendido en el puerto "+puerto)
    })
})