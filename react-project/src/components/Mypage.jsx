import React, { useEffect, useState } from "react";
import "../css/Mypage.css";
import "../css/UserInfo.css";
import UserInfo from "./UserInfo";
import { useSelector } from "react-redux";
import SaveImage from "./SaveImage";

const Mypage = () => {
  const name = useSelector((state) => state.session.name)
  const isLogin = useSelector((state) => state.session.isLogin)
  const [pageState, setpageState] = useState("user_info");

  useEffect(() => {
    if(isLogin){
      console.log("mypage의 name", name);
      console.log("mypage의 isLogin", isLogin);
    }
  }, [])

  //내 정보 컴포넌트 호출
  const user_infoPage = () => {
    console.log("내 정보 페이지 조건함수")
    setpageState("user_info");
  };

  // 내 저장 이미지 컴포넌트 호출
  const Save_Image = () => {
    setpageState("Save_Image");
  };

  return (
    <div className="MyConatainer">
      <div className="Container">
        <div className="user">
          {/* 삼항 연산자로 className을 변경하여 css 적용 및 컴포넌트 호출 */}
          <div className={`user-box ${pageState==='user_info'? 'box-current' : null}`} onClick={ user_infoPage }>
            <span className="Side-text">내 정보</span>
          </div>
          <div className={`user-box ${pageState==='Save_Image'? 'box-current' : null}`} onClick={ Save_Image }>
            <span>내 저장 이미지</span>
          </div>
          <div className="user-box">
            <span>주문 내역</span>
          </div>
        </div>
      </div>
      {pageState === "user_info" && <UserInfo />}
      {pageState === "Save_Image" && <SaveImage />}
    </div>
  );
};

export default Mypage;
