import React from "react";
import Footer from "./Footer";
import Login from "./Login";
import Join from "./Join";
import Mypage from "./Mypage";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";

const Body = () => {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/join" element={<Join />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/mypage" element={<Mypage />}></Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default Body;
