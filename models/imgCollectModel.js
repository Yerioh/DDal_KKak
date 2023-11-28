// 2023-11-28  오전 14:46 임휘훈 모듈화 진행
// 이미지 모음 페이지

const db = require("../config/database");
let conn = db.init();

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

module.exports = {shareImgShow}