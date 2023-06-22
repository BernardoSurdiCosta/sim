const express = require("express")
const ProductsController = require("./controllers/products.controller")
const productsController = new ProductsController()

const app = express()


app.use(express.json())
app.use("/home", express.static("./index.html"))
app.use("/index.css", express.static('./CSS/index.css'))
app.use("/script.js", express.static("./script.js"))

app.use("/serviceTypes", express.static('./HTML/serviceTypes.html'))
app.use("/serviceTypes.js", express.static('./JS/serviceTypes.js'))

app.get('/api/products',productsController.getALL)

app.listen(3000, () => {
    console.log(`Servidor está rodando em http://localhost:3000`)
})