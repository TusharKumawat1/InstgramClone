import React, { useContext, useState } from "react";
import Styles from "../styles/auth.module.css";
import LoginForm from "../components/Auth/Login/LoginForm";
import Footer from "../components/Home/Footer";
import Hero from "../components/Auth/Hero";
import { MyContext } from "../context/Mycontext";
import SignupForm from "../components/Auth/Signup/SignupForm";
import Dob from "../components/Auth/Signup/Dob";
import OtpPage from "../components/Auth/Signup/OtpPage";

export default function Auth() {
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