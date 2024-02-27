import React, { useEffect, useState } from "react";
import axios from "axios";
import updatepw from '../../css/Updatepw.module.css'
import { useLocation, useNavigate } from "react-router-dom";

export default function Updatepw() {
    const [updateuserpw, setUpdateuserpw] = useState('')
    const [newpwEmpty, setNewpwEmpty] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const uId = location.state.uId
    const uEmail = location.state.uEmail

    const input_updatepw = e => {
        setUpdateuserpw(e.target.value)
    }

    useEffect(()=>{
        if(updateuserpw){
            setNewpwEmpty(false)
        }else{
            setNewpwEmpty(true)
        }
    }, [updateuserpw])
    const btn_update_pw = async(e) => {
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
    }


    return(
        <div className={updatepw.updatepw_wrap}>
            <div className={updatepw.updatepw_title}>
                <h2>비밀번호 재설정</h2>
            </div>
            <div className={updatepw.updatepw_inputbox}>
                새 비밀번호 :
                <input type="password" onChange={input_updatepw} maxLength={15}/>
            </div>
            <div className={updatepw.btn_update_pw}>
                <button onClick={btn_update_pw} disabled={newpwEmpty} >비밀번호 변경</button>
            </div>
        </div>
    )
}