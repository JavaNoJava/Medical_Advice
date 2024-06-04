import React, { useState, useEffect } from "react";
import axios from "axios";
import mypage from '../../css/Mypage.module.css';

import { useNavigate , useLocation} from "react-router-dom";
import {useDaumPostcodePopup} from "react-daum-postcode";


export default function DocEdit() {
  const location = useLocation();
  const docInfo = location.state.docedit||{};
  
  const [cId,setCId] = useState(docInfo);
  console.log('a',docInfo)
  const [uRole, setURole] = useState('');   //역할
  const [department, setDepartment] = useState([
      "내과", "신경과", "정신건강의학과", "외과", "정형외과", "신경외과", "흉부외과", "성형외과", "마취통증의학과",
      "산부인과", "소아청소년과", "안과", "이비인후과", "피부과", "비뇨의학과", "영상의학과", "방사선종양학과",
      "병리과", "진단검사의학과", "결핵과", "재활의학과", "예방의학과", "가정의학과", "응급의학과", "핵의학과",
      "직업환경의학과"
    ]);
  const [cPw, setCPw] = useState('')      //pw
  const [cName, setCName] = useState('') //name
  const [cEmail, setCEmail] = useState('') //email
  const [cTel, setCTel] = useState('') //tel
  const [cPhone, setCPhone] = useState('') //
  const [crole, setCRole] = useState('')
  const [hospFx, setHospFx] = useState('')
  const [hospName,setHospName] = useState('')
  const [hospNum, setHospNum] = useState('') //소속 병원
  const [hospTel, setHospTel] = useState('')

  const [ceo, setCeo] = useState('') //대표자명
  const [cpTel, setCpTel] = useState('') //회사 전화번호
  const [cpFx, setCpFx] = useState('') //회사 팩스번호
  const [cpNum, setCpNum] = useState('') //회사 사업자번호


  const [myInfo, setMyInfo] = useState({})

  const [idchk, setIdchk] = useState(false) // 중복검사
  const [pwchk, setPwchk] = useState(false)

  const [infoEmpty, setInfoEmpty] = useState(false)
  const [zipcodeNum, setZipcodeNum] = useState(docInfo.zipcodeNum)
  const [zipcode, setZipcode] = useState(docInfo.zipCode)
  const [detailAddress, setDetailAddress] = useState(docInfo.detailAddress)
  const [userAddress, setUserAddress] = useState(docInfo.userAddress)
  const [cpZipcodeNum, setCpZipcodeNum] = useState(docInfo.cpZipcodeNum)
  const [cpZipcode, setCpZipcode] = useState(docInfo.cpZipcode)
  const [detailCpAddress, setDetailCpAddress] = useState(docInfo.detailCpAddress)
  const [cpAddress, setCpAddress] = useState(docInfo.cpAddress) //회사 주소
  const [userRoadAddress, setUserRoadAddress] = useState('')

  const [hpZipcodeNum, setHpZipcodeNum] = useState('')
  const [hpZipcode, setHpZipcode] = useState('')    
  const [hospRoadAddress, setHospRoadAddress] = useState('')
  const [detailHpAddress, setDetailHpAddress] = useState('')

  const [isValidEmail, setIsValidEmail] = useState(true)
  const [isValidTel, setIsValidTel] = useState(true)
  const [isValidPhone, setIsValidPhone] = useState(true)
  const [isValidHpNum, setIsValidHpNum] = useState(true)
  const [isValidHpFx ,setIsValidHpFx] = useState(true)
  const [isValidHpTel, setIsValidHpTel] = useState(true)
  const [cAddress, setCAddress] = useState('')

  useEffect(() => {
    fetchUserData();
},[]);

const postcodeScriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    const [props, setProps] = useState('');
    //클릭 시 수행될 팝업 생성 함수
    const open = useDaumPostcodePopup(postcodeScriptUrl);

    const handleUadderess = (data) => {
      let fullAddress = data.address;
      let extraAddress = '';
      let localAddress = data.sido + ' ' + data.sigungu;
      let roadAddress = data.roadAddress;
      if (data.addressType === 'R') {
          if (data.bname !== '') {
              extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
              extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          setZipcode(data.zonecode);
          setUserRoadAddress(roadAddress);
          setDetailAddress(''); // 수정된 부분: 상세주소 초기화
          fullAddress = fullAddress.replace(localAddress, '');
          setDocZipcodeNum(data.zonecode); // 새로 추가된 부분
          setDocZipcode(data.roadAddress); // 새로 추가된 부분
      }
  };
    //클릭 시 발생할 이벤트
    const handleUClick = () => {
      open({ onComplete: handleUadderess });
  };
  
  const handleCadderess = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';
    let localAddress = data.sido + ' ' + data.sigungu;
    let roadAddress = data.roadAddress;
    if (data.addressType === 'R') {
        if (data.bname !== '') {
            extraAddress += data.bname;
        }
        if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
        }
        setHpZipcode(data.zonecode);
        setHospRoadAddress(roadAddress);
        setDetailHpAddress(''); // 수정된 부분: 상세주소 초기화
        fullAddress = fullAddress.replace(localAddress, '');
        setHospZipcodeNum(data.zonecode); // 새로 추가된 부분
        setHospZipcode(data.roadAddress); // 새로 추가된 부분
    }
};
    //클릭 시 발생할 이벤트
    const handleCClick = () => {
      open({ onComplete: handleCadderess });
  };

