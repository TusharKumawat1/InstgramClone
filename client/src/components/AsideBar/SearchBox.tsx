import React from 'react'
import Styles from "../../styles/components/searchbox.module.css"
export default function SearchBox() {
  return (
    <div className={Styles.container}>
      <h2>Search</h2>
      <div className={Styles.inputContainer}>
        <input type="text" placeholder='Search'/>
        <i className="fa-solid fa-circle-xmark"></i>
      </div>
      <div className={Styles.recentSearch}>
        <h4>Recent</h4>
        <div className={Styles.searchResult}>
        <p>No recent searches.</p>
        </div>
      </div>
    </div>
  )
}
