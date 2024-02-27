import React, { useEffect, useState } from "react";
import style from '../css/AssignAccept.module.css'
import { useNavigate } from "react-router-dom";

export default function AssignAccept(){
    // boolean
    const [chterms, setChterms] = useState(false)
    const [chpolicy, setChpolicy] = useState(false)
    const [userAgree, setUserAgree] = useState(false)

    const navigate = useNavigate()
    const checkAgree = e => {
        navigate('/medicsignup')
    }
    const isCh_terms = e => { 
        if(e.target.value === 'agree'){
            setChterms(true)
        } else(
            setChterms(false)
        )
    }
    const isPolicy = e => {
        if(e.target.value === 'agree'){
            setChpolicy(true)
        } else{
            setChpolicy(false)
        }
    }
    useEffect(()=>{
        if(chterms && chpolicy){
            setUserAgree(true)
        } else{
            setUserAgree(false)
        }
    },[chterms, chpolicy])
    return(
        <form className={style.assignform}>
            <div className = {style.signup}>
                {/*<img src="/" alt="회원가입"> */}
            </div>
            <br/>
            <div className={style.agree_title}>
                <h2>
                    <i className="fa-solid fa-circle icon"></i>
                    회원가입 약관
                </h2>
            </div>
            <div className = {style.terms}>
            ~~~~회원가입 약관~~~~
            </div>

            <div className = {style.ch_terms}>
                <input type = "radio" name = "ch_terms" value='agree' onChange={isCh_terms}/>동의함
                <input type = "radio" name = "ch_terms" value='notagree' onChange={isCh_terms}/>동의하지 않음
            </div>
            <div className={style.agree_title}>
                <h2>
                    <i className="fa-solid fa-circle icon"></i>
                    개인정보취급방침
                </h2>
            </div>

            <div className = {style.policy}>
                ~~~~개인정보취급방침~~~~
            </div>

            <div className = {style.ch_policy}>
                <input type = "radio" name = "ch_policy" value='agree' onChange={isPolicy}/>동의함
                <input type = "radio" name = "ch_policy" value='notagree' onChange={isPolicy}/>동의하지 않음
            </div>

            <div className={style.agree_title}>
                <h2>
                    <i className="fa-solid fa-circle icon"></i>
                    본인인증절차
                </h2>
            </div>
            <div className = {style.ph_certification}>
                <div className ={style.certification1}>
                    <div className = {style.text_num}>
                        <label htmlFor="phone_num">휴대폰번호</label>   
                        <input type = "text" name = "phone_num" className={style.certification} maxLength={13}/>
                    </div>
                    <div className = {style.text_num}>
                        인증 번호 &nbsp;
                        <input type = "text" name = "certificationo_num" className={style.certification} maxLength={6}/>
                    </div>
                </div>
                <br/>
                <div className ={style.certification2}>
                    <button type = "button" onClick={()=>alert('인증정보')} className={style.btt_certifi}>인증문자요청</button>                  
                    &nbsp;&nbsp; <span className={style.certifi_text}>휴대폰 문자로 받으신 인증 번호 6자리를 입력해 주십시오.</span>
                </div>
            </div>
            <div className={style.next}>
                <button type = "button" disabled={!userAgree} onClick={checkAgree} className={style.btt_next}>회원 가입 다음단계</button>
            </div>
        </form>
    )
}
