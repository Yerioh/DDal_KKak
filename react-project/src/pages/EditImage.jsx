import React, { useEffect, useState } from "react";
import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from "react-filerobot-image-editor";
import "../css/fonts.css";
import "../css/ImageEdit.css";
import aws from "aws-sdk";
import { Buffer } from "buffer";
import { useSelector } from "react-redux";
import uuid from "react-uuid";
import { useLocation, useSearchParams } from "react-router-dom";
import axios from "../axios";
import galleryImg1 from "../img/image-editor/image-edit-gallery1.png"
import galleryImg2 from "../img/image-editor/image-edit-gallery2.png"

function EditImage() {
  const location = useLocation();

  const positive = location.state.positivePrompt; // 사용한 긍정 프롬프트
  const negative = location.state.negativePrompt; // 사용한 부정 프롬프트

  // 23-11-17 오전 09:40 박지훈 작성
  // aws 연동을 위한 config
  aws.config.update({
    region: process.env.REACT_APP_AWS_DEFAULT_REGION,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  });

  // s3 bucket 폴더명으로 사용할 사용자 아이디
  const userId = useSelector((state) => state.session.id);
  // 쿼리스트링으로 이미지 경로 추출
  const [query, setQuery] = useSearchParams();
  const img_id = query.get("img");
  // 이미지 경로
  const imgUrl = `${process.env.REACT_APP_AWS_BUCKET_URL}/${img_id}`;

  // 이미지 에디터 폰트 객체
  const fontAnnotationsConfig = {
    text: "예시용 글입니다.",
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
      console.log("선택된폰트", newFontFamily, reRenderCanvasFn);
    },
  };
  // 이미지 에디터 번역 객체
  const translations = {
    // 저장 버튼 관련 키워드
    save: "저장",
    cancel : "취소",
    saveAsModalLabel:"이미지 저장",
    quality:"화질",
    resize: "이미지 크기",
    // 에디터 탭 키워드
    adjustTab: "이미지 자르기",
    annotateTab: "이미지 꾸미기",
    filtersTab:"이미지 필터",
    // 이미지 자르기 탭(adjust)
    // 이미지 자르기 툴 키워드
    original:"원본",
    custom: "자유롭게",
    square: "정사각형",
    landscape:"가로 사각형",
    portrait:"세로 사각형",
    ellipse:"원형",
    // 이미지 자르기 기타 키워드
    rotateTool: "회전",
    flipX : "세로축 뒤집기",
    flipY : "가로축 뒤집기",
    // 이미지 꾸미기 탭(annotate)
    textTool:"문자",
    imageTool: "그림",
    addImage:"+ 이미지 추가",
    uploadImage: "이미지 업로드",
    fromGallery:"추천 이미지",
    rectangleTool:"사각형",
    ellipseTool:"원",
    polygonTool:"다각형",
    sides: "꼭짓점",
    penTool:"펜 그리기",
    lineTool:"선",
    arrowTool:"화살표",
  }
  // 23-11-21 임휘훈 작성 : 페이지 갱신 및 이탈 감지
  window.onbeforeunload = () => {
    console.log("window.onbeforeunload 시작");
    return "이동?"
  }
  

  return (
    <div className="editimagebody">
      {/* 이미지 편집창 */}
      <FilerobotImageEditor
        source={imgUrl}
        // 생성된 이미지 주소
        onSave={(editedImageObject, designState) => {
          console.log("saved", editedImageObject, designState);
          // 편집된 base64 이미지
          const base64 = editedImageObject.imageBase64;
          const imgName = editedImageObject.name; // 설정한 이미지 이름
          // base64 이미지 데이터에서 데이터URI 스키마부분 제거 (data:[<미디어타입>];base64)
          const base64Data = new Buffer.from(
            base64.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
          );
          // 데이터 URI 스키마 부분에서 파일 형식 추출
          const type = base64.split(";")[0].split("/")[1];

          // s3 버킷에 저장될 경로, 파일명
          // 사용자이름(폴더)/랜덤값.파일형식
          const img_info = `${userId}/edit_img/${uuid()}.${type}`;

          // aws s3 이미지 업로드 함수
          const upload = new aws.S3.ManagedUpload({
            params: {
              Bucket : process.env.REACT_APP_AWS_BUCKET,              
              Key : img_info,
              Body : base64Data,
              ContentEncoding : 'base64',
              ContentType : `image/${type}`
            }
          })
          
          // 이미지 업로드 실행
          const promise = upload.promise();
          promise.then(
            () => {
              console.log("이미지 업로드 성공");
              axios.post("/imgCreate/saveImg", {
                userId: userId,
                positive: positive,
                negative: negative,
                img_info: img_info,
                imgName : imgName
              });
            },
            (err) => {
              console.log("이미지 업로드 실패", err);
            }
          );
        }}
        // 세이브 버튼 시 연관되는 함수. 현재는 편집된 사진이 원본+편집한 효과로 나뉘어져 파라미터로 별도 저장됨.

        annotationsCommon={{ fill: "#000000" }}
        Text={fontAnnotationsConfig}
        // 폰트 추가하는 곳.
        Rotate={{ angle: 90, componentType: "slider" }}
        translations={translations}
        Image={{
          disableUpload: false,
          gallery: [
            {
              originalUrl: galleryImg1,
              previewUrl: galleryImg1,
            },
            {
              originalUrl: galleryImg2,
              previewUrl: galleryImg2,
            },
          ],
        }}
   
        // 세이브 버튼 및 추가 효과들
        tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.FILTERS]} // or {['Adjust', 'Annotate', 'Watermark']}
        defaultTabId={TABS.ADJUST} // or 'Annotate'
        defaultToolId={TOOLS.CROP} // or 'Text'
      />
    </div>
  );
}

export default EditImage;
