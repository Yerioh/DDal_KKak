// 2023-11-28  오전 12:00 박지훈 모듈화 진행
const db = require("../config/database");
let conn = db.init();

// Mypage 유저 정보 가져오기
const mypage = async(id)=>{
    let idQuery ="SELECT MEMBER_PW, MEMBER_EMAIL, MEMBER_PHONE, MEMBER_POST, MEMBER_ADDR1, MEMBER_ADDR2 FROM TB_MEMBER WHERE MEMBER_ID = ?";
    // DB 연결
    conn.connect();
    let result = await conn.promise().query(idQuery, [id])
    result = result[0]
    let userEmail = result[0].MEMBER_EMAIL // DB에 저장된 회원 이메일
    let userPhone = result[0].MEMBER_PHONE // DB에 저장된 회원 전화번호
    let userPw = result[0].MEMBER_PW  // DB에 저장된 비밀번호
    let postNumber = result[0].MEMBER_POST // DB에 저장된 우편번호
    let addr1 = result[0].MEMBER_ADDR1 // 도로명주소
    let addr2 = result[0].MEMBER_ADDR2 // 상세주소
    return {member_email : userEmail,
            member_phone : userPhone,
            user_pw: userPw,
            post_number : postNumber,
            addr_1 : addr1,
            addr_2 : addr2}
}

// 회원 정보 수정
const updateInfo = async({userID, userPw, userEmail, userPhone, postNum, addr1, addr2})=>{
  let updateQuery ="UPDATE TB_MEMBER SET MEMBER_PW = SHA2(?, 256), MEMBER_EMAIL = ?, MEMBER_PHONE = ?, MEMBER_POST = ?, MEMBER_ADDR1 = ?, MEMBER_ADDR2 = ? WHERE MEMBER_ID = ?";

  conn.connect()
  try{
    let result = await conn.promise().query(updateQuery, [userPw, userEmail, userPhone, postNum, addr1, addr2, userID])
    return {updateResult:true}
  }
  catch(err){
    console.error('내 정보 수정 쿼리문 에러', err)
    return {updateResult:false}
  }
}

// 23-11-29 임휘훈 작성
// DATE_FORMAT(GENERATED_AT, '%Y-%m-%d %H:%i:%S') AS DATE
/** 주문내역 불러오기 함수 */
const order = async (userId) => {
  let selectQuery = `SELECT DATE_FORMAT(ORDER_AT, '%Y-%m-%d %H:%i:%S') AS ORDER_AT, ORDER_DE_IMG, PROD_NAME, ORDER_PROD_INFO, ORDER_DE_CNT, ORDER_DETAIL_PRICE
                       FROM TB_ORDER AS A INNER JOIN TB_ORDER_DETAIL AS B
                         ON A.ORDER_ID = B.ORDER_ID
                      WHERE A.MEMBER_ID = ?
                   ORDER BY A.ORDER_AT`
  try{
    conn.connect()
    let result = await conn.promise().query(selectQuery, [userId])
    console.log("select 결과 필요한것만 가져와서 date 포맷팅 필요", result[0]);
    return {goods : result}
  }
  catch(err){
    console.error("주문내역 불러오기 select 쿼리 에러", err);
  }
}


module.exports = {mypage, updateInfo, order}