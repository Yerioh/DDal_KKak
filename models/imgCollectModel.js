// 2023-11-28 14:46 임휘훈 모듈화 진행
// 이미지 모음 페이지

const db = require("../config/database");
let conn = db.init();

/** 메인 페이지 상위 10개 데이터 가져오기 */
const mainImgShow = async () => {
    let sql = `SELECT A.IMG_ID, A.MEMBER_ID, A.IMG_PROMPT, A.IMG_NE_PROMPT, A.IMG_URL, B.MEMBER_NAME ,
              (SELECT COUNT(*) CNT
                 FROM TB_LIKE 
                WHERE IMG_ID= A.IMG_ID) AS CNT 
                 FROM TB_GEN_IMG A INNER JOIN TB_MEMBER B ON(A.MEMBER_ID = B.MEMBER_ID)
                WHERE IMG_SHARE = "Y"
             ORDER BY CNT DESC LIMIT 10`
    try{
        conn.connect()
        const result = await conn.promise().query(sql)
        return {imgArray : result}
    }
    catch(err){
        console.error('이미지 불러오기 쿼리문 에러', err);
    }
}

/** 공유하는 이미지 모음 함수 */
const shareImgShow = async (data) => {
    let sort = ''
    if(data === 'Best'){
      sort = 'CNT DESC'
    }
    else if(data === 'New'){
      sort = 'DATE DESC'
    }
    else if(data === 'Old'){
      sort = 'DATE ASC'
    }
    let sql = `SELECT A.IMG_ID, A.MEMBER_ID, A.IMG_PROMPT, A.IMG_NE_PROMPT, A.IMG_URL, A.IMG_NAME, DATE_FORMAT(A.GENERATED_AT, '%Y-%m-%d %H:%i:%S') AS DATE,
     B.MEMBER_NAME, 
    (SELECT COUNT(*) CNT 
       FROM TB_LIKE
      WHERE IMG_ID= A.IMG_ID) AS CNT
     FROM TB_GEN_IMG A INNER JOIN TB_MEMBER B ON(A.MEMBER_ID = B.MEMBER_ID) WHERE IMG_SHARE = "Y" ORDER BY ${sort}`
    try{
        conn.connect()
        const result = await conn.promise().query(sql)
        return {imgArray : result}
     }
    catch(err){
        console.error('이미지 불러오기 쿼리문 에러', err)
     }
}

/** 이미지 좋아요 클릭, 클릭 해제 함수 */
const likeClick = async (userId, imgId) => {
    let sqlSelect = 'SELECT COUNT(*) AS CNT FROM TB_LIKE WHERE MEMBER_ID =? AND IMG_ID = ?'
    let sqlInsert = 'INSERT INTO TB_LIKE (MEMBER_ID, IMG_ID) VALUES(?,?)'
    let sqlDelete = 'DELETE FROM TB_LIKE WHERE MEMBER_ID = ? AND IMG_ID = ?'

    try{

        const result = await conn.promise().query(sqlSelect, [userId, imgId])
        let data = result[0][0].CNT
        if(data === 0){ // 좋아요 등록
            try{
                const insertResult = await conn.promise().query(sqlInsert, [userId, imgId])
                return {likeCheck:true}
            }
            catch(err){
                console.error('좋아요 DB 데이터 INSERT 에러', err);
            }
        }
        else if(data === 1){ // 좋아요 해제
            try{
                const deleteResult = await conn.promise().query(sqlDelete, [userId, imgId])
                return {likeCheck:true}
            }
            catch(err){
                console.error("좋아요 DB 데이터 DELETE 에러", err);
            }
        }

    }
    catch(err){
        console.error('이미지 좋아요 클릭 select 쿼리 에러', err);
    }
}

/** 좋아요 클릭 여부 확인 라우터 */
const likeCheck = async (userId, imgId) => {
    let sqlSelect = `SELECT COUNT(*) AS CNT 
                       FROM TB_LIKE
                      WHERE MEMBER_ID =? AND IMG_ID = ?`
    try{
        conn.connect()
        const result = await conn.promise().query(sqlSelect, [userId, imgId])
        let data = result[0][0].CNT
        if(data === 0){ // 좋아요 체크 안되어있으면
            return {likeCheck : false}
        }
        else if (data === 1){ // 좋아요 체크 되어있으면
            return {likeCheck : true}
        }
    }
    catch(err){
        console.error('좋아요 체크 유무 쿼리문 에러', err);
    }
    
}

module.exports = {mainImgShow, shareImgShow, likeClick, likeCheck}