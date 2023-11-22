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

// 231122 오전 10:00 박지훈 작성
// 굿즈 상세페이지 데이터
router.post('/goodProduct', (req,res)=>{
    let data = req.body.prodId
    let selectQuery1 = 'SELECT * FROM TB_PRODUCT WHERE PROD_ID = ?'
    let selectQuery2 = 'SELECT * FROM TB_PRODUCT_COLOR WHERE PROD_ID = ?'
    let selectQuery3 = 'SELECT A.*, B.COLOR_CODE FROM TB_PRODUCT_IMG A INNER JOIN TB_PRODUCT_COLOR B ON(A.COLOR_ID = B.COLOR_ID) WHERE A.PROD_ID = ?'
    let selectQuery4 = 'SELECT * FROM TB_PRODUCT_SIZE WHERE PROD_ID = ?'
    let prdInfo = ''
    let prdColor = ''
    let prdImg = ''
    let prdSize = ''
    conn.connect()
    conn.query(selectQuery1, [data], (err,result)=>{
        if(err){
            console.log('굿즈 상세페이지 select 에러', err)
        }
        else{
            prdInfo = result
            conn.query(selectQuery2, [data], (err,result)=>{
                if(err){
                    console.log('굿즈 상세페이지 select 에러', err)
                }
                else{
                    prdColor = result
                    conn.query(selectQuery3, [data], (err,result)=>{
                        if(err){
                            console.log('굿즈 상세페이지 select 에러', err)
                        }
                        else{
                            prdImg = result
                            conn.query(selectQuery4, [data], (err,result)=>{
                                if(err){
                                    console.log('굿즈 상세페이지 select 에러', err)
                                }
                                else{
                                    prdSize = result
                                    res.json({
                                        prdInfo:prdInfo,
                                        prdColor:prdColor,
                                        prdImg:prdImg,
                                        prdSize:prdSize
                                    })
                                    
                                }
                            })
                            
                        }
                    })
                }
            })
        }
    })
})




module.exports = router;