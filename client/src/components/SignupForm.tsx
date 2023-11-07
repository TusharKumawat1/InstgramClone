import React, { useContext } from "react";
import Styles from "../styles/signup.module.css";
import { instagramFont, asset6, asset7 } from "../assets/index";
import { MyContext } from "../context/Mycontext";
import { useForm, SubmitHandler } from "react-hook-form"

type OnstubitType={
  data:{
    username:String,
    fullname:String,
    email:String,
    password:String,
  },
  e:React.FormEvent<HTMLFormElement>,
}
export default function SignupForm() {
  const { setIsLogin } = useContext(MyContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnstubitType>()
 
  const handleOnSubmit=async(data:OnstubitType)=>{
    console.log(data)
    //todo sendig user details to backend and create a dob page 
  }
  return (
    <div className={Styles.loginFormContainer}>
      <form className={Styles.form} onSubmit={handleSubmit(handleOnSubmit)}>
        <img
          src={instagramFont}
          alt="img"
          width={180}
          height={70}
          className={Styles.instagramFont}
        />
        <h4 className={Styles.instructions}>Sign up to see photos and videos from your friends.</h4>
        <button className={Styles.loginViaFacebookBtn}>Log in with facebook</button>
        <div className={Styles.divider}>
          <span className={Styles.line}></span>
          <span>OR</span>
          <span className={Styles.line}></span>
        </div>
        <div className={Styles.inputContainer}>
          <input
            type="text"
            id="user"
            placeholder=" "
            className={Styles.formInput}
            {...register('email', { required: true })}
          />
          <label htmlFor="user" className={Styles.formInputLable}>
            Mobile Number or email
          </label>
        </div>
        <div className={Styles.inputContainer}>
          <input
            type="text"
            id="Fullname"
            placeholder=" "
            className={Styles.formInput}
            {...register('fullname', { required: true })}
          />
          <label htmlFor="user" className={Styles.formInputLable}>
            Full Name
          </label>
        </div>
        <div className={Styles.inputContainer}>
          <input
            type="text"
            id="user"
            placeholder=" "
            className={Styles.formInput}
            {...register('username', { required: true })}
          />
          <label htmlFor="user" className={Styles.formInputLable}>
            Username
          </label>
        </div>
        <div className={Styles.inputContainer}>
          <input
            type="password"
            id="password"
            placeholder=" "
            className={Styles.formInput}
            {...register('password', { required: true ,minLength:8})}
          />
          <label htmlFor="password" className={Styles.formInputLable}>
            Password
          </label>
        </div>
     
       <p className={Styles.guidLines}>People who use our service may have uploaded your contact information to Instagram. <a href="https://www.facebook.com/help/instagram/261704639352628">Learn More</a></p>

      <p className={Styles.guidLines}>By signing up, you agree to our <a href="https://help.instagram.com/581066165581870/?locale=en_US">Terms , Privacy Policy and Cookies Policy .</a></p>
        <button className={Styles.SignupBtn}>Sign up</button>
      </form>
      <div className={Styles.gotoLogin}>
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
