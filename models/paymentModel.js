// 2023-11-28  오후 12:00 박지훈 모듈화 진행
const db = require("../config/database");
let conn = db.init();

const orderGoods = async({MEMBER_ID, ORDER_PRICE, DELIVERY_POST, DELIVERY_ADDR1, DELIVERY_ADDR2, RECIPIENT, ORDER_STATUS, BUYITEM_SESSION, ORDER_ID})=>{
    let insertOrderSql = `INSERT INTO TB_ORDER (ORDER_ID, MEMBER_ID, ORDER_PRICE, DELIVERY_POST, DELIVERY_ADDR1, DELIVERY_ADDR2, RECIPIENT, DELIVERY_AT, ORDER_AT)
    VALUES (?, ?, ?, ?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL 5 DAY), DATE_ADD(NOW(), INTERVAL 9 HOUR));`
    let insertOrderDetailSql = `INSERT INTO TB_ORDER_DETAIL (ORDER_ID, PROD_ID, ORDER_DE_CNT, ORDER_PROD_INFO, ORDER_DE_IMG, PROD_NAME, ORDER_DETAIL_PRICE) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`
    try{
        let orderResult = await conn.promise().query(insertOrderSql, [ORDER_ID, MEMBER_ID, ORDER_PRICE, DELIVERY_POST, DELIVERY_ADDR1, DELIVERY_ADDR2, RECIPIENT])
        for (const item of BUYITEM_SESSION){
            let orderDetailResult = await conn.promise().query(insertOrderDetailSql, [ORDER_ID, item.PROD_ID, item.PROD_COUNT, `${item.PROD_SIZE}/${item.COLOR_NAME}`,item.PROD_URL, item.PROD_NAME, item.PRICE_SUM])
        }        
    }
    catch(err){
        console.error('주문내역 INSERT 쿼리문 에러', err)
    }
}

module.exports = {orderGoods}
