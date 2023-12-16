import React, { useContext, useEffect, useRef, useState } from "react";
import Styles from "../../../styles/components/ModalCss/step3.module.css";
import { MyContext } from "../../../context/Mycontext";
import { ballon } from "../../../assets";
import { HtmlTag } from "cloudinary-core";
type adjustmentType = {
  name: string;
  range: number;
};
export default function Step3() {
  const { images, setPostSteps, ModalRef, aspectRatio, zoomRange } =
    useContext(MyContext);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const imageMaskRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const filterBtnRef = useRef<HTMLButtonElement | null>(null);
  const adjustBtnRef = useRef<HTMLButtonElement | null>(null);
  const [IsfilterSection, setIsfilterSection] = useState(true);
  const [IsRange, setIsRange] = useState(false);
  const [MaskOpacityRange, setMaskOpacityRange] = useState(100);
  // const Adjustements=["Brightness","Contrast","Fade","Saturation","Temprature","Vignette"]
  const [Adjustments, setAdjustments] = useState<adjustmentType[]>([
    { name: "Brightness", range: 0 },
    { name: "Contrast", range: 0 },
    { name: "Fade", range: 0 },
    { name: "Saturation", range: 0 },
    { name: "Temprature", range: 0 },
    { name: "Vignette", range: 0 },
  ]);
  const filters = [
    "Aden",
    "Clarendon",
    "Gingham",
    "Inkwell",
    "Hudson",
    "Original",
    "Toaster",
    "Lofi",
    "Maven",
    "Reyes",
    "Xpro2",
    "Perpetua",
  ];
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
    if (imageRef.current) {
      imageRef.current.style.width = `${(700 * parseFloat(zoomRange)) / 20}px`;
      imageRef.current.style.height = `${(700 * parseFloat(zoomRange)) / 20}px`;
    }
  });
  const applyFilter = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    setIsRange(true);
    if (target.classList[0] === `${Styles.Original}`) {
      setIsRange(false);
    }
    if (imageMaskRef.current) {
      imageMaskRef.current.className = `${Styles.imageMask}`;
      imageMaskRef.current.classList.add(target.classList[0]);
    }
  };
  const showAdjustments = () => {
    setIsfilterSection(false);
    if (filterBtnRef.current && adjustBtnRef.current) {
      adjustBtnRef.current.style.color = "black";
      adjustBtnRef.current.style.borderBottom = "1px solid black";
      filterBtnRef.current.style.color = "#d7d7d7";
      filterBtnRef.current.style.borderBottom = "1px solid #d7d7d7";
    }
  };
  const showFilters = () => {
    setIsfilterSection(true);
    if (filterBtnRef.current && adjustBtnRef.current) {
      filterBtnRef.current.style.color = "black";
      filterBtnRef.current.style.borderBottom = "1px solid black";
      adjustBtnRef.current.style.color = "#d7d7d7";
      adjustBtnRef.current.style.borderBottom = "1px solid #d7d7d7";
    }
  };
  const handleOpacity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOpacity = Number(e.target.value);
    setMaskOpacityRange(newOpacity);
    if (imageMaskRef.current) {
      imageMaskRef.current.style.opacity = `${newOpacity / 100}`;
    }
  };
  const handleAdjustmentsRange = (
    adjustmentName: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const operation = adjustmentName.toLocaleLowerCase();
    const value = Number(e.target.value);
    const operationValue = value < 0 ? 100 - -value / 2 : 100 + value;
    console.log(operationValue, "operationvalue");
    console.log(value);
    if (imageMaskRef.current) {
      imageMaskRef.current.style.backdropFilter = `${operation}(${operationValue}%)`;
    }
    setAdjustments((pre) =>
      pre.map((adjustment) =>
        adjustment.name === adjustmentName
          ? { ...adjustment, range: Number(e.target.value) }
          : adjustment
      )
    );
  };
  const handleReset = (adjustmentName: string) => {
    if (imageMaskRef.current) {
      imageMaskRef.current.style.backdropFilter = `${adjustmentName}(100%)`;
    }
    setAdjustments((pre) =>
      pre.map((adjustement) =>
        adjustement.name === adjustmentName
          ? { ...adjustement, range: 0 }
          : adjustement
      )
    );
  };
  const scrollToRight = () => {
    if (imageContainerRef.current) {
      const nextImage=imageContainerRef.current.clientWidth + imageContainerRef.current.scrollLeft +10
      imageContainerRef.current.scrollTo({
        left: nextImage,
        behavior: "smooth",
      })
    }
  };
  const scrollToleft = () => {
    if (imageContainerRef.current) {
      const nextImage=imageContainerRef.current.clientWidth - imageContainerRef.current.scrollLeft
      imageContainerRef.current.scrollTo({
        left: nextImage,
        behavior: "smooth",
      })
    }
  };
  useEffect(() => {
    if (filterBtnRef.current) {
      filterBtnRef.current.style.color = "black";
      filterBtnRef.current.style.borderBottom = "1px solid black";
    }
  }, []);
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
            {
              images && images.map((image:string)=>{
                return  <img
                src={image}
                alt=""
                className={Styles.image}
                ref={imageRef}
              />
              })
            }
            <div className={Styles.imageMask} ref={imageMaskRef}></div>
          </div>
            <i className={`fa-solid fa-angle-right ${Styles.rightArrow}`} onClick={scrollToRight}></i>
            <i className={`fa-solid fa-angle-left ${Styles.leftArrow}`} onClick={scrollToleft}></i>
        </div>
        <div className={Styles.editSection}>
          <div className={Styles.options}>
            <button
              className={Styles.btn}
              type="button"
              onClick={showFilters}
              ref={filterBtnRef}
            >
              Filters
            </button>
            <button
              className={Styles.btn}
              type="button"
              onClick={showAdjustments}
              ref={adjustBtnRef}
            >
              Adjustment
            </button>
          </div>
          {IsfilterSection ? (
            <div className={Styles.filters}>
              {filters.map((filter, index) => {
                return (
                  <div className={`${Styles.filter}`} onClick={applyFilter}>
                    <img
                      src={ballon}
                      alt="filter"
                      className={Styles.ballonImg}
                    />
                    <div className={`${Styles[filter]} ${Styles.mask}`}></div>
                    <p>{filter}</p>
                  </div>
                );
              })}
              {IsRange && (
                <div className={Styles.filterOpacity}>
                  <input
                    type="range"
                    className={Styles.maskOpacityRange}
                    min={0}
                    max={100}
                    value={MaskOpacityRange}
                    onChange={handleOpacity}
                  />
                  <p>{MaskOpacityRange}</p>
                </div>
              )}
            </div>
          ) : (
            <div className={Styles.adjustementSection}>
              {Adjustments.map((item, index) => {
                return (
                  <div key={index} className={Styles.adjustements}>
                    <div className={Styles.adjustement}>
                      <p>{item.name}</p>
                      {item.range != 0 && (
                        <button
                          className={Styles.resetBtn}
                          type="button"
                          onClick={() => handleReset(item.name)}
                        >
                          Reset
                        </button>
                      )}
                    </div>
                    <div className={Styles.rangeContainer}>
                      <input
                        type="range"
                        name=""
                        id=""
                        className={Styles.adjustementInputRange}
                        value={item.range}
                        min={-100}
                        max={100}
                        onChange={(e) => handleAdjustmentsRange(item.name, e)}
                      />
                      <p>{item.range}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
