import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import "../css/Main.css";
import ImageAllCard from "../components/ImageAllCard";

const Main = () => {
  const testnumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  return (
    <div className="Main-Container">
      <div className="Main-text-img">
        <div className="Main-head-btn">
          <div className="Main-head">
            <h2>원하는 그림, 이미지, 굿즈</h2>
            <br />
            <span>생성형AI 기술을 활용한</span>
            <span>자동 이미지 생성</span>
            <br />
            <span>손쉬운 이미지 편집 가능</span>
            <br />
            <span>나만의 색다른 굿즈</span>
            <br />
            <span>만들고 싶다면?</span>
          </div>
          <Link to="/image-create">
            <button className="Main-Btn">이미지 생성하러 가기! 딸~깍</button> 
            {/*  */}
          </Link>
        </div>
        <div className="Main-Image">
          <img src="./images/1.png" alt="d" />
        </div>
      </div>

      {/* 이미지 슬라이드 */}
      <div className="Slide-box">
        <div className="image-Slide">
          <div>
            <span className="Main-Slide-text">디자인 이미지</span>
            <Link to="/imageall">
              <button className="moreShow same-BTN">더보기</button>
            </Link>
          </div>

          <Carousel responsive={responsive}>
            {testnumber.map((number, index) => (
              <ImageAllCard num={number} />
            ))}
          </Carousel>
        </div>
        {/* 굿즈 슬라이드 */}
        <div className="goods-Slide">
          <div className="goods-text-btn">
            <span className="Main-Slide-text">굿즈</span>
            <Link>
              <button className="moreShow same-BTN">굿즈 더보기</button>
            </Link>
          </div>
          <Carousel responsive={responsive}>
            {testnumber.map((number, index) => (
              <ImageAllCard num={number} />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Main;
