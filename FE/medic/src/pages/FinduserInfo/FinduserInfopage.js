import React, { useEffect, useState } from "react";
import style from '../../css/FinduserInfopage.module.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FinduserInfopage(){
    const [name, setName] = useState('')
    const [email_id, setEmail_id] = useState('')
    const [id, setId] = useState('')
    const [email_pw, setEmail_pw] = useState('')

    const [useridinfo, setUseridinfo] = useState(true)
    const [userpwinfo, setUserpwinfo] = useState(true)

    const navigate = useNavigate()
    const input_name = e => {
        setName(e.target.value)
    }
    const input_email_id = e =>{
        setEmail_id(e.target.value)
    }
    const btn_findid = async (e) => {
        const userInfo = {
            'uName': name,
            'uEmail': email_id
        }
        try {
            const response = await axios.post('/login/findId', userInfo); 
            alert(response.data); // 문자열 연결 수정
            navigate('/mediclogin');
        } catch (err) {
            console.log(err);
            alert('가입된 정보가 없습니다.');
        }
    }

    useEffect(()=>{
        if(name && email_id){
            setUseridinfo(false)
        }else{
            setUseridinfo(true)
        }
    }, [name, email_id])

    useEffect(()=>{
        if(id && email_pw){
            setUserpwinfo(false)
        }else{
            setUserpwinfo(true)
        }
    }, [id, email_pw])
    const input_id = e =>{
        setId(e.target.value)
    }
    const input_email_pw = e =>{
        setEmail_pw(e.target.value)
    }
    const btn_findpw = async(e) => {
        const userInfo = {
            'uId' : id,
            'uEmail' : email_pw
        }
        try{
            const response = await axios.post('/login/findPw', userInfo)
            navigate('/medic/finduserinfo/findpw', {state : {uId : id, uEmail : email_pw}})
        }catch(err){
            console.log(err)
            alert('가입된 정보가 없습니다.')
        }
    }
    return(
        <div className={style.Finduserwrap}>
            <div className={style.FinduserinfoBox}>
                <div className={style.Findusertitle}>
                    <h2>아이디 찾기</h2>
                </div>
                <div className={style.FindBox_box}>
                    <div className={style.findid_form}>
                        <div className={style.find_input}>
                            <div className={style.findid_input_info}>
                                <h3>이름 : </h3>
                                <input className={`${style.findid_input_name} ${style.input}`} onChange={input_name} maxLength={20}/>
                            </div>
                            <div className={style.findid_input_info}>
                                <h3>이메일 : </h3>
                                <input className={`${style.findid_input_email} ${style.input}`} onChange={input_email_id} maxLength={30}/>
                            </div>
                        </div>
                        <button className={style.btn_findbtn} disabled={useridinfo} onClick={btn_findid}>아이디 찾기</button>
                    </div>
                </div>
            </div>
            <div className={style.FinduserinfoBox}>
                <div className={style.Findusertitle}>
                    <h2>비밀번호 찾기</h2>
                </div>
                    <div className={style.FindBox_box}>
                    <div className={style.findid_form}>
                        <div className={style.find_input}>
                            <div className={style.findid_input_info}>
                                <h3>아이디 : </h3>
                                <input className={`${style.findpw_input_id} ${style.input}`} onChange={input_id} maxLength={12}/>
                            </div>
                            <div className={style.findid_input_info}>
                                <h3>이메일 : </h3>
                                <input className={`${style.findpw_input_email} ${style.input}`} onChange={input_email_pw} maxLength={30}/>
                            </div>
                        </div>
                        <button className={style.btn_findbtn} disabled={userpwinfo} onClick={btn_findpw}>비밀번호 찾기</button>
                    </div>
                </div>
            </div>
        </div>
       
    )
}
