// 2023-11-28  오전 10:20 박지훈 모듈화 진행

// user 정보 라우터
// 2023-11-14 12:45 임휘훈 작성

const express = require("express");
const router = express.Router();
const axios = require("axios");
const crypto = require('crypto')
const hash = crypto.createHash('sha1')
// 회원가입 및 로그인 로직 모듈
const userModel = require('../models/userModel')

// DB 연결
const db = require("../config/database");
let conn = db.init();

// 회원가입 라우터
router.post("/join",  async (req, res) => {
  let userData = req.body
  const result = await userModel.userNormalJoin(userData)
  if(result.joinResult){
    res.json(true);
  }
  else{
    res.json(false)
  }
});

// 아이디 중복 체크 라우터
router.post("/checkId", async(req, res) => {
  let id = req.body.id;
  const result = await userModel.userIdCheck(id)
  if(result.loginCheck){
    res.json(true);
  }
  else{
    res.json(false);
  }
});

// 로그인 라우터
router.post("/login", (req, res) => {
  let id = req.body.userId; // 입력한 아이디
  let pw = req.body.userPw; // 입력한 비밀번호
  const hash = crypto.createHash('sha256')
                   .update(pw)
                   .digest('hex');

  // 로그인 쿼리문
  let idQuery =
    "SELECT MEMBER_ID, MEMBER_PW, MEMBER_NAME, MEMBER_LOGIN_TYPE FROM TB_MEMBER WHERE MEMBER_ID = ?";
  // DB 연결
  conn.connect();
  conn.query(idQuery, [id], (err, result) => {
    if (err) {
      console.log("로그인 쿼리문 에러");
      return res.json({result : "serverError"})
    } else {
      // 아무것도 조회 되지 않으면
      if (result.length == 0) {
        console.log("아이디가 존재하지 않습니다.");
        return res.json({result : "IDError"})
      } else {
        if (result[0].MEMBER_ID == id && result[0].MEMBER_PW == hash) {
          console.log(result[0].MEMBER_ID, "님 로그인 성공");
          
          // 로그인 성공 후 사용자 세션 생성
          let userName = result[0].MEMBER_NAME;
          req.session.Name = userName;
          req.session.isLogin = true;
          req.session.userId = result[0].MEMBER_ID
          req.session.loginType = result[0].MEMBER_LOGIN_TYPE

          req.session.save(() => {
            console.log("로그인 완료 후 페이지 이동");
            return res.json({result : "success"})
          });

        } else {
          console.log("로그인 실패");
          return res.json({result : "PwError"})
        }
      }
    }
  });
});

// 내 정보 수정란에 필요한 사용자 정보 가져오는 라우터
router.post("/mypage", (req, res) => {
  let id = req.body.userID
  // 고유한 아이디로 사용자 정보 가져오기

  let idQuery =
  "SELECT MEMBER_PW, MEMBER_EMAIL, MEMBER_PHONE, MEMBER_POST, MEMBER_ADDR1, MEMBER_ADDR2 FROM TB_MEMBER WHERE MEMBER_ID = ?";
  // DB 연결
  conn.connect();
  conn.query(idQuery, [id], (err, result) => {
    let userEmail = result[0].MEMBER_EMAIL // DB에 저장된 회원 이메일
    let userPhone = result[0].MEMBER_PHONE // DB에 저장된 회원 전화번호
    let userPw = result[0].MEMBER_PW  // DB에 저장된 비밀번호
    let postNumber = result[0].MEMBER_POST // DB에 저장된 우편번호
    let addr1 = result[0].MEMBER_ADDR1 // 도로명주소
    let addr2 = result[0].MEMBER_ADDR2 // 상세주소
    res.json({member_email : userEmail,
              member_phone : userPhone,
              user_pw: userPw,
              post_number : postNumber,
              addr_1 : addr1,
              addr_2 : addr2})
  })
  
})

// 회원 정보 수정 라우터
router.post("/updateInfo", (req, res) => {
  let id = req.body.userID // 유저 아이디
  let pw = req.body.userPw // 변경할 비밀번호
  let email = req.body.userEmail // 변경할 이메일
  let phone = req.body.userPhone // 변경할 전화번호
  let postNumber = req.body.postNum // 우편번호
  let addr1 = req.body.addr1 // 주소
  let addr2 = req.body.addr2 // 상세주소  

  let updateQuery =
  "UPDATE TB_MEMBER SET MEMBER_PW = SHA2(?, 256), MEMBER_EMAIL = ?, MEMBER_PHONE = ?, MEMBER_POST = ?, MEMBER_ADDR1 = ?, MEMBER_ADDR2 = ? WHERE MEMBER_ID = ?";

  conn.connect()
  conn.query(updateQuery, [pw, email, phone, postNumber, addr1, addr2, id], (err, result) => {
    if(err){
      console.log("회원 정보 수정 update 쿼리 에러", err);
      return res.json({result : false})
    }
    else{
      return res.json({result : true})
    }
  })
})

