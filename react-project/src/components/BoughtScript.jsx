import React, { useEffect, useState } from "react";
import "../css/BoughtScript.css";
import BoughtItem from "./BoughtItem";
import axios from '../axios';

const BoughtScript = (id) => {

  const [goodsArray, setGoodsArray] = useState()
    // 23-11-29 주문 정보 불러오기 임휘훈 작성
    // 주문 정보 불러오기 useEffect 
    useEffect(() => {
      axios.post("/user/order", {userId : id})
      .then((res) => {
        console.log(res.data.goods);
        setGoodsArray(res.data.goods)
      })
  }, [])

  return (
    <div className="BS-first-container">
      <div className="title">
        <h3>구매내역</h3>
      </div>

      <div className="title-box">
        <div className="subtitle-text" style={{ width: "19%" }}>
          주문일자
        </div>
        <div className="subtitle-text" style={{ width: "54%" }}>
          상품정보
        </div>
        <div className="subtitle-text" style={{ width: "16%" }}>
          개수 / 금액
        </div>
        <div className="subtitle-text" style={{ width: "14%" }}>
          배송상태
        </div>
      </div>
      {goodsArray?.map((goods) => (
      <BoughtItem
      order_at ={goods.ORDER_AT}
      order_de_img={goods.ORDER_DE_IMG}
      prod_name = {goods.PROD_NAME}
      order_prod_info = {goods.ORDER_PROD_INFO}
      order_de_cnt = {goods.ORDER_DE_CNT}
      order_detail_price = {goods.ORDER_DETAIL_PRICE}
        />
      ))}
    </div>
  );
};

export default BoughtScript;
