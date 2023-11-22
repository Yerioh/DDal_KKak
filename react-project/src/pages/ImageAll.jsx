import React from "react";
import "../css/ImageAll.css";

const ImageAll = () => {
  // 이미지 카드
  const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="All-Conatainer">
      <div className="All-search-box">
        <input className="All-search-bar" type="text" />
        <button type="submit">
          <img src="./images/search_img1.png" alt="" />
        </button>
      </div>
    </div>
  );
};

export default ImageAll;