// 23-11-14 오전 10:00 박지훈 작성

// 페이지 로딩 시 Session 값 요청
router.post('/getUserInfo', (req,res)=>{
  if (req.session.isLogin){
    res.json({
      isLogin : req.session.isLogin,
      userName : req.session.Name,
      userId : req.session.userId,
      loginType : req.session.loginType,
      // accessToken : req.session.accessToken,
    })
  }
})

// 회원 탈퇴--------------------------------------------------------------------------
// 23-11-14 오후 16:15 박지훈 작성
router.post('/deleteUser',(req,res)=>{
  let accessToken = req.session.accessToken
  let loginType = req.session.loginType
  let userId = req.session.userId
  let deleteUserSQL = `DELETE FROM TB_MEMBER WHERE MEMBER_ID = ?`
  // 로그인 타입이 Google 이라면
  if(loginType === 'G'){
    axios.post(`https://oauth2.googleapis.com/revoke?token=${accessToken}`, null, {
      headers : {
        'Content-type' : 'application/x-www-form-urlencoded'
      }
    })
      .then((response) => {
        // 정상적으로 토큰이 삭제 되었다면, 데이터베이스에서 사용자 정보 삭제
        if(response.status === 200){          
          conn.connect()
          conn.query(deleteUserSQL, [userId], (err,result)=>{
            if(err){
              console.log('구글 회원 탈퇴 쿼리문 에러',err)
            }
            else{
              console.log('구글 회원 탈퇴 성공')
              req.session.destroy()
              res.json({deleteStatus : true})
            }
          })
        }
      });
  }
  // 로그인 타입이 Naver 라면
  else if(loginType === 'N'){
    let client_id = process.env.NAVER_CLIENT_ID
    let client_secret = process.env.NAVER_CLIENT_SECRET
    // 네이버 토큰 삭제 엔드포인트
    axios.post(`https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${client_id}&client_secret=${client_secret}&access_token=${accessToken}&service_provider=NAVER`)
      .then(response=>{
        // 정상적으로 토큰이 삭제 되었다면, 데이터베이스에서 사용자 정보 삭제
        if(response.data.result === 'success'){
          conn.connect()
          conn.query(deleteUserSQL, [userId], (err,result)=>{
            if(err){
              console.log('네이버 회원 탈퇴 쿼리문 에러',err)
            }
            else{
              console.log('네이버 회원 탈퇴 성공')
              req.session.destroy()
              res.json({deleteStatus : true})
            }
          })
        }
      })
  }
  // 로그인 타입이 카카오 일 때
  else if(loginType === 'K'){
    // 토큰 삭제 엔드포인트
    axios.post(`https://kapi.kakao.com/v1/user/unlink`, null, {
      headers :{
        "Authorization": `Bearer ${accessToken}`
      }
    })
    .then(response=>{
      // 정상적으로 토큰이 삭제 되었다면, 데이터베이스에서 사용자 정보 삭제
      if(response.data.id === userId){
        conn.connect()
          conn.query(deleteUserSQL, [userId], (err,result)=>{
            if(err){
              console.log('카카오 회원 탈퇴 쿼리문 에러',err)
            }
            else{
              console.log('카카오 회원 탈퇴 성공')
              req.session.destroy()
              res.json({deleteStatus : true})
            }
          })
      }
    })
  }
  // 로그인 타입이 일반 회원일 때
  else if(loginType == "M"){
    conn.connect()
    conn.query(deleteUserSQL, [userId], (err, result)=>{
      if(err){
        console.log('일반 회원 탈퇴 쿼리문 에러',err)
      }
      else{
        console.log('일반 회원 탈퇴 성공')
        req.session.destroy()
        res.json({deleteStatus : true})
      }
    })
  }
})


// Session 삭제
router.post('/Logout', (req,res)=>{
  req.session.destroy()
  res.json({isLogin : false})
})


module.exports = router;
