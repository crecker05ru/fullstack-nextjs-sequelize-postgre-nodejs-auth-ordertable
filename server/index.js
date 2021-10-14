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
const app = express()
const fs = require('fs')
let expressWs = require('express-ws')
const ws = require('ws')

// const serverOptions = {
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem')
//   }

const PORT = process.env.PORT

// let server = app.listen(PORT,() => console.log(`Server started on port ${PORT}`) )
const server = http.createServer(app)

expressWs(app,server)
app.use(cors({
  origin: '*'
}))
app.use(express.json())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, "static")))
app.use('/api',router)
app.use(errorHandler)



// const io = socket(server)
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        // app.listen(PORT,() => console.log(`Server started on port ${PORT}`) )
        server.listen(PORT)
    } catch (e){
        console.log(e)
    }
}

  
//
let history = []
let clients = []

app.ws('/echo', (ws, req) => {
// ws.on('connection',()=>{
//     console.log('user connected')
//     clients.push(ws.clients)
//     console.log('clients',clients)
// })

// ws.on('message', function (message){
//             message = JSON.parse(message);
//             switch(message.event){
//                 case 'message':
//                     broadcastMessage(message)
//                     history.push(message)
                    
//                     history.slice(-100)
//                     console.log('history',history)
//                     break;
//                 case 'connection':
//                     broadcastMessage(message)
//                     // broadcastMessage(history)
//                     client.send(JSON.stringify(history))
//                     console.log('user connected in connection')
//                     break ;   
//             }
//         } )

// ws.on('close',()=>console.log('disconnected'))

// function broadcastMessage(message) {
//     ws.clients.forEach(client => {
//         client.send(JSON.stringify(message))
//     })
// }
ws.on('message', msg => {
    ws.send(msg)
})

ws.on('close', () => {
    console.log('WebSocket was closed')
})
})

// const message = {
//     event: 'message/connection',
//     id: 123,
//     date: '30.09.2021',
//     username: 'anvar',
//     message: 'what?'
// }


//


start()