import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../css/BuyScript.css'
import Button from 'react-bootstrap/esm/Button';
import Post from '../components/Post'
import BuyScriptItem from '../components/BuyScriptItem';
import BuyScriptSummary from '../components/BuyScriptSummary';
import { useSelector } from 'react-redux';

const BuyScript = () => {
  const navigate = useNavigate()
  const [buyItem, setBuyItem] = useState([]);
  const [enroll_company, setEnroll_company] = useState({ address: '', });
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

  const userId = useSelector((state) => state.session.id);

  useEffect(() => {

    if (JSON.parse(sessionStorage.getItem('buyItem')) == null) {
      alert('구매할 아이템을 선택해주세요')
      navigate('/basket')
    } else if (JSON.parse(sessionStorage.getItem('buyItem')) !== null) {
      const buyItems = JSON.parse(sessionStorage.getItem('buyItem'));
      setBuyItem(buyItems)
    }
  }, [])

  console.log('유저아이디필터:', buyItem)

  // 주문자 이름
  const nameRef = useRef()

  // 주문자 연락처
  const phoneNumRef = useRef('')

  // 주문자 이메일
  const emailRef = useRef('')

  // 수령인 이름
  const recipRef = useRef('')

  // 수령인 연락처
  const recipNumRef = useRef('')

  // 수령인 주소
  let recipAdressRef = useRef('')

  // 수령인 상세주소
  const recipAdressDetailRef = useRef('')
 
  // 수령인 배송메모
  const reciDeliPsRef = useRef('')
 

  const reftest = () => {
    let name = nameRef.current.value
    console.log(name)
  }
   /** 결제 창 호출 함수 */
   const onClickPayment = () => {
    const { IMP } = window;
    IMP.init(process.env.REACT_APP_KEY_ID) // 가맹점 식별 코드

    // 결제 데이터 정의하기
    const data = {
        pg: 'html5_inicis.{INIpayTest}',               // PG사
        pay_method: 'card',                           // 결제수단
        merchant_uid: `mid_${new Date().getTime()}` ,  // 주문번호
        amount: 1000,                                 // 결제금액
        name: '아임포트 결제 데이터 분석',                  // 주문명
        buyer_name: '홍길동',                           // 구매자 이름
        buyer_tel: '01012341234',                     // 구매자 전화번호
        buyer_email: 'example@example',               // 구매자 이메일
        buyer_addr: '신사동 661-16',                    // 구매자 주소
        buyer_postcode: '06018',                      // 구매자 우편번호
    }
    IMP.request_pay(data, portoneCallback)
    }

    /** 결제 콜백 함수 */
    const portoneCallback = (res) => {
        const{
            success,
            merchant_uid,
            error_msg,
        } = res;
        if(success){
            alert('결제 성공')
        }else{
            alert('결제 실패:',error_msg)
        }
    }


  return (
    <div className='buyscript' style={{ minWidth: "800px", margin: "0% 10%", padding: "0px 0px 50px 0px" }}>
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
              <input  className='input-place' type='text' placeholder='이름을 입력해주세요' ref={nameRef}></input></div>
          </div>
          <div style={{ height: "50px", display: "flex" }}>
            <div className='subtitle' >연락처</div>
            <div className='input-txt-box' >
              <input  className='input-place' type='text' placeholder='연락처를 입력해주세요' ref={phoneNumRef}></input></div>
          </div>
          <div style={{ height: "50px", display: "flex" }}>
            <div className='subtitle' >이메일</div>
            <div className='input-txt-box'  >
              <input className='input-place' type='text' placeholder='이메일를 입력해주세요' ref={emailRef}></input></div>
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
              <input ref={recipRef} className='input-place' type='text' placeholder='수령인의 이름을 입력해주세요'></input></div>
          </div>
          <div style={{ height: "50px", display: "flex" }}>
            <div className='subtitle' >연락처</div>
            <div className='input-txt-box'  >
              <input ref={recipNumRef} className='input-place' type='text' placeholder='수령인의 연락처를 입력해주세요'></input></div>
          </div>
          <div style={{ height: "50px", display: "flex" }}>
            <div className='subtitle' >배송지</div>
            <div className='input-txt-box'>
              <input ref={recipAdressRef} className='input-place' style={{ width: "80%" }} type='text' placeholder='수령인의 주소를 입력해주세요' required={true} onChange={handleInput} value={enroll_company.address} />
              {/* <input className="user_enroll_text" placeholder="주소" type="text" required={true} name="address" onChange={handleInput} value={enroll_company.address} /> */}
              <button style={{ height: "100%" }} onClick={handleComplete}> 우편번호 찾기 </button>
              {popup && <Post company={enroll_company} setcompany={setEnroll_company}></Post>}
            </div>
          </div>
          <div style={{ height: "50px", display: "flex" }}>
            <div className='subtitle' ></div>
            <div className='input-txt-box' >
              <input ref={recipAdressDetailRef} className='input-place' type='text' placeholder='상세주소를 입력해주세요'></input>
            </div>
          </div>
          <div style={{ height: "50px", display: "flex" }}>
            <div className='subtitle' >배송메모</div>
            <div className='input-txt-box' >
              <input ref={reciDeliPsRef} className='input-place' type='text' placeholder='배송 메세지를 입력해주세요'></input>
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
        {buyItem.map((items) => {
          return (
            <BuyScriptItem item={items} />
          );
        })}
      </div>
      <BuyScriptSummary />
        <div className='buy-submit-div' style={{ width: "100%", display: "grid", textAlign: "center", placeItems: "center" }}>
          <Button onClick={onClickPayment} variant="outline-dark" className='buy-submit-btn'>결제하기</Button>
        </div>
    </div>
  )
}

export default BuyScript