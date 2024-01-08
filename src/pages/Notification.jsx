import React, { useEffect } from 'react'
import Notify from '../components/Notify/Notify'

const Notification = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Notify />
  )
}

export default Notification
