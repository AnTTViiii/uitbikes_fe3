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
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:9090/api/conversations/${user.username}`)
            .then((res) => {
                setChat(res.data)
                setMessages(res.data.messages)
            })
            .catch((err) => {console.log(err)})
    }, [user.username, messages])

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
                        setIsScrolling(false)
                    }
                })
                .catch((err)=> {console.log(err)})
        }
    }

    const handleScroll = () => {
        // Detect whether the user is scrolling
        if (bottomRef.current) {
            const isAtBottom = bottomRef.current.getBoundingClientRect().bottom <= window.innerHeight;
            setIsScrolling(!isAtBottom);
        }
    };

    useEffect(() => {
        // Add a scroll event listener to the conversation container
        const conversationContainer = document.querySelector('.conversation');
        conversationContainer.addEventListener('scroll', handleScroll);

        return () => {
            // Remove the event listener when the component unmounts
            conversationContainer.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        // Scroll to the bottom only if isScrolling is false
        if (!isScrolling && bottomRef.current) {
            bottomRef.current.scrollIntoView(isScrolling ? { behavior: 'smooth' } : {});
        }
    }, [messages, isScrolling])

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
