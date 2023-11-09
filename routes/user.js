// user 라우터 
// 2023-11-08 오전 09:45 임휘훈 작성

const express = require('express')
const router = express.Router()
const axios = require('axios')

// // DB 연결
// const db = require("../config/database")
// let conn = db.init()

// 회원가입 라우터
router.post("/join", (req, res)=> {
    let id = req.body.userId // 사용자가 입력한 ID, name 속성
    let email = req.body.useremail // 사용자가 입력한 email
    let pw = req.body.userPw // 사용자가 입력한 PW
    let checkPw = req.body.checkPw // 비밀번호 확인
    let userName = req.body.userName
    let phone = req.body.phone // 사용자 휴대전화
    let postNumber = req.body.postNumber // 우편번호
    let doro = req.body.doro // 도로명 주소
    let detailAddress = req.body.detailAddress // 상세주소
    // 회원가입 쿼리문
    let joinQuery = 'INSERT INTO TB_USER (USER_ID, USER_EMAIL, USER_PW, USER_NAME, USER_PHONE, USER_POSTNUMBER, USER_ADDRESS1, USER_ADDRESS2) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'

    // 비밀번호 확인 조건문
    if(pw == checkPw){
        // DB 연결
        conn.connect()
        conn.query(joinQuery,[id, email, pw, userName, phone, postNumber, doro, detailAddress], (err, result) => {
            if(err){
                console.log("ID 중복");
            }
            else{
                console.log("회원가입 성공");
            }
        })
    }
    else{
        console.log("비밀번호 확인 오류");
    }
})

// 로그인 라우터
router.post('/login', (req, res)=> {
    let id = req.body.userId; // 입력한 아이디
    let pw = req.body.userPw; // 입력한 비밀번호
    // 로그인 쿼리문
    let loginQuery = 'SELECT USER_ID, USER_PW, USER_NAME FROM TB_USER WHERE USER_ID = ?'
    // DB 연결
    conn.connect()
    conn.query(loginQuery, [id], (err, result) => {
        if(err){
            console.log('로그인 쿼리문 에러');
        }
        else{
            // 아무것도 조회 되지 않으면
            if(result.length == 0){
                console.log('아이디가 존재하지 않습니다.');
            }
            else{
                if(result[0].USER_ID == id && result[0].USER_PW == pw){
                    console.log(result[0].USER_ID, "님 로그인 성공");

                    // 로그인 성공 후 사용자 세션 생성
                    let userName = result[0].USER_NAME
                    let seName = req.session.name = userName
                    let seLogin = req.session.login = true
                }
                else{
                    console.log("로그인 실패");
                }
            }
        }
    })
})

module.exports = router;