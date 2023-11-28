const express = require("express");
const router = express.Router();
const paymentModel = require('../models/paymentModel')

// 굿즈 결제 라우터
router.post('/orderGoods', async(req,res)=>{
    let data = req.body.buyData
    paymentModel.orderGoods(data)
    
})


module.exports = router;