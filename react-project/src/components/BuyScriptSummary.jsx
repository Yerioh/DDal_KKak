import React, { useEffect, useState } from 'react'

const BuyScriptSummary = ({setTotalNum}) => {

  const [sum, setSum] = useState();
  const [deliverprice,setDeliverPrice] = useState(1500);
  const [total,setTotal] = useState(0);
  useEffect(()=>{
  let price = 0;
  let buyItems = JSON.parse(sessionStorage.getItem('buyItem'))
  for(let i=0 ; i<parseInt(buyItems?.length);i++){
    price = price + parseInt(buyItems[i]?.PRICE_SUM)
  }
  setSum(price)
  setTotal(price + deliverprice)
  setTotalNum(price + deliverprice)
  },[])
  

  return (
    <div className="basket-goods-summary" style={{ padding:"15px 0px",fontSize:"20px"}}>
    <div style={{display:"flex",textAlign:"center"}}>
        <div style={{width:"70%"}}>총 상품 가격</div>
        <div style={{width:"20%"}}>배송비</div>
        <div style={{width:"20%"}}>총 결제 금액</div>
    </div>
    <div style={{display:"flex",textAlign:"center",borderTop:"1px solid lightgray",borderBottom:"1px solid lightgray"}}>
        <div style={{width:"70%"}}>{sum?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원</div>
        <div className='vtline' ></div>
        <div style={{width:"20%"}}>{deliverprice?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원</div>
        <div className='vtline' ></div>
        <div style={{width:"20%"}}>{total?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원</div>
    </div>
    </div>
  )
}

export default BuyScriptSummary