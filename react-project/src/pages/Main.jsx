import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import "../css/Main.css";
import ImageAllCard from "../components/ImageAllCard";
import axios from "../axios";
import goodsList from "../data/custumGoods.json";

const Main = () => {
  const [shareImg, setShareImg] = useState(null);
  const test_MainImage = [1, 2, 3, 4, 5, 6, 7, 8];
  const [currentIndex, setCurrentIndex] = useState(1);
  useEffect(() => {
    axios.post("/imgCreate/mainImgShow").then((res) => {
      setShareImg(res.data.result);
    });
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 773 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 772, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  const imagePaths = test_MainImage.map((num) => `./images/${num}.png`);

  const handleNextButtonClick = () => {
    setCurrentIndex(currentIndex + 1);
    //if문 currentIndex
    if (currentIndex % imagePaths.length === 0) {
      setCurrentIndex(test_MainImage[0]);
      //else문 currentIndex
    } else {
      setCurrentIndex((currentIndex % imagePaths.length) + 1);
    }
  };

  const handlePrevButtonClick = () => {
    setCurrentIndex(Math.abs(currentIndex));
    // currentIndex가 맨 마지막 일때
    if (currentIndex % imagePaths.length === 0) {
      setCurrentIndex(imagePaths.length - 1);
      // currentIndex가 맨 처음일때
    } else if (currentIndex - 1 === 0) {
      setCurrentIndex(imagePaths.length);
      // 기본 왼쪽 이동
    } else {
      setCurrentIndex((currentIndex % imagePaths.length) - 1);
    }
  };

  // 자동 슬라이드 기능을 위한 useEffect
  useEffect(() => {
    const timer = setInterval(() => {
      handleNextButtonClick();
    }, 5000); // 2초마다 handleNextButtonClick 함수 호출

    // 컴포넌트가 언마운트될 때 타이머 정리
    return () => clearInterval(timer);
  }, [currentIndex]); // currentIndex가 변경될 때마다 이펙트를 다시 실행

  return (
    <div className="Main-Container">
      <div className="Main-text-img">
        <div className="Main-head-btn">
          <div className="Main-head">
            <div className="text-up-box">
              <span className="text-up">생성형 AI </span>
              <span className="test1-up">기술을 활용한</span>
            </div>
            <span className="text-up">자동 이미지 생성</span>
            <br />
            <span className="text-up">손쉬운 이미지 편집 가능</span>
            <br />
            <div className="text-up-box">
              <span className="test-up">나만의 </span>
              <span className="text-up">색다른 굿즈</span>
            </div>
            <br />
            <span className="long-text">
              딸깍에서 당신만을 위한, 세상에 단 하나뿐인 이미지를 만들어보세요.
            </span>
          </div>

          <Link to="/image-create">
            <button className="Main-Btn">이미지 생성하러 가기! 딸~깍</button>
            {/*  */}
          </Link>
        </div>
        <div className="Main-Image">
          <button
            className="Main-Slide-btn mainLeft"
            onClick={handlePrevButtonClick}
          >
            <img src="./images/arrow-left2.png" alt="left" />
          </button>
          <img src={`./images/${currentIndex}.png`} alt="Displayed" />
          <button
            className="Main-Slide-btn mainRight"
            onClick={handleNextButtonClick}
          >
            <img src="./images/arrow-right2.png" alt="right" />
          </button>
        </div>
      </div>

      {/* 이미지 슬라이드 */}
      <div className="Slide-box mb-4 mt-4">
        <div className="image-Slide mb-4">
          <div className="image-Slide-btn">
            <span className="Main-Slide-text">오늘의 이미지</span>
            <Link to="/imageall">
              <button className="moreShow same-BTN">이미지 더보기</button>
            </Link>
          </div>

          {shareImg !== null ? (
            <Carousel responsive={responsive}>
              {shareImg?.map((data, index) => (
                <ImageAllCard data={data} />
              ))}
            </Carousel>
          ) : (
            <h2>로딩</h2>
          )}
        </div>
        {/* 굿즈 슬라이드 */}

        <div className="goods-Slide mb-5">
          <div className="goods-text-btn">
            <span className="Main-Slide-text">커스텀 굿즈</span>
            <Link to="goodslist">
              <button className="moreShow same-BTN">굿즈 더보기</button>
            </Link>
          </div>
          {shareImg !== null ? (
            <Carousel responsive={responsive}>
              {goodsList?.map((data, index) => (
                <ImageAllCard data={data} />
              ))}
            </Carousel>
          ) : (
            <h2>로딩</h2>
          )}
        </div>
        <div className="Main-Meadia">
          <span className="medium-media">
            딸깍에서 당신만을 위한, 세상에 단 하나뿐인 이미지를 만들어보세요.
          </span>
          <span className="small-media">
            딸깍에서 당신만을 위한,
          </span>
          <span className="small-media">
           세상에 단 하나뿐인 이미지를 만들어보세요.
          </span>
          <Link to="/image-create">
            <button className="Main-Btn">Create Image</button>
            {/*  */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Main;
