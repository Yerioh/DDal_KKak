// 소셜 로그인
// 2023-11-08 오전 09:45 박지훈 작성

const express = require("express");
const router = express.Router();
const axios = require("axios");
const path = require('path')

router.get("/kakaoLogin",  async(req, res) => {
  let REST_API_KEY = "28c814c9fa176ff3676b881b37e59b9b";
  let REDIRECT_URI = "http://localhost:3001/user/kakaoLogin";
  
  // 카카오 로그인 수락시, 쿼리스트링으로 전달되는 CODE의 값
  let code = req.query.code;
  // CODE 값을 Kakao server로 전달하여 엑세스 토큰 반환 받기
  axios.post("https://kauth.kakao.com/oauth/token",null, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        grant_type: "authorization_code",
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code: code,        
      },
    })
    .then((response) => {
      // 반환받은 엑세스 토큰으로 사용자 정보 반환 받기
      let accessToken = response.data.access_token;
      axios.get("https://kapi.kakao.com/v2/user/me",  {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        })
        .then((response) => {
          // 사용자 정보
          let userData = response.data
          req.session.isLogin = true
          req.session.Name = userData.properties.nickname
          req.session.accessToken = accessToken
          req.session.userNumber = userData.id
          res.redirect('/')
        });
    });
});

// 구글 로그인
router.get('/user/googleLogin', (req,res)=>{
  console.log('구글')
})


// 로그아웃 라우터(세션 삭제)
router.post('/Logout', (req,res)=>{
  req.session.destroy()
  res.json({isLogin : false})
})


// 세션 얻어오기
router.post('/getUserInfo', (req,res)=>{
  if (req.session.isLogin){
    res.json({
      isLogin : req.session.isLogin,
      userName : req.session.Name,
      accessToken : req.session.accessToken,
      userNumber : req.session.userNumber
    })
  }
})


module.exports = router;
