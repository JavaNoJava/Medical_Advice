import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import changePw from '../css/ChangeConsultativePw.module.css'

export default function ChangeInputConsultativePw(){
    const [newPw, setNewPw] = useState('')
    const [pwChk, setPwchk] = useState('')
    const [checkPw, setCheckPw] = useState(false)
    const [complete, setComplete] = useState(true)
    const [checkCurrentPw, setChkCurrentPw] = useState(true)
    const [currentpw, setCurrentpw] = useState('')

    const navigate = useNavigate();
    const location = useLocation();
    const cPw = location.state.cPw


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
            alert('설정한 비밀번호와 같습니다.')
            setComplete(false)
        } else{
            alert('설정한 비밀번호와 다릅니다.')
            setComplete(true)
        }
    }
    const btn_checkCurrentPw = e => {
        if(cPw === currentpw){
            setCheckPw(true)
        }else{
            setCheckPw(false)
            alert('현재비밀번호와 다릅니다.')
        }
    }
    const btn_modifyPw = async()=>{
        const consultativePw = {
            'cPw' : consultativePw,
        }
        try{
            const response = await axios.post('/consultative/modifyConsultativePw', consultativePw)
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
                      <div className={changePw.iconbox}>
                            <h3>
                                <i className="fa-solid fa-circle icon"></i>
                                새 비밀번호
                            </h3>
                        </div>
                        <div className={changePw.input_pwbox}>
                            <div className={changePw.input_newpwbox}>
                                <input type="text" className={changePw.input_currentpw} onChange={input_newpw}/>
                            </div>
                            <div className={changePw.input_newpwchkbox}>
                                <input type="text" className={changePw.input_currentpw} onChange={input_newpwcheck} onBlur={chkPw}/>
                            </div>
                        </div>  
                        <button className={changePw.checkCurrentPw} disabled={complete} onClick={btn_modifyPw}>비밀번호 재설정</button>
                    </>
                    :
                    <>
                        <div className={changePw.iconbox}>
                            <h3>
                                <i className="fa-solid fa-circle icon"></i>
                                현재 비밀번호
                            </h3>
                        </div>
                        <div className={changePw.input_pwbox}>
                            <input type="text" className={changePw.input_currentpw} onChange={input_currentpw}/>
                            <button className={changePw.checkCurrentPw} disabled={checkCurrentPw} onClick={btn_checkCurrentPw}>비밀번호 확인</button>
                        </div> 
                    </>
            }
           
        </>
    )
}