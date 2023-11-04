import React from "react";
import Styles from "../styles/home.module.css";
import LoginForm from "./LoginForm";
import Footer from "./Footer";
export default function Home() {
  return (
    <div className={Styles.container}>
      <div className={Styles.hero}>
        <div className={Styles.heroImageContainer}></div>
        <LoginForm/>
      </div>
     <Footer/>
    </div>
  )
}