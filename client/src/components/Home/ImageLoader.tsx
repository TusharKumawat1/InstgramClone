import React from "react";
import Styles from "../../styles/components/imageloader.module.css";
export default function ImageLoader() {
  return <div className={Styles.loaderContainer}>
    <div className={Styles.loader}></div>
  </div>
}
