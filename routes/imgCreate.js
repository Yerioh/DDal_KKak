// 2023-11-28  오후 18:00 임휘훈 DB모듈화 완료
// Flask 서버 연동 라우터
// 2023-11-08 오전 09:45 박지훈 작성

const express = require("express");
const router = express.Router();
const axios = require("axios");
const {DeleteObjectsCommand, S3Client} = require('@aws-sdk/client-s3')
const imgCreateModel = require("../models/imgCreateModel")
const imgUseModel = require("../models/imgUseModel")
const imgCollectModel = require("../models/imgCollectModel")

// S3 클라이언트 생성
const client = new S3Client({
  region : process.env.AWS_DEFAULT_REGION,
  accessKeyId : process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
})

// DB 연결
const db = require("../config/database");
let conn = db.init();

let flaskServer = 'http://ecea-34-139-230-216.ngrok.io'

// Flask ngrok 서버 주소 가져오기
// Colab에서 Flask 서버가 켜지면 공개 IP로 접근하여 ngrok 주소 전달
router.post('/getUrl', (req,res)=>{
  flaskServer = req.body.url
})


// 2023-11-10 오전 10:00 박지훈 작성
// stable diffusion 이미지 생성
router.post("/stable", (req, res) => {
  // 긍정, 부정 프롬프트
  let data = req.body;
  let userId = req.session.userId;
  axios
    .post(`${flaskServer}/stable`, {
      data,
      userId: userId,
    })
    .then((response) => {
      let imgData = response.data;
      res.json({ imgData });
    })
    .catch((error) => {
      console.error("이미지 생성 에러 발생");
      res.json({ createError: true });
    });
});

// 2023-11-10 오전 10:00 박지훈 작성
// 생선된 이미지 선택 라우터(생성 된 이미지 중 사용할 이미지를 제외한 나머지 이미지 제거(S3 용량 관리))
router.post("/choiceImg", (req, res) => {
  let data = req.body;
  axios
    .post(`${flaskServer}/imageChoice`, { data: data, id: req.session.userId })
    .then((response) => {
      res.json({ choiceImg: true });
    });
});

// 23-11-28 모듈화 임휘훈 작성
// 이미지 생성 후 DB에 고유 ID 기준으로 이미지 저장하기
router.post("/saveImg", async (req, res) => {
    // 유저 아이디
    // 사용된 긍정 프롬프트
    // 사용된 부정 프롬프트
    // 이미지 고유한 url
    // 이미지 이름
    let {userId, positive, negative, img_info, imgName} = req.body
    const result = await imgCreateModel.imgSave(userId, positive, negative, img_info, imgName)
    if(result.saveResult){ // 저장 완료
      res.json({result : true})
    }
    else{
      res.json({result : false})
    }
});

// 23-11-28 모듈화 임휘훈 작성
// 마이페이지 => 내 저장 이미지의 이미지 불러오기
router.post("/myimg", async (req, res) => {
  let userId = req.body.id; // 유저 아이디
  const result = await imgUseModel.myimg(userId)
  res.json({imgArray : result.imgArray[0]})
});

// 23-11-28 모듈화 임휘훈 작성
// 내 저장이미지 선택 삭제 라우터
router.post("/deleteImg", async (req, res) => {
  let sqlImgUrl = req.body.imgUrl; // 문자열 형태로 된 이미지 ID
  let deleteS3 = req.body.deleteS3 // S3에서 삭제할 이미지 경로
  let sessionId = req.session.userId // 세션에 저장된 유저 ID

  const command = new DeleteObjectsCommand({
    Bucket : process.env.AWS_BUCKET,
    Delete : {
      Objects : deleteS3
    }
  })

  // s3 삭제
  const response = await client.send(command)

  // DB 삭제
  const result = await imgUseModel.deleteImg(sqlImgUrl, sessionId)
  res.json({imgArray : result.imgArray[0]})
});

// 23-11-28 모듈화 임휘훈 작성
// 내 저장 이미지 공유 여부 설정 라우터
router.post('/imgShare', async (req,res)=>{
  let imgId = req.body.imgId
  const result = await imgUseModel.imgShare(imgId)

})

// 23-11-28 모듈화 임휘훈 작성
// 이미지 더보기 페이지 이미지 출력
router.post('/shareImgShow', async (req,res)=>{
  let data = req.body.sortImg
  const result = await imgCollectModel.shareImgShow(data)
  res.json({result : result.imgArray[0]})
})

// 23-11-28 모듈화 임휘훈 작성
// 메인 페이지 공유 이미지 좋아요 순 상위 10개 데이터
router.post('/mainImgShow', async (req,res)=>{
    const result = await imgCollectModel.mainImgShow()
    res.json({result : result.imgArray[0]})
})

// 23-11-28 모듈화 임휘훈 작성
// 이미지 좋아요 클릭, 클릭 해제 라우터
router.post('/likeClick', async (req,res)=>{
  let userId = req.body.id
  let imgId = req.body.imgId
  const result = await imgCollectModel.likeClick(userId, imgId)
  if(result.likeCheck){
    res.json({likeCheck:true})
  }
})

// 23-11-28 모듈화 임휘훈 작성
// 이미지 좋아요 클릭 여부 확인 라우터
router.post('/likeCheck', async (req,res)=>{
  let userId = req.body.id
  let imgId = req.body.imgId
  const result = await imgCollectModel.likeCheck(userId, imgId)
  if(result.likeCheck){
    res.json(true)
  }else{
    res.json(false)
  }
})

module.exports = router;
