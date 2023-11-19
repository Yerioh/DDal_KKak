import React, { useState, useEffect, useRef } from "react";
import "../css/SaveImage.css";
import axios from "../axios";
import ImgModal from "./ImgModal";
import { useSelector } from "react-redux";

const SaveImage = () => {
  const [imgArray, setImgArray] = useState([]); // DB에서 온 이미지 배열
  const [check_Img, setcheck_Img] = useState([]); // 삭제할 이미지를 담는 state
  const [isOpen, setIsOpen] = useState(false); // 모달 상태 State
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 state
  const [testIndex, setTestindex] = useState(null); // map함수에서 사용된 index 담는 state
  const [selectAll, setSelectAll] = useState(false); // 전체 선택 상태 관리
  const [selectedImages, setSelectedImages] = useState({}); //체크표시 요소관리 state
  const [delImg, setDelImg] = useState(false); //삭제 모달 상태 state

  const useId = useSelector((state) => state.session.id);

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
            console.log(image.dataset.src);
            // 이미지 로드 완료시 실행될 함수
            image.onload = () => {
              setIsLoading(false); // 이미지 로드 완료 후 로딩 상태를 false로 변경
            };

            observer.current.unobserve(card); // 이미지 로드 후 더 이상 해당 카드를 관찰하지 않음
          }
        });
      },
      {
        rootMargin: "0px", // 뷰포트의 여백을 -100px로 설정
        threshold: 0.1, // 10% 요소가 보일 때 콜백 함수 실행
      }
    )
  );

  // 각 이미지의 체크박스 상태 변경 함수
  const handleCheckboxChange = (imageId, isChecked) => {
    setSelectedImages((prev) => ({
      ...prev,
      [imageId]: isChecked,
    }));
  };

  // 체크박스 핸들러
  useEffect(() => {
    const newSelectedImages = {};
    imgArray.forEach((_, index) => {
      newSelectedImages[index] = selectAll;
    });
    setSelectedImages(newSelectedImages);
  }, [selectAll]);
  console.log("체크표시 요소", selectedImages);

  // 각 이미지 렌더링 함수 / 내 저장 이미지 불러오기 함수
  // 23-11-17 15:16 임휘훈 작성 DB에 저장된 이미지 정보 불러오기
  useEffect(() => {
    axios.post("/imgCreate/myimg", { id: useId, sort: "a" }).then((res) => {
      console.log("DB 이미지 프론트로", res.data.imgArray);
      setImgArray(res.data.imgArray);
    });
    // 임휘훈 작성 끝
    const currentObserver = observer.current;
    const cards = document.querySelectorAll(".SImage-Card");

    cards.forEach((card) => currentObserver.observe(card));

    return () => {
      cards.forEach((card) => currentObserver.unobserve(card));
    };
  }, []);

  /**모달 열고 닫는 상태 함수*/
  const openModalHandler = (index) => {
    // isOpen의 상태를 변경하는 메소드를 구현
    // !false -> !true -> !false
    setIsOpen((prevIsOpen) => !prevIsOpen);
    console.log("이미지 모달", isOpen);
    setTestindex(index);
    console.log("인덱스", index);
  };

  /**삭제하시겠습니까? 모달 호출*/
  const delImg_Btn = () => {
    const isSelected = Object.values(selectedImages).some(
      (value) => value === true
    );

    if (isSelected) {
      setDelImg(!delImg);
      console.log("삭제 모달", delImg);
    } else {
      alert("삭제하려는 이미지를 선택해주세요");
    }
  };

  /**체크된 이미지 URL 업데이트 함수*/
  const updateCheckedImages = () => {
    const checkedImages = imgArray
      .filter((_, index) => selectedImages[index])
      .map((item) => item.url); // 체크된 이미지들의 URL만 추출
    setcheck_Img(checkedImages);
  };

  /** 전체 선택 함수 */
  const handleSelectAllChange = (e) => {
    console.log("전체 선택 함수 작성 필요");
    setSelectAll(e.target.checked);
  };

  /**삭제 버튼 클릭 시 체크된 이미지 URL 변수 업데이트*/
  const handleDeleteClick = () => {
    updateCheckedImages(); //함수 호출로 체크된 이미지 확인
    console.log("삭제될 데이터", check_Img);
    // 이후 삭제 로직 구현
    // -------------------------------------
    // (임휘훈 여기에 삭제 로직을 적어라 - 임휘훈 -)
  };

  /**최신순 정렬 함수*/
  const date_Order = () => {
    axios.post("/imgCreate/myimg", { id: useId, sort: "a" }).then((res) => {
      console.log("DB 이미지 프론트로", res.data.imgArray);
      setImgArray(res.data.imgArray);
    });
  };

  /**오래된순 정렬 함수*/
  const old_Order = () => {
    axios.post("/imgCreate/myimg", { id: useId, sort: "d" }).then((res) => {
      console.log("DB 이미지 프론트로", res.data.imgArray);
      setImgArray(res.data.imgArray);
    });
  };

  return (
    <div className="SaveImage">
      {isLoading && <div className="loading-indicator">로딩 중...</div>}
      <h3>내 저장 이미지</h3>

      <div className="S-Imenu">
        <div className="check-box">
          <input
            type="checkbox"
            id="check"
            checked={selectAll}
            onChange={handleSelectAllChange}
          />
          <label className="main_check_label" htmlFor="check"></label>
          <span>전체선택</span>
          <button className="Del-Btn" onClick={delImg_Btn}>
            삭제
          </button>{" "}
          {/* 삭제 모달 호출 */}
        </div>
        <div className="order-box">
          <span className="old-text" onClick={date_Order}>
            최신순
          </span>
          <span className="order-text" onClick={old_Order}>
            오래된순
          </span>
        </div>
      </div>

      <div className="S-Ibox">
        {imgArray.map((image, index) => (
          <div
            className="SImage-Card me-4"
            key={index}
            onClick={() => openModalHandler(index)}
          >
            {/* data-src 속성에 실제 이미지 URL을 지정 */}
            <img
              className="img-thumb"
              data-src={`${process.env.REACT_APP_AWS_BUCKET_URL}/${image?.IMG_URL}`}
              src={`${process.env.REACT_APP_AWS_BUCKET_URL}/${image?.IMG_URL}`}
              alt={`Image ${index}`}
            />
            <div className="SI-At">
              <input
                type="checkbox"
                id={`check${index}`}
                checked={selectedImages[index]}
                onChange={(e) => handleCheckboxChange(index, e.target.checked)}
              />
              <label className="check_label" htmlFor={`check${index}`}></label>
              <span>{image?.DATE}</span>
            </div>
          </div>
        ))}
        {isOpen && (
          <ImgModal
            isOpen={isOpen}
            openModalHandler={openModalHandler}
            ImgArray={imgArray}
            index={testIndex}
          />
        )}
      </div>

      {delImg ? (
        <div className="modal-backdrop">
          <div className="Img-Del-box">
            <div className="Img-Del-text">
              <span className="red-text">삭제</span>
              <span>하시겠습니까?</span>
            </div>
            <div className="Img-Del-Btn">
              <button className="del-Btn" onClick={handleDeleteClick}>
                삭제
              </button>
              <button className="del-close-btn" onClick={delImg_Btn}>
                닫기
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SaveImage;
