import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import ShareImgModal from "./ShareImgModal";

const SearchCard = ({ num, index }) => {
  const [likeBtn, setLikeBtn] = useState(false); //좋아요 활성화
  const [shareModal, setShareModal] = useState(false); // 이미지 상세 모달
  // 좋아요 색깔 변환 함수
  const handleLike = () => {
    setLikeBtn(!likeBtn);
  };

  // 이미지 상세 모달 제어
  const handleShareImg = () => {
    setShareModal((prevshareModal) => !prevshareModal);
  };
  return (
    <Card
      className="mb-3 Card-div"
      style={{ width: "14rem" }}
     
    >
      <Card.Img variant="top" src={`./images/${num}.png`}  onClick={handleShareImg}/>
      <Card.Body>
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
        <Card.Title>{index} 님</Card.Title>
      </Card.Body>
      {shareModal && (
        <ShareImgModal
          handleLike={handleLike}
          likeBtn={likeBtn}
          ImgArray={num}
          shareModal={shareModal}
          setShareModal={setShareModal}
          handleShareImg={handleShareImg}
          index={index}
        />
      )}
    </Card>
  );
};

export default SearchCard;
