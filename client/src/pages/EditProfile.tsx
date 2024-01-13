import React, { useContext, useEffect, useState } from "react";
import Styles from "../styles/pages/editPage.module.css";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context/Mycontext";
import { gql, useQuery } from "@apollo/client";
export default function EditProfile() {
  const { authenticUser ,setauthenticUser} = useContext(MyContext);
  const navigate = useNavigate();
  const [gender, setgender] = useState("");
  const [profileAttributes,setProfileAttributes]=useState()

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
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(getinfo, {
    variables: {
      token: localStorage.getItem("token"),
    },
  });
  const token: string | null = localStorage.getItem("token");
  useEffect(() => {
    if (!loading && !error && data) {
      setauthenticUser((p: any) => ({
        ...p,
        ...data.getPfInfo.data,
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
      <div className={Styles.settings}></div>
      <div className={Styles.editSection}>
        <div className={Styles.editProfile}>
          <h2>Edit Profile</h2>
          <div className={Styles.profile}>
            <div className={Styles.identity}>
              <img
                src={authenticUser && authenticUser.pfp}
                alt=""
                className={Styles.pfp}
              />
              <span>
                {authenticUser && authenticUser.userId.username}
                <button>Change profile picture</button>
              </span>
            </div>
            <div className={Styles.website}>
              <h4>Website</h4>
              <span>
                <input type="text" disabled={true} />
                <p className={Styles.text}>
                  Editing your links is only available on mobile. Visit the
                  Instagram app and edit your profile to change the websites in
                  your bio.
                </p>
              </span>
            </div>
            <div className={Styles.bio}>
              <h4>Bio</h4>
              <span className={Styles.bioContent}>
                <textarea maxLength={150} />
                <p className={Styles.text}>0/150</p>
              </span>
            </div>
            <div className={Styles.gender}>
              <h4>Gender</h4>
              <span className={Styles.bioContent}>
                <select
                  id="genderSelect"
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
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
        </div>
      </div>
    </div>
  );
}
