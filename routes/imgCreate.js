// Flask 서버 연동 라우터 
// 2023-11-08 오전 09:45 박지훈 작성

const express = require("express");
const router = express.Router();
const axios = require("axios");

// DB 연결
const db = require("../config/database");
let conn = db.init();


// router.post("/data", (req, res) => {
//   console.log("data", req.body);
//   const data = req.body;

//   const response_data = { 1: "123", 2: "456" };
//   res.status(200).json(response_data);
// });

const flaskServer = "http://5aa9-35-198-236-203.ngrok.io"

// stable diffusion 이미지 생성
router.post("/stable", (req, res) => {
  // 긍정, 부정 프롬프트
  let data = req.body;
  let userId = req.session.userId
  axios.post(`${flaskServer}/stable`, { 
    data, 
    userId : userId,
   })
    .then((response) => {
      let imgData = response.data;
      // console.log(imgData);
      res.json({ imgData });
    })
    .catch((error) => {
      console.error("이미지 생성 에러 발생");
      res.json({createError : true})
    });
});


router.post('/choiceImg', (req,res)=>{
  let data = req.body
  axios.post(`${flaskServer}/imageChoice`, {data : data, id : req.session.userId})
    .then((response)=>{
      let data = response.data
      console.log(data)
      res.json({choiceImg : true})
    })
})

// 23-11-17 11:40 임휘훈 작성

// 이미지 생성 후 DB에 고유 ID 기준으로 이미지 저장하기
router.post('/saveImg', (req,res)=>{
  let userId = req.body.userId // 유저 아이디
  let positive = req.body.positive // 사용된 긍정 프롬프트
  let negative = req.body.negative // 사용된 부정 프롬프트
  let img_info = req.body.img_info // 이미지 고유한 url

  let insertQuery = "INSERT INTO TB_GEN_IMG (MEMBER_ID, IMG_PROMPT, IMG_NE_PROMPT, IMG_URL, GENERATED_AT) VALUES (?, ?, ?, ?,  DATE_ADD(NOW(), INTERVAL 9 HOUR))"
  conn.connect()
  conn.query(insertQuery, [userId, positive, negative, img_info], (err, result) => {
    if(err){
      console.log("이미지 DB 저장 쿼리문 오류", err);
    }
    else{
      console.log("이미지 DB 저장 성공");
    }
  })
})

// 마이페이지 => 내 저장 이미지의 이미지 불러오기
router.post("/myimg", (req, res) => {
  console.log("내 저장 이미지", req.body.id);
  let userId = req.body.id // 유저 아이디

  let selectQuery = "SELECT IMG_PROMPT, IMG_NE_PROMPT, IMG_URL FROM TB_GEN_IMG WHERE MEMBER_ID = ?"
  conn.connect()
  conn.query(selectQuery, [userId], (err, result) => {
    if(err){
      console.log("내 저장 이미지 쿼리문 오류", err);
    }
    else{
      console.log("내 저장 이미지 불러오기 성공", result);
      res.json({imgArray : result})
    }
  })
})

module.exports = router;
