// DB.js
"use strict";

const mysql = require('mysql2');

const DB = mysql.createConnection({     // 회원정보 데이터베이스
    host: 'jayspringchat.ch2csciqyk85.ap-northeast-2.rds.amazonaws.com',
    user: 'admin',
    password: 'MySQLpassword',
    database: 'jaySpringChat'
})

DB.connect(err => {
    if(err) throw err;
    console.log('MySQL Server Connected');
})

module.exports = DB;