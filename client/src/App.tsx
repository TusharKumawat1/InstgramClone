import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import ContextApi from "./context/ContextApi";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Profie from "./pages/Profie";
import Modal from "./components/Home/Modal";
import { MyContext } from "./context/Mycontext";
export default function App() {
  const { isModalOpen } = useContext(MyContext);
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profie />} />
          <Route path="/modal" element={<Modal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {isModalOpen && <Modal/>}
      </BrowserRouter>

  );
}
