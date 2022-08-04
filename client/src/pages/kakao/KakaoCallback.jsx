import axios from "axios";
import { useEffect } from "react";
import url from '../../data/port.json';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";

/**
 * 카카오가 302 리다이렉트 해주는 페이지 컴포넌트
 * 카카오에서 받은 code를 서버에 get 요청함
 * 서버의 응답 결과에 따라서 
 * review/list 또는 oauth/signup으로 페이지 이동함
 */
const KakaoCallback = () => {
  const [cookiesAuth, setCookieAuth, removeCookieAuth] = useCookies(['auth']);
  const [cookies, setCookie, removeCookie] = useCookies(['userData']);
  const navigate = useNavigate();
  
  // kakao에서 redirect 해준 code 가져오는 부분
  const KAKAO_PARAMS = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    console.log(KAKAO_PARAMS);

    sendCode()
      .then(res => {
        console.log(res.data);

        if (res.data.login) { // true면 회원 가입된 상태
          setCookie('userData', res.data, { path: '/' });
          navigate('/review/list');
        } else { // false면 회원가입을 진행해야하는 상태
          setCookie('auth', res.data, { path: '/' });
          navigate('/oauth/signUp');
        }
      })
      .catch(err => {
        console.log(err);
        navigate('/');
      });

  }, []);

  // 카카오에서 받은 code를 서버에 get 요청함
  // params 는 query parameters 줄임말
  const sendCode = async () => {
    return await axios.get(url.url + `/auth/kakao`, {
      params: {
        code: KAKAO_PARAMS
      }
    });
  }
}

export default KakaoCallback;