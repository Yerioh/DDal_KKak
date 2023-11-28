// 2023-11-28  오후 14:30 박지훈 모듈화 진행
const express = require("express");
const router = express.Router();
const axios = require("axios");
const socketModel = require('../models/socketModel')

// DB 연결
const db = require("../config/database");
let conn = db.init();

router.post('/enQueue', async(req,res)=>{
    let userId = req.body.id
    let result = await socketModel.enQueue(userId)
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