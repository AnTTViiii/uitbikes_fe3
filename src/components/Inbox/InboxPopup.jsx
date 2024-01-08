import { ForumRounded } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React, { useState } from 'react'

const InboxPopup = ({openChat}) => {
    const [open, setOpen] = useState(false)

    return (
        <IconButton className={`inbox-chat ${open ? "chat-opened" : "chat-closed"}`} onClick={() => {openChat(!open); setOpen(!open)}}>
            <ForumRounded />
        </IconButton>
    )
}

export default InboxPopup
