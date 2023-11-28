import React, { useEffect, useState } from "react";
import "../css/Imagelayout.css";
import Form from "react-bootstrap/Form";
import PageCountButton from "../components/PageCountButton";
import Keyword from "../components/Keyword";
import axiosProgress from "../axiosProgress";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import { ProgressReducerActions } from "../redux/reducers/progressSlice";
import { useNavigate } from "react-router-dom";
import qMark from "../img/question-mark.png";
import { socket } from "../socket";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "../axios";


// CreateImage 컴포넌트 정의
const CreateImage = () => {
  // 23-11-15 오후 17:00 박지훈 작성
  // 긍정 프롬프트
  const [positivePrompt, setPositivePrompt] = useState("");
  const [positiveKeyword, setPositiveKeyword] = useState([]);

  // 부정 프롬프트
  const [negativePrompt, setNegativePrompt] = useState("");

  // 출력할 사진 개수
  const [countImg, setCountImg] = useState("1");
  const [guideModalOpen, setguideModalOpen] = useState(false);

  // "딸-깍! 버튼 상태
  const [btnHidden, setBtnHidden] = useState("");

  // axios 진행률(0~100)
  const progress = useSelector((state) => state.progress.progress);
  // 이미지 생성 진행상황 (true, false)
  const isLoading = useSelector((state) => state.progress.isLoading);

  const [imgData, setImgData] = useState([]);

  const dispatch = useDispatch();

  // 모달을 열기 위한 함수
  const openGuideModal = () => setguideModalOpen(true);

  // 모달을 닫기 위한 함수
  const closeGuideModal = () => setguideModalOpen(false);

  // 유저 아이디
  const userId = useSelector((state) => state.session.id);
  const [createList, setCreateList] = useState([]);
  // 이미지 생성 상태 state
  const [creating, setCreating] = useState(false);

  const [isConnected, setIsConnected] = useState(socket.connected);

  // 이미지 대기 리스트 최신화
  useEffect(() => {
    if (createList.length !== 0) {
      // 대기열 0번째 인덱스와 실행한 유저 ID가 같고, 이미지가 생성중이지 않을 때 실행
      if (createList[0].MEMBER_ID === userId && !creating) {
        // 긍정 프롬프트 공백 아닐 때 실행
        if (positivePrompt !== "" && negativePrompt !== "") {
          setBtnHidden("hidden");
          // 이미지 생성중 상태로 변경
          setCreating(true);
          axiosProgress
            .post("/imgCreate/stable", {
              positivePrompt: positivePrompt + positiveKeyword.join(""), // 긍정프롬프트 + 키워드
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
            });
        } else {
          alert("긍정, 부정 프롬프트를 입력해주세요.");
        }
      }
    }
  }, [createList]);

  // socket 연결 useEffect
  useEffect(() => {
    axios.post('/socket/createList')
      .then(res=>{
        setCreateList(res.data.result)
      })


    // 소켓 연결
    socket.connect();
    // 이미지 생성 대기열 변경
    socket.on("createNewList", (data) => {
      setCreateList(data.createList);
    });
    return () => {};
  }, []);

  // 23-11-20 오후 17:00 박지훈 작성
  // 이미지 생성 버튼 클릭
  const createImg = () => {
    // 사용자 아이디 전송해서 대기열에 추가
    console.log("딸깍 버튼");
    socket.emit("createClick", { id: userId });
  };

  //23-11-16 오전 9:36 나범수 navigate 추가 -> 페이지 개수 전달 위함.
  const navigate = useNavigate();

  // 2023.11.20 이미지 출력 결과 페이지로이동하는 함수. 페이지 개수 전달하고자 useNavigate 추가 -박지훈-
  const goToResultPage = () => {
    // 이미지 생성 state 변경(종료)
    setCreating(false);
    socket.emit("deQueue", { id: userId });
    // socket.disconnect();
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
    // dispatch(ProgressReducerActions.resetProgress());
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

  //  모달 슬라이드바 다음페이지 이동 화살표
  const NextArrow = ({ onClick }) => {
    // props로 onClick을 전달해줘야 한다.
    return (
      <button
        onClick={onClick}
        type="button"
        style={{
          display: "block",
          background: "red",
          width: "15%",
          height: "10%",
          position: "absolute",
          right: '-1%',
          bottom: '50%',
          zIndex: "10",
          border: "none",
          background: "none",
        }}
      >
        <img
          src="./images/modalrightArrow.png"
          alt="left"
          style={{ width: "100%", objectFit: "cover" }}
        />
      </button>
    );
  };
  //  모달 슬라이드바 이전페이지 이동 화살표
  const PrevArrow = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        type="button"
        style={{
          display: "block",
          width: "15%",
          height: "10%",
          position: "absolute",
          bottom: "50%",
          zIndex: "10",
          // marginLeft: "5%",
          border: "none",
          background: "none",
        }}
      >
        <img
          src="./images/modalleftArrow.png"
          alt="left"
          style={{ width: "100%", objectFit: "cover" }}
        />
      </button>
    );
  };

  // 가이드 모달 슬라이드 배너
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />, // 화살표 버튼을 커스텀해서 사용
    prevArrow: <PrevArrow />,
  };

  return (
    // 이미지 생성페이지 전체
    <div className="creImg_body">
      <h3>대기인원 : {createList.length}명</h3>
      <div className="imgtopbody">
        <div className="prompt_container">
          {/* 긍정 키워드 입력 구역  */}
          <div className="keyword">
            <h3 className="postive_head">
              핵심 키워드{" "}
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
              setPositiveKeyword={setPositiveKeyword}
              positiveKeyword={positiveKeyword}
            />
          </div>
          {/* 부정 키워드 입력  */}
          <div className="negative_keyword">
            <h3> 제외 키워드</h3>
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
              height={"38px"}
              borderRadius={"5px"}
            />
            {/* <Link to='/image-edit'> */}
            <button
              className={`creImg_gotobutton same-BTN btn ${btnHidden}`}
              onClick={createImg}
            >
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
            <h2 style={{ margin: " 5% auto 0" }}>어떻게 만들까요?</h2>
            <div className="guidemodal-content">
              <Slider {...settings}>
                <div>
                  <div className="guidemodal-guideinfo">
                    <img
                      src={"./images/inputguide.png"}
                      alt=""
                      className="guidemodal-guideinfo-img"
                    />
                    <div className="guidemodal-guideinfo-info" >
                      <span>
                        만들고 싶은 이미지와 관련된 단어나 문장을{" "}
                        <span className="bold">"핵심 키워드"</span>에
                        입력해주세요.
                      </span>
                    </div>
                  </div>
                </div>
                <div className="guidemodal-guideinfo">
                  <img
                    src={"./images/samplekeyword.png"}
                    alt=""
                    className="guidemodal-guideinfo-img"
                  />
                  <div className="guidemodal-guideinfo-info " >
                    <span>
                      어떻게 써야할지 어렵나요?<br/>
                      <span> 저희가{" "} <span className="bold">키워드</span>를 준비했어요.</span>
                      <br/>키워드를 클릭! 클릭!
                    </span>
                    
                  </div>
                </div>
                <div className="guidemodal-guideinfo"  >
                  <img
                    src={"./images/guidenegative.png"}
                    alt=""
                    className="guidemodal-guideinfo-img"
                  />
                  <div className="guidemodal-guideinfo-info" >
                    <span>
                      넣고 싶지 않은게 있나요?{" "}<br/> 그렇다면{" "} 
                      <span className="bold">"제외 키워드"</span>에 관련 단어나
                      문장을 넣어봐요.
                    </span>
                  </div>
                </div>
                <div className="guidemodal-guideinfo">
                  <img
                    src={"./images/DDALKKAK.png"}
                    alt=""
                    className="guidemodal-guideinfo-img"
                  />
                  <div
                    className="guidemodal-guideinfo-info"
                    style={{marginTop:'15%'}}
                  >
                    <span>만들 이미지의 수를 선택! <br/>
                      마지막으로 <span className="bold">"딸-깍!"</span>{" "}
                      <span>어때요? 참 쉽죠?</span>
                    </span>
                  </div>
                </div>
              </Slider>
            </div>

            <div className="guidemodal-footer">
              <button
                className="btnmy same-BTN"
                onClick={closeGuideModal}
                zIndex = '5'
              >
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
