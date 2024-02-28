import { gql, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfilePage from "../components/Home/ProfilePage";
import { MyContext } from "../context/Mycontext";

export default function Search() {
  const profile = useParams();
  const { setauthenticUser,viewPost ,toggleRefetch} = useContext(MyContext);
  const [profileData, setProfileData] = useState();
  const getinfo = gql`
    query SearchProfile(
      $profileId: String
      $token: String
      $getPfInfoToken2: String
    ) {
      searchProfile(profileId: $profileId, token: $token) {
        data {
          _id
          userId {
            username
            fullname
            _id
          }
          bio
          links
          pfp
          followers {
            _id
          }
          following {
            _id
          }
          FriendRequests {
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
        }
      }
      getPfInfo(token: $getPfInfoToken2) {
        data {
          _id
          userId {
            username
            fullname
            _id
          }
          pfp
        }
      }
    }
  `;
  const token = localStorage.getItem("token")!;
  const { loading, error, data ,refetch} = useQuery(getinfo, {
    variables: {
      profileId: profile._id,
      token: token,
      getPfInfoToken2: token,
    },
  });
  useEffect(() => {
    if (!loading && !error && data) {
      setProfileData(data.searchProfile.data);
      setauthenticUser(data.getPfInfo.data);
    }
  }, [loading, error, data]);
  useEffect(()=>{
    refetch();
  },[viewPost,toggleRefetch])
  return (
    <div>
      <ProfilePage profilePage={profileData!} />
    </div>
  );
}
