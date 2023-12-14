import React, { useContext, useEffect, useRef } from "react";
import Styles from "../../../styles/components/ModalCss/step3.module.css";
import { MyContext } from "../../../context/Mycontext";
export default function Step3() {
  const { images, setPostSteps, ModalRef, aspectRatio } = useContext(MyContext);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const gotoStep2 = () => {
    setPostSteps(1);
    if (ModalRef.current) {
      ModalRef.current.style.width = "36%";
    }
  };
  useEffect(() => {
    if (imageContainerRef.current) {
      if (aspectRatio === "original") {
        imageContainerRef.current.style.width = "95%";
      } else if (aspectRatio === "1X1") {
        imageContainerRef.current.style.width = "100%";
        imageContainerRef.current.style.height = "100%";
      } else if (aspectRatio === "4X5") {
        imageContainerRef.current.style.width = "80%";
        imageContainerRef.current.style.height = "100%";
      } else if (aspectRatio === "16X9") {
        imageContainerRef.current.style.width = "100%";
        imageContainerRef.current.style.height = "60%";
      }
    }
  });
  return (
    <div className={Styles.container}>
      <div className={Styles.Top}>
        <i
          className={`fa-solid fa-arrow-left ${Styles.previousBtn}`}
          onClick={gotoStep2}
        ></i>
        <p>Edit</p>
        <button className={Styles.nextBtn} type="button">
          Next
        </button>
      </div>
      <div className={Styles.mainContainer}>
        <div className={Styles.imageHolder}>
          <div className={Styles.imageContainer} ref={imageContainerRef}>
            <img src={images[0]} alt="" className={Styles.image} />
          </div>
        </div>
        <div className={Styles.filterSection}></div>
      </div>
    </div>
  );
}
