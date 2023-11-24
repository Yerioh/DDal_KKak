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
      setImgCard(data);
    });
  }, []);

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
            <span>인기순</span>
            <span>최신순</span>
            <span>오래된순</span>
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
