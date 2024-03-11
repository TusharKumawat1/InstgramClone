import React, { useContext } from 'react'
import Styles from "../../styles/components/sugestions.module.css"
import { dummyStories, dummySuggestions } from '../../dummy'
import { MyContext } from '../../context/Mycontext'
export default function Suggestion() {
  const {authenticUser}=useContext(MyContext)
  return (
    <div className={Styles.container}>
      <div  className={Styles.profileName}>
              <img src={authenticUser && authenticUser?.pfp} className={Styles.pfp} alt={`usersPfp`}></img>
              <div className={Styles.info}>
                <h6 className={Styles.username}>{authenticUser && authenticUser?.userId?.username}</h6>
                <p className={Styles.followedBy}>{authenticUser && authenticUser?.userId?.fullname}</p>
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
              <img src={item.pfp} className={Styles.pfp} alt={`pfp+${i}`}></img>
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
