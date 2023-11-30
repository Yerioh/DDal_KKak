// 2023-11-28  오전 10:20 박지훈 DB모듈화 완료

// user 정보 라우터
// 2023-11-14 12:45 임휘훈 작성

const express = require("express");
const router = express.Router();
const axios = require("axios");
const crypto = require('crypto')
const hash = crypto.createHash('sha1')

// 회원가입 및 로그인 로직 모듈
const userModel = require('../models/userModel')
const myPageModel = require('../models/myPageModel')


// 회원가입 라우터
// 23-11-28 오후 14:15 박지훈 수정(DB 쿼리문 모듈화)
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
// 23-11-28 오후 14:15 박지훈 수정(DB 쿼리문 모듈화)
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
// 23-11-28 오후 14:15 박지훈 수정(DB 쿼리문 모듈화)
router.post("/login", async(req, res) => {
  let id = req.body.userId; // 입력한 아이디
  let pw = req.body.userPw; // 입력한 비밀번호
  const hash = crypto.createHash('sha256') // 비밀번호 암호화
                   .update(pw)
                   .digest('hex');
   let result = await userModel.userLogin(id, hash)
  if(result.loginResult === 'serverError'){
    res.json({result : 'serverError'})
  }
  else if(result.loginResult === 'PwError'){
    res.json({result : "PwError"})
  }
  else if(result.loginResult === 'success'){
    // 로그인 성공 후 사용자 세션 생성
    let {userName, loginType, isLogin, userId} = result
    req.session.Name = userName;
    req.session.isLogin = isLogin;
    req.session.userId = userId
    req.session.loginType = loginType
    req.session.save(() => {
      console.log("로그인 완료 후 페이지 이동");
      res.json({result : "success"})
    });
  }
  else if(result.loginResult === 'IDError'){
    res.json({result : "IDError"})
  } 
});


// 내 정보 수정란에 필요한 사용자 정보 가져오는 라우터
// 23-11-28 오후 14:15 박지훈 수정(DB 쿼리문 모듈화)
router.post("/mypage", async(req, res) => {
  let id = req.body.userID
  // 고유한 아이디로 사용자 정보 가져오기(DB 모듈)
  let result = await myPageModel.mypage(id)
  let {member_email, member_phone, user_pw, post_number, addr_1, addr_2} = result
  res.json({member_email : member_email,
    member_phone : member_phone,
    user_pw: user_pw,
    post_number : post_number,
    addr_1 : addr_1,
    addr_2 : addr_2})  
})

// 회원 정보 수정 라우터
// 23-11-28 오후 14:15 박지훈 수정(DB 쿼리문 모듈화)
router.post("/updateInfo", async(req, res) => {
  let result = await myPageModel.updateInfo(req.body)
  if(result.updateResult){
    res.json({result : true})
  }
  else{
    res.json({result : true})
  }
})

// 23-11-14 오전 10:00 박지훈 작성

// 페이지 로딩 시 Session 데이터 요청
router.post('/getUserInfo', (req,res)=>{
  if (req.session.isLogin){
    res.json({
      isLogin : req.session.isLogin,
      userName : req.session.Name,
      userId : req.session.userId,
      loginType : req.session.loginType,
    })
  }
})

// 회원 탈퇴 라우터--------------------------------------------------------------------------
// 23-11-28 오후 14:15 박지훈 수정(DB 쿼리문 모듈화)
router.post('/deleteUser', async(req,res)=>{
  let accessToken = req.session.accessToken
  let loginType = req.session.loginType
  let userId = req.session.userId
  
  // 로그인 타입이 Google 일때
  if(loginType === 'G'){
   let response = await axios.post(`https://oauth2.googleapis.com/revoke?token=${accessToken}`, null, {
      headers : {
        'Content-type' : 'application/x-www-form-urlencoded'
      }
    })
    // 정상적으로 토큰이 삭제 되었다면, 데이터베이스에서 사용자 정보 삭제
    if(response.status === 200){          
      if(response.data.id === userId){
        let result = await userModel.deleteUser(userId)
        if(result.deleteResult){
          req.session.destroy()
          res.json({deleteStatus : true})
        }
      }
    }
  }
  // 로그인 타입이 Naver 일때
  else if(loginType === 'N'){
    let client_id = process.env.NAVER_CLIENT_ID
    let client_secret = process.env.NAVER_CLIENT_SECRET
    // 네이버 토큰 삭제 엔드포인트
    let response = await axios.post(`https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${client_id}&client_secret=${client_secret}&access_token=${accessToken}&service_provider=NAVER`)
    // 정상적으로 토큰이 삭제 되었다면, 데이터베이스에서 사용자 정보 삭제
    if(response.data.result === 'success'){
      let result = await userModel.deleteUser(userId)
      if(result.deleteResult){
        req.session.destroy()
        res.json({deleteStatus : true})
      }
    }
    
  }
  // 로그인 타입이 카카오 일 때
  else if(loginType === 'K'){
    // 토큰 삭제 엔드포인트
    let response = await axios.post(`https://kapi.kakao.com/v1/user/unlink`, null, {
      headers :{
        "Authorization": `Bearer ${accessToken}`
      }
    })
      // 정상적으로 토큰이 삭제 되었다면, 데이터베이스에서 사용자 정보 삭제
    if(response.data.id === userId){
      let result = await userModel.deleteUser(userId)
      if(result.deleteResult){
        req.session.destroy()
        res.json({deleteStatus : true})
      }
    }
  }
  // 로그인 타입이 일반 회원일 때
  else if(loginType == "M"){
    let result = await userModel.deleteUser(userId)
    if(result.deleteResult){
      req.session.destroy()
      res.json({deleteStatus : true})
    }
  }  
})


// 로그 아웃 시Session 삭제
router.post('/Logout', (req,res)=>{
  req.session.destroy()
  res.json({isLogin : false})
})


module.exports = router;
