// 내 정보 수정 페이지
import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import DaumPostcode from "react-daum-postcode";
import axios from "../axios"
import { SHA256 } from "crypto-js";
import { useNavigate } from "react-router-dom";

const UserInfo = ({ userName, loginType, id, email, phone, postNumber, address, addressDetail }) => {
  const navigate = useNavigate();
  const idRef = useRef(); // 유저 아이디
  const nameRef = useRef(); // 사용자 이름
  const emailRef = useRef(); // 사용자 이메일
  const phoneRef = useRef(); // 사용자 전화번호
  const C_pwRef = useRef(); // 현재 비밀번호
  const pwRef = useRef(); //유저가 변경할 비밀번호
  const pw2Ref = useRef(); //유저가 변경할 비밀번호 확인
  const postNumRef = useRef(); // 유저 우편번호 불러오기
  const userAddRef = useRef(); // 유저 주소 불러오기
  const addDetailRef = useRef(); // 사용자 상세주소 불러오기

  const [show, setShow] = useState(false); //모달창 활성화 state
  const [isOpenPost, setIsOpenPost] = useState(false);

  // 모달 show 함수
  const handleShow = () => setShow(true);
  // 모달 닫기 함수
  const handleClose = () => {
    setShow(false);
    addDetailRef.current.focus();
  };

  //모달창 스타일
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
    setIsOpenPost(false);
    handleClose();
    postNumRef.current.value = data.zonecode; // 우편번호
    userAddRef.current.value = fullAddr; // 주소 입력창
  };

  /**개인정보 수정 함수*/
  const changeUserData = () => {
    // 현재 비밀번호를 적은 걸 다시 hash 암호화 해서 DB 것과 비교하기
    axios.post("/user/mypage", {userID : id})
    .then((res) => {
      let userEmail = emailRef.current.value  // 입력한 이메일 (DB로 감)
      let userPhone = phoneRef.current.value // 입력한 전화번호 (DB로 감)
      let postNum = postNumRef.current.value // 입력한 우편번호 (DB로 감)
      let addr1 = userAddRef.current.value // 입력한 주소 (DB로 감)
      let addr2 = addDetailRef.current.value // 입력한 상세주소 (DB로 감)
      let changePw = pwRef.current.value // 변경할 비밀번호 (DB로 감)
      let checkPw = pw2Ref.current.value // 변경할 비밀번호 확인

      let userPw = res.data.user_pw // DB에서 온 비밀번호 (암호화 됨)
      let currentPw = C_pwRef.current.value // 현재 비밀번호 입력값 (SHA2로 256비트 암호화 해야함)
      currentPw = SHA256(currentPw).toString(); // 현재 비밀번호 입력값 암호화
      if(userPw === currentPw && changePw === checkPw){ // 현재 비밀번호 정확 & 변경할 비밀번호, 확인 일치하는지
        console.log("업데이트 준비 완료");
        axios.post("user/updateInfo", {
          userID : id,
          userPw : changePw,
          userEmail : userEmail,
          userPhone : userPhone,
          postNum : postNum,
          addr1 : addr1,
          addr2 : addr2
        })
        .then((res) => {
          if(res.data.result){
            alert("수정 완료!")
            navigate("/mypage");
          }
        })
      }

    })
      

    
  };

  // 23-11-14 14:20 임휘훈 작성
  /** 내 정보 수정 입력란 회원 정보 자동 입력 후 비활성화 */
  useEffect(() => {
    if (loginType === "M") {
      idRef.current.value = id;
    } else if (loginType === "G") {
      idRef.current.value = "Google Account";
    } else if (loginType === "N") {
      idRef.current.value = "Naver Account";
    } else if (loginType === "K") {
      idRef.current.value = "Kakao Account";
    }
    idRef.current.disabled = true; // 입력란 비활성화
    nameRef.current.value = userName; // 이름
    nameRef.current.disabled = true; // 입력란 비활성화
    emailRef.current.value = email; // 이메일
    phoneRef.current.value = phone; // 전화번호
    postNumRef.current.value = postNumber; // 우편번호
    userAddRef.current.value = address; // 주소 입력창 
    addDetailRef.current.value = addressDetail; // 상세주소
  }, [email, phone]);
  // 임휘훈 작성 끝

  return (
    <div className="UserInfo">
      <h3>내 정보 수정</h3>
      <div className="UserInfo-elementbox">
        <Form>
          <Form.Group className="mb-3 mt-3" controlId="formBasicName">
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" placeholder="Enter ID" ref={idRef} />
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
            <Form.Label>변경할 비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              ref={pwRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword2">
            <Form.Label>변경할 비밀번호 확인</Form.Label>
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
                  <Modal.Header>
                    <Modal.Title>주소</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {isOpenPost ? (
                      <div
                        className="Add-api"
                        style={{ display: "flex", justifyContent: "center" }}
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
                  ref={postNumRef}
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
                  ref={userAddRef}
                  onClick={() => {
                    handleShow();
                    onChangeOpenPost();
                  }}
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAdressDetail">
            <Form.Control type="text" placeholder="상세주소" ref={addDetailRef} />
          </Form.Group>
          <div className="mb-3 userInfo-btn">
            <Button className="Change-Btn" variant="outline-info" onClick={changeUserData}>
              수정완료
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UserInfo;
