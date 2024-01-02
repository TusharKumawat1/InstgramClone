import React from 'react'
import Styles from "../../styles/components/viewPost.module.css"
export default function ViewPost() {
  return (
    <div className={Styles.overlay}>
      <div className={Styles.modal}>
        <div className={Styles.imagesHolder}>
        <div className={Styles.imageContainer}>
          <img src="https://images.pexels.com/photos/19450636/pexels-photo-19450636/free-photo-of-clock-at-a-station.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="viewPost" />
          </div>
        </div>
        <div className={Styles.postDeails}>

        </div>
      </div>
    </div>
  )
}
