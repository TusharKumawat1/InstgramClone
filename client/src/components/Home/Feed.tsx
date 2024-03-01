import React, { useContext, useEffect, useRef, useState } from "react";
import Styles from "../../styles/components/feed.module.css";
import Suggestion from "./Suggestion";
import { dummyStories } from "../../dummy";
import Posts from "./Posts";
import Footer from "./Footer";
import { MyContext } from "../../context/Mycontext";

export default function Feed() {
  const storiesRef = useRef<HTMLDivElement>(null);
  const [showFeed, setShowFeed] = useState(false)
  const {feed}=useContext(MyContext)
  const scrollToRight = () => {
    const container = storiesRef.current;
    if (container) {
      const nextImageWidth = container.scrollLeft + container.clientWidth;
      container.scrollTo({
        left: nextImageWidth-250,
        behavior: "smooth",
      });
    } 
  };
  const scrollToLeft = () => {
    const container = storiesRef.current;
    if (container) {
      const prevImageWidth = container.scrollLeft - container.clientWidth;
      container.scrollTo({
        left: prevImageWidth >= 0 ? prevImageWidth +300: 0,
        behavior: "smooth",
      });
    }
  };
  useEffect(()=>{
    if (feed.length>0) setShowFeed(true)
  },[feed])
  return (
     showFeed ?  <div className={Styles.container}>
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
         
         <span className={Styles.scrollLeft} onClick={scrollToLeft}>
           <i className="fa-solid fa-angle-left"></i>
         </span>
         <span className={Styles.scrollRight} onClick={scrollToRight}>
           <i className="fa-solid fa-angle-right"></i>
         </span>
       </div>
       {/* Posts */}
       <div className={Styles.feed}>
         <Posts/>
       </div>
     </div>
     <div className={Styles.sugestionContainer}>
     <Suggestion />
     </div>
   </div> : <h1>please follow someone</h1>
  );
}
