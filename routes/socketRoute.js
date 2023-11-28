// 2023-11-28  오후 14:30 박지훈 DB모듈화 완료
const express = require("express");
const router = express.Router();
const axios = require("axios");
const socketModel = require('../models/socketModel')

// DB 연결
const db = require("../config/database");
let conn = db.init();

// 이미지 생성 페이지 접속시 대기열 불러오는 라우터
router.post('/createList', async(req,res)=>{
    let result = await socketModel.createList()
    res.json({result})
})


// 이미지 생성 대기열 등록(인큐) 라우터
router.post('/enQueue', async(req,res)=>{
    let userId = req.body.id
    let result = await socketModel.enQueue(userId)
    if(result.selectResult){
        res.json({result : result.data})
    }    
})

// 이미지 생성 대기열 삭제(디큐) 라우터
router.post('/deQueue', async(req,res)=>{
    let userId = req.body.id
    let result = await socketModel.deQueue(userId)
    if(result.selectResult){
        res.json({result : result.data})
    } 
})



module.exports = router;