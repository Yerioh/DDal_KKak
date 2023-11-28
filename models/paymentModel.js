// 2023-11-28  오후 12:00 박지훈 모듈화 진행
const db = require("../config/database");
let conn = db.init();

const orderGoods = async({MEMBER_ID, ORDER_PRICE, DELIVERY_POST, DELIVERY_ADDR1, DELIVERY_ADDR2, RECIPIENT, ORDER_STATUS, BUYITEM_SESSION,ORDER_ID})=>{
    let insertOrderSql = `INSERT INTO TB_ORDER (ORDER_ID, MEMBER_ID, ORDER_PRICE, DELIVERY_POST, DELIVERY_ADDR1, DELIVERY_ADDR2, RECIPIENT, DELIVERY_AT, ORDER_AT)
    VALUES (?,?,?,?,?,?,?,DATE_ADD(NOW(), INTERVAL 5 DAY), DATE_ADD(NOW(), INTERVAL 9 HOUR));`
    let insertOrderDetailSql = `INSERT INTO TB_ORDER_DETAIL (ORDER_ID, PROD_ID, ORDER_DE_CNT, ORDER_PROD_INFO, ORDER_DE_IMG) 
    VALUES (?,?,?,?,?)`
    try{
        let orderResult = await conn.promise().query(insertOrderSql, [ORDER_ID, MEMBER_ID, ORDER_PRICE, DELIVERY_POST, DELIVERY_ADDR1, DELIVERY_ADDR2, RECIPIENT])
        console.log('주문 내역 INSERT 성공')
        for (const item of BUYITEM_SESSION){
            let orderDetailResult = await conn.promise().query(insertOrderDetailSql, [ORDER_ID, item.PROD_ID, item.PROD_COUNT, `${item.PROD_SIZE}/${item.COLOR_NAME}`,item.PROD_URL])
            console.log('주문 상세 내역 INSERT 성공')
        }        
    }
    catch(err){
        console.error('주문내역 INSERT 쿼리문 에러', err)
    }
}

module.exports = {orderGoods}
