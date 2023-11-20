// 각 페이지 라우터
const express = require("express");
const router = express.Router();
const axios = require("axios");

// DB 연결
const db = require("../config/database");
let conn = db.init();


// 굿즈 페이지의 굿즈 정보 불러오는 라우터
router.post("/goods", (req, res) => {
    let selectQuery = "SELECT * FROM TB_PRODUCT"
    conn.connect()
    conn.query(selectQuery, (err, result) => {
        if(err){
            console.log("굿즈 페이지 쿼리문 에러", err);
        }
        else{
            res.json({result : result, isLoading : true})
        }
    })
})





module.exports = router;