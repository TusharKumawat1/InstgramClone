import React from 'react'
import  Styles from '../styles/posts.module.css'
import { shareIcon } from '../assets'
export default function Posts() {
  return (
    <div className={Styles.container}>
      <div className={Styles.post}>
        <div className={Styles.userInfo}>
            <img src={"https://images.pexels.com/photos/16465979/pexels-photo-16465979/free-photo-of-woman-standing-in-a-rapeseed-field.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"}className={Styles.pfp}/>
            <div className={Styles.info}>
                <h5>username</h5>
                <p>location</p>
            </div>
            <i className="fa-solid fa-ellipsis"></i>
        </div>
        <img src='https://images.pexels.com/photos/19326627/pexels-photo-19326627/free-photo-of-a-dog-sitting-on-top-of-a-mountain-with-a-green-background.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load' className={Styles.content}> 
        </img>
        <div className={Styles.postEngage}>
            <div className={Styles.postEngage1}>
            <i className="fa-regular fa-heart"></i>
            <i className="fa-regular fa-comment"></i>
            <img src={shareIcon} alt="share" width={22} height={19} />
            </div>
            <div className={Styles.postEngage2}>
            <i className="fa-regular fa-bookmark"></i>
            </div>
        </div>
        <div className={Styles.likedBy}>
            157 likes
        </div>
        <div className={Styles.caption}>
            <h4>username.</h4>
            <span>some thougts😊</span>
        </div>
        <div className={Styles.commentSection}>
            <div>View all comment</div>
            <div className={Styles.addComment}>
                <span>Add a comment...</span>
                <i className="fa-regular fa-face-smile"></i>
            </div>
        </div>
      </div>
    </div>
  )
}
