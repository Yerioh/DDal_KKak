// 내 정보 수정 페이지
import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import DaumPostcode from "react-daum-postcode";
import DeleteModal from "./DeleteModal";

const UserInfo = ({ userName, loginType, id, email, phone }) => {
  const idRef = useRef() // 유저 아이디
  const nameRef = useRef(); // 사용자 이름
  const emailRef = useRef(); // 사용자 이메일
  const phoneRef = useRef(); // 사용자 전화번호
  const C_pwRef = useRef(); // 현재 비밀번호
  const pwRef = useRef(); //유저가 변경할 비밀번호
  const pw2Ref = useRef(); //유저가 변경할 비밀번호 확인
  const postNum = useRef(); // 유저 우편번호 불러오기
  const userAdd = useRef(); // 유저 주소 불러오기
  const addDetail = useRef(); // 사용자 상세주소 불러오기

  const [show, setShow] = useState(false); //모달창 활성화 state
  const [address, setAddress] = useState(""); // 주소
  const [addressDetail, setAddressDetail] = useState(""); // 상세주소
  const [isOpenPost, setIsOpenPost] = useState(false);
  const [delete_user, setdelete_user] = useState(false); // 회원탈퇴 모달창 활성화 state

  //회원 탈퇴 모달창
  const delete_Modal = () => {
    // setdelete_user의 상태를 변경하는 메소드를 구현
    // !false -> !true -> !false
    setdelete_user(!delete_user);
  };
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

  /**개인정보 수정 함수*/
  const changeUserData = () => {};

  // 23-11-14 14:20 임휘훈 작성
  /** 내 정보 수정 입력란 회원 정보 자동 입력 후 비활성화 */
  useEffect(() => {
    console.log(email, phone);
    if(loginType == "M"){
      idRef.current.value = id
    }
    else if(loginType == "G"){
      idRef.current.value = "Google Account"
    }
    else if(loginType == "N"){
      idRef.current.value = "Naver Account"
    }
    else if(loginType == "K"){
      idRef.current.value = "Kakao Account"
    }
    idRef.current.disabled = true; // 입력란 비활성화
    nameRef.current.value = userName; // 이름
    nameRef.current.disabled = true; // 입력란 비활성화
    emailRef.current.value = email; // 이메일
    phoneRef.current.value = phone; // 전화번호

  }, [email, phone]);
  // 임휘훈 작성 끝

  return (
    <div className="UserInfo">
      <h1>내 정보 수정</h1>
      <div className="UserInfo-elementbox">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" placeholder="Enter ID" ref={idRef}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>이름</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" ref={nameRef} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>이메일</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Email"
              ref={emailRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicNum">
            <Form.Label>휴대전화</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Phone Number"
              ref={phoneRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword1">
            <Form.Label>현재 비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              ref={C_pwRef}    
            />
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
          <div className="mb-3 userInfo-btn">
            <Button className="Change-Btn" variant="outline-info" type="submit">
              수정완료
            </Button>
            <Button
              className="userDelete-btn"
              variant="outline-danger"
              onClick={delete_Modal}
            >
              회원탈퇴
            </Button>
            <DeleteModal delete_user={delete_user} delete_Modal={delete_Modal} />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UserInfo;
