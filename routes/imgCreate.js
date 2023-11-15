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

const flaskServer = "http://7925-104-199-112-114.ngrok.io"

router.post("/stable", (req, res) => {
  let data = req.body;
  console.log(data)
  axios.post(`${flaskServer}/stable`, { data })
    .then((response) => {
      let imgData = response.data;
      // console.log(imgData);
      res.json({ imgData });
    })
    .catch((error) => {
      console.error("err", error);
    });
});


router.post('/choiceImg', (req,res)=>{
  let data = req.body
  axios.post(`${flaskServer}/imageChoice`, {data})
    .then((response)=>{
      let data = response.data
      console.log(data)
    })
})

module.exports = router;
