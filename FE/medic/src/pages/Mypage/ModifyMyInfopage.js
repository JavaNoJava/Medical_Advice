import React, { useEffect, useState } from "react";
import axios from "axios";
import joinpage from '../../css/Joinpage.module.css'
import { useLocation, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";


export default function ModifyMyInfopage(){
    const [uId, setUId] = useState('')
    const [uPart, setUPart] = useState('');   //역할
    const [uPw, setUPw] = useState('')      //pw
    const [uName, setUName] = useState('') //name
    const [uEmail, setUEmail] = useState('') //email
    const [userTel, setUserTel] = useState('') //tel
    const [userPhone, setUserPhone] = useState('') //
    const [zipcodeNum, setZipcodeNum] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [detailAddress, setDetailAddress] = useState('')
    const [userAddress, setUserAddress] = useState('')

    const [company, setCompany] = useState('') //업체명
    const [ceo, setCeo] = useState('') //대표자명
    const [cpTel, setCpTel] = useState('') //회사 전화번호
    const [cpFx, setCpFx] = useState('') //회사 팩스번호
    const [cpNum, setCpNum] = useState('') //회사 사업자번호
    const [cpZipcodeNum, setCpZipcodeNum] = useState('')
    const [cpZipcode, setCpZipcode] = useState('')
    const [detailCpAddress, setDetailCpAddress] = useState('')
    const [cpAddress, setCpAddress] = useState('') //회사 주소
    const [infoEmpty, setInfoEmpty] = useState(false)

    const navigate = useNavigate()
    const cookie = new Cookies()

    const setUserPart = (user_part) => {
        switch(user_part){
            case 'general_user' : 
                setUPart('일반회원') 
                break;
            case 'insurance_co' : 
                setUPart('보험사')
                break
            case 'deduction_sc': 
                setUPart('공제회')
                break
            case 'adjuster_cp' : 
                setUPart('손해사정법인')
                break
            case 'adjuster_oc' : 
                setUPart('손해사정사무소')
                break
            case 'lawfirm' : 
                setUPart('법무법인')
                break
            case 'labor_cp' : 
                setUPart('노무법인')
        }
    }
    const setPrevUserAddress = user_address => {
        const uadd = user_address.split(' ')
        setUserAddress(user_address)
        setZipcodeNum(uadd[0])
        setZipcode(uadd[1])
        setDetailAddress(uadd[2])
    }
    const setPrevCpAddress = cp_address => {
        const cadd = cp_address.split(' ')
        setCpAddress(cp_address)
        setCpZipcodeNum(cadd[0])
        setCpZipcode(cadd[1])
        setDetailCpAddress(cadd[2])
    }
    const getMyInfo = async () => {
        try {
            const response = await axios.get('/user/userInfoAll');
            const myInfo = response.data;
            setUId(myInfo.uid);
            setUPw(myInfo.upw);
            setUName(myInfo.name);
            setUEmail(myInfo.uemail);
            setUserTel(myInfo.userTel);
            setUserPhone(myInfo.userPhone);
            setCompany(myInfo.company);
            setCeo(myInfo.ceo);
            setCpTel(myInfo.cpTel);
            setCpFx(myInfo.cpFx);
            setCpNum(myInfo.cpNum);
            setUserPart(myInfo.upart)
            setPrevUserAddress(myInfo.userAddress)
            setPrevCpAddress(myInfo.cpAddress)
        } catch (err) {
            console.log(err);
        }
    };
    
    useEffect(()=>{
        getMyInfo();
    }, [])
    
    useEffect(()=>{
        if(uPw && uEmail && userTel && userPhone && zipcodeNum && zipcode && detailAddress && company && ceo && cpTel && cpFx && cpNum && cpZipcodeNum && cpZipcode && detailCpAddress){
            setInfoEmpty(true);
        } else{
            setInfoEmpty(false)
        }
    }, [uPw,  uEmail,  userTel,  userPhone,  zipcodeNum, zipcode, detailAddress,  company,  ceo,  cpTel,  cpFx,  cpNum, cpZipcodeNum, cpZipcode, detailCpAddress])

    const changeMyPw = e => {
        navigate('/medic/mypage/modifymyinfo/modifyMyPw', {state:{upw : uPw}})
    }
    const input_email = e => {
        setUEmail(e.target.value)
    }
    const input_tel = e => {
        setUserTel(e.target.value)
    }
    const input_phone = e => {
        setUserPhone(e.target.value)
    }
    const input_zipcode_num = e => {
        setZipcodeNum(e.target.value)
    }
    const input_zipcode = e => {
        setZipcode(e.target.value)
    }
    const input_details_zipcode = e => {
        const uadd = zipcodeNum + " " + zipcode + " " + e.target.value
        setDetailAddress(e.target.value)
        setUserAddress(uadd)
    }
    const input_cpname = e => {
        setCompany(e.target.value)
    }
    const input_cp_ceo = e => {
        setCeo(e.target.value)
    }
    const input_cp_tel = e => {
        setCpTel(e.target.value)
    }
    const input_cp_fx = e => {
        setCpFx(e.target.value)
    }
    const input_cp_num = e => {
        setCpNum(e.target.value)
    }
    const input_cp_zipcode_num = e => {
        setCpZipcodeNum(e.target.value)
    }
    const input_cp_zipcode = e => {
        setCpZipcode(e.target.value)
    }
    const input_cp_details_zipcode = e => {
        const cpadd = cpZipcodeNum + " " + cpZipcode + " " + e.target.value
        setDetailCpAddress(e.target.value)
        setCpAddress(cpadd)
    }
    const user_modify = async(userInfo) => {
        console.log(2)
        const response = await axios.put('/user/modifyUserInfo', userInfo)
        console.log(response)
        if(response.data === '정보수정 완료!'){
            alert('정보수정이 완료되었습니다.')
            navigate('/medic/mypage')
        }
    }

    const btn_progrm_modify = e => {
        if(window.confirm("수정하시겠습니까?")){
            e.preventDefault()
            const userInfo = {
                'uEmail' : uEmail,
                'userTel' : userTel,
                'userPhone' : userPhone,
                'userAddress' : userAddress,
                'company' : company,
                'ceo' : ceo,
                'cpTel' : cpTel,
                'cpFx' : cpFx,
                'cpNum' : cpNum,
                'cpAddress' : cpAddress
            } 
            user_modify(userInfo)
        }
        
    }
    const btn_progrm_deleteuser = async() => {
        try{
            cookie.remove('uId')
            cookie.remove('uRole')
            const response = await axios.post('/user/deleteUser')
            if(response.data === '탈퇴 완료'){
                alert('탈퇴가 정상적으로 이루어졌습니다.')
                navigate('/')
            }
        } catch(err){
            console.log("오류")
        }
    }
    const btn_goto_mypage = e => {
        navigate('/medic/mypage')
    
    }
    return(
        <div className={joinpage.join_wrap}>
            <div className={joinpage.iconbox}>
                <h2>
                    <i className="fa-solid fa-circle icon"></i>
                    내 정보 수정
                </h2>
            </div>
            <div className={joinpage.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    가입자 정보
                </h3>
            </div>
            <div className = {joinpage.tb}>
                <table className={joinpage.joinpage_table}>
                    <tr>
                        <td className={joinpage.joinpage_th}>
                            회원구분
                        </td>
                        <td colSpan="3" className={joinpage.joinpage_td}>
                            {uPart}
                        </td>
                    </tr>

                    <tr>
                        <td className={joinpage.joinpage_th}>
                            아이디
                        </td>
                        <td colSpan="3" className={joinpage.joinpage_td}>
                            <div className={joinpage.id}>
                                {uId}
                            </div>
                        </td>
                    </tr>

                    <tr style={{borderRight : '1px solid black'}}>
                        <td className={joinpage.joinpage_th}>
                            비밀번호
                        </td>
                        <td className={joinpage.joinpage_td} style={{borderRight : 'none'}}>
                            <input type="password" name="pw" disabled={true} value={uPw} maxLength={15}/>
                            <button type="button"  className={joinpage.btt_id} onClick={changeMyPw}>비밀번호 재설정</button>
                        </td>
                    </tr>
                    <tr>
                        <td className={joinpage.joinpage_td}>
                            회원명
                        </td>
                        <td className={joinpage.joinpage_td}>
                            {uName}
                        </td>
                        <td className={joinpage.joinpage_td}>
                            이메일
                        </td>
                        <td className={joinpage.joinpage_td}>
                            <input type="text" name="email" value={uEmail}  onChange={input_email} maxLength={30}/>
                        </td>
                    </tr>

                    <tr>
                        <td className={joinpage.joinpage_td}>
                            일반전화
                        </td>
                        <td className={joinpage.joinpage_td}>
                            <input type="text" name="tel" value={userTel} onChange={input_tel} maxLength={13}/>
                        </td>
                        <td className={joinpage.joinpage_td}>
                            휴대폰번호
                        </td>
                        <td className={joinpage.joinpage_td}>
                            <input type="text" name="phone" value={userPhone} onChange={input_phone} maxLength={13}/>
                        </td>
                    </tr>

                    <tr className={joinpage.joinpage_zipcode_tb}>
                        <td className={joinpage.joinpage_td}>
                            주소
                        </td>
                        <td colSpan="4" className={joinpage.joinpage_td}>
                            <div className={joinpage.joinpage_zipcode}>
                                <input type="text" name="zipcode_num" value={zipcodeNum} onChange={input_zipcode_num} maxLength={5}/>
                                <button type="button" onClick={() => alert('우편번호')} className={joinpage.joinpage_zipcode_btn}>우편번호</button>
                                <br/>
                                <input type="text" name="zipcode" value={zipcode} onChange={input_zipcode} maxLength={80}/><br/>
                                <input type="text" name="details_zipcode" value={detailAddress} onChange={input_details_zipcode} maxLength={15}/>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div className={joinpage.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    업체 정보
                </h3>
            </div>    
            <div className={`${joinpage.joinpage_table} ${joinpage.tb}`}>
            <table className={joinpage.joinpage_table}>
                <tr>
                    <td className={joinpage.joinpage_th}>
                        회사명
                    </td>
                    <td className={joinpage.joinpage_td}>
                        <input type="text" name="cp_name" value={company} onChange={input_cpname} maxLength={20}/>
                    </td>
                    <td className={joinpage.joinpage_th}>
                        대표자명
                    </td>
                    <td className={joinpage.joinpage_td}>
                        <input type="text" name="cp_ceo" value={ceo} onChange={input_cp_ceo} maxLength={8}/>
                    </td>
                </tr>
                <tr>
                    <td className={joinpage.joinpage_th}>
                        일반전화
                    </td>
                    <td className={joinpage.joinpage_td}>
                        <input type="text" name="cp_tel" value={cpTel} onChange={input_cp_tel} maxLength={13}/>
                    </td>
                    <td className={joinpage.joinpage_th}>
                        팩스번호
                    </td>
                    <td className={joinpage.joinpage_td}>
                        <input type="text" name="cp_fx" value={cpFx} onChange={input_cp_fx} maxLength={15}/>
                    </td>
                </tr>
                <tr>
                    <td className={joinpage.joinpage_th}>
                        사업자번호(법인)
                    </td>
                    <td colSpan="4" className={joinpage.joinpage_td}>
                        <input type="text" name="cp_num" value={cpNum} onChange={input_cp_num} maxLength={20}/>
                    </td>
                </tr>
                <tr className={joinpage.zipcode_tb}>
                    <td className={joinpage.joinpage_th}>
                        사업장 주소
                    </td>
                    <td colSpan="4" className={joinpage.joinpage_td}>
                        <div className={joinpage.zipcode}>
                            <input type="text" name="cp_zipcode_num" value={cpZipcodeNum} onChange={input_cp_zipcode_num} maxLength={5}/>
                            <button type="button" onClick={() => alert('우편번호')} className={joinpage.zipcode}>우편번호</button>
                            <br />
                            <input type="text" name="cp_zipcode" value={cpZipcode} onChange={input_cp_zipcode} maxLength={80}/><br />
                            <input type="text" name="cp_details_zipcode" value={detailCpAddress} onChange={input_cp_details_zipcode} maxLength={15}/>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div className={joinpage.complete} style={{width: '550px'}}>
            <button type = "button" onClick={btn_progrm_modify} disabled={!infoEmpty} className={joinpage.btt_complete}>정보 수정 완료</button>
            <button type = "button" onClick={btn_goto_mypage} className={joinpage.btt_complete}>마이페이지</button>
            <button type = "button" onClick={btn_progrm_deleteuser} className={joinpage.btt_complete}>회원탈퇴</button>
        </div>
        </div>
    )
}
