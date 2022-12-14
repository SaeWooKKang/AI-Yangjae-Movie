import { useRef } from "react";
import axios from "axios";
import port from '../../data/port.json'
import { useState } from "react";

const SignUpForm = props => {
  const { signUpdata, handleChangeSignUpData, setSignUpdata } = props;

  const emailRef = useRef();
  const passwordRef = useRef();
  const rePasswordRef = useRef();
  const nameRef = useRef();

  const [errorMessage, setErrorMessage] = useState('');


  const handleClickSignUpButton = async () => {
    if (!signUpdata.email) {
      alert('이메일을 입력해주세요.');
      emailRef.current.focus();

      return;
    } else if (!signUpdata.password) {
      alert('비밀번호를 입력해주세요.');
      passwordRef.current.focus();
      
      return;
    } else if (!signUpdata.rePassword) {
      alert('비밀번호 확인을 입력해주세요.');
      rePasswordRef.current.focus();

      return;
    } else if (!signUpdata.name) {
      alert('이름을 입력해주세요.');
      nameRef.current.focus();

      return;
    } 

    if (signUpdata.password !== signUpdata.rePassword) {
      alert('비밀번호와 비밀번호 확인이 같지 않습니다.');
      setSignUpdata((prev) => ({...prev, rePassword: '', password: ''}))
      
      passwordRef.current.focus();
    }

   sendSignUpData()
    .then(res => {
      console.log(res);
      alert(res.data.result)
      // window.location.reload();
    })
    .catch(err => {
      setErrorMessage(err.response.data.error)
    });
  };
  const sendSignUpData = () => {
    return axios.post(`${ port.url }/user/signUp`, signUpdata); 
  }

  return (
    <div className="album">
      <div className="container">
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input ref={emailRef} value={signUpdata.email} onChange={handleChangeSignUpData} type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input ref={passwordRef} value={signUpdata.password} onChange={handleChangeSignUpData} type="password" className="form-control" name="password" id="password" />
          </div>
          <div className="mb-3">
            <label htmlFor="rePassword" className="form-label">rePassword</label>
            <input ref={rePasswordRef} value={signUpdata.rePassword}onChange={handleChangeSignUpData} type="password" className="form-control" name="rePassword" id="rePassword" />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">name</label>
            <input ref={nameRef} value={signUpdata.name} onChange={handleChangeSignUpData} type="" className="form-control" name='name' id="name" />
          </div>
          <p className="text-danger">
            { errorMessage }
          </p>
          <button onClick={ handleClickSignUpButton } type="button" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;