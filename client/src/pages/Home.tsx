import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Styles from "../styles/home.module.css"
import AsideNav from '../components/AsideNav';
export default function Home() {
    const navigate=useNavigate();
    useEffect(()=>{
        if (!localStorage.getItem("token")) {
            navigate("/auth")
        }
    },[])
  return (
    <div className={Styles.container}>
     <AsideNav/>
    </div>
  )
}
