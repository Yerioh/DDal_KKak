import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, ListGroup, Form, Container } from "react-bootstrap";
import google from "../img/google-icon.png";
import naver from "../img/naver-icon.jpg";
import kakao from "../img/kakao-icon.png";
import "../css/Login.css";
const Login = () => {
  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <div style={{ width: "500px" }}>
          <Form>
            <Form.Group className="mb-4">
              <h2>딸깍</h2>
            </Form.Group>

            <Form.Group className="mb-3 email-input" controlId="formGroupEmail">
              {/* <Form.Label>Email address</Form.Label> */}
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3 email-input" controlId="formGroupPassword">
              {/* <Form.Label>Password</Form.Label> */}
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Link className="d-grid gap-2">
                <Button className="login-btn" variant="dark">Login</Button>
              </Link>
            </Form.Group>

            <Form.Group className="mb-3">
              <Link to="/join">
                <span className="text-btn">회원가입</span>
              </Link>
              <Link to="/join">
                <span className="text-btn">ID찾기</span>
              </Link>

              <Link to="/join">
                <span className="text-btn">비밀번호 찾기</span>
              </Link>
            </Form.Group>
            <Form.Group className="mb-3">
              <ListGroup className="login-box mb-3" variant="flush">
                <ListGroup.Item>
                  <img className="login-logo" src={google} alt="" />
                  <span>Google 계정으로 로그인</span>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup className="login-box mb-3" variant="flush">
                <ListGroup.Item>
                  <img className="login-logo naver" src={naver} alt="" />
                  <span>Naver 계정으로 로그인</span>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup className="login-box mb-3" variant="flush">
                <ListGroup.Item>
                  <img className="login-logo" src={kakao} alt="" />
                  <span>Kakao 계정으로 로그인</span>
                </ListGroup.Item>
              </ListGroup>
            </Form.Group>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Login;