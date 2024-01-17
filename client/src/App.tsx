import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Modal from "./components/Home/PostModal/Modal";
import { MyContext } from "./context/Mycontext";
import DiscardModal from "./components/DiscardModal";
import AsideNav from "./components/AsideBar/AsideNav";
import EditProfile from "./pages/EditProfile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from "./pages/Search";
export default function App() {
  const { isModalOpen, isDiscardModalOpen } = useContext(MyContext);
  return (
    
    <BrowserRouter>
    <ToastContainer />
      <div className="appContainer">
        {localStorage.getItem("token") && <AsideNav />}
        <div className="contentContainer">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Home />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/search/:_id" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {isModalOpen && <Modal />}
          {isDiscardModalOpen && <DiscardModal />}
        </div>
      </div>
    </BrowserRouter>
  );
}
