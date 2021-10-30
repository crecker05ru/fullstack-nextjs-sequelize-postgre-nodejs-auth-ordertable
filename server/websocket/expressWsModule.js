const https     = require('https')
const fs        = require('fs')
const express   = require('express')
const expressWs = require('express-ws')

module.exports = function websocketController(app){   
  expressWs(app)
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
  