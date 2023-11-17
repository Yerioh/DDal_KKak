import React, { useEffect, useState } from "react";
import "../css/Imagelayout.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PageCountButton from "./PageCountButton";
import Keyword from "./Keyword";
import { Link } from "react-router-dom";
import axios from "../axios";
import axiosProgress from "../axiosProgress";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import { ProgressReducerActions } from "../redux/reducers/progressSlice";
import { useNavigate } from "react-router-dom";
import Sample from "../img/guideSample_dog.jpeg";
import Arrow from "../img/rightArrow.png";

// CreateImage 컴포넌트 정의
const CreateImage = () => {
  // 23-11-15 오후 17:00 박지훈 작성
  // 긍정 프롬프트
  const [positivePrompt, setPositivePrompt] = useState("");
  // 부정 프롬프트
  const [negativePrompt, setNegativePrompt] = useState("");
  // 출력할 사진 개수
  const [countImg, setCountImg] = useState("1");
  const [guideModalOpen, setguideModalOpen] = useState(false);

  // axios 진행률(0~100)
  const progress = useSelector((state) => state.progress.progress);
  // 이미지 생성 진행상황 (true, false)
  const isLoading = useSelector((state) => state.progress.isLoading);

  const [imgData, setImgData] = useState([]);

  const dispatch = useDispatch();

  // 키워드 모달 상태 변경을 처리하는 함수
  const handleKeyWordModalChange = () => {
    // 모달 상태에 따른 추가적인 작업 (예: 모달 상태를 다른 state에 저장하는 등)
  };

  // 체크박스 입력 버튼
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    // 체크된 경우 값 추가
    if (checked) {
      setPositivePrompt((prev) => [...prev, value]);
    }
    // 체크 해제된 경우 값 제거
    else {
      setPositivePrompt((prev) => prev.filter((item) => item !== value));
    }
  };

  // 모달을 열기 위한 함수
  const openGuideModal = () => setguideModalOpen(true);

  // 모달을 닫기 위한 함수
  const closeGuideModal = () => setguideModalOpen(false);

  // 23-11-15 오후 17:00 박지훈 작성
  // 이미지 생성 버튼 클릭
  const createImg = () => {
    // 긍정 프롬프트 공백 아닐 때 실행
    if (positivePrompt !== "") {
      axiosProgress
        .post("/imgCreate/stable", {
          positivePrompt: positivePrompt,
          negativePrompt: negativePrompt,
          countImg: countImg,
        })
        .then((res) => {
          let data = res.data;
          console.log("생성된 이미지", data);

          // axios 통신 중, 에러 발생 시
          if (data.createError) {
            dispatch(ProgressReducerActions.resetProgress());
            alert(
              "이미지 생성 서버가 불안정합니다. 잠시 후 다시 시도해주세요."
            );
          }
          if (data.imgData.img_data !== undefined) {
            setImgData(data.imgData.img_data);
          }
        })
        .then((res) => {
          let data = res.data;
          console.log("생성된 이미지", data);
          setImgData(data.imgData.img_data);
          // axios 통신 중, 에러 발생 시
          if (data.createError) {
            dispatch(ProgressReducerActions.resetProgress());
            alert(
              "이미지 생성 서버가 불안정합니다. 잠시 후 다시 시도해주세요."
            );
          }
          console.log("then", progress);
        });
    }
  };

  //23-11-16 오전 9:36 나범수 navigate 추가 -> 페이지 개수 전달 위함.
  const navigate = useNavigate();

  // 2023.11.16 이미지 출력 결과 페이지로이동하는 함수. 페이지 개수 전달하고자 useNavigate 추가
  const goToResultPage = () => {
    console.log("Navigating with imageCount:", countImg);
    setTimeout(
      navigate("/image-result", {
        state: {
          countImg: countImg,
          imgData: imgData,
          positivePrompt: positivePrompt,
          negativePrompt: negativePrompt,
        },
      }),
      3000
    );
  };

  const handleImageCountChange = (count) => {
    setCountImg(count);
  };

  // progressBar 100%, 로딩 완료시 이미지 생성 결과 사이트로 이동
  useEffect(() => {
    if (progress === 100 && !isLoading) {
      console.log("이미지 생성 완료");
      // 이미지 생성 결과 사이트로 이동
      goToResultPage();
    }
  }, [progress, isLoading]);

  return (
    // 이미지 생성페이지 전체
    <div className="creImg_body">
      <div className="imgtopbody">
        <div className="prompt_container">
          {/* 긍정 키워드 입력 구역  */}
          <div className="keyword">
            <h3 className="postive_head">
              넣을 단어{" "}
              <button className="guide-button btnmy" onClick={openGuideModal}>
                가이드
              </button>{" "}
            </h3>
            {/* <Progress progress={75} /> */}

            <Form.Label></Form.Label>
            <textarea
              type="text"
              // 키워드 프롬포트 입력창
              className="prompt-input"
              value={positivePrompt} // 적용되는 키워드
              onChange={(e) => setPositivePrompt(e.target.value)}
              id="inputPrompt" // 입력 값으로 사용될 state
              placeholder="키워드를 입력해주세요"
              spellCheck="false"
            />

            {/* 키워드 버튼 창 */}
            <Keyword
              handleCheckboxChange={handleCheckboxChange}
              onModalChange={handleKeyWordModalChange}
            />
          </div>

          {/* 부정 키워드 입력  */}
          <div className="negative_keyword">
            <h3>뺄 단어</h3>
            <Form.Label></Form.Label>
            <textarea
              type="text"
              className="prompt-input"
              id="exceptPrompt" // 제외되는 키워드 입력창
              value={negativePrompt} // 적용되는 키워드
              onChange={(e) => setNegativePrompt(e.target.value)}
              placeholder="제외하고 싶은 키워드를 입력해주세요"
            />
          </div>

          {/* 페이지 옵션 선택 창, 페이지 출력 갯수, */}
          <div className="creImg_side">
            <div id="pageCount">
              <PageCountButton
                setCountImg={setCountImg}
                handleImageCountChange={handleImageCountChange}
              />
            </div>
          </div>
          <div className="gotoeditpage">
            <ProgressBar
              className="progress-bar"
              completed={progress}
              maxCompleted={100}
            />
            {/* <Link to='/image-edit'> */}
            <button className="creImg_gotobutton btn" onClick={createImg}>
              딸-깍!
            </button>
            {/* </Link> */}
          </div>
          {/*가이드 모달 창*/}
          {guideModalOpen && (
            <div
              className={"guidemodal-container"}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  closeGuideModal();
                }
              }}
            >
              <div className={"guidemodal-content"}>
                <div className={"modal-guide"}>
                  {/* // 이미지 작성가이드 모달창 */}
                  <Button
                    variant="light"
                    style={{
                      disabled: "true",
                      position: "relative",
                      left: "10%",
                      width: "1100px",
                    }}
                  >
                    이미지를 생성하는 방법
                  </Button>{" "}
                </div>
                <div className={"guidemodal-body"}>
                  <div className="guidemodal-body2">
                    <div className="guide-keyword">
                      <h1>생성 키워드 입력</h1>
                      <Form.Control
                        type="text"
                        value={"강아지,실사체,귀접힘"}
                        readOnly={true}
                      />
                      <h1 style={{ "margin-top": "10%" }}>제외 키워드 입력</h1>
                      <Form.Control
                        type="text"
                        value={"컬러, 몸통"}
                        readOnly={true}
                        style={{ "margin-bottom": "10%" }}
                      />
                      <div className="guide-manual">
                        <p>1. 생성키워드에 만들고 싶은 단어를 입력하세요!</p>
                        <p>2. 제외키워드에 빼고 싶은 단어를 입력하세요!</p>
                        <p>
                          3. 이미지생성! 버튼을 클릭하면 이미지가 생성됩니다.
                        </p>
                      </div>
                    </div>
                  </div>
                  <img src={Arrow} alt="" style={{ width: "30%" }} />
                  <img
                    src={Sample}
                    alt=""
                    style={{
                      width: "30%",
                      height: "90%",
                      "margin-top": "20px",
                    }}
                  />
                </div>
                <button
                  className={"modal-close-btn btnmy"}
                  onClick={closeGuideModal}
                >
                  모달 닫기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateImage;
