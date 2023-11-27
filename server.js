// 메인서버
// 2023-10-27 박지훈 작성
const express = require("express");
const app = express();
const {createServer} = require('node:http')
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path");
const session = require('express-session')
// cors 에러 방지 프록시 설정
const { createProxyMiddleware } = require('http-proxy-middleware');
// env 사용
require('dotenv').config()
const {Server} = require('socket.io')
const server = createServer(app)
const io = new Server(server)

axios.default.defaults.baseURL = 'http://localhost:3001'

const createNameSpace = io.of('/image-create')


// Flask 서버 라우터
const imgCreate = require("./routes/imgCreate");
// 소셜로그인 라우터
const socialLogin = require("./routes/socialLogin");
// user 라우터
const user = require('./routes/user')
// page 라우터
const page = require("./routes/page")
// socketRoute
const socketRoute = require('./routes/socketRoute')

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
app.use("/imgCreate", imgCreate);
// socialLogin 라우터
app.use("/socialLogin", socialLogin);
// user 라우터 
app.use('/user', user)
// page 라우터
app.use('/page', page)
// socket 라우터
app.use('/socket', socketRoute)

// 포트번호 설정
app.set("port", process.env.PORT || 3001);

app.get("/", (req, res) => {
  res.render("index");
});

// 23-11-27 오전 11:15 박지훈 작성
// 이미지 생성 대기리스트 실시간 연동(Socket.io)
io.on('connection', (socket)=>{
  // 이미지 생성 클릭 시 사용자 이름 대기열에 추가
  socket.on('createClick', (data)=>{
    let id = data.id
    axios.post('/socket/enQueue', {id : id})
      .then(res=>{
        let data = res.data.result
        // 대기열 모든 사용자에게 전송
        io.emit('createList', {createList : data})
      })
  })

  // 이미지 생성 종료 시 사용자 이름 대기열에서 삭제
  socket.on('deQueue', (data)=>{
    let id = data.id
    axios.post('/socket/deQueue', {id : id})
      .then(res=>{
        let data = res.data.result
        // 대기열 모든 사용자에게 전송
        io.emit('createList', {createList : data})
      })
  })

  io.on('disconnecting', ()=>{
    console.log('이미지 생성 종료')
  })
})


// 라우터 와일드 카드
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "react-project", "build", "index.html"));
});

server.listen(app.get("port"), () => {
  console.log("http://localhost:3001 port waiting...");
});
