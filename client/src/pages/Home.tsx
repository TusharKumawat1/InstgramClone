import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Styles from "../styles/home.module.css"
import AsideNav from '../components/AsideNav';
import Feed from '../components/Feed';
export default function Home() {
    const navigate=useNavigate();
    const getUserInfo=async()=>{
      
    }
    useEffect(()=>{
        if (!localStorage.getItem("token")) {
            navigate("/auth")
        }
    },[])
  return (
    <div className={Styles.container}>
     <AsideNav/>
     <Feed/>             
    </div>
  )
}
