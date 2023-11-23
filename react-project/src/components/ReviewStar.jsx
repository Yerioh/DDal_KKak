import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import "../css/GoodsDetail.css";

// 각각 별점을 수정, 보여주기만 하는 컴포넌트
// initialRating : 초기값, onRatingChange : 변경값, editable : false면 수정불가능
const ReviewStar = ({ initialRating, onRatingChange, editable }) => {
    const [rating, setRating] = useState(initialRating);

    const handleStarClick = index => {
        if (!editable) return; // 변경 불가능한 경우 클릭 무시
        setRating(index);
        if(onRatingChange) onRatingChange(index);
    };

    return (
        <div className='RatingBox'>
            {[1, 2, 3, 4, 5].map((el) => (
                <FaStar
                    key={el}
                    onClick={() => handleStarClick(el)}
                    className={el <= rating ? 'clo' : ''}
                    size='35'
                />
            ))}
        </div>
    );
};

export default ReviewStar;