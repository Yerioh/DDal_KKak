const mysql = require('mysql2')

let conn = {
host : 'project-db-stu3.smhrd.com',
port : "3307",
user : 'Insa4_JSA_final_2',
password : 'aishcool2',
database : "Insa4_JSA_final_2"
}

module.exports = {
    init : () => {
        return mysql.createConnection(conn)
    }
}