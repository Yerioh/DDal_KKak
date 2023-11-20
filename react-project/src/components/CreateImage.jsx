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
import qMark from "../img/question-mark.png";
import guideKeyboard from "../img/guide-keyboard.png"
import guideClick from "../img/guide-click.png"
import guideBang from "../img/guide-bang.png"

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
      setPositivePrompt((prev) => {
        // 이미 값이 포함되어 있는지 확인
        const valuesArray = prev ? prev.split(', ').filter(Boolean) : [];
        if (!valuesArray.includes(value)) {
          return [...valuesArray, value].join(', ');
        }
        return prev;
      });
    }
    // 체크 해제된 경우 값 제거
    else {
      setPositivePrompt((prev) => {
        const valuesArray = prev.split(', ').filter((item) => item !== value);
        return valuesArray.join(', ');
      });
    }
  };

  // 모달을 열기 위한 함수
  const openGuideModal = () => setguideModalOpen(true);

  // 모달을 닫기 위한 함수
  const closeGuideModal = () => setguideModalOpen(false);

  // 23-11-20 오후 17:00 박지훈 작성
  // 이미지 생성 버튼 클릭
  const createImg = () => {
    // 긍정 프롬프트 공백 아닐 때 실행
    if (positivePrompt !== "") {
      axiosProgress.post("/imgCreate/stable", {
          positivePrompt: positivePrompt,
          negativePrompt: negativePrompt,
          countImg: countImg,
        })       
        .then((res) => {
          let data = res.data;
          console.log("생성된 이미지", data);
          setImgData(data.imgData.img_data);
          // axios 통신 중, 에러 발생 시
          if (data.createError) {
            dispatch(ProgressReducerActions.resetProgress());
            alert("이미지 생성 서버가 불안정합니다. 잠시 후 다시 시도해주세요.");
          }
          if (data.imgData.img_data !== undefined) {
            setImgData(data.imgData.img_data);
          }
        });
    }
  };

  //23-11-16 오전 9:36 나범수 navigate 추가 -> 페이지 개수 전달 위함.
  const navigate = useNavigate();

  // 2023.11.20 이미지 출력 결과 페이지로이동하는 함수. 페이지 개수 전달하고자 useNavigate 추가 -박지훈-
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
    // progress bar 관련 state초기화
    dispatch(ProgressReducerActions.resetProgress())
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
              <img
                src={qMark}
                alt=""
                onClick={openGuideModal}
                className="guide-button"
              />
            </h3>

            <Form.Label></Form.Label>
            <textarea
              type="text"
              // 키워드 프롬포트 입력창
              className="prompt-input"
              value={positivePrompt} // 적용되는 키워드
              onChange={(e) => setPositivePrompt(e.target.value)}
              id="inputPrompt" // 입력 값으로 사용될 state
              placeholder="긍정 프롬프트를 입력해주세요"
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
            <h3> 뺄 단어</h3>
            <Form.Label></Form.Label>
            <textarea
              type="text"
              className="prompt-input"
              id="exceptPrompt" // 제외되는 키워드 입력창
              value={negativePrompt} // 적용되는 키워드
              onChange={(e) => setNegativePrompt(e.target.value)}
              placeholder="부정 프롬프트를 입력해주세요"
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
              height={'38px'}
              borderRadius={'5px'}
            />
            {/* <Link to='/image-edit'> */}
            <button className="creImg_gotobutton btn" onClick={createImg}>
              딸-깍!
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
      {/*가이드 모달 창*/}
      {guideModalOpen && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeGuideModal();
            }
          }}
        >
          <div className="guidemodal-body">
            <h2>어떻게 만들까요?</h2>
            <div className="guidemodal-content">
              <div className="guidemodal-guideinfo">
                <img src={guideKeyboard} alt="" className="guidemodal-guideinfo-img" />
                <div className="guidemodal-guideinfo-info">
                <span>만들고 싶은 이미지와</span>
                <span>관련된 단어나 문장을</span>
                <span><span className="bold">"넣을 단어"</span>에 입력해주세요.</span>
                </div>
              </div>
              <div className="guidemodal-guideinfo">
                <img src={guideBang} alt="" className="guidemodal-guideinfo-img" />
                <div className="guidemodal-guideinfo-info">
                  <span>어떻게 써야할지 어렵나요?</span>
                  <span>저희가 <span className="bold">키워드</span>를 준비했어요.</span>
                  <span>키워드를 클릭! 클릭!</span>
                </div>
              </div>
              <div className="guidemodal-guideinfo">
                <img src={guideKeyboard} alt="" className="guidemodal-guideinfo-img" />
                <div className="guidemodal-guideinfo-info">
                  <span>넣고 싶지 않은게 있나요?</span>
                  <span>그렇다면 <span className="bold">"뺄 단어"</span>에</span>
                  <span>관련 단어나 문장을 넣어봐요.</span>
                </div>
              </div>
              <div className="guidemodal-guideinfo">
                <img src={guideClick} alt="" className="guidemodal-guideinfo-img" />
                <div className="guidemodal-guideinfo-info">
                  <span>만들 이미지의 수를 선택!</span>
                  <span>마지막으로 <span className="bold">"딸-깍!"</span></span>
                  <span>어때요? 참 쉽죠?</span>
                </div>
              </div>
            </div>
            <div className="guidemodal-footer">
              <button className="btnmy" onClick={closeGuideModal}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateImage;
