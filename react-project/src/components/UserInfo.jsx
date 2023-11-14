import React, { useEffect, useRef, useState } from "react";

import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import DaumPostcode from "react-daum-postcode";
const UserInfo = ({userName, loginType, id, email, phone}) => {
  const pwRef = useRef();  //유저가 변경할 비밀번호
  const pw2Ref = useRef(); //유저가 변경할 비밀번호 확인
  const userAdd = useRef(); // 유저 주소 불러오기
  const postNum = useRef(); // 유저 우편번호 불러오기
  const addDetail = useRef(); // 사용자 상세주소 불러오기
  const nameRef = useRef(); // 사용자 이름 
  const emailRef = useRef() // 사용자 이메일
  const phoneRef = useRef() // 사용자 전화번호

  
  const [show, setShow] = useState(false); //모달창 활성화 state
  const [address, setAddress] = useState(""); // 주소
  const [addressDetail, setAddressDetail] = useState(""); // 상세주소
  const [isOpenPost, setIsOpenPost] = useState(false); 

  // 모달 show 함수
  const handleShow = () => setShow(true);
  // 모달 닫기 함수
  const handleClose = () => {
    setShow(false);
    addDetail.current.focus();
  };

  //모달창 스타일
  const postCodeStyle = {
    display: "block",
    position: "relative",
    top: "0%",
    width: "400px",
    height: "400px",
    padding: "7px",
  };

  const onChangeOpenPost = () => {
    setIsOpenPost(true);
  };

  //주소 API 함수 및 로직
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
    postNum.current.value = data.zonecode; // 우편번호
    postNum.current.disabled = true; //우편번호 입력창 비활성화
    userAdd.current.value = fullAddr; // 주소 입력창
    userAdd.current.disabled = true;
  };
  console.log(address, addressDetail);

  /**개인정보 수정 함수*/
  const changeUserData = () =>{
    
  }

  // 23-11-14 14:20 임휘훈 작성
  /** 내 정보 수정 입력란 회원 정보 자동 입력 후 비활성화 */
  useEffect(() => {
    nameRef.current.value = userName
    nameRef.current.disabled = true;
    emailRef.current.value = email
    phoneRef.current.value = phone
    
  }, [])
  // 임휘훈 작성 끝

  return (
    <div className="UserInfo">
      <h1>내 정보 수정</h1>
      <div className="UserInfo-elementbox">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>이름</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" ref={nameRef} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>이메일</Form.Label>
            <Form.Control type="text" placeholder="Enter Email" ref={emailRef} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicNum">
            <Form.Label>휴대전화</Form.Label>
            <Form.Control type="text" placeholder="Enter Phone Number" ref={phoneRef} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword1">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              ref={pwRef}
            />
           
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword2">
            <Form.Label>비밀번호 확인</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              ref={pw2Ref}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAdressNum">
            <Row>
              <Form.Label>주소</Form.Label>
              <Col>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>주소</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {isOpenPost ? (
                      <div>
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
                      className="Button"
                      variant="secondary"
                      onClick={handleClose}
                    >
                      닫기
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Form.Control
                  type="text"
                  placeholder="우편번호"
                  ref={postNum}
                  onClick={() => {
                    handleShow();
                    onChangeOpenPost();
                  }}
                />{" "}
              </Col>
              <Col md={9}>
                <Form.Control
                  type="text"
                  placeholder="주소"
                  ref={userAdd}
                  onClick={() => {
                    handleShow();
                    onChangeOpenPost();
                  }}
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAdressDetail">
            <Form.Control type="text" placeholder="상세주소" ref={addDetail} />
          </Form.Group>
          <div className="d-grid gap mb-3">
            <Button
              className="Change-Btn"
              variant="outline-info"
              type="submit"
            >
              수정완료
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UserInfo;
