// app.js
"use strict";

const PORT = process.env.PORT || 3000; // 포트 번호 설정

// 모듈 설정
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MySQLStore = require('express-mysql-session')(session);
const path = require("path");
const http = require('http');
const socketIO = require('socket.io');
const mysql = require('mysql2');
const fs = require('fs');
const cors = require('cors');


// APP 세팅
const app = express();
const server = http.createServer(app);
const io = socketIO(server);



// 세션 DB 설정
const connection = mysql.createConnection({
  host: 'jayspringchat.ch2csciqyk85.ap-northeast-2.rds.amazonaws.com',
  user: 'admin',
  password: 'MySQLpassword',
  database: 'session_db',
});
connection.connect(err => {
  if(err) throw err;
  console.log('Connected to the Session Database Server');
});

const sessionStore = new MySQLStore({
  expiration: 86400000,      // 세션 만료 시간 (밀리초 단위) = 1 day
  createDatabaseTable: true, // 세션 테이블을 자동으로 생성
  schema: {
      tableName: 'sessions',
      columnNames: {
          session_id: 'session_id',
          expires: 'expires',
          data: 'data'
      }
  }
}, connection);

// 세션 미들웨어 설정
app.use(cookieParser());
app.use(session({
  key: 'session_cookie_name',
    secret: 'sessionissecret!',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false, maxAge: 3600000, path: '/', sameSite: 'Lax'},
}));


// 미들웨어 등록
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// 라우터 (미들웨어) 설정
const userRouter = require('./routes/router');
app.use('/', userRouter);



// socket.io 사용
const connectedUsers = [];    // 소켓 (Chat) 접속중인 유저들
let onlineUsers = [];         // Users 접속중인 온라인 유저들
const socketToUserMap = {};

function getSocketIdByUserId(username){  // 귓속말 대상 ID -> 소켓아이디 매핑 함수
  return socketToUserMap[username];
}

io.on('connection', (socket) => {
  
  // Chat 입장 이벤트 처리
  socket.on('join', (username) => {
    connectedUsers[socket.id] = username;
    socketToUserMap[username] = socket.id;
    io.emit('user update', { users: Object.values(connectedUsers) });

    const message = `${username}님이 입장`;
    io.emit('chat message', { message, isSystem: true }); // 모든 클라이언트에 입장 메시지 전송
  });

  // Chat 퇴장 이벤트 처리
  socket.on('leave', (username) => {
    if(username){
      delete connectedUsers[socket.id];
      delete socketToUserMap[username];
      io.emit('user update', { users: Object.values(connectedUsers) });

      const message = `${username}님이 퇴장`;
      io.emit('chat message', { message, isSystem: true }); // 모든 클라이언트에 퇴장 메시지 전송
      socket.disconnect();
    }
  });

  // Chat 메세지 수신
  socket.on('chat message', (data) => {
    const { username, message } = data;
    if (username && message){
        const formattedMessage = `${username}: ${message}`; // ID: message 형식으로 전송
        io.emit('chat message', { message: formattedMessage, isSystem: false, isPrivate: false });
    }
  });

  // 귓속말 메세지 수신
  socket.on('whisper', ({ targetUserId, username, privateMessage }) => {
    const targetSocketId = getSocketIdByUserId(targetUserId); // 소켓아이디 매핑 함수 실행
    const me = getSocketIdByUserId(username);

    if(targetSocketId){
        io.to(targetSocketId).emit('chat message', { 
            message: `(귓속말) ${username}: ${privateMessage}`,
            isSystem: false,
            isPrivate: true,
        });
        io.to(me).emit('chat message', { 
          message: `(귓속말) ${username}: ${privateMessage}`,
          isSystem: false,
          isPrivate: true,
      });
    }else{
        socket.emit('chat message', {
            message: `해당 사용자는 현재 오프라인입니다.`,
            isSystem: true,
            isPrivate: false
        });
    }
});


  // Users 입장 이벤트
  socket.on('online', (userInfo) => {
    const socketId = userInfo.socketId;
    const userId = userInfo.username;

    onlineUsers[socketId] = userId;
    
    io.emit('user update', { socketId, userId });
  });


  // Users 퇴장 이벤트
  socket.on('disconnect', () => {
    delete onlineUsers[socket.id];

    io.emit('user update', { socketid: socket.id, userId: onlineUsers[socket.id] });;
  });


  // DM room 입장 이벤트
  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  // DM 메세지 전송 이벤트
  socket.on('dmMessage', ({ room, message, sender }) => {
    io.to(room).emit('dmMessage', { message, sender });
  });


  // 소켓 연결 해제
  socket.on('disconnect', () => {
    const userId = onlineUsers[socket.id];
    delete onlineUsers[socket.id];
    io.emit('user update', { socketId: socket.id, userId });
  });
});


// 서버 실행
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;