import React, { useEffect, useState } from "react";
import "../css/ImageAll.css";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import SearchCard from "../components/SearchCard";
import axios from "../axios";

const ImageAll = () => {
  // 공유 이미지 데이터
  const [imgCard, setImgCard] = useState(null);

  // 공유 이미지 데이터 가져오기
  useEffect(() => {
    axios.post("/imgCreate/shareImgShow").then((res) => {
      let data = res.data.result;
      console.log("이미지 모음 data", data);
      // 이미지 모음 날짜 연동 23-11-24 11:40 임휘훈
      setImgCard(data);
    });
  }, []);

  // 23-11-24 12:38 임휘훈 작성 : 이미지 정렬
    /**인기순 정렬 => 좋아요 수 기준 내림차순 */
    const like_order = () => {
      // state는 변하지 않기 때문에 새로운 배열로 복제해서 사용
      let newArr = [...imgCard];
      console.log("최신순 정렬 전 arr", newArr);
      newArr.sort((a, b) => {
        return b.CNT - a.CNT;
      });
      console.log("인기순", newArr);
      setImgCard(newArr);
    }

    /**최신순 정렬 함수 내림차순*/
    const date_Order = () => {
      // state는 변하지 않기 때문에 새로운 배열로 복제해서 사용
      let newArr = [...imgCard];
      console.log("최신순 정렬 전 arr", newArr);
      newArr.sort((a, b) => {
        return new Date(b.DATE) - new Date(a.DATE);
      });
      console.log("최신순", newArr);
      setImgCard(newArr);
    };
  
    /**오래된순 정렬 함수 오름차순*/
    const old_Order = () => {
      // state는 변하지 않기 때문에 새로운 배열로 복제해서 사용
      let newArr = [...imgCard];
      newArr.sort((a, b) => {
        return new Date(a.DATE) - new Date(b.DATE);
      });
      console.log("오래된 순", newArr);
      setImgCard(newArr);
    };

  // 좋아요 기능
  return (
    <div className="All-Container">
      <Container className="Card-box">
        <Row className="input-box mt-5">
          <div className="mb-3 input-keyword-box">
            <Form.Control
              placeholder="찾고싶은 이미지"
              className="search_Keyword"
            ></Form.Control>
            <button variant="outline-secondary" id="button-addon2">
              <img src="./images/search_img1.png" alt="" />
            </button>
          </div>
        </Row>
        <div className="Search-Img-Nav">
          <div className="Search-Img-box">
            <span onClick={like_order}>인기순</span>
            <span onClick={date_Order}>최신순</span>
            <span onClick={old_Order}>오래된순</span>
          </div>
        </div>
        <div className="search-Card mt-4">
          {imgCard?.map((data, index) => (
            <div className="img-card">
              <SearchCard data={data} index={index} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ImageAll;
