import React, { useState, useEffect, useRef } from "react";
import "../css/SaveImage.css";
import axios from "../axios";
import ImgModal from "./ImgModal";
import { useSelector } from "react-redux";

const SaveImage = () => {
  const [ImgArray, setImgArray] = useState([]);
  const [isOpen, setIsOpen] = useState(false); //모달 상태 State
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 state
  const [testIndex, setTestindex] = useState(null);
  const userId = useSelector((state) => state.session.id) // reducers에 저장된 userId

  // 23-11-17 14:00 임휘훈 작성 DB에 저장된 내 저장 이미지 가져오기
  useEffect(() => {
    axios.post("/imgCreate/myimg", {id : userId})
    .then((res) => {
      console.log("이미지 배열", res.data.imgArray);
      setImgArray(res.data.imgArray)

    })
  }, [])

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        // entries 배열은 감시 대상 요소들의 상태 변화를 나타냅니다.
        entries.forEach((entry) => {
          // entry가 뷰포트에 들어온 경우 (isIntersecting = true)
          if (entry.isIntersecting) {
            const card = entry.target; // 현재 뷰포트에 들어온 .SImage-Card 요소
            const image = card.querySelector(".img-thumb"); // 해당 카드 내의 이미지 요소

            setIsLoading(true); // 이미지 로딩 시작을 나타내는 상태를 true로 설정

            image.src = image.dataset.src; // data-src 속성에서 실제 이미지 URL로 src 속성 변경

            // 이미지 로드 완료시 실행될 함수
            image.onload = () => {
              setIsLoading(false); // 이미지 로드 완료 후 로딩 상태를 false로 변경
            };

            observer.current.unobserve(card); // 이미지 로드 후 더 이상 해당 카드를 관찰하지 않음
          }
        });
      },
      {
        rootMargin: "-100px", // 뷰포트의 여백을 -100px로 설정
        threshold: 0.1, // 10% 요소가 보일 때 콜백 함수 실행
      }
    )
  );

  useEffect(() => {
    const currentObserver = observer.current;
    const cards = document.querySelectorAll(".SImage-Card");

    cards.forEach((card) => currentObserver.observe(card));

    return () => {
      cards.forEach((card) => currentObserver.unobserve(card));
    };
  }, []);

  const openModalHandler = (index) => {
    // isOpen의 상태를 변경하는 메소드를 구현
    // !false -> !true -> !false
    setIsOpen(!isOpen);
    setTestindex(index);
  };
  // 내 저장 이미지 불러오기 함수
  const CallImg = () => {
    axios.post("", {}).then((res) => {});
  };

  return (
    <div className="SaveImage">
      {isLoading && <div className="loading-indicator">로딩 중...</div>}
      <h1>내 저장 이미지</h1>
      <div className="S-Ibox">
        {ImgArray.map((image, index) => (
          <div
            className="SImage-Card"
            key={index}
            onClick={() => openModalHandler(index)}
          >
            {/* data-src 속성에 실제 이미지 URL을 지정 */}
            <img
              className="img-thumb"
              data-src={image}
              src={`${process.env.REACT_APP_AWS_BUCKET_URL}/${image.IMG_URL}`}
              alt={`Image ${index}`}
            />
          </div>
        ))}
        <ImgModal
          isOpen={isOpen}
          openModalHandler={openModalHandler}
          ImgArray={ImgArray}
          index={testIndex}
        />
      </div>
    </div>
  );
};

export default SaveImage;
