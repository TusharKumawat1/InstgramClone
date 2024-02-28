import React, { useContext, useState } from "react";
import Styles from "../../styles/components/searchbox.module.css";
import NStyles from "../../styles/components/Notification.module.css"
export default function Notification() {
  return (
    <div className={Styles.container}>
     <div className={NStyles.top}>
     <h2>
        {" "}
        <i className="fa-solid fa-angle-left"></i>{" "}
      </h2>
      <p className={NStyles.heading}>Friend Requests</p>
     </div>
     <div className={NStyles.frendRequests}>
      <div className={NStyles.request}>
        <img src="" className={NStyles.pfp}></img>
        <div className={NStyles.details}>
          <p>username</p>
          <p>full name</p>
        </div>
        <div className={NStyles.btns}>
          <button>Confirm</button>
          <button>Delete</button>
        </div>
      </div>
     </div>
    </div>
  );
}
