import React, { useEffect, useState } from "react";
import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from "react-filerobot-image-editor";
import "../css/fonts.css";
import '../css/ImageEdit.css'
import aws  from 'aws-sdk'
import {Buffer} from 'buffer';
import { useSelector } from "react-redux";
import uuid from 'react-uuid'
import { useLocation, useSearchParams } from "react-router-dom";
import axios from "../axios"

function EditImage() {
  const location = useLocation();
  
  // const positive = location.state.positivePrompt // 사용한 긍정 프롬프트
  // const negative = location.state.negativePrompt // 사용한 부정 프롬프트
  const positive = 'test'
  const negative = 'test'

  // 23-11-17 오전 09:40 박지훈 작성
  // aws 연동을 위한 config
  aws.config.update({
    region : process.env.REACT_APP_AWS_DEFAULT_REGION,
    accessKeyId : process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey : process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
  })

  // s3 bucket 폴더명으로 사용할 사용자 아이디
  const userId = useSelector((state)=>state.session.id)
  // 쿼리스트링으로 이미지 경로 추출
  const [ query, setQuery] = useSearchParams()
  const img_id = query.get('img')
  // 이미지 경로
  const imgUrl = `${process.env.REACT_APP_AWS_BUCKET_URL}/${img_id}`

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
        onSave={(editedImageObject, designState) =>{
          console.log("saved", editedImageObject, designState)
          // 편집된 base64 이미지
          const base64 = editedImageObject.imageBase64
          // base64 이미지 데이터에서 데이터URI 스키마부분 제거 (data:[<미디어타입>];base64) 
          const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
          // 데이터 URI 스키마 부분에서 파일 형식 추출
          const type = base64.split(';')[0].split('/')[1];
          
          // s3 버킷에 저장될 경로, 파일명
            // 사용자이름(폴더)/랜덤값.파일형식
          const img_info = `${userId}/edit_img/${uuid()}.${type}`

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
          const promise = upload.promise()
          promise.then(
            ()=>{
              console.log('이미지 업로드 성공')
              axios.post("/imgCreate/saveImg", {
                userId : userId,
                positive : positive,
                negative : negative,
                img_info : img_info,
              })
            },
            (err)=>{
              console.log('이미지 업로드 실패', err)
            }
          )

        }
          
        }
        // 세이브 버튼 시 연관되는 함수. 현재는 편집된 사진이 원본+편집한 효과로 나뉘어져 파라미터로 별도 저장됨.
        
        annotationsCommon={{ fill: "#ff0000" }}
        Text={fontAnnotationsConfig}
        // 폰트 추가하는 곳.
        Rotate={{ angle: 90, componentType: "slider" }}
        
        Crop={{
          presetsItems: [
            {
              titleKey: "classicTv",
              descriptionKey: "4:3",
              ratio: 4 / 3,
              // icon: CropClassicTv, // optional, CropClassicTv is a React Function component. Possible (React Function component, string or HTML Element)
            },
            {
              titleKey: "cinemascope",
              descriptionKey: "21:9",
              ratio: 21 / 9,
              // icon: CropCinemaScope, // optional, CropCinemaScope is a React Function component.  Possible (React Function component, string or HTML Element)
            },
          ],
          presetsFolders: [
            {
              titleKey: "socialMedia", // will be translated into Social Media as backend contains this translation key
              // icon: Social, // optional, Social is a React Function component. Possible (React Function component, string or HTML Element)
              groups: [
                {
                  titleKey: "facebook",
                  items: [
                    {
                      titleKey: "profile",
                      width: 180,
                      height: 180,
                      descriptionKey: "fbProfileSize",
                    },
                    {
                      titleKey: "coverPhoto",
                      width: 820,
                      height: 312,
                      descriptionKey: "fbCoverPhotoSize",
                    },
                  ],
                },
              ],
            },
          ],
        }}
        // 세이브 버튼 및 추가 효과들
        tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK]} // or {['Adjust', 'Annotate', 'Watermark']}
        defaultTabId={TABS.ANNOTATE} // or 'Annotate'
        defaultToolId={TOOLS.TEXT} // or 'Text'
      />
    </div>
  );
}

export default EditImage;
