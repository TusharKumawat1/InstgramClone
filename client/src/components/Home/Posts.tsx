import React, { useRef, useState, useEffect } from "react";
import Styles from "../../styles/posts.module.css";
import { shareIcon } from "../../assets";
import { dummyFeed } from "../../dummy";
export default function Posts() {
  const [contentRefs, setContentRefs] = useState<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Initialize refs based on the length of dummyFeed
    setContentRefs(dummyFeed.map(() => null));
  }, []);

  const scrollToRight = (index: number) => {
    const container = contentRefs[index];
    if (container) {
      const nextImageWidth = container.scrollLeft + container.clientWidth;
      container.scrollTo({
        left: nextImageWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollToLeft = (index: number) => {
    const container = contentRefs[index];
    if (container) {
      const prevImageWidth = container.scrollLeft - container.clientWidth;
      container.scrollTo({
        left: prevImageWidth >= 0 ? prevImageWidth : 0,
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
              <div
                className={Styles.contentBox}
                ref={(el) => {
                  if (el && !contentRefs[index]) {
                    setContentRefs((prevRefs) => {
                      const newRefs = [...prevRefs];
                      newRefs[index] = el;
                      return newRefs;
                    });
                  }
                }}
              >
                {item.images.map((content, index) => {
                  return (
                    <img
                      key={index}
                      src={content}
                      className={Styles.content}
                    ></img>
                  );
                })}
              </div>
              <div>
                {item.images.length > 1 && (
                  <span
                    className={Styles.scrollLeft}
                    onClick={() => scrollToLeft(index)}
                  >
                    <i className="fa-solid fa-angle-left"></i>
                  </span>
                )}
                <div>
                  {item.images.length > 1 && (
                    <span
                      className={Styles.scrollRight}
                      onClick={() => scrollToRight(index)}
                    >
                      <i className="fa-solid fa-angle-right"></i>
                    </span>
                  )}
                </div>
              </div>
              <div className={Styles.dotsContainer}>
                {item.images.length > 1 &&
                  item.images.map((el,index) => {
                    return <div className={Styles.imageDots} key={index}/>;
                  })}
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
