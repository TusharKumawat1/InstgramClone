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
            likes {
              _id
            }
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
      <ProfilePage profilePage={authenticUser}/>
    </div>
  );
}
