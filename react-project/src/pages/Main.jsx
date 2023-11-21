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
        <h1>원하는 그림, 이미지, 굿즈? 딸깍</h1>
        <div className="back-Img">
          <Link to="/image-create">
            <button className="Main-Btn same-BTN">이미지 생성하러 가기</button>
          </Link>
        </div>
      </div>

      {/* 이미지 슬라이드 */}
      <div className="Slide-box">
        <div className="image-Slide">
          <Link to="/image-create">
            <button className="moreShow same-BTN">더보기</button>
          </Link>

          <Carousel responsive={responsive} width="0%">
            {testnumber.map((number, index) => (
              <ImageAllCard num={number} />
            ))}
          </Carousel>
        </div>
        {/* 굿즈 슬라이드 */}
        <div className="goods-Slide">
          <Link>
            <button className="moreShow same-BTN">더보기</button>
          </Link>
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
