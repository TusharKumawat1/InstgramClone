import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "../styles/home.module.css";
import AsideNav from "../components/AsideBar/AsideNav";
import Feed from "../components/Home/Feed";
import { useQuery, gql } from "@apollo/client";
export default function Home() {
  const navigate = useNavigate();

  const getinfo = gql`
    query Query($token: String) {
      getPfInfo(token: $token) {
        data {
          _id
          userId {
            username
            dob
          }
        }
        errors {
          message
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(getinfo, {
    variables: {
      token:
      localStorage.getItem("token")
    },
  });
  const token: string | null = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
    // if (data) {
    //   console.log(data.getPfInfo.data.userId);
    // }
    // console.log(data)
  }, []);

  return (
    <div className={Styles.container}>
      <AsideNav />
      <Feed />
    </div>
  );
}
