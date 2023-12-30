import React from 'react'
import Styles from "../../styles/components/PostingLoader.module.css"
export default function PostingLoader() {
    return (
        <div className={Styles.loader}>
          <div className={Styles.spinner}>
        <div className={Styles.bounce1}></div>
        <div className={Styles.bounce2}></div>
        <div className={Styles.bounce3}></div>
      </div>
        </div>
      );
}
