import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import style from '../css/Loginpage.module.css'
import Footer from '../components/Footer'

export default function Loginpage(){
    const [uid, setUid] = useState('');
    const [upw, setUpw] = useState('');
    const [errmsg, setErrmsg] = useState('')
    const navigate = useNavigate();
    const [role, setRole] = useState('user');
    
    const inputId = e => {
        setUid(e.target.value)
    }
    const inputPw = e => {
        setUpw(e.target.value)
    }
    const userLogin = async(e) => {
        e.preventDefault();
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
            <>
               <div className={style.contents}>
               <form name="dataForm" className={style.contents_box}> 
                    <h3 className={style.login_titlebox}>
                        <div className={style.login_title}>
                            로그인
                        </div>
                    </h3>           
                   <div className = {style.loginform}>
                    <div className={style.login_box}>
                        <div className={style.rolebox}>
                            <input type="radio" vlaue="user" checked={role === "user"} onChange={handleClickUserRadio}/> 일반회원
                            <input type="radio" vlaue="consultative" checked={role === "consultative"} onChange={handleClickConsultativeRadio}/> 전문의
                            <input type="radio" vlaue="manager" checked={role === "manager"} onChange={handleClickAdminRadio}/> 관리자
                        </div>
                        <div className={style.input}>
                            <div className={style.inputbox}>
                                <div className={style.input_idpwbox}>
                                    <div className={style.input_title}>
                                        아이디
                                    </div>
                                    <div className={style.input_background}>
                                        <input type='text'className={style.input_idpw} onChange={inputId} maxLength={12}/>
                                    </div>
                                </div>
                                <div className={style.input_idpwbox}>
                                    <div className={style.input_title}>
                                        비밀번호
                                    </div>
                                    <div className={style.input_background}>
                                        <input type='text' className={style.input_idpw} onChange={inputPw} maxLength={15}/>
                                    </div>
                                </div>
                            </div>
                            <div className={style.loginbutton}>
                                <button className={style.loginbutton} onClick={userLogin}>
                                    로그인
                                </button>
                            </div>
                            <br/>
                            
                        </div>
                        <div className={style.errmsgbox}>
                            <div className = {style.errmsg}>
                                  {errmsg}
                            </div>                               
                        </div>
                        <div className={style.etcwrap}>
                            <div className={style.etcbox}>
                                <div className={style.etc_innerbox}>
                                    <div className={style.etctitle}>
                                        <i class="fa-solid fa-lock" style={{color: "#848e9f"}}></i>
                                        아직 회원가입을 안하셨나요?
                                    </div>
                                    <button className={style.btn_movepage} onClick={btn_user_siginup}>회원가입</button>
                                </div>
                                <div className={style.etc_innerbox}>
                                    <div className={style.etctitle}>
                                    <i class="fa-solid fa-magnifying-glass" style={{color: "#848e9f"}}></i>
                                        아이디 비밀번호를 잊으셨나요?
                                    </div>
                                    <button className={style.btn_movepage} onClick={btn_finduserinfo}>ID/PW 찾기</button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div> 
        </form>
    </div>     
    <Footer/>
    </>
    )   
}