// index.js
"use strict";

// 로그인 함수
function signIn(){
    const id = document.getElementById('ID').value;
    const password = document.getElementById('password').value;

    if(!id || !password){
        alert('아이디와 비밀번호를 모두 입력해주세요.');
        return;
    }

    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, password })
    })
    .then(response => {         // 로그인 실패 시
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return response.json();
    })
    .then(result => {           // 로그인 성공 시
        alert(result.message);
        window.location.href = '/chatpage';
    })
    .catch(error => {
        alert(error.message);
    });
}

// 'Enter' 키로 로그인
document.getElementById('login-form').addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        signIn();               // Enter 키 -> signIn 함수 호출
    }
});


// 회원가입 함수
function signUp(){
    window.location.href = '/signUp';
}