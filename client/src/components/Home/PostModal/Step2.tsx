import React, { useContext, useState, useRef, useEffect } from "react";
import Styles from "../../../styles/components/ModalCss/Step2.module.css";
import { MyContext } from "../../../context/Mycontext";
import ClickAwayListener from "react-click-away-listener";
export default function Step2() {
  const {
    images,
    setImages,
    setIsDiscardModalOpen,
    setPostSteps,
    ModalRef,
    setAspectRatio,
    zoomRange,
    setZoomRange,
    aspectRatio,
  } = useContext(MyContext);
  const [aspectRatioBox, setAspectRatioBox] = useState(false);
  const [zoomBox, setZoomBox] = useState(false);
  const [multiSelect, setMultiSelect] = useState(false);

  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const aspectBtnRef = useRef<HTMLDivElement | null>(null);
  const zoomBtnRef = useRef<HTMLDivElement | null>(null);
  const multiSelectRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const showAspectBox = () => {
    setAspectRatioBox((p) => true);
    if (aspectBtnRef.current && zoomBtnRef.current && multiSelectRef.current) {
      aspectBtnRef.current?.querySelectorAll("i").forEach((iTag) => {
        iTag.style.color = "black";
      });
      aspectBtnRef.current.style.backgroundColor = "white";
      zoomBtnRef.current.style.opacity = ".4";
      multiSelectRef.current.style.opacity = ".4";
    }
  };

  const hideAspectBox = () => {
    setAspectRatioBox((p) => false);
    if (aspectBtnRef.current && zoomBtnRef.current && multiSelectRef.current) {
      aspectBtnRef.current?.querySelectorAll("i").forEach((iTag) => {
        iTag.style.color = "white";
      });
      aspectBtnRef.current.style.backgroundColor = "black";
      zoomBtnRef.current.style.opacity = ".8";
      multiSelectRef.current.style.opacity = ".8";
    }
  };
  // seting image acpect ratio
  const handleAspectRatio = (aspectRatio: string) => {
    if (imageContainerRef.current) {
      if (aspectRatio === "original") {
        imageContainerRef.current.style.width = "95%";
        imageContainerRef.current.style.height = "95%";
        setAspectRatio("original");
      } else if (aspectRatio === "1X1") {
        imageContainerRef.current.style.width = "100%";
        imageContainerRef.current.style.height = "100%";
        setAspectRatio("1X1");
      } else if (aspectRatio === "4X5") {
        imageContainerRef.current.style.width = "80%";
        imageContainerRef.current.style.height = "100%";
        setAspectRatio("4X5");
      } else if (aspectRatio === "16X9") {
        imageContainerRef.current.style.width = "100%";
        imageContainerRef.current.style.height = "60%";
        setAspectRatio("16X9");
      }
    }
  };
  const showZoomRange = () => {
    setZoomBox(true);
    if (zoomBtnRef.current && multiSelectRef.current && aspectBtnRef.current) {
      zoomBtnRef.current.style.backgroundColor = "white";
      zoomBtnRef.current?.querySelectorAll("i").forEach((iTag) => {
        iTag.style.color = "black";
      });
      multiSelectRef.current.style.opacity = ".4";
      aspectBtnRef.current.style.opacity = ".4";
    }
  };
  const hideZoomRange = () => {
    setZoomBox(false);
    if (zoomBtnRef.current && multiSelectRef.current && aspectBtnRef.current) {
      zoomBtnRef.current.style.backgroundColor = "black";
      zoomBtnRef.current?.querySelectorAll("i").forEach((iTag) => {
        iTag.style.color = "white";
      });
      multiSelectRef.current.style.opacity = ".8";
      aspectBtnRef.current.style.opacity = ".8";
    }
  };
  const handleZoom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZoomRange((p: number) => parseFloat(e.target.value));
    if (imageRef.current) {
      const imageHeight = imageRef.current.clientHeight;
      const imageWidth = imageRef.current.clientWidth;
      imageRef.current.style.width = `${
        (imageHeight * parseFloat(e.target.value)) / 20
      }px`;
      imageRef.current.style.height = `${
        (imageWidth * parseFloat(e.target.value)) / 20
      }px`;
    }
  };
  const addMoreImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0];
    if (newFile) {
      setImages((p: string[]) => [...p, URL.createObjectURL(newFile)]);
    }
  };
  const showMultiSelectBox = () => {
    setMultiSelect(true);
    if (multiSelectRef.current && aspectBtnRef.current && zoomBtnRef.current) {
      multiSelectRef.current?.querySelectorAll("i").forEach((iTag) => {
        iTag.style.color = "black";
        iTag.style.background = "white";
      });
      aspectBtnRef.current.style.opacity = ".4";
      zoomBtnRef.current.style.opacity = ".4";
      multiSelectRef.current.style.background = "white";
    }
  };
  const hideMultiSelectBox = () => {
    setMultiSelect(false);
    if (multiSelectRef.current && aspectBtnRef.current && zoomBtnRef.current) {
      multiSelectRef.current?.querySelectorAll("i").forEach((iTag) => {
        iTag.style.color = "white";
        iTag.style.background = "black";
      });
      aspectBtnRef.current.style.opacity = ".8";
      zoomBtnRef.current.style.opacity = ".8";
      multiSelectRef.current.style.background = "black";
    }
  };
  const handleDiscardModalOpen = () => {
    setIsDiscardModalOpen(true);
  };
  const removeImage = (imageIndex: number) => {
    if (images.length <= 1) {
      setIsDiscardModalOpen(true);
    } else {
      const updatedImages = [...images];
      updatedImages.splice(imageIndex, 1);
      setImages(updatedImages);
    }
  };
  const gotoStep3 = () => {
    setPostSteps(2);
    if (ModalRef.current) {
      const addWidth = (ModalRef.current.offsetWidth / 10) * 5;
      ModalRef.current.style.width = `${
        ModalRef.current.offsetWidth + addWidth
      }px`;
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
    if (imageRef.current) {
      imageRef.current.style.width = `${(700 * parseFloat(zoomRange)) / 20}px`;
      imageRef.current.style.height = `${(700 * parseFloat(zoomRange)) / 20}px`;
    }
  });
  return (
    <div className={Styles.container}>
      <div className={Styles.Top}>
        <i
          className={`fa-solid fa-arrow-left ${Styles.previousBtn}`}
          onClick={handleDiscardModalOpen}
        ></i>
        <p>Crop</p>
        <button className={Styles.nextBtn} type="button" onClick={gotoStep3}>
          Next
        </button>
      </div>
      <div className={Styles.mainContainer}>
        <div className={Styles.imageContainer} ref={imageContainerRef}>
          <img
            src={images[0]}
            alt="loading.."
            className={Styles.image}
            ref={imageRef}
          />
        </div>
      </div>
      <div className={Styles.features}>
        <div>
          <span
            className={Styles.feature}
            ref={aspectBtnRef}
            onClick={showAspectBox}
          >
            <i
              className={`fa-solid fa-chevron-right ${Styles.topRigntArrow}`}
            ></i>
            <i
              className={`fa-solid fa-chevron-right ${Styles.bottomLeftArrow}`}
            ></i>
          </span>

          <span
            className={Styles.feature}
            ref={zoomBtnRef}
            onClick={showZoomRange}
          >
            <i className={`fa-solid fa-magnifying-glass-plus`}></i>
          </span>
        </div>
        <span
          className={Styles.feature}
          ref={multiSelectRef}
          onClick={showMultiSelectBox}
        >
          <i className={`fa-regular fa-square ${Styles.upperBox}`}></i>
          <i className={`fa-regular fa-square ${Styles.lowerBox}`}></i>
        </span>
      </div>
      {aspectRatioBox && (
        <ClickAwayListener onClickAway={hideAspectBox}>
          <div className={Styles.crop}>
            <span
              className={Styles.original}
              onClick={() => handleAspectRatio("original")}
            >
              <p>Original</p>
              <i className="fa-regular fa-image"></i>
            </span>
            <span
              className={Styles.oneX1}
              onClick={() => handleAspectRatio("1X1")}
            >
              <p>1:1</p>
              <span></span>
            </span>
            <span
              className={Styles.fourX5}
              onClick={() => handleAspectRatio("4X5")}
            >
              <p>4:5</p>
              <span></span>
            </span>
            <span
              className={Styles.sixteenX9}
              onClick={() => handleAspectRatio("16X9")}
            >
              <p>16:9</p>
              <span></span>
            </span>
          </div>
        </ClickAwayListener>
      )}
      {zoomBox && (
        <ClickAwayListener onClickAway={hideZoomRange}>
          <div className={Styles.zoomBox}>
            <input
              type="range"
              name="zoom"
              id="zoom"
              value={zoomRange}
              min={20}
              max={40}
              onChange={handleZoom}
            />
          </div>
        </ClickAwayListener>
      )}
      {multiSelect && (
        <ClickAwayListener onClickAway={hideMultiSelectBox}>
          <div className={Styles.multipleImages}>
            {images.map((url: string, i: number) => (
              <div key={i} className={Styles.previewImageContainer}>
                <img src={url} className={Styles.previewImage}></img>
                <i
                  className={`fa-solid fa-x ${Styles.removeImage}`}
                  onClick={() => removeImage(i)}
                ></i>
              </div>
            ))}
            <div className={Styles.addMoreImageContainer}>
              <label htmlFor="addMore">
                <i className={`fa-solid fa-plus ${Styles.addMoreImageBtn}`}></i>
              </label>
              <input type="file" name="" id="addMore" onChange={addMoreImage} />
            </div>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}
