// Flask 서버 연동 라우터
// 2023-11-08 오전 09:45 박지훈 작성

const express = require("express");
const router = express.Router();
const axios = require("axios");
const {DeleteObjectsCommand, S3Client} = require('@aws-sdk/client-s3')

// S3 클라이언트 생성
const client = new S3Client({
  region : process.env.AWS_DEFAULT_REGION,
  accessKeyId : process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
})

// DB 연결
const db = require("../config/database");
let conn = db.init();

// router.post("/data", (req, res) => {
//   console.log("data", req.body);
//   const data = req.body;

//   const response_data = { 1: "123", 2: "456" };
//   res.status(200).json(response_data);
// });

let flaskServer = 'https://68d7-34-124-229-142.ngrok.io'

// Flask ngrok 서버 주소 가져오기
// Colab에서 Flask 서버가 켜지면 공개 IP로 접근하여 ngrok 주소 전달
router.post('/getUrl', (req,res)=>{
  console.log('Flask 서버 실행', req.body.url)
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
      // console.log(imgData);
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
      let data = response.data;
      res.json({ choiceImg: true });
    });
});

// 23-11-19 22:30 임휘훈 작성 : 삭제 버튼 기능 라우터

// 이미지 생성 후 DB에 고유 ID 기준으로 이미지 저장하기
router.post("/saveImg", (req, res) => {
  // 유저 아이디
  // 사용된 긍정 프롬프트
  // 사용된 부정 프롬프트
  // 이미지 고유한 url
  // 이미지 이름
  let {userId, positive, negative, img_info, imgName} = req.body

  let insertQuery =
    "INSERT INTO TB_GEN_IMG (MEMBER_ID, IMG_PROMPT, IMG_NE_PROMPT, IMG_URL, GENERATED_AT, IMG_NAME) VALUES (?, ?, ?, ?,  DATE_ADD(NOW(), INTERVAL 9 HOUR), ?)";
  conn.connect();
  conn.query(
    insertQuery,
    [userId, positive, negative, img_info, imgName],
    (err, result) => {
      if (err) {
        console.log("이미지 DB 저장 쿼리문 오류", err);
      } else {
        console.log("이미지 DB 저장 성공");
      }
    }
  );
});

// 마이페이지 => 내 저장 이미지의 이미지 불러오기
router.post("/myimg", (req, res) => {
  console.log("내 저장 이미지", req.body.id);
  let userId = req.body.id; // 유저 아이디

  let selectQuery =
    `SELECT IMG_ID, IMG_PROMPT, IMG_NE_PROMPT, IMG_URL, DATE_FORMAT(GENERATED_AT, '%Y-%m-%d %H:%i:%S') AS DATE, IMG_SHARE, IMG_NAME,
    (SELECT COUNT(*)
       FROM TB_LIKE
      WHERE IMG_ID = TB_GEN_IMG.IMG_ID) AS CNT
       FROM TB_GEN_IMG WHERE MEMBER_ID = ? ORDER BY GENERATED_AT DESC`;
  conn.connect();
  conn.query(selectQuery, [userId], (err, result) => {
    if (err) {
      console.log("내 저장 이미지 쿼리문 오류", err);
    } else {
      console.log("내 저장 이미지 불러오기 성공", result);
      console.log(result);
      res.json({ imgArray: result });
    }
  });
});

// 내 저장이미지 선택 삭제 라우터
router.post("/deleteImg", async(req, res) => {

  let sqlImgUrl = req.body.imgUrl; // 문자열 형태로 된 이미지 ID
  let deleteS3 = req.body.deleteS3 // S3에서 삭제할 이미지 경로

  let sessionId = req.session.userId // 세션에 저장된 유저 ID

  const command = new DeleteObjectsCommand({
    Bucket : process.env.AWS_BUCKET,
    Delete : {
      Objects : deleteS3
    }
  })

  const response = await client.send(command)
  console.log('s3 삭제 완료 : ', response)

  // 삭제 쿼리
  let deleteQuery = `DELETE FROM TB_GEN_IMG WHERE IMG_URL IN (${sqlImgUrl})`;
  // 선택 쿼리
  let selectQuery = `SELECT IMG_ID, IMG_PROMPT, IMG_NE_PROMPT, IMG_URL, DATE_FORMAT(GENERATED_AT, '%Y-%m-%d %H:%i:%S') AS DATE, IMG_SHARE, IMG_NAME,
                    (SELECT COUNT(*)
                       FROM TB_LIKE
                      WHERE IMG_ID = TB_GEN_IMG.IMG_ID) AS CNT
                       FROM TB_GEN_IMG WHERE MEMBER_ID = ? ORDER BY GENERATED_AT DESC`;
  conn.connect();
  conn.query(deleteQuery, (err, result) => {
    if (err) {
      console.log("내 저장 이미지 삭제 쿼리문 오류", err);
    } else {
      console.log("이미지 삭제 완료");
      conn.query(selectQuery, [sessionId], (err, result) => {
        if (err){
          console.log("삭제 후 이미지 최신화 쿼리 오류", err);
        }
        else{
          console.log("삭제된 후 프론트로");
          res.json({ imgArray: result });
        }
      })
    }
  });
});

