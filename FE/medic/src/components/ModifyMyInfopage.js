import React, { useEffect, useState } from "react";
import axios from "axios";
import mypage from '../css/Mypage.module.css'
import { useLocation, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import {useDaumPostcodePopup} from "react-daum-postcode";

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
    const [userroadAddress, setUserRoadAddress] = useState('')
    const [detailAddress, setDetailAddress] = useState('')
    const [userAddress, setUserAddress] = useState('')

    const [company, setCompany] = useState('') //업체명
    const [ceo, setCeo] = useState('') //대표자명
    const [cpTel, setCpTel] = useState('') //회사 전화번호
    const [cpFx, setCpFx] = useState('') //회사 팩스번호
    const [cpNum, setCpNum] = useState('') //회사 사업자번호
    const [cpZipcodeNum, setCpZipcodeNum] = useState('')
    const [cpZipcode, setCpZipcode] = useState('')    
    const [comapanyroadAddress, setComapanyRoadAddress] = useState('')
    const [detailCpAddress, setDetailCpAddress] = useState('')
    const [cpAddress, setCpAddress] = useState('') //회사 주소
    const [infoEmpty, setInfoEmpty] = useState(false)

    const [isValidEmail, setIsValidEmail] = useState(true)
    const [isValidTel, setIsValidTel] = useState(true)
    const [isValidPhone, setIsValidPhone] = useState(true)
    const [isValidCpNum, setIsValidCpNum] = useState(true)
    const [isValidCpFx ,setIsValidCpFx] = useState(true)
    const [isValidCpTel, setIsValidCpTel] = useState(true)

    const navigate = useNavigate()
    const cookie = new Cookies()

    const errmsg = {
        email : '올바르지 않은 이메일 형식입니다.',
        tel : '올바르지 않은 전화번호 형식입니다. (숫자와 "-"만 입력하세요)',
        phone : '올바르지 않은 전화번호 형식입니다. (숫자와 "-"만 입력하세요)',
        cpNum : '올바르지 않은 사업자번호 형식입니다. (숫자와 "-"만 입력하세요)',
        cpFx : '올바르지 않은 팩스번호 형식입니다. (숫자와 "-"만 입력하세요)',
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
        setDetailAddress('')
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
        setDetailCpAddress("")
        fullAddress = fullAddress.replace(localAddress, '');
        }
    }
    //클릭 시 발생할 이벤트
    const handleCClick = () => {
        //주소검색이 완료되고, 결과 주소를 클릭 시 해당 함수 수행
        open({onComplete: handleCadderess});
    }

    const setUserPart = (user_part) => {
        console.log(user_part)
        switch(user_part){
            case 'general_user' : 
                setUPart('일반회원')
                window.localStorage.setItem('uPart', '일반회원') 
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
        const uadd = user_address.split('/')
        console.log(uadd)
        setUserAddress(user_address)
        setZipcode(uadd[0])
        setUserRoadAddress(uadd[1])
        setDetailAddress(uadd[2])
    }
    const setPrevCpAddress = cp_address => {
        const cadd = cp_address.split('/')
        console.log(cadd)
        setCpAddress(cp_address)
        setCpZipcode(cadd[0])
        setComapanyRoadAddress(cadd[1])
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
        if(uPart === "일반회원"){
            if(uPw && uEmail && userTel && userPhone && userroadAddress && zipcode && detailAddress && isValidEmail && isValidTel && isValidPhone){
                setInfoEmpty(true);
            }else{
                setInfoEmpty(false)
            }
        }else{
            if(uPw && uEmail && userTel && userPhone && userroadAddress && zipcode && detailAddress && company && ceo && cpTel && cpFx && cpNum && comapanyroadAddress && cpZipcode && detailCpAddress && isValidEmail && isValidTel && isValidPhone && isValidCpTel && isValidCpNum && isValidCpFx){
                setInfoEmpty(true);
            } else{
                setInfoEmpty(false)
            }
        }    
    }, [uPw,  uEmail,  userTel,  userPhone,  userroadAddress, zipcode, detailAddress,  company,  ceo,  cpTel,  cpFx,  cpNum, comapanyroadAddress, cpZipcode, detailCpAddress, isValidEmail, isValidTel, isValidPhone, isValidCpTel, isValidCpNum, isValidCpFx])

    const changeMyPw = e => {
        navigate('/medic/mypage/modifymyinfo/modifyMyPw', {state:{upw : uPw}})
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
        const emailRegex = /^0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]|70|8[1-4])-?\d{3,4}-?\d{4}$/;
        setIsValidTel(emailRegex.test(e.target.value))
    }
    const input_phone = e => {
        setUserPhone(e.target.value)
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
        const uadd = zipcode + "/" + userroadAddress + "/" + e.target.value
        console.log(uadd)
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
    const input_cp_zipcode_num = e => {
        setCpZipcodeNum(e.target.value)
    }
    const input_cp_zipcode = e => {
        setCpZipcode(e.target.value)
    }
    const input_cp_details_zipcode = e => {
        const cpadd = cpZipcode + "/" + comapanyroadAddress + "/" + e.target.value
        setDetailCpAddress(e.target.value)
        setCpAddress(cpadd)
    }
    const user_modify = async(userInfo) => {
        const response = await axios.put('/user/modifyUserInfo', userInfo)
        console.log(response)
        if(response.data === '정보수정 완료!'){
            alert('정보수정이 완료되었습니다.')
            window.location.href = window.location.href;
        }
    }

    const btn_progrm_modify = e => {
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
        console.log(userInfo)
        if(!infoEmpty){
            alert('입력값을 확인하세요.')
            return
        }
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
            if(window.confirm('정말 탈퇴 하시겠습니까?')){
                const response = await axios.post('/user/deleteUser')
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
        <div className={`${uPart === '일반회원' ? mypage.modify_wrap_small : mypage.modify_wrap}`}>
            <h3 className={mypage.modify_title}>
                회원정보수정
            </h3>
            <div className={mypage.modify_userinfo}>
                <h4 className={mypage.modify_subtitle}><span className={mypage.modify_subtitleimg}></span>회원 정보</h4>
                <div className={mypage.modify_userinfotable}>
                    <div className={mypage.modify_row}>
                        <div className={mypage.modify_row_title}>회원구분</div>
                        <div className={mypage.modify_userinfo_content}>{uPart}</div>
                    </div>
                    <div className={mypage.modify_row}>
                        <div className={mypage.modify_row_title}>아이디</div>
                        <div className={mypage.modify_userinfo_content}>{uId}</div>
                    </div>
                    <div className={mypage.modify_row}>
                        <div className={mypage.modify_row_title}>비밀번호</div>
                        <div className={mypage.modify_userinfo_content}>
                            <input type="password" name="pw" disabled={true} value={uPw} maxLength={15}/>
                            <button type="button"  className={mypage.btn_changemypw} onClick={changeMyPw}>비밀번호 재설정</button>
                        </div>
                    </div>
                    <div className={mypage.modify_row}>
                        <div className={mypage.modify_row_title}>회원명</div>
                        <div className={mypage.modify_userinfo_content}>{uName}</div>
                    </div>
                    <div className={mypage.modify_row}>
                        <div className={mypage.modify_row_title}>이메일</div>
                        <div className={mypage.modify_userinfo_content}>
                            <input type="text"value={uEmail} onBlur={valid_email} onChange={input_email} maxLength={30}/>
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
                            <input type="text" value={userTel} onBlur={valid_tel} onChange={input_tel} maxLength={13}></input>
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
                            <input type="text" value={userPhone} onBlur={valid_phone} onChange={input_phone} maxLength={13}></input>
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
                                <input type="text" disabled={true} value={zipcode} onChange={input_zipcode} style={{width: '80px'}}/>
                                <button type="button" className={mypage.btn_findaddress} onClick={handleUClick} >주소찾기</button>
                            </div>
                            <div style={{display : "flex"}}>
                                <input type="text" disabled={true} value={userroadAddress} onChange={input_zipcode_num} style={{width: '250px'}}/> 
                                <input type="text" value={detailAddress} onChange={input_details_zipcode} style={ {width:'250px', marginLeft : '10px'}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {uPart !== '일반회원' ?
             <div className={mypage.modify_userinfo} style={{marginTop : '60px'}}>
                <h4 className={mypage.modify_subtitle}><span className={mypage.modify_subtitleimg}></span>업체 정보</h4>
                <div className={mypage.modify_userinfotable}>
                    <div className={mypage.modify_row}>
                        <div className={mypage.modify_row_title}>회사명</div>
                        <div className={mypage.modify_userinfo_content}>
                            <input type="text" name="cp_name" value={company} onChange={input_cpname} maxLength={20}/>
                        </div>
                    </div>
                    <div className={mypage.modify_row}>
                        <div className={mypage.modify_row_title}>대표자명</div>
                        <div className={mypage.modify_userinfo_content}>
                            <input type="text" name="cp_name" value={ceo} onChange={input_cp_ceo} maxLength={8}/>  
                        </div>
                    </div>
                    <div className={mypage.modify_row}>
                        <div className={mypage.modify_row_title}>일반전화</div>
                        <div className={mypage.modify_userinfo_content}>
                            <input type="text" value={cpTel} onBlur={valid_cptel} onChange={input_cp_tel} maxLength={13}></input>
                            {
                                isValidCpTel ?
                                <></>
                                :
                                <span className={mypage.errmsg}>{errmsg.tel}</span>
                            }
                        </div>
                    </div>
                    <div className={mypage.modify_row}>
                        <div className={mypage.modify_row_title}>팩스번호</div>
                        <div className={mypage.modify_userinfo_content}>
                            <input type="text" value={cpFx} onBlur={valid_cpfx} onChange={input_cp_fx} maxLength={13}></input>
                            {
                                isValidCpFx ?
                                <></>
                                :
                                <span className={mypage.errmsg}>{errmsg.cpFx}</span>
                            }
                        </div>
                    </div>
                    <div className={mypage.modify_row}>
                        <div className={mypage.modify_row_title}>사업자번호(법인)</div>
                        <div className={mypage.modify_userinfo_content}>
                            <input type="text" value={cpNum} onBlur={valid_cpnum} onChange={input_cp_num} maxLength={20}></input>
                            {
                                isValidCpNum ?
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
                                <input type="text" disabled={true} value={cpZipcode} onChange={input_cp_zipcode} style={{width: '80px'}}/>
                                <button type="button" className={mypage.btn_findaddress} onClick={handleCClick} >주소찾기</button>
                            </div>
                            <div style={{display : "flex"}}>
                                <input type="text" disabled={true} value={comapanyroadAddress} onChange={input_cp_zipcode_num} style={{width: '250px'}}/> 
                                <input type="text" value={detailCpAddress} onChange={input_cp_details_zipcode} style={ {width:'250px', marginLeft : '10px'}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <></>
            }
            <div className={mypage.complete}>
                <div className={mypage.complete_btnBox}>
                    <button type = "button" onClick={btn_progrm_modify}  className={mypage.btt_complete} >수정</button>
                    <button type = "button" onClick={btn_cancle_modify} className={mypage.btt_complete} style={{backgroundColor : 'white', color : '#0f3a75'}}>취소</button>
                    <button type = "button" onClick={btn_progrm_deleteuser} className={mypage.btt_complete}>탈퇴</button>
                </div>
            </div>
        </div>
    )
}
