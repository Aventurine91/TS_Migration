import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './items.css';
import defaultImage from './icons/img_default.svg'

//React.FC 사용 지양하는 이유
//React.FC를 사용하면 props에 children이 자동으로 포함되어 있어서 명시적으로 children을 사용하지 않아도 된다.
//하지만 이렇게 사용하면 children이 필수적으로 포함되어 있다는 것을 알 수 없다. 개까다롭다 휴휴휴
//https://stackoverflow.com/questions/58123398/when-to-use-jsx-element-vs-reactnode-vs-reactelement 해당 링크에 JSX.Element, ReactNode, and ReactElement 비교정리되어있음

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  favoriteCount?: number;
  createdAt: string;
}


function Items(): JSX.Element {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>(''); // 검색어 상태
    const [sortOption, setSortOption] = useState<'latest' | 'favorite'>('latest'); // 정렬 옵션 상태
    const itemsPerPage = 5;

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(response => response.json())
            .then(data => {
                console.log('API 응답 데이터:', data);
                setProducts(data.products);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching best products:', error);
                setLoading(false);
            });
    }, []);

      // "상품 등록하기" 버튼 클릭 핸들러
  const handleRegisterClick = (): void=> {
    navigate('/registration'); // "/registration" 경로로 이동
  };

    // 검색 및 정렬 로직
    const filteredProducts = products
        .filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOption === 'latest') {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            } else if (sortOption === 'favorite') {
                return (b.favoriteCount || 0) - (a.favoriteCount || 0);
            }
            return 0;
        });

    // 현재 페이지에 해당하는 상품 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handlePageChange = (pageNumber : number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <section className="product-list">
            <div className="product-list-header">
                <h2 className="product-list-title">판매 중인 상품</h2>
                <input
                    type="text"
                    className="search-bar"
                    placeholder="검색할 상품을 입력해주세요"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                 <button className="add-product-button" onClick={handleRegisterClick}>상품 등록하기</button>
                <select
                    className="sort-dropdown"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as 'latest' | 'favorite')}
                >
                    <option value="latest">최신순</option>
                    <option value="favorite">좋아요순</option>
                </select>
            </div>
            <div className="product-list-grid">
                {loading ? (
                    <p>상품을 불러오는 중입니다...</p>
                ) : currentProducts.length > 0 ? (
                    currentProducts.map(product => (
                        <div key={product.id} className="product-list-card">
                            <img src={product.images && product.images[0] ? product.images[0] : defaultImage} alt={product.name} />
                            <div className="product-list-info">
                                <h3>{product.name}</h3>
                                <p>{product.price.toLocaleString()}원</p>
                                <p>♡ {product.favoriteCount || 0}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>표시할 상품이 없습니다.</p>
                )}
            </div>
            <div className="product-list-pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </section>
    );
}

export default Items;
