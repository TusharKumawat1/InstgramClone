import React from 'react'
import Styles from "../styles/asidenav.module.css"
export default function MoreOptions() {
  return (
    <div className={Styles.moreOptionsContainer}>
      <div className={Styles.above}>
      <span className={Styles.options}>
      <i className="fa-solid fa-gear"></i>Settings
        </span>
        <span className={Styles.options}>
          <i className="fa-regular fa-heart"></i>Your activity
        </span>
        <span className={Styles.options}>
        <i className="fa-regular fa-bookmark"></i>Saved
        </span>
        <span className={Styles.options}>
          <i className="fa-regular fa-square-plus"></i>Switch appearance
        </span>
        <span className={Styles.options}>
          <i className="fa-regular fa-square-plus"></i>Repoart a problem
        </span>
      </div>
      <div className={Styles.below}>
      <span className={Styles.options}>
        Switch account
        </span>
      <span className={Styles.options}>
        Log out
        </span>
      </div>
    </div>
  )
}
