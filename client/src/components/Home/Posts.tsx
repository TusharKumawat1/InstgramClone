import Styles from "../../styles/components/posts.module.css";
import { MyContext } from "../../context/Mycontext";
import { useContext, useEffect, useState } from "react";
import doubleClickCss from "../../styles/components/viewPost.module.css";
import ViewPost from "./ViewPost";
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
  const { feed, viewPost, setViewPost, authenticUser } = useContext(MyContext);
  const [contentDetails, setContentDetails] = useState({
    _id: "",
    postId: "",
    likedBy: "",
  });
  const handleDoubleClick = (i:number) => {
    let updateclick=[...doubleClick]
    updateclick[i]=true
    setDoubleClick(updateclick);
    setTimeout(() => {
      updateclick[i]=false
      setDoubleClick(updateclick);
    }, 1000);
  };
  const showContnet = (_id: string, postId: string) => {
    const newObj = { ...contentDetails };
    newObj._id = _id; //user who upload post
    newObj.postId = postId; //post id
    newObj.likedBy = authenticUser.userId._id; //logged in user
    setContentDetails((p) => newObj);
    setViewPost(true);
  };
  function formatTimestamp(timestamp:string) {
    const msPerSecond = 1000;
    const msPerMinute = 60 * msPerSecond;
    const msPerHour = 60 * msPerMinute;
    const msPerDay = 24 * msPerHour;
    const msPerWeek = 7 * msPerDay;
    
    const diff = Date.now() - parseInt(timestamp, 10);
  
    if (diff < msPerMinute) {
      return 'just now';
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
  const likeOrDislikePost = async (postId:string,profileId:string) => {
    // setLiked((p) => !p);
    // setLikesCount((p) => (liked ? p-1 : p+1));
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
    console.log(feed);
  }, [feed]);
  return (
    <div className={Styles.container}>
      {feed &&
        feed.map((item: FeedItem, index: number) => {
          return (
            <div className={Styles.post} key={index}>
              <div className={Styles.header}>
                <div className={Styles.userInfo}>
                  <img src={item.pfp} alt="" className={Styles.pfp} />
                  <div className={Styles.user}>
                    <p>
                      {item.username} &nbsp;
                      <span>.{formatTimestamp(item.post.date)}</span>{" "}
                    </p>
                   {
                    item.post.location &&  <p>location</p>
                   }
                  </div>
                </div>
                <i className="fa-solid fa-ellipsis"></i>
              </div>
              <div
                className={Styles.imageContainer}
                onDoubleClick={()=>{
                  handleDoubleClick(index)
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
                      style={{left:"40%",fontSize:"100px"}}
                    ></i>
                  )}
                </div>
              </div>
              <div className={Styles.engagementBtns}>
                <div>
                  <i className="fa-regular fa-heart"></i>
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
                <p>{item.post.likes.length} likes</p>
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
              <div className={Styles.addComment}  onClick={() => showContnet(item.profileId, item.post.postId)}>
              <p>Add a comment...</p>
                <i
                  className="fa-regular fa-face-smile"
                ></i>
              </div>
            </div>
          );
        })}
      {viewPost && <ViewPost {...contentDetails} />}
    </div>
  );
}
