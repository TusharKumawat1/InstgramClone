import React from "react";
import Styles from "../styles/home.module.css";
import LoginForm from "../components/LoginForm";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
export default function Home() {
  return (
    <div className={Styles.container}>
      <div className={Styles.hero}>
        <Hero/>
        <LoginForm/>
      </div>
     <Footer/>
    </div>
  )
}