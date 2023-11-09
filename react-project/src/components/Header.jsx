import React from "react";
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import basket from "../img/basket.png"
import "../css/Header.css"

import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <Navbar bg="light" expand="lg" className="justify-content-between">
      <Container>
        <Navbar.Brand href="#" className="navbar-brand">딸깍</Navbar.Brand>
        <Nav className="me-auto">
          <Link className="nav-link" to="/image-create">이미지 생성</Link>
          <Link className="nav-link" to="/merch">굿즈 페이지</Link>
        </Nav>
        <Nav>
          <Link className="nav-link" to="login">
            <Button variant="outline-primary" size="sm" className="btn">
              로그인
            </Button>
          </Link>
          <Link className="nav-link" to="join">
            <Button variant="outline-primary" size="sm" className="btn">
              회원가입
            </Button>
          </Link>
          <Link className="nav-link" to="#">
            <img src={basket} alt="Basket" className="basket"/>
          </Link>
        </Nav>
      </Container>
    </Navbar>
    </div>
  );
};

export default Header;
