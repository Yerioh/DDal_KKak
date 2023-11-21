import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const Keyword = ({ setPositiveKeyword, positiveKeyword }) => {
  // 모달창 상태
  const [keyWordModalOpen, setKeyWordModalOpen] = useState(false);
  // 선택한 키워드 한글 state
  const [keywordLabel, setKeywordLabel] = useState("")

  const openKeyWordModal = () => {
    setKeyWordModalOpen(true);
  };
  const closeKeyWrodModal = () => {
    setKeyWordModalOpen(false);
  };
  /** 키워드 선택 완료 함수 */
  const completeKeyword = (e) => {
    e.preventDefault();
    const radioOption = {
      color:{
        ',Gray-Scale': '흑백',
        ',Colorful': '컬러',
        '':' ',
      },
      logo:{
        ',Logo': '로고',
        ',Typography': '타이포그래피',
        ',Vector logo, Vector Art, Vector graphics, Adobe illustrator': 'Vector 로고',
        ',WordMark': 'Text 로고',
        '':' ',
      }
    }
    // 각 테마별 value 값 가져오기
    let color = e.target.colorThema.value;
    let logo = e.target.logoThema.value;
    setPositiveKeyword(color + logo);
    const combiendLabel = `${radioOption.color[color]? radioOption.color[color]:''}${radioOption.logo[logo]? "  "+radioOption.logo[logo]:''}`
    setKeywordLabel(combiendLabel)
    closeKeyWrodModal();
  };

  return (
    <div className="creImg_opt">
      <input
        type="text"
        className="keyword-result"
        value={keywordLabel}
        readOnly={true}
      />
      <button className="keywordModal-open btnmy" onClick={openKeyWordModal}>
        키워드 선택
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
                      <div className="showKeywordCheckbox"></div>
                      흑백
                    </label>
                    <label>
                      <input
                        className="keyWord-button"
                        type="radio"
                        value=",Colorful"
                        name="colorThema"
                      ></input>
                      <div className="showKeywordCheckbox"></div>
                      컬러
                    </label>
                    <label>
                      <input
                        className="keyWord-button"
                        type="radio"
                        value=""
                        name="colorThema"
                        defaultChecked
                      ></input>
                      <div className="showKeywordCheckbox"></div>
                      선택 없음
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
                      <div className="showKeywordCheckbox"></div>
                      로고
                    </label>
                    <label>
                      <input
                        className="keyWord-button"
                        type="radio"
                        value=",Typography"
                        name="logoThema"
                      ></input>
                      <div className="showKeywordCheckbox"></div>
                      타이포그래피
                    </label>
                    <label>
                      <input
                        className="keyWord-button"
                        type="radio"
                        value=",Vector logo, Vector Art, Vector graphics, Adobe illustrator"
                        name="logoThema"
                      ></input>
                      <div className="showKeywordCheckbox"></div>
                      Vector 로고
                    </label>
                    <label>
                      <input
                        className="keyWord-button"
                        type="radio"
                        value=",WordMark"
                        name="logoThema"
                      ></input>
                      <div className="showKeywordCheckbox"></div>
                      Text 로고
                    </label>
                    <label>
                      <input
                        className="keyWord-button"
                        type="radio"
                        value=""
                        name="logoThema"
                        defaultChecked
                      ></input>
                      <div className="showKeywordCheckbox"></div>
                      선택 없음
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
