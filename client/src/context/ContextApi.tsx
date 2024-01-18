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
type userId = {
  username: string;
  fullname: string;
};
type followers = {
  _id: string;
};
type following = {
  _id: string;
};
type posts = {
  content: string[];
};
type authenticUserType = {
  pfp?: string;
  bio?: string;
  accountType?: string;
  links?: string;
  userId?: userId;
  followers?: followers[];
  following?: following[];
  posts?: posts[];
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
  const [toggleRefetch, settoggleRefetch] = useState(false);
  const [viewPost, setViewPost] = useState(false);
  const [authenticUser, setauthenticUser] = useState<authenticUserType>();
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [showSearchBox, setshowSearchBox] = useState(false);
  const [userDetails, setUserDetails] = useState<userDetailsType>({
    user: "",
    dob: "",
    fullname: "",
    username: "",
    password: "",
  });
  const generateBase64 = (blobUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      fetch(blobUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.result) {
              const base64String = reader.result.toString(); // Converting image to base64
              resolve(base64String);
            } else {
              reject(new Error("Failed to read the blob as base64."));
            }
          };
          reader.onerror = () => {
            reject(new Error("Error reading the blob."));
          };
          reader.readAsDataURL(blob);
        })
        .catch((error) => {
          reject(error);
        });
    });
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
        setZoomRange,
        appliedFilters,
        setAppliedFilters,
        toggleRefetch,
        settoggleRefetch,
        viewPost,
        setViewPost,
        showSearchBox, 
        setshowSearchBox
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
