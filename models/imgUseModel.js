// 2023-11-28  오전 12:30 임휘훈 모듈화 진행
// 내 저장 이미지 페이지
const db = require("../config/database");
let conn = db.init();

/** 내 저장 이미지 불러오기 함수*/
const myimg = async (userId) => {
    let selectQuery =
    `SELECT IMG_ID, IMG_PROMPT, IMG_NE_PROMPT, IMG_URL, DATE_FORMAT(GENERATED_AT, '%Y-%m-%d %H:%i:%S') AS DATE, IMG_SHARE, IMG_NAME,
    (SELECT COUNT(*)
       FROM TB_LIKE
      WHERE IMG_ID = TB_GEN_IMG.IMG_ID) AS CNT
       FROM TB_GEN_IMG WHERE MEMBER_ID = ? ORDER BY GENERATED_AT DESC`;

    try{
        conn.connect();
        const result = await conn.promise().query(selectQuery, [userId])

        return { imgArray: result }
    }
    catch(err){
        console.error("내 저장 이미지 쿼리문 오류", err);
    }
}

/** 내 저장 이미지 공유 토글 함수*/
const imgShare = async (imgId) => {
    let sql = `UPDATE TB_GEN_IMG
                  SET IMG_SHARE = CASE WHEN IMG_SHARE = 'Y' THEN 'N' WHEN IMG_SHARE = 'N' THEN 'Y' ELSE IMG_SHARE END
                WHERE IMG_ID = ?`
    try{
        conn.connect()
        const result = await conn.promise.query(sql, [imgId])
        return {imgArray : result}
    }
    catch{
        console.error('공유 여부 변경 쿼리문 에러', err);
    }
}

const deleteImg = async (sqlImgUrl, sessionId) => {
    // 삭제 쿼리
    let deleteQuery = `DELETE FROM TB_GEN_IMG WHERE IMG_URL IN (${sqlImgUrl})`;
    // 선택 쿼리
    let selectQuery = `SELECT IMG_ID, IMG_PROMPT, IMG_NE_PROMPT, IMG_URL, DATE_FORMAT(GENERATED_AT, '%Y-%m-%d %H:%i:%S') AS DATE, IMG_SHARE, IMG_NAME,
                        (SELECT COUNT(*)
                        FROM TB_LIKE
                        WHERE IMG_ID = TB_GEN_IMG.IMG_ID) AS CNT
                        FROM TB_GEN_IMG WHERE MEMBER_ID = ? ORDER BY GENERATED_AT DESC`;
    try{
        conn.connect();
        const deleteResult = await conn.promise().query(deleteQuery)
            console.log("이미지 삭제 완료");
            try{
                const result = await conn.promise().query(selectQuery, [sessionId])
                console.log("삭제된 후 프론트로");
                return {imgArray : result}
            }
            catch(err){
                console.error("삭제 후 이미지 최신화 쿼리 오류", err);
            }
    }
    catch(err){
        console.error("내 저장 이미지 삭제 쿼리문 오류", err);
    }
}

module.exports = {myimg, imgShare, deleteImg}