import React, { useEffect, useState } from "react";
import Styles from "../../styles/components/viewPost.module.css";
import ClickAwayListener from "react-click-away-listener";
import EmojiPicker from "emoji-picker-react";
import { gql, useQuery } from "@apollo/client";
type propesType = {
  _id?: string;
  postId?: string;
};

export default function ViewPost({ _id, postId }: propesType) {
  const [showEmojiPicker, setshowEmojiPicker] = useState(false);
  const [postDetails, setPostDetails] = useState<any>();
  const [userDetails, setuserDetails] = useState<any>();
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
      postId: "6593caf210a5a78cdff07470",
      userProfileId: "65797be10f764cf89154ccea",
    },
  });
  useEffect(() => {
    if (loading) {
      console.log("loading")
    }
    if (data) {
      setuserDetails(data.getPostDetails.userDetails)
      setPostDetails(data.getPostDetails.postDetails );
    }
    if (error) {
      console.log(error)
    }
  }, []);
  return (
    <div className={Styles.overlay}>
      <div className={Styles.modal}>
        <div className={Styles.imagesHolder}>
          <div className={Styles.imageContainer}>
            <img
              src={postDetails && postDetails?.content[0]}
              className={Styles.content}
            />
          </div>
        </div>
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
              <p>{userDetails && userDetails.userId.username}</p>
              <p>{postDetails && postDetails?.caption}</p>
            </span>
            <div className={Styles.comments}>{/* todo */}</div>
          </div>
          <div className={Styles.postOverView}>
            <div className={Styles.interactions}>
              <span>
                <i className="fa-regular fa-heart"></i>
                <i className="fa-regular fa-comment"></i>
              </span>
              <span>
                <i className="fa-regular fa-bookmark"></i>
              </span>
            </div>
            <div className={Styles.likedBy}>
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
              <span className={Styles.postedOn}>November 12,2021</span>
            </div>
          </div>
          <div className={Styles.addComment}>
            <i
              className="fa-regular fa-face-smile"
              onClick={() => setshowEmojiPicker(true)}
            ></i>
            <input type="text" placeholder="Add comment..." />
            {showEmojiPicker && (
              <ClickAwayListener onClickAway={() => setshowEmojiPicker(false)}>
                <div className={Styles.emojiPicker}>
                  <EmojiPicker />
                </div>
              </ClickAwayListener>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
