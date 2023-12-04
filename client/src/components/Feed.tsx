import React from 'react'
import Styles from "../styles/feed.module.css"
import Suggestion from './Suggestion'
import { dummyStories } from '../dummy'
export default function Feed() {
  return (
    <div className={Styles.container}>
      <div className={Styles.mainArea}>
        <div className={Styles.stories}>
         {
          dummyStories.map((item,i )=>{
            return  <div key={i} className={Styles.users}>
            <div className={Styles.pfpBOrder}>
              <img src={item.pfp}className={Styles.pfp}></img>
            </div>
            <p className={Styles.username}>{item.username}</p>
          </div>
          })
         }
        </div>
        <div className={Styles.feed}>feed</div>
      </div>
      <Suggestion/>
    </div>
  )
}
