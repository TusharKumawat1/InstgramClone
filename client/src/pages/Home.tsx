import React, { useContext, useEffect ,useState} from "react";
import { useNavigate } from "react-router-dom";
import Styles from "../styles/pages/home.module.css";
import AsideNav from "../components/AsideBar/AsideNav";
import Feed from "../components/Home/Feed";
import { useQuery, gql } from "@apollo/client";
import { MyContext } from "../context/Mycontext";

export default function Home() {
  const navigate = useNavigate();
  const {setauthenticUser}=useContext(MyContext)
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
      token:
      localStorage.getItem("token")
    },
  });
  const token: string | null = localStorage.getItem("token");
  if (!loading) {
    setauthenticUser(data.getPfInfo.data)
  }
  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
    if (data) {
      console.log(data.getPfInfo.data);
      // setauthenticUser(data.getPfInfo.data)
    }
  }, []);

  return (
    <div className={Styles.container}>
      <AsideNav />
      <Feed />
    </div>
  );
}
