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
        setChterms(e.target.checked)
    }

    const isPolicy = e => {
        setChpolicy(e.target.checked)
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
                <h2 className={style.tit}>
                    회원가입 약관
                </h2>
            </div>
            <div className = {style.terms}>
                1. 본 서비스를 이용하시려면 회원으로 가입하여야 합니다.<br></br>
                2. 가입 시 제공하는 정보는 정확하고 최신의 정보여야 합니다.<br></br>
                3. 본 서비스를 이용함에 있어서 관련 법령 및 약관을 준수하여야 합니다.<br></br>
                4. 회원은 자신의 계정 정보를 안전하게 관리해야 합니다.<br></br>
                5. 서비스 이용 중 법률을 위반하는 행위는 엄격히 금지됩니다.<br></br>
                6. 서비스 이용 중 발생하는 문제에 대한 책임은 회원 본인에게 있습니다.<br></br>
            </div>

            <div className={style.ch_policy}>
                <input type="checkbox" name="ch_terms" checked={chterms} onChange={isCh_terms}/>동의합니다.
            </div>

            <div className={style.agree_title}>
                <h2 className={style.tit}>
                    개인정보취급방침
                </h2>
            </div>

            <div className = {style.policy}>
                1. 본 서비스는 회원의 개인정보 보호를 위해 최선의 노력을 다하고 있습니다.<br></br>
                2. 수집하는 개인정보는 회원의 동의를 받은 범위 내에서만 이루어집니다.<br></br>
                3. 개인정보는 회원의 동의 없이 외부에 공개되지 않습니다.<br></br>
                4. 회원의 개인정보는 보안 조치가 철저히 이루어지며, 무단 접근을 방지하기 위해 노력하고 있습니다.<br></br>
                5. 회원은 언제든지 자신의 개인정보를 열람하고 수정할 수 있습니다.<br></br>
                6. 개인정보의 처리목적이 달라지는 경우에는 회원에게 사전 동의를 요청할 것입니다.<br></br>
            </div>

            <div className = {style.ch_policy}>
                <input type = "checkbox" name = "ch_policy" checked={chpolicy} onChange={isPolicy}/>동의합니다.
            </div>

            {/* <div className={style.agree_title}>
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
            </div> */}
            <div className={style.next}>
                <button type = "button" disabled={!userAgree} onClick={checkAgree} className={style.btt_next}>다음단계</button>
            </div>
        </form>
    )
}
