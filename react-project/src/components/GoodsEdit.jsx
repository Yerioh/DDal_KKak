import React, { useEffect, useState } from "react";
import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from "react-filerobot-image-editor";
import axios from '../axios'
import { useSelector } from "react-redux";

const GoodsEdit = ({imgData, getImgDataRef}) => {
  // 23-11-23 오전 10:35 박지훈 작성(생성한 이미지 굿즈페이지에서 불러오기)
  // 사용자 아이디
  const useId = useSelector((state) => state.session.id);

  // 상품의 편집된 이미지를 나타내는 state
  const [isImgEditorShown, setIsImgEditorShown] = useState(true);

  // 내 저장 이미지 데이터 배열
  const [myGallery, setMyGallery] = useState(null)

  // 이미지 에디터에 내 저장 이미지 가져오기
  useEffect(()=>{
    axios.post('/imgCreate/myimg', {id : useId})
      .then(res=>{
        let gallery = res.data.imgArray
        // 굿즈 편집에 사용할 내 저장 이미지 url 생성        
        const newGallery = gallery.map((data)=>{
          return {
            originalUrl: `${process.env.REACT_APP_AWS_BUCKET_URL}/${data.IMG_URL}`,
            previewUrl:`${process.env.REACT_APP_AWS_BUCKET_URL}/${data.IMG_URL}`
          }
        });
        setMyGallery(newGallery)
      })
  },[])
  


  // 이미지 에디터 폰트 객체
  const fontAnnotationsConfig = {
    text: "문구를 입력해주세요.",
    fontFamily: "Arial",
    // 폰트 추가 장소입니다. { laebl: '제목', value: '가져온 font이름'},
    fonts: [
      { label: "Arial", value: "Arial" },
      "Tahoma",
      "Sans-serif",
      { label: "Comic Sans", value: "Comic-sans" },
      { label: "TAEBAEKmilkyway", value: "TAEBAEKmilkyway" },
      { label: "JalnanGothic", value: "JalnanGothic" },
      { label: "IAMAPLAYER", value: "IAMAPLAYER" },
      { label: "Roboto", value: "Rovoto" },
      { label: "Pretendard", value: "Pretendard" },
      { label: "PuradakGentleGothicR", value: "PuradakGentleGothicR" },
      { label: "필승고딕", value: "PilseungGothic" },
      { label: "도스고딕", value: "DOSGothic" },
      { label: "신라고딕", value: "Shilla_Gothic-Bold" },
    ],
    fontSize: 28,
    letterSpacing: 0,
    lineHeight: 1,
    align: "left",
    fontStyle: "normal",
    onFontChange: (newFontFamily, reRenderCanvasFn) => {
    },
  };
  // 이미지 에디터 번역 객체
  const translations = {
    // 저장 버튼 관련 키워드
    save: "저장",
    cancel: "취소",
    saveAsModalLabel: "이미지 저장",
    quality: "화질",
    resize: "이미지 크기",
    // 에디터 탭 키워드
    adjustTab: "이미지 자르기",
    annotateTab: "이미지 꾸미기",
    filtersTab: "이미지 필터",
    // 이미지 자르기 탭(adjust)
    // 이미지 자르기 툴 키워드
    original: "원본",
    custom: "자유롭게",
    square: "정사각형",
    landscape: "가로 사각형",
    portrait: "세로 사각형",
    ellipse: "원형",
    // 이미지 자르기 기타 키워드
    rotateTool: "회전",
    flipX: "세로축 뒤집기",
    flipY: "가로축 뒤집기",
    // 이미지 꾸미기 탭(annotate)
    textTool: "문자",
    imageTool: "그림",
    addImage: "내 저장 이미지",
    uploadImage: "이미지 업로드",
    fromGallery: "추천 이미지",
    rectangleTool: "사각형",
    ellipseTool: "원",
    polygonTool: "다각형",
    sides: "꼭짓점",
    penTool: "펜 그리기",
    lineTool: "선",
    arrowTool: "화살표",
  };

  return (
    <div style={{ height: "100%" }}>
      {isImgEditorShown && (
        <FilerobotImageEditor
          source={imgData}
          onSave={(editedImageObject, designState) =>
            console.log("saved", editedImageObject, designState)
          }
          annotationsCommon={{ fill: "#000000" }}
          // 폰트 추가
          Text={fontAnnotationsConfig}
          Rotate={{ angle: 90, componentType: "slider" }}
          Image={{
            disableUpload: true,
            // db에서 이미지 정보 가져오면 gallery 변수 활용
            gallery: myGallery,
          }}
          // 번역
          translations={translations}
          // 
          getCurrentImgDataFnRef={getImgDataRef}
          // 줌 끄기
          disableZooming={true}
          tabsIds={[TABS.ANNOTATE]} // or {['Adjust', 'Annotate', 'Watermark']}
          defaultTabId={TABS.ANNOTATE} // or 'Annotate'
          defaultToolId={TOOLS.IMAGE} // or 'Text'
        />
      )}
    </div>
  );
}

export default GoodsEdit;
