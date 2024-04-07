import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import joinpage from '../css/Joinpage.module.css'
import { useNavigate } from "react-router-dom";
import {useDaumPostcodePopup} from "react-daum-postcode";
 


export default function Joinpage(){
    const [uPart, setUPart] = useState('');   //역할
    const [uId, setUId] = useState('')      //id 
    const [uPw, setUPw] = useState('')      //pw
    const [uName, setUName] = useState('') //name
    const [uEmail, setUEmail] = useState('') //email
    const [userTel, setUserTel] = useState('') //tel
    const [userPhone, setUserPhone] = useState('') 
    const [zipcode, setZipcode] = useState('')
    const [userroadAddress, setUserRoadAddress] = useState('')
    const [userDetailAddress, setUserDetailAddress] = useState('')
    const [userAddress, setUserAddress] = useState('')

    const [company, setCompany] = useState('') //업체명
    const [ceo, setCeo] = useState('') //대표자명
    const [cpTel, setCpTel] = useState('') //회사 전화번호
    const [cpFx, setCpFx] = useState('') //회사 팩스번호
    const [cpNum, setCpNum] = useState('') //회사 사업자번호
    const [cpZipcode, setCpZipcode] = useState('')
    const [comapanyroadAddress, setComapanyRoadAddress] = useState('')
    const [comapanyDetailAddress, setComapanyDetailAddress] = useState('')
    const [cpAddress, setCpAddress] = useState('') //회사 주소

    const [showCompanyInfo, setShowCompanyInfo] = useState(false);

    const [idchk, setIdchk] = useState(false) // 중복검사
    const [pwchk, setPwchk] = useState(false)
    const [infoEmpty, setInfoEmpty] = useState(false)
    

    const [isValidId, setIsValidId] = useState(true)
    const [isValidPw, setIsValidPw] = useState(true)
    const [isValidName, setIsValidName] = useState(true)
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [isValidTel, setIsValidTel] = useState(true)
    const [isValidPhone, setIsValidPhone] = useState(true)
    const [isValidCpName, setIsValidCpName] = useState(true)
    const [isValidCpCeo, setIsValidCpCeo] = useState(true)
    const [isValidCpNum, setIsValidCpNum] = useState(true)
    const [isValidCpFx ,setIsValidCpFx] = useState(true)
    const [isValidCpTel, setIsValidCpTel] = useState(true)

    const errmsg = {
        id : '올바르지 않은 아이디 형식입니다.',
        pw : '올바르지 않은 비밀번호 형식입니다.',
        name : '올바르지 않은 이름 형식입니다.',
        email : '올바르지 않은 이메일 형식입니다.',
        tel : '올바르지 않은 전화번호 형식입니다.',
        phone : '올바르지 않은 전화번호 형식입니다.',
        cpName : '올바르지 않은 회사명 형식입니다.',
        cpCeo : '올바르지 않은 대표자명 형식입니다.',
        cpNum : '올바르지 않은 사업자번호 형식입니다.',
        cpFx : '올바르지 않은 팩스번호 형식입니다.',
    }

    const postcodeScriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
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
        setCpZipcode(data.zonecode);
        setComapanyRoadAddress(roadAddress);
        fullAddress = fullAddress.replace(localAddress, '');
        }
    }
    //클릭 시 발생할 이벤트
    const handleCClick = () => {
        //주소검색이 완료되고, 결과 주소를 클릭 시 해당 함수 수행
        open({onComplete: handleCadderess});
    }


    const navigate = useNavigate()

    useEffect(()=>{
        if(uPart && uId && uPw && uName && uEmail && userTel && userPhone && zipcode && userroadAddress && userDetailAddress && (!showCompanyInfo || (company && ceo && cpTel && cpFx && cpNum && cpZipcode && comapanyroadAddress && comapanyDetailAddress && isValidCpTel && isValidCpNum && isValidCpFx && isValidCpName && isValidCpCeo)) && idchk && pwchk && isValidId && isValidPw && isValidName && isValidEmail && isValidTel && isValidPhone){
            setInfoEmpty(true);
        } else{
            setInfoEmpty(false)
        }
    }, [uPart,  uId,  uPw,  uName,  uEmail,  userTel,  userPhone, zipcode,  userroadAddress, userDetailAddress, company,  ceo,  cpTel,  cpFx,  cpNum,  cpZipcode, comapanyroadAddress, comapanyDetailAddress, idchk,  pwchk, isValidId, isValidPw, isValidName, isValidEmail, isValidTel, isValidPhone, isValidCpName, isValidCpCeo, isValidCpTel, isValidCpNum, isValidCpFx, showCompanyInfo])

    const radio_select_userPart = e => {
        setUPart(e.target.value)
        if (e.target.value === 'general_user') {
            setShowCompanyInfo(false); // 일반회원 선택 시, 업체 정보 입력란 숨기기
        } else {
            setShowCompanyInfo(true); // 다른 값 선택 시, 업체 정보 입력란 표시
        }
    }
    const btn_progrm_idConfirm = async(e) =>{
        if(uId === ''){
            alert('아이디를 입력해주세요.')
            return
        }
        const userId = {
            'uId' : uId
        }
        try{
            const response = await axios.get(`/signUp/${uId}`);
            console.log(response)
            setIdchk(true)
            if(response.data === 1){
                setIdchk(true)
                alert('사용가능한 아이디입니다.')
            } else {
                alert('이미 사용중인 아이디 입니다.')
            }        
        } catch(err){
            alert('이미 사용중인 아이디 입니다.')
        }
    }
    const input_id = e => {
        setUId(e.target.value)
        console.log(e.target.value)
    }
    const valid_id = e => {
        const idRegex = /^[a-zA-Z0-9_]{1,12}$/;
        setIsValidId(idRegex.test(e.target.value))
    }
    const input_pw = e => {
        setUPw(e.target.value)
    }
    const valid_pw = e => {
        const pwRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        setIsValidPw(pwRegex.test(e.target.value))
    }
    const input_pwchk = e => {
        const re_pw = e.target.value
        if(uPw === re_pw){
            setPwchk(true)
            alert('입력하신 비밀번호와 일치합니다.')
        }else{
            alert('입력하신 비밀번호와 일치하지 않습니다.')
        }
    }
    const input_name = e => {
        setUName(e.target.value)
    }
    const valid_name = e => {
        const nameRegex = /^[a-zA-Z가-힣]{1,20}$/;
        setIsValidName(nameRegex.test(e.target.value))
    }
    const input_email = e => {
        setUEmail(e.target.value)
    }
    const valid_email = e => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setIsValidEmail(emailRegex.test(e.target.value))
    }
    const input_tel = e => {
        setUserTel(e.target.value)
    }
    const valid_tel = e => {
        const telRegex = /^0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]|70|8[1-4])-?\d{3,4}-?\d{4}$/;
        setIsValidTel(telRegex.test(e.target.value))
    }
    const input_phone = e => {
        setUserPhone(e.target.value)
    }
    const valid_phone = e => {
        const phoneRegex = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/
        setIsValidPhone(phoneRegex.test(e.target.value))
    }
    const input_userDetails = e => {
        const uadd = zipcode + "/" + userroadAddress + "/" + userDetailAddress;
        setUserAddress(uadd)
        setUserDetailAddress(e.target.value)
    }
    const input_CompanyDetails = e => {
        const cadd = cpZipcode + "/" + comapanyroadAddress + "/" + comapanyDetailAddress;
        setCpAddress(cadd)
        setComapanyDetailAddress(e.target.value)
    }
    const input_cpname = e => {
        setCompany(e.target.value)
    }
    const valid_cpname = e => {
        const cpnameRegex = /^[a-zA-Z가-힣0-9\s]{1,20}$/;
        setIsValidCpName(cpnameRegex.test(e.target.value))
    }
    const input_cp_ceo = e => {
        setCeo(e.target.value)
    }
    const valid_cpceo = e => {
        const ceoRegex = /^[a-zA-Z가-힣]{1,8}$/;
        setIsValidCpCeo(ceoRegex.test(e.target.value))
    }
    const input_cp_tel = e => {
        setCpTel(e.target.value)
    }
    const valid_cptel = e => {
        const cpTelRegex = /^0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]|70|8[1-4])-?\d{3,4}-?\d{4}$/;
        setIsValidCpTel(cpTelRegex.test(e.target.value))
    }
    const input_cp_fx = e => {
        setCpFx(e.target.value)
    }
    const valid_cpfx = e => {
        const fxRegex = /^0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]|70|8[1-4])-?\d{3,4}-?\d{4}$/;
        setIsValidCpFx(fxRegex.test(e.target.value))
    }
    const input_cp_num = e => {
        setCpNum(e.target.value)
    }
    const valid_cpnum = e => {
        const cpnumRegex = /^\d{3}-\d{2}-\d{5}$/
        setIsValidCpNum(cpnumRegex.test(e.target.value))
    }
    const user_signup = async(userInfo) => {
        console.log(2)
        const response = await axios.post('/signUp', userInfo)
        console.log(response)
        if(response.data === '회원가입 완료!'){
            alert('회원가입이 완료되었습니다.')
            navigate('/mediclogin')
        }
    }
    const btn_progrm_signup = e => {
        

        e.preventDefault()
        const userInfo = {
            'uRole' : 'general_user',
            'uPart' : uPart,
            'uId' : uId,
            'uPw' : uPw,
            'uName' : uName,
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
        user_signup(userInfo)
    }
    return(
        <div className={joinpage.join_wrap}>
            <div className={joinpage.iconbox}>
                <h2 className={joinpage.title}>
                    회원가입 약관
                </h2>
            </div>
            <div className={joinpage.iconbox}>
                <h3 className={joinpage.tit}>
                    가입자 정보
                </h3>
            </div>
            <div className={joinpage.join_usertable}>
                <div className={joinpage.user_row_box}>
                    <div className={joinpage.user_title_box}>회원구분</div>
                    <div className={joinpage.user_input_box}>
                        <input type="radio" name="user_role" value="general_user" onChange={radio_select_userPart}/>일반회원
                        <input type="radio" name="user_role" value="insurance_co" onChange={radio_select_userPart}/>보험사
                        <input type="radio" name="user_role" value="deduction_sc" onChange={radio_select_userPart}/>공제회
                        <input type="radio" name="user_role" value="adjuster_cp" onChange={radio_select_userPart}/>손해사정법인
                        <input type="radio" name="user_role" value="adjuster_oc" onChange={radio_select_userPart}/>손해사정사무소
                        <input type="radio" name="user_role" value="lawfirm" onChange={radio_select_userPart}/>법무법인
                        <input type="radio" name="user_role" value="labor_cp" onChange={radio_select_userPart}/>노무법인
                    </div>
                </div>
                <div className={joinpage.user_row_box}>
                    <div className={joinpage.user_title_box}>아이디</div>
                    <div className={joinpage.user_input_box}>
                        <input type="text" name="id" className={joinpage.input_id} onBlur={valid_id} onChange={input_id} maxLength={12}/>
                        <button type="button" onClick={btn_progrm_idConfirm} className={joinpage.btn_changemypw}>아이디 중복확인</button>
                        {isValidId ? <></> : <span className={joinpage.errmsg}>{errmsg.id} <br/>(영문, 숫자, _ 포함 1~12자)</span>}
                    </div>
                </div>
                <div className={joinpage.user_row_box}>
                    <div className={joinpage.user_title_box}>비밀번호</div>
                    <div className={joinpage.user_input_box}>
                        <input type="password" name="pw" onBlur={valid_pw} onChange={input_pw} maxLength={15}/>
                        {isValidPw ? <></> : <span className={joinpage.errmsg}>{errmsg.pw} <br/> (최소 8자, 대소문자, 숫자, 특수문자를 각각 1개 이상 포함)</span>}

                    </div>
                </div>
                <div className={joinpage.user_row_box}>
                    <div className={joinpage.user_title_box}>비밀번호 확인</div>
                    <div className={joinpage.user_input_box}>
                        <input type="password" name="re_pw" onBlur={input_pwchk} maxLength={15}/>
                    </div>
                </div>
                <div className={joinpage.user_row_box}>
                    <div className={joinpage.user_title_box}>회원명</div>
                    <div className={joinpage.user_input_box}>
                        <input type="text" name="name" onBlur={valid_name} onChange={input_name} maxLength={20}/>
                        {isValidName ? <></> : <span className={joinpage.errmsg}>{errmsg.name} (한글 또는 영문으로 최대 20자)</span>}
                    </div>
                </div>
                <div className={joinpage.user_row_box}>
                    <div className={joinpage.user_title_box}>이메일</div>
                    <div className={joinpage.user_input_box}>
                        <input type="text" name="email" onBlur={valid_email} onChange={input_email} maxLength={30}/>
                        {isValidEmail ? <></> : <span className={joinpage.errmsg}>{errmsg.email} (이메일 형식에 맞게 입력하세요)</span>}
                    </div>
                </div>
                <div className={joinpage.user_row_box}>
                    <div className={joinpage.user_title_box}>일반전화 (- 포함)</div>
                    <div className={joinpage.user_input_box}>
                        <input type="text" name="tel" onBlur={valid_tel} onChange={input_tel} maxLength={13}/>
                        {isValidTel ? <></> : <span className={joinpage.errmsg}>{errmsg.tel} (숫자와 '-'만 입력하세요)</span>}
                    </div>
                </div>
                <div className={joinpage.user_row_box}>
                    <div className={joinpage.user_title_box}>휴대폰번호 (- 포함)</div>
                    <div className={joinpage.user_input_box}>
                        <input type="text" name="phone" onBlur={valid_phone} onChange={input_phone} maxLength={13}/>
                        {isValidPhone ? <></> : <span className={joinpage.errmsg}>{errmsg.phone} (숫자와 '-'만 입력하세요)</span>}
                    </div>
                </div>
                <div className={joinpage.user_row_box} style={{alignItems : 'center'}}>
                    <div className={joinpage.user_title_box} style={{height : '80px'}}>주소</div>
                    <div className={joinpage.user_address_input_box}>
                        <div>
                            <input type="text" disabled={false} value={zipcode} style={{width: '80px'}}/>
                            <button type="button" className={joinpage.btn_findaddress} onClick={handleUClick} >주소찾기</button>
                        </div>
                        <div style={{display : "flex"}}>
                            <input type="text" disabled={false} value={userroadAddress} style={{width: '250px'}}/> 
                            <input type="text" value={userDetailAddress} onChange={input_userDetails} style={ {width:'250px', marginLeft : '10px'}}/>
                        </div>
                    </div>
                </div>
            </div>



            {showCompanyInfo && (
                <>
                    <div className={joinpage.iconbox}>
                        <h3 className={joinpage.tit}>
                            업체 정보
                        </h3>
                    </div>    
                    <div className={joinpage.join_companytable}>
                        <div className={joinpage.company_row_box}>
                            <div className={joinpage.company_title_box}>회사명</div>
                            <div className={joinpage.company_input_box}>
                                <input type="text" name="cp_name" onBlur={valid_cpname} onChange={input_cpname} maxLength={20}/>
                                {isValidCpName ? <></> : <span className={joinpage.errmsg}>{errmsg.cpName} (한글, 영문, 숫자로 최대 20자(띄어쓰기 포함))</span>}
                            </div>
                        </div>
                        <div className={joinpage.company_row_box}>
                            <div className={joinpage.company_title_box}>대표자명</div>
                            <div className={joinpage.company_input_box}>
                                <input type="text" name="cp_ceo" onBlur={valid_cpceo} onChange={input_cp_ceo} maxLength={8}/>
                                {isValidCpCeo ? <></> : <span className={joinpage.errmsg}>{errmsg.cpCeo} (한글 또는 영문으로 최대 8자)</span>}
                            </div>
                        </div>
                        <div className={joinpage.company_row_box}>
                            <div className={joinpage.company_title_box}>일반전화</div>
                            <div className={joinpage.company_input_box}>
                                <input type="text" name="cp_tel" onBlur={valid_cptel} onChange={input_cp_tel} maxLength={13}/>
                                {isValidCpTel ? <></> : <span className={joinpage.errmsg}>{errmsg.tel} (숫자와 '-'만 입력하세요)</span>}
                            </div>
                        </div>
                        <div className={joinpage.company_row_box}>
                            <div className={joinpage.company_title_box}>팩스번호</div>
                            <div className={joinpage.company_input_box}>
                                <input type="text" name="cp_fx" onBlur={valid_cpfx} onChange={input_cp_fx} maxLength={15}/>
                                {isValidCpFx ? <></> : <span className={joinpage.errmsg}>{errmsg.cpFx} (숫자와 '-'만 입력하세요)</span>}
                            </div>
                        </div>
                        <div className={joinpage.company_row_box}>
                            <div className={joinpage.company_title_box}>사업자번호(법인)</div>
                            <div className={joinpage.company_input_box}>
                                <input type="text" name="cp_num" onBlur={valid_cpnum} onChange={input_cp_num} maxLength={20}/>
                                {isValidCpNum ? <></> : <span className={joinpage.errmsg}>{errmsg.cpNum} (숫자와 '-'만 입력하세요)</span>}
                            </div>
                        </div>
                        <div className={joinpage.company_row_box} style={{alignItems : 'center'}}>
                            <div className={joinpage.company_title_box} style={{height : '80px'}}>사업장 주소</div>
                            <div className={joinpage.company_address_input_box}>
                                <div>
                                    <input type="text" disabled={false} value={cpZipcode} style={{width: '80px'}}/>
                                    <button type="button" className={joinpage.btn_findaddress} onClick={handleCClick} >주소찾기</button>
                                </div>
                                <div style={{display : "flex"}}>
                                    <input type="text" disabled={false} value={comapanyroadAddress} style={{width: '250px'}}/> 
                                    <input type="text" value={comapanyDetailAddress} onChange={input_CompanyDetails} style={ {width:'250px', marginLeft : '10px'}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                )}
            <div className={joinpage.complete}>
                <button type = "button" onClick={btn_progrm_signup} disabled={!infoEmpty} className={joinpage.btt_complete}>회원 가입 완료</button>
            </div>
        </div>
    )
}

