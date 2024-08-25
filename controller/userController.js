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
    DB.query('SELECT isOnline FROM Users WHERE id = ?', [id], (err, result) => {
        if(err){
            console.error('Failed to check online status:', err);
            return res.status(500).json({ error: 'Server error' });
        }
        if(result.length > 0 && result[0].isOnline === 1){        // 이미 로그인 중인 경우
            return res.status(400).json({ message: '해당 유저는 이미 로그인중입니다', success: false });
        }else{                                                    // 로그인 실행
            DB.query('SELECT * FROM Users WHERE id = ? AND password = ?', [id, password], (error, result, fields) => {
                if(error){
                    console.error('Failed to log in:', error);
                    return res.status(500).json({ error: 'Server error' });
                }
                if(result.length > 0){                            // 로그인 성공 시
                    req.session.userId = id;
                    // isOnline 1로 설정
                    DB.query('UPDATE Users SET isOnline = 1 WHERE id = ?', [id], (updateErr) => {
                        if(updateErr){
                            console.error('Failed to update online status:', updateErr);
                            return res.status(500).json({ error: 'Server error' });
                        }
                        res.status(200).json({ message: `Welcome ${id}`, success: true });
                    });
                    // isOnline 1인 유저들 콘솔에 표시
                    DB.query('SELECT id FROM Users WHERE isOnline = 1', (error, results) => {
                        if(error){
                            console.error('Failed to get online users:', error);
                            return res.status(500).json({ error: 'Failed to retrieve online users' });
                        }
                        // 결과 콘솔에 출력
                        console.log('Online Users:', results);
                    });
                }else{  // 아이디 OR 비밀번호 잘못됨
                    res.status(401).json({ message: 'Invalid ID or password', success: false });
                }
            });
        }
    });
}


// 로그아웃 실행
exports.getlogOut = (req, res) => {
    const id = req.session.userId;

    req.session.destroy((err) => {
        if(err){
            console.error('Failed to destroy session during logout', err);
            return res.status(500).json({ error: 'Failed to log out' });
        }
        DB.query('UPDATE Users SET isOnline = 0 WHERE id = ?', [id]);

        // 세션이 성공적으로 파기되면 로그인 페이지로 리다이렉트
        res.redirect('/');
    });
}


// 페이지 나갈 시 isOnline만 0으로
exports.getpageOut = (req, res) => {
    const id = req.session.userId;
    DB.query('UPDATE Users SET isOnline = 0 WHERE id = ?', [id]);

}

exports.getpageIn = (req, res) => {  // 페이지 들어오면 다시 isOnline 1로
    const id = req.session.userId;
    DB.query('UPDATE Users SET isOnline = 1 WHERE id = ?', [id]);
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
    if(!req.session || !req.session.userId){
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
    DB.query("SELECT id, created_at, isOnline FROM Users", (err, results) => {
        if(err){
            console.error('Failed to retrieve users:', err);
            return res.status(500).json({ error: 'Failed to retrieve users' });
        }
        const filteredResults = results.filter(user => user.id !== req.session.userId); // 자신 제외
        res.json(filteredResults);
    });
};


// DM 창 불러오기
exports.getdmpage = (req, res) => {
    if(!req.session.userId){
        return res.redirect('/');   // 세션이 없으면 index로 리다이렉트
    }

    res.sendFile(path.join(__dirname, '../public/views/dmpage.html'));
}