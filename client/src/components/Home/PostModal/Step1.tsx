import React, { useContext, useEffect, useState } from "react";
import Styles from "../../../styles/components/ModalCss/Step1.module.css";
import ClickAwayListener from "react-click-away-listener";
import { MyContext } from "../../../context/Mycontext";
import ImageLoader from "../ImageLoader";

export default function Step1() {
  const {getImageUrl, images, setImages,setPostSteps } =
    useContext(MyContext);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsImageLoading(true);
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        if (reader.result) {
          const base64String = reader.result.toString(); //converting image to base64

          const uploadedImage = await getImageUrl(base64String); //uploding to cloudnary
          setImages((p: any) => [...p, uploadedImage.secure_url]);
          setIsImageLoading(false);
          setPostSteps(1)
        }
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    console.log(images);
  }, [images]);
  return (
    <div className={Styles.container}>
      <p className={Styles.title}>Create new post</p>
      {/* If any image is available then show the image  */}
      {/* {images.length> 0 ? (
            <div className={Styles.imageContainer}>
              <img src={images[0]} alt="" className={Styles.image} />
            </div>
          ) : // else show upload image */}
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
