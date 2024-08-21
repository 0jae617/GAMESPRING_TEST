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
    .then(response => response.json())  // 서버의 응답을 JSON으로 파싱
    .then(result => {
        if(result.success){   // 로그인 성공
            alert(result.message);
            window.location.href = '/chatpage';
        }else{                // 로그인 실패
            alert(result.message);  // 서버에서 전달된 에러 메시지를 출력
        }
    })
    .catch(error => {
        alert('로그인 요청 중 에러가 발생했습니다.');  // 기타 이유로 실패 시
        console.error('Error during login request:', error);
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