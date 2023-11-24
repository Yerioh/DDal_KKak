// 2023-11-13 오전 11:00 박지훈 작성
const express = require("express");
const router = express.Router();
const axios = require("axios");

// DB 연결
const db = require("../config/database");
let conn = db.init();

router.post('/enQueue', (req,res)=>{
    let userId = req.body.id
    let sql = `INSERT INTO TB_WAIT (MEMBER_ID, WAIT_AT) VALUES (?, DATE_ADD(NOW(), INTERVAL 9 HOUR))`
    let selectSql = `SELECT MEMBER_ID FROM TB_WAIT ORDER BY WAIT_AT`
    conn.connect()
    conn.query(sql, [userId], (err,result)=>{
        if(err){
            console.log('이미지 생성 인큐 에러', err)
        }
        else{
            console.log('이미지 생성 인큐 성공')
            conn.query(selectSql, (err,result)=>{
                if(err){
                    console.log('이미지 생성 대기 리스트 select 에러')
                }
                else{
                    console.log('이미지 대기 리스트 인큐 성공', result)
                    res.json({result})
                    
                }
            })
        }
    })
})



router.post('/deQueue', (req,res)=>{
    let userId = req.body.id
    let sql = `DELETE FROM TB_WAIT WHERE MEMBER_ID = ?`
    let selectSql = `SELECT MEMBER_ID FROM TB_WAIT ORDER BY WAIT_AT`
    conn.connect()
    conn.query(sql, [userId], (err,result)=>{
        if(err){
            console.log('이미지 생성 디큐 에러', err)
        }
        else{
            console.log('이미지 생성 디큐 성공')
            conn.query(selectSql, (err,result)=>{
                if(err){
                    console.log('이미지 생성 대기 리스트 select 에러')
                }
                else{
                    console.log('이미지 대기 리스트 디큐 성공', result)
                    res.json({result})
                    
                }
            })
        }
    })
})



module.exports = router;