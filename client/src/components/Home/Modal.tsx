import React, { useContext, useEffect, useState } from "react";
import Styles from "../../styles/modal.module.css";
import ClickAwayListener from "react-click-away-listener";
import { MyContext } from "../../context/Mycontext";
import { FileUploader } from "react-drag-drop-files";
import Loader from "../Auth/Signup/Loader";

export default function Modal() {
  const { setIsModalOpen, getImageUrl } = useContext(MyContext);
  const [image, setImage] = useState<string>();
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
          setImage((p) => uploadedImage.secure_url);
          setIsImageLoading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    console.log(image);
  }, [image]);
  const fileTypes = ["JPG", "PNG", "GIF"];
  return (
    <div className={Styles.overlay}>
      <i className={`fa-solid fa-x ${Styles.closeBtn}`}></i>
      <ClickAwayListener onClickAway={() => setIsModalOpen(false)}>
        <div className={Styles.modal}>
          {/* <FileUploader
            handleChange={handleDropFile}
            name="file"
            types={fileTypes}
          /> */}
          <p className={Styles.title}>Create new post</p>
          {/* If any image is available then show the image  */}
          {image ? (
            <div className={Styles.imageContainer}>
              <img src={image} alt="" className={Styles.createPost} />
            </div>
          ) : // else show upload image
          isImageLoading ? (
            "loading..."
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
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={handleFile}
                />
              </div>
            </div>
          )}
        </div>
      </ClickAwayListener>
    </div>
  );
}
