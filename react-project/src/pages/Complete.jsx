import React, { useEffect } from 'react'
import '../css/Complete.css'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';

const Complete = () => {

  // 오늘 날짜 추가를 위한 변수선언들
  let today = new Date();
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1;  // 월
  let date = today.getDate();  // 날짜
  let hours = today.getHours(); // 시
  let minutes = today.getMinutes();  // 분
  let seconds = today.getSeconds();  // 초
  let times = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`

  const completeDel = () => {
    const buyItems = JSON.parse(sessionStorage.getItem("buyItem"));
    const cartItems = JSON.parse(sessionStorage.getItem("cartItem"))
    if (buyItems.length === cartItems.length) {
        sessionStorage.clear()
    } else if (buyItems !== cartItems.length) {
        for (let i = 0; i < parseInt(buyItems.length); i++) {
            for (let j = 0; j < parseInt(cartItems.length); j++) {
                if (buyItems[i].PROD_UUID === cartItems[j].PROD_UUID) {
                    cartItems.splice(j, 1);
                }
            }
            sessionStorage.setItem("cartItem", JSON.stringify(cartItems));
            sessionStorage.removeItem("buyItem");
        }
    }
};

useEffect(() => {
    completeDel()
}, [])

    return (
        <div className='complete' style={{ margin: "0% 20%" ,minWidth:"800px"}}>
            {/* 주문완료 페이지 가장 위 텍스트 */}
            <div className='top-text'>
                <div className='title'>
                    <p> </p>
                </div>
                <div className='subtitle'>
                    <p style={{ color: "#bebebe" }}>장바구니</p>&nbsp;&nbsp;
                    <p>—</p>&nbsp;&nbsp;
                    <p style={{ color: "#bebebe" }}>주문서작성</p>&nbsp;&nbsp;
                    <p>—</p>&nbsp;&nbsp;
                    <p>주문완료</p>
                </div>
            </div>

            {/* 상품 완료 메세지 및 구매시각 출력 */}
            <div style={{ display: "grid", placeItems: "center" , marginTop:'80px'}}>
                <div><img src=".\images\img_completed.png" alt="" /></div>
                <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "20px", fontWeight: "bold" }}>구매가 완료되었습니다.</p>
                    <p>{times}</p>
                </div>
            </div>

            {/* <BuyScriptItem /> */}
            <Link to="/" style={{ textDecoration: "none"}}>
                <div className='submit-div' style={{ width: "100%", display: "grid", textAlign: "center", placeItems: "center",marginTop:'50px' }}>
                    <Button  variant="outline-dark"  className='submit-btn same-BTN same-BTN:hover'>메인페이지로</Button>
                </div>
            </Link>


        </div>
    )
}

export default Complete