import React, { useContext, useCallback, useState } from "react";
import Styles from "../styles/login.module.css";
import { cake, asset6, asset7 } from "../assets/index";
import { MyContext } from "../context/Mycontext";
import Dobstyles from "../styles/dob.module.css";
export default function OtpPage() {
  const { setIsLogin, setSignupSteps, setUserDetails } = useContext(MyContext);
  return (
    <div className={Styles.loginFormContainer}>
      <form className={Styles.form}>
        <img
          src={cake}
          alt="img"
          width={150}
          height={100}
          className={Styles.instagramFont}
        />

        <h5>Just one more step</h5>
        <p className={Dobstyles.info1}>Enter the 6-digit code 696969</p>
        <div className={Styles.inputContainer}>
          <input
            type="text"
            id="otp"
            placeholder=" "
            className={Styles.formInput}
          />
          <label htmlFor="password" className={Styles.formInputLable}>
            ######
          </label>
        </div>

        <button
          className={Styles.loginBtn}
          type="submit"
          onClick={() => setSignupSteps(3)}
        >
          Confirm
        </button>
        <span
          className={Dobstyles.goBackBtn}
          style={{ marginTop: "20px" }}
        >
          <span onClick={() => setSignupSteps(0)}>Change Number </span> <span style={{ color: "black" }}>|</span>{" "}
          <span>Request New Code</span>
        </span>
      </form>
      <div className={Styles.gotoSingup}>
        <p>Have an account? </p>
        <span onClick={() => setIsLogin(true)} style={{ cursor: "pointer" }}>
          {" "}
          &nbsp;Log in
        </span>
      </div>
      <div className={Styles.getApp}>
        <p>Get the app</p>
        <div>
          <a href="https://play.google.com/store/apps/details?id=com.instagram.android">
            <img src={asset6} alt="playstore" width={130} height={40} />
          </a>
          <a href='ms-windows-store://pdp/?productid=9nblggh5l9xt&amp;referrer=appbadge&amp;source=www.instagram.com&amp;mode=mini&amp;pos=0%2C0%2C1920%2C1032" rel="nofollow noreferrer'>
            <img src={asset7} alt="playstore" width={130} height={40} />
          </a>
        </div>
      </div>
    </div>
  );
}
