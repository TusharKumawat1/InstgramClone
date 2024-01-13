import React, { useContext, useEffect ,useState} from "react";
import { useNavigate } from "react-router-dom";
import Styles from "../styles/pages/home.module.css";
import AsideNav from "../components/AsideBar/AsideNav";
import Feed from "../components/Home/Feed";
import { useQuery, gql } from "@apollo/client";
import { MyContext } from "../context/Mycontext";
import Loader from "../components/Home/Loader";

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
    useEffect(() => {
      if (!loading && !error && data) {
        setauthenticUser(data.getPfInfo.data)   
      }
    }, [loading, error, data, ]);
  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }

  }, []);
  if (loading) {
    return <Loader/>
  }
  return (
    <div className={Styles.container}>
      <Feed />
    </div>
  );
}
