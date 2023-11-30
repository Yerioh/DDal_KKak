import React from "react";
import Footer from "./Footer";
import Login from "../pages/Login";
import Join from "../pages/Join";
import Mypage from "../pages/Mypage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";
import CreateImage from '../pages/CreateImage'
import EditImage from "../pages/EditImage";
import ResultImage from '../pages/ResultImage'
import Goodslist from "./Goodslist";
import GoodsDetail from "../pages/GoodsDetail";
import Basket from "../pages/Basket";
import Main from "../pages/Main";
import ImageAll from "../pages/ImageAll";
import BuyScript from "../pages/BuyScript";
import Complete from "../pages/Complete";

const Body = () => {
  // // 23-11-29 10:22 임휘훈 작성 Private Route
  const isLogin = useSelector((state) => state.session.isLogin) // redux에 저장된 로그인 유무
  const isChoice  = useSelector((state) => state.session.isChoice) // redux에 저장된 이미지 선태 유무

  /** mypage의 PrivateRoute 함수 */
  const PrivateRouteMypage = () => {
    return isLogin ? <Mypage/> : <Navigate to={"/login"}/>
  }

  /** 이미지 생성페이지의 PrivateRoute 함수 */
  const PrivateRouteCreateImage = () => {
    return isLogin? <CreateImage/> : <Navigate to={"/login"}/>
  }

  /** 이미지 결과페이지의 PrivateRoute 함수 */
  const PrivateRouteResultImage = () => {
    return isLogin? <ResultImage/> : <Navigate to={"/login"}/>
  }

  /** 이미지 편집페이지의 PrivateRoute 함수 */
  const PrivateRouteEditImage = () => {
    return isLogin? <EditImage/> : <Navigate to={"/login"}/>
  }

  /** 이미지 모음 페이지의 PrivateRoute 함수 */
  const PrivateRouteImageAll = () => {
    return isLogin? <ImageAll/> : <Navigate to={"/login"}/>
  }

  /** 굿즈 상품 페이지의 PrivateRoute 함수 */
  const PrivateRouteGoodslist = () => {
    return isLogin? <Goodslist/> : <Navigate to={"/login"}/>
  }
  
  /** 굿즈 상품 상세 페이지의 PrivateRoute 함수 */
  const PrivateRouteGoodsDetail = () => {
    return isLogin? <GoodsDetail/> : <Navigate to={"/login"}/>
  }

  /** 장바구니 페이지의 PrivateRoute 함수 */
  const PrivateRouteBasket = () => {
    return isLogin? <Basket/> : <Navigate to={"/login"}/>
  }

  /** 주문서 작성 페이지의 PrivateRoute 함수 */
  const PrivateRouteBuyScript= () => {
    return isLogin? <BuyScript/> : <Navigate to={"/login"}/>
  }

  /** 주문완료 페이지의 PrivateRoute 함수 */
  const PrivateRouteComplete = () => {
    return isLogin? <Complete/> : <Navigate to={"/login"}/>
  }

  return (
    <div className="Web-Container">
      <Header/>
      <Routes>
        {/* 메인페이지*/}
        <Route path="/" element={<Main />}></Route>  
        {/* 회원가입 */}
        <Route path="/join" element={<Join />}></Route>  
        {/* 로그인 */}
        <Route path="/login" element={<Login />}></Route>
        {/* 마이페이지 */}
        <Route path="/mypage" element={<PrivateRouteMypage/>}></Route>
        {/* 이미지 생성 */}
        <Route path="/image-create" element={<PrivateRouteCreateImage />} /> 
        {/* 이미지 결과  */}
        <Route path="/image-result" element={<PrivateRouteResultImage/>}/>
        {/* 이미지 편집 */}
        <Route path="/image-edit" element = {<PrivateRouteEditImage/>}/>
        {/* 이미지 모음 페이지*/}
        <Route path="/imageall" element={<PrivateRouteImageAll/>}></Route>  
        {/* 굿즈 상품 페이지 */}
        <Route path="/goodslist" element={<PrivateRouteGoodslist/>}/>
        {/* 굿즈 상세 페이지 */}
        <Route path="/goodsdetail/:PROD_ID" element={<PrivateRouteGoodsDetail/>}/>
        {/* 장바구니 */}
        <Route path="/basket" element={<Basket/>}/>
        {/* 주문서작성 */}
        <Route path="/buyscript" element={<BuyScript/>}/>
        {/* 주문완료 */}
        <Route path='/complete' element={<Complete/>}/>
        </Routes>
      <Footer />
    </div>
  );
};

export default Body;
