import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../css/ImageResult.css";

const ResultImage = () => {
  const s3Url = 'https://final-project-s3bucket.s3.ap-northeast-2.amazonaws.com/'
  const location = useLocation();
  const imgData = location.state.imgData
  const positive = location.state.positivePrompt
  const negative = location.state.negativePrompt
  console.log("프롬프트 결과.", location.state.positivePrompt);
  const countImg = location.state?.countImg || 1;
  const containerClass =
    countImg === 4 ? "four-images" : countImg === 5 ? "five-images" : "";
  // 출력 이미지가 4개인 경우와 5개인 경우의 개별 레이아웃 생성

  // imageCount 만큼의 <li> 요소를 생성하는 함수
  const renderImageList = () => {
    // return Array.from(imgData, (img, index) => {
    //   return (
    //     <li key={index} className="imageresult">
    //       <div className="card">
    //         <img src={`${s3Url}${img}`} alt={`Image ${index + 1}`} />
    //       </div>
    //       {/* 받은 이미지 개수 만큼 이미지 추가  */}
    //       {/* 추가적인 내용이 필요하다면 여기에 넣을 수 있습니다. */}
    //     </li>
    //   );
    // });
  };

  return (
    <div className={`result-body ${containerClass}`}>
      <div className="result-containor">
        <div>
          <div className="keywrod-area">
          {/* <div id="keywordbox">
          </div> */}
            {positive}
          </div>
          <div className="except-area">
          {negative}
            {/* <div id="excptbox"></div> */}
          </div>
        </div>
        <ul className="image-list">{renderImageList()}</ul>
      </div>
    </div>
  );
};

export default ResultImage;
