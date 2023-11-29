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
      ",Logo Icon, Signature Logo": "아이콘 로고",
      // ",Typography": "타이포그래피",
      ",Vector logo, Vector Art, Vector graphics, Adobe illustrator":
        "벡터 로고",
      ",Emblem Logo": "엠블렘 로고",
      "": "선택 없음",
    },
    style : {
      ",Classic" : "클래식",
      ",Modern" : "모던",
      ",Minimalism" : "미니멀리즘",
      ",Vintage" : "빈티지",
      ",Retro" : '레트로',
      ",Graphic" : "그래픽",
      "": "선택 없음",
    }
  };
  /** 키워드 선택 완료 함수 */
  const completeKeyword = (e) => {
    e.preventDefault();
    let keywordArray = []
    // 각 테마별 value 값 가져오기
    let color = e.target.colorThema.value;
    let logo = e.target.logoThema.value;
    let style = e.target.styleThema.value;
   if(color!==''){
    keywordArray.push(color)
   }
   if(color!==''){
    keywordArray.push(logo)
   }
   if(color!==''){
    keywordArray.push(style)
   }
    setPositiveKeyword(keywordArray);
    setKeywordLabel([radioOption.color[color], radioOption.logo[logo], radioOption.style[style]])
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
                        defaultChecked={keywordLabel[0]==='흑백' && true}
                      />
                      <div className="showKeywordCheckbox">흑백</div>
                    </label>
                    <label>
                      <input
                        className="keyWord-button"
                        type="radio"
                        value=",Colorful"
                        name="colorThema"
                        defaultChecked={keywordLabel[0]==='컬러' && true}
                      ></input>
                      <div className="showKeywordCheckbox">컬러</div>
                    </label>
                    <label>
                      <input
                        className="keyWord-button"
                        type="radio"
                        value=""
                        name="colorThema"
                        defaultChecked={keywordLabel[0]===undefined || keywordLabel[0]==='선택 없음' && true}
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
                        value=",Logo Icon, Signature Logo"
                        name="logoThema"
                        defaultChecked={keywordLabel[1]==='아이콘 로고' && true}
                      ></input>
                      <div className="showKeywordCheckbox">아이콘 로고</div>
                    </label>
                    <label>
                      <input
                        className="keyWord-button"
                        type="radio"
                        value=",Vector logo, Vector Art, Vector graphics, Adobe illustrator"
                        name="logoThema"
                        defaultChecked={keywordLabel[1]==='벡터 로고' && true}
                      ></input>
                      <div className="showKeywordCheckbox">벡터 로고</div>
                    </label>
                    <label>
                      <input
                        className="keyWord-button"
                        type="radio"
                        value=",WordMark"
                        name="logoThema"
                        defaultChecked={keywordLabel[1]==='엠블렘 로고'}
                      ></input>
                      <div className="showKeywordCheckbox">엠블렘 로고</div>
                    </label>
                    <label>
                      <input
                        className="keyWord-button"
                        type="radio"
                        value=""
                        name="logoThema"
                        defaultChecked={keywordLabel[1]===undefined || keywordLabel[1]==='선택 없음' && true}
                      ></input>
                      <div className="showKeywordCheckbox">선택 없음</div>
                    </label>
                  </div>
                </div>
                <div className="keywordModal-thema">
                  <h4>로고 스타일</h4>
                  <div className="keywordModal-checkbox">
                    <label>
                      <input
                        className="keyWord-button"
                        type="radio"
                        value=",Classic"
                        name="styleThema"
                        defaultChecked={keywordLabel[2]==='클래식' && true}
                      ></input>
                      <div className="showKeywordCheckbox">클래식</div>
                    </label>
                    <label>
                      <input
                        className="keyWord-button"
                        type="radio"
                        value=",Modern"
                        name="styleThema"
                        defaultChecked={keywordLabel[2]==='모던' && true}
                      ></input>
                      <div className="showKeywordCheckbox">모던</div>
                    </label>
                    <label>
                      <input
                        className="keyWord-button"
                        type="radio"
                        value=",Minimalism"
                        name="styleThema"
                        defaultChecked={keywordLabel[2]==='미니멀리즘' && true}
                      ></input>
                      <div className="showKeywordCheckbox">미니멀리즘</div>
                    </label>
                    <label>
                      <input
                        className="keyWord-button"
                        type="radio"
                        value=",Vintage"
                        name="styleThema"
                        defaultChecked={keywordLabel[2]==='빈티지' && true}
                      ></input>
                      <div className="showKeywordCheckbox">빈티지</div>
                    </label>
                    <label>
                      <input
                        className="keyWord-button"
                        type="radio"
                        value=",Retro"
                        name="styleThema"
                        defaultChecked={keywordLabel[2]==='레트로' && true}
                      ></input>
                      <div className="showKeywordCheckbox">레트로</div>
                    </label>
                    <label>
                      <input
                        className="keyWord-button"
                        type="radio"
                        value=",Graphic"
                        name="styleThema"
                        defaultChecked={keywordLabel[2]==='그래픽' && true}
                      ></input>
                      <div className="showKeywordCheckbox">그래픽</div>
                    </label>
                    <label>
                      <input
                        className="keyWord-button"
                        type="radio"
                        value=""
                        name="styleThema"
                        defaultChecked={keywordLabel[2]===undefined || keywordLabel[2]==='선택 없음' && true}
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
