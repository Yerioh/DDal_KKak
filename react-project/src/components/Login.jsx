import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Button, Card, ListGroup, Form, Container } from "react-bootstrap";
import google from "../img/google-icon.png";
import naver from "../img/naver-icon.jpg";
import kakao from "../img/kakao-icon.png";
import axios from "../axios";
import "../css/Login.css";

const Login = () => {
  // 2023-11-14 09:25 임휘훈 작성
  const idRef = useRef()
  const pwRef = useRef()

  /** 로그인 버튼 함수 */
  const login_btn = () => {
    console.log("로그인 버튼 기능 활성화");
    axios.post("/user/login", {
      userId : idRef.current.value, // 아이디
      userPw : pwRef.current.value // 비밀번호
    }).then((res) => {
      console.log(res.data);
      if(res.data == true){
        console.log("프론트 페이지이동");
        window.location.href = "/"
      }
    })
  }

  // 임휘훈 작성 끝

  // 카카오 로그인 클릭
  // 23-11-13 오전 9:45 박지훈 작성
  const kakaoLoginClick = ()=>{
    let REST_API_KEY = process.env.REACT_APP_KAKAO_REST_KEY;  
    let REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const kakaoToken = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
    window.location.href = kakaoToken
  }

  // 네이버 로그인 클릭
  // 23-11-13 오후 15:30 박지훈 작성
  const naverLoginClick = ()=>{
    let client_id = process.env.REACT_APP_NAVER_CLIENT_ID
    let state = process.env.REACT_APP_NAVER_RANDOM_STATE;
    let redirectURI = encodeURI(process.env.REACT_APP_NAVER_REDIRECT_URI);
    const api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + state;
    window.location.href = api_url
  }

  // 구글 로그인 클릭
  // 23-11-13 오후 17:00 박지훈 작성
  const googleLoginClick = ()=>{
    let client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID
    let redirect_uri = process.env.REACT_APP_GOOGLE_REDIRECT_URI
    let scope = process.env.REACT_APP_GOOGLE_SCOPE
    let api_url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=code&include_granted_scopes=true`
    window.location.href = api_url
  }

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
              <Form.Control type="email" placeholder="Enter email" ref={idRef} />
            </Form.Group>
            <Form.Group className="mb-3 email-input" controlId="formGroupPassword">
              {/* <Form.Label>Password</Form.Label> */}
              <Form.Control type="password" placeholder="Password" ref={pwRef} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Link className="d-grid gap-2">
                <Button className="login-btn" onClick={login_btn} variant="dark">Login</Button>
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
                <ListGroup.Item onClick={googleLoginClick}>
                  <img className="login-logo" src={google} alt="" />
                  <span>Google 계정으로 로그인</span>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup className="login-box mb-3" variant="flush">
                <ListGroup.Item onClick={naverLoginClick}>
                  <img className="login-logo naver" src={naver} alt="" />
                  <span>Naver 계정으로 로그인</span>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup className="login-box mb-3" variant="flush">
                <ListGroup.Item onClick={kakaoLoginClick}>
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
