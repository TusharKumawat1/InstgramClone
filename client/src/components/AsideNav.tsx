import React, { useContext, useState } from "react";
import { instagramFont, reels } from "../assets";
import Styles from "../styles/asidenav.module.css";
import MoreOptions from "./MoreOptions";
import { MyContext } from "../context/Mycontext";
import { isMoreType } from "../context/ContextApi";

export default function AsideNav() {
  const { isMoreOptionsAvailable, setIsMoreOptionsAvailable } =
    useContext<isMoreType>(MyContext);
  const [isAlreadyOpen, setIsAlreadyOpen] = useState(false);
  const toggleIsMoreOptions = () => {
    setIsAlreadyOpen((p) => !p);
    if (!isAlreadyOpen) {
      setIsMoreOptionsAvailable((p) => !p);
      console.log(isMoreOptionsAvailable);
    }
  };
  return (
    <div className={Styles.aside}>
      <div className={Styles.sectionFirst}>
        <img
          src={instagramFont}
          alt="img"
          width={120}
          height={50}
          className={Styles.logo}
        />
        <span className={Styles.options}>
          <i className="fa-solid fa-house"></i>Home
        </span>
        <span className={Styles.options}>
          {" "}
          <i className="fa-solid fa-magnifying-glass"></i>Search
        </span>
        <span className={Styles.options}>
          <i className="fa-regular fa-compass"></i>Explore
        </span>
        <span className={Styles.options}>
          {" "}
          <img
            src={reels}
            alt="img"
            width={25}
            height={25}
            className={Styles.reelsIcon}
          />
          Reels
        </span>
        <span className={Styles.options}>
          <i className="fa-brands fa-facebook-messenger"></i>Messages
        </span>
        <span className={Styles.options}>
          <i className="fa-regular fa-heart"></i>Notification
        </span>
        <span className={Styles.options}>
          <i className="fa-regular fa-square-plus"></i>Create
        </span>
        <span className={Styles.options}>
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
            }
            alt="img"
            width={40}
            height={40}
            className={Styles.pfp}
          />
          Profile
        </span>
      </div>
      {isMoreOptionsAvailable && <MoreOptions setIsAlreadyOpen={setIsAlreadyOpen}/>}
      <div className={Styles.sectionSecond}>
        <p className={Styles.options}>
          <i className="fa-brands fa-threads"></i>Threads
        </p>
        <p className={Styles.options} onClick={toggleIsMoreOptions}>
          <i className="fa-solid fa-bars"></i>More
        </p>
      </div>
    </div>
  );
}
