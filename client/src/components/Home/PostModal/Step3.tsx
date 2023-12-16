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
    if (target.classList[0] === `${Styles.NoFilter}`) {
      setIsRange(false);
    }
    if (imageMaskRef.current) {
      imageMaskRef.current.className = "";
      imageMaskRef.current.classList.add(Styles.imageMask);
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
    const operation=adjustmentName.toLocaleLowerCase()
    const value=Number(e.target.value)/100
    const operationValue= value<=1? 1+value : -value
    console.log(operationValue,"operationvalue")
    console.log(value)
    if (imageMaskRef.current) {
      imageMaskRef.current.style.backdropFilter=`${operation}(${operationValue}%)`
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
    setAdjustments((pre) =>
      pre.map((adjustement) =>
        adjustement.name === adjustmentName
          ? { ...adjustement, range: 0 }
          : adjustement
      )
    );
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
            <img
              src={images[0]}
              alt=""
              className={Styles.image}
              ref={imageRef}
            />
            <div className={Styles.imageMask} ref={imageMaskRef}></div>
          </div>
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
              <div className={`${Styles.filter}`} onClick={applyFilter}>
                <img src={ballon} alt="filter" className={Styles.ballonImg} />
                <div className={`${Styles.Aden} ${Styles.mask}`}></div>
                <p>Aden</p>
              </div>
              <div className={Styles.filter} onClick={applyFilter}>
                <img src={ballon} alt="filter" className={Styles.ballonImg} />
                <div className={`${Styles.Clarendon} ${Styles.mask}`}></div>
                <p>Clarendon</p>
              </div>
              <div className={Styles.filter} onClick={applyFilter}>
                <img src={ballon} alt="filter" className={Styles.ballonImg} />
                <div className={`${Styles.Gingham} ${Styles.mask}`}></div>
                <p>Gingham</p>
              </div>
              <div className={Styles.filter} onClick={applyFilter}>
                <img src={ballon} alt="filter" className={Styles.ballonImg} />
                <div className={`${Styles.Inkwell} ${Styles.mask}`}></div>
                <p>Inkwell</p>
              </div>
              <div className={Styles.filter} onClick={applyFilter}>
                <img src={ballon} alt="filter" className={Styles.ballonImg} />
                <div className={`${Styles.Hudson} ${Styles.mask}`}></div>
                <p>Hudson</p>
              </div>
              <div className={Styles.filter} onClick={applyFilter}>
                <img src={ballon} alt="filter" className={Styles.ballonImg} />
                <div className={`${Styles.NoFilter} ${Styles.mask}`}></div>
                <p>Original</p>
              </div>
              <div className={Styles.filter} onClick={applyFilter}>
                <img src={ballon} alt="filter" className={Styles.ballonImg} />
                <div className={`${Styles.Toaster} ${Styles.mask}`}></div>
                <p>Toaster</p>
              </div>
              <div className={Styles.filter} onClick={applyFilter}>
                <img src={ballon} alt="filter" className={Styles.ballonImg} />
                <div className={`${Styles.Lofi} ${Styles.mask}`}></div>
                <p>Lofi</p>
              </div>
              <div className={Styles.filter} onClick={applyFilter}>
                <img src={ballon} alt="filter" className={Styles.ballonImg} />
                <div className={`${Styles.Maven} ${Styles.mask}`}></div>
                <p>Maven</p>
              </div>
              <div className={Styles.filter} onClick={applyFilter}>
                <img src={ballon} alt="filter" className={Styles.ballonImg} />
                <div className={`${Styles.Reyes} ${Styles.mask}`}></div>
                <p>Reyes</p>
              </div>
              <div className={Styles.filter} onClick={applyFilter}>
                <img src={ballon} alt="filter" className={Styles.ballonImg} />
                <div className={`${Styles.Xpro2} ${Styles.mask}`}></div>
                <p>Xpro2</p>
              </div>
              <div className={Styles.filter} onClick={applyFilter}>
                <img src={ballon} alt="filter" className={Styles.ballonImg} />
                <div className={`${Styles.Perpetua} ${Styles.mask}`}></div>
                <p>Perpetua</p>
              </div>
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
                        <button className={Styles.resetBtn} type="button" onClick={()=>handleReset(item.name)}>
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
