import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'


const Keyword = ({ handleCheckboxChange, onModalChange }) => {
  const [keyWordModalOpen, setKeyWordModalOpen] = useState(false);

  const openKeyWordModal = () => {setKeyWordModalOpen(true)
    onModalChange(true)}
    ;
  const closeKeyWrodModal= () => {setKeyWordModalOpen(false)
    onModalChange(false)};
    
  return (
 
    <div className="creImg_chkbox">
      {/*체크박스 리스트*/ }
      <label>
        <input className='keyWord-button'
          type="checkbox"
          value="Gray-Scale,"
          name="흑백"
          onChange={handleCheckboxChange}
        />
        <div id='showKeywordCheckbox'></div>
        흑백
      </label>
      <label>
        <input className='keyWord-button'
          type="checkbox"
          value="Gloomy,"
          name="컬러만"
          onChange={handleCheckboxChange}
        ></input>
        <div id='showKeywordCheckbox'></div>
        컬러만
      </label>
      <label>
        <input className='keyWord-button'
          type="checkbox"
          value="Bright,"
          name="밝은"
          onChange={handleCheckboxChange}
        ></input>
        <div id='showKeywordCheckbox'></div>
          밝은
      </label>
      <label>
        <input className='keyWord-button'
          type="checkbox"
          value="Dark,"
          name="어두운"
          onChange={handleCheckboxChange}
        ></input>
        <div id='showKeywordCheckbox'></div>
        어두운
      </label>
      <label>
        <input className='keyWord-button'
          type="checkbox"
          value="joyful,"
          name="즐거운"
          onChange={handleCheckboxChange}
        ></input>
        <div id='showKeywordCheckbox'></div>
        즐거운
      </label>
      <label>
        <input className='keyWord-button'
          type="checkbox"
          value="Gloomy,"
          name="우울한"
          onChange={handleCheckboxChange}
        ></input>
        <div id='showKeywordCheckbox'></div>
        우울한
      </label>

      <button className='btnmy' onClick={openKeyWordModal}>
        더보기 
      </button>

      {/* 키워드 모달 창 */}
      {keyWordModalOpen && (
        <div
          className={'keyWordmodal-container'}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeKeyWrodModal();
            }
          }}
        >
          <div className={'keyWordmodal-content'}>
            {/* 모달 내용 */}
            <button className={'modal-close-btn'} onClick={closeKeyWrodModal}>
              모달 닫기
            </button>
          </div>
        </div>
      )}
    </div>

  ); // 여기에 닫는 소괄호 추가
};


export default Keyword
