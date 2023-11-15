import React, { useRef, useState } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import axios from "../axios";
import DaumPostcode from "react-daum-postcode";
import "../css/Join.css";
import { useNavigate } from "react-router-dom";

const Join = () => {
  const idRef = useRef(); // 아이디
  const pwRef = useRef(); // 비밀번호
  const pw2Ref = useRef(); // 비밀번호 확인
  const nameRef = useRef(); // 이름
  const emailRef = useRef(); // 이메일
  const numberRef = useRef(); // 휴대전화
  const spanRef = useRef(); // 중복체크 text
  const userAdd = useRef(); // 주소
  const postNum = useRef(); // 우편번호
  const addDetail = useRef(); // 상세주소
  const [show, setShow] = useState(false); // true : 모달보임 / false : 모달 안보임

  /** 모달 닫는 함수 */
  const handleClose = () => {
    setShow(false);
    addDetail.current.focus();
  };
  /** 모달 보여지게 하는 함수 */
  const handleShow = () => setShow(true);
  const [text, setText] = useState("");

  // 2023-11-13 09:20 임휘훈 작성
  const navigate = useNavigate();
  const [isCheck, setIsCheck] = useState(false);
  /** 회원가입 버튼 */
  const join_btn = (e) => {
    e.preventDefault();
    if (isCheck) {
      if (pwRef.current.value == pw2Ref.current.value) {
        console.log("회원가입 라우터로 이동");
        axios
          .post("/user/join", {
            userId: idRef.current.value, // 아이디
            userPw: pwRef.current.value, // 비밀번호
            checkPw: pw2Ref.current.value, // 비밀번호 확인
            userName: nameRef.current.value, // 이름
            useremail: emailRef.current.value, // 이메일
            phone: numberRef.current.value, // 전화번호
            postNumber: postNum.current.value, // 우편번호
            doro: userAdd.current.value, // 도로명주소
            detailAddress: addDetail.current.value, // 상세주소
          })
          .then((res) => {
            let data = res.data;
            if (data) {
              // data == true 회원가입 성공시
              navigate("/");
            }
          });
      }
    } else {
      spanRef.current.style = "color:red";
      setText("※ 중복체크 하시길바랍니다.");
    }
  };
  // 임휘훈 작성 끝

  /**중복체크 함수*/
  const checkId = () => {
    console.log("사용자 입력 아이디", idRef.current.value);
    // 데이터 전송
    if (idRef.current.value !== "") {
      axios
        .post("/user/checkId", {
          id: idRef.current.value,
        })
        .then((res) => {
          console.log("중복체크 결과", res.data);
          if (res.data === true) {
            idRef.current.disabled = true;
            spanRef.current.style = "color:gray";
            setText("※ 사용 가능한 아이디 입니다.");
            setIsCheck(true);
          } else {
            idRef.current.value = "";
            idRef.current.focus();
            spanRef.current.style = "color:red";
            setText(
              "※ 사용 불가능한 아이디 입니다. 다른 아이디를 입력해주세요."
            );
            setIsCheck(false);
          }
        });
    } else {
      // 아이디 칸이 빈칸일때 231110 14:10 추가 -임휘훈-
      setText("※ 아이디를 입력해주세요.");
      idRef.current.focus();
      spanRef.current.style = "color:red";
    }
  };
  // 아이디 중복체크 함수 끝

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
    postNum.current.value = data.zonecode; // 우편번호
    postNum.current.disabled = true; //우편번호 입력창 비활성화
    userAdd.current.value = fullAddr;
    userAdd.current.disabled = true;
  };
  console.log(address, addressDetail);
  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center ">
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
                    required
                  />
                </Col>
                <Col md={3}>
                  <Button
                    style={{ width: "100%" }}
                    variant="light"
                    onClick={checkId}
                  >
                    중복체크
                  </Button>
                </Col>
              </Row>
            </Form.Group>

            <div className="d-grid gap mb-3">
              <span ref={spanRef}> {text}</span>
            </div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>* 이메일</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Email Address"
                ref={emailRef}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword1">
              <Form.Label>* 비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                ref={pwRef}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword2">
              <Form.Label>* 비밀번호 확인</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                ref={pw2Ref}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>* 이름</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                required
                ref={nameRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicNum">
              <Form.Label>* 휴대전화</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Phone Number"
                required
                ref={numberRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAdressNum">
              <Row>
                <Form.Label onClick={(e) => e.preventDefault()}>
                  주소
                </Form.Label>
                <Col>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
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
            <Form.Group
              className="mb-3"
              controlId="formBasicAdress"
            ></Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAdressDetail">
              <Form.Control
                type="text"
                placeholder="상세주소"
                ref={addDetail}
              />
            </Form.Group>
            <div className="d-grid gap mb-3">
              <Button
                className="Button-search"
                variant="outline-info"
                type="submit"
                onClick={join_btn}
              >
                회원가입
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Join;
