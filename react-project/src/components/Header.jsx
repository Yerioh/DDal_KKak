import React, { useState } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import basket from "../img/basket.png";
import "../css/Header.css";

import { Link } from "react-router-dom";
const Header = () => {
  // 임시 Header 변경 조건 State
  const [testHeader, settestHeader] = useState(true);

  //임시 Header 변경 함수
  const THeader = () => {
    settestHeader(!testHeader);
  };

  return (
    <div>
      <Navbar bg="light" expand="lg" className="justify-content-between">
        <Container>
          <Navbar.Brand href="#" className="navbar-brand" onClick={THeader}>
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

          {testHeader ? (
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
                <span>마이 페이지</span>
              </Link>
              <Link className="nav-link" to="login">
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
