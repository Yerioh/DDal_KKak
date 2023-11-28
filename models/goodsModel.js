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

const goodProduct = async (data) => {
    let selectQuery1 = 'SELECT * FROM TB_PRODUCT WHERE PROD_ID = ?'
    let selectQuery2 = 'SELECT * FROM TB_PRODUCT_COLOR WHERE PROD_ID = ?'
    let selectQuery3 = 'SELECT A.*, B.COLOR_CODE FROM TB_PRODUCT_IMG A INNER JOIN TB_PRODUCT_COLOR B ON(A.COLOR_ID = B.COLOR_ID) WHERE A.PROD_ID = ? ORDER BY PROD_IMG'
    let selectQuery4 = 'SELECT * FROM TB_PRODUCT_SIZE WHERE PROD_ID = ?'
    let prdInfo = ''
    let prdColor = ''
    let prdImg = ''
    let prdSize = ''

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


module.exports = {goods, goodProduct}