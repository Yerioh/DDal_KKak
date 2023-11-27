import React from 'react'
import '../css/Complete.css'
import BuyScriptItem from '../components/BuyScriptItem'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';

const Complete = () => {
    return (
        <div className='complete' style={{ margin: "0% 10%" ,minWidth:"800px"}}>

            {/* 주문완료 페이지 가장 위 텍스트 */}
            <div className='top-text'>
                <div className='title'>
                    <p>주문완료</p>
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
            <div style={{ display: "grid", placeItems: "center" }}>
                <div><img src=".\images\img_completed.png" alt="" /></div>
                <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "20px", fontWeight: "bold" }}>구매가 완료되었습니다.</p>
                    <p>2023-11-15 11:28:12</p>
                </div>
            </div>


            {/* 상품정보 안내 제목 */}
            <div className='goods-title'>
                <div className='inner-items' style={{ width: "20%" }}>
                    주문일자
                </div>
                <div className='inner-items' style={{ width: "50%" }}>
                    상품정보
                </div>
                <div className='inner-items' style={{ width: "20%" }}>
                    사이즈
                    <br />
                    수량
                </div>
                <div className='inner-items' style={{ width: "20%" }}>
                    금액
                </div>
            </div>
            {/* <BuyScriptItem /> */}
            <Link to="/" style={{ textDecoration: "none" }}>
                <div className='submit-div' style={{ width: "100%", display: "grid", textAlign: "center", placeItems: "center" }}>
                    <Button  variant="outline-dark"  className='submit-btn'>메인페이지로</Button>
                </div>
            </Link>


        </div>
    )
}

export default Complete