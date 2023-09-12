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

module.exports = router