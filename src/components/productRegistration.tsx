import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './productRegistration.css';

const ProductRegistration = (): JSX.Element => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) : Promise<void> => {
    e.preventDefault();

    // 상품 데이터 객체 생성
    const productData = {
      name,
      description,
      price: Number(price), // 숫자로 변환
      tags: tags.split(',').map(tag => tag.trim()) // 태그를 배열로 변환
    };

    try {
      // POST 요청 보내기
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      });

      const data = await response.json();
      
      // 상품 등록 성공 시 해당 상품 상세 페이지로 이동
      if (response.ok) {
        const productId = data.product._id; // 등록된 상품의 ID
        navigate(`/products/${productId}`);
      } else {
        console.error('상품 등록 실패:', data.message);
      }
    } catch (error) {
      console.error('Error during product registration:', error);
    }
  };

  return (
    <form className="product-registration-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">상품명</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">상품 설명</label>
        <textarea
          id="description"
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">가격</label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="tags">태그</label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTags(e.target.value)}
        />
      </div>
      <button type="submit">등록하기</button>
    </form>
  );
};

export default ProductRegistration;

