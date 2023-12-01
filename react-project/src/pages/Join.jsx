import React, { useEffect, useRef, useState } from "react";
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
  const pwTextRef = useRef() // 비밀번호 span
  const pw2TextRef = useRef() // 비밀번호 확인 span
  const [show, setShow] = useState(false); // true : 모달보임 / false : 모달 안보임

  /** 모달 닫는 함수 */
  const handleClose = () => {
    setShow(false);
    addDetail.current.focus();
  };
  /** 모달 보여지게 하는 함수 */
  const handleShow = () => setShow(true);
  const [text, setText] = useState("");
  const [pwText, setPwText] = useState("");
  const [pw2Text, setPw2Text] = useState("")

  // 2023-11-13 09:20 임휘훈 작성
  const navigate = useNavigate();
  const [isCheck, setIsCheck] = useState(false);
  // 임휘훈 작성 :  한글, 영어, 숫자, 특수문자 구분 정규식 모음
  let checkEngA = /[A-Z]/;
  let checkSpc = /[~!@#$%^&*()_+|<>?:{}]/;
  let checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  /** 회원가입 버튼 */
  const join_btn = (e) => {
    e.preventDefault();
    if (isCheck) {
      if(pwRef.current.value.length >= 8 &&
        pwRef.current.value.length <= 16
        ){
          if (pwRef.current.value === pw2Ref.current.value) {
            setPwText("");
            pw2TextRef.current.style = "color:gray";
            setPw2Text("※ 사용가능한 비밀번호 입니다.");
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
          } else{
            pw2TextRef.current.style = "color:red";
            setPw2Text("※ 비밀번호가 일치히지 않습니다.");
          }
        } else{
          pwTextRef.current.style = "color:red";
          setPwText("※ 비밀번호는 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.");
        }
    } else {
      spanRef.current.style = "color:red";
      setText("※ 중복체크를 해주세요.");
    }
  };
  // 임휘훈 작성 끝

  // 23-11-23 임휘훈 작성 : 아이디 비밀번호 유효성 검사 (정규식)
  /**중복체크 함수*/
  const checkId = () => {
    // 데이터 전송
    if (idRef.current.value !== "") {
      if(idRef.current.value.length >= 5 && 
        idRef.current.value.length <= 20 && 
        !checkEngA.test(idRef.current.value) && 
        !checkSpc.test(idRef.current.value) && 
        !checkKor.test(idRef.current.value)){
        axios
          .post("/user/checkId", {
            id: idRef.current.value,
          })
          .then((res) => {
            if (res.data === true) {
              // idRef.current.disabled = true;
              spanRef.current.style = "color:gray";
              setText("※ 사용 가능한 ID 입니다.");
              setIsCheck(true);
            } else {
              idRef.current.value = "";
              idRef.current.focus();
              spanRef.current.style = "color:red";
              setText(
                "※ 사용 불가능한 ID 입니다. 다른 ID를 입력해주세요."
              );
              setIsCheck(false);
            }
          });
      } else {// 아이디 길이 조건 X
        idRef.current.focus();
        spanRef.current.style = "color:red";
        setText("※ ID는 5 ~ 20자의 영문 소문자, 숫자와 특수기호(_), (-)만 사용가능합니다.");
      }
    }else{
      // 아이디 칸이 빈칸일때 231110 14:10 추가 -임휘훈-
      idRef.current.focus();
      spanRef.current.style = "color:red";
      setText("※ ID를 입력해주세요.");
    }
  };
  // 아이디 중복체크 함수 끝

  // 23-11-22 09:36 임휘훈 휴대전화 자동 하이픈 함수 작성
  // 전화번호 state
  const [valuse, setValues] = useState({
    numberValue : ""
  })
  const {numberValue} = valuse;

  /** 전화번호 작성 감지 */
  const handleNumber = (e) => {
    const {value, name} = e.target; // 전화번호 input창의 입력값과 name속성
    setValues({
      [name] : value, // 대괄호를 통해 키값을 적어주는 것은 변수를 선언하고 그 실제값을 불러오기 위해서 사용 => 키값이 변해야 할 때 사용
    })
  }

  /** 휴대전화 자동 하이픈 useEffect */
  useEffect(() => {
    if(numberValue.length === 11){ // 하이픈 없이 번호만 입력한 경우
      setValues({
        numberValue : numberValue.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') // 정규식
      })
    } else if (numberValue.length >= 13){
      setValues({
        numberValue : numberValue
        // 사용자가 직접 하이픈 입력해서 전화번호 작성시 하이픈 공백으로 변하고 자동 하이픈으로 변경함
        .replace(/-/g, '')
        .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
      })
    }
  }, [numberValue])

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
    setAddress(data.zonecode);
    setAddressDetail(fullAddr);
    setIsOpenPost(false);
    handleClose();
    postNum.current.value = data.zonecode; // 우편번호
    userAdd.current.value = fullAddr;
  };

  return (
    <div  className="JoinInfo">
      <Container className="d-flex justify-content-center align-items-center mt-5">
        <div style={{ width: "500px" }}>
          <Form>
            <Form.Group  className="mb-4 join-title">
              <h2>회원가입</h2>
            </Form.Group>
            <Form.Group className="mb-3 mt-5" controlId="formBasicId">
              <Form.Label>* ID</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Enter ID"
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
            <div className="d-grid gap mb-3">
              <span ref={pwTextRef}> {pwText}</span>
            </div>
            <Form.Group className="mb-3" controlId="formBasicPassword2">
              <Form.Label>* 비밀번호 확인</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                ref={pw2Ref}
                required
              />
            </Form.Group>
            <div className="d-grid gap mb-3">
              <span ref={pw2TextRef}> {pw2Text}</span>
            </div>
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
                name="numberValue"
                value={numberValue || ""}
                required
                ref={numberRef}
                onChange={handleNumber}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAdressNum">
              <Row>
                <Form.Label onClick={(e) => e.preventDefault()}>
                  주소
                </Form.Label>
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
            <Form.Group className="mb-4" controlId="formBasicAdressDetail">
              <Form.Control
                type="text"
                placeholder="상세주소"
                ref={addDetail}
              />
            </Form.Group>
            <div className="d-grid gap mb-5">
              <Button
                className="Button-search same-BTN"
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
