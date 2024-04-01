import React, { useEffect, useState } from "react";
import axios from "axios";
import mypage from '../../css/Mypage.module.css';
import { useNavigate,useLocation} from "react-router-dom";
import {useDaumPostcodePopup} from "react-daum-postcode";

export default function UserEdit() {

  const location = useLocation();
  const userInfo = location.state.useredit;
  console.log('userinfo',userInfo);

  const [uId, setUId] = useState(userInfo.uid)
  console.log('uid',uId)
  const [uRole, setURole] = useState();   //역할
  const [uPw, setUPw] = useState()      //pw
  const [uName, setUName] = useState() //name
  const [uEmail, setUEmail] = useState() //email
  const [userTel, setUserTel] = useState() //tel
  const [userPhone, setUserPhone] = useState() //
  const [zipcodeNum, setZipcodeNum] = useState()
  const [zipcode, setZipcode] = useState()
  const [detailAddress, setDetailAddress] = useState()
  const [userAddress, setUserAddress] = useState()
  const [uPart, setUPart] = useState()
  const [comapanyroadAddress, setComapanyRoadAddress] = useState('')

  const [company, setCompany] = useState() //업체명
  const [ceo, setCeo] = useState() //대표자명
  const [cpTel, setCpTel] = useState() //회사 전화번호
  const [cpFx, setCpFx] = useState() //회사 팩스번호
  const [cpNum, setCpNum] = useState() //회사 사업자번호
  const [cpZipcodeNum, setCpZipcodeNum] = useState()
  const [cpZipcode, setCpZipcode] = useState()
  const [detailCpAddress, setDetailCpAddress] = useState()
  const [cpAddress, setCpAddress] = useState() //회사 주소

  const [isValidEmail, setIsValidEmail] = useState(true)
  const [isValidTel, setIsValidTel] = useState(true)
  const [isValidPhone, setIsValidPhone] = useState(true)
  const [isValidCpNum, setIsValidCpNum] = useState(true)
  const [isValidCpFx ,setIsValidCpFx] = useState(true)
  const [isValidCpTel, setIsValidCpTel] = useState(true)

  const [userroadAddress, setUserRoadAddress] = useState('')

  useEffect(() => {
      fetchUserData();

  },[]);
  const errmsg = {
    email : '올바르지 않은 이메일 형식입니다.',
    tel : '올바르지 않은 전화번호 형식입니다. (숫자와 "-"만 입력하세요)',
    phone : '올바르지 않은 전화번호 형식입니다. (숫자와 "-"만 입력하세요)',
    cpNum : '올바르지 않은 사업자번호 형식입니다. (숫자와 "-"만 입력하세요)',
    cpFx : '올바르지 않은 팩스번호 형식입니다. (숫자와 "-"만 입력하세요)',
}
const postcodeScriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
const open = useDaumPostcodePopup(postcodeScriptUrl);

const handleCClick = () => {
    //주소검색이 완료되고, 결과 주소를 클릭 시 해당 함수 수행
    open({onComplete: handleCadderess});
}

const handleUClick = () => {
    //주소검색이 완료되고, 결과 주소를 클릭 시 해당 함수 수행
    open({onComplete: handleUadderess});
}
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

  const fetchUserData = async () => {
    try {
        const response = await axios.get(`/admin/manageClient/detail/${uId}`);
        console.log('response', response);

        setURole(response.data.urole)
       
        setUId(response.data.uid);
        setUPw(response.data.upw);
        setUName(response.data.uname);
        setUEmail(response.data.uemail);
        setUserTel(response.data.userTel);
        setUserPhone(response.data.userPhone);
        setCompany(response.data.company);
        setUPart(response.data.upart)
        setCeo(response.data.ceo);
        setCpTel(response.data.cpTel);
        setCpFx(response.data.cpFx);
        setCpNum(response.data.cpNum);
        setPrevUserAddress(response.data.userAddress)
        setPrevCpAddress(response.data.cpAddress)

        // userAddress가 정의되어 있는지 확인 후 설정
        if (response.data.userAddress) {
            const userAddressArray = response.data.userAddress.split(" ");
            setZipcodeNum(userAddressArray[0]);
            setZipcode(userAddressArray[1]);
            setDetailAddress(userAddressArray.slice(2).join(" "));
        }

        // cpAddress가 정의되어 있는지 확인 후 설정
        if (response.data.cpAddress) {
            const cpAddressArray = response.data.cpAddress.split(" ");
            setCpZipcodeNum(cpAddressArray[0]);
            setCpZipcode(cpAddressArray[1]);
            setDetailCpAddress(cpAddressArray.slice(2).join(" "));
        }

        console.log('response1', response.data);
    } catch (error) {
        console.error('유저 정보를 가져오는 도중 에러 발생', error);
    }
}


  const navigate = useNavigate();

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
  // 비밀번호 입력 시 실행되는 함수
  const input_pw = (e) => {
   setUPw(e.target.value);
  };

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
const input_name = e => {
  setUName(e.target.value)
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

const valid_cpfx = e => {
    const fxRegex = /^0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]|70|8[1-4])-?\d{3,4}-?\d{4}$/;
    setIsValidCpFx(fxRegex.test(e.target.value))
}

