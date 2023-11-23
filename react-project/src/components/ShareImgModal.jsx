import React, { useRef } from "react";
import Switch from "@mui/material/Switch";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

const ShareImgModal = ({
  shareModal, // 이미지 상세 모달 state
  likeBtn, //이미지 좋아요 상태
  handleShareImg, //이미지 상세 모달 제어 함수
  handleLike, // 이미지 상세 모달 함수
  ImgArray, // 이미지 배열
  
  index,
}) => {
  const imgRef = useRef();
  return (
    <div>
      <div>
        {shareModal ? (
          <div className="modal-backdrop" onClick={handleLike}>
            {/* 버블링 중지 함수 */}
            <div className="S-ImgInfo" onClick={(e) => e.stopPropagation()}>
              <div className="S-ImgPic">
                <img
                  //   ref={imgRef}
                  src={`./images/${ImgArray}.png`}
                  alt="Ex_image"
                />
                {/* <img
                ref={imgRef}
                src={`${process.env.REACT_APP_AWS_BUCKET_URL}/${ImgArray[index].IMG_URL}`}
                alt="Ex_image"
              /> */}
              </div>

              <div className="like-toggle-box">
                <div className="like-box">
                  {likeBtn ? (
                    <div className="like-btn">
                      <FaHeart color="red" onClick={handleLike} />
                      <span>100</span>
                    </div>
                  ) : (
                    <div className="like-btn">
                      <FaRegHeart onClick={handleLike} />
                      <span>100</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="user-Prompt mt-4">
                <h5>Positive Prompt</h5>
                {/* <span>{ImgArray[index].IMG_PROMPT}</span> */}
                <h5>Negative Prompt </h5>
                {/* <span>{ImgArray[index].IMG_NE_PROMPT}</span> */}
              </div>

              <div className="Modal-Btn">
                <button
                  className="SM-btn"
                  onClick={() => {
                    handleShareImg();
                  }}
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ShareImgModal;
