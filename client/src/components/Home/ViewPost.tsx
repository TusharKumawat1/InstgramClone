import React, { useContext, useEffect, useRef, useState } from "react";
import Styles from "../../styles/components/viewPost.module.css";
import ClickAwayListener from "react-click-away-listener";
import EmojiPicker from "emoji-picker-react";
import { gql, useQuery } from "@apollo/client";
import { MyContext } from "../../context/Mycontext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import filters from "../../styles/components/ModalCss/step3.module.css";
import { formatDistance } from "date-fns";
type contentDetailsType = {
  _id?: string;
  postId?: string;
  likedBy?: string;
};

export default function ViewPost(contentDetails: contentDetailsType) {
  const { setViewPost, authenticUser } = useContext(MyContext);
  const [showEmojiPicker, setshowEmojiPicker] = useState(false);
  const [doubleClick, setDoubleClick] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [commentContent, setCommentContent] = useState("");
  const [postDetails, setPostDetails] = useState<any>();
  const [userDetails, setuserDetails] = useState<any>();
  const imageHolderRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageMaskRefs = useRef<(HTMLDivElement | null)[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
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
          likes {
            _id
            pfp
            username
          }
          comments {
            commentedBy {
              profileId
              pfp
              username
            }
            content
            date
          }
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
    },context: {
      headers: {
        token:localStorage.getItem("token"),
      },
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
  const likeOrDislikePost = async () => {
    setLiked((p) => !p);
    setLikesCount((p) => (liked ? p-1 : p+1));
    const token = localStorage.getItem("token")!;
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_PORT}/posts/likeOrDislikePost`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          postId: contentDetails.postId,
          profileId: contentDetails._id,
        }),
      }
    );
    refetch();
  };
  const focousCommentSaction = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const addComment = async () => {
    const token = localStorage.getItem("token")!;
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_PORT}/posts/addcomment`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          profileId: contentDetails._id,
          postId: contentDetails.postId,
          commentContent: commentContent,
        }),
      }
    );
    refetch();
  };
  const commentTimestamp = (timeString: string) => {
    const date = new Date(Number(timeString));
    const relativeTime = formatDistance(date, new Date(), { addSuffix: false });
    // const newdate=relativeTime.split(" ")
    // return newdate[1]+newdate[2].slice(0,1);
    return relativeTime;
  };
  const handleDoubleClick = () => {
    setDoubleClick(true);
    if (!liked) {
      likeOrDislikePost();
    }
    setTimeout(() => {
      setDoubleClick(false);
    }, 1000);
  };
  useEffect(() => {
    if (data) {
      setuserDetails(data.getPostDetails.userDetails);
      setPostDetails(data.getPostDetails.postDetails);
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
  }, [loading, error, data, postDetails, liked, ]);
  useEffect(() => {
    refetch();
  }, [authenticUser]);
  useEffect(()=>{
    if (postDetails && contentDetails) {
      setLiked(
        postDetails.likes?.find(
          (like: any) => like._id === contentDetails.likedBy
        )
          ? true
          : false
      );
      setLikesCount(postDetails?.likes.length);
    }
  },[contentDetails,postDetails])
  return (
    <div className={Styles.overlay}>
      <div className={Styles.topNav}>
        <i
          className="fa-solid fa-angle-left"
          onClick={() => setViewPost(false)}
        ></i>
        <p>Post</p>
        <span></span>
      </div>
      <ClickAwayListener onClickAway={() => setViewPost(false)}>
        <div className={Styles.modal}>
          <div className={Styles.imagesHolder} ref={imageHolderRef}>
            {postDetails ? (
              postDetails?.content?.map((content: string, index: number) => {
                let filterName = "";
                if (postDetails?.appliedFilters[index]) {
                  filterName = postDetails?.appliedFilters[index]?.filter
                    ?.split(" ")[1]
                    ?.substring(6)
                    ?.split("_")[0];
                }
                return (
                  <div
                    className={Styles.imageContainer}
                    key={index}
                    onDoubleClick={handleDoubleClick}
                  >
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
                    {doubleClick && (
                      <i
                        className={`fa-solid fa-heart ${Styles.doubleClick}`}
                      ></i>
                    )}
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
                {loading ? (
                  <Skeleton circle={true} width={35} height={35} />
                ) : (
                  <img
                    src={userDetails && userDetails?.pfp}
                    className={Styles.pfp}
                  />
                )}
                <p>
                  {loading ? (
                    <Skeleton width={150} height={15} />
                  ) : (
                    userDetails && userDetails.userId.username
                  )}
                </p>
              </span>
              <span>
                <i className="fa-solid fa-ellipsis"></i>
              </span>
            </div>
            <div className={Styles.commentSection}>
              {loading ? (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Skeleton circle={true} width={35} height={35} count={5} />
                  <Skeleton
                    width={150}
                    height={15}
                    count={5}
                    style={{ marginBlock: "10px" }}
                  />
                </div>
              ) : (
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
              )}

              <div className={Styles.comments}>
                {postDetails?.comments ? (
                  <div className={Styles.commentedBy}>
                    {postDetails.comments.map((comment: any, index: number) => {
                      return (
                        <div key={index} className={Styles.comment}>
                          <img
                            src={comment.commentedBy.pfp}
                            alt={comment.commentedBy.username}
                            className={Styles.pfp}
                          />
                          <div className={Styles.commentDiv}>
                            <p className={Styles.caption}>
                              {" "}
                              <span>{comment.commentedBy.username}</span>
                              &nbsp; {comment.content}
                            </p>
                            <span className={Styles.commentTimestamp}>
                              {commentTimestamp(comment.date)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className={Styles.noComment}>
                    {loading ? "loading..." : "No comments yet"}
                  </p>
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
                      onClick={likeOrDislikePost}
                    ></i>
                  ) : (
                    <i
                      className="fa-regular fa-heart"
                      onClick={likeOrDislikePost}
                    ></i>
                  )}
                  <i
                    className="fa-regular fa-comment"
                    onClick={focousCommentSaction}
                  ></i>
                </span>
                <span>
                  <i className="fa-regular fa-bookmark"></i>
                </span>
              </div>
              <div className={Styles.likedBy}>
                {postDetails?.likes ? (
                  postDetails.likes.length > 2 ? (
                    <div className={Styles.likes}>
                      <div className={Styles.likesOfuser}>
                        {Array.from({ length: 3 }).map((_, index) => (
                          <img
                            key={index}
                            src={postDetails?.likes[index]?.pfp}
                            className={Styles.likedBypfp}
                            alt={`Image ${index}`}
                          />
                        ))}
                      </div>
                      <p>{`Liked by ${postDetails.likes[postDetails.likes.length-1].username} and ${postDetails.likes.length-1} others`}</p>
                    </div>
                  ) : (
                    <p>{likesCount} like</p>
                  )
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
              <input
                type="text"
                placeholder="Add comment..."
                ref={inputRef}
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
              />
              {commentContent.length > 0 && (
                <button type="button" onClick={addComment}>
                  Post
                </button>
              )}
              {showEmojiPicker && (
                <ClickAwayListener
                  onClickAway={() => setshowEmojiPicker(false)}
                >
                  <div className={Styles.emojiPicker}>
                    <EmojiPicker
                      onEmojiClick={(data) =>
                        setCommentContent((p) => p + data.emoji)
                      }
                    />
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
