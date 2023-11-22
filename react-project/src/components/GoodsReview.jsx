import React from "react";
import "../css/GoodsDetail.css";

const GoodsReview = () => {
  return (
    // 굿즈 리뷰 카드
    <div className="GoodsReview-card">
      <div className="GoodsReview-cardbody">
        <p>별점</p>
        {/* 이름 현재 날짜 */}
        <p>Test1 2023.11.22</p>
         {/* 내용 */}
        <p>너무 좋습니다. 또 주문하겠습니다. 딸깍 화이팅</p>
        <div className="GoodsReview-goodsinfoImg">
            {/* 구매한 상품의 이미지 */}
          <img src="#" alt="" />
          <div className="GoodsReview-goodsinfo">
            {/* 구매한 상품명, 사이즈 */}
            티셔츠
            색상
            <div className="GoodsReview-goodsSize"> 
            XL
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div className="GoodsReview-img">
        {/* 사용자 착의샷, 안올리면 공백으로 표현 */}
        <img src="#" alt=""></img>
      </div>
    </div>
  );
};

export default GoodsReview;
