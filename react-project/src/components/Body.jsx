import React from "react";
import Footer from "./Footer";
import Login from "../pages/Login";
import Join from "../pages/Join";
import Mypage from "../pages/Mypage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import CreateImage from "../pages/CreateImage";
import EditImage from "../pages/EditImage";
import ResultImage from "../pages/ResultImage";
import Goodslist from "./Goodslist";
import GoodsDetail from "../pages/GoodsDetail";
import Basket from "../pages/Basket";
import Main from "../pages/Main";
import ImageAll from "../pages/ImageAll";
import BuyScript from "../pages/BuyScript";
import Complete from "../pages/Complete";
import { useEffect } from "react";

const Body = () => {
  // // 23-11-29 10:22 임휘훈 작성 Private Route
  const dispatch = useDispatch()
  const isLogin = useSelector((state) => state.session.isLogin && localStorage.getItem('isLogin')); // redux에 저장된 로그인 유무
  
  /** 프라이빗 라우터 함수 */
  const PrivateRoute = ({ element: Element }) => {
    console.log("isLogin", isLogin, Element);
    return isLogin ? Element : <Navigate to="/login" />;
  };
  
  useEffect(() => {
    if(isLogin){
      
    }
  }, [])

  return (
    <div className="Web-Container">
      <Header />
      <Routes>
        {/* 메인페이지*/}
        <Route path="/" element={<Main />}></Route>
        {/* 회원가입 */}
        <Route path="/join" element={<Join />}></Route>
        {/* 로그인 */}
        <Route path="/login" element={<Login />}></Route>
        {/* 마이페이지 */}
        <Route
          path="/mypage"
          element={<PrivateRoute element={<Mypage />} />}
        ></Route>
        {/* 이미지 생성 */}
        <Route
          path="/image-create"
          element={<PrivateRoute element={<CreateImage />} />}
        />
        {/* 이미지 결과  */}
        <Route
          path="/image-result"
          element={<PrivateRoute element={<ResultImage />} />}
        />
        {/* 이미지 편집 */}
        <Route
          path="/image-edit"
          element={<PrivateRoute element={<EditImage />} />}
        />
        {/* 이미지 모음 페이지*/}
        <Route
          path="/imageall"
          element={<PrivateRoute element={<ImageAll />} />}
        ></Route>
        {/* 굿즈 상품 페이지 */}
        <Route
          path="/goodslist"
          element={<PrivateRoute element={<Goodslist />} />}
        />
        {/* 굿즈 상세 페이지 */}
        <Route
          path="/goodsdetail/:PROD_ID"
          element={<PrivateRoute element={<GoodsDetail />} />}
        />
        {/* 장바구니 */}
        <Route path="/basket" element={<PrivateRoute element={<Basket />} />} />
        {/* 주문서작성 */}
        <Route
          path="/buyscript"
          element={<PrivateRoute element={<BuyScript />} />}
        />
        {/* 주문완료 */}
        <Route
          path="/complete"
          element={<PrivateRoute element={<Complete />} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default Body;
