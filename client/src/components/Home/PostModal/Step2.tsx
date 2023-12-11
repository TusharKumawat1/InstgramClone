import React, { useContext } from "react";
import Styles from "../../../styles/components/ModalCss/Step2.module.css";
import { MyContext } from "../../../context/Mycontext";
export default function Step2() {
  const { images, setImages } = useContext(MyContext);
  return (
    <div className={Styles.container}>
      <div className={Styles.Top}>
        <i className={`fa-solid fa-arrow-left ${Styles.previousBtn}`}></i>
        <p>Crop</p>
        <button className={Styles.nextBtn} type="button">Next</button>
      </div>
      <div className={Styles.imageContainer}>
        <img src={images[0]} alt="loading.." className={Styles.image} />
      </div>
    </div>
  );
}
