import React from "react";
import Styles from "./styles/home.module.css";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
export default function Page() {
  return (
    <div className={Styles.container}>
      <div className={Styles.hero}>
        <div className={Styles.heroImageContainer}></div>
        <LoginForm/>
      </div>
     <Footer/>
    </div>
  );
}
