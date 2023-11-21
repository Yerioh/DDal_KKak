import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const Keyword = ({ setPositiveKeyword, positiveKeyword }) => {
  const [keyWordModalOpen, setKeyWordModalOpen] = useState(false);

  const openKeyWordModal = () => {
    setKeyWordModalOpen(true);
  };
  const closeKeyWrodModal = () => {
    setKeyWordModalOpen(false);
  };
  /** 키워드 선택 완료 함수 */
  const completeKeyword = (e) => {
    e.preventDefault();
    let color = e.target.colorThema.value;
    let logo = e.target.logoThema.value;
    setPositiveKeyword(color + logo);
    closeKeyWrodModal();
  };

  return (
    <div className="creImg_opt">
      <input
        type="text"
        className="keyword-result"
        value={positiveKeyword}
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
                {/* 테마 별 div 구획, 기본값(선택없음)=>checked 속성 */}
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
                        checked="checked"
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
                        checked="checked"
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
