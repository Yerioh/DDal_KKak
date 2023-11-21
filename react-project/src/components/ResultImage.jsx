import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../css/ImageResult.css";
import axios from '../axios'
import { useNavigate } from "react-router-dom";

const ResultImage = () => {
  
  const location = useLocation();
  const navi = useNavigate()

  // 23-11-16 오후 14:30 박지훈 작성
  // S3 버킷 기본 주소 값
  const s3Url = process.env.REACT_APP_AWS_BUCKET_URL  
  // const imgData = location.state.imgData
  const imgData = ['108488627855757649516/b6bef82a-48ec-5f41-c240-31e3c174e544.png','108488627855757649516/c168fb51-89d2-5676-d90b-04eb401fa572.png',
'108488627855757649516/c168fb51-89d2-5676-d90b-04eb401fa572.png', '114662496405123443827/6c77b248-6eb1-6588-67b7-558e0acf4f0f.png','114662496405123443827/6c77b248-6eb1-6588-67b7-558e0acf4f0f.png']
 

 //이미지를 선택하면 그림자 값 유지
 const [selectedImage, setSelectedImage] = useState(null);

  // 선택한 이미지
  const [imgClick, setImgClick] = useState([])
  // const positive = location.state.positivePrompt
  // const negative = location.state.negativePrompt
  const positive = 'test'
  const negative = 'test'

  const countImg = location.state?.countImg || 1;

  const containerClass = 
    countImg === 4 ? "four-images" : countImg === 5 ? "five-images" : "";
  // 출력 이미지가 4개인 경우와 5개인 경우의 개별 레이아웃 생성

  // imageCount 만큼의 <li> 요소를 생성하는 함수
  const renderImageList = () => {
  
    return Array.from(imgData, (img, index) => {
      const isSelected = img === selectedImage;
      const cardClass = isSelected? 'card-active' : 'card'

      return (
        <li key={index} className="imageresult">
          <div className={cardClass} id={img} onClick={choiceImg}>
            <img src={`${s3Url}/${img}`} alt={`Image ${index + 1}`} id={img}/>
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
    setSelectedImage(check)
    console.log(check)
  }

  // 이미지 선택 버튼
  const choiceImgBtn =()=>{
    console.log('이미지 선택 완료',imgClick)
    axios.post('/imgCreate/choiceImg', imgClick)
      .then((response)=>{
        if(response.data.choiceImg){          
          navi(`/image-edit/?img=${imgClick[0]}`,  { state : {
            positivePrompt : positive
            }})
        }
      })
  }

  return (
    <div className={`result-body `}>
      <div className="result-containor">
        <div className="input-area">
          <div className="keyword-area">
          {/* <div id="keywordbox"></div> */}
            <span className="keyword-label">keyword</span><span className="keyword-content">{positive}</span>
          </div>
            {/* <div id="excptbox"></div> */}
          </div>
        </div>
        <ul className={`${containerClass}`}>{renderImageList()}</ul>
        <button className='choice-img' onClick={choiceImgBtn}>이미지 선택</button>{' '}
    </div>
  );
};

export default ResultImage;
