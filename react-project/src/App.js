import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Body from "./components/Body";
import { useEffect } from "react";
import axios from 'axios'

function App() {

  useEffect(()=>{
    axios.post('http://localhost:3001/user/getUserInfo')
      .then((res)=>{
        console.log(res.data)
      })
  },[])

  return (
    <div>
     <Body/>
    </div>
  );
}

export default App;
