// 2023-11-13 오전 11:00 박지훈 작성
const express = require("express");
const router = express.Router();
const axios = require("axios");

// DB 연결
const db = require("../config/database");
let conn = db.init();

// 카카오 ------------------------------------------------------------------------------------
// 2023-11-13 오후 14:30 박지훈 작성
router.get("/kakaoLogin",  async(req, res) => {
  let REST_API_KEY = process.env.KAKAO_REST_KEY;
  let REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
  
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
          let userData = response.data
          let selectSQL = `SELECT COUNT(MEMBER_ID) AS CNT FROM TB_MEMBER WHERE MEMBER_ID = ? AND MEMBER_PW = SHA('?')`

          conn.connect()
          // 카카오 계정으로 회원가입 여부 쿼리문
          conn.query(selectSQL, [userData.id, userData.id], (err,result)=>{
            if(err){
              console.log('KAKAO 로그인 SELECT 에러 발생', err)
            } else{
              // 회원가입이 되어있지 않다면
              if(result[0].CNT == 0){
                let joinSQL = `INSERT INTO TB_MEMBER (MEMBER_ID, MEMBER_PW, MEMBER_LOGIN_TYPE, JOINED_AT, MEMBER_NAME) VALUES ('?' ,SHA('?'),?, DATE_ADD(NOW(), INTERVAL 9 HOUR) ,?);`
                conn.query(joinSQL, [userData.id, userData.id, 'K', userData.properties.nickname], (err,result)=>{
                  if(err){
                    console.log('카카오 회원가입 쿼리문 에러 발생',err)
                  }
                  else{
                    console.log('카카오 회원가입 성공')
                  }
                })
              }
              else{
                console.log('이미 가입되어있는 계정 : 바로 로그인')
              }
            }
          })          
          // 사용자 정보 세션 저장          
          // 로그인 유무
          req.session.isLogin = true
          // 사용자 이름
          req.session.Name = userData.properties.nickname
          // 엑세스 토큰
          req.session.accessToken = accessToken
          // 로그인 타입
          req.session.loginType = 'K'
          // 사용자 아이디
          req.session.userId = userData.id
          res.redirect('/')
        });
    });
});

// 구글 ---------------------------------------------------------------

// 구글 로그인
router.get('/googleLogin', (req,res)=>{
  let code = req.query.code
  let clientId = process.env.GOOGLE_CLIENT_ID
  let clientSecret = process.env.GOOGLE_SECRET
  let redirect_uri = process.env.GOOGLE_REDIRECT_URI

  axios.post('https://oauth2.googleapis.com/token', null,{
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
.then(response=>{
  let accessToken = response.data.access_token
  axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`)
  .then(response=>{
    let data = response.data
    let selectSQL = `SELECT COUNT(MEMBER_ID) AS CNT FROM TB_MEMBER WHERE MEMBER_ID = ? AND MEMBER_PW = SHA(?)`
    let joinSQL = `INSERT INTO TB_MEMBER (MEMBER_ID, MEMBER_PW, MEMBER_EMAIL, MEMBER_LOGIN_TYPE, JOINED_AT, MEMBER_NAME) VALUES (?, SHA(?), ?,?, DATE_ADD(NOW(), INTERVAL 9 HOUR), ?);`
    conn.connect()
    conn.query(selectSQL, [data.id, data.id], (err,result)=>{
      if(err){
        console.log('구글 로그인 select 에러', err)
      }
      else{
        if(result[0].CNT == 0){
          conn.query(joinSQL, [data.id, data.id, data.email, 'G', data.name], (err,result)=>{
            if(err){
              console.log('구글 회원가입 에러', err)
            }
            else{
              console.log('구글 회원가입 성공')
            }
          })
        }
        else{
          console.log('이미 가입되어있는 계정 : 바로 로그인')
        }
      }      
    })
    console.log(data)
    // 로그인 유무
    req.session.isLogin = true
    // 사용자 이름
    req.session.Name = data.name
    // 엑세스 토큰
    req.session.accessToken = accessToken
    // 로그인 타입
    req.session.loginType = 'G'
    // 사용자 아이디
    req.session.userId = data.id
    res.redirect('/')
  })
})
})


// 네이버-------------------------------------------------


// 네이버 로그인 Redirect
router.get('/naverLogin',(req,res)=>{
    // 네이버 환경변수
    let client_id = process.env.NAVER_CLIENT_ID
    let client_secret = process.env.NAVER_CLIENT_SECRET
    let redirectURI = encodeURI(process.env.NAVER_REDIRECT_URI);

    // 네이버에서 반환받은 코드
    let code = req.query.code;
    let state = req.query.state;
    let api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
     + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
    // var request = require('request');
    // var options = {
    //     url: api_url,
    //     headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    //  };
    // request.get(options, function (error, response, body) {
    //   if (!error && response.statusCode == 200) {
    //     console.log(body)
    //   } else {
    //     res.status(response.statusCode).end();
    //     console.log('error = ' + response.statusCode);
    //   }
    // });

    axios.get(api_url, null, {
      headers:{
        'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret
      }
    })
    .then(response=>{
      let accessToken = response.data.access_token
      // 엑세스 토큰으로 사용자 데이터 반환받기
      axios.post('https://openapi.naver.com/v1/nid/me', null, {
        headers : {
          'Authorization' : `Bearer ${accessToken}`,
        }
      })
      .then(response=>{
        let data = response.data.response
        let selectSQL = `SELECT COUNT(MEMBER_ID) AS CNT FROM TB_MEMBER WHERE MEMBER_ID = ? AND MEMBER_PW = SHA(?)`
        let joinSQL = `INSERT INTO TB_MEMBER (MEMBER_ID, MEMBER_PW, MEMBER_EMAIL, MEMBER_PHONE, MEMBER_LOGIN_TYPE, JOINED_AT, MEMBER_NAME) VALUES (?, SHA(?),?,?,?,DATE_ADD(NOW(), INTERVAL 9 HOUR),?);`
        conn.connect()
        conn.query(selectSQL, [data.id, data.id], (err,result)=>{
          if(err){
            console.log('Naver select 쿼리문 에러', err)
          }
          else{
            if(result[0].CNT == 0){
              conn.query(joinSQL, [data.id, data.id, data.email, data.mobile.replace(/-/g,''), 'N', data.name], (err,result)=>{
                if(err){
                  console.log('Naver Insert 에러', err)
                }
                else{
                  console.log('Naver 회원가입 성공')
                }
              })
            }
            else{
              console.log('이미 가입되어있는 계정 : 바로 로그인')
              
            }
          }
        })
        console.log(data)
        // 로그인 유무
        req.session.isLogin = true
        // 사용자 이름
        req.session.Name = data.name
        // 엑세스 토큰
        req.session.accessToken = accessToken
        // 로그인 타입
        req.session.loginType = 'N'
        // 사용자 아이디
        req.session.userId = data.id
        res.redirect('/')
      })
      
    })
})








module.exports = router;
