import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../css/ImageResult.css";

const ResultImage = ({ imgSrc }) => {
  const location = useLocation();
  console.log("결과 이미지를 받았습니다.", location.state);
  const countImg = location.state?.countImg || 1;
  const containerClass =
    countImg === 4 ? "four-images" : countImg === 5 ? "five-images" : "";
  // 출력 이미지가 4개인 경우와 5개인 경우의 개별 레이아웃 생성

  // imageCount 만큼의 <li> 요소를 생성하는 함수
  const renderImageList = () => {
    return Array.from({ length: countImg }, (_, index) => {
      console.log(`Rendering image ${index + 1}: ${imgSrc}`); // 이미지 렌더링 정보 출력
      return (
        <li key={index}>
          <div className="card">
            <img src={imgSrc} alt={`Image ${index + 1}`} />
          </div>
          {/* 받은 이미지 개수 만큼 이미지 추가  */}
          {/* 추가적인 내용이 필요하다면 여기에 넣을 수 있습니다. */}
        </li>
      );
    });
  };

  return (
    <div className={`result-body ${containerClass}`}>
      <div className="result-containor">
        <div>
          <div className="keywrod-area">
          <div id="keywordbox">키워드</div>
          </div>
          <div className="except-area">
            <div id="excptbox">제외</div>
          </div>
        </div>
        <ul className="image-list">{renderImageList()}</ul>
      </div>
    </div>
  );
};

export default ResultImage;
