import React, { useContext, useEffect, useState } from "react";
import Styles from "../../../styles/components/ModalCss/modal.module.css";
import ClickAwayListener from "react-click-away-listener";
import { MyContext } from "../../../context/Mycontext";
import ImageLoader from "../ImageLoader";
import Step1 from "./Step1";

export default function Modal() {
  const { setIsModalOpen, getImageUrl } = useContext(MyContext);
 
  const fileTypes = ["JPG", "PNG", "GIF"];
  return (
    <div className={Styles.overlay}>
      <i className={`fa-solid fa-x ${Styles.closeBtn}`}></i>
      <ClickAwayListener onClickAway={() => setIsModalOpen(false)}>
        <div className={Styles.modal}>
          <Step1/>
        </div>
      </ClickAwayListener>
    </div>
  );
}
