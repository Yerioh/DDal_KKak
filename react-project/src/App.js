import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Body from "./components/Body";
import { useDispatch, useSelector } from "react-redux";
import { SessionReducerActions } from "./redux/reducers/sessionSlice";
import { useEffect } from "react";
import axios from "./axios";

function App() {
  // 23-11-14 09:44 임휘훈 작성
  const name = useSelector((state) => state.session.name)
  const isLogin = useSelector((state) => state.session.isLogin)
  const dispatch = useDispatch()

  // 박지훈 작성
  useEffect(()=>{
    axios.post('/user/getUserInfo')
      .then((res)=>{
        if (res.data.isLogin){ // 세션에 저장된 isLogin이 true일 때 => 로그인 했을 때
          dispatch(SessionReducerActions.sessionName(res.data.userName)) // 세션에 저장된 회원 이름으로 변경
          dispatch(SessionReducerActions.sessionLoginType(res.data.loginType)) // 세션에 저장된 로그인타입으로 변경
          dispatch(SessionReducerActions.sessionID(res.data.userId)) // 세션에 저장된 로그인타입으로 변경
          dispatch(SessionReducerActions.login()) // 로그인 
        }
      })
  },[])

  // 박지훈 작성 끝

  return (
    <div>
     <Body/>
    </div>
  );
}

export default App;
