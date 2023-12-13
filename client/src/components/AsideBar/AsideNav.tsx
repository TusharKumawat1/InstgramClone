import React, { useContext, useState, useEffect } from "react";
import { instagramFont, reels } from "../../assets";
import Styles from "../../styles/components/asidenav.module.css";
import MoreOptions from "./MoreOptions";
import { MyContext } from "../../context/Mycontext";
import { isMoreType } from "../../context/ContextApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ClickAwayListener from "react-click-away-listener";
export default function AsideNav() {
  const { isMoreOptionsAvailable, setIsMoreOptionsAvailable, setIsModalOpen, } =
    useContext<isMoreType>(MyContext);
    const {authenticUser}=useContext(MyContext);
  const toggleIsMoreOptions = () => {
    setIsMoreOptionsAvailable((p) => !p);
  };
  const navigate = useNavigate();
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
        <Link to="/" className={Styles.options}>
          <i className="fa-solid fa-house"></i>Home
        </Link>
        <Link to="" className={Styles.options}>
          {" "}
          <i className="fa-solid fa-magnifying-glass"></i>Search
        </Link>
        <Link to="" className={Styles.options}>
          <i className="fa-regular fa-compass"></i>Explore
        </Link>
        <Link to="" className={Styles.options}>
          {" "}
          <img
            src={reels}
            alt="img"
            width={25}
            height={25}
            className={Styles.reelsIcon}
          />
          Reels
        </Link>
        <Link to="" className={Styles.options}>
          <i className="fa-brands fa-facebook-messenger"></i>Messages
        </Link>
        <Link to="" className={Styles.options}>
          <i className="fa-regular fa-heart"></i>Notification
        </Link>
        <Link
          to=""
          className={Styles.options}
          onClick={() => setIsModalOpen(true)}
        >
          <i className="fa-regular fa-square-plus"></i>Create
        </Link>
        <Link to="/profile" className={Styles.options}>
          <img
            src={
             authenticUser && authenticUser.pfp
            }
            alt="img"
            width={40}
            height={40}
            className={Styles.pfp}
          />
          Profile
        </Link>
      </div>
      {isMoreOptionsAvailable && (
        <ClickAwayListener onClickAway={() => setIsMoreOptionsAvailable(false)}>
          <MoreOptions />
        </ClickAwayListener>
      )}
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
