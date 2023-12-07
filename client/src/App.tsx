import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import ContextApi from "./context/ContextApi";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Profie from "./pages/Profie";
export default function App() {
  return (
    <ContextApi>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/profile" element={<Profie/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </ContextApi>
  );
}
