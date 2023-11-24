import styled from "styled-components";
import { useState, useEffect } from "react";

// 점수를 정확하게 표현해주는 별점 기능입니다. 평균 별점을 나타낼 때 사용합니다.
//
function AvgStarRating() {
    const AVR_RATE = 70;  // 평균별 평점입니다. 여기를 조정해야 별점의 색칠 정도가 달라집니다. REVIEW_RAITINGS랑 연결해야할 부분
    const STAR_IDX_ARR = ['first', 'second', 'third', 'fourth', 'last']; // 별 한개당 관리하는 id 입니다.
    const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);
    const calcStarRates = () => {
        let tempStarRatesArr = [0, 0, 0, 0, 0];
        let starVerScore = (AVR_RATE * 70) / 100;
        let idx = 0;
        while (starVerScore > 14) { 
        // 별 하나하나에 채워질 width를 지정합니다.
            tempStarRatesArr[idx] = 14;
            idx += 1;
            starVerScore -= 14;
        }
        tempStarRatesArr[idx] = starVerScore;
        return tempStarRatesArr;
    };
    useEffect(() => {
        setRatesResArr(calcStarRates)
    }, [])
    return (
        <StarRateWrap>
            {STAR_IDX_ARR.map((item, idx) => {
                return <span className='star_icon' key={`${item}_${idx}`}>
                    {/* 별이 비어있을 때 설정하는 값 */}
                    <svg xmlns='http://www.w3.org/2000/svg' width='40' height='39' viewBox='0 0 14 13' fill='#C4C4C4'>
                        <clipPath id={`${item}StarClip`}>
                            <rect width={`${ratesResArr[idx]}`} height='39' />
                        </clipPath>
                        <path
                            id={`${item}Star`}
                            d='M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z'
                            transform='translate(-2 -2)'
                        />
                        {/* 별의 색깔이 칠해졌을 때 설정하는 값 */}
                        <use clipPath={`url(#${item}StarClip)`} href={`#${item}Star`} fill='rgb(250, 250, 26)'
                        />
                    </svg>
                </span>
            })
            }
        </StarRateWrap>
    )
}

export default AvgStarRating;

const StarRateWrap = styled.div`
        display: flex;
        align-items: center;
        width: 100%;
        margin: 100px 0 0 15px;
        .star_icon {
          display: inline-flex;
          margin-right: 5px;
        }
      `