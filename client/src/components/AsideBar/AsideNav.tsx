import React, { useContext, useState, useEffect } from "react";
import { instagramFont, reels } from "../../assets";
import Styles from "../../styles/components/asidenav.module.css";
import MoreOptions from "./MoreOptions";
import { MyContext } from "../../context/Mycontext";
import { isMoreType } from "../../context/ContextApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ClickAwayListener from "react-click-away-listener";
import Skeleton from "react-loading-skeleton";
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
    <Link to={"/"}>
    <img
          src={instagramFont}
          alt="img"
          width={120}
          height={50}
          className={Styles.logo}
        /> 
        <i className={`${Styles.instaLogo} fa-brands fa-instagram`}></i>
    </Link>
        <Link to="/" className={Styles.options}>
          <i className="fa-solid fa-house"></i><span>Home</span>
        </Link>
        <Link to="#" className={Styles.options}>
          {" "}
          <i className="fa-solid fa-magnifying-glass"></i><span>Search</span>
        </Link>
        <Link to="#" className={Styles.options}>
          <i className="fa-regular fa-compass"></i><span>Explore</span>
        </Link>
        <Link to="#" className={Styles.options}>
          {" "}
          <img
            src={reels}
            alt="img"
            width={25}
            height={25}
            className={Styles.reelsIcon}
          />
          <span>Reels</span>
        </Link>
        <Link to="#" className={Styles.options}>
          <i className="fa-brands fa-facebook-messenger"></i><span>Messages</span>
        </Link>
        <Link to="#" className={Styles.options}>
          <i className="fa-regular fa-heart"></i><span>Notification</span>
        </Link>
        <Link
          to="#"
          className={Styles.options}
          onClick={() => setIsModalOpen(true)}
        >
          <i className="fa-regular fa-square-plus"></i><span>Create</span>
        </Link>
        <Link to={`/profile/${authenticUser && authenticUser.userId.username}`} className={Styles.options}>
        {!authenticUser? <Skeleton circle={true} height={35} width={35}/> :<img
            src={
             authenticUser && authenticUser.pfp
            }
            alt="img"
            width={40}
            height={40}
            className={Styles.pfp}
          />}
          <span>Profile</span>
        </Link>
      </div>
      {isMoreOptionsAvailable && (
        <ClickAwayListener onClickAway={() => setIsMoreOptionsAvailable(false)}>
          <MoreOptions />
        </ClickAwayListener>
      )}
      <div className={Styles.sectionSecond}>
        <p className={Styles.options}>
          <i className="fa-brands fa-threads"></i><span>Threads</span>
        </p>
        <p className={Styles.options} onClick={toggleIsMoreOptions}>
          <i className="fa-solid fa-bars"></i><span>More</span>
        </p>
      </div>
    </div>
  );
}
