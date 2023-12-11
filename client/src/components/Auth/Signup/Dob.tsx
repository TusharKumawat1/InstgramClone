import React, { useContext, useCallback, useState, useEffect } from "react";
import Styles from "../../../styles/components/login.module.css";
import { cake, asset6, asset7 } from "../../../assets/index";
import { MyContext } from "../../../context/Mycontext";
import Dobstyles from "../../../styles/components/dob.module.css";
import { SelectDatepicker } from "react-select-datepicker";
import { useForm } from "react-hook-form";

type FormValues = {
 dob:"string"
};
export default function Dob() {
  const { setIsLogin, setSignupSteps, setUserDetails ,userDetails} = useContext(MyContext);
  const [value, setValue] = useState<Date | null>(new Date("2022-01-22"));
  const [error, seterror] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>();
  const onDateChange = useCallback((date: Date | null) => {
    if (date !== null) {
      const currentDate = new Date();
      const selectedDate = new Date(date);
      const differenceInMilliseconds =
        currentDate.getTime() - selectedDate.getTime();
      const thirteenYearsInMilliseconds = 13 * 365 * 24 * 60 * 60 * 1000;
      if (differenceInMilliseconds < thirteenYearsInMilliseconds) {
        seterror(true);
      } else {
        seterror(false);
        setValue(date);
      }
    }
  }, []);
  const handlesubmit = (data:FormValues) => {
    console.log(value)
    setUserDetails((p: any) => ({
      ...p,
      dob: value,
    }));
    setSignupSteps(2)
  };
  useEffect(() => {
    console.log(userDetails)
  }, [userDetails])
  
  return (
    <div className={Styles.loginFormContainer}>
      <form className={Styles.form} onSubmit={handleSubmit(handlesubmit)} >
        <img
          src={cake}
          alt="img"
          width={150}
          height={100}
          className={Styles.instagramFont}
        />

        <h5>Add Your Birthday</h5>
        <p className={Dobstyles.info1}>
          This won't be a part of your public profile.
        </p>
        <a href="" className={Dobstyles.link}>
          Why do I need to provide my birthday?
        </a>
        <SelectDatepicker
          className={Dobstyles.datePicker}
          selectedDate={value}
          onDateChange={onDateChange}
        />
        <p className={Dobstyles.info2}>
          You need to enter the date you were born
        </p>
        <p className={Dobstyles.info2}>
          Use your own birthday, even if this account is for a business, a pet,
          or something else
        </p>
        <button
          className={Styles.loginBtn}
          type="submit"
          disabled={error}
        >
          Next
        </button>
        <span onClick={() => setSignupSteps(0)} className={Dobstyles.goBackBtn}>
          Go Back
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
