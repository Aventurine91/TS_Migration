import React from 'react';


interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image?: string;
  isFavorited?: boolean;
}

interface ProductDetailContentProps {
  product: Product | null;
  onDelete: () => void;
}

const ProductDetailContent = ({ product, onDelete }: ProductDetailContentProps): JSX.Element => {
  const handleFavorite = async (): Promise<void> => {

    if (!product) {
      return;
    }

    try {
      const res = await fetch(`https://panda-market-api.vercel.app/products/${product?.id}/favorite`, {
        method: product?.isFavorited ? 'DELETE' : 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (!res.ok) {
        throw new Error('좋아요 상태 변경 실패');
      }
      alert('좋아요 상태가 변경되었습니다.');
      // 상태 업데이트 필요
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert('좋아요 상태를 변경하는 중 오류가 발생했습니다.');
    }
  };

  if (!product) {
    return <div>상품 데이터를 불러오는 중입니다...</div>;
  }

  return (
    <div className="productContent">
    <img
      src={product.image ? product.image : '/default.png'}
      alt={product.title}
      className="productImage"
    />
    <h1>{product.title}</h1>
    <p>{product.description}</p>
    <p>{product.price}원</p>
    <button onClick={handleFavorite}>
      {product.isFavorited ? '좋아요 취소' : '좋아요'}
    </button>
    <button onClick={onDelete}>삭제</button>
  </div>
);
};

export default ProductDetailContent;
