import React, { useContext } from "react";
import Styles from "../styles/pages/profile.module.css";
import AsideNav from "../components/AsideBar/AsideNav";
import { profile } from "console";
import Footer from "../components/Home/Footer";
import { MyContext } from "../context/Mycontext";
import Modal from "../components/Home/PostModal/Modal";
export default function Profie() {
  const { isModalOpen, setIsModalOpen } = useContext(MyContext);
  return (
    <div className={Styles.container}>
      <AsideNav />

      <div className={Styles.profileSection}>
        <div className={Styles.innerContainer}>
          <div className={Styles.userDetails}>
            <div className={Styles.infoSection}>
              <img
                src={
                  "https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
                alt=""
                className={Styles.pfp}
              />
              <div className={Styles.details}>
                <div className={Styles.editProfile}>
                  <h3 className={Styles.username}>tusharkumawat._</h3>
                  <button className={Styles.primaryBtn}>Edit profile</button>
                  <button className={Styles.primaryBtn}>View archive</button>
                  <i className="fa-solid fa-gear"></i>
                </div>
                <div className={Styles.postNconnections}>
                  <span>
                    <b>0</b> posts
                  </span>
                  <span>
                    <b>145</b> followers
                  </span>
                  <span>
                    <b>200</b> following
                  </span>
                </div>
                <div className={Styles.about}>
                  <h4 className={Styles.fullname}>Tushar Kumawat</h4>
                  <p className={Styles.bio}>Bio</p>
                  <a className={Styles.links}>link</a>
                </div>
              </div>
            </div>
            <div className={Styles.highlights}>
              <div className={Styles.createHighlight}>
                <span className={Styles.createHighlightIcon}>
                  <i className="fa-solid fa-plus"></i>
                </span>
                <p>
                  <b>New</b>
                </p>
              </div>
            </div>
          </div>
          <div className={Styles.library}>
            <div className={Styles.options}>
              <span>
                <i className="fa-solid fa-table-cells"></i> Posts
              </span>
              <span>
                <i className="fa-regular fa-bookmark"></i> Saved
              </span>
              <span>
                <i className="fa-solid fa-id-card-clip"></i> Taged
              </span>
            </div>
            <div className={Styles.posts}>
              <div
                className={Styles.cameraIcon}
                onClick={() => setIsModalOpen(true)}
              >
                <i className="fa-solid fa-camera"></i>
              </div>
              <h1>Share Photos</h1>
              <p>When you share photos, they will appear on your profile.</p>
              <button
                className={Styles.firstPhotoBtn}
                type="button"
                onClick={() => setIsModalOpen(true)}
              >
                Share your first photo
              </button>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
