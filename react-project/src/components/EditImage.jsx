import React, { useState } from "react";
import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from "react-filerobot-image-editor";
import "../css/fonts.css";
import '../css/ImageEdit.css'

function EditImage() {
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
      { label: "Roboto", value: "Rovoto"},
      { label: "Pretendard", value : "Pretendard"},
      { label: 'PuradakGentleGothicR', value:'PuradakGentleGothicR'},
      { label: '필승고딕', value:'PilseungGothic'},
      { label: '도스고딕', value:'DOSGothic'},
      {label:'신라고딕', value:'Shilla_Gothic-Bold'},
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

  const img_save=()=>{

  }

  return (
    <div>
      <div className="inputarea"></div>  
      {/* 입력된 키워드 출력창 */}
      <div className="exceptarea"></div>
      {/* 제외된 키워드 출력창 */}

      {/* 이미지 편집창 */}
      <FilerobotImageEditor
        source="https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg"
        // 생성된 이미지 주소
        onSave={(editedImageObject, designState) =>
          console.log("saved", editedImageObject, designState)
          
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
