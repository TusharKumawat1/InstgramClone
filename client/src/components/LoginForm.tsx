import React from "react";
import Styles from "../styles/login.module.css";
import { instagramFont, asset6, asset7 } from "../assets/index";

export default function LoginForm() {
  return (
    <div className={Styles.loginFormContainer}>
      <form className={Styles.form}>
        <img src={instagramFont} alt="img" width={180} height={60} className={Styles.instagramFont}/>
        <div className={Styles.inputContainer}>
          <input
            type="text"
            id="user"
            placeholder=" "
            className={Styles.formInput}
          />
          <label htmlFor="user" className={Styles.formInputLable}>
            Phone number, username, or email
          </label>
        </div>
        <div className={Styles.inputContainer}>
          <input
            type="password"
            id="password"
            placeholder=" "
            className={Styles.formInput}
          />
          <label htmlFor="password" className={Styles.formInputLable}>
            Password
          </label>
        </div>
        <button className={Styles.loginBtn}>Log in</button>
        <div className={Styles.divider}>
        <span className={Styles.line}></span>
        <span>OR</span>
        <span className={Styles.line}></span>
        </div>
        <a href="https://www.facebook.com/login.php?skip_api_login=1&api_key=124024574287414&kid_directed_site=0&app_id=124024574287414&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Foauth%3Fclient_id%3D124024574287414%26locale%3Den_US%26redirect_uri%3Dhttps%253A%252F%252Fwww.instagram.com%252Faccounts%252Fsignup%252F%26response_type%3Dcode%252Cgranted_scopes%26scope%3Demail%26state%3D%257B%2522fbLoginKey%2522%253A%2522fruojd1m0pfm91h718zfdw85891pyu7ag1snxttufr9xq66g4s5r%2522%252C%2522fbLoginReturnURL%2522%253A%2522%252Ffxcal%252Fdisclosure%252F%253Fnext%253D%25252F%2522%257D%26ret%3Dlogin%26fbapp_pres%3D0%26logger_id%3D6d8cfb55-d9e7-42a1-aee3-fa3b5fef977d%26tp%3Dunspecified&cancel_url=https%3A%2F%2Fwww.instagram.com%2Faccounts%2Fsignup%2F%3Ferror%3Daccess_denied%26error_code%3D200%26error_description%3DPermissions%2Berror%26error_reason%3Duser_denied%26state%3D%257B%2522fbLoginKey%2522%253A%2522fruojd1m0pfm91h718zfdw85891pyu7ag1snxttufr9xq66g4s5r%2522%252C%2522fbLoginReturnURL%2522%253A%2522%252Ffxcal%252Fdisclosure%252F%253Fnext%253D%25252F%2522%257D%23_%3D_&display=page&locale=en_GB&pl_dbl=0" className={Styles.loginViaFacebook}>
        <i className="fa-brands fa-square-facebook"></i> Log in with Facebook
        </a>

        <a href="/" className={Styles.forgotPass}>Forgot password?</a>
      </form>
      <div className={Styles.gotoSingup}>
        <p>Dont have an account? </p> 
        <span> Sign up</span>
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
