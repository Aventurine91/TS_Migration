// server.js
require('dotenv').config(); // .env 파일에서 환경 변수 불러오기
const express = require('express');
const { Pool } = require('pg'); // PostgreSQL 클라이언트
const app = express();
const port = process.env.PORT || 3000; // .env 파일에서 PORT를 가져오고, 없으면 기본값 3000 사용

// PostgreSQL 데이터베이스 연결 설정
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// JSON 데이터 파싱을 위해 미들웨어 사용
app.use(express.json());

// 예시: 기본 라우트
app.get('/', (req, res) => {
  res.send('서버가 실행 중입니다!');
});

// 예시: PostgreSQL에서 데이터 가져오기
app.get('/articles', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "Article"');
    res.json(result.rows);
  } catch (error) {
    console.error('데이터베이스에서 데이터 가져오기 오류:', error);
    res.status(500).json({ message: '데이터 가져오기 오류' });
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});
