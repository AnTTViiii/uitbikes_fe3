import { SendRounded } from '@mui/icons-material'
import { Button, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import "./inbox.css"
import axios from 'axios'
import { useSelector } from 'react-redux'

const Inbox = () => {
    const { isAuthed } = useSelector((state) => state.auth);
    const user = isAuthed ? JSON.parse(localStorage.getItem('user')): []

    const [messages, setMessages] = useState([])
    const [chat, setChat] = useState([])
    const bottomRef = useRef(null)

    useEffect(() => {
        axios.get(`http://localhost:9090/api/conversations/${user.username}`)
            .then((res) => {
                setChat(res.data)
                setMessages(res.data.messages)
            })
            .catch((err) => {console.log(err)})
    }, [user.username, messages, bottomRef])

    const textRef = useRef()

    const handleSendMessage = () => {
        if (textRef.current.value) {
            const body = {
                chatId: chat.id,
                senderId: user.username,
                text: textRef.current.value
            }

            axios.post(`http://localhost:9090/api/messages`, body)
                .then((res) => {
                    if (res.data === true) {
                        textRef.current.value = ''
                    }
                })
                .catch((err)=> {console.log(err)})
        }
    }

    useEffect(() => {
        bottomRef.current?.scrollIntoView();
    }, [messages, bottomRef])

    return (
        <div className='inbox'>
            <div className="inbox-header">Hỗ trợ khách hàng</div>

            <div className="conversation">
            {
                messages && messages.map((m) => (
                    m.senderId === user.username ? (
                        <div className="my-message">{m.text}</div>
                    ) : (
                        <div className="admin-message">{m.text}</div>
                    )
                ))
            }
                <div className="lastMessage" ref={bottomRef} />
            </div>

            <div className="send-text-section">
                <TextField inputRef={textRef} autoComplete='off' type="text" size='small' />
                <Button variant='contained' size='small' onClick={handleSendMessage}><SendRounded /></Button>
            </div>
        </div>
    )
}

export default Inbox
