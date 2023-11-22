import React, { createElement, useRef, useState } from "react";
import "../css/ImgModal.css";
import { Link } from "react-router-dom";
import axios from "../axios";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

// 회원탈퇴 모달, 이미지 상세정보 모달
const ImgModal = ({
  isOpen, // 이미지 상세 모달 state
  openModalHandler, // 이미지 상세 모달 함수
  ImgArray, // 이미지 배열
  index,
  handleCheckboxChange,
  updateCheckedImages,
  delImg_Btn
}) => {
  // 23-11-20 11:01 임휘훈 작성
  const imgRef = useRef();

  /** 내 저장 이미지 다운로드 함수 */
  const downLoadBtn = () => {
    domtoimage.toBlob(imgRef.current).then((blob) => {
      saveAs(blob, `DDAL_KKAK.${ImgArray[index].IMG_URL.slice(-3)}`);
    });
  };

  /* 
        Props로 받아야할 Data
        isOpen 모달 상태, openModalHandler : 모달 열고 닫기
        이미지 URL, 사용자 Prompt, NPrompt
    */
  return (
    <div>
      {isOpen ? (
        <div className="modal-backdrop" onClick={openModalHandler}>
          {/* 버블링 중지 함수 */}
          <div className="S-ImgInfo" onClick={(e) => e.stopPropagation()}>
            <div className="S-ImgPic">
              <img
                ref={imgRef}
                src={`${process.env.REACT_APP_AWS_BUCKET_URL}/${ImgArray[index].IMG_URL}`}
                alt="Ex_image"
              />
            </div>
            <hr />
            <div className="user-Prompt">
              <h5>Positive Prompt</h5>
              <span>{ImgArray[index].IMG_PROMPT}</span>
              <h5>Negative Prompt </h5>
              <span>{ImgArray[index].IMG_NE_PROMPT}</span>
            </div>
            <hr />
            <div className="Modal-Btn">
              <Link to="#">
                <button className="SM-btn">굿즈 선택</button>
              </Link>
              <button className="SM-btn" onClick={downLoadBtn}>
                다운로드
              </button>
              <button className="SM-btn" onClick={delImg_Btn}>삭제</button>
              <button className="SM-btn" onClick={() => {
                openModalHandler()
                handleCheckboxChange(index, false)
                updateCheckedImages()
                }}>
                닫기
              </button>
            </div>
          </div>
        </div>
      ) : null}
      
    </div>
  );
};
export default ImgModal;
