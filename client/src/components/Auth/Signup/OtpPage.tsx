import React, { useContext, useCallback, useState } from "react";
import Styles from "../../../styles/components/login.module.css";
import { optpng, asset6, asset7 } from "../../../assets/index";
import { MyContext } from "../../../context/Mycontext";
import Dobstyles from "../../../styles/components/dob.module.css";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
export default function OtpPage() {
  const { setIsLogin, setSignupSteps, userDetails } = useContext(MyContext);
  const [isloading, setisloading] = useState(false)
  const [otpValue, setotpValue] = useState("")
  const [error, seterror] = useState(true);
  const navigate=useNavigate();
  const handleSubmit=async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(otpValue==="696969"){
      setisloading(true)
      const res=await fetch(`${process.env.REACT_APP_SERVER_PORT}/auth/createUser`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(userDetails)
      })
      const result=await res.json();
      if (result.success) {
        localStorage.setItem("token",result.res)
        navigate("/")
   
        localStorage.removeItem("userDetails")
        setSignupSteps(0)
      }else{
        console.log(result)
      }
      setisloading(false)
    }
  }
  return (
    <div className={Styles.loginFormContainer}>
      <form className={Styles.form} onSubmit={handleSubmit}>
        <img
          src={optpng}
          alt="img"
          width={90}
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
            value={otpValue}
            onChange={(e)=>{
              setotpValue(e.target.value)
              if (e.target.value==="696969") {
                seterror(false)
              }
            }}
          />
          <label htmlFor="password" className={Styles.formInputLable}>
            ######
          </label>
        </div>

        <button
          className={Styles.loginBtn}
          type="submit"
          disabled={error}
        >
         {isloading?<Loader/>: "Confirm"}
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
