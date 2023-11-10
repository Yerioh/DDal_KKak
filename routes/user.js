// user 라우터
// 2023-11-10 16:20 임휘훈 작성

const express = require("express");
const router = express.Router();
const axios = require("axios");

// DB 연결
const db = require("../config/database");
let conn = db.init();

// 회원가입 라우터
router.post("/join", (req, res) => {
  let id = req.body.userId; // 사용자가 입력한 ID, name 속성
  let email = req.body.useremail; // 사용자가 입력한 email
  let pw = req.body.userPw; // 사용자가 입력한 PW
  let checkPw = req.body.checkPw; // 비밀번호 확인
  let userName = req.body.userName; // 사용자 이름
  let phone = req.body.phone; // 사용자 휴대전화
  let postNumber = req.body.postNumber; // 우편번호
  let doro = req.body.doro; // 도로명 주소 add1
  let detailAddress = req.body.detailAddress; // 상세주소 add2
  // 회원가입 쿼리문
  let joinQuery =
    'INSERT INTO TB_MEMBER (MEMBER_ID, MEMBER_PW, MEMBER_NAME, MEMBER_EMAIL, MEMBER_PHONE, MEMBER_POST, MEMBER_ADDR1, MEMBER_ADDR2, MEMBER_LOGIN_TYPE, JOINED_AT) VALUES (?, ?, ?, ?, ?, ?, ?, ?, "M", DATE_ADD(NOW(), INTERVAL 9 HOUR))';

  // 비밀번호 확인 조건문
  if (pw == checkPw) {
    // DB 연결
    conn.connect();
    conn.query(
      joinQuery,
      [id, pw, userName, email, phone, postNumber, doro, detailAddress],
      (err, result) => {
        if (err) {
          console.log("회원가입 쿼리문 오류", err);
          res.send(JSON.stringify(false));
        } else {
          console.log("회원가입 성공");
          res.send(JSON.stringify(true));
        }
      }
    );
  } else {
    console.log("비밀번호 확인 오류");
    res.send(JSON.stringify(false));
  }
});

// 아이디 중복 체크
router.post("/checkId", (req, res) => {
  let id = req.body.id;
  let query = "SELECT MEMBER_ID FROM TB_MEMBER WHERE MEMBER_ID = ?";
  console.log("아이디 머임", id);
  conn.connect();
  conn.query(query, [id], (err, result) => {
    if (err) {
      console.log("아이디 중복체크 쿼리문 에러");
    } else {
      if (result.length == 0) {
        // 아이디 조회결과 0개
        console.log("사용할 수 있는 ID");
        res.send(JSON.stringify(true));
      } else {
        console.log("이미 존재하는 ID");
        res.send(JSON.stringify(false));
      }
    }
  });
});

// 로그인 라우터
router.post("/login", (req, res) => {
  let id = req.body.userId; // 입력한 아이디
  let pw = req.body.userPw; // 입력한 비밀번호
  // 로그인 쿼리문
  let loginQuery =
    "SELECT USER_ID, USER_PW, USER_NAME FROM TB_USER WHERE USER_ID = ?";
  // DB 연결
  conn.connect();
  conn.query(loginQuery, [id], (err, result) => {
    if (err) {
      console.log("로그인 쿼리문 에러");
    } else {
      // 아무것도 조회 되지 않으면
      if (result.length == 0) {
        console.log("아이디가 존재하지 않습니다.");
      } else {
        if (result[0].USER_ID == id && result[0].USER_PW == pw) {
          console.log(result[0].USER_ID, "님 로그인 성공");

          // 로그인 성공 후 사용자 세션 생성
          let userName = result[0].USER_NAME;
          let seName = (req.session.name = userName);
          let seLogin = (req.session.login = true);
        } else {
          console.log("로그인 실패");
        }
      }
    }
  });
});

module.exports = router;
