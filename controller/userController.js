// userController.js
"use strict";

const path = require('path');
const bodyParser = require('body-parser');
const DB = require('../model/DB');
const session = require('express-session');


// index.html 접속
exports.getIndex = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/index.html'));
}


// 로그인 실행
exports.postIndex = (req, res) => {
    const { id, password } = req.body;

    DB.query('SELECT * FROM Users WHERE id = ? AND password = ?', [id, password], (error, result, fields) => {
        if(error){
            console.error(err);
            return res.status(500).json({ error: 'Server error' });
        }
        if(result.length > 0){
            req.session.userId = id;
            res.status(200).json({ message: `Welcome ${id}`, success: true });

            console.log(id, password);         // 로그인 성공 시 콘솔창에 아이디 비밀번호 입력 확인
        }else{
            res.status(401).json({ message: 'Invalid ID or password', success: false });
        }
    });
}


// 회원가입 페이지 접속
exports.getsignUp = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/signUp.html'))
}


// 회원가입 실행
exports.postsignUp = (req, res) => {
    const {id, password, username, email} = req.body;

    // 필수 입력란 검사
    if(!username || !id || !password || !email){
        return res.status(400).json({error: 'All fields are required'});
    }

    // 비밀번호 길이 검사
    if(password.length < 6){
        return res.status(400).json({error: 'Password needs to be at least 6 characteristics!'});
    }

    DB.query('INSERT INTO Users (id, password, username, email) VALUES (?, ?, ?, ?)', [id, password, username, email], (err, result, fields) => {
        if(err){
            console.error(err);
            return res.status(500).json({error: 'Server error'});
        }
        res.status(200).send('User registered successfully');
    });
}


// 채팅 페이지 접속
exports.getchatpage = (req, res) => {
    if(!req.session.userId){
        return res.redirect('/');   // 세션 없으면 index로 redirect
    }
    res.sendFile(path.join(__dirname, '../public/views/chatpage.html'));
};


// 세션 정보 가져오기
exports.getsessionId = (req, res) => {
    if(req.session.userId){
        res.json({ userId: req.session.userId });
    }else{
        res.status(401).json({ error: 'Unauthorized' });
    }
}


// Users 정보 가져오기
exports.getallUsers = (req, res) => {
    DB.query("SELECT id, created_at FROM Users", (err, results) => {
        if(err){
            console.error('Failed to retrieve users:', err);
            return res.status(500).json({ error: 'Failed to retrieve users' });
        }
        const filteredResults = results.filter(user => user.id !== req.session.userId); // 현재 로그인된 유저 제외
        res.json(filteredResults);
    });
};


// DM 창 불러오기
exports.getdmpage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/dmpage.html'));
}