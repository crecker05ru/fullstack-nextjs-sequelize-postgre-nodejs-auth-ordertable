require('dotenv').config() 
const sequelize = require("./db")
const fileUpload = require("express-fileupload")
const cors  = require("cors")
const router = require("./routes/index")
const errorHandler = require("./middleware/ErrorHandlingMiddleware")
const path = require("path")
const fs = require('fs')
const websocketController = require('./websocket/websocketController')
const expressWsModule = require('./websocket/expressWsModule')
const wsRouter = './routes/wsRouter'
var express = require('express');
// console.log({express})
// var expressWs = require('express-ws');
const { send } = require('process')
const app = express()

// var expressWs = expressWs(express());
// var app = expressWs.app;
var expressWs = require('express-ws')(app);

app.use(express.static('public'));



const PORT = process.env.PORT

app.use(cors({
  origin: '*'
}))
// app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, "static")))
app.use('/api',router)
// app.use('/',wsRouter)
app.use(errorHandler)

let history = []
let clients = []
let currentClient

// expressWsModule(app)
// console.log('expressWs',expressWs)
// console.log('express',express)
// console.log('express()',express())
// console.log({expressWs})

let aWss = expressWs.getWss('/echo');
console.log('in main',{aWss})

// websocketController.socketExpressWS(app,aWss)
// console.log('websocketController.socketExpressWS(app,aWss)',websocketController.socketExpressWS(app,aWss))

app.ws('/echo', (ws, req) =>{
  
  console.log('Socket Connected');
  // ws.send(history)
  ws.send(JSON.stringify(history))
  // currentClient = aWss.clients
  // clients.push(currentClient)
  console.log('history',history)
  


  //   function broadcastMessage(message) {
  //     aWss.clients.forEach(client => {
  //         client.send(JSON.stringify(message))
  //     })
  // }
  ws.on('message', msg => {
    // ws.send(msg)
    msg = JSON.parse(msg)
    currentClient =  msg.username.slice()
    
    if(msg.event === 'message'){
      history.push(msg)
      history.slice(-100)
    }
    if(msg.event === 'connection'){
      clients.push(currentClient)
    }
    console.log('clients',clients)
    
    aWss.clients.forEach(client => {
      // client.send(msg)
      client.send(JSON.stringify(msg))
      console.log('msg',msg)
  })
    
})



ws.on('close', () => {
    console.log('WebSocket was closed')
    console.log('currentClient',currentClient)
    console.log('clients after filter',clients)
    clients.splice(clients.indexOf(currentClient),1)
    currentClient = undefined
})

})





// app.listen(PORT);


// const serverOptions = {
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem')
//   }



// let server = app.listen(PORT,() => console.log(`Server started on port ${PORT}`) )
// const server = http.createServer(app)

// expressWs(app,server)




const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT,() => console.log(`Server started on port ${PORT}`) )
        // server.listen(PORT)
        // app.listen(PORT);
    } catch (e){
        console.log(e)
    }
}

  
//


// app.ws('/echo', (ws, req) => {
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
// ws.on('message', msg => {
//     ws.send(msg)
// })

// ws.on('close', () => {
//     console.log('WebSocket was closed')
// })
// })

// const message = {
//     event: 'message/connection',
//     id: 123,
//     date: '30.09.2021',
//     username: 'anvar',
//     message: 'what?'
// }


//


start()