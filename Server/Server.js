const express = require('express')
const cookieParser = require('cookie-parser')
const db = require('./Config/dbconnect')
const Controller = require("./Controller/productController");
const initRouter = require('./Router')
require('dotenv').config()
const cors = require('cors')
const http = require('http');
const { initSocketIO } = require('./Socket')
db.connect()

const app = express()

const server = http.createServer(app)
const io =  initSocketIO(server)
app.use(cors({
    origin :['http://localhost:3000', 'http://localhost:5500'],
    methods : ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
    optionSuccessStatus:200
}))
const port = process.env.PORT || 8888
// const hostname = '192.168.10.135';
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
initRouter(app)

app.listen(port, () => {
    // console.log(`server running on the port http://${hostname}:${port}`)
    console.log(`server running on the port http://localhost:${port}`)
})
