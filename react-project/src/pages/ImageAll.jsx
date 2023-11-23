import React from "react";
import "../css/ImageAll.css";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import SearchCard from "../components/SearchCard";

const ImageAll = () => {
  // 이미지 카드
  const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 1];
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
            <Button variant="outline-secondary" id="button-addon2">
              <img src="./images/search_img1.png" alt="" />
            </Button>
          </div>
        </Row>
        <div className="search-Card">
          {number.map((num, index) => (
            <SearchCard num={num} index={index} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ImageAll;
