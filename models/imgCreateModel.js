// 2023-11-28  오전 11:50 임휘훈 모듈화 진행
// 이미지 생성 후 저장 페이지
const db = require("../config/database");
let conn = db.init();

/** 생성된 이미지 저장 함수*/
const imgSave = async (userId, positive, negative, img_info, imgName) => {

    let insertQuery =
        `INSERT INTO TB_GEN_IMG (MEMBER_ID, IMG_PROMPT, IMG_NE_PROMPT, IMG_URL, GENERATED_AT, IMG_NAME)
        VALUES (?, ?, ?, ?,  DATE_ADD(NOW(), INTERVAL 9 HOUR), ?)`;

    try{
        // DB 연결
        conn.connect();
        const result = await conn.promise().query(
          insertQuery,
          [userId, positive, negative, img_info, imgName]);
        if (result) {
            console.log("이미지 DB 저장 성공");
            return {saveResult : true}
        }
    }
    catch(err){
        console.error("이미지 저장 쿼리 에러", err.message);
        return {saveResult : false}
    }
    finally{
        // DB 연결 해제
        conn.end()
    }
}



module.exports = {imgSave}