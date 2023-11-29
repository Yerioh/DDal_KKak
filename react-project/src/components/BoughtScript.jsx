import React from "react";
import "../css/BoughtScript.css";
import BoughtItem from "./BoughtItem";

const BoughtScript = () => {
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
      <BoughtItem />
    </div>
  );
};

export default BoughtScript;
