// DB 연결
const db = require("../config/database");
let conn = db.init();

const enQueue = async()=>{
    let sql = `INSERT INTO TB_WAIT (MEMBER_ID, WAIT_AT) VALUES (?, DATE_ADD(NOW(), INTERVAL 9 HOUR))`
    let selectSql = `SELECT MEMBER_ID FROM TB_WAIT ORDER BY WAIT_AT`
    conn.connect()
    try{
        let result = await conn.promise().query(sql, [userId])
        console.log('이미지 생성 인큐 성공')
        conn.query(selectSql, (err,result)=>{
            if(err){
                console.log('이미지 생성 대기 리스트 select 에러')
            }
            else{
                console.log('이미지 대기 리스트 인큐 성공', result)
                res.json({result})
                
            }
        })
    }
    catch(err){
        console.error('이미지 생성 인큐 에러', err)
    }
  

            
        
}



module.exports = {enQueue}