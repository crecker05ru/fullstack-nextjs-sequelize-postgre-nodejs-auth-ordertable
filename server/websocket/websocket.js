const ws = require('ws')
const PORT = 3002
const wss = new ws.Server({
    port :PORT, 
},() => console.log("websocket started on " + PORT))

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
