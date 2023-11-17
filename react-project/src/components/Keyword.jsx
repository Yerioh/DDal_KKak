import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const Keyword = ({ handleCheckboxChange, onModalChange }) => {
  const [keyWordModalOpen, setKeyWordModalOpen] = useState(false);

  const openKeyWordModal = () => {
    setKeyWordModalOpen(true);
    onModalChange(true);
  };
  const closeKeyWrodModal = () => {
    setKeyWordModalOpen(false);
    onModalChange(false);
  };

  return (
    <div className="creImg_opt">
      <div className="creImg_chkbox">
        {/*체크박스 리스트*/}

        <label>
          <input
            className="keyWord-button"
            type="checkbox"
            value="Gray-Scale,"
            name="흑백"
            onChange={handleCheckboxChange}
          />
          <div id="showKeywordCheckbox"></div>
          흑백
        </label>

        <label>
          <input
            className="keyWord-button"
            type="checkbox"
            value="Colorful,"
            name="컬러"
            onChange={handleCheckboxChange}
          ></input>
          <div id="showKeywordCheckbox"></div>
          컬러
        </label>

        <label>
          <input
            className="keyWord-button"
            type="checkbox"
            value="Logo,"
            name="로고"
            onChange={handleCheckboxChange}
          ></input>
          <div id="showKeywordCheckbox"></div>
          Logo
        </label>

        <label>
          <input
            className="keyWord-button"
            type="checkbox"
            value="Typography,"
            name="타이포그래피"
            onChange={handleCheckboxChange}
          ></input>
          <div id="showKeywordCheckbox"></div>
          타이포그래피
        </label>

        <label>
          <input
            className="keyWord-button"
            type="checkbox"
            value="Vector logo, Vector Art, Vector graphics, Adobe illustrator,"
            name="Vector로고"
            onChange={handleCheckboxChange}
          ></input>
          <div id="showKeywordCheckbox"></div>
          Vector Logo
        </label>

        <label>
          <input
            className="keyWord-button"
            type="checkbox"
            value="WordMark,"
            name="WordMark"
            onChange={handleCheckboxChange}
          ></input>
          <div id="showKeywordCheckbox"></div>
          Text Logo
        </label>
      </div>

      <button className="btnmy" onClick={openKeyWordModal}>
          더보기
        </button>
      {/* 키워드 모달 창 */}
      {keyWordModalOpen && (
        <div
          className={"keyWordmodal-container"}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeKeyWrodModal();
            }
          }}
        >
          <div className={"keyWordmodal-content"}></div>
          {/* 모달 내용 */}
          <button className={"modal-close-btn"} onClick={closeKeyWrodModal}>
            모달 닫기
          </button>
        </div>
      )}
    </div>
  ); // 여기에 닫는 소괄호 추가
};

export default Keyword;
