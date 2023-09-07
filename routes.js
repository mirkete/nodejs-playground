const fs = require("node:fs/promises")

function routes(req, res){
    res.setHeader("Content-Type", "text/html;charset=utf-8")
    const {method, url} = req
    switch(method){
        case "GET":
            switch(url){
                case "/":
                    res.statusCode = 200
                    return res.end("<h1>OK</h1>")
                case "/imagen":
                    fs.readFile("./imagen.jpg")
                    .then((data) => {
                        res.setHeader("Content-Type", "image/jpg")
                        res.end(data)
                    })
                    .catch((err) => {
                        res.end("Ha ocurrido un error: "+err)
                    })
                    break
                case "/excel":
                    fs.readFile("./archivo.csv")
                    .then((data) => {
                        res.setHeader("Content-Type", "text/csv")
                        res.statusCode = 200
                        res.end(data)
                    })
                    .catch((err) => {
                        res.statusCode = 500
                        res.end("Ha habido un error: " + err)
                    })
                    break
                default: 
                    res.statusCode = 404
                    res.end("<h1>404 Not found</h1>")
            }
        case "POST":
            switch(url){
                case "/":
                    let body = ""
                    req.on("data", (chunk) => {
                        body += chunk.toString()
                    })
                    req.on("end", () => {
                        body = JSON.parse(body)
                        res.end(JSON.stringify(body))
                    })
                    break
            }
    }
}

module.exports = routes