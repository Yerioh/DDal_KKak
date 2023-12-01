// 2023-11-28 17:55 임휘훈 모듈화 진행

const db = require("../config/database");
let conn = db.init();

/** 굿즈 페이지의 굿즈 정보 불러오는 함수 */
const goods = async () => {
    let selectQuery = "SELECT * FROM TB_PRODUCT"
    try{
        conn.connect()
        const reuslt = await conn.promise().query(selectQuery)
        return {result : reuslt, isLoading : true}
    }
    catch(err){
        console.error("굿즈 페이지 쿼리문 에러", err);
    }
}

/** 굿즈 디테일 정보 가져오는 함수 */
const goodProduct = async (data) => {
    let selectQuery1 = 'SELECT * FROM TB_PRODUCT WHERE PROD_ID = ?'
    let selectQuery2 = 'SELECT * FROM TB_PRODUCT_COLOR WHERE PROD_ID = ?'
    let selectQuery3 = 'SELECT A.*, B.COLOR_CODE FROM TB_PRODUCT_IMG A INNER JOIN TB_PRODUCT_COLOR B ON(A.COLOR_ID = B.COLOR_ID) WHERE A.PROD_ID = ? ORDER BY PROD_IMG'
    let selectQuery4 = 'SELECT * FROM TB_PRODUCT_SIZE WHERE PROD_ID = ?'
    let prdInfo = '' // 굿즈 정보
    let prdColor = '' // 굿즈 색깔
    let prdImg = '' // 굿즈 이미지
    let prdSize = '' // 굿즈 사이즈

    try{
        conn.connect()
        const select1Result = await conn.promise().query(selectQuery1, [data])
        prdInfo = select1Result[0]
        try{
            const select2Result = await conn.promise().query(selectQuery2, [data])
            prdColor = select2Result[0]
            try{
                const select3Result = await conn.promise().query(selectQuery3, [data])
                prdImg = select3Result[0]
                try{
                    const select4Result = await conn.promise().query(selectQuery4, [data])
                    prdSize = select4Result[0]
                    return {                                      
                        prdInfo:prdInfo,
                        prdColor:prdColor,
                        prdImg:prdImg,
                        prdSize:prdSize
                    }
                }
                catch(err){
                    console.error('굿즈 상세페이지 select4 에러', err);
                }
            }
            catch(err){
                console.error('굿즈 상세페이지 select3 에러', err);
            }
        }
        catch(err){
            console.error('굿즈 상세페이지 select2 에러', err);
        }
    }
    catch(err){
        console.error('굿즈 상세페이지 select1 에러', err);
    }
}
/** 리뷰 데이터 라우터 함수 */
const review = async (data) => {
    let selectSql = `SELECT A.MEMBER_ID,
                              A.PROD_ID,
                       A.REVIEW_CONTENT,
                           A.REVIEW_IMG,
                       A.REVIEW_RATINGS,
                       DATE_FORMAT(A.REVIEWED_AT, '%Y-%m-%d %H:%i') AS DATE,
                    (SELECT MEMBER_NAME FROM TB_MEMBER WHERE MEMBER_ID = A.MEMBER_ID) AS MEMBER_NAME
                       FROM TB_REVIEW A
                      WHERE PROD_ID = ?`
    try{
        conn.connect()
        let result = await conn.promise().query(selectSql, [data])
        return {reviewArray : result}
    }
    catch(err){
        console.error("리뷰 데이터 select 쿼리 에러", err);
    }
}

/* 리뷰 저장 함수 */
const reviewInsert = async({userId, prodId, reviewText, img, rating})=>{
    let sql = `INSERT INTO TB_REVIEW (MEMBER_ID, PROD_ID, REVIEW_CONTENT, REVIEW_IMG, REVIEW_RATINGS, REVIEWED_AT) 
    VALUES (?,?,?,?,?, DATE_ADD(NOW(), INTERVAL 9 HOUR));`
    conn.connect()
    try{
        const result = await conn.promise().query(sql, [userId, prodId, reviewText, img, rating])
        return {resultInsert : true}
    }
    catch(err){
        console.error('리뷰 저장 에러', err)
    }
}

module.exports = {goods, goodProduct, review, reviewInsert}