// 장바구니 기능 구현 불러오는것까지만 기능구현됨 2023/11/17 - 조성민

import React, { useEffect, useState } from "react";
import "../css/GoodsBasket.css";
import BasketItem from "../components/BasketItem";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { useSelector } from "react-redux";

const Basket = () => {
  // 세션스토리지에 있던 데이터를 불러와 저장할 State
  const [cartItem, setCartItem] = useState([]);
  const [sum, setSum] = useState(0);
  const USER_ID = useSelector((state) => state.session.id);
  const [sessionCheck, setSessionCheck] =useState(false)
  // 현재 로그인된 아이디에 해당하는 세션만 걸러내기
  const UserIdFilter = cartItem.filter((item) => item.USER_ID === USER_ID);

  
 

/** 장바구니 모든 아이템 삭제 */
const allDel = () => {
  if (window.confirm("정말 삭제합니까?")) {
    sessionStorage.clear()
    alert("삭제되었습니다.");
    window.location.replace("/basket");
  } else {
    alert("취소합니다.");
  } 
}


/** 체크선택된 아이템들 지우기 */
  const delChoice = () => {
    const buyItems = JSON.parse(sessionStorage.getItem("buyItem"));
    const cartItems = JSON.parse(sessionStorage.getItem("cartItem"))
    if (buyItems == null || buyItems.length == 0) {
      alert("장바구니 물건을 선택해주세요");
    } else if(buyItems.length == cartItem.length){
        sessionStorage.clear()
        window.location.replace("/basket");
    }else if (buyItems.length > 0) {
      for (let i = 0; i < parseInt(buyItems.length); i++) {
        for (let j = 0; j < parseInt(cartItems.length); j++) {
          if (buyItems[i].PROD_UUID==cartItems[j].PROD_UUID) {
            cartItems.splice(j,1);
          }
        }
      }
      sessionStorage.setItem("cartItem", JSON.stringify(cartItems));
      window.location.replace("/basket");
    }
  };
  useEffect(()=>{
    let price = 0
    const buyItems = JSON.parse(sessionStorage.getItem("buyItem"));
    if( buyItems == null || buyItems.length == 0){
      setSum(price)
    }else if(buyItems !== null){
      for(let i=0 ; i<buyItems.length;i++){
        price = price+parseInt(buyItems[i].PRICE_SUM)
      }
      setSum(price)
    }
    
  },[sessionCheck])

  /** 세션 로컬스토리지에 있는 데이터를 불러와 State에 저장 그리고 확인할 console */
  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("cartItem")) == null) {
    } else {
      const storedCartItems = JSON.parse(sessionStorage.getItem("cartItem"));
      setCartItem(storedCartItems);
      if (JSON.parse(sessionStorage.getItem("buyItem")) === null) {
      } else {
        sessionStorage.removeItem("buyItem");
      }
    }
    setSum(0)
  }, []);

  return (
    <div style={{ margin: "0% 20%", minWidth: "780px" }}>
      <div className="basket-top-text">
        
        <div className="subtitle">
          <p>장바구니</p> &nbsp;&nbsp;
          <p>—</p>&nbsp;&nbsp;
          <p style={{ color: "#bebebe" }}>주문서작성</p>&nbsp;&nbsp;
          <p>—</p>&nbsp;&nbsp;
          <p style={{ color: "#bebebe" }}>주문완료</p>
        </div>
      </div>
      {/* 장바구니의 전체선택님 하나하나 선택되는 기능 구현 예정 */}
      <div className="basket-all-check">
        <div className="inner-box">
        <button style={{ border: "none", backgroundColor: "whitesmoke" }} onClick={()=>allDel()}>
          <p className="basket-top-check">전체삭제</p>
          </button>
          <button style={{ border: "none", backgroundColor: "whitesmoke" }} onClick={()=>delChoice()}>
            <div
              style={{ borderLeft: "1px solid lightgray", margin: "0px 10px" }} 
            >
              <p className="basket-top-check">선택삭제</p>
            </div>
          </button>
        </div>
      </div>
      <div style={{ padding: "10px 0px" }}>
        <div className="basket-goods-title">
          <div className="inner-items" style={{ width: "20%" }}>
            일자
          </div>
          <div className="inner-items" style={{ width: "50%" }}>
            상품정보
          </div>
          <div className="inner-items" style={{ width: "20%" }}>
            사이즈
            <br />
            수량
          </div>
          <div className="inner-items" style={{ width: "20%" }}>
            금액
          </div>
        </div>
        {/* 세션에 들어있는 장바구니에 들어가 있는 제품들의 정보를 컴포넌트를 통해 map 으로 뿌려줌 */}
        {UserIdFilter.map((item, index) => {
          return (
            <BasketItem
              key={item.id}
              items={item}
              index={index}
              sessionCheck={setSessionCheck}
              session={sessionCheck}
            />
          );
        })}
      </div>
      {/* 모든 상품의 가격 총 금액 기능 - 구현예정 (아직 구현 안됨) */}
      <div
        className="basket-goods-summary"
        style={{ padding: "15px 0px", fontSize: "20px" }}
      >
        <div style={{ display: "flex", textAlign: "center" }}>
          <div style={{ width: "70%" }}>총 상품 가격</div>
          <div style={{ width: "20%" }}>배송비</div>
          <div style={{ width: "20%" }}>총 결제 금액</div>
        </div>
        <div
          style={{
            display: "flex",
            textAlign: "center",
            borderTop: "1px solid lightgray",
            borderBottom: "1px solid lightgray",
          }}
        >
          <div style={{ width: "70%" }}>
            {sum.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원
          </div>
          <div className="vtline"></div>
          <div style={{ width: "20%" }}>1,500원</div>
          <div className="vtline"></div>
          <div style={{ width: "20%" }}>
            {(sum + 1500)
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
            원
          </div>
        </div>
      </div>

      {/* 주문하기 버튼을 누를 시 주문서 작성 페이지로 체크된 제품만 정보가 넘어감*/}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link
          to={"/buyscript"}
          style={{ textDecoration: "none", width: "25%" }}
        >
          <Button variant="outline-dark" className="basket-submit-btn same-BTN same-BTN:hover">
            주문하기
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Basket;
