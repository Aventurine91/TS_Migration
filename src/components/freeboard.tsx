// src/components/FreeBoard.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';
import './freeboard.css';

interface Post {
  id: number;
  title: string;
  content: string;
}

const FreeBoard: React.FC = () => {
  const [bestPosts, setBestPosts] = useState<Post[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOption, setSortOption] = useState<'recent' | 'popular'>('recent');

  useEffect(() => {
    // API 호출로 베스트 게시글과 일반 게시글을 가져옴
    fetchBestPosts();
    fetchPosts();
  }, [sortOption]);

  const fetchBestPosts = async (): Promise<void> => {
    // 베스트 게시글 가져오기 API 호출
    try {
      const response = await fetch('http://localhost:8000/api/freeboard/best');
      const data: Post[] = await response.json();
      setBestPosts(data);
    } catch (error) {
      console.error('Failed to fetch best posts:', error);
    }
  };

  const fetchPosts = async (): Promise<void> => {
    // 일반 게시글 가져오기 API 호출
    try {
      const response = await fetch(
        `http://localhost:8000/api/freeboard?sort=${sortOption}&search=${searchTerm}`
      );
      const data: Post[] = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
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
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as 'recent' | 'popular')}
          >
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
};

export default FreeBoard;

