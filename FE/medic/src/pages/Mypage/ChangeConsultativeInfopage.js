import React, { useEffect, useState } from "react";
import axios from "axios";
import ChangeConsultativeInfo from '../../css/ChangeConsultativeInfopage.module.css'
import { useLocation, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

export default function ChangeConsultativeInfopage(){
    const [cId, setCId] = useState('')
    const [cPw, setCPw] = useState('')
    const [department, setDepartment] = useState([
        "내과", "신경과", "정신건강의학과", "외과", "정형외과", "신경외과", "흉부외과", "성형외과", "마취통증의학과",
        "산부인과", "소아청소년과", "안과", "이비인후과", "피부과", "비뇨의학과", "영상의학과", "방사선종양학과",
        "병리과", "진단검사의학과", "결핵과", "재활의학과", "예방의학과", "가정의학과", "응급의학과", "핵의학과",
        "직업환경의학과"
      ])
    const [cName, setCName] = useState('')
    const [cEmail, setCEmail] = useState('')
    const [cTel, setCTel] = useState('')
    const [cPhone, setCPhone] = useState('')
    const [zipcodeNum, setZipcodeNum] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [detailAddress, setDetailAddress] = useState('')
    const [cAddress, setCAddress] = useState('')
    const [cRole, setCRole] = useState('')

    const [hospName, setHospName] = useState('')
    const [hospTel, setHospTel] = useState('')
    const [hospFx, setHospFx] = useState('')
    const [hospNum, setHospNum] = useState('')
    const [detailHpAddress, setDetailHpAddress] = useState('')
    const [hospAddress, setHospAddress] = useState('')
    const [hpZipcodeNum, setHpZipcodeNum] = useState('')
    const [hpZipcode, setHpZipcode] = useState('')

    const [infoEmpty, setInfoEmpty] = useState(false)

    const navigate = useNavigate()
    const cookie = new Cookies()

    const setC_Role = (c_role) => {
        if (c_role === 'consultative') {
            setCRole('전문의');
        }
    }

    const setPrevCAddress = doc_address => {
        if (doc_address) {
            const cadd = doc_address.split(' ');
            setCAddress(doc_address);
            setZipcodeNum(cadd[0]);
            setZipcode(cadd[1]);
            setDetailAddress(cadd[2]);
        }
    };
    
    const setPrevHpAddress = hosp_address => {
        if (hosp_address) {
            const hpadd = hosp_address.split(' ');
            setHospAddress(hosp_address);
            setHpZipcodeNum(hpadd[0]);
            setHpZipcode(hpadd[1]);
            setDetailHpAddress(hpadd[2]);
        }
    };
    

    const getMyInfo = async () => {
        try {
            const response = await axios.get('/consultative/consultativeInfoAll');
            const myInfo = response.data;
            console.log(myInfo);
            setCId(myInfo.cid);
            setCPw(myInfo.cpw);
            setCName(myInfo.cname);
            setCEmail(myInfo.cemail);
            setCTel(myInfo.ctel);
            setCPhone(myInfo.cphone)
            setHospName(myInfo.hospName);
            setHospTel(myInfo.hospTel);
            setHospFx(myInfo.hospFx);
            setHospNum(myInfo.hospNum);
            setC_Role(myInfo.crole)
            setDepartment(myInfo.department);
            setPrevCAddress(myInfo.caddress)
            setPrevHpAddress(myInfo.hospAddress)
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(()=> {
        getMyInfo();
    }, [])

    useEffect(()=>{
        if(cEmail && cTel && cPhone && zipcodeNum && zipcode && detailAddress && hospName && hospTel && hospFx && hospNum && hpZipcodeNum && hpZipcode && detailHpAddress){
            setInfoEmpty(true);
        } else{
            setInfoEmpty(false)
        }
    }, [cEmail,  cTel,  cPhone,  zipcodeNum, zipcode, detailAddress, hospName,  hospTel,  hospFx,  hospNum,  hpZipcodeNum, hpZipcode, detailHpAddress])

    const changeMyPw = e => {
        navigate('/medic/mypage/ChangeConsultativeInfo/ChangeMyPw', {state:{cpw : cPw}})
    }
    const input_email = e => {
        setCEmail(e.target.value)
    }
    const input_tel = e => {
        setCTel(e.target.value)
    }
    const input_phone = e => {
        setCPhone(e.target.value)
    }
    const input_zipcode_num = e => {
        setZipcodeNum(e.target.value)
    }
    const input_zipcode = e => {
        setZipcode(e.target.value)
    }
    const input_details_zipcode = e => {
        const cadd = zipcodeNum + " " + zipcode + " " + e.target.value
        setDetailAddress(e.target.value)
        setCAddress(cadd)
    }
    const input_hosp_name = e => {
        setHospName(e.target.value)
    }
    const input_hosp_tel = e => {
        setHospTel(e.target.value)
    }
    const input_hosp_fx = e => {
        setHospFx(e.target.value)
    }
    const input_hosp_num = e => {
        setHospNum(e.target.value)
    }
    const input_hosp_zipcode_num = e => {
        setHpZipcodeNum(e.target.value)
    }
    const input_hosp_zipcode = e => {
        setHpZipcode(e.target.value)
    }
    const input_hp_details_zipcode = e => {
        const hpadd = hpZipcodeNum + " " + hpZipcode + " " + e.target.value
        setDetailHpAddress(e.target.value)
        setHospAddress(hpadd)
    }
    const consultative_modify = async(consultativeInfo) => {
        console.log(2)
        const response = await axios.put('/consultative/modifyConsultativeInfo', consultativeInfo)
        console.log(response)
        if(response.data === '정보 수정 완료!'){
            alert('정보수정이 완료되었습니다.')
            navigate('/medic/consultativeMypage')
        }
    }

    const btn_progrm_modify = e => {
        if(window.confirm("수정하시겠습니까?")){
        e.preventDefault()
        const consultativeInfo = {
            'cName' : cName,
            'department' : department,
            'cEmail' : cEmail,
            'cTel' : cTel,
            'cPhone' : cPhone,
            'cAddress' : zipcodeNum && zipcode && detailAddress ? `${zipcodeNum} ${zipcode} ${detailAddress}` : cAddress ,
            'hospName' : hospName,
            'hospTel' : hospTel,
            'hospFx' : hospFx,
            'hospNum' : hospNum,
            'hospAddress' : hpZipcodeNum && hpZipcode && detailHpAddress ? `${hpZipcodeNum} ${hpZipcode} ${detailHpAddress} `: hospAddress
        } 
        consultative_modify(consultativeInfo)
        }
    }
    const btn_progrm_deleteConsultative = async() => {
        try {
            const confirmed = window.confirm('탈퇴하시겠습니까?');
            if (confirmed) {
              const response = await axios.post(`/consultative/deleteConsultative/`);
              if(response.data === '탈퇴 완료') {
              alert('탈퇴가 정상적으로 이루어졌습니다.');
              cookie.remove('uId')
              cookie.remove('uRole')
              navigate('/')
              }
            }
        } catch(err){
            console.log('오류', err)
        }
    }
    
    const btn_goto_mypage = e => {
        navigate('/medic/consultativeMypage')
    
    }
    return(
        <div className={ChangeConsultativeInfo.join_wrap}>
            <div className={ChangeConsultativeInfo.iconbox}>
                <h2>
                    <i className="fa-solid fa-circle icon"></i>
                    내 정보 수정
                </h2>
            </div>
            <div className={ChangeConsultativeInfo.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    가입자 정보
                </h3>
            </div>
            <div className = {ChangeConsultativeInfo.tb}>
                <table className={ChangeConsultativeInfo.joinpage_table}>
                    <tr>
                        <td className={ChangeConsultativeInfo.joinpage_th}>
                            회원구분
                        </td>
                        <td colSpan="3" className={ChangeConsultativeInfo.joinpage_td}>
                            {cRole}
                        </td>
                    </tr>

                    <tr>
                        <td className={ChangeConsultativeInfo.joinpage_th}>
                            진료과목
                        </td>
                        <td colSpan="3" className={ChangeConsultativeInfo.joinpage_td}>
                            <input type="text" value={department} disabled />
                        </td>
                    </tr>

                    <tr>
                        <td className={ChangeConsultativeInfo.joinpage_th}>
                            아이디
                        </td>
                        <td colSpan="3" className={ChangeConsultativeInfo.joinpage_td}>
                            <div className={ChangeConsultativeInfo.id}>
                                <input type="text" value={cId} disabled />
                            </div>
                        </td>
                    </tr>

                    <tr style={{borderRight : '1px solid black'}}>
                        <td className={ChangeConsultativeInfo.joinpage_th}>
                            비밀번호
                        </td>
                        <td className={ChangeConsultativeInfo.joinpage_td} style={{borderRight : 'none'}}>
                            <input type="password" name="pw" disabled={true} value={cPw} maxLength={15}/>
                            <button type="button"  className={ChangeConsultativeInfo.btt_id} onClick={changeMyPw}>비밀번호 재설정</button>
                        </td>
                    </tr>
                    <tr>
                        <td className={ChangeConsultativeInfo.joinpage_td}>
                            회원명
                        </td>
                        <td className={ChangeConsultativeInfo.joinpage_td}>
                            {cName}
                        </td>
                        <td className={ChangeConsultativeInfo.joinpage_td}>
                            이메일
                        </td>
                        <td className={ChangeConsultativeInfo.joinpage_td}>
                            <input type="text" name="email" value={cEmail}  onChange={input_email} maxLength={30}/>
                        </td>
                    </tr>

                    <tr>
                        <td className={ChangeConsultativeInfo.joinpage_td}>
                            일반전화
                        </td>
                        <td className={ChangeConsultativeInfo.joinpage_td}>
                            <input type="text" name="tel" value={cTel} onChange={input_tel} maxLength={13}/>
                        </td>
                        <td className={ChangeConsultativeInfo.joinpage_td}>
                            휴대폰번호
                        </td>
                        <td className={ChangeConsultativeInfo.joinpage_td}>
                            <input type="text" name="phone" value={cPhone} onChange={input_phone} maxLength={13}/>
                        </td>
                    </tr>

                    <tr className={ChangeConsultativeInfo.joinpage_zipcode_tb}>
                        <td className={ChangeConsultativeInfo.joinpage_td}>
                            주소
                        </td>
                        <td colSpan="4" className={ChangeConsultativeInfo.joinpage_td}>
                            <div className={ChangeConsultativeInfo.joinpage_zipcode}>
                                <input type="text" name="zipcode_num" value={zipcodeNum} onChange={input_zipcode_num} maxLength={5}/>
                                <button type="button" onClick={() => alert('우편번호')} className={ChangeConsultativeInfo.joinpage_zipcode_btn}>우편번호</button>
                                <br/>
                                <input type="text" name="zipcode" value={zipcode} onChange={input_zipcode} maxLength={80}/><br/>
                                <input type="text" name="details_zipcode" value={detailAddress} onChange={input_details_zipcode} maxLength={15}/>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div className={ChangeConsultativeInfo.iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    병원 정보
                </h3>
            </div>    
            <div className={`${ChangeConsultativeInfo.joinpage_table} ${ChangeConsultativeInfo.tb}`}>
            <table className={ChangeConsultativeInfo.joinpage_table}>
                <tr>
                    <td className={ChangeConsultativeInfo.joinpage_th}>
                        소속 병원명
                    </td>
                    <td colSpan="3" className={ChangeConsultativeInfo.joinpage_td}>
                        <input type="text" name="hosp_name" value={hospName} onChange={input_hosp_name} maxLength={20}/>
                    </td>
                </tr>
                <tr>
                    <td className={ChangeConsultativeInfo.joinpage_th}>
                        일반전화
                    </td>
                    <td className={ChangeConsultativeInfo.joinpage_td}>
                        <input type="text" name="hosp_tel" value={hospTel} onChange={input_hosp_tel} maxLength={13}/>
                    </td>
                    <td className={ChangeConsultativeInfo.joinpage_th}>
                        팩스번호
                    </td>
                    <td className={ChangeConsultativeInfo.joinpage_td}>
                        <input type="text" name="hosp_fx" value={hospFx} onChange={input_hosp_fx} maxLength={15}/>
                    </td>
                </tr>
                <tr>
                    <td className={ChangeConsultativeInfo.joinpage_th}>
                        사업자번호(법인)
                    </td>
                    <td colSpan="4" className={ChangeConsultativeInfo.joinpage_td}>
                        <input type="text" name="hosp_num" value={hospNum} onChange={input_hosp_num} maxLength={20}/>
                    </td>
                </tr>
                <tr className={ChangeConsultativeInfo.zipcode_tb}>
                    <td className={ChangeConsultativeInfo.joinpage_th}>
                        사업장 주소
                    </td>
                    <td colSpan="4" className={ChangeConsultativeInfo.joinpage_td}>
                        <div className={ChangeConsultativeInfo.zipcode}>
                            <input type="text" name="hosp_zipcode_num" value={hpZipcodeNum} onChange={input_hosp_zipcode_num} maxLength={5}/>
                            <button type="button" onClick={() => alert('우편번호')} className={ChangeConsultativeInfo.zipcode}>우편번호</button>
                            <br />
                            <input type="text" name="hosp_zipcode" value={hpZipcode} onChange={input_hosp_zipcode} maxLength={80}/><br />
                            <input type="text" name="hp_details_zipcode" value={detailHpAddress} onChange={input_hp_details_zipcode} maxLength={15}/>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div className={ChangeConsultativeInfo.complete} style={{width: '550px'}}>
            <button type = "button" onClick={btn_progrm_modify} disabled={!infoEmpty} className={ChangeConsultativeInfo.btt_complete}>정보 수정 완료</button>
            <button type = "button" onClick={btn_goto_mypage} className={ChangeConsultativeInfo.btt_complete}>마이페이지</button>
            <button type = "button" onClick={btn_progrm_deleteConsultative} className={ChangeConsultativeInfo.btt_complete}>회원탈퇴</button>
        </div>
        </div>
    )
}