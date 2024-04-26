import React from 'react';
import { Link } from 'react-router-dom';
import naverImage from '../assets/images/naver.png';

const Naver = () => {
  const redirectUri = 'http://localhost:3000/oauth/naver';
  const naverApiKey = process.env.REACT_APP_NAVER_KEY;
  const state = 'false';
  const naverUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverApiKey}&state=${state}&redirect_uri=${redirectUri}
  `;

  return (
    <Link to={naverUrl}>
      <img src={naverImage} alt="네이버 로그인" style={{ width: 'auto', height: '40px', cursor: 'pointer' }} />
    </Link>
  );
};

export default Naver;
