const { Router } = require('express');
const router = Router();
const axios = require("axios");
const { User } = require("./../models");
const jwt = require("jsonwebtoken");
const jwtConfig = require("./../config/jwtConfig");

/**
 * 카카오에서 리다이렉션 해준 KakaoCallback 페이지 컴포넌트에서 
 * 요청을 받는 라우터
 * params로 인가code를 전송 받음
 * kakao 서버에 인가code 전송해서 토큰 받아오고
 * 받은 토큰으로 kakao 서버에 유저 정보 요청
 * 받아온 유저 정보로 DB에 유저 정보 확인
 * 유저 정보 
 *   있으면 -> 토큰 발행하고 로그인 처리
 *   없으면 -> kakao에서 받은 유저 정보 json으로 프론트에 넘김
 */
router.get("/kakao", async (req, res, next) => {

    const REST_API_KEY = "ef5c3d4f03d4471699a03f3dd4721007";
    const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";

    // query params 받는 부분 
    const KAKAO_CODE = req.query.code;
    // console.log(KAKAO_CODE);

    try {

        /**
         * 4번 
         * (인가 코드) -> (토큰) 요청하는 것
         */
        await axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`, {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
            .then(getToken => {
                // 5번
                // 가져온 토큰으로 kakao에 유저 정보 요청
                // console.log(getToken.data.access_token);
                getKakaoUserData(getToken.data.access_token)
                    .then(userData => {

                        // 가져온 유저정보가져와서 콘솔.
                        console.log(userData.data);

                        // user check 함수
                        checkUserData(userData.data, res);

                });
        });

    } catch (e) {
        next(e);
    }

});

const checkUserData = async (userData, res) => {
  const checkEmail = await User.findOne({ email: userData.kakao_account.email });

  try {

    if (checkEmail) {    //checkEmail이 존재한다면? 가입이되어있다면?
        //로그인 진행

        jwt.sign({
            email: checkEmail.email,
            name: checkEmail.name
        }, jwtConfig.secret, {
            expiresIn: '1d' //1y,1d,2h,1m,5s
        }, (err, token) => {
            if (err) {
                res.status(401).json({ status: false, message: "로그인을 해주세요." });
            } else {
                res.json({
                    login: true,
                    status: true,
                    accessToken: token,
                    email: checkEmail.email,
                    name: checkEmail.name
                });
            }
        })
      } else {
          // userData.login = false 담아서 
          // client server에서 
          // 회원가입 페이지로 보내줌
          userData.login = false;
          res.json(userData);
      }

  } catch (e) {
      console.log(e);
  }

}


// 토큰으로 카카오 유저 정보 가져오는 부분
const getKakaoUserData = async (token) => {

    return await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    })

}

module.exports = router;
