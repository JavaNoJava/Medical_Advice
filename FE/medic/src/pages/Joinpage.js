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

    const [idchk, setIdchk] = useState(false) // 중복검사
    const [pwchk, setPwchk] = useState(false)
    const [infoEmpty, setInfoEmpty] = useState(false)

    // const [useDaumPostcodePopup, setUseDaumPostcodePopup] = useState('');
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
        const uadd = zipcode + " " + userroadAddress + " " + userDetailAddress;
        setUserAddress(uadd)
        const cadd = cpZipcode + " " + comapanyroadAddress + " " + comapanyDetailAddress;
        setCpAddress(cadd)
        if(uPart && uId && uPw && uName && uEmail && userTel && userPhone && userAddress && company && ceo && cpTel && cpFx && cpNum && cpAddress && idchk && pwchk){
            setInfoEmpty(true);
        } else{
            setInfoEmpty(false)
        }
    }, [uPart,  uId,  uPw,  uName,  uEmail,  userTel,  userPhone,  userAddress,  company,  ceo,  cpTel,  cpFx,  cpNum,  cpAddress,  idchk,  pwchk])

    const radio_select_userPart = e => {
        setUPart(e.target.value)
        console.log(e.target.value)
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
    const input_pw = e => {
        setUPw(e.target.value)
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
    const input_email = e => {
        setUEmail(e.target.value)
    }
    const input_tel = e => {
        setUserTel(e.target.value)
    }
    const input_phone = e => {
        setUserPhone(e.target.value)
    }
    const input_zipcode = e => {
        setZipcode(e.target.value)
    }
    const input_userDetails = e => {
        setUserDetailAddress(e.target.value)
    }
    const input_CompanyDetails = e => {
        setComapanyDetailAddress(e.target.value)
    }
    const totalUserAddress = e => {
        const uadd = zipcode + " " + userroadAddress + " " + userDetailAddress;
        setUserAddress(uadd)
    }
    const totalCompanyAddress = e => {
        const cadd = cpZipcode + " " + comapanyroadAddress + " " + comapanyDetailAddress;
        setCpAddress(cadd)
    }
    // const input_details_zipcode = e => {
    //     const uadd = zipcodeNum + " " + zipcode + " " + e.target.value
    //     setUserAddress(uadd)
    // }
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
    // const input_cp_zipcode_num = e => {
    //     setCpZipcodeNum(e.target.value)
    // }
    const input_cp_zipcode = e => {
        setCpZipcode(e.target.value)
    }
    // const input_cp_details_zipcode = e => {
    //     const cpadd = cpZipcodeNum + " " + cpZipcode + " " + e.target.value
    //     setCpAddress(cpadd)
    // }
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
                        <input type="text" name="id" className={joinpage.input_id} onChange={input_id} maxLength={12}/>
                        <button type="button" onClick={btn_progrm_idConfirm} className={joinpage.btt_id}>아이디 중복확인</button>
                    </div>
                </div>
                <div className={joinpage.user_row_box}>
                    <div className={joinpage.user_title_box}>비밀번호</div>
                    <div className={joinpage.user_input_box}>
                        <input type="password" name="pw" onChange={input_pw} maxLength={15}/>
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
                        <input type="text" name="name" onChange={input_name} maxLength={20}/>
                    </div>
                </div>
                <div className={joinpage.user_row_box}>
                    <div className={joinpage.user_title_box}>이메일</div>
                    <div className={joinpage.user_input_box}>
                        <input type="text" name="email" onChange={input_email} maxLength={30}/>
                    </div>
                </div>
                <div className={joinpage.user_row_box}>
                    <div className={joinpage.user_title_box}>일반전화</div>
                    <div className={joinpage.user_input_box}>
                        <input type="text" name="tel" onChange={input_tel} maxLength={13}/>
                    </div>
                </div>
                <div className={joinpage.user_row_box}>
                    <div className={joinpage.user_title_box}>휴대폰번호</div>
                    <div className={joinpage.user_input_box}>
                        <input type="text" name="phone" onChange={input_phone} maxLength={13}/>
                    </div>
                </div>
                <div className={joinpage.user_row_box} style={{height: '80px'}}>
                    <div className={joinpage.user_address_title_box}>주소</div>
                    <div className={joinpage.user_address_input_box}>
                        <div style={{marginBottom: '10px'}}>
                            <input type="text" disabled="false" value={zipcode} onChange={input_phone} style={{width: '70px'}}/>
                            <button type="button" onClick={handleUClick} >주소찾기</button>
                        </div>
                        <div>
                            <input type="text" disabled="false" value={userroadAddress} onChange={input_phone} style={{width: '300px'}}/> 
                            <input type="text" name="userDetailAddress" onChange={input_userDetails} style={{margin: '0 20px', width: '300px'}}/>
                        </div>
                    </div>
                </div>
            </div>




            <div className={joinpage.iconbox}>
                <h3 className={joinpage.tit}>
                    업체 정보
                </h3>
            </div>    
            <div className={joinpage.join_companytable}>
                <div className={joinpage.company_row_box}>
                    <div className={joinpage.company_title_box}>회사명</div>
                    <div className={joinpage.company_input_box}>
                        <input type="text" name="cp_name" onChange={input_cpname} maxLength={20}/>
                    </div>
                </div>
                <div className={joinpage.company_row_box}>
                    <div className={joinpage.company_title_box}>대표자명</div>
                    <div className={joinpage.company_input_box}>
                        <input type="text" name="cp_ceo" onChange={input_cp_ceo} maxLength={8}/>
                    </div>
                </div>
                <div className={joinpage.company_row_box}>
                    <div className={joinpage.company_title_box}>일반전화</div>
                    <div className={joinpage.company_input_box}>
                        <input type="text" name="cp_tel" onChange={input_cp_tel} maxLength={13}/>
                    </div>
                </div>
                <div className={joinpage.company_row_box}>
                    <div className={joinpage.company_title_box}>팩스번호</div>
                    <div className={joinpage.company_input_box}>
                        <input type="text" name="cp_fx" onChange={input_cp_fx} maxLength={15}/>
                    </div>
                </div>
                <div className={joinpage.company_row_box}>
                    <div className={joinpage.company_title_box}>사업자번호(법인)</div>
                    <div className={joinpage.company_input_box}>
                        <input type="text" name="cp_num" onChange={input_cp_num} maxLength={20}/>
                    </div>
                </div>
                <div className={joinpage.company_row_box} style={{height: '80px'}}>
                    <div className={joinpage.company_address_title_box}>사업장 주소</div>
                    <div className={joinpage.company_address_input_box}>
                        <div style={{marginBottom: '10px'}}>
                            <input type="text" disabled="false" value={cpZipcode} onChange={input_phone} style={{width: '70px'}}/>
                            <button type="button" onClick={handleCClick} >주소찾기</button>
                        </div>
                        <div>
                            <input type="text" disabled="false" value={comapanyroadAddress} onChange={input_phone} style={{width: '300px'}}/> 
                            <input type="text" name="companyDetailAddress" onChange={input_CompanyDetails} style={{margin: '0 20px', width: '300px'}}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={joinpage.complete}>
                <button type = "button" onClick={btn_progrm_signup} disabled={!infoEmpty} className={joinpage.btt_complete}>회원 가입 완료</button>
            </div>
        </div>
    )
}

