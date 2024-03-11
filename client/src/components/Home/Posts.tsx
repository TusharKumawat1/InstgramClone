import Styles from "../../styles/components/posts.module.css";
import { MyContext } from "../../context/Mycontext";
import { useContext, useEffect, useState } from "react";
import doubleClickCss from "../../styles/components/viewPost.module.css";
import ViewPost from "./ViewPost";
import { useNavigate } from "react-router-dom";
interface likes {
  _id: String;
  pfp: String;
  username: String;
}
interface comment {
  commentedBy: {
    profileId: String;
    pfp: String;
    username: String;
  };
  content: String;
  date: String;
}
interface Post {
  content: string[];
  date: string;
  caption: string;
  location: string;
  aspectRatio: string;
  advancedSetting: {
    hideLikeAndView: boolean;
    hideComments: boolean;
  };
  appliedFilters: {
    imageIndex: number;
    filter: string;
  };
  likes: [likes];
  comments: [comment];
  postId: string;
}
interface FeedItem {
  userId: string;
  profileId: string;
  username: string;
  pfp: string;
  post: Post;
}

export default function Posts() {
  const [doubleClick, setDoubleClick] = useState<boolean[]>([]);
  const [alreadyLiked, setAlreadyLiked] = useState<boolean[]>([]);
  const [likes, setLikes] = useState<number[]>([]);
  const { feed, viewPost, setViewPost, authenticUser } = useContext(MyContext);
  const [contentDetails, setContentDetails] = useState({
    _id: "",
    postId: "",
    likedBy: "",
  });
  const navigate = useNavigate();
  const handleDoubleClick = (i: number, postId: string, profileId: string) => {
    let updateLike = [...alreadyLiked];
    if (!updateLike[i]) {
      likeOrDislikePost(postId, profileId, i);
    }
    updateLike[i] = true;
    setAlreadyLiked((p) => updateLike);
    let updateclick = [...doubleClick];
    updateclick[i] = true;
    setDoubleClick(updateclick);
    setTimeout(() => {
      updateclick[i] = false;
      setDoubleClick(updateclick);
    }, 1000);
  };
  const showContnet = (_id: string, postId: string) => {
    console.log(authenticUser);
    const newObj = { ...contentDetails };
    newObj._id = _id; //user who upload post
    newObj.postId = postId; //post id
    newObj.likedBy = authenticUser.userId._id; //logged in user
    setContentDetails((p) => newObj);
    setViewPost(true);
  };
  function formatTimestamp(timestamp: string) {
    const msPerSecond = 1000;
    const msPerMinute = 60 * msPerSecond;
    const msPerHour = 60 * msPerMinute;
    const msPerDay = 24 * msPerHour;
    const msPerWeek = 7 * msPerDay;

    const diff = Date.now() - parseInt(timestamp, 10);

    if (diff < msPerMinute) {
      return "just now";
    } else if (diff < msPerHour) {
      return `${Math.floor(diff / msPerMinute)}m ago`;
    } else if (diff < msPerDay) {
      return `${Math.floor(diff / msPerHour)}h ago`;
    } else if (diff < msPerWeek) {
      return `${Math.floor(diff / msPerDay)}d ago`;
    } else {
      return `${Math.floor(diff / msPerWeek)}w ago`;
    }
  }
  const likeOrDislikePost = async (
    postId: string,
    profileId: string,
    index: number
  ) => {
    let updateLike = [...alreadyLiked];
    updateLike[index] = !updateLike[index];
    setAlreadyLiked((p) => updateLike); //update icon

    let updateLikeCount = [...likes];
    if (updateLike[index]) {
      updateLikeCount[index] += 1;
    } else {
      updateLikeCount[index] -= 1;
    }
    setLikes(p=>updateLikeCount)
    const token = localStorage.getItem("token")!;
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_PORT}/posts/likeOrDislikePost`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          postId,
          profileId,
        }),
      }
    );
    // refetch();
  };

  useEffect(() => {
    if (feed) {
      setLikes(feed.map((item: FeedItem) => item.post.likes.length));
      setAlreadyLiked(feed.map((item: FeedItem) => item.post.likes.find(el=>el._id===authenticUser.userId._id)))
    }
  }, [feed]);
  return (
    <div className={Styles.container}>
      {feed &&
        feed.map((item: FeedItem, index: number) => {
          return (
            <div className={Styles.post} key={index}>
              <div className={Styles.header}>
                <div
                  className={Styles.userInfo}
                  onClick={() => navigate(`/search/${item.profileId}`)}
                >
                  <img src={item.pfp} alt={`image${item.post.postId}`} className={Styles.pfp} />
                  <div className={Styles.user}>
                    <p>
                      {item.username} &nbsp;
                      <span>.{formatTimestamp(item.post.date)}</span>{" "}
                    </p>
                    {item.post.location && <p>{item.post.location}</p>}
                  </div>
                </div>
                <i className="fa-solid fa-ellipsis"></i>
              </div>
              <div
                className={Styles.imageContainer}
                onDoubleClick={() => {
                  handleDoubleClick(index, item.post.postId, item.profileId);
                }}
              >
                <img
                  src={item.post.content[0]}
                  alt=""
                  className={Styles.contentImage}
                />
                <div className={Styles.contentMask}>
                  {doubleClick[index] && (
                    <i
                      className={`fa-solid fa-heart ${doubleClickCss.doubleClick}`}
                      style={{ left: "40%", fontSize: "100px" }}
                    ></i>
                  )}
                </div>
              </div>
              <div className={Styles.engagementBtns}>
                <div>
                  {alreadyLiked[index] ? (
                    <i
                      className="fa-solid fa-heart"
                      style={{ color: "#e10e23" }}
                      onClick={() =>
                        likeOrDislikePost(
                          item.post.postId,
                          item.profileId,
                          index
                        )
                      }
                    ></i>
                  ) : (
                    <i
                      className="fa-regular fa-heart"
                      onClick={() =>
                        likeOrDislikePost(
                          item.post.postId,
                          item.profileId,
                          index
                        )
                      }
                    ></i>
                  )}
                  <i
                    className="fa-regular fa-comment"
                    onClick={() =>
                      showContnet(item.profileId, item.post.postId)
                    }
                  ></i>
                  <i className="fa-brands fa-airbnb"></i>
                </div>
                <i className="fa-regular fa-bookmark"></i>
              </div>
              <div className={Styles.likes}>
                <p>{likes[index]} likes</p>
              </div>
              <div className={Styles.caption}>
                <p>
                  {item.username} <span>{item.post.caption}</span>{" "}
                </p>
              </div>
              <div className={Styles.viewComment}>
                <p
                  onClick={() => showContnet(item.profileId, item.post.postId)}
                >
                  View all comments
                </p>
              </div>
              <div
                className={Styles.addComment}
                onClick={() => showContnet(item.profileId, item.post.postId)}
              >
                <p>Add a comment...</p>
                <i className="fa-regular fa-face-smile"></i>
              </div>
            </div>
          );
        })}
      {viewPost && <ViewPost {...contentDetails} />}
    </div>
  );
}
