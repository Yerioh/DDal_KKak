import React from "react";
import "../css/GoodsDetail.css";
import image from "../img/image-editor/image-edit-gallery1.png";
import ReviewStar from "./ReviewStar";

const GoodsReview = () => {

  return (
    // 굿즈 리뷰 카드
    <div className="GoodsReview-card">
      <div className="GoodsReview-cardbody">
        <p>
          <ReviewStar initialRating={5} editable={false} />
          {/* initalRaitng: 초기값, DB에서 받아올 값, editable = false면 수정 불가능  */}
        </p>
        {/* 이름  날짜 */}
        <p>Test1 2023.11.22</p>
        {/* 내용 */}
        <p>너무 좋습니다. 또 주문하겠습니다. 딸깍 화이팅</p>
        {/* 구매한 상품의 이미지 */}
        <div className="GoodsReview-goodsinfoImg">
          <img
            src={image} 
            style={{ width: "10%", objectFit: "cover", marginRight: "10px" }}
            alt=""
          />
          {/* 구매한 상품명, 사이즈 */}
          <div className="GoodsReview-goodsinfo">
            티셔츠 색상
            <div className="GoodsReview-goodsSize">XL</div>
          </div>
        </div>
      </div>
      <div className="GoodsReview-img">
        {/* 사용자 착의샷, 안올리면 공백으로 표현 */}
        <img
          src={image}
          style={{ width: "25%", objectFit: "cover" }}
          alt=""
        ></img>
      </div>
    </div>
  );
};

export default GoodsReview;
