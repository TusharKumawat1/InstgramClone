import React, { useState, Dispatch, SetStateAction } from "react";
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
export type isMoreType = {
  isMoreOptionsAvailable: boolean;
  setIsMoreOptionsAvailable: Dispatch<SetStateAction<boolean>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};
export default function ContextApi({ children }: ContextApiProviderProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMoreOptionsAvailable, setIsMoreOptionsAvailable] = useState(false);
  const [SignupSteps, setSignupSteps] = useState(0);
  const [userDetails, setUserDetails] = useState<userDetailsType>({
    user: "",
    dob: "",
    fullname: "",
    username: "",
    password: "",
  });
  const getImageUrl = async (image: string) => {
    const data = new FormData();
    data.append("file", image);
    data.append(
        "upload_preset", "eaajn3c2"
    );
    data.append("cloud_name", "dy72jxgzz");
    data.append("folder", "Cloudinary-React");
    const response = await fetch(
        `https://api.cloudinary.com/v1_1/dy72jxgzz/image/upload`,
        {
            method: "POST",
            body: data,
        }
    );
    const json = await response.json();
    return json
  };
  return (
    <MyContext.Provider
      value={{
        isLogin,
        setIsLogin,
        userDetails,
        setUserDetails,
        SignupSteps,
        setSignupSteps,
        isMoreOptionsAvailable,
        setIsMoreOptionsAvailable,
        isModalOpen,
        setIsModalOpen,
        getImageUrl,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
