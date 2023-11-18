import React, { useContext, useEffect, useState } from "react";
import Styles from "../styles/signup.module.css";
import { instagramFont, asset6, asset7 } from "../assets/index";
import { MyContext } from "../context/Mycontext";
import { useForm } from "react-hook-form";

type FormValues = {
  user: string;
  fullname: string;
  username: string;
  password: string;
};

export default function SignupForm() {
  const [validateUser, setValidateUser] = useState(false);
  const [ishide, setIsHide] = useState(true);
  const { setIsLogin } = useContext(MyContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<FormValues>();
  const isValidEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };
  const phoneRegex = /^[0-9]{10}$/;
  const onSubmit = (data: FormValues) => {
    console.log(data);
  };
  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (isValidEmail(value)) setValidateUser((p) => !p);
    else if (phoneRegex.test(value)) setValidateUser((p) => !p);
    else setValidateUser((p) => false);
  };
  const handleOnSubmit = async () => {
    console.log("data");
    //todo sendig user details to backend and create a dob page
  };

  return (
    <div className={Styles.loginFormContainer}>
      <form className={Styles.form} onSubmit={handleSubmit(onSubmit)}>
        <img
          src={instagramFont}
          alt="img"
          width={180}
          height={70}
          className={Styles.instagramFont}
        />
        <p className={Styles.instructions}>
          Sign up to see photos and videos from your friends.
        </p>
        <button className={Styles.loginViaFacebookBtn}>
          Log in with facebook
        </button>
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
            {...register("user", { required: true })}
            onChange={onchange}
          />
          <label htmlFor="user" className={Styles.formInputLable}>
            Mobile Number or email
          </label>
          {watch("user") && (
            <>
              {validateUser ? (
                <i
                  className={`fa-regular fa-circle-check ${Styles.checkMark}`}
                ></i>
              ) : (
                <i className={`fa-regular fa-circle-xmark ${Styles.xMark}`}></i>
              )}
            </>
          )}
        </div>
        <div className={Styles.inputContainer}>
          <input
            type="text"
            id="fullname"
            placeholder=" "
            className={Styles.formInput}
            {...register("fullname", { required: true })}
          />
          <label htmlFor="fullname" className={Styles.formInputLable}>
            Full Name
          </label>
          {watch("fullname") ? (
            <i className={`fa-regular fa-circle-xmark ${Styles.xMark}`}></i>
          ) : (
            <i className={`fa-regular fa-circle-check ${Styles.checkMark}`}></i>
          )}
        </div>
        <div className={Styles.inputContainer}>
          <input
            type="text"
            id="username"
            placeholder=" "
            className={Styles.formInput}
            {...register("username", { required: true })}
          />
          <label htmlFor="username" className={Styles.formInputLable}>
            Username
          </label>
          {watch("username") && (
            <i className={`fa-regular fa-circle-xmark ${Styles.xMark}`}></i>
          )}
          <i className={`fa-solid fa-rotate-right ${Styles.rotateMark}`}></i>
        </div>
        <div className={Styles.inputContainer}>
          <input
            type={ishide ? "password" : "text"}
            id="password"
            placeholder=" "
            className={`${Styles.formInput} ${Styles.passwordField}`}
            {...register("password", { required: true, minLength: 8 })}
          />
          <label htmlFor="password" className={Styles.formInputLable}>
            Password
          </label>
          {watch("password") && (
            <div className={Styles.checkPass}>
              {watch("password").length > 7 ? (
                <i
                  className={` fa-regular fa-circle-check ${Styles.checkMark}`}
                ></i>
              ) : (
                <i className={`fa-regular fa-circle-xmark ${Styles.xMark}`}></i>
              )}

              <p onClick={() => setIsHide((p) => !p)}>
                {ishide ? "Show" : "Hide"}
              </p>
            </div>
          )}
        </div>

        <p className={Styles.guidLines}>
          People who use our service may have uploaded your contact information
          to Instagram.{" "}
          <a href="https://www.facebook.com/help/instagram/261704639352628">
            Learn More
          </a>
        </p>

        <p className={Styles.guidLines}>
          By signing up, you agree to our{" "}
          <a href="https://help.instagram.com/581066165581870/?locale=en_US">
            Terms , Privacy Policy and Cookies Policy .
          </a>
        </p>
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
