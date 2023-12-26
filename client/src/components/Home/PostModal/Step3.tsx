import React, { useContext, useEffect, useRef, useState } from "react";
import Styles from "../../../styles/components/ModalCss/step3.module.css";
import { MyContext } from "../../../context/Mycontext";
import { ballon } from "../../../assets";
type adjustmentType = {
  name: string;
  range: number;
};
export default function Step3() {
  const { images, setPostSteps, ModalRef, aspectRatio, zoomRange } =
    useContext(MyContext);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const imageMaskRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const filterBtnRef = useRef<HTMLButtonElement | null>(null);
  const adjustBtnRef = useRef<HTMLButtonElement | null>(null);
  const [IsfilterSection, setIsfilterSection] = useState(true);
  const [IsRange, setIsRange] = useState(false);
  const [MaskOpacityRange, setMaskOpacityRange] = useState(100);
  const imageHolderRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
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
  const applyFilter = (e: React.MouseEvent<HTMLElement>,index:number) => {
    const target = e.target as HTMLElement;
    setIsRange(true);
    if (target.classList[0] === `${Styles.Original}`) {
      setIsRange(false);
    }
    if (imageMaskRefs.current[index]) {
      const maskRef = imageMaskRefs.current[index]!;
      maskRef.className = `${Styles.imageMask}`;
      maskRef.classList.add(target.classList[0]);
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
  const handleOpacity = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newOpacity = Number(e.target.value);
    setMaskOpacityRange(newOpacity);
    if (imageMaskRefs.current[index]) {
      imageMaskRefs.current[index]!.style.setProperty('opacity', `${newOpacity / 100}`);
    }
  };
 
  const handleAdjustmentsRange = (
    adjustmentName: string,
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const operation = adjustmentName.toLocaleLowerCase();
    const value = Number(e.target.value);
    const operationValue = value < 0 ? 100 - -value / 2 : 100 + value;
    if (imageMaskRefs.current[index]) {
      const style = imageMaskRefs.current[index]!.style;
      if (style) {
        style.backdropFilter = `${operation}(${operationValue}%)`;
      }
    }
    setAdjustments((prevAdjustments) =>
      prevAdjustments.map((adjustment) =>
        adjustment.name === adjustmentName
          ? { ...adjustment, range: Number(e.target.value) }
          : adjustment
      )
    );
  };
  const handleReset = (adjustmentName: string, index: number) => {
    if (imageMaskRefs.current[index]) {
      const maskRef = imageMaskRefs.current[index]!;
      maskRef.style.backdropFilter = `${adjustmentName}(100%)`;
    }
    setAdjustments((prevAdjustments) =>
      prevAdjustments.map((adjustment) =>
        adjustment.name === adjustmentName
          ? { ...adjustment, range: 0 }
          : adjustment
      )
    );
  };


  const scrollToRight = () => {
    if (imageHolderRef.current) {
      const containerWidth = imageHolderRef.current.clientWidth;
      const maxScroll = imageHolderRef.current.scrollWidth - containerWidth;
      const newIndex = Math.min(images.length - 1, currentIndex + 1);

      const newScrollPosition = Math.min(maxScroll, newIndex * containerWidth);

      imageHolderRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });

      setCurrentIndex(newIndex);
    }
  };

  const scrollToLeft = () => {
    if (imageHolderRef.current) {
      const containerWidth = imageHolderRef.current.clientWidth;
      const newIndex = Math.max(0, currentIndex - 1);

      const newScrollPosition = newIndex * containerWidth;

      imageHolderRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });

      setCurrentIndex(newIndex);
    }
  };
  useEffect(() => {
    if (filterBtnRef.current) {
      filterBtnRef.current.style.color = "black";
      filterBtnRef.current.style.borderBottom = "1px solid black";
    }
  }, []);
  useEffect(() => {
    // Initialize refs for image masks
    if (imageMaskRefs.current.length !== images.length) {
      imageMaskRefs.current = Array(images.length)
        .fill(null)
        .map((_, index) => imageMaskRefs.current[index] || null);
    }
  }, [images.length]);
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
        <div className={Styles.imageHolder} ref={imageHolderRef}>
          {images.map((image: string, index: number) => (
            <div className={Styles.imageContainer} key={index}>
              <img src={image} alt="" className={Styles.image} />
              <div className={Styles.imageMask} ref={(el) => (imageMaskRefs.current[index] = el)}></div>
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <i
            className={`fa-solid fa-angle-right ${Styles.rightArrow}`}
            onClick={scrollToRight}
          ></i>
        )}
        {images.length > 1 && (
          <i
            className={`fa-solid fa-angle-left ${Styles.leftArrow}`}
            onClick={scrollToLeft}
          ></i>
        )}

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
                  <div className={`${Styles.filter}`} onClick={(e)=>{
                    applyFilter(e,currentIndex)
                  }}>
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
                    onChange={(e)=>{
                      handleOpacity(e,currentIndex)
                    }}
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
                          onClick={() => handleReset(item.name,currentIndex)}
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
                        onChange={(e) => handleAdjustmentsRange(item.name, e,currentIndex)}
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
