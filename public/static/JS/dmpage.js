// dmpage.js
"use strict";
console.log("dmpage.js operating successfully!");

const socket = io();

// 현재 URL에서 유저 정보를 추출
const [user1, user2] = window.location.pathname.split('/').slice(2);
const room = [user1, user2].sort().join(':');

document.getElementById('sessionId').innerText = `Your ID: ${user1}`;  // 화면에 자신 ID 표시

// 방에 참여
socket.emit('joinRoom', room);

// 메세지 전송 (send 버튼 & enter 키)
document.getElementById('sendBtn').addEventListener('click', sendMessage);
document.getElementById('messageForm').addEventListener('submit', function(event){
    event.preventDefault(); // 페이지 새로고침 방지
    sendMessage();
});

function sendMessage(){
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if(message){
        socket.emit('dmMessage', { room, message, sender: user1 });
        messageInput.value = ''; // 메시지 입력창 비우기
    }
}


// 메세지 수신
socket.on('dmMessage', ({ message, sender }) => {
    const messageContainer = document.getElementById('messages');
    const messageElement = document.createElement('li');
    messageElement.classList.add('message');
    
    if(sender === user1){    // 자기가 보낸 메세지 띄우기
        messageElement.classList.add('my-message');
        messageElement.textContent = `나: ${message}`;
    }else{                   // 상대가 보낸 메세지 띄우기
        messageElement.classList.add('other-message');
        messageElement.textContent = `${sender}: ${message}`;
    }

    messageContainer.appendChild(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
});


function leaveChat(){
    if(socket){
        socket.disconnect();
        socket = null;                  // 소켓 연결 해제
    }
}


// "logout" 버튼 클릭 시
document.getElementById('logoutBtn').onclick = function(){
    window.location.href = '/';             // 초기 화면으로 이동
}

// "chat" 버튼 클릭 시
document.getElementById('chatBtn').onclick = function(){
    window.location.href = '/chatpage';      // chatpage 로 이동
}
