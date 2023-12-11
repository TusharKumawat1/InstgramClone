import React from 'react'
import Styles from "../../styles/components/sugestions.module.css"
import { dummyStories, dummySuggestions } from '../../dummy'
export default function Suggestion() {
  return (
    <div className={Styles.container}>
      <div  className={Styles.profileName}>
              <img src={"https://images.pexels.com/photos/426976/pexels-photo-426976.jpeg?auto=compress&cs=tinysrgb&w=1600"} className={Styles.pfp}></img>
              <div className={Styles.info}>
                <h6 className={Styles.username}>tusharkumawt._</h6>
                <p className={Styles.followedBy}>Tushar Kumawat</p>
              </div>
              <button className={Styles.switchBtn}>Switch</button>
            </div>
      <div className={Styles.suggestion}>
        <span className={Styles.forYou}>Suggested for you</span>
        <span className={Styles.seeAll}>See all</span>
      </div>
      <div className={Styles.topSuggestion}>
        {
          dummySuggestions.map((item,i)=>{
            return <div key={i} className={Styles.suggestedUser}>
              <img src={item.pfp} className={Styles.pfp}></img>
              <div className={Styles.info}>
                <h6 className={Styles.username}>{item.username}</h6>
                <p className={Styles.followedBy}>Folloewd by {item.followedBy[0]}...</p>
              </div>
              <button className={Styles.followBtn}>Follow</button>
            </div>
          })
        }
      </div>
      <div className={Styles.links}>
        <a href="/">About.</a>
        <a href="/">Help.</a>
        <a href="/">Press.</a>
        <a href="/">Api.</a>
        <a href="/">Jobs.</a>
        <a href="/">Privacy.</a>
        <a href="/">Terms.</a>
        <a href="/">Location.</a>
        <a href="/">Language.</a>
        <a href="/">Meta Verified.</a>
      </div>
      <div className={Styles.tag}>© 2023 INSTAGRAM FROM META</div>
    </div>
  )
}
