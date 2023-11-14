import React, { useEffect, useState } from "react";
import "../css/Mypage.css";
import "../css/UserInfo.css";
import UserInfo from "./UserInfo";
import { useSelector } from "react-redux";
import SaveImage from "./SaveImage";
import axios from "../axios";

const Mypage = () => {
  // 231114 14:05 임휘훈 작성 redux, props, useEffect
  const name = useSelector((state) => state.session.name) // redux에 저장된 회원 이름
  const isLogin = useSelector((state) => state.session.isLogin) // redux에 저장된 로그인 유무
  const loginType = useSelector((state) => state.session.loginType) // redux에 저장된 로그인 타입
  const id = useSelector((state) => state.session.id) // redux에 저장된 회원 아이디
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()

  const [pageState, setpageState] = useState("user_info");

  useEffect(() => {
    if(isLogin){
      axios.post("/user/mypage", {userID : id})
      .then((res) => {
        console.log("마이페이지 DB에서 온 유저 정보", res.data);
        setEmail(res.data.member_email) // DB에서 가져온 Email을 state에 저장
        setPhone(res.data.member_phone) // DB에서 가져온 전화번호를 state에 저장
      })
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
      {pageState === "user_info" && <UserInfo userName ={name} loginType={loginType} id={id} email={email} phone={phone} />}
      {pageState === "Save_Image" && <SaveImage />}
    </div>
  );
};

export default Mypage;
