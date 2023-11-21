// 장바구니 기능 구현 불러오는것까지만 기능구현됨 2023/11/17 - 조성민

import React, { useEffect, useState } from 'react'
import "../css/GoodsBasket.css"
import BasketItem from '../components/BasketItem'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/esm/Button';
const Basket = () => {

    // 세션스토리지에 있던 데이터를 불러와 저장할 State 
    const [cartItem, setCartItem] = useState([]);

    /** 세션 로컬스토리지에 있는 데이터를 불러와 State에 저장 그리고 확인할 console */
    useEffect(() => {
        const cartItems = sessionStorage.getItem('cartItem');
        if (cartItems) {
            setCartItem(JSON.parse(cartItems))
        }
        console.log(cartItem, "장바구니페이지 처음 랜더링")
    }, [])


    return (
        <div style={{ margin: "0% 10%", minWidth: "780px" }}>
            <div className='basket-top-text'>
                <div className="title">
                    장바구니
                </div>
                <div className="subtitle">
                    <p >장바구니</p> &nbsp;&nbsp;
                    <p>—</p>&nbsp;&nbsp;
                    <p style={{ color: "#bebebe" }}>주문서작성</p>&nbsp;&nbsp;
                    <p>—</p>&nbsp;&nbsp;
                    <p style={{ color: "#bebebe" }}>주문완료</p>
                </div>
            </div>
{/* 장바구니의 전체선택님 하나하나 선택되는 기능 구현 예정 */}
            <div className='basket-all-check' >
                <div className='inner-box'>
                    <input className='basket-top-check' type="checkbox" />
                    <p className='basket-top-check' >전체선택</p>
                    <div style={{ borderLeft: "1px solid lightgray", margin: "0px 10px" }}>
                        <p className='basket-top-check'>선택삭제</p>
                    </div>
                </div>
            </div>
            <div style={{ padding: "10px 0px" }}>
                <div className='basket-goods-title'>
                    <div className='inner-times' style={{ width: "20%" }}>
                        일자
                        <br />
                        상품번호
                    </div>
                    <div className='inner-times' style={{ width: "50%" }}>
                        상품정보
                    </div>
                    <div className='inner-times' style={{ width: "20%" }}>
                        사이즈
                        <br />
                        수량
                    </div>
                    <div className='inner-times' style={{ width: "20%" }}>
                        금액
                    </div>
                </div>
{/* 세션에 들어있는 장바구니에 들어가 있는 제품들의 정보를 컴포넌트를 통해 map 으로 뿌려줌 */}
                {cartItem.map((item) => {
                    console.log(item, "mapTEST")
                    return (
                        <BasketItem items={item} />
                    );
                })}

            </div>
            {/* 모든 상품의 가격 총 금액 기능 - 구현예정 (아직 구현 안됨) */}
            <div className="basket-goods-summary" style={{ padding: "15px 0px", fontSize: "20px" }}>
                <div style={{ display: "flex", textAlign: "center" }}>
                    <div style={{ width: "70%" }}>총 상품 가격</div>
                    <div style={{ width: "20%" }}>배송비</div>
                    <div style={{ width: "20%" }}>총 결제 금액</div>
                </div>
                <div style={{ display: "flex", textAlign: "center", borderTop: "1px solid lightgray", borderBottom: "1px solid lightgray" }}>
                    <div style={{ width: "70%" }}>0원</div>
                    <div className='vtline' ></div>
                    <div style={{ width: "20%" }}>0원</div>
                    <div className='vtline' ></div>
                    <div style={{ width: "20%" }}>{"10000".toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+"원"}</div>
                    {/*10000 총 결제 금액 유동적으로 바꿔야함 */}
                </div>
            </div>


            {/* 주문하기 버튼을 누를 시 주문서 작성 페이지로 체크된 제품만 정보가 넘어감*/}
            <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Link to={'/buyscript'} style={{ textDecoration: "none" }}>
                    <Button style={{ height: "64px", lineHeight: "64px", display: "block", backgroundColor: "#0028ac", width: "200px", textAlign: "center", borderRadius: "8px", color: "white", fontWeight: "bold", fontSize: "20px" }}>주문하기</Button>
                </Link>
            </div>
        </div>
    )
}

export default Basket