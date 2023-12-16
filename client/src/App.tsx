import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Profie from "./pages/Profie";
import Modal from "./components/Home/PostModal/Modal";
import { MyContext } from "./context/Mycontext";
import DiscardModal from "./components/DiscardModal";
export default function App() {
  const { isModalOpen, isDiscardModalOpen } = useContext(MyContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile/:username" element={<Profie />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {isModalOpen && <Modal />}
      {isDiscardModalOpen && <DiscardModal />}
    </BrowserRouter>
  );
}
