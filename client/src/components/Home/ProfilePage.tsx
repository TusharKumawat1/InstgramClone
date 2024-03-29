import React, { useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import Styles from "../../styles/pages/profile.module.css";
import { MyContext } from "../../context/Mycontext";
import { Link } from "react-router-dom";
import filters from "../../styles/components/ModalCss/step3.module.css";
import ViewPost from "./ViewPost";
type userId = {
  username: string;
  fullname: string;
  _id: string;
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
  _id: string;
  pfp: string;
  bio: string;
  accountType: string;
  links: string;
  userId: userId;
  followers: Follower[];
  following: Following[];
  posts: Post[];
  LoggedInUser: boolean;
  FriendRequests: string[];
};

interface ProfilePageProps {
  profilePage: ProfilePageType;
}

export default function ProfilePage({ profilePage }: ProfilePageProps) {
  const { setIsModalOpen, viewPost, setViewPost, authenticUser ,settoggleRefetch} =
    useContext(MyContext);
  const LoggedInUserProfile =
    authenticUser?._id === profilePage?._id ? true : false;
  const [contentDetails, setContentDetails] = useState({
    _id: "",
    postId: "",
    likedBy: "",
  });
  let NotAllowed =
    (authenticUser?._id !== profilePage?._id &&
      profilePage?.accountType === "private") ||
    profilePage?.followers?.includes(authenticUser.userId._id);
  const [Status, setStatus] = useState("Follow");
  const showContnet = (_id: string, postId: string) => {
    const newObj = { ...contentDetails };
    newObj._id = _id; //user who upload post
    newObj.postId = postId; //post id
    newObj.likedBy = authenticUser.userId._id; //logged in user
    setContentDetails((p) => newObj);
    setViewPost(true);
  };
  const token = localStorage.getItem("token")!;
  const sendFriendRequest = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_PORT}/users/friendRequest`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ follow: profilePage._id }),
      }
    );
    console.log(await res.json());
    settoggleRefetch((p:boolean)=>!p)
  };
  const follow = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_PORT}/users/follow`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ follow: profilePage._id }),
      }
    );
    console.log(await res.json());
    settoggleRefetch((p:boolean)=>!p)
  };
  const unfollow = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_PORT}/users/unfollow`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ unfollow: profilePage._id }),
      }
    );
    console.log(await res.json());
    settoggleRefetch((p:boolean)=>!p)
  };

  const handleFollow = async () => {
    let isFollowed = profilePage?.followers?.filter(
      (f) => f._id === authenticUser.userId._id
    );
    if (profilePage?.accountType === "private" && !isFollowed[0]?._id) {
      setStatus((p) => "requested");
      await sendFriendRequest();
    } else if (profilePage?.accountType === "public" && !isFollowed[0]?._id) {
      setStatus("unfollow");
      await follow();
    } else if (isFollowed[0]?._id) {
      setStatus("follow");
      await unfollow();
    }
  };
  useEffect(() => {
    let isFollowed = profilePage?.followers?.filter(
      (f) => f._id === authenticUser?.userId?._id
    );
    let isRequested = profilePage?.FriendRequests?.find(
      (i: any) => i?._id === authenticUser.userId._id
    );
    if (isFollowed?.length > 0) {
      setStatus("Unfollow");
    } else if (isRequested) {
      setStatus("Requested");
    } else if (isFollowed?.length < 1) {
      setStatus("Follow");
    }
  }, [profilePage, authenticUser]);

  return (
    <div className={Styles.profileSection}>
      <div className={Styles.innerContainer}>
        <div className={Styles.topNav}>
          <i className="fa-solid fa-gear"></i>
          <p> {profilePage && profilePage?.userId?.username}</p>
          <i className="fa-solid fa-user-plus"></i>
        </div>
        <div className={Styles.userDetails}>
          <div className={Styles.infoSection}>
            <img
              src={profilePage && profilePage.pfp}
              alt={`pfp${profilePage && profilePage.pfp}`}
              className={Styles.pfp}
            />
            <div className={Styles.details}>
              <div className={Styles.editProfile}>
                <h3 className={Styles.username}>
                  {profilePage && profilePage?.userId?.username}
                </h3>
                {LoggedInUserProfile ? (
                  <span>
                    <Link to={`/profile/edit`} className={Styles.primaryBtn}>
                      Edit profile
                    </Link>
                    <Link to="#" className={Styles.primaryBtn}>
                      View archive
                    </Link>
                  </span>
                ) : (
                  <span>
                    <Link
                      to={`#`}
                      className={`${Styles.primaryBtn} ${Styles.followBtn}`}
                      onClick={handleFollow}
                    >
                      {Status}
                    </Link>
                    <Link to="#" className={Styles.primaryBtn}>
                      Message
                    </Link>
                  </span>
                )}
                <i className="fa-solid fa-gear"></i>
              </div>
              <div className={Styles.postNconnections}>
                <span>
                  <b> {profilePage && profilePage?.posts?.length}</b> posts
                </span>
                <span>
                  <b>{profilePage && profilePage?.followers?.length}</b>{" "}
                  followers
                </span>
                <span>
                  <b>{profilePage && profilePage?.following?.length}</b>{" "}
                  following
                </span>
              </div>
              <div className={Styles.about}>
                <h4 className={Styles.fullname}>
                  {profilePage && profilePage?.userId?.fullname}
                </h4>
                <p className={Styles.bio}>{profilePage && profilePage?.bio}</p>
                <a
                  className={Styles.links}
                  href={profilePage && profilePage?.links}
                  target="blank"
                >
                  {profilePage && profilePage?.links}
                </a>
              </div>
            </div>
          </div>
          {!NotAllowed && (
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
          )}
        </div>
        {NotAllowed ? (
          <div className={Styles.privateAccount}>
            {" "}
            This Account is Private
            <br />
            Follow to see their photos and videos.
          </div>
        ) : (
          <div className={Styles.library}>
            <div className={Styles.options}>
              <span>
                <i className="fa-solid fa-table-cells"></i> Posts
              </span>
              {LoggedInUserProfile && (
                <span>
                  <i className="fa-regular fa-bookmark"></i> Saved
                </span>
              )}
              <span>
                <i className="fa-solid fa-id-card-clip"></i> Taged
              </span>
            </div>
            {profilePage && profilePage?.posts?.length <= 0 ? (
              LoggedInUserProfile ? (
                <div className={Styles.posts}>
                  <div
                    className={Styles.cameraIcon}
                    onClick={() => setIsModalOpen(true)}
                  >
                    <i className="fa-solid fa-camera"></i>
                  </div>
                  <h1>Share Photos</h1>
                  <p>
                    When you share photos, they will appear on your profile.
                  </p>
                  <button
                    className={Styles.firstPhotoBtn}
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Share your first photo
                  </button>
                </div>
              ) : (
                <div className={Styles.noPost}>
                  <i className="fa-solid fa-camera"></i>
                  <p>No posts yet</p>
                </div>
              )
            ) : (
              <div className={Styles.postsContainer}>
                {profilePage &&
                  profilePage?.posts?.map((post: any, index: number) => {
                    let filterName = post?.appliedFilters[0]?.filter
                      ?.split(" ")[1]
                      ?.substring(6)
                      ?.split("_")[0];
                    let height = "100%";
                    let width = "100%";
                    if (post.aspectRatio === "original") {
                      height = "95%";
                      width = "95%";
                    } else if (post.aspectRatio === "4X5") {
                      height = "100%";
                      width = "80%";
                    } else if (post.aspectRatio === "16X9") {
                      height = "60%";
                      width = "100%";
                    }
                    return (
                      <div
                        key={index}
                        className={Styles.post}
                        onClick={() =>
                          showContnet(profilePage._id, post.postId)
                        }
                      >
                        <div className={Styles.imageContainer}>
                          <img
                            src={post.content[0]}
                            alt={`pfp${post && post.postId}`}
                            className={Styles.postContent}
                          />
                          <div
                            className={`${Styles.mask} ${filters[filterName]} `}
                          ></div>
                        </div>
                        <div className={Styles.onHover}>
                          <span>
                            {" "}
                            {post.likes ? post.likes.length : 0}
                            <i className="fa-solid fa-heart"></i>
                          </span>
                          <span>
                            {" "}
                            {post.comments ? post.comments.length : 0}
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
                {viewPost && <ViewPost {...contentDetails} />}
              </div>
            )}
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
}
