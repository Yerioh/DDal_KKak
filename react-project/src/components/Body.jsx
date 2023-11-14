import React from "react";
import Footer from "./Footer";
import Login from "./Login";
import Join from "./Join";
import Mypage from "./Mypage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";
import CreateImage from './CreateImage'

const Body = () => {
  // // 23-11-14 16:21 임휘훈 작성 Private Route
  // const isLogin = useSelector((state) => state.session.isLogin) // redux에 저장된 로그인 유무

  // /** mypage의 PrivateRoute 함수 */
  // const PrivateRouteMypage = () => {
  //   return isLogin? <Mypage/> : <Navigate to={"/login"}/>/
  // }

  // /** 이미지 생성페이지의 PrivateRoute 함수 */
  // const PrivateRouteCreateImage = () => {
  //   return isLogin? <CreateImage/> : <Navigate to={"/login"}/>
  // }

  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/join" element={<Join />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/mypage" element={<PrivateRouteMypage />}></Route>
        <Route path="/image-create" element={<PrivateRouteCreateImage />} />
        </Routes>
      <Footer />
    </div>
  );
};

export default Body;
