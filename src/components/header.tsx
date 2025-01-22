import React from 'react';
import './header.css';  
import pandaFace from './img/panda_face.png';
import { Link, useLocation } from 'react-router-dom';



function Header() {
  const location = useLocation();
  const isItemsPage = location.pathname === '/items'; // '판매중인상품' 경로가 '/items'라 가정

  return (
    <header className="header">
      <div className="left">
        <div className="logo">
          <Link to="/" className="logo">
            <img src={pandaFace} alt="판다마켓로고" />
            <h1 className="panda_text">판다마켓</h1>
          </Link>
        </div>
        <nav className="nav">
          {/* 조건부 렌더링: isItemsPage가 true일 때만 렌더링 */}
          {isItemsPage && (
            <>
              <Link to="/freeboard">자유게시판</Link>
              <Link to="/market">중고마켓</Link>
            </>
          )}
        </nav>
      </div>
      <div className="login-button">
        <button>로그인</button>
      </div>
    </header>
  );
}

export default Header;