// router.js
"use strict";

// router 세팅
const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();
const isAuthenticated = require('../middlewares/authMiddleware');

// 라우팅 메서드 설정
router.get('/', userController.getIndex);          // index.html 접속
router.post('/', userController.postIndex);        // 로그인 진행

router.get('/signUp', userController.getsignUp);   // 회원가입 페이지 접속
router.post('/signUp', userController.postsignUp); // 회원가입 진행

router.get('/chatpage',isAuthenticated, userController.getchatpage);  // chatpage 접속
router.get('/getsessionId', userController.getsessionId);             // 세션 ID 가져오기

router.get('/users', userController.getallUsers);  // DB 에서 모든 users 정보 가져오기

router.get('/dmpage/:user1/:user2', userController.getdmpage);        // DM 페이지 접속

module.exports = router;