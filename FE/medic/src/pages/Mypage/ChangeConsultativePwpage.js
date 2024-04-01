import React, {useState, useEffect} from "react";
import style from '../../css/Updatepw.module.css'
import Footer from '../../components/Footer'
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import mypage from '../../css/Mypage.module.css'

export default function ChangeConsultativePwpage(){
    const [checkCurrentPw, setChkCurrentPw] = useState(true)
    const [currentpw, setCurrentpw] = useState('')
    const [checkPw, setCheckPw] = useState(false)
    const [newpwEmpty, setNewpwEmpty] = useState(false)
    const [updateUserPwChk, setUpdateUserPwChk] = useState('')
    const [updateuserpw, setUpdateuserpw] = useState('')
    const [isValidPw ,setIsValidPw] = useState(true)

    const location = useLocation();
    const navigate = useNavigate();
    const cpw = location.state.cpw

    const input_currentpw = e => {
        if(e.target.value){
             setChkCurrentPw(false)
             setCurrentpw(e.target.value)
        }else{
             setChkCurrentPw(true)
        }
     }
     useEffect(()=>{
        if(updateuserpw && updateUserPwChk){
            setNewpwEmpty(false)
        }else{
            setNewpwEmpty(true)
        }
    }, [updateuserpw, updateUserPwChk])
     const btn_checkCurrentPw = e => {
        if(cpw === currentpw){
            alert('인증되었습니다.')
            setCheckPw(true)
        }else{
            setCheckPw(false)
            alert('현재비밀번호와 다릅니다.')
        }
    }

    const input_updatepw = e => {
        setUpdateuserpw(e.target.value);
    }

    const valid_pw = e => {
        const updatePwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        setIsValidPw(updatePwRegex.test(e.target.value))
    }

    const input_updatePwChk = e => {
        setUpdateUserPwChk(e.target.value)
    }

    const btn_update_pw = async(e) => {
        if(cpw === updateuserpw){
            alert('이전과 다른 비밀번호를 입력해주세요.')
            return
        }
        else if((updateuserpw === updateUserPwChk) && isValidPw){
            const userPw = {
                'cPw' : updateuserpw,
            }
            try{
                const response = await axios.post('/consultative/modifyConsultativePw', userPw)
                alert(response.data)
                navigate('/')
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
                    {
                        checkPw ?
                        <>
                            <div className={style.Find_userInfoContentBox}>
                                <h4 className={style.Find_userInfoContent_title}><span className={style.Find_userInfoContent_titleimg}></span>새 비밀번호</h4>
                                <div className={style.Find_userInfoInnnerBox}>
                                    <div className={style.Find_userIdPwBox}>
                                        <p className={style.Find_userIdPw_title}>
                                        비밀번호 재설정
                                        </p>
                                        <div className={`${style.Find_userPwimg} ${style.Find_userIdPwimg}`}></div>
                                        <div className={style.Find_inputIdInfobox}>
                                            <div className={style.Find_inputInfo_innerbox} style={
                                                {
                                                    display : 'flex',
                                                    flexDirection : 'column',
                                                    height : '30px'
                                                }}>
                                                <div style={{width : '320px', display : "flex", justifyContent : 'space-between', alignItems : 'center'}}>새 비밀번호 <span className={style.inputbox}><input type="password" className={style.input} value={updateuserpw} onBlur={valid_pw} onChange={input_updatepw} maxLength={15}></input></span></div>
                                                {isValidPw ? <></> : <span className={mypage.errmsg} style={{margin : '5px 0 0 0', width : '320px', textAlign : 'right'}}>올바른 형식으로 입력해주세요. <br/>(최소 8자, 대소문자, 숫자, 특수문자를 각각 1개 이상 포함)</span>}
                                            </div>
                                            <div className={style.Find_inputInfo_innerbox} style={{marginTop : '25px'}}>
                                                새 비밀번호 확인 <span className={style.inputbox}><input type="password" className={style.input} onChange={input_updatePwChk} maxLength={15}></input></span>
                                            </div>
                                            <div className={style.btn_findbtnbox}>
                                                <button className={style.btn_findbtn} disabled={newpwEmpty} onClick={btn_update_pw}>비밀번호 재설정</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className={style.Find_userInfoContentBox}>
                                <h4 className={style.Find_userInfoContent_title}><span className={style.Find_userInfoContent_titleimg}></span>현재 비밀번호</h4>
                                <div className={style.Find_userInfoInnnerBox}>
                                    <div className={style.Find_userIdPwBox}>
                                        <p className={style.Find_userIdPw_title}>
                                            현재 비밀번호확인
                                        </p>
                                        <div className={`${style.Find_userPwimg} ${style.Find_userIdPwimg}`}></div>
                                        <div className={style.Find_inputIdInfobox} style={{height : '80px', width : '280px'}}>
                                            <div className={style.Find_inputInfo_innerbox} style={{marginTop : '30px'}}>
                                                비밀번호 <span className={style.inputbox}><input type="password" className={style.input} maxLength={15} onChange={input_currentpw}></input></span>
                                            </div>
                                            <div className={style.btn_findbtnbox}>
                                                <button className={style.btn_findbtn} onClick={btn_checkCurrentPw}>비밀번호 확인</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div> 
            <Footer/>
        </>
    )
}