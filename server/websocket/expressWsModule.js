require('dotenv').config() 
const path = require("path")
const fs = require('fs')
var express = require('express');
const app = express()
var server = require('http').Server(app);
var expressWs = require('express-ws')(app,server);

let history = []
let clients = []
let currentClient

let aWss = expressWs.getWss('/echo');
console.log('in main',{aWss})

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

module.exports = {app: app,server: server}