// signUp.js
"use strict";

console.log("signUp.js Operating Successfully");

document.getElementById('signUp').addEventListener('click', async function(event){
    event.preventDefault();

    // 회원가입 정보 임시 저장
    const id = document.getElementById('ID').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try{
        const res = await fetch('/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, password, username, email })
        });
        if(!res.ok){
            const errorData = await res.json();
            throw new Error(errorData.error || 'Unknown error');
        }
        const result = await res.text();
        alert(result);
        window.location.href = '/';
    }catch(error){
        console.error('Error:', error);
        alert(`회원가입 중 오류가 발생했습니다: ${error.message}`);
    }
});