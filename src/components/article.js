import React, { useState } from 'react';
import './article.css';

function Article() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="article-container">
      <h2 className="article-title">게시글 쓰기</h2>
      
      <div className="form-group">
        <label>제목</label>
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label>내용</label>
        <textarea
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      
      <div className="form-group image-upload">
        <label>이미지</label>
        <div className="image-preview">
          {image ? <img src={image} alt="Preview" /> : <span>이미지 등록</span>}
        </div>
        <input type="file" onChange={handleImageUpload} />
      </div>
      
      <button className="submit-button">등록</button>
    </div>
  );
}

export default Article;
