import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import basket from "../img/basket.png";
import axios from "../axios";
import "../css/Header.css";

import { Link } from "react-router-dom";
const Header = () => {
  // 23-11-14 10:20 임휘훈 작성 useEffect, session, redux, Private Route
  const name = useSelector((state) => state.session.name) // redux에 저장된 회원 이름
  const isLogin = useSelector((state) => state.session.isLogin) // redux에 저장된 로그인 유무
  const [changeHeader, setChangeHeader] = useState(false)
  const [userName, setUserName] = useState(null)

  // 로그인 됐을 때 헤더 변경
  useEffect(() => {
  if(name !== null){
    setChangeHeader(isLogin)
    setUserName(name)
  }
  }, [name])

  /** 로그아웃 함수 */
  const logoutClick = () => {
    axios.post("/user/Logout")
    .then((res) => {
      setChangeHeader(res.data.isLogin)
      window.location.href = "/"
    })
  }

  return (
    <div className="Header-Container">
      <Navbar bg="light" expand="lg" className="justify-content-between">
        <Container>
          <Navbar.Brand href="/" className="navbar-brand">
            딸깍
          </Navbar.Brand>
          <Nav className="me-auto">
            <Link className="nav-link" to="/image-create">
              <span>이미지 생성</span>          
            </Link>
            <Link className="nav-link" to="/merch">
              <span>굿즈 페이지</span>
            </Link>
          </Nav>

          {!changeHeader ? (
            // testHeader가 true일 때 표시할 요소들
            <Nav>
              <Link className="nav-link" to="login">
                <span>로그인</span>
              </Link>
              <Link className="nav-link" to="join">
                <span>회원가입</span>
              </Link>
            </Nav>
          ) : (
            // testHeader가 false일 때 표시할 요소들
            <Nav>
              <Link className="nav-link" to="mypage">
                <span>{userName} 님</span>
              </Link>
              <Link className="nav-link" onClick={logoutClick}>
                <span>로그아웃</span>
              </Link>
              <Link className="nav-link" to="#">
                <img src={basket} alt="Basket" className="basket" />
              </Link>
            </Nav>
          )}
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
