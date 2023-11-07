import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ContextApi from "./context/ContextApi";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
export default function App() {
  return (
    <ContextApi>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ContextApi>
  );
}
