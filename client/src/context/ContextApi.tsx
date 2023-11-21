import React, { useState } from "react";
import { MyContext } from "./Mycontext";

type ContextApiProviderProps = {
  children: React.ReactNode;
};
type userDetailsType = {
  user: string;
  dob: string;
  fullname: string;
  username: string;
  password: string;
};
export default function ContextApi({ children }: ContextApiProviderProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isDobPage, setisDobPage] = useState(false);
  const [userDetails, setUserDetails] = useState<userDetailsType>({
    user: "",
    dob: "",
    fullname: "",
    username: "",
    password: "",
  });

  return (
    <MyContext.Provider
      value={{ isLogin, setIsLogin, userDetails, setUserDetails,isDobPage, setisDobPage }}
    >
      {children}
    </MyContext.Provider>
  );
}
