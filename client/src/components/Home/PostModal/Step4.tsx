import React, { useContext, useEffect, useRef, useState } from "react";
import Styles from "../../../styles/components/ModalCss/step3.module.css";
import step4 from "../../../styles/components/ModalCss/step4.module.css";
import { MyContext } from "../../../context/Mycontext";
import EmojiPicker from "emoji-picker-react";
import ClickAwayListener from "react-click-away-listener";
import { Token } from "graphql";
import { postingCompleteGif, postingGif } from "../../../assets";
type AltTextType = {
  imageIndex: number;
  altText: string;
};
export default function Step4() {
  const {
    images,
    setPostSteps,
    aspectRatio,
    authenticUser,
    appliedFilters,
    generateBase64,
    getImageUrl,
    ModalRef,
    settoggleRefetch
  } = useContext(MyContext);
  const imageContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageMaskRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const filterBtnRef = useRef<HTMLButtonElement | null>(null);
  const imageHolderRef = useRef<HTMLDivElement | null>(null);
  const accessibilityRef = useRef<HTMLDivElement | null>(null);
  const advancedSettingRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [caption, setCaption] = useState("");
  const [availableLocations, setAvailableLocations] = useState<string[]>([]);
  const [currentLocation, setCurrentLocation] = useState("");
  const [showAccessibility, setshowAccessibility] = useState(false);
  const [showAdvancedSetting, setShowAdvancedSetting] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const [showEmojiPicker, setshowEmojiPicker] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [altTextForImages, setaltTextForImages] = useState<AltTextType[]>([]);
  const [advancedSetting, setAdvancedSetting] = useState({
    hideLikeAndView: false,
    hideComments: false,
  });
  const postContent = async () => {
    setLoading(true);
    setSharing(true);
    if (ModalRef.current) {
      const subWidth = (ModalRef.current.offsetWidth / 10) * 3;
      ModalRef.current.style.width = `${
        ModalRef.current.offsetWidth - subWidth
      }px`;
    }
    let imagesUrl: string[] = [];
    const promises = images.map(async (blob: string) => {
      const base64Image = await generateBase64(blob);
      const imageUrl = await getImageUrl(base64Image);
      imagesUrl.push(imageUrl.secure_url);
    });
    // Wait for all promises to resolve
    await Promise.allSettled(promises);
    console.log(imagesUrl)
    let postDetails = {
      content: imagesUrl,
      caption: caption,
      location: currentLocation,
      altTextForImages: altTextForImages,
      advancedSetting: advancedSetting,
      aspectRatio: aspectRatio,
      appliedFilters: appliedFilters,
      likes:[],
      comments:[],
    };
    const token = localStorage.getItem("token")!;
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_PORT}/posts/createPost`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(postDetails),
      }
    );
    setLoading(false);
    settoggleRefetch((p:boolean)=>!p)
  };
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
      const locations: string[] = result.map(
        (location: any) => location.display_name
      );
      setAvailableLocations(locations);
    } catch (error) {
      console.log(error);
    }
  };
  const toggleAccessibilit = () => {
    setshowAccessibility((p) => !p);
    if (accessibilityRef.current) {
      !showAccessibility
        ? (accessibilityRef.current.style.fontWeight = "bold")
        : (accessibilityRef.current.style.fontWeight = "400");
    }
  };
  const setAltTexts = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newArr = [...altTextForImages];
    if (newArr[index]) {
      newArr[index].imageIndex = index;
      newArr[index].altText = e.target.value;
    } else {
      newArr[index] = { imageIndex: index, altText: e.target.value };
    }
    setaltTextForImages(newArr);
  };
  const setEmojiToCaption = (data: any) => {
    const newText = caption + data.emoji;
    setCaption(newText);
  };
  const toggleAdvancedSetting = () => {
    setShowAdvancedSetting((p) => !p);
    if (advancedSettingRef.current) {
      !showAdvancedSetting
        ? (advancedSettingRef.current.style.fontWeight = "bold")
        : (advancedSettingRef.current.style.fontWeight = "400");
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
    <>
      {!sharing ? (
        <div className={Styles.container}>
          <div className={Styles.Top}>
            <i
              className={`fa-solid fa-arrow-left ${Styles.previousBtn}`}
              onClick={gotoStep3}
            ></i>
            <p>Create new post</p>
            <button
              className={Styles.nextBtn}
              type="button"
              onClick={postContent}
            >
              Share
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
                // cols={39}
                rows={8}
                placeholder="Write a caption..."
                className={step4.caption}
                maxLength={2000}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              ></textarea>
              <div className={step4.emojiContainer}>
                <i
                  className="fa-regular fa-face-smile"
                  onClick={() => setshowEmojiPicker(true)}
                ></i>
                <p>{caption.length}/2000</p>
              </div>
              {showEmojiPicker && (
                <ClickAwayListener
                  onClickAway={() => setshowEmojiPicker(false)}
                >
                  <div className={step4.emojiPicker}>
                    <EmojiPicker
                      height={400}
                      onEmojiClick={setEmojiToCaption}
                    />
                  </div>
                </ClickAwayListener>
              )}
              <div className={step4.locationContainer}>
                <input
                  type="text"
                  placeholder="Add location"
                  value={currentLocation}
                  onChange={(e) => {
                    searchLocation(e.target.value); //searching loaction using input
                    setCurrentLocation(e.target.value); //changing input value
                    if (!showLocations) {
                      setShowLocations(true);
                    }
                  }}
                  className={step4.addLocation}
                />
                <span className={step4.icons}>
                  {currentLocation ? (
                    <i
                      className="fa-solid fa-xmark"
                      onClick={() => {
                        setCurrentLocation("");
                      }}
                    ></i>
                  ) : (
                    <i className="fa-solid fa-location-dot"></i>
                  )}
                </span>
                {showLocations && (
                  <ClickAwayListener
                    onClickAway={() => setShowLocations(false)}
                  >
                    <div className={step4.availableLocations}>
                      {availableLocations &&
                        availableLocations.map((location, index) => {
                          return (
                            <div
                              key={index}
                              className={step4.location}
                              onClick={() => setCurrentLocation(location)}
                            >
                              <p>{location}</p>
                            </div>
                          );
                        })}
                    </div>
                  </ClickAwayListener>
                )}
                <div className={step4.accessibility}>
                  <div
                    className={step4.accessibilityHeading}
                    onClick={toggleAccessibilit}
                  >
                    <p ref={accessibilityRef}>Accessibility</p>
                    <span className={step4.icons}>
                      {showAccessibility ? (
                        <i className="fa-solid fa-angle-up"></i>
                      ) : (
                        <i className="fa-solid fa-angle-down"></i>
                      )}
                    </span>
                  </div>
                  {showAccessibility && (
                    <div className={step4.accessibilityDropdown}>
                      <p>
                        Alt text describes your photos for people with visual
                        impairments. Alt text will be automatically created for
                        your photos or you can choose to write your own.
                      </p>
                      {images.map((image: string, index: number) => {
                        return (
                          <div key={index} className={step4.altTextContainer}>
                            <img
                              src={image}
                              alt={image.slice(5, 11)}
                              className={step4.altImage}
                            />
                            <input
                              type="text"
                              className={step4.altText}
                              placeholder="Write alt text..."
                              value={
                                (altTextForImages[index] &&
                                  altTextForImages[index].altText) ||
                                ""
                              }
                              onChange={(e) => setAltTexts(e, index)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className={step4.advancedSetting}>
                  <div
                    className={step4.accessibilityHeading}
                    onClick={toggleAdvancedSetting}
                  >
                    <p ref={advancedSettingRef}>Advanced setting</p>
                    <span className={step4.icons}>
                      {showAdvancedSetting ? (
                        <i className="fa-solid fa-angle-up"></i>
                      ) : (
                        <i className="fa-solid fa-angle-down"></i>
                      )}
                    </span>
                  </div>
                  {showAdvancedSetting && (
                    <div className={step4.settings}>
                      <div className={step4.likeNviewSeiitng}>
                        <div className={step4.setting}>
                          <p className={step4.heading}>
                            Hide like and view counts on this post
                          </p>
                          <label className={step4.switch}>
                            <input
                              className={step4.checkbox}
                              type="checkbox"
                              onChange={(e) => {
                                const newObj = {
                                  ...advancedSetting,
                                  hideLikeAndView: e.target.checked
                                    ? true
                                    : false,
                                };
                                setAdvancedSetting(newObj);
                              }}
                            />
                            <span
                              className={`${step4.slider} ${step4.round}`}
                            ></span>
                          </label>
                        </div>
                        <p className={step4.aboutSetting}>
                          Only you will see the total number of likes and views
                          on this post. You can change this later by going to
                          the ··· menu at the top of the post. To hide like
                          counts on other people's posts, go to your account
                          settings.
                        </p>
                        <a href="https://help.instagram.com/113355287252104">
                          Learn more
                        </a>
                      </div>
                      <div className={step4.commentsSeiitng}>
                        <div className={step4.setting}>
                          <p className={step4.heading}>Turn off commenting</p>
                          <label className={step4.switch}>
                            <input
                              className={step4.checkbox}
                              type="checkbox"
                              onChange={(e) => {
                                const newObj = {
                                  ...advancedSetting,
                                  hideComments: e.target.checked ? true : false,
                                };
                                setAdvancedSetting(newObj);
                              }}
                            />
                            <span
                              className={`${step4.slider} ${step4.round}`}
                            ></span>
                          </label>
                        </div>
                        <p className={step4.aboutSetting}>
                          You can change this later by going to the ··· menu at
                          the top of your post.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={step4.postingContainer}>
          {loading ? <p>Sharing</p> : <p>Post Shared</p>}
          <div className={step4.Gifs}>
            {loading ? (
              <img src={postingGif} alt="posting..."  width={100} height={100}/>
            ) : (
              <div className={step4.postComplete}>
                <img src={postingCompleteGif} alt="complete posting" width={100} height={100}/>
                <p>Post has been shared</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
