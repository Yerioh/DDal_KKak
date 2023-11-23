import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../css/BuyScript.css'
import Button from 'react-bootstrap/esm/Button';
import Post from '../components/Post'
import BuyScriptItem from '../components/BuyScriptItem';
import BuyScriptSummary from '../components/BuyScriptSummary';

const BuyScript = () => {

  const [buyItem, setBuyItem] = useState([]);

  const [enroll_company, setEnroll_company] = useState({
    address: '',
  });

  const [popup, setPopup] = useState(false);

  const handleInput = (e) => {
    setEnroll_company({
      ...enroll_company,
      [e.target.name]: e.target.value,
    })
  }

  const handleComplete = (data) => {
    setPopup(!popup);
  }
//   useEffect(() => {
//     const buyItems = sessionStorage.getItem('buyItem');
//     if (buyItems) {
//         setBuyItem(JSON.parse(buyItems))
//     }  
//     console.log(buyItem, "장바구니페이지 처음 랜더링")
// }, [])
  return (
    <div className='buyscript'style={{ minWidth: "800px", margin: "0% 10%", padding: "0px 0px 50px 0px" }}>
      {/* 맨위 타이틀 텍스트 */}
      <div className='buyscript-top-text'>
        <div className='title'>
          <p>주문서 작성</p>
        </div>
        <div className='subtitle'>
          <p style={{ color: "#bebebe" }}>장바구니</p>&nbsp;&nbsp;
          <p>—</p>&nbsp;&nbsp;
          <p>주문서작성</p>&nbsp;&nbsp;
          <p>—</p>&nbsp;&nbsp;
          <p style={{ color: "#bebebe" }}>주문완료</p>
        </div>
      </div>


      {/* 주문자 정보 */}
      <div className='buyscript-input-area'>
        <div className='title' >
          <p >주문자정보</p>
        </div>
        <div style={{ height: "150px" }}>
          <div style={{ height: "50px", display: "flex" }}>
            <div className='subtitle' >이름</div>
            <div className='input-txt-box' >
              <input className='input-place' type='text' placeholder='이름을 입력해주세요'></input></div>
          </div>
          <div style={{ height: "50px", display: "flex" }}>
            <div className='subtitle' >연락처</div>
            <div className='input-txt-box' >
              <input className='input-place' type='text' placeholder='연락처를 입력해주세요'></input></div>
          </div>
          <div style={{ height: "50px", display: "flex" }}>
            <div className='subtitle' >이메일</div>
            <div className='input-txt-box'  >
              <input className='input-place' type='text' placeholder='이메일를 입력해주세요'></input></div>
          </div>
        </div>
      </div>


      {/* 배송정보 */}
      <div className='buyscript-input-area'>
        <div className='title' >
          <p>배송지 정보</p>
        </div>
        <div style={{ height: "250px" }}>
          <div style={{ height: "50px", display: "flex" }}>
            <div className='subtitle' >수령인</div>
            <div className='input-txt-box'>
              <input className='input-place' type='text' placeholder='수령인의 이름을 입력해주세요'></input></div>
          </div>
          <div style={{ height: "50px", display: "flex" }}>
            <div className='subtitle' >연락처</div>
            <div className='input-txt-box'  >
              <input className='input-place' type='text' placeholder='수령인의 연락처를 입력해주세요'></input></div>
          </div>
          <div style={{ height: "50px", display: "flex" }}>
            <div className='subtitle' >배송지</div>
            <div className='input-txt-box'>
              <input className='input-place' style={{ width: "80%" }} type='text' placeholder='수령인의 주소를 입력해주세요' required={true} onChange={handleInput} value={enroll_company.address} />
              {/* <input className="user_enroll_text" placeholder="주소" type="text" required={true} name="address" onChange={handleInput} value={enroll_company.address} /> */}
              <button style={{ height: "100%" }} onClick={handleComplete}> 우편번호 찾기 </button>
              {popup && <Post company={enroll_company} setcompany={setEnroll_company}></Post>}
            </div>
          </div>
          <div style={{ height: "50px", display: "flex" }}>
            <div className='subtitle' ></div>
            <div className='input-txt-box' >
              <input className='input-place' type='text' placeholder='상세주소를 입력해주세요'></input>
            </div>
          </div>
          <div style={{ height: "50px", display: "flex" }}>
            <div className='subtitle' >배송메모</div>
            <div className='input-txt-box' >
              <input className='input-place' type='text' placeholder='배송 메세지를 입력해주세요'></input>
            </div>
          </div>
        </div>
      </div>
      <div className='buyscript-goods-title'>
        <div className='inner-items' style={{ width: "20%" }}>
          일자
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
      <div>
        {
          buyItem.map=((item)=>{
            <BuyScriptItem item={item}/> 
          })
        }
        
      </div>
      <BuyScriptSummary />
      <Link to="/complete" style={{ textDecoration: "none" }}>
        <div className='buy-submit-div' style={{ width: "100%", display: "grid", textAlign: "center", placeItems: "center" }}>
          <Button className='buy-submit-btn'>결제하기</Button>
        </div>
      </Link>
    </div>
  )
}

export default BuyScript