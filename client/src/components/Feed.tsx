import React from 'react'
import Styles from "../styles/feed.module.css"
import Suggestion from './Suggestion'
export default function Feed() {
  return (
    <div className={Styles.container}>
      <div className={Styles.mainArea}>
        <div className={Styles.stories}>stories</div>
        <div className={Styles.feed}>feed</div>
      </div>
      <Suggestion/>
    </div>
  )
}
