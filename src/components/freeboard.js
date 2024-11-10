// src/components/FreeBoard.js
import React, { useState, useEffect } from 'react';
import './freeboard.css';

function FreeBoard() {
  const [bestPosts, setBestPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('recent');

  useEffect(() => {
    // API 호출로 베스트 게시글과 일반 게시글을 가져옴
    fetchBestPosts();
    fetchPosts();
  }, [sortOption]);

  const fetchBestPosts = async () => {
    // 베스트 게시글 가져오기 API 호출
    const response = await fetch('/api/freeboard/best');
    const data = await response.json();
    setBestPosts(data);
  };

  const fetchPosts = async () => {
    // 일반 게시글 가져오기 API 호출
    const response = await fetch(`/api/freeboard?sort=${sortOption}&search=${searchTerm}`);
    const data = await response.json();
    setPosts(data);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    fetchPosts();
  };

  return (
    <div className="freeboard-container">
      {/* 베스트 게시글 섹션 */}
      <section className="best-posts">
        <h2>베스트 게시글</h2>
        <div className="best-posts-grid">
          {bestPosts.map((post) => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.content.slice(0, 50)}...</p>
            </div>
          ))}
        </div>
      </section>

      {/* 일반 게시글 섹션 */}
      <section className="posts-section">
        <div className="posts-header">
          <input
            type="text"
            placeholder="검색할 게시글을 입력하세요"
            value={searchTerm}
            onChange={handleSearch}
          />
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="recent">최신순</option>
            <option value="popular">인기순</option>
          </select>
          <button className="write-button">글쓰기</button>
        </div>
        <div className="posts-list">
          {posts.map((post) => (
            <div key={post.id} className="post-item">
              <h3>{post.title}</h3>
              <p>{post.content.slice(0, 50)}...</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default FreeBoard;
