import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
    const navigate = useNavigate();    
    const mainPage = () =>{
        navigate('/');
    }
  return (
    <div>
      <h1>오류가 발생했습니다.</h1>
      <p>권한이 없는 사용자입니다.</p>
      <button onClick={mainPage}>메인페이지</button>
    </div>
  );
}