// 내 저장 이미지 공유 여부 설정 라우터
router.post('/imgShare', (req,res)=>{
  let imgId = req.body.imgId
  let sql = `UPDATE TB_GEN_IMG SET IMG_SHARE = CASE WHEN IMG_SHARE = 'Y' THEN 'N' WHEN IMG_SHARE = 'N' THEN 'Y' ELSE IMG_SHARE END WHERE IMG_ID = ?`
  conn.connect()
  conn.query(sql,[imgId], (err,result)=>{
    if(err){
      console.log('공유 여부 변경 쿼리문 에러', err)
    }
    else{
      // console.log('공유여부 변경 성공')
    }
  })
})

// 이미지 더보기 페이지 이미지 출력
router.post('/shareImgShow', (req,res)=>{
  let sql = `SELECT A.IMG_ID, A.MEMBER_ID, A.IMG_PROMPT, A.IMG_NE_PROMPT, A.IMG_URL, A.IMG_NAME, DATE_FORMAT(A.GENERATED_AT, '%Y-%m-%d %H:%i:%S') AS DATE,
   B.MEMBER_NAME, 
  (SELECT COUNT(*) CNT 
     FROM TB_LIKE
    WHERE IMG_ID= A.IMG_ID) AS CNT
   FROM TB_GEN_IMG A INNER JOIN TB_MEMBER B ON(A.MEMBER_ID = B.MEMBER_ID) WHERE IMG_SHARE = "Y"`
  conn.connect()
  conn.query(sql, (err,result)=>{
    if(err){
      console.log('이미지 불러오기 쿼리문 에러', err)
    }
    else{
      res.json({result})
    }
  })
})

// 메인 페이지 공유 이미지 좋아요 순 상위 10개 데이터
router.post('/mainImgShow', (req,res)=>{
  let sql = 'SELECT A.IMG_ID, A.MEMBER_ID, A.IMG_PROMPT, A.IMG_NE_PROMPT, A.IMG_URL, B.MEMBER_NAME ,(SELECT COUNT(*) CNT FROM TB_LIKE WHERE IMG_ID= A.IMG_ID) AS CNT FROM TB_GEN_IMG A INNER JOIN TB_MEMBER B ON(A.MEMBER_ID = B.MEMBER_ID) WHERE IMG_SHARE = "Y" ORDER BY CNT DESC LIMIT 10'
  conn.connect()
  conn.query(sql, (err,result)=>{
    if(err){
      console.log('이미지 불러오기 쿼리문 에러', err)
    }
    else{
      res.json({result})
    }
  })
})

// 이미지 좋아요 클릭, 클릭 해제 라우터
router.post('/likeClick', (req,res)=>{
  let userId = req.body.id
  let imgId = req.body.imgId
  let sqlSelect = 'SELECT COUNT(*) AS CNT FROM TB_LIKE WHERE MEMBER_ID =? AND IMG_ID = ?'
  let sqlInsert = 'INSERT INTO TB_LIKE (MEMBER_ID, IMG_ID) VALUES(?,?)'
  let sqlDelete = 'DELETE FROM TB_LIKE WHERE MEMBER_ID = ? AND IMG_ID = ?'
  conn.connect()
  conn.query(sqlSelect, [userId, imgId], (err,result)=>{
    if(err){
      console.log('이미지 좋아요 쿼리 에러')
    }
    else{
      let data = result[0].CNT
      if(data === 0){
        conn.query(sqlInsert, [userId, imgId], (err,result)=>{
          if(err){
            console.log('좋아요 DB 데이터 INSERT 에러')
          }
          else{
            console.log('좋아요 등록 성공')
          }
        })
      }
      else{
        conn.query(sqlDelete, [userId, imgId],(err,result)=>{
          if(err){
            console.log('좋아요 DB 데이터 DELETE 에러')
          }
          else{
            console.log('좋아요 삭제 성공')
          }
        })
      }

    }
  })  
})

// 이미지 좋아요 클릭 여부 확인 라우터
router.post('/likeCheck', (req,res)=>{
  let userId = req.body.id
  let imgId = req.body.imgId
  let sqlSelect = 'SELECT COUNT(*) AS CNT FROM TB_LIKE WHERE MEMBER_ID =? AND IMG_ID = ?'
  conn.connect()
  conn.query(sqlSelect, [userId, imgId], (err,result)=>{
    if(err){
      console.log('좋아요 체크 유무 쿼리문 에러')
    }
    else{
      let data = result[0].CNT
      // 좋아요 체크 되있으면 true 값 반환
      if(data > 0){        
        res.json(true)
      }
      else{
        res.json(false)
      }
    }
  })
})

module.exports = router;
