// 2023-11-28  오전 10:20 박지훈 모듈화 진행
const db = require("../config/database");
let conn = db.init();

/* 일반 회원가입 */
const userNormalJoin = async (userData)=>{
  let data = userData
  let userId = data.userId; // 사용자가 입력한 ID, name 속성
  let useremail = data.useremail; // 사용자가 입력한 email
  let userPw = data.userPw; // 사용자가 입력한 PW
  let checkPw = data.checkPw; // 비밀번호 확인
  let userName = data.userName; // 사용자 이름
  let phone = data.phone; // 사용자 휴대전화
  let postNumber = data.postNumber; // 우편번호
  let doro = data.doro; // 도로명 주소 add1
  let detailAddress = data.detailAddress; // 상세주소 add2

  // 회원가입 쿼리문
  // SHA2(?, 256) : 비밀번호 256 비트 암호화
  let joinQuery =
    'INSERT INTO TB_MEMBER (MEMBER_ID, MEMBER_PW, MEMBER_NAME, MEMBER_EMAIL, MEMBER_PHONE, MEMBER_POST, MEMBER_ADDR1, MEMBER_ADDR2, MEMBER_LOGIN_TYPE, JOINED_AT) VALUES (?, SHA2(?, 256), ?, ?, ?, ?, ?, ?, "M", DATE_ADD(NOW(), INTERVAL 9 HOUR))';
  try{
      // 비밀번호 확인 조건문
      if (userPw == checkPw) {
        // DB 연결
        conn.connect();
        const result = await conn.promise().query(
          joinQuery,
          [userId, userPw, userName, useremail, phone, postNumber, doro, detailAddress]);
        if(result){
            console.log("회원가입 성공");
            return {joinResult : true}
        }
        else{
            console.log("회원가입 실패");
            return {joinResult : false}
        }
      } else {
        console.log("비밀번호 확인 오류");
        return {joinResult : false}
      }
  }
  catch (err){
    console.error('일반 회원가입 에러',err.message)
    return {joinResult : false}
  }
  finally {
    // DB 연결 해제
    conn.end()
  }
}

/* 일반 회원가입 아이디 중복체크 */
const userIdCheck = async(id)=>{
  let query = "SELECT MEMBER_ID FROM TB_MEMBER WHERE MEMBER_ID = ?";
  conn.connect();
  try{
    const result = await conn.promise().query(query, [id])
    if (result[0].length == 0) {
        // 아이디 조회결과 0개
        console.log("사용할 수 있는 ID");
        return {loginCheck : true}
    } else {
        console.log("이미 존재하는 ID");
        return {loginCheck : false}
    }      
  }
  catch(err){
    console.error('아이디 체크 쿼리문 에러',err)
  }  
}

/* 일반 유저 로그인 DB 함수 */
const userLogin = async(id, hash)=>{
    // 로그인 쿼리문
  let idQuery =
  "SELECT MEMBER_ID, MEMBER_PW, MEMBER_NAME, MEMBER_LOGIN_TYPE FROM TB_MEMBER WHERE MEMBER_ID = ?";
    // DB 연결
    conn.connect();
    try {
        let result = await conn.promise().query(idQuery, [id]);
        result = result[0]       
        // 아무것도 조회 되지 않으면
        if (result[0].length == 0) {
        console.log("아이디가 존재하지 않습니다.");
        return {loginResult : 'IDError'}
        } else {
        if (result[0].MEMBER_ID == id && result[0].MEMBER_PW == hash) {
            console.log(result[0].MEMBER_ID, "님 로그인 성공");
            let userName = result[0].MEMBER_NAME;
            let isLogin = true
            let userId = result[0].MEMBER_ID
            let loginType = result[0].MEMBER_LOGIN_TYPE
            return {loginResult : "success", userName : userName, isLogin : isLogin, userId : userId, loginType : loginType}  

        } else {
            console.log("로그인 실패");
            return {loginResult : 'PwError'}
        }}
    } catch(err){
        console.error('일반회원 로그인 쿼리문 에러', err)
        return {loginResult : "serverError"}
      }
}

/* 소셜, 일반 유저 회원탈퇴 쿼리문 */
const deleteUser =  async(userId)=>{
    let deleteUserSQL = `DELETE FROM TB_MEMBER WHERE MEMBER_ID = ?`
    try{
        conn.connect()
        let result = await conn.promise().query(deleteUserSQL, [userId])
        console.log('회원 탈퇴 성공')
        return {deleteResult : true}
    } catch(err) {
        console.error('회원탈퇴 쿼리문 에러', err)
    }

}



module.exports = {userNormalJoin, userIdCheck, userLogin, deleteUser}