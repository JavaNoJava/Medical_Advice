import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import style from '../css/Loginpage.module.css'


export default function Loginpage(){
    const [uid, setUid] = useState('');
    const [upw, setUpw] = useState('');
    const [errmsg, setErrmsg] = useState('')
    const navigate = useNavigate();
    const [role, setRole] = useState([]);
    
    const inputId = e => {
        setUid(e.target.value)
    }
    const inputPw = e => {
        setUpw(e.target.value)
    }
    const userLogin = async(e) => {
        e.preventDefault();
        console.log(1)
        const userInfo = {
            'uId' : uid,
            'uPw' : upw,
            'role' : role
        }
        try{
            const response = await axios.post('/login', userInfo)
            console.log(response.status)
            if(response.status === 200){
                alert('로그인 되었습니다.')
                navigate('/', {state : {isLogin : true}})
            } else{
                setErrmsg('아이디와 비밀번호를 확인하세요.')
            }
        } catch(err){
            setErrmsg('아이디와 비밀번호를 확인하세요.')
        }
    }
    const btn_show_mainpage = e => {
        navigate('/')
    }
    const btn_user_siginup = e => {
        navigate('/medicassign')
    }
    const btn_finduserinfo = e => {
        navigate('/medic/finduserinfo')
    }
    const handleClickUserRadio = (e) => {
        setRole("user")
    }
    const handleClickConsultativeRadio = (e) => {
        setRole("consultative")
    }
    const handleClickAdminRadio = (e) => {
        setRole("manager")
    }

    return(
               <div className={style.contents}>
               <form name="dataForm" className={style.loginform}>            
                   <div className = {style.loginbox}>
                    <div className = {style.loginbox_box}>
                        <div className={style.loginimg} onClick={btn_show_mainpage}></div>
                        <h1 className={style.logintext}>Login</h1>
                        <div className={style.inputbox}>
                            <div className={style.rolebox}>
                                <input type="radio" vlaue="user" checked={role === "user"} onChange={handleClickUserRadio}/> 일반회원
                                <input type="radio" vlaue="consultative" checked={role === "consultative"} onChange={handleClickConsultativeRadio}/> 전문의
                                <input type="radio" vlaue="manager" checked={role === "manager"} onChange={handleClickAdminRadio}/> 관리자
                            </div>
                        </div>
                        <div className={style.inputbox}>
                            <div className={`${style.input} ${style.inputid}`}>
                                <label htmlFor="id">
                                    <h3>아이디</h3>
                                </label>
                            <div className={style.textbox}>
                                <input type="text" name="uid" className={`${style.uid} ${style.inputtext}`} placeholder="아이디를 입력하세요." onChange={inputId} maxLength={12}/>
                            </div>
                        </div>
                        <div className={`${style.input} ${style.inputpassoword}`}>
                            <label htmlFor="upw">
                                <h3>비밀번호</h3>
                            </label>
                            <div className={style.textbox}>
                                <input type="password" name="upw" className={`${style.upw} ${style.inputtext}`} placeholder="비밀번호를 입력하세요." onChange={inputPw} maxLength={15}/>    
                            </div>
                        </div>
                        <div className={style.errmsgbox}>
                            <div className = {style.errmsg}>
                                  {errmsg}
                            </div>                               
                        </div>
                    </div>
                    <div className={style.signbtnbox}>                            
                        <input type="submit" className={style.signbtn} value ="로그인" onClick={userLogin}/>
                        <span><small>아직 회원이 아니라면?<input type="submit" className={style.gotosignup} value="회원가입" onClick={btn_user_siginup}/></small></span>
	                    <span><small>잘 기억이 나지 않으시다면?<input type="submit" className={style.findidpw} value="ID/PW 찾기" onClick={btn_finduserinfo}/></small></span>
                    </div>
                </div>
            </div>
        </form>
    </div>     
    )   
}