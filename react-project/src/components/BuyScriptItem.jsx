import React from 'react'
import Card from 'react-bootstrap/Card';

const BuyScriptItem = ({item}) => {
  return (
    // map 함수로 값을 받을 예정
    <div className='buy-goods-list'>
    <div className='first-list-box'>
        <div className='inner-info-box' >
            <div style={{ height: "50%",display: "flex",alignItems: "center" }}>
                {/* 장바구니에 넣은날짜 /  */}
                <h6>{item?.CARTED_AT}</h6>
            </div>
        </div>
    </div>
    {/* 장바구니 정보표시 상품이미지 / 상품명 / 상품 색 */}
    <div className='vtline' ></div>
    <div className='second-box'>
        <div style={{ width: "40%" }}>
            {/* <img className='img-box' src="./images/GM4_누끼.png" alt="" /> */}
            <Card.Img variant="top" src={item?.PROD_URL} style={{width:"auto",height:"auto",maxWidth:"200px",maxHeight:"200px"}}/>
        </div>
        <div className='txt-info' style={{ width: "60%" }}>
            {/* DB에서 상품번호를 기반으로 불러오기 */}
            <div style={{ height: "50%" }}>
                {item?.PROD_NAME}
            </div>
            {/* 세션 스토리지 저장 */}
            <div style={{ height: "50%" }}>
                색상명
            </div>
        </div>
    </div>
    <div className='vtline' ></div>
    <div className='count-box' >
        {/* 세션스토리지저장 */}
        <div style={{ height: "50%", display: "grid", placeItems: "center" }}>
            사이즈
            <div>
            {item?.PROD_SIZE}
            </div>
        </div>
        {/* 세션 스토리지 저장 */}
        <div style={{ height: "50%", display: "grid", placeItems: "center" }}>
            <div>수량</div>
            <div style={{ display: "flex", alignItems: "center" }}>
                {/* 세션에 저장된 수량정보 가져오기 */}
                <h6 >{item?.PROD_COUNT}</h6>
            </div>
        </div>
    </div>
    <div className='vtline' ></div>
    <div className='summary-price'>
        {/* 수량에 맞추어 합계금액 */}
        {item?.PRICE_SUM}
    </div>
</div>
  )
}

export default BuyScriptItem