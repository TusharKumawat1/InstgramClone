import Styles from "../../styles/components/posts.module.css";
import { MyContext } from "../../context/Mycontext";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
interface likes {
  _id: String;
  pfp: String;
  username: String;
}
interface comment {
  commentedBy: {
    profileId: String;
    pfp: String;
    username: String;
  };
  content: String;
  date: String;
}
interface Post {
  content: string[];
  date: Date;
  caption: string;
  location: string;
  aspectRatio: string;
  advancedSetting: {
    hideLikeAndView: boolean;
    hideComments: boolean;
  };
  appliedFilters: {
    imageIndex: number;
    filter: string;
  };
  likes: [likes];
  comments: [comment];
  postId: string;
}
interface FeedItem {
  userId: string;
  profileId: string;
  username: string;
  pfp: string;
  post: Post;
}

export default function Posts() {
  const [showEmojis, setShowEmojis] = useState(false);
  return (
    <div className={Styles.container}>
      <div className={Styles.post}>
        <div className={Styles.header}>
          <div className={Styles.userInfo}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkEKyeScqBDQZun2tAFNBJZ7olvwqL2qhErrKLBCLmDlhN7tbz-47GtI3Hsume0s3alcA&usqp=CAU"
              alt=""
              className={Styles.pfp}
            />
            <div className={Styles.user}>
              <p>
                TstUSer <span>.1h</span>{" "}
              </p>
              <p>location</p>
            </div>
          </div>
          <i className="fa-solid fa-ellipsis"></i>
        </div>
        <div className={Styles.imageContainer}>
          <img
            src="https://pbs.twimg.com/media/FpBoIz6agAAZpky.jpg"
            alt=""
            className={Styles.contentImage}
          />
          <div className={Styles.contentMask}></div>
        </div>
        <div className={Styles.engagementBtns}>
          <div>
            <i className="fa-regular fa-heart"></i>
            <i className="fa-regular fa-comment"></i>
            <i className="fa-brands fa-airbnb"></i>
          </div>
          <i className="fa-regular fa-bookmark"></i>
        </div>
        <div className={Styles.likes}>
          <p>{111} likes</p>
        </div>
        <div className={Styles.caption}>
          <p>
            TstUSer <span>This is caption</span>{" "}
          </p>
        </div>
        <div className={Styles.viewComment}>
          <p>View all comments</p>
        </div>
        <div className={Styles.addComment}>
          <textarea placeholder="Add a comment..."></textarea>
          <i
            className="fa-regular fa-face-smile"
            onClick={() => setShowEmojis(true)}
          ></i>
          {showEmojis && (
            <ClickAwayListener onClickAway={() => setShowEmojis(false)}>
              <div className={Styles.emojiContainer}>
                <EmojiPicker />
              </div>
            </ClickAwayListener>
          )}
        </div>
      </div>
    </div>
  );
}
