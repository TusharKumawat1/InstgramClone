import React, { useState, Dispatch, SetStateAction, useRef } from "react";
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
type authenticUserType = {
  userId: {
    username: string;
    fullname: string;
  };
  pfp: string;
  _id: string;
};
export type isMoreType = {
  isMoreOptionsAvailable: boolean;
  setIsMoreOptionsAvailable: Dispatch<SetStateAction<boolean>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ContextApi({ children }: ContextApiProviderProps) {
  const ModalRef = useRef<HTMLDivElement | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [images, setImages] = useState([]);
  const [aspectRatio, setAspectRatio] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);
  const [isMoreOptionsAvailable, setIsMoreOptionsAvailable] = useState(false);
  const [postSteps, setPostSteps] = useState<number>(0);
  const [SignupSteps, setSignupSteps] = useState(0);
  const [zoomRange, setZoomRange] = useState(20);
  const [userDetails, setUserDetails] = useState<userDetailsType>({
    user: "",
    dob: "",
    fullname: "",
    username: "",
    password: "",
  });
  const [authenticUser, setauthenticUser] = useState<authenticUserType>();
  const generateBase64 = (file: Blob) => {
    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.result) {
        const base64String = reader.result.toString(); //converting image to base64
        return base64String;
      }
    };
    reader.readAsDataURL(file);
  };
  const getImageUrl = async (image: string) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "eaajn3c2");
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
    return json;
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
        images,
        setImages,
        postSteps,
        setPostSteps,
        generateBase64,
        isDiscardModalOpen,
        setIsDiscardModalOpen,
        authenticUser,
        setauthenticUser,
        ModalRef,
        aspectRatio, 
        setAspectRatio,
        zoomRange, 
        setZoomRange
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
