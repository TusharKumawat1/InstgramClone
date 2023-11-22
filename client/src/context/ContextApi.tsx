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
  const [SignupSteps, setSignupSteps] = useState(0);
  const [userDetails, setUserDetails] = useState<userDetailsType>({
    user: "",
    dob: "",
    fullname: "",
    username: "",
    password: "",
  });

  return (
    <MyContext.Provider
      value={{ isLogin, setIsLogin, userDetails, setUserDetails,SignupSteps, setSignupSteps}}
    >
      {children}
    </MyContext.Provider>
  );
}
