import React, { useState } from "react";
import "../css/SaveImage.css";
import axios from "../axios";
import ImgModal from "./ImgModal";

const SaveImage = () => {
  const [testImg, setTestImg] = useState([]);
  const [isOpen, setIsOpen] = useState(false); //모달 상태 State

  const openModalHandler = () => {
    // isOpen의 상태를 변경하는 메소드를 구현
    // !false -> !true -> !false
    setIsOpen(!isOpen);
  };
  const testImgUrl = [""];

  // 내 저장 이미지 불러오기 함수
  const CallImg = () => {
    axios.post("", {}).then((res) => {});
  };

  return (
    <div className="saveImage">
      <h1>내 저장 이미지</h1>
      <div className="Image-box">
        {testImgUrl.map((image, index) => (
          <div className="Save-Image" key={index} onClick={openModalHandler}>
            <img className="img-thumb" src={image} alt={`Image ${index}`} />
            
          </div>
        ))}
        
        {testImgUrl.map((image, index) => (
          <div className="Save-Image" key={index} onClick={openModalHandler}>
            <img className="img-thumb" src={image} alt={`Image ${index}`} />
          </div>
        ))}
        <ImgModal isOpen={isOpen} openModalHandler={openModalHandler}
         Eximage={testImgUrl}/>
      </div>
      
    </div>
  );
};

export default SaveImage;
