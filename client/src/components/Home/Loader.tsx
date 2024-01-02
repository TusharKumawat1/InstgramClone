import React from 'react'
import Styles from "../../styles/components/mainLoader.module.css"
import { instaLogo } from '../../assets'
export default function Loader() {
  return (
    <div className={Styles.container}>
      <img src={instaLogo} alt="instagramClone" width={100} height={100} />
      <p> from <br /> <span>Tushar</span> 😊</p>
    </div>
  )
}
