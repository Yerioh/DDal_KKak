import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import basket from "../img/basket.png";
import axios from "../axios";
import "../css/Header.css";
import { IoMdMenu } from "react-icons/io";
import logo from "../img/image-editor/image-edit-gallery2.png";
import { Link } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
const Header = () => {
  // 23-11-14 10:20 임휘훈 작성 useEffect, session, redux, Private Route
  const name = useSelector((state) => state.session.name); // redux에 저장된 회원 이름
  const isLogin = useSelector((state) => state.session.isLogin); // redux에 저장된 로그인 유무
  const [changeHeader, setChangeHeader] = useState(false);
  const [userName, setUserName] = useState(null);
  const [headerMenu, setHeaderMenu] = useState(false); //반응형 헤더 state

  // 로그인 됐을 때 헤더 변경
  useEffect(() => {
    if (name !== null) {
      setChangeHeader(isLogin);
      setUserName(name);
    }
  }, [name]);

  /** 로그아웃 함수 */
  const logoutClick = () => {
    axios.post("/user/Logout").then((res) => {
      setChangeHeader(res.data.isLogin);
      window.location.href = "/";
    });
  };

  return (
    <div className="Header-Container bg-light">
      <div className="Header-box">
        <div className="logo-ele-box">
          <Link to="/" className="header-logo">
            <img className="project-logo" src={logo} alt="" />
            딸깍
          </Link>
          <div className="Header-ele">
            <div className="Web-Nav">
              <Link className="nav-link" to="/image-create">
                <span>이미지 생성</span>
              </Link>
              <Link className="nav-link" to="/imageall">
                <span>이미지 모음</span>
              </Link>
              <Link className="nav-link" to="/goodslist">
                <span>굿즈</span>
              </Link>
            </div>

            {!changeHeader ? (
              <div className="Web-Nav" id="right-nav">
                <Link className="nav-link" to="login">
                  <span>로그인</span>
                </Link>
                <Link className="nav-link" to="join">
                  <span>회원가입</span>
                </Link>
              </div>
            ) : (
              <div className="Web-Nav" id="right-nav">
                <Link className="nav-link" to="mypage">
                  <span>{userName} 님</span>
                </Link>
                <Link className="nav-link" onClick={logoutClick}>
                  <span>로그아웃</span>
                </Link>
                <Link className="nav-link" to="/basket">
                  <img src={basket} alt="Basket" className="basket" />
                </Link>
              </div>
            )}
          </div>
          <span className="burger" onClick={() => setHeaderMenu(!headerMenu)}>
            <TiThMenu />
          </span>
        </div>
      </div>

      {headerMenu && (
        <div className="Mobile-Nav ">
          {!changeHeader ? (
            <div className="App-Nav">
              <Link
                className="nav-link"
                to="login"
                onClick={() => setHeaderMenu(false)}
              >
                <span>로그인</span>
              </Link>
              <Link
                className="nav-link"
                to="join"
                onClick={() => setHeaderMenu(false)}
              >
                <span>회원가입</span>
              </Link>
            </div>
          ) : (
            <div className="App-Nav">
              <Link
                className="nav-link"
                to="mypage"
                onClick={() => setHeaderMenu(false)}
              >
                <span>{userName} 님</span>
              </Link>
              <Link
                className="nav-link"
                onClick={() => {
                  logoutClick();
                  setHeaderMenu(false);
                }}
              >
                <span>로그아웃</span>
              </Link>
              <Link
                className="nav-link"
                to="/basket"
                onClick={() => setHeaderMenu(false)}
              >
                <span>내 장바구니</span>
              </Link>
            </div>
          )}
          <Link
            className="nav-link"
            to="/image-create"
            onClick={() => setHeaderMenu(false)}
          >
            <span>이미지 생성</span>
          </Link>
          <Link
            className="nav-link"
            to="/goodslist"
            onClick={() => setHeaderMenu(false)}
          >
            <span>굿즈 페이지</span>
          </Link>
        </div>
      )}
    </div>
  );
};
export default Header;
