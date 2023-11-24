import React, { useState, useEffect, useRef } from "react";
import "../css/SaveImage.css";
import axios from "../axios";
import ImgModal from "./ImgModal";
import { useSelector } from "react-redux";
import { DeleteObjectsCommand, S3Client } from "@aws-sdk/client-s3";

const SaveImage = () => {
  const [imgArray, setImgArray] = useState([]); // DB에서 온 이미지 배열
  const [check_Img, setcheck_Img] = useState([]); // 삭제할 이미지를 담는 state
  const [isOpen, setIsOpen] = useState(false); // 모달 상태 State
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 state
  const [testIndex, setTestindex] = useState(null); // map함수에서 사용된 index 담는 state
  const [selectAll, setSelectAll] = useState(false); // 전체 선택 상태 관리
  const [selectedImages, setSelectedImages] = useState({}); //체크표시 요소관리 state
  const [delImg, setDelImg] = useState(false); //삭제 모달 상태 state

  // 사용자 아이디
  const userId = useSelector((state) => state.session.id);
  // S3 클라이언트 생성
  const client = new S3Client({
    region: process.env.REACT_APP_AWS_DEFAULT_REGION,
    credentials: {
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    },
  });

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

  // 전체선택 핸들러
  useEffect(() => {
    const newSelectedImages = {};
    imgArray.forEach((_, index) => {
      newSelectedImages[index] = selectAll;
    });
    setSelectedImages(newSelectedImages);
  }, [selectAll]);

  // 각 이미지 렌더링 함수 / 내 저장 이미지 불러오기 함수
  // 23-11-17 15:16 임휘훈 작성 DB에 저장된 이미지 정보 불러오기
  useEffect(() => {
    axios.post("/imgCreate/myimg", { id: userId }).then((res) => {
      setImgArray(res.data.imgArray);
      // setImgArray([{ IMG_URL : '114662496405123443827/edit_img/da6ff7c1-ae6d-d43a-86ec-9d2390cc8f11.png'}])
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
    setTestindex(index);
  };

  /**삭제하시겠습니까? 모달 호출*/
  const delImg_Btn = () => {
    const isSelected = Object.values(selectedImages).some(
      (value) => value === true
    );

    if (isSelected) {
      setDelImg(!delImg);
    } else {
      alert("삭제하려는 이미지를 선택해주세요");
    }
  };

  /**체크된 이미지 URL 업데이트 함수*/
  const updateCheckedImages = () => {
    const checkedImages = imgArray
      .filter((_, index) => selectedImages[index])
      .map((item) => item.IMG_URL); // 체크된 이미지들의 URL만 추출
    setcheck_Img(checkedImages);
  };

  /** 전체 선택 함수 */
  const handleSelectAllChange = (e) => {
    setSelectAll(e.target.checked);
  };

  /**삭제 버튼 클릭 시 체크된 이미지 URL 변수 업데이트*/
  const handleDeleteClick = () => {
    // 23-11-20 09:21 임휘훈 작성 : 삭제 버튼 기능
    // 데이터베이스 삭제용 데이터
    let arrImgUrl = [];
    // S3 삭제용 데이터
    let deleteImgData = [];
    // 객체형태 반복문에서 사용하기 위해서 객체 key값만 접근 keys
    for (const key of Object.keys(selectedImages)) {
      // SQL에서 IN 사용하기 위해서 따옴표 넣기
      // ex) "'문자열1', '문자열2'"
      arrImgUrl.push("'" + imgArray[key].IMG_URL + "'");
      deleteImgData.push({ Key: imgArray[key].IMG_URL });
    }
    let strImgUrl = arrImgUrl.join();

    // 이미지 삭제 axios
    axios
      .post("/imgCreate/deleteImg", {
        // 데이터베이스에서 삭제를 위한 데이터
        imgUrl: strImgUrl,
        // S3에서 삭제를 위한 데이터
        deleteS3: deleteImgData,
      })
      .then((res) => {
        let imgData = res.data.imgArray;
        // 이미지 화면 최신화
        setImgArray(imgData);
        // 삭제 모달 닫기
        setDelImg(false);
        // 이미지 모달 닫기
        setIsOpen(false);
      });
  };

  /**최신순 정렬 함수*/
  const date_Order = () => {
    // state는 변하지 않기 때문에 새로운 배열로 복제해서 사용
    let newArr = [...imgArray];
    newArr.sort((a, b) => {
      return new Date(b.DATE) - new Date(a.DATE);
    });
    setImgArray(newArr);
  };

  /**오래된순 정렬 함수*/
  const old_Order = () => {
    // state는 변하지 않기 때문에 새로운 배열로 복제해서 사용
    let newArr = [...imgArray];
    newArr.sort((a, b) => {
      return new Date(a.DATE) - new Date(b.DATE);
    });
    setImgArray(newArr);
  };
  let num = [1, 2, 3, 4, 5, 6, 7];
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
        {/* imgArray */}
        {imgArray.map((image, index) => (
          // <div className="">
          <div className="SImage-Card me-4" key={index}>
            {/* data-src 속성에 실제 이미지 URL을 지정 */}
            <img
              className="img-thumb"
              data-src={`${process.env.REACT_APP_AWS_BUCKET_URL}/${image?.IMG_URL}`}
              src={`${process.env.REACT_APP_AWS_BUCKET_URL}/${image?.IMG_URL}`}
              alt={`Image ${index}`}
              onClick={() => {
                openModalHandler(index);
                handleCheckboxChange(index, true);
                updateCheckedImages();
              }}
            />
            <div className="SI-At">
              <input
                type="checkbox"
                id={`check${index}`}
                checked={selectedImages[index]}
                onChange={(e) => handleCheckboxChange(index, e.target.checked)}
              />
              <label
                className="check_label"
                htmlFor={`check${index}`}
                onClick={() => {
                  updateCheckedImages();
                }}
              ></label>
              <span>{image.DATE.slice(0, 10)}</span>
            </div>
            {/* </div> */}
          </div>
        ))}
        {isOpen && (
          <ImgModal
            isOpen={isOpen}
            ImgArray={imgArray}
            index={testIndex}
            handleCheckboxChange={handleCheckboxChange}
            openModalHandler={openModalHandler}
            updateCheckedImages={updateCheckedImages}
            delImg_Btn={delImg_Btn}
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
