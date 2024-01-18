import React, { useContext, useEffect, useState } from "react";
import Styles from "../styles/pages/profile.module.css";
import { MyContext } from "../context/Mycontext";
import { gql, useQuery } from "@apollo/client";
import Loader from "../components/Home/Loader";
import ProfilePage from "../components/Home/ProfilePage";
export default function Proflie() {
  const {
    authenticUser,
    setauthenticUser,
    toggleRefetch,
    viewPost,
  } = useContext(MyContext);
  const getinfo = gql`
  query GetPfInfo($token: String) {
    getPfInfo(token: $token) {
      errors {
        message
      }
      data {
        userId {
          username
          fullname
          _id
        }
          bio
          pfp
          followers {
            _id
          }
          following {
            _id
          }
          accountType
          posts {
            content
            appliedFilters {
              filter
              imageIndex
            }
            postId
            aspectRatio
            likes
            comments {
              commentedBy {
                profileId
              }
            }
          }
          links
          _id
        }
      }
    }
    `;
    
    const token = localStorage.getItem("token")!;
    const { loading, error, data, refetch } = useQuery(getinfo, {
      variables: {
        token: token,
    },
  });
  useEffect(() => {
    if (!loading && !error && data) {
      setauthenticUser((p:any)=>({
        ...p,
          ...data.getPfInfo.data
        }));
    }
  }, [loading, error, data, ]);
  useEffect(() => {
    refetch();
  }, [toggleRefetch, viewPost]);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className={Styles.container}>
      {/* <div className={Styles.profileSection}>
        <div className={Styles.innerContainer}>
          <div className={Styles.userDetails}>
            <div className={Styles.infoSection}>
              <img
                src={authenticUser && authenticUser.pfp}
                alt=""
                className={Styles.pfp}
              />
              <div className={Styles.details}>
                <div className={Styles.editProfile}>
                  <h3 className={Styles.username}>
                    {authenticUser && authenticUser.userId.username}
                  </h3>
                  <Link
                    to={`/profile/edit`}
                    className={Styles.primaryBtn}
                  >
                    Edit profile
                  </Link>
                  <Link to="#" className={Styles.primaryBtn}>
                    View archive
                  </Link>
                  <i className="fa-solid fa-gear"></i>
                </div>
                <div className={Styles.postNconnections}>
                  <span>
                    <b> {authenticUser && authenticUser?.posts?.length}</b>{" "}
                    posts
                  </span>
                  <span>
                    <b>{authenticUser && authenticUser?.followers?.length}</b>{" "}
                    followers
                  </span>
                  <span>
                    <b>{authenticUser && authenticUser?.following?.length}</b>{" "}
                    following
                  </span>
                </div>
                <div className={Styles.about}>
                  <h4 className={Styles.fullname}>
                    {authenticUser && authenticUser?.userId?.fullname}
                  </h4>
                  <p className={Styles.bio}>
                    {authenticUser && authenticUser?.bio}
                  </p>
                  <a
                    className={Styles.links}
                    href={authenticUser && authenticUser?.links}
                    target="blank"
                  >
                    {authenticUser && authenticUser?.links}
                  </a>
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
            {authenticUser && authenticUser?.posts?.length <= 0 ? (
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
                {authenticUser &&
                  authenticUser?.posts?.map((post: any, index: number) => {
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
                          showContnet(authenticUser._id, post.postId)
                        }
                      >
                        <div className={Styles.imageContainer}>
                          <img
                            src={post.content[post.content.length - 1]}
                            alt=""
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
            <Footer />
          </div>
        </div>
      </div> */}
      <ProfilePage profilePage={authenticUser}/>
    </div>
  );
}