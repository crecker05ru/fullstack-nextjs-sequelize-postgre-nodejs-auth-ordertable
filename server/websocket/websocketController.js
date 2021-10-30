// var express = require('express');
// var expressWs = require('express-ws');
// var expressWs = expressWs(express());
// var app = expressWs.app;

const fs = require('fs')

// const ws = require('ws')
// const PORT = 3002
// const wss = new ws.Server({
//     port :PORT, 
// },() => console.log("websocket started on " + PORT))

// let history = []
// let clients = []

// wss.on('connection', function connection(ws){
//     console.log('user connected')
//     // console.log('wss.clients',wss.clients)
//     clients.push(wss.clients)
//     console.log('clients',clients)
//     ws.on('close',()=>console.log('disconnected'))
//     ws.on('message', function (message){
//         message = JSON.parse(message);
//         switch(message.event){
//             case 'message':
//                 broadcastMessage(message)
//                 history.push(message)
                
//                 history.slice(-100)
//                 console.log('history',history)
//                 break;
//             case 'connection':
//                 broadcastMessage(message)
//                 // broadcastMessage(history)
//                 client.send(JSON.stringify(history))
//                 console.log('user connected in connection')
//                 break ;   
//         }
//     } )
// })

// const message = {
//     event: 'message/connection',
//     id: 123,
//     date: '30.09.2021',
//     username: 'anvar',
//     message: 'what?'
// }

// function broadcastMessage(message) {
//     wss.clients.forEach(client => {
//         client.send(JSON.stringify(message))
//     })
// }



module.exports = function websocketController(app){
  

  
  fs.writeFile("websocket/webSocket_messages.txt", "Здесь сообщения", function(error){
 
    if(error) throw error; // если возникла ошибка
    console.log("Асинхронная запись файла завершена. Содержимое файла:");
    let data = fs.readFileSync("websocket/webSocket_messages.txt", "utf8");
    console.log(data);  // выводим считанные данные
});

  console.log('ws module')
  let history = []
  let clients = []
  let currentClient

app.ws('/echo', (ws, req) =>{
  var aWss = app.getWss('/echo')

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

  


}
