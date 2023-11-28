import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/BuyScript.css";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import Post from "../components/Post";
import BuyScriptItem from "../components/BuyScriptItem";
import BuyScriptSummary from "../components/BuyScriptSummary";
import { useSelector } from "react-redux";
import DaumPostcode from "react-daum-postcode";

const BuyScript = () => {
  const navigate = useNavigate();
  const [buyItem, setBuyItem] = useState([]);
  const USER_ID = useSelector((state)=>state.session.id)
  const [totalNum,setTotalNum] = useState();
  const [count, setCount]=useState();
  const [arrSession,setArrSession]=useState([]);
  const [show, setShow] = useState(false); // true : 모달보임 / false : 모달 안보임
  const handleClose = () => {
    setShow(false);
    recipAdressDetailRef.current.focus();
  };
  const handleShow = () => setShow(true);
  const [text, setText] = useState("");
  const [pwText, setPwText] = useState("");
  const [pw2Text, setPw2Text] = useState("");

  const userId = useSelector((state) => state.session.id);
  const [address, setAddress] = useState(""); // 주소
  const [addressDetail, setAddressDetail] = useState(""); // 상세주소

  const [isOpenPost, setIsOpenPost] = useState(false);
  const postCodeStyle = {
    display: "block",
    position: "relative",
    top: "0%",
    width: "450px",
    height: "400px",
    padding: "7px",
  };

  const onChangeOpenPost = () => {
    setIsOpenPost(true);
  };

  /** 주소 API 함수 및 로직 */
  const onCompletePost = (data) => {
    let fullAddr = data.address;
    let extraAddr = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddr += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddr +=
          extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== "" ? ` (${extraAddr})` : "";
    }
    console.log(data);
    setAddress(data.zonecode);
    setAddressDetail(fullAddr);
    setIsOpenPost(false);
    handleClose();
    recipZipCodeRef.current.value = data.zonecode; // 우편번호
    // postNum.current.disabled = true; //우편번호 입력창 비활성화
    recipAdressRef.current.value = fullAddr;
    // userAdd.current.disabled = true;
  };

  useEffect(() => {
    const buyItems = JSON.parse(sessionStorage.getItem("buyItem"))
    if ( buyItems == null || buyItems.length == 0)  {
      alert("구매할 아이템을 선택해주세요");
      navigate("/basket");
    } else if ( buyItems !== null ) {
      // const buyItems = JSON.parse(sessionStorage.getItem("buyItem"));
      setBuyItem(buyItems);
    }
  }, []);

  console.log("유저아이디필터:", buyItem);

  // 주문자 이름
  const nameRef = useRef();

  // 주문자 연락처
  const phoneNumRef = useRef();

  // 주문자 이메일
  const emailRef = useRef();

  // 수령인 이름
  const recipRef = useRef();

  // 수령인 연락처
  const recipNumRef = useRef();

  // 수령인 주소
  const recipAdressRef = useRef();

  // 수령인 상세주소
  const recipAdressDetailRef = useRef();

  const recipZipCodeRef = useRef();

  // 수령인 배송메모
  const reciDeliPsRef = useRef();

 


  useEffect(()=>{
    let num = 0;
    let buyItems = JSON.parse(sessionStorage.getItem('buyItem'))
    for(let i=0 ; i<parseInt(buyItems?.length);i++){
      num = num + parseInt(buyItems[i]?.PROD_COUNT)
    }
    console.log(num,'총개수')
    setCount(num)
    console.log(count,'총개수')
    },[])



  
  let buyData = [];
  /**DB로 정보를 보내기 위해 데이터 집합소 */
  const reftest = () => {
    let sessionArr = []
    const buyItems =JSON.parse(sessionStorage.getItem('buyItem'))
    buyItems.forEach((item)=>{sessionArr.push(item)})
    console.log(sessionArr,'세션이 들어갔을까?')
    // 주문자 이름
    let name = nameRef.current.value;
    // 주문자 연락처
    let phoneNumber = phoneNumRef.current.value;
    // 주문자 이메일
    let email = emailRef.current.value;
    // 수령자 이름
    let recip = recipRef.current.value;
    // 수령자 연락처
    let recipNum = recipNumRef.current.value;
    // 수령자 주소
    let recipAdress = recipAdressRef.current.value;
    // 수령자 상세주소
    let recipAdressDetail = recipAdressDetailRef.current.value;
    // 수령자 우편번호
    let recipZipCode = recipZipCodeRef.current.value;
    // 수령자 배송메세지
    let reciDeliPs = reciDeliPsRef.current.value;

    console.log(name, "이름");
    console.log(phoneNumber, "연락처");
    console.log(email, "이메일");
    console.log(recip,'수령인')
    console.log(recipNum,'수령인연락처')
    console.log(recipAdress,'수령인주소')
    console.log(recipAdressDetail,'수령인상세주소')
    console.log(recipZipCode,'수령인우편번호')
    console.log(reciDeliPs,'수령인')
    buyData={
    'MEMBER_ID' :`${USER_ID}`,
    'ORDER_IMG' :`${buyItems[0].PROD_URL}`,
    'ORDER_PRICE':`${totalNum}`,
    'DELIVERY_POST':`${recipZipCode}`,
    'DELIVERY_ADDR1':`${recipAdress}`,
    'DELIVERY_ADDR2':`${recipAdressDetail}`,
    'RECIPIENT':`${reciDeliPs}`,
    'BUYITEM_SESSION':sessionArr.map((item)=>({PROD_COUNT: item.PROD_COUNT, PROD_NAME :item.PROD_NAME , PROD_SIZE:item.PROD_SIZE , COLOR_NAME:item.PROD_COLOR.COLOR_NAME,PROD_URL:item.PROD_URL})
    )
    }
   
    console.log(buyData,'데이터뭉치')
    console.log(buyData.BUYITEM_SESSION,'새로운배열의세션')
  };

 
    
  


  /** 결제 창 호출 함수 */
  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init(process.env.REACT_APP_KEY_ID); // 가맹점 식별 코드

    // 결제 데이터 정의하기
    const data = {
      pg: "html5_inicis.{INIpayTest}", // PG사
      pay_method: "card", // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: 1000, // 결제금액
      name: "아임포트 결제 데이터 분석", // 주문명
      buyer_name: "홍길동", // 구매자 이름
      buyer_tel: "01012341234", // 구매자 전화번호
      buyer_email: "example@example", // 구매자 이메일
      buyer_addr: "신사동 661-16", // 구매자 주소
      buyer_postcode: "06018", // 구매자 우편번호
    };
    IMP.request_pay(data, portoneCallback);
  };

  /** 결제 콜백 함수 */
  const portoneCallback = (res) => {
    const { success, merchant_uid, error_msg } = res;
    if (success) {
      // 결제성공시 시행할 동작들
      alert("결제 성공");
      reftest()
      navigate('/complete'); 
    } else {
      // 결제 실패시 시행할 동작들
      alert("결제 실패:", error_msg);
      navigate("/buyscript")
    }
  };

  return (
    <div
      className="buyscript"
      style={{
        minWidth: "800px",
        margin: "0% 10%",
        padding: "0px 0px 50px 0px",
      }}
    >
      {/* 맨위 타이틀 텍스트 */}
      <div className="buyscript-top-text">
        <div className="title">
          <p> </p>
        </div>
        <div className="subtitle">
          <p style={{ color: "#bebebe" }}>장바구니</p>&nbsp;&nbsp;
          <p>—</p>&nbsp;&nbsp;
          <p>주문서작성</p>&nbsp;&nbsp;
          <p>—</p>&nbsp;&nbsp;
          <p style={{ color: "#bebebe" }}>주문완료</p>
        </div>
      </div>

      {/* 주문자 정보 */}
      <div className="buyscript-input-area">
        <div className="title">
          <p>주문자정보</p>
        </div>
        <div style={{ height: "150px" }}>
          <div style={{ height: "50px", display: "flex" }}>
            <div className="subtitle">이름</div>
            <div className="input-txt-box">
              <input
                className="input-place"
                type="text"
                placeholder="이름을 입력해주세요"
                ref={nameRef}
              ></input>
            </div>
          </div>
          <div style={{ height: "50px", display: "flex" }}>
            <div className="subtitle">연락처</div>
            <div className="input-txt-box">
              <input
                className="input-place"
                type="text"
                placeholder="연락처를 입력해주세요"
                ref={phoneNumRef}
              ></input>
            </div>
          </div>
          <div style={{ height: "50px", display: "flex" }}>
            <div className="subtitle">이메일</div>
            <div className="input-txt-box">
              <input
                className="input-place"
                type="text"
                placeholder="이메일를 입력해주세요"
                ref={emailRef}
              ></input>
            </div>
          </div>
        </div>
      </div>

      {/* 배송정보 */}
      <div className="buyscript-input-area">
        <div className="title">
          <p>배송지 정보</p>
        </div>
        <div style={{ height: "250px" }}>
          <div style={{ height: "50px", display: "flex" }}>
            <div className="subtitle">수령인</div>
            <div className="input-txt-box">
              <input
                ref={recipRef}
                className="input-place"
                type="text"
                placeholder="수령인의 이름을 입력해주세요"
              ></input>
            </div>
          </div>
          <div style={{ height: "50px", display: "flex" }}>
            <div className="subtitle">연락처</div>
            <div className="input-txt-box">
              <input
                ref={recipNumRef}
                className="input-place"
                type="text"
                placeholder="수령인의 연락처를 입력해주세요"
              ></input>
            </div>
          </div>
          <div style={{ height: "50px", display: "flex" }}>
            <div className="subtitle">배송지</div>
            <div className="input-txt-box">
              <Form.Group className="mb-3" controlId="formBasicAdressNum">
                <Row>
                  <Form.Label onClick={(e) => e.preventDefault()}></Form.Label>
                  <Col>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header>
                        <Modal.Title>주소</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {isOpenPost ? (
                          <div
                            className="Add-api"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <DaumPostcode
                              style={postCodeStyle}
                              autoClose
                              onComplete={onCompletePost}
                              key="postcode"
                            />
                          </div>
                        ) : null}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          className="Button same-BTN"
                          onClick={handleClose}
                        >
                          닫기
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <Form.Control
                      type="text"
                      placeholder="우편번호"
                      ref={recipZipCodeRef}
                      onClick={() => {
                        handleShow();
                        onChangeOpenPost();
                      }}
                      style={{
                        borderTop: "none",
                        borderRight: "none",
                        borderLeft: "none",
                      }}
                    />{" "}
                  </Col>
                  <Col md={9}>
                    <Form.Control
                      type="text"
                      placeholder="주소"
                      ref={recipAdressRef}
                      onClick={() => {
                        handleShow();
                        onChangeOpenPost();
                      }}
                      style={{
                        borderTop: "none",
                        borderRight: "none",
                        borderLeft: "none",
                      }}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formBasicAdress"
              ></Form.Group>
              <Form.Group className="mb-4" controlId="formBasicAdressDetail">
                <Form.Control
                  type="text"
                  placeholder="상세주소"
                  ref={recipAdressDetailRef}
                />
              </Form.Group>
          
            </div>
          </div>
          <div style={{ height: "50px", display: "flex" }}>
            <div className="subtitle"></div>
            <div className="input-txt-box">
              <input
                ref={recipAdressDetailRef}
                className="input-place"
                type="text"
                placeholder="상세주소를 입력해주세요"
              ></input>
            </div>
          </div>
          <div style={{ height: "50px", display: "flex" }}>
            <div className="subtitle">배송메모</div>
            <div className="input-txt-box">
              <input
                ref={reciDeliPsRef}
                className="input-place"
                type="text"
                placeholder="배송 메세지를 입력해주세요"
              ></input>
            </div>
          </div>
        </div>
      </div>
      <div className="buyscript-goods-title">
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
      <div>
        {buyItem.map((items) => {
          return <BuyScriptItem item={items} />;
        })}
      </div>
      <BuyScriptSummary setTotalNum={setTotalNum}/>
      <div
        className="buy-submit-div"
        style={{
          width: "100%",
          display: "grid",
          textAlign: "center",
          placeItems: "center",
        }}
      >
        <Button
          onClick={onClickPayment}
          variant="outline-dark"
          className="buy-submit-btn same-BTN same-BTN:hover"
        >
          결제하기
        </Button>
      </div>
    </div>
  );
};

export default BuyScript;
