import React, { useRef } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

const ShareImgModal = ({
  shareModal, // 이미지 상세 모달 state
  likeBtn, //이미지 좋아요 상태
  handleShareImg, //이미지 상세 모달 제어 함수
  handleLike, // 이미지 상세 모달 함수
  ImgArray, // 이미지 배열  
  likeCnt,
}) => {
  const imgRef = useRef();
  return (
    <div>
      <div>
        {shareModal ? (
          <div className="modal-backdrop" onClick={handleShareImg}>
            {/* 버블링 중지 함수 */}
            <div className="S-ImgInfo" onClick={(e) => e.stopPropagation()}>
              <div className="S-ImgPic">
                <img
                  //   ref={imgRef}
                  src={`${process.env.REACT_APP_AWS_BUCKET_URL}/${ImgArray.IMG_URL}`}
                  alt="Ex_image"
                />
                {/* <img
                ref={imgRef}
                src={`${process.env.REACT_APP_AWS_BUCKET_URL}/${ImgArray[index].IMG_URL}`}
                alt="Ex_image"
              /> */}
              </div>
              <div className="image-info">
                <div className="user-Prompt">
                  <h3>title</h3>
                  <h5>Positive Prompt :</h5>
                  <span>{ImgArray.IMG_PROMPT}</span>
                  <span></span>
                  <h5>Negative Prompt :</h5>
                  <span>{ImgArray.IMG_NE_PROMPT}</span>
                  <span></span>
                </div>
                <div className="like-toggle-box">
                  <div className="like-box">
                    {likeBtn ? (
                      <div className="like-btn">
                        <FaHeart color="red" onClick={handleLike} />
                        <span>{likeCnt}</span>
                      </div>
                    ) : (
                      <div className="like-btn">
                        <FaRegHeart onClick={handleLike} />
                        <span>{likeCnt}</span>
                      </div>
                    )}
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
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ShareImgModal;