const errmsg = {
  email : '올바르지 않은 이메일 형식입니다.',
  tel : '올바르지 않은 전화번호 형식입니다. (숫자와 "-"만 입력하세요)',
  phone : '올바르지 않은 전화번호 형식입니다. (숫자와 "-"만 입력하세요)',
  cpNum : '올바르지 않은 사업자번호 형식입니다. (숫자와 "-"만 입력하세요)',
  cpFx : '올바르지 않은 팩스번호 형식입니다. (숫자와 "-"만 입력하세요)',
}

  const fetchUserData = async () => {
    try {
      
      const response = await axios.get(`/admin/manageConsultative/detail/${docInfo}`);
      console.log(response);
      setCName(response.data.cname);
      setCEmail(response.data.cemail);
      setCPw(response.data.cpw);
      setCTel(response.data.ctel);
      setCPhone(response.data.cphone);
      setHospName(response.data.hospName);
      setHospNum(response.data.hospNum);
      setHospFx(response.data.hospFx);
      setHospTel(response.data.hospTel);
      setCRole(response.data.crole);
      setDepartment(response.data.department)
      setPrevUserAddress(response.data.caddress)
      setPrevHpAddress(response.data.hospAddress)
      

      // const docAddressArray = response.data.caddress.split(" ");
      // console.log('addres',docAddress)
      // setZipcodeNum(docAddressArray[0]);
      // setZipcode(docAddressArray[1]);
      // setDetailAddress(docAddressArray.slice(2).join(" "));

      // const hospAddressArray = response.data.hospAddress.split(" ");
      // setCpZipcodeNum(hospAddressArray[0]);
      // setCpZipcode(hospAddressArray[1]);
      // setDetailCpAddress(hospAddressArray.slice(2).join(" "));


      console.log('response1', response.data);
      
      console.log('userinfo',docInfo)
    } catch (error) {
      console.error('유저 정보를 가져오는 도중 에러 발생', error);
    }
} 

const setPrevUserAddress = cAddress => {
  const uadd = cAddress.split('/')
  console.log(uadd)
  setCAddress(cAddress)
  setZipcode(uadd[0])
  setUserRoadAddress(uadd[1])
  setDetailAddress(uadd[2])
}
const setPrevHpAddress = hospAddress => {
  const cadd = hospAddress.split('/')
  console.log(cadd)
  setHospAddress(hospAddress)
  setHpZipcode(cadd[0])
  setHospRoadAddress(cadd[1])
  setDetailHpAddress(cadd[2])
}

  const [docZipcodeNum, setDocZipcodeNum] = useState('')
  const [docZipcode, setDocZipcode] = useState('')
  const [docAddress, setDocAddress] = useState('')
  const [hospZipcodeNum, setHospZipcodeNum] = useState('')
    const [hospZipcode, setHospZipcode] = useState('')
    const [hospAddress, setHospAddress] = useState('')


  const input_crole = (e) => {
    setCRole(e.target.value);
  };

 
  const input_cpw = (e) => {
    setCPw(e.target.value);
  };

  const input_cemail = (e) => {
    setCEmail(e.target.value);
  }
  
  const input_cname = (e) => {
    setCName(e.target.value);
  }
  
  const input_ctel = (e) => {
    setCTel(e.target.value);
  }
  
  const input_cphone = (e) => {
    setCPhone(e.target.value);
  }
  
