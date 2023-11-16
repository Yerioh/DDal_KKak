import React from "react";
import Footer from "./Footer";
import Login from "./Login";
import Join from "./Join";
import Mypage from "./Mypage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";
import CreateImage from './CreateImage'
import EditImage from "./EditImage";
import ResultImage from './ResultImage'

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
    <div className="Web-Container">
      <Header/>
      <Routes>
        {/* 회원가입 */}
        <Route path="/join" element={<Join />}></Route>  
        {/* 로그인 */}
        <Route path="/login" element={<Login />}></Route>
        {/*  마이페이지 */}
        <Route path="/mypage" element={<Mypage />}></Route>
        {/* 이미지 생성 */}
        <Route path="/image-create" element={<CreateImage />} /> 
        {/* 이미지 편집 */}
        <Route path="/image-edit" element = {<EditImage/>}/>
        {/* 출력 이미지  */}
        <Route path="/image-result" element={<ResultImage/>}/>
        </Routes>
      <Footer />
    </div>
  );
};

export default Body;
