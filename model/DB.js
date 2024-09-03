// DB.js
"use strict";

const mysql = require('mysql2');

const DB = mysql.createConnection({     // 회원정보 데이터베이스
    host: 'localhost',
    user: 'root',
    password: 'dudwo@03',
    database: 'SPRINGCHAT'
})

DB.connect(err => {
    if(err) throw err;
    console.log('MySQL Server Connected');
})

module.exports = DB;