import React, { useContext, useEffect } from "react";
import Footer from "./Footer";
import Styles from "../../styles/pages/profile.module.css";
import { MyContext } from "../../context/Mycontext";
type UserId = {
  username: string;
  fullname: string;
};

type Follower = {
  _id: string;
};

type Following = {
  _id: string;
};

type Post = {
  content: string[];
};

type ProfilePageType = {
  pfp: string;
  bio: string;
  accountType: string;
  links: string;
  userId: UserId;
  followers: Follower[];
  following: Following[];
  posts: Post[];
  LoggedInUser: boolean;
};

interface ProfilePageProps {
  profilePage?: ProfilePageType;
}

export default function ProfilePage({ profilePage }: ProfilePageProps) {
  const { setIsModalOpen, authenticUser } = useContext(MyContext);
  useEffect(() => {
    console.log(profilePage);
  }, []);
  return (
    <div className={Styles.profileSection}>
      <div className={Styles.innerContainer}>
        <div className={Styles.userDetails}>
          <div className={Styles.infoSection}>
            <img
              src={profilePage && profilePage.pfp}
              alt=""
              className={Styles.pfp}
            />
            <div className={Styles.details}>
              <div className={Styles.editProfile}>
                <h3 className={Styles.username}>
                  {profilePage && profilePage.userId.username}
                </h3>
                {profilePage?.LoggedInUser ? (
                  <span>
                    <button className={Styles.primaryBtn}>Edit profile</button>
                    <button className={Styles.primaryBtn}>View archive</button>
                    <i className="fa-solid fa-gear"></i>
                  </span>
                ) : (
                  <span>
                    <button className={Styles.primaryBtn}>Follow</button>
                    <button className={Styles.primaryBtn}>Message</button>
                    <i className="fa-solid fa-ellipsis"></i>
                  </span>
                )}
              </div>
              <div className={Styles.postNconnections}>
                <span>
                  <b> {profilePage && profilePage.posts.length}</b> posts
                </span>
                <span>
                  <b>{profilePage && profilePage.followers.length}</b> followers
                </span>
                <span>
                  <b>{profilePage && profilePage.following.length}</b> following
                </span>
              </div>
              <div className={Styles.about}>
                <h4 className={Styles.fullname}>
                  {profilePage && profilePage.userId.fullname}
                </h4>
                <p className={Styles.bio}>{profilePage && profilePage.bio}</p>
                <a
                  className={Styles.links}
                  href={profilePage && profilePage.links}
                  target="blank"
                >
                  {profilePage && profilePage.links}
                </a>
              </div>
            </div>
          </div>
          {profilePage?.LoggedInUser ? (
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
          ) : (
            (profilePage?.accountType === "public" ||
              profilePage?.followers.includes(authenticUser._id)) && (
              <div>
                map highlite if availabe
                {/* {map highlite if availabe} */}
              </div>
            )
          )}
        </div>
        {profilePage?.LoggedInUser ||
        profilePage?.accountType === "public" ||
        profilePage?.followers.includes(authenticUser._id) ? (
          <div className={Styles.library}>
            {profilePage?.LoggedInUser ? (
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
            ) : (
              <div className={Styles.options}>
                <span>
                  <i className="fa-solid fa-table-cells"></i> Posts
                </span>
                <span>
                  <i className="fa-solid fa-id-card-clip"></i> Taged
                </span>
              </div>
            )}
            {profilePage?.LoggedInUser && profilePage.posts.length <= 0 ? (
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
            ) : (
              <div className={Styles.postsContainer}>
                {profilePage &&
                  profilePage.posts.map((post: any, index: number) => {
                    return (
                      <div key={index} className={Styles.post}>
                        <img
                          src={post.content[0]}
                          alt=""
                          className={Styles.postContent}
                        />
                        <div className={Styles.mask}></div>
                        <div className={Styles.onHover}>
                          <span>
                            {" "}
                            {post.likes ? post.likes.length : 0}
                            <i className="fa-solid fa-heart"></i>
                          </span>
                          <span>
                            {" "}
                            {post.comment ? post.comment.length : 0}
                            <i className="fa-solid fa-comment"></i>
                          </span>
                        </div>
                        {post.content.length > 1 && (
                          <span>
                            <i
                              className={` fa-solid fa-square ${Styles.upperBox}`}
                            ></i>
                            <i
                              className={`fa-regular fa-square ${Styles.lowerBox}`}
                            ></i>
                          </span>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        ) : (
          <div className={Styles.privateAccount}>
            <p>This Account is Private</p>
            <p>Follow to see their photos and videos.</p>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
}
