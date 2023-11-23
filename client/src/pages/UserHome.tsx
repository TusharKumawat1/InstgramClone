import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserHome() {
    const navigate=useNavigate();
    useEffect(()=>{
        if (!localStorage.getItem("token")) {
            navigate("/")
        }
    },[])
  return (
    <div>
      home
    </div>
  )
}
