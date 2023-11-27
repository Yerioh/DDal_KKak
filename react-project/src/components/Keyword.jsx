import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Chip } from "@mui/material";

const Keyword = ({ setPositiveKeyword, positiveKeyword }) => {
  // 모달창 상태
  const [keyWordModalOpen, setKeyWordModalOpen] = useState(false);
  // 선택한 키워드 한글 state
  const [keywordLabel, setKeywordLabel] = useState([]);

  const openKeyWordModal = () => {
    setKeyWordModalOpen(true);
  };
  const closeKeyWrodModal = () => {
    setKeyWordModalOpen(false);
  };
  // 버튼의 key, value 비교 객체
  const radioOption = {
    color: {
      ",Gray-Scale": "흑백",
      ",Colorful": "컬러",
      "": "선택 없음",
    },
    logo: {
      ",Logo": "로고",
      ",Typography": "타이포그래피",
      ",Vector logo, Vector Art, Vector graphics, Adobe illustrator":
        "Vector 로고",
      ",WordMark": "Text 로고",
      "": "선택 없음",
    },
  };
  /** 키워드 선택 완료 함수 */
  const completeKeyword = (e) => {
    e.preventDefault();
    let keywordArray = []
    // 각 테마별 value 값 가져오기
    let color = e.target.colorThema.value;
    let logo = e.target.logoThema.value;
   if(color!==''){
    keywordArray.push(color)
   }
   if(color!==''){
    keywordArray.push(logo)
   }
    setPositiveKeyword(keywordArray);
    setKeywordLabel([radioOption.color[color], radioOption.logo[logo]])
    closeKeyWrodModal();
  };

  const deleteKeyword = (index) => {
    const tempLabelArray = [...keywordLabel]
    tempLabelArray[index] = '선택 없음'
    setKeywordLabel(tempLabelArray)
    const tempKeywordArray = [...positiveKeyword]
    tempKeywordArray.splice(index)
    setPositiveKeyword(tempKeywordArray)
  }

  return (
    <div className="creImg_opt">
      <div className="keyword-result">
        {keywordLabel.map((item, index)=>(
          item !== '선택 없음' ? <Chip key={index} label={item} onDelete={()=>deleteKeyword(index)}/> : null
        ))}
      </div>
      <button className="keywordModal-open same-BTN" onClick={openKeyWordModal}>
        키워드
      </button>
      {/* 키워드 모달 창 */}
      {keyWordModalOpen && (
        <div
          className={"modal-backdrop"}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeKeyWrodModal();
            }
          }}
        >
          <div className="keywordModal">
            <form onSubmit={completeKeyword}>
              <div className="keywordModal-content">
                <h3>제공 키워드</h3>
                {/* 테마 별 div 구획, 기본값(선택없음)=>defaultChecked 속성 */}
                <div className="keywordModal-thema">
                  <h4>컬러 테마</h4>
                  <div className="keywordModal-checkbox">
                    <label>
                      <input
                        className="keyWord-button"
                        type="radio"
                        value=",Gray-Scale"
                        name="colorThema"
                      />
                      <div className="showKeywordCheckbox">흑백</div>
                    </label>
                    <label>
                      <input
                        className="keyWord-button"
                        type="radio"
                        value=",Colorful"
                        name="colorThema"
                      ></input>
                      <div className="showKeywordCheckbox">컬러</div>
                    </label>
                    <label>
                      <input
                        className="keyWord-button"
                        type="radio"
                        value=""
                        name="colorThema"
                        defaultChecked
                      ></input>
                      <div className="showKeywordCheckbox">선택 없음</div>
                    </label>
                  </div>
                </div>
                <div className="keywordModal-thema">
                  <h4>로고 테마</h4>
                  <div className="keywordModal-checkbox">
                    <label>
                      <input
                        className="keyWord-button"
                        type="radio"
                        value=",Logo"
                        name="logoThema"
                      ></input>
                      <div className="showKeywordCheckbox">로고</div>
                    </label>
                    <label>
                      <input
                        className="keyWord-button"
                        type="radio"
                        value=",Typography"
                        name="logoThema"
                      ></input>
                      <div className="showKeywordCheckbox">타이포그래피</div>
                    </label>
                    <label>
                      <input
                        className="keyWord-button"
                        type="radio"
                        value=",Vector logo, Vector Art, Vector graphics, Adobe illustrator"
                        name="logoThema"
                      ></input>
                      <div className="showKeywordCheckbox">Vector 로고</div>
                    </label>
                    <label>
                      <input
                        className="keyWord-button"
                        type="radio"
                        value=",WordMark"
                        name="logoThema"
                      ></input>
                      <div className="showKeywordCheckbox">Text 로고</div>
                    </label>
                    <label>
                      <input
                        className="keyWord-button"
                        type="radio"
                        value=""
                        name="logoThema"
                        defaultChecked
                      ></input>
                      <div className="showKeywordCheckbox">선택 없음</div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="keywordModal-footer">
                <button
                  type="submission"
                  className="keywordModal-complete btnmy"
                >
                  완료
                </button>
                <button
                  className="keywordModal-close btnmy"
                  onClick={closeKeyWrodModal}
                >
                  닫기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  ); // 여기에 닫는 소괄호 추가
};

export default Keyword;
