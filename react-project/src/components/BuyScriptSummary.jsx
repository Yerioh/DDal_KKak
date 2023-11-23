import React from 'react'

const BuyScriptSummary = () => {
  return (
    <div className="basket-goods-summary" style={{ padding:"15px 0px",fontSize:"20px"}}>
    <div style={{display:"flex",textAlign:"center"}}>
        <div style={{width:"70%"}}>총 상품 가격</div>
        <div style={{width:"20%"}}>배송비</div>
        <div style={{width:"20%"}}>총 결제 금액</div>
    </div>
    <div style={{display:"flex",textAlign:"center",borderTop:"1px solid lightgray",borderBottom:"1px solid lightgray"}}>
        <div style={{width:"70%"}}>10000원</div>
        <div className='vtline' ></div>
        <div style={{width:"20%"}}>0원</div>
        <div className='vtline' ></div>
        <div style={{width:"20%"}}>10000원</div>
    </div>
    </div>
  )
}

export default BuyScriptSummary