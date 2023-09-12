const fs = require("node:fs/promises")
const express = require("express")
const router = express.Router()
const products = require("./products.json")
const crypto = require("node:crypto")

router.get("/", (req, res) => {
    res.status(200).send("<h1>OK</h1>")
})

router.get("/image", (req, res, next) => {
    fs.readFile("./imagen.jpg")
    .then((data) => {
        res.writeHead(200, {
            "Content-Type": "image/jpeg",
            "Content-Length": data.length
        })
        res.status(200).end(data)
    })
    .catch(next)
})

router.get("/excel", (req, res) => {
    res.download("./archivo.csv")
})

router.get("/products", (req, res) => {
    res.json(products)
})

router.post("/products", (req, res) => {
    const {nombre, categorias, marca, precio, tipo} = req.body
    const newProduct = {
        _id: crypto.randomUUID(),
        nombre,
        categorias,
        marca,
        precio,
        tipo
    }
    products.push(newProduct)
    res.status(201).send("PRODUCT ADDED")
})

router.use((req, res) => {
    res.status(404).send("<h1>404 Not found</h1>")
})

// function routes(req, res){
//     res.setHeader("Content-Type", "text/html;charset=utf-8")
//     const {method, url} = req
//     switch(method){
//         case "GET":
//             switch(url){
//                 case "/":
//                     res.statusCode = 200
//                     return res.end("<h1>OK</h1>")
//                 case "/imagen":
//                     fs.readFile("./imagen.jpg")
//                     .then((data) => {
//                         res.setHeader("Content-Type", "image/jpg")
//                         res.end(data)
//                     })
//                     .catch((err) => {
//                         res.end("Ha ocurrido un error: "+err)
//                     })
//                     break
//                 case "/excel":
//                     fs.readFile("./archivo.csv")
//                     .then((data) => {
//                         res.setHeader("Content-Type", "text/csv")
//                         res.statusCode = 200
//                         res.end(data)
//                     })
//                     .catch((err) => {
//                         res.statusCode = 500
//                         res.end("Ha habido un error: " + err)
//                     })
//                     break
//                 default: 
//                     res.statusCode = 404
//                     res.end("<h1>404 Not found</h1>")
//             }
//         case "POST":
//             switch(url){
//                 case "/":
//                     let body = ""
//                     req.on("data", (chunk) => {
//                         body += chunk.toString()
//                     })
//                     req.on("end", () => {
//                         body = JSON.parse(body)
//                         res.end(JSON.stringify(body))
//                     })
//                     break
//             }
//     }
// }

module.exports = router