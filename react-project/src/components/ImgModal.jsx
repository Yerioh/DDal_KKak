import React, { createElement, useState } from "react";
import "../css/ImgModal.css";
import { Link } from "react-router-dom";
import axios from "../axios";
// 회원탈퇴 모달, 이미지 상세정보 모달
const ImgModal = ({
  isOpen, // 이미지 상세 모달 state
  openModalHandler, // 이미지 상세 모달 함수
  ImgArray, // 이미지 배열
  index,
}) => {
  // 23-11-17 17:00 임휘훈 작성
  /** 내 저장 이미지 다운로드 함수 */
  const downLoadBtn = () => {
    console.log("다운로드 버튼 활성화");
    const imgDownload = document.createElement('a')
    console.log("경로", `${process.env.REACT_APP_AWS_BUCKET_URL}/${ImgArray[index].IMG_URL}`);
    imgDownload.href = `/${ImgArray[index].IMG_URL}` // 절대경로를 넣으면 다운로드 안됨
    console.log("다운로드", `DDAL_KKAK.${ImgArray[index].IMG_URL.slice(-3)}`);
    imgDownload.download = `DDAL_KKAK.${ImgArray[index].IMG_URL.slice(-3)}`
    console.log("dafdfa",imgDownload);
    imgDownload.click()
  }

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
              <img src={`${process.env.REACT_APP_AWS_BUCKET_URL}/${ImgArray[index].IMG_URL}`} alt="Ex_image" />
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
                <button>이미지 재편집</button>
              </Link>
              <Link to="#">
                <button>굿즈 선택</button>
              </Link>
              <button onClick={downLoadBtn}>다운로드</button>
              <button onClick={openModalHandler}>닫기</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ImgModal;
