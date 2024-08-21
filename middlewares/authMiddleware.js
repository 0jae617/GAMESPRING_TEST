// authMiddleware.js
"use strict";

// 세션 인증 함수
function isAuthenticated(req, res, next){
    if(req.session.userId){
        return next();         // 인증된 경우 다음 미들웨어 또는 라우트로 이동
    }else{
        res.redirect('/');     // 인증되지 않은 경우 index.html 로 redirect
    }
}

module.exports = isAuthenticated;