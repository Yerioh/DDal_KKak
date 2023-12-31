import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import ShareImgModal from "./ShareImgModal";
import "../css/ImageAll.css";
import { useSelector } from "react-redux";
import axios from "../axios";

const SearchCard = ({ data, imgState, setImgState }) => {
  // 사용자 아이디
  const useId = useSelector((state) => state.session.id);
  const isLogin = useSelector((state) => state.session.isLogin);
  const [likeBtn, setLikeBtn] = useState(false); //좋아요 활성화
  const [shareModal, setShareModal] = useState(false); // 이미지 상세 모달
  const [likeCnt, setLikeCnt] = useState(data.CNT);

  // 좋아요 색깔 변환 함수
  const handleLike = () => {
    if (isLogin) {
      // 좋아요 색 변환
      setLikeBtn(!likeBtn);
            
      // 이미지에 대한 좋아요 데이터 베이스 저장
      axios.post("/imgCreate/likeClick", { id: useId, imgId: data.IMG_ID })
        .then(res=>{
          // 좋아요 클릭 시 img data 재 요청
          if(res.data.likeCheck){
            setImgState(!imgState)
          }
        })
    } else {
      alert("로그인이 필요한 서비스 입니다.");
    }
  };

  // 이미지 좋아요 클릭 여부 체크
  useEffect(() => {
    axios
      .post("/imgCreate/likeCheck", { id: useId, imgId: data.IMG_ID })
      .then((res) => {
        setLikeBtn(res.data);
      });
  }, [data]);

  // 이미지 상세 모달 제어
  const handleShareImg = () => {
    setShareModal((prevshareModal) => !prevshareModal);
  };
  return (
    <Card className="mb-3 Card-div" style={{ width: "17rem" }}>
      <Card.Img
        variant="top"
        src={`${process.env.REACT_APP_AWS_BUCKET_URL}/${data.IMG_URL}`}
        onClick={handleShareImg}
      />
      <Card.Body>
        <div className="Card-date-title">
          <Card.Title>{data.IMG_NAME}</Card.Title>
          <span>{data.MEMBER_NAME} 님</span>
        </div>
        <div className="Card-like-title">
          {likeBtn ? (
            <div className="like-btn">
              <FaHeart className="red-heart" onClick={handleLike} />
              <span>{data.CNT}</span>
            </div>
          ) : (
            <div className="like-btn">
              <FaRegHeart className="red-heart" onClick={handleLike} />
              <span>{data.CNT}</span>
            </div>
          )}
          <span>{data.DATE.slice(0, 10)}</span>
        </div>
      </Card.Body>
      {shareModal && (
        <ShareImgModal
          handleLike={handleLike}
          likeBtn={likeBtn}
          ImgArray={data}
          shareModal={shareModal}
          handleShareImg={handleShareImg}
          likeCnt={likeCnt}
        />
      )}
    </Card>
  );
};

export default SearchCard;
