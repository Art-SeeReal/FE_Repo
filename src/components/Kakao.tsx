import React from 'react';
import { Link } from 'react-router-dom';
import kakaoImage from '../assets/images/kakao.png';

const Kakao = () => {
  const redirectUri = 'http://localhost:3000/oauth/kakao';
  const kakaoApiKey = process.env.REACT_APP_KAKAO_KEY;
  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoApiKey}&redirect_uri=${redirectUri}&response_type=code`;

  return (
    <Link to={kakaoUrl}>
      <img src={kakaoImage} alt="카카오 로그인" style={{ width: 'auto', height: '40px', cursor: 'pointer' }} />
    </Link>
  );
};

export default Kakao;
