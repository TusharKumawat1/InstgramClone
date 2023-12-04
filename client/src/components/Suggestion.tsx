import React from 'react'
import Styles from "../styles/sugestions.module.css"
import { dummySuggestions } from '../dummy'
export default function Suggestion() {
  return (
    <div className={Styles.container}>
      <div className={Styles.profileName}>tushar</div>
      <div className={Styles.suggestion}>
        <span>suggested for you</span>
        <span>all</span>
      </div>
      <div className={Styles.topSuggestion}>
     { 
        dummySuggestions && dummySuggestions.map(()=)
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
