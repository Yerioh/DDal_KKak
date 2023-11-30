// 2023-11-13 오전 11:00 박지훈 작성
const express = require("express");
const router = express.Router();
const axios = require("axios");
const socialLoginModel = require('../models/socialLoginModel')

// 카카오 ------------------------------------------------------------------------------------
// 2023-11-13 오후 14:30 박지훈 작성
router.get("/kakaoLogin",  async(req, res) => {
  let REST_API_KEY = process.env.KAKAO_REST_KEY;
  let REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
  
  // 카카오 로그인 수락시, 쿼리스트링으로 전달되는 CODE의 값
  let code = req.query.code;

  // CODE 값을 Kakao server로 전달하여 엑세스 토큰 반환 받기
  const codeResponse = await axios.post("https://kauth.kakao.com/oauth/token",null, {
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
    // 반환받은 엑세스 토큰으로 사용자 정보 반환 받기
    let accessToken = codeResponse.data.access_token;
    const accesResponse =  await axios.get("https://kapi.kakao.com/v2/user/me",  {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })          
        let userData = accesResponse.data
        let loginType = 'K'
        
        const result = await socialLoginModel.socialLogin(userData,loginType)
        if(result.socialResult){
          // 사용자 정보 세션 저장          
          // 로그인 유무
          req.session.isLogin = true
          // 사용자 이름
          req.session.Name = userData.properties.nickname
          // 엑세스 토큰
          req.session.accessToken = accessToken
          // 로그인 타입
          req.session.loginType = loginType
          // 사용자 아이디
          req.session.userId = userData.id
          res.redirect('/')
        }
        else{
          console.error('카카오 소셜 에러 발생')
        }
});

// 구글 ---------------------------------------------------------------

// 구글 로그인
router.get('/googleLogin', async(req,res)=>{
  let code = req.query.code
  let clientId = process.env.GOOGLE_CLIENT_ID
  let clientSecret = process.env.GOOGLE_SECRET
  let redirect_uri = process.env.GOOGLE_REDIRECT_URI

  const codeResult = await axios.post('https://oauth2.googleapis.com/token', null,{
  headers : {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  params : {
    'code' : code,
    'client_id' : clientId,
    'client_secret' : clientSecret,
    'redirect_uri' : redirect_uri,
    "grant_type" : 'authorization_code'
  }
})
  let accessToken = codeResult.data.access_token
  const accessResult = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`)
    let userData = accessResult.data
    let loginType = 'G'
    // 소셜 로그인 모듈 
    const result = await socialLoginModel.socialLogin(userData,loginType)
    if(result.socialResult){
      // 로그인 유무
      req.session.isLogin = true
      // 사용자 이름
      req.session.Name = userData.name
      // 엑세스 토큰
      req.session.accessToken = accessToken
      // 로그인 타입
      req.session.loginType = loginType
      // 사용자 아이디
      req.session.userId = userData.id
      res.redirect('/')
    }
    else{
      console.error('구글 소셜 로그인 에러 발생')
    }
})


// 네이버-------------------------------------------------


// 네이버 로그인 Redirect
router.get('/naverLogin', async(req,res)=>{
    // 네이버 환경변수
    let client_id = process.env.NAVER_CLIENT_ID
    let client_secret = process.env.NAVER_CLIENT_SECRET
    let redirectURI = encodeURI(process.env.NAVER_REDIRECT_URI);

    // 네이버에서 반환받은 코드
    let code = req.query.code;
    let state = req.query.state;
    let api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
     + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;

    const codeResult = await axios.get(api_url, null, {
      headers:{
        'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret
      }
    })
      let accessToken = codeResult.data.access_token
      // 엑세스 토큰으로 사용자 데이터 반환받기
      const accessResult = await axios.post('https://openapi.naver.com/v1/nid/me', null, {
        headers : {
          'Authorization' : `Bearer ${accessToken}`,
        }
      })
        let userData = accessResult.data.response
        let loginType = 'N'
        // 소셜 로그인 모듈 
        const result = await socialLoginModel.socialLogin(userData,loginType)
        if(result.socialResult){
          // 로그인 유무
          req.session.isLogin = true
          // 사용자 이름
          req.session.Name = userData.name
          // 엑세스 토큰
          req.session.accessToken = accessToken
          // 로그인 타입
          req.session.loginType = loginType
          // 사용자 아이디
          req.session.userId = userData.id
          res.redirect('/')
        }
        else{
          console.error('네이버 소셜 로그인 에러 발생')
        }
      
})








module.exports = router;
