import React, { useContext, useState } from "react";
import Styles from "../styles/home.module.css";
import LoginForm from "../components/LoginForm";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import { MyContext } from "../context/Mycontext";
import SignupForm from "../components/SignupForm";
import Dob from "../components/Dob";
import OtpPage from "../components/OtpPage";

export default function Home() {
  const {isLogin,SignupSteps,setSignupSteps}=useContext(MyContext);
  let contentToDisplay;
  if (isLogin) {
    contentToDisplay = <LoginForm />;
  } else {
    if (SignupSteps === 0) {
      contentToDisplay = <SignupForm />;
    } else if (SignupSteps === 1) {
      contentToDisplay = <Dob />;
    }else if (SignupSteps === 2) {
      contentToDisplay = <OtpPage/>;
    }
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.hero}>
      <Hero />
        {contentToDisplay}
        
      </div>
     <Footer/>
    </div>
  )
}