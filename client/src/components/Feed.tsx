import React, { useRef } from "react";
import Styles from "../styles/feed.module.css";
import Suggestion from "./Suggestion";
import { dummyStories } from "../dummy";
import Posts from "./Posts";
import Footer from "./Footer";
export default function Feed() {
  const storiesRef = useRef<HTMLDivElement>(null);
  const scrollToRight = () => {
    const container = storiesRef.current;
    if (container) {
      container.scrollTo({
        left: (container.scrollLeft = -1000),
        behavior: "smooth",
      });
    }
  };
  const scrollToLeft = () => {
    const container = storiesRef.current;
    if (container) {
      container.scrollTo({
        left: (container.scrollLeft = 1000),
        behavior: "smooth",
      });
    }
  };
  return (
    <div className={Styles.container}>
      <div className={Styles.mainArea}>
        {/* Story section 😊 */}
        <div className={Styles.stories} ref={storiesRef}>
          {dummyStories.map((item, i) => {
            return (
              <div key={i} className={Styles.users}>
                <div className={Styles.pfpBOrder}>
                  <img src={item.pfp} className={Styles.pfp}></img>
                </div>
                <p className={Styles.username}>{item.username}</p>
              </div>
            );
          })}
          <span className={Styles.scrollLeft} onClick={scrollToRight}>
            <i className="fa-solid fa-angle-left"></i>
          </span>
          <span className={Styles.scrollRight} onClick={scrollToLeft}>
            <i className="fa-solid fa-angle-right"></i>
          </span>
        </div>
        {/* Posts */}
        <div className={Styles.feed}>
          <Posts/>
        </div>
      </div>
      <Suggestion />
    </div>
  );
}
