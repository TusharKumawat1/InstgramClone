import React, { useContext, useEffect, useState } from "react";
import Styles from "../styles/pages/editPage.module.css";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context/Mycontext";
import { gql, useQuery } from "@apollo/client";
export default function EditProfile() {
  const { authenticUser, setauthenticUser, generateBase64, getImageUrl } =
    useContext(MyContext);
  const navigate = useNavigate();
  const [profileAttributes, setProfileAttributes] = useState({
    link: "",
    gender: "",
    bio: "",
    pfp: "",
    accountType:""
  });
  const [disable, setDisable] = useState(true);
  const getinfo = gql`
    query Query($token: String) {
      getPfInfo(token: $token) {
        errors {
          message
        }
        data {
          _id
          userId {
            username
            fullname
          }
          pfp
          bio
          links
          gender
          accountType
        }
      }
    }
  `;
  const token = localStorage.getItem("token")!;
  const { loading, error, data ,refetch} = useQuery(getinfo, {
    variables: {
      token: token,
    },
  });
  const handleProfileAttributes = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProfileAttributes((p) => ({ ...p, [name]: value }));
    setDisable(false);
  };
  const updateProfileAttribute = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_PORT}/profile/editProfile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ profileAttributes }),
      }
    );
    refetch();
  };
  const handlePfp = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisable(true)
    const file = e.target?.files?.[0]!;
    const url = URL.createObjectURL(file);
    setProfileAttributes((p) => ({ ...p, pfp: url }));
    const base64 = await generateBase64(url);
    const CloudImage = await getImageUrl(base64);
    setProfileAttributes((p) => ({ ...p, pfp: CloudImage.secure_url }));
    setDisable(false)
  };
  useEffect(() => {
    if (!loading && !error && data) {
      const Data = data.getPfInfo.data;
      setauthenticUser((p: any) => ({
        ...p,
        ...Data,
      }));
      setProfileAttributes((p) => ({
        ...p,
        link: Data.links,
        gender: Data.gender,
        bio: Data.bio,
        pfp: Data.pfp,
        accountType: Data.accountType,
      }));
    }
  }, [loading, error, data]);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/auth");
    }
  }, []);
  return (
    <div className={Styles.container}>
      <div className={Styles.settings}>

      </div>
      <div className={Styles.editSection}>
        <div className={Styles.editProfile}>
          <h2>Edit Profile</h2>
          <div className={Styles.profile}>
            <div className={Styles.identity}>
              <img src={profileAttributes.pfp} alt="" className={Styles.pfp} />
              <span>
                {authenticUser && authenticUser.userId.username}
                <input type="file" id="pfp" onChange={handlePfp} />
                <label className={Styles.changePfp} htmlFor="pfp">
                  Change profile picture
                </label>
              </span>
            </div>
            <div className={Styles.website}>
              <h4>Website</h4>
              <span>
                <input
                  type="text"
                  name="link"
                  value={profileAttributes.link}
                  onChange={handleProfileAttributes}
                />
                <p className={Styles.text}>
                  You can edit website links on Instagram's mobile app. However,
                  in this Instagram clone, you can add website links using web.
                </p>
              </span>
            </div>
            <div className={Styles.bio}>
              <h4>Bio</h4>
              <span className={Styles.bioContent}>
                <textarea
                  name="bio"
                  maxLength={150}
                  value={profileAttributes.bio}
                  onChange={handleProfileAttributes}
                />
                <p className={Styles.text}>
                  {profileAttributes.bio.length}/150
                </p>
              </span>
            </div>
            <div className={Styles.dropDown}>
              <h4>Gender</h4>
              <span className={Styles.bioContent}>
                <select
                  name="gender"
                  value={profileAttributes.gender}
                  onChange={handleProfileAttributes}
                >
                  <option value="custom">Custom</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="notSpecified">Not Prefer to Say</option>
                </select>
                <p className={Styles.text}>
                  This won’t be part of your public profile.
                </p>
              </span>
            </div>
            <div className={Styles.dropDown}>
              <h4>Account Type</h4>
              <span className={Styles.bioContent}>
                <select
                  name="accountType"
                  value={profileAttributes.gender}
                  onChange={handleProfileAttributes}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
                <p className={Styles.text}>
                You can decide whether people can see your profile or not.
                </p>
              </span>
            </div>
            <div className={Styles.suggestion}>
              <h4>Show account suggestions on profiles</h4>
              <span className={Styles.suggestionContainer}>
                <p>
                  {" "}
                  <input type="checkbox" /> Choose wether people can see similar
                  account suggestion on your profile,and wether your account can
                  be suggested on other profile.
                  <a
                    href="https://help.instagram.com/530450580417848"
                    target="_blank"
                  >
                    [?]
                  </a>
                </p>
              </span>
            </div>
          </div>
          <div className={Styles.btnContainer}>
            <button
              className={Styles.submitBtn}
              disabled={disable}
              type="button"
              onClick={updateProfileAttribute}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
