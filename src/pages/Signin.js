import React from "react";
import { Menu , Form ,Container,Message} from "semantic-ui-react";
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import { useHistory } from "react-router-dom";
import "firebase/auth";
import firebaseConfig from '../utils/firebase'; // 引入 firebaseConfig

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function Signin(){
     const history =useHistory();
     const[activeItem,setActiveItem] = React.useState('register');
     const[email,setEmail]=React.useState("");
     const[password,setPassword]=React.useState("");
     const[errorMessage,setErrorMessage]=React.useState("");
     const[isLoading,setIsLoading] = React.useState(false);

    function onSubmit(){
      setIsLoading(true);
      if (!firebase.apps.length) { // 檢查是否已初始化 Firebase
        firebase.initializeApp(firebaseConfig); // 若未初始化，則初始化 Firebase
      }
      
      if(activeItem === 'register'){
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(()=> {
          history.push("/"); 
          setIsLoading(false);
        })
        .catch((error) => {
          switch(error.code){
            case "auth/email-already-in-use":
              setErrorMessage("信箱已存在");
              break;
            case "auth/invalid-email":
              setErrorMessage("信箱格式不正確");
              break;
            case "auth/weak-password":
              setErrorMessage("密碼強度不足,so weak!");
              break;
            default:
          }; // 輸出錯誤訊息
          setIsLoading(false);
        });
      } else if(activeItem === 'signin'){
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(()=>{
          history.push("/")
          setIsLoading(false);
        })
        .catch((error) => {
          switch(error.code){
            case "auth/invalid-email":
              setErrorMessage("信箱格式不正確");
              break;
            case "auth/invalid-credential":
              setErrorMessage("信箱不存在");
              break;
            case "auth/":
              setErrorMessage("密碼錯誤,so weak!");
              break;
            default:
          };
          setIsLoading(false);
        });
      }
    }
    return (
     <Container>
      <Menu widths="2">
        <Menu.Item active={activeItem === 'register'} 
        onClick={() => {
          setErrorMessage("");
          setActiveItem('register')}}
        >註冊</Menu.Item>
        <Menu.Item active={activeItem === 'signin'} 
        onClick={() => {
          setErrorMessage("");
          setActiveItem('signin')}}
        >登入</Menu.Item>
      </Menu>
      <Form onSubmit={onSubmit}>
        <Form.Input label="信箱 " 
        value={email} onChange={(e)=> setEmail(e.target.value)} 
        placeholder="請輸入信箱" />
        <Form.Input label="密碼 " 
        value={password} onChange={(e)=> setPassword(e.target.value)}
        placeholder="請輸入密碼" 
        type="password"
        />
        {errorMessage && <Message negative>{errorMessage}</Message>}
        <Form.Button loading={isLoading}>
            {activeItem ==='register' && '註冊'}
            {activeItem ==='signin' && '登入'}
        </Form.Button>
      </Form>
     </Container>
    );
}

export { firebaseConfig }; // 修正匯出 firebaseConfig

export default Signin;