import React, { useRef, useEffect, useContext } from "react";
import Styles from "../../styles/components/asidenav.module.css";
import { MyContext } from "../../context/Mycontext";
import { isMoreType } from "../../context/ContextApi";
import { useNavigate } from "react-router-dom";

export default function MoreOptions() {
  const { setIsMoreOptionsAvailable } = useContext<isMoreType>(MyContext);
  const navigate=useNavigate();
 const handleLogout=()=>{
  localStorage.removeItem("token")
  navigate("/auth")
 }
  return (
    <div className={Styles.moreOptionsContainer} >
      <div className={Styles.above}>
        <span className={Styles.options}>
          <i className="fa-solid fa-gear"></i>Settings
        </span>
        <span className={Styles.options}>
          <i className="fa-solid fa-chart-line"></i>Your activity
        </span>
        <span className={Styles.options}>
          <i
            className="fa-regular fa-bookmark"
            style={{ marginRight: "5px" }}
          ></i>
          Saved
        </span>
        <span className={Styles.options}>
          <i className="fa-solid fa-repeat"></i>Switch appearance
        </span>
        <span className={Styles.options}>
          <i className="fa-solid fa-circle-exclamation"></i>Repoart a problem
        </span>
      </div>
      <div className={Styles.below}>
        <span className={Styles.options}>Switch account</span>
        <span className={Styles.options} onClick={handleLogout}>Log out</span>
      </div>
    </div>
  );
}
