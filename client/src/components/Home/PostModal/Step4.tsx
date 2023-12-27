import React, { useContext, useEffect, useRef, useState } from "react";
import Styles from "../../../styles/components/ModalCss/step3.module.css";
import step4 from "../../../styles/components/ModalCss/step4.module.css";
import { MyContext } from "../../../context/Mycontext";

export default function Step4() {
  const { images, setPostSteps, aspectRatio, authenticUser, appliedFilters } =
    useContext(MyContext);
  const imageContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageMaskRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const filterBtnRef = useRef<HTMLButtonElement | null>(null);
  const imageHolderRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [caption, setCaption] = useState("");
  const [availableLocations, setAvailableLocations] = useState<string[]>([]);
  const [currentLocation, setCurrentLocation] = useState("");
  const gotoStep3 = () => {
    setPostSteps(2);
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
  const searchLocation = async (query: string) => {
    //todo
    const baseUrl = "https://nominatim.openstreetmap.org/search";
    const url = `${baseUrl}?q=${encodeURIComponent(query)}&format=json`; // Construct the API request URL
    try {
      const res = await fetch(url);
      const result = await res.json();
      const locations: string[] = result.map((location: any) => location.display_name);
      setAvailableLocations(locations);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(()=>{
  //   console.log(availableLocations)
  // },[availableLocations])
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
  useEffect(() => {
    if (imageRefs.current.length === images.length) {
      imageRefs.current.forEach((container, index) => {
        //accessing every mask ref available
        const maskref = imageMaskRefs.current[index]!;
        //cheacking if any filter available
        const maskrefs = imageMaskRefs.current!;
        maskrefs.forEach((mask, index) => {
          //if filter avaailable apply it when page load
          if (mask && appliedFilters[index]) {
            mask.className = appliedFilters[index].filter;
            mask.style.opacity = appliedFilters[index].opacity;
          }
        });
        if (container && aspectRatio) {
          if (aspectRatio === "original") {
            container.style.width = "95%";
            maskref.style.width = "95%";
          } else if (aspectRatio === "1X1") {
            container.style.width = "100%";
            container.style.height = "100%";
            maskref.style.width = "100%";
            maskref.style.height = "100%";
          } else if (aspectRatio === "4X5") {
            container.style.width = "80%";
            container.style.height = "100%";
            maskref.style.width = "80%";
            maskref.style.height = "100%";
          } else if (aspectRatio === "16X9") {
            container.style.width = "100%";
            container.style.height = "60%";
            maskref.style.width = "100%";
            maskref.style.top = "20%";
            maskref.style.height = "60%";
          }
        }
      });
    }
  }, [aspectRatio, images.length]);
  return (
    <div className={Styles.container}>
      <div className={Styles.Top}>
        <i
          className={`fa-solid fa-arrow-left ${Styles.previousBtn}`}
          onClick={gotoStep3}
        ></i>
        <p>Create new post</p>
        <button className={Styles.nextBtn} type="button">
          Next
        </button>
      </div>
      <div className={Styles.mainContainer}>
        <div className={Styles.imageHolder} ref={imageHolderRef}>
          {images.map((image: string, index: number) => (
            <div
              className={Styles.imageContainer}
              key={index}
              ref={(el) => (imageContainerRefs.current[index] = el)}
            >
              <img
                src={image}
                alt={`image${index}`}
                className={Styles.image}
                ref={(el) => (imageRefs.current[index] = el)}
              />
              <div
                className={Styles.imageMask}
                ref={(el) => (imageMaskRefs.current[index] = el)}
              ></div>
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

        <div className={step4.postDetailsSection}>
          <div className={step4.user}>
            <img src={authenticUser.pfp} alt="" className={step4.pfp} />
            <p>{authenticUser.userId.username}</p>
          </div>
          <textarea
            name=""
            id=""
            cols={39}
            rows={8}
            placeholder="Write a caption..."
            className={step4.caption}
            maxLength={2000}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          ></textarea>
          <div className={step4.emojiContainer}>
            <i className="fa-regular fa-face-smile"></i>
            <p>{caption.length}/2000</p>
          </div>
          <input
            type="text"
            placeholder="Location"
            value={currentLocation}
            onChange={(e) => searchLocation(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
