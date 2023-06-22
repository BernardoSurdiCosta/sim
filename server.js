const express = require("express")
const ProductsController = require("./controllers/products.controller")
const UsersController = require("./controllers/users.controller")

const productsController = new ProductsController()
const userController = new UsersController()

const app = express()
const cors = require('cors');
app.use(cors());

app.use(express.json())
app.use("/assets", express.static("./public/assets"))
app.use("/", express.static("./views/home"))
app.use("/favoritos", express.static('./views/favoritos'));

app.get('/api/produto',productsController.getALL)
app.post('/api/login',userController.Login)
app.post('/api/likes',userController.Like)
app.post('/api/dislikes',userController.Dislike)

app.listen(3000, () => {
    console.log(`Servidor está rodando em http://localhost:3000`)
})