import React, { useEffect, useState } from "react";
import axios from "axios";
import mypage from '../css/Mypage.module.css'
import { useLocation, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import {useDaumPostcodePopup} from "react-daum-postcode";

export default function ModifyConsultativeInfopage(){
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
    const [userRoadAddress, setUserRoadAddress] = useState('')
    const [detailAddress, setDetailAddress] = useState('')
    const [cAddress, setCAddress] = useState('')
    const [cRole, setCRole] = useState('')

    const [hospName, setHospName] = useState('') //병원명
    const [hospTel, setHospTel] = useState('') //병원 전홥번호
    const [hospFx, setHospFx] = useState('') //병원 팩스번호
    const [hospNum, setHospNum] = useState('') //병원 사업자번호
    const [hpZipcodeNum, setHpZipcodeNum] = useState('')
    const [hpZipcode, setHpZipcode] = useState('')    
    const [hospRoadAddress, setHospRoadAddress] = useState('')
    const [detailHpAddress, setDetailHpAddress] = useState('')
    const [hospAddress, setHospAddress] = useState('') //병원 주소
    const [infoEmpty, setInfoEmpty] = useState(false)

    const [isValidEmail, setIsValidEmail] = useState(true)
    const [isValidTel, setIsValidTel] = useState(true)
    const [isValidPhone, setIsValidPhone] = useState(true)
    const [isValidHpNum, setIsValidHpNum] = useState(true)
    const [isValidHpFx ,setIsValidHpFx] = useState(true)
    const [isValidHpTel, setIsValidHpTel] = useState(true)

    const navigate = useNavigate()
    const cookie = new Cookies()

    const errmsg = {
        email : '올바르지 않은 이메일 형식입니다.',
        tel : '올바르지 않은 전화번호 형식입니다.',
        phone : '올바르지 않은 전화번호 형식입니다.',
        cpNum : '올바르지 않은 사업자번호 형식입니다.',
        cpFx : '올바르지 않은 팩스번호 형식입니다.',
    }

    const postcodeScriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    const [props, setProps] = useState('');
    //클릭 시 수행될 팝업 생성 함수
    const open = useDaumPostcodePopup(postcodeScriptUrl);

    const handleUadderess = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; //추가될 주소
        let localAddress = data.sido + ' ' + data.sigungu; //지역주소(시, 도 + 시, 군, 구)
        let roadAddress = data.roadAddress;
        if (data.addressType === 'R') { //주소타입이 도로명주소일 경우
        if (data.bname !== '') {
            extraAddress += data.bname; //법정동, 법정리
        }
        if (data.buildingName !== '') { //건물명
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
        }
        //지역주소 제외 전체주소 치환
        setZipcode(data.zonecode);
        setUserRoadAddress(roadAddress);
        fullAddress = fullAddress.replace(localAddress, '');
        }
    }
    //클릭 시 발생할 이벤트
    const handleUClick = () => {
        //주소검색이 완료되고, 결과 주소를 클릭 시 해당 함수 수행
        open({onComplete: handleUadderess});
    }
  
    const handleCadderess = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; //추가될 주소
        let localAddress = data.sido + ' ' + data.sigungu; //지역주소(시, 도 + 시, 군, 구)
        let roadAddress = data.roadAddress;
        if (data.addressType === 'R') { //주소타입이 도로명주소일 경우
        if (data.bname !== '') {
            extraAddress += data.bname; //법정동, 법정리
        }
        if (data.buildingName !== '') { //건물명
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
        }
        //지역주소 제외 전체주소 치환
        setHpZipcode(data.zonecode);
        setHospRoadAddress(roadAddress);
        fullAddress = fullAddress.replace(localAddress, '');
        }
    }
    //클릭 시 발생할 이벤트
    const handleCClick = () => {
        //주소검색이 완료되고, 결과 주소를 클릭 시 해당 함수 수행
        open({onComplete: handleCadderess});
    }

    const setC_Role = (c_role) => {
        if (c_role === 'consultative') {
            setCRole('전문의');
        }
    }
    
    const setPrevUserAddress = user_address => {
        const uadd = user_address.split('/')
        console.log(uadd)
        setCAddress(user_address)
        setZipcode(uadd[0])
        setUserRoadAddress(uadd[1])
        setDetailAddress(uadd[2])
    }
    const setPrevHpAddress = cp_address => {
        const cadd = cp_address.split('/')
        console.log(cadd)
        setHospAddress(cp_address)
        setHpZipcode(cadd[0])
        setHospRoadAddress(cadd[1])
        setDetailHpAddress(cadd[2])
    }
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
            setCPhone(myInfo.cphone);
            setHospName(myInfo.hospName);
            setHospTel(myInfo.hospTel);
            setHospFx(myInfo.hospFx);
            setHospNum(myInfo.hospNum);
            setC_Role(myInfo.crole)
            setDepartment(myInfo.department)
            setPrevUserAddress(myInfo.cAddress)
            setPrevHpAddress(myInfo.hospAddress)
        } catch (err) {
            console.log(err);
        }
    };
    
    useEffect(()=>{
        getMyInfo();
    }, [])
    
    useEffect(()=>{
        if(cPw && cEmail && cTel && cPhone && userRoadAddress && zipcode && detailAddress && hospName && hospTel && hospFx && hospNum && hospRoadAddress && hpZipcode && detailHpAddress && isValidEmail && isValidTel && isValidPhone && isValidHpTel && isValidHpNum && isValidHpFx){
            setInfoEmpty(true);
        } else{
            setInfoEmpty(false)
        }
    }, [cPw,  cEmail,  cTel,  cPhone,  zipcodeNum, zipcode, detailAddress,  hospName,  hospTel,  hospFx,  hospNum, hpZipcodeNum, hpZipcode, detailHpAddress, isValidEmail, isValidTel, isValidPhone, isValidHpTel, isValidHpNum, isValidHpFx])

    const changeMyPw = e => {
        navigate('/medic/mypage/ChangeConsultativeInfo/ChangeMyPw', {state:{cpw : cPw}})
    }
    const input_email = e => {
        setCEmail(e.target.value)
    }
    const valid_email = e => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setIsValidEmail(emailRegex.test(e.target.value))
    }
    const input_tel = e => {
        setCTel(e.target.value)
    }
    const valid_tel = e => {
        const emailRegex = /^0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]|70|8[1-4])-?\d{3,4}-?\d{4}$/;
        setIsValidTel(emailRegex.test(e.target.value))
    }
    const input_phone = e => {
        setCPhone(e.target.value)
    }
    const valid_phone = e => {
        const emailRegex = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/
        setIsValidPhone(emailRegex.test(e.target.value))
    }
    const input_zipcode_num = e => {
        console.log(e.target.value)
        setZipcodeNum(e.target.value)
    }
    const input_zipcode = e => {
        setZipcode(e.target.value)
    }
    const input_details_zipcode = e => {
        const uadd = zipcode + "/" + userRoadAddress + "/" + e.target.value
        console.log(uadd)
        setDetailAddress(e.target.value)
        setCAddress(uadd)
    }
    const input_hp_name = e => {
        setHospName(e.target.value)
    }
    const input_hp_tel = e => {
        setHospTel(e.target.value)
    }
    const valid_hp_tel = e => {
        const cpTelRegex = /^0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]|70|8[1-4])-?\d{3,4}-?\d{4}$/;
        setIsValidHpTel(cpTelRegex.test(e.target.value))
    }
    const input_hp_fx = e => {
        setHospFx(e.target.value)
    }
    const valid_hpfx = e => {
        const fxRegex = /^0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]|70|8[1-4])-?\d{3,4}-?\d{4}$/;
        setIsValidHpFx(fxRegex.test(e.target.value))
    }
    const input_hp_num = e => {
        setHospNum(e.target.value)
    }
    const valid_hpnum = e => {
        const cpnumRegex = /^\d{3}-\d{2}-\d{5}$/
        setIsValidHpNum(cpnumRegex.test(e.target.value))
    }
    const input_hp_zipcode_num = e => {
        setHpZipcodeNum(e.target.value)
    }
    const input_hp_zipcode = e => {
        setHpZipcode(e.target.value)
    }
    const input_hp_details_zipcode = e => {
        const cpadd = hpZipcode + "/" + hospRoadAddress + "/" + e.target.value
        setDetailHpAddress(e.target.value)
        setHospAddress(cpadd)
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
        const consultativeInfo = {
            'cEmail' : cEmail,
            'department' : department,
            'cEmail' : cEmail,
            'cTel' : cTel,
            'cPhone' : cPhone,
            'cAddress' : cAddress,
            'hospName' : hospName,
            'hospTel' : hospTel,
            'hospFx' : hospFx,
            'hospNum' : hospNum,
            'hospAddress' : hospAddress
        } 
        console.log(consultativeInfo)
        if(!infoEmpty){
            alert('입력값을 확인하세요.')
            return
        }
        if(window.confirm("수정하시겠습니까?")){
            e.preventDefault()
            const consultativeInfo = {
                'cEmail' : cEmail,
                'department' : 'department',
                'cTel' : cTel,
                'cPhone' : cPhone,
                'cAddress' : cAddress,
                'hospName' : hospName,
                'hospTel' : hospTel,
                'hospFx' : hospFx,
                'hospNum' : hospNum,
                'hospAddress' : hospAddress
            } 
            consultative_modify(consultativeInfo)
        }
        
    }
    const btn_progrm_deleteConsultative = async() => {
        try{
            cookie.remove('uId')
            cookie.remove('uRole')
            if(window.confirm('정말 탈퇴 하시겠습니까?')){
                const response = await axios.post('/consultative/deleteConsultative')
                if(response.data === '탈퇴 완료'){
                    alert('탈퇴가 정상적으로 이루어졌습니다.')
                    navigate('/')
                }
            }else{
                return
            }
        } catch(err){
            console.log("오류")
        }
    }
    const btn_cancle_modify = e => {
        if(window.confirm("변경하신 모든 내용이 날아갑니다.\n취소하시겠습니까?")){
            alert('취소되었습니다.')
            window.location.href = window.location.href;
        }else{
            return
        }
    }
    return(
        <div className={mypage.modify_wrap}>
            <h3 className={mypage.modify_title}>
                전문의 정보 수정
            </h3>
            <div className={mypage.modify_userinfo}>
                <h4 className={mypage.modify_subtitle}><span className={mypage.modify_subtitleimg}></span>전문의 정보</h4>
                <div className={mypage.modify_userinfotable}>
                    <div className={mypage.modify_row}>
                        <div className={mypage.modify_row_title}>회원구분</div>
                        <div className={mypage.modify_userinfo_content}>{cRole}</div>
                    </div>
                    <div className={mypage.modify_row}>
                        <div className={mypage.modify_row_title}>진료과목</div>
                        <div className={mypage.modify_userinfo_content}>{department}</div>
                    </div>
                    <div className={mypage.modify_row}>
                        <div className={mypage.modify_row_title}>아이디</div>
                        <div className={mypage.modify_userinfo_content}>{cId}</div>
                    </div>
                    <div className={mypage.modify_row}>
                        <div className={mypage.modify_row_title}>비밀번호</div>
                        <div className={mypage.modify_userinfo_content}>
                            <input type="password" name="pw" disabled={true} value={cPw} maxLength={15}/>
                            <button type="button"  className={mypage.btn_changemypw} onClick={changeMyPw}>비밀번호 재설정</button>
                        </div>
                    </div>
                    <div className={mypage.modify_row}>
                        <div className={mypage.modify_row_title}>회원명</div>
                        <div className={mypage.modify_userinfo_content}>{cName}</div>
                    </div>
                    <div className={mypage.modify_row}>
                        <div className={mypage.modify_row_title}>이메일</div>
                        <div className={mypage.modify_userinfo_content}>
                            <input type="text"value={cEmail} onBlur={valid_email} onChange={input_email} maxLength={30}/>
                            {
                                isValidEmail ?
                                <></>
                                :
                                <span className={mypage.errmsg}>{errmsg.email}</span>
                            }
                        </div>
                    </div>
                    <div className={mypage.modify_row}>
                        <div className={mypage.modify_row_title}>일반전화 (- 포함)</div>
                        <div className={mypage.modify_userinfo_content}>
                            <input type="text" value={cTel} onBlur={valid_tel} onChange={input_tel} maxLength={13}></input>
                            {
                                isValidTel ?
                                <></>
                                :
                                <span className={mypage.errmsg}>{errmsg.tel}</span>
                            }
                        </div>
                    </div>
                    <div className={mypage.modify_row}>
                        <div className={mypage.modify_row_title}>휴대폰번호 (- 포함)</div>
                        <div className={mypage.modify_userinfo_content}>
                            <input type="text" value={cPhone} onBlur={valid_phone} onChange={input_phone} maxLength={13}></input>
                            {
                                isValidPhone ?
                                <></>
                                :
                                <span className={mypage.errmsg}>{errmsg.phone}</span>
                            }
                        </div>
                    </div>
                    <div className={mypage.modify_row} style={{alignItems : 'center'}}>
                        <div className={mypage.modify_row_title} style={{height : '80px'}}>주소</div>
                        <div className={mypage.address_input_box}>
                            <div>
                                <input type="text" disabled={false} value={zipcode} onChange={input_zipcode} style={{width: '80px'}}/>
                                <button type="button" className={mypage.btn_findaddress} onClick={handleUClick} >주소찾기</button>
                            </div>
                            <div style={{display : "flex"}}>
                                <input type="text" disabled={false} value={userRoadAddress} onChange={input_zipcode_num} style={{width: '250px'}}/> 
                                <input type="text" value={detailAddress} onChange={input_details_zipcode} style={ {width:'250px', marginLeft : '10px'}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={mypage.modify_userinfo} style={{marginTop : '60px'}}>
                <h4 className={mypage.modify_subtitle}><span className={mypage.modify_subtitleimg}></span>병원 정보</h4>
                <div className={mypage.modify_userinfotable}>
                    <div className={mypage.modify_row}>
                        <div className={mypage.modify_row_title}>소속 병원명</div>
                        <div className={mypage.modify_userinfo_content}>
                            <input type="text" name="cp_name" value={hospName} onChange={input_hp_name} maxLength={20}/>
                        </div>
                    </div>
                    <div className={mypage.modify_row}>
                        <div className={mypage.modify_row_title}>일반전화</div>
                        <div className={mypage.modify_userinfo_content}>
                            <input type="text" value={hospTel} onBlur={valid_hp_tel} onChange={input_hp_tel} maxLength={13}></input>
                            {
                                isValidHpTel ?
                                <></>
                                :
                                <span className={mypage.errmsg}>{errmsg.tel}</span>
                            }
                        </div>
                    </div>
                    <div className={mypage.modify_row}>
                        <div className={mypage.modify_row_title}>팩스번호</div>
                        <div className={mypage.modify_userinfo_content}>
                            <input type="text" value={hospFx} onBlur={valid_hpfx} onChange={input_hp_fx} maxLength={13}></input>
                            {
                                isValidHpFx ?
                                <></>
                                :
                                <span className={mypage.errmsg}>{errmsg.cpFx}</span>
                            }
                        </div>
                    </div>
                    <div className={mypage.modify_row}>
                        <div className={mypage.modify_row_title}>사업자번호(법인)</div>
                        <div className={mypage.modify_userinfo_content}>
                            <input type="text" value={hospNum} onBlur={valid_hpnum} onChange={input_hp_num} maxLength={20}></input>
                            {
                                isValidHpNum ?
                                <></>
                                :
                                <span className={mypage.errmsg}>{errmsg.cpNum}</span>
                            }
                        </div>
                    </div>
                    <div className={mypage.modify_row} style={{alignItems : 'center'}}>
                        <div className={mypage.modify_row_title} style={{height : '80px'}}>사업장주소</div>
                        <div className={mypage.address_input_box}>
                            <div>
                                <input type="text" disabled={false} value={hpZipcode} onChange={input_hp_zipcode} style={{width: '80px'}}/>
                                <button type="button" className={mypage.btn_findaddress} onClick={handleCClick} >주소찾기</button>
                            </div>
                            <div style={{display : "flex"}}>
                                <input type="text" disabled={false} value={hospRoadAddress} onChange={input_hp_zipcode_num} style={{width: '250px'}}/> 
                                <input type="text" value={detailHpAddress} onChange={input_hp_details_zipcode} style={ {width:'250px', marginLeft : '10px'}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={mypage.complete}>
                <div className={mypage.complete_btnBox}>
                    <button type = "button" onClick={btn_progrm_modify}  className={mypage.btt_complete} >수정</button>
                    <button type = "button" onClick={btn_cancle_modify} className={mypage.btt_complete} style={{backgroundColor : 'white', color : '#0f3a75'}}>취소</button>
                    <button type = "button" onClick={btn_progrm_deleteConsultative} className={mypage.btt_complete}>탈퇴</button>
                </div>
            </div>
        </div>
    )
}
