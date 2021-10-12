import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import { io } from "socket.io-client";
import styles from '../styles/socketioStyles.module.css'

const SocketIo = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    // const socket = useRef()
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState('')
    const SERVER_URL = '/'
    const socketRef = useRef(null)

    const socket = io.connect('/')    

    function sendMessage(value) {
        if (value){
            socket.emit('chat message',value)
            
        }
        console.log('value',value)
        console.log('messages',messages)
        setValue('')
    }
    socket.on('chat message',(value)=>{
        setMessages([...messages,value])
        // window.scrollTo(0, document.body.scrollHeight);
    })
    socket.on('connection', (value)=> {
        setMessages([...messages,value])
    })
    socket.on('disconnect',(value)=>{
        setMessages([...messages,value])
    })

useEffect(()=>{
    socketRef.current = io(SERVER_URL)
    socketRef.current.emit('connection',(value)=>{
        setMessages([...messages,value])
    })
    return()=> {
        socketRef.current.disconnect()
    }
})

    return (
        <div className={styles.chatBody}>
            <ul className={styles.messages}>
                {messages.map(m=> {
                    <li key={m}>{m}</li>
                })}
                 </ul>
            <div className={styles.form}>
                <input value={value} className={styles.input} onChange={e => setValue(e.target.value)}/>
                <button onClick={sendMessage}>Отправить</button>
            </div>
        </div>
    );
};

export default SocketIo;