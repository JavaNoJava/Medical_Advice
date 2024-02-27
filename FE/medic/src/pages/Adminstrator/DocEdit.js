import React, { useState, useEffect } from "react";
import docedit from '../../css/DocEdit.module.css';
import axios from "axios";
import { useNavigate , useLocation} from "react-router-dom";

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


  useEffect(() => {
    fetchUserData();
},[]);

  const fetchUserData = async () => {
    try {
      
      const response = await axios.get(`/admin/manageConsultative/detail/${docInfo}`);
      console.log(response);
      setCName(response.data.cname);
      setCEmail(response.data.cemail);
      setCPw(response.data.cpw);
      setCTel(response.data.ctel);
      setCPhone(response.data.cphone);
      setDepartment(response.data.department);
      setHospName(response.data.hospName);
      setHospNum(response.data.hospNum);
      setHospFx(response.data.hospFx);
      setHospTel(response.data.hospTel);
      setCRole(response.data.crole);
      

      const docAddressArray = response.data.caddress.split(" ");
      console.log('addres',docAddress)
      setZipcodeNum(docAddressArray[0]);
      setZipcode(docAddressArray[1]);
      setDetailAddress(docAddressArray.slice(2).join(" "));

      const hospAddressArray = response.data.hospAddress.split(" ");
      setCpZipcodeNum(hospAddressArray[0]);
      setCpZipcode(hospAddressArray[1]);
      setDetailCpAddress(hospAddressArray.slice(2).join(" "));


      console.log('response1', response.data);
      
      console.log('userinfo',docInfo)
    } catch (error) {
      console.error('유저 정보를 가져오는 도중 에러 발생', error);
    }
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
        'cAddress' : zipcodeNum && zipcode && detailAddress ? `${zipcodeNum} ${zipcode} ${detailAddress}` : docAddress ,
        'hospName' : hospName,
        'hospTel' : hospTel,
        'department' : department,
        'hospFx' : hospFx,
        'hospNum' : hospNum,
        'hospAddress' : cpZipcodeNum && cpZipcode && detailCpAddress ? `${cpZipcodeNum} ${cpZipcode} ${detailCpAddress} `:hospAddress,
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
    <div className={docedit.docedit_wrap}>
      <div className={docedit.docedit_iconbox}>
        <h2>
          <i className="fa-solid fa-circle icon"></i>
          의사 정보 수정
        </h2>
      </div>

      <div className={docedit.tb}>
        <table className={docedit.docedit_table}>
          <tbody>
            <tr>
              <td className={docedit.docedit_th}>아이디</td>
              <td  className={docedit.docedit}> 
              <div className={docedit.docedit_td}>
                <input type="text" name="cid" 
              readOnly ={true}
               value={cId} />
              </div>
              </td>

           
              <td className={docedit.docedit_th}>비밀번호</td>
              <td className={docedit.docedit_td}>
                <input
                  type="password"
                  name="cpw"
                  value={cPw}
                  onChange={input_cpw}
                  maxLength={15}
                />
              </td>
      
            </tr>

            <tr>
                <td className={docedit.docedit_th}>이름</td>
                <td className={docedit.docedit_td}>
                    <input type="text" name="cname"
                    value={cName}
                    onChange={input_cname}
                    maxLength={20}/>
                </td>
            
            <td className={docedit.docedit_th}>이메일</td>
            <td className={docedit.docedit_td}> 
                <input type="text" name="cemail" 
                value={cEmail}
                onChange={input_cemail}
                maxLength={30}
                />
            </td>
            </tr>
            <tr>
            <td className={docedit.docedit_th}>권한</td>
            <td className={docedit.docedit_td}> 
                <input type="text" name="crole" 
                value={crole}
                onChange={input_crole}
                maxLength={30}
                />
            </td>
            <td className={docedit.docedit_th}>직책</td>
            <td className={docedit.docedit_td}> 
                <input type="text" name="crole" 
                value={department}
                onChange={input_department}
                maxLength={30}
                />
            </td>

            </tr>
            <tr>
                <td className={docedit.docedit_th}>전문의 일반전화</td>
                <td className={docedit.docedit_td}>
                    <input type="text" name="ctel"
                    onChange={input_ctel}
                value={cTel}
                    maxLength={13}
                    />
                </td>
            
            <td className={docedit.docedit_th}>전문의 휴대전화</td>
                <td className={docedit.docedit_td}>
                    <input typeof="text" name="cphone"
                     value={cPhone}
                    onChange={input_cphone}
                    maxLength={13}
                    />
                </td>
            </tr>

            <tr className={docedit.docedit_zipcode_tb}>
                <td className={docedit.docedit_td}>전문의 주소</td>
                <td colSpan="4" className={docedit.docedit_td}>
                    <div className={docedit.docedit_zipcode}>
                    <input type="text" name="czipcode_num" onChange={input_doc_zipcode_num}value={zipcodeNum}/>
                    <br/>
                    <input type="text" name="czipcode"
                     value={zipcode}
                     onChange={input_doc_zipcode}
                        maxLength={80}
                    /><br/>
                  <input type="text" name="details_czipcode"
                     value={detailAddress}
                     onChange={input_details_czipcode}
                    maxLength={15}
                  />
                  </div>
                </td>
            </tr>

          </tbody>
        </table>
      </div>

      <div className={docedit.docedit_iconbox}>
              <h3>
                <i className="fa-solid fa-circle icon"></i>
                병원 정보 수정
              </h3>
      </div>

      <div className={`${docedit.docedit_table} ${docedit.tb}`}>
              <table className={docedit.docedit_table}>
                <tr>
                    <td className={docedit.docedit_th}>
                        병원명
                    </td>
                    <td className={docedit.docedit_td}>
                        <input type="text" name="hosp_name"
                         value={hospName}
                         onChange={input_hospname}
                        maxLength={20}
                        />
                    </td>
                    <td className={docedit.docedit_th}>
                        병원전화
                    </td>
                    <td className={docedit.docedit_td}>
                        <input type="text" name="hosp_tel"
                             value={hospTel}
                             onChange={input_hospTel}
                            maxLength={13}
                        />
                    
                    </td>
                    </tr>

                    <tr>
                    <td className={docedit.docedit_th}>
                        진료과
                    </td>
                    <td className={docedit.docedit_td}>
                        <input type="text" name="department"
                         value={department}
                         onChange={input_department}
                        maxLength={13}
                        />
                    </td>
                    
                    <td className={docedit.docedit_th}>
                        팩스번호
                    </td>
                    <td className={docedit.docedit_td}>
                        <input type="text" name="hosp_fx"
                         value={hospFx}
                         onChange={input_hosp_fx}
                        maxLength={15}
                        />
                    </td>
                    </tr>

                    <tr>
                    <td className={docedit.docedit_td}>
                    사업자 번호(법인)
                    </td>
                    <td   className={docedit.docedit_th} >
                        <input type="text" name="hosp_num"
                         value={hospNum}
                         onChange={input_hosp_num}
                        maxLength={20}
                        />
                    </td>
                    <td className={docedit.docedit_th}>

                    </td>
                    <td className={docedit.docedit_td}>

                    </td>
                    </tr>
                   

                <tr className={docedit.docedit_zipcode_tb}>
                <td className={docedit.docedit_td}>병원 주소</td>
                <td colSpan="4" className={docedit.docedit_td}>
                    <div className={docedit.docedit_zipcode}>
                    <input type="text" name="hosp_zipcode_num" onChange={input_hosp_zipcode_num} value={cpZipcodeNum}/>
                    <br/>
                    <input type="text" name="hosp_zipcode"
                        value={cpZipcode}
                        onChange={input_hosp_zipcode}
                        maxLength={80}
                    />
                    <br/>
                  <input type="text" name="hosp_details_czipcode"
                     value={detailCpAddress}
                     onChange={input_hosp_details_zipcode}
                    maxLength={15}
                  />
                  </div>
                </td>
            </tr>
              </table>
      </div>

      <div className={docedit.complete}>
        <button
          type="button"
          onClick={btn_progrm_doc_edit}
          className={docedit.docedit_complete}
        >
          수정 완료
        </button>
      </div>

      <div className={docedit.complete}>
        <button
          type="button"
          onClick={btn_doc_list}
          className={docedit.docedit_complete}
        >
          목록
        </button>
      </div>
    </div>
  );
}
