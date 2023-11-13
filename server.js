// 메인서버
// 2023-10-27 박지훈 작성
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path");
const session = require('express-session')
// env 사용
require('dotenv').config()


// Flask 서버 라우터
const flaskData = require("./routes/flaskData");
// 소셜로그인 라우터
const socialLogin = require("./routes/socialLogin");
// user 라우터
const user = require('./routes/user')

// 정적 파일을 가져오기 위한 미들웨어
app.use(express.static(path.join(__dirname, "react-project", "build")));


// Node / Flask 연동
// https://seonzeroticket.notion.site/Node-Flask-45ded686130d4f6d9097e2d05f41832c?pvs=4
const corOptions = {
  origin: "*",
  credential: true,
};


app.use(cors(corOptions));
app.use(bodyParser.json()); // 요청한 본문을 json 형태로 파싱
app.use(bodyParser.urlencoded({ extended: true }));
// session 사용
app.use(session({
  httpOnly:true,
  secret : process.env.SECRET_KEY || 'SECRET_KEY',
  resave:false,
  saveUninitialized : true
}))

// flask 서버 라우터
app.use("/flask", flaskData);
// socialLogin 라우터
app.use("/socialLogin", socialLogin);
// user 라우터
app.use('/user', user)

// 포트번호 설정
app.set("port", process.env.PORT || 3001);

app.get("/", (req, res) => {
  res.render("index");
});

// 라우터 와일드 카드
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "react-project", "build", "index.html"));
});

app.listen(app.get("port"), () => {
  console.log("http://localhost:3001 port waiting...");
});
