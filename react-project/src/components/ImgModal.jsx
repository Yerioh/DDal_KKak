import React, { useState } from "react";
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
              <img src={Eximage[index]} alt="Ex_image" />
            </div>
            <hr />
            <div className="user-Prompt">
              <h5>Prompt</h5>
              <span>사자 닮은 사람</span>
              <h5>Negative Prompt </h5>
              <span>코뿔소 닮은 사람</span>
            </div>
            <hr />
            <div className="Modal-Btn">
              <Link to="#">
                <button>이미지 재편집</button>
              </Link>
              <Link to="#">
                <button>굿즈 선택</button>
              </Link>
              <button>다운로드</button>
              <button onClick={openModalHandler}>닫기</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ImgModal;
