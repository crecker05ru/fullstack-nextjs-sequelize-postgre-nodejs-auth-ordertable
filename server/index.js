const express = require("express")
let expressWs = require('express-ws')(app);
require('dotenv').config() 
const sequelize = require("./db")
const models = require("./models/models")
const fileUpload = require("express-fileupload")
const cors  = require("cors")
const router = require("./routes/index")
const errorHandler = require("./middleware/ErrorHandlingMiddleware")
const path = require("path")
const app = express()
const ws = require('ws')

const PORT = process.env.PORT

let server = app.listen(PORT,() => console.log(`Server started on port ${PORT}`) )

const wss = new ws.Server({server})

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
        server
    } catch (e){
        console.log(e)
    }
}

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     io.emit('connection','user connected')
//     socket.on('chat message', (msg) => {
//         console.log('message: ' + msg);
//         io.emit('chat message', msg);
        
//       });
//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//     //   io.emit('disconnection','user disconnected')
//     socket.emit("dis", "disconn");
//     });
    
//   });
  
//
let history = []
let clients = []

wss.on('connection', function connection(ws){
    console.log('user connected')
    // console.log('wss.clients',wss.clients)
    clients.push(wss.clients)
    console.log('clients',clients)
    ws.on('close',()=>console.log('disconnected'))
    ws.on('message', function (message){
        message = JSON.parse(message);
        switch(message.event){
            case 'message':
                broadcastMessage(message)
                history.push(message)
                
                history.slice(-100)
                console.log('history',history)
                break;
            case 'connection':
                broadcastMessage(message)
                // broadcastMessage(history)
                client.send(JSON.stringify(history))
                console.log('user connected in connection')
                break ;   
        }
    } )
})

// const message = {
//     event: 'message/connection',
//     id: 123,
//     date: '30.09.2021',
//     username: 'anvar',
//     message: 'what?'
// }

function broadcastMessage(message) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}
//


start()