const valid_cpnum = e => {
    const cpnumRegex = /^\d{3}-\d{2}-\d{5}$/
    setIsValidCpNum(cpnumRegex.test(e.target.value))
}
const valid_cptel = e => {
    const cpTelRegex = /^0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]|70|8[1-4])-?\d{3,4}-?\d{4}$/;
    setIsValidCpTel(cpTelRegex.test(e.target.value))
}
const btn_progrm_modify = async (e) => {
  e.preventDefault();
  if (window.confirm("수정하시겠습니까?")) {
    const userInfo = {
      'uId': uId,
      'uPw': uPw,
      'uRole': uRole,
      'uEmail': uEmail,
      'uName': uName,
      'userTel': userTel,
      'userPhone': userPhone,
      // 사용자가 주소를 수정하지 않은 경우 이전 주소 값을 전송합니다.
      'userAddress': zipcodeNum && zipcode && detailAddress ? `${zipcodeNum} ${zipcode} ${detailAddress}` : userInfo.userAddress,
      'company': company,
      'ceo': ceo,
      'cpTel': cpTel,
      'cpFx': cpFx,
      'cpNum': cpNum,
      // 사용자가 회사 주소를 수정하지 않은 경우 이전 주소 값을 전송합니다.
      'cpAddress': cpZipcodeNum && cpZipcode && detailCpAddress ? `${cpZipcodeNum} ${cpZipcode} ${detailCpAddress}` : userInfo.cpAddress
    };
    try {
      const response = await axios.put('/admin/manageClient/modify', userInfo);
      if (response.data === '사용자 정보 업데이트 완료') {
        alert('정보수정이 완료되었습니다.');
        navigate('/medic/adminstrator/usermanagement');
      }
    } catch (error) {
      console.error("Error during user modification:", error);
      alert('회원 정보 수정 중 오류가 발생했습니다.');
    }
  }
};

  // 회원 정보 수정 완료 버튼 클릭 시 실행되는 함수
  const btn_progrm_edit = (e) => {
    e.preventDefault();
    const userEdit = {
        'uRole' : userInfo.uRole,
        'uId' : userInfo.uId,
        'uPw' : userInfo.uPw,
        'uName' : userInfo.uName,
        'uEmail' : userInfo.uEmail,
        'userTel' : userInfo.userTel,
        'userPhone' : userInfo.userPhone,
        'userAddress' : userAddress,
        'company' : userInfo.company,
        'ceo' : userInfo.ceo,
        'cpTel' : userInfo.cpTel,
        'cpFx' : userInfo.cpFx,
        'cpNum' : userInfo.cpNum,
        'cpAddress' : cpAddress
    }
    console.log('useredit',userEdit)
    user_edit(userEdit);
  };

  const user_edit = async (userEdit) => {
    try {
      const response = await axios.put('/admin/manageClient/modify', userEdit);
      console.log(response);
      
        alert('회원 정보가 수정되었습니다.');
        navigate('/medic/adminstrator/usermanagement');
      
    } catch (error) {
      console.error("Error during user signup:", error);
      alert('회원 정보 수정 중 오류가 발생했습니다.');
    }
  };

  const btn_user_list = async() => {
    navigate('/medic/adminstrator/usermanagement')
}

  return (
    <div className={mypage.mypage_box} style={{marginRight:'200px',marginTop:'50px'}}>
      {/* <div className={mypage.modify_title}>
        <h2>
    
          회원 정보 수정
        </h2>
      </div> */}

      <div className={mypage.modify_wrap}>
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
                                <input type="text" disabled={false} value={zipcode} onChange={input_zipcode} style={{width: '80px'}}/>
                                <button type="button" className={mypage.btn_findaddress} onClick={handleUClick} >주소찾기</button>
                            </div>
                            <div style={{display : "flex"}}>
                                <input type="text" disabled={false} value={userroadAddress} onChange={input_zipcode_num} style={{width: '250px'}}/> 
                                <input type="text" value={detailAddress} onChange={input_details_zipcode} style={ {width:'250px', marginLeft : '10px'}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* {uPart !== '일반회원' ? */}
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
                                <input type="text" disabled={false} value={cpZipcode} onChange={input_cp_zipcode} style={{width: '80px'}}/>
                                <button type="button" className={mypage.btn_findaddress} onClick={handleCClick} >주소찾기</button>
                            </div>
                            <div style={{display : "flex"}}>
                                <input type="text" disabled={false} value={comapanyroadAddress} onChange={input_cp_zipcode_num} style={{width: '250px'}}/> 
                                <input type="text" value={detailCpAddress} onChange={input_cp_details_zipcode} style={ {width:'250px', marginLeft : '10px'}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <></>
            {/* } */}
            <div className={mypage.complete}>
                <div className={mypage.complete_btnBox}>
                    <button type = "button" onClick={btn_progrm_modify}  className={mypage.btt_complete} >수정</button>
                    <button type = "button" onClick={btn_user_list} className={mypage.btt_complete} >취소</button>
                </div>
            </div>
        </div>

      {/* <div className={user.tb}>
        <table className={user.useredit_table}>
        <tr>
  <td className={user.useredit_th}>
    회원구분
  </td>
  <td colSpan="3" className={user.useredit_td}>
                        <input type="radio" name="user_role" value={uRole} checked={generalUser} onChange={radio_select_userRole} />일반회원
                        <input type="radio" name="user_role" value={uRole} checked={insuranceCo} onChange={radio_select_userRole} />보험사
                        <input type="radio" name="user_role" value={uRole} checked={deductionSc} onChange={radio_select_userRole} />공제회
                        <input type="radio" name="user_role" value={uRole} checked={adjusterCp} onChange={radio_select_userRole} />손해사정법인
                        <input type="radio" name="user_role" value={uRole} checked={adjusterOc} onChange={radio_select_userRole} />손해사정사무소
                        <input type="radio" name="user_role" value={uRole} checked={lawfirm} onChange={radio_select_userRole} />법무법인
                        <input type="radio" name="user_role" value={uRole} checked={laborCp} onChange={radio_select_userRole} />노무법인
                        </td>
                      </tr>
          <tr>
            <td className={user.useredit_th}>아이디</td>
            <td  className={user.useredit_td}>
              <div className={user.uid}>
                <input  type="text" name="id"
              
                  readOnly={true}
                  value={uId}
                />
              </div>
            </td>
            <td className={user.useredit_th}>
                            비밀번호
                        </td>
                        <td className={user.useredit_td}>
                            <input type="password" name="pw" 
                            onChange={input_pw} 
                            value={uPw} maxLength={15}/>
                        </td>
          </tr>


                    <tr>
                        <td className={user.useredit_td}>
                            회원명
                        </td>
                        <td className={user.useredit_td}>
                            <input type="text" name="name"
                             onChange={input_name} 
                             value={uName} maxLength={20}/>
                        </td>
                        <td className={user.useredit_td}>
                            이메일
                        </td>
                        <td className={user.useredit_td}>
                            <input type="text" name="email" onChange={input_email} value={uEmail} maxLength={30}/>
                        </td>
                    </tr>

                    <tr>
                        <td className={user.useredit_td}>
                            일반전화
                        </td>
                        <td className={user.useredit_td}>
                            <input type="text" name="tel" onChange={input_tel} value={userTel} maxLength={13}/>
                        </td>
                        <td className={user.useredit_td}>
                            휴대폰번호
                        </td>
                        <td className={user.useredit_td}>
                            <input type="text" name="phone" onChange={input_phone} value={userPhone} maxLength={13}/>
                        </td>
                    </tr>
          

                    <tr className={user.useredit_zipcode_tb}>
                        <td className={user.useredit_td}>
                            주소
                        </td>
                        <td colSpan="4" className={user.useredit_td}>
                            <div className={user.useredit_zipcode}>
                                <input type="text" name="zipcode_num" onChange={input_zipcode_num} value={zipcodeNum} maxLength={5}/>
                                <button type="button" onClick={() => alert('우편번호')} className={user.useredit_zipcode_btn}>우편번호</button>
                                <br/>
                                <input type="text" name="zipcode" value={zipcode} onChange={input_zipcode} maxLength={80}/><br/>
                                <input type="text" name="details_zipcode" value={detailAddress} onChange={input_details_zipcode} maxLength={15}/>
                            </div>
                        </td>
                 </tr>
        </table>
      </div> */}

      {/* <div className={user.useredit_iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    업체 정보
                </h3>
            </div>     */}
    </div>
  );
}
