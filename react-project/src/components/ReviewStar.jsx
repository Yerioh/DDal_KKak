import React from 'react'
import { useState } from 'react'
import {FaStar} from 'react-icons/fa'
import '../css/GoodsDetail.css'

// 리뷰를 남길때 사용하는 별점입니다. 
// 마우스를 올리면 색이 칠해지고 누르면 색칠한 정도가 고정됩니다.
const StarRaitings = () => {
    const[checkRaitings,setCheckRaitings] = useState([false, false, false, false, false])
    const array = [0, 1, 2, 3, 4]
    const handleStarClick = index => {
        
        let clickStates = [...checkRaitings];
        for (let i =0; i < 5; i++){
            clickStates[i] = i <= index ? true : false;
        }
        setCheckRaitings(clickStates); 
        console.log(checkRaitings)
    };
    let score = checkRaitings.filter(Boolean).length;
    score
 
  return (
    <div className='RatingBox'>
    {array.map((el) => (
        <FaStar
        key={el}
        onClick={()=> handleStarClick(el)}
        className={checkRaitings[el] && 'black'}
        size='35'
    />))}
    </div>
  )
}

export default StarRaitings