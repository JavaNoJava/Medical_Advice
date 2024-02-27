import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import modifypw from '../css/ModifyMyPw.module.css'

export default function ModifyInputUserPw(){
    const [newPw, setNewPw] = useState('')
    const [pwChk, setPwchk] = useState('')
    const [checkPw, setCheckPw] = useState(false)
    const [complete, setComplete] = useState(true)
    const [checkCurrentPw, setChkCurrentPw] = useState(true)
    const [currentpw, setCurrentpw] = useState('')

    const navigate = useNavigate();
    const location = useLocation();
    const upw = location.state.upw


    const input_currentpw = e => {
       if(e.target.value){
            setChkCurrentPw(false)
            setCurrentpw(e.target.value)
       }else{
            setChkCurrentPw(true)
       }
    }
    useEffect(()=>{
        if(newPw && pwChk){
            setComplete(false)
        } else{
            setComplete(true)
        }
    }, [newPw, pwChk])

    const input_newpw = e => {
        setNewPw(e.target.value)
    }

    const input_newpwcheck = e => {
        setPwchk(e.target.value)
    }
    const chkPw = e => {
        if(newPw === pwChk){
            return false
        } else{
            alert('설정한 비밀번호와 다릅니다.')
            return true
        }
    }
    const btn_checkCurrentPw = e => {
        if(upw === currentpw){
            setCheckPw(true)
        }else{
            setCheckPw(false)
            alert('현재비밀번호와 다릅니다.')
        }
    }
    const btn_modifyPw = async()=>{
        if(chkPw()){
            return;
        }
        const userPw = {
            'uPw' : newPw,
        }
        try{
            const response = await axios.post('/user/modifyUserPw', userPw)
            alert(response.data)
            navigate('/')
        } catch(err){
            console.log(err)
        }
    }
    return (
        <>
            {
                
                checkPw ? 
                    <>
                      <div className={modifypw.iconbox}>
                            <h3>
                                <i className="fa-solid fa-circle icon"></i>
                                새 비밀번호
                            </h3>
                        </div>
                        <div className={modifypw.input_pwbox}>
                            <div className={modifypw.input_newpwbox}>
                                <input type="text" className={modifypw.input_currentpw} onChange={input_newpw}/>
                            </div>
                            <div className={modifypw.input_newpwchkbox}>
                                <input type="text" className={modifypw.input_currentpw} onChange={input_newpwcheck}/>
                            </div>
                        </div>  
                        <button className={modifypw.checkCurrentPw} onClick={btn_modifyPw}>비밀번호 재설정</button>
                    </>
                    :
                    <>
                        <div className={modifypw.iconbox}>
                            <h3>
                                <i className="fa-solid fa-circle icon"></i>
                                현재 비밀번호
                            </h3>
                        </div>
                        <div className={modifypw.input_pwbox}>
                            <input type="password" className={modifypw.input_currentpw} onChange={input_currentpw}/>
                            <button className={modifypw.checkCurrentPw} disabled={checkCurrentPw} onClick={btn_checkCurrentPw}>비밀번호 확인</button>
                        </div> 
                    </>
            }
           
        </>
    )
}