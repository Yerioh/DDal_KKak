import React from "react";
import axios from "../axios";
import "../css/DeleteModal.css";
const DeleteModal = ({
  delete_user, // 모달창 활성화 state
  delete_Modal, // 모달창 함수
}) => {
  //회원탈퇴함수
  const Drop_user = () => {
    axios.post("", {}).then((res) => {});
  };
    /*
        회원탈퇴
        delete_user => 모달창 활성화 state
        delete_Modal = > 모달창 활성화 함수
    */
  return (
    <div>
      {delete_user ? (
        <div>
          <div className="modal-backdrop" onClick={delete_Modal}>
            <div className="delete-Modal" onClick={(e) => e.stopPropagation()}>
              <div>
                <h3>회원탈퇴</h3>
              </div>
              <hr />
              <div className="delete-text">
                <span>
                  탈퇴 버튼 클릭 시, 계정은 삭제되며 복구되지 않습니다.
                </span>
              </div>
              <hr />
              <div className="delete-btn">
                <button className="deleteUser-Btn" type="submit">
                  회원탈퇴
                </button>
                <button className="close-Btn" onClick={delete_Modal}>
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