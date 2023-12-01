import React, { useRef, useState } from "react";
import axios from "../axios";
import "../css/DeleteModal.css";

const DeleteModal = ({
  delete_user, // 모달창 활성화 state
  delete_Modal, // 모달창 함수
}) => {
  const [deleteText, setDeleteText] = useState("");
  const [understanText, setUnderstanText] = useState("");
  const inputRef = useRef();

  // 23-11-14 오후 16:00 박지훈 작성
  /** 회원탈퇴 함수 */
  const Drop_user = (e) => {
    e.preventDefault();
    if (inputRef.current.value === "이해했습니다.") {
      axios.post("/user/deleteUser").then((res) => {
        if (res.data.deleteStatus) {
          alert("정상적으로 탈퇴 되었습니다.");
          window.location.href = "/";
        }
      });
    } else {
      setDeleteText("다시 입력해주세요.");
      setUnderstanText("-try");
    }
  };

  return (
    <div>
      {delete_user ? (
        <div>
          <div className="modal-backdrop" onClick={delete_Modal}>
            <div
              className={`delete-Modal${understanText}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="delete-Title">
                <h3>회원탈퇴</h3>
              </div>
              <hr />
              <div className="delete-text-box">
                <span>
                  탈퇴 버튼 클릭 시, 계정은 삭제되며 복구되지 않습니다.
                </span>
                <span>계속하시려면 '이해했습니다.'를 입력해 주세요.</span>
                <div>
                  <input type="text" ref={inputRef} />
                </div>
                <span>{deleteText}</span>
              </div>
              <hr />
              <div className="delete-btn">
                <button className="deleteUser-Btn" onClick={Drop_user}>
                  회원탈퇴
                </button>
                <button
                  className="close-Btn"
                  onClick={() => {
                    setDeleteText("")
                    delete_Modal();
                    setUnderstanText("");
                  }}
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DeleteModal;
