import { useRef } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import port from '../../data/port.json'
import { useState } from "react";
import { useCookies } from 'react-cookie';



const SignInForm = (props) => {
  const {signInData, handleChangeSignInData} = props;
  const [cookies, setCookie, removeCookie] = useCookies(['userData']);
  
  const navigate = useNavigate();

  
  const [errorMeaaage, setErrorMessage] = useState('');

  const emailInput = useRef();
  const passwordInput = useRef();

  const handleClickLoginButton = () => {
    if (!signInData.email) {
      alert('이메일을 입력해주세요.');
      emailInput.current.focus();

      return ;
    } else if (!signInData.password) {
      alert('비밀번호를 입력해주세요.');
      passwordInput.current.focus();

      return ;
    }

    sendSignInData()
      .then(res => {
        if (res.data.status) {
          // 쿠키 저장
          setCookie('userData', res.data, { path: '/' });

          alert('로그인이 완료 되었습니다.');

          // 페이지 이동
          navigate('/review/list');
        }
      })
      .catch(err => setErrorMessage(err.response.data.fail))
      .finally(() => {
        console.log(
          'cookie!', cookies.userData
        );
      })
  }

  const sendSignInData = () => {
    return axios
      .post(`${ port.url }/user/login`, signInData); 
  }
  
  return (
    <div className="album">
      <div className="container">
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input ref={ emailInput } value={ signInData.email } type="email" onChange={ handleChangeSignInData } className="form-control" name='email' id="email" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input ref={ passwordInput } value={ signInData.password } type="password" onChange={ handleChangeSignInData } className="form-control" name='password' id="password" />
          </div>
          <div className="mb-3">
            <p className="text-danger">
              { errorMeaaage }
            </p>
          </div>
          <button onClick={ handleClickLoginButton } type="button" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default SignInForm;