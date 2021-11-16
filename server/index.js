const express = require("express")
const https = require('https')
const http = require('http')
require('dotenv').config() 
const sequelize = require("./db")
const models = require("./models/models")
const fileUpload = require("express-fileupload")
const cors  = require("cors")
const router = require("./routes/index")
const errorHandler = require("./middleware/ErrorHandlingMiddleware")
const path = require("path")
const {app,server} = require('./websocket/expressWsModule')
// const app = express()
const fs = require('fs')
let expressWs = require('express-ws')
const ws = require('ws')

// const serverOptions = {
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem')
//   }

const PORT = process.env.PORT

app.use(cors({
  origin: '*'
}))
app.use(express.json())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, "static")))
app.use('/api',router)
app.use(errorHandler)

if(process.env.NODE_ENV === 'production'){
    app.use('/',express.static(path.join(__dirname,'client','build')))

    app.get('*',(req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        // app.listen(PORT,() => console.log(`Server started on port ${PORT}`) )
        server.listen(PORT,() => console.log(`Server started on port ${PORT}`))
    } catch (e){
        console.log(e)
    }
}



start()