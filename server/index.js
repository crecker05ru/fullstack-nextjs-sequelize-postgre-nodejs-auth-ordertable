const express = require("express")
require('dotenv').config() 
const sequelize = require("./db")
const models = require("./models/models")
const fileUpload = require("express-fileupload")
const cors  = require("cors")
const router = require("./routes/index")
const errorHandler = require("./middleware/ErrorHandlingMiddleware")
const path = require("path")
const socket = require("socket.io");
const app = express()

const PORT = process.env.PORT
app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, "static")))
app.use('/api',router)
app.use(errorHandler)

let server = app.listen(PORT,() => console.log(`Server started on port ${PORT}`) )

const io = socket(server)
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

io.on('connection', (socket) => {
    console.log('a user connected');
    io.emit('connection','user connected')
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
        
      });
    socket.on('disconnect', () => {
      console.log('user disconnected');
    //   io.emit('disconnection','user disconnected')
    socket.emit("dis", "disconn");
    });
    
  });
  

start()