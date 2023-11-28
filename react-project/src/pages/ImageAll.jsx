import React, { useEffect, useRef, useState } from "react";
import "../css/ImageAll.css";
import { Container, Row, Form } from "react-bootstrap";
import SearchCard from "../components/SearchCard";
import axios from "../axios";

const ImageAll = () => {
  // 공유 이미지 데이터
  const [imgCard, setImgCard] = useState(null);
  const [imgState, setImgState] = useState(false);
  // 정렬
  const [sortImg, setSortImg] = useState("New");
  const [searchWord, setSearchWord] = useState(null); // 검색

  // 23-11-28 김형균 작성 : 검색
  const searchRef = useRef(); // 검색 입력창 Ref
  /** 검색 입력창 함수 */
  const promptSearch = () => {
    //검색어 업데이트
    let array = searchWord.filter((item) => { //검색 키워드
      return item["IMG_PROMPT"].includes(searchRef.current.value);
    });
    setImgCard(array);
  };

  // 공유 이미지 데이터 가져오기
  useEffect(() => {
    axios.post("/imgCreate/shareImgShow", { sortImg }).then((res) => {
      let data = res.data.result;
      // 이미지 모음 날짜 연동 23-11-24 11:40 임휘훈
      setImgCard(data);
      setSearchWord(data)
    });
  }, [imgState, sortImg]);

  // 23-11-24 12:38 임휘훈 작성 : 이미지 정렬
  /**인기순 정렬 => 좋아요 수 기준 내림차순 */
  const like_order = () => {
    setSortImg("Best");
  };

  /**최신순 정렬 함수 내림차순*/
  const date_Order = () => {
    setSortImg("New");
  };

  /**오래된순 정렬 함수 오름차순*/
  const old_Order = () => {
    setSortImg("Old");
  };

  // 좋아요 기능
  return (
    <div className="All-Container">
      <Container className="Card-box">
        <Row className="input-box mt-5">
          <div className="mb-3 input-keyword-box">
            <Form.Control
              placeholder="찾고싶은 이미지 키워드"
              className="search_Keyword"
              ref={searchRef}
            ></Form.Control>
            <button
              variant="outline-secondary"
              id="button-addon2"
              onClick={promptSearch}
            >
              <img src="./images/search_img1.png" alt="" />
            </button>
          </div>
        </Row>
        <div className="Search-Img-Nav">
          <div className="Search-Img-box">
            <span
              className={`event-text-${sortImg === "New" ? "New" : null}`}
              onClick={date_Order}
            >
              최신순
            </span>
            <span
              className={`event-text-${sortImg === "Old" ? "Old" : null}`}
              onClick={old_Order}
            >
              오래된순
            </span>
            <span
              className={`event-text-${sortImg === "Best" ? "Best" : null}`}
              onClick={like_order}
            >
              인기순
            </span>
          </div>
        </div>
        <div className="search-Card mt-4">
          {imgCard?.map((data, index) => (
            <div className="img-card">
              <SearchCard
                data={data}
                index={index}
                setImgState={setImgState}
                imgState={imgState}
                sortImg={sortImg}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ImageAll;
