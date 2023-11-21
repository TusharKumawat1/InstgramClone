import React, { useContext } from "react";
import Styles from "../styles/home.module.css";
import LoginForm from "../components/LoginForm";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import { MyContext } from "../context/Mycontext";
import SignupForm from "../components/SignupForm";
import Dob from "../components/Dob";

export default function Home() {
  
  const {isLogin,isDobPage}=useContext(MyContext);
  return (
    <div className={Styles.container}>
      <div className={Styles.hero}>
        <Hero/>
        {isLogin ?<LoginForm/> : isDobPage? <Dob/> :<SignupForm/>}
        
      </div>
     <Footer/>
    </div>
  )
}