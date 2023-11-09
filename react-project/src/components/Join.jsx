import React, { useRef, useState } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import axios from "../axios";
import DaumPostcode from "react-daum-postcode";
import "../css/Join.css";

const Join = () => {
  const idRef = useRef();
  const pwRef = useRef();
  const pw2Ref = useRef();
  const spanRef = useRef();
  const span2Ref = useRef();
  const userAdd = useRef();
  const postNum = useRef();
  const addDetail = useRef();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    addDetail.current.focus();
  };
  const handleShow = () => setShow(true);
  const [text, setText] = useState("");

  //중복체크 함수
  // const checkId = () => {
  //   console.log("사용자 입력 아이디", idRef.current.value);

  //   if (idRef.current.value !== "") {
  //     // 데이터 전송
  //     axios
  //       .post("/user/checkId", {
  //         id: idRef.current.value,
  //       })
  //       .then((res) => {
  //         console.log("중복체크 결과", res.data.result);

  //         if (res.data.result === "uniq") {
  //           idRef.current.disabled = true;
  //           spanRef.current.style = "color:gray";
  //           setText("※ 사용 가능한 아이디 입니다.");
  //         } else {
  //           idRef.current.value = "";
  //           idRef.current.focus();
  //           spanRef.current.style = "color:red";
  //           setText(
  //             "※ 사용 불가능한 아이디 입니다. 다른 아이디를 입력해주세요."
  //           );
  //         }
  //       });
  //   }
  // };
  const [address, setAddress] = useState(""); // 주소
  const [addressDetail, setAddressDetail] = useState(""); // 상세주소

  const [isOpenPost, setIsOpenPost] = useState(false);
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
    userAdd.current.value = fullAddr;
    userAdd.current.disabled = true;
  };
  console.log(address, addressDetail);
  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <div style={{ width: "500px" }}>
          <Form>
            <Form.Group>
              <h2>회원가입</h2>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicId">
              <Form.Label>* ID</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Enter Id"
                    ref={idRef}
                  />
                </Col>
                <Col md={3}>
                  <Button
                    style={{ width: "100%" }}
                    variant="light"
                    // onClick={checkId}
                  >
                    중복체크
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>

          <div className="d-grid gap mb-3">
            <span ref={spanRef}> {text}</span>
          </div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>* 이메일</Form.Label>
            <Form.Control type="text" placeholder="Enter Email Address" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword1">
            <Form.Label>* 비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              ref={pwRef}
            />
            <span ref={span2Ref}></span>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword2">
            <Form.Label>* 비밀번호 확인</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              ref={pw2Ref}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>* 이름</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicNum">
            <Form.Label>* 휴대전화</Form.Label>
            <Form.Control type="text" placeholder="Enter Phone Number" />
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
          <Form.Group className="mb-3" controlId="formBasicAdress"></Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAdressDetail">
            <Form.Control type="text" placeholder="상세주소" ref={addDetail} />
          </Form.Group>
          <div className="d-grid gap mb-3">
            <Button
              className="Button-search"
              variant="outline-info"
              type="submit"
            >
              회원가입
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Join;
