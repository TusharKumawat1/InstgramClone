import React, { useEffect } from 'react'
import Styles from "../styles/pages/editPage.module.css"
import { useNavigate } from 'react-router-dom'
export default function EditProfile() {
  const navigate =useNavigate();
  useEffect(()=>{
    if (!localStorage.getItem("token")) {
      navigate("/auth");
    }
  },[])
  return (
    <div className={Styles.container}>
      <div className={Styles.settings}>

      </div>
      <div className={Styles.editSection}>
        <div className={Styles.editProfile}>
          <h2>Edit Profile</h2>
          <div className={Styles.profile}>
            
          </div>
        </div>
      </div>
    </div>
  )
}
