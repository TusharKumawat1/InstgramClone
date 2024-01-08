import React, { useContext, useEffect, useRef, useState } from "react";
import Styles from "../../styles/components/viewPost.module.css";
import ClickAwayListener from "react-click-away-listener";
import EmojiPicker from "emoji-picker-react";
import { gql, useQuery } from "@apollo/client";
import { MyContext } from "../../context/Mycontext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import filters from "../../styles/components/ModalCss/step3.module.css";
type contentDetailsType = {
  _id?: string;
  postId?: string;
  currentUserId?:string;
};

export default function ViewPost(contentDetails: contentDetailsType) {
  const { setViewPost } = useContext(MyContext);
  const [showEmojiPicker, setshowEmojiPicker] = useState(false);
  const [liked, setLiked] = useState(false);
  const [postDetails, setPostDetails] = useState<any>();
  const [userDetails, setuserDetails] = useState<any>();
  const imageHolderRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageMaskRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [size, setSize] = useState({
    height: "100%",
    width: "100%",
    top: "0%",
  });
  const getinfo = gql`
    query GetPostDetails($userProfileId: String, $postId: String) {
      getPostDetails(userProfileId: $userProfileId, postId: $postId) {
        userDetails {
          userId {
            username
            fullname
          }
          pfp
        }
        postDetails {
          content
          caption
          location
          aspectRatio
          postId
          advancedSetting {
            hideLikeAndView
            hideComments
          }
          appliedFilters {
            imageIndex
            filter
          }
          date
        }
        errors {
          message
        }
      }
    }
  `;
  const { loading, error, data, refetch } = useQuery(getinfo, {
    variables: {
      postId: contentDetails.postId,
      userProfileId: contentDetails._id,
    },
  });
  function formatDateFromTimestamp(timestamp: string) {
    const date = new Date(Number(timestamp));
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  const scrollToRight = () => {
    if (imageHolderRef.current) {
      const containerWidth = imageHolderRef.current.clientWidth;
      const maxScroll = imageHolderRef.current.scrollWidth - containerWidth;
      const newIndex = Math.min(
        postDetails?.content.length - 1,
        currentIndex + 1
      );

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
  const likePost = async () => {
    setLiked(true)
    const token = localStorage.getItem("token")!
    const res=await fetch(`${process.env.REACT_APP_SERVER_PORT}/posts/likePost`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        token:token
      },
      body:JSON.stringify({postId:contentDetails.postId,profileId:contentDetails._id})
    })
    const result=await res.json()
    console.log(result)
  };
  useEffect(() => {
    if (data) {
      setuserDetails(data.getPostDetails.userDetails);
      setPostDetails(data.getPostDetails.postDetails);
      if (postDetails?.likes?.filter((id:string)=>id===contentDetails.currentUserId)) {
        setLiked(true)
        console.log("likedBY : ",postDetails?.likes?.filter((id:string)=>id===contentDetails.currentUserId))
      }else{
        setLiked(false)
      }
      let newSize = { ...size };
      if (postDetails?.aspectRatio === "original") {
        newSize.height = "95%";
        newSize.width = "95%";
        setSize((p) => newSize);
      } else if (postDetails?.aspectRatio === "4X5") {
        newSize.height = "100%";
        newSize.width = "80%";
        setSize((p) => newSize);
      } else if (postDetails?.aspectRatio === "16X9") {
        newSize.height = "60%";
        newSize.width = "100%";
        newSize.top = "20%";
        setSize((p) => newSize);
      }
    }
    if (error) {
      console.log(error);
    }
  }, [loading, error, data, postDetails, liked]);

  return (
    <div className={Styles.overlay}>
      <ClickAwayListener onClickAway={() => setViewPost(false)}>
        <div className={Styles.modal}>
          <div className={Styles.imagesHolder} ref={imageHolderRef}>
            {postDetails ? (
              postDetails?.content
                ?.toReversed()
                ?.map((content: string, index: number) => {
                  let filterName = "";
                  if (postDetails?.appliedFilters[index]) {
                    filterName = postDetails?.appliedFilters[index]?.filter
                      ?.split(" ")[1]
                      ?.substring(6)
                      ?.split("_")[0];
                  }
                  return (
                    <div className={Styles.imageContainer} key={index}>
                      <img
                        src={content}
                        className={Styles.content}
                        alt={`content${index}`}
                        style={{ width: size.width, height: size.height }}
                      />
                      <div
                        className={`${Styles.imageMask} ${filters[filterName]}`}
                        ref={(el) => (imageMaskRefs.current[index] = el)}
                        style={{
                          width: size.width,
                          height: size.height,
                          top: size.top,
                        }}
                      ></div>
                    </div>
                  );
                })
            ) : (
              <Skeleton width={1000} height={1000} />
            )}
          </div>
          {postDetails?.content.length > 1 && (
            <span className={Styles.scrollBtnContainer}>
              <i
                className={`fa-solid fa-angle-left ${Styles.leftArrow}`}
                onClick={scrollToLeft}
              ></i>
              <i
                className={`fa-solid fa-angle-right ${Styles.rightArrow}`}
                onClick={scrollToRight}
              ></i>
            </span>
          )}
          <div className={Styles.postDeails}>
            <div className={Styles.user}>
              <span className={Styles.userDetails}>
                <img
                  src={userDetails && userDetails?.pfp}
                  className={Styles.pfp}
                />
                <p>{userDetails && userDetails.userId.username}</p>
              </span>
              <span>
                <i className="fa-solid fa-ellipsis"></i>
              </span>
            </div>
            <div className={Styles.commentSection}>
              <span className={Styles.aboutContent}>
                <img
                  src={userDetails && userDetails?.pfp}
                  className={Styles.pfp}
                />

                <p className={Styles.caption}>
                  {" "}
                  <span>{userDetails && userDetails.userId.username}</span>
                 &nbsp; {postDetails && postDetails?.caption}
                </p>
              </span>
              <div className={Styles.comments}>
                {postDetails?.comments ? (
                  " "
                ) : (
                  <p className={Styles.noComment}>No comments yet</p>
                )}
              </div>
            </div>
            <div className={Styles.postOverView}>
              <div className={Styles.interactions}>
                <span>
                  {liked ? (
                    <i
                      className="fa-solid fa-heart"
                      style={{ color: "#e10e23" }}
                    ></i>
                  ) : (
                    <i className="fa-regular fa-heart" onClick={likePost}></i>
                  )}
                  <i className="fa-regular fa-comment"></i>
                </span>
                <span>
                  <i className="fa-regular fa-bookmark"></i>
                </span>
              </div>
              <div className={Styles.likedBy}>
                {postDetails?.likes ? (
                  <div className={Styles.likes}>
                    <div className={Styles.likesOfuser}>
                      {Array.from({ length: 3 }).map((_, index) => (
                        <img
                          key={index}
                          src="https://images.pexels.com/photos/19450636/pexels-photo-19450636/free-photo-of-clock-at-a-station.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          className={Styles.likedBypfp}
                          alt={`Image ${index}`}
                        />
                      ))}
                    </div>
                    <p>Liked by tusharKumawat._ and 12 others</p>
                  </div>
                ) : (
                  <p>Be the first one to like this post</p>
                )}
                <span className={Styles.postedOn}>
                  {formatDateFromTimestamp(postDetails?.date)}
                </span>
              </div>
            </div>
            <div className={Styles.addComment}>
              <i
                className="fa-regular fa-face-smile"
                onClick={() => setshowEmojiPicker(true)}
              ></i>
              <input type="text" placeholder="Add comment..." />
              {showEmojiPicker && (
                <ClickAwayListener
                  onClickAway={() => setshowEmojiPicker(false)}
                >
                  <div className={Styles.emojiPicker}>
                    <EmojiPicker />
                  </div>
                </ClickAwayListener>
              )}
            </div>
          </div>
        </div>
      </ClickAwayListener>
    </div>
  );
}
