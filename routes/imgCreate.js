// Flask 서버 연동 라우터 
// 2023-11-08 오전 09:45 박지훈 작성

const express = require("express");
const router = express.Router();
const axios = require("axios");


// router.post("/data", (req, res) => {
//   console.log("data", req.body);
//   const data = req.body;

//   const response_data = { 1: "123", 2: "456" };
//   res.status(200).json(response_data);
// });

let flaskServer = ''

router.post('/getUrl', (req,res)=>{
  console.log(req.body)
  flaskServer = req.body.url
})



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
  console.log(data, req.session.userId)
  axios.post(`${flaskServer}/imageChoice`, {data : data, id : req.session.userId})
    .then((response)=>{
      let data = response.data
      console.log(data)
      res.json({choiceImg : true})
    })
})


router.post('/saveImg', (req,res)=>{
  console.log(req.body)
})



module.exports = router;
