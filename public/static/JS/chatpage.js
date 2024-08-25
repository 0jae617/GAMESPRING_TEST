// chatpage.js
"use strict";

// username 변수에 세션 아이디 저장
let username;

window.onload = function(){
    fetch('/getsessionId', {
        method: 'GET',
        credentials: 'include' // 세션 쿠키를 포함하여 요청
    })
    .then(response => response.json())
    .then(data => {
        if(data.userId){    // chatpage.html 에 세션 ID 표시
            document.getElementById('sessionId').innerText = `Your ID: ${data.userId}`;
            username = data.userId;
        }else{
            document.getElementById('sessionId').innerText = 'No session ID found';
        }
    })
    .catch(error => console.error('Error:', error));

    fetch('/getpageIn');
};


// 채팅창에 필요한 요소들 정리
let socket;
const messages = document.getElementById('messages');
const chatbox = document.getElementById('chatbox');
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const userCount = document.getElementById('userCount');
const userList = document.getElementById('userList');



// 메세지 띄우기 함수
function appendMessage(message, isSystemMessage = false, isPrivate){
    const item = document.createElement('li');
    item.textContent = message;
    if(isSystemMessage){
        item.classList.add('system-message'); // system-message 클래스 부여 -> css 통해 초록색으로
    }
    if(isPrivate){
        item.classList.add('private-message'); // system-message 클래스 부여 -> css 통해 초록색으로
    }
    messages.appendChild(item);
    chatbox.scrollTop = chatbox.scrollHeight;
}


// 접속자 리스트 업데이트 함수
function updateUserList(users){
    userCount.textContent = users.length;
    userList.innerHTML = '';   // 기존 리스트를 지움

    users.forEach(user => {
        const item = document.createElement('li');
        item.textContent = user;
        userList.appendChild(item);
        chatbox.scrollTop = chatbox.scrollHeight;
    });
}


// "Chat" 버튼 클릭 시
document.getElementById('chatBtn').onclick = function(){
    chatBtn.classList.add('active');
    usersBtn.classList.remove('active');
    usersbox.style.display = 'none';

    if(!socket){
        socket = io();                    // 새로운 소켓 연결 생성
        socket.emit('join', username);    // 입장 메시지 전송
        chatbox.style.display = 'block';  // 채팅창 보이기
        userbox.style.display = 'block';  // 접속자 보이기
    }

    socket.on('chat message', function({ message, isSystem, isPrivate }){
        appendMessage(message, isSystem, isPrivate);
    });

    socket.on('user update', (data) => {
        const { users } = data;
        updateUserList(users);
    });
};

// Chat 메세지 전송 함수 (send 버튼)
document.getElementById('sendMessage').onclick = function(){
    const message = messageInput.value.trim();

    if(message && socket){
        if(message.startsWith('/귓속말 ')){     // 귓속말 보내기 조건
            const parts = message.split(' ');
            const targetUserId = parts[1];    // userId 저장
            const privateMessage = parts.slice(2).join(' '); // 나머지는 대화 내용
            
            socket.emit('whisper', { targetUserId, username, privateMessage });
            messageInput.value = '';
        }
        // 일반 메세지 전송
        else{
            socket.emit('chat message', { username, message }); // 서버로 메시지 전송
            messageInput.value = '';
        }
    }

};

// Chat 메세지 전송 함수 (enter키)
messageForm.addEventListener('submit', function(event){
    event.preventDefault();
    const message = messageInput.value;
    if(message && socket){
        if(message.startsWith('/귓속말 ')){     // 귓속말 보내기 조건
            const parts = message.split(' ');
            const targetUserId = parts[1];    // userId 저장
            const privateMessage = parts.slice(2).join(' '); // 나머지는 대화 내용
            
            socket.emit('whisper', { targetUserId, username, privateMessage });
            messageInput.value = '';
        }
        // 일반 메세지 전송
        else{
            socket.emit('chat message', { username, message }); // 서버로 메시지 전송
            messageInput.value = '';
        }
    }
});


// Chat 소켓 연결 해제 함수
function leaveChat(){
    if(socket){
        socket.emit('leave', username); // 퇴장 메시지 전송
        socket.disconnect();
        socket = null;                  // 소켓 연결 해제
        chatbox.style.display = 'none';
        userbox.style.display = 'none';
        userCount.textContent = '0';
        userList.innerHTML = '';
    }
}


// "Users" 버튼 클릭 시
document.getElementById('usersBtn').onclick = function(){
    usersBtn.classList.add('active');
    chatBtn.classList.remove('active');
    leaveChat();
    usersbox.style.display = 'block';
    chatbox.style.display = 'none';

    fetch('/users')                                // 데이터베이스에 존재하는 모든 유저 불러오기
    .then(response => response.json())
    .then(users => {
        const usersContainer = document.getElementById('users-container');
        const usersList = document.getElementById('users');
        usersContainer.style.display = 'block';
        usersList.innerHTML = '';

        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.classList.add('user-item');
            listItem.style.display = 'flex';
            listItem.style.alignItems = 'center';
            listItem.style.justifyContent = 'space-between';


            // 사용자 정보 스팬 생성
            const userInfo = document.createElement('span');
            userInfo.textContent = `ID: ${user.id}, 가입날짜: ${new Date(user.created_at).toLocaleDateString()}`;

            // statusSpan 과 dm 버튼 -> Wrapper
            const actionWrapper = document.createElement('div');
            actionWrapper.style.display = 'flex';
            actionWrapper.style.alignItems = 'center';

            // online/offline 상태 표시
            const statusSpan = document.createElement('span');
            statusSpan.textContent = user.isOnline ? 'online' : 'offline';
            statusSpan.style.color = user.isOnline ? 'green' : 'gray';
            statusSpan.style.marginRight = '10px'; // 상태 스팬과 userInfo 사이의 간격

            // dm버튼 생성
            const dmButton = document.createElement('button');
            dmButton.textContent = 'DM';
            dmButton.classList.add('user-action-btn');
            dmButton.setAttribute('data-target-id', user.id);  // 대상 ID 특성으로 부여

            // dm 버튼 클릭 시 함수
            dmButton.onclick = () => {
                const targetId = dmButton.getAttribute('data-target-id');
                window.location.href = `/dmpage/${username}/${targetId}`;
            };

            // actionWrapper에 statusSpan과 dmButton 추가
            actionWrapper.appendChild(statusSpan);
            actionWrapper.appendChild(dmButton);

            // listItem에 userInfo와 actionWrapper 추가
            listItem.appendChild(userInfo);
            listItem.appendChild(actionWrapper);

            // ul 요소에 li 추가
            usersList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error fetching users:', error));
};


// "logout" 버튼 클릭 시
document.getElementById('logoutBtn').onclick = function(){
    leaveChat();
    fetch('/getlogOut', { method: 'GET' })
        .then(response => {
            if(response.ok){
                window.location.href = '/';
            }else{
                console.error('Failed to log out');
            }
        }
    )
    .catch(error => console.error('Error during logout:', error));
}


// 페이지 나갈 시에는 isOnline만 0으로
window.addEventListener('beforeunload', function(event){
    fetch('/getpageOut', { method: 'GET', keepalive: true });
});