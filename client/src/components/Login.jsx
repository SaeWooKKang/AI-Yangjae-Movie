import { useEffect } from "react";
import { useState } from "react";
import SignInForm from "../pages/user/SignInForm";
import SignUpForm from "../pages/user/SignUpForm";

// kevin0181

const Login = () => {
  // view를 변경하기 위한 useState
  const [view, setView] = useState({
    signIn: false,
    signUp: false
  });

  // 로그인 입력받을 데이터를 props로 넘겨줌
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  // 회원가입 입력받을 데이터를 props로 넘겨줌
  const [signUpdata, setSignUpdata] = useState({
    email: '',
    password: '',
    rePassword: '',
    name: ''
  });
  
  const handleChangeSignInData = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value 
    });
  }
  const handleChangeSignUpData = (e) => {
    setSignUpdata({
      ...signUpdata,
      [e.target.name]: e.target.value 
    });
  }

  return (
    <main>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Movie</h1>
            <p className="lead text-muted">리뷰하고 싶은 영화를 추가하고, 
              별점을 주세요. <br />
              또한 삭제, 수정이 가능합니다.
            </p>
            <p>
              <button onClick={() => setView({signIn: true, signUp: false})} className="btn btn-primary my-2 m-1" >로그인</button>
              <button onClick={() => setView({signIn: false, signUp: true})} className="btn btn-secondary my-2 m-1">회원가입</button>
            </p>
          </div>
        </div>
      </section>
      {
        view.signIn && <SignInForm 
          signInData={ signInData } 
          handleChangeSignInData={ handleChangeSignInData } />
      }
      {
        view.signUp && <SignUpForm 
          setSignUpdata={ setSignUpdata }
          signUpdata={ signUpdata }
          handleChangeSignUpData={ handleChangeSignUpData } />
      }
    </main>
  );
}

export default Login;