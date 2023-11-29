// 2023-11-28  오후 18:00 박지훈 DB모듈화 완료
const express = require("express");
const router = express.Router();
const paymentModel = require('../models/paymentModel')

// 굿즈 결제 라우터
router.post('/orderGoods', async(req,res)=>{
    let data = req.body.buyData
    paymentModel.orderGoods(data)
})


module.exports = router;