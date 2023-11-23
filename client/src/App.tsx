import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ContextApi from "./context/ContextApi";
import UserHome from "./pages/UserHome";
import NotFound from "./pages/NotFound";
export default function App() {
  return (
    <ContextApi>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userHome" element={<UserHome/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </ContextApi>
  );
}
