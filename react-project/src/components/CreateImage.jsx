import React, { useRef, useState } from 'react'
import '../css/Imagelayout.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Sample from '../img/guideSample_dog.jpeg'
import Arrow from '../img/rightArrow.png'
import ImageCreateButton from './PageSizeButton'
import PageCountButton from './PageCountButton'
import Keyword from './Keyword'
import { Link } from 'react-router-dom'
import axios from '../axios'
import Progress from 'react-circle-progress-bar'


// CreateImage 컴포넌트 정의
const CreateImage = () => {
  const [positivePrompt, setPositivePrompt] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('')
  const [guideModalOpen, setguideModalOpen] = useState(false)  

  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)

  // 키워드 모달 상태 변경을 처리하는 함수
  const handleKeyWordModalChange = () => {
    // 모달 상태에 따른 추가적인 작업 (예: 모달 상태를 다른 state에 저장하는 등)
  }

  // 체크박스 입력 버튼
  const handleCheckboxChange = (e) => {
    const value = e.target.value
    const checked = e.target.checked
    // 선택되면 값 추가, 아니면 제거
    setPositivePrompt((prev) => {
      // 공백으로 분리된 단어 배열로 변환
      const valuesArray = prev.split(' ').filter((v) => v)
      if (checked) {
        // 체크된 경우 값 추가
        return [...valuesArray, value].join(' ')
      } else {
        // 체크 해제된 경우 값 제거
        return valuesArray.filter((v) => v !== value).join(' ')
      }
    })
  }

  // 모달을 열기 위한 함수
  const openGuideModal = () => setguideModalOpen(true)

  // 모달을 닫기 위한 함수
  const closeGuideModal = () => setguideModalOpen(false)


  // 이미지 생성 버튼 클릭
  const createImg = ()=>{
    let config = {
      onUploadProgress : (ProgressEvent) => {
        let percentCompleted = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
        setProgress(percentCompleted)
        console.log(progress);
      }
    }
    // 긍정 프롬프트 공백 아닐 때 실행
    if(positivePrompt !== ''){
      setLoading(true)
      axios.post('/imgCreate/stable', {positivePrompt : positivePrompt, negativePrompt : negativePrompt}, config)
        .then(res=>{
          console.log(res.data)
          setLoading(false)
        })

    }
  }

  return (
  // 이미지 생성페이지 전체
    <div className="creImg_body">      
      <div className="prompt_container">
        <div className="keyword">
          <h1>
            생성 키워드 입력
            <button className="guide-button btnmy" onClick={openGuideModal}>
              가이드
            </button>{' '}
          </h1>
          {/* <Progress progress={75} /> */}
          <Form.Label></Form.Label>
          <Form.Control
            type="text"    // 키워드 프롬포트 입력창
            className="prompt" 
            value={positivePrompt}  // 적용되는 키워드 
            onChange={(e) => setPositivePrompt(e.target.value)}
            id='inputPrompt' // 입력 값으로 사용될 state
            style={{'height':'60px'}} // 입력창 높이

          />
          <h1>제외 키워드 입력</h1>
          <Form.Label htmlFor="inputPassword5"></Form.Label>
          <Form.Control 
          type="text"     // 제외되는 키워드 프롬포트 입력창
          className="prompt"  
          id='exceptPrompt'  // 제외되는 키워드 입력창
          style={{'height':'60px'}}
          value={negativePrompt}  // 적용되는 키워드 
          onChange={(e) => setNegativePrompt(e.target.value)}

          />          

          {/* 키워드 버튼 창 */}
        </div>
        <div className="creImg_opt">
          <h2>넣고 싶은 키워드를 클릭해주세요!</h2>
          <Keyword
            handleCheckboxChange={handleCheckboxChange}
            onModalChange={handleKeyWordModalChange}
          />
        </div>

        {/*가이드 모달 창*/}
        {guideModalOpen && (
          <div
            className={'modal-container'}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeGuideModal()
              }
            }}
          >
            <div className={'guideModal'}>
              <div className={'modal-guide'}> 
              {/* // 이미지 작성가이드 모달창 */}
                <Button
                  variant="light"
                  style={{
                    disabled: 'true',
                    position: 'relative',
                    left: '10%',
                    width: '1100px',
                  }}
                >
                  이미지를 생성하는 방법
                </Button>{' '}
              </div>
              <div className={'modal-body'}>
                <div className="modal-body2">
                  <div className="guide-keyword">
                    <h1>생성 키워드 입력</h1>
                    <Form.Control
                      type="text"
                      value={'강아지,실사체,귀접힘'}
                      readOnly={true}
                      
                    />
                    <h1 style={{ 'margin-top': '10%' }}>제외 키워드 입력</h1>
                    <Form.Control
                      type="text"
                      value={'컬러, 몸통'}
                      readOnly={true}
                      style={{ 'margin-bottom': '10%' }}
                      
                    />
                    <div className="guide-manual">
                      <p>1. 생성키워드에 만들고 싶은 단어를 입력하세요!</p>
                      <p>2. 제외키워드에 빼고 싶은 단어를 입력하세요!</p>
                      <p>3. 이미지생성! 버튼을 클릭하면 이미지가 생성됩니다.</p>
                    </div>
                  </div>
                </div>
                <img src={Arrow} alt="" style={{ width: '30%' }} />
                <img
                  src={Sample}
                  alt=""
                  style={{ width: '30%', height: '90%', 'margin-top': '20px' }}
                />
              </div>
              <button
                className={'modal-close-btn btnmy'}
                onClick={closeGuideModal}
              >
                모달 닫기
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 페이지 옵션 선택 창 페이지 크기, 페이지 출력 갯수, */}
      <div className="creImg_side">
        <div >
          <ImageCreateButton />
        </div>
        <div id='pageCount'>
          <PageCountButton />
        </div>
      </div>
      <div>
      {/* <Link to='/image-edit'> */}
        <button className="creImg_gotobutton btn" onClick={createImg}>이미지 만들러가기!</button>
        {/* </Link> */}
      </div>
    </div>
  )
}

export default CreateImage