const input_doc_zipcode_num = e => {
    setZipcodeNum(e.target.value)
}
const input_doc_zipcode = e => {
    setDocZipcode(e.target.value)
}
const input_details_czipcode = e => {
    const cadd = docZipcodeNum + " " + docZipcode + " " + e.target.value
    setDetailAddress(e.target.value)
    setDocAddress(cadd)
}
const input_hospname = (e) => {
    setHospName(e.target.value);
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
const input_zipcode = e => {
  setZipcode(e.target.value)
}
const input_zipcode_num = e => {
  console.log(e.target.value)
  setZipcodeNum(e.target.value)
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
const input_hp_fx = e => {
  setHospFx(e.target.value)
}
const input_hp_num = e => {
  setHospNum(e.target.value)
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
  const input_hospTel = (e) => {
    setHospTel(e.target.value);
  }
  
  const input_department = (e) => {
    setDepartment(e.target.value);
  }
  
  
  const input_hosp_fx = (e) => {
    setHospFx(e.target.value);
  }

  const input_hosp_num = (e) => {
    setHospNum(e.target.value);
  }
const input_hosp_zipcode_num = e => {
    setCpZipcodeNum(e.target.value)
}
const input_hosp_zipcode = e => {
    setHospZipcode(e.target.value)
}
const input_hosp_details_zipcode = e => {
    const cpadd = hospZipcodeNum + " " + hospZipcode + " " + e.target.value
    setDetailCpAddress(e.target.value)
    setHospAddress(cpadd)
}

const valid_email = e => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  setIsValidEmail(emailRegex.test(e.target.value))
}
const valid_tel = e => {
  const emailRegex = /^0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]|70|8[1-4])-?\d{3,4}-?\d{4}$/;
  setIsValidTel(emailRegex.test(e.target.value))
}
const valid_phone = e => {
  const emailRegex = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/
  setIsValidPhone(emailRegex.test(e.target.value))
}
const valid_hp_tel = e => {
  const cpTelRegex = /^0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]|70|8[1-4])-?\d{3,4}-?\d{4}$/;
  setIsValidHpTel(cpTelRegex.test(e.target.value))
}
const valid_hpfx = e => {
  const fxRegex = /^0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]|70|8[1-4])-?\d{3,4}-?\d{4}$/;
  setIsValidHpFx(fxRegex.test(e.target.value))
}
const valid_hpnum = e => {
  const cpnumRegex = /^\d{3}-\d{2}-\d{5}$/
  setIsValidHpNum(cpnumRegex.test(e.target.value))
}
const navigate = useNavigate();

  // 회원 정보 수정 완료 버튼 클릭 시 실행되는 함수
  const btn_progrm_doc_edit = (e) => {
    e.preventDefault();
    const docEdit = {
        'cId' : cId,
        'cPw' : cPw,
        'cName' : cName,
        'cEmail' : cEmail,
        'cTel' : cTel,
        'cPhone' : cPhone,
        'cAddress' : cAddress,
        'hospName' : hospName,
        'hospTel' : hospTel,
        'department' : department,
        'hospFx' : hospFx,
        'hospNum' : hospNum,
        'hospAddress' : hospAddress,
        'cRole' : crole
    }
    doc_edit(docEdit);
  };

  const btn_doc_list = async() => {
    navigate('/medic/adminstrator/docmanagement')
}


  const doc_edit = async (docEdit) => {
    try {
      const response = await axios.post('/admin/manageConsultative/modify', docEdit);
      console.log(response);
      
        alert('회원 정보가 수정되었습니다.');
        navigate('/medic/adminstrator/docmanagement');
      
    } catch (error) {
      console.error("Error during user signup:", error);
      alert('회원 정보 수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={mypage.mypage_box} style={{marginRight:'150px',marginTop:'50px'}}>
 
    
    <div className={mypage.modify_wrap}>
    <h3 className={mypage.modify_title}>
                전문의 수정
            </h3>
    <div className={mypage.modify_userinfo}>
        <h4 className={mypage.modify_subtitle}><span className={mypage.modify_subtitleimg}></span>전문의 정보</h4>
        <div className={mypage.modify_userinfotable}>
            <div className={mypage.modify_row}>
                <div className={mypage.modify_row_title}>회원구분</div>
                <div className={mypage.modify_userinfo_content}>전문의</div>
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
    <div className={mypage.complete} style={{marginBottom : '100px'}}>
        <div className={mypage.complete_btnBox}>
            <button type = "button" onClick={btn_progrm_doc_edit}  className={mypage.btt_complete} >수정</button>
            <button type = "button" onClick={btn_doc_list} className={mypage.btt_complete}>목록</button>
        </div>
    </div>
    
</div>
</div>
   
  );
}
