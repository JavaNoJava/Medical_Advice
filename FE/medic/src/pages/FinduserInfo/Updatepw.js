import React, { useEffect, useState } from "react";
import axios from "axios";
import style from '../../css/Updatepw.module.css'
import { useLocation, useNavigate } from "react-router-dom";
import Footer from '../../components/Footer'

export default function Updatepw() {
    const [updateuserpw, setUpdateuserpw] = useState('')
    const [newpwEmpty, setNewpwEmpty] = useState(false)
    const [updateUserPwChk, setUpdateUserPwChk] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    const uId = location.state.uId
    const uEmail = location.state.uEmail

    const input_updatepw = e => {
        setUpdateuserpw(e.target.value)
    }
    const input_updatePwChk = e => {
        setUpdateUserPwChk(e.target.value)
    }
    useEffect(()=>{
        if(updateuserpw && updateUserPwChk){
            setNewpwEmpty(false)
        }else{
            setNewpwEmpty(true)
        }
    }, [updateuserpw, updateUserPwChk])
    const btn_update_pw = async(e) => {
        if(updateuserpw === updateUserPwChk){
            const userPw = {
                'newUpw' : updateuserpw,
                'uId' : uId,
                'uEmail' : uEmail
            }
            try{
                const response = await axios.post('/login/findPw/updatePw', userPw)
                alert(response.data)
                navigate('/mediclogin')
            } catch(err){
                console.log(err)
            }
        } else{
            alert("설정하신 비밀번호와 다릅니다.")
        }
    }


    return(

        <>
            <div className={style.Finduserwrap}>
                <div className={style.FinduserBox}>
                    <h3 className={style.Find_titlebox}>
                        비밀번호 재설정
                    </h3>
                    <div className={style.Find_userInfoContentBox}>
                        <h4 className={style.Find_userInfoContent_title}><span className={style.Find_userInfoContent_titleimg}></span>새 비밀번호</h4>
                        <div className={style.Find_userInfoInnnerBox}>
                            <div className={style.Find_userIdPwBox}>
                                <p className={style.Find_userIdPw_title}>
                                비밀번호 재설정
                                </p>
                                <div className={`${style.Find_userPwimg} ${style.Find_userIdPwimg}`}></div>
                                <div className={style.Find_inputIdInfobox}>
                                    <div className={style.Find_inputInfo_innerbox}>
                                        새 비밀번호 <span className={style.inputbox}><input type="password" className={style.input} onChange={input_updatepw} maxLength={15}></input></span>
                                    </div>
                                    <div className={style.Find_inputInfo_innerbox}>
                                        새 비밀번호 확인 <span className={style.inputbox}><input type="password" className={style.input} onChange={input_updatePwChk} maxLength={15}></input></span>
                                    </div>
                                    <div className={style.btn_findbtnbox}>
                                        <button className={style.btn_findbtn} disabled={newpwEmpty} onClick={btn_update_pw}>비밀번호 재설정</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
            <Footer/>
        </>
    )
}