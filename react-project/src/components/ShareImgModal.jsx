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
                  src={`${process.env.REACT_APP_AWS_BUCKET_URL}/${ImgArray.IMG_URL}`}
                  alt="Ex_image"
                />
              </div>
              <div className="image-info">
                <div className="user-Prompt">
                  <h3>{ImgArray.IMG_NAME}</h3>
                  {/* <div className="user-Prompt"> */}

                  <div className="title-prompt-Pos">
                    <h4>핵심 키워드</h4>
                    <div className="prompt-text">
                      <span>{ImgArray.IMG_PROMPT}</span>
                    </div>
                  </div>
                  <div className="prompt-Neg">
                    {" "}
                    <h4>제외 키워드</h4>
                    <div className="prompt-text">
                      <span>{ImgArray.IMG_NE_PROMPT}</span>
                    </div>
                  </div>
                </div>

                {/* </div> */}
                <div className="like-toggle-box">
                  <div className="like-box">
                    {likeBtn ? (
                      <div className="like-btn">
                        <FaHeart className="red-heart" onClick={handleLike} />
                        <span>{ImgArray.CNT}</span>
                      </div>
                    ) : (
                      <div className="like-btn">
                        <FaRegHeart className="red-heart" onClick={handleLike} />
                        <span>{ImgArray.CNT}</span>
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
