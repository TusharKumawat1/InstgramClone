import React, { useContext, useEffect, useState } from "react";
import Styles from "../../../styles/components/ModalCss/Step1.module.css";
import { MyContext } from "../../../context/Mycontext";
import ImageLoader from "../ImageLoader";

export default function Step1() {
  const { images, setImages, setPostSteps } = useContext(MyContext);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsImageLoading(true);
    const file = e.target.files?.[0];
    if (file) {
      setImages((p: string[]) => [...p, URL.createObjectURL(file)]);
      setIsImageLoading(false);
      setPostSteps(1);
    }
  };
  return (
    <div className={Styles.container}>
      <p className={Styles.title}>Create new post</p>
      {isImageLoading ? (
        <ImageLoader />
      ) : (
        <div className={Styles.createPost}>
          <div className={Styles.icons}>
            <i className={`fa-regular fa-image ${Styles.icon1}`}></i>
            <i
              className={`fa-regular fa-square-caret-right fa-thin ${Styles.icon2}`}
            ></i>
          </div>
          <p>Drag photos and videos here</p>
          <div className={Styles.inputContainer}>
            <label htmlFor="file">Select from computer</label>
            <input type="file" name="file" id="file" onChange={handleFile} />
          </div>
        </div>
      )}
    </div>
  );
}
