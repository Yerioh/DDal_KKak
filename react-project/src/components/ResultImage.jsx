import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../css/ImageResult.css";
import Button from 'react-bootstrap/Button'
import axios from '../axios'
import { useNavigate } from "react-router-dom";

const ResultImage = () => {
  
  const location = useLocation();
  const navi = useNavigate()

  // 23-11-16 오후 14:30 박지훈 작성
  // S3 버킷 기본 주소 값
  const s3Url = 'https://final-project-s3bucket.s3.ap-northeast-2.amazonaws.com/'  
  console.log('머지?',location)
  const imgData = location.state.imgData
  // const imgData = ['110467665808154977803/0197d55a-8387-11ee-b713-0242ac1c000c.png']
  // 선택한 이미지
  const [imgClick, setImgClick] = useState([])
  const positive = location.state.positivePrompt
  const negative = location.state.negativePrompt
  console.log("프롬프트 결과.", location.state.positivePrompt);  
  console.log("결과 이미지를 받았습니다.", location);
  const countImg = location.state?.countImg || 1;
  const containerClass = 
    countImg === 4 ? "four-images" : countImg === 5 ? "five-images" : "";
  // 출력 이미지가 4개인 경우와 5개인 경우의 개별 레이아웃 생성

  // imageCount 만큼의 <li> 요소를 생성하는 함수
  const renderImageList = () => {
    return Array.from(imgData, (img, index) => {
      return (
        <li key={index} className="imageresult">
          <div className="card" id={img} onClick={choiceImg}>
            <img src={`${s3Url}${img}`} alt={`Image ${index + 1}`} id={img}/>
          </div>
        </li>
      );
    });
  };

  // 23-11-16 오후 14:30 박지훈 작성
  // 이미지 선택
  const choiceImg = (e)=>{
    let check = e.target.id
    console.log('이미지 선택')
    setImgClick([check])
  }

  // 이미지 선택 버튼
  const choiceImgBtn =()=>{
    console.log('이미지 선택 완료',imgClick)
    axios.post('/imgCreate/choiceImg', imgClick)
      .then((response)=>{
        if(response.data.choiceImg){
          navi(`/image-edit/?img=${imgClick[0]}`)
        }
      })
  }

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
      <Button variant="primary" onClick={choiceImgBtn}>이미지 선택</Button>{' '}
    </div>
  );
};

export default ResultImage;
