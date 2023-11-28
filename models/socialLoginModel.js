// DB 연결
const db = require("../config/database");
let conn = db.init();

/* 소셜 로그인 함수 */
const socialLogin = async(userData, loginType)=>{
    conn.connect()
    try{
        // 로그인 타입이 Kakao 라면
        if(loginType === 'K'){
            let selectSQL = `SELECT COUNT(MEMBER_ID) AS CNT FROM TB_MEMBER WHERE MEMBER_ID = ? AND MEMBER_PW = SHA('?')`
            let joinSQL = `INSERT INTO TB_MEMBER (MEMBER_ID, MEMBER_PW, MEMBER_LOGIN_TYPE, JOINED_AT, MEMBER_NAME) VALUES ('?' ,SHA('?'),?, DATE_ADD(NOW(), INTERVAL 9 HOUR) ,?);`
            // 카카오 계정으로 회원가입 여부 쿼리문
            const selectResult = await conn.promise().query(selectSQL, [userData.id, userData.id])
            // 회원가입이 되어있지 않다면
            if(selectResult[0][0].CNT == 0){
            const joinResult = await conn.promise().query(joinSQL, [userData.id, userData.id, loginType, userData.properties.nickname])
                if(err){
                console.log(`${loginType} 회원가입 쿼리문 에러 발생`,err)
                }
                else{
                console.log(`${loginType} 회원가입 성공`)
                return {socialResult : true}
                }
            }
            else{
            console.log('이미 가입되어있는 계정 : 바로 로그인')
                return {socialResult : true}
            }
        }
        // 로그인 타입이 Google 이라면
        else if(loginType === 'G'){
            let selectSQL = `SELECT COUNT(MEMBER_ID) AS CNT FROM TB_MEMBER WHERE MEMBER_ID = ? AND MEMBER_PW = SHA(?)`
            let joinSQL = `INSERT INTO TB_MEMBER (MEMBER_ID, MEMBER_PW, MEMBER_EMAIL, MEMBER_LOGIN_TYPE, JOINED_AT, MEMBER_NAME) VALUES (?, SHA(?), ?,?, DATE_ADD(NOW(), INTERVAL 9 HOUR), ?);`
            // 구글 계정으로 회원가입 여부 쿼리문
            const selectResult = await conn.promise().query(selectSQL, [userData.id, userData.id])
            // 회원가입이 되어있지 않다면
            if(selectResult[0][0].CNT == 0){
            const joinResult = await conn.promise().query(joinSQL, [userData.id, userData.id, userData.email, loginType, userData.name])
                if(err){
                console.log(`${loginType} 회원가입 쿼리문 에러 발생`,err)
                }
                else{
                console.log(`${loginType} 회원가입 성공`)
                return {socialResult : true}
                }
            }
            else{
            console.log('이미 가입되어있는 계정 : 바로 로그인')
                return {socialResult : true}
            }
        }
        // 로그인 타입이 Naver 라면
        else if(loginType === 'N'){
            let selectSQL = `SELECT COUNT(MEMBER_ID) AS CNT FROM TB_MEMBER WHERE MEMBER_ID = ? AND MEMBER_PW = SHA(?)`
            let joinSQL = `INSERT INTO TB_MEMBER (MEMBER_ID, MEMBER_PW, MEMBER_EMAIL, MEMBER_PHONE, MEMBER_LOGIN_TYPE, JOINED_AT, MEMBER_NAME) VALUES (?, SHA(?),?,?,?,DATE_ADD(NOW(), INTERVAL 9 HOUR),?);`
            // 네이버 계정으로 회원가입 여부 쿼리문
            const selectResult = await conn.promise().query(selectSQL, [userData.id, userData.id])
            // 회원가입이 되어있지 않다면
            if(selectResult[0][0].CNT == 0){
            const joinResult = await conn.promise().query(joinSQL, [userData.id, userData.id, userData.email, userData.mobile.replace(/-/g,''), 'N', userData.name])
                if(err){
                console.log(`${loginType} 회원가입 쿼리문 에러 발생`,err)
                }
                else{
                console.log(`${loginType} 회원가입 성공`)
                return {socialResult : true}
                }
            }
            else{
            console.log('이미 가입되어있는 계정 : 바로 로그인')
                return {socialResult : true}
            }
        }
    }
    catch(error){
        console.error(`${loginType} SELECT 에러 발생',`, error)
        return {socialResult : false}
    }
}




module.exports = {socialLogin}