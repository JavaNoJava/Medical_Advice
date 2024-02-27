import React, { useEffect, useState } from "react";
import axios from "axios";
import user from '../../css/UserEdit.module.css';
import { useNavigate,useLocation} from "react-router-dom";


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

  const [company, setCompany] = useState() //업체명
  const [ceo, setCeo] = useState() //대표자명
  const [cpTel, setCpTel] = useState() //회사 전화번호
  const [cpFx, setCpFx] = useState() //회사 팩스번호
  const [cpNum, setCpNum] = useState() //회사 사업자번호
  const [cpZipcodeNum, setCpZipcodeNum] = useState()
  const [cpZipcode, setCpZipcode] = useState()
  const [detailCpAddress, setDetailCpAddress] = useState()
  const [cpAddress, setCpAddress] = useState() //회사 주소


  const [generalUser, setGeneralUser] = useState(false)
  const [insuranceCo, setInsuranceCo] = useState(false)
  const [deductionSc, setDeductionSc] = useState(false)
  const [adjusterCp, setAdjusterCp] = useState(false)
  const [adjusterOc, setAdjusterOc] = useState(false)
  const [lawfirm, setLawfirm] = useState(false)
  const [laborCp, setlaborCp] = useState(false)

  const selectUserRole = (user_role) => {
    switch (user_role) {
        case 'general_user':
            setGeneralUser(true)
            setInsuranceCo(false)
            setDeductionSc(false)
            setAdjusterCp(false)
            setAdjusterOc(false)
            setLawfirm(false)
            setlaborCp(false)
            break;
        case 'insurance_co':
            setGeneralUser(false)
            setInsuranceCo(true)
            setDeductionSc(false)
            setAdjusterCp(false)
            setAdjusterOc(false)
            setLawfirm(false)
            setlaborCp(false)
            break;
        case 'deduction_sc':
            setGeneralUser(false)
            setInsuranceCo(false)
            setDeductionSc(true)
            setAdjusterCp(false)
            setAdjusterOc(false)
            setLawfirm(false)
            setlaborCp(false)
            break;
        case 'adjuster_cp':
            setGeneralUser(false)
            setInsuranceCo(false)
            setDeductionSc(false)
            setAdjusterCp(true)
            setAdjusterOc(false)
            setLawfirm(false)
            setlaborCp(false)
            break;
        case 'adjuster_oc':
            setGeneralUser(false)
            setInsuranceCo(false)
            setDeductionSc(false)
            setAdjusterCp(false)
            setAdjusterOc(true)
            setLawfirm(false)
            setlaborCp(false)
            break;
        case 'lawfirm':
            setGeneralUser(false)
            setInsuranceCo(false)
            setDeductionSc(false)
            setAdjusterCp(false)
            setAdjusterOc(false)
            setLawfirm(true)
            setlaborCp(false)
            break;
        case 'labor_cp':
            setGeneralUser(false)
            setInsuranceCo(false)
            setDeductionSc(false)
            setAdjusterCp(false)
            setAdjusterOc(false)
            setLawfirm(false)
            setlaborCp(true)
            break;
        default:
            break;
    }
};

  useEffect(() => {
      fetchUserData();

  },[]);
  const fetchUserData = async () => {
    try {
        const response = await axios.get(`/admin/manageClient/detail/${uId}`);
        console.log('response', response);

        setURole(response.data.urole)
       selectUserRole(response.data.urole)
        setUId(response.data.uid);
        setUPw(response.data.upw);
        setUName(response.data.uname);
        setUEmail(response.data.uemail);
        setUserTel(response.data.userTel);
        setUserPhone(response.data.userPhone);
        setCompany(response.data.company);
        setCeo(response.data.ceo);
        setCpTel(response.data.cpTel);
        setCpFx(response.data.cpFx);
        setCpNum(response.data.cpNum);

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


  // 비밀번호 입력 시 실행되는 함수
  const input_pw = (e) => {
   setUPw(e.target.value);
  };

  const radio_select_userRole = e => {
    selectUserRole(e.target.value)
    setURole(e.target.value)
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
const input_name = e => {
  setUName(e.target.value)
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
    <div className={user.useredit_wrap}>
      <div className={user.useredit_iconbox}>
        <h2>
          <i className="fa-solid fa-circle icon"></i>
          회원 정보 수정
        </h2>
      </div>

      <div className={user.useredit_iconbox}>
        <h3>
          <i className="fa-solid fa-circle icon"></i>
          가입자 정보
        </h3>
      </div>

      <div className={user.tb}>
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
      </div>

      <div className={user.useredit_iconbox}>
                <h3>
                    <i className="fa-solid fa-circle icon"></i>
                    업체 정보
                </h3>
            </div>    
      <div className={`${user.useredit_table} ${user.tb}`}>
        <table className={user.useredit_table}>
        <tr>
                    <td className={user.useredit_th}>
                        회사명
                    </td>
                    <td className={user.useredit_td}>
                        <input type="text" name="cp_name" onChange={input_cpname} value={company} maxLength={20}/>
                    </td>
                    <td className={user.useredit_th}>
                        대표자명
                    </td>
                    <td className={user.useredit_td}>
                        <input type="text" name="cp_ceo" onChange={input_cp_ceo} value={ceo} maxLength={8}/>
                    </td>
                </tr>

                <tr>
                    <td className={user.useredit_th}>
                        일반전화
                    </td>
                    <td className={user.useredit_td}>
                        <input type="text" name="cp_tel" onChange={input_cp_tel} value={cpTel} maxLength={13}/>
                    </td>
                    <td className={user.useredit_th}>
                        팩스번호
                    </td>
                    <td className={user.useredit_td}>
                        <input type="text" name="cp_fx" onChange={input_cp_fx} value={cpFx} maxLength={15}/>
                    </td>
                </tr>

                <tr>
                    <td className={user.useredit_th}>
                        사업자번호(법인)
                    </td>
                    <td colSpan="4" className={user.useredit_td}>
                        <input type="text" name="cp_num" onChange={input_cp_num} value={cpNum} maxLength={20}/>
                    </td>
                </tr>

                <tr className={user.useredit_tb}>
                    <td className={user.useredit_th}>
                        사업장 주소
                    </td>
                    <td colSpan="4" className={user.useredit_td}>
                        <div className={user.useredit_zipcode}>
                            <input type="text" name="cp_zipcode_num" value={cpZipcodeNum} onChange={input_cp_zipcode_num} /*value={userInfo.cpAddress}*/ maxLength={5}/>
                            <button type="button" onClick={() => alert('우편번호')} className={user.useredit_zipcode}>우편번호</button>
                            <br />
                            <input type="text" name="cp_zipcode" onChange={input_cp_zipcode} value={cpZipcode} maxLength={80}/><br />
                            <input type="text" name="cp_details_zipcode" onChange={input_cp_details_zipcode} value={detailCpAddress} maxLength={15}/>
                        </div>
                    </td>
                </tr>
        </table>
      </div>

      <div className={user.useredit_complete}>
            <button type = "button" onClick={btn_progrm_modify}  className={user.useredit_btt_complete}>회원 수정 완료</button>
        </div>

        <div className={user.useredit_complete}>
            <button type = "button" onClick={btn_user_list}  className={user.useredit_btt_complete}>목록</button>
        </div>
    </div>
  );
}
