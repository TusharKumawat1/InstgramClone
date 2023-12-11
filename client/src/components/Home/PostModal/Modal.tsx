import React, { useContext, useEffect, useState } from "react";
import Styles from "../../../styles/components/ModalCss/modal.module.css";
import ClickAwayListener from "react-click-away-listener";
import { MyContext } from "../../../context/Mycontext";
import ImageLoader from "../ImageLoader";
import Step1 from "./Step1";
import Step2 from "./Step2";

export default function Modal() {
  const { setIsModalOpen, setImages, postSteps, setPostSteps } =
    useContext(MyContext);
  var    ContentToDisplay = <Step1 />;
  const fileTypes = ["JPG", "PNG", "GIF"];
  if (postSteps === 0) {
    ContentToDisplay = <Step1 />;
  } else if (postSteps === 1) {
    ContentToDisplay = <Step2 />;
  }
  return (
    <div className={Styles.overlay}>
      <i className={`fa-solid fa-x ${Styles.closeBtn}`}></i>
      <ClickAwayListener
        onClickAway={() => {
          setIsModalOpen(false);
          setImages([]);
          setPostSteps(0);
        }}
      >
        <div className={Styles.modal}>{ContentToDisplay}</div>
      </ClickAwayListener>
    </div>
  );
}
