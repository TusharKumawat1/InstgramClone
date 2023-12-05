import React, { useRef } from "react";
import Styles from "../styles/posts.module.css";
import { shareIcon } from "../assets";
import { dummyFeed } from "../dummy";
export default function Posts() {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollToRight = () => {
    const container = document.getElementsByClassName(".contentBox")
    if (container) {
      container[0].scrollTo({
        left: (container[0].scrollLeft = -300),
        behavior: "smooth",
      });
    }
  };
  const scrollToLeft = () => {
    const container = document.getElementsByClassName(".content")
    if (container) {
      container[0].scrollTo({
        left: (container[0].scrollLeft = 300),
        behavior: "smooth",
      });
    }
  };
  return (
    <div className={Styles.container}>
      {dummyFeed &&
        dummyFeed.map((item, index) => {
          return (
            <div key={index} className={Styles.post}>
              <div className={Styles.userInfo}>
                <img src={item.pfp} className={Styles.pfp} />
                <div className={Styles.info}>
                  <h5>{item.username}</h5>
                  <p>{item.location}</p>
                </div>
                <i className="fa-solid fa-ellipsis"></i>
              </div>
              <div className={Styles.contentBox} id="content">
                {item.images.map((content, index) => {
                  return (
                    <img
                      key={index}
                      src={content}
                      className={Styles.content}
                    ></img>
                  );
                })}
                <span className={Styles.scrollLeft} onClick={scrollToRight}>
                  <i className="fa-solid fa-angle-left"></i>
                </span>
                <span className={Styles.scrollRight} onClick={scrollToLeft}>
                  <i className="fa-solid fa-angle-right"></i>
                </span>
              </div>

              <div className={Styles.postEngage}>
                <div className={Styles.postEngage1}>
                  <i className="fa-regular fa-heart"></i>
                  <i className="fa-regular fa-comment"></i>
                  <img src={shareIcon} alt="share" width={22} height={19} />
                </div>
                <div className={Styles.postEngage2}>
                  <i className="fa-regular fa-bookmark"></i>
                </div>
              </div>
              <div className={Styles.likedBy}>{item.likes}likes</div>
              <div className={Styles.caption}>
                <h4>{item.username}</h4>
                <span>{item.caption}</span>
              </div>
              <div className={Styles.commentSection}>
                <div>View all comment</div>
                <div className={Styles.addComment}>
                  <span>Add a comment...</span>
                  <i className="fa-regular fa-face-smile"></i>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
