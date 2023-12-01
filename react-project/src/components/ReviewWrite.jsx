import React, { useEffect, useRef, useState } from "react";
import "../css/ReviewWrite.css";
import Rating from '@mui/material/Rating';
import axios from '../axios'

const ReviewWrite = ({
  isOpen, // 이미지 상세 모달 state
  openModalHandler, // 이미지 상세 모달 함수
  prodId, // 상품 ID
  img, // 상품 IMG
  userId // 유저 ID
}) => {
  const [rating, setRating] = useState(0);
  const [ratingSpeech, setRatingSpeech] = useState('')
  const textRef = useRef()
  let reviewData = [];

  const submitTest = (e) => {
    e.preverntDefault()
    reviewData = {
      // 별점
      rating: `${rating}`,
      // 리뷰 텍스트
      reviewText: `${textRef.current.value}`,
      // 상품 ID
      prodId: prodId,
      // 상품 IMG
      img: img,
      // 유저 ID
      userId: userId.id
    }
    axios.post('/page/reviewInsert', reviewData)
      .then(res => {
        alert('리뷰가 등록되었습니다.')
        openModalHandler()
      })

  }
  const speech = (newValue) => {
    if (newValue === null) {
      setRating('1')
      setRatingSpeech('별로에요')
    } else if (newValue >= 0.5) {
      setRatingSpeech('별로에요')
    } else if (newValue >= 1.5) {
      setRatingSpeech('보통이에요')
    } else if (newValue >= 2.5) {
      setRatingSpeech('쓸만해요')
    } else if (newValue >= 4.5) {
      setRatingSpeech('좋아요')
    } else if (newValue === 5) {
      setRatingSpeech('훌륭해요')
    }
  }

  useEffect(() => {
    speech(rating)
    if (textRef.current) {
      textRef.current.focus();
    }
  }, [])

  return (
    <div className="ReviewWrite"  onClick={(e) => { e.stopPropagation() }} style={{cursor:"default"}}>

      {isOpen ? (
        <div className="modal-backdrop" >
          {/* 모달창 전체 크기 div */}
          <div className="modal-container"
          >
            {/* 모달창 제목 */}
            <div className="modal-title"
            >
              리뷰작성
            </div>
            {/* 모달창 - 간단하게 지금리뷰쓰러 들어온 제품정보 */}
            <div className="modal-goods-info"
              style={{
                width: "100%",
                height: "18%",
                display: "flex",
                fontSize: "20px",
                fontWeight: "bold"
              }}
            >
              <div className="modal-goods-info-1">
                <div className="modal-goods-info-2" style={{ widows: "100%" }}>
                  <img className="modal-goods-info-img"
                    style={{
                      widows: "100%"
                    }}
                    src={img}
                    alt=""
                  />
                </div>
              </div>
              <div style={{ height: "100%", width: "82%" }}>
                <div className="modal-goods-info-3" style={{ marginTop: "20px" }}>
                  맨투맨
                </div>
                <div className="modal-goods-info-3">
                  XL / 네이비
                </div>
              </div>
            </div>
            <hr style={{ backgroundColor: "lightgray" }} />
            {/* 상품만족도(별점 주기) */}
            <div
              style={{
                width: "100%",
                height: "15%",
              }}
            >
              <div style={{ fontSize: "20px" }}>받으신 상품은 어땠나요?</div>
              <Rating className="rating-star" name="simple-controlled" defaultValue={5.0} precision={0.5} value={rating}
                onChange={(event, newValue) => (
                  // 별점업데이트
                  setRating(newValue),
                  // 별점메세지
                  speech(newValue))}
              />
              <div style={{ fontSize: "20px" }}>{ratingSpeech}</div>
            </div>
            <hr style={{ backgroundColor: "lightgray" }} />
            <div
              style={{
                width: "100%",
                height: "25%",
                overflowBlock: "scroll",
              }}
            >
              {/* 리뷰 텍스트 입력창 */}
              <div
                style={{
                  height: "95%",
                  overflowBlock: "scroll",
                }}
              >
                <div style={{ height: "15%", fontSize: "20px", margin: "0px 0px 5px 0px" }}>
                  여러분의 의견을 알려주세요.
                </div>
                <textarea
                  className="modal-goods-textarea"
                  name="reviewText"
                  id="review"
                  cols="80"
                  rows="5"
                  ref={textRef}
                />
              </div>
            </div>
            {/* 이미지 업로드 */}
            <div style={{ height: "10%" }}>
              <div style={{ height: "22px", fontSize: "20px", margin: "0px 0px 5px 0px" }}>
                리뷰이미지업로드
              </div>
              <input type="file"
                id="file"
                name="file"
                accept="image/png, image/jpeg"
                style={{ height: "30px", width: "92%" }}
                className="SM-btn"
              />
            </div>

            {/* 리뷰저장 과 닫기 버튼 */}
            <div className="modal-goods-btnArea"
            >
              <button className='modal-goods-save-btn SM-btn'
                onClick={submitTest}
              >
                리뷰저장
              </button>
              <button
                className="modal-goods-close-btn SM-btn"
                onClick={
                  openModalHandler
                }
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ReviewWrite;
